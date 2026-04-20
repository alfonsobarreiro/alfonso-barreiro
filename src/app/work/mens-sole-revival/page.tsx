import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Men\u2019s Sole Revival — Foot Health Content Platform \u00B7 Alfonso Barreiro",
  description:
    "Case study: Designing a content-first foot health resource for men, using editorial authority, e-commerce UX patterns, and a token-driven design system to lower the stigma barrier.",
  openGraph: {
    title: "Men\u2019s Sole Revival \u00B7 Alfonso Barreiro",
    description:
      "A UX case study on building a content-first foot health platform for men.",
    url: "https://barreiro.com/work/mens-sole-revival",
    siteName: "Alfonso Barreiro",
    locale: "en_US",
    type: "article",
  },
};

/* -------------------------------------------------
   Color tokens (matching globals.css / Work.tsx)
------------------------------------------------- */
const c = {
  ink:         "#252B28",
  body:        "#3D4440",
  muted:       "#8A8680",
  accent:      "#C17F4A",
  bg:          "#F5F5F4",
  bgSection:   "#EBEBEA",
  surface:     "#FFFFFF",
  border:      "#E8E4DE",
  borderStrong:"#C9BFB0",
  cognac:      "#C4703A",   // MSR brand accent
};

const font = {
  display: "var(--font-dm-serif-display), Georgia, serif",
  sans:    "var(--font-dm-sans), -apple-system, sans-serif",
};

export default function MSRCaseStudy() {
  return (
    <>
      <Nav />

      <main style={{ background: c.bg, paddingTop: "72px" }}>

        {/* -- Back link ---------------------------------- */}
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "24px clamp(24px, 5vw, 80px) 0" }}>
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
            background:  "#091016",
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

          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
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
              63% report foot pain. 12% see a doctor. No one built the resource between those two numbers.
            </h1>

            <p style={{
              fontFamily:  font.sans,
              fontSize:    "clamp(16px, 2.2vw, 20px)",
              lineHeight:  1.55,
              color:       "rgba(245,243,239,0.65)",
              margin:      "0 0 48px",
              maxWidth:    "560px",
            }}>
              Men&apos;s Sole Revival is a content-first foot health platform I designed and built from research through deployment. The original e-commerce model broke during margin analysis. The pivot toward content authority, using editorial credibility and e-commerce UX patterns, was the real design decision.
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
                { label: "Methods",  value: "Market Research \u00B7 Competitive Analysis \u00B7 Content UX \u00B7 AI-Assisted Development" },
                { label: "Outcome",  value: "Research-driven pivot from e-commerce to content authority \u00B7 shipped product" },
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
          </div>
        </header>

        {/* -- Links ---------------------------------------- */}
        <div style={{ background: c.bgSection, padding: "40px clamp(24px, 5vw, 80px) 0" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
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
                { label: "Live product", href: "https://www.menssolerevival.com/", external: true },
                { label: "Figma file",   href: "https://www.figma.com/design/ftIe1aelQLB7hOR4PUA9lR/Men-s-Sole-Revival", external: true },
                { label: "Slide deck",   href: "/work/presentations/mens-sole-revival", external: false },
              ].map(({ label, href, external }) => (
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
                    background:     c.surface,
                    border:         `1px solid ${c.borderStrong}`,
                    borderRadius:   "6px",
                    color:          c.ink,
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
              ))}
            </div>
          </div>
        </div>

        {/* -- Cover image --------------------------------- */}
        <div style={{ background: c.bgSection, padding: "48px clamp(24px, 5vw, 80px) 0" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <Image
              src="/images/work/msr/msr-cover.webp"
              alt="Men's Sole Revival homepage — dark editorial design with foot health content"
              width={1440}
              height={810}
              sizes="(max-width: 767px) 100vw, 860px"
              style={{ width: "100%", height: "auto", borderRadius: "4px" }}
              priority
            />
          </div>
        </div>

        {/* -- Content wrapper ----------------------------- */}
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

          {/* -- 01 Context -------------------------------- */}
          <Section label="01" title="Context">
            <p style={bodyText}>
              I kept Googling &ldquo;cracked heels men fix&rdquo; and landing on the same three articles written for women, repackaged with a stock photo of a guy. The clinical sources were accurate but impersonal. The product sites were selling, not teaching. Nothing spoke to men who actually wanted to understand what was happening to their feet and what to do about it without a referral.
            </p>
            <p style={bodyText}>
              63% of Americans report foot pain, but only 12% ever see a podiatrist. Men have a 3&times; higher fungal infection rate. The men&apos;s foot-care segment is growing at 10% CAGR. The audience exists. The resource doesn&apos;t.
            </p>
            <p style={bodyText}>
              Zoom out and the picture sharpens. 30% of people with foot pain do nothing about it, and only a third ever seek expert care. Toenail fungus affects 1 in 10 adults overall &mdash; but 1 in 2 over 70. The problem compounds as the audience ages. Meanwhile, men&apos;s grooming has become a $90.7B category projected to hit $153.6B by 2033, with 59% of men saying they&apos;re concerned about aging. The demand for men&apos;s wellness resources is growing. The supply for foot-specific guidance is not.
            </p>
            <Callout label="Design synthesis">
              Men need a foot health resource that&apos;s male-specific, clinically grounded, and product-informed. No existing site occupies that intersection.
            </Callout>
          </Section>

          {/* -- 02 Problem -------------------------------- */}
          <Section label="02" title="The Competitive Gap">
            <p style={bodyText}>
              Three categories of content exist for men&apos;s foot health. Each covers part of the problem. None covers all of it.
            </p>
            {/* Venn diagram — competitive gap */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "32px", marginBottom: "8px" }}>
              <svg
                viewBox="0 0 560 420"
                width="560"
                height="420"
                style={{ maxWidth: "100%", overflow: "visible" }}
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
                <text x="130" y="114" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="#C17F4A" style={{ textTransform: "uppercase" }}>CLINICAL</text>
                <text x="130" y="132" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="11" fill="#8A8680">WebMD, Mayo Clinic</text>
                <text x="130" y="147" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="11" fill="#8A8680">Cleveland Clinic</text>

                {/* Product-First */}
                <text x="430" y="114" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="#C17F4A" style={{ textTransform: "uppercase" }}>PRODUCT-FIRST</text>
                <text x="430" y="132" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="11" fill="#8A8680">Sneaker blogs, GQ</text>
                <text x="430" y="147" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="11" fill="#8A8680">Amazon listicles</text>

                {/* Wellness */}
                <text x="280" y="390" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="#C17F4A" style={{ textTransform: "uppercase" }}>WELLNESS</text>
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
                <text x="280" y="214" textAnchor="middle" fontFamily="var(--font-dm-serif-display), Georgia, serif" fontSize="20" fill="white" fontWeight="400" style={{ filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.18))" }}>Men&apos;s Sole</text>
                <text x="280" y="235" textAnchor="middle" fontFamily="var(--font-dm-serif-display), Georgia, serif" fontSize="20" fill="white" fontWeight="400" style={{ filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.18))" }}>Revival</text>
              </svg>
            </div>
            <p style={{ ...bodyText, marginTop: "24px" }}>
              Men&apos;s Sole Revival sits at the intersection: male-specific, clinically grounded, and product-informed. Not a compromise between the three categories. The resource that should exist where they overlap.
            </p>
          </Section>

          {/* -- 03 The Pivot ------------------------------ */}
          <Section label="03" title="The Pivot">
            <p style={bodyText}>
              The original plan was a premium men&apos;s foot care e-commerce site. Curated product kits: antifungal treatment, toe separators, insoles, foot cream. Headless Shopify, Next.js frontend, dark editorial brand.
            </p>
            <p style={bodyText}>
              The numbers kept breaking. Commodity products with thin margins, fulfillment costs, customer acquisition on a cold audience. Three weeks of modeling margins that wouldn&apos;t work was the signal: the friction wasn&apos;t execution. It was the starting point.
            </p>
            <p style={bodyText}>
              The market itself wasn&apos;t the problem. US men&apos;s foot care is projected to reach $4.7B by 2030; the global category spans $4&ndash;14B. Sub-segments are active too &mdash; orthotic insoles at $4.06B growing around 7% a year, barefoot shoes at $514M climbing at nearly 6%. The sizing supported the thesis. The unit economics didn&apos;t.
            </p>
            <p style={bodyText}>
              Then the market research showed the real problem. The gap I&apos;d found wasn&apos;t in the products. It was in the information layer that should precede them. Men over 40 who aren&apos;t already thinking about their feet are expensive to convert. They need a resource they trust before they&apos;ll buy anything. The e-commerce model puts the transaction before the relationship that makes the transaction possible.
            </p>

            {/* Before / After table */}
            <div style={{ marginTop: "8px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: c.bgSection }}>
                    {["Dimension", "Before", "After"].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
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
                      <td style={{ ...tdStyle, color: c.muted, textDecoration: "line-through", textDecorationColor: c.border }}>{before}</td>
                      <td style={{ ...tdStyle, color: c.ink }}>{after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Callout label="Key insight">
              The pivot wasn&apos;t away from e-commerce. It was toward content as the product, using e-commerce UX patterns to frame editorial decisions.
            </Callout>
          </Section>

          {/* -- 04 Design Decisions ----------------------- */}
          <Section label="04" title="Design Decisions">
            <p style={bodyText}>
              Two decisions defined the direction: the visual language and the review page layout. Each came from reasoning about the audience&apos;s emotional state and task intent, not aesthetic preference.
            </p>

            <h3 style={subheading}>Brand Direction: Dark Editorial</h3>
            <p style={bodyText}>
              Three visual directions were prototyped and evaluated against one question: does this aesthetic lower the stigma barrier before the first word is read?
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
              {/* Row 1: Rejected directions — half-width, paired */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                {[
                  { src: "/images/work/msr/msr-clinical.webp", label: "Clinical \u2014 Rejected" },
                  { src: "/images/work/msr/msr-salesy.webp",   label: "Salesy \u2014 Rejected" },
                ].map(({ src, label }) => (
                  <div key={label}>
                    <div style={{
                      position:     "relative",
                      aspectRatio:  "4/3",
                      overflow:     "hidden",
                      border:       `1px solid ${c.border}`,
                      opacity:      0.5,
                    }}>
                      <Image
                        src={src}
                        alt={label}
                        fill
                        sizes="(max-width: 767px) 100vw, 420px"
                        style={{ objectFit: "cover", objectPosition: "top" }}
                      />
                    </div>
                    <p style={{ fontFamily: font.sans, fontSize: "12px", color: c.muted, margin: "8px 0 0" }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Row 2: Wireframe — full-width, structure-first framing */}
              <div style={{ marginTop: "16px" }}>
                <div style={{
                  position:     "relative",
                  aspectRatio:  "16/9",
                  overflow:     "hidden",
                  border:       `1px solid ${c.border}`,
                  opacity:      0.5,
                }}>
                  <Image
                    src="/images/work/msr/msr-wireframe.webp"
                    alt="Wireframe \u2014 Structure Test"
                    fill
                    sizes="(max-width: 767px) 100vw, 860px"
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
                <p style={{ fontFamily: font.sans, fontSize: "12px", color: c.muted, margin: "8px 0 0" }}>
                  Wireframe \u2014 Structure Test
                </p>
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
                    alt="Dark Editorial \u2014 Chosen"
                    fill
                    sizes="(max-width: 767px) 100vw, 860px"
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
                <p style={{ fontFamily: font.sans, fontSize: "12px", color: c.ink, margin: "8px 0 0", fontWeight: 600 }}>
                  Dark Editorial \u2014 Chosen
                </p>
              </div>
            </div>

            <h3 style={subheading}>Review Pages: E-Commerce UX, Not Blog Format</h3>
            <p style={bodyText}>
              The user&apos;s task on a review page is evaluation, not reading. A blog format buries signal in narrative. The user has to read to evaluate. An e-commerce layout does the orienting work: hero image, specs grid, rating, pros/cons, buy links. Users already know how to scan this pattern from every product page they&apos;ve used.
            </p>
            <p style={bodyText}>
              This isn&apos;t a store. There&apos;s no checkout, no inventory. The UX pattern is borrowed from e-commerce because it matches the user&apos;s task, not because it serves a transaction.
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

          {/* -- 05 Design System -------------------------- */}
          <Section label="05" title="Design System">
            <p style={bodyText}>
              Three typefaces, each with a job. Barlow Condensed for display headlines. Authority and presence. Lora for editorial subheads and quotes. Readable, approachable. DM Sans for body copy and UI. Legibility at scale. The roles are explicit, not decorative.
            </p>
            <p style={bodyText}>
              The token architecture runs three tiers: CSS custom properties as the source of truth, TypeScript semantic aliases for brand-aware naming, and Tailwind utilities consumed in components. One file change propagates everywhere. The same naming convention holds across Brand, Wayfarer, and Men&apos;s Sole Revival. This wasn&apos;t retrofitted. It was a decision made before the first component was built.
            </p>

            {/* Token table */}
            <div style={{ marginTop: "8px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: c.bgSection }}>
                    {["Token", "Brand", "Wayfarer", "MSR"].map((h) => (
                      <th key={h} style={{ ...thStyle, color: h === "MSR" ? c.accent : c.muted, fontWeight: h === "MSR" ? 700 : 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { token: "brand-500",   brand: "#1C3F5E", wayfarer: "#2D5A3D", msr: "#1C3F5E" },
                    { token: "brand-900",   brand: "#091016", wayfarer: "#0A1A10", msr: "#091016" },
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
          </Section>

          {/* -- 06 Site Architecture ---------------------- */}
          <Section label="06" title="Site Architecture">
            <p style={bodyText}>
              Seven page types, each designed for a different user task. The information architecture is the product strategy made navigable. Every route maps to a specific intent.
            </p>

            {/* Route table */}
            <div style={{ marginTop: "8px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: c.bgSection }}>
                    {["Route", "Type", "User Task", "Purpose"].map((h) => (
                      <th key={h} style={{ ...thStyle, color: h === "User Task" ? c.accent : c.muted, fontWeight: h === "User Task" ? 700 : 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { route: "/",               type: "Homepage",        task: "Orient",   purpose: "Understand what this site is and whether it\u2019s for me." },
                    { route: "/learn/[slug]",    type: "Article",         task: "Learn",    purpose: "Go deeper on a foot health topic." },
                    { route: "/reviews/[slug]",  type: "Product Review",  task: "Evaluate", purpose: "Compare and decide on a product." },
                    { route: "/kits",            type: "Curated Kits",    task: "Browse",   purpose: "See grouped product recommendations." },
                    { route: "/learn",           type: "Educational Hub", task: "Explore",  purpose: "Find the right starting point." },
                    { route: "/about",           type: "Brand Story",     task: "Trust",    purpose: "Understand who built this and why." },
                    { route: "/assessment",      type: "Self-Check Tool", task: "Act",      purpose: "Get a personalized starting point." },
                  ].map(({ route, type, task, purpose }, i) => (
                    <tr key={route} style={{ background: i % 2 === 0 ? c.surface : c.bg }}>
                      <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: "13px", color: c.muted }}>{route}</td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: c.ink }}>{type}</td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: c.cognac }}>{task}</td>
                      <td style={tdStyle}>{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </Section>

        </div>{/* /content wrapper — break out for full-width walkthrough */}

        {/* -- Visual Walkthrough ---------------------------------- */}
        <div style={{
          background:   "#091016",
          borderTop:    "1px solid rgba(245,243,239,0.08)",
          borderBottom: "1px solid rgba(245,243,239,0.08)",
          padding:      "72px clamp(24px, 5vw, 80px)",
          marginTop:    "48px",
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

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
                  alt="Men's Sole Revival homepage — dark editorial design with topic grid and assessment CTA"
                  fill
                  sizes="(max-width: 767px) 100vw, 1100px"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>

              {/* Annotations */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "24px" }}>
                {[
                  { detail: "Dark ground, cognac accent, bold type", why: "Visual language borrowed from premium grooming and men\u2019s performance brands. Stigma reduction through familiarity." },
                  { detail: "Topic grid above article feed", why: "Wireframe testing showed users need category context before they\u2019ll engage individual articles." },
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
                  alt="Men's Sole Revival article page — long-form editorial with clear typography hierarchy"
                  fill
                  sizes="(max-width: 767px) 100vw, 1100px"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>

              {/* Annotations */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "24px" }}>
                {[
                  { detail: "Three-typeface hierarchy", why: "Barlow Condensed for display, Lora for editorial subheads, DM Sans for body. Each typeface has a defined role, not a decorative pairing." },
                  { detail: "Callout blocks and key takeaways", why: "Break up long-form content for scanners. A reader can get the core insight from callouts alone." },
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
                  alt="Men's Sole Revival product review — e-commerce UX patterns with specs grid, rating, and affiliate CTAs"
                  fill
                  sizes="(max-width: 767px) 100vw, 1100px"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>

              {/* Annotations */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "24px" }}>
                {[
                  { detail: "E-commerce layout, no checkout", why: "The UX pattern is borrowed because it matches the task. Users already know how to scan hero \u2192 specs \u2192 rating \u2192 CTA." },
                  { detail: "Affiliate CTAs, not product listings", why: "Revenue comes from referrals, not transactions. The trust model requires editorial independence from the products reviewed." },
                  { detail: "Pros/cons and verdict above the fold", why: "The evaluating user wants the answer first. Supporting detail is available but not required to make a decision." },
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
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

          {/* -- 07 Evaluation Plan ----------------------- */}
          <Section label="07" title="Evaluation Plan">
            <p style={bodyText}>
              No live metrics. No user testing budget. Self-initiated means defining what success looks like before the data exists. These aren&apos;t aspirational KPIs. They&apos;re the specific questions the design hypotheses need to answer.
            </p>

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
            <div style={{ marginTop: "24px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: c.bgSection }}>
                    {["Hypothesis", "Metric", "Threshold", "Rationale"].map((h) => (
                      <th key={h} style={{ ...thStyle, color: h === "Rationale" ? c.accent : c.muted, fontWeight: h === "Rationale" ? 700 : 600 }}>{h}</th>
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

          {/* -- 08 Reflection ---------------------------- */}
          <Section label="08" title="Reflection">
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

            <h3 style={subheading}>If I had more time</h3>
            <p style={bodyText}>
              Run moderated usability tests with 5&ndash;6 participants matching the target persona: men 25&ndash;55 who have Googled a foot health question in the last 6 months. Test the review page layout against a blog-format control. Measure task completion time, information findability, and whether the e-commerce pattern reduces cognitive load for evaluation tasks.
            </p>
            <p style={bodyText}>
              From there: A/B test the homepage topic categories to see which entry points drive the deepest engagement. Validate the email signup placement. And pressure-test the brand direction with the audience directly. Does the dark editorial tone actually lower the stigma barrier, or is that an assumption that deserves its own research cycle?
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
            maxWidth: "860px",
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

        {/* -- Next case study CTA ----------------------- */}
        <div
          style={{
            background:  c.bgSection,
            borderTop:   `1px solid ${c.border}`,
            padding:     "80px clamp(24px, 5vw, 80px)",
          }}
        >
          <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
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
  accent:    "#C17F4A",
  bg:        "#F5F5F4",
  bgSection: "#EBEBEA",
  surface:   "#FFFFFF",
  border:    "#E8E4DE",
  cognac:    "#C4703A",
};

const f = {
  display: "var(--font-dm-serif-display), Georgia, serif",
  sans:    "var(--font-dm-sans), -apple-system, sans-serif",
};

function Section({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <section
      style={{
        paddingTop:    "48px",
        paddingBottom: "16px",
        borderTop:     `1px solid ${c2.border}`,
        marginTop:     "48px",
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
  fontFamily:    "var(--font-dm-serif-display), Georgia, serif",
  fontSize:      "20px",
  fontWeight:    400,
  color:         "#252B28",
  margin:        "40px 0 16px",
  letterSpacing: "-0.02em",
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
  borderBottom:  "1px solid #E8E4DE",
};

const tdStyle: React.CSSProperties = {
  fontFamily:   "var(--font-dm-sans), -apple-system, sans-serif",
  fontSize:     "14px",
  color:        "#3D4440",
  padding:      "14px 16px",
  borderBottom: "1px solid #E8E4DE",
};
