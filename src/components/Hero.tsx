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
            /* Start the iPad page-flip animation as soon as the panel enters
               viewport. On desktop this fires at page load (already visible);
               on mobile it waits until the user scrolls down to it, so the
               full home → review → reset cycle is actually seen. */
            el.classList.add("hero-anim-active");
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
      /* Low threshold so the animation fires the moment the panel is
         meaningfully visible — the panel is taller than a phone viewport,
         so 0.4 was effectively unreachable on mobile and the iPad sequence
         never started. 0.15 fires as soon as the iPad rectangle is on
         screen. */
      { threshold: 0.15 }
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
          {/* Homepage (default visible) */}
          <img
            className="hero-ipad-home"
            src="/cs-msr-homepage.jpg"
            alt="Men's Sole Revival live site"
            style={{
              position: "absolute",
              top:      0,
              left:     0,
              width:    "100%",
              height:   "auto",
              display:  "block",
            }}
          />

          {/* Review page (revealed mid-cycle) */}
          <img
            className="hero-ipad-review"
            src="/cs-msr-review.jpeg"
            alt="Superfeet BLUE Insoles review on Men's Sole Revival"
            style={{
              position: "absolute",
              top:      0,
              left:     0,
              width:    "100%",
              height:   "auto",
              display:  "block",
              opacity:  0,
            }}
          />

          {/* Black fade — covers the full end-of-review handoff. The
              review fades out behind the black, the homepage resets and
              fades in behind the black, then the black fades away. One
              smooth opacity curve so the eye never catches a seam. */}
          <div
            className="hero-ipad-blackfade"
            aria-hidden
            style={{
              position:      "absolute",
              inset:         0,
              background:    "#000",
              opacity:       0,
              pointerEvents: "none",
              zIndex:        6,
            }}
          />

          {/* Tap indicator — a small crimson dot with an expanding ring
              that appears right before the review page reveals, so the
              recruiter reads "the user just tapped a review card" rather
              than "the screen just changed." Times to ~30 % of the 22 s
              loop, immediately before the review fade-in at 33 %. */}
          <div
            className="hero-ipad-tap"
            aria-hidden
            style={{
              position:      "absolute",
              left:          "62%",
              top:           "68%",
              width:         "30px",
              height:        "30px",
              borderRadius:  "50%",
              background:    "rgba(140, 26, 26, 0.95)",
              transform:     "translate(-50%, -50%) scale(0)",
              opacity:       0,
              pointerEvents: "none",
              zIndex:        5,
            }}
          />
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
          Featured Result · Live Since April
        </p>

        {/* Title */}
        <p
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
        </p>

        {/* Stat — the strongest number on the page reads first. */}
        <p
          style={{
            fontFamily:         "var(--font-dm-sans), sans-serif",
            fontSize:           "clamp(40px, 4.5vw, 56px)",
            lineHeight:         1,
            fontWeight:         800,
            letterSpacing:      "-0.02em",
            color:              "var(--color-brand)",
            margin:             "10px 0 4px",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {Math.round(n)}× <span style={{
            fontSize:     "13px",
            fontWeight:   500,
            letterSpacing: "0.02em",
            color:        "#5A5752",
            marginLeft:   "8px",
          }}>CTR lift on affiliate placements</span>
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

        /* Orchestrated cycle — 22s loop. No cursors. The homepage stays at
           opacity 1 for the entire active phase; the review fades in over
           it (no muddy 'fade to dark' in the middle of the crossfade), and
           the end of the review fades through a long, smooth black layer.

            0–28%   pan homepage from top to a review card (motion stop)
           28–31%  hold homepage at motion-stop
           31–33%  cross-fade review IN over homepage (home stays opacity 1)
           33–76%  pan review page top → bottom
           76–82%  hold review at bottom
           76–88%  black rises slowly (~2.6 s) — no abrupt cut
           87.5%   homepage position resets to top behind the black
           88–92%  black fades out, revealing the reset homepage
           92–100% homepage holds at top (~1.8 s before looping) */

        /* Animation runs once and freezes on the final keyframe (homepage
           at top, fully visible). Saves CPU on long sessions and stops the
           movement from dragging the eye back while the user is reading
           further down the page. */
        /* will-change kept on the base classes so the compositor is ready
           for the transform/opacity work; the actual animations only kick
           in once the IntersectionObserver in HeroResultPanel adds
           .hero-anim-active to the anchor. This is what lets mobile
           (where the iPad sits below the fold) see the full home →
           review → reset cycle instead of finding it already finished. */
        .hero-ipad-home         { will-change: transform, opacity; }
        .hero-ipad-review       { will-change: transform, opacity; }
        .hero-ipad-tap          { will-change: transform, opacity, box-shadow; }

        /* Infinite loop instead of 1-forwards. iOS Safari is reliable
           with continuously-running CSS animations but fragile with the
           single-run + freeze pattern, especially on elements that scroll
           in and out of viewport. Same 22 s cycle, just always playing.
           The homepage / review crossover stays the showcase. */
        .hero-anim-active .hero-ipad-home      { animation: hero-ipad-home      22s cubic-bezier(0.45, 0, 0.55, 1) infinite; }
        .hero-anim-active .hero-ipad-review    { animation: hero-ipad-review    22s cubic-bezier(0.45, 0, 0.55, 1) infinite; }
        .hero-anim-active .hero-ipad-blackfade { animation: hero-ipad-blackfade 22s cubic-bezier(0.45, 0, 0.55, 1) infinite; }
        .hero-anim-active .hero-ipad-tap       { animation: hero-ipad-tap       22s linear infinite; }

        @keyframes hero-ipad-tap {
          0%, 26%   { opacity: 0; transform: translate(-50%, -50%) scale(0); box-shadow: 0 0 0 0 rgba(140, 26, 26, 0.6); }
          28%       { opacity: 1; transform: translate(-50%, -50%) scale(1);    box-shadow: 0 0 0 0 rgba(140, 26, 26, 0.6); }
          30%       { opacity: 1; transform: translate(-50%, -50%) scale(0.78); box-shadow: 0 0 0 12px rgba(140, 26, 26, 0.25); }
          32%       { opacity: 0; transform: translate(-50%, -50%) scale(0.78); box-shadow: 0 0 0 28px rgba(140, 26, 26, 0);    }
          100%      { opacity: 0; transform: translate(-50%, -50%) scale(0);    box-shadow: 0 0 0 0 rgba(140, 26, 26, 0);    }
        }

        @keyframes hero-ipad-home {
          0%,  5%   { transform: translateY(0);    opacity: 1; }
          28%       { transform: translateY(-38%); opacity: 1; }
          /* Home stays opacity 1 the entire time — review covers it on top,
             so there's never a moment where both elements are partially
             transparent (which is what created the dark middle frame). */
          87.4%     { transform: translateY(-38%); opacity: 1; }
          87.5%     { transform: translateY(0);    opacity: 1; }
          100%      { transform: translateY(0);    opacity: 1; }
        }

        @keyframes hero-ipad-review {
          0%,  31%  { transform: translateY(0);    opacity: 0; }
          33%       { transform: translateY(0);    opacity: 1; }
          76%       { transform: translateY(-31%); opacity: 1; }
          82%       { transform: translateY(-31%); opacity: 1; }
          /* Disappear instantly while the black is at full opacity, so
             nobody sees the position reset on the next loop. */
          87.4%     { transform: translateY(-31%); opacity: 1; }
          87.5%     { transform: translateY(0);    opacity: 0; }
          100%      { transform: translateY(0);    opacity: 0; }
        }

        /* Black rises gently 76→88 (~2.6 s) — overlaps the last segment of
           the review pan so the bottom of the page eases into black instead
           of cutting. Holds briefly at peak, then fades out 88→92 (~0.9 s)
           revealing the reset homepage. */
        @keyframes hero-ipad-blackfade {
          0%,  76%   { opacity: 0; }
          88%        { opacity: 1; }
          92%        { opacity: 0; }
          100%       { opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-ipad-home, .hero-ipad-review, .hero-ipad-blackfade {
            animation: none;
          }
          .hero-ipad-home     { opacity: 1; transform: none; }
          .hero-ipad-review,
          .hero-ipad-blackfade { opacity: 0; }
        }
      `}</style>
    </Link>
  );
}
