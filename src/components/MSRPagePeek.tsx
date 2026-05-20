"use client";

import { useEffect, useState } from "react";

// MSR homepage screenshot is 1280 × 4000 (logical px, captured at 2x DPR).
// Aspect: 0.32 (very tall) — auto-scroll the image vertically inside a 16:10 frame.
const IMG_W = 1280;
const IMG_H = 4000;

export default function MSRPagePeek({ paused = false }: { paused?: boolean }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Travel distance is computed in % of the image's own scaled height so the
  // motion works at any container width. The image is positioned at the
  // container's top-left; we translate it up by ~(imgH - containerH).
  // Using a CSS variable keeps math out of JS — the animation does the work.
  return (
    <div
      role="img"
      aria-label="Men’s Sole Revival homepage preview"
      style={{
        position:    "relative",
        width:       "100%",
        aspectRatio: "16 / 10",
        overflow:    "hidden",
        background:  "#13100C", // MSR's editorial near-black
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
          // height set by aspect ratio of the image so the scroll math is honest
          aspectRatio: `${IMG_W} / ${IMG_H}`,
        }}
      >
        {/* Plain <img>: source is already a sized JPEG, Next.js optimizer
            can't handle a 1280×4000 aspect cleanly and returns 400. */}
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
          animation: msr-page-scroll 42s ease-in-out infinite alternate;
        }
        .msr-page-track[data-paused],
        .msr-page-track[data-reduced] {
          animation: none;
        }
        @keyframes msr-page-scroll {
          /*
           * Track's height is determined by aspectRatio (1280/4000 of width).
           * Translating by translateY(calc(<container-height> - 100%)) is the goal,
           * but we don't know container height in CSS. Instead, we use the fact that
           * the container is aspectRatio 16/10 — its height is 62.5% of width.
           * Track height = 100% of width × (4000/1280) = 312.5% of width.
           * We need to translate up so the BOTTOM of the track lines up with the
           * BOTTOM of the container at the end of the animation.
           *   shift = trackHeight - containerHeight
           *         = 312.5%-of-W − 62.5%-of-W
           *         = 250%-of-W
           * Converted to % of TRACK height: 250 / 312.5 = 80%.
           */
          from { transform: translateY(0); }
          to   { transform: translateY(-80%); }
        }
      `}</style>
    </div>
  );
}
