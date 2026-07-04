"use client";

import { useEffect, useRef, useState } from "react";

/* Small editorial diagram that ships with the "Translation cost between
   disciplines is real" belief. Three labeled circles start apart, then
   pull together into a Venn overlap when the reader scrolls the belief
   into view. Argues the belief's payoff line ("Eighteen years across
   all three, so I can hold the conversation without the relay") in the
   visual language, not just the copy. */
export default function TranslationCostDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "apart" | "together">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("together");
      return;
    }
    const timers: number[] = [];
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setPhase("apart");
        timers.push(window.setTimeout(() => setPhase("together"), 1100));
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => { io.disconnect(); timers.forEach((t) => window.clearTimeout(t)); };
  }, []);

  const together = phase === "together";

  return (
    <div ref={ref} className="tcd">
      <style>{`
        .tcd {
          margin-top:   20px;
          max-width:    280px;
        }
        .tcd-figure {
          position:   relative;
          height:     80px;
          margin:     0 0 12px;
        }
        .tcd-node {
          position:   absolute;
          top:        50%;
          width:      66px;
          height:     66px;
          border-radius: 50%;
          border:     2px solid var(--color-brand);
          background: transparent;
          transform:  translate(-50%, -50%);
          display:    flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-dm-sans), sans-serif;
          font-size:   10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color:       var(--color-brand);
          transition:  left 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .tcd-caption {
          font-family: var(--font-dm-sans), sans-serif;
          font-size:   12px;
          line-height: 1.5;
          color:       #6B6E6A;
          margin:      0;
          letter-spacing: 0;
        }
        .tcd-caption b {
          color: var(--color-brand);
          font-weight: 600;
        }
      `}</style>

      <div className="tcd-figure" aria-hidden="true">
        <span
          className="tcd-node"
          style={{ left: phase === "apart" ? "8%"  : together ? "20%" : "40%" }}
        >
          Design
        </span>
        <span
          className="tcd-node"
          style={{ left: "50%" }}
        >
          PM
        </span>
        <span
          className="tcd-node"
          style={{ left: phase === "apart" ? "92%" : together ? "80%" : "60%" }}
        >
          Eng
        </span>
      </div>

      <p className="tcd-caption">
        Eighteen years across all three &middot; <b>no relay needed</b>
      </p>
    </div>
  );
}
