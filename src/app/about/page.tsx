import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PersonSchema } from "@/components/structured-data/PersonSchema";

export const metadata: Metadata = {
  title: "About",
  description:
    "Fifteen years in design. Product Designer in Portland, OR. Three flagship case studies: Spotify controls, Wayfarer travel discovery, and Men's Sole Revival.",
  alternates: { canonical: "https://www.barreiro.com/about" },
  openGraph: {
    type: "website",
    url: "https://www.barreiro.com/about",
    title: "About · Alfonso Barreiro",
    description:
      "Fifteen years in design. Product Designer in Portland, OR. Three flagship case studies: Spotify controls, Wayfarer travel discovery, and Men's Sole Revival.",
    images: ["/about/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About · Alfonso Barreiro",
    description:
      "Fifteen years in design. Product Designer in Portland, OR. Three flagship case studies: Spotify controls, Wayfarer travel discovery, and Men's Sole Revival.",
    images: ["/about/opengraph-image"],
  },
};

/* ── Shared style atoms ─────────────────────────────────────────────── */
/* Page runs on Warm White paper ground with ink text. Terracotta
   is the accent on eyebrows + brand pull-quote rules. A dark section
   only earns its place if a specific editorial moment calls for it. */

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
  background: "var(--color-brand)",
};

const eyebrowLabel: React.CSSProperties = {
  fontFamily:    "var(--font-dm-sans), sans-serif",
  fontSize:      "12px",
  fontWeight:    500,
  letterSpacing: "0.01em",
  color:         "var(--color-brand)",
  margin:        0,
};

const sectionH2: React.CSSProperties = {
  fontFamily:    "var(--font-dm-sans), sans-serif",
  fontSize:      "clamp(28px, 3.5vw, 40px)",
  fontWeight:    500,
  color:         "var(--color-text)",
  margin:        "0 0 24px",
  letterSpacing: "-0.01em",
  lineHeight:    1.15,
};

const body: React.CSSProperties = {
  fontFamily:   "var(--font-dm-sans), sans-serif",
  fontSize:     "17px",
  lineHeight:   1.6,
  color:        "var(--color-text)",
  margin:       "0 0 24px",
  maxWidth:     "680px",
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

/* Pull-quote: left-aligned, DM Sans, never italic. Terracotta left
   rail carries the accent on the ink ground. */
const pullQuoteWrap: React.CSSProperties = {
  margin:       "32px 0",
  padding:      "8px 0 8px 24px",
  borderLeft:   "3px solid var(--color-brand)",
  maxWidth:     "720px",
};
const pullQuoteText: React.CSSProperties = {
  fontFamily:    "var(--font-dm-sans), sans-serif",
  fontSize:      "clamp(20px, 2.5vw, 28px)",
  fontWeight:    500,
  lineHeight:    1.15,
  color:         "var(--color-text)",
  letterSpacing: "-0.01em",
  margin:        0,
};

/* ── Page ───────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <>
      <PersonSchema />
      <Nav />
      <main id="main-content" style={{ background: "var(--color-paper)" }}>
        <style>{`
          /* Inline links: underlined ink, hover flashes to Terracotta.
             Same pattern for the "On the shelf" book titles. */
          .about-studio-link,
          .about-shelf-link {
            color:           var(--color-text);
            text-decoration: none;
            font-weight:     500;
            border-bottom:   1px solid var(--color-neutral-400);
            transition:      border-color 0.2s, color 0.2s;
          }
          .about-studio-link:hover,
          .about-shelf-link:hover {
            border-bottom-color: var(--color-brand);
            color:               var(--color-brand);
          }

          /* RemoteTimeline: bars are hover/focus reveals for their
             matching chapter card. No jump, no outline. Base colors
             are set via CSS (not inline) so :has() can override the
             card background without an !important fight. On hover
             or keyboard focus the bar shifts to a fuller color and
             the corresponding card underneath fills with light gray. */
          .rt-bar {
            display:    block;
            position:   absolute;
            border:     0;
            padding:    0;
            cursor:     pointer;
            transition: background 0.18s ease;
          }
          .rt-bar[data-tier="office"] { background: var(--color-neutral-500); }
          .rt-bar[data-tier="remote"] { background: var(--color-brand); }
          .rt-bar[data-tier="office"]:hover,
          .rt-bar[data-tier="office"]:focus-visible { background: var(--color-text); outline: none; }
          .rt-bar[data-tier="remote"]:hover,
          .rt-bar[data-tier="remote"]:focus-visible { background: var(--color-brand-hover); outline: none; }
          .rt-bar[data-last="false"] { border-right: 1px solid rgba(255,255,255,0.7); }

          .rt-chapter-card {
            background: var(--color-paper);
            transition: background 0.2s ease, box-shadow 0.2s ease;
          }
          .rt-outer:has(.rt-bar[data-idx="0"]:hover)         .rt-chapter-card[data-idx="0"],
          .rt-outer:has(.rt-bar[data-idx="0"]:focus-visible) .rt-chapter-card[data-idx="0"],
          .rt-outer:has(.rt-bar[data-idx="1"]:hover)         .rt-chapter-card[data-idx="1"],
          .rt-outer:has(.rt-bar[data-idx="1"]:focus-visible) .rt-chapter-card[data-idx="1"],
          .rt-outer:has(.rt-bar[data-idx="2"]:hover)         .rt-chapter-card[data-idx="2"],
          .rt-outer:has(.rt-bar[data-idx="2"]:focus-visible) .rt-chapter-card[data-idx="2"],
          .rt-outer:has(.rt-bar[data-idx="3"]:hover)         .rt-chapter-card[data-idx="3"],
          .rt-outer:has(.rt-bar[data-idx="3"]:focus-visible) .rt-chapter-card[data-idx="3"],
          .rt-outer:has(.rt-bar[data-idx="4"]:hover)         .rt-chapter-card[data-idx="4"],
          .rt-outer:has(.rt-bar[data-idx="4"]:focus-visible) .rt-chapter-card[data-idx="4"],
          .rt-outer:has(.rt-bar[data-idx="5"]:hover)         .rt-chapter-card[data-idx="5"],
          .rt-outer:has(.rt-bar[data-idx="5"]:focus-visible) .rt-chapter-card[data-idx="5"] {
            background: var(--color-neutral-100);
            box-shadow: 0 1px 0 rgba(0,0,0,0.03);
          }
          @media (prefers-reduced-motion: reduce) {
            .rt-bar,
            .rt-chapter-card { transition: none; }
          }
          .rt-now-marker {
            position:        absolute;
            transform:       translateX(-50%);
            top:             -22px;
            font-family:     var(--font-dm-sans), sans-serif;
            font-size:       10px;
            font-weight:     500;
            letter-spacing:  0.22em;
            text-transform:  none;
            color:           var(--color-brand);
            pointer-events:  none;
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
          aria-label="About Alfonso Barreiro"
          style={{
            padding:    "96px clamp(32px, 6vw, 80px) 64px",
            background: "var(--color-paper)",
          }}
        >
          <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
            <div className="about-hero-grid">
              {/* Left: text */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h1
                  style={{
                    fontFamily:    "var(--font-dm-sans), sans-serif",
                    fontSize:      "clamp(40px, 4.8vw, 60px)",
                    fontWeight:    500,
                    color:         "var(--color-text)",
                    margin:        "0 0 24px",
                    letterSpacing: "-0.02em",
                    lineHeight:    1.1,
                  }}
                >
                  Fifteen years in design.
                </h1>
                <p
                  style={{
                    fontFamily:    "var(--font-dm-sans), sans-serif",
                    fontSize:      "17px",
                    fontWeight:    400,
                    color:         "var(--color-text)",
                    margin:        0,
                    lineHeight:    1.6,
                    maxWidth:      "540px",
                  }}
                >
                  I get to be part of building products that solve real problems. How I came to that is below.
                </p>
                <p
                  style={{
                    display:       "inline-flex",
                    alignItems:    "center",
                    gap:           "10px",
                    fontFamily:    "var(--font-dm-sans), sans-serif",
                    fontSize:      "15px",
                    fontWeight:    500,
                    color:         "var(--color-brand)",
                    margin:        "24px 0 0",
                    lineHeight:    1.35,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      display:      "inline-block",
                      width:        "8px",
                      height:       "8px",
                      borderRadius: "50%",
                      background:   "var(--color-brand)",
                    }}
                  />
                  Open for work
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
                    background:  "var(--color-neutral-100)",
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
        <section aria-label="What pulled me into design" style={sectionWrapper()}>
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

            <figure style={pullQuoteWrap}>
              <blockquote style={pullQuoteText}>
                Not the visual part. The decisions underneath.
              </blockquote>
            </figure>

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
        <section aria-label="How I work" style={sectionWrapper()}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>How I work</h2>
            <p style={body}>
              I started in Albuquerque in 2010, as the founder of a small consultancy. Then seven years at CliffDweller Digital. Agency work, hands-on, in-person every day. In 2018 I moved to Boomtime as VP of Operations, same city, same desk, same shared room. That&apos;s where I learned what most designers learn: the desk next to you is half the work.
            </p>
            <p style={body}>
              I went remote in 2019, about a year and a half into Boomtime. At first the change was mine, not the company&apos;s. Then the rest of the industry caught up. We shipped UX/UI work for a hundred-plus client websites without an office. I held the design quality bar the same way I&apos;d held it in person: tight feedback loops, written critique, fewer meetings, more artifacts. The work didn&apos;t suffer. Some of it got cleaner.
            </p>

            <figure style={pullQuoteWrap}>
              <blockquote style={pullQuoteText}>
                Remote isn&apos;t a constraint; it&apos;s a discipline.
              </blockquote>
            </figure>

            <p style={body}>
              Two-plus years followed at VARA Winery &amp; Distillery as Director of Marketing &amp; DTC. Back in-person in Albuquerque, running the site redesign and the brand identity for a new spirits line. Then in late 2024 I left the director seat to go all-in on UX/UI. The remote chapter resumed in Portland: independent practice, DesignLab UX Academy, three case studies. None of them built from a shared room.
            </p>
            <p style={{ ...body, margin: "0 0 64px" }}>
              Remote isn&apos;t a constraint; it&apos;s a discipline. The three case studies on this site are evidence the model works at the artifact level. Built solo, remote, end to end.
            </p>

            <RemoteTimeline />
          </div>
        </section>

        {/* Value + philosophy sections moved to /process page on 2026-07-02.
            "The file behind this site" section moved to /behind-this-site (footer link) on 2026-07-02. */}

        {/* ── Alpha Beta Design ──────────────────────────────────────── */}
        <section aria-label="Alpha Beta Design" style={sectionWrapper()}>
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
              use for client work. The portfolio site you&apos;re on is built on it.{" "}
              <Link href="/work/wayfarer" className="about-studio-link">Wayfarer</Link> and{" "}
              <Link href="/work/mens-sole-revival" className="about-studio-link">Men&apos;s Sole Revival</Link> are too.
            </p>
          </div>
        </section>

        {/* ── On the shelf ───────────────────────────────────────────── */}
        <section aria-label="On the shelf" style={sectionWrapper()}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>On the shelf</h2>
            <p style={body}>
              Two books on the desk right now:{" "}
              <span style={{ color: "var(--color-text)", fontWeight: 500 }}>Designing with Intention</span> and{" "}
              <span style={{ color: "var(--color-text)", fontWeight: 500 }}>Refactoring UI</span>. The first is about
              how to think about design. The second is about how to make a screen
              actually look right. I&rsquo;m trying to read them as one lens, not two
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
        <section aria-label="Off-screen" style={sectionWrapper()}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>Off-screen</h2>
            <p style={{ ...body, margin: 0 }}>
              I still learn like I&rsquo;m running out of time. I&rsquo;m teaching
              myself Hiragana. I walk five miles a day, building back toward a
              marathon. I meditate. I watch birds. I read everything. If that
              sounds like someone with too many interests, you&rsquo;re probably
              right. But the curiosity is the same muscle I use in research. I
              just don&rsquo;t turn it off.
            </p>
          </div>
        </section>

        {/* ── Find me in Portland ────────────────────────────────────── */}
        <section aria-label="Find me in Portland" style={sectionWrapper()}>
          <div style={innerWrapper}>
            <h2 style={sectionH2}>Find me in Portland</h2>
            <p style={{ ...body, margin: 0 }}>
              If any of this resonates, or you have a problem you want a second
              pair of eyes on, coffee is the easiest way. Book a time at{" "}
              <a href="https://cal.com/alfonso-barreiro" target="_blank" rel="noopener noreferrer" className="about-shelf-link">
                cal.com/alfonso-barreiro
              </a>
              , or email{" "}
              <a href="mailto:alfonso@barreiro.com" className="about-shelf-link">
                alfonso@barreiro.com
              </a>
              .
            </p>
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
    <div className="rt-outer" style={{ width: "100%" }}>
      <h3 style={{
        fontFamily:    "var(--font-dm-sans), sans-serif",
        fontSize:      "20px",
        fontWeight:    500,
        color:         "var(--color-text)",
        margin:        "0 0 32px",
        letterSpacing: "-0.01em",
        lineHeight:    1.35,
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
                fontWeight:    500,
                color:         "var(--color-text-muted)",
                letterSpacing: "0.01em",
              }}>{y}</span>
            );
          })}
        </div>

        {/* Bars row. Each bar is an anchor link to its chapter card
            below the strip. Keyboard-focusable, screen-reader-labeled,
            and honors prefers-reduced-motion via the .rt-bar rules. */}
        <div style={{
          position: "relative",
          height: "44px",
          background: "var(--color-neutral-100)",
          border: "1px solid var(--color-border)",
        }}>
          {chapters.map((ch, idx) => {
            const leftPct  = ((ch.start - TIMELINE_START) / YEARS) * 100;
            const widthPct = ((ch.end - ch.start) / YEARS) * 100;
            const endLabel = ch.end >= 2025.4 ? "now" : String(Math.floor(ch.end));
            /* Background, hover color, and right border all live in
               CSS so the :has() card highlight below can win over
               inline styles without an !important fight. */
            return (
              <button
                key={ch.name + ch.start}
                type="button"
                data-idx={idx}
                data-tier={ch.remote ? "remote" : "office"}
                data-last={ch.end >= 2025.4 ? "true" : "false"}
                className="rt-bar"
                aria-label={`${ch.role} at ${ch.name}, ${Math.floor(ch.start)} to ${endLabel}${ch.remote ? ", remote" : ""}. Highlights the matching chapter card below.`}
                style={{
                  top:   "4px",
                  bottom:"4px",
                  left:  `${leftPct}%`,
                  width: `${widthPct}%`,
                }}
              />
            );
          })}

          {/* NOW marker over the current chapter, right-edge aligned. */}
          <span
            aria-hidden="true"
            className="rt-now-marker"
            style={{ left: "100%" }}
          >
            Now
          </span>

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
            fontWeight:    500,
            letterSpacing: "0.01em",
            textTransform: "none",
            color:         "var(--color-brand)",
            whiteSpace:    "nowrap",
          }}>
            <span aria-hidden="true">↑</span> First remote chapter · 2019
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
        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", color: "var(--color-text-muted)", letterSpacing: "0.01em" }}>
          <span style={{ display: "inline-block", width: "14px", height: "10px", background: "var(--color-neutral-500)" }} aria-hidden />
          In-office · 2010–2019, 2022–2024
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", color: "var(--color-text-muted)", letterSpacing: "0.01em" }}>
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
        {chapters.map((ch, idx) => {
          const yearLabel = ch.end >= 2025.4
            ? `${Math.floor(ch.start)} to now`
            : `${Math.floor(ch.start)} to ${Math.floor(ch.end)}`;
          return (
            <article
              key={ch.name + ch.start}
              data-idx={idx}
              className="rt-chapter-card"
              style={{
                border:  "1px solid var(--color-neutral-300)",
                padding: "24px",
              }}
            >
              <p style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "20px",
                fontWeight:    500,
                color:         "var(--color-text)",
                margin:        "0 0 8px",
                letterSpacing: "-0.01em",
                lineHeight:    1.35,
              }}>{ch.name}</p>
              <p style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize:   "15px",
                fontWeight: 400,
                lineHeight: 1.5,
                color:      "var(--color-text)",
                margin:     "0 0 16px",
              }}>{ch.note}</p>
              <p style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize:   "12px",
                fontWeight: 500,
                lineHeight: 1.35,
                color:      "var(--color-neutral-600)",
                margin:     0,
              }}>
                {ch.role} · {ch.location} · {yearLabel}
                {ch.remote ? " · remote" : ""}
              </p>
            </article>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 760px) {
          .rt-cards { grid-template-columns: 1fr !important; gap: 12px !important; }
          /* Mobile authored view (audit 2026-07-03): the 15-year
             proportional strip compressed unreadable at 390px, so the
             strip + legend are hidden and the chapter cards become
             the whole timeline. Each card already carries a colored
             top rail (crimson for remote, ink for office) which now
             serves as the chapter marker in place of the bars. */
          .rt-strip-wrap,
          .rt-outer > div:nth-of-type(3) { display: none !important; }
          .rt-outer .rt-chapter-card {
            border-left-width: 3px !important;
            border-left-style: solid !important;
          }
          .rt-outer .rt-chapter-card[data-idx="0"],
          .rt-outer .rt-chapter-card[data-idx="1"],
          .rt-outer .rt-chapter-card[data-idx="2"],
          .rt-outer .rt-chapter-card[data-idx="4"] {
            border-left-color: var(--color-text) !important;
          }
          .rt-outer .rt-chapter-card[data-idx="3"],
          .rt-outer .rt-chapter-card[data-idx="5"] {
            border-left-color: var(--color-brand) !important;
          }
        }
      `}</style>
    </div>
  );
}
