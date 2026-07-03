import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Behind this site",
  description:
    "How this site is built. The palette decision, the design system underneath it, and the stack that ships it.",
  alternates: { canonical: "https://www.barreiro.com/behind-this-site" },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.barreiro.com/behind-this-site",
    title: "Behind this site · Alfonso Barreiro",
    description:
      "How this site is built. The palette decision, the design system underneath it, and the stack that ships it.",
  },
};

const sectionH2: React.CSSProperties = {
  fontFamily:    "var(--font-dm-sans), sans-serif",
  fontSize:      "clamp(24px, 3vw, 36px)",
  fontWeight:    600,
  color:         "#252B28",
  margin:        "0 0 28px",
  letterSpacing: "-0.02em",
  lineHeight:    1.2,
};

const body: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize:   "17px",
  lineHeight: 1.75,
  color:      "#3D4440",
  margin:     "0 0 20px",
  maxWidth:   "680px",
};

const sectionWrapper = (background: string): React.CSSProperties => ({
  padding:    "96px clamp(32px, 6vw, 80px)",
  background,
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
  color:         "#3D4440",
  margin:        "0 0 8px",
  paddingLeft:   "18px",
  position:      "relative",
};

const stackLabel: React.CSSProperties = {
  fontWeight:    600,
  color:         "#252B28",
  letterSpacing: "0.01em",
};

const tokenChip: React.CSSProperties = {
  display:       "inline-flex",
  alignItems:    "center",
  gap:           "8px",
  padding:       "6px 12px",
  border:        "1px solid rgba(110, 110, 108, 0.35)",
  fontFamily:    "var(--font-dm-sans), sans-serif",
  fontSize:      "12px",
  fontWeight:    500,
  color:         "#3D4440",
  letterSpacing: "0.02em",
};

const swatch: React.CSSProperties = {
  display:      "inline-block",
  width:        "12px",
  height:       "12px",
  borderRadius: 0,
  border:       "1px solid rgba(37, 43, 40, 0.15)",
};

/* One step in the decision chronology. Numbered label + editorial
   caption above; Figma-exported artifact below. The caption sits
   ABOVE the image so the reader knows what they're about to see
   before they see it — reads as an editorial decision log. */
function ArtifactStep({ label, caption, src, width, height }: {
  label: string; caption: string; src: string; width: number; height: number;
}) {
  return (
    <figure style={{ margin: 0 }}>
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
          {label}
        </p>
        <p style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize:   "15px",
          lineHeight: 1.65,
          color:      "#3D4440",
          margin:     0,
        }}>
          {caption}
        </p>
      </div>
      <Image
        src={src}
        alt={caption}
        width={width}
        height={height}
        sizes="(max-width: 760px) 100vw, 920px"
        quality={92}
        style={{
          width:   "100%",
          height:  "auto",
          display: "block",
          border:  "1px solid #E8E4DE",
        }}
      />
    </figure>
  );
}

export default function BehindThisSitePage() {
  return (
    <>
      <Nav />
      <main id="main-content" style={{ background: "#FFFFFF" }}>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section aria-label="Behind this site introduction" style={{
          padding:    "clamp(112px, 14vw, 168px) clamp(32px, 6vw, 80px) clamp(64px, 8vw, 96px)",
          background: "#FFFFFF",
        }}>
          <div style={innerWrapper}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <span style={{ display: "inline-block", width: "24px", height: "1px", background: "var(--color-accent)" }} />
              <p style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "11px",
                fontWeight:    600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color:         "var(--color-accent)",
                margin:        0,
              }}>
                Behind this site
              </p>
            </div>

            <h1 style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "clamp(36px, 5vw, 64px)",
              fontWeight:    500,
              color:         "#252B28",
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
          background: "#FCFAF9",
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

            {/* ── H2 (serif display italic — matches Figma frame) ── */}
            <h2 style={{
              fontFamily:    "var(--font-dm-serif-display), Georgia, serif",
              fontSize:      "clamp(40px, 6vw, 72px)",
              fontWeight:    400,
              fontStyle:     "italic",
              color:         "#252B28",
              margin:        "0 0 24px",
              letterSpacing: "-0.02em",
              lineHeight:    1.05,
            }}>
              The mark
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
                label="01 · The mark"
                caption="Infinity ∞ + A-arrow integrated into a single continuous form. Reads as a loop, an A, and a closed system — the dual identity of designer + studio in one glyph."
                src="/images/behind-this-site/mark-hero.png"
                width={1536}
                height={500}
              />

              <ArtifactStep
                label="02 · Where the brand went warm"
                caption="Cognac, Burnt Sienna, and other warm-editorial candidates the mark tried on before Crimson locked. The register was always warm; the specific hue took iterations."
                src="/images/behind-this-site/color-exploration.png"
                width={1680}
                height={2120}
              />

              <ArtifactStep
                label="03 · How Alfonso Barreiro reads"
                caption="Three type pairings tested against the wordmark: DM Serif Display + DM Sans, Fraunces + DM Sans, Newsreader + Inter. The specimen block underneath shows editorial + running text together — the two registers the site needs to hold."
                src="/images/behind-this-site/typography-exploration.png"
                width={1680}
                height={2120}
              />

              <ArtifactStep
                label="04 · Brand systems tested"
                caption="Surface / Brand / Accent / Ink token quartets across the shortlist. Each row also carries a live preview so the tokens are graded against real UI, not swatches in isolation."
                src="/images/behind-this-site/brand-systems.png"
                width={1768}
                height={1640}
              />

              <ArtifactStep
                label="05 · The Aubergine detour"
                caption="Applied to a full homepage before the direction pivoted. The runner-up that got the shipping palette its confidence: I ruled Aubergine out only after seeing it at production scale."
                src="/images/behind-this-site/aubergine-locked-v2.png"
                width={1440}
                height={2874}
              />

              <ArtifactStep
                label="06 · The direction that shipped"
                caption="Homepage · C · Light with Conviction. The wireframe of the site you're reading right now, locked 2026-06-16. Crimson on paper. Deep Teal as the second voice. Same DM Sans running text as the Aubergine detour above."
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
          `}</style>
        </section>

        {/* "The palette decision" section removed 2026-07-03 — the six-
             artifact chronology above ends on the same "shipped design"
             beat with a higher-fidelity Figma export (Alfonso hated the
             prior C-vs-E composite image). */}

        {/* ── The system underneath it — Alpha Beta Design ────────────── */}
        <section aria-label="The design system underneath" style={sectionWrapper("#FFFFFF")}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>The system underneath it.</h2>
            <p style={body}>
              Barreiro.com runs on{" "}
              <a
                href="https://alphabeta.design/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color:           "var(--color-accent)",
                  textDecoration:  "none",
                  fontWeight:      500,
                  borderBottom:    "1px solid var(--color-accent)",
                }}
              >
                Alpha Beta Design
              </a>
              , a portable design system I maintain for client work. Same tokens, same components, same layout scaffolding that powers Men&apos;s Sole Revival and Wayfarer. The brand swap between projects is a variable change, not a rebuild.
            </p>
            <p style={body}>
              Roles instead of literal names. <code style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: "0.9em", background: "#F4F6F7", padding: "1px 6px" }}>--color-brand</code> instead of <code style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: "0.9em", background: "#F4F6F7", padding: "1px 6px" }}>--crimson</code>. <code style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: "0.9em", background: "#F4F6F7", padding: "1px 6px" }}>--color-accent</code> instead of <code style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: "0.9em", background: "#F4F6F7", padding: "1px 6px" }}>--deep-teal</code>. Each project points those variables at its own hexes and the system does the rest.
            </p>

            <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
              <span style={tokenChip}>
                <span style={{ ...swatch, background: "#8C1A1A" }} aria-hidden="true" />
                --color-brand · #8C1A1A
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

        {/* ── The stack ────────────────────────────────────────────────── */}
        <section aria-label="Stack" style={sectionWrapper("#F4F6F7")}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>Stack.</h2>
            <p style={{ ...body, marginBottom: "36px" }}>
              What ships this page.
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={stackRow}><span style={stackLabel}>Framework:</span> Next.js App Router, TypeScript.</li>
              <li style={stackRow}><span style={stackLabel}>Hosting:</span> Vercel. <code style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: "0.9em" }}>main</code> deploys to barreiro.com; <code style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: "0.9em" }}>staging</code> deploys to staging.barreiro.com.</li>
              <li style={stackRow}><span style={stackLabel}>Design source:</span> Figma. Every screen begins there and gets translated by hand.</li>
              <li style={stackRow}><span style={stackLabel}>Typography:</span> DM Sans for interface. Lora for editorial pull quotes. Barlow Condensed for section §-headings on the case studies.</li>
              <li style={stackRow}><span style={stackLabel}>Motion:</span> Native CSS transitions. IntersectionObserver for scroll reveals. No animation library.</li>
              <li style={stackRow}><span style={stackLabel}>Content:</span> Written in plain sentences under a voice profile that bans em dashes, motivational closers, and AI-tell vocabulary. Every user-facing string goes through it.</li>
              <li style={{ ...stackRow, marginBottom: 0 }}><span style={stackLabel}>Analytics:</span> None. If you&apos;re here, you&apos;re here.</li>
            </ul>
          </div>
        </section>

        {/* ── Sign-off ─────────────────────────────────────────────────── */}
        <section aria-label="Sign-off" style={sectionWrapper("#FFFFFF")}>
          <div style={innerWrapper}>
            <p style={{
              ...body,
              fontSize: "clamp(18px, 1.5vw, 20px)",
              maxWidth: "620px",
              margin:   0,
              color:    "#252B28",
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
