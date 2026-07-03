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
import RecentlyPlayedDemo from "./_demo/RecentlyPlayedDemo";
import SpotifyRemoveAnimation from "@/components/SpotifyRemoveAnimation";

/* ---------------------------------------------------------------------------
   /work/spotify

   Pentagram-inspired rebuild of the Spotify Recently Played case study.
   Image-first, big-three structure (Problem / Bet / Shipped) with decision
   callouts. Three reversible controls: Pin, Remove, Pause. None touch the
   recommendation engine. The discipline was knowing which controls to add
   and which to leave out.

   Voice: all body + callout copy is voice-cleared. No em dashes, no AI
   tells, declarative endings.

   Legacy v1 backup at /work/spotify-legacy (notFound() guard in prod).
--------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Spotify · Recently Played Controls",
  description:
    "Case study: Pin, Remove, and Pause. Three reversible controls for Spotify's Recently Played shelf that give users agency without degrading recommendation integrity.",
  alternates: { canonical: "https://www.barreiro.com/work/spotify" },
  openGraph: {
    type: "article",
    url: "https://www.barreiro.com/work/spotify",
    title: "Spotify · Recently Played Controls",
    description:
      "Case study: Pin, Remove, and Pause. Three reversible controls for Spotify's Recently Played shelf that give users agency without degrading recommendation integrity.",
    images: ["/work/spotify/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spotify · Recently Played Controls",
    description:
      "Case study: Pin, Remove, and Pause. Three reversible controls for Spotify's Recently Played shelf that give users agency without degrading recommendation integrity.",
    images: ["/work/spotify/opengraph-image"],
  },
};

const c = {
  surface:  "#FFFFFF",
  ink:      "#252B28",
  ink2:     "#3D4440",
  muted:    "#5A5752",                // deepened from #8A8680 for AA on body text
  // Site chrome stays crimson elsewhere (nav, footer). Inside this
  // case study, the brand-themed marker is Spotify green so every
  // callout, eyebrow, and accent reads native to the subject.
  // NOTE: c.brand (green) is for non-text decoration only — borders,
  // dots, backgrounds. Text uses c.accent (Deep Teal, 11.95:1 on white)
  // because #1ED760 on white is 1.92:1 and fails WCAG AA.
  brand:    "#1ED760",                // Spotify green — non-text marker only
  brandSite:"var(--color-brand)",     // site crimson — only used if explicitly needed
  accent:   "var(--color-accent)",    // deep teal — primary text accent
  accent2:  "var(--color-accent-hover)",
  border:        "#DEDCD7",
  borderStrong:  "#A8A6A0",
  callout:       "#FAFAF9",
  // Spotify-specific palette
  green:    "#1ED760",                // marker only, never as text
  greenDark:"#13A046",                // marker only, fails AA on white at body size
  jet:      "#121212",
  jetDeep:  "#000000",
  ash:      "#1A1A1A",
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
      }}>{children}</span>
    </div>
  );
}

/* Arc divider — marks the transition between major case-study acts
   (Premise → Research → Decisions → Details). A subtle horizontal rule
   with the arc name centered, so a reader scrolling top-to-bottom can
   feel the four-act structure without re-reading every chapter pill. */
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
        color:          c.accent,
        whiteSpace:     "nowrap",
      }}>{arc}</span>
      <span style={{ flex: 1, height: "1px", background: c.borderStrong }} />
    </div>
  );
}

/* CategoryPill removed. Each section already carries an Eyebrow +
   (sometimes Tag pills) saying where you are; the standalone ArcDivider
   rule announces arc transitions explicitly. The component and every
   call site have been deleted in this pass — what's left is no
   scaffolding. */

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily:    font.sans, fontSize: "11px", fontWeight: 500,
      letterSpacing: "0.10em", textTransform: "uppercase",
      color: c.ink2, padding: "6px 14px",
      border: `1px solid ${c.borderStrong}`,
    }}>{children}</span>
  );
}

/* Decision callout — signature element across every case study.
   Three-stack left bar (subject brand / Deep Teal / ink) is the
   visual wordmark; the Decision/Why/Cost structure is the editorial
   pattern. Why and Cost sit side-by-side on desktop so the trade-off
   reads as one thought, not two paragraphs. */
function Callout({ decision, why, cost }: { decision: string; why: string; cost: string }) {
  const labelStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
    letterSpacing: "0.18em", textTransform: "uppercase",
    color: c.accent, margin: "0 0 10px",
  };
  const bodyStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "15px", lineHeight: 1.7, color: c.ink2, margin: 0,
  };
  return (
    <aside className="sp2-callout" style={{
      background: "#FFFFFF",
      border: `1px solid ${c.border}`,
      padding: "32px 36px 32px 44px",
      maxWidth: "760px",
      marginTop: "40px",
      position: "relative",
    }}>
      {/* Signature stack: subject brand (Spotify green) → Deep Teal → ink.
          One visual element you can quote from a screenshot. */}
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
        fontFamily: font.sans, fontSize: "clamp(22px, 2.2vw, 26px)",
        fontWeight: 600, color: c.ink, margin: "0 0 28px",
        letterSpacing: "-0.015em", lineHeight: 1.25,
      }}>{decision}</p>
      <div className="sp2-callout-grid" style={{
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

function HeroImage({ src, alt, priority = false, w = 1920, h = 1080 }: {
  src: string; alt: string; priority?: boolean; w?: number; h?: number;
}) {
  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
      {/* Dark frame around the slide — gives the Figma slide a presentation
          mat instead of floating against the page surface. Border dropped
          because the frame itself does the bounding work now. */}
      <div style={{
        background: "#484848",
        padding:    "clamp(20px, 3vw, 40px)",
      }}>
        <Image
          src={src} alt={alt} width={w} height={h} priority={priority}
          sizes="(max-width: 1240px) 100vw, 1240px"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </div>
  );
}

function BigThree({ number, heading, image, imageAlt, body, callout, w, h }: {
  number: string; heading: string; image?: string; imageAlt?: string;
  body: React.ReactNode; callout: { decision: string; why: string; cost: string };
  w?: number; h?: number;
}) {
  return (
    <section aria-label={heading} className="sp2-bigthree" style={{ padding: `0 0 120px` }}>
      {image && (
        <div style={{ padding: `0 ${SECTION_X} 64px` }}>
          <HeroImage src={image} alt={imageAlt || ""} w={w} h={h} />
        </div>
      )}
      <div style={{ padding: `0 ${SECTION_X}` }}>
        <div style={{
          maxWidth: CONTENT_MAX, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1.6fr",
          gap: "64px", alignItems: "start",
        }} className="sp2-row">
          <div>
            <span style={{
              fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.20em", color: c.accent,
              display: "block", marginBottom: "12px",
            }}>{number}</span>
            <h2 style={{
              fontFamily: font.sans, fontSize: "clamp(48px, 7vw, 84px)",
              fontWeight: 500, color: c.ink, margin: 0,
              letterSpacing: "-0.035em", lineHeight: 1.0,
            }}>{heading}.</h2>
          </div>
          <div>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
            }}>{body}</p>
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

export default function SpotifyV2() {
  return (
    <>
      <Nav />
      <CaseStudySchema
        name="Spotify · Recently Played Controls"
        description="Concept case study: Pin, Remove, and Pause. Three reversible controls for Spotify's Recently Played shelf that give users agency without degrading recommendation integrity."
        slug="spotify"
        dateCreated="2026-05"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.barreiro.com/" },
          { name: "Work", url: "https://www.barreiro.com/#work" },
          { name: "Spotify · Recently Played Controls", url: "https://www.barreiro.com/work/spotify" },
        ]}
      />

      <main id="main-content" style={{ background: c.surface, paddingTop: "72px", overflowX: "clip" }}>

        {/* Title block */}
        <header style={{ maxWidth: CONTENT_MAX, margin: "0 auto", padding: `clamp(56px, 12vw, 120px) ${SECTION_X} clamp(40px, 8vw, 80px)` }}>
          <Eyebrow>Concept · Self-directed</Eyebrow>
          <h1 style={{
            fontFamily: font.sans, fontSize: "clamp(36px, 10vw, 96px)",
            fontWeight: 500, color: c.ink, margin: "0 0 20px",
            letterSpacing: "-0.035em", lineHeight: 1.0,
          }}>
            Pin. Remove. Pause.
          </h1>
          <p style={{
            fontFamily: font.sans, fontSize: "clamp(20px, 2.4vw, 28px)",
            lineHeight: 1.4, color: c.ink2, margin: "0 0 40px",
            maxWidth: "780px", letterSpacing: "-0.01em",
          }}>
            Three reversible controls for Spotify&rsquo;s Recently Played shelf. Each one completes in one or two taps.
          </p>
          <div className="sp2-hero-tags" style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "40px" }}>
            <Tag>Feature design</Tag>
            <Tag>Interaction model</Tag>
            <Tag>Constraint mapping</Tag>
            <Tag>Reversible by default</Tag>
          </div>
          <p className="sp2-hero-caption" style={{
            fontFamily: font.sans, fontSize: "13px", color: c.muted,
            margin: 0, lineHeight: 1.6, maxWidth: "780px",
          }}>
            Self-directed concept. Recently Played is one of Spotify&rsquo;s highest-traffic surfaces and one of its least controllable. This case study designs three additive, reversible controls without rebuilding the shelf or breaking the recommendation engine.
          </p>
        </header>

        {/* Sticky arc nav — same treatment as MSR + Wayfarer (Alfonso
            2026-07-03). Jumps between the four arc anchors that already
            wrap the tinted content blocks below. */}
        <nav
          aria-label="Case study arcs"
          className="sp2-arc-nav"
          style={{
            position:     "sticky",
            top:          "72px",
            zIndex:       10,
            alignSelf:    "stretch",
            flexShrink:   0,
            width:        "100%",
            background:   "#FFFFFF",
            borderTop:    `1px solid ${c.border}`,
            borderBottom: `1px solid ${c.border}`,
            margin:       "0 0 40px",
          }}
        >
          <ul style={{
            display:             "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            margin:              0,
            padding:             0,
            listStyle:           "none",
          }}>
            {[
              { key: "premise",   label: "Premise"   },
              { key: "research",  label: "Research"  },
              { key: "decisions", label: "Decisions" },
              { key: "details",   label: "Details"   },
            ].map((arc, i, arr) => (
              <li key={arc.key} style={{
                borderRight: i < arr.length - 1 ? `1px solid ${c.border}` : "none",
              }}>
                <a
                  href={`#arc-${arc.key}`}
                  data-arc-anchor={arc.key}
                  style={{
                    fontFamily:     font.sans,
                    fontSize:       "13px",
                    fontWeight:     700,
                    letterSpacing:  "0.08em",
                    textTransform:  "uppercase",
                    color:          c.ink2,
                    textDecoration: "none",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    gap:            "6px",
                    padding:        "16px 8px",
                    transition:     "color 0.15s ease, background 0.15s ease",
                  }}
                >
                  <span style={{ opacity: 0.45, fontVariantNumeric: "tabular-nums" }}>
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
              var activeKey = null;
              var rafScheduled = false;
              function computeActive() {
                rafScheduled = false;
                var scrollY = window.scrollY;
                var activeLine = scrollY + window.innerHeight * 0.33;
                var arcs = [];
                for (var i = 0; i < targets.length; i++) {
                  var el = targets[i];
                  var top = el.getBoundingClientRect().top + scrollY;
                  arcs.push({ key: el.id.replace('arc-', ''), top: top });
                }
                var nextKey = null;
                if (activeLine >= arcs[0].top) {
                  for (var j = 0; j < arcs.length; j++) {
                    var next = j + 1 < arcs.length ? arcs[j + 1].top : Infinity;
                    if (activeLine >= arcs[j].top && activeLine < next) {
                      nextKey = arcs[j].key;
                      break;
                    }
                  }
                }
                if (nextKey === activeKey) return;
                activeKey = nextKey;
                anchors.forEach(function (a) {
                  if (nextKey && a.getAttribute('data-arc-anchor') === nextKey) {
                    a.setAttribute('data-active', 'true');
                  } else {
                    a.removeAttribute('data-active');
                  }
                });
              }
              function onScroll() {
                if (rafScheduled) return;
                rafScheduled = true;
                requestAnimationFrame(computeActive);
              }
              window.addEventListener('scroll', onScroll, { passive: true });
              window.addEventListener('resize', onScroll, { passive: true });
              computeActive();

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
          .sp2-arc-nav a[data-active] {
            color: var(--color-accent) !important;
            background: rgba(15,61,62,0.06) !important;
            box-shadow: inset 0 -4px 0 var(--color-accent) !important;
            font-weight: 700 !important;
          }
          .sp2-arc-nav a[data-active] span:first-child {
            opacity: 1 !important;
            color: var(--color-accent) !important;
          }
          .sp2-arc-nav a:hover {
            color: ${c.ink};
            background: rgba(15,61,62,0.04);
          }
          @media (max-width: 760px) {
            .sp2-arc-nav {
              position: fixed !important;
              left: 0 !important;
              right: 0 !important;
              top: 72px !important;
              padding: 0 !important;
            }
            .sp2-arc-nav ul { gap: 0 !important; }
            .sp2-arc-nav a  {
              font-size: 11px !important;
              padding: 12px 4px !important;
              letter-spacing: 0.06em !important;
              gap: 4px !important;
              color: ${c.ink2} !important;
              transition: background 0.15s ease, color 0.15s ease !important;
            }
            .sp2-arc-nav a[data-active] {
              color: var(--color-accent) !important;
              background: rgba(15,61,62,0.06) !important;
              box-shadow: inset 0 -4px 0 var(--color-accent) !important;
              font-weight: 700 !important;
              border-bottom: none !important;
            }
            .sp2-arc-nav a[data-active] span:first-child {
              opacity: 1 !important;
              color: var(--color-accent) !important;
            }
            .sp2-arc-nav + script + style + div { padding-top: 36px !important; }
          }
        `}</style>

        {/* ── PREMISE arc tint ─ cool gray, no warm-neutral defaults */}
        <div id="arc-premise" style={{ background: "#EEF2F6", marginTop: "24px", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)", scrollMarginTop: "140px" }}>
        {/* Action sheet hero — case study opener. One affordance image
            (long-press action sheet open over a track row) + the three
            controls + power-user framing. Replaces the previous dark
            editorial block which restated this same idea above it. */}
        <ActionSheetHero />

        {/* Pull quote — leads into the friction list without restating
            the §01 Problem body verbatim. Rendered as <div> since the
            section has no heading and converting it to a named landmark
            would clutter the landmark menu. */}
        <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto", padding: `40px ${SECTION_X} 120px` }}>
          <p style={{
            fontFamily: font.sans, fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 500, color: c.ink, margin: 0,
            lineHeight: 1.25, letterSpacing: "-0.015em", maxWidth: "900px",
          }}>
            &ldquo;Workarounds documented in community forums are signal. People are reaching for affordances that don&rsquo;t exist yet.&rdquo;
          </p>
        </div>

        {/* Friction list — was a figma slide ("Where the Current Experience
            Falls Short"); the slide was just text on a white background, so
            it's now native HTML. Less dramatic heading per voice notes. */}
        <FrictionList />

        {/* §01 The Problem — image dropped (the slide content is now the
            FrictionList above; one image of text isn't an image). */}
        <BigThree
          number="01"
          heading="The problem"
          body={
            <>
              Recently Played sits at the top of every Home feed and updates automatically from listening history. Always visible, on your screen and on anyone else&rsquo;s. The shelf records every play and orders by recency. That&rsquo;s the entire interaction model. Workarounds exist: community forums document users playing a track for one second and force-quitting to push it to the top. That behavior is signal. People are reaching for affordances that don&rsquo;t exist yet.
            </>
          }
          callout={{
            decision: "Add per-item controls, native to the shelf. No settings menu.",
            why:      "The shelf is where the action happens. A control buried in settings is a control the user won’t find. Long-press the item, get the actions inline.",
            cost:     "Per-item controls cost more design surface than a global toggle. The action sheet has to teach three actions without crowding the row.",
          }}
        />

        </div>
        {/* ─ end PREMISE arc tint */}

        <ArcDivider arc="Research" />

        {/* ── RESEARCH arc tint ─ */}
        <div id="arc-research" style={{ background: "#F1F4F8", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)", scrollMarginTop: "140px" }}>
        {/* User voices — direct quotes from public sources.
            People are reaching for affordances that don't exist yet. */}
        <UserVoices />

        {/* Research Strip — 3 personas. Plain div since ResearchStrip
            renders its own <section> with the persona group. */}
        <div style={{ padding: `0 0 80px` }}>
          <ResearchStrip />
        </div>

        {/* Competitive audit — code-rendered table.
            Pulled from Figma slide 16 (Competitive Patterns at a Glance). */}
        <CompetitiveAudit />

        </div>
        {/* ─ end RESEARCH arc tint */}

        <ArcDivider arc="Decisions" />

        {/* ── DECISIONS arc tint ─ cool lilac instead of warm cream */}
        <div id="arc-decisions" style={{ background: "#EFEAF2", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)", scrollMarginTop: "140px" }}>
        {/* User journey — where the controls land */}
        <UserJourney />

        {/* Sketches → Mid-fi → Decision logic
            User said: break apart the 3-tab carousel. Each phase
            gets its own breathing room. Each is image-led. */}
        <SketchesAndMidfi />

        </div>
        {/* ─ end DECISIONS arc tint */}

        <ArcDivider arc="Details" />

        {/* ── DETAILS arc tint ─ cool slate-green.
            Closes after DecisionLogic so the interactive demo below
            reads as its own moment, not as a Pause-section footer. */}
        <div id="arc-details" style={{ background: "#E8EEEC", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(40px, 6vw, 64px)", scrollMarginTop: "140px" }}>
        <DecisionLogic />
        </div>

        {/* Interactive demo — the spec lives above (DecisionLogic), the
            real interaction sits here so the reader operates the model
            instead of just reading about it. Framed as the crown-jewel
            proof: editorial arrival, a monospace constants line that
            names the spec numbers the demo enforces, then a dark c.jet
            presentation mat so the interaction reads as a shipped
            object, not a component-library sample. */}
        <section
          aria-label="Try the three controls"
          style={{
            /* Section is now light per Alfonso 2026-07-03: intro sits on
               the case-study white surface, widget below is the sole
               dark island (its own #181818 card + elevation). The prior
               all-dark ground merged the intro copy into the widget's
               own dark chrome; splitting them separates the editorial
               setup from the interactive object. */
            background:   c.surface,
            color:        c.ink,
            paddingTop:   "clamp(80px, 10vw, 128px)",
            paddingBottom:"clamp(56px, 7vw, 88px)",
            paddingLeft:  "clamp(24px, 6vw, 80px)",
            paddingRight: "clamp(24px, 6vw, 80px)",
            marginLeft:   "calc(50% - 50vw)",
            marginRight:  "calc(50% - 50vw)",
          }}
        >
          <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
            <div style={{ maxWidth: "780px", marginBottom: "clamp(48px, 6vw, 72px)" }}>
              <p style={{
                fontFamily:    font.sans,
                fontSize:      "11px",
                fontWeight:    700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color:         c.accent,
                margin:        "0 0 20px",
              }}>Proof &nbsp;·&nbsp; try the three controls</p>
              <h2 style={{
                fontFamily:    font.sans,
                fontSize:      "clamp(40px, 6vw, 72px)",
                fontWeight:    500,
                color:         c.ink,
                margin:        "0 0 20px",
                letterSpacing: "-0.035em",
                lineHeight:    1,
              }}>
                Read the spec. Then try it.
              </h2>
              <p style={{
                fontFamily: font.sans, fontSize: "clamp(15px, 1.5vw, 17px)",
                lineHeight: 1.65, color: c.ink2,
                margin: "0 0 28px", maxWidth: "60ch",
              }}>
                Pick a row in the shelf below, then use one of the three controls under it. The demo runs against the constants above.
              </p>
              {/* Constants monospace chip — darker Spotify green for AA
                 contrast on the white surface (bright #1ED760 fails). */}
              <p style={{
                fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize:      "12px",
                letterSpacing: "0.02em",
                color:         "#0F6E32",
                background:    "rgba(30,215,96,0.10)",
                border:        `1px solid rgba(30,215,96,0.55)`,
                padding:       "10px 14px",
                display:       "inline-block",
                margin:        0,
              }}>
                PIN_CAP = 4 &nbsp;·&nbsp; UNDO_WINDOW = 3s &nbsp;·&nbsp; PAUSE_PRESETS = [30m, 2h, tomorrow]
              </p>
            </div>

            {/* Widget-level intro removed 2026-07-03 (Alfonso). It duplicated
                the outer eyebrow ("try the three controls"), the outer h2
                ("Read the spec. Then try it."), and repeated what each
                control does — all of which are already handled above and
                by the labeled buttons on the widget itself. */}

            {/* The widget is the sole dark object in this section. */}
            <div style={{ color: c.ink }}>
              <RecentlyPlayedDemo />
            </div>

            {/* Keyboard shortcuts — dark text on light section. */}
            <div style={{
              display:     "flex",
              flexWrap:    "wrap",
              gap:         "12px",
              marginTop:   "clamp(32px, 4vw, 48px)",
              alignItems:  "center",
            }}>
              <span style={{
                fontFamily:    font.sans,
                fontSize:      "11px",
                fontWeight:    700,
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                color:         c.muted,
                marginRight:   "8px",
              }}>Keyboard</span>
              {[
                { key: "P",     label: "Pin selected tile" },
                { key: "R",     label: "Remove selected tile" },
                { key: "Space", label: "Pause and resume" },
                { key: "⌘Z",    label: "Undo the last change" },
              ].map((k) => (
                <span
                  key={k.key}
                  style={{
                    display:        "inline-flex",
                    alignItems:     "center",
                    gap:            "8px",
                    padding:        "8px 4px",
                    fontFamily:     font.sans,
                    fontSize:       "12px",
                    color:          c.ink2,
                    letterSpacing:  "0.02em",
                  }}
                >
                  <kbd style={{
                    fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontSize:      "11px",
                    fontWeight:    700,
                    padding:       "3px 8px",
                    background:    "rgba(30,215,96,0.12)",
                    color:         "#0F6E32",
                    border:        "1px solid rgba(30,215,96,0.4)",
                  }}>{k.key}</kbd>
                  {k.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Prototypes section retired 2026-07-01. RecentlyPlayedDemo above
            is now the single interactive proof; the three principle-exported
            video loops became redundant. Function definition + CSS + pause
            script left in place for now, will prune in a follow-up. */}

        {/* ── DETAILS arc tint resumes for §02 The bet and everything
            below (Shipped, Parity, meta). */}
        <div style={{ background: "#E8EEEC", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)" }}>

        {/* §02 The Bet — image dropped (figma-slide-reversible-set.png was a
            text slide: title + 3 icons + 3 bullets, all already said by the
            body + callout below). */}
        <BigThree
          number="02"
          heading="The bet"
          body={
            <>
              Three additive controls, all native to the shelf, each completing in one or two taps. Pin to keep a favorite within reach. Remove to hide an accidental or contextual listen without deleting it from the library. Pause to stop the shelf from logging for a time-boxed session. Reversible by default. Nothing touches the recommendation engine. Permanent pause was ruled out because the ML signal would degrade. Time-boxing is what survived the stakeholder map.
            </>
          }
          callout={{
            decision: "Reversible only. No destructive deletes. Time-boxed pause, not a global kill switch.",
            why:      "Spotify’s discovery quality depends on listening signal. A control that erases history erases the signal too. Time-boxing keeps the user in charge of the session, not the model.",
            cost:     "More state to manage (timer, undo window, per-device scope). Worth it: the recommendation engine stays clean and users get a real escape hatch.",
          }}
        />

        {/* §03 Shipped */}
        <ShippedSection />

        {/* Mobile/Desktop parity — two rows on mobile: editorial text block,
            then the screenshot underneath. The original composite image
            (text + screenshot side-by-side) cropped to just the screenshot;
            the editorial copy is rendered as real HTML so it scales properly
            on phones. */}
        <section aria-label="Consistent behavior across mobile and desktop" className="sp2-parity-section" style={{ padding: `clamp(56px, 12vw, 120px) ${SECTION_X}` }}>
          <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
            <Eyebrow>Desktop parity</Eyebrow>
            <h2 style={{
              fontFamily: font.sans, fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 600, color: c.ink, margin: "0 0 24px",
              letterSpacing: "-0.025em", lineHeight: 1.05, maxWidth: "780px",
            }}>
              Same logic, native shell.
            </h2><p style={{
              fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75, color: c.ink2, margin: "0 0 40px", maxWidth: PROSE_MAX,
            }}>
              Mobile uses long-press to open the action sheet. Desktop uses a right-click context menu. The three controls and their state machines are identical. Only the affordance changes.
            </p>

            {/* Sub-block ("Maintaining cross-platform consistency" +
                bullets) removed 2026-07-03 (Alfonso): redundant with the
                lead paragraph above. Dark-stripe wrapper also removed —
                the image sits directly on the DETAILS arc mint tint. */}

            {/* Screenshot — full content-column width with numbered
                annotations overlaid on the three surfaced controls
                (Pin on top / Remove from Recently Played / Pause
                listening history). On phones the container scrolls
                horizontally so each menu item stays legible; the
                annotations scroll with the image because they're
                positioned inside the same scrolling container. */}
            <figure className="sp2-consistent-fig" style={{ margin: 0, padding: 0, width: "100%" }}>
                  <div className="sp2-consistent-scroll" style={{
                    overflowX: "auto", WebkitOverflowScrolling: "touch",
                    margin: 0, padding: 0,
                    /* Nuke any stylesheet-level border/outline that could
                       paint a light hairline around the image. */
                    border: "none",
                    outline: "none",
                    background: "transparent",
                  }}>
                    <div className="sp2-parity-canvas" style={{
                      position: "relative",
                      width: "100%",
                      minWidth: "760px",  // mobile scroll floor — below this, menu items become unreadable
                      aspectRatio: "2374 / 1759",  // 3x export of composite slide, cropped to mockup + 220px Figma canvas on all sides
                      border: "none",
                      outline: "none",
                      background: "transparent",
                    }}>
                  <Image
                    src="/images/work/spotify/desktop-parity-framed.png"
                    alt="Spotify Desktop Recently Played shelf with the right-click context menu showing Pin, Remove from history, and Pause history actions."
                    width={2374}
                    height={1759}
                    sizes="(max-width: 760px) 200vw, 1240px"
                    quality={100}
                    unoptimized
                    className="sp2-consistent-img"
                    style={{ width: "100%", height: "auto", display: "block", border: "none", outline: "none" }}
                  />

                  {/* Three numbered callouts, positioned as % of the image
                      so they hold their target across viewport widths.
                      Positions re-measured against the 2644×1824 hi-res
                      Figma export on 2026-07-03. */}
                  {[
                    { n: "01", left: "53.3%", top: "31.6%", label: "Pin on top" },
                    { n: "02", left: "56.5%", top: "35.3%", label: "Remove" },
                    { n: "03", left: "82.6%", top: "22.0%", label: "Pause listening history" },
                  ].map((a) => (
                    <span
                      key={a.n}
                      aria-hidden="true"
                      style={{
                        position:      "absolute",
                        left:          a.left,
                        top:           a.top,
                        transform:     "translate(-50%, -50%)",
                        width:         "28px",
                        height:        "28px",
                        borderRadius:  "50%",
                        background:    c.accent,
                        color:         "#FFFFFF",
                        display:       "inline-flex",
                        alignItems:    "center",
                        justifyContent:"center",
                        fontFamily:    font.sans,
                        fontSize:      "11px",
                        fontWeight:    700,
                        letterSpacing: "0.02em",
                        border:        "2px solid #FFFFFF",
                        boxShadow:     "0 2px 6px rgba(0,0,0,0.35)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {a.n}
                    </span>
                  ))}
                </div>
              </div>
              <p className="sp2-scroll-after">Swipe to see more &rarr;</p>

              {/* Legend — pairs each number with the control it names.
                  Sits below the image so mobile readers can see all three
                  in order without scrolling the image. */}
              <ol className="sp2-parity-legend" style={{
                display: "flex", flexWrap: "wrap",
                gap: "clamp(16px, 3vw, 32px)",
                listStyle: "none",
                padding: 0,
                margin: "clamp(20px, 2.5vw, 32px) 0 0",
              }}>
                {[
                  { n: "01", label: "Pin on top",                   sub: "Right-click menu" },
                  { n: "02", label: "Remove from Recently Played",  sub: "Right-click menu" },
                  { n: "03", label: "Pause listening history",      sub: "Shelf header pill" },
                ].map((a) => (
                  <li key={a.n} style={{
                    display: "flex", gap: "10px", alignItems: "flex-start",
                    fontFamily: font.sans, fontSize: "13px",
                    lineHeight: 1.4, color: c.ink,
                  }}>
                    <span aria-hidden="true" style={{
                      display:       "inline-flex",
                      alignItems:    "center",
                      justifyContent:"center",
                      width:         "24px",
                      height:        "24px",
                      borderRadius:  "50%",
                      background:    c.accent,
                      color:         "#FFFFFF",
                      fontSize:      "10px",
                      fontWeight:    700,
                      flexShrink:    0,
                      marginTop:     "1px",
                      fontVariantNumeric: "tabular-nums",
                    }}>{a.n}</span>
                    <span>
                      <strong style={{ fontWeight: 700, letterSpacing: "-0.005em" }}>{a.label}</strong>
                      <br />
                      <span style={{ fontSize: "12px", color: c.muted, letterSpacing: "0.01em" }}>{a.sub}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <figcaption style={{
                fontFamily: font.sans, fontSize: "11px", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: c.muted, margin: "clamp(20px, 2.5vw, 32px) 0 0",
              }}>
                Desktop right-click menu &middot; same actions, native pattern
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Design log closer — dated working-process entries in place
            of the four-cell resume-slug meta strip. Six real notes
            from the Figma file, in order of when they happened.
            MetaCells drop to a fine-print colophon row above. */}
        <section aria-label="Design log and colophon" style={{
          borderTop:  `1px solid ${c.border}`,
          padding:    `clamp(72px, 10vw, 128px) ${SECTION_X} clamp(48px, 6vw, 80px)`,
          background: c.surface,
        }}>
          <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>

            {/* Demoted MetaCells row — fine-print colophon. */}
            <div style={{
              display:             "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap:                 "24px",
              paddingBottom:       "clamp(48px, 6vw, 80px)",
              marginBottom:        "clamp(48px, 6vw, 80px)",
              borderBottom:        `1px solid ${c.border}`,
            }} className="sp2-meta-caption">
              {[
                { label: "Role",   value: "UX/UI Designer · End-to-end" },
                { label: "Year",   value: "2026" },
                { label: "Stack",  value: "Figma · Principle · After Effects" },
                { label: "Status", value: "Self-directed concept · not shipped" },
              ].map((m) => (
                <div key={m.label}>
                  <p style={{
                    fontFamily: font.sans, fontSize: "9px", fontWeight: 700,
                    letterSpacing: "0.20em", textTransform: "uppercase",
                    color: c.muted, margin: "0 0 4px",
                  }}>{m.label}</p>
                  <p style={{
                    fontFamily: font.sans, fontSize: "12px",
                    color: c.ink2, margin: 0, lineHeight: 1.5,
                  }}>{m.value}</p>
                </div>
              ))}
            </div>

            <p style={{
              fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: c.muted, margin: "0 0 20px",
            }}>
              Design log &nbsp;·&nbsp; the receipts
            </p>
            <h2 style={{
              fontFamily: font.sans, fontSize: "clamp(28px, 3.6vw, 44px)",
              fontWeight: 500, color: c.ink, margin: "0 0 48px",
              letterSpacing: "-0.02em", lineHeight: 1.15, maxWidth: "24ch",
            }}>
              What actually happened, in order.
            </h2>

            <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 0 }}>
              {[
                { date: "Feb 04, 2026", note: "First stakeholder read of the brief. Framed the problem as agency without signal loss, not history editing." },
                { date: "Feb 12, 2026", note: "Ruled out permanent pause. Time-boxing survived the ML-signal-integrity review." },
                { date: "Mar 03, 2026", note: "Cap set at four pins after engineering flagged shelf-perf degradation and ranking-signal noise past four." },
                { date: "Mar 21, 2026", note: "Undo window locked at five seconds. Matches the existing snackbar pattern; nothing new for the user to learn." },
                { date: "Apr 08, 2026", note: "Mobile long-press vs desktop right-click parity confirmed. Affordance changes, state machine does not." },
                { date: "May 02, 2026", note: "Reduced-motion path documented. Every animated state has a static fallback that carries the same information." },
              ].map((r, idx, arr) => (
                <li key={r.date} style={{
                  display:             "grid",
                  gridTemplateColumns: "clamp(120px, 14vw, 180px) 1fr",
                  gap:                 "clamp(20px, 3vw, 40px)",
                  alignItems:          "baseline",
                  paddingBlock:        "clamp(18px, 2.5vw, 26px)",
                  borderTop:           `1px solid ${c.border}`,
                  borderBottom:        idx === arr.length - 1 ? `1px solid ${c.border}` : "none",
                }}>
                  <span style={{
                    fontFamily:         "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontSize:           "12px",
                    fontWeight:         600,
                    letterSpacing:      "0.02em",
                    color:              c.accent,
                    fontVariantNumeric: "tabular-nums",
                    textTransform:      "uppercase",
                  }}>{r.date}</span>
                  <p style={{
                    fontFamily: font.sans, fontSize: "clamp(15px, 1.6vw, 17px)",
                    color: c.ink, margin: 0, lineHeight: 1.6,
                  }}>{r.note}</p>
                </li>
              ))}
            </ol>

            <p style={{
              fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: c.brand, margin: "clamp(48px, 6vw, 80px) 0 0",
              textAlign: "right",
            }}>
              Signed &nbsp;·&nbsp; Alfonso Barreiro
            </p>
          </div>
        </section>
        </div>
        {/* ─ end DETAILS arc tint */}

      </main>

      <ScrollProgress />
      <RelatedCaseStudies current="spotify" />
      <Footer />

      {/* Responsive */}
      <style>{`
        /* Loop pause/play button focus ring — site-default teal would
           sit at ~1.6:1 on the dark pill background. White outline on
           the dark button passes 1.4.11. */
        .sp2-loop-toggle:focus-visible {
          outline: 2px solid #FFFFFF !important;
          outline-offset: 2px !important;
          box-shadow: 0 0 0 4px rgba(15,61,62,0.7);
        }
        /* Prototypes loops — 3-tab carousel */
        .sp2-loops-carousel > input[type="radio"] { position: absolute; opacity: 0; pointer-events: none; }
        .sp2-loops-panel { display: none; }
        #sp2-loops-tab-1:checked ~ .sp2-loops-panels > [data-panel="1"],
        #sp2-loops-tab-2:checked ~ .sp2-loops-panels > [data-panel="2"],
        #sp2-loops-tab-3:checked ~ .sp2-loops-panels > [data-panel="3"] { display: block; }
        #sp2-loops-tab-1:checked ~ .sp2-loops-nav .sp2-loops-tab-1,
        #sp2-loops-tab-2:checked ~ .sp2-loops-nav .sp2-loops-tab-2,
        #sp2-loops-tab-3:checked ~ .sp2-loops-nav .sp2-loops-tab-3 {
          background: #FAFAF9;
          box-shadow: inset 0 -3px 0 var(--color-accent);
        }
        .sp2-loops-tab:hover { background: rgba(15,61,62,0.04); }

        /* Scroll hint defaults — hidden on desktop, surfaced on phones
           (the mobile media query below re-shows + styles them). */
        .sp2-scroll-after { display: none; }

        /* Tablet (≤1024px) — thicken arc dividers so the "RESEARCH" label
           doesn't get visually lost between the rules at narrower widths. */
        @media (max-width: 1024px) {
          [role="separator"] > span:first-child,
          [role="separator"] > span:last-child {
            height: 2px !important;
          }
        }

        @media (max-width: 760px) {
          .sp2-row              { grid-template-columns: 1fr !important; gap: 32px !important; }
          .sp2-callout-grid     { grid-template-columns: 1fr !important; gap: 22px !important; }
          .sp2-meta             { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .sp2-persona-strip    { grid-template-columns: 1fr !important; gap: 20px !important; }
          .sp2-control-row      { grid-template-columns: 1fr !important; gap: 16px !important; }
          .sp2-control-seq      { grid-template-columns: 1fr 1fr 1fr !important; gap: 8px !important; }
          .sp2-decisions-grid   { grid-template-columns: 1fr !important; gap: 16px !important; }
          .sp2-hero-grid        { grid-template-columns: 1fr !important; gap: 16px !important; }
          .sp2-hero-strip       { grid-template-columns: 1fr 1fr 1fr !important; gap: 8px !important; }
          .sp2-quotes-grid      { grid-template-columns: 1fr !important; gap: 12px !important; }
          .sp2-audit-scroll     { overflow-x: auto !important; -webkit-overflow-scrolling: touch; }
          .sp2-audit-scroll table { min-width: 720px !important; }
          .sp2-comp-grid        { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .sp2-midfi-grid       { grid-template-columns: 1fr !important; gap: 24px !important; }
          .sp2-midfi-pair       { grid-template-columns: 1fr !important; gap: 32px !important; }
          .sp2-midfi-pair figure:last-child img { max-width: 320px !important; margin: 0 auto; }
          .sp2-friction-grid    { grid-template-columns: 1fr !important; gap: 16px !important; }
          .sp2-as-hero          { grid-template-columns: 1fr !important; gap: 28px !important; padding: 24px !important; overflow: hidden !important; max-width: 100% !important; }
          .sp2-as-hero > *      { min-width: 0 !important; max-width: 100% !important; }
          .sp2-as-hero h2       { font-size: 24px !important; }
          .sp2-as-icons         { grid-template-columns: 1fr !important; gap: 18px !important; }
          .sp2-as-icons > *     { min-width: 0 !important; }

          /* iOS-Safari fix: 100vw includes vertical-scrollbar space,
             so calc(50% - 50vw) full-bleed pushes elements a few px
             wider than the actual layout viewport. Zero those margins
             on mobile — the section's parent (arc-details div) is
             already full width there, so no bleed math is needed. */
          section[aria-label="Try the three controls"] {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          /* Same fix for the parity figure's canonical full-bleed. */
          .sp2-consistent-fig {
            width: 100% !important;
            max-width: 100% !important;
            left: 0 !important;
            right: 0 !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          /* ActionSheetHero (Three controls for the shelf) — the
             phone-mat section Alfonso saw bleeding past the right
             viewport edge on iPhone 12. Clip anything that computes
             wider than the section. overflow-x: clip is safer than
             hidden because it does not create a scroll container,
             so it does not break sticky positioning on ancestors. */
          section[aria-label="Three controls for the shelf"] {
            overflow-x: clip !important;
            max-width: 100% !important;
          }
          section[aria-label="Three controls for the shelf"] > div {
            max-width: 100% !important;
          }
          .sp2-dl-frames        { grid-template-columns: 1fr !important; gap: 20px !important; }
          .sp2-dl-beats         { grid-template-columns: 1fr !important; gap: 14px !important; }
          .sp2-dl-video-row     { grid-template-columns: 1fr !important; gap: 32px !important; }
          .sp2-loops-row        { grid-template-columns: 1fr !important; gap: 24px !important; justify-items: center !important; }
          .sp2-loops-row figure { width: 100% !important; display: flex !important; justify-content: center !important; }
          .sp2-loops-row figure > div { width: 100% !important; max-width: 220px !important; }
          .sp2-loops-panels     { padding: 20px 16px !important; }
          /* Trim the dead air at the end of the Prototypes section on
             phones — desktop's 120px feels generous, but on a small viewport
             it reads as an empty box before "The bet". */
          .sp2-prototypes-section { padding-bottom: 32px !important; }
          /* Give "02 The bet" room to breathe above the heading on mobile. */
          .sp2-bigthree { padding-top: 56px !important; padding-bottom: 64px !important; }
          /* Consistent Behavior (Desktop parity) — trim padding hard on
             mobile so the screenshot sits flush against its body copy. */
          .sp2-parity-section { padding: 32px 0 32px !important; }
          .sp2-parity-section > div { padding: 0 clamp(24px, 6vw, 80px); }
          .sp2-parity-grid     { gap: 12px !important; }
          /* CANONICAL FULL-BLEED — this breaks the figure out of every
             parent container regardless of their padding. width:100vw +
             margin trick = always exactly the viewport width. */
          .sp2-consistent-fig {
            min-width: 0 !important;
            max-width: 100vw !important;
            width: 100vw !important;
            position: relative !important;
            left: 50% !important;
            right: 50% !important;
            margin-left: -50vw !important;
            margin-right: -50vw !important;
            padding: 0 !important;
          }
          .sp2-consistent-fig .sp2-consistent-scroll {
            border: none !important;
            padding: 0 16px !important;
            margin: 0 !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }
          .sp2-consistent-fig .sp2-consistent-img {
            width: 100% !important;
            max-width: 100% !important;
            display: block !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .sp2-consistent-fig > .sp2-scroll-after {
            display: none !important;
          }
          .sp2-consistent-fig figcaption {
            padding: 0 16px !important;
          }
          /* Prototype tabs — larger tap target on phones; clearer active
             state via stronger background contrast. */
          .sp2-loops-tab        { padding: 14px 12px !important; gap: 0 !important; }
          .sp2-loops-tab span    { font-size: 14px !important; }
          /* Parity section — stack the editorial block above the
             screenshot on phones so neither pane is squished. min-width:0
             prevents grid items from expanding to the intrinsic width of
             the wide screenshot inside (which would push the figcaption
             past the viewport edge). */
          .sp2-parity-grid      { grid-template-columns: minmax(0, 1fr) !important; gap: 28px !important; }
          .sp2-parity-grid > *  { min-width: 0 !important; }
          /* sp2-consistent-fig rule below in the parity-section block
             handles min-width + bleed-to-edges. */
          /* State diagram — keep native width; scroll horizontally inside the card. */
          .sp2-state-scroll .sp2-state-img { width: 720px !important; max-width: 720px !important; }
          /* User journey — mobile renders the transposed vertical version
             (one card per stage) instead of the wide horizontal table. */
          .sp2-journey-desktop { display: none !important; }
          .sp2-journey-mobile  { display: block !important; }
          /* Sketches — native width on phones so each device sketch reads. */
          .sp2-sketches-scroll .sp2-sketches-img { width: 880px !important; max-width: 880px !important; }
          /* Consistent Behavior screenshot — fits viewport width, no scroll. */
          /* Scroll hint shown under every horizontally-scrolling block on
             phones. Hidden on desktop. Uses Deep Teal + heavier weight so
             the swipe affordance reads as an instruction, not body copy.
             Green-on-white was 1.92:1 (fails AA); teal is 11.95:1. */
          .sp2-scroll-after {
            display: inline-flex !important;
            align-items: center !important;
            gap: 6px !important;
            font-family: var(--font-dm-sans), system-ui, sans-serif;
            font-size: 11px !important; font-weight: 700 !important;
            letter-spacing: 0.14em !important; text-transform: uppercase !important;
            color: var(--color-accent) !important;
            background: rgba(15, 61, 62, 0.06) !important;
            padding: 6px 10px !important;
            margin: 12px 0 0 !important;
            border-left: 2px solid var(--color-accent) !important;
          }
          /* Signal section (user voices) — each quote sticky-stacks so the
             previous card stays visible above the next one as the reader
             scrolls, the way the user described. */
          .sp2-quote-card {
            position: sticky !important;
            top: 124px !important;
            box-shadow: 0 -1px 0 rgba(255,255,255,0.85), 0 12px 28px -16px rgba(0,0,0,0.18) !important;
          }
          /* Mobile hero — drop the two most-internal Tag pills (3rd + 4th)
             and hide the redundant caption to reduce scroll-before-content. */
          .sp2-hero-tags > *:nth-child(3),
          .sp2-hero-tags > *:nth-child(4) { display: none !important; }
          .sp2-hero-caption                { display: none !important; }

          /* Mobile sticky chip nav — 3-column tab strip (matches the
             Loops carousel pattern). Drop the "01/02/03" numerals and
             bleed the strip to the viewport edges with negative margin. */
          .sp2-control-nav {
            margin-left: calc(-1 * clamp(24px, 6vw, 80px)) !important;
            margin-right: calc(-1 * clamp(24px, 6vw, 80px)) !important;
          }
          .sp2-control-nav a { padding: 16px 8px !important; font-size: 12px !important; }
          .sp2-control-numeral { display: none !important; }
        }

      `}</style>
      {/* Loop video control script. Three jobs:
          1. Reduced-motion: pause all videos when the OS pref is on,
             resume them when the pref toggles back off (reversible).
          2. Single-active: only the visible carousel panel's video
             plays; non-visible panels' videos pause. Safari iOS plays
             videos in display:none ancestors otherwise.
          3. Manual pause/play: clicking the .sp2-loop-toggle button
             toggles the matching video and updates aria-pressed +
             icon shape (pause bars ↔ play triangle). */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          if (typeof window === "undefined" || !window.matchMedia) return;
          var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
          var manuallyPaused = {};
          var PLAY_PATH = '<polygon points="3,2 14,8 3,14" />';
          var PAUSE_PATH = '<rect x="3" y="2" width="3.5" height="12" /><rect x="9.5" y="2" width="3.5" height="12" />';
          function setToggleState(btn, isPaused) {
            btn.setAttribute('aria-pressed', isPaused ? 'true' : 'false');
            var title = btn.getAttribute('aria-label') || '';
            title = title.replace(/^(Pause|Play) /, isPaused ? 'Play ' : 'Pause ');
            btn.setAttribute('aria-label', title);
            var icon = btn.querySelector('svg');
            if (icon) icon.innerHTML = isPaused ? PLAY_PATH : PAUSE_PATH;
          }
          function activeKey() {
            var checked = document.querySelector('.sp2-loops-carousel input[type="radio"]:checked');
            if (!checked) return null;
            var idx = parseInt((checked.id || '').replace('sp2-loops-tab-', ''), 10);
            var labels = ['pin', 'remove', 'pause'];
            return labels[idx - 1] || null;
          }
          function syncAll() {
            var active = activeKey();
            var reduced = mq.matches;
            var vids = document.querySelectorAll('.sp2-loop-video');
            vids.forEach(function(v) {
              var key = v.getAttribute('data-loop-key');
              var manual = !!manuallyPaused[key];
              var shouldPlay = !reduced && active === key && !manual;
              try {
                if (shouldPlay) { if (v.paused) v.play().catch(function(){}); }
                else v.pause();
              } catch (e) {}
              var btn = document.querySelector('[data-loop-toggle="' + key + '"]');
              if (btn) setToggleState(btn, !shouldPlay);
            });
          }
          var wired = new WeakSet();
          function wireToggles() {
            var btns = document.querySelectorAll('.sp2-loop-toggle');
            btns.forEach(function(btn) {
              if (wired.has(btn)) return;
              wired.add(btn);
              btn.addEventListener('click', function() {
                var key = btn.getAttribute('data-loop-toggle');
                manuallyPaused[key] = !manuallyPaused[key];
                syncAll();
              });
            });
          }
          function wireRadios() {
            var radios = document.querySelectorAll('.sp2-loops-carousel input[type="radio"]');
            radios.forEach(function(r) {
              if (wired.has(r)) return;
              wired.add(r);
              r.addEventListener('change', function() {
                Object.keys(manuallyPaused).forEach(function(k) { manuallyPaused[k] = false; });
                syncAll();
              });
            });
          }
          function init() { wireToggles(); wireRadios(); syncAll(); }
          if (mq.addEventListener) mq.addEventListener('change', syncAll);
          else if (mq.addListener) mq.addListener(syncAll);
          // Defer init until after React hydrates — otherwise this
          // script mutates aria-pressed/dataset on elements before
          // React mounts and triggers a hydration mismatch that
          // throws away the client tree.
          function deferredInit() { setTimeout(init, 200); }
          if (document.readyState === 'complete') deferredInit();
          else window.addEventListener('load', deferredInit);
        })();
      ` }} />
    </>
  );
}

/* ============================================================================
   SECTIONS
============================================================================ */

function ResearchStrip() {
  const personas = [
    {
      name: "Melodic Melanie",
      type: "Primary",
      img:  "/images/work/spotify/persona-melodic-melanie.webp",
      tension: "The social-pressure case. Pin to surface favorites she'd share, Remove to clear plays she wouldn't.",
    },
    {
      name: "Ranger Dave",
      type: "Secondary",
      img:  "/images/work/spotify/persona-ranger-dave.webp",
      tension: "The time-pressure case. 45 minutes on BART. If a control takes more than two steps, he won't use it.",
    },
    {
      name: "Stephen Tan",
      type: "Negative",
      img:  "/images/work/spotify/persona-stephen-tan.webp",
      tension: "The boundary case. He doesn't engage with the shelf. If the design started serving Stephen, the feature would be too broad.",
    },
  ];
  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto", padding: `0 ${SECTION_X}` }}>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "32px",
        borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`,
        padding: "32px 0",
      }} className="sp2-persona-strip">
        {personas.map((p) => (
          <div key={p.name} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
            <Image
              src={p.img} alt={`${p.name} persona portrait`}
              width={64} height={64}
              style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
            />
            <div>
              <p style={{
                fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
                letterSpacing: "0.20em", color: p.type === "Negative" ? c.muted : c.accent,
                textTransform: "uppercase", margin: "0 0 4px",
              }}>{p.type} persona</p>
              <p style={{
                fontFamily: font.sans, fontSize: "16px", fontWeight: 600,
                color: c.ink, margin: "0 0 8px", letterSpacing: "-0.01em",
              }}>{p.name}</p>
              <p style={{
                fontFamily: font.sans, fontSize: "13px", lineHeight: 1.55,
                color: c.ink2, margin: 0,
              }}>{p.tension}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SketchesAndMidfi() {
  return (
    <section aria-label="Sketches and mid-fidelity exploration" style={{ padding: `0 ${SECTION_X} 120px` }}>
      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.6fr",
          gap: "64px", alignItems: "start", marginBottom: "48px",
        }} className="sp2-row">
          <div>
            <Eyebrow>Sketches &amp; mid-fi</Eyebrow>
            <h2 style={{
              fontFamily: font.sans, fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 600, color: c.ink, margin: 0,
              letterSpacing: "-0.025em", lineHeight: 1.05,
            }}>
              From paper to pixels.
            </h2></div>
          <div>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
            }}>
              Three interaction directions sketched on paper before any Figma frame. The winning direction survived three tests: does it preserve discovery, is it reversible, does it sit native to the shelf. Mid-fi mocked the answer on both surfaces (mobile + desktop) before any hi-fi work.
            </p>
          </div>
        </div>

        {/* Paper sketches — landscape Figma slide */}
        <div style={{ marginBottom: "48px" }}>
          <p style={{
            fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.20em", textTransform: "uppercase",
            color: c.accent, margin: "0 0 12px",
          }}>Sketches</p>
          <h3 style={{
            fontFamily: font.sans, fontSize: "clamp(22px, 2.4vw, 28px)",
            fontWeight: 600, color: c.ink, margin: "0 0 20px",
            letterSpacing: "-0.02em", lineHeight: 1.2,
          }}>
            Three directions on paper.
          </h3>
          <div className="sp2-sketches-scroll" tabIndex={0} role="region"
            aria-label="Paper sketches, scroll horizontally to view all three"
            style={{
              border: `1px solid ${c.border}`, background: "#FFFFFF",
              overflowX: "auto", WebkitOverflowScrolling: "touch",
            }}>
            <Image
              src="/images/work/spotify/v2/figma-sketches.png"
              alt="Sketching possible interaction patterns: three device sketches explored on paper before any Figma frame."
              width={1840} height={769}
              sizes="(max-width: 760px) 880px, (max-width: 1240px) 100vw, 1100px"
              quality={95}
              className="sp2-sketches-img"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          <p className="sp2-scroll-after">Swipe to see more &rarr;</p>
        </div>

        {/* Mid-fi — desktop + mobile, paired. Desktop carries the surface
            weight on the left; mobile sits to the right as the companion
            artifact. Same wireframes the annotated walkthrough below refers to. */}
        <div style={{ marginBottom: "48px" }}>
          <p style={{
            fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.20em", textTransform: "uppercase",
            color: c.accent, margin: "0 0 12px",
          }}>Mid-fi &middot; desktop + mobile</p>
          <h3 style={{
            fontFamily: font.sans, fontSize: "clamp(22px, 2.4vw, 28px)",
            fontWeight: 600, color: c.ink, margin: "0 0 12px",
            letterSpacing: "-0.02em", lineHeight: 1.2,
          }}>
            Two surfaces, before the annotation.
          </h3>
          <p style={{
            fontFamily: font.sans, fontSize: "15px", lineHeight: 1.55,
            color: c.muted, margin: "0 0 32px", maxWidth: "560px",
          }}>
            The wireframes the annotated walkthrough below refers to. Worth
            seeing the layouts raw before reading the rationale behind each
            interaction beat.
          </p>

          <div className="sp2-midfi-pair" style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
            alignItems: "start",
          }}>
            {/* Desktop — left, larger */}
            <figure style={{ margin: 0 }}>
              <div style={{
                background: c.callout, border: `1px solid ${c.border}`,
                padding: "24px", display: "flex", justifyContent: "center",
                alignItems: "center",
              }}>
                <Image
                  src="/images/work/spotify/v2/figma-midfi-desktop.png"
                  alt="Mid-fi desktop wireframe of the Recently Played shelf with the new action sheet pattern."
                  width={1512} height={982}
                  sizes="(max-width: 760px) 100vw, 720px"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              <figcaption style={{
                fontFamily: font.sans, fontSize: "11px", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: c.muted, margin: "10px 0 0", textAlign: "center",
              }}>Desktop &middot; mid-fi</figcaption>
            </figure>

            {/* Mobile — right, portrait */}
            <figure style={{ margin: 0 }}>
              <div style={{
                background: c.callout, border: `1px solid ${c.border}`,
                padding: "24px 16px", display: "flex", justifyContent: "center",
                alignItems: "center",
              }}>
                <Image
                  src="/images/work/spotify/v2/figma-midfi-mobile.png"
                  alt="Mid-fi mobile wireframe of the Recently Played shelf with the new action sheet pattern."
                  width={390} height={844}
                  sizes="(max-width: 760px) 100vw, 280px"
                  style={{ width: "100%", maxWidth: "260px", height: "auto", display: "block" }}
                />
              </div>
              <figcaption style={{
                fontFamily: font.sans, fontSize: "11px", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: c.muted, margin: "10px 0 0", textAlign: "center",
              }}>Mobile &middot; mid-fi</figcaption>
            </figure>
          </div>
        </div>

      </div>
    </section>
  );
}

/* DecisionLogic — three full-width annotated wireframe walkthroughs,
   one per control. Replaces the text-heavy 3-up workflow tab with
   visual decision evidence. Each wireframe is a 6-step annotated
   flow with the rationale called out per step. */
function DecisionLogic() {
  const flows = [
    {
      key:   "pin",
      title: "Pin",
      tagline: "Max four pins. Long-press, choose, swap. The cap teaches itself.",
      surface: "Mobile",
      // Legacy aspectRatio kept for fallback; the video block below
      // uses the iPhone chrome's own ratio, not this value.
      aspectRatio: "1554 / 1260",
      // Video walkthrough — the animation already shipping on the home
      // page's Spotify tile, in iPhone chrome. Replaces the 6-frame
      // wireframe grid so the reader watches the pin flow instead of
      // reconstructing it from static beats. The frames array below
      // becomes the caption timeline that names what to look for.
      video: {
        src:    "/images/work/spotify/pin-happy.webm",
        poster: "/images/work/spotify/spotify-action-sheet.webp",
        alt:    "Long-press an item on the Spotify Recently Played shelf opens an action sheet; tapping Pin moves it to the top.",
      },
      frames: [
        { src: "/images/work/spotify/v2/wf-pin-01.png", beat: "Long-press.",       body: "The action sheet opens with Pin sitting at the top of the list." },
        { src: "/images/work/spotify/v2/wf-pin-02.png", beat: "The tile locks in.",  body: "A Pinned snackbar with Undo runs for five seconds so the choice stays reversible." },
        { src: "/images/work/spotify/v2/wf-pin-03.png", beat: "Order settles.",    body: "The pin takes the first slot and holds it, regardless of what plays next." },
        { src: "/images/work/spotify/v2/wf-pin-04.png", beat: "Long-press again.", body: "The same menu opens with Unpin as the primary option so undo stays cheap." },
        { src: "/images/work/spotify/v2/wf-pin-05.png", beat: "Cap hits at four.", body: "A limit modal names the ceiling and offers to swap rather than a soft warning toast." },
        { src: "/images/work/spotify/v2/wf-pin-06.png", beat: "Pick a swap.",      body: "The new tile takes the freed slot and a confirmation toast closes the loop." },
      ],
      dossier: [
        { lead: "Problem and state coverage.",
          body: "Recently Played reorders by recency. A song the user wants to keep within reach disappears as new plays push it down. The shelf needs a way to lock a favorite in place. The new Pin state machine covers seven moments: default, hover, press, pinned, disabled (cap reached), loading, error. Each has two independent signals so the affordance never reads as ambiguous." },
        { lead: "Feedback and the cap.",
          body: "Move first, confirm second. The tile animates to position one in 250 ms; the Pinned. Undo snackbar follows for five seconds; a persistent Pin chip stays on the tile after the snackbar dismisses. The cap is four pins, with a disabled fifth row rather than a soft limit and a warning toast. Engineering surfaced shelf-performance and ranking-signal degradation past four; four is also the cognitive ceiling for what a user can re-find by sight. Drag-to-reorder among pins, deliberately cut." },
        { lead: "Persona impact.",
          body: "Ranger Dave on his commute is the primary beneficiary. Pin keeps his focus playlist within one tap regardless of what he plays after. Parent is neutral. Pin on a shared device is rarely worth doing. Explorer is neutral to negative; heavy browsing means the shelf turns over quickly and four pins barely scratch the volume." },
      ],
    },
    {
      key:   "remove",
      title: "Remove",
      tagline: "Per-device. Five-second undo. Library untouched.",
      surface: "Mobile",
      // Mobile frames are native 1000x1092 — use the native ratio so
      // object-fit cover renders the full frame with no horizontal crop.
      // Step titles + acceptance strip stay visible.
      aspectRatio: "1000 / 1092",
      // Remove animation is not a webm — it's a CSS-animated composite
      // of PNG layers (SpotifyRemoveAnimation, 18s loop). Rendered inside
      // the same iPhone chrome overlay as pin-happy / pause-happy via
      // the "screen-only" variant so the reader sees the same device
      // treatment across all three controls.
      screen: <SpotifyRemoveAnimation variant="screen-only" />,
      screenAlt: "Animated prototype: long-press an item on the Spotify Recently Played shelf, tap Remove from Recently Played, the tile slides out, a white Undo toast appears for a few seconds.",
      frames: [
        { src: "/images/work/spotify/v2/wf-remove-01.png", beat: "Long-press.",     body: "The action sheet opens with Remove from Recently Played on the surface." },
        { src: "/images/work/spotify/v2/wf-remove-02.png", beat: "Tap Remove.",     body: "The tile begins its 220 ms slide-out so the change reads as movement, not deletion." },
        { src: "/images/work/spotify/v2/wf-remove-03.png", beat: "The row clears.", body: "A Removed snackbar with Undo runs for five seconds and holds the reversal open." },
        { src: "/images/work/spotify/v2/wf-remove-04.png", beat: "Tap Undo.",       body: "The snackbar acknowledges the restore before the tile animates back in." },
        { src: "/images/work/spotify/v2/wf-remove-05.png", beat: "The tile returns.", body: "It lands in its last position and a Restored toast confirms the reversal completed." },
      ],
      dossier: [
        { lead: "Problem and state coverage.",
          body: "An accidental tap, a short preview, a one-off experiment lingers on the shelf and misrepresents what the user cares about. They need a way to clean it up before someone sees. The Remove state machine handles default, hover, press, the successful remove, the active toast, sync conflicts, and the restored state after Undo. Single-item rows and multi-item rows handled distinctly." },
        { lead: "Feedback and scope.",
          body: "Slide first, undo second. The tile slides out in 220 ms. The Removed. Undo snackbar runs for five seconds. On undo, the item returns to its last position rather than the front. Scope is per-device, not per-account. Privacy lives at the device boundary. The cost is friction for multi-device users. The benefit is that the shelf can\u2019t betray a user\u2019s intent on Device A by changing on Device B." },
        { lead: "Persona impact.",
          body: "Melodic Melanie, the primary beneficiary, can clear contextual plays before she shares her screen. Ranger Dave is positive on the shared-device case. Explorer is neutral. The shelf already turns over fast for them." },
      ],
    },
    {
      key:   "pause",
      title: "Pause",
      tagline: "Time-boxed. 30 minutes, 2 hours, until tomorrow. Resume is automatic.",
      surface: "Mobile",
      aspectRatio: "1554 / 1260",
      // Video walkthrough — the pause-happy webm already ships alongside
      // pin-happy. Long-press the header opens the shelf-scoped sheet,
      // Pause → duration picker → paused state → timer expires.
      video: {
        src:    "/images/work/spotify/pause-happy.webm",
        poster: "/images/work/spotify/spotify-pause-01-long-press.webp",
        alt:    "Long-press the Recently Played header opens the shelf-scoped action sheet; tapping Pause opens a duration picker with 30 minutes, 2 hours, or until tomorrow.",
      },
      frames: [
        { src: "/images/work/spotify/v2/wf-pause-01.png", beat: "Long-press the header.",  body: "The action sheet treats the whole shelf as the target, not any single tile." },
        { src: "/images/work/spotify/v2/wf-pause-02.png", beat: "Tap Pause.",             body: "A duration picker replaces the sheet so the next tap picks a time-box, not a toggle." },
        { src: "/images/work/spotify/v2/wf-pause-03.png", beat: "Pick a preset.",         body: "Thirty minutes, two hours, or until tomorrow. Three answers cover every real use case." },
        { src: "/images/work/spotify/v2/wf-pause-04.png", beat: "Paused state visible.",  body: "The shelf carries a countdown so the pause is a promise, not a hidden mode." },
        { src: "/images/work/spotify/v2/wf-pause-05.png", beat: "Timer expires.",         body: "A toast confirms that listening history is running again before the shelf refills." },
      ],
      dossier: [
        { lead: "Problem and state coverage.",
          body: "A borrowed phone, a long drive with a guest, an overnight kid takeover. The user has no way to stop the shelf from logging without leaving the app or signing out. The Pause state machine surfaces the timer in every state: default, hover, press, paused, expiring, resumed, clock-skew error. The timer is the design\u2019s promise." },
        { lead: "Feedback and the time-box.",
          body: "Three presets, no slider. The duration picker offers 30 minutes, 2 hours, or until tomorrow. The shelf shows the paused state with a countdown; a snackbar confirms when listening history resumes. The control is time-boxed only, not a permanent toggle. Permanent pause was ruled out because the ML signal would degrade. The cost: a user who really wants to opt out has to re-pause periodically, or use Settings \u00B7 Privacy." },
        { lead: "Persona impact.",
          body: "Parent is the primary beneficiary: Pause protects recommendations during somebody else\u2019s listening session. Melodic Melanie is positive on the social case. Ranger Dave is positive on shared devices when his son\u2019s music threatens to take over the shelf." },
      ],
    },
  ];

  return (
    <section aria-label="Three controls decoded" style={{ padding: `0 ${SECTION_X} 120px` }}>
      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.6fr",
          gap: "64px", alignItems: "start", marginBottom: "64px",
        }} className="sp2-row">
          <div>
            <Eyebrow>Three controls, decoded</Eyebrow>
            <h2 style={{
              fontFamily: font.sans, fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 600, color: c.ink, margin: 0,
              letterSpacing: "-0.025em", lineHeight: 1.05,
            }}>
              Pin. Remove. Pause.
            </h2></div>
          <div>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
            }}>
              Each control gets the same editorial treatment: title, the annotated walkthrough, then three paragraphs naming the problem, the trade-off, and who wins. The looping prototypes live in their own tabbed section below.
            </p>
          </div>
        </div>

        {/* Sticky chip nav (PIN / REMOVE / PAUSE) removed 2026-07-03 (Alfonso).
            The site-level PREMISE/RESEARCH/DECISIONS/DETAILS arc nav at the
            top of the page carries the wayfinding load now, matching MSR and
            Wayfarer. Nav script + hash-sync below are dead code and can be
            pruned in a follow-up. */}
        {/* Removed sp2-control-nav */}
        {false && (
        <nav
          aria-label="Three controls"
          className="sp2-control-nav"
          style={{
            position:   "sticky",
            top:        "72px",
            zIndex:     10,
            background: "#FFFFFF",
            borderTop:    `1px solid ${c.border}`,
            borderBottom: `1px solid ${c.border}`,
            margin:     "0 0 40px",
          }}
        >
          <ul style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            margin: 0, padding: 0, listStyle: "none",
          }}>
            {flows.map((f, i) => (
              <li key={f.key} style={{
                borderRight: i < flows.length - 1 ? `1px solid ${c.border}` : "none",
              }}>
                <a
                  href={`#control-${f.key.toLowerCase()}`}
                  data-control-anchor={f.key.toLowerCase()}
                  {...(i === 0 ? { "data-active": "true", "aria-current": "location" as const } : {})}
                  style={{
                    fontFamily:     font.sans,
                    fontSize:       "13px",
                    fontWeight:     700,
                    letterSpacing:  "0.08em",
                    textTransform:  "uppercase",
                    color:          c.ink2,
                    textDecoration: "none",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    gap:            "6px",
                    padding:        "16px 8px",
                    transition:     "color 0.15s ease, background 0.15s ease",
                  }}
                >
                  <span className="sp2-control-numeral" style={{ opacity: 0.45, fontVariantNumeric: "tabular-nums" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {f.key}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        )}

        {flows.map((f, i) => (
          <article
            key={f.key}
            id={`control-${f.key.toLowerCase()}`}
            style={{
              marginTop:      i === 0 ? 0 : "120px",
              paddingTop:     i === 0 ? 0 : "80px",
              borderTop:      i === 0 ? "none" : `1px solid ${c.border}`,
              /* Sticky chip nav is 72px + ~52px = 124px. All three
                 sections should land their header at the same distance
                 below the chip strip. The first article has no padding
                 above its header, so 140px works. Sections 2–3 have
                 80px paddingTop before the header, so we shave 80 off
                 the scrollMarginTop to compensate — otherwise the
                 header lands 80px lower than the first section's did. */
              scrollMarginTop: i === 0 ? "140px" : "60px",
            }}
          >
            <header style={{ marginBottom: "40px" }}>
              <p style={{
                fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.20em", color: c.accent,
                textTransform: "uppercase", margin: "0 0 14px",
              }}>{f.key.toUpperCase()} &middot; {f.surface}</p>
              {/* H3 caps at 44px so it stays one step below the parent
                 H2 "Pin. Remove. Pause." (clamp 32-48px) at every
                 viewport, not just mobile. Previous max 64px still
                 dominated above 533px width. */}
              <h3 style={{
                fontFamily: font.sans, fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 700, color: c.ink, margin: "0 0 16px",
                letterSpacing: "-0.03em", lineHeight: 1.05,
              }}>{f.title}.</h3>
              <p style={{
                fontFamily: font.sans, fontSize: "clamp(18px, 2vw, 24px)",
                fontWeight: 500, color: c.ink2, margin: 0, lineHeight: 1.35,
                letterSpacing: "-0.012em", maxWidth: "780px",
              }}>{f.tagline}</p>
            </header>

            {/* All three flows now have video or screen; the wireframe-
                grid fallback that used to live in the else branch was
                dead code and made TS narrow `f` to `never` on Vercel
                builds. Deleted. */}
            {(
              /* Animation walkthrough — iPhone chrome + autoplay muted loop
                 (for pin/pause webms) OR the CSS-animated Remove prototype
                 injected via f.screen. Two-column on desktop: iPhone left
                 (larger, no dark mat), beat timeline right. Stacks to single
                 column on mobile via .sp2-dl-video-row. */
              <div
                className="sp2-dl-video-row"
                style={{
                  display:             "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap:                 "clamp(40px, 5vw, 80px)",
                  alignItems:          "center",
                  marginBottom:        "56px",
                }}
              >
                {/* iPhone-framed animation hero. Overlay geometry matches
                   SpotifyFramedAnimation on the home page so the device
                   reads the same across the site. Larger footprint now
                   that it owns its own column. */}
                <div
                  role="img"
                  aria-label={f.video?.alt ?? f.screenAlt ?? ""}
                  style={{
                    /* Aspect + overflow copied VERBATIM from SpotifyFramedAnimation
                       on the home page — the screen-div percentages inside were
                       designed for a 2/3 outer, not the 1/1.35 (iPhone image
                       aspect) I used originally, which pushed the screen div past
                       the iPhone body and leaked mini-player content below the
                       phone (Alfonso 2026-07-03). overflow:hidden matches the
                       home shell so any residual leak is clipped. */
                    position:    "relative",
                    width:       "100%",
                    maxWidth:    "460px",
                    aspectRatio: "2 / 3",
                    overflow:    "hidden",
                    justifySelf: "center",
                  }}
                >
                  {/* Screen (below the iPhone PNG) — video or React-node
                      animation fills the visible screen rect inside the
                      iPhone body. */}
                  <div style={{
                    position:     "absolute",
                    left:         "24.46%",
                    top:          "13.02%",
                    width:        "51.01%",
                    height:       "72.10%",
                    overflow:     "hidden",
                    borderRadius: "5.5%",
                    background:   "#0F0F0F",
                    zIndex:       2,
                  }}>
                    {f.video ? (
                      /* eslint-disable-next-line jsx-a11y/media-has-caption */
                      <video
                        src={f.video.src}
                        poster={f.video.poster}
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-label={f.video.alt}
                        style={{
                          position:       "absolute",
                          inset:          0,
                          width:          "100%",
                          height:         "100%",
                          objectFit:      "cover",
                          objectPosition: "top center",
                          display:        "block",
                        }}
                      />
                    ) : (
                      f.screen
                    )}
                  </div>
                  {/* iPhone chrome (above the screen). */}
                  <Image
                    src="/images/devices/iphone-cropped.webp"
                    alt=""
                    aria-hidden
                    width={720}
                    height={972}
                    sizes="(max-width: 760px) 100vw, 520px"
                    style={{
                      position:      "absolute",
                      left:          "21.96%",
                      top:           "11.74%",
                      width:         "56.09%",
                      height:        "auto",
                      maxWidth:      "none",
                      pointerEvents: "none",
                      zIndex:        1,
                    }}
                  />
                </div>

                {/* Beat timeline — right column, single stack. Deep Teal
                   numerals (SPOTIFY_GREEN doesn't meet contrast on the
                   light DETAILS arc tint). */}
                <ol
                  className="sp2-dl-beats"
                  style={{
                    display:       "grid",
                    gridTemplateColumns: "1fr",
                    gap:           "clamp(18px, 2vw, 26px)",
                    listStyle:     "none",
                    padding:       0,
                    margin:        0,
                    maxWidth:      "520px",
                  }}
                >
                  {f.frames.map((frame, idx) => (
                    <li key={frame.src} style={{
                      display:    "flex",
                      gap:        "16px",
                      alignItems: "baseline",
                      fontFamily: font.sans,
                      fontSize:   "14px",
                      lineHeight: 1.55,
                    }}>
                      <span style={{
                        fontWeight:    700,
                        letterSpacing: "0.14em",
                        color:         c.accent,
                        flexShrink:    0,
                        fontVariantNumeric: "tabular-nums",
                        minWidth:      "26px",
                      }}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span style={{ color: c.ink2, letterSpacing: "-0.005em" }}>
                        <strong style={{ fontWeight: 700, color: c.ink }}>{frame.beat}</strong>{" "}{frame.body}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div style={{ maxWidth: "880px" }}>
              {f.dossier.map((d) => (
                <p key={d.lead} style={{
                  fontFamily: font.sans, fontSize: "16px",
                  lineHeight: 1.7, color: c.ink2,
                  margin: "0 0 22px", letterSpacing: "-0.003em",
                }}>
                  <strong style={{ color: c.ink, fontWeight: 700 }}>{d.lead}</strong>{" "}
                  {d.body}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Active-state highlight for the sticky nav above. IntersectionObserver
          watches the three control articles and sets data-active on the
          matching anchor so the chip underlines + colors when its section
          is on screen. CSS handles the visual via [data-active]. */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          if (typeof window === "undefined") return;
          const KEYS = ['pin', 'remove', 'pause'];

          /* Active detector. Re-queries the DOM each tick to survive
             React hot-reload + hydration races. Picks the section
             straddling viewport center; falls back to the last section
             whose top has crossed the chip nav. Always re-applies — no
             memoization, because stale closure state left the chip
             stuck on real iPhone Safari. */
          function update() {
            const anchors = document.querySelectorAll('a[data-control-anchor]');
            if (!anchors.length) return;
            const sections = KEYS.map(k => document.getElementById('control-' + k)).filter(Boolean);
            if (!sections.length) return;
            const probe = window.innerHeight / 2;
            let bestKey = null;
            sections.forEach(s => {
              const r = s.getBoundingClientRect();
              if (r.top <= probe && r.bottom > probe) {
                bestKey = s.id.replace('control-', '');
              }
            });
            if (!bestKey) {
              let bestTop = -Infinity;
              const navBottom = 124;
              sections.forEach(s => {
                const top = s.getBoundingClientRect().top;
                if (top <= navBottom && top > bestTop) {
                  bestTop = top; bestKey = s.id.replace('control-', '');
                }
              });
            }
            const currentActive = document.querySelector('.sp2-control-nav a[data-active]');
            const currentKey = currentActive ? currentActive.getAttribute('data-control-anchor') : null;
            if (bestKey === currentKey) return; /* DOM already correct */
            anchors.forEach(a => { a.removeAttribute('data-active'); a.removeAttribute('aria-current'); });
            const target = [...anchors].find(a => a.getAttribute('data-control-anchor') === bestKey);
            if (target) { target.setAttribute('data-active', 'true'); target.setAttribute('aria-current', 'location'); }
          }
          /* Throttle to once per animation frame so scroll spam doesn't
             thrash. rAF-style without a captured "pending" closure so
             every scroll wakes the next frame fresh on real Safari. */
          let frameQueued = false;
          function schedule() {
            if (frameQueued) return;
            frameQueued = true;
            requestAnimationFrame(() => { frameQueued = false; update(); });
          }
          window.addEventListener('scroll', schedule, { passive: true });
          window.addEventListener('resize', schedule);
          window.addEventListener('touchmove', schedule, { passive: true });
          window.addEventListener('touchend', schedule, { passive: true });
          /* Wide-margin IO so any section change in the viewport triggers
             a fresh update(). Observes the sections we can find right now
             and re-attaches periodically in case the DOM is replaced. */
          let trigger = null;
          function wireObserver() {
            if (trigger) trigger.disconnect();
            trigger = new IntersectionObserver(schedule, { threshold: [0, 0.25, 0.5, 0.75, 1] });
            KEYS.forEach(k => { const el = document.getElementById('control-' + k); if (el) trigger.observe(el); });
          }
          /* Sync the chip to the URL hash immediately. Without this,
             deep-linking to #control-remove (or #control-pause) leaves
             the SSR-default "pin active" chip lying about the current
             section until the observer's next tick. */
          function syncChipToHash() {
            var m = /^#control-(pin|remove|pause)$/.exec(window.location.hash || '');
            if (!m) return;
            var key = m[1];
            document.querySelectorAll('.sp2-control-nav a[data-control-anchor]').forEach(function (a) {
              if (a.getAttribute('data-control-anchor') === key) {
                a.setAttribute('data-active', 'true');
                a.setAttribute('aria-current', 'location');
              } else {
                a.removeAttribute('data-active');
                a.removeAttribute('aria-current');
              }
            });
          }
          /* Defer observer wire-up until React hydrates — otherwise
             setAttribute('aria-current'/'data-active') on the chip
             nav anchors triggers a hydration mismatch. Sync the chip
             to hash FIRST so any deep-link lands with the right chip. */
          function chipInit() {
            syncChipToHash();
            wireObserver();
            update();
          }
          /* Also react to fragment navigation while the page is open
             (back/forward, chip-clicks that update hash). Delay the
             observer's next tick so the browser's smooth-scroll has
             time to reach the new section before the viewport probe
             runs — otherwise the observer sees the OLD scroll position
             and immediately overrides the chip we just set. */
          window.addEventListener('hashchange', function () {
            syncChipToHash();
            setTimeout(schedule, 900);
          });
          if (document.readyState === 'complete') setTimeout(chipInit, 200);
          else window.addEventListener('load', function() { setTimeout(chipInit, 200); });
          /* When the document becomes visible again (tab return, scroll
             from another anchor) re-run once to refresh state. */
          document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') schedule();
          });
          /* On click of a chip, immediately paint the active state on
             the tapped chip so there's no stale-active gap while the
             smooth-scroll runs. Then re-wire the observer once the
             scroll settles — iOS Safari sometimes lands programmatic
             scroll without firing scroll events. */
          document.addEventListener('click', function(e) {
            var t = e.target;
            var link = t && t.closest && t.closest('a[data-control-anchor]');
            if (link) {
              var key = link.getAttribute('data-control-anchor');
              document.querySelectorAll('.sp2-control-nav a[data-control-anchor]').forEach(function(a) {
                a.removeAttribute('data-active');
                a.removeAttribute('aria-current');
              });
              link.setAttribute('data-active', 'true');
              link.setAttribute('aria-current', 'location');
              setTimeout(function() { wireObserver(); schedule(); }, 400);
            }
          }, { passive: true });

          /* State diagram opens centered — the interesting nodes (Pinned
             / arrows) sit in the middle of the canvas, so scrollLeft=0
             would land on empty whitespace. Other scrollers (sketches,
             right-click) stay left-aligned because they read L→R.
             Aggressive re-centering strategy because Next.js Image swaps
             the src after initial paint, mobile Safari fires a viewport
             resize as the URL bar collapses, and layout can shift as
             fonts finish loading. */
          function centerState() {
            const el = document.querySelector('.sp2-state-scroll');
            if (!el) return;
            if (el.scrollWidth > el.clientWidth) {
              el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
            }
          }
          function wireStateCenter() {
            centerState();
            const el = document.querySelector('.sp2-state-scroll');
            const img = el && el.querySelector('img');
            if (img) {
              if (!img.complete) img.addEventListener('load', centerState, { once: true });
              // Next.js Image swaps src after low-quality placeholder — watch for it.
              try {
                const mo = new MutationObserver(centerState);
                mo.observe(img, { attributes: true, attributeFilter: ['src', 'srcset'] });
              } catch (_) {}
            }
            if (el && typeof ResizeObserver === 'function') {
              try {
                const ro = new ResizeObserver(centerState);
                ro.observe(el);
              } catch (_) {}
            }
            [50, 150, 400, 800, 1500, 2500].forEach(t => setTimeout(centerState, t));
          }
          if (document.readyState === 'complete') wireStateCenter();
          else window.addEventListener('load', wireStateCenter);
          window.addEventListener('resize', centerState);
          document.addEventListener('visibilitychange', () => { if (!document.hidden) centerState(); });
        })();
      ` }} />
      <style>{`
        .sp2-control-nav a[data-active] {
          color: var(--color-accent) !important;
          background: rgba(15,61,62,0.06) !important;
          box-shadow: inset 0 -4px 0 var(--color-accent) !important;
          font-weight: 700 !important;
        }
        .sp2-control-nav a[data-active] span:first-child {
          opacity: 1 !important;
          color: var(--color-accent) !important;
        }
        .sp2-control-nav a:hover {
          color: #252B28;
          background: rgba(15,61,62,0.04);
        }
      `}</style>
    </section>
  );
}

function Prototypes() {
  const loops = [
    {
      key:   "pin",
      title: "Pin",
      eyebrow: "Pin · live interaction",
      body:  "The optimistic move at 250 ms. The Pinned. Undo snackbar at five seconds. The persistent Pin chip on the tile after the snackbar dismisses. Three signals confirming one action.",
      webm:  "/images/work/spotify/pin-happy.webm",
      gif:   "/images/work/spotify/pin-happy.gif",
    },
    {
      key:   "remove",
      title: "Remove",
      eyebrow: "Remove + Undo · live interaction",
      body:  "Tile slides out in 220 ms. The Removed. Undo snackbar runs the five-second window. Tap Undo and the item returns to its last position, not the front. The shelf forgives mistakes. It doesn\u2019t reward them.",
      webm:  "/images/work/spotify/undo-happy.webm",
      gif:   "/images/work/spotify/undo-happy.gif",
    },
    {
      key:   "pause",
      title: "Pause",
      eyebrow: "Pause · live interaction",
      body:  "Three presets, no slider. The shelf wears its paused state with a visible countdown. When the timer expires, a snackbar names the resume. The clock is the contract.",
      webm:  "/images/work/spotify/pause-happy.webm",
      gif:   "/images/work/spotify/pause-happy.gif",
    },
  ];

  return (
    <section aria-label="Prototypes" className="sp2-prototypes-section" style={{
      padding: `0 ${SECTION_X} 120px`,
      background: c.callout,
      borderTop: `1px solid ${c.border}`,
      borderBottom: `1px solid ${c.border}`,
    }}>
      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto", paddingTop: "80px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.6fr",
          gap: "64px", alignItems: "start", marginBottom: "48px",
        }} className="sp2-row">
          <div>
            <Eyebrow>Prototypes</Eyebrow>
            <h2 style={{
              fontFamily: font.sans, fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 600, color: c.ink, margin: 0,
              letterSpacing: "-0.025em", lineHeight: 1.05,
            }}>
              The loops.
            </h2></div>
          <div>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
            }}>
              Three short prototypes built in Principle and exported as looping web video. Each one shows the design&rsquo;s tightest signal: the timing, the confirmation, the reverse. If the interaction reads in three seconds with no caption, the design works.
            </p>
          </div>
        </div>

        <div className="sp2-loops-carousel" style={{
          border: `1px solid ${c.border}`, background: "#FFFFFF",
        }}>
          {loops.map((l, i) => (
            <input key={l.key} type="radio" name="sp2-loops-tabs"
              id={`sp2-loops-tab-${i + 1}`} defaultChecked={i === 0}
              aria-label={`${l.title} prototype`} />
          ))}

          <div className="sp2-loops-nav" style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            borderBottom: `1px solid ${c.border}`,
          }}>
            {loops.map((l, i) => (
              <label key={l.key} htmlFor={`sp2-loops-tab-${i + 1}`}
                className={`sp2-loops-tab sp2-loops-tab-${i + 1}`}
                style={{
                  padding: "20px 24px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  borderRight: i < loops.length - 1 ? `1px solid ${c.border}` : "none",
                  transition: "background 0.2s, color 0.2s",
                }}>
                {/* Numeral removed — Pin / Remove / Pause titles read on
                    their own and free up horizontal room on mobile. */}
                <span style={{
                  fontFamily: font.sans, fontSize: "16px", fontWeight: 600,
                  color: c.ink, letterSpacing: "-0.01em",
                }}>{l.title}</span>
              </label>
            ))}
          </div>

          <div className="sp2-loops-panels" style={{
            padding: "clamp(32px, 5vw, 56px)", background: "#FFFFFF",
          }}>
            {loops.map((l, i) => (
              <div key={l.key} className="sp2-loops-panel" data-panel={i + 1}>
                <div style={{
                  display: "grid", gridTemplateColumns: "auto 1fr",
                  gap: "48px", alignItems: "center",
                }} className="sp2-loops-row">
                  {/* Loop video, fixed width on left — rounded corners so
                      the looping prototype reads as a real device, not a
                      flat web video element. */}
                  <figure style={{ margin: 0 }}>
                    <div style={{
                      position: "relative",
                      background: c.jet,
                      aspectRatio: "1170 / 2532", overflow: "hidden",
                      width: "320px",
                      borderRadius: "clamp(18px, 2vw, 28px)",
                    }}>
                      <video
                        src={l.webm}
                        poster={l.gif}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={`${l.title} prototype loop`}
                        className="sp2-loop-video"
                        data-loop-key={l.key}
                        style={{
                          width: "100%", height: "100%",
                          objectFit: "cover", objectPosition: "top center",
                          display: "block",
                        }}
                      />
                      {/* Pause/play toggle — single 44px button in the
                          top-right corner. Replaces the full native
                          <video controls> chrome that was overlaying
                          the device frame. Keyboard-operable (button
                          element), state announced via aria-pressed.
                          Initial state matches the runtime computation:
                          first (active) loop renders as playing (pause
                          icon, aria-pressed=false); the other two
                          render as paused (play triangle, aria-pressed=
                          true) so React SSR markup hydrates cleanly. */}
                      <button
                        type="button"
                        className="sp2-loop-toggle"
                        data-loop-toggle={l.key}
                        aria-label={i === 0 ? `Pause ${l.title} prototype loop` : `Play ${l.title} prototype loop`}
                        aria-pressed={i === 0 ? "false" : "true"}
                        style={{
                          position: "absolute",
                          top: "8px", right: "8px",
                          width: "44px", height: "44px",
                          display: "inline-flex",
                          alignItems: "center", justifyContent: "center",
                          background: "rgba(0,0,0,0.65)",
                          border: "1px solid rgba(255,255,255,0.95)",
                          color: "#FFFFFF",
                          cursor: "pointer",
                          padding: 0,
                          /* Square (4px) instead of pill (999px) so the
                             control reads as native iOS pause chrome
                             rather than a balloon on the device frame.
                             Honors the "no large rounded rectangles"
                             house rule. */
                          borderRadius: "4px",
                        }}
                      >
                        <svg className="sp2-loop-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                          {i === 0 ? (
                            <>
                              <rect x="3" y="2" width="3.5" height="12" />
                              <rect x="9.5" y="2" width="3.5" height="12" />
                            </>
                          ) : (
                            <polygon points="3,2 14,8 3,14" />
                          )}
                        </svg>
                      </button>
                    </div>
                  </figure>
                  {/* Body copy on the right */}
                  <div>
                    <p style={{
                      fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
                      letterSpacing: "0.20em", color: c.accent,
                      textTransform: "uppercase", margin: "0 0 16px",
                    }}>{l.eyebrow}</p>
                    <h3 style={{
                      fontFamily: font.sans, fontSize: "clamp(28px, 4vw, 44px)",
                      fontWeight: 700, color: c.ink, margin: "0 0 24px",
                      letterSpacing: "-0.03em", lineHeight: 1.05,
                    }}>{l.title}.</h3>
                    <p style={{
                      fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
                      lineHeight: 1.65, color: c.ink2, margin: 0,
                      maxWidth: "520px",
                    }}>{l.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ShippedSection() {
  return (
    <section id="shipped" aria-label="Shipped, with receipts" style={{
      padding: `40px 0 120px`,
      background: c.callout, borderTop: `1px solid ${c.border}`,
      borderBottom: `1px solid ${c.border}`,
    }}>
      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto", padding: `64px ${SECTION_X} 0` }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.6fr",
          gap: "64px", alignItems: "start", marginBottom: "48px",
        }} className="sp2-row">
          <div>
            <span style={{
              fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.20em", color: c.accent,
              display: "block", marginBottom: "12px",
            }}>03</span>
            <h2 style={{
              fontFamily: font.sans, fontSize: "clamp(48px, 7vw, 84px)",
              fontWeight: 500, color: c.ink, margin: 0,
              letterSpacing: "-0.035em", lineHeight: 1.0,
            }}>
              Shipped, with receipts.
            </h2></div>
          <p style={{
            fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
            lineHeight: 1.75, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
          }}>
            Three controls, two affordances (mobile long-press, desktop right-click), one state machine. Below: the Pause state diagram that locks the time-boxed behavior, then the honest scope of what wasn&rsquo;t tested.
          </p>
        </div>

        {/* Pause state diagram */}
        <div style={{ marginBottom: "64px" }}>
          <p style={{
            fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.20em", textTransform: "uppercase",
            color: c.accent, margin: "0 0 12px",
          }}>
            State diagram &middot; Pause
          </p>
          <h3 style={{
            fontFamily: font.sans, fontSize: "clamp(22px, 2.4vw, 28px)",
            fontWeight: 600, color: c.ink, margin: "0 0 24px",
            letterSpacing: "-0.02em", lineHeight: 1.2,
          }}>
            Time-boxed, four states, every transition reversible.
          </h3>
          {/* State diagram — wide SVG; on mobile, scroll horizontally
              inside the card and zoom the diagram to its native width
              so each node is readable. */}
          <div className="sp2-state-scroll" tabIndex={0} role="region"
            aria-label="Pause state diagram, scroll horizontally to view"
            style={{
              background: "#FFFFFF", border: `1px solid ${c.border}`,
              padding: "clamp(12px, 3vw, 48px)",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
            }}>
            <Image
              src="/images/work/spotify/spotify-shelf-state-diagram.svg"
              alt="Pause state diagram: four states (idle, paused, expiring, resumed) with every transition reversible."
              width={1920} height={900}
              sizes="(max-width: 760px) 720px, (max-width: 1240px) 100vw, 1100px"
              className="sp2-state-img"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          <p className="sp2-scroll-after">Swipe to see more &rarr;</p>
        </div>

        {/* Out of scope — what got named, defended, and skipped */}
        <OutOfScope />

        {/* Honest scope + risks side by side */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px",
        }} className="sp2-decisions-grid">
          <aside style={{
            background: "#FFFFFF", border: `1px solid ${c.border}`,
            borderLeft: `4px solid ${c.accent}`, padding: "28px 32px",
          }}>
            <p style={{
              fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: c.accent, margin: "0 0 14px",
            }}>What could still go wrong</p>
            <p style={{
              fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65,
              color: c.ink2, margin: "0 0 14px",
            }}>
              <strong style={{ color: c.ink }}>Discoverability of long-press.</strong> The gesture is common on iOS but invisible. First-run education or a contextual hint may be needed.
            </p>
            <p style={{
              fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65,
              color: c.ink2, margin: "0 0 14px",
            }}>
              <strong style={{ color: c.ink }}>Pin&rsquo;s 4-item cap may frustrate power users.</strong> The cap protects the shelf&rsquo;s discovery role. A &ldquo;Show all pins&rdquo; affordance could relieve pressure if testing shows the limit hits often.
            </p>
            <p style={{
              fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65,
              color: c.ink2, margin: 0,
            }}>
              <strong style={{ color: c.ink }}>Pause without a visible timer reads as &ldquo;permanent&rdquo;.</strong> The paused state has to show its end-time clearly. If the user can&rsquo;t see when logging resumes, the time-box defeats itself.
            </p>
          </aside>

          <aside style={{
            background: "#FFFFFF", border: `1px solid ${c.border}`,
            borderLeft: `4px solid ${c.accent}`, padding: "28px 32px",
          }}>
            <p style={{
              fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: c.accent, margin: "0 0 14px",
            }}>Validation plan</p>
            <p style={{
              fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65,
              color: c.ink2, margin: "0 0 14px",
            }}>
              <strong style={{ color: c.ink }}>Discoverability.</strong> Time to first long-press without onboarding. Target under 8 seconds for at least 60% of first-time users.
            </p>
            <p style={{
              fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65,
              color: c.ink2, margin: "0 0 14px",
            }}>
              <strong style={{ color: c.ink }}>Reversibility comprehension.</strong> After Removing an item, can the user describe what happened in one sentence? Target above 80%.
            </p>
            <p style={{
              fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65,
              color: c.ink2, margin: "0 0 14px",
            }}>
              <strong style={{ color: c.ink }}>ML signal integrity.</strong> Are Pause sessions adopted at rates that materially change recommendation quality? If yes, consider auto-resume rules.
            </p>
            <p style={{
              fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65,
              color: c.ink2, margin: 0,
            }}>
              <strong style={{ color: c.ink }}>The honest scope:</strong> no users tested this. Concept project. Hypotheses are reasoned from public signals and the stakeholder map, not from behavior.
            </p>
          </aside>
        </div>

        {/* Reflection — what I'd test next. Senior signal:
            naming the riskiest decision before anyone else does. */}
        <aside style={{
          background: "#FFFFFF", border: `1px solid ${c.border}`,
          borderLeft: `4px solid ${c.accent}`, padding: "28px 32px",
          marginTop: "32px",
        }}>
          <p style={{
            fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: c.accent, margin: "0 0 14px",
          }}>What I&rsquo;d test next</p>
          <p style={{
            fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65,
            color: c.ink2, margin: "0 0 14px",
          }}>
            <strong style={{ color: c.ink }}>The long-press discoverability.</strong> If I had one round of usability, this is where it goes. The whole interaction model rests on a gesture the user has to find without being told. A first-run hint or a one-time pulse animation on the shelf header could carry the cost, but I&rsquo;d want to see the unguided number first.
          </p>
          <p style={{
            fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65,
            color: c.ink2, margin: "0 0 14px",
          }}>
            <strong style={{ color: c.ink }}>The cap&rsquo;s breaking point.</strong> Pin holds four. If the test surfaces frustration at item three or item four, the cap design is right. If frustration shows up at item five (when the swap modal appears), the modal is the problem, not the cap. Two failure modes, two fixes.
          </p>
          <p style={{
            fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65,
            color: c.ink2, margin: 0,
          }}>
            <strong style={{ color: c.ink }}>Pause comprehension.</strong> The riskiest copy is the paused state. If a user looks at the shelf and can&rsquo;t describe when logging resumes in one sentence, the timer affordance failed and the time-box reads as permanent. That&rsquo;s the design&rsquo;s primary promise. The test catches it.
          </p>
        </aside>
      </div>
    </section>
  );
}

/* ============================================================================
   New components — editorial hero, user voices, competitive table, out of scope
============================================================================ */

/* FrictionList — was a Figma slide titled "Where the Current Experience
   Falls Short." The slide was just text on white, so framing it as an image
   was wasteful. Now native HTML, with a softer heading per voice notes
   ("Falls Short" reads as a verdict; "Where the shelf gets in the way"
   reads as observation). The four bullets are the friction points the
   research surfaced. */
function FrictionList() {
  const points = [
    "Items listened to once persist far longer than expected, cluttering the shelf and misrepresenting what users actually care about.",
    "No quick way to undo or remove an item, especially when an accidental tap, short preview, or one-off experiment lands on the shelf.",
    "Limited transparency around how actions shape personalization, weakening trust in Spotify's recommendations.",
    "No lightweight way to pause or snooze activity during shifting contexts (shared home, guests, family visits, borrowed devices, etc.).",
  ];
  return (
    <section aria-label="Where the shelf gets in the way" style={{ padding: `0 ${SECTION_X} 80px` }}>
      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
        <p style={{
          fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
          letterSpacing: "0.20em", textTransform: "uppercase",
          color: c.accent, margin: "0 0 12px",
        }}>
          Contextual friction
        </p>
        <h2 style={{
          fontFamily: font.sans, fontSize: "clamp(28px, 3.4vw, 40px)",
          fontWeight: 600, color: c.ink, margin: "0 0 24px",
          letterSpacing: "-0.02em", lineHeight: 1.15,
          maxWidth: "780px",
        }}>
          Where the shelf gets in the way.
        </h2><p style={{
          fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
          lineHeight: 1.75, color: c.ink2, margin: "0 0 28px",
          maxWidth: PROSE_MAX,
        }}>
          Four predictable pain points that show up when Recently Played
          doesn&rsquo;t behave the way the user&rsquo;s context expects.
        </p>
        <ul style={{
          listStyle: "none", margin: 0, padding: 0,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 40px",
          maxWidth: "960px",
        }} className="sp2-friction-grid">
          {points.map((p, i) => (
            <li key={i} style={{
              fontFamily: font.sans, fontSize: "15px", lineHeight: 1.6,
              color: c.ink2, display: "flex", alignItems: "flex-start",
              gap: "12px",
            }}>
              <span style={{
                flexShrink: 0, width: "6px", height: "6px", marginTop: "9px",
                borderRadius: "50%", background: c.borderStrong,
              }} />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ActionSheetHero — case study opener. Spotify's Recently Played shelf is
   one of the best surfaces in consumer music; this case study adds three
   reversible controls for power users (shared screens, family devices,
   one-off plays). Phone with the action sheet on the left; on the right,
   power-user framing + three higher-quality icon cells (Pin / Remove /
   Pause) with one-line descriptions. Voice: additive, not corrective.
   Dark mat (#484848) matches the treatment used on slides elsewhere. */
function ActionSheetHero() {
  return (
    <section aria-label="Three controls for the shelf" style={{ padding: `clamp(48px, 6vw, 80px) ${SECTION_X} 0` }}>
      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
        <div className="sp2-as-hero" style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 380px) minmax(0, 1fr)",
          gap: "clamp(32px, 5vw, 72px)",
          alignItems: "center",
          /* Darker neutral so the black phone screens pop forward like
             product photography AND the Spotify-green eyebrow meets WCAG
             AA on the mat surface. No drop shadow on the phone — the
             contrast against the mat does the lift on its own. */
          background: "#404040",
          padding:    "clamp(32px, 4vw, 64px)",
        }}>
          {/* Phone with the action sheet open. Rounded corners on the
             container mimic the real iPhone screen radius so it reads as a
             device in hand rather than a flat rectangular grab. */}
          <div style={{
            aspectRatio:  "780 / 1711",
            overflow:     "hidden",
            background:   "#000",
            margin:       "0 auto",
            width:        "100%",
            maxWidth:     "320px",
            borderRadius: "clamp(18px, 2vw, 28px)",
          }}>
            <Image
              src="/images/work/spotify/spotify-action-sheet.webp"
              alt="Long-press an item on the Recently Played shelf; the action sheet opens with Pin to top, Remove from Recently Played, and Pause Listening History."
              width={780} height={1711}
              sizes="(max-width: 760px) 90vw, 320px"
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "top",
                display: "block",
              }}
            />
          </div>

          {/* Caption + icon cells */}
          <div style={{ color: "#FAFAF9" }}>
            <p style={{
              fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.20em", textTransform: "uppercase",
              color: c.green, margin: "0 0 14px",
            }}>
              For power users · additive · reversible
            </p>
            <h2 style={{
              fontFamily: font.sans, fontSize: "clamp(28px, 3vw, 38px)",
              fontWeight: 600, color: "#FAFAF9", margin: "0 0 18px",
              letterSpacing: "-0.02em", lineHeight: 1.15,
              maxWidth: "560px",
            }}>
              Three controls for the shelf people use every day.
            </h2><p style={{
              fontFamily: font.sans, fontSize: "clamp(15px, 1.5vw, 17px)",
              lineHeight: 1.7, color: "#FAFAF9",
              margin: "0 0 36px", maxWidth: "560px",
            }}>
              Spotify&rsquo;s Recently Played is one of the best surfaces in
              consumer music. For power users on shared screens, family
              devices, and one-off plays, three lightweight controls add the
              lever they keep reaching for. All reversible, all native to the
              shelf, none touch the recommendation engine.
            </p>

            {/* Three icon cells — higher-quality SVG glyphs, each one a
                filled circle backdrop in its action color + a detailed
                glyph + name + one-line description. */}
            <div className="sp2-as-icons" style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              gap: "clamp(20px, 2.5vw, 32px)",
              borderTop: "1px solid rgba(255,255,255,0.14)",
              paddingTop: "clamp(28px, 3vw, 36px)",
            }}>
              <IconCell color="#1ED760" glyph={<PinGlyph />} name="Pin"     note="Keep a favorite at the front. Max four." />
              <IconCell color="#E26F5B" glyph={<RemoveGlyph />} name="Remove" note="Hide a play without deleting it. Undo for five seconds." />
              <IconCell color="#9CA3AF" glyph={<PauseGlyph />} name="Pause"  note="Stop the shelf from logging. Time-boxed only." />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* IconCell — shared cell layout for the three control icons inside
   ActionSheetHero. Filled circular badge in the action color, glyph on
   top, name, one-line note. */
function IconCell({ color, glyph, name, note }: {
  color: string; glyph: React.ReactNode; name: string; note: string;
}) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "flex-start",
      gap: "14px",
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        /* Crisper — denser tint and a more visible border so each badge
           reads as a solid pin / remove / pause shape, not a watercolor. */
        background: hexA(color, 0.22),
        border: `1.5px solid ${hexA(color, 0.65)}`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ color, display: "inline-flex" }}>{glyph}</span>
      </div>
      <div>
        <p style={{
          fontFamily: font.sans, fontSize: "17px", fontWeight: 700,
          color: "#FFFFFF", margin: "0 0 4px", letterSpacing: "-0.01em",
        }}>{name}</p>
        <p style={{
          fontFamily: font.sans, fontSize: "13px", lineHeight: 1.5,
          color: "rgba(255, 255, 255, 0.88)", margin: 0,
        }}>{note}</p>
      </div>
    </div>
  );
}

/* hexA — quick helper: take a #rrggbb hex and return an rgba() with
   the given alpha. Used by the IconCell badges so we don't repeat the
   color math three times. */
function hexA(hex: string, a: number) {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/* Three higher-quality glyphs — filled where it counts, with detail beyond
   the original single-stroke icons. Each is 28×28 inside a 56px badge. */
function PinGlyph() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      {/* Pin head with subtle highlight */}
      <path
        d="M18.5 2.5l7 7-3.6 1.2L17 16l1.2 5-2.4 2.4L10 17.8 3 24.8v-2L10 16 5 11l2.4-2.4 5 1.2 5-5 1.1-2.3z"
        fill="currentColor" fillOpacity="0.92"
      />
      <path
        d="M18.5 2.5l3 3-1.5 1.5-3-3z"
        fill="#FFFFFF" fillOpacity="0.35"
      />
    </svg>
  );
}
function RemoveGlyph() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      {/* Filled circle with a strikethrough bar */}
      <circle cx="14" cy="14" r="11" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.6" />
      <rect x="7" y="12.6" width="14" height="2.8" rx="1.4" fill="currentColor" />
    </svg>
  );
}
function PauseGlyph() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      {/* Clock with running timer arc + small toggle dot */}
      <circle cx="14" cy="14" r="10.5" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.10" />
      {/* Hand at 12 and 3 */}
      <path d="M14 8v6l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Timer arc — 3/4 around */}
      <path d="M22 14a8 8 0 1 0-5 7.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* UserVoices — six quotes from public sources. Direct evidence that
   people are reaching for affordances that don't exist yet. */
function UserVoices() {
  const quotes = [
    { text: "Recently Played is literally the ONE AND ONLY feature of the app I use.", source: "Reddit, Oct 2024" },
    { text: "I'd play 1 second of a track so it would show in Recently Played.",        source: "Spotify Community, 2020" },
    { text: "That annoyed me so much I left Spotify.",                                   source: "Reddit, Jul 2023" },
    { text: "Listening history is like a diary of my music journey.",                    source: "Spotify Community, 2021" },
    { text: "Apple Music lets you clear listening history. Spotify should too.",         source: "App Store, 2023" },
    { text: "Why hasn't Spotify added a clear history option yet?",                      source: "Spotify Community, Jun 2020" },
  ];
  return (
    <section aria-label="What users said" style={{ padding: `0 ${SECTION_X} 120px` }}>
      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.6fr",
          gap: "64px", alignItems: "start", marginBottom: "32px",
        }} className="sp2-row">
          <div>
            <Eyebrow>What users said</Eyebrow>
            <h2 style={{
              fontFamily: font.sans, fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 600, color: c.ink, margin: 0,
              letterSpacing: "-0.025em", lineHeight: 1.05,
            }}>
              The signal was in the open.
            </h2></div>
          <div>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
            }}>
              No internal data, no brief. The research layer was built from public sources: Spotify Community threads, App Store reviews, Reddit, UX forum posts. AI-assisted clustering on 200+ posts surfaced six quotes that made the design unavoidable.
            </p>
          </div>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          gap: "16px",
        }} className="sp2-quotes-grid">
          {quotes.map((q) => (
            <blockquote key={q.text} className="sp2-quote-card" style={{
              margin: 0, padding: "28px 28px 24px",
              background: c.callout, border: `1px solid ${c.border}`,
              borderTop: `3px solid ${c.accent}`,
              display: "flex", flexDirection: "column", gap: "16px",
              minHeight: "180px",
            }}>
              <p style={{
                fontFamily: font.sans, fontSize: "16px",
                fontWeight: 500, color: c.ink, margin: 0,
                lineHeight: 1.5, letterSpacing: "-0.01em",
              }}>&ldquo;{q.text}&rdquo;</p>
              <p style={{
                fontFamily: font.sans, fontSize: "11px",
                fontWeight: 600, letterSpacing: "0.12em",
                textTransform: "uppercase", color: c.muted,
                margin: "auto 0 0",
              }}>{q.source}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CompetitiveAudit — code-rendered table. Five categories ×
   four platforms + the proposed Spotify row highlighted. */
function CompetitiveAudit() {
  const cols = ["Platform", "Clear all", "Pause history", "Remove single", "Inline controls", "Reversible"];
  const rows = [
    { name: "YouTube Music",         vals: ["✓", "—", "—", "Limited", "✓"], proposed: false },
    { name: "Apple Music",           vals: ["—", "✓", "✓", "—",       "✓"], proposed: false },
    { name: "Amazon Music",          vals: ["—", "✓", "✓", "✓",       "✓"], proposed: false },
    { name: "TikTok / YouTube",      vals: ["n/a", "n/a", "n/a", "✓", "✓"], proposed: false },
    { name: "Spotify (today)",       vals: ["—", "—", "—", "—", "—"],       proposed: false, current: true },
    { name: "Spotify (proposed)",    vals: ["✓", "✓", "✓", "✓", "✓"],       proposed: true },
  ];
  const thStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
    letterSpacing: "0.18em", textTransform: "uppercase",
    textAlign: "left", padding: "14px 18px", color: c.muted,
    borderBottom: `1px solid ${c.border}`,
  };
  const tdBase: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "14px",
    padding: "14px 18px", verticalAlign: "middle",
    borderBottom: `1px solid ${c.border}`,
  };
  const cellColor = (v: string, proposed: boolean) => {
    if (v === "✓") return proposed ? c.accent : c.ink;
    if (v === "—") return c.muted;
    return c.ink2;
  };
  return (
    <section aria-label="Competitive audit" style={{ padding: `0 ${SECTION_X} 120px` }}>
      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.6fr",
          gap: "64px", alignItems: "start", marginBottom: "32px",
        }} className="sp2-row">
          <div>
            <Eyebrow>Competitive audit</Eyebrow>
            <h2 style={{
              fontFamily: font.sans, fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 600, color: c.ink, margin: 0,
              letterSpacing: "-0.025em", lineHeight: 1.05,
            }}>
              Five categories.<br />One open slot.
            </h2></div>
          <div>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75, color: c.ink2, margin: "0 0 16px", maxWidth: PROSE_MAX,
            }}>
              Heuristic audit across seven listening platforms. Apple Music, Amazon Music, and YouTube Music all ship at least one shelf-level control. TikTok and YouTube treat the feed as inline-editable by default. Spotify ships none. The pattern is in the open.
            </p>
            <p style={{
              fontFamily: font.sans, fontSize: "12px", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: c.muted, margin: "0 0 8px",
            }}>
              The five categories
            </p>
            <p style={{
              fontFamily: font.sans, fontSize: "14px",
              lineHeight: 1.65, color: c.ink, margin: 0, maxWidth: PROSE_MAX,
            }}>
              Clear all · Pause history · Remove single · Inline controls · Reversible.
            </p>
          </div>
        </div>

        {/* Competitor screens grid — actual UI from each platform.
            The data table reads the same way, but the screens
            prove the pattern exists in product. */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          gap: "16px", marginBottom: "40px",
        }} className="sp2-comp-grid">
          {[
            { name: "YouTube Music", file: "competitor-youtube-music.png" },
            { name: "Apple Music",   file: "competitor-apple-music.png" },
            { name: "TIDAL",         file: "competitor-tidal.png" },
            { name: "Amazon Music",  file: "competitor-amazon-music.png" },
            { name: "Deezer",        file: "competitor-deezer.png" },
            { name: "SoundCloud",    file: "competitor-soundcloud.png" },
          ].map((it) => (
            <figure key={it.name} style={{ margin: 0 }}>
              <Image
                src={`/images/work/spotify/v2/${it.file}`}
                alt={`${it.name} reference screen captured for the competitive audit.`}
                width={1920} height={1354}
                sizes="(max-width: 760px) 100vw, 33vw"
                style={{ width: "100%", height: "auto", display: "block", border: `1px solid ${c.border}` }}
              />
              <figcaption style={{
                fontFamily: font.sans, fontSize: "11px", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: c.muted, margin: "10px 0 0", textAlign: "center",
              }}>{it.name}</figcaption>
            </figure>
          ))}
        </div>

        <div className="sp2-audit-scroll" tabIndex={0} role="region"
          aria-label="Competitive audit table, scroll horizontally to view all columns"
          style={{
            border: `1px solid ${c.border}`, background: "#FFFFFF", overflow: "auto",
          }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: c.callout }}>
                {cols.map((col, i) => (
                  <th key={col} style={{
                    ...thStyle,
                    textAlign: i === 0 ? "left" : "center",
                    width: i === 0 ? "28%" : `${72 / (cols.length - 1)}%`,
                  }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name} style={{
                  /* Proposed row keeps the green tint (Spotify-native
                     marker). Current "Spotify (today)" row uses a
                     cool gray instead of crimson tint — site brand
                     (crimson) shouldn't bleed into the case study
                     palette. */
                  background: r.proposed
                    ? "rgba(30,215,96,0.10)"
                    : r.current
                    ? "#F4F4F2"
                    : "#FFFFFF",
                }}>
                  <td style={{
                    ...tdBase,
                    fontWeight: r.proposed || r.current ? 700 : 500,
                    color: r.proposed ? c.accent : r.current ? c.ink2 : c.ink,
                  }}>{r.name}</td>
                  {r.vals.map((v, i) => (
                    <td key={i} style={{
                      ...tdBase, textAlign: "center",
                      color: cellColor(v, r.proposed),
                      fontWeight: v === "✓" ? 700 : 500,
                      fontSize: v === "✓" || v === "—" ? "18px" : "13px",
                    }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="sp2-scroll-after">Swipe to see more &rarr;</p>
        <p style={{
          fontFamily: font.sans, fontSize: "12px",
          color: c.muted, lineHeight: 1.55, margin: "12px 0 0",
        }}>
          Spotify today: no per-item control of any kind. The proposed row shows the three new controls (plus a settings-level Clear All, scoped out of this case study).
        </p>
      </div>
    </section>
  );
}

/* OutOfScope — what got named, defended, and skipped.
   Senior signal: knowing what NOT to design. */
function OutOfScope() {
  const items = [
    {
      title: "Editing global listening history",
      reason: "This touches a different surface (Settings → Privacy) and a different stakeholder group. Scoping it here would expand the project beyond one sprint.",
    },
    {
      title: "Changing ranking algorithms",
      reason: "Recommendation logic is owned by a separate team. Any ranking changes would require cross-team alignment that's out of scope for a shelf-level UX feature.",
    },
    {
      title: "Profile privacy redesign",
      reason: "Friends-feed and listening visibility live in a different settings surface. They deserve their own design pass, not a piggyback on this one.",
    },
    {
      title: "Permanent pause toggle",
      reason: "Permanent pause was ruled out at the constraint stage. The ML training signal degrades fast with persistent pause. Time-boxing is what survived.",
    },
  ];
  return (
    <div style={{ margin: "0 0 56px" }}>
      <p style={{
        fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
        letterSpacing: "0.20em", textTransform: "uppercase",
        color: c.accent, margin: "0 0 12px",
      }}>Out of scope</p>
      <h3 style={{
        fontFamily: font.sans, fontSize: "clamp(22px, 2.6vw, 30px)",
        fontWeight: 600, color: c.ink, margin: "0 0 12px",
        letterSpacing: "-0.02em", lineHeight: 1.2,
      }}>
        Four things that got named, defended, and skipped.
      </h3>
      <p style={{
        fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65,
        color: c.ink2, margin: "0 0 24px", maxWidth: "780px",
      }}>
        Knowing what not to design is the same skill as knowing what to design. Each item below was raised, considered, and deliberately left for a different surface or a different team.
      </p>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "16px",
      }} className="sp2-decisions-grid">
        {items.map((it) => (
          <div key={it.title} style={{
            background: "#FFFFFF", border: `1px solid ${c.border}`,
            padding: "24px 28px",
          }}>
            <p style={{
              fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: c.muted, margin: "0 0 8px",
            }}>Skipped</p>
            <p style={{
              fontFamily: font.sans, fontSize: "16px", fontWeight: 600,
              color: c.ink, margin: "0 0 10px", letterSpacing: "-0.01em",
            }}>{it.title}</p>
            <p style={{
              fontFamily: font.sans, fontSize: "13px", lineHeight: 1.6,
              color: c.ink2, margin: 0,
            }}>{it.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* UserJourney — single-frame map showing where the three controls
   land along the listening journey. Reinstated after the carousel
   restructure since it carried the bridge from research to design. */
function UserJourney() {
  return (
    <section aria-label="User journey map" style={{ padding: `0 ${SECTION_X} 120px` }}>
      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.6fr",
          gap: "64px", alignItems: "start", marginBottom: "32px",
        }} className="sp2-row">
          <div>
            <Eyebrow>User journey</Eyebrow>
            <h2 style={{
              fontFamily: font.sans, fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 600, color: c.ink, margin: 0,
              letterSpacing: "-0.025em", lineHeight: 1.05,
            }}>
              Where the controls land.
            </h2></div>
          <div>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
            }}>
              One-frame journey across the Recently Played shelf. Peaks and valleys mapped against the three opportunity points where Pin, Remove, and Pause each earn their slot.
            </p>
          </div>
        </div>
        {/* Journey map — desktop renders the wide image; mobile renders
            the transposed vertical version (JourneyVerticalMobile) so the
            map reads top-to-bottom instead of horizontal-scroll. */}
        {/* Journey map sits directly on the DECISIONS arc tint. The
            prior white inner box + border framed the map like a
            gallery print, which fought the dark-on-lavender rhythm
            the rest of the arc uses. */}
        {/* Journey map — no aspect-ratio container, no max-height,
            no object-fit. Plain <Image> at natural width, height
            auto. Full map always visible, bottom never clipped. */}
        <div className="sp2-journey-scroll sp2-journey-desktop"
          role="region"
          aria-label="User journey map"
          style={{
            display:        "flex",
            justifyContent: "center",
        }}>
          <Image
            src="/images/work/spotify/v2/figma-user-journey-final.png"
            alt="User journey map. Recently Played shelf with the three opportunity points called out."
            width={1920} height={1160}
            sizes="(min-width: 1400px) 1400px, 100vw"
            quality={95}
            className="sp2-journey-img"
            style={{
              display:  "block",
              width:    "100%",
              height:   "auto",
              maxWidth: "1400px",
            }}
          />
        </div>
        <JourneyVerticalMobile />
      </div>
    </section>
  );
}

/* ── User journey, transposed for mobile ────────────────────────────
   The original Figma export is a wide table that requires horizontal
   scrolling on phones. On mobile we render the same data as a stack
   of six "stage" cards, each card listing all rows (Goals / Actions /
   Thoughts / etc.) for that one stage. Reads top-to-bottom naturally. */
function JourneyVerticalMobile() {
  const stages = [
    {
      name:        "Launch & Landing",
      goal:        "Open app and see Home with Recently Played shelf immediately.",
      actions:     ["Launch Spotify (mobile/desktop)", "Land on Home"],
      thought:     "Show me my stuff fast.",
      pains:       [
        "Home loads slowly; Recents pushed below promos/modules.",
        "Shelf order feels random vs. last session/context.",
        "Autoplay or loud preview starts unexpectedly on open.",
      ],
      emotion:     "Neutral → hopeful",
      touchpoint:  "Home screen; Recents shelf; player mini-card.",
      opportunity: "Prioritize Recents visibility and performance.",
    },
    {
      name:        "Scan Recents",
      goal:        "Spot irrelevant / private / low-signal items quickly.",
      actions:     ["Scroll Recents", "Long-press or open ‘•••’"],
      thought:     "That kid’s playlist shouldn’t show at work.",
      pains:       [
        "No obvious affordance (long-press / ‘•••’ inconsistent by platform).",
        "Small tap targets; hard to hit the right card menu.",
        "Can’t multi-select items to clean up quickly.",
      ],
      emotion:     "Annoyed; privacy-aware",
      touchpoint:  "Card long-press; overflow menu; hover states (desktop).",
      opportunity: "Clear, consistent affordances for management.",
    },
    {
      name:        "Choose Action",
      goal:        "Pick the right control without harming recs.",
      actions:     ["Read labels / tooltips", "Compare: Remove vs Don’t Suggest vs Pause History vs Clear All"],
      thought:     "What exactly will this change?",
      pains:       [
        "‘Remove’ vs ‘Don’t suggest similar’ labels are unclear.",
        "No preview of impact on recommendations / history.",
        "Fear of doing something irreversible by mistake.",
      ],
      emotion:     "Cautious",
      touchpoint:  "Microcopy; ‘Why this is here’ explainer; privacy iconography.",
      opportunity: "Plain language + short ‘What changes?’ link; preview impact on recs.",
    },
    {
      name:        "Apply Control",
      goal:        "Execute fast without context switching.",
      actions:     ["Tap chosen control", "Optionally scope (item / artist or time-box Pause)", "Edge: attempt 5th Pin → Replace modal"],
      thought:     "Please be one tap.",
      pains:       [
        "Controls buried behind menus or deep in Settings.",
        "Requires context switch; loses position on the Home shelf.",
        "Too many confirmations for simple, reversible action.",
      ],
      emotion:     "Focused",
      touchpoint:  "Action buttons: Remove, Don’t Suggest Similar, Pause History (timed), Clear All; global toggle.",
      opportunity: "One-tap defaults; scoped choices; sensible confirmations.",
    },
    {
      name:        "Confirm / Undo",
      goal:        "Reassurance and easy recovery.",
      actions:     ["See dialog or toast", "Undo available 5–10s", "Replace chosen → toast", "Pinned to top: Undo"],
      thought:     "Good, if I regret it I can undo.",
      pains:       [
        "Missing or tiny Undo window; easy to miss toast.",
        "Feedback is vague (‘Done’) with no detail on what changed.",
        "Anxiety about permanence despite ‘non-destructive’ copy.",
      ],
      emotion:     "Relief if simple; frustration if not",
      touchpoint:  "Confirmation dialog; Undo toast; haptic.",
      opportunity: "Generous Undo; non-destructive-first; undo intent shown from snackbars.",
    },
    {
      name:        "Post-Action Review",
      goal:        "Validate change; keep listening; protect recommendation quality.",
      actions:     ["Shelf updates", "Item hides", "History / Trash records reversible changes"],
      thought:     "Nice, cleaner recents and my recs stay sane.",
      pains:       [
        "Shelf doesn’t visibly update right away (stale state).",
        "No History / Trash view to review or restore changes.",
        "Recommendations still surface similar items after cleanup.",
      ],
      emotion:     "Restored; in control",
      touchpoint:  "Updated shelf; History Trash (30-day restore); Settings → Privacy & History.",
      opportunity: "Restore view; lightweight survey; show learning (‘We’ll show fewer kids playlists’).",
    },
  ];

  const labelStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
    letterSpacing: "0.16em", textTransform: "uppercase",
    color: c.muted, margin: "0 0 6px",
  };
  const bodyStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "13px", lineHeight: 1.55,
    color: c.ink, margin: 0,
  };

  return (
    <div className="sp2-journey-mobile" style={{ display: "none" }}>
      {stages.map((s, i) => (
        <article key={s.name} style={{
          background: "#FFFFFF", border: `1px solid ${c.border}`,
          padding: "20px 18px", marginTop: i === 0 ? 0 : "12px",
        }}>
          {/* Stage header — jet background so white text meets AA (white
              on Spotify green was 1.92:1, fails). Green moves to a thin
              left bar where contrast doesn't matter. */}
          <div style={{
            background: c.jet, color: "#FFFFFF",
            borderLeft: `3px solid ${c.green}`,
            fontFamily: font.sans, fontSize: "12px", fontWeight: 700,
            letterSpacing: "0.10em", textTransform: "uppercase",
            padding: "8px 12px", margin: "-20px -18px 16px",
            display: "flex", justifyContent: "space-between", alignItems: "baseline",
          }}>
            <span>{String(i + 1).padStart(2, "0")} · {s.name}</span>
          </div>

          <section style={{ marginBottom: "16px" }}>
            <p style={labelStyle}>Goal</p>
            <p style={bodyStyle}>{s.goal}</p>
          </section>

          <section style={{ marginBottom: "16px" }}>
            <p style={labelStyle}>Actions</p>
            <ul style={{ margin: 0, paddingLeft: "18px", ...bodyStyle }}>
              {s.actions.map((a) => <li key={a} style={{ marginBottom: "4px" }}>{a}</li>)}
            </ul>
          </section>

          <section style={{ marginBottom: "16px" }}>
            <p style={labelStyle}>Thought</p>
            <p style={{ ...bodyStyle, color: c.ink2 }}>
              &ldquo;{s.thought}&rdquo;
            </p>
          </section>

          <section style={{ marginBottom: "16px" }}>
            <p style={labelStyle}>Pain Points</p>
            <ul style={{ margin: 0, paddingLeft: "18px", ...bodyStyle }}>
              {s.pains.map((p) => <li key={p} style={{ marginBottom: "4px" }}>{p}</li>)}
            </ul>
          </section>

          <section style={{ marginBottom: "16px" }}>
            <p style={labelStyle}>Emotion</p>
            <p style={bodyStyle}>{s.emotion}</p>
          </section>

          <section style={{ marginBottom: "16px" }}>
            <p style={labelStyle}>Touchpoint</p>
            <p style={bodyStyle}>{s.touchpoint}</p>
          </section>

          <section style={{
            background: "rgba(30,215,96,0.10)",
            border: `1px solid rgba(30,215,96,0.35)`,
            padding: "12px 14px", margin: "16px -2px 0",
          }}>
            <p style={{ ...labelStyle, color: c.accent, marginBottom: "4px" }}>
              Opportunity
            </p>
            <p style={{ ...bodyStyle, fontWeight: 600 }}>{s.opportunity}</p>
          </section>
        </article>
      ))}
    </div>
  );
}
