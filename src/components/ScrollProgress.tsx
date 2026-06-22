"use client";

import { useEffect, useState } from "react";

/**
 * ScrollProgress
 * ─────────────────────────────────────────────────────────────────────────────
 * Thin brand-color line fixed at the very top of the viewport. Scales 0 → 100%
 * as the reader scrolls through the page. Used on case study pages (14–23k px
 * tall) so the reader has a sense of how much more is ahead.
 *
 * Sits behind the Nav so it doesn't compete with the navigation chrome.
 * Honors prefers-reduced-motion (still updates, but without easing).
 */
export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc      = document.documentElement;
      const maxY     = doc.scrollHeight - doc.clientHeight;
      const next     = maxY > 0 ? (window.scrollY / maxY) * 100 : 0;
      setPct(Math.min(100, Math.max(0, next)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        right:         0,
        height:        "3px",
        background:    "transparent",
        zIndex:        45,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height:          "100%",
          width:           `${pct}%`,
          background:      "var(--color-brand)",
          transition:      "width 0.12s linear",
          transformOrigin: "left center",
        }}
      />
    </div>
  );
}
