"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

/**
 * MSRPagePeek
 * ─────────────────────────────────────────────────────────────────────────────
 * Live MSR site running inside a real MacBook Pro M4 mockup (Figma-sourced
 * Apple device PNG). Replaces the CSS-built laptop with a true rendered
 * device so the home Work card reads Fantasy.co-level.
 *
 * Screen coordinates are measured against the 1:1 device PNG and given as
 * percentages so the overlay re-aligns at any container size.
 */
const IMG_W = 1280;
const IMG_H = 5474;

/* Screen area inside /devices/macbook-pro.png (1:1 mockup). */
const SCREEN = {
  topPct:    22.2,
  leftPct:   17.6,
  widthPct:  64.8,
  heightPct: 40.4,
};

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
      aria-label="Men's Sole Revival homepage on a MacBook Pro"
      style={{
        position:    "relative",
        width:       "100%",
        aspectRatio: "16 / 10",
        overflow:    "hidden",
        background:  "#252628",
        display:     "flex",
        alignItems:  "center",
        justifyContent: "center",
      }}
    >
      {/* Square device wrap: keeps the device's true 1:1 aspect so the
          measured screen percentages always line up. Sized to fit the
          shorter dimension of the 16:10 frame. */}
      <div style={{
        position:    "relative",
        height:      "100%",
        aspectRatio: "1 / 1",
        flexShrink:  0,
      }}>
        {/* Screen content — auto-scrolling site, positioned BEHIND the
            device mockup so the bezel + reflections always read on top. */}
        <div
          style={{
            position:     "absolute",
            top:          `${SCREEN.topPct}%`,
            left:         `${SCREEN.leftPct}%`,
            width:        `${SCREEN.widthPct}%`,
            height:       `${SCREEN.heightPct}%`,
            overflow:     "hidden",
            background:   "#13100C",
            zIndex:       1,
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

        {/* Device mockup PNG sits on top so bezel/notch/keys read correctly */}
        <img
          src="/devices/macbook-pro.png"
          alt=""
          style={{
            position:      "absolute",
            inset:         0,
            width:         "100%",
            height:        "100%",
            objectFit:     "contain",
            zIndex:        2,
            pointerEvents: "none",
            mixBlendMode:  "normal",
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
