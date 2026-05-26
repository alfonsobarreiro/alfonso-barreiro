"use client";

import { useEffect, useState } from "react";

/**
 * SpotifyDiagramPeek
 * ─────────────────────────────────────────────────────────────────────────────
 * Spotify card preview on /#work. Slow zoom-out reveal of the Pause state
 * flow diagram. Starts tight on the center, eases out to show the full graph,
 * holds, then quietly resets.
 *
 * Uses a plain <img> tag (no Next/Image, no CSS background-image) for the
 * highest-fidelity render path. Animation is driven by transform: scale
 * (GPU-accelerated) on top of a base width: 110% so the end state shows
 * almost the entire diagram.
 *
 * 16-second loop: 0–65% zoom out, 65–85% hold at the wide view, 85–100% ease
 * back in for the next cycle.
 *
 * Respects prefers-reduced-motion — freezes at the wide (zoomed-out) state.
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
          /* Custom easing for very smooth, gentle motion. */
          animation: sdp-zoom 75s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
        .sdp-img[data-stopped] {
          animation: none;
          transform: scale(1);
        }
        @keyframes sdp-zoom {
          0%        { transform: scale(2.2); }   /* zoomed in on center */
          65%, 85%  { transform: scale(1.0); }   /* full diagram, hold */
          100%      { transform: scale(2.2); }   /* ease back for next loop */
        }
      `}</style>
    </div>
  );
}
