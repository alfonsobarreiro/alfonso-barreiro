import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SignupSlider from "./SignupSlider";

export const metadata: Metadata = {
  title: "Wayfarer \u2014 Travel Discovery Platform \u00B7 Alfonso Barreiro",
  description:
    "Case study: A concept travel discovery platform designed for DesignLab. AI tools expanded what was possible to build. The discipline was deciding what not to build.",
  openGraph: {
    title: "Wayfarer \u00B7 Alfonso Barreiro",
    description:
      "A UX case study on designing a discovery-first travel platform and knowing when to cut features the tools made easy to build.",
    url: "https://barreiro.com/work/wayfarer",
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
  navy:        "#3E3C78",   // Wayfarer brand accent (original brief)
};

const font = {
  display: "var(--font-dm-serif-display), Georgia, serif",
  sans:    "var(--font-dm-sans), -apple-system, sans-serif",
};

export default function WayfarerCaseStudy() {
  return (
    <>
      <Nav />

      <main className="cs-content-wrap" style={{ background: c.bg, paddingTop: "72px" }}>

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
            background:  "#1E1C3A",
            padding:     "clamp(64px, 10vw, 120px) clamp(24px, 5vw, 80px)",
            position:    "relative",
            overflow:    "hidden",
          }}
        >
          {/* Navy accent bar */}
          <div style={{
            position:   "absolute",
            top:        0,
            left:       0,
            right:      0,
            height:     "3px",
            background: c.navy,
          }} />

          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <span style={{ width: "24px", height: "1px", background: c.navy }} />
              <span style={{
                fontFamily:    font.sans,
                fontSize:      "11px",
                fontWeight:    600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color:         "#8B89B8",
              }}>
                Wayfarer &middot; UX Case Study
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
              The brief said discovery. The tools said build everything. The discipline was knowing the difference.
            </h1>

            <p style={{
              fontFamily:  font.sans,
              fontSize:    "clamp(16px, 2.2vw, 20px)",
              lineHeight:  1.55,
              color:       "rgba(245,243,239,0.65)",
              margin:      "0 0 48px",
              maxWidth:    "560px",
            }}>
              Wayfarer is a concept travel discovery platform I designed for DesignLab. AI-assisted development made it possible to build far beyond the brief. The real design work was deciding what to cut.
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
                { label: "Role",     value: "UX/UI Designer" },
                { label: "Type",     value: "DesignLab \u00B7 Concept" },
                { label: "Timeline", value: "4-week sprint" },
                { label: "Methods",  value: "Heuristic Evaluation \u00B7 Card Sorting \u00B7 Information Architecture \u00B7 Multi-Step Form UX \u00B7 AI-Assisted Development" },
                { label: "Outcome",  value: "Discovery-first platform with 40+ destinations, interactive globe, and validated multi-step onboarding" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B89B8", margin: "0 0 4px" }}>
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
                // Primary CTA — slide deck lives on the portfolio itself (internal nav)
                { label: "View slide deck",   href: "/work/presentations/wayfarer",        external: false, variant: "primary" },
                // Secondary — the live, deployed Wayfarer app
                { label: "Live site \u2197",   href: "https://wayfarer.barreiro.com/",      external: true,  variant: "ghost"   },
                // Figma file intentionally hidden for now — uncomment to expose later
                // { label: "Figma file",   href: "https://www.figma.com/design/glE8OOm7wbnBsEqD0L4YWz/Wayfarer-Travel", external: true, variant: "ghost" },
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
                    {!label.includes("\u2197") && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* -- Cover image --------------------------------- */}
        <div style={{ background: c.bgSection, padding: "48px clamp(24px, 5vw, 80px) 0" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
              <Image
                src="/images/work/wayfarer/wayfarer-cover.webp"
                alt="Wayfarer Travel homepage with interactive globe explorer and destination discovery"
                fill
                sizes="(max-width: 767px) 100vw, 860px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        </div>

        {/* -- Content wrapper ----------------------------- */}
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

          {/* -- 01 Context & Brief ------------------------ */}
          <Section label="01" title="Context &amp; Brief">
            <p style={bodyText}>
              DesignLab assigned me a travel discovery platform called Wayfarer. The brief was specific: redesign the homepage and fix the onboarding flow. Users found the existing multi-step signup confusing, repetitive, and inefficient. The layout was inconsistent across devices. The visual language didn&apos;t match the audience it was trying to reach.
            </p>
            <p style={bodyText}>
              The audience: adventurous travelers aged 21&ndash;30, digitally native, mobile-first, more interested in authentic cultural experiences than resort packages. They research before they commit. They browse before they plan. Wayfarer&apos;s job is to help them discover where to go next, not to book the flight.
            </p>
            <Callout label="Design constraint">
              Wayfarer is a discovery tool, not a booking platform. The brief said so explicitly. Everything I built had to survive that filter.
            </Callout>
            <p style={bodyText}>
              The original style guide specified Space Grotesk for headings, Inter for body copy, and a palette anchored in navy, lavender, and terra cotta. I treated these as constraints, not suggestions.
            </p>
          </Section>

          {/* -- 02 The Problem ----------------------------- */}
          <Section label="02" title="The Problem">
            <p style={bodyText}>
              Three problems sat inside the brief. Each pointed to a different kind of design work:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "4px" }}>
              {[
                {
                  label: "Onboarding friction",
                  text: "The multi-step signup form was the most cited pain point. Users dropped off mid-flow. Steps felt repetitive. There was no clear signal of progress or what the form was building toward. For a discovery platform, the signup flow is the first act of discovery. If it feels like paperwork, the product has already failed its promise.",
                },
                {
                  label: "Layout inconsistency",
                  text: "The existing design didn\u2019t hold together across screen sizes. Spacing shifted unpredictably. The hierarchy broke on mobile. Components that looked intentional on desktop felt accidental on smaller viewports. Inconsistency erodes trust, and trust is the currency of a platform asking users to plan a trip they haven\u2019t taken yet.",
                },
                {
                  label: "No visual storytelling",
                  text: "Travel is one of the most visually rich categories in design. The existing site underused it. The homepage didn\u2019t pull users into the experience. Destinations were listed, not revealed. The design treated travel content as data when it should have treated it as invitation.",
                },
              ].map(({ label, text }) => (
                <div
                  key={label}
                  className="cs-problem-card"
                  style={{
                    display:      "flex",
                    gap:          "20px",
                    padding:      "20px 24px",
                    background:   c.surface,
                    border:       `1px solid ${c.border}`,
                  }}
                >
                  <span className="cs-problem-label" style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: c.navy, minWidth: "160px", flexShrink: 0, paddingTop: "2px" }}>
                    {label}
                  </span>
                  <p style={{ fontFamily: font.sans, fontSize: "15px", lineHeight: 1.65, color: c.body, margin: 0 }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* -- 03 What Not to Build ----------------------- */}
          <Section label="03" title="What Not to Build">
            <p style={bodyText}>
              Four weeks into building with AI-assisted development, I had a working booking interface. Hotels, cars, full detail pages with pricing and availability mockups. The tools made it possible to go from concept to functional UI in hours instead of days. For the first time, I could build things I&apos;d previously only been able to mock up in Figma.
            </p>
            <p style={bodyText}>
              The problem: the brief said discovery, not booking.
            </p>
            <p style={bodyText}>
              Booking UI pulled attention away from the core experience. It introduced a transactional mental model into a platform designed for exploration. A user browsing destinations in Kyoto doesn&apos;t need hotel pricing competing for their attention. They need the content that makes them want to go in the first place.
            </p>
            <p style={bodyText}>
              I scaled it back. Removed hotel and car booking from destination pages. Kept the discovery flow, the globe explorer, the trip planner, and the multi-step signup as the center of gravity. The booking UI was good work. It just wasn&apos;t right work.
            </p>

            <Callout label="Key insight">
              AI tools expand what&apos;s possible to build. They don&apos;t expand what should be built. When the tools make everything buildable, the design discipline shifts from &ldquo;can we?&rdquo; to &ldquo;should we?&rdquo;
            </Callout>

            {/* What was cut vs what survived */}
            <div className="cs-table-scroll" style={{ marginTop: "8px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: c.bgSection }}>
                    {["Status", "Feature", "Rationale"].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { status: "Cut",      feature: "Hotel search and booking",      rationale: "Transactional UI on a discovery platform. Competes for attention with content that drives curiosity." },
                    { status: "Cut",      feature: "Car rental browsing",           rationale: "Same problem. Adds logistics where the user is still in exploration mode." },
                    { status: "Cut",      feature: "Price-based filtering",          rationale: "Price anchors the user in booking behavior. Discovery should be destination-led, not cost-led." },
                    { status: "Cut",      feature: "Booking confirmation flow",      rationale: "Entire transactional path removed. Wayfarer connects users to content, not transactions." },
                    { status: "Kept",     feature: "Globe explorer",                 rationale: "Primary discovery interface. Curiosity-driven. Matches the brief." },
                    { status: "Kept",     feature: "Destination detail pages",        rationale: "Content, gallery, travel tips, map. Everything that makes a user want to go." },
                    { status: "Kept",     feature: "Multi-step signup",              rationale: "Preference collection that personalizes discovery. The form serves the product." },
                    { status: "Kept",     feature: "Trip planner",                   rationale: "Turns discovery into intention. The bridge between browsing and planning." },
                  ].map(({ status, feature, rationale }, i) => (
                    <tr key={feature} style={{ background: i % 2 === 0 ? c.surface : c.bg }}>
                      <td style={{ ...tdStyle, fontWeight: 600, color: status === "Cut" ? c.muted : c.navy, textDecoration: status === "Cut" ? "line-through" : "none", textDecorationColor: c.border }}>
                        {status}
                      </td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: status === "Cut" ? c.muted : c.ink, textDecoration: status === "Cut" ? "line-through" : "none", textDecorationColor: c.border }}>
                        {feature}
                      </td>
                      <td style={{ ...tdStyle, color: status === "Cut" ? c.muted : c.body }}>
                        {rationale}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* -- 04 Design Decisions ----------------------- */}
          <Section label="04" title="Design Decisions">
            <p style={bodyText}>
              Two systems shaped the experience: the information architecture that organizes 40+ destinations into a discoverable structure, and the multi-step signup that turns preference collection into a first act of exploration.
            </p>

            {/* Design decisions grid */}
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
                  { area: "Discovery",    decision: "Globe as primary entry point",         rationale: "Curiosity-driven exploration before search. Two paths (globe + grid) match different levels of intent." },
                  { area: "Onboarding",   decision: "5-step form as discovery sequence",    rationale: "Each step narrows personalization without feeling like paperwork. The form mirrors the product's exploration model." },
                  { area: "Architecture", decision: "Every page maps to a user task",       rationale: "Orient, Browse, Explore, Evaluate, Plan, Personalize. The IA supports a natural progression without forcing it." },
                  { area: "Scope",        decision: "Cut booking, keep discovery",           rationale: "The hardest call. Working features removed because they contradicted the brief's core premise." },
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

            <h3 style={subheading}>Information Architecture: 40+ Destinations, One Discovery Path</h3>
            <p style={bodyText}>
              The IA question was: how does a curious traveler find a destination they didn&apos;t know they wanted? Browse-first, not search-first. The globe is the primary entry point. Clicking a region flies the camera to that continent. Pins mark destinations. Hovering reveals a preview. Clicking opens the full detail page.
            </p>
            <p style={bodyText}>
              The fallback path is the destinations grid with continent filters. Users who know what region they want can filter directly. Users who don&apos;t can explore the globe. Two entry points, same content, matched to different levels of intent.
            </p>
            <p style={bodyText}>
              Each destination detail page follows a consistent structure: hero image with metadata, info grid (best time to visit, language, currency, temperature, timezone), long description, photo gallery, travel tips, highlights, related destinations, and a location map. The structure is rigid by design. When the content varies, the container shouldn&apos;t.
            </p>

            <h3 style={subheading}>Multi-Step Signup: Progressive Disclosure as Discovery</h3>
            <p style={bodyText}>
              The original form was the brief&apos;s most cited pain point. My redesign broke it into five steps, each collecting a different type of preference:
            </p>

            {/* Signup steps */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "4px" }}>
              {[
                { step: "01", name: "Account",      detail: "Name and email. Low commitment. No password yet." },
                { step: "02", name: "Travel Style",  detail: "Solo, couple, family, or group. Budget range. Group size. Context for personalization." },
                { step: "03", name: "Interests",     detail: "Eight categories: beaches, mountains, city culture, food, history, wildlife, adventure sports, wellness. Maps aspiration." },
                { step: "04", name: "Destinations",   detail: "Select from featured options. Anchors the user's sense of where they want to go." },
                { step: "05", name: "Review",         detail: "Full summary with edit-back capability. The user sees what they've built and confirms." },
              ].map(({ step, name, detail }) => (
                <div key={step} style={{ display: "flex", gap: "16px", padding: "16px 20px", background: c.surface, border: `1px solid ${c.border}` }}>
                  <span style={{
                    fontFamily:    font.sans,
                    fontSize:      "11px",
                    fontWeight:    700,
                    letterSpacing: "0.14em",
                    color:         c.navy,
                    paddingTop:    "2px",
                    minWidth:      "28px",
                  }}>
                    {step}
                  </span>
                  <div>
                    <p style={{ fontFamily: font.sans, fontSize: "14px", fontWeight: 600, color: c.ink, margin: "0 0 4px" }}>{name}</p>
                    <p style={{ fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65, color: c.body, margin: 0 }}>{detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ ...bodyText, marginTop: "20px" }}>
              The design logic: the signup flow is the first interaction a new user has with Wayfarer. If it mirrors the discovery experience (explore, choose, refine, confirm), the form becomes part of the product, not a gate in front of it.
            </p>
          </Section>

          {/* -- 05 Design System -------------------------- */}
          <Section label="05" title="Design System">
            <p style={bodyText}>
              The original DesignLab style guide defined the palette, typography, logo rules, and image direction. I treated every spec as a constraint, not a suggestion. Two typefaces, each with a defined role. Space Grotesk for headings: commanding without being aggressive. Inter for body: clean and legible at every size. No decorative pairing. The roles are structural.
            </p>

            {/* Style guide specs — 2x2 grid */}
            <div className="cs-design-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "24px" }}>

              {/* Typography */}
              <div style={{ padding: "24px", background: c.surface, border: `1px solid ${c.border}` }}>
                <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: c.navy, margin: "0 0 16px" }}>
                  Typography
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div>
                    <p style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: c.muted, margin: "0 0 4px" }}>Headings (H1-H4)</p>
                    <p style={{ fontFamily: font.sans, fontSize: "14px", color: c.ink, margin: 0 }}>Space Grotesk Bold</p>
                    <p style={{ fontFamily: font.sans, fontSize: "12px", color: c.muted, margin: "2px 0 0" }}>60, 48, 32, 24px</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: c.muted, margin: "0 0 4px" }}>Body</p>
                    <p style={{ fontFamily: font.sans, fontSize: "14px", color: c.ink, margin: 0 }}>Inter Regular</p>
                    <p style={{ fontFamily: font.sans, fontSize: "12px", color: c.muted, margin: "2px 0 0" }}>20, 18, 16px</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: c.muted, margin: "0 0 4px" }}>Usage</p>
                    <p style={{ fontFamily: font.sans, fontSize: "12px", color: c.muted, margin: 0 }}>Bold for section headings, Regular for body copy</p>
                  </div>
                </div>
              </div>

              {/* Color palette — Primary + Secondary */}
              <div style={{ padding: "24px", background: c.surface, border: `1px solid ${c.border}` }}>
                <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: c.navy, margin: "0 0 16px" }}>
                  Palette
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <p style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: c.muted, margin: "0 0 2px" }}>Primary</p>
                  {[
                    { name: "Navy",        hex: "#3E3C78" },
                    { name: "Lavender",    hex: "#C5C7E3" },
                    { name: "Deep Indigo", hex: "#2C2B5A" },
                  ].map(({ name, hex }) => (
                    <div key={name} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ width: 16, height: 16, background: hex, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 2, flexShrink: 0 }} />
                      <span style={{ fontFamily: font.sans, fontSize: "13px", color: c.ink, flex: 1 }}>{name}</span>
                      <span style={{ fontFamily: "monospace", fontSize: "12px", color: c.muted }}>{hex}</span>
                    </div>
                  ))}
                  <p style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: c.muted, margin: "10px 0 2px" }}>Secondary</p>
                  {[
                    { name: "Terra Cotta", hex: "#D27A5E" },
                    { name: "Sage Green",  hex: "#A3C9A8" },
                  ].map(({ name, hex }) => (
                    <div key={name} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ width: 16, height: 16, background: hex, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 2, flexShrink: 0 }} />
                      <span style={{ fontFamily: font.sans, fontSize: "13px", color: c.ink, flex: 1 }}>{name}</span>
                      <span style={{ fontFamily: "monospace", fontSize: "12px", color: c.muted }}>{hex}</span>
                    </div>
                  ))}
                  <p style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: c.muted, margin: "10px 0 2px" }}>Neutrals</p>
                  {[
                    { name: "Dark Charcoal", hex: "#2E2E30" },
                    { name: "Light Gray",    hex: "#D8D9E0" },
                    { name: "Off-White",     hex: "#F8F9FB" },
                  ].map(({ name, hex }) => (
                    <div key={name} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ width: 16, height: 16, background: hex, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 2, flexShrink: 0 }} />
                      <span style={{ fontFamily: font.sans, fontSize: "13px", color: c.ink, flex: 1 }}>{name}</span>
                      <span style={{ fontFamily: "monospace", fontSize: "12px", color: c.muted }}>{hex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logo usage */}
              <div style={{ padding: "24px", background: c.surface, border: `1px solid ${c.border}` }}>
                <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: c.navy, margin: "0 0 16px" }}>
                  Logo Usage
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { rule: "Clearspace", spec: "Equal to the uppercase \u201CW\u201D height on all sides" },
                    { rule: "Minimum size", spec: "40px (mobile), 60px (desktop)" },
                    { rule: "Background", spec: "White logo on colored or dark backgrounds; dark logo on light backgrounds only" },
                    { rule: "Positioning", spec: "Top-left corner across all viewports" },
                  ].map(({ rule, spec }) => (
                    <div key={rule}>
                      <p style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: c.muted, margin: "0 0 4px" }}>{rule}</p>
                      <p style={{ fontFamily: font.sans, fontSize: "13px", color: c.ink, margin: 0, lineHeight: 1.5 }}>{spec}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image style */}
              <div style={{ padding: "24px", background: c.surface, border: `1px solid ${c.border}` }}>
                <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: c.navy, margin: "0 0 16px" }}>
                  Image Style
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { rule: "Hero imagery", spec: "Full-bleed with relaxed focal crop" },
                    { rule: "Destination cards", spec: "Consistent rounded corners across all card types" },
                    { rule: "Icons", spec: "Secondary icons in terra cotta (#D27A5E) to maintain visual consistency" },
                  ].map(({ rule, spec }) => (
                    <div key={rule}>
                      <p style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: c.muted, margin: "0 0 4px" }}>{rule}</p>
                      <p style={{ fontFamily: font.sans, fontSize: "13px", color: c.ink, margin: 0, lineHeight: 1.5 }}>{spec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p style={{ ...bodyText, marginTop: "24px" }}>
              The token architecture follows the same three-tier pattern as Men&apos;s Sole Revival and the portfolio site: CSS custom properties as the source of truth, TypeScript semantic aliases for component consumption, and Tailwind utilities for development. Same naming convention across all three projects. One vocabulary, different values per property.
            </p>

            {/* Token table */}
            <div className="cs-table-scroll" style={{ marginTop: "8px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: c.bgSection }}>
                    {["Token", "Wayfarer", "Brand", "MSR"].map((h) => (
                      <th key={h} style={{ ...thStyle, color: h === "Wayfarer" ? c.navy : c.muted, fontWeight: h === "Wayfarer" ? 700 : 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { token: "brand-500",   wayfarer: "#3E3C78", brand: "#1C3F5E", msr: "#1C3F5E" },
                    { token: "brand-900",   wayfarer: "#2C2B5A", brand: "#091016", msr: "#091016" },
                    { token: "accent-500",  wayfarer: "#D27A5E", brand: "#C4703A", msr: "#C4703A" },
                    { token: "neutral-50",  wayfarer: "#F8F9FB", brand: "#F8F7F7", msr: "#F8F7F7" },
                    { token: "neutral-500", wayfarer: "#6B6560", brand: "#6B6560", msr: "#6B6560" },
                  ].map(({ token, wayfarer, brand, msr }, i) => (
                    <tr key={token} style={{ background: i % 2 === 0 ? c.surface : c.bg }}>
                      <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: "13px", color: c.muted }}>{token}</td>
                      <td style={tdStyle}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ width: 14, height: 14, background: wayfarer, border: "1px solid rgba(0,0,0,0.08)", display: "inline-block", borderRadius: 2 }} />
                          <span style={{ fontFamily: "monospace", fontSize: "13px", color: c.ink, fontWeight: 600 }}>{wayfarer}</span>
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ width: 14, height: 14, background: brand, border: "1px solid rgba(0,0,0,0.08)", display: "inline-block", borderRadius: 2 }} />
                          <span style={{ fontFamily: "monospace", fontSize: "13px", color: c.muted }}>{brand}</span>
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ width: 14, height: 14, background: msr, border: "1px solid rgba(0,0,0,0.08)", display: "inline-block", borderRadius: 2 }} />
                          <span style={{ fontFamily: "monospace", fontSize: "13px", color: c.muted }}>{msr}</span>
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
              Six page types, each designed for a different user task. The information architecture supports a natural progression from orientation to planning without forcing a linear path.
            </p>

            {/* Route table */}
            <div className="cs-table-scroll" style={{ marginTop: "8px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: c.bgSection }}>
                    {["Route", "Type", "User Task", "Purpose"].map((h) => (
                      <th key={h} style={{ ...thStyle, color: h === "User Task" ? c.navy : c.muted, fontWeight: h === "User Task" ? 700 : 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { route: "/",                  type: "Homepage",       task: "Orient",       purpose: "Understand what Wayfarer is and whether to explore further." },
                    { route: "/destinations",      type: "Explorer",       task: "Browse",       purpose: "Filter and scan destinations by continent." },
                    { route: "/discover",          type: "Globe",          task: "Explore",      purpose: "Discover destinations through the interactive 3D map." },
                    { route: "/destinations/[slug]",type: "Detail",        task: "Evaluate",     purpose: "Go deeper on a single destination." },
                    { route: "/planner",           type: "Trip Planner",   task: "Plan",         purpose: "Build a day-by-day itinerary with drag-to-reorder." },
                    { route: "Modal",              type: "Sign-up Form",   task: "Personalize",  purpose: "Create an account with preference data for tailored discovery." },
                  ].map(({ route, type, task, purpose }, i) => (
                    <tr key={route} style={{ background: i % 2 === 0 ? c.surface : c.bg }}>
                      <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: "13px", color: c.muted }}>{route}</td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: c.ink }}>{type}</td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: c.navy }}>{task}</td>
                      <td style={tdStyle}>{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

        </div>{/* /content wrapper -- break out for full-width walkthrough */}

        {/* -- Visual Walkthrough ---------------------------------- */}
        <div style={{
          background:   "#1E1C3A",
          borderTop:    "1px solid rgba(245,243,239,0.08)",
          borderBottom: "1px solid rgba(245,243,239,0.08)",
          padding:      "72px clamp(24px, 5vw, 80px)",
          marginTop:    "48px",
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

            {/* Header */}
            <div style={{ marginBottom: "48px", maxWidth: "560px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <span style={{ width: "20px", height: "1px", background: c.navy }} />
                <span style={{
                  fontFamily:    font.sans,
                  fontSize:      "11px",
                  fontWeight:    600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color:         "#8B89B8",
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
                Discovery by design, not by default
              </h2>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "15px",
                lineHeight: 1.65,
                color:      "rgba(245,243,239,0.5)",
                margin:     0,
              }}>
                Three features carry the case study: the globe explorer that makes discovery spatial, the destinations grid that offers a filter-first parallel path, and the multi-step signup that turns preference collection into the first act of exploration.
              </p>
            </div>

            {/* -- Globe Explorer --------------------------------- */}
            <div style={{ marginBottom: "64px" }}>
              <h3 style={{
                fontFamily:    font.sans,
                fontSize:      "13px",
                fontWeight:    700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         "#8B89B8",
                margin:        "0 0 12px",
              }}>Globe Explorer</h3>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "14px",
                lineHeight: 1.65,
                color:      "rgba(245,243,239,0.5)",
                margin:     "0 0 24px",
                maxWidth:   "560px",
              }}>
                A 3D Mapbox globe as the primary discovery interface. Click a region, fly to the continent, tap a pin, preview the destination. The globe makes geography tangible. Users explore space, not lists.
              </p>
              <div className="cs-grid-collapse" style={{
                display:             "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap:                 "clamp(16px, 3vw, 32px)",
                alignItems:          "start",
              }}>
                {[
                  {
                    src:     "/images/work/wayfarer/wayfarer-globe-overview.webp",
                    alt:     "Wayfarer globe explorer showing 3D Earth with destination pins across continents",
                    label:   "01",
                    caption: "The globe loads with destination pins visible across continents. The user's first instinct is to rotate and explore.",
                  },
                  {
                    src:     "/images/work/wayfarer/wayfarer-globe-flyto.webp",
                    alt:     "Globe flying to Asia region with destination pins enlarging on approach",
                    label:   "02",
                    caption: "Clicking a region triggers a fly-to animation. Pins enlarge as the camera approaches. Hover reveals destination name and tagline.",
                  },
                  {
                    src:     "/images/work/wayfarer/wayfarer-destination-detail.webp",
                    alt:     "Destination detail page for a selected location showing hero image, info grid, and travel tips",
                    label:   "03",
                    caption: "The detail page follows a rigid structure: hero, info grid, description, gallery, tips, highlights, related destinations, map.",
                  },
                ].map(({ src, alt, label, caption }) => (
                  <div key={`globe-${label}`}>
                    <div style={{
                      position:     "relative",
                      aspectRatio:  "16 / 10",
                      overflow:     "hidden",
                      background:   "rgba(245,243,239,0.04)",
                      border:       "1px solid rgba(245,243,239,0.1)",
                      borderRadius: "8px",
                    }}>
                      <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes="(max-width: 767px) 100vw, 33vw"
                        style={{ objectFit: "cover", objectPosition: "top" }}
                      />
                    </div>
                    <div style={{ marginTop: "16px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <span style={{
                        fontFamily:    font.sans,
                        fontSize:      "10px",
                        fontWeight:    700,
                        letterSpacing: "0.14em",
                        color:         "#8B89B8",
                        paddingTop:    "2px",
                        flexShrink:    0,
                      }}>{label}</span>
                      <p style={{
                        fontFamily: font.sans,
                        fontSize:   "13px",
                        lineHeight: 1.65,
                        color:      "rgba(245,243,239,0.5)",
                        margin:     0,
                      }}>{caption}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Globe annotations */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "24px" }}>
                {[
                  { detail: "Mapbox GL with 3D projection and atmosphere", why: "The globe feels physical. Fog and lighting effects create depth that a flat map can't." },
                  { detail: "Custom markers with hover state and keyboard access", why: "Terra cotta pins with white borders — per brief, the accent color marks interactive elements. Hover triggers a popup with name and tagline. Enter/Space to select. Accessible by design." },
                  { detail: "Fly-to animation on region click", why: "Smooth camera transition. The movement communicates geography. Users build spatial memory of where destinations sit." },
                ].map(({ detail, why }) => (
                  <div key={detail} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{
                      width: "4px", height: "4px", borderRadius: "50%",
                      background: "#8B89B8", flexShrink: 0, marginTop: "7px",
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

            {/* -- Parallel Entry: Destinations Grid --------------- */}
            <div style={{ marginBottom: "64px" }}>
              <h3 style={{
                fontFamily:    font.sans,
                fontSize:      "13px",
                fontWeight:    700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         "#8B89B8",
                margin:        "0 0 12px",
              }}>Parallel Entry · Destinations Grid</h3>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "14px",
                lineHeight: 1.65,
                color:      "rgba(245,243,239,0.5)",
                margin:     "0 0 24px",
                maxWidth:   "560px",
              }}>
                The globe is the novel entry point, but not the only one. The destinations grid is the fallback path for users who already know what region they want. Same content, different interaction — filter by continent, scan visually, click to go deeper. Two entry points matched to different levels of intent.
              </p>
              <div style={{
                position:     "relative",
                aspectRatio:  "16 / 10",
                overflow:     "hidden",
                background:   "rgba(245,243,239,0.04)",
                border:       "1px solid rgba(245,243,239,0.1)",
                borderRadius: "8px",
              }}>
                <Image
                  src="/images/work/wayfarer/wayfarer-destinations-grid.webp"
                  alt="Destinations grid page with continent filter pills at top and a grid of destination cards below"
                  fill
                  sizes="(max-width: 767px) 100vw, 66vw"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>

              {/* Grid annotations */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "24px" }}>
                {[
                  { detail: "Continent filter pills", why: "Seven regions (All, Africa, Asia, Europe, North America, South America, Oceania). Filter state is preserved as the user scrolls. No page reloads." },
                  { detail: "Count badges on every filter", why: "Users see how many destinations live under each region before committing to a filter. Less blind clicking, more informed scanning." },
                  { detail: "Shared destination card component", why: "The same card that appears in the globe's hover state appears here — consistent visual language across both entry points." },
                ].map(({ detail, why }) => (
                  <div key={detail} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{
                      width: "4px", height: "4px", borderRadius: "50%",
                      background: "#8B89B8", flexShrink: 0, marginTop: "7px",
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

            {/* -- Multi-Step Signup ------------------------------- */}
            <div>
              <h3 style={{
                fontFamily:    font.sans,
                fontSize:      "13px",
                fontWeight:    700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         "#8B89B8",
                margin:        "0 0 12px",
              }}>Multi-Step Signup</h3>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "14px",
                lineHeight: 1.65,
                color:      "rgba(245,243,239,0.5)",
                margin:     "0 0 24px",
                maxWidth:   "560px",
              }}>
                Five steps that transform a form into a first act of discovery. Each step collects a different type of preference. The review screen at the end lets users see what they&apos;ve built before committing.
              </p>
              <SignupSlider
                steps={[
                  { src: "/images/work/wayfarer/wayfarer-signup-01.webp",
                    alt: "Signup step 1: Account creation with name and email fields",
                    label: "01", title: "Account",
                    caption: "Name and email. Low commitment entry." },
                  { src: "/images/work/wayfarer/wayfarer-signup-02.webp",
                    alt: "Signup step 2: Travel style, budget, and group size selection",
                    label: "02", title: "Travel Style",
                    caption: "Solo, couple, family, or group. Context for personalization." },
                  { src: "/images/work/wayfarer/wayfarer-signup-03.webp",
                    alt: "Signup step 3: Eight interest categories, multi-select",
                    label: "03", title: "Interests",
                    caption: "Eight categories. Maps aspiration to themes." },
                  { src: "/images/work/wayfarer/wayfarer-signup-04.webp",
                    alt: "Signup step 4: Dream destinations pick-list",
                    label: "04", title: "Destinations",
                    caption: "Select from featured options. Anchors the user\u2019s sense of where they want to go." },
                  { src: "/images/work/wayfarer/wayfarer-signup-05.webp",
                    alt: "Signup step 5: Review screen showing all selections with edit buttons",
                    label: "05", title: "Review",
                    caption: "Full summary with edit-back. The user sees what they\u2019ve built before they commit." },
                  { src: "/images/work/wayfarer/wayfarer-signup-06.webp",
                    alt: "Signup success: Welcome to Wayfarer confirmation with green checkmark",
                    label: "06", title: "Success",
                    caption: "The form ends with a reward, not a receipt." },
                ]}
              />

              {/* Signup annotations */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "24px" }}>
                {[
                  { detail: "Zod schema validation per step", why: "Errors surface before the user moves forward. No surprise failures at the end of a 5-step flow." },
                  { detail: "Animated background image per step", why: "Each step has a travel image that shifts with the content. The form feels like a place, not a spreadsheet." },
                  { detail: "Review screen with edit-back buttons", why: "Users can jump to any previous step and return. The review screen is the safety net that makes 5 steps feel manageable." },
                ].map(({ detail, why }) => (
                  <div key={detail} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{
                      width: "4px", height: "4px", borderRadius: "50%",
                      background: "#8B89B8", flexShrink: 0, marginTop: "7px",
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
              Concept project. No live traffic. No user testing budget. These are the specific questions the design hypotheses need to answer, and the thresholds that would tell me whether the answers are right.
            </p>

            {/* Test protocol */}
            <div style={{
              margin:     "24px 0",
              padding:    "20px 24px",
              background: c.bgSection,
              border:     `1px solid ${c.border}`,
            }}>
              <p style={{
                fontFamily:    font.sans,
                fontSize:      "11px",
                fontWeight:    600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         c.muted,
                margin:        "0 0 12px",
              }}>Test Protocol</p>
              <p style={{ fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65, color: c.body, margin: 0 }}>
                Moderated usability test. 5&ndash;6 participants matching the target persona (adventurous travelers 21&ndash;30, travel research behavior in the last 6 months). Three task scenarios: discover a destination using the globe, complete the signup flow, and build a 3-day itinerary. Think-aloud protocol. 40 minutes per session.
              </p>
            </div>

            {/* Threshold table */}
            <div className="cs-table-scroll" style={{ marginTop: "24px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: c.bgSection }}>
                    {["Hypothesis", "Metric", "Threshold", "Rationale"].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { hypothesis: "Globe drives discovery",       metric: "Time to first destination click",  threshold: "< 30s",     rationale: "If the globe is doing its job, curiosity should outpace confusion" },
                    { hypothesis: "Signup feels like discovery",  metric: "Completion rate",                  threshold: "> 80%",     rationale: "5 steps is a lot. If the framing works, users finish because they want their results" },
                    { hypothesis: "Steps feel purposeful",        metric: "Per-step drop-off",                threshold: "< 10%",     rationale: "Even drop-off signals each step earns its place. A spike at step 3 means interests feel like work" },
                    { hypothesis: "Detail pages answer the question", metric: "Time on detail page",          threshold: "> 90s",     rationale: "Users reading tips and checking the gallery are engaged. Under 60s means the content isn't pulling" },
                    { hypothesis: "Trip planner is intuitive",    metric: "Build 3-day trip task time",       threshold: "< 4 min",   rationale: "Drag-to-reorder should be discoverable. If users struggle, the affordance failed" },
                  ].map(({ hypothesis, metric, threshold, rationale }, i) => (
                    <tr key={hypothesis} style={{ background: i % 2 === 0 ? c.surface : c.bg }}>
                      <td style={{ ...tdStyle, fontWeight: 600, color: c.ink }}>{hypothesis}</td>
                      <td style={tdStyle}>{metric}</td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: c.navy }}>{threshold}</td>
                      <td style={{ ...tdStyle, fontSize: "12px", color: c.muted }}>{rationale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Qualitative signals */}
            <div style={{
              margin:     "24px 0 0",
              padding:    "20px 24px",
              background: c.surface,
              border:     `1px solid ${c.border}`,
            }}>
              <p style={{
                fontFamily:    font.sans,
                fontSize:      "11px",
                fontWeight:    600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         c.muted,
                margin:        "0 0 12px",
              }}>Qualitative Signals to Watch</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {[
                  "Do participants use the globe or go straight to the grid? The answer reveals whether the globe is novel or just friction.",
                  "On the signup flow, do users read the interest categories or just tap quickly? Reading means the categories feel meaningful.",
                  "After completing the signup, do participants expect personalized results? If yes, the form set the right expectation.",
                  "In the trip planner, do users discover drag-to-reorder without prompting, or do they look for arrows or edit buttons?",
                ].map((signal) => (
                  <p key={signal} style={{ fontFamily: font.sans, fontSize: "13px", lineHeight: 1.6, color: c.body, margin: 0, paddingLeft: "16px", textIndent: "-16px" }}>
                    <span style={{ color: c.navy, marginRight: "8px" }}>→</span>{signal}
                  </p>
                ))}
              </div>
            </div>
          </Section>

          {/* -- 08 Reflection ---------------------------- */}
          <Section label="08" title="Reflection">
            <p style={bodyText}>
              The hardest design decision wasn&apos;t any single UI choice. It was removing working features that existed because the tools made them easy to build.
            </p>
            <p style={bodyText}>
              AI-assisted development changed my process. I went from Figma mockups to functional React components in hours. The hotel booking UI, the car rental pages, the pricing filters. All built, all working, all wrong for this project. The brief said discovery. The tools said &ldquo;you can build anything.&rdquo; The discipline was holding the line between what&apos;s possible and what&apos;s right.
            </p>
            <p style={bodyText}>
              I&apos;d test the globe interaction model first if I had more time. The 3D globe is the signature feature, but it&apos;s also the riskiest. On mobile, a globe is hard to navigate with touch. On desktop, it&apos;s engaging but potentially slow for users who already know what region they want. The continent filter grid exists as a fallback, but I don&apos;t know yet whether users treat the globe as the front door or a novelty. That question matters more than any visual polish.
            </p>

            <h3 style={subheading}>What wasn&apos;t done</h3>
            <p style={bodyText}>
              I didn&apos;t conduct user interviews before building. I didn&apos;t run usability tests on the signup flow or the globe interaction. The design decisions are reasoned from the brief, the style guide, and competitive analysis of how travel platforms organize discovery. Not from observed behavior with real users. Self-initiated timeline, no research budget. The decisions are reasoned, not tested. That&apos;s the honest gap.
            </p>

            <h3 style={subheading}>If I had more time</h3>
            <p style={bodyText}>
              Run moderated usability tests with 5&ndash;6 participants matching the target persona. Test the globe vs. grid as primary entry points. Measure whether the 5-step signup achieves higher completion than a collapsed single-page form. Validate the destination detail page structure: does the rigid layout help or hinder scanning when content varies by destination?
            </p>
            <p style={bodyText}>
              The bigger open question: competitive analysis of travel discovery platforms (Google Travel, Wanderlog, Inspirock, Atlas Obscura). I designed from the brief, not from a market audit. A card sort on the interest categories. User interviews about how 21&ndash;30-year-olds actually research travel. The design reasoning is sound, but reasoning isn&apos;t evidence.
            </p>
          </Section>

        </div>{/* /content wrapper */}

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
  navy:      "#3E3C78",
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
      borderLeft:  `3px solid ${c2.navy}`,
    }}>
      {label && (
        <p style={{
          fontFamily:    f.sans,
          fontSize:      "10px",
          fontWeight:    700,
          letterSpacing: "0.14em",
          textTransform: "uppercase" as const,
          color:         c2.navy,
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
