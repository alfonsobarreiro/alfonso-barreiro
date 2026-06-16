import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MSRPagePeek from "@/components/MSRPagePeek";
import { CaseStudySchema } from "@/components/structured-data/CaseStudySchema";

export const metadata: Metadata = {
  title: "Men\u2019s Sole Revival \u00B7 Foot Health Content Platform",
  description:
    "Case study: Designing a content-first foot health resource for men, using editorial authority, e-commerce UX patterns, and a token-driven design system to lower the stigma barrier.",
  alternates: { canonical: "https://www.barreiro.com/work/mens-sole-revival" },
  openGraph: {
    type: "article",
    url: "https://www.barreiro.com/work/mens-sole-revival",
    title: "Men\u2019s Sole Revival \u00B7 Foot Health Content Platform",
    description:
      "Case study: Designing a content-first foot health resource for men, using editorial authority, e-commerce UX patterns, and a token-driven design system to lower the stigma barrier.",
    images: ["/work/mens-sole-revival/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Men\u2019s Sole Revival \u00B7 Foot Health Content Platform",
    description:
      "Case study: Designing a content-first foot health resource for men, using editorial authority, e-commerce UX patterns, and a token-driven design system to lower the stigma barrier.",
    images: ["/work/mens-sole-revival/opengraph-image"],
  },
};

/* -------------------------------------------------
   Color tokens (matching globals.css / Work.tsx)
------------------------------------------------- */
const c = {
  ink:         "#252B28",
  body:        "#3D4440",
  muted:       "#8A8680",
  accent:      "#7A8B6E",
  bg:          "#FFFFFF",
  bgSection:   "#FAFAF9",
  surface:     "#FFFFFF",
  border:      "#A99B8A",
  borderStrong:"#7E715F",
  cognac:      "#C4703A",   // MSR brand accent (stays — MSR's own brand)
};

const font = {
  display: "var(--font-dm-sans), -apple-system, sans-serif",
  sans:    "var(--font-dm-sans), -apple-system, sans-serif",
};

export default function MSRCaseStudy() {
  return (
    <>
      <CaseStudySchema
        name="Men’s Sole Revival · Foot Health Content Platform"
        description="A content-first foot health resource for men, using editorial authority, e-commerce UX patterns, and a token-driven design system to lower the stigma barrier."
        slug="mens-sole-revival"
        dateCreated="2026-04"
      />
      <Nav />

      <main className="cs-content-wrap" style={{ background: c.bg, paddingTop: "72px" }}>

        {/* -- Back link ---------------------------------- */}
        <div style={{ maxWidth: "none", margin: "0 auto", padding: "24px clamp(24px, 5vw, 80px) 0" }}>
          <Link
            href="/#work"
            style={{
              fontFamily:     font.sans,
              fontSize:       "13px",
              color:          c.muted,
              textDecoration: "none",
              display:        "inline-block",
            }}
          >
            ← Back to work
          </Link>
        </div>

        {/* -- Hero ---------------------------------------- */}
        <header
          style={{
            background:  "#13100C",
            padding:     "clamp(64px, 10vw, 120px) clamp(24px, 5vw, 80px)",
            position:    "relative",
            overflow:    "hidden",
          }}
        >
          {/* Cognac accent bar */}
          <div style={{
            position:   "absolute",
            top:        0,
            left:       0,
            right:      0,
            height:     "3px",
            background: c.cognac,
          }} />

          <div style={{ maxWidth: "none", margin: "0 auto" }}>
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <span style={{ width: "24px", height: "1px", background: c.cognac }} />
              <span style={{
                fontFamily:    font.sans,
                fontSize:      "11px",
                fontWeight:    600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color:         c.cognac,
              }}>
                Men&apos;s Sole Revival &middot; UX Case Study
              </span>
            </div>

            <h1 style={{
              fontFamily:    font.display,
              fontSize:      "clamp(32px, 6vw, 64px)",
              fontWeight:    400,
              color:         "#F5F5F4",
              margin:        "0 0 16px",
              letterSpacing: "-0.03em",
              lineHeight:    1.05,
            }}>
              Men&apos;s Sole Revival: a foot health resource for men over 40.
            </h1>

            <p style={{
              fontFamily:  font.sans,
              fontSize:    "clamp(16px, 2.2vw, 20px)",
              lineHeight:  1.55,
              color:       "rgba(245,243,239,0.65)",
              margin:      "0 0 40px",
              maxWidth:    "640px",
            }}>
              Men over 40 quietly Google their foot problems. Clinical sites scare them; commerce sites push to them. I designed MSR for the middle. Live since April 2026. The first plan was e-commerce; I shifted to content authority in week three when the research kept telling me the same thing: information, not products.
            </p>

            {/* Metadata row */}
            <div style={{
              display:    "flex",
              flexWrap:   "wrap",
              gap:        "32px",
              paddingTop: "32px",
              borderTop:  "1px solid rgba(245,243,239,0.1)",
            }}>
              {[
                { label: "Role",     value: "UX/UI Designer \u00B7 Content Strategist" },
                { label: "Type",     value: "Solo \u00B7 Self-initiated" },
                { label: "Timeline", value: "Jan \u2013 Apr 2026" },
                { label: "Status",   value: "Live since April 2026 \u00B7 menssolerevival.com" },
                { label: "Methods",  value: "Market Research \u00B7 Competitive Analysis \u00B7 Content UX \u00B7 AI-Assisted Development" },
                { label: "Outcome",  value: "Research-driven pivot from e-commerce to content authority." },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: c.cognac, margin: "0 0 4px" }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: font.sans, fontSize: "14px", color: "rgba(245,243,239,0.75)", margin: 0 }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Thumbnail tape \u2014 preview what's downstream */}
            <div style={{
              marginTop:  "56px",
              paddingTop: "32px",
              borderTop:  "1px solid rgba(245,243,239,0.1)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <span style={{ width: "24px", height: "1px", background: c.cognac }} />
                <p style={{
                  fontFamily:    font.sans,
                  fontSize:      "11px",
                  fontWeight:    600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color:         c.cognac,
                  margin:        0,
                }}>
                  What&apos;s downstream
                </p>
              </div>

              <div style={{
                display:           "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap:                "16px",
              }}>
                {[
                  { label: "05 \u00B7 Architecture",     src: "/images/work/msr/msr-ia-tree.svg",                    href: "#section-05" },
                  { label: "06 \u00B7 Flows",            src: "/images/work/msr/msr-user-flows.svg",                 href: "#section-06" },
                  { label: "07 \u00B7 Decision logic",   src: "/images/work/msr/msr-assessment-decision-flow.svg",   href: "#section-07" },
                  { label: "07 \u00B7 Wireframes",       src: "/images/work/msr/msr-assessment-wireframes.svg",      href: "#section-07" },
                  { label: "\u2197 Live product",   src: "/images/work/msr/msr-homepage.webp",                  href: "https://www.menssolerevival.com/", external: true },
                ].map(({ label, src, href, external }) => (
                  <Link
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="cs-thumb"
                    style={{
                      display:         "block",
                      textDecoration:  "none",
                    }}
                  >
                    <div style={{
                      position:     "relative",
                      aspectRatio:  "16 / 11",
                      overflow:     "hidden",
                      background:   external ? "#0F161D" : "#F5F3EF",
                      border:       "1px solid rgba(245,243,239,0.1)",
                    }}>
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="(max-width: 767px) 50vw, 220px"
                        style={{ objectFit: external ? "cover" : "contain", objectPosition: "center" }}
                      />
                    </div>
                    <p style={{
                      fontFamily:    font.sans,
                      fontSize:      "11px",
                      fontWeight:    600,
                      letterSpacing: "0.10em",
                      textTransform: "uppercase",
                      color:         "rgba(245,243,239,0.75)",
                      margin:        "10px 0 0",
                    }}>
                      {label}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* -- Links ---------------------------------------- */}
        <div style={{ background: c.bgSection, padding: "40px clamp(24px, 5vw, 80px) 0" }}>
          <div style={{ maxWidth: "none", margin: "0 auto" }}>
            <p style={{
              fontFamily:    font.sans,
              fontSize:      "11px",
              fontWeight:    600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color:         c.muted,
              margin:        "0 0 16px",
            }}>
              Links
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 12px" }}>
              {[
                // Primary CTA — the live, deployed product (strongest proof of work)
                { label: "Live product", href: "https://www.menssolerevival.com/",        external: true,  variant: "primary" },
                // Secondary — slide deck lives on the portfolio itself (internal nav)
                { label: "Slide deck",   href: "/work/presentations/mens-sole-revival",   external: false, variant: "ghost"   },
              ].map(({ label, href, external, variant }) => {
                const isPrimary = variant === "primary";
                return (
                  <Link
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    style={{
                      display:        "inline-flex",
                      alignItems:     "center",
                      gap:            "8px",
                      padding:        "10px 18px",
                      background:     isPrimary ? c.ink        : c.surface,
                      border:         isPrimary ? "none"       : `1px solid ${c.borderStrong}`,
                      borderRadius:   "6px",
                      color:          isPrimary ? "#F5F5F4"    : c.ink,
                      fontFamily:     font.sans,
                      fontSize:       "13px",
                      fontWeight:     500,
                      letterSpacing:  "0.02em",
                      textDecoration: "none",
                    }}
                  >
                    {label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* -- Cover: live MSRPagePeek preview (sized to 64% of section width) -- */}
        <div style={{ background: c.bgSection, padding: "48px clamp(24px, 5vw, 80px) 0" }}>
          <div style={{ maxWidth: "none", margin: "0 auto" }}>
            <div style={{
              width:        "64%",
              margin:       "0 auto",
              overflow:     "hidden",
              borderRadius: "4px",
              border:       `1px solid ${c.border}`,
            }}>
              <MSRPagePeek />
            </div>
          </div>
        </div>

        {/* -- Content wrapper ----------------------------- */}
        <div style={{ maxWidth: "none", margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

          {/* -- 01 Context -------------------------------- */}
          <Section label="01" title="Context">
            <p style={bodyText}>
              I kept Googling &ldquo;cracked heels men fix&rdquo; and landing on the same three articles written for women, repackaged with a stock photo of a guy. The clinical sources were accurate but impersonal. The product sites were selling, not teaching. Nothing spoke to men who actually wanted to understand what was happening to their feet and what to do about it.
            </p>
            <p style={bodyText}>
              The numbers back up the gap. Three of them set up everything that follows.
            </p>

            {/* 3-stat strip */}
            <div style={{
              display:         "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap:             "0",
              margin:          "32px 0",
              border:          `1px solid ${c.border}`,
              borderRadius:    "0",
            }}>
              {[
                {
                  value:  "77%",
                  label:  "of US adults experience annual foot pain",
                  source: "APMA, 2014",
                  href:   "https://www.prnewswire.com/news-releases/new-survey-reveals-majority-of-americans-suffer-from-foot-pain-259775741.html",
                  caption: "Scale",
                },
                {
                  value:  "33%",
                  label:  "less likely men are to seek medical care than women",
                  source: "WellMed Medical Group",
                  href:   "https://www.wellmedhealthcare.com/patients/healthyliving/habits-wellness/understanding-mens-reluctance-to-see-a-doctor/",
                  caption: "Underserved",
                },
                {
                  value:  "72%",
                  label:  "of men would rather do household chores than go to the doctor",
                  source: "Cleveland Clinic, 2019",
                  href:   "https://newsroom.clevelandclinic.org/2019/09/04/cleveland-clinic-survey-men-will-do-almost-anything-to-avoid-going-to-the-doctor",
                  caption: "Avoidance",
                },
              ].map(({ value, label, source, href, caption }, i, arr) => (
                <div key={caption} style={{
                  padding:     "28px 28px",
                  background:  c.surface,
                  borderRight: i < arr.length - 1 ? `1px solid ${c.border}` : "none",
                }}>
                  <p style={{
                    fontFamily:    font.sans,
                    fontSize:      "10px",
                    fontWeight:    700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color:         c.cognac,
                    margin:        "0 0 12px",
                  }}>{caption}</p>
                  <p style={{
                    fontFamily:    font.display,
                    fontSize:      "clamp(28px, 4vw, 40px)",
                    fontWeight:    500,
                    color:         c.ink,
                    margin:        "0 0 8px",
                    letterSpacing: "-0.02em",
                    lineHeight:    1.0,
                  }}>{value}</p>
                  <p style={{
                    fontFamily: font.sans,
                    fontSize:   "13px",
                    lineHeight: 1.5,
                    color:      c.body,
                    margin:     "0 0 10px",
                  }} dangerouslySetInnerHTML={{ __html: label }} />
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" style={{
                      fontFamily:    font.sans,
                      fontSize:      "11px",
                      color:         c.muted,
                      textDecoration: "underline",
                      textDecorationColor: c.border,
                    }}>{source}</a>
                  ) : (
                    <span style={{ fontFamily: font.sans, fontSize: "11px", color: c.muted }}>{source}</span>
                  )}
                </div>
              ))}
            </div>

            <p style={bodyText}>
              Foot pain is near-universal in this audience. Action is not. Men over 40 sit in the peak risk window for plantar fasciitis, hallux rigidus, and fungal infections, and they are the demographic least likely to act. The market knows the audience exists. Men&apos;s grooming is now a <a href="https://www.grandviewresearch.com/industry-analysis/mens-personal-care-market-report" target="_blank" rel="noopener noreferrer" style={{ color: c.body, textDecoration: "underline", textDecorationColor: c.border }}>$90.7B category</a>. The supply of foot-specific guidance has not caught up.
            </p>
            <Callout label="Design synthesis">
              Men need a foot health resource that is male-specific, clinically grounded, and product-informed. No existing site occupies that intersection.
            </Callout>
          </Section>

          {/* -- 02 Problem -------------------------------- */}
          <Section label="02" title="The Competitive Gap">
            <p style={bodyText}>
              Three categories of content exist for men&apos;s foot health. Each one does part of the job and stops short of the rest.
            </p>
            <p style={bodyText}>
              Clinical sources (<a href="https://www.webmd.com" target="_blank" rel="noopener noreferrer" style={{ color: c.body, textDecoration: "underline", textDecorationColor: c.border }}>WebMD</a>, <a href="https://www.mayoclinic.org" target="_blank" rel="noopener noreferrer" style={{ color: c.body, textDecoration: "underline", textDecorationColor: c.border }}>Mayo Clinic</a>, <a href="https://my.clevelandclinic.org" target="_blank" rel="noopener noreferrer" style={{ color: c.body, textDecoration: "underline", textDecorationColor: c.border }}>Cleveland Clinic</a>) deliver accuracy without a voice. Product-first content (sneaker blogs, GQ, Amazon listicles) names brands without explaining the underlying condition. Wellness platforms (<a href="https://www.healthline.com" target="_blank" rel="noopener noreferrer" style={{ color: c.body, textDecoration: "underline", textDecorationColor: c.border }}>Healthline</a>, <a href="https://www.verywellhealth.com" target="_blank" rel="noopener noreferrer" style={{ color: c.body, textDecoration: "underline", textDecorationColor: c.border }}>Verywell Health</a>) write for a general audience that defaults to women. Each stops short of the same intersection.
            </p>
            {/* Venn diagram — competitive gap */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "32px", marginBottom: "8px" }}>
              <svg
                viewBox="0 0 560 444"
                width="560"
                height="444"
                style={{ maxWidth: "100%", height: "auto", overflow: "visible" }}
                aria-label="Venn diagram showing Men's Sole Revival at the intersection of Clinical, Wellness, and Product-First content"
              >
                <defs>
                  {/* Clinical — soft slate blue */}
                  <radialGradient id="fillClinical" cx="40%" cy="38%" r="60%">
                    <stop offset="0%" stopColor="#7BA7C4" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#7BA7C4" stopOpacity="0.28" />
                  </radialGradient>
                  {/* Product-First — soft amber/warm */}
                  <radialGradient id="fillProduct" cx="60%" cy="38%" r="60%">
                    <stop offset="0%" stopColor="#C4903A" stopOpacity="0.48" />
                    <stop offset="100%" stopColor="#C4903A" stopOpacity="0.22" />
                  </radialGradient>
                  {/* Wellness — soft sage green */}
                  <radialGradient id="fillWellness" cx="50%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="#6BA896" stopOpacity="0.52" />
                    <stop offset="100%" stopColor="#6BA896" stopOpacity="0.26" />
                  </radialGradient>
                  {/* Clip paths for triple intersection */}
                  <clipPath id="clipClinical"><circle cx="196" cy="182" r="148" /></clipPath>
                  <clipPath id="clipProduct"><circle cx="364" cy="182" r="148" /></clipPath>
                  <clipPath id="clipWellness"><circle cx="280" cy="282" r="148" /></clipPath>
                </defs>

                {/* ── Three circles ── */}
                <circle cx="196" cy="182" r="148" fill="url(#fillClinical)" />
                <circle cx="364" cy="182" r="148" fill="url(#fillProduct)" />
                <circle cx="280" cy="282" r="148" fill="url(#fillWellness)" />

                {/* ── Triple intersection — filled cognac via nested clip paths ── */}
                <g clipPath="url(#clipClinical)">
                  <g clipPath="url(#clipProduct)">
                    <circle cx="280" cy="282" r="148" fill="#C4703A" fillOpacity="0.82" clipPath="url(#clipWellness)" />
                  </g>
                </g>

                {/* ── Circle labels ── */}
                {/* Clinical */}
                <text x="130" y="114" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="#C4703A" style={{ textTransform: "uppercase" }}>CLINICAL</text>
                <text x="130" y="132" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="11" fill="#8A8680">WebMD, Mayo Clinic</text>
                <text x="130" y="147" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="11" fill="#8A8680">Cleveland Clinic</text>

                {/* Product-First */}
                <text x="430" y="114" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="#C4703A" style={{ textTransform: "uppercase" }}>PRODUCT-FIRST</text>
                <text x="430" y="132" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="11" fill="#8A8680">Sneaker blogs, GQ</text>
                <text x="430" y="147" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="11" fill="#8A8680">Amazon listicles</text>

                {/* Wellness */}
                <text x="280" y="390" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="#C4703A" style={{ textTransform: "uppercase" }}>WELLNESS</text>
                <text x="280" y="407" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="11" fill="#8A8680">Healthline, Verywell Health</text>

                {/* ── Pairwise gap labels ── */}
                {/* Clinical ∩ Product — top center */}
                <text x="280" y="118" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="12" fontWeight="600" fill="#3D4440" fontStyle="italic">no male focus</text>

                {/* Clinical ∩ Wellness — left */}
                <text x="166" y="263" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="12" fontWeight="600" fill="#3D4440" fontStyle="italic">no product</text>
                <text x="166" y="278" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="12" fontWeight="600" fill="#3D4440" fontStyle="italic">guidance</text>

                {/* Product ∩ Wellness — right */}
                <text x="386" y="263" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="12" fontWeight="600" fill="#3D4440" fontStyle="italic">no clinical</text>
                <text x="386" y="278" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="12" fontWeight="600" fill="#3D4440" fontStyle="italic">rigor</text>

                {/* ── Center label on the intersection ── */}
                <text x="280" y="214" textAnchor="middle" fontFamily="var(--font-dm-sans), -apple-system, sans-serif" fontSize="18" fill="white" fontWeight="600" letterSpacing="-0.015em" style={{ filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.18))" }}>Men&apos;s Sole</text>
                <text x="280" y="234" textAnchor="middle" fontFamily="var(--font-dm-sans), -apple-system, sans-serif" fontSize="18" fill="white" fontWeight="600" letterSpacing="-0.015em" style={{ filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.18))" }}>Revival</text>
              </svg>
            </div>
            <p style={{ ...bodyText, marginTop: "24px" }}>
              The intersection is where the audience actually lives: male-specific, clinically grounded, and product-informed. It&apos;s the resource that should exist where the three categories overlap, not a compromise between them.
            </p>
          </Section>

          {/* -- 03 Competitor Analysis ------------------- */}
          <Section label="03" title="Competitor Analysis">
            <p style={bodyText}>
              Five categories shape how a man over 40 thinks about foot health: clinical, athletic, orthopedic, wellness, and grooming. None of them speak to him directly about feet. Mapping their feature sets, pricing models, and tone shows where the gap lives and what MSR can borrow.
            </p>

            {/* Competitor matrix */}
            <div className="cs-table-scroll" style={{ marginTop: "24px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                <thead>
                  <tr style={{ background: c.bgSection }}>
                    {[
                      { label: "Category",     width: "16%" },
                      { label: "Examples",     width: "20%" },
                      { label: "Model",        width: "16%" },
                      { label: "Captures user with", width: "24%" },
                      { label: "Loses user at",   width: "24%" },
                    ].map(({ label, width }) => (
                      <th key={label} style={{ ...thStyle, width, color: label === "Captures user with" ? c.accent : c.muted, fontWeight: label === "Captures user with" ? 700 : 600 }}>{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      cat: "Men&apos;s grooming",
                      ex:  "Hims, Roman, Manscaped, Harry&apos;s",
                      mod: "Subscription DTC, intake quiz",
                      cap: "Defuses embarrassment. \"We handle this here, no judgment.\"",
                      lose: "Foot health is unaddressed. No condition vocabulary.",
                    },
                    {
                      cat: "Athletic / performance footwear",
                      ex:  "Runner&apos;s World, Believe in the Run, Road Runner Sports",
                      mod: "Editorial + affiliate",
                      cap: "Gear specificity. Performance frame.",
                      lose: "Foot health framed as performance only. No clinical layer.",
                    },
                    {
                      cat: "Orthopedic",
                      ex:  "Vionic, Orthofeet, Aetrex",
                      mod: "Direct sale + Rx referral",
                      cap: "Condition validation. Therapeutic credibility.",
                      lose: "Aging signal. Beige clinical aesthetic men avoid.",
                    },
                    {
                      cat: "Wellness",
                      ex:  "Healthline, Verywell Health, WebMD foot care",
                      mod: "Ads + editorial",
                      cap: "Symptom answers. Editorial authority.",
                      lose: "Female default. No men&apos;s framing. No product layer.",
                    },
                    {
                      cat: "Men&apos;s hair / skincare",
                      ex:  "Hims, Keeps, Tiege Hanley",
                      mod: "Subscription DTC, intake quiz",
                      cap: "Visible-aging concerns. Routine logic.",
                      lose: "Below-the-ankle is not in scope.",
                    },
                  ].map(({ cat, ex, mod, cap, lose }, i) => (
                    <tr key={cat} style={{ background: i % 2 === 0 ? c.surface : c.bg }}>
                      <td style={{ ...tdStyle, fontWeight: 600, color: c.ink }} dangerouslySetInnerHTML={{ __html: cat }} />
                      <td style={{ ...tdStyle, color: c.body }} dangerouslySetInnerHTML={{ __html: ex }} />
                      <td style={{ ...tdStyle, color: c.body }}>{mod}</td>
                      <td style={{ ...tdStyle, color: c.ink }} dangerouslySetInnerHTML={{ __html: cap }} />
                      <td style={{ ...tdStyle, color: c.muted, fontStyle: "italic" }} dangerouslySetInnerHTML={{ __html: lose }} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Callout label="Synthesis">
              The audience moves through these categories in order. Grooming gives him permission to pay attention. Athletic content gives him gear. Wellness gives him language for symptoms. Orthopedic gives him names for conditions. Hair and skincare give him the model: short intake, specific recommendation, no judgment. MSR uses each one&apos;s entry move and avoids each one&apos;s exit. The result is the foot health resource the audience already knows how to read.
            </Callout>
          </Section>

          {/* -- 04 The Pivot ----------------------------- */}
          <Section label="04" title="The Pivot">
            <p style={bodyText}>
              The original plan was a premium men&apos;s foot care e-commerce site. Curated product kits: antifungal treatment, toe separators, insoles, foot cream. Headless Shopify, Next.js frontend, dark editorial brand.
            </p>
            <p style={bodyText}>
              The numbers kept breaking. Commodity products with thin margins, fulfillment costs, customer acquisition on a cold audience. Three weeks of margin modeling kept pointing to the same answer: the friction wasn&apos;t execution. It was the starting point.
            </p>
            <p style={bodyText}>
              The market sizing supported the thesis. The unit economics did not.
            </p>
            <p style={bodyText}>
              Then the market research showed the real problem. I used a jobs-to-be-done frame to redefine it: these men aren&apos;t hiring a product. They&apos;re hiring a reason to start paying attention. The gap wasn&apos;t in the products. It was in the information layer that should precede them. Men over 40 who aren&apos;t already thinking about their feet are expensive to convert. They need a resource they trust before they&apos;ll buy anything. The e-commerce model puts the transaction before the relationship that makes the transaction possible.
            </p>

            {/* Before / After table */}
            <div className="cs-table-scroll" style={{ marginTop: "8px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: c.bgSection }}>
                    {["Dimension", "Original Model", "", "Pivoted Model"].map((h, i) => (
                      <th key={i} style={{ ...thStyle, width: h === "" ? "44px" : undefined }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { dim: "Revenue",     before: "Product sales",     after: "Affiliate links + brand partnerships" },
                    { dim: "Page design",  before: "Product listings",  after: "Review pages using e-commerce UX patterns" },
                    { dim: "Content",      before: "Catalog copy",      after: "Pillar articles + product comparison reviews" },
                    { dim: "Growth",       before: "Paid acquisition",  after: "SEO, social, direct brand outreach" },
                  ].map(({ dim, before, after }, i) => (
                    <tr key={dim} style={{ background: i % 2 === 0 ? c.surface : c.bg }}>
                      <td style={{ ...tdStyle, fontWeight: 600, color: c.ink }}>{dim}</td>
                      <td style={{ ...tdStyle, color: c.muted }}>{before}</td>
                      <td style={{ ...tdStyle, color: c.cognac, fontWeight: 700, textAlign: "center", fontSize: "18px", lineHeight: 1 }}>&rarr;</td>
                      <td style={{ ...tdStyle, color: c.ink, fontWeight: 600 }}>{after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Callout label="Key insight">
              The pivot wasn&apos;t away from e-commerce. It was toward content as the product, using e-commerce UX patterns to frame editorial decisions.
            </Callout>
          </Section>

          {/* -- 05 Site Architecture --------------------- */}
          <Section label="05" title="Site Architecture">

            {/* IA tree (Figma Artifact 01) */}
            <div style={{
              position:    "relative",
              aspectRatio: "1920 / 1131",
              marginBottom: "32px",
              border:      `1px solid ${c.border}`,
              background:  c.bgSection,
              overflow:    "hidden",
            }}>
              <Image
                src="/images/work/msr/msr-ia-tree.svg"
                alt="MSR information architecture. Every route from the homepage to detail pages. A right-side symptom tag rail (cracked heels, toenail fungus, foot pain, alignment, etc.) feeds the Guides and Assessment routes so users can arrive symptom-first."
                fill
                sizes="(max-width: 767px) 100vw, 1100px"
                style={{ objectFit: "contain", objectPosition: "top" }}
              />
            </div>

            {/* Annotation under the IA tree */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px", marginBottom: "32px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{
                  width: "4px", height: "4px", borderRadius: "50%",
                  background: c.cognac, flexShrink: 0, marginTop: "9px",
                }} />
                <p style={{
                  fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65,
                  color: c.body, margin: 0,
                }}>
                  <span style={{ color: c.ink, fontWeight: 600 }}>Symptoms live in a tag rail, not the nav</span>
                  {" · "}A man with cracked heels should not have to know whether the answer is a routine, a kit, or an article. The tag pulls relevant content from all three. The nav stays clean. The symptom does the routing.
                </p>
              </div>
            </div>

            <p style={bodyText}>
              Seven primary routes, each designed for a different user task. The information architecture is the product strategy made navigable. Every route maps to a specific intent.
            </p>

            {/* Route table */}
            <div className="cs-table-scroll" style={{ marginTop: "8px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                <thead>
                  <tr style={{ background: c.bgSection }}>
                    {[
                      { label: "Route",     width: "24%" },
                      { label: "Type",      width: "22%" },
                      { label: "User Task", width: "16%" },
                      { label: "Purpose",   width: "38%" },
                    ].map(({ label, width }) => (
                      <th key={label} style={{ ...thStyle, width, color: label === "User Task" ? c.accent : c.muted, fontWeight: label === "User Task" ? 700 : 600 }}>{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { route: "/",                  type: "Homepage",        task: "Orient",   purpose: "Understand what this site is and whether it\u2019s for me." },
                    { route: "/guides",            type: "Guides Index",    task: "Browse",   purpose: "Find the right starting point." },
                    { route: "/guides/[slug]",     type: "Article",         task: "Learn",    purpose: "Go deeper on a foot health topic." },
                    { route: "/reviews/[slug]",    type: "Product Review",  task: "Evaluate", purpose: "Compare and decide on a product." },
                    { route: "/routines/[slug]",   type: "Routine",         task: "Explore",  purpose: "Follow a recommended routine." },
                    { route: "/about",             type: "Brand Story",     task: "Trust",    purpose: "Understand who built this and why." },
                    { route: "/assessment",        type: "Self-Check Tool", task: "Act",      purpose: "Get a personalized starting point." },
                  ].map(({ route, type, task, purpose }, i) => (
                    <tr key={route} style={{ background: i % 2 === 0 ? c.surface : c.bg }}>
                      <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: "13px", color: c.muted, overflowWrap: "anywhere" }}>{route}</td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: c.ink }}>{type}</td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: c.cognac }}>{task}</td>
                      <td style={tdStyle}>{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </Section>

          {/* -- 06 User Flows ---------------------------- */}
          <Section label="06" title="User Flows">
            <p style={bodyText}>
              Two paths to the product. Symptom-first and question-first end at the same decision.
            </p>
            <p style={bodyText}>
              Flow A is the symptom-first path. The user takes the assessment, answers a Q1 that branches into one of three Q2 sets, and lands on a personalized recommendation. Flow B is the question-first path. The user reads a guide, follows an in-article reference into related products and reviews, and out to the product CTA. Both paths converge on the same decision. The branch rules, click states, and end-state rationale are annotated inline.
            </p>

            {/* Artifact image */}
            <div style={{
              position:    "relative",
              aspectRatio: "1920 / 1306",
              marginTop:   "24px",
              border:      `1px solid ${c.border}`,
              background:  c.bgSection,
              overflow:    "hidden",
            }}>
              <Image
                src="/images/work/msr/msr-user-flows.svg"
                alt="Artifact 02. User Flows. Two end-to-end paths through Men's Sole Revival. Flow A: Landing, Take Assessment CTA, Triage Step 0, Q1 branch diamond, Q2 sets for Pain Nails or Fit, Results loading, Recommendations, fork to Amazon outbound or internal Routine and Review. Flow B: Landing, Guides Index, Article detail, Related callout, fork to Review detail or Amazon outbound."
                fill
                sizes="(max-width: 767px) 100vw, 1100px"
                style={{ objectFit: "contain", objectPosition: "top" }}
              />
            </div>

            {/* Annotations */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "24px" }}>
              {[
                {
                  detail: "Branch diamond",
                  why: "Q1 asks where the trouble lives. The answer routes into one of three Q2 sets: pain, nails, or fit. The branch cuts the number of questions the user actually sees.",
                },
                {
                  detail: "Fork at the end of Flow A",
                  why: "The fork shows two end-states. The current path routes to an Amazon affiliate outbound. The pivot lands on an internal product page that captures email, reviews, and routine adherence.",
                },
              ].map(({ detail, why }) => (
                <div key={detail} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{
                    width: "4px", height: "4px", borderRadius: "50%",
                    background: c.cognac, flexShrink: 0, marginTop: "9px",
                  }} />
                  <p style={{
                    fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65,
                    color: c.body, margin: 0,
                  }}>
                    <span style={{ color: c.ink, fontWeight: 600 }}>{detail}</span>
                    {" · "}{why}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* -- 07 Assessment Redesign -------------------- */}
          <Section label="07" title="Assessment Redesign">
            <p style={bodyText}>
              The original assessment ends in a tier label. The redesign ends in a specific next step. Six artifacts below: where the live version falls short, every question grouped by section, the wireframes at component fidelity, the decision flow behind the routing, the trade-offs that drove every scope move, and the layout rationale that defends every visual decision.
            </p>

            {/* Problem & Comparative Analysis */}
            <div style={{ marginTop: "32px" }}>
              <h3 style={subheading}>Problem & comparative analysis</h3>
              <p style={bodyText}>
                The live assessment has three gaps worth closing. Five comparable intake tools (Function Health, WHOOP, BetterHelp, Hims, Eight Sleep) point to specific moves worth borrowing: symptom-first triage, why-we-ask microcopy, short branching paths, and scheduled re-engagement.
              </p>
              <div style={{
                position:    "relative",
                aspectRatio: "1920 / 1722",
                marginTop:   "16px",
                border:      `1px solid ${c.border}`,
                background:  c.bgSection,
                overflow:    "hidden",
              }}>
                <Image
                  src="/images/work/msr/msr-assessment-problem.svg"
                  alt="Assessment redesign part 1. Current state audit of the live MSR assessment showing three gaps to close (no symptom triage, no completed-sections view, generic result). Plus a comparative analysis of five intake tools and a list of net moves worth borrowing."
                  fill
                  sizes="(max-width: 767px) 100vw, 1100px"
                  style={{ objectFit: "contain", objectPosition: "top" }}
                />
              </div>
            </div>

            {/* Question list */}
            <div style={{ marginTop: "48px" }}>
              <h3 style={subheading}>Every question, in order</h3>
              <p style={bodyText}>
                Twenty-nine items across five sections. Step 0 is the only branching question; after triage, each visible section shows its full item set. Pain and Inflammation is the only three-state section because pain is interoceptive and binary forces false positives. The rest are binary checks. The note at the bottom of each section translates the flag count into a recommendation tier.
              </p>
              <div style={{
                position:    "relative",
                aspectRatio: "1920 / 1262",
                marginTop:   "16px",
                border:      `1px solid ${c.border}`,
                background:  c.bgSection,
                overflow:    "hidden",
              }}>
                <Image
                  src="/images/work/msr/msr-assessment-question-list.svg"
                  alt="Artifact 03h. Question list. Every assessment item grouped by section. Step 0 Triage banner with five symptom chips (Nails, Skin, Pain, Alignment, Footwear fit, Not sure). Five section cards in a grid: Nail Health (seven items, binary), Skin and Heels (six items, binary), Pain and Inflammation (six items, three-state), Alignment and Structure (five items, binary), Footwear Fit (five items, binary). Each section card includes its subtitle, numbered item list, and a NOTE explaining the flag-count threshold."
                  fill
                  sizes="(max-width: 767px) 100vw, 1100px"
                  style={{ objectFit: "contain", objectPosition: "top" }}
                />
              </div>
            </div>

            {/* Wireframes */}
            <div style={{ marginTop: "48px" }}>
              <h3 style={subheading}>Wireframes at component fidelity</h3>
              <p style={bodyText}>
                Six desktop states. Triage as Step 0. In-progress section with a sidebar that shows completed sections, the current one, and what is left. Skip confirmation. Results loading with an acknowledgment line. The three-block result (articles to read, a routine to follow, language for a podiatrist). Email capture as the primary save with a 30 and 90 day check-in opt-in. Two mobile variants for the touch-critical states.
              </p>
              <div style={{
                position:    "relative",
                aspectRatio: "1920 / 2230",
                marginTop:   "16px",
                border:      `1px solid ${c.border}`,
                background:  c.bgSection,
                overflow:    "hidden",
              }}>
                <Image
                  src="/images/work/msr/msr-assessment-wireframes.svg"
                  alt="Assessment redesign part 2. Six desktop wireframes at component fidelity plus two mobile variants. Each state is annotated with its role in the redesigned flow."
                  fill
                  sizes="(max-width: 767px) 100vw, 1100px"
                  style={{ objectFit: "contain", objectPosition: "top" }}
                />
              </div>
            </div>

            {/* Decision flow */}
            <div style={{ marginTop: "48px" }}>
              <h3 style={subheading}>Decision flow</h3>
              <p style={bodyText}>
                Every branch in the routing logic, surfaced as a flowchart. Diamonds are decisions, rectangles are screens or actions, pills are start and end states. The Pain section is the only branch that renders three-state radios; everything else is binary. composeResult bucketizes flags, shifts on duration, and only surfaces the clinic callout when a section bucket reads high. Email and PDF endings opt the user into 30 and 90 day follow-ups.
              </p>
              <div style={{
                position:    "relative",
                aspectRatio: "1600 / 2520",
                marginTop:   "16px",
                border:      `1px solid ${c.border}`,
                background:  c.bgSection,
                overflow:    "hidden",
              }}>
                <Image
                  src="/images/work/msr/msr-assessment-decision-flow.svg"
                  alt="Artifact 03g. Assessment Decision Flow. Vertical flowchart starting from Intro, branching at Triage (selected one or more symptoms?), into Filter sections or Show all sections, then into the For each visible section loop with the Pain section decision routing into binary or three-state items. Any items flagged decision routes into Ask duration or Skip duration. Last section decision routes into Advance or Acknowledgment. composeResult routes into uncertainty prep bullet or clinic callout. Results screen, save action, then ends in Email, PDF, or Restart."
                  fill
                  sizes="(max-width: 767px) 100vw, 720px"
                  style={{ objectFit: "contain", objectPosition: "top" }}
                />
              </div>
            </div>

            {/* Trade-offs & decision note */}
            <div style={{ marginTop: "48px" }}>
              <h3 style={subheading}>Trade-offs and the decision argument</h3>
              <p style={bodyText}>
                Nine decisions documented as trade-offs. What I chose, what I deliberately did not choose, and why. Closes with the case-study argument: personalization, re-engagement, and first-party data can be earned without trading the editorial trust the audience came for.
              </p>
              <div style={{
                position:    "relative",
                aspectRatio: "1920 / 1229",
                marginTop:   "16px",
                border:      `1px solid ${c.border}`,
                background:  c.bgSection,
                overflow:    "hidden",
              }}>
                <Image
                  src="/images/work/msr/msr-assessment-tradeoffs.svg"
                  alt="Assessment redesign part 3. Nine-row trade-off table covering entry point, save model, result format, pain answer state, progress UI, section skip, re-engagement, acknowledgment, and recommendation routing. Followed by the one-paragraph decision note."
                  fill
                  sizes="(max-width: 767px) 100vw, 1100px"
                  style={{ objectFit: "contain", objectPosition: "top" }}
                />
              </div>
            </div>

            {/* Layout rationale */}
            <div style={{ marginTop: "48px" }}>
              <h3 style={subheading}>Layout rationale</h3>
              <p style={bodyText}>
                Four layout decisions, each defended on usability, cognition, and emotional grounds. Each one was a deliberate choice over a documented alternative. The form is centered, supporting education sits beside it, the column is narrow, and the typography is editorial. The goal across all four is to lower the stigma barrier before the user reads a word.
              </p>
              <div style={{
                position:    "relative",
                aspectRatio: "1920 / 1100",
                marginTop:   "16px",
                border:      `1px solid ${c.border}`,
                background:  c.bgSection,
                overflow:    "hidden",
              }}>
                <Image
                  src="/images/work/msr/msr-assessment-layout-rationale.svg"
                  alt="Artifact 03i. Layout rationale. Four decision cards in a two-by-two grid. Decision 01 Alignment: the form is centered on the canvas, alternative considered was left-aligned with sidebar floated right. Decision 02 Composition: supporting education sits beside the form, alternative was tooltip on hover. Decision 03 Measure: width is constrained to approximately 640px, alternative was full-bleed at 1100px. Decision 04 Tone: editorial typography in Lora plus a warm stone palette, alternative was healthcare-intake utility-form aesthetic."
                  fill
                  sizes="(max-width: 767px) 100vw, 1100px"
                  style={{ objectFit: "contain", objectPosition: "top" }}
                />
              </div>
            </div>
          </Section>

          {/* -- 08 Design Decisions ---------------------- */}
          <Section label="08" title="Design Decisions">
            <p style={bodyText}>
              Two design decisions define the case study: the visual language and the review page layout. Each one is a hypothesis about the audience that the design has to pass or fail. Aesthetic preference is not part of the test.
            </p>

            <h3 style={subheading}>Brand Direction: Dark Editorial</h3>
            <p style={bodyText}>
              <strong style={{ color: c.ink }}>Hypothesis.</strong> A dark editorial aesthetic, borrowed from premium grooming and performance gear, lowers the stigma barrier before the user reads a word.
            </p>
            <p style={bodyText}>
              <strong style={{ color: c.ink }}>Test.</strong> Three visual directions were prototyped and evaluated against one question: does this aesthetic lower the stigma barrier before the first word is read?
            </p>

            {/* Brand directions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                {
                  name:   "Clinical",
                  status: "Rejected",
                  reason: "Medical authority is precisely the barrier these men are already dealing with. Clinical design confirms the user\u2019s fear: \u2018this requires professional help.\u2019 That\u2019s what drives them away.",
                },
                {
                  name:   "Salesy",
                  status: "Rejected",
                  reason: "Hesitation in this audience comes from shame, not indecision. Pressure amplifies shame. Fear-based design destroys trust before it starts.",
                },
                {
                  name:   "Dark Editorial",
                  status: "Chosen",
                  reason: "The visual language of premium grooming brands and men\u2019s performance gear. Brands men already trust for personal care. The aesthetic says this topic is handled here with confidence, not apology.",
                },
              ].map(({ name, status, reason }) => (
                <div
                  key={name}
                  className="cs-problem-card"
                  style={{
                    display:    "flex",
                    gap:        "20px",
                    padding:    "20px 24px",
                    background: status === "Chosen" ? "rgba(196,112,58,0.04)" : c.surface,
                    border:     status === "Chosen" ? `1px solid rgba(196,112,58,0.25)` : `1px solid ${c.border}`,
                  }}
                >
                  <span className="cs-problem-label" style={{
                    fontFamily: font.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                    color: status === "Chosen" ? c.cognac : status === "Rejected" ? c.muted : c.accent,
                    minWidth: "160px", flexShrink: 0, paddingTop: "2px",
                  }}>
                    {name} · {status}
                  </span>
                  <p style={{ fontFamily: font.sans, fontSize: "15px", lineHeight: 1.65, color: c.body, margin: 0 }}>
                    {reason}
                  </p>
                </div>
              ))}
            </div>

            {/* Brand screenshots */}
            <div style={{ marginTop: "32px" }}>
              <p style={{
                fontFamily:    font.sans,
                fontSize:      "11px",
                fontWeight:    600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         c.muted,
                margin:        "0 0 12px",
              }}>
                Visual Directions Explored
              </p>
              {/* Row 1: Rejected directions — half-width, paired, with REJECTED overlay */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                {[
                  { src: "/images/work/msr/msr-clinical.webp", label: "Clinical \u00B7 Rejected", position: "center top" },
                  { src: "/images/work/msr/msr-salesy.webp",   label: "Salesy \u00B7 Rejected",   position: "center top" },
                ].map(({ src, label, position }) => (
                  <div key={label}>
                    <div style={{
                      position:     "relative",
                      aspectRatio:  "4/3",
                      overflow:     "hidden",
                      border:       `1px solid ${c.border}`,
                      background:   c.bgSection,
                    }}>
                      <Image
                        src={src}
                        alt={label}
                        fill
                        sizes="(max-width: 767px) 100vw, 420px"
                        style={{ objectFit: "contain", objectPosition: position }}
                      />
                    </div>
                    <p style={{ fontFamily: font.sans, fontSize: "12px", color: c.muted, margin: "8px 0 0" }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Row 2: Wireframe explorations — three directions, the chosen one wins on bottom */}
              <div style={{ marginTop: "16px" }}>
                <p style={{
                  fontFamily:    font.sans,
                  fontSize:      "11px",
                  fontWeight:    600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color:         c.muted,
                  margin:        "0 0 12px",
                }}>
                  Wireframe Explorations
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                  {[
                    {
                      name:   "Hero + Topic Grid",
                      verdict: "Chosen",
                      desc:   "Editorial hero, then a topic grid keyed by condition. Orient → Browse → Read in one scroll.",
                    },
                    {
                      name:   "Symptom-First Picker",
                      verdict: "Rejected",
                      desc:   "Homepage = the assessment Step 0. Strong intent capture. Felt clinical at the door before trust was earned.",
                    },
                    {
                      name:   "Library-First Index",
                      verdict: "Rejected",
                      desc:   "Homepage = full content grid. Strong SEO surface. Buried the brand voice and the &ldquo;is this for me&rdquo; moment.",
                    },
                  ].map(({ name, verdict, desc }) => (
                    <div key={name} style={{
                      padding:    "18px 20px",
                      border:     verdict === "Chosen" ? `2px solid ${c.cognac}` : `1px solid ${c.border}`,
                      background: verdict === "Chosen" ? "rgba(196,112,58,0.04)" : c.surface,
                    }}>
                      <p style={{
                        fontFamily:    font.sans,
                        fontSize:      "10px",
                        fontWeight:    700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color:         verdict === "Chosen" ? c.cognac : c.muted,
                        margin:        "0 0 8px",
                      }}>
                        {name} &middot; {verdict}
                      </p>
                      <p style={{ fontFamily: font.sans, fontSize: "13px", lineHeight: 1.55, color: c.body, margin: 0 }} dangerouslySetInnerHTML={{ __html: desc }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 3: Dark Editorial — full-width, chosen direction */}
              <div style={{ marginTop: "16px" }}>
                <div style={{
                  position:     "relative",
                  aspectRatio:  "16/9",
                  overflow:     "hidden",
                  border:       `2px solid ${c.cognac}`,
                }}>
                  <Image
                    src="/images/work/msr/msr-hero-cover.webp"
                    alt="Dark Editorial \u00B7 Chosen"
                    fill
                    sizes="(max-width: 767px) 100vw, 860px"
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
                <p style={{ fontFamily: font.sans, fontSize: "12px", color: c.ink, margin: "8px 0 0", fontWeight: 600 }}>
                  Dark Editorial \u00B7 Chosen
                </p>
              </div>
            </div>

            <h3 style={subheading}>Logomark: from footprints to monogram</h3>
            <p style={bodyText}>
              <strong style={{ color: c.ink }}>Hypothesis.</strong> A serif monogram, anchored in the same typography as the editorial body, lowers the stigma barrier through quietness. The footprint mark we started with reads closer to mall-podiatry than premium grooming.
            </p>
            <p style={bodyText}>
              <strong style={{ color: c.ink }}>Test.</strong> Three monogram directions were prototyped against the same question as the visual direction: does this mark lower the stigma barrier before the first word is read?
            </p>

            {/* Logomark directions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                {
                  name:   "M01 · Serif Monogram",
                  font:   "Lora display",
                  status: "Chosen",
                  reason: "A single capital M set in the editorial body face. Anchored in the same typography as the rest of the brand. Quiet, restrained, at home next to long-form content. Reads at any size.",
                },
                {
                  name:   "M02 · Lowercase Wordmark",
                  font:   "DM Sans bold",
                  status: "Rejected",
                  reason: "Modern and unfussy, but plain. The lowercase choice signals casualness without earning weight. Loses the editorial argument the brand makes elsewhere.",
                },
                {
                  name:   "M03 · Condensed Wordmark",
                  font:   "Barlow Condensed bold",
                  status: "Rejected",
                  reason: "Confident and athletic. Reads closer to performance gear than premium editorial. Wins on masculinity, loses on stigma reduction.",
                },
              ].map(({ name, font: typeface, status, reason }) => (
                <div
                  key={name}
                  className="cs-problem-card"
                  style={{
                    display:    "flex",
                    gap:        "20px",
                    padding:    "20px 24px",
                    background: status === "Chosen" ? "rgba(196,112,58,0.04)" : c.surface,
                    border:     status === "Chosen" ? `1px solid rgba(196,112,58,0.25)` : `1px solid ${c.border}`,
                  }}
                >
                  <span className="cs-problem-label" style={{
                    fontFamily: font.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                    color: status === "Chosen" ? c.cognac : c.muted,
                    minWidth: "200px", flexShrink: 0, paddingTop: "2px",
                  }}>
                    {name} · {status}
                  </span>
                  <div>
                    <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: c.muted, margin: "0 0 6px" }}>
                      {typeface}
                    </p>
                    <p style={{ fontFamily: font.sans, fontSize: "15px", lineHeight: 1.65, color: c.body, margin: 0 }}>
                      {reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* M01 chosen mark in 4 colorways */}
            <div style={{ marginTop: "32px" }}>
              <p style={{
                fontFamily:    font.sans,
                fontSize:      "11px",
                fontWeight:    600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         c.muted,
                margin:        "0 0 12px",
              }}>
                Chosen mark · four colorways
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px" }}>
                {[
                  { name: "Navy",     hex: "#1C3F5E" },
                  { name: "Cognac",   hex: "#BE7241" },
                  { name: "Stone",    hex: "#C4BCAE" },
                  { name: "Charcoal", hex: "#1A1A1A" },
                ].map(({ name, hex }) => (
                  <div key={name}>
                    <div style={{
                      position:    "relative",
                      aspectRatio: "1 / 1",
                      border:      `1px solid ${c.border}`,
                      overflow:    "hidden",
                    }}>
                      <Image
                        src={`/images/work/msr/msr-logo-m01-${name.toLowerCase()}.webp`}
                        alt={`MSR logomark M01 in ${name}`}
                        fill
                        sizes="(max-width: 767px) 50vw, 220px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: c.ink, margin: "8px 0 2px" }}>
                      {name}
                    </p>
                    <p style={{ fontFamily: "monospace", fontSize: "11px", color: c.muted, margin: 0 }}>
                      {hex}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <h3 style={subheading}>Review Pages: E-Commerce UX, Not Blog Format</h3>
            <p style={bodyText}>
              <strong style={{ color: c.ink }}>Hypothesis.</strong> Review readers want to evaluate, not read. A blog format buries the signal in narrative.
            </p>
            <p style={bodyText}>
              <strong style={{ color: c.ink }}>Test.</strong> An e-commerce layout (hero, specs grid, rating, pros/cons, buy links) does the orienting work. Users already know how to scan this pattern from every product page they have used. The site borrows it because it matches the task, not because the site sells anything. There is no checkout. There is no inventory.
            </p>

            {/* Stakeholder-style decisions grid */}
            <div style={{ margin: "32px 0", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <div style={{
                padding:      "16px 24px",
                background:   c.bgSection,
                borderBottom: `1px solid ${c.border}`,
              }}>
                <p style={{
                  fontFamily:    font.sans,
                  fontSize:      "11px",
                  fontWeight:    600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color:         c.muted,
                  margin:        0,
                }}>
                  Key Design Decisions
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                {[
                  { area: "Brand",         decision: "Dark editorial as stigma reduction", rationale: "Visual familiarity with premium grooming brands lowers the barrier before the first word is read" },
                  { area: "Layout",        decision: "E-commerce UX for review pages",      rationale: "Match the layout to the task. Evaluation requires scanning, not reading prose" },
                  { area: "Content",       decision: "Pillar articles build SEO authority",  rationale: "Long-form editorial is right when the user is learning. Depth earns organic traffic over time" },
                  { area: "Architecture",  decision: "Every page maps to a user task",       rationale: "Orient, Learn, Evaluate, Browse, Explore, Trust, Act. The IA is the product strategy made navigable" },
                ].map(({ area, decision, rationale }, i) => (
                  <div
                    key={area}
                    style={{
                      padding:     "20px 24px",
                      background:  c.surface,
                      borderRight: i < 3 ? `1px solid ${c.border}` : "none",
                    }}
                  >
                    <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: c.accent, margin: "0 0 8px" }}>
                      {area}
                    </p>
                    <p style={{ fontFamily: font.sans, fontSize: "13px", fontWeight: 600, color: c.ink, margin: "0 0 6px", lineHeight: 1.4 }}>
                      {decision}
                    </p>
                    <p style={{ fontFamily: font.sans, fontSize: "13px", lineHeight: 1.6, color: c.body, margin: 0 }}>
                      {rationale}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* -- 09 Design System ------------------------- */}
          <Section label="09" title="Design System">
            <p style={bodyText}>
              Three typefaces, each with a job. The roles are explicit, not decorative. Below, each one is shown set in itself.
            </p>

            {/* Typography specimens */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0", margin: "24px 0 32px", border: `1px solid ${c.border}` }}>
              {/* Barlow Condensed */}
              <div style={{ padding: "28px clamp(20px, 4vw, 36px)", borderBottom: `1px solid ${c.border}`, background: c.surface }}>
                <p style={{
                  fontFamily:    "var(--font-barlow-condensed), \"Barlow Condensed\", Impact, sans-serif",
                  fontSize:      "clamp(28px, 5vw, 48px)",
                  fontWeight:    600,
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  lineHeight:    1.05,
                  color:         c.ink,
                  margin:        "0 0 12px",
                }}>
                  Barlow Condensed for display headlines
                </p>
                <p style={{
                  fontFamily:    font.sans,
                  fontSize:      "12px",
                  fontWeight:    600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color:         c.muted,
                  margin:        "0 0 8px",
                }}>
                  Display · 600 · uppercase
                </p>
                <p style={{ fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65, color: c.body, margin: 0, maxWidth: "640px" }}>
                  Authority and presence. Used at the largest scale where a headline has to land in a glance.
                </p>
              </div>

              {/* Lora */}
              <div style={{ padding: "28px clamp(20px, 4vw, 36px)", borderBottom: `1px solid ${c.border}`, background: c.surface }}>
                <p style={{
                  fontFamily:    "var(--font-lora), Lora, Georgia, serif",
                  fontSize:      "clamp(22px, 3vw, 30px)",
                  fontWeight:    400,
                  fontStyle:     "italic",
                  lineHeight:    1.35,
                  color:         c.ink,
                  margin:        "0 0 12px",
                  letterSpacing: "-0.005em",
                }}>
                  &ldquo;Lora for editorial subheads and quotes.&rdquo;
                </p>
                <p style={{
                  fontFamily:    font.sans,
                  fontSize:      "12px",
                  fontWeight:    600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color:         c.muted,
                  margin:        "0 0 8px",
                }}>
                  Serif · 400 italic · sub-display
                </p>
                <p style={{ fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65, color: c.body, margin: 0, maxWidth: "640px" }}>
                  Readable and approachable. Used for pull quotes, editorial subheads, and decision-note bodies.
                </p>
              </div>

              {/* DM Sans */}
              <div style={{ padding: "28px clamp(20px, 4vw, 36px)", background: c.surface }}>
                <p style={{
                  fontFamily:    "var(--font-dm-sans), DM Sans, system-ui, sans-serif",
                  fontSize:      "clamp(16px, 2vw, 20px)",
                  fontWeight:    400,
                  lineHeight:    1.55,
                  color:         c.ink,
                  margin:        "0 0 12px",
                  maxWidth:      "640px",
                }}>
                  DM Sans for body copy and UI. Legibility at scale, optimized for screen reading at small sizes and for predictable rhythm in long-form content.
                </p>
                <p style={{
                  fontFamily:    font.sans,
                  fontSize:      "12px",
                  fontWeight:    600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color:         c.muted,
                  margin:        "0 0 8px",
                }}>
                  Sans · 400 · body
                </p>
                <p style={{ fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65, color: c.body, margin: 0, maxWidth: "640px" }}>
                  Body and UI. The workhorse. Used for everything that is not a headline or a quote.
                </p>
              </div>
            </div>
            <p style={bodyText}>
              The token architecture runs three tiers: CSS custom properties as the source of truth, TypeScript semantic aliases for brand-aware naming, and Tailwind utilities consumed in components. One file change propagates everywhere. The same naming convention holds across Brand, Wayfarer, and Men&apos;s Sole Revival. This wasn&apos;t retrofitted. It was a decision made before the first component was built.
            </p>

            {/* Token table */}
            <div className="cs-table-scroll" style={{ marginTop: "8px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                <thead>
                  <tr style={{ background: c.bgSection }}>
                    {[
                      { label: "Token",    width: "22%" },
                      { label: "Brand",    width: "26%" },
                      { label: "Wayfarer", width: "26%" },
                      { label: "MSR",      width: "26%" },
                    ].map(({ label, width }) => (
                      <th key={label} style={{ ...thStyle, width, color: label === "MSR" ? c.accent : c.muted, fontWeight: label === "MSR" ? 700 : 600 }}>{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { token: "brand-500",   brand: "#1C3F5E", wayfarer: "#2D5A3D", msr: "#1C3F5E" },
                    { token: "brand-900",   brand: "#091016", wayfarer: "#0A1A10", msr: "#13100C" },
                    { token: "accent-500",  brand: "#C4703A", wayfarer: "#B8860B", msr: "#C4703A" },
                    { token: "neutral-50",  brand: "#F8F7F7", wayfarer: "#F7F8F5", msr: "#F8F7F7" },
                    { token: "neutral-500", brand: "#6B6560", wayfarer: "#5E6B5A", msr: "#6B6560" },
                  ].map(({ token, brand, wayfarer, msr }, i) => (
                    <tr key={token} style={{ background: i % 2 === 0 ? c.surface : c.bg }}>
                      <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: "13px", color: c.muted }}>{token}</td>
                      <td style={tdStyle}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ width: 14, height: 14, background: brand, border: "1px solid rgba(0,0,0,0.08)", display: "inline-block", borderRadius: 2 }} />
                          <span style={{ fontFamily: "monospace", fontSize: "13px", color: c.muted }}>{brand}</span>
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ width: 14, height: 14, background: wayfarer, border: "1px solid rgba(0,0,0,0.08)", display: "inline-block", borderRadius: 2 }} />
                          <span style={{ fontFamily: "monospace", fontSize: "13px", color: c.muted }}>{wayfarer}</span>
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ width: 14, height: 14, background: msr, border: "1px solid rgba(0,0,0,0.08)", display: "inline-block", borderRadius: 2 }} />
                          <span style={{ fontFamily: "monospace", fontSize: "13px", color: c.ink, fontWeight: 600 }}>{msr}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ ...bodyText, marginTop: "10px", fontSize: "13px", color: c.muted }}>
              Same naming convention, different values per project. The AB Core Library holds primitives for all three properties.
            </p>

            <h3 style={subheading}>The system on one page</h3>
            <p style={bodyText}>
              Three signature documents pulled together for portfolio handoff. Each one stands on its own. Together they document the full visual system, the assessment flow, and the production component library.
            </p>

            {/* Signature + components embeds */}
            <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginTop: "16px" }}>
              {[
                {
                  src:     "/images/work/msr/msr-sig-brand.webp",
                  aspect:  "1600 / 1100",
                  number:  "02",
                  label:   "BRAND & IDENTITY",
                  caption: "Wordmark at four sizes, three logomark directions explored, four colorways of the chosen mark, lockups, palette of eight, typography specs with live specimen, glyph set, and four application mockups.",
                },
                {
                  src:     "/images/work/msr/msr-sig-product.webp",
                  aspect:  "1600 / 1100",
                  number:  "03",
                  label:   "PRODUCT UI/UX",
                  caption: "Flow map of the redesigned assessment. Five primary screens with arrows, four dashed branch states, six-cell annotation grid (tap targets, loading, haptic, error handling, accessibility, motion), legend strip.",
                },
                {
                  src:     "/images/work/msr/msr-design-system-components.png",
                  aspect:  "1920 / 5863",
                  number:  "04",
                  label:   "DESIGN SYSTEM · COMPONENTS",
                  caption: "Spacing on a 4-point base, radius scale, zero-drift token mapping for every component. Primary button by variant and state, article header, inputs, icons, and the CSS custom-property output side-by-side with the design tokens.",
                },
              ].map(({ src, aspect, number, label, caption }) => (
                <div key={src}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "12px" }}>
                    <span style={{
                      fontFamily:    font.sans,
                      fontSize:      "11px",
                      fontWeight:    700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color:         c.cognac,
                    }}>{number}</span>
                    <span style={{
                      fontFamily:    font.sans,
                      fontSize:      "11px",
                      fontWeight:    700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color:         c.ink,
                    }}>{label}</span>
                  </div>
                  <div style={{
                    position:    "relative",
                    aspectRatio: aspect,
                    border:      `1px solid ${c.border}`,
                    background:  c.bgSection,
                    overflow:    "hidden",
                  }}>
                    <Image
                      src={src}
                      alt={`MSR ${label}`}
                      fill
                      sizes="(max-width: 767px) 100vw, 1100px"
                      style={{ objectFit: "contain", objectPosition: "top" }}
                    />
                  </div>
                  <p style={{ fontFamily: font.sans, fontSize: "12px", color: c.muted, lineHeight: 1.55, margin: "10px 0 0", maxWidth: "780px" }}>
                    {caption}
                  </p>
                </div>
              ))}
            </div>
          </Section>

        </div>{/* /content wrapper — break out for full-width walkthrough */}

        {/* -- Visual Walkthrough ---------------------------------- */}
        <div style={{
          background:   "#13100C",
          borderTop:    "1px solid rgba(245,243,239,0.08)",
          borderBottom: "1px solid rgba(245,243,239,0.08)",
          padding:      "72px clamp(24px, 5vw, 80px)",
          marginTop:    "48px",
        }}>
          <div style={{ maxWidth: "none", margin: "0 auto" }}>

            {/* Header */}
            <div style={{ marginBottom: "48px", maxWidth: "560px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <span style={{ width: "20px", height: "1px", background: c.cognac }} />
                <span style={{
                  fontFamily:    font.sans,
                  fontSize:      "11px",
                  fontWeight:    600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color:         c.cognac,
                }}>The Product</span>
              </div>
              <h2 style={{
                fontFamily:    font.display,
                fontSize:      "clamp(22px, 3.5vw, 36px)",
                fontWeight:    400,
                color:         "#F5F5F4",
                margin:        "0 0 16px",
                letterSpacing: "-0.025em",
              }}>
                Every page serves a task, not a template
              </h2>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "15px",
                lineHeight: 1.65,
                color:      "rgba(245,243,239,0.5)",
                margin:     0,
              }}>
                The information architecture maps directly to user intent. Three core page types cover the path from orientation to decision. Each layout was chosen for the task it serves, not for visual consistency across pages.
              </p>
            </div>

            {/* ── Homepage ──────────────── */}
            <div style={{ marginBottom: "64px" }}>
              <h3 style={{
                fontFamily:    font.sans,
                fontSize:      "13px",
                fontWeight:    700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         c.cognac,
                margin:        "0 0 12px",
              }}>Orient</h3>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "14px",
                lineHeight: 1.65,
                color:      "rgba(245,243,239,0.5)",
                margin:     "0 0 24px",
                maxWidth:   "560px",
              }}>
                The homepage answers one question: is this site for me? Dark editorial sets the tone before a word is read. The topic grid orients by condition, not by product category. The assessment CTA gives a personalized entry point.
              </p>
              <div style={{
                position:     "relative",
                aspectRatio:  "16/9",
                overflow:     "hidden",
                background:   "rgba(245,243,239,0.04)",
                border:       "1px solid rgba(245,243,239,0.1)",
                borderRadius: "8px",
              }}>
                <Image
                  src="/images/work/msr/msr-homepage.webp"
                  alt="Men's Sole Revival homepage. Dark editorial design with topic grid and assessment CTA"
                  fill
                  sizes="(max-width: 767px) 100vw, 1100px"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>

              {/* Annotations */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "24px" }}>
                {[
                  { detail: "Assessment CTA in hero", why: "Gives the hesitant user a low-commitment starting point. \u201CWhat\u2019s going on with my feet?\u201D before \u201CRead about fungus.\u201D" },
                ].map(({ detail, why }) => (
                  <div key={detail} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{
                      width: "4px", height: "4px", borderRadius: "50%",
                      background: c.cognac, flexShrink: 0, marginTop: "7px",
                    }} />
                    <p style={{
                      fontFamily: font.sans, fontSize: "12px", lineHeight: 1.55,
                      color: "rgba(245,243,239,0.4)", margin: 0,
                    }}>
                      <span style={{ color: "rgba(245,243,239,0.65)", fontWeight: 600 }}>{detail}</span>
                      {" \u00B7 "}{why}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Article ──────────────── */}
            <div style={{ marginBottom: "64px" }}>
              <h3 style={{
                fontFamily:    font.sans,
                fontSize:      "13px",
                fontWeight:    700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         c.cognac,
                margin:        "0 0 12px",
              }}>Learn</h3>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "14px",
                lineHeight: 1.65,
                color:      "rgba(245,243,239,0.5)",
                margin:     "0 0 24px",
                maxWidth:   "560px",
              }}>
                Pillar articles are the content authority engine. Long-form editorial built for the user who wants to understand, not just skim. Each article targets a high-search-volume foot health question men are already asking.
              </p>
              <div style={{
                position:     "relative",
                aspectRatio:  "16/9",
                overflow:     "hidden",
                background:   "rgba(245,243,239,0.04)",
                border:       "1px solid rgba(245,243,239,0.1)",
                borderRadius: "8px",
              }}>
                <Image
                  src="/images/work/msr/msr-article.webp"
                  alt="Men's Sole Revival article page. Long-form editorial with clear typography hierarchy"
                  fill
                  sizes="(max-width: 767px) 100vw, 1100px"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>

              {/* Annotations */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "24px" }}>
                {[
                  { detail: "Internal linking to reviews and routines", why: "Articles drive traffic. Product reviews and routines capture the intent. Content flows toward decisions." },
                ].map(({ detail, why }) => (
                  <div key={detail} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{
                      width: "4px", height: "4px", borderRadius: "50%",
                      background: c.cognac, flexShrink: 0, marginTop: "7px",
                    }} />
                    <p style={{
                      fontFamily: font.sans, fontSize: "12px", lineHeight: 1.55,
                      color: "rgba(245,243,239,0.4)", margin: 0,
                    }}>
                      <span style={{ color: "rgba(245,243,239,0.65)", fontWeight: 600 }}>{detail}</span>
                      {" \u00B7 "}{why}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Review ──────────────── */}
            <div>
              <h3 style={{
                fontFamily:    font.sans,
                fontSize:      "13px",
                fontWeight:    700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         c.cognac,
                margin:        "0 0 12px",
              }}>Evaluate</h3>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "14px",
                lineHeight: 1.65,
                color:      "rgba(245,243,239,0.5)",
                margin:     "0 0 24px",
                maxWidth:   "560px",
              }}>
                Product reviews use e-commerce layout patterns because the user&apos;s task is evaluation, not reading. Hero image, specs grid, star rating, pros/cons, affiliate CTAs. The format matches the mental model from every product page they&apos;ve used.
              </p>
              <div style={{
                position:     "relative",
                aspectRatio:  "16/9",
                overflow:     "hidden",
                background:   "rgba(245,243,239,0.04)",
                border:       "1px solid rgba(245,243,239,0.1)",
                borderRadius: "8px",
              }}>
                <Image
                  src="/images/work/msr/msr-review.webp"
                  alt="Men's Sole Revival product review. E-commerce UX patterns with specs grid, rating, and affiliate CTAs"
                  fill
                  sizes="(max-width: 767px) 100vw, 1100px"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>

              {/* Annotations */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "24px" }}>
                {[
                  { detail: "Affiliate CTAs, not product listings", why: "Revenue comes from referrals, not transactions. The trust model requires editorial independence from the products reviewed." },
                ].map(({ detail, why }) => (
                  <div key={detail} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{
                      width: "4px", height: "4px", borderRadius: "50%",
                      background: c.cognac, flexShrink: 0, marginTop: "7px",
                    }} />
                    <p style={{
                      fontFamily: font.sans, fontSize: "12px", lineHeight: 1.55,
                      color: "rgba(245,243,239,0.4)", margin: 0,
                    }}>
                      <span style={{ color: "rgba(245,243,239,0.65)", fontWeight: 600 }}>{detail}</span>
                      {" \u00B7 "}{why}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>{/* /Visual Walkthrough */}

        {/* Resume content wrapper for remaining sections */}
        <div style={{ maxWidth: "none", margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

          {/* -- 10 Impact -------------------------------- */}
          <Section label="10" title="Impact">
            <p style={bodyText}>
              The site went live in April 2026, so the first real numbers are in. Below: early outcomes from the first nine weeks, then proxy metrics for each remaining hypothesis, a phased evaluation plan, and the decision criteria that would tell us to stop, iterate, or scale. No fabricated numbers.
            </p>

            {/* Early outcomes box (live data) */}
            <div style={{
              margin:     "24px 0",
              padding:    "24px 28px",
              background: c.surface,
              border:     `1px solid ${c.border}`,
              borderLeft: `3px solid ${c.cognac}`,
            }}>
              <p style={{
                fontFamily:    font.sans,
                fontSize:      "10px",
                fontWeight:    700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color:         c.cognac,
                margin:        "0 0 10px",
              }}>Early outcomes &middot; first 9 weeks live (GA4, Apr&ndash;Jun 2026)</p>
              <p style={{ fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65, color: c.body, margin: "0 0 8px" }}>
                <strong style={{ color: c.ink }}>4m 53s average engaged time per session.</strong> High for a content site, and the exact signal MSR was built to produce: visitors stay to read, they don&apos;t bounce.
              </p>
              <p style={{ fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65, color: c.body, margin: "0 0 8px" }}>
                <strong style={{ color: c.ink }}>~3.2 sessions per user</strong> across 33 early visitors in 6 countries, with zero paid promotion. Early readers come back.
              </p>
              <p style={{ fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65, color: c.body, margin: 0 }}>
                <strong style={{ color: c.ink }}>The honest gap:</strong> traffic is almost entirely direct; organic search is just beginning. SEO is the clear next lever, and the phased plan below is how I&apos;ll measure whether engaged time holds as the audience grows.
              </p>
            </div>

            {/* Validation approach box */}
            <div style={{
              margin:     "24px 0",
              padding:    "24px 28px",
              background: c.surface,
              border:     `1px solid ${c.border}`,
              borderLeft: `3px solid ${c.cognac}`,
            }}>
              <p style={{
                fontFamily:    font.sans,
                fontSize:      "10px",
                fontWeight:    700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color:         c.cognac,
                margin:        "0 0 10px",
              }}>Validation approach</p>
              <p style={{ fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65, color: c.body, margin: "0 0 8px" }}>
                <strong style={{ color: c.ink }}>Phase 1 (0&ndash;3 months):</strong> Content publishing cadence, organic search impressions, Reddit community engagement. Signal: is anyone finding this?
              </p>
              <p style={{ fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65, color: c.body, margin: "0 0 8px" }}>
                <strong style={{ color: c.ink }}>Phase 2 (3&ndash;6 months):</strong> Time on page for reviews vs. articles, email signup rate, return visitor ratio. Signal: does the content structure match user intent?
              </p>
              <p style={{ fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65, color: c.body, margin: 0 }}>
                <strong style={{ color: c.ink }}>Phase 3 (6&ndash;12 months):</strong> Affiliate click-through rates, brand partnership response rate, SEO keyword rankings. Signal: is this a viable business?
              </p>
            </div>

            {/* Threshold table with rationale */}
            <div className="cs-table-scroll" style={{ marginTop: "24px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                <thead>
                  <tr style={{ background: c.bgSection }}>
                    {[
                      { label: "Hypothesis", width: "26%" },
                      { label: "Metric",     width: "22%" },
                      { label: "Threshold",  width: "16%" },
                      { label: "Rationale",  width: "36%" },
                    ].map(({ label, width }) => (
                      <th key={label} style={{ ...thStyle, width, color: label === "Rationale" ? c.accent : c.muted, fontWeight: label === "Rationale" ? 700 : 600 }}>{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { hypothesis: "Men find this content",         metric: "Organic search traffic",     threshold: "500 visits/mo by month 6",    rationale: "Baseline for niche health content sites with 10+ indexed pages" },
                    { hypothesis: "Readers come back",             metric: "Email signup rate",          threshold: "2\u20134% from article pages",     rationale: "Industry avg for content sites; a signup signals intent to return" },
                    { hypothesis: "E-commerce layout works",       metric: "Time on review pages",       threshold: "> 2 min avg",                  rationale: "If users spend time, the layout is doing the orienting work" },
                    { hypothesis: "Site reads as credible",        metric: "Brand outreach response",    threshold: "1 of 3 responds",              rationale: "Vivobarefoot, Altra, Correct Toes. One conversation validates the media property thesis" },
                    { hypothesis: "Community trusts the content",  metric: "Reddit engagement",          threshold: "Shared without prompting",     rationale: "Organic uptake in r/BarefootRunning or r/PlantarFasciitis is the early trust signal" },
                  ].map(({ hypothesis, metric, threshold, rationale }, i) => (
                    <tr key={hypothesis} style={{ background: i % 2 === 0 ? c.surface : c.bg }}>
                      <td style={{ ...tdStyle, fontWeight: 600, color: c.ink }}>{hypothesis}</td>
                      <td style={tdStyle}>{metric}</td>
                      <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: "13px", color: c.cognac }}>{threshold}</td>
                      <td style={{ ...tdStyle, fontSize: "13px", color: c.body }}>{rationale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Decision criteria box */}
            <div style={{
              margin:     "24px 0 0",
              padding:    "20px 24px",
              background: c.bgSection,
              border:     `1px solid ${c.border}`,
            }}>
              <p style={{
                fontFamily:    font.sans,
                fontSize:      "10px",
                fontWeight:    700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color:         c.muted,
                margin:        "0 0 10px",
              }}>Decision criteria</p>
              <p style={{ fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65, color: c.body, margin: 0 }}>
                If Phase 1 signals are flat after 3 months of consistent publishing, the content strategy hypothesis is wrong. Revisit topic selection, distribution channels, and SEO targeting before investing in Phase 2 metrics. If review page time-on-page is below threshold, the e-commerce layout assumption needs usability testing. The plan is designed to fail fast and fail specifically.
              </p>
            </div>

          </Section>

          {/* -- 11 Reflection ---------------------------- */}
          <Section label="11" title="Reflection">
            <p style={bodyText}>
              The first build spent three weeks fighting a stack that wasn&apos;t right for the problem. The friction was the signal and I waited too long to act on it. The pivot from e-commerce to content wasn&apos;t a retreat. It was the moment the project found its actual shape.
            </p>
            <p style={bodyText}>
              The absence of user validation is the biggest open question. The e-commerce layout for reviews is the call I&apos;d make again, but it hasn&apos;t been tested with the actual audience. The competitive analysis and UX reasoning are sound, but reasoning isn&apos;t evidence. The evaluation plan is how I&apos;ll find out if the reasoning holds.
            </p>
            <p style={bodyText}>
              Content authority takes time. The honest uncertainty: whether the SEO ramp will produce the audience before the motivation to sustain the project runs out. That&apos;s not a design problem. It&apos;s the real risk of building something this slowly, alone.
            </p>

            <h3 style={subheading}>What wasn&apos;t done</h3>
            <p style={bodyText}>
              I didn&apos;t conduct user interviews before building. I didn&apos;t run usability tests on the review page layout. The e-commerce UX pattern is based on competitive analysis and reasoning about mental models, not observed behavior with real users. Self-initiated, no research budget. The decisions are reasoned, not tested.
            </p>
          </Section>

        </div>{/* /content wrapper */}

        {/* -- Slide deck CTA (compact inline bar) ------- */}
        <div
          style={{
            borderTop:   `1px solid ${c.border}`,
            padding:     "20px clamp(24px, 5vw, 80px)",
            marginTop:   "80px",
          }}
        >
          <div style={{
            maxWidth: "none",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}>
            <p style={{
              fontFamily: font.sans,
              fontSize:   "14px",
              color:      c.muted,
              margin:     0,
            }}>
              Prefer the narrative version?
            </p>
            <Link
              href="/work/presentations/mens-sole-revival"
              style={{
                fontFamily:     font.sans,
                fontSize:       "14px",
                fontWeight:     600,
                color:          c.ink,
                textDecoration: "none",
                display:        "inline-flex",
                alignItems:     "center",
                gap:            "4px",
              }}
            >
              View the 9-slide deck
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* -- Figma source CTA -------------------------- */}
        <div
          style={{
            background:  "#13100C",
            padding:     "80px clamp(24px, 5vw, 80px)",
          }}
        >
          <div style={{ maxWidth: "none", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "32px" }}>
            <div style={{ maxWidth: "640px" }}>
              <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: c.cognac, margin: "0 0 12px" }}>
                Source
              </p>
              <p style={{ fontFamily: font.display, fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 400, color: "#F5F5F4", margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                The whole project lives in Figma.
              </p>
              <p style={{ fontFamily: font.sans, fontSize: "15px", lineHeight: 1.65, color: "rgba(245,243,239,0.65)", margin: 0 }}>
                Every artifact above comes from the file. Research briefs, IA, the assessment redesign 03a&ndash;03i, brand identity, design system, website pages, and the directions explored before the pivot. Eight sections, ten artifacts, thirteen component sets.
              </p>
            </div>
            <a
              href="https://www.figma.com/design/ftIe1aelQLB7hOR4PUA9lR/Men-s-Sole-Revival"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            "10px",
                padding:        "14px 32px",
                background:     c.cognac,
                borderRadius:   "8px",
                color:          "#F5F5F4",
                fontFamily:     font.sans,
                fontSize:       "13px",
                fontWeight:     500,
                letterSpacing:  "0.06em",
                textDecoration: "none",
                transition:     "opacity 0.2s",
              }}
            >
              Open Figma file
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* -- Next case study CTA ----------------------- */}
        <div
          style={{
            background:  c.bgSection,
            borderTop:   `1px solid ${c.border}`,
            padding:     "80px clamp(24px, 5vw, 80px)",
          }}
        >
          <div style={{ maxWidth: "none", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: c.muted, margin: "0 0 8px" }}>
                Next Case Study
              </p>
              <p style={{ fontFamily: font.display, fontSize: "clamp(20px, 3vw, 28px)", color: c.ink, margin: 0 }}>
                Spotify: Recently Played Controls
              </p>
            </div>
            <Link
              href="/work/spotify"
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            "10px",
                padding:        "12px 28px",
                background:     c.ink,
                borderRadius:   "8px",
                color:          "#F5F5F4",
                fontFamily:     font.sans,
                fontSize:       "13px",
                fontWeight:     500,
                letterSpacing:  "0.06em",
                textDecoration: "none",
                transition:     "opacity 0.2s",
              }}
            >
              View Case Study
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}

/* -------------------------------------------------
   Sub-components
------------------------------------------------- */

const c2 = {
  ink:       "#252B28",
  body:      "#3D4440",
  muted:     "#8A8680",
  accent:    "#7A8B6E",
  bg:        "#FFFFFF",
  bgSection: "#FAFAF9",
  surface:   "#FFFFFF",
  border:    "#A99B8A",
  cognac:    "#C4703A",  // MSR brand accent (stays)
};

const f = {
  display: "var(--font-dm-sans), -apple-system, sans-serif",
  sans:    "var(--font-dm-sans), -apple-system, sans-serif",
};

function Section({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <section
      id={`section-${label}`}
      style={{
        paddingTop:    "48px",
        paddingBottom: "16px",
        borderTop:     `1px solid ${c2.border}`,
        marginTop:     "48px",
        scrollMarginTop: "96px",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "32px" }}>
        <span style={{
          fontFamily:    f.sans,
          fontSize:      "11px",
          fontWeight:    700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color:         c2.accent,
        }}>
          {label}
        </span>
        <h2
          style={{
            fontFamily:    f.display,
            fontSize:      "clamp(22px, 3.5vw, 36px)",
            fontWeight:    400,
            color:         c2.ink,
            margin:        0,
            letterSpacing: "-0.025em",
          }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
      {children}
    </section>
  );
}

function Callout({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <blockquote style={{
      margin:      "32px 0",
      padding:     "24px 28px",
      background:  c2.surface,
      border:      `1px solid ${c2.border}`,
      borderLeft:  `3px solid ${c2.cognac}`,
    }}>
      {label && (
        <p style={{
          fontFamily:    f.sans,
          fontSize:      "10px",
          fontWeight:    700,
          letterSpacing: "0.14em",
          textTransform: "uppercase" as const,
          color:         c2.cognac,
          margin:        "0 0 10px",
        }}>
          {label}
        </p>
      )}
      <p style={{
        fontFamily:  f.display,
        fontSize:    "clamp(17px, 2.2vw, 20px)",
        lineHeight:  1.5,
        color:       c2.ink,
        fontStyle:   "italic",
        margin:      0,
      }}>
        {children}
      </p>
    </blockquote>
  );
}

/* -------------------------------------------------
   Shared style objects
------------------------------------------------- */

const bodyText: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), -apple-system, sans-serif",
  fontSize:   "16px",
  lineHeight: 1.75,
  color:      "#3D4440",
  margin:     "0 0 20px",
};

const subheading: React.CSSProperties = {
  fontFamily:    "var(--font-dm-sans), -apple-system, sans-serif",
  fontSize:      "20px",
  fontWeight:    600,
  color:         "#252B28",
  margin:        "40px 0 16px",
  letterSpacing: "-0.015em",
};

const thStyle: React.CSSProperties = {
  fontFamily:    "var(--font-dm-sans), -apple-system, sans-serif",
  fontSize:      "11px",
  fontWeight:    700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color:         "#8A8680",
  padding:       "12px 16px",
  textAlign:     "left",
  borderBottom:  "1px solid #A99B8A",
};

const tdStyle: React.CSSProperties = {
  fontFamily:   "var(--font-dm-sans), -apple-system, sans-serif",
  fontSize:     "14px",
  color:        "#3D4440",
  padding:      "14px 16px",
  borderBottom: "1px solid #A99B8A",
};
