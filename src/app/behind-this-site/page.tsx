import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Behind this site",
  description:
    "How this site is built. The palette decision, the design system underneath it, and the stack that ships it.",
  alternates: { canonical: "https://www.barreiro.com/behind-this-site" },
  openGraph: {
    type: "website",
    url: "https://www.barreiro.com/behind-this-site",
    title: "Behind this site · Alfonso Barreiro",
    description:
      "How this site is built. The palette decision, the design system underneath it, and the stack that ships it.",
  },
};

/* Page runs on Navy #0F283D ground with Cream text (Alfonso
   2026-07-03 values-palette pivot). Same treatment as About and
   Process. */

const sectionH2: React.CSSProperties = {
  fontFamily:    "var(--font-dm-sans), sans-serif",
  fontSize:      "clamp(24px, 3vw, 36px)",
  fontWeight:    600,
  color:         "var(--color-cream)",
  margin:        "0 0 28px",
  letterSpacing: "-0.02em",
  lineHeight:    1.2,
};

const body: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize:   "17px",
  lineHeight: 1.75,
  color:      "var(--color-cream-72)",
  margin:     "0 0 20px",
  maxWidth:   "680px",
};

const sectionWrapper = (): React.CSSProperties => ({
  padding:    "96px clamp(32px, 6vw, 80px)",
  background: "var(--color-ground-navy)",
});

const innerWrapper: React.CSSProperties = {
  width:    "100%",
  maxWidth: "920px",
  margin:   "0 auto",
};

const stackRow: React.CSSProperties = {
  fontFamily:    "var(--font-dm-sans), sans-serif",
  fontSize:      "14px",
  lineHeight:    1.7,
  color:         "var(--color-cream-72)",
  margin:        "0 0 8px",
  paddingLeft:   "18px",
  position:      "relative",
};

const stackLabel: React.CSSProperties = {
  fontWeight:    600,
  color:         "var(--color-cream)",
  letterSpacing: "0.01em",
};

const tokenChip: React.CSSProperties = {
  display:       "inline-flex",
  alignItems:    "center",
  gap:           "8px",
  padding:       "6px 12px",
  border:        "1px solid var(--color-cream-48)",
  fontFamily:    "var(--font-dm-sans), sans-serif",
  fontSize:      "12px",
  fontWeight:    500,
  color:         "var(--color-cream)",
  letterSpacing: "0.02em",
};

const swatch: React.CSSProperties = {
  display:      "inline-block",
  width:        "12px",
  height:       "12px",
  borderRadius: 0,
  border:       "1px solid rgba(244, 239, 232, 0.20)",
};

/* One step in the decision chronology. Numbered label + editorial
   caption above; Figma-exported artifact below. The caption sits
   ABOVE the image so the reader knows what they're about to see
   before they see it — reads as an editorial decision log. */
function ArtifactStep({ eyebrow, heading, caption, src, width, height }: {
  eyebrow: string; heading: string; caption?: string; src: string; width: number; height: number;
}) {
  return (
    <figure className="bts-artifact" style={{ margin: 0 }}>
      <div style={{ marginBottom: "clamp(20px, 3vw, 28px)", maxWidth: "780px" }}>
        <p style={{
          fontFamily:    "var(--font-dm-sans), sans-serif",
          fontSize:      "11px",
          fontWeight:    700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color:         "var(--color-brand)",
          margin:        "0 0 14px",
        }}>
          {eyebrow}
        </p>
        <h3 style={{
          fontFamily:    "var(--font-dm-sans), sans-serif",
          fontSize:      "clamp(28px, 3.6vw, 44px)",
          fontWeight:    600,
          color:         "var(--color-cream)",
          margin:        "0 0 16px",
          letterSpacing: "-0.02em",
          lineHeight:    1.15,
        }}>
          {heading}
        </h3>
        {caption && (
          <p style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize:   "15px",
            lineHeight: 1.65,
            color:      "var(--color-cream-72)",
            margin:     0,
          }}>
            {caption}
          </p>
        )}
      </div>
      <Image
        src={src}
        alt={caption || heading}
        width={width}
        height={height}
        sizes="(max-width: 760px) 100vw, 920px"
        quality={92}
        style={{
          width:   "100%",
          height:  "auto",
          display: "block",
          border:  "1px solid var(--color-cream-48)",
        }}
      />
    </figure>
  );
}

/* ── Visual stack explainer ─────────────────────────────────────────
   Seven stack layers rendered as a grid of tiles: small SVG glyph
   top-left, uppercase label, body copy. Left rail on each tile in
   Terracotta reinforces the "layer stripe" reading. Highest layer
   (Analytics) sits top-left; lowest (Framework) bottom-right. */

type StackLayer = {
  n:      string;
  label:  string;
  body:   React.ReactNode;
  icon:   React.ReactNode;
};

const stackLayers: StackLayer[] = [
  {
    n:     "01",
    label: "Framework",
    body:  "Next.js App Router. TypeScript. Server components where they fit, client where they earn it.",
    icon:  (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 18V6L18 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 6V14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    n:     "02",
    label: "Hosting",
    body:  <><code style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: "0.9em", background: "rgba(244, 239, 232, 0.10)", padding: "1px 6px", color: "var(--color-cream)" }}>main</code> ships to barreiro.com. <code style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: "0.9em", background: "rgba(244, 239, 232, 0.10)", padding: "1px 6px", color: "var(--color-cream)" }}>staging</code> ships to staging.barreiro.com. Vercel + GitHub auto-deploy.</>,
    icon:  (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 4L21 20H3L12 4Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    n:     "03",
    label: "Design source",
    body:  "Figma. Every screen begins there and gets translated to code by hand.",
    icon:  (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="9"  cy="6"  r="3" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="15" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="9"  cy="18" r="3" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    ),
  },
  {
    n:     "04",
    label: "Typography",
    body:  "DM Sans for the interface. Lora for editorial pull quotes. Barlow Condensed for section §-headings on case studies.",
    icon:  (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <text x="4" y="18" fontFamily="var(--font-dm-sans), sans-serif" fontSize="17" fontWeight="700" fill="currentColor">Aa</text>
      </svg>
    ),
  },
  {
    n:     "05",
    label: "Motion",
    body:  "Native CSS transitions. IntersectionObserver for scroll reveals. Zero animation libraries.",
    icon:  (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 14C6 14 6 10 9 10C12 10 12 14 15 14C18 14 18 10 21 10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    n:     "06",
    label: "Content",
    body:  "Written in plain sentences under a voice profile that bans em dashes, motivational closers, and AI-tell vocabulary. Every user-facing string goes through it.",
    icon:  (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 7H19M5 12H19M5 17H14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    n:     "07",
    label: "Analytics",
    body:  "None. If you're here, you're here.",
    icon:  (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8"  stroke="currentColor" strokeWidth="1.75" />
        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
];

function StackVisual() {
  return (
    <div className="bts-stack-grid">
      {stackLayers.map((layer, i) => (
        <div key={layer.n} className={`bts-stack-tile${i === stackLayers.length - 1 ? " bts-stack-tile-wide" : ""}`}>
          <span className="bts-stack-num">{layer.n}</span>
          <span className="bts-stack-icon" aria-hidden="true">{layer.icon}</span>
          <p className="bts-stack-label">{layer.label}</p>
          <p className="bts-stack-body">{layer.body}</p>
        </div>
      ))}
      <style>{`
        .bts-stack-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .bts-stack-tile {
          position: relative;
          padding: clamp(20px, 2.6vw, 32px) clamp(20px, 2.6vw, 28px) clamp(22px, 2.6vw, 28px) clamp(28px, 3.2vw, 40px);
          background: rgba(244, 239, 232, 0.04);
          border: 1px solid rgba(244, 239, 232, 0.12);
          border-left: 3px solid var(--color-brand);
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: auto auto auto;
          column-gap: 16px;
          row-gap: 8px;
          align-items: start;
        }
        .bts-stack-num {
          grid-column: 1;
          grid-row: 1;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-brand);
          font-variant-numeric: tabular-nums;
          line-height: 1;
        }
        .bts-stack-icon {
          grid-column: 2;
          grid-row: 1 / span 2;
          width: clamp(28px, 3vw, 36px);
          height: clamp(28px, 3vw, 36px);
          color: var(--color-cream);
          opacity: 0.85;
          justify-self: end;
        }
        .bts-stack-icon svg { width: 100%; height: 100%; display: block; }
        .bts-stack-label {
          grid-column: 1;
          grid-row: 2;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: clamp(20px, 2vw, 24px);
          font-weight: 600;
          letter-spacing: -0.015em;
          line-height: 1.15;
          color: var(--color-cream);
          margin: 0;
        }
        .bts-stack-body {
          grid-column: 1 / -1;
          grid-row: 3;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: var(--color-cream-72);
          margin: 4px 0 0;
        }
        /* Layer 07 (Analytics) reads as the punchline — span both
           columns on desktop for editorial breath. */
        .bts-stack-tile-wide {
          grid-column: 1 / -1;
        }
        @media (max-width: 720px) {
          .bts-stack-grid { grid-template-columns: 1fr; }
          .bts-stack-tile-wide { grid-column: 1; }
        }
      `}</style>
    </div>
  );
}

export default function BehindThisSitePage() {
  return (
    <>
      <Nav />
      <main id="main-content" style={{ background: "var(--color-ground-navy)" }}>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section aria-label="Behind this site introduction" style={{
          padding:    "clamp(112px, 14vw, 168px) clamp(32px, 6vw, 80px) clamp(64px, 8vw, 96px)",
          background: "var(--color-ground-navy)",
        }}>
          <div style={innerWrapper}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <span style={{ display: "inline-block", width: "24px", height: "1px", background: "var(--color-brand)" }} />
              <p style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "11px",
                fontWeight:    600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color:         "var(--color-brand)",
                margin:        0,
              }}>
                Behind this site
              </p>
            </div>

            <h1 style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "clamp(36px, 5vw, 64px)",
              fontWeight:    500,
              color:         "var(--color-cream)",
              margin:        "0 0 28px",
              letterSpacing: "-0.03em",
              lineHeight:    1.05,
              maxWidth:      "820px",
            }}>
              How this site is built.
            </h1>

            <p style={{
              ...body,
              fontSize: "clamp(18px, 1.6vw, 21px)",
              maxWidth: "720px",
              margin:   0,
            }}>
              The palette decision, the design system underneath it, and the stack that ships it. Written for the people who look at the source view for fun.
            </p>
          </div>
        </section>

        {/* ── The mark and how it works — brand book expansion pulled
             from the Barreiro.com Figma foundation artifact (page 01)
             on 2026-07-03. Five modules stacked under one editorial
             section: The Mark, Size Scale, Four Surfaces, Wordmark, and
             Applications. Rendered in code (LogoMark component) so every
             glyph stays vector-crisp. */}
        <section aria-label="The mark and how it works" style={{
          padding:    "clamp(96px, 12vw, 152px) clamp(32px, 6vw, 80px)",
          background: "var(--color-ground-navy)",
        }}>
          <div style={innerWrapper}>

            {/* ── Section eyebrow ── */}
            <p style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "11px",
              fontWeight:    700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color:         "var(--color-brand)",
              margin:        "0 0 20px",
            }}>
              Foundation artifact &nbsp;·&nbsp; Brand
            </p>

            <h2 style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "clamp(36px, 5.4vw, 60px)",
              fontWeight:    600,
              color:         "var(--color-cream)",
              margin:        "0 0 24px",
              letterSpacing: "-0.025em",
              lineHeight:    1.08,
              maxWidth:      "820px",
            }}>
              An infinity-A into B monogram, Alfonso Barreiro, and alpha beta design.
            </h2>

            <p style={{ ...body, maxWidth: "620px", margin: "0 0 clamp(64px, 8vw, 96px)" }}>
              An infinity-A monogram, dual-purpose. The loop is Alpha + Beta (the studio). The A-arrow is the designer. Used at 24 px in nav today; here it sits back up to its proper role as the anchor of the brand.
            </p>

            {/* Six real Figma artifacts pulled from six different pages
                of the Barreiro.com working file. Reads as a decision
                chronology — the mark, the color exploration, the type
                pairings tried, the systems tested, the runner-up
                (Aubergine) that got ruled out, and the direction that
                actually shipped. Replaces both the previous code
                recreations AND the standalone "palette decision" image
                (Alfonso 2026-07-03: "there is a lot in there"). */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(56px, 7vw, 96px)" }}>

              <ArtifactStep
                eyebrow="01 · The mark"
                heading="Infinity, an A, and a closed system in one glyph."
                src="/images/behind-this-site/mark-hero.png"
                width={1536}
                height={500}
              />

              <ArtifactStep
                eyebrow="02 · Color exploration"
                heading="Where the brand went warm."
                caption="Cognac, Burnt Sienna, and other warm-editorial candidates the mark tried on before Crimson locked. The register was always warm; the specific hue took iterations."
                src="/images/behind-this-site/color-exploration.png"
                width={1680}
                height={2120}
              />

              <ArtifactStep
                eyebrow="03 · Typography"
                heading="How Alfonso Barreiro reads."
                caption="Three type pairings tested against the wordmark: DM Serif Display + DM Sans, Fraunces + DM Sans, Newsreader + Inter. The specimen block underneath shows editorial + running text together — the two registers the site needs to hold."
                src="/images/behind-this-site/typography-exploration.png"
                width={1680}
                height={2120}
              />

              <ArtifactStep
                eyebrow="04 · Token systems"
                heading="Tokens graded against real UI, not swatches."
                caption="Surface / Brand / Accent / Ink token quartets across the shortlist. Each row also carries a live preview so the tokens are graded against real UI, not swatches in isolation."
                src="/images/behind-this-site/brand-systems.png"
                width={1768}
                height={1640}
              />

              <ArtifactStep
                eyebrow="05 · The runner-up"
                heading="The Aubergine detour."
                caption="Applied to a full homepage before the direction pivoted. The runner-up that got the shipping palette its confidence: I ruled Aubergine out only after seeing it at production scale."
                src="/images/behind-this-site/aubergine-locked-v2.png"
                width={1440}
                height={2874}
              />

              <ArtifactStep
                eyebrow="06 · The direction that shipped"
                heading="Homepage C · Light with Conviction."
                caption="The wireframe of the site you're reading right now, locked 2026-06-16. Terracotta on Navy. Deep Teal as the second voice. Same DM Sans running text as the Aubergine detour above."
                src="/images/behind-this-site/homepage-c-shipped-v3.png"
                width={1440}
                height={3400}
              />

            </div>

          </div>

          {/* Responsive: stack sub-grids on narrow viewports */}
          <style>{`
            @media (max-width: 720px) {
              .bts-surfaces,
              .bts-wordmarks,
              .bts-applications {
                grid-template-columns: 1fr !important;
              }
              .bts-size-scale {
                justify-content: flex-start !important;
                gap: 16px !important;
              }
            }

            /* Scroll-reveal on each of the six artifact figures. Uses
               animation-timeline: view() so the whole thing is a single
               CSS rule that costs no JavaScript — the artifact glides
               from below and fades in as it enters the viewport, then
               settles. Graceful degradation: browsers without support
               ignore the timeline and just render at final state. */
            @supports (animation-timeline: view()) {
              @media (prefers-reduced-motion: no-preference) {
                .bts-artifact {
                  animation: bts-artifact-in linear both;
                  animation-timeline: view();
                  animation-range: entry 0% cover 22%;
                }
                @keyframes bts-artifact-in {
                  from { opacity: 0; transform: translateY(28px); }
                  to   { opacity: 1; transform: translateY(0);    }
                }
              }
            }
          `}</style>
        </section>

        {/* "The palette decision" section removed 2026-07-03 — the six-
             artifact chronology above ends on the same "shipped design"
             beat with a higher-fidelity Figma export (Alfonso hated the
             prior C-vs-E composite image). */}

        {/* ── The system underneath it — Alpha Beta Design ────────────── */}
        <section aria-label="The design system underneath" style={sectionWrapper()}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>The system underneath it.</h2>
            <p style={body}>
              Barreiro.com runs on{" "}
              <a
                href="https://alphabeta.design/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color:           "var(--color-cream)",
                  textDecoration:  "none",
                  fontWeight:      500,
                  borderBottom:    "1px solid var(--color-cream-48)",
                }}
              >
                Alpha Beta Design
              </a>
              , a portable design system I maintain for client work. Same tokens, same components, same layout scaffolding that powers Men&apos;s Sole Revival and Wayfarer. The brand swap between projects is a variable change, not a rebuild.
            </p>
            <p style={body}>
              Roles instead of literal names. <code style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: "0.9em", background: "rgba(244, 239, 232, 0.10)", padding: "1px 6px", color: "var(--color-cream)" }}>--color-brand</code> instead of <code style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: "0.9em", background: "rgba(244, 239, 232, 0.10)", padding: "1px 6px", color: "var(--color-cream)" }}>--crimson</code>. <code style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: "0.9em", background: "rgba(244, 239, 232, 0.10)", padding: "1px 6px", color: "var(--color-cream)" }}>--color-accent</code> instead of <code style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: "0.9em", background: "rgba(244, 239, 232, 0.10)", padding: "1px 6px", color: "var(--color-cream)" }}>--deep-teal</code>. Each project points those variables at its own hexes and the system does the rest.
            </p>

            <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
              <span style={tokenChip}>
                <span style={{ ...swatch, background: "#CF5B48" }} aria-hidden="true" />
                --color-brand · #CF5B48
              </span>
              <span style={tokenChip}>
                <span style={{ ...swatch, background: "#0F3D3E" }} aria-hidden="true" />
                --color-accent · #0F3D3E
              </span>
              <span style={tokenChip}>
                <span style={{ ...swatch, background: "#FCFAF9" }} aria-hidden="true" />
                --color-paper · #FCFAF9
              </span>
              <span style={tokenChip}>
                <span style={{ ...swatch, background: "#1A1A1A" }} aria-hidden="true" />
                --color-ink · #1A1A1A
              </span>
            </div>
          </div>
        </section>

        {/* ── The stack — visual explainer ────────────────────────────
             Seven layers as a visual stack, top-down (highest = closest
             to the reader, lowest = closest to metal). Each layer has
             a small SVG glyph, an uppercase label, and one line of body
             copy. Compact 2-column grid on desktop, single column on
             mobile (2026-07-03 Alfonso ask). */}
        <section aria-label="Stack" style={sectionWrapper()}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>Stack.</h2>
            <p style={{ ...body, marginBottom: "clamp(40px, 5vw, 56px)" }}>
              What ships this page. Seven layers, top-down.
            </p>

            <StackVisual />
          </div>
        </section>

        {/* ── Sign-off ─────────────────────────────────────────────────── */}
        <section aria-label="Sign-off" style={sectionWrapper()}>
          <div style={innerWrapper}>
            <p style={{
              ...body,
              fontSize: "clamp(18px, 1.5vw, 20px)",
              maxWidth: "620px",
              margin:   0,
              color:    "var(--color-cream)",
            }}>
              Built solo. Every design decision, every commit, every line of copy signed by the same hand.
            </p>
            <p style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "12px",
              fontWeight:    600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color:         "#5A5752",
              margin:        "24px 0 0",
            }}>
              Alfonso Barreiro · Portland, OR · 2026
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
