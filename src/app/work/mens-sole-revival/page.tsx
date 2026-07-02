import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RelatedCaseStudies from "@/components/RelatedCaseStudies";
import ScrollProgress from "@/components/ScrollProgress";
import { CaseStudySchema } from "@/components/structured-data/CaseStudySchema";
import { BreadcrumbSchema } from "@/components/structured-data/BreadcrumbSchema";
import DiagnosticFlowDemo from "./_demo/DiagnosticFlowDemo";

/* ---------------------------------------------------------------------------
   /work/mens-sole-revival-v2

   Pentagram-inspired rebuild of the MSR case study. Image-first, big-three
   structure (Problem / Bet / Shipped) with decision callouts. Lives at /v2
   while in flight; current /work/mens-sole-revival stays untouched. Swap
   when signed off.

   Voice: all body + callout copy ran through the voice-writing skill before
   landing here (see Voice Profile · 2026-06-16).
--------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Men’s Sole Revival · Foot Health Content Platform",
  description:
    "Case study: a male-specific foot-health editorial resource. Pivoted from e-commerce to content authority in week 3. Live since April 2026 at menssolerevival.com.",
  alternates: { canonical: "https://www.barreiro.com/work/mens-sole-revival" },
  openGraph: {
    type: "article",
    url: "https://www.barreiro.com/work/mens-sole-revival",
    title: "Men’s Sole Revival · Foot Health Content Platform",
    description:
      "Case study: a male-specific foot-health editorial resource. Pivoted from e-commerce to content authority in week 3. Live since April 2026 at menssolerevival.com.",
    images: ["/work/mens-sole-revival/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Men’s Sole Revival · Foot Health Content Platform",
    description:
      "Case study: a male-specific foot-health editorial resource. Pivoted from e-commerce to content authority in week 3. Live since April 2026 at menssolerevival.com.",
    images: ["/work/mens-sole-revival/opengraph-image"],
  },
};

const c = {
  // Match the home pattern: white page surface with a subtle off-white box.
  // Previously #FAFAF9 cream surface, which gave a warm editorial feel but
  // didn't match the home About section. Switched to white so case-study
  // chrome reads the same as the home throughout the site.
  surface:  "#FFFFFF",
  ink:      "#252B28",
  ink2:     "#3D4440",
  // Deepened from #8A8680 (3.4:1) → 7.0:1 on white. Passes WCAG AA body.
  muted:    "#5A5752",
  brand:    "var(--color-brand)",   // C: crimson — runtime-swappable
  accent:   "var(--color-accent)",  // C: deep teal
  accent2:  "var(--color-accent-hover)",
  // Borders at #8A8680 (3.4:1 on white) for the default boundary;
  // #7A7670 (4.7:1) for Tag pill borders that also sit on the
  // #FAFAF9 callout. Both pass WCAG 1.4.11.
  border:        "#8A8680",
  borderStrong:  "#7A7670",
  // Off-white box on white surface — identical to the home About skills box.
  callout:       "#FAFAF9",
};

const font = {
  sans: "var(--font-dm-sans), -apple-system, sans-serif",
};

const SECTION_X = "clamp(24px, 6vw, 80px)";
const CONTENT_MAX = "1240px";
const PROSE_MAX   = "680px";

/* ---------- small atoms ---------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
      <span style={{ display: "inline-block", width: "32px", height: "1px", background: c.accent }} />
      <span style={{
        fontFamily:    font.sans,
        fontSize:      "11px",
        fontWeight:    600,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color:         c.accent,
      }}>
        {children}
      </span>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily:    font.sans,
      fontSize:      "11px",
      fontWeight:    500,
      letterSpacing: "0.10em",
      textTransform: "uppercase",
      color:         c.ink2,
      padding:       "6px 14px",
      border:        `1px solid ${c.borderStrong}`,
    }}>
      {children}
    </span>
  );
}

/* Arc divider — marks the transition between major case-study acts
   (Premise → Research → Decisions → Details). Same pattern as Spotify
   + Wayfarer; uses MSR brand crimson as the label color. */
function ArcDivider({ arc }: { arc: string }) {
  return (
    <div
      role="separator"
      aria-label={`${arc} arc begins`}
      style={{
        display:        "flex",
        alignItems:     "center",
        gap:            "20px",
        maxWidth:       CONTENT_MAX,
        margin:         "clamp(48px, 10vw, 120px) auto clamp(32px, 6vw, 80px)",
        padding:        `0 ${SECTION_X}`,
      }}
    >
      <span style={{ flex: 1, height: "1px", background: c.borderStrong }} />
      <span style={{
        fontFamily:     font.sans,
        fontSize:       "11px",
        fontWeight:     700,
        letterSpacing:  "0.30em",
        textTransform:  "uppercase",
        color:          c.brand,
        whiteSpace:     "nowrap",
      }}>{arc}</span>
      <span style={{ flex: 1, height: "1px", background: c.borderStrong }} />
    </div>
  );
}

/* Academic-category pill — sits UNDER each chapter title to restore
   the skim-friendly Premise / Research / Decisions / Details arc.
   Crimson filled pill differentiates from the bordered Tag pills (work
   dimensions). Square border = work dimension; rounded crimson = arc
   category. Per case-study brand parity: Spotify=green, Wayfarer=navy,
   MSR=crimson. */
/* CategoryPill removed. The sticky arc nav + ArcDivider already
   announce which act the reader is in; Eyebrow + Tag pills label the
   section. Three "you are here" badges per section was scaffolding the
   reader didn't need. Same call we made on Spotify + Wayfarer. */

/* Decision callout — signature element across every case study.
   Three-stack left bar (crimson / Deep Teal / ink) is the visual
   wordmark; the Decision/Why/Cost structure is the editorial
   pattern. Why and Cost sit side-by-side on desktop so the trade-off
   reads as one thought. */
function Callout({
  decision, why, cost,
}: { decision: string; why: string; cost: string }) {
  const labelStyle: React.CSSProperties = {
    fontFamily:    font.sans,
    fontSize:      "10px",
    fontWeight:    700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color:         c.accent,
    margin:        "0 0 10px",
  };
  const bodyStyle: React.CSSProperties = {
    fontFamily: font.sans,
    fontSize:   "15px",
    lineHeight: 1.7,
    color:      c.ink2,
    margin:     0,
  };
  return (
    <aside className="msr2-callout" style={{
      background:   "#FFFFFF",
      border:       `1px solid ${c.border}`,
      padding:      "32px 36px 32px 44px",
      maxWidth:     "760px",
      marginTop:    "40px",
      position:     "relative",
    }}>
      <span aria-hidden="true" style={{
        position: "absolute", left: 0, top: 28, bottom: 28,
        width: "5px",
        display: "grid",
        gridTemplateRows: "1fr 1fr 1fr",
      }}>
        <span style={{ background: c.brand }} />
        <span style={{ background: c.accent }} />
        <span style={{ background: c.ink }} />
      </span>
      <p style={labelStyle}>Decision</p>
      <p style={{
        fontFamily:    font.sans,
        fontSize:      "clamp(22px, 2.2vw, 26px)",
        fontWeight:    600,
        color:         c.ink,
        margin:        "0 0 28px",
        letterSpacing: "-0.015em",
        lineHeight:    1.25,
      }}>
        {decision}
      </p>
      <div className="msr2-callout-grid" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "32px",
      }}>
        <div>
          <p style={labelStyle}>Why</p>
          <p style={bodyStyle}>{why}</p>
        </div>
        <div>
          <p style={labelStyle}>Cost</p>
          <p style={bodyStyle}>{cost}</p>
        </div>
      </div>
    </aside>
  );
}

/* Full-bleed image wrapper.
   `cropAspect` shows only the TOP portion of tall captures so the hero
   of the captured page lands first; pass null to show the natural image. */
function HeroImage({
  src, alt, cropAspect, priority = false,
}: { src: string; alt: string; cropAspect?: string | null; priority?: boolean }) {
  if (cropAspect) {
    return (
      <div style={{
        width:        "100%",
        maxWidth:     CONTENT_MAX,
        margin:       "0 auto",
        aspectRatio:  cropAspect,
        position:     "relative",
        overflow:     "hidden",
        background:   c.ink,
        border:       `1px solid ${c.border}`,
      }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1240px) 100vw, 1240px"
          style={{
            objectFit:      "cover",
            objectPosition: "top center",
          }}
        />
      </div>
    );
  }
  // Natural aspect — use width/height with intrinsic sizing
  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
      <Image
        src={src}
        alt={alt}
        width={2880}
        height={2048}
        priority={priority}
        sizes="(max-width: 1240px) 100vw, 1240px"
        style={{
          width:  "100%",
          height: "auto",
          display: "block",
          border:  `1px solid ${c.border}`,
        }}
      />
    </div>
  );
}

/* ---------- page ---------- */

export default function MSRv2() {
  return (
    <>
      <Nav />
      <CaseStudySchema
        name="Men's Sole Revival · Foot Health Content Platform"
        description="Client case study: a male-specific foot-health editorial resource. Pivoted from e-commerce to content authority in week three. Live since April 2026 at menssolerevival.com."
        slug="mens-sole-revival"
        dateCreated="2026-04"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.barreiro.com/" },
          { name: "Work", url: "https://www.barreiro.com/#work" },
          { name: "Men's Sole Revival", url: "https://www.barreiro.com/work/mens-sole-revival" },
        ]}
      />

      <main id="main-content" style={{ background: c.surface, paddingTop: "72px" }}>

        {/* ─────────────────────────────────────────────
            Title block — Pentagram-style: meta, title,
            one-liner, tags, live link. No image yet.
        ───────────────────────────────────────────── */}
        <header style={{
          maxWidth: CONTENT_MAX,
          margin:   "0 auto",
          padding:  `clamp(56px, 12vw, 120px) ${SECTION_X} clamp(40px, 8vw, 80px)`,
        }}>
          <Eyebrow>Project · 2026</Eyebrow>

          <h1 style={{
            fontFamily:    font.sans,
            fontSize:      "clamp(36px, 10vw, 96px)",
            fontWeight:    500,
            color:         c.ink,
            margin:        "0 0 32px",
            letterSpacing: "-0.03em",
            lineHeight:    1,
            maxWidth:      "13ch",
          }}>
            Men&apos;s Sole <span style={{ color: c.brand }}>Revival</span>
          </h1>

          <p style={{
            fontFamily:    font.sans,
            fontSize:      "clamp(20px, 2.4vw, 26px)",
            lineHeight:    1.45,
            fontWeight:    400,
            color:         c.ink2,
            maxWidth:      "640px",
            margin:        "0 0 40px",
            letterSpacing: "-0.005em",
          }}>
            A diagnostic-first foot-health resource for men over 40. Research, assessment redesign, brand identity, and a production design system.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "40px" }}>
            <Tag>Brand Identity</Tag>
            <Tag>Content UX</Tag>
            <Tag>Design System</Tag>
            <Tag>Editorial</Tag>
          </div>

          <a
            href="https://www.menssolerevival.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            "10px",
              fontFamily:     font.sans,
              fontSize:       "13px",
              fontWeight:     600,
              letterSpacing:  "0.10em",
              textTransform:  "uppercase",
              color:          c.accent2,
              textDecoration: "none",
              borderBottom:   `1px solid ${c.accent}`,
              paddingBottom:  "2px",
            }}
          >
            menssolerevival.com →
          </a>
        </header>

        {/* Sticky arc nav — pinned below page Nav once the reader scrolls
            into the content arcs. Jumps between Premise / Research /
            Decisions / Details. Sticky on desktop+tablet; fixed fallback
            at mobile (see media query in style block) because global
            `main { display: flex }` makes sticky unreliable at small
            viewports. */}
        <nav
          aria-label="Case study arcs"
          className="msr2-arc-nav"
          style={{
            position:       "sticky",
            top:            "72px",
            zIndex:         10,
            alignSelf:      "stretch",
            flexShrink:     0,
            width:          "100%",
            background:     "rgba(255, 255, 255, 0.94)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderTop:      `1px solid ${c.border}`,
            borderBottom:   `1px solid ${c.border}`,
            padding:        "14px 0",
          }}
        >
          <ul style={{
            display: "flex", gap: "clamp(16px, 3vw, 32px)", justifyContent: "center",
            margin: 0, padding: `0 ${SECTION_X}`, listStyle: "none", flexWrap: "wrap",
          }}>
            {[
              { key: "premise",   label: "Premise"   },
              { key: "research",  label: "Research"  },
              { key: "decisions", label: "Decisions" },
              { key: "details",   label: "Details"   },
            ].map((arc, i) => (
              <li key={arc.key}>
                <a
                  href={`#arc-${arc.key}`}
                  data-arc-anchor={arc.key}
                  style={{
                    fontFamily:     font.sans,
                    fontSize:       "13px",
                    fontWeight:     600,
                    letterSpacing:  "0.06em",
                    textTransform:  "uppercase",
                    color:          c.ink2,
                    textDecoration: "none",
                    display:        "inline-flex",
                    alignItems:     "baseline",
                    gap:            "8px",
                    padding:        "4px 0",
                    borderBottom:   "2px solid transparent",
                    transition:     "color 0.2s ease, border-color 0.2s ease",
                  }}
                >
                  <span style={{ opacity: 0.55, fontVariantNumeric: "tabular-nums" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {arc.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            if (typeof window === "undefined") return;
            var NAV_STACK_HEIGHT = 140;
            function wire() {
              var anchors = document.querySelectorAll('a[data-arc-anchor]');
              if (!anchors.length) return false;
              var targets = ['premise', 'research', 'decisions', 'details']
                .map(function (k) { return document.getElementById('arc-' + k); })
                .filter(Boolean);
              if (targets.length < 4) return false;
              var map = {};
              anchors.forEach(function (a) { map[a.getAttribute('data-arc-anchor')] = a; });
              var obs = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) {
                  var key = e.target.id.replace('arc-', '');
                  var anchor = map[key];
                  if (!anchor) return;
                  if (e.isIntersecting) {
                    anchors.forEach(function (a) { a.removeAttribute('data-active'); });
                    anchor.setAttribute('data-active', 'true');
                  }
                });
              }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
              targets.forEach(function (t) { obs.observe(t); });

              /* Programmatic click handler — computes exact scroll
                 position so all four arcs land at the same distance
                 below the sticky arc-nav. Without this, clicking 01
                 Premise from the top of the page landed lower than
                 clicking 02/03/04 because the arc-nav hadn't yet
                 crossed its sticky threshold. */
              anchors.forEach(function (a) {
                a.addEventListener('click', function (ev) {
                  var key = a.getAttribute('data-arc-anchor');
                  var target = document.getElementById('arc-' + key);
                  if (!target) return;
                  ev.preventDefault();
                  anchors.forEach(function (x) { x.removeAttribute('data-active'); });
                  a.setAttribute('data-active', 'true');
                  var y = target.getBoundingClientRect().top + window.scrollY - NAV_STACK_HEIGHT;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                  if (history && history.replaceState) history.replaceState(null, '', '#arc-' + key);
                });
              });

              /* Deep-link + back/forward hashchange sync — matches the
                 pattern the Spotify chip nav uses so external
                 #arc-decisions links (from resume PDFs, Slack forwards,
                 SEO snippets) land with the right chip painted and
                 scroll to the target through our custom nav-stack math. */
              function syncFromHash() {
                var m = /^#arc-(premise|research|decisions|details)$/.exec(window.location.hash || '');
                if (!m) return;
                var key = m[1];
                var target = document.getElementById('arc-' + key);
                if (!target) return;
                anchors.forEach(function (x) { x.removeAttribute('data-active'); });
                if (map[key]) map[key].setAttribute('data-active', 'true');
                var y = target.getBoundingClientRect().top + window.scrollY - NAV_STACK_HEIGHT;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
              window.addEventListener('hashchange', syncFromHash);
              if (window.location.hash) setTimeout(syncFromHash, 200);
              return true;
            }
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
              if (!wire()) requestAnimationFrame(function () { requestAnimationFrame(wire); });
            } else {
              document.addEventListener('DOMContentLoaded', wire);
            }
          })();
        ` }} />
        <style>{`
          .msr2-arc-nav a[data-active] {
            color: var(--color-brand) !important;
            border-bottom-color: var(--color-brand) !important;
            border-bottom-width: 3px !important;
            font-weight: 700 !important;
          }
          .msr2-arc-nav a[data-active] span:first-child {
            opacity: 1 !important;
            color: var(--color-brand) !important;
          }
          .msr2-arc-nav a:hover { color: ${c.ink}; }
          @media (max-width: 760px) {
            .msr2-arc-nav {
              position: fixed !important;
              left: 0 !important;
              right: 0 !important;
              top: 72px !important;
              padding: 6px 0 !important;
            }
            .msr2-arc-nav ul { gap: 8px !important; }
            /* Mobile: kill underlines and use a filled chip for the
               current section. Underlines on a compact strip read as
               busy; a solid pill reads instantly. */
            .msr2-arc-nav a  {
              font-size: 11px !important;
              padding: 6px 10px !important;
              border-bottom: none !important;
              color: ${c.muted} !important;
              transition: background 0.15s ease, color 0.15s ease !important;
            }
            .msr2-arc-nav a[data-active] {
              background: var(--color-brand) !important;
              color: #FFFFFF !important;
              border-bottom: none !important;
              font-weight: 700 !important;
            }
            /* Hide 01/02/03 numerals on phones — they crowd the chip text. */
            .msr2-arc-nav a span:first-child { display: none !important; }
            .msr2-arc-nav + script + style + div { padding-top: 36px !important; }
          }
        `}</style>

        {/* ── PREMISE arc tint ─ */}
        <div id="arc-premise" style={{ background: "#EEF2F6", marginTop: "24px", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)", scrollMarginTop: "140px" }}>

        {/* ─────────────────────────────────────────────
            Hero image — full homepage capture, cropped
            to top portion so the hero lands first.
        ───────────────────────────────────────────── */}
        <section aria-label="Hero" style={{ padding: `0 ${SECTION_X} 120px` }}>
          <HeroImage
            src="/images/work/msr/v2/homepage-live.jpg"
            alt="Men’s Sole Revival homepage. diagnostic-first hero with assessment CTA and editorial article grid."
            cropAspect="16 / 10"
            priority
          />
        </section>

        {/* ─────────────────────────────────────────────
            Pull quote — full-width, generous breathing
        ───────────────────────────────────────────── */}
        <section aria-label="Premise quote" style={{
          maxWidth: CONTENT_MAX,
          margin:   "0 auto",
          padding:  `40px ${SECTION_X} 120px`,
        }}>
          <p style={{
            fontFamily:    font.sans,
            fontSize:      "clamp(28px, 4vw, 44px)",
            fontWeight:    500,
            color:         c.brand,
            margin:        0,
            lineHeight:    1.25,
            letterSpacing: "-0.015em",
            maxWidth:      "900px",
          }}>
            &ldquo;The middle, where someone could teach men what&rsquo;s happening to their feet and what to do about it, didn&rsquo;t exist.&rdquo;
          </p>
        </section>

        {/* ─────────────────────────────────────────────
            §01 — The problem
        ───────────────────────────────────────────── */}
        <BigThree
          number="01"
          heading="The problem"
          image="/images/work/msr/v2/assessment-intro.jpg"
          imageAlt="Assessment intro page — &ldquo;The Men&rsquo;s Foot Health Assessment.&rdquo; 5-minute self-check with the SEE A DOCTOR IF triage box and three real numbers (77%, 1 in 3, 63–72%)."
          imageCrop={null}
          body={
            <>
              Men over 40 quietly Google their foot problems. Clinical sites scare them. Commerce sites push to them. The middle, where someone could teach them what&rsquo;s happening and what to do about it, didn&rsquo;t exist. The articles that ranked were written for women, repackaged with a stock photo of a guy.
            </>
          }
          callout={{
            decision: "Pivot from e-commerce to editorial in week 3.",
            why:      "Three weeks of margin modeling kept pointing to the same answer. The friction wasn’t execution. It was the starting point. These men don’t need a product. They need a reason to start paying attention.",
            cost:     "Threw out the Shopify spec. Restarted the IA from scratch.",
          }}
        />

        </div>
        {/* ─ end PREMISE arc tint */}

        <ArcDivider arc="Research" />

        {/* ── RESEARCH arc tint ─ */}
        <div id="arc-research" style={{ background: "#EFEAF2", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)", scrollMarginTop: "140px" }}>

        {/* ─────────────────────────────────────────────
            Research strip — compact bridge between §01
            and §02. Names the three-week arc that landed
            on the pivot. Visible at-a-glance.
        ───────────────────────────────────────────── */}
        <section aria-label="Research strip" style={{ padding: `0 0 80px` }}>
          <ResearchStrip />
        </section>

        </div>
        {/* ─ end RESEARCH arc tint */}

        <ArcDivider arc="Decisions" />

        {/* ── DECISIONS arc tint ─ */}
        <div id="arc-decisions" style={{ background: "#E8EEEC", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)", scrollMarginTop: "140px" }}>

        {/* ─────────────────────────────────────────────
            §02 — The bet (inlined; uses a code-rendered
            pivot infographic — before/after with cognac
            arrow — so the visual and the body actually
            agree on the *decision* not the geometry)
        ───────────────────────────────────────────── */}
        <section aria-label="The bet" style={{ padding: `0 0 120px` }}>
          <div style={{ padding: `0 ${SECTION_X} 64px` }}>
            <PivotInfographic />
          </div>

          <div style={{ padding: `0 ${SECTION_X}` }}>
            <div style={{
              maxWidth:            CONTENT_MAX,
              margin:              "0 auto",
              display:             "grid",
              gridTemplateColumns: "1fr 1.6fr",
              gap:                 "64px",
              alignItems:          "start",
            }} className="msr2-row">
              <div>
                <span style={{
                  fontFamily:    font.sans,
                  fontSize:      "11px",
                  fontWeight:    700,
                  letterSpacing: "0.20em",
                  color:         c.accent,
                  display:       "block",
                  marginBottom:  "12px",
                }}>02</span>
                <h2 style={{
                  fontFamily:    font.sans,
                  fontSize:      "clamp(32px, 4vw, 48px)",
                  fontWeight:    600,
                  color:         c.ink,
                  margin:        0,
                  letterSpacing: "-0.025em",
                  lineHeight:    1.05,
                }}>
                  The bet.
                </h2></div>

              <div>
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "clamp(16px, 1.6vw, 18px)",
                  lineHeight: 1.75,
                  color:      c.ink2,
                  margin:     0,
                  maxWidth:   PROSE_MAX,
                }}>
                  Build a male-specific foot-health resource at the intersection of clinical, wellness, and product-first. The first plan was e-commerce. Three weeks into margin modeling, the research kept pointing at the same thing: information, not products. I pivoted to content authority and used e-commerce UX patterns to frame editorial decisions.
                </p>
                <Callout
                  decision="Triangle positioning over standard niche framing."
                  why="A &ldquo;men&rsquo;s wellness blog&rdquo; already has 100 competitors. The intersection of male-specific × clinical × product-first is where the audience actually lives. Nothing else occupies it."
                  cost="Harder to explain in one line. SEO targeting needs three keyword pillars instead of one."
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            Brand identity — built in code (type sample +
            color swatches) so the brand reads on the page
            without a separate exported visual.
        ───────────────────────────────────────────── */}
        <section aria-label="Brand identity" style={{ padding: `0 0 120px` }}>
          <div style={{ padding: `0 ${SECTION_X} 64px` }}>
            <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
              <div style={{
                background:          "#13100C",
                padding:             "clamp(40px, 6vw, 80px) clamp(28px, 5vw, 64px)",
                display:             "grid",
                gridTemplateColumns: "1fr 1fr",
                gap:                 "48px",
                alignItems:          "center",
                border:              `1px solid ${c.border}`,
              }} className="msr2-brand-grid">
                {/* Left: wordmark + voice line. The old twin-feet mark was
                    removed (legacy brand asset, not the current MSR lockup).
                    Typographic-only card now — Barlow Condensed carries
                    the identity without any feet imagery. */}
                <div>
                  {/* Decorative wordmark, not a document heading.
                      Rendered as styled <p> so the document outline
                      stays h1 -> h2 -> h2 without an h3 breaking the
                      hierarchy mid-section. */}
                  <p style={{
                    fontFamily:    "var(--font-barlow-condensed), 'Barlow Condensed', Impact, sans-serif",
                    fontSize:      "clamp(40px, 9vw, 96px)",
                    fontWeight:    800,
                    color:         "#F5F0E8",
                    margin:        0,
                    letterSpacing: "0.01em",
                    lineHeight:    0.92,
                    textTransform: "uppercase",
                  }}>
                    Men&rsquo;s<br/>Sole<br/>Revival
                  </p>
                  <p style={{
                    fontFamily:    "var(--font-lora), Lora, Georgia, serif",
                    fontSize:      "clamp(15px, 1.6vw, 18px)",
                    color:         "#C4703A",
                    fontStyle:     "italic",
                    margin:        "24px 0 0",
                    lineHeight:    1.45,
                    letterSpacing: "-0.005em",
                    maxWidth:      "32ch",
                  }}>
                    &ldquo;After years of neglect, men over 40 finally have a place to start.&rdquo;
                  </p>
                </div>

                {/* Right: color swatches */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }} className="msr2-swatch-grid">
                  <SwatchBlock label="Editorial Ink"  hex="#13100C" textColor="#F5F0E8" />
                  <SwatchBlock label="Cognac"         hex="#C4703A" textColor="#F5F0E8" />
                  <SwatchBlock label="Deep Cognac"    hex="#A35E32" textColor="#F5F0E8" />
                  <SwatchBlock label="Paper"          hex="#F5F0E8" textColor="#13100C" />
                </div>
              </div>
            </div>
          </div>

          {/* Heading + body */}
          <div style={{ padding: `0 ${SECTION_X}` }}>
            <div style={{
              maxWidth:            CONTENT_MAX,
              margin:              "0 auto",
              display:             "grid",
              gridTemplateColumns: "1fr 1.6fr",
              gap:                 "64px",
              alignItems:          "start",
            }} className="msr2-row">
              <div>
                <Eyebrow>Brand identity</Eyebrow>
                <h2 style={{
                  fontFamily:    font.sans,
                  fontSize:      "clamp(32px, 4vw, 48px)",
                  fontWeight:    600,
                  color:         c.ink,
                  margin:        0,
                  letterSpacing: "-0.025em",
                  lineHeight:    1.05,
                }}>
                  A brand that&rsquo;s actually for men.
                </h2></div>
              <div>
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "clamp(16px, 1.6vw, 18px)",
                  lineHeight: 1.75,
                  color:      c.ink2,
                  margin:     0,
                  maxWidth:   PROSE_MAX,
                }}>
                  Most men&rsquo;s wellness brands aren&rsquo;t for men. They&rsquo;re rebranded women&rsquo;s content with a stock photo of a guy. MSR starts from how men actually search for foot problems: quietly, with shame, after years of neglect. The brand voice is direct and clinical, never cold. Barlow Condensed for editorial heat, Lora for long-form trust, cognac as a grounded accent against editorial near-black.
                </p>
              </div>
            </div>
          </div>
        </section>

        </div>
        {/* ─ end DECISIONS arc tint */}

        <ArcDivider arc="Details" />

        {/* ── DETAILS arc tint ─ */}
        <div id="arc-details" style={{ background: "#ECEFF3", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)", scrollMarginTop: "140px" }}>

        {/* ─────────────────────────────────────────────
            Design system — replaced the single
            design-system-signature.png export (Ryan's
            "looks like you're hiding something" critique)
            with a CSS-only 3-tab carousel: Color tokens,
            Type ramp, Components. Each tab is legibly
            scaled and contains the actual data.
        ───────────────────────────────────────────── */}
        <section aria-label="Design system" style={{ padding: `0 0 120px` }}>
          <div style={{ padding: `0 ${SECTION_X} 48px` }}>
            <div style={{
              maxWidth:            CONTENT_MAX,
              margin:              "0 auto",
              display:             "grid",
              gridTemplateColumns: "1fr 1.6fr",
              gap:                 "64px",
              alignItems:          "start",
            }} className="msr2-row">
              <div>
                <Eyebrow>Design system</Eyebrow>
                <h2 style={{
                  fontFamily:    font.sans,
                  fontSize:      "clamp(32px, 4vw, 48px)",
                  fontWeight:    600,
                  color:         c.ink,
                  margin:        0,
                  letterSpacing: "-0.025em",
                  lineHeight:    1.05,
                }}>
                  Built once.<br/>Used everywhere.
                </h2></div>
              <div>
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "clamp(16px, 1.6vw, 18px)",
                  lineHeight: 1.75,
                  color:      c.ink2,
                  margin:     0,
                  maxWidth:   PROSE_MAX,
                }}>
                  Token-led from the start. Color, type, spacing as primitives. Article pattern, assessment branch, review card, routine prompt all read from the same vocabulary. Thirteen components carry every page on the site. Documented in Figma so the next designer who picks this up doesn&rsquo;t have to rebuild the rules.
                </p>
              </div>
            </div>
          </div>

          {/* Three-tab carousel — click 01 / 02 / 03 in the bar above to switch. */}
          <div style={{ padding: `0 ${SECTION_X}` }}>
            <p style={{
              fontFamily:    font.sans,
              fontSize:      "11px",
              fontWeight:    600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:         c.muted,
              margin:        "0 0 16px",
              maxWidth:      CONTENT_MAX,
              marginInline:  "auto",
            }}>
              <span aria-hidden="true" style={{ color: c.accent }}>→ </span>
              Click 01 · 02 · 03 to switch panels
            </p>
            <DesignSystemCarousel />
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            §03 — Shipped (image stack — multiple shots)
        ───────────────────────────────────────────── */}
        <section aria-label="Shipped" style={{ padding: `0 ${SECTION_X} 40px` }}>
          <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>

            {/* Heading + body */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "64px", alignItems: "start", marginBottom: "64px" }} className="msr2-row">
              <div>
                <span style={{
                  fontFamily:    font.sans,
                  fontSize:      "11px",
                  fontWeight:    700,
                  letterSpacing: "0.20em",
                  color:         c.accent,
                  display:       "block",
                  marginBottom:  "12px",
                }}>03</span>
                <h2 style={{
                  fontFamily:    font.sans,
                  fontSize:      "clamp(32px, 4vw, 48px)",
                  fontWeight:    600,
                  color:         c.ink,
                  margin:        0,
                  letterSpacing: "-0.025em",
                  lineHeight:    1.05,
                }}>
                  Shipped.
                </h2></div>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "clamp(16px, 1.6vw, 18px)",
                lineHeight: 1.75,
                color:      c.ink2,
                margin:     0,
                maxWidth:   PROSE_MAX,
              }}>
                menssolerevival.com, live since April 2026. Long-form pillar articles, a five-section assessment that branches by symptom, product reviews structured for trust, and an editorial system documented in 13 components. The site exists where the three categories overlap, not as a compromise between them.
              </p>
            </div>

            {/* Image stack — 3 shots showing the live work. The hero shot
                is the Reviews index (product reviews structured for trust),
                replacing the earlier toenail-fungus article hero which led
                with a foot photo. Reviews page reads as editorial product
                grid, no body imagery. */}
            <div style={{ display: "grid", gap: "40px", marginBottom: "40px" }}>
              <div style={{ width: "100%", aspectRatio: "16 / 10", position: "relative", overflow: "hidden", border: `1px solid ${c.border}` }}>
                <Image
                  src="/images/work/msr/v2/reviews-page.jpg"
                  alt="Product reviews index on the live site. ‘PRODUCT REVIEWS’ editorial grid with disclosure-first article cards organized by category."
                  fill
                  sizes="(max-width: 1240px) 100vw, 1240px"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
              </div>

              {/* Assessment — always-visible 3-thumb strip + expander to 12 */}
              <div>
                {/* Two assessment captures from the live site, displayed at
                    natural aspect so each page fits in full (no crop). 02 is
                    the symptom triage; 03 is the first symptom section that
                    triage routes you to. The intro page was dropped — these
                    two carry the flow story on their own. */}
                <div style={{
                  display:             "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap:                 "24px",
                  marginBottom:        "20px",
                  alignItems:          "start",
                }} className="msr2-assessment-pair">
                  <figure style={{ margin: 0 }}>
                    <div style={{ border: `1px solid ${c.border}`, background: "#FFFFFF", overflow: "hidden", position: "relative" }}>
                      <Image
                        src="/images/work/msr/v2/assessment-triage.jpg"
                        alt="Symptom triage. ‘Where’s the trouble?’ Select-all-that-apply across pain, nails, skin, alignment, footwear fit."
                        width={1440}
                        height={900}
                        sizes="(max-width: 760px) 100vw, 50vw"
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                      <span style={{
                        position:      "absolute",
                        top:           "10px",
                        left:          "10px",
                        background:    "rgba(255,255,255,0.94)",
                        padding:       "5px 12px",
                        fontFamily:    font.sans,
                        fontSize:      "10px",
                        fontWeight:    700,
                        letterSpacing: "0.18em",
                        color:         c.ink,
                      }}>02</span>
                    </div>
                    <figcaption style={{
                      fontFamily:    font.sans,
                      fontSize:      "12px",
                      color:         c.muted,
                      margin:        "12px 0 0",
                      lineHeight:    1.55,
                    }}>
                      <strong style={{ color: c.ink, fontWeight: 600 }}>Triage:</strong> select-all-that-apply across five symptom areas. Routes you only to the sections that apply.
                    </figcaption>
                  </figure>
                  <figure style={{ margin: 0 }}>
                    <div style={{ border: `1px solid ${c.border}`, background: "#FFFFFF", overflow: "hidden", position: "relative" }}>
                      <Image
                        src="/images/work/msr/v2/assessment-section.jpg"
                        alt="Section 01 (Nail Health). symptom checklist with prevalence stat, peer-reviewed citation, and copy that explains what 3+ checks means."
                        width={1440}
                        height={1821}
                        sizes="(max-width: 760px) 100vw, 50vw"
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                      <span style={{
                        position:      "absolute",
                        top:           "10px",
                        left:          "10px",
                        background:    "rgba(255,255,255,0.94)",
                        padding:       "5px 12px",
                        fontFamily:    font.sans,
                        fontSize:      "10px",
                        fontWeight:    700,
                        letterSpacing: "0.18em",
                        color:         c.ink,
                      }}>03</span>
                    </div>
                    <figcaption style={{
                      fontFamily:    font.sans,
                      fontSize:      "12px",
                      color:         c.muted,
                      margin:        "12px 0 0",
                      lineHeight:    1.55,
                    }}>
                      <strong style={{ color: c.ink, fontWeight: 600 }}>Section:</strong> symptom checklist with prevalence stat + peer-reviewed source. Threshold copy explains what the count means.
                    </figcaption>
                  </figure>
                </div>
                <p style={{
                  fontFamily:    font.sans,
                  fontSize:      "12px",
                  color:         c.muted,
                  lineHeight:    1.55,
                  margin:        "0",
                  letterSpacing: "0.01em",
                }}>
                  Two of the assessment&rsquo;s twelve frames. The full flow lives at <a href="https://www.menssolerevival.com/assessment" target="_blank" rel="noopener noreferrer" style={{ color: c.accent, textDecoration: "underline", textDecorationThickness: "1px", textUnderlineOffset: "3px" }}>menssolerevival.com/assessment</a>.
                </p>
              </div>
            </div>

            {/* Annotated assessment — Pentagram-pattern decision callouts on
                top of the Nail Health section capture. Single visual that
                signals "I can articulate why every component is shaped the
                way it is." Lives between the assessment 2-up and the
                affiliate Decision callout. */}
            <div style={{ marginTop: "80px", marginBottom: "40px" }}>
              <AnnotatedAssessment />
            </div>

            <Callout
              decision="Affiliate CTAs, not product listings."
              why="Revenue comes from referrals, not transactions. The trust model requires editorial independence from the products reviewed."
              cost="Lower per-conversion revenue. Slower monetization ramp."
            />

            {/* What I cut — decision-transparency callout. Surfaces what
                got dropped from the original scope, not just what shipped. */}
            <WhatICut />

            {/* Early outcomes — real GA4 data from the live site. Single
                highest hiring signal on the page. */}
            <EarlyOutcomes />

            {/* What could still go wrong — honest risks callout. Pairs
                with EarlyOutcomes (which showed what's working) to surface
                what's unproven. Decision-transparency move. */}
            <HonestRisks />

            {/* Interactive diagnostic-flow demo — three-step routing
                that mirrors the entry path of the live assessment.
                Lifted OUT of the DETAILS arc tint via a full-viewport
                white bleed so it visually separates from the crimson-
                rail asides above and reads as its own "try it" moment,
                matching Spotify's RecentlyPlayedDemo pattern. Padding
                matches the arc-tint rhythm (40-80 top, 24-40 bottom)
                so vertical spacing stays consistent with the
                surrounding editorial. */}
            <div style={{
              marginTop: "40px",
              marginBottom: "40px",
              marginLeft: "calc(50% - 50vw)",
              marginRight: "calc(50% - 50vw)",
              background: "#FFFFFF",
              paddingTop: "clamp(40px, 8vw, 80px)",
              paddingBottom: "clamp(24px, 4vw, 40px)",
              paddingLeft: SECTION_X,
              paddingRight: SECTION_X,
            }}>
              <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
                <DiagnosticFlowDemo />
              </div>
            </div>

            {/* Assessment funnel visual — pairs with the Voice-of-the-User
                callout below. Five-node horizontal flow visualizing the
                6 → 6 → 6 → 5 → 3 funnel + the 13× return-views annotation. */}
            <AssessmentFunnelFlow />

            {/* Voice of the user — real GA4 behavioral data pulled
                June 2026, ~10 weeks live. Three paragraphs covering the
                editorial bet (pillar engagement), affiliate bet (review
                read-time), and the honest scale. */}
            <UserResearch />
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            Mobile frames as a sidekick — proof of
            responsive thinking without overwhelming
        ───────────────────────────────────────────── */}
        <section aria-label="Mobile" style={{ padding: `clamp(56px, 12vw, 120px) ${SECTION_X}` }}>
          <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
            <Eyebrow>Mobile</Eyebrow>
            <p style={{
              fontFamily:    font.sans,
              fontSize:      "clamp(20px, 2vw, 24px)",
              fontWeight:    500,
              color:         c.ink,
              margin:        "0 0 48px",
              letterSpacing: "-0.01em",
              lineHeight:    1.4,
              maxWidth:      PROSE_MAX,
            }}>
              The mobile read is the dominant one. Pillar articles, assessment, and reviews all designed mobile-first.
            </p>
            {/* Three real mobile captures from the live site at 390×844
                (natural viewport size). Displayed at their full intrinsic
                aspect ratio — no crop. The whole screen content fits inside
                each frame. */}
            <div style={{
              display:             "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap:                 "24px",
              alignItems:          "start",
              maxWidth:            "1080px",
              margin:              "0 auto",
            }} className="msr2-mobile-grid">
              {[
                { src: "mobile-home.jpg",       label: "Homepage",     alt: "Mobile homepage — &lsquo;FIX YOUR FEET. KEEP UP WITH EVERYTHING ELSE.&rsquo; with Take the Assessment and Browse Guides CTAs." },
                { src: "mobile-guides.jpg",     label: "Guides index", alt: "Mobile guides index — &lsquo;THE KNOWLEDGE BASE.&rsquo; with symptom-filtered article cards." },
                { src: "mobile-assessment.jpg", label: "Assessment",   alt: "Mobile assessment intro — 5-minute self-check with SEE A DOCTOR IF triage box." },
              ].map((m) => (
                <figure key={m.src} style={{ margin: 0 }}>
                  <div style={{ border: `1px solid ${c.border}`, background: "#FFFFFF", overflow: "hidden" }}>
                    <Image
                      src={`/images/work/msr/v2/${m.src}`}
                      alt={m.alt}
                      width={390}
                      height={844}
                      sizes="(max-width: 760px) 100vw, 33vw"
                      loading="eager"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                  <figcaption style={{
                    fontFamily:    font.sans,
                    fontSize:      "11px",
                    fontWeight:    600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color:         c.muted,
                    margin:        "12px 0 0",
                    textAlign:     "center",
                  }}>{m.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Depth section removed. v2 used to point readers to v1 "for the
            full process," which read as "v2 isn't the real case study." With
            the research strip, pivot infographic, what-I-cut, and early
            outcomes blocks now in place, v2 IS the canonical case study —
            no pointer-to-v1 needed. */}

        {/* ─────────────────────────────────────────────
            Meta block — Pentagram-style bottom strip
        ───────────────────────────────────────────── */}
        <section aria-label="Case study metadata" style={{
          borderTop:    `1px solid ${c.border}`,
          padding:      `64px ${SECTION_X}`,
          background:   c.surface,
        }}>
          <div style={{
            maxWidth:            CONTENT_MAX,
            margin:              "0 auto",
            display:             "grid",
            /* 4 cells instead of 5 so each value holds on one line.
               Sector folded into Role since the case study itself
               makes the sector obvious. */
            gridTemplateColumns: "repeat(4, 1fr)",
            gap:                 "32px",
          }} className="msr2-meta">
            <MetaCell label="Role"   value="UX/UI Designer · End-to-end · Health editorial" />
            <MetaCell label="Year"   value="2026" />
            <MetaCell label="Stack"  value="Figma · Next.js · Vercel" />
            <MetaCell label="Live"   value={<a href="https://www.menssolerevival.com/" target="_blank" rel="noopener noreferrer" aria-label="menssolerevival.com (opens in new tab)" style={{ color: c.accent2, textDecoration: "none", borderBottom: `1px solid ${c.accent}` }}>menssolerevival.com</a>} />
          </div>
        </section>
        </div>
        {/* ─ end DETAILS arc tint */}

      </main>

      <ScrollProgress />
      <RelatedCaseStudies current="mens-sole-revival" />
      <Footer />

      {/* Responsive */}
      <style>{`
        /* Design system panels — three cards in normal vertical flow.
           Was a sticky-stack (position: sticky with staggered top
           offsets) but Alfonso called it: the stack fought the case
           study's editorial pacing on desktop. Plain flow reads
           better, and killing the 30vh trailing padding closes the
           dead space above 03 Shipped. */
        .msr2-ds-stack {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .msr2-ds-card {
          background: #FFFFFF;
          border: 1px solid ${c.border};
          box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);
        }
        .msr2-ds-card-header {
          padding: 20px 24px;
          display: flex;
          align-items: baseline;
          gap: 14px;
          background: #FAFAF9;
          border-bottom: 1px solid ${c.border};
        }
        .msr2-ds-num {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: ${c.accent};
          text-transform: uppercase;
        }
        .msr2-ds-label {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.005em;
          color: ${c.ink};
          flex: 1;
        }
        .msr2-ds-card-body {
          padding: clamp(28px, 4vw, 48px);
        }

        @media (max-width: 760px) {
          .msr2-row              { grid-template-columns: 1fr !important; gap: 32px !important; }
          .msr2-callout-grid     { grid-template-columns: 1fr !important; gap: 22px !important; }
          .msr2-pair             { grid-template-columns: 1fr !important; }
          .msr2-meta             { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .msr2-brand-grid       { grid-template-columns: 1fr !important; gap: 32px !important; padding: 40px 28px !important; }
          .msr2-swatch-grid      { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
          .msr2-component-grid   { grid-template-columns: 1fr !important; gap: 0 !important; }
          .msr2-component-grid > div { padding-top: 12px !important; }
          .msr2-strip            { grid-template-columns: 1fr !important; gap: 12px !important; }
          .msr2-grid12           { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .msr-funnel-stats      { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          /* Mobile frame grid — 3-col desktop → 1-col on phones (each phone capture is already small enough to read at full width on a real phone) */
          .msr2-mobile-grid      { grid-template-columns: 1fr !important; gap: 24px !important; }
          /* Assessment pair — side-by-side on desktop → stacked on phones */
          .msr2-assessment-pair  { grid-template-columns: 1fr !important; gap: 24px !important; }
          /* Annotated assessment — image + rail → stacked on phones */
          .msr2-annotated-grid   { grid-template-columns: 1fr !important; gap: 32px !important; }
          /* Funnel — collapse to 2 rows on phones (steps wrap) */
          .msr2-funnel-row       { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
          .msr2-funnel-row > div[aria-hidden] { display: none !important; }
          /* Design-system cards on mobile — already in normal flow on
             desktop; just tighten the gap for phone widths. */
          .msr2-ds-stack { gap: 20px !important; }
          /* Carousel color grid — 2-col on phones */
          .msr2-ds-color-grid    { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .msr2-ds-type-grid     { grid-template-columns: 1fr !important; gap: 24px !important; }
          /* Pivot infographic — stack columns, push the arrow between them */
          .msr2-pivot-grid       { grid-template-columns: 1fr !important; gap: 32px !important; }
          .msr2-pivot-arrow      { padding-top: 0 !important; flex-direction: row !important; justify-content: center; }
          .msr2-pivot-arrow svg  { transform: rotate(90deg); }
          /* Research strip — stack the three weeks */
          .msr2-research-strip   { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </>
  );
}

/* ---------- BigThree section template ---------- */

function BigThree({
  number, heading, image, imageAlt, imageCrop, body, callout,
}: {
  number: string;
  heading: string;
  image: string;
  imageAlt: string;
  imageCrop: string | null;
  body: React.ReactNode;
  callout: { decision: string; why: string; cost: string };
}) {
  return (
    <section aria-label={heading} style={{ padding: `0 0 120px` }}>
      {/* Image first — full-bleed within content max */}
      <div style={{ padding: `0 ${SECTION_X} 64px` }}>
        <HeroImage src={image} alt={imageAlt} cropAspect={imageCrop} />
      </div>

      {/* Heading + body */}
      <div style={{ padding: `0 ${SECTION_X}` }}>
        <div style={{
          maxWidth:             CONTENT_MAX,
          margin:               "0 auto",
          display:              "grid",
          gridTemplateColumns:  "1fr 1.6fr",
          gap:                  "64px",
          alignItems:           "start",
        }} className="msr2-row">
          <div>
            <span style={{
              fontFamily:    font.sans,
              fontSize:      "11px",
              fontWeight:    700,
              letterSpacing: "0.20em",
              color:         c.accent,
              display:       "block",
              marginBottom:  "12px",
            }}>
              {number}
            </span>
            <h2 style={{
              fontFamily:    font.sans,
              fontSize:      "clamp(32px, 4vw, 48px)",
              fontWeight:    600,
              color:         c.ink,
              margin:        0,
              letterSpacing: "-0.025em",
              lineHeight:    1.05,
            }}>
              {heading}.
            </h2>
          </div>

          <div>
            <p style={{
              fontFamily: font.sans,
              fontSize:   "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75,
              color:      c.ink2,
              margin:     0,
              maxWidth:   PROSE_MAX,
            }}>
              {body}
            </p>
            <Callout {...callout} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- pivot infographic (§02 visual)
   Replaces an earlier positioning triangle. The triangle described the
   intersection geometrically; this shows the actual decision — the week-3
   pivot from e-commerce to editorial. Two columns (original plan vs. what
   shipped) with a cognac arrow and one-line rationale at center. */

function PivotInfographic() {
  const ink    = "#13100C";   // MSR editorial near-black
  const paper  = "#F5F0E8";   // MSR cream
  const cognac = "#C4703A";   // MSR brand
  // #8A8680 was 3.9:1 on the near-black ink panel — fails 4.5:1 for
  // small body text. Lifted to #B8B2A8 (~5.5:1) for AA legibility.
  const muted  = "#B8B2A8";

  const originalPlan = [
    "Shopify storefront",
    "Product reviews",
    "Cart / checkout",
    "Subscription tier",
    "Newsletter popup",
  ];
  const whatShipped = [
    "Long-form pillars",
    "Assessment branch",
    "Affiliate context",
    "Routine prompts",
    "No popups",
  ];

  const colLabel: React.CSSProperties = {
    fontFamily:    font.sans,
    fontSize:      "10px",
    fontWeight:    700,
    color:         muted,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    margin:        "0 0 10px",
  };
  const colDisplay: React.CSSProperties = {
    fontFamily:    "var(--font-barlow-condensed), 'Barlow Condensed', Impact, sans-serif",
    fontSize:      "clamp(34px, 4.5vw, 52px)",
    fontWeight:    800,
    color:         paper,
    letterSpacing: "0.01em",
    textTransform: "uppercase",
    lineHeight:    1,
    margin:        "0 0 28px",
  };
  const liBase: React.CSSProperties = {
    fontFamily: font.sans,
    fontSize:   "14px",
    color:      paper,
    margin:     "0 0 10px",
    letterSpacing: "0.01em",
  };

  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
      <div style={{
        background: ink,
        padding:    "clamp(48px, 6vw, 80px) clamp(28px, 5vw, 64px)",
        border:     `1px solid ${c.border}`,
      }}>
        {/* Eyebrow */}
        <p style={{
          fontFamily:    font.sans,
          fontSize:      "11px",
          fontWeight:    600,
          color:         muted,
          letterSpacing: "0.20em",
          textTransform: "uppercase",
          margin:        "0 0 40px",
          textAlign:     "center",
        }}>
          Three weeks of margin modeling, one pivot
        </p>

        {/* Two columns + center arrow */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap:                 "clamp(24px, 4vw, 56px)",
          alignItems:          "start",
        }} className="msr2-pivot-grid">
          {/* LEFT — original plan, struck-through */}
          <div>
            <p style={colLabel}>The Original Plan</p>
            <p style={{
              ...colDisplay,
              opacity:               0.5,
              textDecoration:        "line-through",
              textDecorationColor:   cognac,
              textDecorationThickness:"2px",
            }}>
              E-commerce
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {originalPlan.map((item) => (
                <li key={item} style={{ ...liBase, opacity: 0.55, textDecoration: "line-through" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CENTER — arrow + one-line rationale */}
          <div style={{
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            paddingTop:     "32px",
          }} className="msr2-pivot-arrow">
            <svg width="64" height="32" viewBox="0 0 64 32" fill="none" aria-hidden="true">
              <path d="M2 16H58M46 4L60 16L46 28" stroke={cognac} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p style={{
              fontFamily:    font.sans,
              fontSize:      "11px",
              fontWeight:    700,
              color:         cognac,
              letterSpacing: "0.20em",
              textTransform: "uppercase",
              margin:        "20px 0 10px",
              textAlign:     "center",
            }}>
              Week 3
            </p>
            <p style={{
              fontFamily:  font.sans,
              fontSize:    "12px",
              color:       paper,
              opacity:     0.72,
              margin:      0,
              maxWidth:    "180px",
              textAlign:   "center",
              lineHeight:  1.55,
              letterSpacing: "0.01em",
            }}>
              Margin modeling kept pointing at information, not products.
            </p>
          </div>

          {/* RIGHT — what shipped */}
          <div>
            <p style={colLabel}>What Shipped</p>
            <p style={colDisplay}>Editorial</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {whatShipped.map((item) => (
                <li key={item} style={liBase}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- research strip (compact §01→§02 bridge) ---------- */

function ResearchStrip() {
  const stepLabel: React.CSSProperties = {
    fontFamily:    font.sans,
    fontSize:      "10px",
    fontWeight:    700,
    color:         c.accent,
    letterSpacing: "0.20em",
    textTransform: "uppercase",
    margin:        "0 0 6px",
  };
  const stepBody: React.CSSProperties = {
    fontFamily:    font.sans,
    fontSize:      "15px",
    color:         c.ink,
    fontWeight:    500,
    margin:        0,
    letterSpacing: "-0.005em",
  };

  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto", padding: `0 ${SECTION_X}` }}>
      <div style={{
        display:             "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap:                 "32px",
        borderTop:           `1px solid ${c.border}`,
        borderBottom:        `1px solid ${c.border}`,
        padding:             "28px 0",
      }} className="msr2-research-strip">
        <div>
          <p style={stepLabel}>Week 1</p>
          <p style={stepBody}>Margin modeling</p>
        </div>
        <div>
          <p style={stepLabel}>Week 2</p>
          <p style={stepBody}>Customer interviews</p>
        </div>
        <div>
          <p style={stepLabel}>Week 3</p>
          <p style={stepBody}>The pivot</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- "What I cut" callout (§03 transparency addition) ---------- */

function WhatICut() {
  const labelStyle: React.CSSProperties = {
    fontFamily:    font.sans,
    fontSize:      "10px",
    fontWeight:    700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color:         c.accent,
    margin:        "0 0 8px",
  };
  const bodyStyle: React.CSSProperties = {
    fontFamily: font.sans,
    fontSize:   "15px",
    lineHeight: 1.7,
    color:      c.ink2,
    margin:     0,
  };
  return (
    <aside style={{
      background: c.callout,
      border:     `1px solid ${c.border}`,
      borderLeft: `4px solid ${c.brand}`,
      padding:    "28px 32px",
      maxWidth:   "780px",
      marginTop:  "40px",
    }}>
      <p style={labelStyle}>What I cut</p>
      <p style={{ ...bodyStyle, margin: "0 0 22px" }}>
        Shopify spec. Product-comparison cards. Five-star rating system. Newsletter popup. Subscription tier.
      </p>
      <p style={labelStyle}>Replaced with</p>
      <p style={bodyStyle}>
        Editorial pillars. Symptom-branching assessment. Affiliate context, not product listings. Routine prompts under every article. No popups.
      </p>
    </aside>
  );
}

/* ---------- Early outcomes box (real GA4 data — §03 closer) ---------- */

function EarlyOutcomes() {
  const labelStyle: React.CSSProperties = {
    fontFamily:    font.sans,
    fontSize:      "10px",
    fontWeight:    700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color:         c.accent,
    margin:        "0 0 10px",
  };
  const bodyStyle: React.CSSProperties = {
    fontFamily: font.sans,
    fontSize:   "15px",
    lineHeight: 1.7,
    color:      c.ink2,
    margin:     "0 0 12px",
  };
  return (
    <aside style={{
      background: c.callout,
      border:     `1px solid ${c.border}`,
      borderLeft: `4px solid ${c.brand}`,
      padding:    "32px 36px",
      maxWidth:   "780px",
      marginTop:  "32px",
    }}>
      <p style={labelStyle}>Early outcomes · first 10 weeks live (GA4, Apr–Jun 2026)</p>
      <p style={bodyStyle}>
        <strong style={{ color: c.ink }}>4m 53s average engaged time per session.</strong> High for a content site, and the exact signal MSR was built to produce: visitors stay to read, they don&apos;t bounce.
      </p>
      <p style={bodyStyle}>
        <strong style={{ color: c.ink }}>~3.2 sessions per user</strong> across 41 early visitors in 6 countries, with zero paid promotion. Early readers come back.
      </p>
      <p style={{ ...bodyStyle, margin: 0 }}>
        <strong style={{ color: c.ink }}>The honest gap:</strong> Search Console shows 4 impressions and 0 clicks across the same window, all on a single branded query. Discovery is direct or referral-based; organic search has not yet started. SEO is the clear next lever, and the phased plan below is how I&apos;ll measure whether engaged time holds as the audience grows.
      </p>
    </aside>
  );
}

/* ---------- What could still go wrong (honest risks callout)
   Mirrors the EarlyOutcomes pattern (crimson left border, off-white box)
   but flips the polarity: names the unproven levers instead of the
   working ones. This is the "senior-of-senior" move — most portfolios
   only show what worked. Listing real risks at the end signals
   decision-transparency + intellectual honesty. */

function HonestRisks() {
  const labelStyle: React.CSSProperties = {
    fontFamily:    font.sans,
    fontSize:      "10px",
    fontWeight:    700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color:         c.accent,
    margin:        "0 0 14px",
  };
  const bodyStyle: React.CSSProperties = {
    fontFamily: font.sans,
    fontSize:   "15px",
    lineHeight: 1.7,
    color:      c.ink2,
    margin:     "0 0 12px",
  };
  return (
    <aside style={{
      background: c.callout,
      border:     `1px solid ${c.border}`,
      borderLeft: `4px solid ${c.brand}`,
      padding:    "32px 36px",
      maxWidth:   "780px",
      marginTop:  "32px",
    }}>
      <p style={labelStyle}>What could still go wrong</p>
      <p style={bodyStyle}>
        <strong style={{ color: c.ink }}>SEO is unproven.</strong> Engaged time can hold or collapse as the audience grows past 41 visitors. Won&rsquo;t know for six months.
      </p>
      <p style={bodyStyle}>
        <strong style={{ color: c.ink }}>Affiliate is slow by design.</strong> Editorial independence is the trade. If volume doesn&rsquo;t ramp, the math stops working.
      </p>
      <p style={bodyStyle}>
        <strong style={{ color: c.ink }}>The voice is polarizing.</strong> Half the audience will bounce on the first paragraph. That&rsquo;s the bet, not the bug.
      </p>
      <p style={{ ...bodyStyle, margin: 0 }}>
        <strong style={{ color: c.ink }}>One author.</strong> Every published page is mine. Volume is capped at what one person can write.
      </p>
    </aside>
  );
}

/* ---------- Voice of the user — real GA4 behavioral data.
   Three paragraphs, three different bets each validated by a specific
   number: editorial (pillar article engagement), affiliate (product
   review read-time), and the honest scale (small N, real pattern). */

function UserResearch() {
  const labelStyle: React.CSSProperties = {
    fontFamily:    font.sans,
    fontSize:      "10px",
    fontWeight:    700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color:         c.accent,
    margin:        "0 0 14px",
  };
  const bodyStyle: React.CSSProperties = {
    fontFamily: font.sans,
    fontSize:   "15px",
    lineHeight: 1.7,
    color:      c.ink2,
    margin:     "0 0 12px",
  };
  // Scannable stats strip: lifts the four numbers a hiring manager
  // can use to evaluate the funnel at a glance. The aside below has
  // the prose context for anyone who keeps reading.
  const stats = [
    { num: "6",   label: "users started the flow" },
    { num: "100%", label: "finished the triage step" },
    { num: "83%", label: "reached results" },
    { num: "13×", label: "avg results revisits" },
  ];

  return (
    <>
      <div style={{
        display:             "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap:                 "16px",
        maxWidth:            "780px",
        marginTop:           "32px",
        marginBottom:        "16px",
      }} className="msr-funnel-stats">
        {stats.map((s) => (
          <div key={s.label} style={{
            background:  "#FFFFFF",
            border:      `1px solid ${c.border}`,
            borderTop:   `3px solid ${c.brand}`,
            padding:     "20px 18px",
          }}>
            <p style={{
              fontFamily:    "var(--font-barlow-condensed), sans-serif",
              fontSize:      "clamp(36px, 4vw, 56px)",
              fontWeight:    600,
              color:         c.brand,
              margin:        "0 0 6px",
              letterSpacing: "-0.02em",
              lineHeight:    1.0,
            }}>{s.num}</p>
            <p style={{
              fontFamily:    font.sans,
              fontSize:      "12px",
              lineHeight:    1.45,
              color:         c.ink2,
              margin:        0,
              letterSpacing: "0.01em",
            }}>{s.label}</p>
          </div>
        ))}
      </div>
      <p style={{
        fontFamily:    font.sans,
        fontSize:      "11px",
        letterSpacing: "0.10em",
        textTransform: "uppercase",
        color:         c.muted,
        margin:        "0 0 16px",
        maxWidth:      "780px",
      }}>
        Assessment funnel · live data · n = 6 users over 10 weeks
      </p>

    <aside style={{
      background: c.callout,
      border:     `1px solid ${c.border}`,
      borderLeft: `4px solid ${c.brand}`,
      padding:    "32px 36px",
      maxWidth:   "780px",
      marginTop:  "0",
    }}>
      <p style={labelStyle}>Voice of the user · Behavioral data (GA4)</p>
      <p style={bodyStyle}>
        <strong style={{ color: c.ink }}>One pillar article holds 9m 30s of engagement per reader, with 9 views per active user.</strong> Four readers have returned to &ldquo;Men&rsquo;s Foot Health: Evidence-Based Care for Men Over 40&rdquo; nine times each. Long-form reading, not skimming. That was the editorial bet.
      </p>
      <p style={bodyStyle}>
        <strong style={{ color: c.ink }}>The product-review trust model also produces real read-time.</strong> Three readers average 4m 45s on a single Superfeet insole review. Editorial independence is producing trust, not bounce. That was the affiliate bet.
      </p>
      <p style={bodyStyle}>
        <strong style={{ color: c.ink }}>The assessment funnel holds end-to-end.</strong> Six users started the 12-frame flow. All six finished the triage step. Five reached the results page. Three downloaded the PDF takeaway. The five who reached results came back to that page an average of thirteen times. The results aren&rsquo;t a finish line. They&rsquo;re a reference document.
      </p>
      <p style={{ ...bodyStyle, margin: 0 }}>
        <strong style={{ color: c.ink }}>The honest scale:</strong> 41 active users over 10 weeks. The sample is small. The behavior pattern is real.
      </p>
    </aside>
    </>
  );
}

/* ---------- Annotated assessment screen
   Pentagram-pattern annotation: one full-size screenshot with numbered
   hotspots, each pointing at a specific design decision. Right-rail list
   spells out the four moves. Single visual that signals "I can articulate
   why every component is shaped the way it is." */

function AnnotatedAssessment() {
  const annotations = [
    { num: "01", x: "14%", y: "23%", title: "Skip is always one tap away.",      body: "Sticky section nav lists only the sections the user triaged. The Skip This Section button never disappears." },
    { num: "02", x: "55%", y: "33%", title: "Stat, then source. Never the reverse.", body: "8.57% prevalence with a peer-reviewed citation directly under it. Journal, author, year. Trust before recommendation." },
    { num: "03", x: "55%", y: "55%", title: "Humane checklist language.",         body: "&ldquo;Nails are thick, yellowed, white, or brittle&rdquo; instead of clinical terms. Written the way a man actually describes what he sees." },
    { num: "04", x: "55%", y: "72%", title: "Every section closes with a 3-beat block.",   body: "&ldquo;3+ checks likely points to fungal infection or an ingrown nail. Both are treatable. The guide at the end points you in the right direction.&rdquo; What the count means &middot; reassurance &middot; next step. The user never gets left with a raw number." },
  ];

  const eyebrowStyle: React.CSSProperties = {
    fontFamily:    font.sans,
    fontSize:      "11px",
    fontWeight:    700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color:         c.accent,
    margin:        "0 0 12px",
  };
  const subheadStyle: React.CSSProperties = {
    fontFamily:    font.sans,
    fontSize:      "clamp(18px, 2vw, 22px)",
    fontWeight:    500,
    color:         c.ink,
    margin:        "0 0 40px",
    letterSpacing: "-0.01em",
    lineHeight:    1.35,
  };
  const itemTitle: React.CSSProperties = {
    fontFamily:    font.sans,
    fontSize:      "15px",
    fontWeight:    600,
    color:         c.ink,
    margin:        "0 0 6px",
    letterSpacing: "-0.005em",
    lineHeight:    1.35,
  };
  const itemBody: React.CSSProperties = {
    fontFamily: font.sans,
    fontSize:   "14px",
    lineHeight: 1.6,
    color:      c.ink2,
    margin:     0,
  };
  const badge: React.CSSProperties = {
    display:        "inline-flex",
    width:          "28px",
    height:         "28px",
    borderRadius:   "50%",
    background:     "var(--color-brand)",
    color:          "#FFFFFF",
    fontFamily:     font.sans,
    fontSize:       "11px",
    fontWeight:     700,
    alignItems:     "center",
    justifyContent: "center",
    flexShrink:     0,
  };

  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
      <p style={eyebrowStyle}>Section 01 &middot; Nail Health &middot; annotated</p>
      <p style={subheadStyle}>Four decisions visible on one screen.</p>

      <div style={{
        display:             "grid",
        gridTemplateColumns: "1.4fr 1fr",
        gap:                 "32px",
        alignItems:          "start",
      }} className="msr2-annotated-grid">
        {/* Image with overlaid numbered hotspots */}
        <div style={{ position: "relative", border: `1px solid ${c.border}`, background: "#FFFFFF" }}>
          <Image
            src="/images/work/msr/v2/assessment-section.jpg"
            alt="Nail Health section of the live assessment, with numbered annotation hotspots calling out the four design decisions described in the right-hand list."
            width={1440}
            height={1821}
            sizes="(max-width: 760px) 100vw, 50vw"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          {annotations.map((a) => (
            <span
              key={a.num}
              style={{
                position:       "absolute",
                left:           a.x,
                top:            a.y,
                transform:      "translate(-50%, -50%)",
                ...badge,
                border:         "2px solid #FFFFFF",
                boxShadow:      "0 2px 8px rgba(0,0,0,0.25)",
              }}
              aria-hidden="true"
            >
              {a.num}
            </span>
          ))}
        </div>

        {/* Right rail: annotation list */}
        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {annotations.map((a) => (
            <li key={a.num} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "16px", marginBottom: "28px" }}>
              <span style={badge}>{a.num}</span>
              <div>
                <p style={itemTitle}>{a.title}</p>
                <p style={itemBody} dangerouslySetInnerHTML={{ __html: a.body }} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ---------- Assessment funnel visual
   Pairs with the Voice-of-the-User callout. Five-node horizontal flow:
   Started → Triage → Sections → Results → PDF. Numbers under each step,
   muted treatment on the drop-off step, and the "× 13 return views"
   annotation under Results. */

function AssessmentFunnelFlow() {
  const steps = [
    { num: "01", label: "Started",  count: 6, drop: false },
    { num: "02", label: "Triage",   count: 6, drop: false },
    { num: "03", label: "Sections", count: 6, drop: false },
    { num: "04", label: "Results",  count: 5, drop: true, sublabel: "&times; 13 avg return views per user" },
    { num: "05", label: "PDF",      count: 3, drop: true },
  ];

  return (
    <aside style={{
      background: c.callout,
      border:     `1px solid ${c.border}`,
      borderLeft: `4px solid ${c.brand}`,
      padding:    "28px 36px",
      maxWidth:   "880px",
      marginTop:  "32px",
    }}>
      <p style={{
        fontFamily:    font.sans,
        fontSize:      "10px",
        fontWeight:    700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color:         c.accent,
        margin:        "0 0 18px",
      }}>
        Assessment funnel &middot; 6 started &middot; 3 finished with the takeaway
      </p>

      <div style={{
        display:             "grid",
        gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr auto 1fr",
        alignItems:          "stretch",
        gap:                 "4px",
      }} className="msr2-funnel-row">
        {steps.map((s, i) => (
          <React.Fragment key={s.num}>
            <div style={{
              background: "#FFFFFF",
              border:     `1px solid ${c.border}`,
              padding:    "14px 12px",
              textAlign:  "center",
              opacity:    s.drop ? 0.85 : 1,
            }}>
              <p style={{
                fontFamily:    font.sans,
                fontSize:      "10px",
                fontWeight:    700,
                letterSpacing: "0.15em",
                color:         c.accent,
                margin:        "0 0 6px",
              }}>{s.num}</p>
              <p style={{
                fontFamily:    font.sans,
                fontSize:      "12px",
                fontWeight:    500,
                color:         c.ink,
                margin:        "0 0 10px",
                letterSpacing: "-0.005em",
              }}>{s.label}</p>
              <p style={{
                fontFamily:    "var(--font-barlow-condensed), 'Barlow Condensed', Impact, sans-serif",
                fontSize:      "clamp(28px, 3.6vw, 40px)",
                fontWeight:    800,
                color:         c.ink,
                margin:        0,
                lineHeight:    1,
                letterSpacing: "0.01em",
              }}>{s.count}</p>
              {s.sublabel && (
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "10px",
                  color:      c.muted,
                  margin:     "8px 0 0",
                  lineHeight: 1.35,
                }} dangerouslySetInnerHTML={{ __html: s.sublabel }} />
              )}
            </div>
            {i < steps.length - 1 && (
              <div style={{
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                color:          c.accent,
                fontSize:       "16px",
              }} aria-hidden="true">&rarr;</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </aside>
  );
}

/* ---------- design system carousel (3 tabs, CSS-only)
   Replaces the single design-system-signature.png export, which read at small
   scale as "I'm hiding something." Three tabs: Color, Type, Components.
   Pure CSS interaction via hidden radio inputs + ~ sibling selector. Server-
   component safe (no React state required). */

function DSPanelColor() {
  const tokens = [
    { label: "Editorial Ink", hex: "#13100C", role: "Display + body ink" },
    { label: "Cognac",        hex: "#C4703A", role: "Brand + key actions" },
    { label: "Deep Cognac",   hex: "#A35E32", role: "Hover + emphasis" },
    { label: "Paper",         hex: "#F5F0E8", role: "Surface" },
    { label: "Stone",         hex: "#A99B8A", role: "Borders + secondary" },
    { label: "Pulse Red",     hex: "#C8341A", role: "Severity high" },
  ];
  return (
    <div>
      <p style={{
        fontFamily:    font.sans,
        fontSize:      "15px",
        lineHeight:    1.6,
        color:         c.ink2,
        margin:        "0 0 32px",
        maxWidth:      PROSE_MAX,
      }}>
        Six tokens. Every color on every page resolves through one of these. Cognac is the only saturated tone; everything else is a paper-to-ink scale.
      </p>
      <div style={{
        display:             "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap:                 "16px",
      }} className="msr2-ds-color-grid">
        {tokens.map((t) => (
          <div key={t.hex} style={{ border: `1px solid ${c.border}` }}>
            <div style={{ background: t.hex, aspectRatio: "1.6 / 1" }} />
            <div style={{ padding: "14px 16px 16px" }}>
              <p style={{
                fontFamily:    font.sans,
                fontSize:      "13px",
                fontWeight:    600,
                color:         c.ink,
                margin:        "0 0 4px",
                letterSpacing: "-0.005em",
              }}>{t.label}</p>
              <p style={{
                fontFamily:    font.sans,
                fontSize:      "11px",
                color:         c.muted,
                margin:        "0 0 6px",
                letterSpacing: "0.04em",
              }}>{t.hex}</p>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "12px",
                color:      c.ink2,
                margin:     0,
                lineHeight: 1.5,
              }}>{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DSPanelType() {
  return (
    <div>
      <p style={{
        fontFamily: font.sans,
        fontSize:   "15px",
        lineHeight: 1.6,
        color:      c.ink2,
        margin:     "0 0 32px",
        maxWidth:   PROSE_MAX,
      }}>
        Two faces, no third. Barlow Condensed carries every display and section label. Lora carries every long-form paragraph and italic callout.
      </p>
      <div style={{
        display:             "grid",
        gridTemplateColumns: "1fr 1fr",
        gap:                 "32px",
      }} className="msr2-ds-type-grid">
        {/* Barlow Condensed */}
        <div style={{ border: `1px solid ${c.border}`, padding: "32px 28px", background: "#FFFFFF" }}>
          <p style={{
            fontFamily:    font.sans,
            fontSize:      "10px",
            fontWeight:    700,
            color:         c.accent,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            margin:        "0 0 16px",
          }}>Display · Barlow Condensed</p>
          <p style={{
            fontFamily:    "var(--font-barlow-condensed), 'Barlow Condensed', Impact, sans-serif",
            fontSize:      "clamp(48px, 12vw, 120px)",
            fontWeight:    800,
            color:         "#13100C",
            margin:        "0 0 18px",
            lineHeight:    0.9,
            letterSpacing: "0.01em",
          }}>Aa</p>
          <p style={{
            fontFamily:    "var(--font-barlow-condensed), 'Barlow Condensed', Impact, sans-serif",
            fontSize:      "22px",
            fontWeight:    800,
            color:         "#13100C",
            margin:        "0 0 10px",
            textTransform: "uppercase",
            letterSpacing: "0.01em",
          }}>The Men&rsquo;s Foot Health Assessment</p>
          <p style={{
            fontFamily: font.sans,
            fontSize:   "11px",
            color:      c.muted,
            margin:     0,
            letterSpacing: "0.05em",
          }}>700, 800 weights · uppercase displays + section labels</p>
        </div>

        {/* Lora */}
        <div style={{ border: `1px solid ${c.border}`, padding: "32px 28px", background: "#FFFFFF" }}>
          <p style={{
            fontFamily:    font.sans,
            fontSize:      "10px",
            fontWeight:    700,
            color:         c.accent,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            margin:        "0 0 16px",
          }}>Long-form · Lora</p>
          <p style={{
            fontFamily: "var(--font-lora), Lora, Georgia, serif",
            fontSize:   "clamp(48px, 12vw, 120px)",
            color:      "#13100C",
            margin:     "0 0 18px",
            lineHeight: 0.9,
          }}>Aa</p>
          <p style={{
            fontFamily: "var(--font-lora), Lora, Georgia, serif",
            fontSize:   "17px",
            color:      "#13100C",
            margin:     "0 0 6px",
            lineHeight: 1.55,
          }}>Long-form reading sits in Lora. Italic for citations and callouts.</p>
          <p style={{
            fontFamily: "var(--font-lora), Lora, Georgia, serif",
            fontSize:   "15px",
            color:      "#3D4440",
            margin:     "0 0 10px",
            lineHeight: 1.55,
            fontStyle:  "italic",
          }}>&ldquo;After years of neglect, men over 40 finally have a place to start.&rdquo;</p>
          <p style={{
            fontFamily: font.sans,
            fontSize:   "11px",
            color:      c.muted,
            margin:     0,
            letterSpacing: "0.05em",
          }}>400, 500, 600, 700 weights · roman + italic</p>
        </div>
      </div>
    </div>
  );
}

function DSPanelComponents() {
  const items: { num: string; name: string; role: string }[] = [
    { num: "01", name: "Article hero",     role: "Eyebrow · title · meta · cover" },
    { num: "02", name: "Pull quote",       role: "Italic Lora + cognac rule" },
    { num: "03", name: "On-page nav",      role: "Sticky section TOC, mobile drawer" },
    { num: "04", name: "Symptom card",     role: "Check-list + count threshold" },
    { num: "05", name: "Severity gate",    role: "Tier callout (low / mid / clinic)" },
    { num: "06", name: "Triage option",    role: "Select-all-that-apply chip" },
    { num: "07", name: "Routine prompt",   role: "Action · cadence · duration" },
    { num: "08", name: "Review card",      role: "Product · verdict · disclosure" },
    { num: "09", name: "Affiliate CTA",    role: "Disclosure-first link button" },
    { num: "10", name: "Editorial figure", role: "Inline image + caption + credit" },
    { num: "11", name: "Footnote rail",    role: "Citation list + cross-links" },
    { num: "12", name: "Author byline",    role: "Photo · role · update date" },
    { num: "13", name: "Site footer",      role: "Nav · sources · accessibility" },
  ];
  return (
    <div>
      <p style={{
        fontFamily: font.sans,
        fontSize:   "15px",
        lineHeight: 1.6,
        color:      c.ink2,
        margin:     "0 0 24px",
        maxWidth:   PROSE_MAX,
      }}>
        Thirteen components carry every page. Each one is documented in the Figma source with use rules, anatomy, and the data shape it expects.
      </p>
      <div style={{
        display:             "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap:                 "12px 32px",
      }} className="msr2-component-grid">
        {items.map((it) => (
          <div key={it.num} style={{
            display:    "flex",
            alignItems: "baseline",
            gap:        "12px",
            borderTop:  `1px solid ${c.border}`,
            paddingTop: "10px",
          }}>
            <span style={{
              fontFamily:    font.sans,
              fontSize:      "10px",
              fontWeight:    700,
              color:         c.accent,
              letterSpacing: "0.15em",
              minWidth:      "20px",
            }}>{it.num}</span>
            <div style={{ flex: 1 }}>
              <p style={{
                fontFamily:    font.sans,
                fontSize:      "14px",
                fontWeight:    500,
                color:         c.ink,
                margin:        "0 0 2px",
                letterSpacing: "-0.005em",
              }}>{it.name}</p>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "12px",
                color:      c.muted,
                margin:     0,
                lineHeight: 1.45,
              }}>{it.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesignSystemCarousel() {
  const panels = [
    { num: "01", label: "Color tokens", body: <DSPanelColor /> },
    { num: "02", label: "Type ramp",    body: <DSPanelType /> },
    { num: "03", label: "Components",   body: <DSPanelComponents /> },
  ];
  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
      <p style={{
        fontFamily: font.sans, fontSize: "11px", fontWeight: 600,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: c.muted, margin: "0 0 16px",
      }}>
        <span aria-hidden="true" style={{ color: c.accent }}>&rarr; </span>
        Three panels, stacking as you scroll.
      </p>
      <div className="msr2-ds-stack">
        {panels.map((p) => (
          <article key={p.num} className="msr2-ds-card">
            <header className="msr2-ds-card-header">
              <span className="msr2-ds-num">{p.num}</span>
              <span className="msr2-ds-label">{p.label}</span>
            </header>
            <div className="msr2-ds-card-body">
              {p.body}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ---------- brand display card (Brand section visual) ---------- */

function SwatchBlock({ label, hex, textColor }: { label: string; hex: string; textColor: string }) {
  return (
    <div style={{
      background:    hex,
      padding:       "20px 18px",
      aspectRatio:   "1.6 / 1",
      display:       "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}>
      <span style={{
        fontFamily:    font.sans,
        fontSize:      "10px",
        fontWeight:    700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color:         textColor,
      }}>
        {label}
      </span>
      <span style={{
        fontFamily:    font.sans,
        fontSize:      "11px",
        color:         textColor,
        opacity:       0.65,
        letterSpacing: "0.04em",
      }}>
        {hex}
      </span>
    </div>
  );
}

/* ---------- assessment frame thumbnail
   Renders the captured full-page screenshot inside a controlled 16:20
   aspect-ratio container with object-position: top, so the page header
   + first scroll of content stay legible in the grid. Previously this
   used intrinsic width/height props that compressed tall content into
   16:10, making body text microscopic. */

function AssessmentThumb({ src, alt, number }: { src: string; alt: string; number: string }) {
  return (
    <div style={{
      border:      `1px solid ${c.border}`,
      position:    "relative",
      background:  "#FFFFFF",
      aspectRatio: "16 / 20",
      overflow:    "hidden",
    }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 760px) 100vw, 33vw"
        style={{ objectFit: "cover", objectPosition: "top center" }}
      />
      <span style={{
        position:      "absolute",
        top:           "8px",
        left:          "8px",
        background:    "rgba(255,255,255,0.94)",
        padding:       "4px 10px",
        fontFamily:    font.sans,
        fontSize:      "10px",
        fontWeight:    700,
        letterSpacing: "0.18em",
        color:         c.ink,
      }}>
        {number}
      </span>
    </div>
  );
}

/* ---------- meta cell ---------- */

function MetaCell({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p style={{
        fontFamily:    font.sans,
        fontSize:      "10px",
        fontWeight:    700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color:         c.accent,
        margin:        "0 0 8px",
      }}>
        {label}
      </p>
      <p style={{
        fontFamily: font.sans,
        fontSize:   "14px",
        lineHeight: 1.55,
        color:      c.ink,
        margin:     0,
      }}>
        {value}
      </p>
    </div>
  );
}
