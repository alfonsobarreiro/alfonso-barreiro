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

        {/* ── The palette decision — lifted from About 2026-07-02 ─────── */}
        <section aria-label="The palette decision" style={sectionWrapper("#F4F6F7")}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>The palette decision.</h2>
            <p style={{ ...body, marginBottom: "16px" }}>
              Design is decision-making. Everything you&apos;re looking at on barreiro.com is a downstream consequence of choices someone signed off on. Below is one of them, the palette decision, as it looked the day it locked.
            </p>
            <p style={{ ...body, marginBottom: "40px" }}>
              Two candidate brand systems rendered as the same MSR homepage, side by side, at production scale. C won on 2026-06-11. The color you&apos;re reading this in is the left column of that comparison.
            </p>

            <figure style={{ margin: 0 }}>
              <Image
                src="/images/about/design-source-decision.jpg"
                alt="Case-study test frame from the Barreiro.com Figma file. Top banner reads DECISION LOCKED · C · LIGHT WITH CONVICTION with hex tokens Paper #FCFAF9, Crimson #8C1A1A, Deep Teal #0F3D3E, Soft Ink #1A1A1A, signed by Alfon on 2026-06-11, replacing aubergine plus sage. Below the banner, the Men's Sole Revival homepage renders twice at production scale: on the left in Theme C (Crimson + Deep Teal) and on the right in Theme E (Petrol Blue + Burnt Ochre). Both columns show identical layout and content with a labeled token strip at the bottom."
                width={1024}
                height={945}
                sizes="(max-width: 760px) 100vw, 920px"
                style={{
                  width:   "100%",
                  height:  "auto",
                  display: "block",
                  border:  "1px solid var(--color-border)",
                }}
              />
              <figcaption style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "13px",
                lineHeight:    1.6,
                color:         "#5A5752",
                margin:        "16px 0 0",
                letterSpacing: "0.01em",
                maxWidth:      "760px",
              }}>
                Case-study test frame from the Barreiro.com working file. Same layout, same content, two brand systems. C on the left is what shipped. E on the right was the last runner-up. Full token strip on each column.
              </figcaption>
            </figure>
          </div>
        </section>

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
