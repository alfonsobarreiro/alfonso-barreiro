"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";
import { DOTS_EVENT, getDots } from "@/lib/dots";

/* A card grid that turns into a sideways row on phones (spec cuts 3 and
   D6): Websites and Campaigns below 768px, Concepts below 640px. Above
   the breakpoint it is the plain grid it wraps (`className`).

   In the row:
   - The row scrolls inside itself and snaps card by card. It bleeds to
     the screen edges (negative margins equal to the band's side padding),
     so the page itself never scrolls sideways, and the next card peeks
     in at the right edge.
   - A dot pager under the row (the page's own dot vocabulary) shows how
     many cards there are and which one is at the start, so more to the
     right is visible without a swipe. It is aria-hidden: every card is
     already a link in the tab order, and the cards are the content.
   - Keyboard: Tab moves card to card. When focus lands in a card that is
     not fully in view, the row scrolls it to the start edge (instantly
     with reduced motion or the dots stopped).
   - Cards rise in with opacity only here: a 24px rise inside a scroller
     would open a vertical scroll range while it runs.

   Everything is server-rendered at fixed sizes (the pager's dots are in
   the HTML and only change color), so the row adds no layout shift. */
export function KusRow({
  className,
  below,
  label,
  children,
}: {
  /** The grid classes above the breakpoint, e.g. "kus-grid kus-grid--3". */
  className: string;
  /** The row applies below this width: 768 (Websites, Campaigns) or 640 (Concepts). */
  below: 640 | 768;
  /** Names the row for screen readers, e.g. "Websites". */
  label: string;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pagerRef = useRef<HTMLDivElement>(null);
  const count = Children.count(children);

  useEffect(() => {
    const track = trackRef.current;
    const pager = pagerRef.current;
    if (!track || !pager) return;
    const mq = window.matchMedia(`(max-width: ${below - 1}px)`);
    const dots = Array.from(pager.children) as HTMLElement[];
    let raf = 0;

    const cards = () => Array.from(track.children) as HTMLElement[];
    const startEdge = () => track.getBoundingClientRect().left + parseFloat(getComputedStyle(track).scrollPaddingLeft || "0");

    const update = () => {
      raf = 0;
      if (!mq.matches) return;
      const list = cards();
      const edge = startEdge();
      let at = 0;
      let best = Infinity;
      list.forEach((card, i) => {
        const d = Math.abs(card.getBoundingClientRect().left - edge);
        if (d < best) { best = d; at = i; }
      });
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) at = list.length - 1;
      dots.forEach((dot, i) => {
        if (i === at) dot.setAttribute("data-on", "");
        else dot.removeAttribute("data-on");
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onFocusIn = (e: FocusEvent) => {
      if (!mq.matches) return;
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".kus-row__track > *");
      if (!card || card.parentElement !== track) return;
      const t = track.getBoundingClientRect();
      const c = card.getBoundingClientRect();
      if (c.left >= t.left - 1 && c.right <= t.right + 1) return;
      const instant = reduce.matches || getDots() === "still";
      const left = track.scrollLeft + (c.left - startEdge());
      track.scrollTo({ left, behavior: instant ? "instant" : "smooth" });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("focusin", onFocusIn);
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener(DOTS_EVENT, onScroll);
    mq.addEventListener("change", onScroll);
    update();
    return () => {
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener(DOTS_EVENT, onScroll);
      mq.removeEventListener("change", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [below]);

  return (
    <div className="kus-row" data-row-below={below}>
      <div ref={trackRef} className={`${className} kus-row__track`} role="group" aria-label={label}>
        {children}
      </div>
      <div ref={pagerRef} className="kus-row__pager" aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <span key={i} className="kus-row__dot" data-on={i === 0 ? "" : undefined} />
        ))}
      </div>
      <style href="kus-row" precedence="default">{CSS}</style>
    </div>
  );
}

/* The row's rules, written once per breakpoint. */
const rowRules = (below: number) => `
@media (max-width: ${below - 1}px) {
  .kus .kus-row[data-row-below="${below}"] > .kus-row__track {
    grid-template-columns: none;
    grid-auto-flow: column;
    grid-auto-columns: min(84%, 440px);
    column-gap: var(--kus-gap);
    overflow-x: auto;
    overflow-y: hidden;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: var(--kus-pad-x);
    margin-inline: calc(-1 * var(--kus-pad-x));
    padding: 12px var(--kus-pad-x) 16px;
    margin-block: -12px -16px;
    scrollbar-width: none;
  }
  .kus .kus-row[data-row-below="${below}"] > .kus-row__track::-webkit-scrollbar { display: none; }
  /* A mouse wheel cannot move a row sideways and the pager is not clickable,
     so fine pointers get a thin scrollbar to drag. */
  @media (pointer: fine) {
    .kus .kus-row[data-row-below="${below}"] > .kus-row__track { scrollbar-width: thin; scrollbar-color: var(--color-neutral-400) transparent; }
    .kus .kus-row[data-row-below="${below}"] > .kus-row__track::-webkit-scrollbar { display: block; height: 6px; }
    .kus .kus-row[data-row-below="${below}"] > .kus-row__track::-webkit-scrollbar-thumb { background: var(--color-neutral-400); border-radius: 999px; }
  }
  .kus .kus-row[data-row-below="${below}"] > .kus-row__track > * { scroll-snap-align: start; grid-column: auto; }
  :root[data-js]:not([data-dots="still"]) .kus .kus-row[data-row-below="${below}"] > .kus-row__track > [data-reveal]:not([data-in]) { transform: none; }
  .kus .kus-row[data-row-below="${below}"] > .kus-row__pager { display: flex; }
}`;

const CSS = `
.kus-row__pager {
  display: none;
  align-items: center; gap: 8px;
  height: 12px; margin-top: 20px; padding-left: 2px;
}
/* Color and scale only (no width change), so moving along the row never
   shifts the dots after the current one. */
.kus-row__dot {
  flex: none; width: 8px; height: 8px; border-radius: 999px;
  background: var(--color-terracotta-500);
  transition: transform var(--kus-dur-in) var(--kus-ease-spring), background-color var(--kus-dur-in) ease;
}
.kus-row__dot[data-on] { background: var(--color-navy); transform: scale(1.5); }
@media (prefers-reduced-motion: reduce) { .kus-row__dot { transition: none; } .kus-row__dot[data-on] { transform: none; } }
:root[data-dots="still"] .kus-row__dot { transition: none; }
:root[data-dots="still"] .kus-row__dot[data-on] { transform: none; }
@media (forced-colors: active) {
  .kus-row__dot { background: CanvasText; }
  .kus-row__dot[data-on] { background: Highlight; }
}
${rowRules(768)}
${rowRules(640)}
`;
