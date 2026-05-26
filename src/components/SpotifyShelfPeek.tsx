"use client";

import { useEffect, useState } from "react";

/**
 * SpotifyShelfPeek
 * ─────────────────────────────────────────────────────────────────────────────
 * Animated preview for the Spotify card on /#work. Sibling to MSRPagePeek
 * and WayfarerGlobePeek so all three Work cards carry a live treatment.
 *
 * The action sheet slides up over a dimmed Recently Played shelf to reveal
 * the three reversible controls (Pin · Remove · Pause). Calmer than the
 * homepage hero animation — meant to read as ambient, not as a featured
 * prototype.
 *
 * Layout:
 *   Outer container is 16:10 (card aspect). Filled with dark Spotify ink.
 *   The phone-portrait shelf is centered horizontally with its natural
 *   aspect, never stretched. Animation layers are scoped to the phone.
 *
 * 9-second loop, ease-in-out:
 *   0.0 – 1.4s   Shelf at rest
 *   1.4 – 2.5s   Overlay fades in, tray slides up
 *   2.5 – 6.3s   Tray held, three controls visible
 *   6.3 – 7.5s   Tray slides back down, overlay fades
 *   7.5 – 9.0s   Calm pause before next loop
 *
 * Respects prefers-reduced-motion: holds the tray open (informative still).
 * Pauses on hover via `paused` prop.
 */

export default function SpotifyShelfPeek({ paused = false }: { paused?: boolean }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const stopped = paused || reduced;

  return (
    <div
      role="img"
      aria-label="Spotify Recently Played shelf with the action sheet open, three reversible controls visible: Pin, Remove, Pause"
      style={{
        position:    "relative",
        width:       "100%",
        aspectRatio: "16 / 10",
        overflow:    "hidden",
        background:  "#0F0F0F",
        display:     "flex",
        alignItems:  "center",
        justifyContent: "center",
      }}
    >
      {/* Spotify-green accent strip at the top */}
      <div style={{
        position:   "absolute",
        top:        0,
        left:       0,
        right:      0,
        height:     "3px",
        background: "#1ED760",
        zIndex:     10,
      }} />

      {/* Phone-portrait container — centered, never stretched */}
      <div
        className="ssp-phone"
        style={{
          position:    "relative",
          height:      "92%",
          aspectRatio: "390 / 844",
          overflow:    "hidden",
          background:  "#0F0F0F",
        }}
      >
        {/* Shelf background — long-press state with highlighted tile baked in */}
        <img
          src="/images/work/spotify/spotify-background-action.webp"
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            position:       "absolute",
            inset:          0,
            width:          "100%",
            height:         "100%",
            objectFit:      "cover",
            objectPosition: "center top",
            display:        "block",
          }}
        />

        {/* Dim overlay */}
        <div
          className="ssp-overlay"
          data-stopped={stopped || undefined}
          style={{
            position:   "absolute",
            inset:      0,
            background: "rgba(0,0,0,0.55)",
          }}
        />

        {/* Action sheet tray */}
        <img
          src="/images/work/spotify/spotify-action-sheet.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="ssp-tray"
          data-stopped={stopped || undefined}
          style={{
            position:  "absolute",
            left:      "50%",
            bottom:    "0",
            width:     "min(420px, 92%)",
            maxHeight: "78%",
            objectFit: "contain",
            display:   "block",
          }}
        />
      </div>

      <style>{`
        .ssp-overlay {
          opacity: 0;
          animation: ssp-overlay 9s ease-in-out infinite;
        }
        .ssp-tray {
          transform: translate(-50%, 100%);
          animation: ssp-tray 9s ease-in-out infinite;
        }
        .ssp-overlay[data-stopped] {
          animation: none;
          opacity: 1;
        }
        .ssp-tray[data-stopped] {
          animation: none;
          transform: translate(-50%, 0%);
        }

        @keyframes ssp-overlay {
          0%, 15%   { opacity: 0; }
          28%, 70%  { opacity: 1; }
          83%, 100% { opacity: 0; }
        }
        @keyframes ssp-tray {
          0%, 15%   { transform: translate(-50%, 100%); }
          28%, 70%  { transform: translate(-50%, 0%); }
          83%, 100% { transform: translate(-50%, 100%); }
        }
      `}</style>
    </div>
  );
}
