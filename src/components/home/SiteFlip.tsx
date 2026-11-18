"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* Client half of SiteFlipMedia: the page stack, the segment bar, and the
   label chip inside a website card's 16:10 frame.

   Fine pointer: moving across the card steps through the pages left to
   right, one horizontal slice per page, matching the segments under it.
   Leaving the card goes back to the cover.
   Keyboard: with the card link focused, ArrowLeft and ArrowRight step.
   Touch: the segments are buttons with a 44px tall hit area along the
   bottom of the frame. A tap anywhere above them still opens the sample.

   Only the cover renders at first. The other pages mount on the first
   hover, focus, or touch of the segment bar, so the band costs one image
   per card until someone shows interest.

   The whole thing is aria-hidden: the cover is decorative (alt="") in
   every WorkCard, and the sample page carries the same screens with real
   alt text. The bar is a sibling of the page stack, not a child, so its
   z-index can clear the card's stretched link while the pages stay under
   it and a click on the image still opens the piece. */

export type SiteFlipPage = { src: string; label?: string };

const SIZES = "(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 640px";

const CSS = `
.sflip { position: absolute; inset: 0; z-index: 0; }
.sflip__page { position: absolute; inset: 0; opacity: 0; z-index: 0; }
.sflip__page[data-state="base"] { opacity: 1; }
.sflip__page[data-state="under"][data-loaded] { opacity: 1; z-index: 1; }
.sflip__page[data-state="in"], .sflip__page[data-state="out"] { z-index: 2; transition: opacity 0.18s ease; }
.sflip__page[data-state="in"][data-loaded] { opacity: 1; }
.sflip__chip {
  position: absolute; left: 10px; bottom: 12px; z-index: 3;
  display: inline-flex; align-items: center; gap: 8px;
  padding: 4px 8px; border-radius: var(--radius-chip);
  background: var(--color-paper); border: 1px solid var(--color-neutral-200);
  font-family: var(--font-dm-sans), sans-serif; font-size: var(--text-small); font-weight: 500; line-height: 1.4;
  color: var(--color-text); white-space: nowrap; max-width: calc(100% - 20px); box-sizing: border-box; overflow: hidden;
  opacity: 0; transition: opacity 0.15s ease; pointer-events: none;
}
.sflip__label { overflow: hidden; text-overflow: ellipsis; }
.sflip__keys { display: none; flex: none; font-weight: 400; color: var(--color-neutral-600); }
.wcard:has(.wcard__link:focus-visible) .sflip__chip, .sflip[data-touched] .sflip__chip { opacity: 1; }
.wcard:has(.wcard__link:focus-visible) .sflip__keys { display: inline; }
.sflip__bar {
  position: absolute; left: 0; right: 0; bottom: 0; height: 44px;
  display: flex; pointer-events: none;
}
.sflip__bar::before {
  content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px;
  background: var(--color-paper);
}
.sflip__seg {
  position: relative; flex: 1 1 0; height: 44px; margin: 0; padding: 0;
  border: 0; background: transparent; cursor: pointer; pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
}
.sflip__seg::after {
  content: ""; position: absolute; left: 1px; right: 1px; bottom: 0; height: 2px;
  background: var(--color-neutral-400); transition: background-color 0.15s ease;
}
.sflip__seg:first-child::after { left: 0; }
.sflip__seg:last-child::after { right: 0; }
.sflip__seg[data-active]::after { background: var(--color-text); }
@media (hover: hover) and (pointer: fine) {
  .wcard:hover .sflip__chip { opacity: 1; }
  .sflip__seg { pointer-events: none; cursor: default; }
}
@media (prefers-reduced-motion: reduce) {
  .sflip__page[data-state], .sflip__chip, .sflip__seg::after { transition: none; }
}
`;

type View = { index: number; prev: number | null };

export function SiteFlip({
  pages,
  start,
  priority = false,
}: {
  pages: SiteFlipPage[];
  /** Index of the card cover inside `pages`: the resting page. */
  start: number;
  priority?: boolean;
}) {
  const stackRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>({ index: start, prev: null });
  const [armed, setArmed] = useState(false);
  const [touched, setTouched] = useState(false);
  const [loaded, setLoaded] = useState<Record<number, true>>({});
  const count = pages.length;

  useEffect(() => {
    const stack = stackRef.current;
    const card = stack?.closest<HTMLElement>(".wcard");
    if (!stack || !card || count < 2) return;

    let hovering = false;
    const go = (next: number) =>
      setView((v) => (v.index === next ? v : { index: next, prev: v.index }));
    const fine = (e: PointerEvent) => e.pointerType === "mouse" || e.pointerType === "pen";

    const onEnter = (e: PointerEvent) => {
      if (!fine(e)) return;
      hovering = true;
      setArmed(true);
    };
    const onMove = (e: PointerEvent) => {
      if (!fine(e)) return;
      const rect = stack.getBoundingClientRect();
      if (rect.width === 0) return;
      const ratio = (e.clientX - rect.left) / rect.width;
      go(Math.min(count - 1, Math.max(0, Math.floor(ratio * count))));
    };
    const onLeave = (e: PointerEvent) => {
      if (!fine(e)) return;
      hovering = false;
      if (!card.contains(document.activeElement)) go(start);
    };
    const onFocusIn = () => setArmed(true);
    const onFocusOut = (e: FocusEvent) => {
      if (!hovering && !card.contains(e.relatedTarget as Node | null)) go(start);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const target = e.target as HTMLElement | null;
      if (!target?.classList.contains("wcard__link")) return;
      e.preventDefault();
      setArmed(true);
      const step = e.key === "ArrowRight" ? 1 : -1;
      setView((v) => {
        const next = Math.min(count - 1, Math.max(0, v.index + step));
        return next === v.index ? v : { index: next, prev: v.index };
      });
    };

    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    card.addEventListener("focusin", onFocusIn);
    card.addEventListener("focusout", onFocusOut);
    card.addEventListener("keydown", onKey);
    return () => {
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
      card.removeEventListener("focusin", onFocusIn);
      card.removeEventListener("focusout", onFocusOut);
      card.removeEventListener("keydown", onKey);
    };
  }, [count, start]);

  const { index, prev } = view;
  const label = pages[index]?.label;

  const stateOf = (i: number) => {
    if (i === start) return "base";
    if (i === index) return "in";
    if (i === prev) return index === start ? "out" : "under";
    return "off";
  };

  return (
    <>
      <style>{CSS}</style>
      <div ref={stackRef} className="sflip" data-touched={touched ? "" : undefined} aria-hidden="true">
        {pages.map((page, i) =>
          i === start || armed ? (
            <div
              key={page.src}
              className="sflip__page"
              data-state={stateOf(i)}
              data-loaded={i === start || loaded[i] ? "" : undefined}
            >
              <Image
                src={page.src}
                alt=""
                fill
                priority={i === start && priority}
                sizes={SIZES}
                draggable={false}
                onLoad={i === start ? undefined : () => setLoaded((l) => (l[i] ? l : { ...l, [i]: true }))}
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
          ) : null,
        )}
        {label && count > 1 ? (
          <span className="sflip__chip">
            <span className="sflip__label">{label}</span>
            <span className="sflip__keys">← →</span>
          </span>
        ) : null}
      </div>
      {count > 1 ? (
        <div
          className="sflip__bar wcard__control"
          aria-hidden="true"
          style={{ position: "absolute" }}
          onPointerDown={() => setArmed(true)}
        >
          {pages.map((page, i) => (
            <button
              key={page.src}
              type="button"
              tabIndex={-1}
              className="sflip__seg"
              data-active={i === index ? "" : undefined}
              aria-label={page.label ? `Show ${page.label}` : `Show page ${i + 1}`}
              onClick={() => {
                setArmed(true);
                setTouched(true);
                setView((v) => (v.index === i ? v : { index: i, prev: v.index }));
              }}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
