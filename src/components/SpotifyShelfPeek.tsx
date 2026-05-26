"use client";

import { useEffect, useState } from "react";

/**
 * SpotifyShelfPeek
 * ─────────────────────────────────────────────────────────────────────────────
 * Animated preview component for the Spotify featured card on /#work. Mirrors
 * the MSRPagePeek / WayfarerGlobePeek pattern so all three Work cards carry a
 * live treatment instead of a static image.
 *
 * Shows a different moment than the homepage hero's Remove + Undo animation:
 * the action sheet sliding up over a dimmed shelf to reveal the three
 * reversible controls (Pin · Remove · Pause). Calmer, ambient — meant to read
 * as a stable preview, not a featured prototype.
 *
 * 9-second loop, ease-in-out:
 *   0.0 – 1.4s   Shelf at rest (long-press indicated via highlighted tile in
 *                the background asset)
 *   1.4 – 2.5s   Overlay fades in, tray slides up
 *   2.5 – 6.3s   Tray held, three controls visible
 *   6.3 – 7.5s   Tray slides back down, overlay fades
 *   7.5 – 9.0s   Calm pause before next loop
 *
 * Respects prefers-reduced-motion: holds the tray open (informative still).
 * Pauses on hover when the card receives the `paused` prop.
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
        position:   "relative",
        width:      "100%",
        height:     "100%",
        overflow:   "hidden",
        background: "#0F0F0F",
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
          width:     "min(420px, 78%)",
          maxHeight: "70%",
          objectFit: "contain",
          display:   "block",
        }}
      />

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
