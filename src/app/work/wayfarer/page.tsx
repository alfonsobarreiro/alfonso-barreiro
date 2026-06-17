import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SignupSlider from "./SignupSlider";
import { CaseStudySchema } from "@/components/structured-data/CaseStudySchema";

export const metadata: Metadata = {
  title: "Wayfarer \u00B7 Travel Discovery Platform",
  description:
    "Case study: A concept travel discovery platform designed for DesignLab. AI tools expanded what was possible to build. The discipline was deciding what not to build.",
  alternates: { canonical: "https://www.barreiro.com/work/wayfarer" },
  openGraph: {
    type: "article",
    url: "https://www.barreiro.com/work/wayfarer",
    title: "Wayfarer \u00B7 Travel Discovery Platform",
    description:
      "Case study: A concept travel discovery platform designed for DesignLab. AI tools expanded what was possible to build. The discipline was deciding what not to build.",
    images: ["/work/wayfarer/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wayfarer \u00B7 Travel Discovery Platform",
    description:
      "Case study: A concept travel discovery platform designed for DesignLab. AI tools expanded what was possible to build. The discipline was deciding what not to build.",
    images: ["/work/wayfarer/opengraph-image"],
  },
};

/* -------------------------------------------------
   Color tokens (matching globals.css / Work.tsx)
------------------------------------------------- */
const c = {
  ink:         "#252B28",
  body:        "#3D4440",
  muted:       "#8A8680",
  accent:      "var(--color-accent)",
  bg:          "#FFFFFF",
  bgSection:   "#FAFAF9",
  surface:     "#FFFFFF",
  border:      "#A99B8A",
  borderStrong:"#7E715F",
  navy:        "#3E3C78",   // Wayfarer brand accent (original brief)

  // Text colors for use over the dark navy (#1E1C3A) sections.
  // Warm off-white family (not same-hue lavender) — the earlier pass
  // tried Refactoring UI's "same hue, lighter and more saturated" rule,
  // but on this particular navy the lavender tints read as muddled blue.
  // A neutral warm off-white reads more confidently as editorial body
  // copy and lets the actual Wayfarer brand accents (navy bar, lavender
  // decorative bullets) carry the hue. All values clear WCAG AA at the
  // relevant sizes.
  onNavy:      "#F5F3EF",   // primary text over navy (~15:1)
  onNavyMuted: "#D0CCC4",   // body text over navy (~10.5:1)
  onNavySoft:  "#9D988F",   // annotation / tertiary text (~6:1)
};

const font = {
  display: "var(--font-dm-sans), -apple-system, sans-serif",
  sans:    "var(--font-dm-sans), -apple-system, sans-serif",
};

export default function WayfarerCaseStudy() {
  return (
    <>
      <CaseStudySchema
        name="Wayfarer · Travel Discovery Platform"
        description="A concept travel discovery platform designed for DesignLab. AI tools expanded what was possible to build. The discipline was deciding what not to build."
        slug="wayfarer"
        dateCreated="2026-03"
      />
      <Nav />

      <main className="cs-content-wrap" style={{ background: c.bg, paddingTop: "72px" }}>

        {/* -- Back link ---------------------------------- */}
        <div style={{ maxWidth: "none", margin: "0 auto", padding: "24px clamp(24px, 5vw, 80px) 0" }}>
          <Link
            href="/#work"
            style={{
              fontFamily:     font.sans,
              fontSize:       "14px",
              fontWeight:     500,
              color:          c.body,
              textDecoration: "none",
              display:        "inline-block",
            }}
          >
            ← Back to work
          </Link>
        </div>

        {/* -- Hero ---------------------------------------- */}
        <section
          aria-labelledby="cs-wayfarer-hero-h1"
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

          <div style={{ maxWidth: "none", margin: "0 auto" }}>
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <span style={{ width: "24px", height: "1px", background: c.navy }} />
              <span style={{
                fontFamily:    font.sans,
                fontSize:      "11px",
                fontWeight:    600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color:         c.onNavyMuted,
              }}>
                Wayfarer &middot; UX Case Study
              </span>
            </div>

            <h1 id="cs-wayfarer-hero-h1" style={{
              fontFamily:    font.display,
              fontSize:      "clamp(32px, 6vw, 64px)",
              fontWeight:    500,
              color:         "#F5F5F4",
              margin:        "0 0 16px",
              letterSpacing: "-0.03em",
              lineHeight:    1.05,
            }}>
              Wayfarer: a travel discovery platform with an interactive globe. For travelers who research before they book.
            </h1>

            <p style={{
              fontFamily:  font.sans,
              fontSize:    "clamp(16px, 2.2vw, 20px)",
              lineHeight:  1.6,
              color:       c.onNavyMuted,
              margin:      "0 0 40px",
              maxWidth:    "640px",
            }}>
              A DesignLab capstone built well past the original brief. 40+ destinations, an interactive globe, a 5-step signup. The hard part was the trip planner: modeling day vs. segment vs. saved location without forcing the user to commit to dates that don&apos;t exist yet.
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
                { label: "Status",   value: "Live \u00B7 wayfarer.barreiro.com" },
                { label: "Methods",  value: "Heuristic Evaluation \u00B7 Card Sorting \u00B7 Information Architecture \u00B7 Multi-Step Form UX \u00B7 AI-Assisted Development" },
                { label: "Outcome",  value: "Discovery-first platform shipped. Trip planner architecture defined." },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: c.onNavyMuted, margin: "0 0 4px" }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: font.sans, fontSize: "14px", color: c.onNavy, margin: 0 }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Thumbnail tape — preview what's downstream */}
            <div style={{
              marginTop:  "56px",
              paddingTop: "32px",
              borderTop:  "1px solid rgba(245,243,239,0.1)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <span style={{ width: "24px", height: "1px", background: c.navy }} />
                <p style={{
                  fontFamily:    font.sans,
                  fontSize:      "11px",
                  fontWeight:    600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color:         c.onNavyMuted,
                  margin:        0,
                }}>
                  What&apos;s downstream
                </p>
              </div>

              <div style={{
                display:             "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap:                 "16px",
              }}>
                {[
                  { label: "↓ Site map (IA)",      src: "/images/work/wayfarer/wayfarer-sig-sitemap.webp",        href: "#section-05"         },
                  { label: "↓ Globe explorer",     src: "/images/work/wayfarer/wayfarer-globe-overview.webp",     href: "#walkthrough-globe"  },
                  { label: "↓ Destination detail", src: "/images/work/wayfarer/wayfarer-destination-detail.webp", href: "#walkthrough-globe"  },
                  { label: "↓ Destinations grid",  src: "/images/work/wayfarer/wayfarer-destinations-grid.webp",  href: "#walkthrough-grid"   },
                  { label: "↓ Signup flow",        src: "/images/work/wayfarer/wayfarer-signup-05.webp",          href: "#walkthrough-signup" },
                  { label: "↗ Live site",          src: "/images/work/wayfarer/wayfarer-cover.webp",              href: "https://wayfarer.barreiro.com/", external: true },
                ].map(({ label, src, href, external }) => (
                  <Link
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="cs-thumb"
                    style={{
                      display:        "block",
                      textDecoration: "none",
                    }}
                  >
                    <div style={{
                      position:    "relative",
                      aspectRatio: "16 / 11",
                      overflow:    "hidden",
                      background:  "#0F0E1F",
                      border:      "1px solid rgba(245,243,239,0.1)",
                    }}>
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="(max-width: 767px) 50vw, 220px"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                      />
                    </div>
                    <p style={{
                      fontFamily:    font.sans,
                      fontSize:      "11px",
                      fontWeight:    600,
                      letterSpacing: "0.10em",
                      textTransform: "uppercase",
                      color:         c.onNavy,
                      margin:        "10px 0 0",
                    }}>
                      {label}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

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
                // Primary CTA — the live, deployed Wayfarer app (strongest proof of work)
                { label: "Live site ↗",   href: "https://wayfarer.barreiro.com/",      external: true,  variant: "primary" },
                // Secondary — slide deck lives on the portfolio itself (internal nav)
                { label: "View slide deck",   href: "/work/presentations/wayfarer",        external: false, variant: "ghost"   },
                // Tertiary — Figma source, now exposed alongside the editorial DS section
                { label: "Figma file",  href: "https://www.figma.com/design/glE8OOm7wbnBsEqD0L4YWz/Wayfarer-Travel", external: true, variant: "ghost"   },
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

        {/* -- Cover image ---------------------------------
            Structure-first: the IA tree, not the globe, is the
            first image after the hero. The case study's central
            claim is that browse-first IA beat search-first IA;
            leading with the site map makes that claim land at
            first scroll instead of waiting until §05. The globe
            still appears second in the thumbnail tape above and
            in §04's walkthrough — it isn't hidden, it just isn't
            the headline. */}
        <div style={{ background: c.bgSection, padding: "48px clamp(24px, 5vw, 80px) 0" }}>
          <div style={{ maxWidth: "none", margin: "0 auto" }}>
            <div style={{
              position:    "relative",
              aspectRatio: "2 / 1",
              overflow:    "hidden",
            }}>
              <Image
                src="/images/work/wayfarer/wayfarer-cover.webp"
                alt="Wayfarer homepage. Interactive globe explorer with hidden gems grid below, the visitor's first encounter with the product."
                fill
                sizes="(max-width: 767px) 100vw, 1280px"
                style={{ objectFit: "cover", objectPosition: "top" }}
                priority
              />
            </div>
          </div>
        </div>

        {/* -- Content wrapper ----------------------------- */}
        <div style={{ maxWidth: "none", margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

          {/* -- 01 Context & Brief ------------------------
              Two-column "Brief / Audience" layout per Cate's review:
              "Option 2 — Intentional Two-Column Structure: Design Goal +
              Audience side-by-side, then Constraints + additional context
              underneath." Removes the halfway-editorial-halfway-dashboard
              feel of the previous stacked layout. Refactoring UI Part 3
              (establish spacing, avoid ambiguous spacing) + Part 4
              (constrained line length). */}
          <Section label="01" title="Context &amp; Brief">
            <div
              className="cs-context-grid"
              style={{
                display:             "grid",
                gridTemplateColumns: "1fr 1fr",
                gap:                 "clamp(32px, 5vw, 56px)",
                marginBottom:        "8px",
              }}
            >
              <div>
                <h3 style={{ ...subheading, margin: "0 0 12px" }}>The brief</h3>
                <p style={{ ...bodyText, maxWidth: "none", margin: 0 }}>
                  DesignLab assigned me a travel discovery platform called Wayfarer. The brief was specific: redesign the homepage and fix the onboarding flow. Users found the existing multi-step signup confusing, repetitive, and inefficient. The layout was inconsistent across devices. The visual language didn&apos;t match the audience it was trying to reach.
                </p>
              </div>
              <div>
                <h3 style={{ ...subheading, margin: "0 0 12px" }}>The audience</h3>
                <p style={{ ...bodyText, maxWidth: "none", margin: 0 }}>
                  Adventurous travelers aged 21&ndash;30, digitally native, mobile-first, more interested in authentic cultural experiences than resort packages. They research before they commit. They browse before they plan. Wayfarer&apos;s job is to help them discover where to go next, not to book the flight.
                </p>
              </div>
            </div>

            <Callout label="Design constraint">
              Wayfarer is a discovery tool, not a booking platform. The brief said so explicitly.
            </Callout>

            {/* Style guide micro-strip — small, contained spec row instead
                of a one-line orphan paragraph. */}
            <div style={{
              display:       "flex",
              flexWrap:      "wrap",
              gap:           "12px 28px",
              paddingTop:    "20px",
              marginTop:     "12px",
              borderTop:     `1px solid ${c.border}`,
              fontFamily:    font.sans,
              fontSize:      "13px",
              color:         c.body,
            }}>
              <span style={{ color: c.muted, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "11px", fontWeight: 700 }}>
                Style guide
              </span>
              <span>
                <span style={{ color: c.muted }}>Type · </span>Space Grotesk &middot; Inter
              </span>
              <span>
                <span style={{ color: c.muted }}>Palette · </span>Navy &middot; Lavender &middot; Terra cotta
              </span>
            </div>
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
                  text: "The multi-step signup form was the most cited pain point. Users dropped off mid-flow. Steps felt repetitive. There was no clear signal of progress or what the form was building toward.",
                },
                {
                  label: "Layout inconsistency",
                  text: "The existing design didn\u2019t hold together across screen sizes. Spacing shifted unpredictably. The hierarchy broke on mobile. Components that looked intentional on desktop felt accidental on smaller viewports.",
                },
                {
                  label: "No visual storytelling",
                  text: "The homepage didn\u2019t pull users into the experience. Destinations were listed, not revealed.",
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

            <Callout label="What ties them together">
              Travel content is invitation, not data. The original site treated it like data.
            </Callout>
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
              I scaled it back. Removed hotel and car booking from destination pages. Kept the discovery flow, the globe explorer, the trip planner, and the multi-step signup as the center of gravity.
            </p>

            {/* Cut/Kept inventory + Key insight side-by-side per Cate's review:
                "You could potentially float key insight blocks or supporting
                information beside those sections instead." The table reads as
                evidence; the Callout reads as the principle that drove the cuts.
                Refactoring UI Part 3 — use the surrounding whitespace intentionally
                instead of letting tables stretch into empty page. */}
            <div
              className="cs-nb-grid"
              style={{
                display:             "grid",
                gridTemplateColumns: "1.6fr 1fr",
                gap:                 "32px",
                alignItems:          "start",
                marginTop:           "32px",
              }}
            >
              {/* What was cut vs what survived */}
              <div className="cs-table-scroll" style={{ border: `1px solid ${c.border}`, overflow: "hidden" }}>
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

              <Callout label="Key insight">
                AI tools expand what&apos;s possible to build. They don&apos;t expand what should be built.
              </Callout>
            </div>
          </Section>

          {/* -- 04 Multi-Step Signup ---------------------- */}
          <Section label="04" title="Multi-Step Signup">
            <p style={bodyText}>
              The original form was the brief&apos;s most cited pain point.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", margin: "16px 0 24px" }}>
              <div style={{ padding: "20px 24px", background: c.bgSection, border: `1px solid ${c.border}` }}>
                <p style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: c.muted, margin: "0 0 8px" }}>Before</p>
                <p style={{ fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65, color: c.body, margin: 0 }}>
                  One long form. All fields visible at once. Repetitive labels. No sense of progression. Users dropped out before reaching the personalization fields.
                </p>
              </div>
              <div style={{ padding: "20px 24px", background: "rgba(62,60,120,0.06)", border: `1px solid #8E8AD9` }}>
                <p style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: c.navy, margin: "0 0 8px" }}>After</p>
                <p style={{ fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65, color: c.body, margin: 0 }}>
                  Five steps, each collecting a different type of preference. Light commitment first; personalization later. The form mirrors the discovery experience the rest of the product asks the user to follow.
                </p>
              </div>
            </div>

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
              The signup is the user&apos;s first interaction with Wayfarer. If it mirrors discovery (explore, choose, refine, confirm), it becomes part of the product, not a gate in front of it.
            </p>

            <Callout label="Why staged">
              Each step asks for one thing. The form earns trust before it asks for preferences.
            </Callout>
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
          <div style={{ maxWidth: "none", margin: "0 auto" }}>

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
                  color:         c.onNavyMuted,
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
                fontSize:   "16px",
                lineHeight: 1.7,
                color:      c.onNavyMuted,
                margin:     0,
              }}>
                Three features carry the case study: the globe explorer that makes discovery spatial, the destinations grid that offers a filter-first parallel path, and the multi-step signup that turns preference collection into the first act of exploration.
              </p>
            </div>

            {/* -- Globe Explorer --------------------------------- */}
            <div id="walkthrough-globe" style={{ marginBottom: "64px", scrollMarginTop: "96px" }}>
              <h3 style={{
                fontFamily:    font.sans,
                fontSize:      "13px",
                fontWeight:    700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         c.onNavyMuted,
                margin:        "0 0 12px",
              }}>Globe Explorer</h3>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "15px",
                lineHeight: 1.7,
                color:      c.onNavyMuted,
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
                    src:      "/images/work/wayfarer/wayfarer-globe-overview.webp",
                    alt:      "Wayfarer globe explorer showing 3D Earth with destination pins across continents",
                    label:    "01",
                    decision: "Discovery starts at world view",
                    caption:  "The globe loads with destination pins visible across continents. The user's first instinct is to rotate and explore.",
                  },
                  {
                    src:      "/images/work/wayfarer/wayfarer-globe-flyto.webp",
                    alt:      "Globe flying to Asia region with destination pins enlarging on approach",
                    label:    "02",
                    decision: "The camera does the navigating",
                    caption:  "Clicking a region triggers a fly-to animation. Pins enlarge as the camera approaches. Hover reveals destination name and tagline.",
                  },
                  {
                    src:      "/images/work/wayfarer/wayfarer-destination-detail.webp",
                    alt:      "Destination detail page for a selected location showing hero image, info grid, and travel tips",
                    label:    "03",
                    decision: "One template, every destination",
                    caption:  "The detail page follows a rigid structure: hero, info grid, description, gallery, tips, highlights, related destinations, map.",
                  },
                ].map(({ src, alt, label, decision, caption }) => (
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
                        color:         c.onNavyMuted,
                        paddingTop:    "2px",
                        flexShrink:    0,
                      }}>{label}</span>
                      <div>
                        <p style={{
                          fontFamily:    font.sans,
                          fontSize:      "12px",
                          fontWeight:    700,
                          letterSpacing: "0.02em",
                          color:         "#F5F5F4",
                          margin:        "0 0 4px",
                        }}>{decision}</p>
                        <p style={{
                          fontFamily: font.sans,
                          fontSize:   "14px",
                          lineHeight: 1.7,
                          color:      c.onNavyMuted,
                          margin:     0,
                        }}>{caption}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Globe annotations — UI decisions called out, not just features */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "24px" }}>
                {[
                  { detail: "Mapbox GL with 3D projection and atmosphere", why: "The globe feels physical. Fog and lighting effects create depth that a flat map can't." },
                  { detail: "Bhutan preselected on first load",            why: "The detail card is populated before the user clicks. The empty state never shows." },
                  { detail: "Instructional copy adjacent to the map",       why: "The user sees the affordance where the interaction lives, not in a separate hero block." },
                ].map(({ detail, why }) => (
                  <div key={detail} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{
                      width: "4px", height: "4px", borderRadius: "50%",
                      background: c.onNavyMuted, flexShrink: 0, marginTop: "7px",
                    }} />
                    <p style={{
                      fontFamily: font.sans, fontSize: "13px", lineHeight: 1.6,
                      color: c.onNavySoft, margin: 0,
                    }}>
                      <span style={{ color: c.onNavy, fontWeight: 600 }}>{detail}</span>
                      {" \u00B7 "}{why}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* -- Parallel Entry: Destinations Grid --------------- */}
            <div id="walkthrough-grid" style={{ marginBottom: "64px", scrollMarginTop: "96px" }}>
              <h3 style={{
                fontFamily:    font.sans,
                fontSize:      "13px",
                fontWeight:    700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         c.onNavyMuted,
                margin:        "0 0 12px",
              }}>Parallel Entry · Destinations Grid</h3>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "15px",
                lineHeight: 1.7,
                color:      c.onNavyMuted,
                margin:     "0 0 24px",
                maxWidth:   "560px",
              }}>
                The globe is the novel entry point, but not the only one. The destinations grid is the fallback path for users who already know what region they want. Same content, different interaction. Filter by continent, scan visually, click to go deeper. Two entry points matched to different levels of intent.
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

              {/* Grid annotations — UI decisions called out */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "24px" }}>
                {[
                  { detail: "Count badges on every filter",   why: "Users see how many destinations live under each region before committing to a filter. Less blind clicking, more informed scanning." },
                  { detail: "Hover preselects on the map",     why: "Browsing the grid drives the globe in parallel. Two entry points stay tied together instead of being separate flows." },
                ].map(({ detail, why }) => (
                  <div key={detail} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{
                      width: "4px", height: "4px", borderRadius: "50%",
                      background: c.onNavyMuted, flexShrink: 0, marginTop: "7px",
                    }} />
                    <p style={{
                      fontFamily: font.sans, fontSize: "13px", lineHeight: 1.6,
                      color: c.onNavySoft, margin: 0,
                    }}>
                      <span style={{ color: c.onNavy, fontWeight: 600 }}>{detail}</span>
                      {" \u00B7 "}{why}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* -- Multi-Step Signup ------------------------------- */}
            <div id="walkthrough-signup" style={{ scrollMarginTop: "96px" }}>
              <h3 style={{
                fontFamily:    font.sans,
                fontSize:      "13px",
                fontWeight:    700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         c.onNavyMuted,
                margin:        "0 0 12px",
              }}>Multi-Step Signup</h3>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "15px",
                lineHeight: 1.7,
                color:      c.onNavyMuted,
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

              {/* Signup annotations — UI decisions called out */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "24px" }}>
                {[
                  { detail: "Zod schema validation per step",   why: "Errors surface before the user moves forward. No surprise failures at the end of a 5-step flow." },
                  { detail: "Numeric budget ranges, not labels", why: "$50–100/day, $100–250/day, $250–500/day, $500+. Replaces 'Mid-Range' and 'Luxury' so users see the actual commitment." },
                  { detail: "Review step before commit",         why: "Edit-back capability. The user confirms what they built, not what the system thinks they meant." },
                ].map(({ detail, why }) => (
                  <div key={detail} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{
                      width: "4px", height: "4px", borderRadius: "50%",
                      background: c.onNavyMuted, flexShrink: 0, marginTop: "7px",
                    }} />
                    <p style={{
                      fontFamily: font.sans, fontSize: "13px", lineHeight: 1.6,
                      color: c.onNavySoft, margin: 0,
                    }}>
                      <span style={{ color: c.onNavy, fontWeight: 600 }}>{detail}</span>
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

          {/* -- 05 Information Architecture -------------- */}
          <Section label="05" title="Information Architecture">
            <p style={bodyText}>
              The IA question was: how does a curious traveler find a destination they didn&apos;t know they wanted? Search-first answers the wrong user. Browse-first answers the right one. Every IA decision flowed from there.
            </p>

            <h3 style={subheading}>Two entry points, same content</h3>
            <p style={bodyText}>
              Globe and grid serve different users with the same content. The globe is for curiosity. A traveler who doesn&apos;t know where to look spins it, follows pins, lets a region invite them in. The grid is for intent. A traveler who already knows they want Southeast Asia filters to it and scans. Both paths land on the same destination pages. The IA doesn&apos;t pick a winner. It picks both. A single funnel would have served the intent user and frustrated the curiosity one.
            </p>

            <h3 style={subheading}>Six page types, each owns a task</h3>
            <p style={bodyText}>
              Six routes, six user verbs: orient, browse, explore, evaluate, plan, personalize. Six covers the full discovery cycle without padding.
            </p>

            {/* Route table */}
            <div className="cs-table-scroll" style={{ marginTop: "8px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                <thead>
                  <tr style={{ background: c.bgSection }}>
                    {[
                      { label: "Route",     width: "22%" },
                      { label: "Type",      width: "20%" },
                      { label: "User Task", width: "18%" },
                      { label: "Purpose",   width: "40%" },
                    ].map(({ label, width }) => (
                      <th key={label} style={{ ...thStyle, width, color: label === "User Task" ? c.navy : c.muted, fontWeight: label === "User Task" ? 700 : 600 }}>{label}</th>
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
                      <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: "13px", color: c.muted, overflowWrap: "anywhere" }}>{route}</td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: c.ink }}>{type}</td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: c.navy }}>{task}</td>
                      <td style={tdStyle}>{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 style={subheading}>What was rejected</h3>
            <p style={bodyText}>
              Three IA approaches lost the filter:
            </p>
            <ul style={{ ...bodyText, paddingLeft: "24px", margin: "0 0 32px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "12px" }}><strong>Search-first.</strong> The default for booking platforms. Searching requires a destination already in mind, and the target audience doesn&apos;t know yet.</li>
              <li style={{ marginBottom: "12px" }}><strong>Booking-integrated taxonomy.</strong> Hotels and flights as primary navigation. The information scent shifted from discover to transact the moment hotel cards appeared.</li>
              <li><strong>Tag-based discovery.</strong> Pinterest-style filtering by mood. Tags are aspirational but don&apos;t reduce decision space. Continent + interest does.</li>
            </ul>

            <p style={bodyText}>
              This IA assumes browse-first is what the audience wants. The hypothesis is reasoned from the brief and competitive analysis, not from a card sort with real users. That&apos;s the honest gap. The evaluation plan in &sect;08 is built to test it, starting with whether the globe pulls users in or sends them straight to the grid.
            </p>
          </Section>



          {/* -- 06 Design System -------------------------- */}
          <Section label="06" title="Design System">
            <p style={bodyText}>
              The original DesignLab style guide defined the palette, typography, logo rules, and image direction. Two typefaces, each with a role. Below, each one is shown set in itself.
            </p>

            {/* Typography specimens — each font set in itself */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0, margin: "24px 0 40px", border: `1px solid ${c.border}` }}>
              {/* Space Grotesk */}
              <div style={{ padding: "28px clamp(20px, 4vw, 36px)", borderBottom: `1px solid ${c.border}`, background: c.surface }}>
                <p style={{
                  fontFamily:    "var(--font-space-grotesk), \"Space Grotesk\", sans-serif",
                  fontSize:      "clamp(28px, 5vw, 48px)",
                  fontWeight:    700,
                  letterSpacing: "-0.02em",
                  lineHeight:    1.05,
                  color:         c.ink,
                  margin:        "0 0 12px",
                }}>
                  Space Grotesk for headings.
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
                  Display · 700 · -2% tracking
                </p>
                <p style={{ fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65, color: c.body, margin: 0, maxWidth: "640px" }}>
                  Geometric sans with strong personality. Sized 60 / 48 / 32 / 24 px across H1 to H4 for editorial display moments.
                </p>
              </div>

              {/* Inter */}
              <div style={{ padding: "28px clamp(20px, 4vw, 36px)", background: c.surface }}>
                <p style={{
                  fontFamily:    "var(--font-inter), Inter, system-ui, sans-serif",
                  fontSize:      "clamp(16px, 2vw, 20px)",
                  fontWeight:    400,
                  lineHeight:    1.55,
                  color:         c.ink,
                  margin:        "0 0 12px",
                  maxWidth:      "640px",
                }}>
                  Inter for body and UI. Legibility at scale, optimized for screen reading at small sizes and for predictable rhythm in long-form content.
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
                  Body, UI, and form labels. Sized 20 / 18 / 16 px. The workhorse, used everywhere outside the display layer.
                </p>
              </div>
            </div>

            {/* Palette */}
            <h3 style={subheading}>Palette</h3>
            <p style={bodyText}>
              Anchored in navy, lavender, and terra cotta. Sage green and warm neutrals fill the supporting layer.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px", margin: "16px 0 40px" }}>
              {[
                {
                  label: "Primary",
                  colors: [
                    { name: "Navy",        hex: "#3E3C78" },
                    { name: "Lavender",    hex: "#C5C7E3" },
                    { name: "Deep Indigo", hex: "#2C2B5A" },
                  ],
                },
                {
                  label: "Secondary",
                  colors: [
                    { name: "Terra Cotta", hex: "#D27A5E" },
                    { name: "Sage Green",  hex: "#A3C9A8" },
                  ],
                },
                {
                  label: "Neutrals",
                  colors: [
                    { name: "Dark Charcoal", hex: "#2E2E30" },
                    { name: "Light Gray",    hex: "#D8D9E0" },
                    { name: "Off-White",     hex: "#F8F9FB" },
                  ],
                },
              ].map(({ label, colors }) => (
                <div key={label}>
                  <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: c.muted, margin: "0 0 10px" }}>
                    {label}
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
                    {colors.map(({ name, hex }) => (
                      <div key={name} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", background: c.surface, border: `1px solid ${c.border}` }}>
                        <span style={{ width: 32, height: 32, background: hex, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 4, flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontFamily: font.sans, fontSize: "13px", fontWeight: 600, color: c.ink, margin: 0 }}>{name}</p>
                          <p style={{ fontFamily: "monospace", fontSize: "11px", color: c.muted, margin: 0 }}>{hex}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Logo */}
            <h3 style={subheading}>Logo</h3>
            <p style={bodyText}>
              The wordmark anchors the brand. Two treatments, one set of rules.
            </p>

            <div style={{
              display:             "grid",
              gridTemplateColumns: "1fr 1fr",
              gap:                 "10px",
              margin:              "16px 0 24px",
            }}>
              <div style={{
                padding:    "32px 16px",
                background: c.bgSection,
                border:     `1px solid ${c.border}`,
                display:    "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Image
                  src="/images/work/wayfarer/wayfarer-logo.svg"
                  alt="Wayfarer wordmark on a light background"
                  width={240}
                  height={47}
                  style={{ width: "100%", maxWidth: "160px", height: "auto", display: "block" }}
                  unoptimized
                />
              </div>
              <div style={{
                padding:    "32px 16px",
                background: "#1E1C3A",
                border:     `1px solid ${c.border}`,
                display:    "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Image
                  src="/images/work/wayfarer/wayfarer-logo.svg"
                  alt="Wayfarer wordmark, white treatment on a dark navy background"
                  width={240}
                  height={47}
                  style={{ width: "100%", maxWidth: "160px", height: "auto", display: "block", filter: "invert(1) brightness(2)" }}
                  unoptimized
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px 32px", margin: "0 0 40px" }}>
              {[
                { rule: "Clearspace", spec: "Equal to the uppercase W height on all sides" },
                { rule: "Minimum size", spec: "40px (mobile), 60px (desktop)" },
                { rule: "Background", spec: "White on dark; dark on light" },
                { rule: "Positioning", spec: "Top-left across all viewports" },
              ].map(({ rule, spec }) => (
                <div key={rule}>
                  <p style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: c.muted, margin: "0 0 4px" }}>{rule}</p>
                  <p style={{ fontFamily: font.sans, fontSize: "13px", color: c.ink, margin: 0, lineHeight: 1.5 }}>{spec}</p>
                </div>
              ))}
            </div>

            {/* Imagery */}
            <h3 style={subheading}>Imagery</h3>
            <p style={bodyText}>
              Hero photography uses full-bleed crops with relaxed focal points. Destination cards stay consistent across card types. Icons follow the secondary palette.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px 32px", margin: "8px 0 40px" }}>
              {[
                { rule: "Hero imagery",       spec: "Full-bleed with relaxed focal crop" },
                { rule: "Destination cards",  spec: "Consistent rounded corners across all card types" },
                { rule: "Icons",              spec: "Secondary icons in terra cotta (#D27A5E)" },
              ].map(({ rule, spec }) => (
                <div key={rule}>
                  <p style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: c.muted, margin: "0 0 4px" }}>{rule}</p>
                  <p style={{ fontFamily: font.sans, fontSize: "13px", color: c.ink, margin: 0, lineHeight: 1.5 }}>{spec}</p>
                </div>
              ))}
            </div>

            {/* Token architecture */}
            <h3 style={subheading}>Token architecture</h3>
            <p style={bodyText}>
              The token architecture follows the same three-tier pattern as Men&apos;s Sole Revival and the portfolio site: CSS custom properties as the source of truth, TypeScript semantic aliases for component consumption, and Tailwind utilities for development. Same naming convention across all three projects. One vocabulary, different values per property.
            </p>

            {/* Token table — un-hidden (was inside <details>) */}
            <div className="cs-table-scroll" style={{ marginTop: "16px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                <thead>
                  <tr style={{ background: c.bgSection }}>
                    {[
                      { label: "Token",    width: "22%" },
                      { label: "Wayfarer", width: "26%" },
                      { label: "Brand",    width: "26%" },
                      { label: "MSR",      width: "26%" },
                    ].map(({ label, width }) => (
                      <th key={label} style={{ ...thStyle, width, color: label === "Wayfarer" ? c.navy : c.muted, fontWeight: label === "Wayfarer" ? 700 : 600 }}>{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { token: "brand-500",   wayfarer: "#3E3C78", brand: "#1C3F5E", msr: "#1C3F5E" },
                    { token: "brand-900",   wayfarer: "#2C2B5A", brand: "#091016", msr: "#13100C" },
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

            {/* Signature artifacts — five Figma pages pulled out for portfolio
                handoff. Each one stands on its own. Together they document the
                full brand identity, visual system, production components, and
                the IA the product is built on. */}
            <h3 style={subheading}>The system, by page</h3>
            <p style={bodyText}>
              Five pages from the Wayfarer Figma file, exported at native resolution. Each is its own deep dive; together they show the design system at the depth a senior reviewer would want.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginTop: "16px" }}>
              {[
                {
                  src:     "/images/work/wayfarer/wayfarer-sig-brand.webp",
                  aspect:  "1920 / 4200",
                  number:  "01",
                  label:   "BRAND & IDENTITY",
                  caption: "Seven sections covering the full brand: wordmark signature, three colorways, three application rules, eight-color palette with role mapping, typography pairing with editorial sample, glyph set for both display and body faces, and four application mockups (business card, social square, web hero, signage).",
                },
                {
                  src:     "/images/work/wayfarer/wayfarer-sig-typography.webp",
                  aspect:  "1920 / 1786",
                  number:  "02",
                  label:   "TYPOGRAPHY",
                  caption: "Two typefaces, two jobs, no decorative middle. Space Grotesk for the display layer (Display 60 through H4 20). Inter for body, small, and label. Three weight chips per family plus a decision note framing why the roles stay structurally separate.",
                },
                {
                  src:     "/images/work/wayfarer/wayfarer-sig-color.webp",
                  aspect:  "1920 / 3442",
                  number:  "03",
                  label:   "COLOR",
                  caption: "One palette, three roles, two modes. Ten-step primitive ramps for Brand (Navy), Accent (Terra Cotta), Sage, and Neutral, plus utility colors, plus fifty-plus semantic tokens that swap between Light and Dark cleanly.",
                },
                {
                  src:     "/images/work/wayfarer/wayfarer-sig-components-teaser.webp",
                  aspect:  "1664 / 1279",
                  number:  "04",
                  label:   "COMPONENTS · TEASER",
                  caption: "Eighteen sections of production components in the file, each mapped to its source file in the Next.js app. The Color section is shown here; type styles, buttons, inputs, navbar, footer, modals, and destination cards continue down the page.",
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
                      color:         c.accent,
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
                      alt={`Wayfarer ${label}`}
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

              {/* -- 05: Site Map & User Flow — code-rendered ----
                  Replaces the previous Figma artifact at this gallery
                  position. The artifact rendered at gallery scale put
                  text at ~9px on-screen. Re-rendering the IA in code
                  using the page's design tokens lets every label sit
                  at native size, sharp at any viewport, with the same
                  editorial cadence as the rest of §06.
                  Source data is duplicated with §05's route table; the
                  two render the same IA in different modes (table vs
                  visual diagram + flow). */}
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "12px" }}>
                  <span style={{
                    fontFamily:    font.sans,
                    fontSize:      "11px",
                    fontWeight:    700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color:         c.accent,
                  }}>05</span>
                  <span style={{
                    fontFamily:    font.sans,
                    fontSize:      "11px",
                    fontWeight:    700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color:         c.ink,
                  }}>SITE MAP &amp; USER FLOW</span>
                </div>

                <div style={{
                  border:     `1px solid ${c.border}`,
                  background: c.bgSection,
                  padding:    "clamp(24px, 3.5vw, 44px)",
                }}>
                  {/* SITE MAP */}
                  <p style={{
                    fontFamily:    font.sans,
                    fontSize:      "10px",
                    fontWeight:    700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color:         c.muted,
                    margin:        "0 0 14px",
                  }}>Site Map</p>

                  <div style={{
                    background: c.surface,
                    border:     `1px solid ${c.border}`,
                  }}>
                    {[
                      { kind: "ROUTE",   path: "/",                       desc: "Home · hero, destinations carousel, why-wayfarer, get-started",      indent: 0 },
                      { kind: "MODAL",   path: "Sign Up modal",           desc: "5-step zod-validated signup",                                         indent: 1 },
                      { kind: "MODAL",   path: "Sign In modal",           desc: "Single-step email + password",                                        indent: 1 },
                      { kind: "ROUTE",   path: "/destinations",           desc: "Filterable catalog of 87 destinations",                               indent: 0 },
                      { kind: "ROUTE",   path: "/destinations/[slug]",    desc: "Detail page · hero / about / gallery / highlights / map / sidebar",   indent: 1 },
                      { kind: "ROUTE",   path: "/discover",               desc: "3D Mapbox globe + Hidden Gems grid",                                  indent: 0 },
                      { kind: "ROUTE",   path: "/planner",                desc: "Drag-reorder itinerary + saved-locations rail + print-to-PDF",        indent: 0 },
                      { kind: "MODAL",   path: "Picker modal",            desc: "Add a segment or save a destination",                                 indent: 1 },
                      { kind: "OVERLAY", path: "Search overlay (⌘K)", desc: "Globally-available cmd-K palette",                                    indent: 0 },
                    ].map(({ kind, path, desc, indent }, i, arr) => {
                      const isLast = i === arr.length - 1;
                      const chipBg = kind === "ROUTE" ? "rgba(62,60,120,0.10)"
                                  : kind === "MODAL" ? "rgba(122,139,110,0.12)"
                                  : "rgba(138,134,128,0.16)";
                      const chipFg = kind === "ROUTE" ? c.navy
                                  : kind === "MODAL" ? c.accent
                                  : c.muted;
                      return (
                        <div key={path} style={{
                          padding:      "14px clamp(16px, 2vw, 22px)",
                          paddingLeft:  `calc(clamp(16px, 2vw, 22px) + ${indent * 24}px)`,
                          borderBottom: isLast ? "none" : `1px solid ${c.border}`,
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px", flexWrap: "wrap" }}>
                            <span style={{
                              display:       "inline-flex",
                              alignItems:    "center",
                              padding:       "3px 9px",
                              fontFamily:    font.sans,
                              fontSize:      "10px",
                              fontWeight:    700,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              background:    chipBg,
                              color:         chipFg,
                              flexShrink:    0,
                            }}>{kind}</span>
                            <span style={{
                              fontFamily:   "ui-monospace, 'SF Mono', Menlo, monospace",
                              fontSize:     "14px",
                              fontWeight:   600,
                              color:        c.ink,
                              overflowWrap: "anywhere",
                            }}>{path}</span>
                          </div>
                          <p style={{
                            fontFamily: font.sans,
                            fontSize:   "13px",
                            color:      c.body,
                            lineHeight: 1.5,
                            margin:     0,
                          }}>{desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* PRIMARY USER FLOW */}
                  <p style={{
                    fontFamily:    font.sans,
                    fontSize:      "10px",
                    fontWeight:    700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color:         c.muted,
                    margin:        "32px 0 14px",
                  }}>Primary User Flow &middot; Curiosity to Commitment</p>

                  <div style={{
                    display:             "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap:                 "10px",
                  }}>
                    {[
                      { step: "01", verb: "Land",   where: "Homepage" },
                      { step: "02", verb: "Browse", where: "Discover · /destinations" },
                      { step: "03", verb: "Decide", where: "Detail · /destinations/[slug]" },
                      { step: "04", verb: "Save",   where: "Saved Locations rail · /planner" },
                      { step: "05", verb: "Commit", where: "Promote saved · segment" },
                      { step: "06", verb: "Export", where: "Print-to-PDF" },
                    ].map(({ step, verb, where }) => (
                      <div key={step} style={{
                        background: c.surface,
                        border:     `1px solid ${c.border}`,
                        padding:    "14px",
                      }}>
                        <p style={{
                          fontFamily:    font.sans,
                          fontSize:      "10px",
                          fontWeight:    700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color:         c.accent,
                          margin:        "0 0 6px",
                        }}>Step {step}</p>
                        <p style={{
                          fontFamily:    font.sans,
                          fontSize:      "17px",
                          fontWeight:    700,
                          color:         c.ink,
                          letterSpacing: "-0.01em",
                          margin:        "0 0 6px",
                        }}>{verb}</p>
                        <p style={{
                          fontFamily: font.sans,
                          fontSize:   "12px",
                          color:      c.muted,
                          lineHeight: 1.45,
                          margin:     0,
                        }}>{where}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <p style={{ fontFamily: font.sans, fontSize: "12px", color: c.muted, lineHeight: 1.55, margin: "10px 0 0", maxWidth: "780px" }}>
                  Six routes, two flows, one discovery loop. The site map shows every route, modal, and overlay; the user flow tracks the path from curiosity at step one to commitment at step six. Rendered in code at native text size so every label stays legible at every width.
                </p>
              </div>
            </div>

          </Section>

          {/* -- 07 Outcomes ------------------------------- */}
          <Section label="07" title="Outcomes">
            <p style={bodyText}>
              A concept project can&apos;t claim live-data outcomes. It can claim what shipped against the brief, what&apos;s structurally validated without users, and what&apos;s deferred to live testing. That&apos;s what this section does.
            </p>

            <h3 style={subheading}>What shipped, against the brief</h3>
            <p style={bodyText}>
              The brief asked for two things: a homepage redesign and an onboarding fix. The build expanded around both without breaking either.
            </p>

            {/* Brief vs Delivered table */}
            <div className="cs-table-scroll" style={{ marginTop: "8px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: c.bgSection }}>
                    <th style={{ ...thStyle, width: "30%" }}>Brief asked for</th>
                    <th style={thStyle}>Delivered</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { brief: "Homepage redesign", delivered: "New homepage with hero, globe entry point, and feature highlights",                      beyond: false },
                    { brief: "Onboarding fix",    delivered: "5-step signup with per-step Zod validation and edit-back review screen",                  beyond: false },
                    { brief: "(beyond brief)",    delivered: "Interactive 3D globe with 40+ destinations",                                              beyond: true  },
                    { brief: "(beyond brief)",    delivered: "Six-page IA mapped to user verbs",                                                        beyond: true  },
                    { brief: "(beyond brief)",    delivered: "Destination detail templates (rigid by design)",                                          beyond: true  },
                    { brief: "(beyond brief)",    delivered: "Trip planner with drag-to-reorder",                                                       beyond: true  },
                    { brief: "(beyond brief)",    delivered: "Full design system (tokens, type, components) from scratch",                              beyond: true  },
                  ].map(({ brief, delivered, beyond }) => (
                    <tr key={delivered} style={{ background: beyond ? c.bgSection : c.surface }}>
                      <td style={{ ...tdStyle, color: beyond ? c.muted : c.body, fontStyle: beyond ? "italic" : "normal", fontWeight: beyond ? 400 : 600 }}>{brief}</td>
                      <td style={tdStyle}>{delivered}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ ...bodyText, marginTop: "20px" }}>
              The expansion isn&apos;t scope creep. &sect;03 shows the booking UI that got cut after AI made it easy to build.
            </p>

            <h3 style={subheading}>What&apos;s structurally validated now</h3>
            <p style={bodyText}>
              These outcomes don&apos;t need live users. Design system coherence: tokens hold across every screen. IA where every route maps to one user verb (orient, browse, explore, evaluate, plan, personalize). Per-step form validation with Zod. No layout breakage at standard breakpoints. The artifact tests cleanly on its own.
            </p>

            <h3 style={subheading}>The honest scope</h3>
            <p style={bodyText}>
              No live users tested this. No card sort on destination categories. No usability testing on the globe. The hypotheses are reasoned from the brief and competitive analysis, not validated by behavior. This case study can claim design discipline, scope discipline, and system coherence today. It can&apos;t claim user-validated discovery. That&apos;s what &sect;08 is set up to test when traffic exists.
            </p>
          </Section>

          {/* -- 08 Evaluation Plan ----------------------- */}
          <Section label="08" title="Evaluation Plan">
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

            <details style={{ marginTop: "8px" }}>
              <summary style={{ fontFamily: font.sans, fontSize: "13px", fontWeight: 600, color: c.navy, cursor: "pointer", padding: "12px 0", letterSpacing: "0.02em" }}>
                Show metrics + thresholds
              </summary>
              {/* Threshold table */}
              <div className="cs-table-scroll" style={{ marginTop: "8px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                  <thead>
                    <tr style={{ background: c.bgSection }}>
                      {[
                        { label: "Hypothesis", width: "26%" },
                        { label: "Metric",     width: "22%" },
                        { label: "Threshold",  width: "14%" },
                        { label: "Rationale",  width: "38%" },
                      ].map(({ label, width }) => (
                        <th key={label} style={{ ...thStyle, width }}>{label}</th>
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
            </details>

          </Section>

          {/* -- 09 Reflection ---------------------------- */}
          <Section label="09" title="Reflection">
            <p style={bodyText}>
              AI-assisted development changed the process. Figma mockups to functional React components in hours. The hotel booking UI, the car rental pages, the pricing filters: all built, all working, all wrong for the brief.
            </p>
            <p style={bodyText}>
              I&apos;d test the globe interaction model first if I had more time. The 3D globe is the signature feature, but it&apos;s also the riskiest. On mobile, a globe is hard to navigate with touch. On desktop, it&apos;s engaging but potentially slow for users who already know what region they want. The continent filter grid exists as a fallback, but I don&apos;t know yet whether users treat the globe as the front door or a novelty.
            </p>

            <h3 style={subheading}>What wasn&apos;t done</h3>
            <p style={bodyText}>
              I didn&apos;t conduct user interviews before building. I didn&apos;t run usability tests on the signup flow or the globe interaction. The design decisions are reasoned from the brief, the style guide, and competitive analysis of how travel platforms organize discovery. Not from observed behavior with real users. Self-initiated timeline, no research budget. The decisions are reasoned, not tested. That&apos;s the honest gap.
            </p>
          </Section>

        </div>{/* /content wrapper */}

        {/* -- Figma source CTA -------------------------- */}
        <div
          style={{
            background:  "#1E1C3A",
            padding:     "80px clamp(24px, 5vw, 80px)",
          }}
        >
          <div style={{ maxWidth: "none", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "32px" }}>
            <div style={{ maxWidth: "640px" }}>
              <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D27A5E", margin: "0 0 12px" }}>
                Source
              </p>
              <p style={{ fontFamily: font.display, fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 500, color: "#F5F5F4", margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                The whole project lives in Figma.
              </p>
              <p style={{ fontFamily: font.sans, fontSize: "15px", lineHeight: 1.65, color: c.onNavyMuted, margin: 0 }}>
                Style guide, IA, signup flow, destination templates, and the design system tokens. The file is the source of truth; this case study is the editorial cut.
              </p>
            </div>
            <a
              href="https://www.figma.com/design/glE8OOm7wbnBsEqD0L4YWz/Wayfarer-Travel"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            "10px",
                padding:        "14px 32px",
                background:     "#D27A5E",
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
            marginTop:   "80px",
          }}
        >
          <div style={{ maxWidth: "none", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: c.muted, margin: "0 0 8px" }}>
                Next Case Study
              </p>
              <p style={{ fontFamily: font.display, fontSize: "clamp(20px, 3vw, 28px)", color: c.ink, margin: 0 }}>
                Men&apos;s Sole Revival
              </p>
            </div>
            <Link
              href="/work/mens-sole-revival"
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
  accent:    "var(--color-accent)",
  bg:        "#FFFFFF",
  bgSection: "#FAFAF9",
  surface:   "#FFFFFF",
  border:    "#A99B8A",
  navy:      "#3E3C78",
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
  maxWidth:   "780px",
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
