/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";

/**
 * /prototypes/hero-options
 * ─────────────────────────────────────────────────────────────────────────────
 * Adjusted Variant A: the 13× stat layered over a screen capture of the
 * actual Men's Sole Revival site (the place where the number was earned).
 * Variants B and C dropped per user direction.
 *
 * Internal authoring only — guarded with notFound() in production.
 *
 * Compare against the live hero at /
 */

const isProd = process.env.NODE_ENV === "production";

export default function HeroOptionsPrototype() {
  if (isProd) notFound();

  return (
    <main style={{ background: "#FAFAF9", color: "#252B28", minHeight: "100vh" }}>
      <PrototypeNav />
      <VariantA />
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function PrototypeNav() {
  return (
    <header
      style={{
        position:   "sticky",
        top:        0,
        zIndex:     50,
        background: "rgba(250, 250, 249, 0.92)",
        backdropFilter: "blur(8px)",
        borderBottom:   "1px solid #E6E3DE",
        padding:    "14px 32px",
        display:    "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap:        "24px",
      }}
    >
      <p
        style={{
          fontFamily:    "var(--font-dm-sans), sans-serif",
          fontSize:      "11px",
          fontWeight:    700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color:         "#6E6E6A",
          margin:        0,
        }}
      >
        Prototype · Hero option A (v2) · Internal
      </p>
      <Link
        href="/"
        style={{
          fontFamily:    "var(--font-dm-sans), sans-serif",
          fontSize:      "11px",
          fontWeight:    600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color:         "var(--color-brand)",
          textDecoration: "none",
        }}
      >
        ← Live home (compare)
      </Link>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   VARIANT A v2 · 13× stat over the actual MSR site
   The right column now shows the live site where the number was earned, with
   the 13× and a one-line caption layered on top. Real screenshot, real result.
   ═══════════════════════════════════════════════════════════════════════════ */
function VariantA() {
  return (
    <section
      style={{
        minHeight:  "100vh",
        display:    "flex",
        alignItems: "center",
        padding:    "120px clamp(32px, 6vw, 80px) 80px",
        background: "#FFFFFF",
      }}
    >
      <div
        className="va-grid"
        style={{
          maxWidth: "1320px",
          margin:   "0 auto",
          width:    "100%",
          display:  "grid",
          gridTemplateColumns: "minmax(0, 1fr) clamp(380px, 40vw, 540px)",
          gap:      "clamp(48px, 7vw, 96px)",
          alignItems: "center",
        }}
      >
        {/* LEFT: copy block (same hero copy as live) */}
        <div style={{ maxWidth: "560px" }}>
          <Eyebrow text="UX / UI Designer · Portland · Remote chapters since 2019" />
          <HeroName />
          <HeroPositioning />
          <HeroCTAs />
        </div>

        {/* RIGHT: live MSR site screenshot + 13× overlay */}
        <Link
          href="/work/mens-sole-revival"
          className="va-anchor"
          aria-label="Men's Sole Revival case study"
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
          }}
        >
          {/* Browser chrome strip — a thin top bar with three dots so the
              screenshot reads as "a real website" without faking a full chrome */}
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

          {/* The actual screen capture — anchor top so the hero is visible */}
          <img
            src="/cs-msr-homepage.jpg"
            alt="Men's Sole Revival live site"
            style={{
              position:   "absolute",
              top:        "28px",
              left:       0,
              width:      "100%",
              height:     "calc(100% - 28px)",
              objectFit:  "cover",
              objectPosition: "top center",
              display:    "block",
            }}
          />

          {/* Dark gradient overlay — softer at the top so the screenshot reads,
              heavier at the bottom so the stat caption is legible */}
          <div
            style={{
              position:   "absolute",
              top:        "28px",
              left:       0,
              right:      0,
              bottom:     0,
              background: "linear-gradient(to bottom, rgba(15,15,15,0.05) 0%, rgba(15,15,15,0.35) 45%, rgba(15,15,15,0.85) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Stat overlay — bottom-left */}
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
                fontSize:      "11px",
                fontWeight:    700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color:         "var(--color-accent)",
                margin:        "0 0 8px",
              }}
            >
              Live result · 2026
            </p>
            <p
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "clamp(96px, 11vw, 156px)",
                fontWeight:    300,
                lineHeight:    0.85,
                letterSpacing: "-0.05em",
                color:         "#FAFAF9",
                margin:        "0 0 14px",
              }}
            >
              13<span style={{ fontWeight: 200, opacity: 0.75 }}>×</span>
            </p>
            <p
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "14px",
                lineHeight:    1.5,
                fontWeight:    500,
                color:         "#FAFAF9",
                margin:        "0 0 14px",
                maxWidth:      "360px",
              }}
            >
              Click-through lift on affiliate placements. Measured over ten
              weeks, six users, content-led editorial structure.
            </p>
            <span
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            "8px",
                color:          "var(--color-accent)",
                fontSize:       "11px",
                fontWeight:     600,
                fontFamily:     "var(--font-dm-sans), sans-serif",
                letterSpacing:  "0.14em",
                textTransform:  "uppercase",
              }}
            >
              Men&apos;s Sole Revival case study →
            </span>
          </div>
        </Link>
      </div>

      <style>{`
        @media (max-width: 899px) {
          .va-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
        }
        .va-anchor { transition: transform 0.3s ease; }
        .va-anchor:hover { transform: translateY(-3px); }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Shared sub-components                                                         */
/* ─────────────────────────────────────────────────────────────────────────── */

function Eyebrow({ text }: { text: string }) {
  return (
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
        {text}
      </p>
    </div>
  );
}

function HeroName() {
  return (
    <h1
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
  );
}

function HeroPositioning() {
  return (
    <p
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
      made explicit, shipped to a live product. Eighteen years in design,
      four-plus remote across two chapters since 2019.
    </p>
  );
}

function HeroCTAs() {
  return (
    <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
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
          textDecoration: "none",
        }}
      >
        View Work
      </a>
      <Link
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
          textDecoration: "none",
        }}
      >
        Say hello
      </Link>
    </div>
  );
}
