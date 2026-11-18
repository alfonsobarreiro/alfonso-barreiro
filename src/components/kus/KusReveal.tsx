"use client";

import { useEffect } from "react";
import { DOTS_EVENT, getDots } from "@/lib/dots";

/* One IntersectionObserver for every [data-reveal] in the preview: each
   block fades and rises 24px into place once, the first time it enters
   view (KusStyles holds the start state and the 640ms spring). Blocks
   that enter together cascade 80ms apart, in reading order (top, then
   left), so a band lands label first, then the statement, then its cards.

   - The start state needs html[data-js] and moving dots, both set before
     first paint, so nothing is hidden without JavaScript, under reduced
     motion, or with the dots stopped.
   - Keyboard focus landing inside a block that has not entered yet
     finishes it at once (data-instant), so nothing focusable is invisible.
   - "Stop the dots" at runtime (DOTS_EVENT) lands every pending block at
     once.
   Renders nothing. */
const STAGGER_MS = 80;
const MAX_STEPS = 5;

export function KusReveal() {
  useEffect(() => {
    const pending = () => Array.from(document.querySelectorAll<HTMLElement>(".kus [data-reveal]:not([data-in])"));
    const landAll = (instant: boolean) => {
      for (const el of pending()) {
        if (instant) el.setAttribute("data-instant", "");
        el.setAttribute("data-in", "");
      }
    };

    if (getDots() === "still" || typeof IntersectionObserver === "undefined") {
      landAll(true);
      return;
    }

    const io = new IntersectionObserver((entries) => {
      const entering = entries
        .filter((e) => e.isIntersecting)
        .map((e) => ({ el: e.target as HTMLElement, r: e.boundingClientRect }))
        .sort((a, b) => (Math.abs(a.r.top - b.r.top) > 8 ? a.r.top - b.r.top : a.r.left - b.r.left));
      entering.forEach(({ el }, i) => {
        io.unobserve(el);
        el.style.transitionDelay = `${Math.min(i, MAX_STEPS) * STAGGER_MS}ms`;
        el.setAttribute("data-in", "");
        // Clear the delay once it has served, so a later transition on
        // the block (none today) would not inherit it.
        window.setTimeout(() => { el.style.transitionDelay = ""; }, 1200 + i * STAGGER_MS);
      });
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });

    for (const el of pending()) io.observe(el);

    const onFocus = (e: FocusEvent) => {
      const block = (e.target as Element | null)?.closest?.("[data-reveal]:not([data-in])");
      if (!block) return;
      block.setAttribute("data-instant", "");
      block.setAttribute("data-in", "");
      io.unobserve(block);
    };
    const onDots = () => {
      if (getDots() !== "still") return;
      landAll(true);
      io.disconnect();
    };

    document.addEventListener("focusin", onFocus);
    window.addEventListener(DOTS_EVENT, onDots);
    return () => {
      io.disconnect();
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener(DOTS_EVENT, onDots);
    };
  }, []);

  return null;
}
