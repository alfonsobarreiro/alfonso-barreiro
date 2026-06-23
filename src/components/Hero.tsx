"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* Stagger delays for hero entrance elements */
const HERO_DELAYS = ["0s", "0.12s", "0.24s", "0.36s", "0.5s"];

/**
 * Hero
 * ─────────────────────────────────────────────────────────────────────────────
 * Lead with measurable shipped result. Right column is the live Men's Sole
 * Revival site with the 13× CTR lift overlaid. The number counts up from
 * 1 → 13 the first time the panel enters the viewport.
 *
 * Spotify Remove animation moved to the Work section's Spotify card.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Staggered fade/slide-in on mount */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const targets = section.querySelectorAll<HTMLElement>(".hero-reveal");

    /* Hero entrance: opacity + translateY + a 3% scale bloom. The scale is
       subtle enough to read as polish, not theatre — the whole hero
       "blooms forward" together as the page settles. */
    targets.forEach((el) => {
      el.style.opacity        = "0";
      el.style.transform      = "translateY(24px) scale(0.97)";
      el.style.transformOrigin = "center center";
    });

    requestAnimationFrame(() => {
      targets.forEach((el, i) => {
        const delay = HERO_DELAYS[i] || "0s";
        el.style.transition =
          `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay},` +
          ` transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}`;
      });
      requestAnimationFrame(() => {
        targets.forEach((el) => {
          el.style.opacity   = "1";
          el.style.transform = "translateY(0) scale(1)";
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
          maxWidth:            "1320px",
          margin:              "0 auto",
          width:               "100%",
          display:             "grid",
          gridTemplateColumns: "minmax(0, 1fr) clamp(380px, 40vw, 540px)",
          gap:                 "clamp(48px, 7vw, 96px)",
          alignItems:          "center",
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
                background: "var(--color-accent)",
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
              UX / UI Designer · Portland · Remote chapters since 2019
            </p>
          </div>

          {/* Name */}
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
            <span style={{ color: "var(--color-brand)", fontWeight: 500 }}>Barreiro</span>
          </h1>

          {/* Positioning */}
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
            decisions someone hasn&apos;t made yet: surfaced through research,
            made explicit, shipped to a live product. Fifteen years in design,
            four-plus remote across two chapters since 2019. The case studies
            below were built that way.
          </p>

          {/* CTAs */}
          <div className="hero-reveal hero-cta-row" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <a
              href="#work"
              style={{
                padding:       "14px 32px",
                background:    "var(--color-brand)",
                color:         "#FAFAF9",
                borderRadius:  0,
                fontSize:      "14px",
                fontWeight:    500,
                fontFamily:    "var(--font-dm-sans), sans-serif",
                letterSpacing: "0.03em",
                display:       "inline-flex",
                alignItems:    "center",
                transition:    "transform 0.25s ease",
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
                color:          "#252B28",
                border:         "1px solid #252B28",
                borderRadius:   0,
                fontSize:       "14px",
                fontWeight:     500,
                fontFamily:     "var(--font-dm-sans), sans-serif",
                display:        "inline-flex",
                alignItems:     "center",
                cursor:         "pointer",
                textDecoration: "none",
                transition:     "background 0.2s, color 0.2s, transform 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#252B28";
                e.currentTarget.style.color      = "#FAFAF9";
                e.currentTarget.style.transform  = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color      = "#252B28";
                e.currentTarget.style.transform  = "translateY(0)";
              }}
            >
              Say hello
            </a>
          </div>
        </div>

        {/* ── RIGHT: live MSR site + 13× ─────────────────────── */}
        <div className="hero-reveal" style={{ width: "100%" }}>
          <HeroResultPanel />
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
          color:         "#6E6E6A",
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
            background: "linear-gradient(to bottom, transparent, #6E6E6A)",
          }}
        />
        Scroll
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 899px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
        }
        @keyframes scrollFadeOut { to { opacity: 0; } }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Right column: live MSR site screenshot + 13× count-up overlay                */
/* ─────────────────────────────────────────────────────────────────────────── */

const COUNT_TARGET   = 13;
const COUNT_DURATION = 3800; // ms — slow enough to read every tick
const COUNT_DELAY    = 500;  // ms — let the page settle before the number starts moving

function HeroResultPanel() {
  const panelRef = useRef<HTMLAnchorElement>(null);
  const [n, setN] = useState(1);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    /* Respect reduced motion: jump straight to target */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(COUNT_TARGET);
      startedRef.current = true;
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            setTimeout(() => {
              const start = performance.now();
              const tick = (t: number) => {
                const p   = Math.min(1, (t - start) / COUNT_DURATION);
                /* ease-out-cubic — fast at first, settles into the final value */
                const e1  = 1 - Math.pow(1 - p, 3);
                const val = 1 + (COUNT_TARGET - 1) * e1;
                setN(val < COUNT_TARGET - 0.5 ? Math.round(val) : COUNT_TARGET);
                if (p < 1) requestAnimationFrame(tick);
                else setN(COUNT_TARGET);
              };
              requestAnimationFrame(tick);
            }, COUNT_DELAY);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Link
      href="/work/mens-sole-revival"
      ref={panelRef}
      aria-label="Men's Sole Revival case study — 13× CTR lift"
      className="hero-result-anchor"
      style={{
        position:    "relative",
        display:     "block",
        width:       "100%",
        aspectRatio: "4 / 5",
        overflow:    "hidden",
        background:  "#0F0F0F",
        textDecoration: "none",
        color:       "inherit",
        boxShadow:   "0 24px 60px -28px rgba(0, 0, 0, 0.35)",
        transition:  "transform 0.3s ease",
      }}
    >
      {/* Browser chrome strip */}
      <div
        style={{
          position:   "absolute",
          top:        0,
          left:       0,
          right:      0,
          height:     "28px",
          background: "#252B28",
          display:    "flex",
          alignItems: "center",
          gap:        "6px",
          padding:    "0 12px",
          zIndex:     3,
        }}
      >
        {["#FF6B5C", "#FFC65B", "#5BD17A"].map((c) => (
          <span
            key={c}
            style={{
              display:      "inline-block",
              width:        "9px",
              height:       "9px",
              borderRadius: "50%",
              background:   c,
              opacity:      0.85,
            }}
          />
        ))}
        <span
          style={{
            marginLeft:    "12px",
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "10px",
            letterSpacing: "0.08em",
            color:         "#8A8680",
          }}
        >
          menssolerevival.com
        </span>
      </div>

      {/* Screen capture */}
      <img
        src="/cs-msr-homepage.jpg"
        alt="Men's Sole Revival live site"
        style={{
          position:       "absolute",
          top:            "28px",
          left:           0,
          width:          "100%",
          height:         "calc(100% - 28px)",
          objectFit:      "cover",
          objectPosition: "top center",
          display:        "block",
        }}
      />

      {/* Balanced gradient: top third lets the MSR screenshot read as a
          real shipping product, lower two thirds darkens enough that the
          overlay text holds without making the whole panel a black slab.
          Tuned to land between "site shows through" and "label collides
          with FIX YOUR FEET." */}
      <div
        style={{
          position:   "absolute",
          top:        "28px",
          left:       0,
          right:      0,
          bottom:     0,
          background:
            "linear-gradient(to bottom," +
            " rgba(15,15,15,0.06) 0%," +
            " rgba(15,15,15,0.22) 28%," +
            " rgba(15,15,15,0.70) 44%," +
            " rgba(15,15,15,0.88) 72%," +
            " rgba(15,15,15,0.96) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Top-right "Featured case study · 2026" label — pulled out of the
          bottom-left stack so it stops fighting the MSR site's own
          "FIX YOUR FEET" headline. Mint teal on a near-opaque dark chip so
          the label reads cleanly against any background pixel underneath. */}
      <p
        style={{
          position:      "absolute",
          top:           "clamp(68px, 5vw + 20px, 84px)",
          right:         "clamp(20px, 3vw, 36px)",
          zIndex:        3,
          fontFamily:    "var(--font-dm-sans), sans-serif",
          fontSize:      "11px",
          fontWeight:    700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color:         "#FAFAF9",
          background:    "rgba(15,15,15,0.88)",
          padding:       "9px 14px",
          margin:        0,
          textAlign:     "right",
        }}
      >
        Featured case study · 2026
      </p>

      {/* Stat + case-study identity overlay (bottom-left) */}
      <div
        style={{
          position:  "absolute",
          left:      "clamp(20px, 3vw, 36px)",
          right:     "clamp(20px, 3vw, 36px)",
          bottom:    "clamp(24px, 4vw, 40px)",
          color:     "#FAFAF9",
          zIndex:    2,
        }}
      >
        <p
          style={{
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "clamp(22px, 2.2vw, 28px)",
            fontWeight:    600,
            lineHeight:    1.15,
            letterSpacing: "-0.015em",
            color:         "#FAFAF9",
            margin:        "0 0 18px",
          }}
        >
          Men&apos;s Sole Revival
        </p>

        {/* The number — animated count-up */}
        <p
          style={{
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "clamp(88px, 10vw, 140px)",
            fontWeight:    300,
            lineHeight:    0.85,
            letterSpacing: "-0.05em",
            color:         "#FAFAF9",
            margin:        "0 0 10px",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {Math.round(n)}<span style={{ fontWeight: 200, opacity: 0.75 }}>×</span>
        </p>

        {/* What the number means */}
        <p
          style={{
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "15px",
            lineHeight:    1.5,
            fontWeight:    500,
            color:         "#FAFAF9",
            margin:        "0 0 18px",
            maxWidth:      "380px",
          }}
        >
          Click-through lift on affiliate placements after pivoting from
          e-commerce to editorial. Live, measured, real users.
        </p>

        {/* CTA — primary-styled inline button, no longer a tiny eyebrow link */}
        <span
          className="hero-result-cta"
          style={{
            display:         "inline-flex",
            alignItems:      "center",
            gap:             "10px",
            color:           "#FAFAF9",
            fontSize:        "13px",
            fontWeight:      600,
            fontFamily:      "var(--font-dm-sans), sans-serif",
            letterSpacing:   "0.05em",
            padding:         "12px 18px",
            background:      "var(--color-brand)",
            transition:      "transform 0.25s ease, background 0.25s ease",
          }}
        >
          View case study
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>

      <style>{`
        .hero-result-anchor:hover { transform: translateY(-3px); }
        .hero-result-anchor:hover .hero-result-cta { transform: translateX(4px); }
      `}</style>
    </Link>
  );
}
