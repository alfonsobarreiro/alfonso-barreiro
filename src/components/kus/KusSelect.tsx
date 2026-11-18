"use client";

import { useEffect, useRef } from "react";
import { DOTS_EVENT, getDots } from "@/lib/dots";

/* The Figma-style selection frame (spec 1.5, from Pumo):

   KusSelect: one square navy frame with four handles and a size tag that
   glides (280ms spring) to the card plate under the pointer or keyboard
   focus and prints the plate's size in px; it fades out over 480ms when
   the pointer or focus leaves. Mouse and pen only for the pointer (a tap
   opens the card). With the dots still, it jumps instead of gliding. The
   card's own CSS focus ring stays, so focus is visible without
   JavaScript. The logo cards are plated now (the size slider and its
   per-mark frames are gone), so they take this frame like every other
   card; WorkCard's data-plate="bare" cards are still skipped. KusCard's
   `bare` websites (data-bare on the wrapper) take the frame like any
   other card. When a sideways row (KusRow)
   scrolls under it, or its card finishes rising in, the frame follows. Decorative: aria-hidden,
   pointer-events none, positioned with a transform so it never counts as
   layout shift. */

const CARD_SELECTOR = ".kus .wcard:not([data-plate='bare'])";

export function KusSelect() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = ref.current;
    const root = box?.offsetParent as HTMLElement | null;
    if (!box || !root) return;
    const tag = box.querySelector<HTMLElement>(".kus-select__tag");
    let target: HTMLElement | null = null;
    let viaFocus = false;
    let ro: ResizeObserver | null = null;

    const place = (jump: boolean) => {
      if (!target) return;
      const plate = target.querySelector<HTMLElement>(".wcard__frame") ?? target;
      const r = plate.getBoundingClientRect();
      const o = root.getBoundingClientRect();
      if (jump) box.setAttribute("data-jump", "");
      box.style.transform = `translate3d(${Math.round(r.left - o.left)}px, ${Math.round(r.top - o.top)}px, 0)`;
      box.style.width = `${Math.round(r.width)}px`;
      box.style.height = `${Math.round(r.height)}px`;
      if (tag) tag.textContent = `${Math.round(r.width)} × ${Math.round(r.height)}`;
      if (jump) {
        void box.offsetWidth;
        box.removeAttribute("data-jump");
      }
    };

    const show = (card: HTMLElement) => {
      if (card === target && box.hasAttribute("data-on")) return;
      const wasOn = box.hasAttribute("data-on");
      target = card;
      place(!wasOn || getDots() === "still");
      // Focus can land in a card that has not entered yet: KusReveal drops
      // its 24px rise in the same event, so measure again a frame later.
      requestAnimationFrame(() => { if (target === card) place(true); });
      box.setAttribute("data-on", "");
      ro?.disconnect();
      ro = new ResizeObserver(() => place(true));
      ro.observe(card);
    };
    const hide = () => {
      target = null;
      viaFocus = false;
      box.removeAttribute("data-on");
      ro?.disconnect();
      ro = null;
    };

    const onOver = (e: PointerEvent) => {
      if (e.pointerType === "touch" || viaFocus) return;
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(CARD_SELECTOR);
      if (card) show(card);
    };
    const onOut = (e: PointerEvent) => {
      if (e.pointerType === "touch" || viaFocus || !target) return;
      const to = e.relatedTarget as Node | null;
      if (to && target.contains(to)) return;
      const next = (to as Element | null)?.closest?.<HTMLElement>(CARD_SELECTOR);
      if (next) show(next);
      else hide();
    };
    const onFocusIn = (e: FocusEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el?.matches?.(":focus-visible")) return;
      const card = el.closest<HTMLElement>(CARD_SELECTOR);
      if (card) { viaFocus = true; show(card); }
      else if (viaFocus) hide();
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!viaFocus) return;
      const to = e.relatedTarget as Element | null;
      if (to?.closest?.(CARD_SELECTOR)) return;
      hide();
    };
    const onResize = () => place(true);
    // A card that was still rising in (KusReveal) settled: follow it.
    const onSettle = (e: TransitionEvent) => {
      if (!target || e.propertyName !== "transform") return;
      if ((e.target as Node).contains(target)) place(true);
    };
    // A sideways row scrolled under the frame: follow the card.
    const onScroll = (e: Event) => {
      if (!target || e.target === document) return;
      const scroller = e.target as Node;
      if (scroller.contains(target)) place(true);
    };
    const onDots = () => { if (getDots() === "still") place(true); };

    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    document.addEventListener("transitionend", onSettle, true);
    window.addEventListener(DOTS_EVENT, onDots);
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("scroll", onScroll, { capture: true });
      document.removeEventListener("transitionend", onSettle, true);
      window.removeEventListener(DOTS_EVENT, onDots);
      ro?.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="kus-select" aria-hidden="true">
      <span className="kus-select__h kus-select__h--tl" />
      <span className="kus-select__h kus-select__h--tr" />
      <span className="kus-select__h kus-select__h--bl" />
      <span className="kus-select__h kus-select__h--br" />
      <span className="kus-select__tag" />
      <style>{CSS}</style>
    </div>
  );
}

const CSS = `
.kus-select {
  position: absolute; left: 0; top: 0; z-index: 5;
  width: 0; height: 0;
  pointer-events: none;
  box-shadow: 0 0 0 2px var(--color-navy);
  opacity: 0;
  transition:
    opacity var(--kus-dur-out) ease,
    transform var(--kus-dur-in) var(--kus-ease-spring),
    width var(--kus-dur-in) var(--kus-ease-spring),
    height var(--kus-dur-in) var(--kus-ease-spring);
}
.kus-select[data-on] { opacity: 1; transition-duration: var(--kus-dur-in); }
.kus-select[data-jump] { transition: none; }
.kus-select__h {
  position: absolute; width: 8px; height: 8px;
  background: var(--color-paper);
  box-shadow: 0 0 0 2px var(--color-navy);
}
.kus-select__h--tl { left: -4px; top: -4px; }
.kus-select__h--tr { right: -4px; top: -4px; }
.kus-select__h--bl { left: -4px; bottom: -4px; }
.kus-select__h--br { right: -4px; bottom: -4px; }
/* Inside the frame's top-right corner, so it never sits on the caption. */
.kus-select__tag {
  position: absolute; right: 10px; top: 10px;
  padding: 2px 8px;
  border-radius: var(--radius-chip);
  background: var(--color-navy); color: var(--color-paper);
  font-family: var(--kus-mono); font-size: var(--kus-fs-mono); line-height: 1.5; letter-spacing: 0;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.kus-select__tag:empty { display: none; }
@media (prefers-reduced-motion: reduce) { .kus-select { transition: opacity 0.15s linear; } }
:root[data-dots="still"] .kus-select { transition: none; }
@media (forced-colors: active) { .kus-select, .kus-select__h { box-shadow: none; outline: 2px solid CanvasText; } }
`;
