import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LogoMark from "@/components/LogoMark";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Where I add value, in the language teams already track. And how I think about the work, in the language I actually use.",
  alternates: { canonical: "https://www.barreiro.com/process" },
  openGraph: {
    type: "website",
    url: "https://www.barreiro.com/process",
    title: "Process · Alfonso Barreiro",
    description:
      "Where I add value, in the language teams already track. And how I think about the work, in the language I actually use.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Process · Alfonso Barreiro",
    description:
      "Where I add value, in the language teams already track. And how I think about the work, in the language I actually use.",
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

const beliefClaim: React.CSSProperties = {
  ...body,
  color:        "#252B28",
  fontWeight:   600,
  marginBottom: "8px",
};

const beliefBody: React.CSSProperties = {
  ...body,
  marginBottom: "40px",
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

export default function ProcessPage() {
  return (
    <>
      <Nav />
      <main id="main-content" style={{ background: "#FFFFFF" }}>
        <style>{`
          .value-list  { counter-reset: value; }
          .philo-list  { counter-reset: philo; }
          .value-claim,
          .philo-claim {
            position:     relative;
            padding-left: clamp(56px, 7vw, 88px);
          }
          .value-claim { counter-increment: value; }
          .philo-claim { counter-increment: philo; }
          .value-claim::before {
            content:         counter(value, decimal-leading-zero);
            position:        absolute;
            left:            0;
            top:             0.05em;
            font-family:     var(--font-dm-sans), sans-serif;
            font-size:       clamp(20px, 2.4vw, 28px);
            font-weight:     500;
            letter-spacing:  0.02em;
            color:           var(--color-brand);
            font-variant-numeric: tabular-nums;
            line-height:     1;
          }
          .philo-claim::before {
            content:         counter(philo, decimal-leading-zero);
            position:        absolute;
            left:            0;
            top:             0.05em;
            font-family:     var(--font-dm-sans), sans-serif;
            font-size:       clamp(20px, 2.4vw, 28px);
            font-weight:     500;
            letter-spacing:  0.02em;
            color:           #252B28;
            font-variant-numeric: tabular-nums;
            line-height:     1;
          }
          @media (max-width: 640px) {
            .value-claim,
            .philo-claim {
              padding-left: 0;
              padding-top:  32px;
            }
            .value-claim::before,
            .philo-claim::before {
              font-size:      12px;
              font-weight:    700;
              letter-spacing: 0.22em;
              top:            0;
            }
          }

          .process-cta-primary {
            display:        inline-flex;
            align-items:    center;
            gap:            8px;
            padding:        12px 24px;
            font-family:    var(--font-dm-sans), sans-serif;
            font-size:      12px;
            font-weight:    600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            text-decoration: none;
            border-radius:  0;
            background:     var(--color-brand);
            border:         1px solid var(--color-brand);
            color:          #FFFFFF;
            transition:     transform 0.25s ease, box-shadow 0.25s ease, background 0.2s;
          }
          .process-cta-primary:hover {
            transform:  translateY(-2px);
            box-shadow: 0 4px 12px rgba(37,43,40,0.18);
            background: #6F1414;
          }
          @media (prefers-reduced-motion: reduce) {
            .process-cta-primary { transition: none !important; }
            .process-cta-primary:hover { transform: none !important; }
          }
        `}</style>

        {/* ── Hero — with watermark ∞ mark behind the H1. Uses the same
             pattern as /not-found's giant "404" but with the brand
             glyph. Renders as texture, not focus (Alfonso 2026-07-03). */}
        <section aria-label="Process introduction" style={{
          padding:    "clamp(112px, 14vw, 168px) clamp(32px, 6vw, 80px) clamp(64px, 8vw, 96px)",
          background: "#FFFFFF",
          position:   "relative",
          overflow:   "hidden",
        }}>
          {/* Watermark ∞ — sits behind everything, low-opacity so the
              glyph is the texture, not the message. */}
          <div
            aria-hidden="true"
            style={{
              position:      "absolute",
              top:           "-3vw",
              right:         "-4vw",
              pointerEvents: "none",
              userSelect:    "none",
            }}
          >
            <LogoMark size={420} variant="dark" opacity={0.05} />
          </div>

          <div style={{ ...innerWrapper, position: "relative", zIndex: 2 }}>
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
                Process
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
              What I add first isn&apos;t a Figma file. It&apos;s a sharper problem statement.
            </h1>

            <p style={{
              ...body,
              fontSize:  "clamp(18px, 1.6vw, 21px)",
              color:     "#3D4440",
              maxWidth:  "720px",
              margin:    0,
            }}>
              Two frames on this page. Where I add value, in the language teams already track. And how I think about the work, in the language I actually use.
            </p>
          </div>
        </section>

        {/* ── Where I add value ────────────────────────────────────────── */}
        <section aria-label="Where I add value" className="value-list" style={sectionWrapper("#F4F6F7")}>
          <div style={innerWrapper}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
              <LogoMark size={22} variant="dark" opacity={0.8} />
              <span style={{ display: "inline-block", height: "1px", flex: 1, maxWidth: "72px", background: "#B8B4AE" }} />
            </div>
            <h2 style={sectionH2}>Where I add value</h2>
            <p style={{ ...body, marginBottom: "40px" }}>
              The shorter version of how the work pays back.
            </p>

            <p style={beliefClaim} className="value-claim">I frame the problem before Figma opens.</p>
            <p style={beliefBody}>
              Most design hours go to the wrong question. I push for a sharp problem statement at the start so the team doesn&apos;t spend three weeks building a beautiful answer to the wrong brief. The case studies show the artifact; the savings happen earlier.
            </p>

            <p style={beliefClaim} className="value-claim">I tie design decisions to business outcomes.</p>
            <p style={beliefBody}>
              Revenue, retention, ship dates, ML-signal integrity. Every callout you see in the case studies names a trade-off in those terms. Stakeholders stop arguing about taste when the cost is named in the language they already track.
            </p>

            <p style={beliefClaim} className="value-claim">I talk fluently with PMs, engineers, and stakeholders.</p>
            <p style={beliefBody}>
              Eighteen years across marketing, operations, and product mean I can hold a technical review, a stakeholder briefing, and a research synthesis without translation cost. Less translation, fewer meetings, fewer surprises.
            </p>

            <p style={beliefClaim} className="value-claim">I run AI-augmented research and synthesis.</p>
            <p style={{ ...beliefBody, marginBottom: 0 }}>
              Claude for clustering 200-plus community posts. AI-assisted competitive audits. AI-augmented production workflows that cut a creative team&apos;s timelines twenty percent at VARA without dropping quality. The model is the second pair of hands, not the designer.
            </p>
          </div>
        </section>

        {/* ── Bridge pull quote ────────────────────────────────────────── */}
        <section aria-label="Bridge note" style={{ padding: "clamp(60px, 7vw, 96px) clamp(32px, 6vw, 80px)", background: "#F4F6F7" }}>
          <div style={innerWrapper}>
            <figure style={{
              margin:      0,
              borderLeft:  "3px solid var(--color-brand)",
              paddingLeft: "32px",
              maxWidth:    "780px",
            }}>
              <blockquote style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "clamp(24px, 3.2vw, 38px)",
                fontWeight:    500,
                lineHeight:    1.25,
                color:         "#252B28",
                margin:        0,
                letterSpacing: "-0.02em",
              }}>
                The work that ships is the work after the decisions are clear.
              </blockquote>
            </figure>
          </div>
        </section>

        {/* ── How I think about the work ───────────────────────────────── */}
        <section aria-label="How I think about the work" className="philo-list" style={sectionWrapper("#F4F6F7")}>
          <div style={innerWrapper}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
              <LogoMark size={22} variant="dark" opacity={0.8} />
              <span style={{ display: "inline-block", height: "1px", flex: 1, maxWidth: "72px", background: "#B8B4AE" }} />
            </div>
            <h2 style={sectionH2}>How I think about the work</h2>
            <p style={{ ...body, marginBottom: "40px" }}>
              A few things I&apos;ve come to believe.
            </p>

            <p style={beliefClaim} className="philo-claim">Design is decision-making.</p>
            <p style={beliefBody}>
              Everything visible on a screen is a record of choices someone made, and
              could have made differently. If you can&apos;t explain what you
              didn&apos;t build and why, you didn&apos;t really design it. You just
              shipped it.
            </p>

            <p style={beliefClaim} className="philo-claim">Problem framing comes before pixels.</p>
            <p style={beliefBody}>
              Most designs fail at the question, not the execution. What problem,
              for whom, under what constraints, and what would success actually mean.
              If those four answers aren&apos;t clear, the prettiest interface in the
              world won&apos;t save the work.
            </p>

            <p style={beliefClaim} className="philo-claim">Prototypes are probes, not proof.</p>
            <p style={beliefBody}>
              You build them to find out, not to convince. If you can&apos;t name in
              one sentence what the prototype is trying to teach you, you&apos;re
              producing, not prototyping.
            </p>

            <p style={beliefClaim} className="philo-claim">The best design decisions are also the cleanest business calls.</p>
            <p style={beliefBody}>
              When a trade-off is named in the language the org already tracks, stakeholder debates resolve fast. Most arguments about taste are really arguments about cost that nobody named.
            </p>

            <p style={beliefClaim} className="philo-claim">Translation cost between disciplines is real.</p>
            <p style={{ ...beliefBody, marginBottom: 0 }}>
              Designers, PMs, and engineers each carry a dialect. The team that doesn&apos;t need a translator between them ships faster. Eighteen years across marketing, operations, and product mean I can hold all three conversations without the relay.
            </p>
          </div>
        </section>

        {/* ── Closer + CTA ─────────────────────────────────────────────── */}
        <section aria-label="Next step" style={sectionWrapper("#FFFFFF")}>
          <div style={innerWrapper}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
              <LogoMark size={22} variant="dark" opacity={0.8} />
              <span style={{ display: "inline-block", height: "1px", flex: 1, maxWidth: "72px", background: "#B8B4AE" }} />
            </div>
            <p style={{ ...body, maxWidth: "620px", marginBottom: "36px" }}>
              If any of this reads like the seat you&apos;re trying to fill, the case studies show it running in the artifact. The contact page is the shortest way to start.
            </p>
            <Link href="/contact" className="process-cta-primary">
              Get in touch
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
