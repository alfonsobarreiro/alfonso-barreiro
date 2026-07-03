"use client";

import { useEffect, useRef, useState } from "react";

/* StatCell — one cell in the "by the numbers" memory anchor.
   Big editorial numeral counts up from 0 on scroll-in. */
export default function StatCell({
  n, unit, caption,
}: {
  n: string; unit: string; caption: string;
}) {
  const target  = parseInt(n, 10);
  const hasPlus = n.includes("+");
  const isValidTarget = !Number.isNaN(target) && target > 0;
  const [display, setDisplay] = useState(isValidTarget ? 0 : target);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isValidTarget) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur   = 1100;
        const tick  = (now: number) => {
          const p     = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, isValidTarget]);

  return (
    <div
      ref={ref}
      style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
    >
      <p
        style={{
          fontFamily:    "var(--font-dm-sans), sans-serif",
          fontSize:      "clamp(80px, 11vw, 156px)",
          fontWeight:    300,
          lineHeight:    0.85,
          letterSpacing: "-0.05em",
          color:         "#252B28",
          margin:        0,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {display}
        {hasPlus && <span>+</span>}
      </p>
      <p
        aria-hidden={!unit || undefined}
        style={{
          fontFamily:    "var(--font-dm-sans), sans-serif",
          fontSize:      "clamp(14px, 1.4vw, 18px)",
          fontWeight:    600,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color:         "var(--color-brand)",
          margin:        "10px 0 20px",
          minHeight:     "clamp(18px, 1.7vw, 22px)",
          lineHeight:    1,
        }}
      >
        {unit || " "}
      </p>
      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize:   "14px",
          lineHeight: 1.55,
          color:      "#3D4440",
          margin:     0,
          maxWidth:   "300px",
        }}
      >
        {caption}
      </p>
    </div>
  );
}
