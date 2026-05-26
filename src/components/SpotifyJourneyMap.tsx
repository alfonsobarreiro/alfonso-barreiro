import Image from "next/image";

const c = {
  ink:         "#252B28",
  body:        "#3D4440",
  muted:       "#8A8680",
  bgSection:   "#EBEBEA",
  surface:     "#FFFFFF",
  border:      "#A99B8A",
  borderStrong:"#7E715F",
  green:       "#1ED760",
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
      <div style={{ maxWidth: "none", margin: "0 auto" }}>

        {/* ── Eyebrow ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <span style={{ width: "24px", height: "1px", background: c.muted }} />
          <p
            style={{
              fontFamily:    font.sans,
              fontSize:      "11px",
              fontWeight:    600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color:         c.muted,
              margin:        0,
            }}
          >
            User Journey Map · Ranger Dave · 7 Stages
          </p>
        </div>

        {/* ── Full map, section width ── */}
        <div
          style={{
            position:   "relative",
            overflow:   "hidden",
            border:     `1px solid ${c.borderStrong}`,
            background: c.surface,
          }}
        >
          <Image
            src="/images/work/spotify/spotify-journey-map.webp"
            alt="Complete 7-stage User Journey Map for Ranger Dave: Launch and Landing, Scan Recents, Choose Action, Long-press to Reveal, Confirm Decision, Resolve State, and Return to Listening. Each stage notes the user's thought, feeling, and the friction point between Stages 3 and 4 where no visual cue signals that long-press is available."
            width={1920}
            height={1080}
            sizes="(max-width: 1200px) 100vw, 1200px"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* ── Insight as caption below ── */}
        <div
          style={{
            marginTop:   "32px",
            paddingTop:  "24px",
            borderTop:   `1px solid ${c.border}`,
            maxWidth:    "880px",
          }}
        >
          <h3
            style={{
              fontFamily:    font.display,
              fontSize:      "clamp(20px, 2.4vw, 28px)",
              fontWeight:    400,
              color:         c.ink,
              margin:        "0 0 12px",
              letterSpacing: "-0.02em",
              lineHeight:    1.2,
            }}
          >
            The gap between seeing a control and trusting it.
          </h3>
          <p
            style={{
              fontFamily: font.sans,
              fontSize:   "15px",
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
  );
}
