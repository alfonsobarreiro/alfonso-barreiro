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
   menssolerevival.com/ask. Same template as the AIGA / MSR / Wayfarer /
   Spotify case studies: Premise / How it works / Decisions / Details, with
   Callout(Decision / Why / Cost) as the signature element.

   Every screenshot is a real capture of the live product or, for the
   form-era "before", a local render of commit 660b251. Numbers trace to
   the MSR repo and the calibration runs of Sep 21 and Sep 25, 2026.
--------------------------------------------------------------------------- */

const DESCRIPTION =
  "Case study: Alfred, a retrieval-grounded assistant on menssolerevival.com that only answers from the site's own guides. Claude Haiku 4.5, red-flag triage, cited sources.";

export const metadata: Metadata = {
  title: { absolute: "Alfred, a foot-health assistant · Alfonso Barreiro" },
  description: DESCRIPTION,
  alternates: { canonical: "https://www.barreiro.com/work/msr-chatbot" },
  openGraph: {
    type: "article",
    url: "https://www.barreiro.com/work/msr-chatbot",
    title: "Alfred, a foot-health assistant",
    description:
      "A retrieval-grounded assistant on menssolerevival.com that only answers from the site's own guides. Four working days to build. Solo, with Claude Code.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alfred, a foot-health assistant",
    description:
      "A retrieval-grounded assistant on menssolerevival.com that only answers from the site's own guides. Four working days to build. Solo, with Claude Code.",
  },
};

const c = {
  surface:      "var(--color-paper)",
  ink:          "var(--color-text)",
  ink2:         "var(--color-neutral-700)",
  muted:        "var(--color-neutral-600)",
  brand:        "var(--color-brand)",
  accent:       "var(--color-accent)",
  accent2:      "var(--color-accent-hover)",
  link:         "var(--color-text-link)",
  border:       "var(--color-neutral-400)",
  borderStrong: "var(--color-neutral-500)",
};

const font = { sans: "var(--font-dm-sans), -apple-system, sans-serif" };

const SECTION_X   = "clamp(32px, 6vw, 80px)";
const CONTENT_MAX = "var(--content-max)";
const PROSE_MAX   = "680px";
const LIVE_URL    = "https://www.menssolerevival.com/ask";
const IMG         = "/images/work/msr-chatbot";

const h2Style: React.CSSProperties = {
  fontFamily:    font.sans,
  fontSize:      "clamp(28px,4vw,60px)",
  fontWeight:    500,
  color:         c.ink,
  margin:        0,
  letterSpacing: "-0.02em",
  lineHeight:    1.1,
};
const proseStyle: React.CSSProperties = {
  fontFamily: font.sans,
  fontSize:   "clamp(15px,1.6vw,17px)",
  lineHeight: 1.6,
  color:      c.ink2,
  maxWidth:   PROSE_MAX,
};
const smallLabel: React.CSSProperties = {
  fontFamily:    font.sans,
  fontSize:      "var(--text-small)",
  fontWeight:    500,
  letterSpacing: "0.01em",
  color:         c.accent,
  margin:        "0 0 6px",
};
const bodyText: React.CSSProperties = {
  fontFamily: font.sans,
  fontSize:   "var(--text-body)",
  lineHeight: 1.55,
  color:      c.ink2,
  margin:     0,
};

/* ---------- layout atoms ---------- */

/** Outer gutter + inner max-width, so every block shares one left edge. */
function Wrap({ children, pb = 120 }: { children: React.ReactNode; pb?: number }) {
  return (
    <div style={{ padding: `0 ${SECTION_X} ${pb}px` }}>
      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>{children}</div>
    </div>
  );
}

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="msrbot-row" style={{
      display:             "grid",
      gridTemplateColumns: "1fr 1.6fr",
      gap:                 "64px",
      alignItems:          "start",
    }}>
      <div><h2 style={h2Style}>{title}</h2></div>
      <div>{children}</div>
    </div>
  );
}

function P({ children, mb = 0 }: { children: React.ReactNode; mb?: number }) {
  return <p style={{ ...proseStyle, margin: `0 0 ${mb}px` }}>{children}</p>;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily:    font.sans,
      fontSize:      "var(--text-small)",
      fontWeight:    500,
      letterSpacing: "0.01em",
      color:         c.ink2,
      padding:       "6px 14px",
      border:        `1px solid ${c.borderStrong}`,
    }}>
      {children}
    </span>
  );
}

function Callout({ decision, why, cost }: { decision: string; why: string; cost: string }) {
  return (
    <aside className="msrbot-callout" style={{
      background: "#FFFFFF",
      border:     `1px solid ${c.border}`,
      padding:    "32px 36px 32px 44px",
      maxWidth:   "760px",
      marginTop:  "40px",
      position:   "relative",
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
      <p style={{ ...smallLabel, margin: "0 0 10px" }}>Decision</p>
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
          <p style={{ ...smallLabel, margin: "0 0 10px" }}>Why</p>
          <p style={{ ...bodyText, lineHeight: 1.6 }}>{why}</p>
        </div>
        <div>
          <p style={{ ...smallLabel, margin: "0 0 10px" }}>Cost</p>
          <p style={{ ...bodyText, lineHeight: 1.6 }}>{cost}</p>
        </div>
      </div>
    </aside>
  );
}

/** Label / body pairs, used by The bet and The constraints. */
function LabelList({ items }: { items: Array<[string, string]> }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "18px", maxWidth: PROSE_MAX }}>
      {items.map(([head, body]) => (
        <li key={head} className="msrbot-constraint" style={{
          display:             "grid",
          gridTemplateColumns: "180px 1fr",
          gap:                 "24px",
          alignItems:          "baseline",
        }}>
          <span style={{ fontFamily: font.sans, fontSize: "var(--text-body)", fontWeight: 500, color: c.ink }}>{head}</span>
          <span style={bodyText}>{body}</span>
        </li>
      ))}
    </ul>
  );
}

function MetaCell({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p style={{ ...smallLabel, margin: "0 0 8px" }}>{label}</p>
      <p style={{ fontFamily: font.sans, fontSize: "var(--text-body)", lineHeight: 1.5, color: c.ink, margin: 0 }}>{value}</p>
    </div>
  );
}

/* ---------- images ---------- */

const frame: React.CSSProperties = {
  border:       `1px solid ${c.border}`,
  borderRadius: "10px",
  overflow:     "hidden",
  background:   "#FFFFFF",
};

function Caption({ label, note }: { label?: string; note?: string }) {
  if (!label && !note) return null;
  return (
    <figcaption style={{ marginTop: "14px" }}>
      {label && <p style={smallLabel}>{label}</p>}
      {note && <p style={bodyText}>{note}</p>}
    </figcaption>
  );
}

/** A phone-width capture. Shown no wider than it was captured, so the text stays legible. */
function Shot({ src, w, h, alt, label, note, max = 340 }: {
  src: string; w: number; h: number; alt: string; label?: string; note?: string; max?: number;
}) {
  return (
    <figure style={{ margin: 0, width: "100%", maxWidth: `${max}px` }}>
      <div style={frame}>
        <Image
          src={src}
          alt={alt}
          width={w}
          height={h}
          sizes={`(max-width: 760px) 100vw, ${max}px`}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
      <Caption label={label} note={note} />
    </figure>
  );
}

function Pair({ children }: { children: React.ReactNode }) {
  return (
    <div className="msrbot-pair" style={{
      display:             "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 340px))",
      gap:                 "clamp(24px, 4vw, 56px)",
      alignItems:          "start",
      marginTop:           "56px",
    }}>
      {children}
    </div>
  );
}

/* ---------- pipeline: SVG on wide screens, an ordered list below 1000px ---------- */

function PipelineDiagram() {
  const ink      = "#252B28";
  const soft     = "#B8B4AC";
  const brandTxt = "#953626"; // terracotta-700, clears AA at 13px on white
  const teal     = "#0F3D3E";
  const muted    = "#6E6E6A";

  const t12: React.CSSProperties = { font: `500 12px ${font.sans}`, fill: muted, letterSpacing: "0.02em" };
  const t13: React.CSSProperties = { font: `500 13px ${font.sans}`, fill: ink };
  const num: React.CSSProperties = { font: `500 13px ${font.sans}`, fill: brandTxt };
  const t17: React.CSSProperties = { font: `500 17px ${font.sans}`, fill: ink };
  const t15: React.CSSProperties = { font: `500 15px ${font.sans}`, fill: ink };

  return (
    <div className="msrbot-pipe-svg" style={{ background: "#FFFFFF", border: `1px solid ${c.border}`, padding: "clamp(24px, 3vw, 40px)" }}>
      <svg
        viewBox="0 0 1120 560"
        role="img"
        aria-label="Pipeline: a red-flag check in the browser, then the message is turned into numbers and compared with 228 guide passages. Below 0.40 it is declined, 0.40 to 0.53 gets a not-sure answer, 0.53 and up gets a confident answer with its source."
        style={{ display: "block", width: "100%", height: "auto" }}
      >
        <defs>
          <marker id="msrbot-arrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="10" markerHeight="10" orient="auto-start-reverse">
            <path d="M0 0 L12 6 L0 12 z" fill={ink} />
          </marker>
        </defs>

        <rect x="490" y="20" width="140" height="36" fill="none" stroke={soft} strokeWidth="1" />
        <text x="560" y="43" textAnchor="middle" style={t13}>A message arrives</text>
        <line x1="560" y1="56" x2="560" y2="96" stroke={ink} strokeWidth="1.25" markerEnd="url(#msrbot-arrow)" />

        <rect x="380" y="100" width="360" height="80" fill="#FFFFFF" stroke={ink} strokeWidth="1.25" />
        <text x="400" y="128" style={num}>Step 1</text>
        <text x="400" y="152" style={t17}>Red-flag check, in the browser</text>
        <text x="400" y="170" style={t12}>free · checked again on the server</text>

        <path d="M740 140 L812 140 L812 95 L874 95" fill="none" stroke={ink} strokeWidth="1.25" markerEnd="url(#msrbot-arrow)" />
        <text x="748" y="130" style={{ ...t12, fill: brandTxt }}>match</text>
        <rect x="880" y="60" width="200" height="70" fill={ink} stroke={ink} strokeWidth="1" />
        <text x="980" y="88" textAnchor="middle" style={{ ...t15, fill: "#FAFAF9" }}>Stop and refer</text>
        <text x="980" y="108" textAnchor="middle" style={{ ...t12, fill: "#E7E5E0" }}>911, today, or this week</text>

        <line x1="560" y1="180" x2="560" y2="220" stroke={ink} strokeWidth="1.25" markerEnd="url(#msrbot-arrow)" />
        <text x="574" y="204" style={t12}>no match</text>

        <rect x="380" y="224" width="360" height="80" fill="#FFFFFF" stroke={ink} strokeWidth="1.25" />
        <text x="400" y="252" style={num}>Step 2</text>
        <text x="400" y="276" style={t17}>Turn the message into 512 numbers</text>
        <text x="400" y="294" style={t12}>Vercel AI Gateway · about $0.0000002</text>
        <line x1="560" y1="304" x2="560" y2="340" stroke={ink} strokeWidth="1.25" markerEnd="url(#msrbot-arrow)" />

        <rect x="380" y="344" width="360" height="80" fill="#FFFFFF" stroke={ink} strokeWidth="1.25" />
        <text x="400" y="372" style={num}>Step 3</text>
        <text x="400" y="396" style={t17}>Compare with the guides</text>
        <text x="400" y="414" style={t12}>228 passages · free · in memory</text>

        <path d="M560 424 L560 460 L160 460 L160 488" fill="none" stroke={ink} strokeWidth="1.25" markerEnd="url(#msrbot-arrow)" />
        <path d="M560 424 L560 488" fill="none" stroke={ink} strokeWidth="1.25" markerEnd="url(#msrbot-arrow)" />
        <path d="M560 460 L960 460 L960 488" fill="none" stroke={ink} strokeWidth="1.25" markerEnd="url(#msrbot-arrow)" />

        <rect x="40" y="490" width="240" height="60" fill="#FFFFFF" stroke={soft} strokeWidth="1.25" />
        <text x="160" y="516" textAnchor="middle" style={t15}>Outside what I cover</text>
        <text x="160" y="536" textAnchor="middle" style={t12}>below 0.40 · no model call</text>

        <rect x="440" y="490" width="240" height="60" fill="#FFFFFF" stroke={brandTxt} strokeWidth="1.25" />
        <text x="560" y="516" textAnchor="middle" style={t15}>Answer, labeled “not sure”</text>
        <text x="560" y="536" textAnchor="middle" style={t12}>0.40 to 0.53 · about half a cent</text>

        <rect x="840" y="490" width="240" height="60" fill="#FFFFFF" stroke={teal} strokeWidth="1.5" />
        <text x="960" y="516" textAnchor="middle" style={t15}>Confident answer + source</text>
        <text x="960" y="536" textAnchor="middle" style={t12}>0.53 and up · about half a cent</text>
      </svg>
    </div>
  );
}

function PipelineList() {
  const steps: Array<[string, string]> = [
    ["Red-flag check, in the browser", "Free. A match stops the conversation and refers him: 911, today, or this week. Checked again on the server."],
    ["Turn the message into 512 numbers", "Through Vercel’s AI Gateway, for about $0.0000002."],
    ["Compare with the guides", "228 passages, in memory. Free."],
  ];
  const outcomes: Array<[string, string]> = [
    ["Below 0.40", "“That’s outside what I cover.” The model is never called."],
    ["0.40 to 0.53", "An answer from the nearest guide, labeled “not sure,” with a question for a clinician. About half a cent."],
    ["0.53 and up", "A confident answer with its source. About half a cent."],
  ];
  return (
    <div className="msrbot-pipe-list" style={{ background: "#FFFFFF", border: `1px solid ${c.border}`, padding: "24px" }}>
      <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "18px" }}>
        {steps.map(([head, body], i) => (
          <li key={head}>
            <p style={{ ...smallLabel, color: "var(--color-terracotta-700)" }}>Step {i + 1}</p>
            <p style={{ fontFamily: font.sans, fontSize: "var(--text-body)", fontWeight: 500, color: c.ink, margin: "0 0 4px" }}>{head}</p>
            <p style={bodyText}>{body}</p>
          </li>
        ))}
      </ol>
      <p style={{ ...smallLabel, margin: "28px 0 12px" }}>Then one of three outcomes</p>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "14px" }}>
        {outcomes.map(([band, body]) => (
          <li key={band} style={{ borderTop: `1px solid ${c.border}`, paddingTop: "12px" }}>
            <p style={{ fontFamily: font.sans, fontSize: "var(--text-body)", fontWeight: 500, color: c.ink, margin: "0 0 4px" }}>{band}</p>
            <p style={bodyText}>{body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- the labeled reply: a real launch-day answer, split into the prompt's five parts ---------- */

const REPLY_PARTS: Array<[string, string]> = [
  ["1 · Reaction, in one clause", "That’s the classic pattern."],
  ["2 · The answer", "Sharp pain under the heel on those first few steps, then it eases as you walk, that’s plantar fasciitis."],
  ["3 · Why", "The tissue shortens overnight while your foot points downward, and the first weight-bearing step stretches it cold and fast. Ten minutes of walking warms it back up and the pain quiets down."],
  ["4 · The one thing that changes it", "The good news is that most cases resolve in 6 to 12 weeks with consistent daily stretching. The bad news is consistent is the operative word, you have to do it every morning before you put weight on the foot."],
  ["5 · The next action", "Start with the Plantar Stretch Sequence, a 3-minute routine you do before your first step. Do all three stretches before you stand up and walk around. Stick with it for four weeks and track whether the first-step pain is getting shorter or less sharp. If it hasn’t improved by then, or if the pain becomes constant rather than first-steps only, book a podiatrist visit."],
];

function AnnotatedReply() {
  return (
    <figure style={{ margin: 0, width: "100%" }}>
      <div style={{ ...frame, padding: "clamp(20px, 3vw, 32px)" }}>
        <p style={{ ...bodyText, fontSize: "var(--text-small)", margin: "0 0 6px" }}>He answers</p>
        <p style={{
          fontFamily: font.sans, fontSize: "var(--text-body)", color: c.ink,
          background: "var(--color-neutral-100)", padding: "12px 16px", margin: "0 0 24px",
          display: "inline-block",
        }}>
          Under the heel. Worst on my first few steps in the morning.
        </p>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "18px" }}>
          {REPLY_PARTS.map(([label, text]) => (
            <li key={label} className="msrbot-reply-part" style={{
              display:             "grid",
              gridTemplateColumns: "150px 1fr",
              gap:                 "20px",
              alignItems:          "baseline",
              borderTop:           `1px solid ${c.border}`,
              paddingTop:          "14px",
            }}>
              <span style={{ ...smallLabel, margin: 0 }}>{label}</span>
              <span style={{ fontFamily: font.sans, fontSize: "var(--text-body)", lineHeight: 1.6, color: c.ink }}>{text}</span>
            </li>
          ))}
        </ol>
      </div>
      <Caption
        label="Turn two, labeled"
        note="Unedited reply from launch day, split into the five parts of the reply shape. “That’s plantar fasciitis” sits closer to a diagnosis than the rules intend. See What failed, item one."
      />
    </figure>
  );
}

/* ---------- what failed ---------- */

const FAILED: Array<[string, string]> = [
  [
    "The first live answer said “almost certainly plantar fasciitis” and “you’ve got the right diagnosis.”",
    "The no-diagnosis rule now bans those phrasings by name and requires attributing the pattern to the guides. It cut them down, not out: on launch day a live answer still ended with “you’ve got the right diagnosis.”",
  ],
  [
    "An em dash got through the prompt rule on the first live test.",
    "The server now strips them from the stream, including one split across two chunks.",
  ],
  [
    "Answers ran 200 to 230 words against a 150-word cap.",
    "The cap is a target the model overruns by about a third. The short question getting a short answer mattered more than the number.",
  ],
  [
    "I spent an hour on a browser label that said the request was aborted.",
    "It wasn’t. DevTools marks any stream read through a reader that way. The server was fine the whole time.",
  ],
  [
    "I believed, for about a day, that adding guides would reduce model calls.",
    "It doesn’t. Every real answer is written by the model. More guides move questions from “not sure” to a confident answer. Cost per answered question stays the same.",
  ],
  [
    "The bot-detection challenge failed silently on the live site.",
    "Every message on production came back with “the assistant hit a snag,” and nothing failed on localhost. Vercel’s BotID script was returning 404 because next.config never got the withBotId wrapper. Half a day went to a localhost theory before the launch audit found the missing wrapper. Fixed in PR #23, checked on a preview first.",
  ],
  [
    "Axe found zero accessibility violations on the panel. A code review found one blocker and five serious problems.",
    "The Ask button was mounted twice, so ⌘I opened two stacked drawers. The focus trap leaked on phones. The 10-question limit was silent to screen readers. Fixed in PR #24 and PR #25, then checked by hand with a keyboard at 375px and 320px.",
  ],
];

function WhatFailed() {
  return (
    <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {FAILED.map(([what, fix], i) => (
        <li key={i} className="msrbot-failed-row" style={{
          padding:             "28px 0",
          borderBottom:        i === FAILED.length - 1 ? "none" : `1px solid ${c.border}`,
          display:             "grid",
          gridTemplateColumns: "56px 1fr",
          gap:                 "clamp(20px, 3vw, 40px)",
          alignItems:          "baseline",
        }}>
          <span aria-hidden="true" style={{ ...smallLabel, margin: 0 }}>{String(i + 1).padStart(2, "0")}</span>
          <div>
            <p style={{
              fontFamily:    font.sans,
              fontSize:      "clamp(18px, 2vw, 22px)",
              fontWeight:    500,
              color:         c.ink,
              margin:        "0 0 10px",
              letterSpacing: "-0.01em",
              lineHeight:    1.3,
            }}>{what}</p>
            <p style={{ ...bodyText, lineHeight: 1.6, maxWidth: PROSE_MAX }}>{fix}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------- results ---------- */

const TILES: Array<[string, string, string]> = [
  ["19 of 20", "Covered questions answered with confidence", "The one miss, “do toe spacers do anything,” scored 0.40 and got the not-sure label."],
  ["11 of 12", "Uncovered questions labeled not sure", "The twelfth, athlete’s foot cream, scored 0.58 and got a confident answer from a routine."],
  ["8 of 8", "Off-topic questions declined before the model", "Highest off-topic score: 0.38 on September 21, 0.39 after the guides grew. The floor is 0.40."],
  ["~$0.005", "Cost per answered question", "Off-topic questions never reach the model and cost almost nothing. The 228-passage index cost $0.0018 to build."],
  ["1.2s, then 3s", "Guide named, then first word", "The loading line names the guide at about 1.2 seconds. The first word of the answer lands near 3. One measurement, on a local build."],
  ["17 → 40", "Guides at build start vs. launch", "Eight added September 22 from the calibration gaps. Fifteen more September 23 to 25: a fungus cluster Alfred exposed, and ten from a keyword gap map."],
];

function ResultsTiles() {
  return (
    <>
      <div className="msrbot-results-grid" style={{
        display:             "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap:                 "clamp(24px, 3vw, 40px)",
      }}>
        {TILES.map(([stat, label, detail]) => (
          <div key={label} style={{ padding: "28px 0 0", borderTop: `1px solid ${c.borderStrong}` }}>
            <p style={{
              fontFamily:    font.sans,
              fontSize:      "clamp(28px, 3.4vw, 44px)",
              fontWeight:    500,
              color:         c.ink,
              margin:        "0 0 12px",
              letterSpacing: "-0.02em",
              lineHeight:    1.05,
            }}>{stat}</p>
            <p style={{ ...smallLabel, margin: "0 0 10px" }}>{label}</p>
            <p style={bodyText}>{detail}</p>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: font.sans, fontSize: "var(--text-small)", color: c.muted, margin: "24px 0 0", lineHeight: 1.55 }}>
        Proxy numbers from the calibration set and internal test runs, not live traffic.
      </p>
    </>
  );
}

/* ---------- guardrails ---------- */

const LAYERS: Array<{ layer: string; note: string; items: string[] }> = [
  { layer: "Browser", note: "Before the message leaves the device", items: [
    "Red-flag word search, first thing every message hits",
    "500-character input limit",
  ] },
  { layer: "Edge", note: "Before the route runs", items: [
    "Vercel BotID invisible challenge",
    "Vercel WAF: 10 requests per minute per IP, 40 per 10 minutes",
    "Same-site origin check",
  ] },
  { layer: "Route handler", note: "Before the model is called", items: [
    "HMAC-signed assistant turns, so history cannot be forged mid-conversation",
    "Body-size cap",
    "Red-flag check runs again on the server",
    "10-question limit per conversation",
  ] },
  { layer: "Model", note: "During and after the call", items: [
    "Sees only the last six messages of the conversation",
    "1,024 output tokens",
    "Every real answer is written from the retrieved guide passages only",
  ] },
  { layer: "Workspace", note: "Spend ceilings on the account itself", items: [
    "Anthropic workspace capped at $25 per month, alerts at $10 and $20",
    "Vercel AI Gateway capped at $5 per month",
    "$10 of Gateway credits bought, lifts the free-tier five-per-minute cap",
  ] },
];

function Guardrails() {
  return (
    <div className="msrbot-guardrails-grid" style={{
      display:             "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap:                 "clamp(20px, 2.4vw, 32px)",
      marginTop:           "48px",
    }}>
      {LAYERS.map((col, i) => (
        <div key={col.layer} style={{ borderTop: `1px solid ${c.borderStrong}`, paddingTop: "20px" }}>
          <p style={{ ...smallLabel, margin: "0 0 4px" }}>{String(i + 1).padStart(2, "0")} · {col.layer}</p>
          <p style={{ fontFamily: font.sans, fontSize: "var(--text-small)", color: c.muted, margin: "0 0 16px", lineHeight: 1.45 }}>{col.note}</p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "12px" }}>
            {col.items.map((it) => (
              <li key={it} style={{ ...bodyText, lineHeight: 1.5, paddingLeft: "14px", position: "relative" }}>
                <span aria-hidden="true" style={{ position: "absolute", left: 0, top: "0.7em", width: "6px", height: "1px", background: c.brand }} />
                {it}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ---------- page ---------- */

export default function MSRChatbot() {
  const arcTop: React.CSSProperties = {
    paddingTop:      "clamp(40px, 8vw, 80px)",
    paddingBottom:   "clamp(24px, 4vw, 40px)",
    scrollMarginTop: "140px",
  };

  return (
    <>
      <Nav />
      <CaseStudySchema
        name="Alfred, a foot-health assistant"
        description={DESCRIPTION}
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
        <header style={{ padding: `clamp(56px, 12vw, 120px) ${SECTION_X} clamp(40px, 8vw, 80px)` }}>
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
            <p style={{ fontFamily: font.sans, fontSize: "var(--text-article)", lineHeight: 1.6, color: c.ink, maxWidth: "680px", margin: "0 0 32px" }}>
              A retrieval-grounded assistant on menssolerevival.com that only answers from the site’s own guides. Product design, conversation design, front end, build. Solo, with Claude Code, in four working days.
            </p>
            <p style={{ fontFamily: font.sans, fontSize: "var(--text-article)", lineHeight: 1.5, fontWeight: 500, color: c.ink, maxWidth: "680px", margin: "0 0 32px" }}>
              Every real answer is written by Claude, from the guides only. Red flags stop the conversation. Nothing is stored on the site.
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
                color:          c.link,
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
            width:        "100%",
            background:   "#FFFFFF",
            borderTop:    `1px solid ${c.border}`,
            borderBottom: `1px solid ${c.border}`,
            margin:       "0 0 40px",
          }}
        >
          <ul style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", margin: 0, padding: 0, listStyle: "none" }}>
            {[
              { key: "premise",   label: "Premise"      },
              { key: "how",       label: "How it works" },
              { key: "decisions", label: "Decisions"    },
              { key: "details",   label: "Details"      },
            ].map((arc, i, arr) => (
              <li key={arc.key} style={{ borderRight: i < arr.length - 1 ? `1px solid ${c.border}` : "none" }}>
                <a
                  href={`#arc-${arc.key}`}
                  data-arc-anchor={arc.key}
                  style={{
                    fontFamily:     font.sans,
                    fontSize:       "var(--text-body)",
                    fontWeight:     500,
                    color:          c.ink2,
                    textDecoration: "none",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    padding:        "16px 8px",
                    transition:     "color 0.15s ease, background 0.15s ease",
                  }}
                >
                  {arc.label}
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
          }
          .msrbot-arc-nav a:hover { color: ${c.ink}; background: rgba(15,61,62,0.04); }
          .msrbot-pipe-list { display: none; }
          .msrbot-art-mobile { display: none; }
          @media (max-width: 1000px) {
            .msrbot-pipe-svg  { display: none !important; }
            .msrbot-pipe-list { display: block !important; }
            .msrbot-split     { grid-template-columns: 1fr !important; }
            .msrbot-row       { grid-template-columns: 1fr !important; gap: 28px !important; }
          }
          @media (max-width: 760px) {
            .msrbot-arc-nav { position: fixed !important; left: 0 !important; right: 0 !important; top: 72px !important; }
            .msrbot-arc-nav a { font-size: 12px !important; padding: 12px 4px !important; }
            .msrbot-callout-grid   { grid-template-columns: 1fr !important; gap: 22px !important; }
            .msrbot-results-grid   { grid-template-columns: 1fr !important; gap: 32px !important; }
            .msrbot-failed-row     { grid-template-columns: 40px 1fr !important; gap: 16px !important; }
            .msrbot-meta           { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
            .msrbot-guardrails-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .msrbot-constraint     { grid-template-columns: 1fr !important; gap: 4px !important; }
            .msrbot-reply-part     { grid-template-columns: 1fr !important; gap: 6px !important; }
            .msrbot-pair           { grid-template-columns: minmax(0, 340px) !important; gap: 40px !important; }
            .msrbot-strip          { grid-template-columns: minmax(0, 340px) !important; }
            .msrbot-art-desktop    { display: none !important; }
            .msrbot-art-mobile     { display: block !important; }
          }
          @media (min-width: 761px) and (max-width: 1000px) {
            .msrbot-guardrails-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 40px !important; }
            .msrbot-results-grid    { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>

        {/* ── PREMISE arc ── */}
        <div id="arc-premise" style={{ ...arcTop, marginTop: "24px" }}>
          <Wrap>
            <figure style={{ margin: 0 }}>
              <div className="msrbot-art-desktop" style={frame}>
                <Image
                  src={`${IMG}/hero-answer.png`}
                  alt="A live answer on the Ask page. Alfred’s introduction, the question “What is plantar fasciitis?”, a three-paragraph answer, and the two guides it drew from."
                  width={2880}
                  height={2495}
                  priority
                  sizes="(max-width: 1240px) 100vw, 1240px"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              <div className="msrbot-art-mobile" style={frame}>
                <Image
                  src={`${IMG}/hero-answer-mobile.png`}
                  alt="The Ask page on a phone. Alfred’s introduction, the question “Why does my heel hurt when I get out of bed?”, and the first lines of the answer."
                  width={780}
                  height={1522}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </figure>
          </Wrap>

          <Wrap>
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
              “17 guides. 973 search impressions in 90 days. Five clicks. The library was invisible from the inside and the outside.”
            </p>
            <p style={{ fontFamily: font.sans, fontSize: "var(--text-body)", fontWeight: 500, color: c.muted, margin: "28px 0 0" }}>
              Where the site stood in September 2026
            </p>
          </Wrap>

          <Wrap>
            <Row title="The problem.">
              <P>
                Men’s Sole Revival exists because men over 40 look after everyone but themselves, and their feet come last. By September 2026 the site had 17 guides and 7 routines and almost no one reading them. The guides answer real questions. The problem is that a man whose heel hurts on his first steps out of bed does not know which of 24 articles answers his. Search on the site is keyword search, and Google had not read the sitemap since June.
              </P>
              <Callout
                decision="Ship a front door to the library, not a general AI chatbot."
                why="Every answer is accountable to a guide the reader can open. The model gets no room to invent."
                cost="Anything the guides do not cover gets an honest “that’s outside what I cover,” or a not-sure answer with a question to bring to a clinician."
              />
            </Row>
          </Wrap>

          <Wrap>
            <Row title="The bet.">
              <P mb={24}>
                If a man can describe his foot in his own words, he will reach the right guide, and the assessment, more often than keyword search gets him there. That is the bet. It only counts if the answers stay inside the guides and the red flags never get an answer, so the safety numbers carry as much weight as the conversion one.
              </P>
              <LabelList items={[
                ["Main metric", "Assessments started from Alfred. Not measurable yet: the chat’s link to the assessment carries no source tag, so a start from Alfred looks like any other start. Tagging that link is the first change after launch."],
                ["Answer quality", "The share of answers labeled “not sure,” and thumbs up or down by answer type. Both are tracked today, without message text."],
                ["Safety", "How often red flags fire, by tier. Too often means false alarms on everyday questions. Never means the triggers may have gone quiet. Both happened before launch."],
                ["In two weeks", "If more than one answer in five is “not sure,” the next batch of guides comes before any design work. If red flags fire on more than one conversation in ten, the triggers get another false-alarm review. If fewer than one conversation in twenty reaches the assessment, the assessment becomes the default next step in every answer. Traffic is small, so these are directions, not statistics."],
              ]} />
            </Row>
          </Wrap>

          <Wrap>
            <Row title="The constraints.">
              <P mb={24}>
                Set before the first line of code, because the cost of getting them wrong is not a bad demo. It is a man being told something wrong about his foot, or a bill I did not plan for.
              </P>
              <LabelList items={[
                ["Answers come only from the guides.", "If the guides don’t cover it, Alfred says so. No general medical knowledge from the model."],
                ["It never diagnoses.", "It describes the pattern the guides describe and says what confirms it."],
                ["Red flags stop the conversation.", "Three tiers, from call 911 to see a clinician this week. None of them get an answer."],
                ["Nothing is stored on the site.", "No login, no transcripts, no message text in analytics. Inputs are health data. The text goes to Anthropic for the answer and to Voyage, through Vercel’s AI Gateway, for the search."],
                ["Spend is capped in two places.", "$25 a month on the model, $5 a month on embeddings, plus bot detection and a per-address rate limit."],
                ["WCAG 2.1 AA.", "Screen readers hear the answer once, when it’s done, not token by token."],
                ["Two accounts only.", "Anthropic and Vercel. Voyage’s embedding model runs through Vercel’s AI Gateway, so there is no third account or bill."],
              ]} />
            </Row>
          </Wrap>
        </div>

        {/* ── HOW IT WORKS arc ── */}
        <div id="arc-how" style={arcTop}>
          <Wrap pb={64}>
            <Row title="A message walks one path.">
              <P>
                Cheapest and safest step first. A word search runs in the browser before anything leaves the device. Everything after that runs on the server in a fixed order and ends in one of three outcomes. The model is called at the last step, and only with the guide passages the earlier steps chose.
              </P>
            </Row>
          </Wrap>
          <Wrap pb={80}>
            <PipelineDiagram />
            <PipelineList />
            <p style={{ ...proseStyle, fontSize: "var(--text-body)", margin: "20px 0 0" }}>
              Two thresholds do the work. Below 0.40, decline. At 0.53 and up, answer with confidence. In between, answer from the nearest guide with a “not sure” label and a question to bring to a clinician.
            </p>
          </Wrap>

          <Wrap>
            <Row title="Where the numbers came from.">
              <P>
                I set the two thresholds from one run of 40 test questions on September 21: 20 the guides covered, 12 about feet that no guide covered yet (gout, plantar warts, sprains), and 8 with nothing to do with feet (the best pizza in Portland, a cover letter, a World Series score, a prompt injection). The groups did not separate cleanly. One covered question, “do toe spacers do anything,” scored 0.40. One uncovered question, “what cream works for athlete’s foot,” scored 0.58 because a routine mentioned it. At 0.53, 19 of the 20 covered questions got a confident answer, 11 of the 12 uncovered questions got the “not sure” label, and all 8 off-topic questions were declined before the model was called.
              </P>
              <Callout
                decision="Set the confident line at 0.53 and accept one known leak."
                why="Raising the line above the athlete’s foot question would have pulled covered questions into “not sure” along with it. The leak answered from a real routine, with the routine shown as its source."
                cost="The closest call is off topic. After the guides grew, a question about shoulder pain scored 0.39, just under the 0.40 floor. The bands need a new run every time guides ship."
              />
            </Row>
          </Wrap>
        </div>

        {/* ── DECISIONS arc ── */}
        <div id="arc-decisions" style={arcTop}>

          <Wrap>
            <Row title="A page, not a bubble.">
              <P>
                The floating bottom-right widget reads as sales chat, gets ignored, covers content on phones, and has no URL to link to or to show here. Alfred got a page first, at /ask, so it can be linked, indexed, and read by a screen reader like any other page. Then the same component moved into a side panel. The Ask button in the header, or ⌘I, opens it on every page, the way Vercel and Stripe do it in their docs. The guide footers and the assessment results link to the full page.
              </P>
              <Callout
                decision="Give the assistant its own URL, then bring it to every page."
                why="A URL makes it linkable and indexable. The panel puts it one click from every guide without a floating bubble."
                cost="Two surfaces share one component, and the panel shipped a bug the page never had: the Ask button was mounted twice, so ⌘I opened two stacked drawers. Fixed before launch."
              />
            </Row>
            <figure style={{ margin: "56px 0 0" }}>
              <div className="msrbot-art-desktop" style={frame}>
                <Image
                  src={`${IMG}/panel-desktop.png`}
                  alt="The heel pain guide with Alfred’s side panel open on the right. The panel shows the question “Why does my heel hurt most in the morning?”, a four-paragraph answer, and two source chips: the heel pain guide and the Plantar Stretch Sequence."
                  width={2580}
                  height={3200}
                  sizes="(max-width: 1240px) 100vw, 1240px"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              <div className="msrbot-art-mobile" style={{ ...frame, maxWidth: "340px" }}>
                <Image
                  src={`${IMG}/panel-mobile.png`}
                  alt="Alfred’s side panel on the heel pain guide, with the question, the answer, and two source chips."
                  width={890}
                  height={3170}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              <Caption label="The side panel, live" note="Open on the heel pain guide, answering from that guide and the stretch routine it links to." />
            </figure>
          </Wrap>

          <Wrap>
            <Row title="The first build looked like a contact form.">
              <P>
                Label, box, submit button, fine print, a list of options under it. I built it with form grammar. Chat has a different grammar: the assistant speaks first, your messages sit on the right, suggestions are chips above the composer, the composer is pinned to the bottom and grows as you type, and Send becomes Stop while it is writing. Same state machine underneath, new surface on top. That rebuild took an afternoon and changed what the thing felt like more than anything else I did.
              </P>
              <Callout
                decision="Rebuild the surface once I saw it was a form pretending to be a chat."
                why="The state machine was already right. The affordances were wrong. People read the shape before they read the copy."
                cost="An afternoon, with every state redrawn on the new surface. The state machine underneath did not change."
              />
            </Row>
            <Pair>
              <Shot
                src={`${IMG}/before-form.png`} w={780} h={2250}
                alt="The form version of the Ask page on a phone. A “Your question” label, a text box, an Ask button, a character count, two lines of fine print, and a list of four starter questions under it."
                label="Before, September 22"
                note="A label, a box, an Ask button, fine print, and a list of options under it."
              />
              <Shot
                src={`${IMG}/after-chat.png`} w={780} h={1920}
                alt="The chat version of the Ask page on a phone. Alfred introduces himself first, four starter chips sit above a one-line composer with a send arrow, and one line of fine print."
                label="After"
                note="Alfred speaks first. Suggestions sit above the composer, and the composer is pinned to the bottom."
              />
            </Pair>
          </Wrap>

          <Wrap>
            <Row title="It had rules and no personality.">
              <P>
                The first prompt was eight “never” rules and a banned-word list. That produces careful, flat answers: same template every time, no reaction to what you said, never a question back. The fix was not a mascot. I described the writer it should sound like, quoted four lines from the guides so it could hear the voice, and gave it a reply shape in five parts: a reaction to what he said in one clause, the answer, two or three sentences of why, the one thing that changes it, and the next action. It may ask one clarifying question, and say why, when the answer would change. Below is a real conversation from launch day.
              </P>
              <Callout
                decision="Describe the writer, quote the site’s prose, name the reply shape."
                why="Rules alone teach a model what to avoid, not what to sound like."
                cost="A longer prompt, paid on every call. With the retrieved passages it runs about 3,000 tokens, under the 4,096 that Haiku 4.5 needs before it caches anything, so nothing is cached."
              />
            </Row>
            <div className="msrbot-split" style={{
              display:             "grid",
              gridTemplateColumns: "minmax(0, 340px) minmax(0, 1fr)",
              gap:                 "clamp(32px, 4vw, 64px)",
              alignItems:          "start",
              marginTop:           "56px",
            }}>
              <Shot
                src={`${IMG}/clarify-heel.png`} w={700} h={1710}
                alt="“My heel hurts,” and Alfred’s reply: it names the most common cause after 40, then asks whether the pain hits hardest in the first steps out of bed, behind the heel, or as a constant deep bruise, and says it is asking because the pattern tells you which one."
                label="Turn one"
                note="“My heel hurts” gets one question with three options, and the reason for asking."
              />
              <AnnotatedReply />
            </div>
          </Wrap>

          <Wrap>
            <Row title="The assistant is Alfred.">
              <P>
                He speaks in my voice but never claims my biography. “I’ve dealt with foot problems for years” would be false coming from software, and the line under the composer says the question goes to Claude. “That’s why this site exists” carries the stake without the false first person.
              </P>
              <Callout
                decision="Name the assistant. Use the site’s voice. Never borrow the founder’s life."
                why="A reader who catches software claiming a life story stops trusting the answers too."
                cost="Some warmth is off limits. Alfred can say why the site exists, not what it felt like."
              />
            </Row>
          </Wrap>

          <Wrap>
            <Row title="It errs toward warning.">
              <P>
                Triage runs before retrieval, in the browser and again on the server, and the first match wins. Three tiers shipped: call 911 for chest pain or trouble breathing, see a doctor today, and see a clinician this week. The patterns are self-cited to the ADA Standards of Care, IWGDF 2023, StatPearls, and AAFP. No clinician has reviewed them yet. That sign-off is planned for v1.1. The calibration went wrong in both directions before it landed. On September 25 an audit sent ten emergency messages through triage, and eight got no warning, including “my foot is suddenly cold, pale and numb.” On September 28 the copy review found the opposite: “I can’t stand for long at work because my feet hurt” got “see a doctor today” instead of the standing-all-day guide. The test suite grew from 12 cases to 46 across those passes.
              </P>
              <Callout
                decision="Err toward warning. A missed emergency costs more than a false alarm."
                why="A false alarm costs one conversation. A missed emergency, for a diabetic reader, can cost a foot. Citing the ADA, IWGDF, StatPearls, and AAFP makes the list checkable instead of invented."
                cost="A false alarm ends the conversation, so a man with an everyday question can lose the answer he came for. And until a clinician reviews the list, it rests on my reading of the sources."
              />
            </Row>
            <Pair>
              <Shot
                src={`${IMG}/redflag-911.png`} w={700} h={1440}
                alt="“My feet are swollen and I have chest pain” gets a panel headed “Chest pain or trouble breathing needs care now,” telling him to call 911 now and not to drive himself. Alfred has stopped answering."
                label="Call 911"
                note="Chest pain with swollen feet. The heading and the instruction say the same thing, and Alfred stops answering."
              />
              <Shot
                src={`${IMG}/redflag-week.png`} w={700} h={1710}
                alt="“Foot pain wakes me up at night” gets a panel headed “This is worth a clinician visit this week,” with next steps and a link to the doctor-prep checklist."
                label="This week"
                note="Night pain. Book a podiatrist within days, with the doctor-prep checklist."
              />
            </Pair>
          </Wrap>

          <Wrap>
            <Row title="The wait names the guide.">
              <P>
                Sources are chosen by retrieval, not by the model. The guides listed under an answer come from the similarity scores, at most two, only ones within 0.05 of the best match. Nothing a visitor types can steer which guides get cited. The server opens the stream before it calls the model, so about a second in, the loading line changes from “Reading the guides…” to “Reading Heel Pain First Thing in the Morning…”.
              </P>
              <Callout
                decision="Show the guide name during the wait, not a generic spinner."
                why="The wait is the slowest moment on the page. Naming the guide tells him, before the first word, that the answer comes from something he can read."
                cost="The server has to open the stream before it calls the model. One more piece of state to keep straight."
              />
            </Row>
            <div className="msrbot-strip" style={{
              display:             "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 340px))",
              gap:                 "clamp(20px, 3vw, 40px)",
              marginTop:           "56px",
            }}>
              <Shot src={`${IMG}/loading-1.png`} w={700} h={490} alt="The question, and Alfred’s row reading “Reading the guides…”." label="Sent" note="“Reading the guides…”" />
              <Shot src={`${IMG}/loading-2.png`} w={700} h={490} alt="The same row now reading “Reading Heel Pain First Thing in the Morning…”." label="About a second in" note="It names the guide it is reading." />
              <Shot src={`${IMG}/loading-3.png`} w={700} h={490} alt="The first sentence of Alfred’s answer under the question." label="Near three seconds" note="The first words arrive." />
            </div>
          </Wrap>

          <Wrap>
            <Row title="Guardrails.">
              <P>
                Five layers, cheapest and safest first. Each layer assumes the one before it missed, so no single failure produces a wrong answer or a bill I did not plan for. Below is what runs at each layer, from the browser to the spending ceiling on the account.
              </P>
            </Row>
            <Guardrails />
            <Callout
              decision="Cap the model, cap the account, cap the request rate."
              why="When BotID broke before launch, it failed closed: every message stopped at the edge, nothing reached the model, and nothing was spent. The page was still hidden, so no visitor saw the error. The launch audit found the missing wrapper."
              cost="The caps live in three separate dashboards: the Anthropic console, the AI Gateway budget, and the Vercel firewall. No single place shows all of them."
            />
          </Wrap>
        </div>

        {/* ── DETAILS arc ── */}
        <div id="arc-details" style={arcTop}>
          <Wrap>
            <Row title="Eleven states.">
              <P>
                Each state has its own review URL on preview builds: empty, loading, streaming, answer, not sure, outside what I cover, red flag (three tiers), error, pausing (rate limited), resting (budget spent), and conversation limit. The red-flag screen moves keyboard focus to its heading and stops the conversation. The resting screen exists because a spend cap that fails silently is worse than no cap. The answers and red flags appear above. Two more states are below.
              </P>
            </Row>
            <Pair>
              <Shot
                src={`${IMG}/state-not-sure.png`} w={700} h={1370}
                alt="“How long does it take to heal?” gets a box reading “I’m not sure about this one,” then Alfred asks what he is healing from, lists the guides that cover healing times, and links the doctor-prep checklist."
                label="Not sure"
                note="A vague question gets the label, a question back, and the doctor-prep checklist."
              />
              <Shot
                src={`${IMG}/state-outside.png`} w={700} h={740}
                alt="“What is the best pizza in Portland?” gets “That’s outside what I cover,” a list of what the site does cover, and a link to browse all guides."
                label="Outside what I cover"
                note="Declined before the model is called, with a list of what the site does cover."
              />
            </Pair>
          </Wrap>

          <Wrap>
            <Row title="What failed.">
              <P>Seven things I got wrong before launch, each with the fix that shipped.</P>
            </Row>
            <div style={{ marginTop: "24px" }}>
              <WhatFailed />
            </div>
          </Wrap>

          <Wrap>
            <Row title="What is measured so far.">
              <P>
                Alfred went live September 28. Until two weeks of traffic come in, everything below comes from the September 21 calibration run and internal test runs.
              </P>
            </Row>
            <div style={{ marginTop: "40px" }}>
              <ResultsTiles />
            </div>
          </Wrap>

          <Wrap>
            <Row title="What is next.">
              <P>
                Two weeks of live traffic, read against the bet. Before that, two small changes so the bet can be read at all: a source tag on the chat’s assessment link, and the nearest guide’s name on every “not sure” answer, never the question. Then a clinician review of the red-flag list, which is the gate for v1.1. A stroke tier is already built and tested on a branch, waiting to merge. The loop that produced the fungus guides keeps running: Alfred answered “fungus on my big toe” from the athlete’s foot guide because the site had one thin fungus guide, and five new guides followed.
              </P>
            </Row>
          </Wrap>
        </div>

        {/* Colophon */}
        <Wrap>
          <div className="msrbot-meta" style={{
            display:             "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap:                 "48px",
            borderTop:           `1px solid ${c.border}`,
            paddingTop:          "40px",
          }}>
            <MetaCell label="Role"     value="Product design, conversation design, front end, build. Solo, with Claude Code." />
            <MetaCell label="Timeline" value="Four working days to build (Sep 19 to 22). Six more days to audit and launch. Live Sep 28, 2026." />
            <MetaCell label="Stack"    value="Next.js on Vercel · Claude Haiku 4.5 · Vercel AI Gateway (voyage-4-lite) · BotID · WAF · HMAC-signed turns" />
            <MetaCell label="Live"     value={
              <a href={LIVE_URL} target="_blank" rel="noopener noreferrer"
                 style={{ color: c.accent2, textDecoration: "none", borderBottom: `1px solid ${c.accent}` }}>
                menssolerevival.com/ask
              </a>
            } />
          </div>
        </Wrap>

      </main>
      <ScrollProgress />
      <RelatedCaseStudies current="msr-chatbot" />
      <Footer />
    </>
  );
}
