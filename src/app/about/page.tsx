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
            border-radius:  4px;
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
                    color:         "#A99B8A",
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

            <p style={beliefClaim}>Silence is never neutral.</p>
            <p style={beliefBody}>
              When users do something and the interface doesn&apos;t respond, they
              don&apos;t think the system is processing. They think it&apos;s broken.
              Every action needs a reply.
            </p>

            <p style={beliefClaim}>Hierarchy beats decoration.</p>
            <p style={{ ...beliefBody, marginBottom: 0 }}>
              If everything on the page competes equally for attention, nothing wins.
              Most of what looks like visual taste is actually weight, contrast, and
              restraint.
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
