"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

/**
 * MSRPagePeek
 * ─────────────────────────────────────────────────────────────────────────────
 * The live Men's Sole Revival site, presented inside a clean laptop frame
 * (lid + screen + suggested base). Replaces the previous browser-window
 * treatment so the home Work card reads as "real product on real device"
 * the way Fantasy.co's case-study tiles do.
 *
 * The site image (1280 × 5474) auto-scrolls vertically inside the screen
 * area to suggest the full site, paused on hover and on prefers-reduced-motion.
 *
 * Pure CSS chrome — no SVG required. Bezel + base are flat rects with
 * gentle gradients for material.
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
      aria-label="Men's Sole Revival homepage on a laptop"
      className="msr-laptop-root"
      style={{
        position:    "relative",
        width:       "100%",
        aspectRatio: "16 / 10",
        overflow:    "hidden",
        background:  "linear-gradient(180deg, #2A2A2C 0%, #1C1C1E 100%)",
        display:     "flex",
        flexDirection: "column",
        alignItems:  "center",
        justifyContent: "flex-start",
        padding:     "5% 8% 0",
      }}
    >
      {/* Laptop lid: a slim black bezel wrapping the screen */}
      <div
        className="msr-laptop-lid"
        style={{
          position:     "relative",
          width:        "100%",
          flex:         "1 1 auto",
          background:   "#0A0A0A",
          padding:      "10px 10px 14px",
          borderRadius: "10px 10px 4px 4px",
          boxShadow:    "0 0 0 1px #1F1F1F, 0 18px 40px -16px rgba(0, 0, 0, 0.55)",
        }}
      >
        {/* Top bezel camera hint */}
        <div
          aria-hidden
          style={{
            position:     "absolute",
            top:          4,
            left:         "50%",
            transform:    "translateX(-50%)",
            width:        4,
            height:       4,
            borderRadius: "50%",
            background:   "#1F1F1F",
            boxShadow:    "inset 0 0 0 1px #2A2A2A",
          }}
        />

        {/* Screen — the actual MSR site content */}
        <div
          style={{
            position:     "relative",
            width:        "100%",
            height:       "100%",
            overflow:     "hidden",
            background:   "#13100C",
            borderRadius: "2px",
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
        </div>
      </div>

      {/* Laptop base: a curved trapezoid suggesting the keyboard deck.
          Sits flush under the lid with a hint of the hinge. */}
      <div
        aria-hidden
        className="msr-laptop-base"
        style={{
          width:        "108%",
          height:       "5%",
          marginTop:    "-1px",
          background:   "linear-gradient(180deg, #1A1A1C 0%, #0E0E10 100%)",
          borderRadius: "0 0 18px 18px",
          boxShadow:    "0 14px 28px -12px rgba(0, 0, 0, 0.55)",
          position:     "relative",
        }}
      >
        {/* Trackpad notch hint at center of base front */}
        <div
          aria-hidden
          style={{
            position:     "absolute",
            bottom:       0,
            left:         "50%",
            transform:    "translateX(-50%)",
            width:        "22%",
            height:       "3px",
            background:   "#262628",
            borderRadius: "0 0 6px 6px",
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
