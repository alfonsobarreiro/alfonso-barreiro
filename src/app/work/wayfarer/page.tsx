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
import GlobeIframeDemo from "./_demo/GlobeIframeDemo";

/* ---------------------------------------------------------------------------
   /work/wayfarer

   Pentagram-inspired rebuild of the Wayfarer case study. Image-first,
   big-three structure (Problem / Bet / Shipped) with decision callouts.
   Live captures from wayfarer.barreiro.com, code-rendered IA, competitor
   audit, brief-vs-delivered, and cross-project token comparison.

   Voice: all body + callout copy is voice-cleared. No em dashes, no AI
   tells, declarative endings.

   Legacy v1 backup at /work/wayfarer-legacy (notFound() guard in prod).
--------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Wayfarer · Travel Discovery Platform",
  description:
    "Case study: a concept travel discovery platform designed for DesignLab. AI tools expanded what was possible to build. The discipline was deciding what not to build.",
  alternates: { canonical: "https://www.barreiro.com/work/wayfarer" },
  openGraph: {
    type: "article",
    url: "https://www.barreiro.com/work/wayfarer",
    title: "Wayfarer · Travel Discovery Platform",
    description:
      "Case study: a concept travel discovery platform designed for DesignLab. AI tools expanded what was possible to build. The discipline was deciding what not to build.",
    images: ["/work/wayfarer/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wayfarer · Travel Discovery Platform",
    description:
      "Case study: a concept travel discovery platform designed for DesignLab. AI tools expanded what was possible to build. The discipline was deciding what not to build.",
    images: ["/work/wayfarer/opengraph-image"],
  },
};

const c = {
  surface:  "#FFFFFF",                // white page surface, same as MSR v2 and home About
  ink:      "#252B28",
  ink2:     "#3D4440",
  // Deepened from #8A8680 (3.4:1) for WCAG AA on body text. 7.0:1 on white.
  muted:    "#5A5752",
  brand:    "var(--color-brand)",     // C: crimson — site chrome
  accent:   "var(--color-accent)",    // C: deep teal
  accent2:  "var(--color-accent-hover)",
  // Borders at #8A8680 (3.4:1 on white) for the default card/table
  // boundary; #7A7670 (4.7:1) for Tag pill borders that also need to
  // hold up on the #FAFAF9 callout surface. Both pass 1.4.11.
  border:        "#8A8680",
  borderStrong:  "#7A7670",
  // Match MSR + home About skills-box: off-white callout on white surface,
  // border + crimson left bar do the boundary work. No heavy gray.
  callout:       "#FAFAF9",
  // Wayfarer-specific subject colors. Navy + coralDark are safe for text on
  // white; raw coral #D27A5E (3.14:1) is decoration-only.
  navy:     "#3E3C78",                // Wayfarer brand navy (8.9:1 on white)
  navyDark: "#1E1C3A",                // dark navy ground
  coral:    "#D27A5E",                // Wayfarer coral accent — DECORATION ONLY
  coralDark:"#8C4426",                // text-safe coral variant (4.6:1 on white)
};

const font = {
  sans: "var(--font-dm-sans), -apple-system, sans-serif",
};

const SECTION_X    = "clamp(24px, 6vw, 80px)";
const CONTENT_MAX  = "1240px";
const PROSE_MAX    = "680px";

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
   (Premise → Research → Decisions → Details). Same pattern as the
   Spotify case study; uses Wayfarer's navy as the label color. */
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
        color:          c.navy,
        whiteSpace:     "nowrap",
      }}>{arc}</span>
      <span style={{ flex: 1, height: "1px", background: c.borderStrong }} />
    </div>
  );
}

/* CategoryPill removed. Every section already carries an Eyebrow,
   sometimes Tag pills, and the sticky arc nav at the top of the page
   already announces which arc the reader is in. Three "you-are-here"
   labels at every section heading was scaffolding the reader didn't
   need. Same call we made on the Spotify case study. */

/* Decision callout — signature element across every case study.
   Three-stack left bar (navy / Deep Teal / ink for Wayfarer) is the
   visual wordmark; the Decision/Why/Cost structure is the editorial
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
    <aside className="wf2-callout" style={{
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
        <span style={{ background: c.navy }} />
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
      <div className="wf2-callout-grid" style={{
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

function HeroImage({
  src, alt, cropAspect, priority = false,
}: { src: string; alt: string; cropAspect?: string | null; priority?: boolean }) {
  if (cropAspect) {
    return (
      <div style={{
        width: "100%", maxWidth: CONTENT_MAX, margin: "0 auto",
        aspectRatio: cropAspect, position: "relative", overflow: "hidden",
        background: c.navyDark, border: `1px solid ${c.border}`,
      }}>
        <Image
          src={src} alt={alt} fill priority={priority}
          sizes="(max-width: 1240px) 100vw, 1240px"
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      </div>
    );
  }
  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
      <Image
        src={src} alt={alt} width={1920} height={1080} priority={priority}
        sizes="(max-width: 1240px) 100vw, 1240px"
        style={{ width: "100%", height: "auto", display: "block", border: `1px solid ${c.border}` }}
      />
    </div>
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
      <div style={{ padding: `0 ${SECTION_X} 64px` }}>
        <HeroImage src={image} alt={imageAlt} cropAspect={imageCrop} />
      </div>
      <div style={{ padding: `0 ${SECTION_X}` }}>
        <div style={{
          maxWidth: CONTENT_MAX, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1.6fr",
          gap: "64px", alignItems: "start",
        }} className="wf2-row">
          <div>
            <span style={{
              fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.20em", color: c.accent,
              display: "block", marginBottom: "12px",
            }}>{number}</span>
            <h2 style={{
              fontFamily: font.sans, fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 600, color: c.ink, margin: 0,
              letterSpacing: "-0.025em", lineHeight: 1.05,
            }}>
              {heading}.
            </h2>
          </div>
          <div>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
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

function MetaCell({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p style={{
        fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: c.accent, margin: "0 0 8px",
      }}>{label}</p>
      <p style={{
        fontFamily: font.sans, fontSize: "14px", lineHeight: 1.55,
        color: c.ink, margin: 0,
      }}>{value}</p>
    </div>
  );
}

/* ---------- page ---------- */

export default function WayfarerV2() {
  return (
    <>
      <Nav />
      <CaseStudySchema
        name="Wayfarer · Travel Discovery Platform"
        description="Concept case study: a travel discovery platform designed for DesignLab. AI tools expanded what was possible to build. The discipline was deciding what not to build."
        slug="wayfarer"
        dateCreated="2026-05"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.barreiro.com/" },
          { name: "Work", url: "https://www.barreiro.com/#work" },
          { name: "Wayfarer · Travel Discovery Platform", url: "https://www.barreiro.com/work/wayfarer" },
        ]}
      />

      <main id="main-content" style={{ background: c.surface, paddingTop: "72px" }}>

        {/* ─────────────────────────────────────────────
            Title block — Pentagram-style: meta, title,
            one-liner, tags, live link.
        ───────────────────────────────────────────── */}
        <header style={{ maxWidth: CONTENT_MAX, margin: "0 auto", padding: `clamp(56px, 12vw, 120px) ${SECTION_X} clamp(40px, 8vw, 80px)` }}>
          <Eyebrow>Concept · DesignLab · 2026</Eyebrow>
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
            Discover new <span style={{ color: c.brand }}>destinations</span>.
          </h1>
          <p style={{
            fontFamily: font.sans, fontSize: "clamp(20px, 2.4vw, 26px)",
            lineHeight: 1.45, fontWeight: 400, color: c.ink2,
            maxWidth: "640px", margin: "0 0 40px", letterSpacing: "-0.005em",
          }}>
            A discovery-first travel platform with an interactive globe and a 40-destination library. Four-week DesignLab brief expanded into a working product with a documented design system.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "40px" }}>
            <Tag>Information Architecture</Tag>
            <Tag>Design System</Tag>
            <Tag>Multi-step Form UX</Tag>
            <Tag>AI-Assisted Build</Tag>
          </div>
          <a
            href="https://wayfarer.barreiro.com/"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              fontFamily: font.sans, fontSize: "13px", fontWeight: 600,
              letterSpacing: "0.10em", textTransform: "uppercase",
              color: c.accent2, textDecoration: "none",
              borderBottom: `1px solid ${c.accent}`, paddingBottom: "2px",
            }}
          >
            wayfarer.barreiro.com →
          </a>
        </header>

        {/* Sticky arc nav — pinned below the page nav once the reader
            scrolls into the content arcs. Lets a recruiter jump between
            Premise / Research / Decisions / Details without a full
            scroll. Active state set by IntersectionObserver below. */}
        <nav
          aria-label="Case study arcs"
          className="wf2-arc-nav"
          style={{
            position:       "sticky",
            top:            "72px",
            zIndex:         10,
            /* Global `main { display: flex; flex-direction: column }` (set in
               globals.css for the sticky-footer pattern) makes sticky
               children unreliable. align-self + flex-shrink lock the nav so
               it doesn't get stretched or squeezed by the flex layout, and
               width: 100% ensures it spans the row. */
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
            /* Top-nav (72px) + arc-nav height (~54px) = 126. Add a small
               breathing room (14px) so section content doesn't sit flush
               against the sticky strip. */
            var NAV_STACK_HEIGHT = 140;

            /* Defer setup until the arc divs exist further down the page —
               this script runs as soon as the browser parses it, which is
               before the rest of the body. */
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

              /* Programmatic click handler — computes the exact scroll
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
                  /* Immediately paint the active chip so the visitor
                     sees state change even before scroll settles. */
                  anchors.forEach(function (x) { x.removeAttribute('data-active'); });
                  a.setAttribute('data-active', 'true');
                  var y = target.getBoundingClientRect().top + window.scrollY - NAV_STACK_HEIGHT;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                  /* Update the URL hash without triggering a jump. */
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
          .wf2-arc-nav a[data-active] {
            color: ${c.navy} !important;
            border-bottom-color: ${c.navy} !important;
            border-bottom-width: 3px !important;
            font-weight: 700 !important;
          }
          .wf2-arc-nav a[data-active] span:first-child {
            opacity: 1 !important;
            color: ${c.navy} !important;
          }
          .wf2-arc-nav a:hover { color: ${c.ink}; }

          /* Fallback for narrow viewports — global "main { display: flex }"
             (set in globals.css for the sticky-footer pattern) makes
             position: sticky unreliable on direct children at mobile widths.
             Switch to position: fixed so the arc nav stays anchored to the
             top of the viewport like the page Nav above it. */
          @media (max-width: 760px) {
            .wf2-arc-nav {
              position: fixed !important;
              left: 0 !important;
              right: 0 !important;
              top: 72px !important;
              padding: 6px 0 !important;
            }
            .wf2-arc-nav ul { gap: 8px !important; }
            /* Mobile: kill underlines entirely and indicate current
               section with a filled chip. Underlines on a compact strip
               read as busy; a solid pill reads instantly. */
            .wf2-arc-nav a  {
              font-size: 11px !important;
              padding: 6px 10px !important;
              border-bottom: none !important;
              color: ${c.muted} !important;
              transition: background 0.15s ease, color 0.15s ease !important;
            }
            .wf2-arc-nav a[data-active] {
              background: ${c.navy} !important;
              color: #FFFFFF !important;
              border-bottom: none !important;
              font-weight: 700 !important;
            }
            /* Hide the 01/02/03 numerals on phones to recover horizontal
               space without losing the chip-nav itself. */
            .wf2-arc-nav a span:first-child { display: none !important; }
            /* The fixed nav lifts out of flow — push subsequent content
               down by the nav's height (~36px after compaction). */
            .wf2-arc-nav + script + style + div { padding-top: 36px !important; }
          }
        `}</style>

        {/* ── PREMISE arc tint ─ */}
        <div id="arc-premise" style={{ background: "#EEF2F6", marginTop: "24px", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)", scrollMarginTop: "140px" }}>

        {/* ─────────────────────────────────────────────
            Hero — live homepage screenshot.
            Real product, not a deck slide.
        ───────────────────────────────────────────── */}
        <section aria-label="Wayfarer live homepage hero" style={{ padding: `0 ${SECTION_X} 80px` }}>
          <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
            <Image
              src="/images/work/wayfarer/v2/live-homepage-hero-v2.webp"
              alt="Wayfarer homepage. live at wayfarer.barreiro.com. Editorial cover with the globe explorer as the front door."
              width={1600}
              height={1000}
              priority
              sizes="(max-width: 1240px) 100vw, 1240px"
              style={{ width: "100%", height: "auto", display: "block", border: `1px solid ${c.border}` }}
            />
            <p style={{
              fontFamily: font.sans, fontSize: "12px", fontWeight: 500,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: c.muted, margin: "16px 0 0", textAlign: "center",
            }}>
              wayfarer.barreiro.com &middot; live
            </p>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            Pull quote — the case's POV in one line. Plain div: no
            heading, no need to introduce a named landmark.
        ───────────────────────────────────────────── */}
        <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto", padding: `40px ${SECTION_X} 120px` }}>
          <p style={{
            fontFamily: font.sans, fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 500, color: c.brand, margin: 0,
            lineHeight: 1.25, letterSpacing: "-0.015em", maxWidth: "900px",
          }}>
            &ldquo;Travel content is invitation, not data. The original site treated it like data.&rdquo;
          </p>
        </div>

        {/* ─────────────────────────────────────────────
            §01 — The problem
        ───────────────────────────────────────────── */}
        <BigThree
          number="01"
          heading="The problem"
          image="/images/work/wayfarer/v2/live-destinations-grid-v2.webp"
          imageAlt="Live destinations grid at wayfarer.barreiro.com — 40+ destinations across seven continents, the surface the original brief tried to make the homepage."
          imageCrop={null}
          body={
            <>
              Three problems sat inside the brief. Onboarding friction (the multi-step signup form was the most cited pain point; users dropped off mid-flow). Layout inconsistency (the existing design didn&rsquo;t hold across screen sizes). And no visual storytelling (the homepage listed destinations instead of revealing them). The thread underneath: the original site shipped a database, not a destination.
            </>
          }
          callout={{
            decision: "Treat the homepage as an editorial cover, not a directory.",
            why:      "If discovery is the brief, then the front door has to invite, not enumerate. A globe + curated cards do that. A grid of names does not.",
            cost:     "More illustration work, more curation work, more design-system surface. No catalog page above the fold.",
          }}
        />

        </div>
        {/* ─ end PREMISE arc tint */}

        <ArcDivider arc="Research" />

        {/* ── RESEARCH arc tint ─ */}
        <div id="arc-research" style={{ background: "#EFEAF2", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)", scrollMarginTop: "140px" }}>

        {/* ─────────────────────────────────────────────
            Research strip — three real research surfaces
            Wayfarer's equivalent of MSR's "Week 1 / 2 / 3" arc. Plain
            div wrapper; ResearchStrip renders its own labeled section.
        ───────────────────────────────────────────── */}
        <div style={{ padding: `0 0 80px` }}>
          <ResearchStrip />
        </div>

        {/* ─────────────────────────────────────────────
            Process gallery — research → explorations → wireframes.
            Per Cate + Ryan critique: show how I got there, not just
            the result. Three CSS-only tabs over Figma artifacts.
        ───────────────────────────────────────────── */}
        <ProcessGallery />

        </div>
        {/* ─ end RESEARCH arc tint */}

        <ArcDivider arc="Decisions" />

        {/* ── DECISIONS arc tint ─ */}
        <div id="arc-decisions" style={{ background: "#E8EEEC", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)", scrollMarginTop: "140px" }}>

        {/* ─────────────────────────────────────────────
            Information Architecture — routes + user flow.
            Code-rendered for crispness at any DPI; was previously
            buried in the Research tab as a Figma image.
        ───────────────────────────────────────────── */}
        <InformationArchitecture />

        {/* ─────────────────────────────────────────────
            §02 — The bet (cut booking, keep discovery)
        ───────────────────────────────────────────── */}
        <section aria-label="The bet" style={{ padding: `0 0 120px` }}>
          {/* Live globe — the kept surface. Real product, not a deck slide. */}
          <div style={{ padding: `0 ${SECTION_X} 64px` }}>
            <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
              <Image
                src="/images/work/wayfarer/v2/live-globe-bhutan.webp"
                alt="Wayfarer globe explorer with Bhutan selected. live at wayfarer.barreiro.com. The kept surface: spin, click any pin, sticky destination card reveals on the right."
                width={1600}
                height={1000}
                sizes="(max-width: 1240px) 100vw, 1240px"
                style={{ width: "100%", height: "auto", display: "block", border: `1px solid ${c.border}` }}
              />
              <p style={{
                fontFamily: font.sans, fontSize: "12px", fontWeight: 500,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: c.muted, margin: "16px 0 0", textAlign: "center",
              }}>
                Globe explorer &middot; Bhutan selected, sticky card on the right
              </p>
            </div>
          </div>
          {/* Try the live globe yourself — embedded iframe of the
              production site. Lifted OUT of the DECISIONS arc tint via
              a full-viewport white bleed so it visually separates from
              the static globe hero above and CutVsKept below, reading
              as its own "try it" moment. Matches Spotify's
              RecentlyPlayedDemo pattern. */}
          <div style={{
            marginTop: "16px",
            marginBottom: "80px",
            marginLeft: "calc(50% - 50vw)",
            marginRight: "calc(50% - 50vw)",
            background: "#FFFFFF",
            padding: `clamp(56px, 8vw, 96px) ${SECTION_X}`,
          }}>
            <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
              <GlobeIframeDemo />
            </div>
          </div>
          {/* Code-rendered Cut vs Kept — neutrals only, no pastel pink/green. */}
          <div style={{ padding: `0 ${SECTION_X} 64px` }}>
            <CutVsKept />
          </div>

          <div style={{ padding: `0 ${SECTION_X}` }}>
            <div style={{
              maxWidth: CONTENT_MAX, margin: "0 auto",
              display: "grid", gridTemplateColumns: "1fr 1.6fr",
              gap: "64px", alignItems: "start",
            }} className="wf2-row">
              <div>
                <span style={{
                  fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
                  letterSpacing: "0.20em", color: c.accent,
                  display: "block", marginBottom: "12px",
                }}>02</span>
                <h2 style={{
                  fontFamily: font.sans, fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: 600, color: c.ink, margin: 0,
                  letterSpacing: "-0.025em", lineHeight: 1.05,
                }}>
                  The bet.
                </h2></div>
              <div>
                <p style={{
                  fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
                  lineHeight: 1.75, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
                }}>
                  Four weeks into building with AI-assisted development, I had a working booking interface. Hotels, cars, full detail pages with pricing. The tools made it trivial to go from concept to functional UI in hours. The brief said discovery, not booking. I scaled it back. Removed hotel and car booking from destination pages. Kept the globe explorer, the trip planner, and the multi-step signup as the center of gravity. AI tools expanded what was possible to build. The discipline was deciding what not to build.
                </p>
                <Callout
                  decision="Discovery over booking. Cut the transactional layer."
                  why="Booking UI introduces a transactional mental model into a platform designed for exploration. A user browsing destinations in Kyoto doesn&rsquo;t need hotel pricing competing for their attention. They need the content that makes them want to go in the first place."
                  cost="Weeks of working booking interfaces deleted. Lower commerce monetization story. Harder to defend against &lsquo;but where&rsquo;s the buy button.&rsquo;"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            Brand identity card — built in code so the
            brand reads on the page without a separate
            exported visual. Uses Wayfarer navy + coral.
        ───────────────────────────────────────────── */}
        <BrandIdentitySection />

        </div>
        {/* ─ end DECISIONS arc tint */}

        <ArcDivider arc="Details" />

        {/* ── DETAILS arc tint ─ */}
        <div id="arc-details" style={{ background: "#ECEFF3", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)", scrollMarginTop: "140px" }}>

        {/* ─────────────────────────────────────────────
            Design System carousel — 3 tabs (Color, Type,
            Components). CSS-only tabs, server-component
            safe (no React state).
        ───────────────────────────────────────────── */}
        <DesignSystemSection />

        {/* ─────────────────────────────────────────────
            §03 — Shipped (Trip Planner + Multi-step
            signup form + Annotated screen + Funnel
            visual)
        ───────────────────────────────────────────── */}
        <ShippedSection />

        {/* ─────────────────────────────────────────────
            Accessibility audit — Wayfarer-only senior
            signal. MSR doesn't have this.
        ───────────────────────────────────────────── */}
        <AccessibilitySection />

        {/* ─────────────────────────────────────────────
            Mobile section
        ───────────────────────────────────────────── */}
        <section aria-label="Mobile" style={{ padding: `clamp(56px, 12vw, 120px) ${SECTION_X}` }}>
          <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
            <Eyebrow>Mobile</Eyebrow>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(20px, 2vw, 24px)",
              fontWeight: 500, color: c.ink, margin: "0 0 48px",
              letterSpacing: "-0.01em", lineHeight: 1.4, maxWidth: PROSE_MAX,
            }}>
              Discovery has to survive the phone. Hierarchy holds, the globe reduces to a continent grid, and the signup keeps its progress meter.
            </p>

            {/* Process artifacts — Kindle Scribe sketches of the mobile
                homepage. Three pages, one sitting. The paper-to-pixel
                receipt for the mobile IA. */}
            <div style={{ marginBottom: "48px" }}>
              <h3 style={{
                fontFamily:    font.sans,
                fontSize:      "clamp(18px, 1.8vw, 22px)",
                fontWeight:    600,
                color:         c.ink,
                margin:        "0 0 8px",
                letterSpacing: "-0.015em",
              }}>
                Sketched before pixels.
              </h3>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "15px",
                lineHeight: 1.6,
                color:      c.ink2,
                margin:     "0 0 24px",
                maxWidth:   PROSE_MAX,
              }}>
                Mobile IA on paper before Figma opened. Kindle Scribe, three pages of the same phone-width canvas, sketched in one sitting.
              </p>
              <div className="wf2-sketches" style={{
                display:             "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap:                 "24px",
              }}>
                {[
                  {
                    src:     "/images/work/wayfarer/sketches/mobile-part-1.jpg",
                    caption: "Part 1 · Hero, sign-up prompt, first three destinations. The globe as the front door survives here as a pin-selected card list.",
                    alt:     "Hand sketch on a Kindle Scribe. Wayfarer mobile homepage part 1 of 3. Logo, search icon, hamburger menu across the top. Hero copy reading Discover Unforgettable New Destinations. Sign Up button. Destinations header with three stacked cards labeled Bhutan, Greenland, and Tokyo.",
                  },
                  {
                    src:     "/images/work/wayfarer/sketches/mobile-part-2.jpg",
                    caption: "Part 2 · Product benefits stack. Four icon-plus-header rows, each a one-line pitch, terminating in the See-for-yourself CTA.",
                    alt:     "Hand sketch on a Kindle Scribe. Wayfarer mobile homepage part 2 of 3. Product Benefits section header, four stacked cards each with an icon and a headline, See-for-yourself CTA at the bottom.",
                  },
                  {
                    src:     "/images/work/wayfarer/sketches/mobile-part-3.jpg",
                    caption: "Part 3 · Explore More, Wayfarer Hub, Stay Connected, Follow the Journey, footer. The connective tissue below the fold.",
                    alt:     "Hand sketch on a Kindle Scribe. Wayfarer mobile homepage part 3 of 3. Logo block, Explore More section, Your Wayfarer Hub, Stay Connected, Follow the Journey with four social circles, footer with copyright.",
                  },
                ].map((s, i) => (
                  <figure key={i} style={{ margin: 0 }}>
                    <Image
                      src={s.src}
                      alt={s.alt}
                      width={1600}
                      height={1200}
                      sizes="(max-width: 760px) 100vw, (max-width: 1240px) 33vw, 400px"
                      style={{
                        width:   "100%",
                        height:  "auto",
                        display: "block",
                        border:  `1px solid ${c.border}`,
                      }}
                    />
                    <figcaption style={{
                      fontFamily: font.sans,
                      fontSize:   "12px",
                      lineHeight: 1.55,
                      color:      c.muted,
                      margin:     "12px 0 0",
                      letterSpacing: "0.01em",
                    }}>
                      {s.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ─────────────────────────────────────────────
            Meta block — Pentagram-style bottom strip
        ───────────────────────────────────────────── */}
        <section aria-label="Case study metadata" style={{
          borderTop: `1px solid ${c.border}`,
          padding: `64px ${SECTION_X}`,
          background: c.surface,
        }}>
          <div style={{
            maxWidth: CONTENT_MAX, margin: "0 auto",
            /* 4-col reads cleaner than 5-col; Type folded into Role
               since the eyebrow already says "DesignLab · Concept." */
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            gap: "32px",
          }} className="wf2-meta">
            <MetaCell label="Role"   value="UX/UI Designer · End-to-end" />
            <MetaCell label="Year"   value="2026 · DesignLab Concept" />
            <MetaCell label="Stack"  value="Figma · Next.js · Mapbox" />
            <MetaCell label="Live"   value={<a href="https://wayfarer.barreiro.com/" target="_blank" rel="noopener noreferrer" style={{ color: c.accent2, textDecoration: "none", borderBottom: `1px solid ${c.accent}` }}>wayfarer.barreiro.com</a>} />
          </div>
        </section>
        </div>
        {/* ─ end DETAILS arc tint */}

      </main>

      <ScrollProgress />
      <RelatedCaseStudies current="wayfarer" />
      <Footer />

      {/* Responsive */}
      <style>{`
        /* Design system carousel — CSS-only tabs */
        .wf2-ds-carousel > input[type="radio"] { position: absolute; opacity: 0; clip: rect(0 0 0 0); clip-path: inset(50%); width: 1px; height: 1px; overflow: hidden; }
        .wf2-ds-panel { display: none; }
        #wf2-ds-tab-1:checked ~ .wf2-ds-panels > [data-panel="1"] { display: block; }
        #wf2-ds-tab-2:checked ~ .wf2-ds-panels > [data-panel="2"] { display: block; }
        #wf2-ds-tab-3:checked ~ .wf2-ds-panels > [data-panel="3"] { display: block; }
        #wf2-ds-tab-1:checked ~ .wf2-ds-nav .wf2-ds-tab-1,
        #wf2-ds-tab-2:checked ~ .wf2-ds-nav .wf2-ds-tab-2,
        #wf2-ds-tab-3:checked ~ .wf2-ds-nav .wf2-ds-tab-3 {
          background: #FFFFFF;
          box-shadow: inset 0 -3px 0 var(--color-brand);
        }
        .wf2-ds-tab:hover { background: rgba(255,255,255,0.5); }

        /* Signup carousel — same pattern, six tabs (5 form steps + welcome) */
        .wf2-su-carousel > input[type="radio"] { position: absolute; opacity: 0; clip: rect(0 0 0 0); clip-path: inset(50%); width: 1px; height: 1px; overflow: hidden; }
        .wf2-su-panel { display: none; }
        #wf2-su-tab-1:checked ~ .wf2-su-panels > [data-panel="1"],
        #wf2-su-tab-2:checked ~ .wf2-su-panels > [data-panel="2"],
        #wf2-su-tab-3:checked ~ .wf2-su-panels > [data-panel="3"],
        #wf2-su-tab-4:checked ~ .wf2-su-panels > [data-panel="4"],
        #wf2-su-tab-5:checked ~ .wf2-su-panels > [data-panel="5"],
        #wf2-su-tab-6:checked ~ .wf2-su-panels > [data-panel="6"] { display: block; }
        #wf2-su-tab-1:checked ~ .wf2-su-nav .wf2-su-tab-1,
        #wf2-su-tab-2:checked ~ .wf2-su-nav .wf2-su-tab-2,
        #wf2-su-tab-3:checked ~ .wf2-su-nav .wf2-su-tab-3,
        #wf2-su-tab-4:checked ~ .wf2-su-nav .wf2-su-tab-4,
        #wf2-su-tab-5:checked ~ .wf2-su-nav .wf2-su-tab-5,
        #wf2-su-tab-6:checked ~ .wf2-su-nav .wf2-su-tab-6 {
          background: #FFFFFF;
          box-shadow: inset 0 -3px 0 var(--color-brand);
        }
        .wf2-su-tab:hover { background: rgba(255,255,255,0.5); }

        /* A11y audit — desktop shows the full image; mobile card list
           stays hidden by default and switches on at the mobile break. */
        .wf2-a11y-mobile { display: none; }

        /* Process gallery — cards stacked on scroll. Each card is
           position: sticky at a slightly different top offset so that
           when card 2 arrives it stacks 16px below card 1's top,
           showing a hint of card 1 above it. Fan-out stack effect. */
        .wf2-pg-stack {
          padding-bottom: 30vh;
          display: flex;
          flex-direction: column;
        }
        .wf2-pg-card {
          position: sticky;
          background: #FFFFFF;
          border: 1px solid ${c.border};
          box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);
          margin-bottom: 80vh;
        }
        .wf2-pg-card:last-child {
          margin-bottom: 0;
        }
        /* Sticky top offsets — 148 (nav+8) then step by 16 so each card
           slides in below the previous one's header. */
        .wf2-pg-card:nth-child(1) { top: 148px; z-index: 1; }
        .wf2-pg-card:nth-child(2) { top: 164px; z-index: 2; }
        .wf2-pg-card:nth-child(3) { top: 180px; z-index: 3; }
        .wf2-pg-card-header {
          padding: 20px 24px;
          display: flex;
          align-items: baseline;
          gap: 14px;
          background: #FAFAF9;
          border-bottom: 1px solid ${c.border};
        }
        .wf2-pg-num {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: ${c.accent};
          text-transform: uppercase;
        }
        .wf2-pg-label {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.005em;
          color: ${c.ink};
          flex: 1;
        }
        .wf2-pg-card-body {
          padding: clamp(28px, 4vw, 48px);
          background: #FFFFFF;
          max-height: calc(100vh - 260px);
          overflow-y: auto;
        }

        /* Focus ring projection: when a (visually-hidden but focusable)
           radio gets keyboard focus, paint a teal outline on its label.
           Uses :has() so the label-as-tab pattern still works for
           keyboard users. */
        .wf2-ds-carousel:has(#wf2-ds-tab-1:focus-visible) .wf2-ds-tab-1,
        .wf2-ds-carousel:has(#wf2-ds-tab-2:focus-visible) .wf2-ds-tab-2,
        .wf2-ds-carousel:has(#wf2-ds-tab-3:focus-visible) .wf2-ds-tab-3,
        .wf2-su-carousel:has(#wf2-su-tab-1:focus-visible) .wf2-su-tab-1,
        .wf2-su-carousel:has(#wf2-su-tab-2:focus-visible) .wf2-su-tab-2,
        .wf2-su-carousel:has(#wf2-su-tab-3:focus-visible) .wf2-su-tab-3,
        .wf2-su-carousel:has(#wf2-su-tab-4:focus-visible) .wf2-su-tab-4,
        .wf2-su-carousel:has(#wf2-su-tab-5:focus-visible) .wf2-su-tab-5,
        .wf2-su-carousel:has(#wf2-su-tab-6:focus-visible) .wf2-su-tab-6 {
          outline: 2px solid var(--color-focus-ring);
          outline-offset: -2px;
        }

        @media (max-width: 760px) {
          .wf2-row              { grid-template-columns: 1fr !important; gap: 32px !important; }
          .wf2-callout-grid     { grid-template-columns: 1fr !important; gap: 22px !important; }
          .wf2-cutkept          { grid-template-columns: 1fr !important; gap: 16px !important; }
          .wf2-logo-pair        { grid-template-columns: 1fr !important; gap: 12px !important; }
          .wf2-signup-grid      { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .wf2-meta             { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .wf2-sketches         { grid-template-columns: 1fr !important; gap: 20px !important; }
          /* Process gallery stack cards — flatten to normal flow on
             mobile so the sticky stack doesn't crowd a small viewport. */
          .wf2-pg-card { position: static !important; margin-bottom: 24px !important; }
          .wf2-pg-card-body { max-height: none !important; overflow: visible !important; }
          /* Token table swipe hint — visible only on mobile where the
             table overflows the viewport horizontally. */
          .wf2-token-swipe-hint { display: block !important; }
          /* A11y audit: on mobile the image text is illegible, so hide
             the image and reveal the native card list of findings. */
          .wf2-a11y-image  { display: none !important; }
          .wf2-a11y-mobile { display: block !important; }
          .wf2-brand-grid       { grid-template-columns: 1fr !important; gap: 32px !important; padding: 40px 28px !important; }
          .wf2-swatch-grid      { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
          .wf2-funnel-row       { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
          .wf2-funnel-row > div[aria-hidden] { display: none !important; }
          .wf2-research-strip   { grid-template-columns: 1fr !important; gap: 20px !important; }
          .wf2-personas-grid    { grid-template-columns: 1fr !important; gap: 16px !important; }
          .wf2-annotated-grid   { grid-template-columns: 1fr !important; gap: 32px !important; }
          .wf2-ds-nav           { flex-direction: column !important; }
          .wf2-ds-nav .wf2-ds-tab { border-right: none !important; border-bottom: 1px solid var(--color-border) !important; }
          .wf2-su-nav           { grid-template-columns: repeat(3, 1fr) !important; }
          .wf2-su-nav .wf2-su-tab { padding: 12px 6px !important; border-bottom: 1px solid var(--color-border) !important; }
          .wf2-su-nav .wf2-su-tab:nth-child(3n) { border-right: none !important; }
          .wf2-pg-nav           { flex-direction: column !important; }
          .wf2-pg-nav .wf2-pg-tab { border-right: none !important; border-bottom: 1px solid var(--color-border) !important; }
          .wf2-process-research-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .wf2-process-wireframes-grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .wf2-competitor-row   { grid-template-columns: 1fr !important; }
          .wf2-competitor-row > div:first-child { border-right: none !important; border-bottom: 1px solid var(--color-border) !important; }
          .wf2-token-scroll { overflow-x: auto !important; -webkit-overflow-scrolling: touch; }
          .wf2-token-scroll table { min-width: 640px !important; }

          /* Brief vs Delivered: stack the table on mobile instead of
             horizontal-scrolling, so each row reads as a card with the
             brief label above the delivered description. */
          .wf2-brief-scroll { overflow-x: visible !important; }
          .wf2-brief-scroll table,
          .wf2-brief-scroll thead,
          .wf2-brief-scroll tbody,
          .wf2-brief-scroll tr,
          .wf2-brief-scroll td { display: block !important; width: 100% !important; min-width: 0 !important; }
          .wf2-brief-scroll thead { display: none !important; }
          .wf2-brief-scroll tr { padding: 16px 18px !important; border-bottom: 1px solid var(--color-border, #DEDCD7) !important; }
          .wf2-brief-scroll tr:last-child { border-bottom: none !important; }
          .wf2-brief-scroll td { padding: 0 0 6px 0 !important; border: none !important; }
          .wf2-brief-scroll td:first-child { font-size: 10px !important; font-weight: 700 !important; letter-spacing: 0.16em !important; text-transform: uppercase !important; opacity: 0.7 !important; margin-bottom: 4px !important; width: auto !important; }
          .wf2-brief-scroll td:last-child { padding-bottom: 0 !important; }
          .wf2-ia-row           { grid-template-columns: auto 1fr !important; grid-template-rows: auto auto !important; row-gap: 6px !important; column-gap: 12px !important; }
          .wf2-ia-row .wf2-ia-note { grid-column: 1 / -1 !important; text-align: left !important; padding-top: 4px !important; }
          .wf2-ia-flow          { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
          .wf2-ia-flow .wf2-ia-arrow { display: none !important; }
        }
      `}</style>
    </>
  );
}

/* ============================================================================
   SECTIONS
============================================================================ */

/* Research strip — 3-beat horizontal: Card Sort, Personas, Site Audits */
function ResearchStrip() {
  const stepLabel: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
    color: c.accent, letterSpacing: "0.20em",
    textTransform: "uppercase", margin: "0 0 6px",
  };
  const stepBody: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "15px", color: c.ink,
    fontWeight: 500, margin: 0, letterSpacing: "-0.005em",
  };
  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto", padding: `0 ${SECTION_X}` }}>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "32px",
        borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`,
        padding: "28px 0",
      }} className="wf2-research-strip">
        <div>
          <p style={stepLabel}>Phase 1</p>
          <p style={stepBody}>Heuristic evaluation + site audit</p>
        </div>
        <div>
          <p style={stepLabel}>Phase 2</p>
          <p style={stepBody}>Card sort, IA, personas</p>
        </div>
        <div>
          <p style={stepLabel}>Phase 3</p>
          <p style={stepBody}>The discovery pivot</p>
        </div>
      </div>
    </div>
  );
}

/* Brand identity — Wayfarer navy ground with coral accent.
   Mirrors MSR's pattern: full-bleed brand block + heading/body 2-col below. */
function BrandIdentitySection() {
  return (
    <section aria-label="Brand identity" style={{ padding: `0 0 120px` }}>
      {/* Logomark pair — black on light, white on navy. Same recipe as the
          live brand guidelines page. Uses unoptimized + invert filter so the
          SVG renders correctly on dark surfaces (the SVG ships fill="black"). */}
      <div style={{ padding: `0 ${SECTION_X} 24px` }}>
        <div style={{
          maxWidth: CONTENT_MAX, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px",
        }} className="wf2-logo-pair">
          <div style={{
            padding:    "72px 24px",
            background: "#FFFFFF",
            border:     `1px solid ${c.border}`,
            display:    "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Image
              src="/images/work/wayfarer/wayfarer-logo.svg"
              alt="Wayfarer wordmark, native black on paper."
              width={240}
              height={47}
              unoptimized
              style={{ width: "100%", maxWidth: "260px", height: "auto", display: "block" }}
            />
          </div>
          <div style={{
            padding:    "72px 24px",
            background: c.navyDark,
            border:     `1px solid ${c.navyDark}`,
            display:    "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Image
              src="/images/work/wayfarer/wayfarer-logo.svg"
              alt="Wayfarer wordmark, white treatment on navy."
              width={240}
              height={47}
              unoptimized
              style={{ width: "100%", maxWidth: "260px", height: "auto", display: "block", filter: "invert(1) brightness(2)" }}
            />
          </div>
        </div>
      </div>

      {/* Brand sig — the actual live brand composition, not a Figma export. */}
      <div style={{ padding: `0 ${SECTION_X} 64px` }}>
        <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
          <Image
            src="/images/work/wayfarer/wayfarer-sig-brand.webp"
            alt="Wayfarer brand signature. wordmark, globemark, navy + coral colorways, three application rules."
            width={2400} height={1500}
            sizes="(max-width: 1240px) 100vw, 1240px"
            style={{ width: "100%", height: "auto", display: "block", border: `1px solid ${c.border}` }}
          />
        </div>
      </div>

      <div style={{ padding: `0 ${SECTION_X}` }}>
        <div style={{
          maxWidth: CONTENT_MAX, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1.6fr",
          gap: "64px", alignItems: "start",
        }} className="wf2-row">
          <div>
            <Eyebrow>Brand identity</Eyebrow>
            <h2 style={{
              fontFamily: font.sans, fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 600, color: c.ink, margin: 0,
              letterSpacing: "-0.025em", lineHeight: 1.05,
            }}>
              Editorial, not booking-engine.
            </h2></div>
          <div>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
            }}>
              Navy + coral on paper. Globe wordmark anchors the brand. Voice borrows from National Geographic and Apartamento more than from Expedia. The token names matter: every brand color in the system maps directly to a CSS variable in production. The Figma file IS the source of truth; this case study is the editorial cut.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Design System carousel — 3 tabs (Color, Type, Components) */
function DesignSystemSection() {
  return (
    <section aria-label="Design system" style={{ padding: `0 0 120px` }}>
      <div style={{ padding: `0 ${SECTION_X} 48px` }}>
        <div style={{
          maxWidth: CONTENT_MAX, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1.6fr",
          gap: "64px", alignItems: "start",
        }} className="wf2-row">
          <div>
            <Eyebrow>Design system</Eyebrow>
            <h2 style={{
              fontFamily: font.sans, fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 600, color: c.ink, margin: 0,
              letterSpacing: "-0.025em", lineHeight: 1.05,
            }}>
              Tokens first.<br/>Code-cross-referenced.
            </h2></div>
          <div>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
            }}>
              Four color ramps, nine type styles, eighteen documented components. Every component in the Figma source carries a &lsquo;MATCHES src/...&rsquo; cross-reference to the production file it ships from. Design system coherence isn&rsquo;t a claim; it&rsquo;s a paper trail.
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: `0 ${SECTION_X}` }}>
        <p style={{
          fontFamily: font.sans, fontSize: "11px", fontWeight: 600,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: c.muted, margin: "0 0 16px",
          maxWidth: CONTENT_MAX, marginInline: "auto",
        }}>
          <span aria-hidden="true" style={{ color: c.accent }}>→ </span>
          Click 01 · 02 · 03 to switch panels
        </p>
        <DesignSystemCarousel />
      </div>

      {/* Cross-project token comparison — proves one vocabulary,
          three projects. Same recipe ported from v1. */}
      <div style={{ padding: `64px ${SECTION_X} 0` }}>
        <TokenCrossProjectTable />
      </div>
    </section>
  );
}

/* TokenCrossProjectTable — shows that the same token names hold
   different values across three projects (Wayfarer + AB Core + MSR).
   The naming convention is the contract; values are the variable. */
function TokenCrossProjectTable() {
  const rows = [
    { token: "brand-500",   wayfarer: "#3E3C78", brand: "#1C3F5E", msr: "#1C3F5E" },
    { token: "brand-900",   wayfarer: "#2C2B5A", brand: "#091016", msr: "#13100C" },
    { token: "accent-500",  wayfarer: "#D27A5E", brand: "#C4703A", msr: "#C4703A" },
    { token: "neutral-50",  wayfarer: "#F8F9FB", brand: "#F8F7F7", msr: "#F8F7F7" },
    { token: "neutral-500", wayfarer: "#6B6560", brand: "#6B6560", msr: "#6B6560" },
  ];
  const thStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
    letterSpacing: "0.18em", textTransform: "uppercase",
    textAlign: "left", padding: "14px 16px",
    borderBottom: `1px solid ${c.border}`,
  };
  const tdStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "14px",
    padding: "14px 16px", verticalAlign: "middle",
    borderBottom: `1px solid ${c.border}`,
  };
  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1.6fr",
        gap: "64px", alignItems: "start", marginBottom: "32px",
      }} className="wf2-row">
        <div>
          <Eyebrow>Receipts</Eyebrow>
          <h3 style={{
            fontFamily: font.sans, fontSize: "clamp(24px, 2.8vw, 32px)",
            fontWeight: 600, color: c.ink, margin: 0,
            letterSpacing: "-0.02em", lineHeight: 1.15,
          }}>
            One vocabulary.<br />Three projects.
          </h3>
        </div>
        <div>
          <p style={{
            fontFamily: font.sans, fontSize: "clamp(15px, 1.4vw, 17px)",
            lineHeight: 1.7, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
          }}>
            Same token names, different values per project. Wayfarer ships navy + coral. The portfolio system (AB Core) and Men&rsquo;s Sole Revival share the same primitives at different points on the ramp. The naming convention is the contract; values are the variable.
          </p>
        </div>
      </div>

      <div className="wf2-token-scroll" tabIndex={0} role="region"
        aria-label="Design tokens table, scroll horizontally to view all columns"
        style={{
          border: `1px solid ${c.border}`, overflow: "auto",
          background: "#FFFFFF",
          WebkitOverflowScrolling: "touch",
        }}>
        <table style={{ minWidth: 640, width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
          <thead>
            <tr style={{ background: c.callout }}>
              <th style={{ ...thStyle, width: "22%", color: c.muted }}>Token</th>
              <th style={{ ...thStyle, width: "26%", color: c.brand, fontWeight: 800 }}>Wayfarer</th>
              <th style={{ ...thStyle, width: "26%", color: c.muted }}>AB Core</th>
              <th style={{ ...thStyle, width: "26%", color: c.muted }}>MSR</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.token} style={{ background: i % 2 === 0 ? "#FFFFFF" : c.callout }}>
                <td style={{ ...tdStyle, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "13px", color: c.muted }}>
                  {r.token}
                </td>
                <td style={tdStyle}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ width: 16, height: 16, background: r.wayfarer, border: "1px solid rgba(0,0,0,0.10)", display: "inline-block" }} />
                    <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "13px", color: c.ink, fontWeight: 600 }}>{r.wayfarer}</span>
                  </span>
                </td>
                <td style={tdStyle}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ width: 16, height: 16, background: r.brand, border: "1px solid rgba(0,0,0,0.10)", display: "inline-block" }} />
                    <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "13px", color: c.ink2 }}>{r.brand}</span>
                  </span>
                </td>
                <td style={tdStyle}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ width: 16, height: 16, background: r.msr, border: "1px solid rgba(0,0,0,0.10)", display: "inline-block" }} />
                    <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "13px", color: c.ink2 }}>{r.msr}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile-only swipe hint — appears when the table overflows and
          the reader needs to know they can scroll horizontally. */}
      <p className="wf2-token-swipe-hint" style={{
        fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
        letterSpacing: "0.14em", textTransform: "uppercase",
        color: c.muted, margin: "10px 0 0", display: "none",
      }}>
        Swipe to see more &rarr;
      </p>
      <p style={{
        fontFamily: font.sans, fontSize: "12px",
        color: c.muted, lineHeight: 1.55, margin: "12px 0 0",
        letterSpacing: "0.01em",
      }}>
        Token table excerpted from the AB Core Library. Same naming convention across all three projects.
      </p>
    </div>
  );
}

function DesignSystemCarousel() {
  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
      <div className="wf2-ds-carousel" style={{
        border: `1px solid ${c.border}`, background: "#FAFAF9",
      }}>
        <input type="radio" name="wf2-ds-tabs" id="wf2-ds-tab-1" defaultChecked aria-label="Color tokens panel" />
        <input type="radio" name="wf2-ds-tabs" id="wf2-ds-tab-2" aria-label="Typography panel" />
        <input type="radio" name="wf2-ds-tabs" id="wf2-ds-tab-3" aria-label="Components panel" />

        <div className="wf2-ds-nav" style={{ display: "flex", borderBottom: `1px solid ${c.border}` }}>
          {[
            { id: "wf2-ds-tab-1", num: "01", label: "Color tokens" },
            { id: "wf2-ds-tab-2", num: "02", label: "Typography" },
            { id: "wf2-ds-tab-3", num: "03", label: "Components" },
          ].map((tab, i, arr) => (
            <label key={tab.id} htmlFor={tab.id}
              className={`wf2-ds-tab wf2-ds-tab-${i + 1}`}
              style={{
                flex: 1, padding: "20px 24px", cursor: "pointer",
                display: "flex", alignItems: "baseline", gap: "10px",
                borderRight: i < arr.length - 1 ? `1px solid ${c.border}` : "none",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              <span style={{
                fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
                color: c.accent, letterSpacing: "0.18em",
              }}>{tab.num}</span>
              <span style={{
                fontFamily: font.sans, fontSize: "14px", fontWeight: 500,
                color: c.ink, letterSpacing: "-0.005em",
              }}>{tab.label}</span>
            </label>
          ))}
        </div>

        <div className="wf2-ds-panels" style={{ padding: "clamp(32px, 4vw, 56px) clamp(24px, 5vw, 56px)", background: "#FFFFFF" }}>
          <div className="wf2-ds-panel" data-panel="1">
            <Image
              src="/images/work/wayfarer/wayfarer-sig-color.webp"
              alt="Wayfarer color tokens. four ramps (Brand Navy, Coral, Paper, Ink) with per-step hex values matching src/app/globals.css."
              width={2400} height={1500}
              sizes="(max-width: 1240px) 100vw, 1240px"
              style={{ width: "100%", height: "auto", display: "block", border: `1px solid ${c.border}` }}
            />
          </div>
          <div className="wf2-ds-panel" data-panel="2">
            <Image
              src="/images/work/wayfarer/wayfarer-sig-typography.webp"
              alt="Wayfarer typography. 9 styles: Display, Heading 1-3, Body, Label, Caption. Type ramp with usage notes per style."
              width={2400} height={1500}
              sizes="(max-width: 1240px) 100vw, 1240px"
              style={{ width: "100%", height: "auto", display: "block", border: `1px solid ${c.border}` }}
            />
          </div>
          <div className="wf2-ds-panel" data-panel="3">
            <p style={{
              fontFamily: font.sans, fontSize: "15px", lineHeight: 1.6,
              color: c.ink2, margin: "0 0 24px", maxWidth: PROSE_MAX,
            }}>
              Eighteen documented sections in the Figma source: Color, Typography, Button, Icon Button, Link, Search Pill, Kbd, Eyebrow Label, Badge, Text Input, Destination Card, Section Header, Navbar, Footer, Map, Mobile Nav, Sign In Modal, Destination Image. Each one carries a code cross-reference. The Destination Card (Section 11) is shown.
            </p>
            <Image
              src="/images/work/wayfarer/wayfarer-sig-components-teaser.webp"
              alt="Design System components teaser. eighteen documented sections, each with a code cross-reference to src/."
              width={2400} height={1500}
              sizes="(max-width: 1240px) 100vw, 1240px"
              style={{ width: "100%", height: "auto", display: "block", border: `1px solid ${c.border}` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* §03 Shipped — Trip Planner + Multi-step signup + Annotated screen + Funnel */
function ShippedSection() {
  return (
    <section aria-label="Shipped" style={{ padding: `0 ${SECTION_X} 40px` }}>
      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
        {/* Heading + body */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.6fr",
          gap: "64px", alignItems: "start", marginBottom: "64px",
        }} className="wf2-row">
          <div>
            <span style={{
              fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.20em", color: c.accent,
              display: "block", marginBottom: "12px",
            }}>03</span>
            <h2 style={{
              fontFamily: font.sans, fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 600, color: c.ink, margin: 0,
              letterSpacing: "-0.025em", lineHeight: 1.05,
            }}>
              Shipped.
            </h2></div>
          <p style={{
            fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
            lineHeight: 1.75, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
          }}>
            wayfarer.barreiro.com is live. Homepage, globe explorer, destinations grid, destination detail templates, trip planner, 5-step signup. Six-page IA mapped to user verbs: orient, browse, explore, evaluate, plan, personalize. Eighty-seven destinations live on the globe. Full design system documented and code-cross-referenced.
          </p>
        </div>

        {/* Live destination detail — Kyoto, full template.
            Editorial pattern: hero photo, about, gallery, highlights, location, quick-info side rail. */}
        <div style={{ marginBottom: "56px" }}>
          <p style={{
            fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.20em", textTransform: "uppercase",
            color: c.accent, margin: "0 0 12px",
          }}>
            Destination template &middot; live
          </p>
          <h3 style={{
            fontFamily: font.sans, fontSize: "clamp(22px, 2.6vw, 30px)",
            fontWeight: 600, color: c.ink, margin: "0 0 24px",
            letterSpacing: "-0.02em", lineHeight: 1.2,
          }}>
            One template, eighty-seven destinations.
          </h3>
          <Image
            src="/images/work/wayfarer/v2/live-destination-kyoto-v3.webp"
            alt="Live Kyoto destination page at wayfarer.barreiro.com. hero photo, about copy, gallery, five highlights, location map, quick-info side rail, related destinations."
            width={1600} height={2879}
            sizes="(max-width: 1240px) 100vw, 1100px"
            style={{ width: "100%", height: "auto", display: "block", border: `1px solid ${c.border}` }}
          />
          <p style={{
            fontFamily: font.sans, fontSize: "13px", lineHeight: 1.6,
            color: c.muted, margin: "16px 0 0", maxWidth: "780px",
          }}>
            Every destination ships through the same six-block template: hero, about, gallery, highlights, location, quick info. The template is the contract; content is the variable.
          </p>
        </div>

        {/* Annotated trip planner — single canonical view of the Trip Planner. */}
        <div style={{ marginBottom: "40px" }}>
          <AnnotatedTripPlanner />
        </div>

        {/* Planner states — empty + add-segment modal. The journey the user
            takes from blank canvas to populated plan. */}
        <div style={{ marginTop: "56px", marginBottom: "40px" }}>
          <p style={{
            fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.20em", textTransform: "uppercase",
            color: c.accent, margin: "0 0 12px",
          }}>
            Planner journey
          </p>
          <h3 style={{
            fontFamily: font.sans, fontSize: "clamp(20px, 2.2vw, 26px)",
            fontWeight: 600, color: c.ink, margin: "0 0 20px",
            letterSpacing: "-0.015em", lineHeight: 1.25,
          }}>
            Two more states. From blank to a real plan.
          </h3>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }} className="wf2-cutkept">
            <figure style={{ margin: 0 }}>
              <Image
                src="/images/work/wayfarer/v2/live-planner-empty.webp"
                alt="Trip planner empty state. three primitives header (segments, days, saved) plus &lsquo;Add your first segment&rsquo; CTA and an empty Saved sidebar."
                width={1600} height={1100}
                sizes="(max-width: 760px) 100vw, 50vw"
                style={{ width: "100%", height: "auto", display: "block", border: `1px solid ${c.border}` }}
              />
              <figcaption style={{
                fontFamily: font.sans, fontSize: "11px", margin: "10px 0 0",
                display: "flex", gap: "8px", alignItems: "baseline",
              }}>
                <span style={{ fontWeight: 700, letterSpacing: "0.15em", color: c.accent }}>01</span>
                <span style={{ color: c.ink, letterSpacing: "-0.005em" }}>Empty state &middot; one CTA</span>
              </figcaption>
            </figure>
            <figure style={{ margin: 0 }}>
              <Image
                src="/images/work/wayfarer/v2/live-planner-add-segment.webp"
                alt="Add-segment modal. filterable list of all destinations with country labels. Pick one to populate as a segment."
                width={1600} height={1000}
                sizes="(max-width: 760px) 100vw, 50vw"
                style={{ width: "100%", height: "auto", display: "block", border: `1px solid ${c.border}` }}
              />
              <figcaption style={{
                fontFamily: font.sans, fontSize: "11px", margin: "10px 0 0",
                display: "flex", gap: "8px", alignItems: "baseline",
              }}>
                <span style={{ fontWeight: 700, letterSpacing: "0.15em", color: c.accent }}>02</span>
                <span style={{ color: c.ink, letterSpacing: "-0.005em" }}>Add-segment modal &middot; filter then pick</span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Decision callout */}
        <Callout
          decision="Plan without dates. Segment, day, and saved location, modeled separately."
          why="A user planning a Kyoto trip months out doesn&rsquo;t know the dates. They know the moves. Segment is the unit of commitment; day is the unit of duration; saved is the standalone &lsquo;maybe.&rsquo; Modeled separately, they compose without forcing a calendar."
          cost="The data model is more complex than a simple itinerary. The UI has to teach the three primitives without using their names."
        />

        {/* What I cut */}
        <WhatICut />

        {/* Signup funnel visual */}
        <SignupFunnelFlow />

        {/* Brief vs Delivered — scope discipline as a single table.
            Brief asked for two things; seven shipped, four beyond. */}
        <BriefVsDelivered />

        {/* Evaluation plan (in place of Early Outcomes — concept project) */}
        <EvaluationPlan />

        {/* Honest risks */}
        <HonestRisks />

        {/* Research evidence */}
        <ResearchEvidence />
      </div>
    </section>
  );
}

/* Annotated Trip Planner — Pentagram-pattern decision hotspots */
function AnnotatedTripPlanner() {
  const annotations = [
    { num: "01", x: "50%", y: "11%", title: "Three primitives in the header.",  body: "Segments, days, saved. Three counters surface the plan&rsquo;s shape at a glance. Each one is a unit of commitment: segment is high, day is medium, saved is low." },
    { num: "02", x: "75%", y: "30%", title: "Plan without dates.",               body: "Each segment has a duration in days and a soft &lsquo;When&rsquo; field set to Flexible by default. Dates are optional, not required to save the plan." },
    { num: "03", x: "28%", y: "47%", title: "Transit between segments.",         body: "Distance and travel time render between adjacent segments. The plan models the gaps, not just the stops." },
    { num: "04", x: "50%", y: "92%", title: "Saved sidebar stays separate.",     body: "Bookmarked destinations live in a sidebar below the segment list. A &lsquo;maybe&rsquo; doesn&rsquo;t pollute the plan until promoted to a segment." },
  ];

  const eyebrowStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
    letterSpacing: "0.18em", textTransform: "uppercase",
    color: c.accent, margin: "0 0 12px",
  };
  const subheadStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "clamp(18px, 2vw, 22px)",
    fontWeight: 500, color: c.ink, margin: "0 0 40px",
    letterSpacing: "-0.01em", lineHeight: 1.35,
  };
  const itemTitle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "15px", fontWeight: 600,
    color: c.ink, margin: "0 0 6px",
    letterSpacing: "-0.005em", lineHeight: 1.35,
  };
  const itemBody: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "14px", lineHeight: 1.6,
    color: c.ink2, margin: 0,
  };
  const badge: React.CSSProperties = {
    display: "inline-flex", width: "28px", height: "28px",
    borderRadius: "50%", background: "var(--color-brand)",
    color: "#FFFFFF", fontFamily: font.sans, fontSize: "11px",
    fontWeight: 700, alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  };

  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
      <p style={eyebrowStyle}>Trip planner &middot; annotated</p>
      <p style={subheadStyle}>Four decisions visible on one screen.</p>

      <div style={{
        display: "grid", gridTemplateColumns: "1.4fr 1fr",
        gap: "32px", alignItems: "start",
      }} className="wf2-annotated-grid">
        <div style={{ position: "relative", border: `1px solid ${c.border}`, background: "#FFFFFF" }}>
          <Image
            src="/images/work/wayfarer/v2/live-planner-segments.webp"
            alt="Live trip planner at wayfarer.barreiro.com. Kyoto and Tokyo segments, 6 days total, with transit estimate between. Four numbered annotation hotspots call out the four design decisions listed alongside."
            width={1600} height={1474}
            sizes="(max-width: 760px) 100vw, 50vw"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          {annotations.map((a) => (
            <span key={a.num} style={{
              position: "absolute", left: a.x, top: a.y,
              transform: "translate(-50%, -50%)",
              ...badge,
              border: "2px solid #FFFFFF",
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
            }} aria-hidden>
              {a.num}
            </span>
          ))}
        </div>

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

/* Cut vs Kept — neutrals only, no pastel pink/green.
   Replaces the Slide 08 image whose red/green palette clashed
   with the site brand. Same content, calmer surface. */
function CutVsKept() {
  const cut = [
    "Hotel search and booking interface",
    "Car rental browsing and comparison",
    "Price-based filtering and sorting",
    "Booking confirmation flow",
  ];
  const kept = [
    "Globe explorer as primary discovery interface",
    "Destination detail pages (content, gallery, tips, map)",
    "Multi-step signup with preference collection",
    "Trip planner for itinerary building",
    "Continent-based filtering and search",
  ];
  const labelStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
    letterSpacing: "0.20em", textTransform: "uppercase",
    margin: "0 0 14px",
  };
  const headStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "18px", fontWeight: 600,
    color: c.ink, margin: "0 0 18px", letterSpacing: "-0.01em",
  };
  const itemStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "14px", lineHeight: 1.6,
    color: c.ink2, padding: "10px 0", borderTop: `1px solid ${c.border}`,
  };
  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px",
      }} className="wf2-cutkept">
        {/* Cut */}
        <div style={{
          background: c.callout, border: `1px solid ${c.border}`,
          borderTop: `3px solid ${c.brand}`,
          padding: "28px 32px",
        }}>
          <p style={{ ...labelStyle, color: c.brand }}>Cut</p>
          <h3 style={headStyle}>Transactional layer</h3>
          <div>
            {cut.map((s, i) => (
              <div key={i} style={itemStyle}>{s}</div>
            ))}
          </div>
        </div>
        {/* Kept */}
        <div style={{
          background: c.callout, border: `1px solid ${c.border}`,
          borderTop: `3px solid ${c.accent}`,
          padding: "28px 32px",
        }}>
          <p style={{ ...labelStyle, color: c.accent }}>Kept</p>
          <h3 style={headStyle}>Discovery layer</h3>
          <div>
            {kept.map((s, i) => (
              <div key={i} style={itemStyle}>{s}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Process Gallery — "How I got there." Three phases as CSS-only tabs:
   01 Research (Card sort + Site map / user flow)
   02 Explorations (Hi-Fi ideation)
   03 Wireframes (Homepage, Globe, Trip planner, Multi-page form)
   Surfaces the decisions Cate + Ryan flagged: the evolution, not just the result. */
/* CompetitorAudit — three rows, each with a live homepage thumbnail
   plus the lift/skip finding I pulled from the audit. Replaces the
   Figma audit export, which carried placeholder gradients where
   competitor screenshots should have been. */
/* PersonasGrid — was a Figma slide titled "Three discovery modes Wayfarer
   serves." The slide was just text content (3 cards on white), so framing
   it as an image was wasteful. Now native HTML, three cards side by side,
   collapses to a single column on mobile. */
function PersonasGrid() {
  const personas = [
    {
      tag:   "The Curious Drifter",
      name:  "Emma",
      meta:  "28 · UX Researcher",
      bio:   "Has 14 days off, no idea where to go.",
      notes: "Browses moodily, Pinterest, Instagram saves, Reddit. Decision criteria are aesthetic + emotional (\"feels like an adventure\") more than budget-led.",
      want:  "A way to translate vibe → place.",
      lose:  "Hours to algorithmic feeds that show only what is already popular.",
    },
    {
      tag:   "The Planner",
      name:  "Marcus",
      meta:  "41 · Senior Engineer",
      bio:   "Specific dates, two adults + two kids, $8K budget.",
      notes: "Comparison-shops. Has spreadsheets. Tracks visa requirements, vaccinations, school holidays. Decision criteria are logistical first, aspirational second.",
      want:  "Structured comparison + planning.",
      lose:  "Trust in sites that bury the practical info (visa, weather, language) below booking widgets.",
    },
    {
      tag:   "The Returner",
      name:  "Naomi",
      meta:  "35 · Travel Writer",
      bio:   "Has traveled extensively. Saves destinations for later.",
      notes: "Wayfarer is her commonplace book. Bookmarks destinations she might pitch as future stories. Decision criteria are professional + curatorial.",
      want:  "A place to bookmark + annotate, no auth pressure.",
      lose:  "Trust in any platform that gates content behind sign-up.",
    },
  ];
  return (
    <div
      className="wf2-personas-grid"
      style={{
        display:             "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap:                 "clamp(16px, 2vw, 24px)",
        marginBottom:        "16px",
      }}
    >
      {personas.map((p) => (
        <article
          key={p.name}
          style={{
            background:   "#FAFAF9",
            border:       `1px solid ${c.border}`,
            padding:      "clamp(20px, 2.2vw, 28px)",
            display:      "flex",
            flexDirection:"column",
            gap:          "12px",
          }}
        >
          <p style={{
            fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: c.brand, margin: 0,
          }}>
            {p.tag}
          </p>
          <h3 style={{
            fontFamily: font.sans, fontSize: "clamp(18px, 1.8vw, 22px)",
            fontWeight: 700, color: c.ink, margin: 0,
            letterSpacing: "-0.015em", lineHeight: 1.2,
          }}>
            {p.name} <span style={{ fontWeight: 400, color: c.ink2 }}>· {p.meta}</span>
          </h3>
          <p style={{
            fontFamily: font.sans, fontSize: "14px", lineHeight: 1.5,
            color: c.ink, margin: 0, fontWeight: 500,
          }}>
            {p.bio}
          </p>
          <p style={{
            fontFamily: font.sans, fontSize: "13px", lineHeight: 1.6,
            color: c.ink2, margin: 0,
          }}>
            {p.notes}
          </p>
          <div style={{
            marginTop:   "auto",
            paddingTop:  "14px",
            borderTop:   `1px solid ${c.border}`,
            background:  c.callout,
            margin:      "8px -16px -16px",
            padding:     "14px 16px",
          }}>
            <p style={{
              fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: c.accent, margin: "0 0 6px",
            }}>
              Want / friction
            </p>
            <p style={{
              fontFamily: font.sans, fontSize: "13px", lineHeight: 1.55,
              color: c.ink2, margin: 0,
            }}>
              <strong style={{ color: c.ink, fontWeight: 600 }}>Wants:</strong>{" "}
              {p.want}{" "}
              <strong style={{ color: c.ink, fontWeight: 600 }}>Loses:</strong>{" "}
              {p.lose}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

function CompetitorAudit() {
  const rows = [
    {
      name:  "Atlas Obscura",
      tag:   "Editorial · tag-led",
      src:   "/images/work/wayfarer/v2/competitor-atlas-obscura-clean.webp",
      w: 1600, h: 550,
      finding: "The taxonomy is the product. Every place is tagged with categories (hidden, ruins, natural) that drive cross-linking.",
      lift:    "Tag-led navigation feels editorial, not algorithmic.",
      skip:    "Density of content is overwhelming for casual users.",
    },
    {
      name:  "Lonely Planet",
      tag:   "Guidebook · essay-first",
      src:   "/images/work/wayfarer/v2/competitor-lonely-planet-clean.webp",
      w: 1600, h: 720,
      finding: "Best Time to Visit is the most-quoted field. Travelers cite it back as if it were the destination's headline.",
      lift:    "Promote that one fact above all others in the sidebar.",
      skip:    "Long-form essays bury the practical info.",
    },
    {
      name:  "Airbnb",
      tag:   "Marketplace · photo-led",
      src:   "/images/work/wayfarer/v2/competitor-airbnb-clean.webp",
      w: 1600, h: 900,
      finding: "Photo-first grid with light filters. Hover reveals price and location.",
      lift:    "Photo-led grid as the primary discovery surface.",
      skip:    "Booking-first framing. Wayfarer is upstream of that decision.",
    },
  ];
  const labelMicro: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
    letterSpacing: "0.18em", textTransform: "uppercase",
    margin: "0 0 6px",
  };
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr",
      gap: "16px",
    }}>
      {rows.map((r) => (
        <article key={r.name} style={{
          display: "grid", gridTemplateColumns: "1.1fr 1.4fr",
          gap: "0",
          border: `1px solid ${c.border}`, background: "#FFFFFF",
        }} className="wf2-competitor-row">
          <div style={{
            aspectRatio: "16 / 10",
            overflow: "hidden",
            borderRight: `1px solid ${c.border}`,
            background: "#FAFAF9",
          }}>
            <Image
              src={r.src}
              alt={`${r.name} homepage screenshot — captured live during the competitor audit.`}
              width={r.w} height={r.h}
              sizes="(max-width: 760px) 100vw, 440px"
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "top",
                display: "block",
              }}
            />
          </div>
          <div style={{ padding: "24px 28px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "12px" }}>
              <h3 style={{
                fontFamily: font.sans, fontSize: "18px", fontWeight: 600,
                color: c.ink, margin: 0, letterSpacing: "-0.01em",
              }}>{r.name}</h3>
              <span style={{
                fontFamily: font.sans, fontSize: "10px", fontWeight: 600,
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: c.muted,
              }}>{r.tag}</span>
            </div>
            <p style={{
              fontFamily: font.sans, fontSize: "13px", lineHeight: 1.6,
              color: c.ink2, margin: "0 0 16px",
            }}>{r.finding}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <p style={{ ...labelMicro, color: c.accent }}>Lift</p>
                <p style={{
                  fontFamily: font.sans, fontSize: "12px", lineHeight: 1.55,
                  color: c.ink, margin: 0,
                }}>{r.lift}</p>
              </div>
              <div>
                <p style={{ ...labelMicro, color: c.brand }}>Skip</p>
                <p style={{
                  fontFamily: font.sans, fontSize: "12px", lineHeight: 1.55,
                  color: c.ink, margin: 0,
                }}>{r.skip}</p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/* InformationArchitecture — routes + user flow, code-rendered.
   Replaces the Figma image that was buried in the Research tab.
   Vector text stays crisp at every viewport. */
function InformationArchitecture() {
  const routes: { kind: "route" | "modal" | "overlay"; path: string; note: string; indent?: number }[] = [
    { kind: "route",   path: "/",                       note: "Home · hero, destinations carousel, why-wayfarer, get-started" },
    { kind: "modal",   path: "Sign Up modal",           note: "5-step Zod-validated signup",                       indent: 1 },
    { kind: "modal",   path: "Sign In modal",           note: "Single-step email + password",                     indent: 1 },
    { kind: "route",   path: "/destinations",           note: "Filterable catalog of 87 destinations" },
    { kind: "route",   path: "/destinations/[slug]",    note: "Detail page · hero / about / gallery / highlights / map / sidebar", indent: 1 },
    { kind: "route",   path: "/discover",               note: "3D Mapbox globe + Hidden Gems grid" },
    { kind: "route",   path: "/planner",                note: "Drag-reorder itinerary + saved-locations rail + print-to-PDF" },
    { kind: "modal",   path: "Picker modal",            note: "Add a segment or save a destination",              indent: 1 },
    { kind: "overlay", path: "Search overlay (⌘K)",     note: "Globally-available cmd-K palette" },
  ];

  const steps = [
    { num: "STEP 1", label: "Land",    sub: "Homepage" },
    { num: "STEP 2", label: "Browse",  sub: "Discover · /destinations" },
    { num: "STEP 3", label: "Decide",  sub: "Detail · /destinations/[slug]" },
    { num: "STEP 4", label: "Save",    sub: "Saved Locations rail in /planner" },
    { num: "STEP 5", label: "Commit",  sub: "Promote saved → segment" },
    { num: "STEP 6", label: "Export",  sub: "Print-to-PDF" },
  ];

  const eyebrowMicro: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "11px", fontWeight: 600,
    letterSpacing: "0.18em", textTransform: "uppercase",
    color: c.muted, margin: "0 0 14px",
  };
  const subhead: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "clamp(22px, 2.4vw, 28px)",
    fontWeight: 600, color: c.ink, margin: "0 0 24px",
    letterSpacing: "-0.02em", lineHeight: 1.2,
  };
  const chipBase: React.CSSProperties = {
    fontFamily:    font.sans,
    fontSize:      "10px",
    fontWeight:    700,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    padding:       "4px 10px",
    display:       "inline-block",
    minWidth:      "60px",
    textAlign:     "center",
  };
  const chipStyle = (kind: "route" | "modal" | "overlay"): React.CSSProperties => {
    if (kind === "route")   return { ...chipBase, background: "#EDEEFB", color: c.navy };
    if (kind === "modal")   return { ...chipBase, background: "#FBE8E0", color: c.coralDark };
    return { ...chipBase, background: "#EAEAEA", color: c.ink2 };
  };

  return (
    <section aria-label="Information architecture" style={{ padding: `0 ${SECTION_X} 120px` }}>
      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.6fr",
          gap: "64px", alignItems: "start", marginBottom: "48px",
        }} className="wf2-row">
          <div>
            <Eyebrow>Information architecture</Eyebrow>
            <h2 style={{
              fontFamily: font.sans, fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 600, color: c.ink, margin: 0,
              letterSpacing: "-0.025em", lineHeight: 1.05,
            }}>
              Six routes, two flows,<br />one discovery loop.
            </h2></div>
          <div>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
            }}>
              Wayfarer&rsquo;s IA is intentionally shallow. Every primary destination is reachable in one click from the navbar. The deeper structure is the discovery loop: Home &rarr; Discover (or Destinations) &rarr; Detail &rarr; Planner &rarr; back. Each route in the map corresponds to a file at <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "0.92em", background: c.callout, padding: "1px 6px", border: `1px solid ${c.border}` }}>src/app/&#123;slug&#125;/page.tsx</code>. Modals and overlays are separated from the route layer because they sit above route state, not within it.
            </p>
          </div>
        </div>

        {/* Site map */}
        <div style={{ marginBottom: "64px" }}>
          <p style={eyebrowMicro}>Site map</p>
          <h3 style={subhead}>Routes.</h3>
          <div style={{
            border:     `1px solid ${c.border}`,
            background: "#FFFFFF",
          }}>
            {routes.map((r, i) => (
              <div key={`${r.path}-${i}`} className="wf2-ia-row" style={{
                display:        "grid",
                gridTemplateColumns: "150px minmax(0, 1fr) minmax(0, 1.6fr)",
                gap:            "16px",
                alignItems:     "baseline",
                padding:        "14px 24px 14px " + (24 + (r.indent || 0) * 28) + "px",
                borderBottom:   i < routes.length - 1 ? `1px solid ${c.border}` : "none",
              }}>
                <span style={chipStyle(r.kind)}>{r.kind}</span>
                <span style={{
                  fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize:      "14px", fontWeight: 600,
                  color:         c.ink, letterSpacing: "-0.005em",
                }}>{r.path}</span>
                <span style={{
                  fontFamily:    font.sans, fontSize: "13px",
                  color:         c.ink2, lineHeight: 1.5,
                  textAlign:     "right",
                }} className="wf2-ia-note">{r.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User flow */}
        <div>
          <p style={eyebrowMicro}>Primary user flow</p>
          <h3 style={subhead}>Curiosity &rarr; Commitment.</h3>
          <div style={{
            display:             "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap:                 "12px",
          }} className="wf2-ia-flow">
            {steps.map((s, i) => (
              <React.Fragment key={s.num}>
                <div style={{
                  border:     `1px solid ${c.border}`,
                  background: "#FFFFFF",
                  padding:    "18px 18px 22px",
                  position:   "relative",
                }}>
                  <p style={{
                    fontFamily: font.sans, fontSize: "10px",
                    fontWeight: 700, letterSpacing: "0.18em",
                    color:      c.accent, textTransform: "uppercase",
                    margin:     "0 0 10px",
                  }}>{s.num}</p>
                  <p style={{
                    fontFamily: font.sans, fontSize: "18px",
                    fontWeight: 700, color: c.ink, margin: "0 0 8px",
                    letterSpacing: "-0.015em",
                  }}>{s.label}</p>
                  <p style={{
                    fontFamily: font.sans, fontSize: "12px",
                    color:      c.muted, margin: 0, lineHeight: 1.45,
                  }}>{s.sub}</p>
                  {/* Arrow that overlaps to next card on desktop */}
                  {i < steps.length - 1 && (
                    <span aria-hidden style={{
                      position: "absolute",
                      right: "-14px", top: "50%",
                      transform: "translateY(-50%)",
                      fontFamily: font.sans, fontSize: "18px",
                      color: c.accent, fontWeight: 500,
                      background: c.surface, padding: "0 4px",
                      zIndex: 1,
                    }} className="wf2-ia-arrow">&rarr;</span>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
          <p style={{
            fontFamily: font.sans, fontSize: "12px",
            color: c.muted, margin: "16px 0 0", letterSpacing: "0.01em",
          }}>
            Six steps. Each step maps to a route or a state. No skip from Land to Commit; saving precedes committing on purpose.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProcessGallery() {
  const wireframes = [
    { label: "Homepage",          src: "/images/work/wayfarer/v2/figma-wireframe-homepage.png" },
    { label: "Globe · Discover",  src: "/images/work/wayfarer/v2/figma-wireframe-globe.png" },
    { label: "Trip planner",      src: "/images/work/wayfarer/v2/figma-wireframe-trip-planner.png" },
    { label: "Multi-page signup", src: "/images/work/wayfarer/v2/figma-wireframe-multipage-form.png" },
  ];
  const wireframeCardLabel: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
    letterSpacing: "0.18em", textTransform: "uppercase",
    color: c.muted, margin: "10px 0 0",
  };
  return (
    <section aria-label="Process gallery" style={{ padding: `0 ${SECTION_X} 120px` }}>
      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.6fr",
          gap: "64px", alignItems: "start", marginBottom: "32px",
        }} className="wf2-row">
          <div>
            <Eyebrow>Process</Eyebrow>
            <h2 style={{
              fontFamily: font.sans, fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 600, color: c.ink, margin: 0,
              letterSpacing: "-0.025em", lineHeight: 1.05,
            }}>
              How I got there.
            </h2></div>
          <div>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
            }}>
              The Figma source carries the full design history. Research clusters became personas. Personas became an IA. The IA became wireframes. Wireframes became hi-fi explorations. Hi-fi became code. Three phases below. The shipped product is the last frame in the chain.
            </p>
          </div>
        </div>

        <p style={{
          fontFamily: font.sans, fontSize: "11px", fontWeight: 600,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: c.muted, margin: "0 0 16px",
        }}>
          <span aria-hidden="true" style={{ color: c.accent }}>&rarr; </span>
          Three phases, stacking as you scroll.
        </p>

        <div className="wf2-pg-stack">
          {/* 01 Research */}
          <article className="wf2-pg-card">
            <header className="wf2-pg-card-header">
              <span className="wf2-pg-num">01</span>
              <span className="wf2-pg-label">Research</span>
            </header>
            <div className="wf2-pg-card-body">
              <h3 style={{
                fontFamily: font.sans, fontSize: "clamp(20px, 2.2vw, 24px)",
                fontWeight: 600, color: c.ink, margin: "0 0 8px",
                letterSpacing: "-0.015em", lineHeight: 1.3,
              }}>
                Personas and competitor audit.
              </h3>
              <p style={{
                fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65,
                color: c.ink2, margin: "0 0 24px", maxWidth: "780px",
              }}>
                Three personas synthesized from interviews. A heuristic audit of direct and adjacent travel platforms across discovery, planning, and booking. Together they answered two questions: who is this for, and what is already broken in the category. The site map and user flow that came out of this work get their own section below.
              </p>
              {/* Personas — was a Figma slide of text content (3 cards on
                  a white background). Now native HTML so it scans + adapts
                  responsively, with no "image of text" waste. Same content,
                  faster to read. */}
              <PersonasGrid />
              <p style={{ ...wireframeCardLabel, marginTop: "10px", marginBottom: "32px" }}>
                Personas &middot; three traveler archetypes
              </p>
              <div style={{ margin: "0 0 32px" }}>
                <CompetitorAudit />
                <p style={{ ...wireframeCardLabel, marginTop: "10px" }}>Competitor audit &middot; three lifts, three skips</p>
              </div>
            </div>
          </article>

          {/* 02 Explorations */}
          <article className="wf2-pg-card">
            <header className="wf2-pg-card-header">
              <span className="wf2-pg-num">02</span>
              <span className="wf2-pg-label">Explorations</span>
            </header>
            <div className="wf2-pg-card-body">
              <h3 style={{
                fontFamily: font.sans, fontSize: "clamp(20px, 2.2vw, 24px)",
                fontWeight: 600, color: c.ink, margin: "0 0 8px",
                letterSpacing: "-0.015em", lineHeight: 1.3,
              }}>
                Paper, then pixels.
              </h3>
              <p style={{
                fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65,
                color: c.ink2, margin: "0 0 24px", maxWidth: "780px",
              }}>
                Every screen started as a paper sketch. Seven hand drafts mapped the signup flow before a single Figma frame. Below: Step 1 in its original sketch and its v.4 hi-fi, then the iteration trail (seven mobile homepage versions, four signup versions) kept in the Figma source as proof of the work.
              </p>

              {/* Paper sketch + hi-fi pair — the SLUX moment */}
              <div style={{ marginBottom: "32px" }}>
                <p style={{
                  fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
                  letterSpacing: "0.20em", textTransform: "uppercase",
                  color: c.accent, margin: "0 0 12px",
                }}>
                  Step 1 &middot; paper to product
                </p>
                <Image
                  src="/images/work/wayfarer/v2/figma-sketch-vs-hifi-step1.png"
                  alt="Step 1 of the signup, paired side by side: refined v.4 hi-fi on the left, original hand sketch on the right. Same fields, same hierarchy, paper first."
                  width={2486} height={1070}
                  sizes="(max-width: 1240px) 100vw, 1100px"
                  style={{ width: "100%", height: "auto", display: "block", border: `1px solid ${c.border}` }}
                />
                <p style={{
                  fontFamily: font.sans, fontSize: "11px", fontWeight: 600,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: c.muted, margin: "10px 0 0",
                }}>
                  Left: v.4 hi-fi &middot; right: pencil draft
                </p>
              </div>

              <div style={{ marginBottom: "28px" }}>
                <p style={{
                  fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
                  letterSpacing: "0.20em", textTransform: "uppercase",
                  color: c.accent, margin: "0 0 12px",
                }}>
                  Homepage &middot; mobile v.7
                </p>
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: "16px", maxWidth: "640px",
                }} className="wf2-process-research-grid">
                  <figure style={{ margin: 0 }}>
                    <Image
                      src="/images/work/wayfarer/v2/figma-mobile-v7-step2.png"
                      alt="Mobile homepage v.7. destinations carousel state."
                      width={406} height={820}
                      sizes="(max-width: 760px) 100vw, 320px"
                      style={{ width: "100%", height: "auto", display: "block", border: `1px solid ${c.border}` }}
                    />
                    <figcaption style={wireframeCardLabel}>v.7 &middot; frame 02</figcaption>
                  </figure>
                  <figure style={{ margin: 0 }}>
                    <Image
                      src="/images/work/wayfarer/v2/figma-mobile-v7-step3.png"
                      alt="Mobile homepage v.7. globe section state."
                      width={406} height={820}
                      sizes="(max-width: 760px) 100vw, 320px"
                      style={{ width: "100%", height: "auto", display: "block", border: `1px solid ${c.border}` }}
                    />
                    <figcaption style={wireframeCardLabel}>v.7 &middot; frame 03</figcaption>
                  </figure>
                </div>
              </div>
              <div>
                <p style={{
                  fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
                  letterSpacing: "0.20em", textTransform: "uppercase",
                  color: c.accent, margin: "0 0 12px",
                }}>
                  Multi-step signup &middot; desktop v.4
                </p>
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }} className="wf2-process-research-grid">
                  <figure style={{ margin: 0 }}>
                    <Image
                      src="/images/work/wayfarer/v2/figma-form-v4-step2.png"
                      alt="Multi-step signup desktop v.4. step 2 travel style."
                      width={1440} height={986}
                      sizes="(max-width: 760px) 100vw, 50vw"
                      style={{ width: "100%", height: "auto", display: "block", border: `1px solid ${c.border}` }}
                    />
                    <figcaption style={wireframeCardLabel}>v.4 &middot; step 2 travel style</figcaption>
                  </figure>
                  <figure style={{ margin: 0 }}>
                    <Image
                      src="/images/work/wayfarer/v2/figma-form-v4-step3.png"
                      alt="Multi-step signup desktop v.4. step 3 interests."
                      width={1440} height={986}
                      sizes="(max-width: 760px) 100vw, 50vw"
                      style={{ width: "100%", height: "auto", display: "block", border: `1px solid ${c.border}` }}
                    />
                    <figcaption style={wireframeCardLabel}>v.4 &middot; step 3 interests</figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </article>

          {/* 03 Wireframes */}
          <article className="wf2-pg-card">
            <header className="wf2-pg-card-header">
              <span className="wf2-pg-num">03</span>
              <span className="wf2-pg-label">Wireframes</span>
            </header>
            <div className="wf2-pg-card-body">
              <h3 style={{
                fontFamily: font.sans, fontSize: "clamp(20px, 2.2vw, 24px)",
                fontWeight: 600, color: c.ink, margin: "0 0 8px",
                letterSpacing: "-0.015em", lineHeight: 1.3,
              }}>
                Mid-fi wireframes.
              </h3>
              <p style={{
                fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65,
                color: c.ink2, margin: "0 0 24px", maxWidth: "780px",
              }}>
                Four key surfaces wireframed before the hi-fi: homepage as editorial cover, globe as discovery surface, trip planner with the three primitives, and the multi-page signup. Each ships in the live product.
              </p>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: "16px",
              }} className="wf2-process-wireframes-grid">
                {wireframes.map((w) => (
                  <figure key={w.label} style={{ margin: 0 }}>
                    <div style={{
                      aspectRatio: "3 / 4",
                      overflow: "hidden",
                      border: `1px solid ${c.border}`,
                      background: "#FAFAF9",
                    }}>
                      <Image
                        src={w.src}
                        alt={`Wireframe — ${w.label}.`}
                        width={1920} height={2560}
                        sizes="(max-width: 760px) 50vw, 25vw"
                        style={{
                          width: "100%", height: "100%",
                          objectFit: "cover", objectPosition: "top",
                          display: "block",
                        }}
                      />
                    </div>
                    <figcaption style={wireframeCardLabel}>{w.label}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* "What I cut" callout */
function WhatICut() {
  const labelStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
    letterSpacing: "0.18em", textTransform: "uppercase",
    color: c.accent, margin: "0 0 8px",
  };
  const bodyStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "15px", lineHeight: 1.7,
    color: c.ink2, margin: 0,
  };
  return (
    <aside style={{
      background: c.callout, border: `1px solid ${c.border}`,
      borderLeft: `4px solid ${c.brand}`,
      padding: "28px 32px", maxWidth: "780px", marginTop: "40px",
    }}>
      <p style={labelStyle}>What I cut</p>
      <p style={{ ...bodyStyle, margin: "0 0 22px" }}>
        Hotel booking on destination pages. Car rental flows. Pricing filters. Comparison views. Calendar-first signup. The catalog-grid homepage.
      </p>
      <p style={labelStyle}>Replaced with</p>
      <p style={bodyStyle}>
        Affiliate hand-off (cleaner editorial independence). 3D globe as the front door. Destination cards as the discovery surface. 5-step signup that asks &lsquo;what kind of traveler are you&rsquo; before it asks for dates. Six-page IA mapped to user verbs.
      </p>
    </aside>
  );
}

/* Signup Funnel — 6 live screens as a CSS-only carousel.
   Mirrors the Design System carousel pattern (radio inputs + sibling selectors).
   No JS. Each step renders full-size when its tab is active. */
function SignupFunnelFlow() {
  const steps = [
    { num: "01", label: "Account",        src: "/images/work/wayfarer/v2/live-signup-01.webp",
      note: "Account precedes preferences. Three fields, one primary action, soft tropical photography behind. The cover sets tone before it asks for data." },
    { num: "02", label: "Travel style",   src: "/images/work/wayfarer/v2/live-signup-02.webp",
      note: "Three preference rails: travel style, budget range, group size. The first preference question is identity, not data: how do you travel?" },
    { num: "03", label: "Interests",      src: "/images/work/wayfarer/v2/live-signup-03.webp",
      note: "Eight interest tags. Multi-select. No required minimum, no maximum. Skip is allowed. Drives destination feed weighting." },
    { num: "04", label: "Dream places",   src: "/images/work/wayfarer/v2/live-signup-04.webp",
      note: "Six aspirational destinations as seed data. The system asks where you want to go before it tells you where to go." },
    { num: "05", label: "Review",         src: "/images/work/wayfarer/v2/live-signup-05.webp",
      note: "Edit-back review screen. Account, preferences, interests, destinations — each block has its own Edit link. Any answer can be revisited without losing the others." },
    { num: "06", label: "Welcome",        src: "/images/work/wayfarer/v2/live-signup-06.webp",
      note: "Confirmation modal. Green check, single warm sentence, one primary action: Start Exploring. The handoff drops the user into a personalized feed, not a generic homepage." },
  ];

  return (
    <div style={{ marginTop: "32px" }}>
      <p style={{
        fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
        letterSpacing: "0.20em", textTransform: "uppercase",
        color: c.accent, margin: "0 0 8px",
      }}>
        Multi-step signup &middot; live UI
      </p>
      <h3 style={{
        fontFamily: font.sans, fontSize: "clamp(22px, 2.6vw, 30px)",
        fontWeight: 600, color: c.ink, margin: "0 0 12px",
        letterSpacing: "-0.02em", lineHeight: 1.2,
      }}>
        Five steps, then welcome.
      </h3>
      <p style={{
        fontFamily: font.sans, fontSize: "13px", fontWeight: 500,
        letterSpacing: "0.06em", textTransform: "uppercase",
        color: c.muted, margin: "0 0 24px",
      }}>
        <span aria-hidden="true" style={{ color: c.accent }}>&rarr; </span>
        Click a step to view it full size.
      </p>

      <div className="wf2-su-carousel" style={{
        border: `1px solid ${c.border}`, background: "#FAFAF9",
      }}>
        {steps.map((s, i) => (
          <input key={s.num} type="radio" name="wf2-su-tabs"
            id={`wf2-su-tab-${i + 1}`} defaultChecked={i === 0}
            aria-label={`Signup step ${s.num} ${s.label}`} />
        ))}

        <div className="wf2-su-nav" style={{
          display: "grid", gridTemplateColumns: "repeat(6, 1fr)",
          borderBottom: `1px solid ${c.border}`,
        }}>
          {steps.map((s, i, arr) => (
            <label key={s.num} htmlFor={`wf2-su-tab-${i + 1}`}
              className={`wf2-su-tab wf2-su-tab-${i + 1}`}
              style={{
                padding: "16px 12px", cursor: "pointer",
                borderRight: i < arr.length - 1 ? `1px solid ${c.border}` : "none",
                transition: "background 0.2s",
                textAlign: "center",
              }}
            >
              <p style={{
                fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
                color: c.accent, letterSpacing: "0.18em", margin: "0 0 4px",
              }}>{s.num}</p>
              <p style={{
                fontFamily: font.sans, fontSize: "12px", fontWeight: 500,
                color: c.ink, margin: 0, letterSpacing: "-0.005em",
                lineHeight: 1.25,
              }}>{s.label}</p>
            </label>
          ))}
        </div>

        <div className="wf2-su-panels" style={{
          padding: "clamp(28px, 4vw, 48px)", background: "#FFFFFF",
        }}>
          {steps.map((s, i) => (
            <div key={s.num} className="wf2-su-panel" data-panel={i + 1}>
              <div style={{
                aspectRatio: "4 / 3",
                overflow:    "hidden",
                border:      `1px solid ${c.border}`,
                background:  "#000",
              }}>
                <Image
                  src={s.src}
                  alt={`Wayfarer signup step ${s.num} — ${s.label}. Live at wayfarer.barreiro.com.`}
                  width={2400}
                  height={1500}
                  sizes="(max-width: 1240px) 100vw, 1100px"
                  style={{
                    width:          "100%",
                    height:         "100%",
                    objectFit:      "cover",
                    objectPosition: "center",
                    display:        "block",
                  }}
                />
              </div>
              <p style={{
                fontFamily: font.sans, fontSize: "14px", lineHeight: 1.6,
                color: c.ink2, margin: "20px 0 0", maxWidth: "780px",
              }}>
                <span style={{ fontWeight: 600, color: c.ink }}>Step {s.num} &middot; {s.label}.</span> {s.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p style={{
        fontFamily: font.sans, fontSize: "13px",
        color: c.muted, lineHeight: 1.6,
        margin: "20px 0 0", maxWidth: "780px",
      }}>
        Each step independently validated. The review screen lets the user jump back into any step without losing input. Preference data drives the post-signup home feed.
      </p>
    </div>
  );
}

/* Evaluation Plan — Wayfarer's equivalent of MSR's EarlyOutcomes.
   No live data yet — instead, the hypotheses + thresholds the design needs to clear. */
/* BriefVsDelivered — scope discipline as a two-column table.
   Two things were asked for. Seven shipped. Four are beyond brief,
   marked clearly. The expansion isn't scope creep; §02 The Bet shows
   the booking UI that got cut to make room. */
function BriefVsDelivered() {
  const rows = [
    { brief: "Homepage redesign", delivered: "New homepage with editorial cover, globe entry point, and feature highlights",     beyond: false },
    { brief: "Onboarding fix",    delivered: "5-step signup with per-step validation, edit-back review, and welcome screen",     beyond: false },
    { brief: "(beyond brief)",    delivered: "Interactive 3D globe with 87 destinations across 8 continents",                    beyond: true  },
    { brief: "(beyond brief)",    delivered: "Six-page IA mapped to user verbs (orient, browse, explore, evaluate, plan, personalize)", beyond: true },
    { brief: "(beyond brief)",    delivered: "Destination detail templates with hero, gallery, highlights, quick-info side rail", beyond: true },
    { brief: "(beyond brief)",    delivered: "Trip planner with three primitives (segment, day, saved) and transit estimates",   beyond: true  },
    { brief: "(beyond brief)",    delivered: "Full design system (tokens, type, components) cross-referenced to production code", beyond: true  },
  ];
  const thStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
    letterSpacing: "0.18em", textTransform: "uppercase",
    textAlign: "left", padding: "14px 18px",
    color: c.muted,
    borderBottom: `1px solid ${c.border}`,
  };
  const tdBriefStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "13px",
    padding: "14px 18px", verticalAlign: "middle",
    borderBottom: `1px solid ${c.border}`,
    width: "30%",
  };
  const tdDeliveredStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "14px", lineHeight: 1.55,
    padding: "14px 18px", verticalAlign: "middle",
    color: c.ink, borderBottom: `1px solid ${c.border}`,
  };
  return (
    <div style={{ marginTop: "56px", marginBottom: "40px" }}>
      <p style={{
        fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
        letterSpacing: "0.20em", textTransform: "uppercase",
        color: c.accent, margin: "0 0 12px",
      }}>
        Brief vs delivered &middot; scope discipline
      </p>
      <h3 style={{
        fontFamily: font.sans, fontSize: "clamp(22px, 2.6vw, 30px)",
        fontWeight: 600, color: c.ink, margin: "0 0 12px",
        letterSpacing: "-0.02em", lineHeight: 1.2,
      }}>
        Two things asked for. Seven shipped.
      </h3>
      <p style={{
        fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65,
        color: c.ink2, margin: "0 0 24px", maxWidth: "780px",
      }}>
        The brief asked for a homepage and an onboarding fix. The build expanded around both without breaking either. The expansion isn&rsquo;t scope creep. The Bet section above shows what got cut to make room for it.
      </p>

      <div className="wf2-brief-scroll" tabIndex={0} role="region"
        aria-label="Brief versus delivered comparison"
        style={{
          border: `1px solid ${c.border}`, overflow: "auto",
          background: "#FFFFFF",
        }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: c.callout }}>
              <th style={thStyle}>Brief asked for</th>
              <th style={thStyle}>Delivered</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.delivered} style={{ background: r.beyond ? c.callout : "#FFFFFF" }}>
                <td style={{
                  ...tdBriefStyle,
                  color: r.beyond ? c.muted : c.ink,
                  fontStyle: r.beyond ? "italic" : "normal",
                  fontWeight: r.beyond ? 400 : 600,
                }}>
                  {r.brief}
                </td>
                <td style={tdDeliveredStyle}>
                  {r.delivered}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{
        fontFamily: font.sans, fontSize: "12px",
        color: c.muted, lineHeight: 1.55, margin: "12px 0 0",
      }}>
        Two rows hit the brief. Five rows expanded it. The build held discipline against what was cut, not against what was added.
      </p>
    </div>
  );
}

function EvaluationPlan() {
  const labelStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
    letterSpacing: "0.18em", textTransform: "uppercase",
    color: c.accent, margin: "0 0 14px",
  };
  const bodyStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "15px", lineHeight: 1.7,
    color: c.ink2, margin: "0 0 12px",
  };
  return (
    <aside style={{
      background: c.callout, border: `1px solid ${c.border}`,
      borderLeft: `4px solid ${c.brand}`,
      padding: "32px 36px", maxWidth: "780px", marginTop: "32px",
    }}>
      <p style={labelStyle}>Evaluation plan &middot; what the design has to prove</p>
      <p style={bodyStyle}>
        <strong style={{ color: c.ink }}>Globe drives discovery.</strong> Time to first destination click under 30 seconds. If the globe is doing its job, curiosity outpaces confusion.
      </p>
      <p style={bodyStyle}>
        <strong style={{ color: c.ink }}>Signup feels like discovery, not data entry.</strong> Completion rate over 80%, per-step drop-off under 10%. If the framing works, users finish because they want their results.
      </p>
      <p style={bodyStyle}>
        <strong style={{ color: c.ink }}>Trip planner works without a tutorial.</strong> Build a 3-day trip in under 4 minutes. Drag-to-reorder is discoverable, or it isn&rsquo;t.
      </p>
      <p style={{ ...bodyStyle, margin: 0 }}>
        <strong style={{ color: c.ink }}>The honest scope:</strong> no live users have tested this. The hypotheses are reasoned from the brief, the style guide, and competitive analysis. They&rsquo;re what I&rsquo;d test when traffic exists.
      </p>
    </aside>
  );
}

/* Honest Risks — same pattern as MSR */
function HonestRisks() {
  const labelStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
    letterSpacing: "0.18em", textTransform: "uppercase",
    color: c.accent, margin: "0 0 14px",
  };
  const bodyStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "15px", lineHeight: 1.7,
    color: c.ink2, margin: "0 0 12px",
  };
  return (
    <aside style={{
      background: c.callout, border: `1px solid ${c.border}`,
      borderLeft: `4px solid ${c.brand}`,
      padding: "32px 36px", maxWidth: "780px", marginTop: "32px",
    }}>
      <p style={labelStyle}>What could still go wrong</p>
      <p style={bodyStyle}>
        <strong style={{ color: c.ink }}>The globe might be novelty, not navigation.</strong> 3D globes are engaging but potentially slow for users who already know what region they want. The continent grid is the fallback. I don&rsquo;t know yet whether the globe is the front door or the long way around.
      </p>
      <p style={bodyStyle}>
        <strong style={{ color: c.ink }}>Mobile globe interaction is harder.</strong> Touch + 3D + pinch + rotate is a lot of gestures. A user fumbling on a phone bounces.
      </p>
      <p style={bodyStyle}>
        <strong style={{ color: c.ink }}>The 5-step signup is asking a lot up front.</strong> Even with the framing, five steps is five chances to drop off. The threshold is &lsquo;over 80% completion&rsquo; for a reason, not a guess.
      </p>
      <p style={{ ...bodyStyle, margin: 0 }}>
        <strong style={{ color: c.ink }}>Concept, not validated by behavior.</strong> The design decisions are reasoned, not tested. That&rsquo;s the honest gap.
      </p>
    </aside>
  );
}

/* Research Evidence — Wayfarer's equivalent of MSR's UserResearch callout.
   Uses Card Sort + Personas instead of GA4 behavior. */
function ResearchEvidence() {
  const labelStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
    letterSpacing: "0.18em", textTransform: "uppercase",
    color: c.accent, margin: "0 0 14px",
  };
  const bodyStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "15px", lineHeight: 1.7,
    color: c.ink2, margin: "0 0 12px",
  };
  return (
    <aside style={{
      background: c.callout, border: `1px solid ${c.border}`,
      borderLeft: `4px solid ${c.brand}`,
      padding: "32px 36px", maxWidth: "780px", marginTop: "32px",
    }}>
      <p style={labelStyle}>Research evidence &middot; what shaped the IA</p>
      <p style={bodyStyle}>
        <strong style={{ color: c.ink }}>Card sort drove the six-page IA.</strong> Participants grouped destinations by mood and travel style more reliably than by region or season. The site map shifted from geographic to motivational: orient, browse, explore, evaluate, plan, personalize.
      </p>
      <p style={bodyStyle}>
        <strong style={{ color: c.ink }}>Personas shaped the signup framing.</strong> The adventurous-traveler persona (21-30, researching before booking) treats discovery as a habit. The signup asks &lsquo;what kind of traveler are you&rsquo; first because that&rsquo;s the question they want to answer about themselves.
      </p>
      <p style={{ ...bodyStyle, margin: 0 }}>
        <strong style={{ color: c.ink }}>The honest scale:</strong> small participant pool, self-directed research, no usability testing yet. The next pass tests the hypotheses in the Evaluation Plan section with 5-6 moderated sessions.
      </p>
    </aside>
  );
}

/* Accessibility — Wayfarer-only senior signal */
function AccessibilitySection() {
  return (
    <section aria-label="Accessibility audit" style={{ padding: `120px 0`, background: c.callout }}>
      <div style={{ padding: `0 ${SECTION_X} 64px` }}>
        <div style={{
          maxWidth: CONTENT_MAX, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1.6fr",
          gap: "64px", alignItems: "start",
        }} className="wf2-row">
          <div>
            <Eyebrow>Accessibility</Eyebrow>
            <h2 style={{
              fontFamily: font.sans, fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 600, color: c.ink, margin: 0,
              letterSpacing: "-0.025em", lineHeight: 1.05,
            }}>
              Audited, not assumed.
            </h2></div>
          <div>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
            }}>
              Dedicated accessibility audit page in the Figma source. Contrast ratios for every color pairing (the warm off-white over navy pair clears 15:1; the muted variant clears 10.5:1). Focus orders documented per page. Keyboard nav patterns for the globe (continent-grid fallback). Screen-reader labels on every icon button. The artifact is the receipt.
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: `0 ${SECTION_X}` }}>
        <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
          {/* Desktop: full audit image on a presentation mat.
              Mobile: this whole block is hidden because the image text
              is illegible at phone widths; the native card list below
              takes over. */}
          <div className="wf2-a11y-image" style={{ background: "#6E6E6E", padding: "clamp(20px, 3vw, 40px)" }}>
            <Image
              src="/images/work/wayfarer/v2/a11y-audit.png"
              alt="Wayfarer accessibility system audit. contrast checks per color pair, focus order documentation, keyboard nav patterns, screen-reader labels."
              width={1920} height={2652}
              sizes="(max-width: 1240px) 100vw, 1240px"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          {/* Mobile-only native card version. Hidden on desktop where the
              image renders at full fidelity. */}
          <A11yFindingsMobile />
        </div>
      </div>
    </section>
  );
}

/* Native card list of the eight ranked audit findings — mobile-only.
   The desktop reader sees the full audit image (with the scorecard and
   cross-surface patterns); the mobile reader gets the findings that
   would otherwise be unreadable on the image. */
function A11yFindingsMobile() {
  const findings: {
    n: string; severity: "Blocking" | "Partial";
    surface: string; wcag: string; issue: string; patch: string;
  }[] = [
    { n: "01", severity: "Blocking", surface: "Signup Modal", wcag: "WCAG 2.4.3, 2.4.7", issue: "Focus stays on the trigger button when the modal opens.", patch: "onOpen focus a heading, ref.current.focus() on the first input." },
    { n: "02", severity: "Blocking", surface: "Signup Modal", wcag: "WCAG 4.1.2", issue: "No role=\"dialog\" or focus trap.", patch: "Wrap in role=\"dialog\" aria-modal=\"true\" and add focus trap. The Search Overlay does this already; copy the pattern." },
    { n: "03", severity: "Blocking", surface: "Sign In Modal", wcag: "WCAG 2.4.3", issue: "No focus trap.", patch: "Same fix as #02. Wrap with focus trap. The role=\"dialog\" attribute already exists." },
    { n: "04", severity: "Partial",  surface: "Signup · Step 2", wcag: "WCAG 4.1.3", issue: "Continue → Confirm & Join label change is silent.", patch: "Move focus to the Review heading on step 5 entry so screen readers re-read the new button label naturally." },
    { n: "05", severity: "Partial",  surface: "Signup · all steps", wcag: "WCAG 4.1.3", issue: "Step transitions not announced.", patch: "Wrap step heading in <h2 ref={h2Ref}> and h2Ref.current.focus() on step change. Polite aria-live region is the alternative." },
    { n: "06", severity: "Blocking", surface: "/planner", wcag: "WCAG 2.1.1", issue: "Drag-reorder has no keyboard path.", patch: "Add up/down arrow handlers to each focused segment that call onReorder programmatically. Optionally expose ↑ / ↓ buttons in the action row." },
    { n: "07", severity: "Partial",  surface: "/discover, /destinations", wcag: "WCAG 1.3.3", issue: "Map markers under-announce.", patch: "Expand pin aria-label to include country + tagline: aria-label=\"View Bhutan, Bhutan, The Last Shangri-La\"." },
    { n: "08", severity: "Partial",  surface: "Input fields, all forms", wcag: "WCAG 3.3.1, 3.3.3", issue: "Error messages not programmatically tied.", patch: "Add aria-invalid={!!error} to each input and aria-describedby={`${id}-error`} pointing at the error span." },
  ];
  return (
    <div className="wf2-a11y-mobile" aria-labelledby="wf2-a11y-mobile-h">
      <div style={{
        fontFamily:    font.sans,
        fontSize:      "11px",
        fontWeight:    700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color:         c.muted,
        margin:        "0 0 12px",
      }}>
        Scorecard
      </div>
      <h3 id="wf2-a11y-mobile-h" style={{
        fontFamily: font.sans, fontSize: "22px", fontWeight: 600,
        color: c.ink, margin: "0 0 8px", letterSpacing: "-0.02em", lineHeight: 1.2,
      }}>
        Eight blocking, six partial. Eight ranked below.
      </h3>
      <p style={{
        fontFamily: font.sans, fontSize: "13px", lineHeight: 1.55,
        color: c.ink2, margin: "0 0 24px",
      }}>
        Six surfaces audited, three cross-surface patterns identified. Each row below links the finding to the route where it lives, the WCAG criterion it touches, and a one-line patch. Ordered by patch effort, quickest fixes first.
      </p>

      <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "12px" }}>
        {findings.map((f) => (
          <li key={f.n}>
            <article style={{
              background: "#FFFFFF",
              border: `1px solid ${c.border}`,
              padding: "16px 18px",
            }}>
              <div style={{
                display: "flex", alignItems: "baseline", justifyContent: "space-between",
                gap: "10px", marginBottom: "10px",
              }}>
                <span style={{
                  fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
                  color: c.accent, letterSpacing: "0.14em",
                }}>{f.n}</span>
                <span style={{
                  fontFamily:    font.sans,
                  fontSize:      "10px",
                  fontWeight:    700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  padding:       "3px 8px",
                  border:        `1px solid ${f.severity === "Blocking" ? c.brand : c.border}`,
                  color:         f.severity === "Blocking" ? c.brand : c.ink2,
                  background:    f.severity === "Blocking" ? "rgba(140,26,26,0.06)" : "transparent",
                }}>{f.severity}</span>
              </div>
              <p style={{
                fontFamily: font.sans, fontSize: "12px", fontWeight: 600,
                letterSpacing: "0.06em", textTransform: "uppercase",
                color: c.muted, margin: "0 0 6px",
              }}>
                {f.surface} · {f.wcag}
              </p>
              <p style={{
                fontFamily: font.sans, fontSize: "14px", fontWeight: 600,
                color: c.ink, margin: "0 0 6px", lineHeight: 1.4,
                letterSpacing: "-0.005em",
              }}>
                {f.issue}
              </p>
              <p style={{
                fontFamily: font.sans, fontSize: "13px", lineHeight: 1.55,
                color: c.ink2, margin: 0,
              }}>
                {f.patch}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
