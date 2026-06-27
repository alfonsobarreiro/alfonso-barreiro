"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useRef } from "react";

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
        minHeight:      "auto",
        display:        "flex",
        alignItems:     "center",
        padding:        "96px clamp(32px, 6vw, 80px) 56px",
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
          gridTemplateAreas:   `"text ipad" "ctas ipad"`,
          columnGap:           "clamp(48px, 7vw, 96px)",
          rowGap:              "clamp(28px, 3vw, 44px)",
          alignItems:          "start",
        }}
      >
        {/* ── LEFT TOP: intro copy ─────────────────────────── */}
        <div className="hero-text-col" style={{ gridArea: "text", maxWidth: "560px" }}>

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
                color:         "#2F3531",
                margin:        0,
              }}
            >
              UX / UI Designer · Portland
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
              color:        "#2F3531",
              maxWidth:     "480px",
              marginBottom: "44px",
              fontWeight:   400,
            }}
          >
            Most design problems aren&apos;t visual problems. They&apos;re
            decisions someone hasn&apos;t made yet: surfaced through
            research, made explicit, shipped to a live product.
          </p>
        </div>

        {/* ── LEFT BOTTOM: CTAs (own grid item so mobile can reorder it after the iPad) ── */}
        <div className="hero-reveal hero-cta-row" style={{ gridArea: "ctas", display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <a
              href="#work"
              className="on-crimson"
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

        {/* ── RIGHT: live MSR site + 13× ─────────────────────── */}
        <div className="hero-reveal" style={{ gridArea: "ipad", width: "100%" }}>
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
        /* Reduced motion — honor the OS pref on the CTA hover lifts.
           The inline onMouseEnter still sets transform, but this
           !important rule overrides it so reduced-motion users don't
           get the bounce. */
        @media (prefers-reduced-motion: reduce) {
          .hero-cta-row > a {
            transition: none !important;
          }
          .hero-cta-row > a:hover {
            transform: none !important;
          }
        }
        @media (max-width: 899px) {
          .hero-section {
            padding: 56px clamp(24px, 5vw, 48px) 40px !important;
            min-height: auto !important;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
            grid-template-areas: "text" "ipad" "ctas" !important;
            column-gap: 0 !important;
            row-gap: 28px !important;
          }
          .hero-text-col {
            max-width: 100% !important;
          }
          /* H1 + positioning paragraph margins eat too much vertical room
             at mobile widths. Tighten without touching the typography
             scale itself. */
          .hero-text-col h1 { margin-bottom: 20px !important; }
          .hero-text-col p  { margin-bottom: 0 !important; }
          /* Scroll hint overlaps the CTAs on mobile and the gesture is
             already obvious on a phone. Hide it. */
          .scroll-hint { display: none !important; }
        }
        @keyframes scrollFadeOut { to { opacity: 0; } }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Right column: live MSR site screenshot + 13× count-up overlay                */
/* ─────────────────────────────────────────────────────────────────────────── */

const COUNT_TARGET = 13;

function HeroResultPanel() {
  const panelRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  /* Count-up animation removed — the number now lands at 13 directly.
     Was a nice flourish on desktop but read as a distraction on mobile
     where the panel is below the fold. */
  const n = COUNT_TARGET;

  /* WCAG 2.2.2 Pause, Stop, Hide. The walkthrough video autoplays for
     ~22s per loop. Cap it at 2 loops so motion stops after ~44s
     instead of running forever. Pause when scrolled out of viewport
     so the motion doesn't burn battery off-screen either. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let loops = 0;
    const onEnded = () => {
      loops += 1;
      if (loops >= 2) {
        v.pause();
        v.removeAttribute("loop");
      }
    };
    v.addEventListener("ended", onEnded);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) v.pause();
      else if (loops < 2) v.play().catch(() => { /* ignored */ });
    }, { threshold: 0.1 });
    io.observe(v);
    return () => {
      v.removeEventListener("ended", onEnded);
      io.disconnect();
    };
  }, []);

  return (
    <Link
      href="/work/mens-sole-revival"
      ref={panelRef}
      aria-label="Men's Sole Revival case study — 13× CTR lift"
      className="hero-result-anchor"
      style={{
        display:        "flex",
        flexDirection:  "column",
        gap:            "clamp(24px, 2.8vw, 32px)",
        textDecoration: "none",
        color:          "inherit",
      }}
    >
      {/* iPad — Figma iPad Pro 12.9 Space Gray PNG (transparent BG) with
          live MSR content overlaid at the screen rectangle. PNG is sized
          122.81 % of panel width and offset so the iPad body fills the
          panel with a visible chrome margin around it. The iPad screen
          sits at (17.16 %, 14.36 %, 65.72 %, 70.22 %) of the 4:5 panel.

          A `.hero-ipad-tilt` wrapper carries a slow Z-axis rotation
          (~-1 → +1 deg, 14 s ease-in-out) so the device gently sways. The
          tilt wrapper is separate from the hover transform on .hero-ipad
          so they don't fight each other. */}
      <div
        className="hero-ipad-tilt"
        style={{ width: "100%", position: "relative" }}
      >
<div
        className="hero-ipad"
        style={{
          position:    "relative",
          width:       "100%",
          aspectRatio: "4 / 5",
          flexShrink:  0,
          overflow:    "visible",
          transition:  "transform 0.3s ease",
        }}
      >
        {/* Screen content layer (above device PNG) */}
        <div
          className="hero-ipad-screen"
          style={{
            position:     "absolute",
            left:         "17.64%",
            top:          "12.83%",
            width:        "64.67%",
            height:       "74.27%",
            overflow:     "hidden",
            borderRadius: "1.9%",
            background:   "#0F0F0F",
            zIndex:       2,
          }}
        >
          {/* Pre-rendered walkthrough — same home → review → black-fade
              → reset sequence the CSS keyframes used to drive, but baked
              into a single 22 s loop video. Matches the SpotifyFramed
              Animation pattern (autoplay + loop + muted + playsInline)
              so iOS Safari handles it reliably. Poster image shows the
              homepage at frame 0 in case the video hasn't loaded yet. */}
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={videoRef}
            src="/cs-msr-walkthrough.webm"
            poster="/cs-msr-homepage.jpg"
            aria-label="Men's Sole Revival walkthrough. Homepage scrolls to a product review and resets."
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="hero-ipad-video"
            style={{
              position:       "absolute",
              top:            0,
              left:           0,
              width:          "100%",
              height:         "100%",
              objectFit:      "cover",
              objectPosition: "top center",
              display:        "block",
              background:     "#000",
            }}
          >
            <source src="/cs-msr-walkthrough.webm" type="video/webm" />
            <source src="/cs-msr-walkthrough.mp4" type="video/mp4" />
          </video>

        </div>

        {/* iPad Pro chrome (below the screen content) — scaled up and
            offset so the iPad body fills the panel; transparent BG so the
            page surface shows through outside the device. */}
        <img
          src="/images/devices/ipad-pro.webp"
          alt=""
          aria-hidden
          style={{
            position:      "absolute",
            left:          "-23.91%",
            top:           "-9.29%",
            width:         "148.08%",
            maxWidth:      "none",
            height:        "auto",
            pointerEvents: "none",
            zIndex:        1,
          }}
        />
      </div>
      </div>

      {/* Text block — below the device, left-aligned to the iPad body's
          left edge (~14 % of the panel because the PNG is scaled 122.81 %
          and offset -11.46 %). Right padding mirrors so the text block
          matches the iPad's footprint exactly. */}
      <div
        style={{
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "flex-start",
          textAlign:      "left",
          gap:            "10px",
          paddingLeft:    "14%",
          paddingRight:   "14%",
        }}
      >
        {/* Eyebrow — small uppercase label matching the editorial pattern
            used across the Work cards. Frames the stat as a feature, not
            a floating number. */}
        <p
          style={{
            fontFamily:     "var(--font-dm-sans), sans-serif",
            fontSize:       "11px",
            fontWeight:     600,
            letterSpacing:  "0.18em",
            textTransform:  "uppercase",
            color:          "#5A5752",
            margin:         "0",
          }}
        >
          Featured Result · Live Since April 2026
        </p>

        {/* Title — h2 so the featured case study is announced as a
            heading landmark to screen-reader users. */}
        <h2
          style={{
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "clamp(22px, 2.2vw, 28px)",
            fontWeight:    600,
            lineHeight:    1.15,
            letterSpacing: "-0.015em",
            color:         "#252B28",
            margin:        "8px 0 0",
          }}
        >
          Men&apos;s Sole Revival
        </h2>

        {/* Stat — the strongest number on the page reads first.
            Split into stat + descriptor lines so the "13×" doesn't
            visually dominate to the point where the descriptor reads
            as a footnote glued to the digit. */}
        <p
          style={{
            fontFamily:         "var(--font-dm-sans), sans-serif",
            fontSize:           "clamp(40px, 4.5vw, 56px)",
            lineHeight:         1,
            fontWeight:         800,
            letterSpacing:      "-0.02em",
            color:              "var(--color-brand)",
            margin:             "10px 0 0",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {Math.round(n)}×
        </p>
        <p
          style={{
            fontFamily:     "var(--font-dm-sans), sans-serif",
            fontSize:       "clamp(14px, 1.2vw, 15px)",
            fontWeight:     500,
            lineHeight:     1.4,
            letterSpacing:  "0.01em",
            color:          "#3D4440",
            margin:         "8px 0 0",
            maxWidth:       "260px",
          }}
        >
          CTR lift on affiliate placements
        </p>

        {/* CTA */}
        <span
          className="hero-result-cta"
          style={{
            display:       "inline-flex",
            alignItems:    "center",
            gap:           "8px",
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "13px",
            fontWeight:    600,
            letterSpacing: "0.04em",
            color:         "var(--color-brand)",
            marginTop:     "12px",
            transition:    "transform 0.25s ease",
          }}
        >
          View case study
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>

      <style>{`
        .hero-result-anchor:hover .hero-ipad       { transform: translateY(-3px); }
        .hero-result-anchor:hover .hero-result-cta { transform: translateX(4px); }

        /* Tilt removed. The wrapper stays as a passthrough so the JSX
           structure doesn't need to change. */
        .hero-ipad-tilt { /* no transform */ }

        /* The home → review → black-fade → reset sequence used to be four
           chained CSS animations driven by keyframes. It now lives in
           /public/cs-msr-walkthrough.{webm,mp4} as a baked 22 s video
           loop, the same pattern SpotifyFramedAnimation uses for iOS
           reliability. Reduced motion is handled by the video element
           pausing itself when the user prefers no motion. */
        @media (prefers-reduced-motion: reduce) {
          .hero-ipad-screen video {
            display: none;
          }
          .hero-ipad-screen {
            background-image: url("/cs-msr-homepage.jpg");
            background-size: 100% auto;
            background-position: top center;
            background-repeat: no-repeat;
            background-color: #000;
          }
        }
      `}</style>
    </Link>
  );
}
