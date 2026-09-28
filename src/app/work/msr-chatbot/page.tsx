import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RelatedCaseStudies from "@/components/RelatedCaseStudies";
import ScrollProgress from "@/components/ScrollProgress";
import StickyArcNavInit from "@/components/StickyArcNavInit";
import { CaseStudySchema } from "@/components/structured-data/CaseStudySchema";
import { BreadcrumbSchema } from "@/components/structured-data/BreadcrumbSchema";

/* ---------------------------------------------------------------------------
   /work/msr-chatbot

   Alfred, a retrieval-grounded foot-health assistant on
   menssolerevival.com/ask. Four working days, Sep 19 to 22, 2026, solo
   with Claude Code. Same Pentagram template as AIGA / MSR / Wayfarer /
   Spotify: Premise / How it works / Decisions / Details, with the
   Callout(Decision / Why / Cost) as the signature element.

   Voice: matches shipped copy conventions. No em-dashes, no semicolons,
   short declarative sentences.
--------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: { absolute: "Alfred, a foot-health assistant · Alfonso Barreiro" },
  description:
    "Case study: designed and built Alfred, a retrieval-grounded assistant on menssolerevival.com that only answers from the site's own guides. Claude Haiku 4.5, red-flag triage, cited sources.",
  alternates: { canonical: "https://www.barreiro.com/work/msr-chatbot" },
  openGraph: {
    type: "article",
    url: "https://www.barreiro.com/work/msr-chatbot",
    title: "Alfred, a foot-health assistant",
    description:
      "A retrieval-grounded assistant on menssolerevival.com that only answers from the site's own guides. Four working days. Solo, with Claude Code.",
    images: ["/images/work/msr-chatbot/hero-empty.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alfred, a foot-health assistant",
    description:
      "A retrieval-grounded assistant on menssolerevival.com that only answers from the site's own guides. Four working days. Solo, with Claude Code.",
    images: ["/images/work/msr-chatbot/hero-empty.png"],
  },
};

const c = {
  surface:       "var(--color-paper)",
  ink:           "var(--color-text)",
  ink2:          "var(--color-neutral-700)",
  muted:         "var(--color-neutral-600)",
  brand:         "var(--color-brand)",
  accent:        "var(--color-accent)",
  accent2:       "var(--color-accent-hover)",
  border:        "var(--color-neutral-400)",
  borderStrong:  "var(--color-neutral-500)",
  callout:       "var(--color-neutral-50)",
};

const font = { sans: "var(--font-dm-sans), -apple-system, sans-serif" };

const SECTION_X = "clamp(32px, 6vw, 80px)";
const CONTENT_MAX = "var(--content-max)";
const PROSE_MAX   = "680px";

const LIVE_URL = "https://www.menssolerevival.com/ask";

/* ---------- small atoms ---------- */

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily:    font.sans,
      fontSize:      "var(--text-small)",
      fontWeight:    500,
      letterSpacing: "0.01em",
      textTransform: "none",
      color:         c.ink2,
      padding:       "6px 14px",
      border:        `1px solid ${c.borderStrong}`,
    }}>
      {children}
    </span>
  );
}

function Callout({
  decision, why, cost,
}: { decision: string; why: string; cost: string }) {
  const labelStyle: React.CSSProperties = {
    fontFamily:    font.sans,
    fontSize:      "var(--text-small)",
    fontWeight:    500,
    letterSpacing: "0.01em",
    textTransform: "none",
    color:         c.accent,
    margin:        "0 0 10px",
  };
  const bodyStyle: React.CSSProperties = {
    fontFamily: font.sans,
    fontSize:   "var(--text-body)",
    lineHeight: 1.6,
    color:      c.ink2,
    margin:     0,
  };
  return (
    <aside className="msrbot-callout" style={{
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
        fontSize:      "clamp(20px,2.2vw,28px)",
        fontWeight:    500,
        color:         c.ink,
        margin:        "0 0 28px",
        letterSpacing: "-0.01em",
        lineHeight:    1.15,
      }}>
        {decision}
      </p>
      <div className="msrbot-callout-grid" style={{
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
        width:        "100%",
        maxWidth:     CONTENT_MAX,
        margin:       "0 auto",
        aspectRatio:  cropAspect,
        position:     "relative",
        overflow:     "hidden",
        background:   c.ink,
        border:       `1px solid ${c.border}`,
        borderRadius: "10px",
      }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1240px) 100vw, 1240px"
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      </div>
    );
  }
  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
      <Image
        src={src}
        alt={alt}
        width={2880}
        height={1800}
        priority={priority}
        sizes="(max-width: 1240px) 100vw, 1240px"
        style={{
          width:        "100%",
          height:       "auto",
          display:      "block",
          border:       `1px solid ${c.border}`,
          borderRadius: "10px",
        }}
      />
    </div>
  );
}

function MetaCell({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p style={{
        fontFamily:    font.sans,
        fontSize:      "var(--text-small)",
        fontWeight:    500,
        letterSpacing: "0.01em",
        textTransform: "none",
        color:         c.accent,
        margin:        "0 0 8px",
      }}>{label}</p>
      <p style={{
        fontFamily: font.sans,
        fontSize:   "var(--text-body)",
        lineHeight: 1.5,
        color:      c.ink,
        margin:     0,
      }}>{value}</p>
    </div>
  );
}

/* ---------- Pipeline diagram (SVG) ----------
   The 5-step path a message walks, cheapest and safest step first.
   Boxes at the top, branch outcomes at the bottom, cost labels
   next to every edge. Renders as inline SVG so the diagram
   respects the page's type + color tokens. */
function PipelineDiagram() {
  const stroke   = "#252B28";      // ink
  const softLine = "#B8B4AC";      // neutral-400 hairline
  const boxFill  = "#FFFFFF";
  const branchInk = "#3D4440";     // ink2
  const brand    = "#CF5B48";      // terracotta
  const teal     = "#0F3D3E";      // deep teal
  const label    = "#6E6E6A";      // muted

  const label12: React.CSSProperties = { font: `500 12px ${font.sans}`, fill: label, letterSpacing: "0.02em" };
  const label13: React.CSSProperties = { font: `500 13px ${font.sans}`, fill: branchInk };
  const boxNum:  React.CSSProperties = { font: `500 13px ${font.sans}`, fill: brand };
  const boxTitle: React.CSSProperties = { font: `500 17px ${font.sans}`, fill: stroke };
  const outcomeTitle: React.CSSProperties = { font: `500 15px ${font.sans}`, fill: stroke };

  return (
    <div style={{
      maxWidth:  CONTENT_MAX,
      margin:    "0 auto",
      background: "#FFFFFF",
      border:    `1px solid ${c.border}`,
      padding:   "clamp(24px, 3vw, 40px)",
      overflowX: "auto",
    }}>
      <svg
        viewBox="0 0 1120 560"
        role="img"
        aria-label="Pipeline diagram: red-flag check, embedding, similarity comparison, then one of three outcomes: outside scope, not sure, or confident answer."
        style={{ display: "block", width: "100%", height: "auto", minWidth: "760px" }}
      >
        {/* subtle guides */}
        <defs>
          <marker id="arrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="10" markerHeight="10" orient="auto-start-reverse">
            <path d="M0 0 L12 6 L0 12 z" fill={stroke} />
          </marker>
          <marker id="arrow-soft" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
            <path d="M0 0 L12 6 L0 12 z" fill={softLine} />
          </marker>
        </defs>

        {/* Row 1 — Message pill */}
        <g>
          <rect x="490" y="20" width="140" height="36" fill="none" stroke={softLine} strokeWidth="1" />
          <text x="560" y="43" textAnchor="middle" style={label13}>A message arrives</text>
        </g>
        <line x1="560" y1="56" x2="560" y2="96" stroke={stroke} strokeWidth="1.25" markerEnd="url(#arrow)" />

        {/* Row 2 — Step 1: Red-flag check */}
        <g>
          <rect x="380" y="100" width="360" height="80" fill={boxFill} stroke={stroke} strokeWidth="1.25" />
          <text x="400" y="128" style={boxNum}>Step 1</text>
          <text x="400" y="152" style={boxTitle}>Red-flag check, in the browser</text>
          <text x="400" y="170" style={label12}>free · never leaves the device</text>
        </g>
        {/* red-flag side branch — right */}
        <path d={`M740 140 L850 140 L850 100 L1080 100`} fill="none" stroke={stroke} strokeWidth="1.25" markerEnd="url(#arrow)" />
        <text x="856" y="132" style={{...label12, fill: brand}}>match</text>
        <g>
          <rect x="880" y="60" width="200" height="70" fill={teal} stroke={teal} strokeWidth="1" />
          <text x="980" y="88" textAnchor="middle" style={{...outcomeTitle, fill: "#FAFAF9"}}>Doctor screen</text>
          <text x="980" y="108" textAnchor="middle" style={{...label12, fill: "#EFE6E4"}}>free · stop the conversation</text>
        </g>
        {/* no-match down */}
        <line x1="560" y1="180" x2="560" y2="220" stroke={stroke} strokeWidth="1.25" markerEnd="url(#arrow)" />
        <text x="574" y="204" style={label12}>no match</text>

        {/* Row 3 — Step 2: Embed */}
        <g>
          <rect x="380" y="224" width="360" height="80" fill={boxFill} stroke={stroke} strokeWidth="1.25" />
          <text x="400" y="252" style={boxNum}>Step 2</text>
          <text x="400" y="276" style={boxTitle}>Turn the message into 512 numbers</text>
          <text x="400" y="294" style={label12}>Vercel AI Gateway · $0.000007</text>
        </g>
        <line x1="560" y1="304" x2="560" y2="340" stroke={stroke} strokeWidth="1.25" markerEnd="url(#arrow)" />

        {/* Row 4 — Step 3: Compare to guides */}
        <g>
          <rect x="380" y="344" width="360" height="80" fill={boxFill} stroke={stroke} strokeWidth="1.25" />
          <text x="400" y="372" style={boxNum}>Step 3</text>
          <text x="400" y="396" style={boxTitle}>Compare with the guides</text>
          <text x="400" y="414" style={label12}>228 passages · free · in-memory cosine</text>
        </g>

        {/* Row 5 — Branch to three outcomes */}
        <path d={`M560 424 L560 460 L160 460 L160 490`} fill="none" stroke={stroke} strokeWidth="1.25" markerEnd="url(#arrow)" />
        <path d={`M560 424 L560 460 L560 490`}                fill="none" stroke={stroke} strokeWidth="1.25" markerEnd="url(#arrow)" />
        <path d={`M560 424 L560 460 L960 460 L960 490`} fill="none" stroke={stroke} strokeWidth="1.25" markerEnd="url(#arrow)" />

        {/* outcome A — Outside */}
        <g>
          <rect x="40" y="490" width="240" height="60" fill={boxFill} stroke={stroke} strokeWidth="1" />
          <text x="160" y="516" textAnchor="middle" style={outcomeTitle}>Outside what I cover</text>
          <text x="160" y="536" textAnchor="middle" style={label12}>score {'<'} 0.40 · free</text>
        </g>
        {/* outcome B — Not sure */}
        <g>
          <rect x="440" y="490" width="240" height="60" fill={boxFill} stroke={brand} strokeWidth="1" />
          <text x="560" y="516" textAnchor="middle" style={outcomeTitle}>Answer with &ldquo;not sure&rdquo;</text>
          <text x="560" y="536" textAnchor="middle" style={label12}>0.40 to 0.53 · ~$0.005</text>
        </g>
        {/* outcome C — Confident */}
        <g>
          <rect x="840" y="490" width="240" height="60" fill={boxFill} stroke={teal} strokeWidth="1.25" />
          <text x="960" y="516" textAnchor="middle" style={outcomeTitle}>Confident answer + source</text>
          <text x="960" y="536" textAnchor="middle" style={label12}>score ≥ 0.53 · ~$0.005</text>
        </g>
      </svg>
      <p style={{
        fontFamily: font.sans,
        fontSize:   "var(--text-small)",
        color:      c.muted,
        margin:     "16px 0 0",
        lineHeight: 1.5,
      }}>
        Two thresholds do the work. Below 0.40, decline. At or above 0.53, answer with confidence. In between, answer from the nearest guide with a &ldquo;not sure&rdquo; label and a question to bring to a clinician.
      </p>
    </div>
  );
}

/* ---------- States gallery — four screenshots, side by side on desktop ---------- */
function StatesGallery() {
  const items = [
    {
      src:   "/images/work/msr-chatbot/hero-empty.png",
      alt:   "The empty state on Ask. Alfred introduces himself, four starter chips below the composer, one disclaimer under the input.",
      label: "Empty state",
      note:  "Alfred speaks first. Four starter chips. The disclaimer under the input reads &ldquo;Alfred isn&rsquo;t a doctor.&rdquo;",
    },
    {
      src:   "/images/work/msr-chatbot/answer.png",
      alt:   "A confident answer state. Alfred describes plantar fasciitis in plain words and links the guide it used.",
      label: "Confident answer",
      note:  "One reaction clause, then the answer, then why, then the one thing that changes it. The cited guide sits under the reply.",
    },
    {
      src:   "/images/work/msr-chatbot/red-flag.png",
      alt:   "The red-flag escalation state. The composer is locked and a doctor referral fills the answer area.",
      label: "Red-flag escalation",
      note:  "A pattern matched in the browser. The composer locks for the session. Focus moves to the referral heading.",
    },
    {
      src:   "/images/work/msr-chatbot/outside-scope.png",
      alt:   "The outside-scope state. Alfred says the question is not in the guides and points at the guides index.",
      label: "Outside what I cover",
      note:  "Similarity below 0.40. The model was never called. The reply names what the site does cover.",
    },
  ];

  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto", padding: `0 ${SECTION_X}` }}>
      <div className="msrbot-states-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "clamp(24px, 3vw, 40px)",
      }}>
        {items.map((it) => (
          <figure key={it.label} style={{ margin: 0 }}>
            <div style={{
              position:     "relative",
              width:        "100%",
              aspectRatio:  "16 / 10",
              border:       `1px solid ${c.border}`,
              borderRadius: "10px",
              background:   "#FFFFFF",
              overflow:     "hidden",
            }}>
              <Image
                src={it.src}
                alt={it.alt}
                fill
                sizes="(max-width: 900px) 100vw, 620px"
                style={{ objectFit: "cover", objectPosition: "top center" }}
              />
            </div>
            <figcaption style={{ marginTop: "16px" }}>
              <p style={{
                fontFamily:    font.sans,
                fontSize:      "var(--text-small)",
                fontWeight:    500,
                letterSpacing: "0.01em",
                color:         c.accent,
                margin:        "0 0 6px",
              }}>{it.label}</p>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "var(--text-body)",
                lineHeight: 1.55,
                color:      c.ink2,
                margin:     0,
              }} dangerouslySetInnerHTML={{ __html: it.note }} />
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/* ---------- What failed list ---------- */
function WhatFailed() {
  const items: Array<{ what: string; fix: string }> = [
    {
      what: "The first live answer said &ldquo;almost certainly plantar fasciitis&rdquo; and &ldquo;you&rsquo;ve got the right diagnosis.&rdquo;",
      fix:  "The no-diagnosis rule now bans those phrasings by name and requires attributing the pattern to the guides.",
    },
    {
      what: "An em dash got through the prompt rule on the first live test.",
      fix:  "The server now strips them from the stream, including one split across two chunks.",
    },
    {
      what: "Answers ran 200 to 230 words against a 150-word cap.",
      fix:  "The cap is a target the model overruns by about a third. The short question getting a short answer mattered more than the number.",
    },
    {
      what: "I spent an hour on a browser label that said the request was aborted.",
      fix:  "It wasn&rsquo;t. DevTools marks any stream read through a reader that way. The server was fine the whole time.",
    },
    {
      what: "I believed, for about a day, that adding guides would reduce model calls.",
      fix:  "It doesn&rsquo;t. Every real answer is written by the model. More guides move questions from &ldquo;not sure&rdquo; to a confident answer. Cost per answered question stays the same.",
    },
    {
      what: "The bot-detection challenge failed silently on the live site.",
      fix:  "Every message came back with &ldquo;the assistant hit a snag&rdquo; on production, and nothing on localhost. Vercel&rsquo;s BotID script was 404&rsquo;ing because next.config never got the withBotId wrapper. Half a day chasing a localhost hypothesis before the launch audit caught the missing wrapper. Fixed in PR #23, verified on a preview.",
    },
    {
      what: "The safety triage was calibrated in two wrong directions before it landed.",
      fix:  "First audit (Sep 25): eight of ten emergency messages got no warning, including &ldquo;my foot is suddenly cold, pale and numb.&rdquo; Tightened the rules. Copy review (Sep 28) then caught the opposite failure: everyday questions were tripping warnings. &ldquo;Can&rsquo;t stand for long at work&rdquo; got &ldquo;see a doctor today&rdquo; instead of the standing-all-day guide. Split &ldquo;Call 911&rdquo; out from &ldquo;doctor today&rdquo; because the old copy read &ldquo;that doesn&rsquo;t mean it&rsquo;s serious&rdquo; right above &ldquo;call 911 now.&rdquo;",
    },
    {
      what: "Axe found zero accessibility violations on the panel. The code review found one blocker and five serious problems.",
      fix:  "The nav button was mounted twice, so the ⌘I shortcut opened two stacked drawers. The focus trap leaked on phones. The 10-question limit was silent to screen readers. Fixed in PR #24 and PR #25, verified at 375px and 320px with real keystrokes. Zero axe violations again, but now the ones a scanner cannot see are gone too.",
    },
  ];
  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto", padding: `0 ${SECTION_X}` }}>
      <ol style={{
        listStyle:            "none",
        margin:               0,
        padding:              0,
        display:              "grid",
        gridTemplateColumns:  "1fr",
        gap:                  "0",
      }}>
        {items.map((it, i) => (
          <li key={i} style={{
            padding:     "28px 0",
            borderBottom: i === items.length - 1 ? "none" : `1px solid ${c.border}`,
            display:     "grid",
            gridTemplateColumns: "56px 1fr",
            gap:         "clamp(20px, 3vw, 40px)",
            alignItems:  "baseline",
          }} className="msrbot-failed-row">
            <span aria-hidden="true" style={{
              fontFamily:    font.sans,
              fontSize:      "var(--text-small)",
              fontWeight:    500,
              letterSpacing: "0.01em",
              color:         c.accent,
            }}>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p style={{
                fontFamily:    font.sans,
                fontSize:      "clamp(18px, 2vw, 22px)",
                fontWeight:    500,
                color:         c.ink,
                margin:        "0 0 10px",
                letterSpacing: "-0.01em",
                lineHeight:    1.3,
              }} dangerouslySetInnerHTML={{ __html: it.what }} />
              <p style={{
                fontFamily: font.sans,
                fontSize:   "var(--text-body)",
                lineHeight: 1.6,
                color:      c.ink2,
                margin:     0,
                maxWidth:   PROSE_MAX,
              }} dangerouslySetInnerHTML={{ __html: it.fix }} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- Results — five proxy tiles ---------- */
function ResultsTiles() {
  const tiles = [
    { stat: "0.54 – 0.70", label: "Covered questions score band",   detail: "40-question calibration set. No overlap with the two other groups." },
    { stat: "0.44 – 0.58", label: "Foot-related but uncovered",     detail: "Gout, warts, sprains. Fall in the &ldquo;not sure&rdquo; band on purpose." },
    { stat: "0.08 – 0.38", label: "Off-topic scores",                detail: "&ldquo;Best pizza in Portland&rdquo; sits at 0.19. Declined before the model is called." },
    { stat: "~$0.005",     label: "Cost per answered question",     detail: "Off-topic questions a hundredth of a cent. Red flags free. Whole index built for $0.0012." },
    { stat: "1.2s",        label: "First real word to the screen",  detail: "The loading line names the guide about a second in. The slowest moment says something true." },
    { stat: "0 / 0 / 0",   label: "Em dashes · certainty · brands", detail: "Every live test after the fixes. The one brand named appears three times in the cited guide." },
    { stat: "17 → 40",     label: "Guides at build start vs. launch", detail: "Eight added Sep 22 from the calibration gaps, fifteen more Sep 23 to 28 from what Alfred surfaced. 228 passages in the search index." },
  ];
  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto", padding: `0 ${SECTION_X}` }}>
      <div className="msrbot-results-grid" style={{
        display:              "grid",
        gridTemplateColumns:  "repeat(3, 1fr)",
        gap:                  "clamp(24px, 3vw, 40px)",
      }}>
        {tiles.map((t, i) => (
          <div key={i} style={{
            padding:    "28px 0 0",
            borderTop:  `1px solid ${c.borderStrong}`,
          }}>
            <p style={{
              fontFamily:    font.sans,
              fontSize:      "clamp(28px, 3.4vw, 44px)",
              fontWeight:    500,
              color:         c.ink,
              margin:        "0 0 12px",
              letterSpacing: "-0.02em",
              lineHeight:    1.05,
            }}>
              {t.stat}
            </p>
            <p style={{
              fontFamily:    font.sans,
              fontSize:      "var(--text-small)",
              fontWeight:    500,
              letterSpacing: "0.01em",
              color:         c.accent,
              margin:        "0 0 10px",
            }}>{t.label}</p>
            <p style={{
              fontFamily: font.sans,
              fontSize:   "var(--text-body)",
              lineHeight: 1.55,
              color:      c.ink2,
              margin:     0,
            }} dangerouslySetInnerHTML={{ __html: t.detail }} />
          </div>
        ))}
      </div>
      <p style={{
        fontFamily: font.sans,
        fontSize:   "var(--text-small)",
        color:      c.muted,
        margin:     "24px 0 0",
        lineHeight: 1.55,
      }}>
        All numbers are proxy measurements from the 40-question calibration set and internal testing. Live traffic numbers will replace these once the site rate limits are in place and the guides get a clinical review pass.
      </p>
    </div>
  );
}

/* ---------- page ---------- */

export default function MSRChatbot() {
  return (
    <>
      <Nav />
      <CaseStudySchema
        name="Alfred, a foot-health assistant"
        description="A retrieval-grounded assistant on menssolerevival.com that only answers from the site's own guides. Claude Haiku 4.5, red-flag triage, cited sources. Four working days, solo with Claude Code."
        slug="msr-chatbot"
        dateCreated="2026-09"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.barreiro.com/" },
          { name: "Work", url: "https://www.barreiro.com/#work" },
          { name: "Alfred, a foot-health assistant", url: "https://www.barreiro.com/work/msr-chatbot" },
        ]}
      />

      <main id="main-content" style={{ background: c.surface, paddingTop: "72px" }}>

        {/* Title block */}
        <header style={{
          padding: `clamp(56px, 12vw, 120px) ${SECTION_X} clamp(40px, 8vw, 80px)`,
        }}>
          <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
            <h1 style={{
              fontFamily:    font.sans,
              fontSize:      "clamp(40px,4.8vw,60px)",
              fontWeight:    500,
              color:         c.ink,
              margin:        "0 0 24px",
              letterSpacing: "-0.02em",
              lineHeight:    1.1,
            }}>
              Alfred, a foot-health assistant
            </h1>

            <p style={{
              fontFamily: font.sans,
              fontSize:   "var(--text-article)",
              lineHeight: 1.6,
              fontWeight: 400,
              color:      c.ink,
              maxWidth:   "680px",
              margin:     "0 0 32px",
            }}>
              A retrieval-grounded assistant on menssolerevival.com that only answers from the site&rsquo;s own guides. Product design, conversation design, front end, build. Solo, with Claude Code, in four working days.
            </p>

            <p style={{
              fontFamily: font.sans,
              fontSize:   "var(--text-article)",
              lineHeight: 1.5,
              fontWeight: 500,
              color:      c.ink,
              maxWidth:   "680px",
              margin:     "0 0 32px",
            }}>
              Every real answer is written by Claude, from the guides only. Red flags stop the conversation. Nothing is stored.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "40px" }}>
              <Tag>AI conversation design</Tag>
              <Tag>Retrieval-grounded (RAG)</Tag>
              <Tag>Claude Haiku 4.5</Tag>
              <Tag>Next.js · Vercel</Tag>
              <Tag>WCAG 2.1 AA</Tag>
            </div>

            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            "8px",
                fontFamily:     font.sans,
                fontSize:       "var(--text-body)",
                fontWeight:     500,
                letterSpacing:  0,
                color:          "var(--color-text-link)",
                textDecoration: "none",
                borderBottom:   "1px solid currentColor",
                paddingBottom:  "2px",
              }}
            >
              menssolerevival.com/ask →
            </a>
          </div>
        </header>

        {/* Sticky arc nav */}
        <nav
          aria-label="Case study arcs"
          className="msrbot-arc-nav"
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
              { key: "premise",   label: "Premise"      },
              { key: "how",       label: "How it works" },
              { key: "decisions", label: "Decisions"    },
              { key: "details",   label: "Details"      },
            ].map((arc, i, arr) => (
              <li key={arc.key} style={{
                borderRight: i < arr.length - 1 ? `1px solid ${c.border}` : "none",
              }}>
                <a
                  href={`#arc-${arc.key}`}
                  data-arc-anchor={arc.key}
                  aria-label={arc.label}
                  style={{
                    fontFamily:     font.sans,
                    fontSize:       "var(--text-body)",
                    fontWeight:     500,
                    letterSpacing:  0,
                    color:          c.ink2,
                    textDecoration: "none",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    padding:        "16px 8px",
                    transition:     "color 0.15s ease, background 0.15s ease",
                  }}
                >
                  <span className="msrbot-arc-label">{arc.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <StickyArcNavInit arcs={["premise", "how", "decisions", "details"]} />

        <style>{`
          .msrbot-arc-nav a[data-active] {
            color: var(--color-accent) !important;
            background: rgba(15,61,62,0.06) !important;
            box-shadow: inset 0 -4px 0 var(--color-accent) !important;
            font-weight: 700 !important;
          }
          .msrbot-arc-nav a:hover {
            color: ${c.ink};
            background: rgba(15,61,62,0.04);
          }
          @media (max-width: 760px) {
            .msrbot-arc-nav {
              position: fixed !important;
              left: 0 !important;
              right: 0 !important;
              top: 72px !important;
              padding: 0 !important;
            }
            .msrbot-arc-nav ul { gap: 0 !important; }
            .msrbot-arc-nav a  {
              font-size: 11px !important;
              padding: 12px 4px !important;
              letter-spacing: 0.06em !important;
              gap: 4px !important;
              color: ${c.ink2} !important;
            }
            .msrbot-arc-nav a[data-active] {
              color: var(--color-accent) !important;
              background: rgba(15,61,62,0.06) !important;
              box-shadow: inset 0 -4px 0 var(--color-accent) !important;
              font-weight: 700 !important;
            }
          }
          @media (max-width: 760px) {
            .msrbot-row              { grid-template-columns: 1fr !important; gap: 32px !important; }
            .msrbot-callout-grid     { grid-template-columns: 1fr !important; gap: 22px !important; }
            .msrbot-states-grid      { grid-template-columns: 1fr !important; gap: 32px !important; }
            .msrbot-results-grid     { grid-template-columns: 1fr !important; gap: 32px !important; }
            .msrbot-failed-row       { grid-template-columns: 40px 1fr !important; gap: 16px !important; }
            .msrbot-meta             { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
            .msrbot-guardrails-grid  { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
          @media (min-width: 761px) and (max-width: 1000px) {
            .msrbot-guardrails-grid  { grid-template-columns: repeat(2, 1fr) !important; gap: 40px !important; }
          }
        `}</style>

        {/* ── PREMISE arc ── */}
        <div id="arc-premise" style={{ background: "transparent", marginTop: "24px", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)", scrollMarginTop: "140px" }}>
          <section aria-label="Hero" style={{ padding: `0 ${SECTION_X} 120px` }}>
            <HeroImage
              src="/images/work/msr-chatbot/hero-empty.png"
              alt="The Ask page on Men's Sole Revival. Alfred introduces himself, four starter chips sit above the composer, and a single disclaimer under the input reads 'Alfred isn't a doctor.'"
              cropAspect={null}
              priority
            />
          </section>

          <section aria-label="Premise quote" style={{
            maxWidth: CONTENT_MAX,
            margin:   "0 auto",
            padding:  `40px ${SECTION_X} 120px`,
          }}>
            <p style={{
              fontFamily:    font.sans,
              fontSize:      "clamp(28px,3.8vw,60px)",
              fontWeight:    400,
              color:         c.ink,
              margin:        0,
              lineHeight:    1.15,
              letterSpacing: "-0.03em",
              maxWidth:      "22ch",
            }}>
              &ldquo;17 guides. 973 impressions. Five clicks. The library was invisible from the inside and the outside.&rdquo;
            </p>
            <p style={{
              fontFamily:    font.sans,
              fontSize:      "var(--text-body)",
              fontWeight:    500,
              letterSpacing: 0,
              color:         c.muted,
              margin:        "28px 0 0",
            }}>
              From the September retrospective
            </p>
          </section>

          <section aria-label="The problem" style={{ padding: `0 ${SECTION_X} 120px` }}>
            <div style={{
              maxWidth:             CONTENT_MAX,
              margin:               "0 auto",
              display:              "grid",
              gridTemplateColumns:  "1fr 1.6fr",
              gap:                  "64px",
              alignItems:           "start",
            }} className="msrbot-row">
              <div>
                <h2 style={{
                  fontFamily:    font.sans,
                  fontSize:      "clamp(28px,4vw,60px)",
                  fontWeight:    500,
                  color:         c.ink,
                  margin:        0,
                  letterSpacing: "-0.02em",
                  lineHeight:    1.1,
                }}>
                  The problem.
                </h2>
              </div>
              <div>
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "clamp(15px,1.6vw,17px)",
                  lineHeight: 1.6,
                  color:      c.ink2,
                  margin:     0,
                  maxWidth:   PROSE_MAX,
                }}>
                  Men&rsquo;s Sole Revival exists because men over 40 look after everyone but themselves, and their feet come last. By September 2026 the site had 17 guides and 7 routines and almost no one reading them. The guides answer real questions. The problem is that a man with a hot, swollen big toe at 3 a.m. does not know which of 24 articles answers his. Search on the site is keyword search. Google had not read the sitemap since June. The library was invisible from the inside and the outside.
                </p>
                <Callout
                  decision="Ship a front door to the library, not a general AI chatbot."
                  why="Every answer is accountable to a guide the reader can open. The model gets no room to invent."
                  cost="Anything the guides do not cover gets an honest &ldquo;I don&rsquo;t cover that yet&rdquo; and a question to bring to a clinician."
                />
              </div>
            </div>
          </section>

          <section aria-label="The constraints" style={{ padding: `0 ${SECTION_X} 120px` }}>
            <div style={{
              maxWidth:             CONTENT_MAX,
              margin:               "0 auto",
              display:              "grid",
              gridTemplateColumns:  "1fr 1.6fr",
              gap:                  "64px",
              alignItems:           "start",
            }} className="msrbot-row">
              <div>
                <h2 style={{
                  fontFamily:    font.sans,
                  fontSize:      "clamp(28px,4vw,60px)",
                  fontWeight:    500,
                  color:         c.ink,
                  margin:        0,
                  letterSpacing: "-0.02em",
                  lineHeight:    1.1,
                }}>
                  The constraints.
                </h2>
              </div>
              <div>
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "clamp(15px,1.6vw,17px)",
                  lineHeight: 1.6,
                  color:      c.ink2,
                  margin:     "0 0 24px",
                  maxWidth:   PROSE_MAX,
                }}>
                  Set before the first line of code, because the cost of getting them wrong is not a bad demo. It is a man being told something wrong about his foot, or a bill I did not plan for.
                </p>
                <ul style={{
                  listStyle: "none",
                  margin:    0,
                  padding:   0,
                  display:   "grid",
                  gap:       "18px",
                  maxWidth:  PROSE_MAX,
                }}>
                  {[
                    ["Answers come only from the guides.", "If the guides don&rsquo;t cover it, the assistant says so. No general medical knowledge from the model, ever."],
                    ["It never diagnoses.", "It describes the pattern the guides describe and says what confirms it."],
                    ["Red flags stop the conversation.", "A foot that turned blue, diabetes plus an open wound, sudden severe pain: those get a doctor screen, not an answer."],
                    ["Nothing is stored.", "No login, no transcripts, no message text in analytics. Inputs are health data."],
                    ["Spend is capped in two places.", "$25 a month on the model, $5 a month on embeddings, plus bot detection and a per-address rate limit."],
                    ["WCAG 2.1 AA.", "Screen readers hear the answer once, when it&rsquo;s done, not token by token."],
                    ["Two vendors only.", "Anthropic and Vercel. Every extra account is another key, another bill, another thing to explain."],
                  ].map(([head, body], i) => (
                    <li key={i} style={{
                      display:              "grid",
                      gridTemplateColumns:  "180px 1fr",
                      gap:                  "24px",
                      alignItems:           "baseline",
                    }} className="msrbot-constraint">
                      <span style={{
                        fontFamily:    font.sans,
                        fontSize:      "var(--text-body)",
                        fontWeight:    500,
                        color:         c.ink,
                        letterSpacing: "-0.005em",
                      }}>{head}</span>
                      <span style={{
                        fontFamily: font.sans,
                        fontSize:   "var(--text-body)",
                        lineHeight: 1.55,
                        color:      c.ink2,
                      }} dangerouslySetInnerHTML={{ __html: body }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* ── HOW IT WORKS arc ── */}
        <div id="arc-how" style={{ background: "transparent", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)", scrollMarginTop: "140px" }}>
          <section aria-label="The pipeline" style={{ padding: `0 ${SECTION_X} 40px` }}>
            <div style={{
              maxWidth:             CONTENT_MAX,
              margin:               "0 auto",
              display:              "grid",
              gridTemplateColumns:  "1fr 1.6fr",
              gap:                  "64px",
              alignItems:           "start",
              marginBottom:         "64px",
            }} className="msrbot-row">
              <div>
                <h2 style={{
                  fontFamily:    font.sans,
                  fontSize:      "clamp(28px,4vw,60px)",
                  fontWeight:    500,
                  color:         c.ink,
                  margin:        0,
                  letterSpacing: "-0.02em",
                  lineHeight:    1.1,
                }}>
                  A message walks one path.
                </h2>
              </div>
              <div>
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "clamp(15px,1.6vw,17px)",
                  lineHeight: 1.6,
                  color:      c.ink2,
                  margin:     0,
                  maxWidth:   PROSE_MAX,
                }}>
                  Cheapest and safest step first. A word search runs in the browser before anything leaves the device. Everything after that runs on the server, in a fixed order, and returns one of three outcomes. The model is called at the last step, and only from the guide passages the earlier steps chose.
                </p>
              </div>
            </div>
          </section>
          <section aria-label="Pipeline diagram" style={{ padding: `0 ${SECTION_X} 80px` }}>
            <PipelineDiagram />
          </section>

          <section aria-label="The thresholds" style={{ padding: `0 ${SECTION_X} 120px` }}>
            <div style={{
              maxWidth:             CONTENT_MAX,
              margin:               "0 auto",
              display:              "grid",
              gridTemplateColumns:  "1fr 1.6fr",
              gap:                  "64px",
              alignItems:           "start",
            }} className="msrbot-row">
              <div>
                <h2 style={{
                  fontFamily:    font.sans,
                  fontSize:      "clamp(28px,4vw,60px)",
                  fontWeight:    500,
                  color:         c.ink,
                  margin:        0,
                  letterSpacing: "-0.02em",
                  lineHeight:    1.1,
                }}>
                  Where the numbers came from.
                </h2>
              </div>
              <div>
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "clamp(15px,1.6vw,17px)",
                  lineHeight: 1.6,
                  color:      c.ink2,
                  margin:     0,
                  maxWidth:   PROSE_MAX,
                }}>
                  I set the two thresholds by scoring 40 test questions: 20 the guides cover, 12 about feet but not covered (gout, warts, sprains), 8 nothing to do with feet (best pizza in Portland, weather, sports). The three groups did not overlap. The confident answer band starts at 0.53. The &ldquo;not sure&rdquo; band runs from 0.40 to 0.53. Below 0.40 is outside scope, and the model is never called for those.
                </p>
                <Callout
                  decision="Two thresholds, one calibration set, no LLM in the loop for the routing."
                  why="Routing needs to be predictable. Cheap arithmetic on the server keeps the decision inside the site&rsquo;s guardrails, not inside the model&rsquo;s."
                  cost="The bands need re-scoring every time a batch of guides ships. Cheap to run, easy to forget."
                />
              </div>
            </div>
          </section>
        </div>

        {/* ── DECISIONS arc ── */}
        <div id="arc-decisions" style={{ background: "transparent", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)", scrollMarginTop: "140px" }}>

          <section aria-label="A page, not a bubble" style={{ padding: `0 ${SECTION_X} 120px` }}>
            <div style={{
              maxWidth:             CONTENT_MAX,
              margin:               "0 auto",
              display:              "grid",
              gridTemplateColumns:  "1fr 1.6fr",
              gap:                  "64px",
              alignItems:           "start",
            }} className="msrbot-row">
              <div>
                <h2 style={{
                  fontFamily:    font.sans,
                  fontSize:      "clamp(28px,4vw,60px)",
                  fontWeight:    500,
                  color:         c.ink,
                  margin:        0,
                  letterSpacing: "-0.02em",
                  lineHeight:    1.1,
                }}>
                  A page, not a bubble.
                </h2>
              </div>
              <div>
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "clamp(15px,1.6vw,17px)",
                  lineHeight: 1.6,
                  color:      c.ink2,
                  margin:     0,
                  maxWidth:   PROSE_MAX,
                }}>
                  The floating bottom-right widget reads as sales chat, gets ignored, covers content on phones, and has no URL to link to or to show here. The assistant lives at <code style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.95em" }}>/ask</code>, and the next surface is an &ldquo;Ask&rdquo; entry in the header that opens the same component in a dialog, the way Vercel and Stripe do it in their docs.
                </p>
                <Callout
                  decision="Give the assistant its own URL."
                  why="A URL makes it linkable, indexable, and screen-reader friendly. The bubble had none of those."
                  cost="No always-present entry point. A header link picks up that slack."
                />
              </div>
            </div>
          </section>

          <section aria-label="The first build looked like a form" style={{ padding: `0 ${SECTION_X} 120px` }}>
            <div style={{
              maxWidth:             CONTENT_MAX,
              margin:               "0 auto",
              display:              "grid",
              gridTemplateColumns:  "1fr 1.6fr",
              gap:                  "64px",
              alignItems:           "start",
            }} className="msrbot-row">
              <div>
                <h2 style={{
                  fontFamily:    font.sans,
                  fontSize:      "clamp(28px,4vw,60px)",
                  fontWeight:    500,
                  color:         c.ink,
                  margin:        0,
                  letterSpacing: "-0.02em",
                  lineHeight:    1.1,
                }}>
                  The first build looked like a contact form.
                </h2>
              </div>
              <div>
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "clamp(15px,1.6vw,17px)",
                  lineHeight: 1.6,
                  color:      c.ink2,
                  margin:     0,
                  maxWidth:   PROSE_MAX,
                }}>
                  Label, box, submit button, fine print, a list of options under it. I built it with form grammar. Chat has a different grammar: the assistant speaks first, your messages sit on the right, suggestions are chips above the composer, the composer is pinned to the bottom and grows as you type, Send becomes Stop while it is writing. Same state machine underneath, new surface on top. That rebuild took an afternoon and changed what the thing felt like more than anything else I did.
                </p>
                <Callout
                  decision="Rebuild the surface once I saw it was a form pretending to be a chat."
                  why="The state machine was already right. The affordances were wrong. Users read the shape before they read the copy."
                  cost="Half a day I had planned for the retrieval index. The index shipped two days later instead of one."
                />
              </div>
            </div>
          </section>

          <section aria-label="Rules and no personality" style={{ padding: `0 ${SECTION_X} 120px` }}>
            <div style={{
              maxWidth:             CONTENT_MAX,
              margin:               "0 auto",
              display:              "grid",
              gridTemplateColumns:  "1fr 1.6fr",
              gap:                  "64px",
              alignItems:           "start",
            }} className="msrbot-row">
              <div>
                <h2 style={{
                  fontFamily:    font.sans,
                  fontSize:      "clamp(28px,4vw,60px)",
                  fontWeight:    500,
                  color:         c.ink,
                  margin:        0,
                  letterSpacing: "-0.02em",
                  lineHeight:    1.1,
                }}>
                  It had rules and no personality.
                </h2>
              </div>
              <div>
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "clamp(15px,1.6vw,17px)",
                  lineHeight: 1.6,
                  color:      c.ink2,
                  margin:     0,
                  maxWidth:   PROSE_MAX,
                }}>
                  The first prompt was eight &ldquo;never&rdquo; rules and a banned-word list. That produces careful, flat answers: same template every time, no reaction to what you said, never a question back. The fix was not a mascot. I described the writer it should sound like, quoted four lines from the guides so it could hear the voice, and gave it a reply shape: react to what the reader said in one clause, answer, why, the one thing that changes it, next action. It may ask one clarifying question when the answer would change. &ldquo;My heel hurts&rdquo; now gets &ldquo;Where exactly, under the heel or behind it? The location tells you what is going on.&rdquo;
                </p>
                <Callout
                  decision="Describe the writer, quote the site&rsquo;s prose, name the reply shape."
                  why="Rules alone teach a model what to avoid, not what to sound like. Examples do the work."
                  cost="The prompt is longer. Prompt caching absorbed most of it, but each call now sends a few hundred more tokens."
                />
              </div>
            </div>
          </section>

          <section aria-label="Alfred, not the site" style={{ padding: `0 ${SECTION_X} 120px` }}>
            <div style={{
              maxWidth:             CONTENT_MAX,
              margin:               "0 auto",
              display:              "grid",
              gridTemplateColumns:  "1fr 1.6fr",
              gap:                  "64px",
              alignItems:           "start",
            }} className="msrbot-row">
              <div>
                <h2 style={{
                  fontFamily:    font.sans,
                  fontSize:      "clamp(28px,4vw,60px)",
                  fontWeight:    500,
                  color:         c.ink,
                  margin:        0,
                  letterSpacing: "-0.02em",
                  lineHeight:    1.1,
                }}>
                  The assistant is Alfred.
                </h2>
              </div>
              <div>
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "clamp(15px,1.6vw,17px)",
                  lineHeight: 1.6,
                  color:      c.ink2,
                  margin:     0,
                  maxWidth:   PROSE_MAX,
                }}>
                  He speaks in my voice but never claims my biography. &ldquo;I&rsquo;ve dealt with foot problems for years&rdquo; would be a lie coming from software, and the line under the composer says the question goes to Claude. &ldquo;That is why this site exists&rdquo; carries the stake without the false first person.
                </p>
                <Callout
                  decision="Name the assistant. Use the site&rsquo;s voice. Never borrow the founder&rsquo;s life."
                  why="Voice earns trust. A borrowed biography loses it the first time a reader catches it."
                  cost="One more copy pass every time a phrasing sounds too personal."
                />
              </div>
            </div>
          </section>

          <section aria-label="Sources come from retrieval" style={{ padding: `0 ${SECTION_X} 120px` }}>
            <div style={{
              maxWidth:             CONTENT_MAX,
              margin:               "0 auto",
              display:              "grid",
              gridTemplateColumns:  "1fr 1.6fr",
              gap:                  "64px",
              alignItems:           "start",
            }} className="msrbot-row">
              <div>
                <h2 style={{
                  fontFamily:    font.sans,
                  fontSize:      "clamp(28px,4vw,60px)",
                  fontWeight:    500,
                  color:         c.ink,
                  margin:        0,
                  letterSpacing: "-0.02em",
                  lineHeight:    1.1,
                }}>
                  The wait names the guide.
                </h2>
              </div>
              <div>
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "clamp(15px,1.6vw,17px)",
                  lineHeight: 1.6,
                  color:      c.ink2,
                  margin:     0,
                  maxWidth:   PROSE_MAX,
                }}>
                  Sources are chosen by retrieval, not by the model. The guides listed under an answer come from the similarity scores, at most two, only ones within 0.05 of the best match. Nothing a visitor types can steer which guides get cited. The server opens the stream before it calls the model, so a second in, the loading line changes from &ldquo;Reading the guides…&rdquo; to &ldquo;Reading Heel Pain First Thing in the Morning…&rdquo;. The slowest moment says something specific and true.
                </p>
                <Callout
                  decision="Show the guide name during the wait, not a generic spinner."
                  why="The slowest visible moment is the last chance to reassure. A named guide reassures."
                  cost="The server has to open the stream before the model finishes. One extra piece of state to keep straight."
                />
              </div>
            </div>
          </section>

          {/* Guardrails — security layers + spend caps */}
          <section aria-label="Guardrails" style={{ padding: `0 ${SECTION_X} 120px` }}>
            <div style={{
              maxWidth:             CONTENT_MAX,
              margin:               "0 auto",
              display:              "grid",
              gridTemplateColumns:  "1fr 1.6fr",
              gap:                  "64px",
              alignItems:           "start",
              marginBottom:         "48px",
            }} className="msrbot-row">
              <div>
                <h2 style={{
                  fontFamily:    font.sans,
                  fontSize:      "clamp(28px,4vw,60px)",
                  fontWeight:    500,
                  color:         c.ink,
                  margin:        0,
                  letterSpacing: "-0.02em",
                  lineHeight:    1.1,
                }}>
                  Guardrails.
                </h2>
              </div>
              <div>
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "clamp(15px,1.6vw,17px)",
                  lineHeight: 1.6,
                  color:      c.ink2,
                  margin:     0,
                  maxWidth:   PROSE_MAX,
                }}>
                  Every AI-in-production question is a safety question. What can go wrong. What does it cost when it does. The guardrails are layered, cheapest and safest first, so no single failure produces either a wrong answer or a bill I did not plan for. Below is what runs at each layer, from the browser to the workspace ceiling.
                </p>
              </div>
            </div>

            {/* Layered breakdown */}
            <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
              <div className="msrbot-guardrails-grid" style={{
                display:              "grid",
                gridTemplateColumns:  "repeat(5, 1fr)",
                gap:                  "clamp(20px, 2.4vw, 32px)",
              }}>
                {[
                  {
                    layer: "Browser",
                    note:  "Before the message leaves the device",
                    items: [
                      "Red-flag word search, first thing every message hits",
                      "500-character input limit",
                    ],
                  },
                  {
                    layer: "Edge",
                    note:  "Before the route runs",
                    items: [
                      "Vercel BotID invisible challenge",
                      "Vercel WAF: 10 requests per minute per IP, 40 per 10 minutes",
                      "Same-site origin check",
                    ],
                  },
                  {
                    layer: "Route handler",
                    note:  "Before the model is called",
                    items: [
                      "HMAC-signed assistant turns, so history cannot be forged mid-conversation",
                      "Body-size cap",
                      "Red-flag check runs again on the server",
                      "10-turn limit per conversation",
                    ],
                  },
                  {
                    layer: "Model",
                    note:  "During and after the call",
                    items: [
                      "Prompt-cached system message keeps repeat calls cheap",
                      "1,024 output tokens",
                      "Every real answer is written from the retrieved guide passages only",
                    ],
                  },
                  {
                    layer: "Workspace",
                    note:  "Spend ceilings on the account itself",
                    items: [
                      "Anthropic workspace capped at $25 per month, alerts at $10 and $20",
                      "Vercel AI Gateway capped at $5 per month",
                      "$10 of Gateway credits bought, lifts the free-tier five-per-minute cap",
                    ],
                  },
                ].map((col, i) => (
                  <div key={col.layer} style={{
                    borderTop: `1px solid ${c.borderStrong}`,
                    paddingTop: "20px",
                  }}>
                    <p style={{
                      fontFamily:    font.sans,
                      fontSize:      "var(--text-small)",
                      fontWeight:    500,
                      letterSpacing: "0.01em",
                      color:         c.accent,
                      margin:        "0 0 4px",
                    }}>
                      {String(i + 1).padStart(2, "0")} · {col.layer}
                    </p>
                    <p style={{
                      fontFamily: font.sans,
                      fontSize:   "var(--text-small)",
                      color:      c.muted,
                      margin:     "0 0 16px",
                      lineHeight: 1.45,
                    }}>
                      {col.note}
                    </p>
                    <ul style={{
                      listStyle: "none",
                      margin:    0,
                      padding:   0,
                      display:   "grid",
                      gap:       "12px",
                    }}>
                      {col.items.map((it) => (
                        <li key={it} style={{
                          fontFamily: font.sans,
                          fontSize:   "var(--text-body)",
                          lineHeight: 1.5,
                          color:      c.ink2,
                          paddingLeft: "14px",
                          position:   "relative",
                        }}>
                          <span aria-hidden="true" style={{
                            position:  "absolute",
                            left:      0,
                            top:       "0.7em",
                            width:     "6px",
                            height:    "1px",
                            background: c.brand,
                          }} />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Callout closer — the philosophy */}
            <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto", paddingTop: "8px" }}>
              <Callout
                decision="Cap the model, cap the account, cap the request rate."
                why="A safety net is a stack of nets. One will always miss. The BotID silent failure is the working example: the outer net had a hole for a day, and the inner nets kept the site working while I fixed it."
                cost="Every cap is a decision the person after me has to remember. Documented in the vault and in the environment README so no one lifts a limit by accident."
              />
            </div>
          </section>
        </div>

        {/* ── DETAILS arc ── */}
        <div id="arc-details" style={{ background: "transparent", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)", scrollMarginTop: "140px" }}>

          {/* States gallery */}
          <section aria-label="States shown" style={{ padding: `0 0 80px` }}>
            <div style={{ padding: `0 ${SECTION_X} 32px` }}>
              <div style={{
                maxWidth:             CONTENT_MAX,
                margin:               "0 auto",
                display:              "grid",
                gridTemplateColumns:  "1fr 1.6fr",
                gap:                  "64px",
                alignItems:           "start",
              }} className="msrbot-row">
                <div>
                  <h2 style={{
                    fontFamily:     font.sans,
                    fontSize:       "clamp(28px,4vw,60px)",
                    fontWeight:     500,
                    color:          c.ink,
                    margin:         0,
                    letterSpacing:  "-0.02em",
                    lineHeight:     1.1,
                  }}>
                    Ten states.
                  </h2>
                </div>
                <div>
                  <p style={{
                    fontFamily: font.sans,
                    fontSize:   "clamp(15px,1.6vw,17px)",
                    lineHeight: 1.6,
                    color:      c.ink2,
                    margin:     0,
                    maxWidth:   PROSE_MAX,
                  }}>
                    Each state is a reachable URL for review while the site is in preview: empty, loading, streaming, answer, not sure, outside what I cover, red flag (three tiers), error, pausing (rate limited), resting (budget spent), conversation limit. The red-flag screen moves keyboard focus to its heading and stops the conversation. The resting screen exists because a spend cap that silently fails is worse than no cap. Four of the live states are below.
                  </p>
                </div>
              </div>
            </div>
            <StatesGallery />
          </section>

          {/* What failed */}
          <section aria-label="What failed" style={{ padding: `0 0 120px` }}>
            <div style={{ padding: `0 ${SECTION_X} 24px` }}>
              <div style={{
                maxWidth:             CONTENT_MAX,
                margin:               "0 auto",
                display:              "grid",
                gridTemplateColumns:  "1fr 1.6fr",
                gap:                  "64px",
                alignItems:           "start",
              }} className="msrbot-row">
                <div>
                  <h2 style={{
                    fontFamily:     font.sans,
                    fontSize:       "clamp(28px,4vw,60px)",
                    fontWeight:     500,
                    color:          c.ink,
                    margin:         0,
                    letterSpacing:  "-0.02em",
                    lineHeight:     1.1,
                  }}>
                    What failed.
                  </h2>
                </div>
                <div>
                  <p style={{
                    fontFamily: font.sans,
                    fontSize:   "clamp(15px,1.6vw,17px)",
                    lineHeight: 1.6,
                    color:      c.ink2,
                    margin:     0,
                    maxWidth:   PROSE_MAX,
                  }}>
                    Five things I got wrong before I got them right. Kept all five here because the fixes are the most credible thing about the write-up.
                  </p>
                </div>
              </div>
            </div>
            <WhatFailed />
          </section>

          {/* Results */}
          <section aria-label="Results" style={{ padding: `0 0 120px` }}>
            <div style={{ padding: `0 ${SECTION_X} 24px` }}>
              <div style={{
                maxWidth:             CONTENT_MAX,
                margin:               "0 auto",
                display:              "grid",
                gridTemplateColumns:  "1fr 1.6fr",
                gap:                  "64px",
                alignItems:           "start",
              }} className="msrbot-row">
                <div>
                  <h2 style={{
                    fontFamily:     font.sans,
                    fontSize:       "clamp(28px,4vw,60px)",
                    fontWeight:     500,
                    color:          c.ink,
                    margin:         0,
                    letterSpacing:  "-0.02em",
                    lineHeight:     1.1,
                  }}>
                    What is measured so far.
                  </h2>
                </div>
                <div>
                  <p style={{
                    fontFamily: font.sans,
                    fontSize:   "clamp(15px,1.6vw,17px)",
                    lineHeight: 1.6,
                    color:      c.ink2,
                    margin:     0,
                    maxWidth:   PROSE_MAX,
                  }}>
                    Live traffic numbers replace these once rate limits are in place. Everything below is measured on the 40-question calibration set and internal testing runs.
                  </p>
                </div>
              </div>
            </div>
            <ResultsTiles />
          </section>

          {/* What's next */}
          <section aria-label="What is next" style={{ padding: `0 ${SECTION_X} 120px` }}>
            <div style={{
              maxWidth:             CONTENT_MAX,
              margin:               "0 auto",
              display:              "grid",
              gridTemplateColumns:  "1fr 1.6fr",
              gap:                  "64px",
              alignItems:           "start",
            }} className="msrbot-row">
              <div>
                <h2 style={{
                  fontFamily:    font.sans,
                  fontSize:      "clamp(28px,4vw,60px)",
                  fontWeight:    500,
                  color:         c.ink,
                  margin:        0,
                  letterSpacing: "-0.02em",
                  lineHeight:    1.1,
                }}>
                  What is next.
                </h2>
              </div>
              <div>
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "clamp(15px,1.6vw,17px)",
                  lineHeight: 1.6,
                  color:      c.ink2,
                  margin:     0,
                  maxWidth:   PROSE_MAX,
                }}>
                  Live traffic. The instrumented events are already in place (<code style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.95em" }}>ask_panel_open</code>, <code style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.95em" }}>ask_answer_shown</code>, <code style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.95em" }}>ask_red_flag</code>, <code style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.95em" }}>ask_feedback</code>). Two weeks of data will tell me which guide neighborhoods produce &ldquo;not sure&rdquo; answers, which is the list for the next batch of guides. A clinical review of the highest-risk guides sits above that on the list. The fifteen guides that shipped alongside launch (a toenail-fungus cluster of five, the old fungus guide rewritten as a hub, and ten from a keyword gap map) were the first cycle of that loop already running: Alfred answered &ldquo;fungus on my big toe&rdquo; from the athlete&rsquo;s-foot guide because the site had one thin fungus guide. The chatbot exposed the content gap.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Colophon */}
        <section aria-label="Colophon" style={{ padding: `0 ${SECTION_X} 120px` }}>
          <div style={{
            maxWidth: CONTENT_MAX,
            margin:   "0 auto",
            display:  "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap:      "48px",
            borderTop: `1px solid ${c.border}`,
            paddingTop: "40px",
          }} className="msrbot-meta">
            <MetaCell label="Role"     value="Product design, conversation design, front end, build. Solo, with Claude Code." />
            <MetaCell label="Timeline" value="Four working days to build (Sep 19–22). Six more days to audit and launch. Live Sep 28, 2026." />
            <MetaCell label="Stack"    value="Next.js on Vercel · Claude Haiku 4.5 · Vercel AI Gateway (voyage-4-lite) · BotID · WAF · HMAC-signed turns" />
            <MetaCell label="Live"     value={
              <a href={LIVE_URL} target="_blank" rel="noopener noreferrer"
                 aria-label="Ask a foot question on Men's Sole Revival (opens in new tab)"
                 style={{ color: c.accent2, textDecoration: "none", borderBottom: `1px solid ${c.accent}` }}>
                menssolerevival.com/ask
              </a>
            } />
          </div>
        </section>

      </main>
      <ScrollProgress />
      <RelatedCaseStudies current="msr-chatbot" />
      <Footer />
    </>
  );
}
