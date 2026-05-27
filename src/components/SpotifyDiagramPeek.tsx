"use client";

import { useEffect, useState } from "react";

/**
 * SpotifyDiagramPeek
 * ─────────────────────────────────────────────────────────────────────────────
 * Spotify card preview on /#work. Stays zoomed in on the Pause state flow
 * diagram so the node labels are legible at thumb size, and runs a soft
 * horizontal pan so the eye sees the full graph across one calm cycle.
 *
 * Zoom level stays constant (scale 1.75) — no zoom in/out. Pan eases left
 * to right and back, ~22s per round trip, on `alternate` so the motion is
 * symmetric and never feels like a snap-back.
 *
 * Uses a plain <img> tag (no Next/Image, no CSS background-image) for the
 * highest-fidelity render path. Pan is driven by GPU-accelerated transform
 * with `will-change: transform`.
 *
 * Respects prefers-reduced-motion — freezes at the centered pan position
 * (still informative as a still).
 */

export default function SpotifyDiagramPeek() {
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
      aria-label="Pause state flow diagram: entry, long-press, action sheet, toggle pause, shelf state changes, snackbar feedback, auto-resume and error retry branches"
      style={{
        position:        "relative",
        width:           "100%",
        aspectRatio:     "16 / 10",
        overflow:        "hidden",
        backgroundColor: "#0F0F0F",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cs-spotify-preview.png"
        alt=""
        decoding="async"
        loading="lazy"
        className="sdp-img"
        data-stopped={reduced || undefined}
        style={{
          width:      "110%",
          height:     "auto",
          display:    "block",
          maxWidth:   "none",
          flexShrink: 0,
        }}
      />

      <style>{`
        .sdp-img {
          transform-origin: center center;
          will-change: transform;
          backface-visibility: hidden;
          /* Soft pan, constant zoom — eye reads labels at thumb size. */
          animation: sdp-pan 22s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate;
        }
        .sdp-img[data-stopped] {
          animation: none;
          transform: scale(1.75) translateX(0);
        }
        @keyframes sdp-pan {
          from { transform: scale(1.75) translateX(-8%); }
          to   { transform: scale(1.75) translateX(8%); }
        }
      `}</style>
    </div>
  );
}
