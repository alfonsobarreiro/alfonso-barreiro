import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PersonSchema } from "@/components/structured-data/PersonSchema";
import { BreadcrumbSchema } from "@/components/structured-data/BreadcrumbSchema";
import { kusDisplay, kusMono } from "@/components/kus/fonts";
import { KusStyles } from "@/components/kus/KusStyles";
import { KusReveal } from "@/components/kus/KusReveal";
import KusBand from "@/components/kus/KusBand";

/* ── Metadata ─────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume for Alfonso Barreiro. Product designer and web developer in Portland, OR. Fifteen years across agency, in-house, and independent practice.",
  alternates: { canonical: "https://www.barreiro.com/resume" },
  openGraph: {
    type: "website",
    url: "https://www.barreiro.com/resume",
    title: "Resume · Alfonso Barreiro",
    description:
      "Resume for Alfonso Barreiro. Product designer and web developer in Portland, OR. Fifteen years across agency, in-house, and independent practice.",
    images: ["/resume/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume · Alfonso Barreiro",
    description:
      "Resume for Alfonso Barreiro. Product designer and web developer in Portland, OR. Fifteen years across agency, in-house, and independent practice.",
    images: ["/resume/opengraph-image"],
  },
};

/* ── Data ─────────────────────────────────────────────────────────────
   Work history is the same data as the RemoteTimeline on /about, kept
   in the same order and with the same role/company/date facts. Titles
   and years also match the resume PDF served at
   /Alfonso_Barreiro_Resume.pdf, which lists Boomtime under the final
   title. The outcome line per role is distilled from the chapter note
   on /about. Change all three together.

   2026-11-19 (Alfonso: "Fix all", after the /resume audit): the page
   moved onto the homepage system (see the note on ResumePage). Copy:
   the "Six chapters. Two remote periods." heading and the "research,
   decide, ship" through-line were cut (the cadence /about dropped the
   day before); "UX/UI" left the skills (the site says product
   designer); the skills split into disciplines and tools; Education
   was added from the PDF, verbatim. */

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
    role:     "Product Design Consultant",
    location: "Remote, Portland, OR",
    years:    "2024 to now",
    outcome:  "Five case studies: four built solo and shipped in Next.js on Vercel, one shipped with a three-person volunteer web team.",
  },
  {
    company:  "VARA Winery & Distillery",
    role:     "Director of Marketing & DTC Operations",
    location: "Albuquerque, NM",
    years:    "2022 to 2024",
    outcome:  "Redesigned the website and e-commerce platform end to end, and ran UX and brand identity for a new spirits line. AI-assisted workflows cut production timelines 20%.",
  },
  {
    company:  "Boomtime",
    role:     "UX & Design Lead (VP of Operations)",
    location: "Remote, Albuquerque, NM",
    years:    "2019 to 2021",
    outcome:  "Promoted to VP and took the design practice remote. Set the UX, accessibility, and conversion standards 100+ client sites shipped to.",
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
    role:     "Founder & Lead Creative",
    location: "Albuquerque, NM",
    years:    "2010 to 2011",
    outcome:  "Brand identity, web design, and campaign creative for e-commerce and small business clients.",
  },
];

/* Disciplines first (what he does), then tools (what he does it in). */
const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Disciplines",
    items: [
      "Product Design",
      "UX Research",
      "Design Systems",
      "Prototyping",
      "Accessibility",
      "Content UX",
      "AI and Chatbots",
      "Brand Identity",
      "Site Audits",
      "SEO",
      "Email Marketing",
      "Print",
    ],
  },
  {
    label: "Tools",
    items: ["Figma", "Next.js", "React", "TypeScript", "Framer", "WordPress", "Shopify", "WooCommerce"],
  },
];

/* From the resume PDF (Education & Certifications), verbatim. */
const education: { title: string; meta: string }[] = [
  { title: "UX Academy Foundations", meta: "DesignLab · Completed June 2025" },
  { title: "Associate of Arts, Religion Studies", meta: "University of Florida" },
];

const caseStudies: { title: string; href: string; note: string }[] = [
  { title: "Alfred · Men's Sole Revival",        href: "/work/msr-chatbot",         note: "AI assistant that answers men's foot questions from the site's 40 guides only and cites the guide it used. Live since September 2026." },
  { title: "AIGA Portland · Design Month 2026",   href: "/work/aiga-portland",       note: "Volunteer landing page on Squarespace with a three-person web team. I owned the build and custom code." },
  { title: "Men's Sole Revival",                  href: "/work/mens-sole-revival",   note: "Diagnostic-first foot-health resource for men over 40. Live since April 2026." },
  { title: "Wayfarer · Travel Discovery",         href: "/work/wayfarer",            note: "Concept product with an interactive globe and a 5-step signup." },
  { title: "Spotify · Recently Played Controls", href: "/work/spotify",             note: "Three reversible controls for the Recently Played shelf. Concept with a working demo." },
];

/* ── Page ─────────────────────────────────────────────────────────────
   On the homepage system since 2026-11-19 (the /resume audit: 11 type
   styles, 6 inks, sections 36px off the rail, terracotta-500 text and a
   terracotta-500 button under 4.5:1). Same .kus root as "/", /work and
   /about: display for the name, heading for band labels, role titles and
   case-study titles, body for prose and chips, mono for company lines,
   years and group labels. Inks navy, terracotta-600, white. Job titles
   are h3s, so screen readers can jump between roles. */

export default function ResumePage() {
  return (
    <div className={`kus ${kusDisplay.variable} ${kusMono.variable}`}>
      <KusStyles />
      <PersonSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home",   url: "https://www.barreiro.com/" },
          { name: "Resume", url: "https://www.barreiro.com/resume" },
        ]}
      />
      <Nav />
      <main id="main-content" style={{ paddingTop: "72px" }}>
        <KusReveal />

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="resume-hero" aria-labelledby="resume-name">
          <div className="kus-wrap">
            <h1 id="resume-name" className="kus-t-line" data-reveal="">Alfonso Barreiro</h1>
            <p className="kus-t-lede" data-reveal="">Product designer and web developer · Portland, OR</p>
            <p className="kus-t-body" data-reveal="">
              Fifteen years across agency, in-house, and independent practice. I ship the work I design: research to Figma to Next.js on Vercel.
            </p>
            <div className="resume-actions" data-reveal="">
              <a href="/Alfonso_Barreiro_Resume.pdf" className="kus-pill" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF
              </a>
              <a href="mailto:alfonso@barreiro.com" className="kus-link kus-t-body">alfonso@barreiro.com</a>
            </div>
          </div>
        </section>

        <KusBand id="experience" label="Experience" note="Ordered newest to oldest." className="resume-band">
          <ol className="resume-roles">
            {roles.map((r) => (
              <li key={r.company + r.years} className="resume-role" data-reveal="">
                <div className="resume-role__main">
                  <h3 className="kus-t-title">{r.role}</h3>
                  <p className="kus-t-mono">{r.company} · {r.location}</p>
                  <p className="kus-t-body">{r.outcome}</p>
                </div>
                <p className="kus-t-mono resume-role__years">{r.years}</p>
              </li>
            ))}
          </ol>
        </KusBand>

        <KusBand
          id="selected-work"
          label="Five case studies on this site"
          note="Each one covers the research, the decision, and the build. Live links follow."
          className="resume-band"
        >
          <div className="resume-cs">
            {caseStudies.map((cs) => (
              <Link key={cs.href} href={cs.href} className="resume-cs__card" data-reveal="">
                <h3 className="kus-t-title">{cs.title}</h3>
                <p className="kus-t-body">{cs.note}</p>
              </Link>
            ))}
          </div>
        </KusBand>

        <KusBand id="skills" label="Practice areas" note="The tools and disciplines I work in." className="resume-band">
          <div className="resume-skills">
            {skillGroups.map((g) => (
              <div key={g.label} className="resume-skills__group" data-reveal="">
                <h3 className="kus-t-mono">{g.label}</h3>
                <ul className="resume-chips">
                  {g.items.map((s) => <li key={s} className="kus-t-body resume-chip">{s}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </KusBand>

        <KusBand id="education" label="Education" className="resume-band">
          <ul className="resume-edu">
            {education.map((e) => (
              <li key={e.title} data-reveal="">
                <h3 className="kus-t-title">{e.title}</h3>
                <p className="kus-t-mono">{e.meta}</p>
              </li>
            ))}
          </ul>
        </KusBand>

        <KusBand id="contact" label="Two ways in" className="resume-band">
          <p className="kus-t-body" data-reveal="">
            Email{" "}
            <a href="mailto:alfonso@barreiro.com" className="kus-link">alfonso@barreiro.com</a>
            , or book a coffee chat at{" "}
            <a href="https://cal.com/alfonso-barreiro" target="_blank" rel="noopener noreferrer" className="kus-link">
              cal.com/alfonso-barreiro
            </a>
            . More background lives on the{" "}
            <Link href="/about" className="kus-link">about page</Link>.
          </p>
        </KusBand>

        <Footer ground="paper" />
      </main>

      <style>{`
        .resume-hero { padding: var(--kus-band-y) var(--kus-pad-x) 0; }
        .resume-hero .kus-wrap > * + * { margin-top: 24px; }
        .resume-hero .kus-t-lede { margin-top: 16px; }
        .resume-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 16px 24px; margin-top: 32px !important; }
        .resume-actions .kus-link { display: inline-flex; align-items: center; min-height: 44px; }
        @media (min-width: 1024px) { .resume-band .kus-band__label { grid-column: 1 / -1; } }
        .resume-band .kus-band__label .kus-t-body { max-width: 64ch; }

        /* Experience: one row per role, hairlines between, years on the
           right from 640px. */
        .resume-roles { list-style: none; margin: 0; padding: 0; border-bottom: 1px solid var(--color-neutral-300); }
        .resume-role {
          display: grid; grid-template-columns: minmax(0, 1fr); gap: 8px 24px;
          padding: 24px 0; border-top: 1px solid var(--color-neutral-300);
        }
        .resume-role__main > * + * { margin-top: 8px; }
        .resume-role__main .kus-t-body { max-width: 64ch; }
        @media (min-width: 640px) {
          .resume-role { grid-template-columns: minmax(0, 1fr) auto; }
          .resume-role__years { text-align: right; white-space: nowrap; }
        }
        @media (max-width: 639px) { .resume-role__years { order: -1; } }

        /* Case studies: rounded panels, two across from 768px. */
        .resume-cs { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--kus-gap); }
        @media (min-width: 768px) { .resume-cs { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        .resume-cs__card {
          display: block; padding: 24px; text-decoration: none; color: var(--color-navy);
          border: 1px solid var(--color-neutral-300); border-radius: var(--radius-panel);
          background: var(--color-paper);
          transition: border-color var(--kus-dur-out) ease, background-color var(--kus-dur-out) ease;
        }
        .resume-cs__card > * + * { margin-top: 8px; }
        .resume-cs__card:hover { border-color: var(--color-navy); background: var(--color-neutral-100); transition-duration: var(--kus-dur-in); }
        .resume-cs__card:hover .kus-t-title { color: var(--color-terracotta-600); }

        /* Skills: two labelled groups of chips (static, not controls). */
        .resume-skills > * + * { margin-top: 32px; }
        .resume-skills__group > h3 { margin: 0 0 16px; }
        .resume-chips { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; margin: 0; padding: 0; }
        .resume-chip {
          padding: 6px 16px; line-height: 1.4 !important;
          border: 1px solid var(--color-neutral-300); border-radius: 999px;
        }

        .resume-edu { list-style: none; margin: 0; padding: 0; }
        .resume-edu > li + li { margin-top: 24px; }
        .resume-edu .kus-t-mono { margin-top: 4px; }

        @media (prefers-reduced-motion: reduce) { .resume-cs__card { transition: none; } }
      `}</style>
    </div>
  );
}
