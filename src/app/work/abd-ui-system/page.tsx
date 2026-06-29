import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CaseStudySchema } from "@/components/structured-data/CaseStudySchema";
import { BreadcrumbSchema } from "@/components/structured-data/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "ABD UI · Production Design System",
  description:
    "Case study: A token-driven design system that ships. 120 components, 15 color tokens, and a role-based token architecture published to CSS, JSON, and Figma so design and code read from one source.",
  alternates: { canonical: "https://www.barreiro.com/work/abd-ui-system" },
  openGraph: {
    type: "article",
    url: "https://www.barreiro.com/work/abd-ui-system",
    title: "ABD UI · Production Design System",
    description:
      "A token-driven design system that ships. Role-based tokens published to CSS, JSON, and Figma so design and code read from one source.",
    images: ["/images/work/abd-ui-system/abd-money.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ABD UI · Production Design System",
    description:
      "A token-driven design system that ships. Role-based tokens published to CSS, JSON, and Figma so design and code read from one source.",
    images: ["/images/work/abd-ui-system/abd-money.png"],
  },
};

/* -------------------------------------------------
   Tokens (brand: Alpha Beta Design — cyan #06B6D4)
------------------------------------------------- */
const c = {
  ink:      "#252B28",
  body:     "#3D4440",
  // Deepened from #8A8680 (3.4:1) — passes 4.5:1 on white.
  muted:    "#5A5752",
  accent:   "#06B6D4", // ABD cyan
  bg:       "#FFFFFF",
  bgSection:"#F4F6F7", // cool slate; was #FAFAF9 warm cream
  surface:  "#FFFFFF",
  // Deepened from #E3E0DA (1.2:1) — passes 1.4.11 (3:1) for non-text UI.
  border:   "#A29C90",
  heroBg:   "#14181A",
  onDark:   "#F5F5F4",
  onDarkMut:"#C5C8C7",
};

const font = {
  display: "var(--font-dm-sans), -apple-system, sans-serif",
  sans:    "var(--font-dm-sans), -apple-system, sans-serif",
};

// Four meta rows so each cell holds its value cleanly. Methods +
// Timeline folded into Role + Status; Outcome lives in the hero
// paragraph already.
const META = [
  { label: "Role",     value: "Design Systems · UI · Ongoing" },
  { label: "Type",     value: "Alpha Beta Design · Production" },
  { label: "Status",   value: "Live · powers ABD client sites" },
  { label: "Methods",  value: "Tokens · Variants-by-States · Figma + Code" },
];

// Arrow glyphs in labels are decorative — they cue "jump down" /
// "external" visually. The DOWNSTREAM render wraps the glyph in an
// aria-hidden span so screen readers don't say "down arrow".
const DOWNSTREAM = [
  { glyph: "↓", label: "System overview", src: "/images/work/abd-ui-system/abd-overview.png", href: "#overview" },
  { glyph: "↓", label: "Color tokens",    src: "/images/work/abd-ui-system/abd-color.png",    href: "#tokens" },
  { glyph: "↓", label: "Components",      src: "/images/work/abd-ui-system/abd-buttons.png",  href: "#components" },
  { glyph: "↓", label: "Forms & states",  src: "/images/work/abd-ui-system/abd-forms.png",    href: "#components" },
  { glyph: "↗", label: "Live system",     src: "/images/work/abd-ui-system/abd-money.png",    href: "https://www.alphabeta.design/", external: true },
];

export default function Page() {
  return (
    <>
      <Nav />
      <CaseStudySchema
        name="ABD UI · Production Design System"
        description="A token-driven design system: 120 components, 15 color tokens, and a role-based token architecture published to CSS, JSON, and Figma so design and code read from one source."
        slug="abd-ui-system"
        dateCreated="2026-05"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.barreiro.com/" },
          { name: "Work", url: "https://www.barreiro.com/#work" },
          { name: "ABD UI · Production Design System", url: "https://www.barreiro.com/work/abd-ui-system" },
        ]}
      />

      <main id="main-content" style={{ background: c.bg }}>
        {/* Back link */}
        <div style={{ padding: "20px clamp(24px, 5vw, 80px) 0" }}>
          <Link href="/#work" style={{ fontFamily: font.sans, fontSize: "13px", color: c.muted, textDecoration: "none" }}>
            <span aria-hidden="true">&larr;</span> Back to work
          </Link>
        </div>

        {/* ── Hero ── */}
        <section
          aria-labelledby="cs-abd-hero-h1"
          style={{ background: c.heroBg, padding: "clamp(56px, 9vw, 110px) clamp(24px, 5vw, 80px)", position: "relative", overflow: "hidden" }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: c.accent }} />
          <div style={{ maxWidth: "none", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <span style={{ width: "24px", height: "1px", background: c.accent }} />
              <span style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: c.onDarkMut }}>
                Alpha Beta Design &middot; UX Case Study
              </span>
            </div>

            <h1 id="cs-abd-hero-h1" style={{ fontFamily: font.display, fontSize: "clamp(32px, 6vw, 64px)", fontWeight: 500, color: c.onDark, margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: "900px" }}>
              ABD UI: a design system that shipped, not a poster of one.
            </h1>

            <p style={{ fontFamily: font.sans, fontSize: "clamp(16px, 2.2vw, 20px)", lineHeight: 1.6, color: c.onDarkMut, margin: "0 0 40px", maxWidth: "660px" }}>
              One designer, every Alpha Beta Design project. The button has to get designed once. So I built a token-driven system that publishes to CSS, JSON, and Figma from a single source, and refuses one-off values. 120 components, 15 color tokens, one type scale, one accessibility floor.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", paddingTop: "32px", borderTop: "1px solid rgba(245,243,239,0.1)" }}>
              {META.map(({ label, value }) => (
                <div key={label} style={{ maxWidth: "260px" }}>
                  <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: c.onDarkMut, margin: "0 0 4px" }}>{label}</p>
                  <p style={{ fontFamily: font.sans, fontSize: "14px", color: c.onDark, margin: 0 }}>{value}</p>
                </div>
              ))}
            </div>

            {/* What's downstream */}
            <div style={{ marginTop: "56px", paddingTop: "32px", borderTop: "1px solid rgba(245,243,239,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <span style={{ width: "24px", height: "1px", background: c.accent }} />
                <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: c.onDarkMut, margin: 0 }}>
                  What&apos;s downstream
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
                {DOWNSTREAM.map(({ glyph, label, src, href, external }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={external ? `${label} (opens in new tab)` : label}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    style={{ display: "block", textDecoration: "none" }}
                  >
                    <div style={{ position: "relative", aspectRatio: "16 / 11", overflow: "hidden", background: "#0F161D", border: "1px solid rgba(245,243,239,0.22)" }}>
                      <Image src={src} alt="" fill sizes="(max-width: 767px) 50vw, 220px" style={{ objectFit: "cover", objectPosition: "center top" }} />
                    </div>
                    <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: c.onDarkMut, margin: "8px 0 0" }}>
                      <span aria-hidden="true" style={{ marginRight: "6px" }}>{glyph}</span>{label}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Body ── */}
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "clamp(48px, 8vw, 96px) clamp(24px, 5vw, 80px)" }}>

          {/* TL;DR */}
          <div style={{ background: c.bgSection, border: `1px solid ${c.border}`, borderLeft: `3px solid ${c.accent}`, padding: "clamp(24px, 4vw, 40px)", marginBottom: "64px" }}>
            <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: c.accent, margin: "0 0 16px" }}>TL;DR</p>
            <dl style={{ margin: 0 }}>
              {[
                ["The problem", "As a one-person studio, I rebuild the same buttons, inputs, and tokens on every client project. Done by hand, they drift: a spacing value here, a hard-coded hex there, and consistency erodes as the work scales."],
                ["What I built", "A token-driven system. Role-based tokens at the surface, a variants-by-states component matrix, and one source of truth that publishes to CSS, JSON, and Figma so design and code never read from different files."],
                ["The decision that matters", "Role-based tokens over a pure literal palette. The literal version was simpler until dark mode, which would have meant renaming every component reference. Role-based naming makes a theme swap a one-file change."],
                ["Outcome", "Live and powering Alpha Beta Design client builds. 120 components, 15 color tokens, four output formats from one source, and an accessibility floor verified by automated check, not designer memory."],
                ["Role", "Solo. Token architecture, component API, Figma library, and the build pipeline."],
              ].map(([k, v]) => (
                <div key={k} style={{ marginBottom: "14px" }}>
                  <dt style={{ fontFamily: font.sans, fontSize: "13px", fontWeight: 700, color: c.ink, marginBottom: "2px" }}>{k}</dt>
                  <dd style={{ fontFamily: font.sans, fontSize: "15px", lineHeight: 1.6, color: c.body, margin: 0 }}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <Section id="problem" label="01" title="The problem">
            <p style={bodyText}>
              Alpha Beta Design ships fast: launchpad sites in two weeks, growth flagships in a month, brand systems in between. One person does all of it. At that pace, the expensive thing isn&apos;t the hero or the headline. It&apos;s the hundredth time you redraw a button, a focus ring, or an error state, slightly differently than the last time, because nothing remembers the last decision.
            </p>
            <p style={bodyText}>
              Hand-built UI drifts. A spacing value that should be 16 becomes 15. A color gets pasted as a hex instead of referenced as a token. None of it is visible in a single screen. All of it is visible across twelve client sites. The system exists to make &quot;production-grade&quot; the default, not a thing you remember to do.
            </p>
          </Section>

          <Section id="constraints" label="02" title="Constraints">
            <p style={bodyText}>
              The constraints set the bar, and the bar was non-negotiable:
            </p>
            <ul style={listStyle}>
              <li style={liStyle}><strong>One source of truth.</strong> Tokens live in one place. Everything else reads from it. No second copy of the truth in a Figma swatch panel.</li>
              <li style={liStyle}><strong>One component contract.</strong> A button is defined by its variants and states, not by which screen it sits on. No per-page one-offs.</li>
              <li style={liStyle}><strong>One accessibility floor.</strong> Contrast, focus rings, and reduced-motion are guaranteed by the system, not checked by hand at the end.</li>
              <li style={liStyle}><strong>Solo-maintainable.</strong> If it takes a team to keep it alive, it&apos;s the wrong system for this studio.</li>
            </ul>
          </Section>

          <Figure src="/images/work/abd-ui-system/abd-overview.png" alt="ABD UI system overview: typography, color tokens, spacing, iconography, buttons, inputs, controls, links and badges, and token output." caption="System overview. Nine sections on one board: type scale, 15 color tokens, spacing, iconography, the button matrix, inputs, controls, links and badges, and the token output." id="overview" />

          <Section id="decisions" label="03" title="Decisions, and what each one cost">
            <p style={bodyText}>
              A design system is a pile of small bets about what will change later. Four of them carried the weight.
            </p>

            <h3 style={subheading}>Role-based tokens over a literal palette</h3>
            <p style={bodyText}>
              The first build used a pure literal scheme: <code style={code}>slate-500</code>, <code style={code}>cyan-400</code>, referenced directly in components. It was simpler to read and faster to ship. It broke the moment I tried dark mode, because every component pointed at a literal value, and dark-mode parity meant renaming all of them.
            </p>
            <p style={bodyText}>
              So tokens are role-based at the surface: <code style={code}>--color-surface</code>, <code style={code}>--color-border</code>, <code style={code}>--color-muted</code>, <code style={code}>--color-text</code>, <code style={code}>--color-accent</code>, and literal only at the palette underneath. <strong>Cost:</strong> an extra semantic layer to maintain. <strong>Benefit:</strong> a theme swap is a one-file change, and nothing downstream has to know.
            </p>

            <Figure src="/images/work/abd-ui-system/abd-color.png" alt="The 15-value color token grid with hex values and role names." caption="15 color tokens. Role names at the surface, literal palette underneath. The accent, semantic, and neutral roles a product actually consumes." id="tokens" />

            <h3 style={subheading}>A variants-by-states matrix, not per-screen components</h3>
            <p style={bodyText}>
              Every interactive component is scoped to a matrix: Primary / Secondary / Tertiary / Ghost crossed with Default / Hover / Focus / Disabled. Inputs are documented through their failure states, not just their happy path. <strong>Cost:</strong> the combinatorial work is heavy up front. <strong>Benefit:</strong> a new screen composes from finished states instead of generating fresh decisions, so nothing gets invented at 4pm on a deadline.
            </p>

            <Figure src="/images/work/abd-ui-system/abd-buttons.png" alt="Button variants crossed with interaction states." caption="The button, designed once. Four variants by four states, defined in the system so no screen redraws them." id="components" />
            <Figure src="/images/work/abd-ui-system/abd-forms.png" alt="Inputs and controls including default, filled, and error states, checkboxes, radios, switch, and slider." caption="Inputs documented through failure. Default, filled, and error, plus the full control set, so the empty and broken states aren&apos;t an afterthought." />

            <h3 style={subheading}>One source, four formats</h3>
            <p style={bodyText}>
              Tokens are authored once and exported to CSS custom properties, TypeScript semantic aliases, JSON, and a Figma library. The architecture runs three tiers: CSS variables as the source of truth, TypeScript aliases for brand-aware naming, and Tailwind utilities consumed in components. <strong>Cost:</strong> a build step to maintain. <strong>Benefit:</strong> design and code never drift, because they read from the same file. One change propagates to every format in a single pull request.
            </p>

            <Figure src="/images/work/abd-ui-system/abd-type.png" alt="The type scale from display to caption with font, size, line height, and tracking." caption="One type scale. Fraunces for display, Plus Jakarta for body, each role defined with its size, line height, and tracking." />

            <h3 style={subheading}>Accessibility as a floor, not a review</h3>
            <p style={bodyText}>
              The accessibility floor, 4.5:1 contrast, visible focus rings, and reduced-motion support, is verified by automated check, not by remembering to look. <strong>Cost:</strong> test setup. <strong>Benefit:</strong> it can&apos;t be forgotten, and it doesn&apos;t depend on me being careful on the day.
            </p>

            <Figure src="/images/work/abd-ui-system/abd-icons.png" alt="Iconography on a 24pt grid, link states, badges, and the tokens.css output." caption="Icons on a 24pt grid at 1.5 stroke, link and badge states, and the token output that compiles to CSS, TS, JSON, and Figma." />
          </Section>

          <Section id="outcomes" label="04" title="Outcomes &amp; what good looks like">
            <p style={bodyText}>
              This is a production system, not a concept, so the measures are operational, not vanity metrics:
            </p>
            <ul style={listStyle}>
              <li style={liStyle}><strong>120 components, 15 color tokens, one type scale, 16 icons,</strong> all consumed across Alpha Beta Design client builds from one library.</li>
              <li style={liStyle}><strong>Four output formats from one source.</strong> A token change propagates to CSS, TypeScript, JSON, and Figma in a single pull request.</li>
              <li style={liStyle}><strong>A new component lands in the library within an hour of design lock,</strong> because it composes from existing tokens and states.</li>
              <li style={liStyle}><strong>The accessibility floor is verified automatically,</strong> so contrast, focus, and motion aren&apos;t re-litigated per project.</li>
            </ul>
            <Callout label="The discipline">
              The system isn&apos;t the components. It&apos;s refusing one-off values: every spacing and color decision routes back to a token. That&apos;s the unglamorous work that keeps a product consistent as it grows.
            </Callout>
          </Section>

          <Section id="limits" label="05" title="What I&apos;d watch">
            <p style={bodyText}>
              The honest limits. A solo-maintained system is fast to evolve and fragile to a bus factor of one: the architecture is documented, but the judgment about when to add a component versus compose one lives mostly in my head. The token layer is proven across marketing and brand sites; it has not yet been stress-tested by a dense, data-heavy product UI, which is where role-based tokens earn or lose their keep. That&apos;s the next thing I&apos;d pressure-test.
            </p>
          </Section>

          <NextCase />
        </div>
      </main>
      <Footer />
    </>
  );
}

/* -------------------------------------------------
   Helpers
------------------------------------------------- */
function Section({ id, label, title, children }: { id?: string; label: string; title: string; children: React.ReactNode }) {
  // Section is named by its <h2> via aria-labelledby; aria-label would
  // duplicate the announcement. Each H2 gets a derived id from the
  // section id so the relationship is explicit.
  const headingId = id ? `${id}-h2` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} style={{ paddingBottom: "16px", borderTop: `1px solid ${c.border}`, marginTop: "48px", scrollMarginTop: "96px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "16px", margin: "32px 0" }}>
        <span style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: c.accent }}>{label}</span>
        <h2 id={headingId} style={{ fontFamily: font.display, fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 500, color: c.ink, margin: 0, letterSpacing: "-0.025em" }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Figure({ src, alt, caption, id }: { src: string; alt: string; caption: string; id?: string }) {
  return (
    <figure id={id} style={{ margin: "36px 0", scrollMarginTop: "96px" }}>
      <div style={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden", background: c.bgSection, border: `1px solid ${c.border}` }}>
        <Image src={src} alt={alt} fill sizes="(max-width: 1080px) 100vw, 1080px" style={{ objectFit: "cover", objectPosition: "center top" }} />
      </div>
      <figcaption style={{ fontFamily: font.sans, fontSize: "13px", lineHeight: 1.6, color: c.muted, margin: "12px 0 0", maxWidth: "780px" }}>{caption}</figcaption>
    </figure>
  );
}

function Callout({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <blockquote style={{ margin: "32px 0", padding: "24px 28px", background: c.surface, border: `1px solid ${c.border}`, borderLeft: `3px solid ${c.accent}` }}>
      {label && (
        <p style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: c.accent, margin: "0 0 10px" }}>{label}</p>
      )}
      <p style={{ fontFamily: font.display, fontSize: "clamp(17px, 2.2vw, 20px)", lineHeight: 1.5, color: c.ink, fontStyle: "italic", margin: 0 }}>{children}</p>
    </blockquote>
  );
}

function NextCase() {
  return (
    <section style={{ borderTop: `1px solid ${c.border}`, marginTop: "64px", paddingTop: "40px" }}>
      <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: c.muted, margin: "0 0 12px" }}>Next case study</p>
      <Link href="/work/mens-sole-revival" style={{ fontFamily: font.display, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 500, color: c.ink, textDecoration: "none", letterSpacing: "-0.02em" }}>
        Men&apos;s Sole Revival: a foot health resource for men over 40. &rarr;
      </Link>
    </section>
  );
}

/* shared styles */
const bodyText: React.CSSProperties = {
  fontFamily: font.sans, fontSize: "16px", lineHeight: 1.75, color: c.body, margin: "0 0 20px", maxWidth: "780px",
};
const subheading: React.CSSProperties = {
  // Dropped from 20px to 18px so the H3 sits clearly below the
  // parent H2 (clamp 26-36px) at every viewport.
  fontFamily: font.sans, fontSize: "18px", fontWeight: 600, color: c.ink, margin: "40px 0 16px", letterSpacing: "-0.015em",
};
const listStyle: React.CSSProperties = { margin: "0 0 20px", paddingLeft: "20px", maxWidth: "780px" };
const liStyle: React.CSSProperties = { fontFamily: font.sans, fontSize: "16px", lineHeight: 1.7, color: c.body, marginBottom: "10px" };
const code: React.CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "13px", background: c.bgSection, border: `1px solid ${c.border}`, padding: "1px 6px", borderRadius: "3px", color: c.ink,
};
