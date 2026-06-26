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
  muted:    "#8A8680",
  // Site chrome stays crimson elsewhere (nav, footer). Inside this
  // case study, the brand-themed marker is Spotify green so every
  // callout, eyebrow, and accent reads native to the subject.
  brand:    "#1ED760",                // Spotify green — case study marker
  brandSite:"var(--color-brand)",     // site crimson — only used if explicitly needed
  accent:   "var(--color-accent)",    // deep teal — secondary eyebrow color
  accent2:  "var(--color-accent-hover)",
  border:        "#DEDCD7",
  borderStrong:  "#A8A6A0",
  callout:       "#FAFAF9",
  // Spotify-specific palette
  green:    "#1ED760",
  greenDark:"#13A046",
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

/* Academic-category pill — sits UNDER each chapter title to restore the
   skim-friendly "Premise / Research / Decisions / Details" arc that
   editorial chapter titles otherwise hide. Filled pill in Spotify green
   so it reads as a different signal from the bordered Tag pills (which
   are dimensions of the work). The reader can tell at a glance:
   "rounded green = arc category, square border = work dimension." */
function CategoryPill({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ margin: "10px 0 28px" }}>
      <span style={{
        display:        "inline-flex",
        alignItems:     "center",
        gap:            "6px",
        fontFamily:     font.sans,
        fontSize:       "10px",
        fontWeight:     700,
        letterSpacing:  "0.18em",
        textTransform:  "uppercase",
        color:          c.accent,
        padding:        "5px 12px 5px 10px",
        background:     "rgba(30, 215, 96, 0.10)",
        border:         "none",
        borderRadius:   "999px",
      }}>
        <span aria-hidden style={{
          display:      "inline-block",
          width:        "6px",
          height:       "6px",
          borderRadius: "50%",
          background:   c.accent,
        }} />
        {children}
      </span>
    </div>
  );
}

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

function Callout({ decision, why, cost }: { decision: string; why: string; cost: string }) {
  const labelStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
    letterSpacing: "0.18em", textTransform: "uppercase",
    color: c.accent, margin: "0 0 8px",
  };
  const bodyStyle: React.CSSProperties = {
    fontFamily: font.sans, fontSize: "15px", lineHeight: 1.7, color: c.ink2, margin: 0,
  };
  return (
    <aside style={{
      background: c.callout, border: `1px solid ${c.border}`,
      borderLeft: `4px solid ${c.brand}`,
      padding: "28px 32px", maxWidth: "680px", marginTop: "40px",
    }}>
      <p style={labelStyle}>Decision</p>
      <p style={{
        fontFamily: font.sans, fontSize: "20px", fontWeight: 600,
        color: c.brand, margin: "0 0 24px", letterSpacing: "-0.01em", lineHeight: 1.3,
      }}>{decision}</p>
      <p style={labelStyle}>Why</p>
      <p style={{ ...bodyStyle, margin: "0 0 24px" }}>{why}</p>
      <p style={labelStyle}>Cost</p>
      <p style={bodyStyle}>{cost}</p>
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

function BigThree({ number, heading, category, image, imageAlt, body, callout, w, h }: {
  number: string; heading: string; category?: string; image?: string; imageAlt?: string;
  body: React.ReactNode; callout: { decision: string; why: string; cost: string };
  w?: number; h?: number;
}) {
  return (
    <section style={{ padding: `0 0 120px` }}>
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
              fontFamily: font.sans, fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 600, color: c.ink, margin: 0,
              letterSpacing: "-0.025em", lineHeight: 1.05,
            }}>{heading}.</h2>
            {category && (
              <div style={{ marginTop: "16px" }}>
                <CategoryPill>{category}</CategoryPill>
              </div>
            )}
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

      <main style={{ background: c.surface, paddingTop: "72px" }}>

        {/* Back link */}
        <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto", padding: `24px ${SECTION_X} 0` }}>
          <Link href="/#work" style={{
            fontFamily: font.sans, fontSize: "13px",
            color: c.muted, textDecoration: "none",
          }}>← Back to work</Link>
        </div>

        {/* Title block */}
        <header style={{ maxWidth: CONTENT_MAX, margin: "0 auto", padding: `clamp(56px, 12vw, 120px) ${SECTION_X} clamp(40px, 8vw, 80px)` }}>
          <Eyebrow>Concept · Self-directed</Eyebrow>
          <h1 style={{
            fontFamily: font.sans, fontSize: "clamp(36px, 10vw, 96px)",
            fontWeight: 500, color: c.ink, margin: "0 0 20px",
            letterSpacing: "-0.035em", lineHeight: 1.0,
          }}>
            Pin. Remove. <span style={{ color: c.green }}>Pause.</span>
          </h1>
          <div style={{ marginBottom: "32px" }}>
            <CategoryPill>Premise</CategoryPill>
          </div>
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

        {/* ── PREMISE arc tint ─ */}
        <div style={{ background: "#F2F2F1", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)" }}>
        {/* Action sheet hero — case study opener. One affordance image
            (long-press action sheet open over a track row) + the three
            controls + power-user framing. Replaces the previous dark
            editorial block which restated this same idea above it. */}
        <ActionSheetHero />

        {/* Pull quote */}
        <section style={{ maxWidth: CONTENT_MAX, margin: "0 auto", padding: `40px ${SECTION_X} 120px` }}>
          <p style={{
            fontFamily: font.sans, fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 500, color: c.ink, margin: 0,
            lineHeight: 1.25, letterSpacing: "-0.015em", maxWidth: "900px",
          }}>
            &ldquo;The shelf records every play and orders by recency. That&rsquo;s the entire interaction model. People are reaching for affordances that don&rsquo;t exist yet.&rdquo;
          </p>
        </section>

        {/* Friction list — was a figma slide ("Where the Current Experience
            Falls Short"); the slide was just text on a white background, so
            it's now native HTML. Less dramatic heading per voice notes. */}
        <FrictionList />

        {/* §01 The Problem — image dropped (the slide content is now the
            FrictionList above; one image of text isn't an image). */}
        <BigThree
          number="01"
          category="Premise"
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
        <div style={{ background: "#F1F4F8", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)" }}>
        {/* User voices — direct quotes from public sources.
            People are reaching for affordances that don't exist yet. */}
        <UserVoices />

        {/* Research Strip — 3 personas */}
        <section style={{ padding: `0 0 80px` }}>
          <ResearchStrip />
        </section>

        {/* Competitive audit — code-rendered table.
            Pulled from Figma slide 16 (Competitive Patterns at a Glance). */}
        <CompetitiveAudit />

        </div>
        {/* ─ end RESEARCH arc tint */}

        <ArcDivider arc="Decisions" />

        {/* ── DECISIONS arc tint ─ */}
        <div style={{ background: "#F2F2F1", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)" }}>
        {/* User journey — where the controls land */}
        <UserJourney />

        {/* Sketches → Mid-fi → Decision logic
            User said: break apart the 3-tab carousel. Each phase
            gets its own breathing room. Each is image-led. */}
        <SketchesAndMidfi />

        </div>
        {/* ─ end DECISIONS arc tint */}

        <ArcDivider arc="Details" />

        {/* ── DETAILS arc tint ─ */}
        <div style={{ background: "#F1F6F2", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)" }}>
        <DecisionLogic />

        {/* Prototypes — moved out of DecisionLogic so the loops have their own breathing room */}
        <Prototypes />

        {/* §02 The Bet — image dropped (figma-slide-reversible-set.png was a
            text slide: title + 3 icons + 3 bullets, all already said by the
            body + callout below). */}
        <BigThree
          number="02"
          category="Details"
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
        <section style={{ padding: `clamp(56px, 12vw, 120px) ${SECTION_X}` }}>
          <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
            <Eyebrow>Desktop parity</Eyebrow>
            <h2 style={{
              fontFamily: font.sans, fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 600, color: c.ink, margin: "0 0 24px",
              letterSpacing: "-0.025em", lineHeight: 1.05, maxWidth: "780px",
            }}>
              Same logic, native shell.
            </h2>
            <CategoryPill>Details</CategoryPill>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75, color: c.ink2, margin: "0 0 40px", maxWidth: PROSE_MAX,
            }}>
              Mobile uses long-press to open the action sheet. Desktop uses a right-click context menu. The three controls and their state machines are identical. Only the affordance changes.
            </p>

            <div className="sp2-parity-grid" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: "clamp(28px, 4vw, 48px)",
              alignItems: "start",
            }}>
              {/* Editorial block — was rendered as text inside the composite */}
              <div>
                <p style={{
                  fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: c.muted, margin: "0 0 12px",
                }}>
                  Maintaining cross-platform consistency
                </p>
                <h3 style={{
                  fontFamily: font.sans, fontSize: "clamp(20px, 2.4vw, 28px)",
                  fontWeight: 700, color: c.ink, margin: "0 0 20px",
                  letterSpacing: "-0.02em", lineHeight: 1.2,
                }}>
                  Consistent behavior on desktop.
                </h3>
                <p style={{
                  fontFamily: font.sans, fontSize: "15px",
                  lineHeight: 1.65, color: c.ink2, margin: "0 0 20px",
                }}>
                  Habitual desktop users access the same set of surfaced controls through a right-click context menu, matching Spotify&rsquo;s existing desktop paradigms.
                </p>
                <p style={{
                  fontFamily: font.sans, fontSize: "13px", fontWeight: 700,
                  color: c.ink, margin: "0 0 8px", letterSpacing: "-0.005em",
                }}>
                  This maintains:
                </p>
                <ul style={{
                  fontFamily: font.sans, fontSize: "14px",
                  lineHeight: 1.65, color: c.ink2,
                  margin: 0, paddingLeft: "20px",
                }}>
                  <li>Predictable cross-platform behavior</li>
                  <li>Minimal UI surface changes</li>
                  <li>A familiar power-user pathway without expanding the primary UI surface.</li>
                </ul>
              </div>

              {/* Screenshot — just the right-click menu, no text bake-in */}
              <figure style={{ margin: 0 }}>
                <Image
                  src="/images/work/spotify/spotify-desktop-context-menu-screenshot.webp"
                  alt="Spotify Desktop Recently Played shelf with the right-click context menu showing Pin, Remove from history, and Pause history actions."
                  width={860} height={540}
                  sizes="(max-width: 760px) 100vw, 56vw"
                  style={{ width: "100%", height: "auto", display: "block", border: `1px solid ${c.border}` }}
                />
                <figcaption style={{
                  fontFamily: font.sans, fontSize: "11px", fontWeight: 600,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: c.muted, margin: "12px 0 0", textAlign: "center",
                }}>
                  Desktop right-click menu &middot; same actions, native pattern
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Meta block */}
        <section style={{
          borderTop: `1px solid ${c.border}`,
          padding: `64px ${SECTION_X}`, background: c.surface,
        }}>
          <div style={{
            maxWidth: CONTENT_MAX, margin: "0 auto",
            display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
            gap: "32px",
          }} className="sp2-meta">
            <MetaCell label="Role"   value="UX/UI Designer · End-to-end" />
            <MetaCell label="Year"   value="2025" />
            <MetaCell label="Type"   value="Self-directed concept" />
            <MetaCell label="Stack"  value="Figma · Principle · After Effects" />
            <MetaCell label="Status" value="Concept · not shipped" />
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
        /* Three-controls carousel — CSS-only tabs (same pattern as Wayfarer DS) */
        .sp2-tc-carousel > input[type="radio"] { position: absolute; opacity: 0; pointer-events: none; }
        .sp2-tc-panel { display: none; }
        #sp2-tc-tab-1:checked ~ .sp2-tc-panels > [data-panel="1"],
        #sp2-tc-tab-2:checked ~ .sp2-tc-panels > [data-panel="2"],
        #sp2-tc-tab-3:checked ~ .sp2-tc-panels > [data-panel="3"] { display: block; }
        #sp2-tc-tab-1:checked ~ .sp2-tc-nav .sp2-tc-tab-1,
        #sp2-tc-tab-2:checked ~ .sp2-tc-nav .sp2-tc-tab-2,
        #sp2-tc-tab-3:checked ~ .sp2-tc-nav .sp2-tc-tab-3 {
          background: #FFFFFF;
          box-shadow: inset 0 -3px 0 var(--color-brand);
        }
        .sp2-tc-tab:hover { background: rgba(255,255,255,0.5); }

        /* Prototypes loops — 3-tab carousel, same pattern */
        .sp2-loops-carousel > input[type="radio"] { position: absolute; opacity: 0; pointer-events: none; }
        .sp2-loops-panel { display: none; }
        #sp2-loops-tab-1:checked ~ .sp2-loops-panels > [data-panel="1"],
        #sp2-loops-tab-2:checked ~ .sp2-loops-panels > [data-panel="2"],
        #sp2-loops-tab-3:checked ~ .sp2-loops-panels > [data-panel="3"] { display: block; }
        #sp2-loops-tab-1:checked ~ .sp2-loops-nav .sp2-loops-tab-1,
        #sp2-loops-tab-2:checked ~ .sp2-loops-nav .sp2-loops-tab-2,
        #sp2-loops-tab-3:checked ~ .sp2-loops-nav .sp2-loops-tab-3 {
          background: #FAFAF9;
          box-shadow: inset 0 -3px 0 #1ED760;
        }
        .sp2-loops-tab:hover { background: rgba(30,215,96,0.05); }

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
          .sp2-as-hero          { grid-template-columns: 1fr !important; gap: 28px !important; padding: 24px !important; }
          .sp2-as-hero h2       { font-size: 24px !important; }
          .sp2-as-icons         { grid-template-columns: 1fr !important; gap: 18px !important; }
          .sp2-dl-frames        { grid-template-columns: 1fr !important; gap: 20px !important; }
          .sp2-loops-row        { grid-template-columns: 1fr !important; gap: 24px !important; }
          .sp2-loops-row figure > div { width: 100% !important; max-width: 280px !important; }
          /* Prototype tabs — larger tap target on phones; clearer active
             state via stronger background contrast. */
          .sp2-loops-tab        { padding: 16px 12px !important; flex-direction: column !important; align-items: center !important; gap: 4px !important; }
          .sp2-loops-tab span:first-child { font-size: 9px !important; }
          .sp2-loops-tab span:last-child  { font-size: 14px !important; }
          .sp2-tc-nav           { grid-template-columns: 1fr 1fr 1fr !important; }
          /* Parity section — stack the editorial block above the
             screenshot on phones so neither pane is squished. */
          .sp2-parity-grid      { grid-template-columns: 1fr !important; gap: 28px !important; }
          /* State diagram — let the SVG keep its native width and scroll
             horizontally inside the card; show the swipe hint. */
          .sp2-state-scroll .sp2-state-img { width: 720px !important; max-width: 720px !important; }
          .sp2-state-hint                  { display: block !important; }
          /* User journey — same pattern; show the map at native width and
             let the reader swipe to see all three opportunity points. */
          .sp2-journey-scroll .sp2-journey-img { width: 980px !important; max-width: 980px !important; }
          .sp2-scroll-hint-journey         { display: block !important; }
          /* Competitive audit — already scrolls horizontally; surface the
             hint so the swipe affordance is discoverable. */
          .sp2-scroll-hint-audit           { display: block !important; }
          /* Signal section (user voices) — each quote sticky-stacks so the
             previous card stays visible above the next one as the reader
             scrolls, the way the user described. */
          .sp2-quote-card {
            position: sticky !important;
            top: 124px !important;
            box-shadow: 0 -1px 0 rgba(255,255,255,0.85), 0 12px 28px -16px rgba(0,0,0,0.18) !important;
          }
          /* Prototype loops carousel tabs — sticky on scroll so the user
             can see which loop they're reading even after the panel scrolls
             past the original tab position. */
          .sp2-loops-nav {
            position: sticky !important;
            top: 124px !important;
            z-index: 5 !important;
            background: #FFFFFF !important;
          }

          /* Mobile hero — drop the two most-internal Tag pills (3rd + 4th)
             and hide the redundant caption to reduce scroll-before-content. */
          .sp2-hero-tags > *:nth-child(3),
          .sp2-hero-tags > *:nth-child(4) { display: none !important; }
          .sp2-hero-caption                { display: none !important; }

          /* Mobile sticky chip nav — tighter gap + reduced letter-spacing so
             "01 PIN · 02 REMOVE · 03 PAUSE" doesn't wrap or crowd. */
          .sp2-control-nav    { padding: 8px 0 !important; }
          .sp2-control-nav ul { gap: 14px !important; }
          .sp2-control-nav a  { font-size: 11px !important; letter-spacing: 0.04em !important; padding: 2px 0 !important; }
          .sp2-control-nav a span:first-child { display: none !important; }
        }
      `}</style>
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
    <section style={{ padding: `0 ${SECTION_X} 120px` }}>
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
            </h2>
            <CategoryPill>Decisions</CategoryPill>
          </div>
          <div>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
            }}>
              Five interaction directions sketched on paper before any Figma frame. The winning direction survived three tests: does it preserve discovery, is it reversible, does it sit native to the shelf. Mid-fi mocked the answer on both surfaces (mobile + desktop) before any hi-fi work.
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
            Five directions on paper.
          </h3>
          <Image
            src="/images/work/spotify/v2/figma-sketches.png"
            alt="Sketching possible interaction patterns — five rough directions explored on paper before any Figma frame."
            width={1920} height={1080}
            sizes="(max-width: 1240px) 100vw, 1100px"
            style={{ width: "100%", height: "auto", display: "block", border: `1px solid ${c.border}` }}
          />
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
      surface: "Desktop",
      // Desktop frames are ~1554x1260 (one is 1554x1082). Lock to 1554/1260
      // and cover-crop so every cell in the grid has identical height.
      aspectRatio: "1554 / 1260",
      frames: [
        { src: "/images/work/spotify/v2/wf-pin-01.png", label: "Long-press a tile -> Action sheet opens -> Pin artist." },
        { src: "/images/work/spotify/v2/wf-pin-02.png", label: "Pinned row appears -> toast \"Pinned. Undo.\"" },
        { src: "/images/work/spotify/v2/wf-pin-03.png", label: "Pin reorders to the first slot." },
        { src: "/images/work/spotify/v2/wf-pin-04.png", label: "Unpin from menu -> toast." },
        { src: "/images/work/spotify/v2/wf-pin-05.png", label: "Pin a fifth item -> limit modal." },
        { src: "/images/work/spotify/v2/wf-pin-06.png", label: "Choose a replacement -> swap -> toast." },
      ],
      dossier: [
        { lead: "Problem and state coverage.",
          body: "Recently Played reorders by recency. A song the user wants to keep within reach disappears as new plays push it down. The shelf needs a way to lock a favorite in place. The new Pin state machine covers seven moments\u2014default, hover, press, pinned, disabled (cap reached), loading, error\u2014each with two independent signals so the affordance never reads as ambiguous." },
        { lead: "Feedback and the cap.",
          body: "Move first, confirm second. The tile animates to position one in 250 ms; the Pinned. Undo snackbar follows for five seconds; a persistent Pin chip stays on the tile after the snackbar dismisses. The cap is four pins, with a disabled fifth row rather than a soft limit and a warning toast. Engineering surfaced shelf-performance and ranking-signal degradation past four; four is also the cognitive ceiling for what a user can re-find by sight. Drag-to-reorder among pins, deliberately cut." },
        { lead: "Persona impact.",
          body: "Ranger Dave on his commute is the primary beneficiary. Pin keeps his focus playlist within one tap regardless of what he plays after. Parent is neutral\u2014Pin on a shared device is rarely worth doing. Explorer is neutral to negative; heavy browsing means the shelf turns over quickly and four pins barely scratch the volume." },
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
      frames: [
        { src: "/images/work/spotify/v2/wf-remove-01.png", label: "Long-press tile -> Action sheet opens." },
        { src: "/images/work/spotify/v2/wf-remove-02.png", label: "Tap Remove from Recently Played." },
        { src: "/images/work/spotify/v2/wf-remove-03.png", label: "Item disappears -> toast \"Removed. Undo.\"" },
        { src: "/images/work/spotify/v2/wf-remove-04.png", label: "Tap Undo on the toast." },
        { src: "/images/work/spotify/v2/wf-remove-05.png", label: "Item reappears in last spot -> \"Restored.\"" },
      ],
      dossier: [
        { lead: "Problem and state coverage.",
          body: "An accidental tap, a short preview, a one-off experiment lingers on the shelf and misrepresents what the user cares about. They need a way to clean it up before someone sees. The Remove state machine handles default, hover, press, the successful remove, the active toast, sync conflicts, and the restored state after Undo. Single-item rows and multi-item rows handled distinctly." },
        { lead: "Feedback and scope.",
          body: "Slide first, undo second. The tile slides out in 220 ms; the Removed. Undo snackbar runs for five seconds; on undo, the item returns to its last position rather than the front. Scope is per-device, not per-account. Privacy lives at the device boundary. The cost is friction for multi-device users; the benefit is that the shelf can\u2019t betray a user\u2019s intent on Device A by changing on Device B." },
        { lead: "Persona impact.",
          body: "Melodic Melanie, the primary beneficiary, can clear contextual plays before she shares her screen. Ranger Dave is positive on the shared-device case. Explorer is neutral\u2014the shelf already turns over fast for them." },
      ],
    },
    {
      key:   "pause",
      title: "Pause",
      tagline: "Time-boxed. 30 minutes, 2 hours, until tomorrow. Resume is automatic.",
      surface: "Desktop",
      aspectRatio: "1554 / 1260",
      frames: [
        { src: "/images/work/spotify/v2/wf-pause-01.png", label: "Long-press shelf header -> Action sheet opens." },
        { src: "/images/work/spotify/v2/wf-pause-02.png", label: "Tap Pause Listening History." },
        { src: "/images/work/spotify/v2/wf-pause-03.png", label: "Pick a duration: 30 min, 2 hrs, until tomorrow." },
        { src: "/images/work/spotify/v2/wf-pause-04.png", label: "Shelf shows paused state with visible timer." },
        { src: "/images/work/spotify/v2/wf-pause-05.png", label: "Pause expires -> toast \"Listening history resumed.\"" },
      ],
      dossier: [
        { lead: "Problem and state coverage.",
          body: "A borrowed phone, a long drive with a guest, an overnight kid takeover. The user has no way to stop the shelf from logging without leaving the app or signing out. The Pause state machine surfaces the timer in every state\u2014default, hover, press, paused, expiring, resumed, clock-skew error\u2014because the timer is the design\u2019s promise." },
        { lead: "Feedback and the time-box.",
          body: "Three presets, no slider. The duration picker offers 30 minutes, 2 hours, or until tomorrow. The shelf shows the paused state with a countdown; a snackbar confirms when listening history resumes. The control is time-boxed only, not a permanent toggle. Permanent pause was ruled out because the ML signal would degrade. The cost: a user who really wants to opt out has to re-pause periodically, or use Settings \u00B7 Privacy." },
        { lead: "Persona impact.",
          body: "Parent is the primary beneficiary: Pause protects recommendations during somebody else\u2019s listening session. Melodic Melanie is positive on the social case. Ranger Dave is positive on shared devices when his son\u2019s music threatens to take over the shelf." },
      ],
    },
  ];

  return (
    <section style={{ padding: `0 ${SECTION_X} 120px` }}>
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
            </h2>
            <CategoryPill>Details</CategoryPill>
          </div>
          <div>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
            }}>
              Each control gets the same editorial treatment: title, the annotated wireframe broken into individual frames so each step reads, then three paragraphs naming the problem, the trade-off, and who wins. The looping prototypes live in their own tabbed section below.
            </p>
          </div>
        </div>

        {/* Sticky chapter nav — appears as the reader enters the
            three-controls section and stays pinned through Pin / Remove /
            Pause so the recall load (NN/g H6) of "which control am I
            reading?" is always one glance away. Active state via
            IntersectionObserver below. */}
        <nav
          aria-label="Three controls"
          className="sp2-control-nav"
          style={{
            position:   "sticky",
            top:        "72px",
            zIndex:     10,
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderTop:    `1px solid ${c.border}`,
            borderBottom: `1px solid ${c.border}`,
            margin:     "0 0 40px",
            padding:    "14px 0",
          }}
        >
          <ul style={{
            display: "flex", gap: "clamp(16px, 3vw, 32px)", justifyContent: "center",
            margin: 0, padding: 0, listStyle: "none",
          }}>
            {flows.map((f, i) => (
              <li key={f.key}>
                <a
                  href={`#control-${f.key.toLowerCase()}`}
                  data-control-anchor={f.key.toLowerCase()}
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
                  {f.key}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {flows.map((f, i) => (
          <article
            key={f.key}
            id={`control-${f.key.toLowerCase()}`}
            style={{
              marginTop:      i === 0 ? 0 : "120px",
              paddingTop:     i === 0 ? 0 : "80px",
              borderTop:      i === 0 ? "none" : `1px solid ${c.border}`,
              scrollMarginTop: "152px",
            }}
          >
            <header style={{ marginBottom: "40px" }}>
              <p style={{
                fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.20em", color: c.green,
                textTransform: "uppercase", margin: "0 0 14px",
              }}>{f.key.toUpperCase()} &middot; {f.surface}</p>
              <h3 style={{
                fontFamily: font.sans, fontSize: "clamp(40px, 11vw, 112px)",
                fontWeight: 700, color: c.ink, margin: "0 0 16px",
                letterSpacing: "-0.04em", lineHeight: 0.9,
              }}>{f.title}.</h3>
              <p style={{
                fontFamily: font.sans, fontSize: "clamp(18px, 2vw, 24px)",
                fontWeight: 500, color: c.ink2, margin: 0, lineHeight: 1.35,
                letterSpacing: "-0.012em", maxWidth: "780px",
              }}>{f.tagline}</p>
            </header>

            {/* Wireframe frames — wrapped in a #6E6E6E mat (same as the
                ActionSheetHero) so the flow reads as one curated panel
                instead of frames floating against the page. Each screen
                has rounded corners to feel device-native. */}
            <div style={{
              background: "#6E6E6E",
              padding: "clamp(20px, 3vw, 40px)",
              marginBottom: "56px",
            }}>
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                gap: "clamp(16px, 2vw, 24px)",
              }} className="sp2-dl-frames">
                {f.frames.map((frame, idx) => (
                  <figure key={frame.src} style={{ margin: 0 }}>
                    <div style={{
                      aspectRatio: f.aspectRatio,
                      overflow: "hidden",
                      /* Mobile: rounded background matches the section
                         mat (#6E6E6E) so the frame visually merges with
                         the gray, no black "ground" between phone + mat.
                         Desktop: thin black behind the screen capture so
                         the white UI elements pop. */
                      background: f.surface === "Mobile" ? "#6E6E6E" : "#000000",
                      borderRadius: f.surface === "Mobile"
                        ? "clamp(14px, 1.6vw, 22px)"
                        : "clamp(2px, 0.3vw, 4px)",
                    }}>
                      <Image
                        src={frame.src}
                        alt={`Step ${idx + 1} - ${frame.label}`}
                        width={1554} height={1260}
                        sizes="(max-width: 760px) 100vw, 380px"
                        loading={idx < 2 ? "eager" : "lazy"}
                        style={{
                          width: "100%", height: "100%",
                          objectFit: "contain", objectPosition: "center",
                          display: "block",
                        }}
                      />
                    </div>
                    <figcaption style={{
                      fontFamily: font.sans, fontSize: "12px",
                      margin: "12px 0 0", display: "flex", gap: "10px", alignItems: "baseline",
                      lineHeight: 1.5,
                    }}>
                      <span style={{ fontWeight: 700, letterSpacing: "0.14em", color: c.green, flexShrink: 0 }}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span style={{ color: "#FAFAF9", letterSpacing: "-0.005em" }}>{frame.label}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

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
          const anchors = document.querySelectorAll('a[data-control-anchor]');
          if (!anchors.length) return;
          const map = {};
          anchors.forEach(a => { map[a.getAttribute('data-control-anchor')] = a; });
          const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
              const key = e.target.id.replace('control-', '');
              const anchor = map[key];
              if (!anchor) return;
              if (e.isIntersecting) {
                anchors.forEach(a => a.removeAttribute('data-active'));
                anchor.setAttribute('data-active', 'true');
              }
            });
          }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
          ['pin', 'remove', 'pause'].forEach(k => {
            const el = document.getElementById('control-' + k);
            if (el) obs.observe(el);
          });
        })();
      ` }} />
      <style>{`
        .sp2-control-nav a[data-active] {
          color: #1ED760 !important;
          border-bottom-color: #1ED760 !important;
        }
        .sp2-control-nav a:hover {
          color: #252B28;
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
      body:  "Tile slides out in 220 ms. The Removed. Undo snackbar runs the five-second window. Tap Undo and the item returns to its last position\u2014not the front. The shelf forgives mistakes; it doesn\u2019t reward them.",
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
    <section style={{
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
            </h2>
            <CategoryPill>Details</CategoryPill>
          </div>
          <div>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
            }}>
              Three short prototypes built in Principle and exported as looping web video. Each one shows the design&rsquo;s tightest signal: the timing, the confirmation, the reverse. If the interaction reads in three seconds with no caption, the design works.
            </p>
          </div>
        </div>

        <p style={{
          fontFamily: font.sans, fontSize: "11px", fontWeight: 600,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: c.muted, margin: "0 0 16px",
        }}>
          <span style={{ color: c.green }}>&rarr; </span>
          Tap 01 &middot; 02 &middot; 03 to switch the loop
        </p>

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
                  display: "flex", alignItems: "baseline", gap: "10px",
                  borderRight: i < loops.length - 1 ? `1px solid ${c.border}` : "none",
                  transition: "background 0.2s, color 0.2s",
                }}>
                <span style={{
                  fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
                  color: c.green, letterSpacing: "0.18em",
                }}>{String(i + 1).padStart(2, "0")}</span>
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
                        aria-label={l.eyebrow}
                        style={{
                          width: "100%", height: "100%",
                          objectFit: "cover", objectPosition: "center",
                          display: "block",
                        }}
                      />
                    </div>
                  </figure>
                  {/* Body copy on the right */}
                  <div>
                    <p style={{
                      fontFamily: font.sans, fontSize: "11px", fontWeight: 700,
                      letterSpacing: "0.20em", color: c.green,
                      textTransform: "uppercase", margin: "0 0 16px",
                    }}>{l.eyebrow}</p>
                    <h3 style={{
                      fontFamily: font.sans, fontSize: "clamp(40px, 5vw, 64px)",
                      fontWeight: 700, color: c.ink, margin: "0 0 24px",
                      letterSpacing: "-0.03em", lineHeight: 1.0,
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
    <section id="shipped" style={{
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
              fontFamily: font.sans, fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 600, color: c.ink, margin: 0,
              letterSpacing: "-0.025em", lineHeight: 1.05,
            }}>
              Shipped, with receipts.
            </h2>
            <CategoryPill>Details</CategoryPill>
          </div>
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
          <div className="sp2-state-scroll" style={{
            background: "#FFFFFF", border: `1px solid ${c.border}`,
            padding: "clamp(12px, 3vw, 48px)",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}>
            <Image
              src="/images/work/spotify/spotify-shelf-state-diagram.svg"
              alt="Pause state diagram — four states (idle, paused, expiring, resumed) with every transition reversible."
              width={1920} height={900}
              sizes="(max-width: 1240px) 100vw, 1100px"
              className="sp2-state-img"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          <p className="sp2-state-hint" style={{
            display: "none",
            fontFamily: font.sans, fontSize: "11px", fontWeight: 600,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: c.muted, margin: "10px 0 0",
          }}>
            <span style={{ color: c.green }}>&rarr; </span>
            Swipe to see the full diagram
          </p>
        </div>

        {/* Out of scope — what got named, defended, and skipped */}
        <OutOfScope />

        {/* Honest scope + risks side by side */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px",
        }} className="sp2-decisions-grid">
          <aside style={{
            background: "#FFFFFF", border: `1px solid ${c.border}`,
            borderLeft: `4px solid ${c.brand}`, padding: "28px 32px",
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
            borderLeft: `4px solid ${c.brand}`, padding: "28px 32px",
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
          borderLeft: `4px solid ${c.brand}`, padding: "28px 32px",
          marginTop: "32px",
        }}>
          <p style={{
            fontFamily: font.sans, fontSize: "10px", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: c.green, margin: "0 0 14px",
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
    <section style={{ padding: `0 ${SECTION_X} 80px` }}>
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
        </h2>
        <CategoryPill>Premise</CategoryPill>
        <p style={{
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
                borderRadius: "50%", background: c.brand,
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
    <section style={{ padding: `clamp(48px, 6vw, 80px) ${SECTION_X} 0` }}>
      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
        <div className="sp2-as-hero" style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 380px) minmax(0, 1fr)",
          gap: "clamp(32px, 5vw, 72px)",
          alignItems: "center",
          /* Brighter neutral so the black phone screens pop forward like
             product photography. No drop shadow on the phone — the
             contrast against the lighter mat does the lift on its own. */
          background: "#6E6E6E",
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
            </h2>
            <CategoryPill>Premise</CategoryPill>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(15px, 1.5vw, 17px)",
              lineHeight: 1.7, color: "rgba(250, 250, 249, 0.82)",
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
    <section style={{ padding: `0 ${SECTION_X} 120px` }}>
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
            </h2>
            <CategoryPill>Research</CategoryPill>
          </div>
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
              borderTop: `3px solid ${c.green}`,
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
    if (v === "✓") return proposed ? c.green : c.greenDark;
    if (v === "—") return c.muted;
    return c.ink2;
  };
  return (
    <section style={{ padding: `0 ${SECTION_X} 120px` }}>
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
            </h2>
            <CategoryPill>Research</CategoryPill>
          </div>
          <div>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
            }}>
              Heuristic audit across seven listening platforms. Apple Music, Amazon Music, and YouTube Music all ship at least one shelf-level control. TikTok and YouTube treat the feed as inline-editable by default. Spotify ships none. The pattern is in the open.
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

        <p className="sp2-scroll-hint-audit" style={{
          display: "none",
          fontFamily: font.sans, fontSize: "11px", fontWeight: 600,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: c.muted, margin: "0 0 12px",
        }}>
          <span style={{ color: c.green }}>&rarr; </span>
          Swipe to scroll the full audit
        </p>

        <div className="sp2-audit-scroll" style={{
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
                  background: r.proposed
                    ? "rgba(30,215,96,0.10)"
                    : r.current
                    ? "#FFF4F4"
                    : "#FFFFFF",
                }}>
                  <td style={{
                    ...tdBase,
                    fontWeight: r.proposed || r.current ? 700 : 500,
                    color: r.proposed ? c.greenDark : r.current ? c.brand : c.ink,
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
    <section style={{ padding: `0 ${SECTION_X} 120px` }}>
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
            </h2>
            <CategoryPill>Decisions</CategoryPill>
          </div>
          <div>
            <p style={{
              fontFamily: font.sans, fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.75, color: c.ink2, margin: 0, maxWidth: PROSE_MAX,
            }}>
              One-frame journey across the Recently Played shelf. Peaks and valleys mapped against the three opportunity points where Pin, Remove, and Pause each earn their slot.
            </p>
          </div>
        </div>
        {/* Scroll hint shows on mobile only — desktop sees the full
            journey at once. */}
        <p className="sp2-scroll-hint-journey" style={{
          display: "none",
          fontFamily: font.sans, fontSize: "11px", fontWeight: 600,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: c.muted, margin: "0 0 12px",
        }}>
          <span style={{ color: c.green }}>&rarr; </span>
          Swipe to read the full journey map
        </p>

        {/* Journey map — light card on mobile (was a dark mat that made
            the map hard to read at small widths). Horizontal scroll on
            phones lets the map keep its native legibility. */}
        <div className="sp2-journey-scroll" style={{
          background: "#FFFFFF", border: `1px solid ${c.border}`,
          padding: "clamp(12px, 3vw, 40px)",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}>
          <Image
            src="/images/work/spotify/v2/figma-user-journey.png"
            alt="User journey map — Recently Played shelf with the three opportunity points called out."
            width={1920} height={1080}
            sizes="(max-width: 1240px) 100vw, 1240px"
            className="sp2-journey-img"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>
    </section>
  );
}
