"use client";

import { useEffect } from "react";
import { DOTS_EVENT, getDots } from "@/lib/dots";

/* The hero's spotlight, carried onto every card plate. One delegated
   pointermove listener for the page: over a card, it writes the pointer's
   position inside that card's plate to --plate-x / --plate-y, and the
   plate's ::before (a brighter dot layer, WorkStyles) shows through a
   radial mask there. The stretched title link covers the card, so the
   listener finds the card with closest(".wcard") rather than the plate.

   Mouse and pen only: a tap opens the card, so there is nothing to light.
   "Stop the dots" (html[data-dots="still"], where reduced motion starts):
   no tracking and no lit layer at all; the listener comes and goes with
   DOTS_EVENT, so the switch works without a reload. Renders only that one
   CSS rule. */
export function PlateSpotlight() {
  useEffect(() => {
    let frame = 0;
    let last: PointerEvent | null = null;
    let listening = false;
    let lit: HTMLElement | null = null;

    const paint = () => {
      frame = 0;
      const e = last;
      if (!e) return;
      const card = (e.target as Element | null)?.closest?.(".wcard");
      const plate = card?.querySelector<HTMLElement>(".wcard__frame");
      if (!plate) return;
      const r = plate.getBoundingClientRect();
      plate.style.setProperty("--plate-x", `${e.clientX - r.left}px`);
      plate.style.setProperty("--plate-y", `${e.clientY - r.top}px`);
      lit = plate;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      last = e;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const stop = () => {
      if (!listening) return;
      listening = false;
      document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      last = null;
      lit?.style.removeProperty("--plate-x");
      lit?.style.removeProperty("--plate-y");
      lit = null;
    };

    const sync = () => {
      if (getDots() === "still") { stop(); return; }
      if (listening) return;
      listening = true;
      document.addEventListener("pointermove", onMove, { passive: true });
    };

    sync();
    window.addEventListener(DOTS_EVENT, sync);
    return () => {
      window.removeEventListener(DOTS_EVENT, sync);
      stop();
    };
  }, []);

  return <style>{`:root[data-dots="still"] .wcard__frame::before { display: none; }`}</style>;
}
