import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Most design problems aren't visual problems. They're decisions someone hasn't made yet. UX/UI Designer in Portland, OR.",
  alternates: { canonical: "https://www.barreiro.com/about" },
  openGraph: {
    type: "website",
    url: "https://www.barreiro.com/about",
    title: "About · Alfonso Barreiro",
    description:
      "Most design problems aren't visual problems. They're decisions someone hasn't made yet. UX/UI Designer in Portland, OR.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About · Alfonso Barreiro",
    description:
      "Most design problems aren't visual problems. They're decisions someone hasn't made yet. UX/UI Designer in Portland, OR.",
  },
};

/* ── Shared style atoms ─────────────────────────────────────────────── */

const eyebrowRow: React.CSSProperties = {
  display:      "flex",
  alignItems:   "center",
  gap:          "12px",
  marginBottom: "20px",
};

const eyebrowDash: React.CSSProperties = {
  display:    "inline-block",
  width:      "24px",
  height:     "1px",
  background: "var(--color-accent)",
};

const eyebrowLabel: React.CSSProperties = {
  fontFamily:    "var(--font-dm-sans), sans-serif",
  fontSize:      "11px",
  fontWeight:    600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color:         "var(--color-accent)",
  margin:        0,
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
  fontFamily:   "var(--font-dm-sans), sans-serif",
  fontSize:     "17px",
  lineHeight:   1.75,
  color:        "#3D4440",
  margin:       "0 0 20px",
  maxWidth:     "680px",
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

/* StatCell — one cell in the "by the numbers" memory anchor.
   Big editorial number + optional unit + caption. Colors are tuned
   for the light surface (#FAFAF9). */
function StatCell({ n, unit, caption }: { n: string; unit: string; caption: string }) {
  return (
    <div>
      <p style={{
        fontFamily:    "var(--font-dm-sans), sans-serif",
        fontSize:      "clamp(80px, 11vw, 156px)",
        fontWeight:    300,
        lineHeight:    0.85,
        letterSpacing: "-0.05em",
        color:         "#252B28",
        margin:        "0 0 16px",
        fontVariantNumeric: "tabular-nums",
      }}>
        {n}
        {unit && (
          <span style={{
            fontSize:      "clamp(18px, 1.6vw, 22px)",
            fontWeight:    600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color:         "var(--color-brand)",
            marginLeft:    "16px",
            display:       "inline-block",
            verticalAlign: "middle",
          }}>{unit}</span>
        )}
      </p>
      <p style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize:   "14px",
        lineHeight: 1.55,
        color:      "#3D4440",
        margin:     0,
        maxWidth:   "300px",
      }}>
        {caption}
      </p>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main style={{ background: "#FFFFFF" }}>
        <style>{`
          .about-cta-primary,
          .about-cta-secondary {
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
            transition:     transform 0.25s ease, box-shadow 0.25s ease, background 0.2s, border-color 0.2s, color 0.2s;
          }
          .about-cta-primary {
            background:   var(--color-brand);
            border:       1px solid var(--color-brand);
            color:        #FFFFFF;
          }
          .about-cta-primary:hover {
            transform:    translateY(-2px);
            box-shadow:   0 4px 12px rgba(61,38,69,0.25);
            background:   #2A1830;
          }
          .about-cta-secondary {
            background:   #FFFFFF;
            border:       1px solid #B8B0A2;
            color:        #3D4440;
          }
          .about-cta-secondary:hover {
            transform:    translateY(-1px);
            border-color: #8A8680;
            color:        #252B28;
          }
          .about-studio-link {
            color:           var(--color-accent-hover);
            text-decoration: none;
            font-weight:     500;
            border-bottom:   1px solid rgba(122,139,110,0.35);
            transition:      border-color 0.2s, color 0.2s;
          }
          .about-studio-link:hover {
            border-bottom-color: var(--color-accent);
            color:               #4A5C42;
          }
        `}</style>

        {/* ── Hero ───────────────────────────────────────────────────── */}
        {/* Hero photo: Brad Neathery, Unsplash (free license). Designer's hand
            sketching lettering in a notebook on a warm wooden desk, with a
            DSLR and laptop in the wider frame. Source image is landscape
            (2400x1603); the 3:4 portrait container crops on the hand and
            notebook via objectPosition. Reinforces the "thinking before
            screens" thesis. */}
        <section
          style={{
            padding:    "140px clamp(32px, 6vw, 80px) 96px",
            background: "#FFFFFF",
          }}
        >
          <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
            <div className="about-hero-grid">
              {/* Left: text */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={eyebrowRow}>
                  <span style={eyebrowDash} />
                  <p style={{ ...eyebrowLabel, color: "#8A8680" }}>About</p>
                </div>
                <h1
                  style={{
                    fontFamily:    "var(--font-dm-sans), sans-serif",
                    fontSize:      "clamp(36px, 4.8vw, 60px)",
                    fontWeight:    600,
                    color:         "#252B28",
                    margin:        "0 0 12px",
                    letterSpacing: "-0.025em",
                    lineHeight:    1.1,
                  }}
                >
                  Most design problems aren&apos;t visual problems.
                </h1>
                <p
                  style={{
                    fontFamily:    "var(--font-dm-sans), sans-serif",
                    fontSize:      "clamp(20px, 2.6vw, 30px)",
                    fontWeight:    500,
                    color:         "var(--color-brand)",
                    margin:        0,
                    letterSpacing: "-0.02em",
                    lineHeight:    1.2,
                  }}
                >
                  They&apos;re decisions someone hasn&apos;t made yet.
                </p>
              </div>

              {/* Right: hero photo */}
              <div>
                <div
                  style={{
                    position:    "relative",
                    width:       "100%",
                    aspectRatio: "3 / 4",
                    overflow:    "hidden",
                    background:  "#F5F5F4",
                  }}
                >
                  <Image
                    src="/about-hero.jpg"
                    alt="A designer's hand sketching lettering in a notebook on a warm wooden desk, wristwatch visible, DSLR and laptop in the frame."
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 540px"
                    style={{ objectFit: "cover", objectPosition: "35% center" }}
                  />
                </div>
                <p
                  style={{
                    fontFamily:    "var(--font-dm-sans), sans-serif",
                    fontSize:      "10px",
                    color:         "#A8A39A",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    margin:        "10px 0 0",
                  }}
                >
                  Photo · Brad Neathery · Unsplash
                </p>
              </div>
            </div>
          </div>

          <style>{`
            .about-hero-grid {
              display: grid;
              grid-template-columns: 1.1fr 0.9fr;
              gap: 64px;
              align-items: stretch;
            }
            @media (max-width: 768px) {
              .about-hero-grid {
                grid-template-columns: 1fr;
                gap: 40px;
              }
              .about-hero-grid > div:last-child {
                order: -1;
              }
            }
          `}</style>
        </section>

        {/* ── By the numbers — memory anchor stat block ────────────────
              Distills the About story into three sticky figures so the
              page has a single editorial moment people can carry away.
              Same rhythm as the MSR funnel stats + the home 13× hook.
              Light surface (matches the rest of the page) — the numbers
              carry the weight without needing a dark slab to punch. */}
        <section style={{
          background: "#FAFAF9",
          color:      "#252B28",
          padding:    "clamp(60px, 7vw, 100px) clamp(24px, 5vw, 80px)",
          borderTop:    "1px solid #E6E3DE",
          borderBottom: "1px solid #E6E3DE",
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                display:      "flex",
                alignItems:   "center",
                gap:          "14px",
                marginBottom: "clamp(28px, 4vw, 44px)",
              }}
            >
              <span style={{
                display:    "inline-block",
                width:      "32px",
                height:     "1px",
                background: "var(--color-accent)",
                flexShrink: 0,
              }} />
              <p style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "12px",
                fontWeight:    600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color:         "#6E6E6A",
                margin:        0,
              }}>
                Fifteen years · one discipline
              </p>
            </div>

            <div
              className="about-stats-grid"
              style={{
                display:             "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap:                 "clamp(32px, 5vw, 80px)",
                alignItems:          "end",
              }}
            >
              <StatCell n="15"   unit="years"  caption="In design. Across editorial, e-commerce, hospitality, foot health, travel, and music." />
              <StatCell n="4+"   unit=""       caption="Years remote, across two chapters since 2019. Solo, end to end, against deadlines that didn't move." />
              <StatCell n="3"    unit=""       caption="Case studies — MSR, Spotify, Wayfarer. Same operating model. Different industries." />
            </div>
          </div>
          <style>{`
            /* Keep the trio 3-up on mobile — stacking it vertically lost
               the "by the numbers" gestalt. Smaller numerals + tighter gap
               make the row fit at 375-500px while preserving the visual
               comparison among the three stats. */
            @media (max-width: 760px) {
              .about-stats-grid {
                grid-template-columns: 1fr 1fr 1fr !important;
                gap: 12px !important;
              }
              .about-stats-grid p:first-child {
                font-size: clamp(40px, 14vw, 64px) !important;
                margin-bottom: 8px !important;
              }
              .about-stats-grid p:first-child > span {
                font-size: 11px !important;
                margin-left: 4px !important;
                display: block !important;
              }
              .about-stats-grid p:last-child {
                font-size: 11px !important;
                line-height: 1.4 !important;
              }
            }
          `}</style>
        </section>

        {/* ── What pulled me into design ─────────────────────────────── */}
        <section style={sectionWrapper("#FFFFFF")}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>What pulled me into design</h2>
            <p style={body}>
              For a long time I thought building meant writing the code. The design
              part was something you did after, to make it presentable.
            </p>
            <p style={body}>
              The shift didn&apos;t happen from one moment. It happened from watching
              people use the things I built and seeing the gap between what I meant
              and what they saw. The link they couldn&apos;t find. The button they
              didn&apos;t know was a button. The form they abandoned halfway through,
              not because the data was hard but because the next step wasn&apos;t clear.
            </p>
            <p style={body}>
              That gap is what pulled me into design. Not the visual part. The
              decisions underneath.
            </p>
            <p style={body}>
              I tried a few directions before this one. Front-end engineering, which
              is where most career-path code people end up. Visual design, which I
              love but wasn&apos;t enough on its own. Eventually I landed where the
              work I actually wanted to do lives. Somewhere between research,
              decision-making, and the screens you ship.
            </p>
            <p style={{ ...body, margin: 0 }}>
              UX/UI isn&apos;t really the right name for it. The real work is upstream
              of both.
            </p>
          </div>
        </section>

        {/* ── How I work — the remote-work narrative as the spine.
             Prose first (three chapters: in-office, going remote, the
             current remote chapter). Visual timeline below locks the
             career arc in one frame. */}
        <section style={sectionWrapper("#FFFFFF")}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>How I work</h2>
            <p style={body}>
              I started in Albuquerque in 2010, as the founder of a small consultancy. Then seven years at CliffDweller Digital. Agency work, hands-on, in-person every day. In 2018 I moved to Boomtime as VP of Operations, same city, same desk, same shared room. That&apos;s where I learned what most designers learn: the desk next to you is half the work.
            </p>
            <p style={body}>
              I went remote in 2019, about a year and a half into Boomtime. At first the change was mine, not the company&apos;s. Then the rest of the industry caught up. We shipped UX/UI work for a hundred-plus client websites without an office. I held the design quality bar the same way I&apos;d held it in person: tight feedback loops, written critique, fewer meetings, more artifacts. The work didn&apos;t suffer. Some of it got cleaner.
            </p>
            <p style={body}>
              Two-plus years followed at VARA Winery &amp; Distillery as Director of Marketing &amp; DTC. Back in-person in Albuquerque, running the site redesign and the brand identity for a new spirits line. Then in late 2024 I left the director seat to go all-in on UX/UI. The remote chapter resumed in Portland: independent practice, DesignLab UX Academy, three case studies. None of them built from a shared room.
            </p>
            <p style={{ ...body, margin: "0 0 64px" }}>
              Remote isn&apos;t a constraint; it&apos;s a discipline. The three case studies on this site are evidence the model works at the artifact level. Built solo, remote, end to end.
            </p>

            <RemoteTimeline />
          </div>
        </section>

        {/* ── Where I add value — the business-benefit beats lifted from
             the resume. Converts the craft signal into a hire signal so a
             skimming hiring manager sees what they get if they bring me on. */}
        <section style={sectionWrapper("#FAFAF9")}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>Where I add value</h2>
            <p style={{ ...body, marginBottom: "40px" }}>
              The shorter version of how the work pays back.
            </p>

            <p style={beliefClaim}>I frame the problem before Figma opens.</p>
            <p style={beliefBody}>
              Most design hours go to the wrong question. I push for a sharp problem statement at the start so the team doesn&apos;t spend three weeks building a beautiful answer to the wrong brief. The case studies show the artifact; the savings happen earlier.
            </p>

            <p style={beliefClaim}>I tie design decisions to business outcomes.</p>
            <p style={beliefBody}>
              Revenue, retention, ship dates, ML-signal integrity. Every callout you see in the case studies names a trade-off in those terms. Stakeholders stop arguing about taste when the cost is named in the language they already track.
            </p>

            <p style={beliefClaim}>I talk fluently with PMs, engineers, and stakeholders.</p>
            <p style={beliefBody}>
              Eighteen years across marketing, operations, and product mean I can hold a technical review, a stakeholder briefing, and a research synthesis without translation cost. Less translation, fewer meetings, fewer surprises.
            </p>

            <p style={beliefClaim}>I run AI-augmented research and synthesis.</p>
            <p style={{ ...beliefBody, marginBottom: 0 }}>
              Claude for clustering 200-plus community posts. AI-assisted competitive audits. AI-augmented production workflows that cut a creative team&apos;s timelines twenty percent at VARA without dropping quality. The model is the second pair of hands, not the designer.
            </p>
          </div>
        </section>

        {/* ── Pull quote between the two long claim/body sections.
             Breaks up the 9-claim stack with one editorial breath. The
             quote ties "value" (business outcomes) to "thinking" (design as
             decision-making) so it bridges the two sections without
             duplicating a line from either. */}
        <section style={{ padding: "clamp(60px, 7vw, 96px) clamp(32px, 6vw, 80px)", background: "#FAFAF9" }}>
          <div style={innerWrapper}>
            <figure
              className="scroll-reveal"
              style={{
                margin:       0,
                borderLeft:   "3px solid var(--color-brand)",
                paddingLeft:  "32px",
                maxWidth:     "780px",
              }}
            >
              <blockquote
                style={{
                  fontFamily:    "var(--font-dm-sans), sans-serif",
                  fontSize:      "clamp(24px, 3.2vw, 38px)",
                  fontWeight:    500,
                  lineHeight:    1.25,
                  color:         "#252B28",
                  margin:        0,
                  letterSpacing: "-0.02em",
                }}
              >
                The work that ships is the work after the decisions are clear.
              </blockquote>
            </figure>
          </div>
        </section>

        {/* ── How I think about the work ─────────────────────────────── */}
        <section style={sectionWrapper("#FAFAF9")}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>How I think about the work</h2>
            <p style={{ ...body, marginBottom: "40px" }}>
              A few things I&apos;ve come to believe.
            </p>

            <p style={beliefClaim}>Design is decision-making.</p>
            <p style={beliefBody}>
              Everything visible on a screen is a record of choices someone made, and
              could have made differently. If you can&apos;t explain what you
              didn&apos;t build and why, you didn&apos;t really design it. You just
              shipped it.
            </p>

            <p style={beliefClaim}>Problem framing comes before pixels.</p>
            <p style={beliefBody}>
              Most designs fail at the question, not the execution. What problem,
              for whom, under what constraints, and what would success actually mean.
              If those four answers aren&apos;t clear, the prettiest interface in the
              world won&apos;t save the work.
            </p>

            <p style={beliefClaim}>Prototypes are probes, not proof.</p>
            <p style={beliefBody}>
              You build them to find out, not to convince. If you can&apos;t name in
              one sentence what the prototype is trying to teach you, you&apos;re
              producing, not prototyping.
            </p>

            <p style={beliefClaim}>The best design decisions are also the cleanest business calls.</p>
            <p style={beliefBody}>
              Revenue, retention, ship dates, ML-signal integrity. When a trade-off is named in the language the org already tracks, stakeholder debates resolve fast. Most arguments about taste are really arguments about cost that nobody named.
            </p>

            <p style={beliefClaim}>Translation cost between disciplines is real.</p>
            <p style={{ ...beliefBody, marginBottom: 0 }}>
              Designers, PMs, and engineers each carry a dialect. The team that doesn&apos;t need a translator between them moves faster, ships cleaner, and survives the messy projects. Eighteen years across marketing, operations, and product mean I can hold all three conversations without the relay.
            </p>
          </div>
        </section>

        {/* ── Alpha Beta Design ──────────────────────────────────────── */}
        <section style={sectionWrapper("#FAFAF9")}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>Alpha Beta Design</h2>
            <p style={{ ...body, margin: 0 }}>
              On the side, I run a small studio called{" "}
              <a
                href="https://alphabeta.design/"
                target="_blank"
                rel="noopener noreferrer"
                className="about-studio-link"
              >
                Alpha Beta Design
              </a>
              . It&apos;s a portable design system and a set of microsite templates I
              use for client work. The portfolio site you&apos;re on is built on it.
              Wayfarer and Men&apos;s Sole Revival are too.
            </p>
          </div>
        </section>

        {/* ── On the shelf ───────────────────────────────────────────── */}
        <section style={sectionWrapper("#FFFFFF")}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>On the shelf</h2>
            <p style={body}>
              Two books on the desk right now:{" "}
              <em style={{ color: "#252B28" }}>Designing with Intention</em> and{" "}
              <em style={{ color: "#252B28" }}>Refactoring UI</em>. The first is about
              how to think about design. The second is about how to make a screen
              actually look right. I&apos;m trying to read them as one lens, not two
              separate books.
            </p>
            <p style={{ ...body, margin: 0 }}>
              I also keep a vault of notes bigger than I&apos;ll ever finish.
              That&apos;s fine. I&apos;d rather have too much material than too little.
            </p>
          </div>
        </section>

        {/* ── Off-screen — moved from the home About to keep the home tighter
             (two paragraphs, not three). The Hiragana/walks/birds material
             reads more honestly here, alongside the "On the shelf" reading
             section, than as a closer on the homepage. ────────────────── */}
        <section style={sectionWrapper("#FAFAF9")}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>Off-screen</h2>
            <p style={{ ...body, margin: 0 }}>
              I still learn like I&apos;m running out of time. I&apos;m teaching
              myself Hiragana. I walk five miles a day, building back toward a
              marathon. I meditate. I watch birds. I read everything. If that
              sounds like someone with too many interests, you&apos;re probably
              right. But the curiosity is the same muscle I use in research. I
              just don&apos;t turn it off.
            </p>
          </div>
        </section>

        {/* ── Find me in Portland ────────────────────────────────────── */}
        <section style={sectionWrapper("#FFFFFF")}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>Find me in Portland</h2>
            <p style={{ ...body, marginBottom: "36px" }}>
              If any of this resonates, or if you have a problem you want a second
              pair of eyes on, the easiest way to reach me is over coffee. I keep a
              calendar open.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href="https://cal.com/alfonso-barreiro"
                target="_blank"
                rel="noopener noreferrer"
                className="about-cta-primary"
              >
                Coffee in Portland
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <Link href="/contact" className="about-cta-secondary">
                Send a message
              </Link>
              <a
                href="https://www.linkedin.com/in/alfonso-barreiro/"
                target="_blank"
                rel="noopener noreferrer"
                className="about-cta-secondary"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ── Remote timeline — visual career arc.
   Fifteen-year horizontal strip with proportional chapter bars.
   In-office chapters render in ink; remote chapters render in crimson.
   A dashed vertical mark at 2020 anchors "remote since" to the year.
   Below, a small grid of chapter cards with role + location + one line. */
function RemoteTimeline() {
  // Year span: 2010 → end of 2025 = 15 years total. Each chapter's
  // proportional width comes from its share of those 15 years.
  const YEARS = 15;
  const TIMELINE_START = 2010;
  const REMOTE_START = 2019;

  const chapters: {
    name: string;
    role: string;
    location: string;
    note: string;
    start: number;
    end: number;
    remote: boolean;
  }[] = [
    { name: "Sola Fide Design",   role: "Founder",                        location: "Albuquerque",        note: "Brand identity, web design, campaign creative for e-commerce and small business.",         start: 2010,    end: 2011,    remote: false },
    { name: "CliffDweller Digital", role: "Web Designer & Developer",      location: "Albuquerque",        note: "50+ responsive websites. Started running user tests on priority projects.",                start: 2011,    end: 2018,    remote: false },
    { name: "Boomtime",            role: "Lead Graphic Design",            location: "Albuquerque",        note: "Joined as Lead Graphic Design. Set the visual quality bar for client work before going remote and stepping up to VP.",  start: 2018,    end: 2019.5,  remote: false },
    { name: "Boomtime",            role: "VP of Operations · remote",      location: "Remote · Albuquerque", note: "Promoted to VP and went remote. Same client roster, distributed team, same quality bar.",        start: 2019.5, end: 2021.75, remote: true  },
    { name: "VARA Winery & Distillery", role: "Director of Marketing & DTC", location: "Albuquerque",          note: "Back in-person at the winery. Redesigned the site and brand identity for a new spirits line. AI-assisted workflows.", start: 2022.25, end: 2024.85, remote: false },
    { name: "Independent Practice",     role: "UX/UI Designer",             location: "Remote · Portland",    note: "DesignLab UX Academy. Three case studies. Build in Figma, ship in Next.js.",               start: 2024.85, end: 2025.5,  remote: true  },
  ];

  const yearTicks = [2010, 2014, 2018, 2020, 2024];

  return (
    <div style={{ width: "100%" }}>
      {/* Top eyebrow */}
      <p style={{
        fontFamily:    "var(--font-dm-sans), sans-serif",
        fontSize:      "11px",
        fontWeight:    700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color:         "var(--color-accent)",
        margin:        "0 0 12px",
      }}>
        Career arc · fifteen years
      </p>
      <h3 style={{
        fontFamily:    "var(--font-dm-sans), sans-serif",
        fontSize:      "clamp(22px, 2.4vw, 30px)",
        fontWeight:    600,
        color:         "#252B28",
        margin:        "0 0 32px",
        letterSpacing: "-0.02em",
        lineHeight:    1.2,
      }}>
        Six chapters. Two remote periods. One through-line.
      </h3>

      {/* The strip */}
      <div className="rt-strip-wrap" style={{ position: "relative", marginBottom: "32px" }}>
        {/* Year ticks above */}
        <div style={{
          position: "relative",
          height: "20px",
          marginBottom: "6px",
        }}>
          {yearTicks.map((y) => {
            const leftPct = ((y - TIMELINE_START) / YEARS) * 100;
            return (
              <span key={y} style={{
                position:      "absolute",
                left:          `${leftPct}%`,
                top:           0,
                transform:     "translateX(-50%)",
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "11px",
                fontWeight:    600,
                color:         "#8A8680",
                letterSpacing: "0.06em",
              }}>{y}</span>
            );
          })}
        </div>

        {/* Bars row */}
        <div style={{
          position: "relative",
          height: "44px",
          background: "#F5F3EE",
          border: "1px solid #DEDCD7",
        }}>
          {chapters.map((ch) => {
            const leftPct  = ((ch.start - TIMELINE_START) / YEARS) * 100;
            const widthPct = ((ch.end - ch.start) / YEARS) * 100;
            return (
              <div
                key={ch.name + ch.start}
                title={`${ch.role} · ${ch.name} · ${Math.floor(ch.start)}–${ch.end >= 2025.4 ? "now" : Math.floor(ch.end)}`}
                style={{
                  position:   "absolute",
                  top:        "4px",
                  bottom:     "4px",
                  left:       `${leftPct}%`,
                  width:      `${widthPct}%`,
                  background: ch.remote ? "var(--color-brand)" : "#252B28",
                  opacity:    0.92,
                  borderRight: ch.end < 2025.4 ? "1px solid rgba(255,255,255,0.7)" : "none",
                  cursor:     "default",
                }}
              />
            );
          })}

          {/* 2020 dashed marker */}
          <span style={{
            position: "absolute",
            top:      "-22px",
            bottom:   "-22px",
            left:     `${((REMOTE_START - TIMELINE_START) / YEARS) * 100}%`,
            width:    "0",
            borderLeft: "1.5px dashed var(--color-brand)",
            pointerEvents: "none",
          }} aria-hidden />
        </div>

        {/* Remote-since callout below the strip, aligned to 2020 */}
        <div style={{
          position: "relative",
          marginTop: "10px",
          height: "20px",
        }}>
          <span style={{
            position:      "absolute",
            left:          `${((REMOTE_START - TIMELINE_START) / YEARS) * 100}%`,
            top:           0,
            transform:     "translateX(-50%)",
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "10px",
            fontWeight:    700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color:         "var(--color-brand)",
            whiteSpace:    "nowrap",
          }}>
            ↑ First remote chapter · 2019
          </span>
        </div>
      </div>

      {/* Legend */}
      <div style={{
        display: "flex",
        gap: "24px",
        flexWrap: "wrap",
        marginBottom: "40px",
      }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", color: "#3D4440", letterSpacing: "0.02em" }}>
          <span style={{ display: "inline-block", width: "14px", height: "10px", background: "#252B28" }} aria-hidden />
          In-office · 2010–2019, 2022–2024
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", color: "#3D4440", letterSpacing: "0.02em" }}>
          <span style={{ display: "inline-block", width: "14px", height: "10px", background: "var(--color-brand)" }} aria-hidden />
          Remote · 2019–2021, 2024–now
        </span>
      </div>

      {/* Chapter cards */}
      <div className="rt-cards" style={{
        display:             "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap:                 "16px",
      }}>
        {chapters.map((ch) => {
          const yearLabel = ch.end >= 2025.4
            ? `${Math.floor(ch.start)} → now`
            : `${Math.floor(ch.start)} → ${Math.floor(ch.end)}`;
          return (
            <article key={ch.name + ch.start} style={{
              background:  "#FFFFFF",
              border:      "1px solid #DEDCD7",
              borderTop:   `3px solid ${ch.remote ? "var(--color-brand)" : "#252B28"}`,
              padding:     "20px 22px",
            }}>
              <p style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "10px",
                fontWeight:    700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color:         ch.remote ? "var(--color-brand)" : "#8A8680",
                margin:        "0 0 6px",
              }}>{yearLabel}{ch.remote ? " · Remote" : ""}</p>
              <p style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "16px",
                fontWeight:    700,
                color:         "#252B28",
                margin:        "0 0 4px",
                letterSpacing: "-0.01em",
              }}>{ch.name}</p>
              <p style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "13px",
                fontWeight:    500,
                color:         "#3D4440",
                margin:        "0 0 10px",
              }}>{ch.role} · {ch.location}</p>
              <p style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize:   "12px",
                lineHeight: 1.55,
                color:      "#8A8680",
                margin:     0,
              }}>{ch.note}</p>
            </article>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 760px) {
          .rt-cards { grid-template-columns: 1fr !important; gap: 12px !important; }
        }
      `}</style>
    </div>
  );
}
