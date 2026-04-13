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
              A Foot Health Resource Built for Men
            </h1>

            <p style={{
              fontFamily:  font.sans,
              fontSize:    "clamp(16px, 2.2vw, 20px)",
              lineHeight:  1.55,
              color:       "rgba(245,243,239,0.65)",
              margin:      "0 0 48px",
              maxWidth:    "560px",
            }}>
              Content-first design that treats foot health the way men&apos;s grooming brands treat skincare: with authority, not apology. Editorial credibility meets e-commerce UX patterns to serve a reader who&apos;s evaluating, not just browsing.
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
                { label: "Methods",  value: "Competitive Analysis \u00B7 Content UX \u00B7 Design System Architecture" },
                { label: "Stack",    value: "Next.js \u00B7 Tailwind v4 \u00B7 MDX \u00B7 Vercel" },
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

        {/* -- Cover image --------------------------------- */}
        <div style={{ background: c.bgSection, padding: "64px clamp(24px, 5vw, 80px) 0" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
              <Image
                src="/images/work/msr/msr-hero-cover.png"
                alt="Men's Sole Revival homepage — dark editorial design with foot health content"
                fill
                sizes="(max-width: 767px) 100vw, 860px"
                style={{ objectFit: "cover", objectPosition: "top" }}
                priority
              />
            </div>
          </div>
        </div>

        {/* -- Content wrapper ----------------------------- */}
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

          {/* -- 01 Context -------------------------------- */}
          <Section label="01" title="Context">
            <p style={bodyText}>
              I kept Googling the same thing &mdash; &ldquo;cracked heels men fix&rdquo; &mdash; and landing on the same three articles written for women, repackaged with a stock photo of a guy. The clinical sources were accurate but impersonal. The product sites were selling, not teaching. Nothing spoke to men who actually wanted to understand what was happening to their feet and what to do about it without a referral.
            </p>
            <p style={bodyText}>
              63% of Americans report foot pain, but only 12% ever see a podiatrist. Men have a 3&times; higher fungal infection rate. The men&apos;s foot-care segment is growing at 10% CAGR. The audience exists. The resource doesn&apos;t.
            </p>
            <Callout label="Design synthesis">
              Men need a foot health resource that&apos;s male-specific, clinically grounded, and product-informed &mdash; the intersection no existing site occupies.
            </Callout>
          </Section>

          {/* -- 02 Problem -------------------------------- */}
          <Section label="02" title="The Competitive Gap">
            <p style={bodyText}>
              Three categories of content exist for men&apos;s foot health. Each covers part of the problem. None covers all of it.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "4px" }}>
              {[
                {
                  label: "Clinical / Medical",
                  text:  "WebMD, Mayo Clinic, Cleveland Clinic. Clinically grounded, gender-neutral, no product guidance. Accurate but impersonal.",
                },
                {
                  label: "Wellness",
                  text:  "Healthline, Verywell Health. Broad audience, SEO-optimized, not male-specific. The foot content reads like it was written for everyone and therefore nobody.",
                },
                {
                  label: "Product-first",
                  text:  "Sneaker blogs, GQ roundups, Amazon listicles. Product-informed, male-targeted, no clinical rigor. They know their audience but they\u2019re selling, not teaching.",
                },
              ].map(({ label, text }) => (
                <div
                  key={label}
                  className="cs-problem-card"
                  style={{
                    display:    "flex",
                    gap:        "20px",
                    padding:    "20px 24px",
                    background: c.surface,
                    border:     `1px solid ${c.border}`,
                  }}
                >
                  <span className="cs-problem-label" style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: c.accent, minWidth: "160px", flexShrink: 0, paddingTop: "2px" }}>
                    {label}
                  </span>
                  <p style={{ fontFamily: font.sans, fontSize: "15px", lineHeight: 1.65, color: c.body, margin: 0 }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
            <p style={{ ...bodyText, marginTop: "24px" }}>
              Men&apos;s Sole Revival sits at the intersection: male-specific, clinically grounded, and product-informed. Not a compromise between the three categories &mdash; the resource that should exist where they overlap.
            </p>
          </Section>

          {/* -- 03 The Pivot ------------------------------ */}
          <Section label="03" title="The Pivot">
            <p style={bodyText}>
              The original plan was a premium men&apos;s foot care e-commerce site. Curated product kits &mdash; antifungal treatment, toe separators, insoles, foot cream. Headless Shopify, Next.js frontend, dark editorial brand.
            </p>
            <p style={bodyText}>
              The numbers kept breaking. Commodity products with thin margins, fulfillment costs, customer acquisition on a cold audience. Three weeks of modeling margins that wouldn&apos;t work was the signal: the friction wasn&apos;t execution. It was the starting point.
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
              The pivot wasn&apos;t away from e-commerce &mdash; it was toward content as the product, using e-commerce UX patterns to frame editorial decisions.
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
                    {name} &mdash; {status}
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
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
                {[
                  { src: "/images/work/msr/msr-clinical.png", label: "Clinical \u2014 Rejected", opacity: 0.5 },
                  { src: "/images/work/msr/msr-salesy.png",   label: "Salesy \u2014 Rejected",   opacity: 0.5 },
                  { src: "/images/work/msr/msr-hero-cover.png", label: "Dark Editorial \u2014 Chosen", opacity: 1 },
                ].map(({ src, label, opacity }) => (
                  <div key={label}>
                    <div style={{
                      position:     "relative",
                      aspectRatio:  "4/3",
                      overflow:     "hidden",
                      border:       opacity === 1 ? `2px solid ${c.cognac}` : `1px solid ${c.border}`,
                      opacity,
                    }}>
                      <Image
                        src={src}
                        alt={label}
                        fill
                        sizes="(max-width: 767px) 100vw, 280px"
                        style={{ objectFit: "cover", objectPosition: "top" }}
                      />
                    </div>
                    <p style={{ fontFamily: font.sans, fontSize: "12px", color: opacity === 1 ? c.ink : c.muted, margin: "8px 0 0", fontWeight: opacity === 1 ? 600 : 400 }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <h3 style={subheading}>Review Pages: E-Commerce UX, Not Blog Format</h3>
            <p style={bodyText}>
              The user&apos;s task on a review page is evaluation, not reading. A blog format buries signal in narrative &mdash; the user has to read to evaluate. An e-commerce layout does the orienting work: hero image, specs grid, rating, pros/cons, buy links. Users already know how to scan this pattern from every product page they&apos;ve used.
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
              Three typefaces, each with a job. Barlow Condensed for display headlines &mdash; authority and presence. Lora for editorial subheads and quotes &mdash; readable, approachable. DM Sans for body copy and UI &mdash; legibility at scale. The roles are explicit, not decorative.
            </p>
            <p style={bodyText}>
              The token architecture runs three tiers: CSS custom properties as the source of truth, TypeScript semantic aliases for brand-aware naming, and Tailwind utilities consumed in components. One file change propagates everywhere. The same naming convention holds across Brand, Wayfarer, and Men&apos;s Sole Revival &mdash; this wasn&apos;t retrofitted. It was a decision made before the first component was built.
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
              Seven page types, each designed for a different user task. The information architecture is the product strategy made navigable &mdash; every route maps to a specific intent.
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
                    { route: "/blog/[slug]",     type: "Article",         task: "Learn",    purpose: "Go deeper on a foot health topic." },
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

            {/* Screenshots */}
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
                Page Types in Context
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                {[
                  { src: "/images/work/msr/msr-homepage.png", label: "Orient + Browse", caption: "The homepage answers one question: is this site for me?" },
                  { src: "/images/work/msr/msr-article.png",  label: "Learn",           caption: "Long-form articles build authority. The layout is for reading, not scanning." },
                  { src: "/images/work/msr/msr-review.png",   label: "Evaluate + Decide", caption: "Product reviews use e-commerce UX patterns. The layout matches the task." },
                ].map(({ src, label, caption }) => (
                  <div key={label}>
                    <div style={{
                      position:    "relative",
                      aspectRatio: "4/3",
                      overflow:    "hidden",
                      border:      `1px solid ${c.border}`,
                    }}>
                      <Image
                        src={src}
                        alt={label}
                        fill
                        sizes="(max-width: 767px) 100vw, 280px"
                        style={{ objectFit: "cover", objectPosition: "top" }}
                      />
                    </div>
                    <div style={{ marginTop: "12px", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.cognac, marginTop: 6, flexShrink: 0 }} />
                      <div>
                        <p style={{ fontFamily: font.sans, fontSize: "13px", fontWeight: 600, color: c.ink, margin: "0 0 2px" }}>{label}</p>
                        <p style={{ fontFamily: font.sans, fontSize: "12px", lineHeight: 1.55, color: c.muted, margin: 0 }}>{caption}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* -- 07 Evaluation Plan ----------------------- */}
          <Section label="07" title="Evaluation Plan">
            <p style={bodyText}>
              This is a self-initiated project. There were no live metrics at launch. What I defined instead was a validation plan: specific measures tied to the strategic hypotheses, structured around the first 3, 6, and 12 months of content publishing.
            </p>

            <div style={{ marginTop: "8px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: c.bgSection }}>
                    {["What to Measure", "Metric", "Why It Matters"].map((h) => (
                      <th key={h} style={{ ...thStyle, color: h === "Why It Matters" ? c.accent : c.muted, fontWeight: h === "Why It Matters" ? 700 : 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { measure: "Organic search traffic",       metric: "Monthly visits at 3, 6, 12 months",             why: "Do men find this content when searching?" },
                    { measure: "Email list growth",            metric: "Signup rate from article pages",                 why: "A reader who signs up plans to come back." },
                    { measure: "Time on product reviews",      metric: "Average time on page",                           why: "If they\u2019re spending time, the e-commerce layout works." },
                    { measure: "Brand partnership inquiries",  metric: "Outreach to Vivobarefoot, Altra, Correct Toes", why: "Does the site read as a credible media property?" },
                    { measure: "Reddit engagement",            metric: "Shares in r/BarefootRunning, r/PlantarFasciitis", why: "Organic community uptake is the early trust signal." },
                  ].map(({ measure, metric, why }, i) => (
                    <tr key={measure} style={{ background: i % 2 === 0 ? c.surface : c.bg }}>
                      <td style={{ ...tdStyle, fontWeight: 600, color: c.ink }}>{measure}</td>
                      <td style={tdStyle}>{metric}</td>
                      <td style={{ ...tdStyle, color: c.body }}>{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ ...bodyText, marginTop: "16px", fontSize: "13px", color: c.muted }}>
              No live data yet. These thresholds were defined to test the core hypotheses: that the content reaches the audience, that the UX patterns match their tasks, and that the site earns credibility with brands.
            </p>
          </Section>

          {/* -- 08 Reflection ---------------------------- */}
          <Section label="08" title="Reflection">
            <p style={bodyText}>
              The first build spent three weeks fighting a stack that wasn&apos;t right for the problem. The friction was the signal and I waited too long to act on it. The pivot from e-commerce to content wasn&apos;t a retreat &mdash; it was the moment the project found its actual shape.
            </p>
            <p style={bodyText}>
              The absence of user validation is the biggest open question. The e-commerce layout for reviews is the call I&apos;d make again, but it hasn&apos;t been tested with the actual audience. The competitive analysis and UX reasoning are sound, but reasoning isn&apos;t evidence. The evaluation plan is how I&apos;ll find out if the reasoning holds.
            </p>
            <p style={bodyText}>
              Content authority takes time. The honest uncertainty: whether the SEO ramp will produce the audience before the motivation to sustain the project runs out. That&apos;s not a design problem. It&apos;s the real risk of building something this slowly, alone.
            </p>

            <h3 style={subheading}>What wasn&apos;t done</h3>
            <p style={bodyText}>
              I didn&apos;t conduct user interviews before building. I didn&apos;t run usability tests on the review page layout. The e-commerce UX pattern is based on competitive analysis and reasoning about mental models, not observed behavior with real users. Self-initiated, no research budget. The decisions are reasoned, not tested. The evaluation plan is how I&apos;ll find out if the reasoning holds.
            </p>

            <h3 style={subheading}>If I had more time</h3>
            <p style={bodyText}>
              Run moderated usability tests with 5&ndash;6 participants matching the target persona &mdash; men 25&ndash;55 who have Googled a foot health question in the last 6 months. Test the review page layout against a blog-format control. Measure task completion time, information findability, and whether the e-commerce pattern reduces cognitive load for evaluation tasks.
            </p>
            <p style={bodyText}>
              From there: A/B test the homepage topic categories to see which entry points drive the deepest engagement. Validate the email signup placement. And pressure-test the brand direction with the audience directly &mdash; does the dark editorial tone actually lower the stigma barrier, or is that an assumption that deserves its own research cycle?
            </p>
          </Section>

        </div>{/* /content wrapper */}

        {/* -- Case Study Slides (Figma embed) — hidden until embed is ready
        <div style={{
          background:   c.bgSection,
          borderTop:    `1px solid ${c.border}`,
          borderBottom: `1px solid ${c.border}`,
          padding:      "56px clamp(24px, 5vw, 80px)",
          marginTop:    "80px",
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <p style={{
              fontFamily:    font.sans,
              fontSize:      "11px",
              fontWeight:    600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color:         c.muted,
              margin:        "0 0 6px",
            }}>
              Case Study Slides
            </p>
            <p style={{
              fontFamily: font.sans,
              fontSize:   "14px",
              color:      c.body,
              margin:     "0 0 20px",
            }}>
              The full narrative deck, if you want to go deeper on any section.
            </p>
            <div className="cs-slides-outer" style={{
              position:      "relative",
              paddingBottom: "56.25%",
              height:        0,
              overflow:      "hidden",
              border:        `1px solid ${c.border}`,
              background:    "#091016",
              display:       "flex",
              alignItems:    "center",
              justifyContent: "center",
            }}>
              <div style={{
                position: "absolute",
                top:      "50%",
                left:     "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}>
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "14px",
                  color:      "rgba(245,243,239,0.4)",
                  margin:     0,
                }}>
                  Figma deck embed &mdash; coming soon
                </p>
              </div>
            </div>
            <p style={{
              fontFamily: font.sans,
              fontSize:   "12px",
              color:      c.muted,
              margin:     "10px 0 0",
            }}>
              Use arrow keys or click to advance. No Figma account required.
            </p>
          </div>
        </div>
        */}

        {/* -- Next case study CTA ----------------------- */}
        <div
          style={{
            background:  c.bgSection,
            borderTop:   `1px solid ${c.border}`,
            padding:     "80px clamp(24px, 5vw, 80px)",
            marginTop:   "80px",
          }}
        >
          <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: c.muted, margin: "0 0 8px" }}>
                Next Case Study
              </p>
              <p style={{ fontFamily: font.display, fontSize: "clamp(20px, 3vw, 28px)", color: c.ink, margin: 0 }}>
                Spotify &mdash; Recently Played Controls
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
