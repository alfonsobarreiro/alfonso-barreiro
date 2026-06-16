"use client";

import { useEffect, useRef } from "react";
import SpotifyRemoveAnimation from "@/components/SpotifyRemoveAnimation";

/* Stagger delays for hero entrance elements */
const HERO_DELAYS = ["0s", "0.12s", "0.24s", "0.36s", "0.5s"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>(".hero-reveal");

    /* 1. Hide immediately */
    targets.forEach((el) => {
      el.style.opacity   = "0";
      el.style.transform = "translateY(24px)";
    });

    /* 2. Next frame: add transitions, then reveal with stagger */
    requestAnimationFrame(() => {
      targets.forEach((el, i) => {
        const delay = HERO_DELAYS[i] || "0s";
        el.style.transition = `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}`;
      });

      /* Small delay to ensure transitions are registered before triggering */
      requestAnimationFrame(() => {
        targets.forEach((el) => {
          el.style.opacity   = "1";
          el.style.transform = "translateY(0)";
        });
      });
    });
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
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
            className="hero-reveal"
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
                background: "#7A8B6E",
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
              UX / UI Designer · Portland, OR
            </p>
          </div>

          {/* Name — Alfonso in light weight cedes the line to Barreiro,
              which carries the brand color (aubergine) at medium weight. */}
          <h1
            className="hero-reveal"
            style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "clamp(48px, 7.5vw, 96px)",
              fontWeight:    300,
              lineHeight:    0.95,
              letterSpacing: "-0.025em",
              color:         "#252B28",
              margin:        "0 0 36px",
            }}
          >
            Alfonso
            <br />
            <span style={{ color: "#3D2645", fontWeight: 500 }}>Barreiro</span>
          </h1>

          {/* Positioning statement — lifted from /about, the sharper one-line
              value capture the homepage was missing. Replaces the previous
              "three case studies below" directory line; the visible case
              studies in the Work section now carry the directory job.
              Three-clause tail introduced with a colon (the em-dash version
              was vetoed by the site-wide voice rule). Each clause is a
              process beat: surface the problem (research), reach a clear
              answer (decision), ship to a live product. */}
          <p
            className="hero-reveal"
            style={{
              fontFamily:   "var(--font-dm-sans), sans-serif",
              fontSize:     "clamp(16px, 1.7vw, 19px)",
              lineHeight:   1.65,
              color:        "#3D4440",
              maxWidth:     "480px",
              marginBottom: "44px",
              fontWeight:   400,
            }}
          >
            Most design problems aren&apos;t visual problems. They&apos;re
            decisions someone hasn&apos;t made yet: surfaced through
            research, made explicit, shipped to a live product.
          </p>

          {/* CTAs */}
          <div className="hero-reveal hero-cta-row" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
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
                transition:    "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              View Work
            </a>
            <a
              href="/contact"
              style={{
                padding:        "14px 32px",
                background:     "transparent",
                color:          "#3D4440",
                border:         "1px solid #7E715F",
                borderRadius:   "8px",
                fontSize:       "14px",
                fontWeight:     400,
                fontFamily:     "var(--font-dm-sans), sans-serif",
                display:        "inline-flex",
                alignItems:     "center",
                cursor:         "pointer",
                textDecoration: "none",
                transition:     "border-color 0.2s, color 0.2s, transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#8A8680";
                e.currentTarget.style.color       = "#252B28";
                e.currentTarget.style.transform   = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#7E715F";
                e.currentTarget.style.color       = "#3D4440";
                e.currentTarget.style.transform   = "translateY(0)";
              }}
            >
              Say hello
            </a>
          </div>
        </div>

        {/* ── RIGHT: live prototype + title + CTA ──────────── */}
        <div
          className="hero-featured hero-reveal"
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
                color:         "#252B28",
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
                color:          "#7A8B6E",
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
        className="scroll-hint hero-reveal"
        style={{
          position:      "absolute",
          bottom:        "48px",
          left:          "48px",
          display:       "flex",
          alignItems:    "center",
          gap:           "10px",
          color:         "#7E715F",
          fontSize:      "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontFamily:    "var(--font-dm-sans), sans-serif",
          animation:     "scrollBounce 2s ease-in-out 1.2s 3, scrollFadeOut 0.5s ease-out 7.2s forwards",
        }}
      >
        <div
          style={{
            width:      "1px",
            height:     "44px",
            background: "linear-gradient(to bottom, transparent, #7E715F)",
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
        /* Scroll indicator: fade out after the 3rd bounce completes (1.2s
           delay + 3 × 2s bounce = 7.2s). Honors the restraint elsewhere on
           the page instead of leaving a static indicator parked at the
           bottom of the hero. */
        @keyframes scrollFadeOut {
          to { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
