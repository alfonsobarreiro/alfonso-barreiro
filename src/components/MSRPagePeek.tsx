"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

/**
 * MSRPagePeek
 * ─────────────────────────────────────────────────────────────────────────────
 * Live MSR site auto-scrolling inside the home Work card. No device chrome —
 * just the actual work. The 1280 × 5474 full-page capture slowly pans top to
 * bottom inside a 16:10 frame; paused on hover and on prefers-reduced-motion.
 */
const IMG_W = 1280;
const IMG_H = 5474;

export default function MSRPagePeek({ paused = false }: { paused?: boolean }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div
      role="img"
      aria-label="Men's Sole Revival homepage preview"
      style={{
        position:    "relative",
        width:       "100%",
        aspectRatio: "16 / 10",
        overflow:    "hidden",
        background:  "#13100C",
      }}
    >
      <div
        className="msr-page-track"
        data-paused={paused || undefined}
        data-reduced={reduced || undefined}
        style={{
          position: "absolute",
          top:      0,
          left:     0,
          width:    "100%",
          aspectRatio: `${IMG_W} / ${IMG_H}`,
        }}
      >
        <img
          src="/cs-msr-homepage.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            position:       "absolute",
            inset:          0,
            width:          "100%",
            height:         "100%",
            objectFit:      "cover",
            objectPosition: "top center",
            display:        "block",
          }}
        />
      </div>

      <style>{`
        .msr-page-track {
          animation: msr-page-scroll 72s ease-in-out infinite alternate;
        }
        .msr-page-track[data-paused],
        .msr-page-track[data-reduced] {
          animation: none;
        }
        @keyframes msr-page-scroll {
          from { transform: translateY(0); }
          to   { transform: translateY(-85%); }
        }
      `}</style>
    </div>
  );
}
