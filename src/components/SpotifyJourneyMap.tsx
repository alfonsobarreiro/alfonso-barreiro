import Image from "next/image";

const c = {
  ink:         "#252B28",
  body:        "#3D4440",
  muted:       "#8A8680",
  bgSection:   "#EBEBEA",
  border:      "#E8E4DE",
  borderStrong:"#C9BFB0",
  green:       "#1DB954",
};

const font = {
  display: "var(--font-dm-serif-display), Georgia, serif",
  sans:    "var(--font-dm-sans), -apple-system, sans-serif",
};

export default function SpotifyJourneyMap() {
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
              flexShrink: 0,
            }}
          >
            <Image
              src="/images/work/spotify/spotify-journey-slice.webp"
              alt="User Journey Map preview showing Stages 1 through 3 of Ranger Dave's flow: Launch and Landing, Scan Recents, Choose Action"
              width={1700}
              height={2160}
              style={{ width: "100%", height: "auto", display: "block" }}
            />

            {/* Right-edge fade to signal continuation */}
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

            {/* Stage indicator */}
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
                margin:     0,
              }}
            >
              Mapping Ranger Dave&rsquo;s 7-stage journey surfaced the highest-friction moment: Stage 3 to Stage 4, from spotting a long-press affordance to committing to an action. No visual cue that the gesture existed. The shelf gave no signal that anything was interactive. That gap drove the decision to design for immediate discoverability, not power-user access patterns.
            </p>
          </div>
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
