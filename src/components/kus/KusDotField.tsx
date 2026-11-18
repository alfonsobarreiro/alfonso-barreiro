"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { DOTS_EVENT, getDots } from "@/lib/dots";

/* The hero's dot field (2026-11-06, Alfonso: "bring back the dots and the
   dot-hover effect"): the 24px terracotta-300 lattice the old hero sat on
   (Hero.tsx), and the spotlight that lights the dots near the pointer in
   terracotta-500. This wrapper only writes the pointer position to CSS
   variables; the look lives in KusFirstScreen's CSS.

   Mouse: the spotlight follows the pointer and fades when it leaves.
   Touch: it lights at the tap point and fades after 1.6s. "Stop the dots"
   (html[data-dots="still"], which reduced motion also sets) stops the
   tracking and the CSS hides the spotlight; the lattice stays. */
export default function KusDotField({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let hold = 0;
    let x = 0;
    let y = 0;

    const off = () => el.style.setProperty("--kus-dot-on", "0");
    const paint = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--kus-dot-x", `${x - r.left}px`);
      el.style.setProperty("--kus-dot-y", `${y - r.top}px`);
      el.style.setProperty("--kus-dot-on", "1");
    };
    const onMove = (e: PointerEvent) => {
      if (getDots() === "still") return;
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
      if (e.pointerType !== "mouse") {
        window.clearTimeout(hold);
        hold = window.setTimeout(off, 1600);
      }
    };
    const onLeave = (e: PointerEvent) => { if (e.pointerType === "mouse") off(); };
    const onDots = () => { if (getDots() === "still") off(); };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onMove);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener(DOTS_EVENT, onDots);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener(DOTS_EVENT, onDots);
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(hold);
    };
  }, []);

  return <div ref={ref} id={id} className={className}>{children}</div>;
}
