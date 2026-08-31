import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PersonSchema } from "@/components/structured-data/PersonSchema";
import { BreadcrumbSchema } from "@/components/structured-data/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Behind this site",
  description:
    "How this site is built. The mark, the design system underneath it, the stack that ships it, and the eight elements that came off in the twenty-portfolio calibration.",
  alternates: { canonical: "https://www.barreiro.com/behind-this-site" },
  openGraph: {
    type: "website",
    url: "https://www.barreiro.com/behind-this-site",
    title: "Behind this site · Alfonso Barreiro",
    description:
      "How this site is built. The mark, the design system underneath it, the stack that ships it, and the eight elements that came off in the twenty-portfolio calibration.",
  },
};

/* Page runs on Warm White paper ground with ink text. Matches
   /about and /process treatment. */

const sectionH2: React.CSSProperties = {
  fontFamily:    "var(--font-dm-sans), sans-serif",
  fontSize:      "clamp(28px,3.5vw,40px)",
  fontWeight:    500,
  color:         "var(--color-text)",
  margin:        "0 0 24px",
  letterSpacing: "-0.01em",
  lineHeight:    1.15,
};

const body: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize:   "var(--text-article)",
  lineHeight: 1.6,
  color:      "var(--color-text-muted)",
  margin:     "0 0 20px",
  maxWidth:   "680px",
};

const sectionWrapper = (): React.CSSProperties => ({
  padding:    "48px clamp(32px, 6vw, 80px)",
  background: "var(--color-paper)",
});

const innerWrapper: React.CSSProperties = {
  width:    "100%",
  maxWidth: "920px",
  margin:   "0 auto",
};

const tokenChip: React.CSSProperties = {
  display:       "inline-flex",
  alignItems:    "center",
  gap:           "8px",
  padding:       "6px 12px",
  border:        "1px solid var(--color-neutral-400)",
  borderRadius: 0,
  fontFamily:    "var(--font-dm-sans), sans-serif",
  fontSize:      "var(--text-small)",
  fontWeight:    500,
  color:         "var(--color-text)",
  letterSpacing: "0.01em",
};

const swatch: React.CSSProperties = {
  display:      "inline-block",
  width:        "12px",
  height:       "12px",
  borderRadius: 0,
  border:       "1px solid var(--color-neutral-400)",
};

const codeInline: React.CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, monospace",
  fontSize:   "0.9em",
  background: "var(--color-neutral-100)",
  padding:    "1px 6px",
  color:      "var(--color-text)",
};

/* One artifact step from the Figma brand book. Caption sits above so
   the reader knows what they're about to see before they see it. */
function ArtifactStep({ heading, caption, src, width, height }: {
  heading: string; caption?: string; src: string; width: number; height: number;
}) {
  return (
    <figure className="bts-artifact" style={{ margin: 0 }}>
      <div style={{ marginBottom: "clamp(20px, 3vw, 28px)", maxWidth: "780px" }}>
        <h3 style={{
          fontFamily:    "var(--font-dm-sans), sans-serif",
          fontSize:      "clamp(24px,3vw,32px)",
          fontWeight:    500,
          color:         "var(--color-text)",
          margin:        "0 0 16px",
          letterSpacing: "-0.02em",
          lineHeight:    1.15,
        }}>
          {heading}
        </h3>
        {caption && (
          <p style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize:   "var(--text-body)",
            lineHeight: 1.6,
            color:      "var(--color-text-muted)",
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
          border:  "1px solid var(--color-neutral-400)",
        }}
      />
    </figure>
  );
}

/* Seven stack layers rendered as a compact grid of tiles. Highest
   layer (AI) sits last as the payoff; lowest (Framework) sits first. */

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
    body:  <><code style={codeInline}>main</code> ships to barreiro.com. <code style={codeInline}>staging</code> ships to staging.barreiro.com. Vercel + GitHub auto-deploy.</>,
    icon:  (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 4L21 20H3L12 4Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    n:     "03",
    label: "Design source",
    body:  "Figma. Seventeen-page brand book. Every screen begins there and gets translated to code by hand.",
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
    body:  "DM Sans only. One family, two weights (400 and 500). Barlow Condensed and Lora got swept when the DS unified this month.",
    icon:  (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <text x="4" y="18" fontFamily="var(--font-dm-sans), sans-serif" fontSize="17" fontWeight="500" fill="currentColor">Aa</text>
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
    label: "AI",
    body:  <>Claude in the loop for research clustering, case-study drafts, and voice-tuned copy against the profile in layer 06. Design decisions stayed with me. Full stance on <Link href="/process" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px solid var(--color-neutral-400)" }}>/process</Link>.</>,
    icon:  (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 4L14 10L20 12L14 14L12 20L10 14L4 12L10 10L12 4Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
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
          background: var(--color-neutral-100);
          border: 1px solid var(--color-neutral-300);
          border-radius: 0;
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
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: none;
          color: var(--color-brand);
          font-variant-numeric: tabular-nums;
          line-height: 1;
        }
        .bts-stack-icon {
          grid-column: 2;
          grid-row: 1 / span 2;
          width: clamp(28px, 3vw, 36px);
          height: clamp(28px, 3vw, 36px);
          color: var(--color-text);
          opacity: 0.85;
          justify-self: end;
        }
        .bts-stack-icon svg { width: 100%; height: 100%; display: block; }
        .bts-stack-label {
          grid-column: 1;
          grid-row: 2;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: clamp(20px, 2vw, 24px);
          font-weight: 500;
          letter-spacing: -0.015em;
          line-height: 1.15;
          color: var(--color-text);
          margin: 0;
        }
        .bts-stack-body {
          grid-column: 1 / -1;
          grid-row: 3;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 15px;
          line-height: 1.6;
          color: var(--color-text-muted);
          margin: 4px 0 0;
        }
        /* Layer 07 (AI) spans both columns on desktop for editorial
           breath — it is the payoff, not one more line item. */
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

/* Rule row for "The rules." section — one editorial claim per line,
   hairline between. Matches the DS pattern used on Figma page 04. */
function RuleRow({ children }: { children: React.ReactNode }) {
  return (
    <p className="bts-rule" style={{
      fontFamily:  "var(--font-dm-sans), sans-serif",
      fontSize:    "var(--text-article)",
      lineHeight:  1.6,
      color:       "var(--color-text)",
      margin:      0,
      padding:     "16px 0",
      borderBottom: "1px solid var(--color-neutral-200)",
    }}>
      {children}
    </p>
  );
}

/* Cut row for "What was cut." — element name, then the pattern that
   asked for its removal. Same hairline treatment as rules. */
function CutRow({ label, note }: { label: string; note: string }) {
  return (
    <div style={{
      display:       "grid",
      gridTemplateColumns: "minmax(180px, 220px) 1fr",
      gap:           "clamp(16px, 3vw, 32px)",
      padding:       "16px 0",
      borderBottom:  "1px solid var(--color-neutral-200)",
      alignItems:    "baseline",
    }} className="bts-cut">
      <p style={{
        fontFamily:  "var(--font-dm-sans), sans-serif",
        fontSize:    "var(--text-body)",
        fontWeight:  500,
        color:       "var(--color-text)",
        margin:      0,
        letterSpacing: "-0.01em",
      }}>{label}</p>
      <p style={{
        fontFamily:  "var(--font-dm-sans), sans-serif",
        fontSize:    "var(--text-body)",
        lineHeight:  1.6,
        color:       "var(--color-text-muted)",
        margin:      0,
      }}>{note}</p>
    </div>
  );
}

export default function BehindThisSitePage() {
  return (
    <>
      <PersonSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.barreiro.com/" },
          { name: "Behind this site", url: "https://www.barreiro.com/behind-this-site" },
        ]}
      />
      <Nav />
      <main id="main-content" style={{ background: "var(--color-paper)" }}>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section aria-label="Behind this site introduction" style={{
          padding:    "96px clamp(32px, 6vw, 80px) 64px",
          background: "var(--color-paper)",
        }}>
          <div style={innerWrapper}>
            <h1 style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "clamp(40px,4.8vw,60px)",
              fontWeight:    500,
              color:         "var(--color-text)",
              margin:        "0 0 24px",
              letterSpacing: "-0.02em",
              lineHeight:    1.1,
              maxWidth:      "820px",
            }}>
              How this site is built.
            </h1>

            <p style={{
              ...body,
              fontSize: "clamp(17px,1.6vw,20px)",
              maxWidth: "720px",
              margin:   0,
            }}>
              The mark, the design system underneath it, the stack that ships it, and the eight elements that came off in a twenty-portfolio audit. Written for the people who look at the source view for fun.
            </p>
          </div>
        </section>

        {/* ── The mark ─────────────────────────────────────────────────── */}
        <section aria-label="The mark" style={{
          padding:    "48px clamp(32px, 6vw, 80px)",
          background: "var(--color-paper)",
        }}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>The mark.</h2>

            <p style={{ ...body, maxWidth: "620px" }}>
              Infinity, an A, and a closed system in one glyph. The loop is Alpha and Beta, the design studio behind the client work. The A-arrow inside is the designer. Used at 24 px in the nav, and specified end-to-end in the Figma brand book.
            </p>

            <div style={{ marginTop: "clamp(40px, 5vw, 64px)" }}>
              <ArtifactStep
                heading="Sizes, variants, and rules — the spec."
                caption="Five test sizes on paper ground, minimum 16 px. Two color variants: dark on light, white on dark. One aspect: 2:1, always. PNGs are the mark; never redrawn from vectors."
                src="/images/behind-this-site/mark-spec-v2.png"
                width={1200}
                height={2265}
              />
            </div>
          </div>
        </section>

        {/* ── The system underneath it ─────────────────────────────────── */}
        <section aria-label="The design system underneath" style={sectionWrapper()}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>The system underneath it.</h2>
            <p style={body}>
              I built a portable design system I maintain for client work. Barreiro.com runs on it. So do Men&apos;s Sole Revival and Wayfarer. Same tokens, same components, same layout scaffolding. The brand swap between projects is a variable change, not a rebuild.
            </p>
            <p style={body}>
              Roles instead of literal names. <code style={codeInline}>--color-brand</code> instead of <code style={codeInline}>--crimson</code>. <code style={codeInline}>--color-accent</code> instead of <code style={codeInline}>--deep-teal</code>. Each project points those variables at its own hexes and the system does the rest.
            </p>

            <div style={{ marginTop: "8px", marginBottom: "32px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
              <span style={tokenChip}>
                <span style={{ ...swatch, background: "#CF5B48" }} aria-hidden="true" />
                --color-brand · #CF5B48
              </span>
              <span style={tokenChip}>
                <span style={{ ...swatch, background: "#0F3D3E" }} aria-hidden="true" />
                --color-accent · #0F3D3E
              </span>
              <span style={tokenChip}>
                <span style={{ ...swatch, background: "#FAFAF9" }} aria-hidden="true" />
                --color-paper · #FAFAF9
              </span>
              <span style={tokenChip}>
                <span style={{ ...swatch, background: "#0F283D" }} aria-hidden="true" />
                --color-ink · #0F283D
              </span>
            </div>

            <p style={body}>
              The Figma brand book runs seventeen pages: README, Landing, Home, Buttons, Cards, Dialog, Forms, Navigation, Colors, Fonts, Wordmark, Mark, Logo, Icons, Imagery, Spacing, and Parameters. Every rule that ships in the code lives there first.
            </p>

            <div style={{ marginTop: "clamp(40px, 5vw, 64px)", display: "flex", flexDirection: "column", gap: "clamp(48px, 6vw, 80px)" }}>
              <ArtifactStep
                heading="The palette — role tokens, not literal names."
                caption="Brand, accent, sage, neutrals, plus semantic bindings for background, text, and border. Same file every client project reads."
                src="/images/behind-this-site/colors-spec.png"
                width={715}
                height={2400}
              />

              <ArtifactStep
                heading="The type ramp — one family, two weights."
                caption="DM Sans at 400 and 500. Eight sizes on the ramp (60 / 40 / 28 / 20 / 17 / 15 / 12 / 11). No other family ships. Barlow Condensed and Lora were swept when the DS unified this month."
                src="/images/behind-this-site/fonts-spec.png"
                width={743}
                height={2400}
              />
            </div>
          </div>
        </section>

        {/* ── The stack ────────────────────────────────────────────────── */}
        <section aria-label="Stack" style={sectionWrapper()}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>Stack.</h2>
            <p style={{ ...body, marginBottom: "clamp(40px, 5vw, 56px)" }}>
              What ships this page. Seven layers, top-down.
            </p>

            <StackVisual />
          </div>
        </section>

        {/* ── The rules ────────────────────────────────────────────────── */}
        <section aria-label="The rules" style={sectionWrapper()}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>The rules.</h2>
            <p style={{ ...body, marginBottom: "clamp(16px, 2vw, 24px)" }}>
              Five constraints govern everything the DS ships. Every screen on this site, every case study, every artifact in the Figma book obeys them.
            </p>
            <div style={{ borderTop: "1px solid var(--color-neutral-200)" }}>
              <RuleRow>Title Case for button labels only. Every other label stays sentence case.</RuleRow>
              <RuleRow>Radius 0 for rectangles. 999 for pills and circles. No mid values.</RuleRow>
              <RuleRow>Terracotta is the only accent. A second accent breaks the ground, ink, accent triad.</RuleRow>
              <RuleRow>No shadows on any button state. Depth is not a button affordance.</RuleRow>
              <RuleRow>DM Sans only. One family, two weights.</RuleRow>
            </div>
          </div>
        </section>

        {/* ── What was cut ─────────────────────────────────────────────── */}
        <section aria-label="What was cut" style={sectionWrapper()}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>What was cut.</h2>
            <p style={body}>
              In August 2026, I audited barreiro.com against twenty senior product-design portfolios. Every one of those twenty rejected the same eight elements. Six of the eight were shipping here. This is what came off.
            </p>
            <div style={{ marginTop: "clamp(24px, 3vw, 40px)", borderTop: "1px solid var(--color-neutral-200)" }}>
              <CutRow label="Hero device peek"       note="A MacBook with the 86% stat overlay in the top-right. Twenty of twenty senior portfolios ship no hero image." />
              <CutRow label="Testimonials"           note="A quote carousel with attributed praise. Twenty of twenty ship none." />
              <CutRow label="Metrics on the fold"    note="The 86% completion stat was a hero callout. It lives inside the Men’s Sole Revival case study now, where the reader can see the receipt." />
              <CutRow label="/contact route"         note="A dedicated page with a mailto link. Twenty of twenty use email, calendar, or newsletter — not a route. The email lives in the footer and on the About page." />
              <CutRow label="About preview on home"  note="A duplicate of the /about narrative. The full page still ships from the nav." />
              <CutRow label="Downloadable résumé"    note="Twenty of twenty do not offer a résumé file. LinkedIn is the primary reference now." />
              <CutRow label="Dark mode toggle"       note="Never shipped. Twenty of twenty do not have one." />
              <CutRow label="Heavy hero motion"      note="Framer Motion staggered entrance animation. The library came out with it — the site now transitions with native CSS only." />
            </div>
            <p style={{ ...body, marginTop: "clamp(24px, 3vw, 40px)" }}>
              Six of the eight universal rejects came off. The site got quieter. Fewer decisions for the reader to make before they hit the case studies.
            </p>
          </div>
        </section>

        {/* ── Sign-off ─────────────────────────────────────────────────── */}
        <section aria-label="Sign-off" style={sectionWrapper()}>
          <div style={innerWrapper}>
            <p style={{
              ...body,
              fontSize: "clamp(17px,1.5vw,20px)",
              maxWidth: "620px",
              margin:   0,
              color:    "var(--color-text)",
            }}>
              Built solo. Every design decision, every commit, every line of copy signed by the same hand.
            </p>
            <p style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize:   "var(--text-body)",
              fontWeight: 400,
              color:      "var(--color-neutral-600)",
              margin:     "16px 0 0",
            }}>
              Alfonso Barreiro, Portland, OR, 2026.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
