"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

/**
 * MSRPagePeek
 * ─────────────────────────────────────────────────────────────────────────────
 * MSR site auto-scrolling inside the Figma MacBook Pro 14" Space Gray mockup
 * (public/images/devices/macbook-pro-14.png).
 *
 * Layout math: the PNG is 2000×2000; the laptop's display sits at
 * (506, 650, 897, 581). The PNG renders into a 16:10 frame with object-fit
 * cover (vertical crop 187.5px each side at 1000×625 baseline), so the
 * display's frame-relative coordinates become:
 *   left   25.3 %
 *   top    22 %
 *   width  44.85 %
 *   height 46.5 %
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
      aria-label="Men's Sole Revival homepage on a MacBook Pro"
      style={{
        position:    "relative",
        width:       "100%",
        aspectRatio: "4 / 3",
        overflow:    "hidden",
      }}
    >
      {/* Display (above the device PNG) — auto-scrolls the MSR page.
          Sized to sit exactly inside the MBP screen bezel so the website
          reads as the laptop's screen, not a rectangle bleeding past it. */}
      <div
        style={{
          position:     "absolute",
          left:         "18%",
          top:          "18%",
          width:        "64%",
          height:       "60%",
          overflow:     "hidden",
          background:   "#13100C",
          borderRadius: "3px",
          zIndex:       2,
        }}
      >
        <div
          className="msr-page-track"
          data-paused={paused || undefined}
          data-reduced={reduced || undefined}
          style={{
            position:    "absolute",
            top:         0,
            left:        0,
            width:       "100%",
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

      {/* MacBook Pro chrome (below the display) — repositioned for the new
          4:3 showroom. The MBP chrome bbox inside the 2000×2000 PNG sits at
          (506, 650, 897×581). At width 139.4 % of the frame the chrome
          renders ~62.5 % wide, with even breathing left/right and top/bottom. */}
      <img
        src="/images/devices/macbook-pro-14.png"
        alt=""
        aria-hidden
        style={{
          position:      "absolute",
          left:          "-16.60%",
          top:           "-37.50%",
          width:         "139.40%",
          maxWidth:      "none",
          height:        "auto",
          pointerEvents: "none",
          zIndex:        1,
        }}
      />

      <style>{`
        /* Scroll the full MSR homepage top → bottom over ~32s, then snap
           back to the top in ~2s and loop. No "alternate" — the eye reads
           the page in one direction. */
        .msr-page-track {
          animation: msr-page-scroll 34s linear infinite;
        }
        .msr-page-track[data-paused],
        .msr-page-track[data-reduced] {
          animation: none;
        }
        @keyframes msr-page-scroll {
          0%   { transform: translateY(0);    animation-timing-function: ease-in-out; }
          94%  { transform: translateY(-65%); animation-timing-function: cubic-bezier(0.7, 0, 0.3, 1); }
          100% { transform: translateY(0);    }
        }
      `}</style>
    </div>
  );
}
