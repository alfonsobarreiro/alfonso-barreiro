import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HoursRibbon from "./_components/HoursRibbon";
import BridgeQuote from "./_components/BridgeQuote";
import { PersonSchema } from "@/components/structured-data/PersonSchema";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Where I add value, in the language teams already track. How I think about the work, in the language I actually use. Fifteen years across agency and product.",
  alternates: { canonical: "https://www.barreiro.com/process" },
  openGraph: {
    type: "website",
    url: "https://www.barreiro.com/process",
    title: "Process · Alfonso Barreiro",
    description:
      "Where I add value, in the language teams already track. How I think about the work, in the language I actually use. Fifteen years across agency and product.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Process · Alfonso Barreiro",
    description:
      "Where I add value, in the language teams already track. How I think about the work, in the language I actually use. Fifteen years across agency and product.",
  },
};

/* Page runs on Warm White paper ground with ink text.
   Matches /about pattern; sections tighten to 48px padding. */

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
  color:      "var(--color-text)",
  margin:     "0 0 24px",
  maxWidth:   "680px",
};

const beliefClaim: React.CSSProperties = {
  ...body,
  color:        "var(--color-text)",
  fontWeight:   500,
  marginBottom: "8px",
};

const beliefBody: React.CSSProperties = {
  ...body,
  marginBottom: "40px",
};

const sectionWrapper = (): React.CSSProperties => ({
  padding:    "48px clamp(32px, 6vw, 80px)",
  background: "var(--color-paper)",
});

const innerWrapper: React.CSSProperties = {
  width:    "100%",
  maxWidth: "var(--content-max)",
  margin:   "0 auto",
};

const artifactTile: React.CSSProperties = {
  marginTop:  "40px",
  background: "var(--color-neutral-100)",
  padding:    "clamp(24px, 3vw, 40px) clamp(24px, 3vw, 32px)",
  border:     "1px solid var(--color-neutral-300)",
};

export default function ProcessPage() {
  return (
    <>
      <PersonSchema />
      <Nav />
      <main id="main-content" style={{ background: "var(--color-paper)" }}>
        <style>{`
          .value-list  { counter-reset: value; }
          .philo-list  { counter-reset: philo; }
          .value-claim,
          .philo-claim {
            position:     relative;
            padding-left: clamp(40px, 4vw, 56px);
          }
          .value-claim { counter-increment: value; }
          .philo-claim { counter-increment: philo; }
          .value-claim::before,
          .philo-claim::before {
            content:              counter(value, decimal-leading-zero);
            position:             absolute;
            left:                 0;
            top:                  0.05em;
            font-family:          var(--font-dm-sans), sans-serif;
            font-size:            clamp(20px, 2.4vw, 28px);
            font-weight:          500;
            letter-spacing:       0;
            color:                var(--color-text);
            font-variant-numeric: tabular-nums;
            line-height:          1;
          }
          .philo-claim::before {
            content: counter(philo, decimal-leading-zero);
          }
          @media (max-width: 640px) {
            .value-claim,
            .philo-claim {
              padding-left: 0;
              padding-top:  32px;
            }
            .value-claim::before,
            .philo-claim::before {
              font-size:      15px;
              font-weight:    500;
              letter-spacing: 0;
              top:            0;
            }
          }

          .philo-item {
            position:      relative;
            margin-bottom: 8px;
          }
          .philo-item + .philo-item { margin-top: 32px; }

          .process-cta-primary {
            display:         inline-flex;
            align-items:     center;
            gap:             8px;
            padding:         16px 24px;
            font-family:     var(--font-dm-sans), sans-serif;
            font-size:       15px;
            font-weight:     500;
            letter-spacing:  0;
            text-decoration: none;
            border-radius:   0;
            background:      var(--color-brand);
            border:          1px solid var(--color-brand);
            color:           var(--color-inverse);
            transition:      background 0.2s, border-color 0.2s;
          }
          .process-cta-primary:hover {
            background:   var(--color-brand-hover);
            border-color: var(--color-brand-hover);
          }
        `}</style>

        {/* ── Hero ── */}
        <section aria-label="Process introduction" style={{
          padding:  "96px clamp(32px, 6vw, 80px) 64px",
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
              What I add first isn&rsquo;t a Figma file. It&rsquo;s a sharper problem statement.
            </h1>

            <p style={{ ...body, maxWidth: "720px", margin: 0 }}>
              Two frames on this page. Where I add value, in the language teams already track. And how I think about the work, in the language I actually use.
            </p>
          </div>
        </section>

        {/* ── Where the hours go ── */}
        <section aria-label="Where the hours go" style={sectionWrapper()}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>One project. Five moves.</h2>
            <p style={{ ...body, marginBottom: 0 }}>
              Ranked by hours. Figma is the shortest.
            </p>
            <div style={artifactTile}>
              <HoursRibbon />
            </div>
          </div>
        </section>

        {/* ── Where I add value ── */}
        <section aria-label="Where I add value" className="value-list" style={sectionWrapper()}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>Where I add value</h2>
            <p style={{ ...body, marginBottom: "40px" }}>
              The shorter version of how the work pays back.
            </p>

            <p style={beliefClaim} className="value-claim">I frame the problem before Figma opens.</p>
            <p style={beliefBody}>
              Most design hours go to the wrong question. I push for a sharp problem statement at the start so the team doesn&rsquo;t spend three weeks building a beautiful answer to the wrong brief. The case studies show the artifact; the savings happen earlier.
            </p>

            <p style={beliefClaim} className="value-claim">I tie design decisions to business outcomes.</p>
            <p style={beliefBody}>
              Revenue, retention, ship dates, ML-signal integrity. Every callout you see in the case studies names a trade-off in those terms. Stakeholders stop arguing about taste when the cost is named in the language they already track.
            </p>

            <p style={beliefClaim} className="value-claim">I talk fluently with PMs, engineers, and stakeholders.</p>
            <p style={{ ...beliefBody, marginBottom: 0 }}>
              Fifteen years across marketing, operations, and product mean I can hold a technical review, a stakeholder briefing, and a research synthesis without translation cost. Less translation, fewer meetings, fewer surprises.
            </p>
          </div>
        </section>

        {/* ── Bridge quote ── */}
        <section aria-label="Bridge note" style={sectionWrapper()}>
          <div style={innerWrapper}>
            <div style={{
              background: "var(--color-neutral-100)",
              padding:    "clamp(32px, 4vw, 64px) clamp(24px, 3vw, 48px)",
              border:     "1px solid var(--color-neutral-300)",
            }}>
              <BridgeQuote />
            </div>
          </div>
        </section>

        {/* ── How I think about the work ── */}
        <section aria-label="How I think about the work" className="philo-list" style={sectionWrapper()}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>How I think about the work</h2>
            <p style={{ ...body, marginBottom: "40px" }}>
              A few things I&rsquo;ve come to believe.
            </p>

            <div className="philo-item">
              <p style={beliefClaim} className="philo-claim">Design is decision-making.</p>
              <p style={beliefBody}>
                Everything visible on a screen is a record of choices someone made, and could have made differently. If you can&rsquo;t explain what you didn&rsquo;t build and why, you didn&rsquo;t really design it. You just shipped it.
              </p>
            </div>

            <div className="philo-item">
              <p style={beliefClaim} className="philo-claim">Problem framing comes before pixels.</p>
              <p style={beliefBody}>
                Most designs fail at the question, not the execution. What problem, for whom, under what constraints, and what would success actually mean. If those four answers aren&rsquo;t clear, the prettiest interface in the world won&rsquo;t save the work.
              </p>
            </div>

            <div className="philo-item">
              <p style={beliefClaim} className="philo-claim">Prototypes are probes, not proof.</p>
              <p style={beliefBody}>
                You build them to find out, not to convince. If you can&rsquo;t name in one sentence what the prototype is trying to teach you, you&rsquo;re producing, not prototyping.
              </p>
            </div>

            <div className="philo-item">
              <p style={beliefClaim} className="philo-claim">The best design decisions are also the cleanest business calls.</p>
              <p style={beliefBody}>
                When a trade-off is named in the language the org already tracks, stakeholder debates resolve fast. Most arguments about taste are really arguments about cost that nobody named.
              </p>
            </div>

            <div className="philo-item">
              <p style={beliefClaim} className="philo-claim">Translation cost between disciplines is real.</p>
              <p style={beliefBody}>
                Designers, PMs, and engineers each carry a dialect. The team that doesn&rsquo;t need a translator between them ships faster. Fifteen years across marketing, operations, and product mean I can hold all three conversations without the relay.
              </p>
            </div>
          </div>
        </section>

        {/* ── How I use AI ── */}
        <section aria-label="How I use AI" style={sectionWrapper()}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>How I use AI</h2>
            <p style={{ ...body, fontWeight: 500, marginBottom: "32px", maxWidth: "720px" }}>
              AI holds the complexity so I can hold the craft.
            </p>
            <p style={body}>
              Every project passes through a stack I&rsquo;ve built inside Claude Code. Twenty-plus custom skills automate design-system audits, voice reviews, brand-token checks, competitive scans. A dozen subagents handle research, critique, and copy sweeps in parallel. A vault holds every design decision, every review, every project log, so context survives between sessions.
            </p>
            <p style={body}>
              The point isn&rsquo;t speed. It&rsquo;s holding more without dropping. Eighteen concurrent projects instead of three. Every case study checked against Designing with Intention, Refactoring UI, NN/g, and the twenty senior portfolios I calibrate against. The review happens automatically. Every deliverable filtered for AI-tell vocabulary against my own voice profile. The edit pass is scripted.
            </p>
            <p style={{ ...body, margin: 0 }}>
              What AI doesn&rsquo;t do: pick the direction, make the taste calls, decide what to refuse. Those stay mine.
            </p>
          </div>
        </section>

        {/* ── Closer + CTA ── */}
        <section aria-label="Next step" style={sectionWrapper()}>
          <div style={innerWrapper}>
            <p style={{ ...body, maxWidth: "620px", marginBottom: "24px" }}>
              If any of this reads like the seat you&rsquo;re trying to fill, the case studies show it running in the artifact. An email is the shortest way to start.
            </p>
            <a href="mailto:alfonso@barreiro.com" className="process-cta-primary">
              Get in touch
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
