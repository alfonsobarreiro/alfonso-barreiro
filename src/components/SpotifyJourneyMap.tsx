"use client";

import { useState } from "react";
import Image from "next/image";

const c = {
  ink:         "#252B28",
  body:        "#3D4440",
  muted:       "#8A8680",
  accent:      "#C17F4A",
  bg:          "#F5F5F4",
  bgSection:   "#EBEBEA",
  surface:     "#FFFFFF",
  border:      "#E8E4DE",
  borderStrong:"#C9BFB0",
  green:       "#1DB954",
};

const font = {
  display: "var(--font-dm-serif-display), Georgia, serif",
  sans:    "var(--font-dm-sans), -apple-system, sans-serif",
};

export default function SpotifyJourneyMap() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        background:   c.bgSection,
        borderTop:    `1px solid ${c.border}`,
        borderBottom: `1px solid ${c.border}`,
        padding:      "64px clamp(24px, 5vw, 80px)",
        marginTop:    "48px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* ── Eyebrow ── */}
        <p
          style={{
            fontFamily:    font.sans,
            fontSize:      "11px",
            fontWeight:    600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color:         c.muted,
            margin:        "0 0 32px",
          }}
        >
          User Journey Map
        </p>

        {/* ── Two-column: slice + insight ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 "clamp(32px, 5vw, 64px)",
            alignItems:          "center",
          }}
          className="cs-journey-grid"
        >
          {/* Left — cropped slice with fade-right gradient */}
          <div
            style={{
              position:   "relative",
              overflow:   "hidden",
              border:     `1px solid ${c.borderStrong}`,
              cursor:     "pointer",
              flexShrink: 0,
            }}
            onClick={() => setExpanded((v) => !v)}
            role="button"
            aria-label={expanded ? "Collapse full journey map" : "Expand full journey map"}
            title={expanded ? "Collapse" : "View full map"}
          >
            {/* Slice image — left 44% of the full 7-stage map */}
            <Image
              src="/images/work/spotify/spotify-journey-slice.webp"
              alt="User Journey Map preview — Stages 1–3 of Ranger Dave's flow: Launch & Landing, Scan Recents, Choose Action"
              width={1700}
              height={2160}
              style={{ width: "100%", height: "auto", display: "block" }}
            />

            {/* Right-edge fade to signal more content */}
            <div
              style={{
                position:   "absolute",
                top:        0,
                right:      0,
                bottom:     0,
                width:      "100px",
                background: `linear-gradient(to right, transparent, ${c.bgSection})`,
                pointerEvents: "none",
              }}
            />

            {/* "Stages 1–3 of 7" label */}
            <div
              style={{
                position:   "absolute",
                bottom:     "14px",
                left:       "14px",
                padding:    "4px 10px",
                background: "rgba(37,43,40,0.75)",
                backdropFilter: "blur(4px)",
              }}
            >
              <span
                style={{
                  fontFamily:    font.sans,
                  fontSize:      "10px",
                  fontWeight:    600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color:         "#F5F5F4",
                }}
              >
                Stages 1–3 of 7
              </span>
            </div>
          </div>

          {/* Right — insight text */}
          <div>
            <h3
              style={{
                fontFamily:    font.display,
                fontSize:      "clamp(24px, 3vw, 38px)",
                fontWeight:    400,
                color:         c.ink,
                margin:        "0 0 20px",
                letterSpacing: "-0.025em",
                lineHeight:    1.15,
              }}
            >
              The gap between seeing a control and trusting it.
            </h3>
            <p
              style={{
                fontFamily: font.sans,
                fontSize:   "clamp(15px, 1.8vw, 17px)",
                lineHeight: 1.7,
                color:      c.body,
                margin:     "0 0 32px",
              }}
            >
              Mapping Ranger Dave&rsquo;s 7-stage journey surfaced the highest-friction moment: Stage 3 to Stage 4 — from spotting a long-press affordance to committing to an action. No visual cue that the gesture existed. The shelf gave no signal that anything was interactive. That gap drove the decision to design for immediate discoverability, not power-user access patterns.
            </p>

            <button
              onClick={() => setExpanded((v) => !v)}
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            "10px",
                padding:        "11px 22px",
                background:     "transparent",
                border:         `1px solid ${c.borderStrong}`,
                cursor:         "pointer",
                fontFamily:     font.sans,
                fontSize:       "13px",
                fontWeight:     500,
                letterSpacing:  "0.06em",
                color:          c.ink,
                transition:     "background 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = c.surface;
                (e.currentTarget as HTMLButtonElement).style.borderColor = c.ink;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.borderColor = c.borderStrong;
              }}
            >
              {expanded ? "Collapse map" : "View full map"}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                style={{
                  transform:  expanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              >
                <path
                  d="M2 5L7 10L12 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Full map (expanded) ── */}
        <div
          style={{
            overflow:   "hidden",
            maxHeight:  expanded ? "1200px" : "0",
            opacity:    expanded ? 1 : 0,
            transition: "max-height 0.45s ease, opacity 0.3s ease",
            marginTop:  expanded ? "40px" : "0",
          }}
        >
          <div
            className="cs-journey-scroll"
            style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", border: `1px solid ${c.border}` }}
          >
            <Image
              src="/images/work/spotify/spotify-journey-map.webp"
              alt="Full User Journey Map — Ranger Dave's 7-stage flow: Launch & Landing, Scan Recents, Choose Action, Apply Control, Confirm / Undo, Post-Action Review, Validate Change"
              width={1920}
              height={1080}
              style={{ width: "100%", minWidth: "900px", height: "auto", display: "block" }}
            />
          </div>
          <p
            style={{
              fontFamily: font.sans,
              fontSize:   "13px",
              color:      c.muted,
              marginTop:  "12px",
              textAlign:  "center",
            }}
          >
            Ranger Dave&rsquo;s full 7-stage journey — goals, actions, pain points, and design opportunities mapped end-to-end.
          </p>
        </div>

      </div>

      {/* Mobile responsive override */}
      <style>{`
        @media (max-width: 640px) {
          .cs-journey-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
