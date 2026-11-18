"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { DOTS_EVENT, getDots } from "@/lib/dots";

/* Slide a block in from the right the first time it scrolls into view.

   The start state (pushed right, transparent) applies only under
   html[data-js] and only while the dots are moving, both set by the head
   script before first paint (src/lib/dots.ts). So the block never paints
   in place and then jumps, it is fully visible with JavaScript off, and
   reduced motion or "Stop the dots" shows it in place with no motion.
   A transform does not count as layout shift, and the parent clips the
   overflow (overflow-x: clip on the section), so the page never scrolls
   sideways while the block is still out to the right.

   Keyboard focus landing inside the block finishes the entrance at once,
   so nothing focusable is ever invisible.

   The observer watches the outer wrapper, which never moves; only the
   inner block slides. Watching the moving block itself failed from 1024
   to 1247px wide: pushed right, less of it than the threshold was ever
   inside the viewport, so it never landed. */
export function SlideIn({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const land = () => el.setAttribute("data-in", "");
    if (getDots() === "still" || typeof IntersectionObserver === "undefined") { land(); return; }

    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { land(); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(el);
    el.addEventListener("focusin", land);
    window.addEventListener(DOTS_EVENT, land);
    return () => {
      io.disconnect();
      el.removeEventListener("focusin", land);
      window.removeEventListener(DOTS_EVENT, land);
    };
  }, []);

  return (
    <div ref={ref} className={`slidein${className ? " " + className : ""}`}>
      <div className="slidein__inner">{children}</div>
      <style href="slide-in" precedence="default">{`
        :root[data-js]:not([data-dots="still"]) .slidein:not([data-in]) > .slidein__inner {
          transform: translateX(min(48vw, 560px));
          opacity: 0;
        }
        .slidein__inner {
          transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
        }
        :root[data-dots="still"] .slidein__inner { transition: none; }
      `}</style>
    </div>
  );
}
