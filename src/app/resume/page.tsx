import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PersonSchema } from "@/components/structured-data/PersonSchema";
import { BreadcrumbSchema } from "@/components/structured-data/BreadcrumbSchema";

/* ── Metadata ─────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume for Alfonso Barreiro. Product Designer in Portland, OR. Fifteen years across agency, in-house, and independent practice.",
  alternates: { canonical: "https://www.barreiro.com/resume" },
  openGraph: {
    type: "website",
    url: "https://www.barreiro.com/resume",
    title: "Resume · Alfonso Barreiro",
    description:
      "Resume for Alfonso Barreiro. Product Designer in Portland, OR. Fifteen years across agency, in-house, and independent practice.",
    images: ["/resume/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume · Alfonso Barreiro",
    description:
      "Resume for Alfonso Barreiro. Product Designer in Portland, OR. Fifteen years across agency, in-house, and independent practice.",
    images: ["/resume/opengraph-image"],
  },
};

/* ── Data ─────────────────────────────────────────────────────────────
   Work history is the same data as the RemoteTimeline on /about, kept
   in the same order and with the same role/company/date facts. The
   outcome line per role is distilled from the chapter note there. */

type Role = {
  company:  string;
  role:     string;
  location: string;
  years:    string;
  outcome:  string;
};

const roles: Role[] = [
  {
    company:  "Independent Practice",
    role:     "UX/UI Designer",
    location: "Remote, Portland, OR",
    years:    "2024 to now",
    outcome:  "Four case studies built solo, end to end. Figma to Next.js, shipped on Vercel.",
  },
  {
    company:  "VARA Winery & Distillery",
    role:     "Director of Marketing & DTC",
    location: "Albuquerque, NM",
    years:    "2022 to 2024",
    outcome:  "Led the site redesign and the brand identity for a new spirits line. Introduced AI-assisted workflows to the team.",
  },
  {
    company:  "Boomtime",
    role:     "VP of Operations",
    location: "Remote, Albuquerque, NM",
    years:    "2019 to 2022",
    outcome:  "Promoted to VP and moved the design practice remote. Held the same quality bar across a distributed team and the same client roster.",
  },
  {
    company:  "Boomtime",
    role:     "Lead Graphic Design",
    location: "Albuquerque, NM",
    years:    "2018 to 2019",
    outcome:  "Set the visual quality bar for client work. Stepped up to VP the following year.",
  },
  {
    company:  "CliffDweller Digital",
    role:     "Web Designer & Developer",
    location: "Albuquerque, NM",
    years:    "2011 to 2018",
    outcome:  "Shipped 50+ responsive websites. Introduced user testing on priority projects.",
  },
  {
    company:  "Sola Fide Design",
    role:     "Founder",
    location: "Albuquerque, NM",
    years:    "2010 to 2011",
    outcome:  "Brand identity, web design, and campaign creative for e-commerce and small business clients.",
  },
];

const skills: string[] = [
  "Product Design",
  "UX/UI",
  "Design Systems",
  "Prototyping",
  "Figma",
  "Next.js",
  "TypeScript",
  "Accessibility",
  "Content UX",
];

const caseStudies: { title: string; href: string; note: string }[] = [
  { title: "Spotify · Recently Played Controls", href: "/work/spotify",             note: "Product design for an iOS gesture set." },
  { title: "Wayfarer · Travel Discovery",         href: "/work/wayfarer",            note: "Concept product with an interactive globe and a 5-step signup." },
  { title: "Men's Sole Revival",                  href: "/work/mens-sole-revival",   note: "Editorial e-commerce site for a shoe restoration studio." },
  { title: "AIGA Portland · Design Month 2026",   href: "/work/aiga-portland",       note: "Volunteer landing page in Squarespace, custom CSS end to end." },
];

/* ── Shared style atoms ───────────────────────────────────────────────
   Same restraint the /about page uses. DM Sans only, sharp corners,
   terracotta as the only accent. */

const sectionWrapper: React.CSSProperties = {
  padding:    "48px clamp(32px, 6vw, 80px)",
  background: "var(--color-paper)",
};

const innerWrapper: React.CSSProperties = {
  width:    "100%",
  maxWidth: "var(--content-max)",
  margin:   "0 auto",
};

const sectionH2: React.CSSProperties = {
  fontFamily:    "var(--font-dm-sans), sans-serif",
  fontSize:      "clamp(28px,3.5vw,40px)",
  fontWeight:    500,
  color:         "var(--color-text)",
  margin:        "0 0 24px",
  letterSpacing: "-0.01em",
  lineHeight:    1.15,
};

const bodyIntro: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize:   "var(--text-article)",
  lineHeight: 1.6,
  color:      "var(--color-text)",
  margin:     "0 0 32px",
  maxWidth:   "680px",
};

const eyebrowRow: React.CSSProperties = {
  display:      "flex",
  alignItems:   "center",
  gap:          "12px",
  marginBottom: "16px",
};
const eyebrowDash: React.CSSProperties = {
  display:    "inline-block",
  width:      "24px",
  height:     "1px",
  background: "var(--color-brand)",
};
const eyebrowLabel: React.CSSProperties = {
  fontFamily:    "var(--font-dm-sans), sans-serif",
  fontSize:      "var(--text-small)",
  fontWeight:    500,
  letterSpacing: "0.01em",
  color:         "var(--color-brand)",
  margin:        0,
};

/* ── Page ─────────────────────────────────────────────────────────── */

export default function ResumePage() {
  return (
    <>
      <PersonSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home",   url: "https://www.barreiro.com/" },
          { name: "Resume", url: "https://www.barreiro.com/resume" },
        ]}
      />
      <Nav />
      <main id="main-content" style={{ background: "var(--color-paper)" }}>
        <style>{`
          .resume-link {
            color:           var(--color-text);
            text-decoration: none;
            font-weight:     500;
            border-bottom:   1px solid var(--color-neutral-400);
            transition:      border-color 0.2s, color 0.2s;
          }
          .resume-link:hover {
            border-bottom-color: var(--color-brand);
            color:               var(--color-brand);
          }
          .resume-role-row {
            display:               grid;
            grid-template-columns: 1fr auto;
            gap:                   16px 24px;
            padding:               24px 0;
            border-top:            1px solid var(--color-neutral-300);
          }
          .resume-role-row:last-child { border-bottom: 1px solid var(--color-neutral-300); }
          .resume-role-title {
            font-family:    var(--font-dm-sans), sans-serif;
            font-size:      var(--text-h3);
            font-weight:    500;
            color:          var(--color-text);
            margin:         0 0 4px;
            letterSpacing:  -0.01em;
            line-height:    1.3;
          }
          .resume-role-company {
            font-family:    var(--font-dm-sans), sans-serif;
            font-size:      var(--text-body);
            font-weight:    500;
            color:          var(--color-brand);
            margin:         0 0 8px;
            letter-spacing: 0.01em;
          }
          .resume-role-outcome {
            font-family:    var(--font-dm-sans), sans-serif;
            font-size:      var(--text-body);
            font-weight:    400;
            color:          var(--color-text);
            margin:         0;
            line-height:    1.5;
            max-width:      620px;
          }
          .resume-role-meta {
            font-family:    var(--font-dm-sans), sans-serif;
            font-size:      var(--text-small);
            font-weight:    500;
            color:          var(--color-neutral-600);
            margin:         0;
            letter-spacing: 0.01em;
            white-space:    nowrap;
            text-align:     right;
          }
          .resume-skills {
            display:   flex;
            flex-wrap: wrap;
            gap:       8px;
          }
          .resume-skill {
            display:        inline-block;
            padding:        8px 14px;
            border:         1px solid var(--color-neutral-300);
            background:     var(--color-paper);
            font-family:    var(--font-dm-sans), sans-serif;
            font-size:      var(--text-small);
            font-weight:    500;
            color:          var(--color-text);
            letter-spacing: 0.01em;
          }
          .resume-cs-grid {
            display:               grid;
            grid-template-columns: repeat(2, 1fr);
            gap:                   16px;
          }
          .resume-cs-card {
            display:         block;
            padding:         24px;
            border:          1px solid var(--color-neutral-300);
            background:      var(--color-paper);
            text-decoration: none;
            transition:      border-color 0.2s, background 0.2s, transform 0.2s;
          }
          .resume-cs-card:hover {
            border-color: var(--color-brand);
            background:   var(--color-neutral-100);
            transform:    translateY(-1px);
          }
          .resume-cs-title {
            font-family:    var(--font-dm-sans), sans-serif;
            font-size:      var(--text-h3);
            font-weight:    500;
            color:          var(--color-text);
            margin:         0 0 8px;
            letter-spacing: -0.01em;
            line-height:    1.3;
          }
          .resume-cs-note {
            font-family: var(--font-dm-sans), sans-serif;
            font-size:   var(--text-body);
            font-weight: 400;
            color:       var(--color-neutral-600);
            margin:      0;
            line-height: 1.5;
          }
          .resume-download {
            display:         inline-flex;
            align-items:     center;
            gap:             10px;
            padding:         14px 22px;
            background:      var(--color-brand);
            color:           #FFFFFF;
            font-family:     var(--font-dm-sans), sans-serif;
            font-size:       var(--text-body);
            font-weight:     500;
            letter-spacing:  0.01em;
            text-decoration: none;
            transition:      background 0.2s;
          }
          .resume-download:hover { background: var(--color-brand-hover, #6E1414); }
          @media (max-width: 640px) {
            .resume-role-row {
              grid-template-columns: 1fr;
            }
            .resume-role-meta {
              text-align: left;
              white-space: normal;
            }
            .resume-cs-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section
          aria-label="Alfonso Barreiro resume"
          style={{
            padding:    "96px clamp(32px, 6vw, 80px) 48px",
            background: "var(--color-paper)",
          }}
        >
          <div style={innerWrapper}>
            <h1
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "clamp(40px,4.8vw,60px)",
                fontWeight:    500,
                color:         "var(--color-text)",
                margin:        "0 0 20px",
                letterSpacing: "-0.02em",
                lineHeight:    1.1,
              }}
            >
              Alfonso Barreiro
            </h1>
            <p
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "var(--text-article)",
                fontWeight:    500,
                color:         "var(--color-brand)",
                margin:        "0 0 24px",
                lineHeight:    1.4,
              }}
            >
              Product Designer · Portland, OR
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize:   "var(--text-article)",
                fontWeight: 400,
                color:      "var(--color-text)",
                margin:     "0 0 32px",
                lineHeight: 1.6,
                maxWidth:   "620px",
              }}
            >
              Fifteen years across agency, in-house, and independent practice. I ship the work I design: research to Figma to Next.js on Vercel.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
              <a
                href="/Alfonso_Barreiro_Resume.pdf"
                className="resume-download"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF
              </a>
              <a href="mailto:alfonso@barreiro.com" className="resume-link">
                alfonso@barreiro.com
              </a>
            </div>
          </div>
        </section>

        {/* ── Experience ──────────────────────────────────────────── */}
        <section aria-label="Experience" style={sectionWrapper}>
          <div style={innerWrapper}>
            <div style={eyebrowRow}>
              <span aria-hidden="true" style={eyebrowDash} />
              <p style={eyebrowLabel}>Experience</p>
            </div>
            <h2 style={sectionH2}>Six chapters. Two remote periods.</h2>
            <p style={bodyIntro}>
              Ordered newest to oldest. The through-line is the same across all six: research, decide, ship.
            </p>

            <div>
              {roles.map((r) => (
                <div key={r.company + r.years} className="resume-role-row">
                  <div>
                    <p className="resume-role-title">{r.role}</p>
                    <p className="resume-role-company">
                      {r.company} · {r.location}
                    </p>
                    <p className="resume-role-outcome">{r.outcome}</p>
                  </div>
                  <p className="resume-role-meta">{r.years}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Selected work ──────────────────────────────────────── */}
        <section aria-label="Selected work" style={sectionWrapper}>
          <div style={innerWrapper}>
            <div style={eyebrowRow}>
              <span aria-hidden="true" style={eyebrowDash} />
              <p style={eyebrowLabel}>Selected work</p>
            </div>
            <h2 style={sectionH2}>Four case studies on this site</h2>
            <p style={bodyIntro}>
              Each one covers the research, the decision, and the build. Live links follow.
            </p>

            <div className="resume-cs-grid">
              {caseStudies.map((cs) => (
                <Link key={cs.href} href={cs.href} className="resume-cs-card">
                  <p className="resume-cs-title">{cs.title}</p>
                  <p className="resume-cs-note">{cs.note}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Skills ──────────────────────────────────────────── */}
        <section aria-label="Skills" style={sectionWrapper}>
          <div style={innerWrapper}>
            <div style={eyebrowRow}>
              <span aria-hidden="true" style={eyebrowDash} />
              <p style={eyebrowLabel}>Skills</p>
            </div>
            <h2 style={sectionH2}>Practice areas</h2>
            <p style={bodyIntro}>
              The tools and disciplines used across the case studies on this site.
            </p>

            <ul className="resume-skills" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {skills.map((s) => (
                <li key={s} className="resume-skill">{s}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Contact ─────────────────────────────────────────── */}
        <section aria-label="Contact" style={sectionWrapper}>
          <div style={innerWrapper}>
            <div style={eyebrowRow}>
              <span aria-hidden="true" style={eyebrowDash} />
              <p style={eyebrowLabel}>Contact</p>
            </div>
            <h2 style={sectionH2}>Two ways in</h2>
            <p style={{ ...bodyIntro, margin: 0 }}>
              Email{" "}
              <a href="mailto:alfonso@barreiro.com" className="resume-link">
                alfonso@barreiro.com
              </a>
              , or book a coffee chat at{" "}
              <a
                href="https://cal.com/alfonso-barreiro"
                target="_blank"
                rel="noopener noreferrer"
                className="resume-link"
              >
                cal.com/alfonso-barreiro
              </a>
              . More background lives on the{" "}
              <Link href="/about" className="resume-link">about page</Link>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
