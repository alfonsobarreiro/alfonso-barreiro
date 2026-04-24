"use client";

import SpotifyRemoveAnimation from "@/components/SpotifyRemoveAnimation";

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        minHeight:      "100vh",
        display:        "flex",
        alignItems:     "center",
        padding:        "120px clamp(32px, 6vw, 80px) 80px",
        position:       "relative",
        overflow:       "hidden",
        background:     "#FFFFFF",
      }}
    >
      <div
        className="hero-grid"
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) clamp(320px, 32vw, 440px)",
          gap: "clamp(48px, 7vw, 96px)",
          alignItems: "center",
        }}
      >
        {/* ── LEFT: intro copy ─────────────────────────────── */}
        <div style={{ maxWidth: "560px" }}>

          {/* Eyebrow */}
          <div
            style={{
              display:      "flex",
              alignItems:   "center",
              gap:          "14px",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                display:    "inline-block",
                width:      "32px",
                height:     "1px",
                background: "#C17F4A",
                flexShrink: 0,
              }}
            />
            <p
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "13px",
                fontWeight:    500,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color:         "#3D4440",
                margin:        0,
              }}
            >
              UX / UI Designer · Investigate. Decide. Ship.
            </p>
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "clamp(48px, 7.5vw, 96px)",
              fontWeight:    500,
              lineHeight:    0.95,
              letterSpacing: "-0.025em",
              color:         "#252B28",
              margin:        "0 0 36px",
            }}
          >
            Alfonso
            <br />
            <span style={{ color: "#C17F4A" }}>Barreiro</span>
          </h1>

          {/* Supporting statement */}
          <p
            style={{
              fontFamily:   "var(--font-dm-sans), sans-serif",
              fontSize:     "clamp(16px, 1.7vw, 19px)",
              lineHeight:   1.65,
              color:        "#8A8680",
              maxWidth:     "480px",
              marginBottom: "44px",
              fontWeight:   400,
            }}
          >
            The gap between what a product does and what users actually need
            is where the design work lives. I frame it, map the trade-offs,
            and ship the simplest thing that closes it — sometimes by
            cutting features, not adding them.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <a
              href="#work"
              style={{
                padding:       "14px 32px",
                background:    "#252B28",
                color:         "#F5F5F4",
                borderRadius:  "8px",
                fontSize:      "14px",
                fontWeight:    500,
                fontFamily:    "var(--font-dm-sans), sans-serif",
                letterSpacing: "0.03em",
                display:       "inline-flex",
                alignItems:    "center",
                transition:    "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              View Work
            </a>
            <a
              href="/contact"
              style={{
                padding:        "14px 32px",
                background:     "transparent",
                color:          "#3D4440",
                border:         "1px solid #C9BFB0",
                borderRadius:   "8px",
                fontSize:       "14px",
                fontWeight:     400,
                fontFamily:     "var(--font-dm-sans), sans-serif",
                display:        "inline-flex",
                alignItems:     "center",
                cursor:         "pointer",
                textDecoration: "none",
                transition:     "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#8A8680";
                e.currentTarget.style.color       = "#252B28";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#C9BFB0";
                e.currentTarget.style.color       = "#3D4440";
              }}
            >
              Say hello
            </a>
          </div>
        </div>

        {/* ── RIGHT: live prototype + title + CTA ──────────── */}
        <div
          className="hero-featured"
          style={{
            display:         "flex",
            flexDirection:   "column",
            alignItems:      "center",
            gap:             "24px",
            width:           "100%",
            justifySelf:     "center",
          }}
        >
          {/* Animation — bare variant, no phone chrome */}
          <SpotifyRemoveAnimation variant="bare" />

          {/* Tease caption — one line, no annotations */}
          <p
            style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "12px",
              lineHeight:    1.5,
              color:         "rgba(37, 43, 40, 0.55)",
              textAlign:     "center",
              maxWidth:      "280px",
              margin:        "-8px 0 0",
              letterSpacing: "0.01em",
            }}
          >
            Long-press to pin, pause, or remove. One surface, reversible.
          </p>

          {/* Title + CTA */}
          <div style={{ textAlign: "center", maxWidth: "280px" }}>
            <p
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "11px",
                fontWeight:    700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color:         "#C17F4A",
                margin:        "0 0 8px",
              }}
            >
              Featured prototype
            </p>
            <h2
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "clamp(18px, 2vw, 22px)",
                fontWeight:    600,
                lineHeight:    1.25,
                letterSpacing: "-0.01em",
                color:         "#252B28",
                margin:        "0 0 16px",
              }}
            >
              Spotify · Recently Played Controls
            </h2>
            <a
              href="/work/spotify"
              className="hero-featured-cta"
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            "8px",
                color:          "#C17F4A",
                fontSize:       "12px",
                fontWeight:     600,
                fontFamily:     "var(--font-dm-sans), sans-serif",
                letterSpacing:  "0.08em",
                textTransform:  "uppercase",
                textDecoration: "none",
                opacity:        0.85,
                transition:     "opacity 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
                const arrow = e.currentTarget.querySelector("svg");
                if (arrow) arrow.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.85";
                const arrow = e.currentTarget.querySelector("svg");
                if (arrow) arrow.style.transform = "translateX(0)";
              }}
            >
              View case study
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden style={{ transition: "transform 0.25s ease" }}>
                <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="scroll-hint"
        style={{
          position:      "absolute",
          bottom:        "48px",
          left:          "48px",
          display:       "flex",
          alignItems:    "center",
          gap:           "10px",
          color:         "#C9BFB0",
          fontSize:      "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontFamily:    "var(--font-dm-sans), sans-serif",
        }}
      >
        <div
          style={{
            width:      "1px",
            height:     "44px",
            background: "linear-gradient(to bottom, transparent, #C9BFB0)",
          }}
        />
        Scroll
      </div>

      {/* Responsive: stack on narrow screens */}
      <style>{`
        @media (max-width: 899px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
          .hero-featured {
            justify-self: center !important;
          }
        }
        @media (max-width: 599px) {
          .hero-featured {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
