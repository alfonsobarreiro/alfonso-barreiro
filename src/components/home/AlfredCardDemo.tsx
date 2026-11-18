"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";

/* AlfredCardDemo: the recorded Alfred demo, shown in the homepage's
   Alfred band (AlfredBand, right column). Alfred's opening line and three starter chips sit in
   the card frame. A chip plays back what the live Ask page does with that
   question, from recorded copy: nothing is typed, nothing is sent, and none
   of the red-flag classifier is copied here.

   Every visitor-facing string from Alfred is lifted from the MSR repo
   (components/chat/copy.ts and the review fixtures in components/chat/
   preview.ts) or from the case study. Only the chip labels for the pizza
   and chest-pain questions, the demo bar line, and the footnote are new.

   The three playbacks mirror the real flows:
   - Heel pain: "Reading the guides…", then "Reading <first source>…", then
     the answer streams in and its guide chips appear. Trimmed to the
     answer's first paragraph.
   - Pizza: "Reading the guides…", then "That's outside what I cover." The
     live site declines below 0.40 similarity before the model is called,
     so no guide is ever named.
   - Chest pain: the 911 panel shows at once. On the live site triage runs
     in the browser before retrieval, and focus moves to the panel heading.

   Size: 16:10 is too short for any of these states at every card width,
   so the frame is released to this wrapper's height (see the :has rule in
   CSS below). Every state is stacked in one grid cell, so the frame is as
   tall as the tallest state at that width and never changes height when
   the state changes. Wide single-column cards keep a 16:10 minimum.

   Layering: the card's title link stretches over the card at z-index 1.
   The whole demo carries .wcard__control (z-index 2), so the frame works
   as its own small app: a tap inside it never opens the case study by
   accident. That matters because a chip hides the moment it is pressed,
   and a quick second tap on the same spot would otherwise land on the
   stretched link. Its text can be selected, the cursor stays an arrow,
   and the title, summary, and "Read the case study" still open the piece.

   Screen readers: loading lines are aria-hidden, the streamed text is
   aria-hidden until it is complete, and one polite status line says
   "Answer ready." with the answer. The red flag moves focus to its
   heading, as on the live site. Reduced motion: no pulse, and the answer
   appears at once. */

/* ── Recorded copy ─────────────────────────────────────────────────────── */

const OPENING =
  "Men over 40 look after everyone but themselves, and their feet come last. That’s why this site exists. I’m Alfred. I answer from its guides and nothing else, I link the one I used, and I won’t diagnose you. If something needs a doctor, I’ll say so. What’s going on with your feet?";

const LOADING = "Reading the guides…";
const loadingGuide = (title: string) => `Reading ${title}…`;
const ANSWER_READY = "Answer ready.";

/* First paragraph of the fixed heel-pain answer in preview.ts. */
const HEEL_ANSWER =
  "Sharp heel pain in your first few steps that eases within minutes is the classic pattern of plantar fasciitis. The band of tissue under your foot tightens overnight, and those first steps stretch it before it has warmed up.";
const HEEL_SOURCES = ["Heel Pain First Thing in the Morning", "Plantar Fasciitis Exercises for Men Over 40"];
const HEEL_WORDS = HEEL_ANSWER.split(" ");

const OUT_OF_SCOPE = {
  heading: "That’s outside what I cover",
  body: "I can help with pain anywhere in the foot or ankle, toes and toenails (including fungus), skin problems, swelling, circulation, numbness, shoe fit, and daily foot care.",
};

const EMERGENCY = {
  heading: "Chest pain or trouble breathing needs care now",
  urgent:
    "Call 911 now if it’s happening now, came on suddenly, or comes with sweating, nausea, or pain spreading to your arm, jaw, or back. Don’t drive yourself. If it has been building over days or weeks, see a doctor today.",
  stopped: "Alfred has stopped answering in this conversation.",
};

type Kind = "answer" | "scope" | "redflag";

const STARTERS: Array<{ kind: Kind; label: string; question: string }> = [
  { kind: "answer",  label: "Heel pain in the morning",   question: "Why does my heel hurt when I get out of bed?" },
  { kind: "scope",   label: "Best pizza in Portland",     question: "What is the best pizza in Portland?" },
  { kind: "redflag", label: "Swollen feet and chest pain", question: "My feet are swollen and I have chest pain" },
];

/* ── Demo copy (drafts for Alfonso) ────────────────────────────────────── */

const DEMO = {
  group: "Alfred demo with recorded answers",
  bar: "Recorded answers. Nothing is sent.",
  reset: "New conversation",
  footnote: "Recorded answer, first paragraph.",
  caseStudy: "Read the case study",
  you: "You: ",
  starters: "Example questions",
  sources: "From the guides",
};

/* ── Timing ─────────────────────────────────────────────────────────────
   The live page names the guide about 1.2s in and the first word lands
   near 3s. The playback keeps the order and shortens the waits. */
const READING_MS = 1000;
const GUIDE_MS   = 1100;
const WORD_MS    = 38;

type Phase = "reading" | "guide" | "streaming" | "done";

export function AlfredCardDemo({ caseStudyHref = "/work/msr-chatbot" }: { caseStudyHref?: string }) {
  const [pick, setPick] = useState<Kind | null>(null);
  const [phase, setPhase] = useState<Phase>("done");
  const [shown, setShown] = useState(0);

  const reduced = useRef(false);
  const lastPick = useRef<Kind>("answer");
  const focusNext = useRef<"reset" | "flag" | "chip" | null>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const flagRef = useRef<HTMLParagraphElement>(null);
  const chipRefs = useRef<Partial<Record<Kind, HTMLButtonElement | null>>>({});

  const uid = useId();
  const flagHeadingId = `${uid}-flag`;
  const flagUrgentId = `${uid}-urgent`;
  const sourcesId = `${uid}-sources`;

  /* Playback clock. Each phase schedules the next one; reset or unmount
     clears the pending timer. */
  useEffect(() => {
    if (!pick) return;
    let t: number | undefined;
    if (phase === "reading") {
      t = window.setTimeout(() => setPhase(pick === "answer" ? "guide" : "done"), READING_MS);
    } else if (phase === "guide") {
      t = window.setTimeout(() => {
        if (reduced.current) {
          setShown(HEEL_WORDS.length);
          setPhase("done");
        } else {
          setShown(1);
          setPhase("streaming");
        }
      }, GUIDE_MS);
    } else if (phase === "streaming") {
      t = window.setTimeout(() => {
        if (shown + 1 >= HEEL_WORDS.length) {
          setShown(HEEL_WORDS.length);
          setPhase("done");
        } else {
          setShown(shown + 1);
        }
      }, WORD_MS);
    }
    return () => window.clearTimeout(t);
  }, [pick, phase, shown]);

  /* Focus follows the content: the chip that was pressed disappears, so
     focus goes to the reset button (or to the red-flag heading, as on the
     live site); reset hands focus back to the chip that was picked. */
  useEffect(() => {
    const target = focusNext.current;
    if (!target) return;
    focusNext.current = null;
    const el =
      target === "flag" ? flagRef.current
      : target === "reset" ? resetRef.current
      : chipRefs.current[lastPick.current];
    el?.focus({ preventScroll: true });
  }, [pick]);

  const start = (kind: Kind) => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lastPick.current = kind;
    focusNext.current = kind === "redflag" ? "flag" : "reset";
    setShown(0);
    setPhase(kind === "redflag" ? "done" : "reading");
    setPick(kind);
  };

  const reset = () => {
    focusNext.current = "chip";
    setPick(null);
    setPhase("done");
    setShown(0);
  };

  const loading = phase === "reading" || phase === "guide";
  const done = phase === "done";

  /* One polite announcement per playback, once the reply is complete. */
  const status =
    pick === "answer" && done ? `${ANSWER_READY} ${HEEL_ANSWER}`
    : pick === "scope" && done ? `${OUT_OF_SCOPE.heading}. ${OUT_OF_SCOPE.body}`
    : "";

  return (
    <div className="acard wcard__control" role="group" aria-label={DEMO.group}>
      <style>{CSS}</style>

      <div className="acard__bar">
        <p className="acard__note">{DEMO.bar}</p>
        <button
          ref={resetRef}
          type="button"
          className="acard__reset wcard__control"
          onClick={reset}
          data-on={pick ? "true" : "false"}
        >
          {DEMO.reset}
        </button>
      </div>

      <p role="status" className="acard__sr">{status}</p>

      <div className="acard__stage">
        {/* Idle: the opening line and the starters. */}
        <div className="acard__panel" data-on={pick === null ? "true" : "false"}>
          <Who />
          <p className="acard__text">{OPENING}</p>
          <ul className="acard__chips" aria-label={DEMO.starters}>
            {STARTERS.map((s) => (
              <li key={s.kind}>
                <button
                  ref={(el) => { chipRefs.current[s.kind] = el; }}
                  type="button"
                  className="acard__chip wcard__control"
                  onClick={() => start(s.kind)}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Heel pain: loading lines, then the streamed answer and its guides. */}
        <div className="acard__panel" data-on={pick === "answer" ? "true" : "false"} aria-busy={pick === "answer" && !done}>
          <You text={STARTERS[0].question} />
          <Who />
          <div className="acard__slot">
            <Loading on={pick === "answer" && loading} text={phase === "guide" ? loadingGuide(HEEL_SOURCES[0]) : LOADING} />
            <div className="acard__reply" data-on={pick === "answer" && !loading ? "true" : "false"}>
              <p className="acard__text" aria-hidden={!done}>
                {HEEL_WORDS.map((w, i) => (
                  <span key={i}>
                    {i > 0 && " "}
                    <span className="acard__word" data-on={i < shown ? "true" : "false"}>
                      {w}
                      {phase === "streaming" && i === shown - 1 && <span className="acard__cursor" aria-hidden="true" />}
                    </span>
                  </span>
                ))}
              </p>
              <div className="acard__after" data-on={done ? "true" : "false"}>
                <p id={sourcesId} className="acard__label">{DEMO.sources}</p>
                <ul className="acard__sources" aria-labelledby={sourcesId}>
                  {HEEL_SOURCES.map((title) => (
                    <li key={title} className="acard__source">{title}</li>
                  ))}
                </ul>
                <p className="acard__foot">
                  {DEMO.footnote}{" "}
                  <Link
                    href={caseStudyHref}
                    className="acard__link wcard__control"
                  >
                    {DEMO.caseStudy}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pizza: one loading line, then the out-of-scope reply. */}
        <div className="acard__panel" data-on={pick === "scope" ? "true" : "false"} aria-busy={pick === "scope" && !done}>
          <You text={STARTERS[1].question} />
          <Who />
          <div className="acard__slot">
            <Loading on={pick === "scope" && loading} text={LOADING} />
            <div className="acard__reply" data-on={pick === "scope" && done ? "true" : "false"}>
              <div className="acard__box">
                <p className="acard__head">{OUT_OF_SCOPE.heading}</p>
                <p className="acard__text acard__text--muted">{OUT_OF_SCOPE.body}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chest pain: the 911 panel at once, and no answer. */}
        <div className="acard__panel" data-on={pick === "redflag" ? "true" : "false"}>
          <You text={STARTERS[2].question} />
          <div className="acard__flag">
            <p
              id={flagHeadingId}
              ref={flagRef}
              tabIndex={-1}
              aria-describedby={flagUrgentId}
              className="acard__head acard__head--flag"
            >
              {EMERGENCY.heading}
            </p>
            <p id={flagUrgentId} className="acard__text">{EMERGENCY.urgent}</p>
            <p className="acard__label acard__label--stopped">{EMERGENCY.stopped}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Rows ──────────────────────────────────────────────────────────────── */

function Who() {
  return (
    <p className="acard__who">
      <Shield />
      Alfred
    </p>
  );
}

function You({ text }: { text: string }) {
  return (
    <p className="acard__you">
      <span className="acard__sr">{DEMO.you}</span>
      {text}
    </p>
  );
}

function Loading({ on, text }: { on: boolean; text: string }) {
  return (
    <p className="acard__loading" data-on={on ? "true" : "false"} aria-hidden="true">
      <span className="acard__dot" />
      {text}
    </p>
  );
}

/* Alfred's mark from the MSR repo (components/chat/AlfredMark.tsx), the
   shield in currentColor with the foot in white. Ink here, not the MSR
   accent, so the card adds no second accent to the page. */
function Shield() {
  return (
    <svg viewBox="0 0 96 121" className="acard__shield" aria-hidden="true" focusable="false">
      <path d="M51.515 1.89465C50.7297 1.46955 48.6558 0.172833 47.9593 0C37.2204 5.86331 27.442 10.3384 15.5358 13.5917C10.4382 14.9848 6.03076 15.851 0.933194 16.9542C-2.14203 44.7136 1.94213 76.1954 19.8195 98.6427C27.1802 107.885 37.1556 115.912 47.974 120.751C49.7863 120.1 53.33 118.104 55.0218 117.107C66.7162 110.174 76.4099 100.328 83.1558 88.5315L87.9556 78.5477C89.4709 74.9964 90.9657 70.032 91.9696 66.3129C96.3986 49.903 96.7152 33.7784 95.1269 16.9778C93.7294 16.6766 92.3262 16.4018 90.9249 16.117C77.1307 13.3128 63.8922 8.59478 51.515 1.89465Z" fill="currentColor" />
      <path d="M41.0698 15.4904C41.5972 15.4106 42.3045 15.4229 42.9626 15.4344H42.965C43.2933 15.4402 43.6091 15.4458 43.884 15.4395C48.7329 15.3275 52.642 16.4897 57.1798 17.9371C55.845 21.395 54.2283 25.0056 52.7558 28.4187C52.6925 28.5655 52.6296 28.7113 52.5668 28.8563L52.5663 28.8576C50.1076 34.5508 48.2095 38.9466 49.4895 45.4025C49.9165 47.4858 50.556 49.5202 51.3975 51.4734C53.1082 55.5304 55.4957 59.3904 57.5897 63.2776C59.1458 66.1227 60.4912 69.1608 62.3359 71.8184C64.7178 75.2502 66.9649 75.5528 70.8135 76.1739C71.8742 76.345 73.1988 76.9273 74.3293 77.0821C74.8429 77.1524 75.3693 77.1803 75.8965 77.2081C77.26 77.2801 78.628 77.3524 79.7891 78.1626C80.4377 78.6212 80.8369 79.2551 80.9716 80.0301C81.2084 81.3933 81.0053 82.9893 80.1269 84.0972C77.7947 87.0387 73.6578 87.3833 70.1967 86.8886C68.9988 86.7172 67.6386 86.4758 66.4798 86.3851C65.8971 86.3398 64.639 86.5498 63.8208 86.6864C63.6746 86.7109 63.5422 86.7329 63.4305 86.7507C60.1465 87.198 57.0113 87.1585 53.8789 86.0012C48.2789 83.932 45.2983 78.6964 41.3538 74.6187C39.1966 72.3888 36.6335 70.5176 33.9715 68.9383C32.17 67.8818 30.3116 66.9249 28.4049 66.0723C22.6246 63.4489 15.266 61.2376 14.7315 53.729C14.3559 48.4504 17.29 45.3567 20.3636 42.1161C21.812 40.5888 23.2917 39.0287 24.4703 37.1921C27.3661 32.6791 29.0905 27.1149 30.3386 21.9327C30.6242 20.7469 31.0715 18.9577 31.1093 17.746C34.7844 16.1213 37.1345 15.7148 41.0698 15.4904Z" fill="#FFFFFF" />
      <path d="M35.6068 26.3997C35.8746 27.7111 33.8359 33.137 33.2332 34.5286C32.8314 35.4566 32.3189 36.3886 31.809 37.3159C29.796 40.9772 27.8236 44.5646 32.8558 47.5409C31.9822 47.431 31.5705 47.3653 30.7293 47.1164C25.326 44.7869 27.4927 40.108 30.2269 36.6757C32.6833 33.5924 34.1211 29.9886 35.6068 26.3997Z" fill="currentColor" />
      <path d="M69.3041 78.1881C71.7074 77.9762 74.4752 78.0201 75.8191 80.3974C75.1869 80.1741 74.4575 79.6166 73.6532 79.3654C72.3843 78.969 70.4519 78.7461 69.3041 78.1881Z" fill="currentColor" />
    </svg>
  );
}

/* ── Styles ──────────────────────────────────────────────────────────────
   Type: DM Sans 400/500. Body copy in the frame is 12px on multi-column
   grids, where the card is narrow, and 15px on phones, where the card is
   full width. Labels, chips, and buttons are 12px everywhere. Colors are
   ink and neutrals on a white card inside the blue plate: the card adds
   no accent. */
const CSS = `
.wcard__screen:has(> .acard) { aspect-ratio: auto; }
.wcard__frame:has(.acard)::before { content: none; }
/* The blue plate shows as a margin around a white card: the demo's 12px
   and 15px text needs paper under it to pass AA (white on the blue plate
   would not hold small text). */
.wcard__frame:has(.acard) { padding: clamp(12px, 2vw, 24px); }
.acard {
  --acard-body: var(--text-small);
  --acard-pad: 14px;
  position: relative;
  display: flex; flex-direction: column;
  aspect-ratio: 16 / 10;
  border-radius: var(--radius-panel);
  background: var(--color-paper);
  font-family: var(--font-dm-sans), sans-serif;
  color: var(--color-text);
  text-align: left;
}
@media (max-width: 639px) { .acard { --acard-body: var(--text-body); } }
/* Full row: every panel already shares one grid cell, so the card takes the tallest panel's height instead of 16:10. */
.wcard--wide .acard { --acard-body: var(--text-body); --acard-pad: clamp(20px, 3vw, 40px); aspect-ratio: auto; }
@supports not selector(:has(*)) {
  .acard { position: absolute; inset: 0; aspect-ratio: auto; overflow-y: auto; }
}
.acard ul { list-style: none; }
.acard__sr {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}

.acard__bar {
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
  min-height: 44px; padding: 0 4px 0 var(--acard-pad);
  border-bottom: 1px solid var(--color-neutral-200);
}
.acard__note { font-size: var(--text-small); line-height: 1.4; color: var(--color-neutral-600); text-wrap: balance; }
.acard__reset {
  flex: none; min-height: 44px; padding: 0 10px;
  border: 0; background: none; cursor: pointer;
  font-family: inherit; font-size: var(--text-small); font-weight: 500; color: var(--color-text);
  text-decoration: underline; text-decoration-color: transparent; text-underline-offset: 3px;
  transition: text-decoration-color 0.15s ease;
}
.acard__reset:hover { text-decoration-color: currentColor; }
.acard__reset:focus-visible { outline: 2px solid var(--color-focus-ring); outline-offset: -4px; }
.acard__reset[data-on="false"] { display: none; }

.acard__stage { display: grid; flex: 1; padding: var(--acard-pad); }
.acard__stage > .acard__panel { grid-area: 1 / 1; min-width: 0; display: flex; flex-direction: column; gap: 10px; }
.acard__panel[data-on="false"] { visibility: hidden; }

.acard__who {
  display: flex; align-items: center; gap: 6px;
  font-size: var(--text-small); font-weight: 500; line-height: 1.4; color: var(--color-neutral-600);
}
.acard__shield { width: auto; height: 16px; color: var(--color-text); flex: none; }
.acard__text { font-size: var(--acard-body); line-height: 1.5; color: var(--color-text); }
.acard__who + .acard__text, .acard__who + .acard__slot { margin-top: -4px; }
.acard__text--muted { color: var(--color-neutral-700); }

.acard__chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 2px; }
.acard__chip {
  display: inline-flex; align-items: center; min-height: 44px; padding: 0 10px;
  border: 1px solid var(--color-neutral-400); border-radius: var(--radius-chip); background: var(--color-paper); cursor: pointer;
  font-family: inherit; font-size: var(--text-small); font-weight: 500; line-height: 1.3;
  color: var(--color-neutral-700); text-align: left;
  transition: border-color 0.2s ease, color 0.2s ease;
}
.acard__chip:hover { border-color: var(--color-text); color: var(--color-text); }
.acard__chip:focus-visible { outline: 2px solid var(--color-focus-ring); outline-offset: 2px; }
/* The reset and the chips also take focus from script (after a pick and
   after a reset). Touch browsers can paint :focus-visible on that, so the
   ring follows the site's keyboard flag, as the mobile menu does. */
body:not([data-keyboard-nav]) .acard__reset:focus-visible,
body:not([data-keyboard-nav]) .acard__chip:focus-visible { outline: none; }

.acard__you {
  align-self: flex-end; max-width: 85%;
  padding: 7px 12px; border-radius: var(--radius-chip); background: var(--color-neutral-100);
  font-size: var(--acard-body); line-height: 1.5; color: var(--color-text);
}

.acard__slot { display: grid; }
.acard__slot > * { grid-area: 1 / 1; min-width: 0; }
.acard__reply[data-on="false"], .acard__loading[data-on="false"], .acard__after[data-on="false"] { visibility: hidden; }
.acard__loading {
  display: flex; align-items: center; gap: 8px; align-self: start;
  font-size: var(--acard-body); line-height: 1.5; color: var(--color-neutral-600);
}
.acard__dot { width: 6px; height: 6px; border-radius: 50%; background: var(--color-text); flex: none; }
.acard__loading[data-on="true"] .acard__dot { animation: acard-pulse 1s ease-in-out infinite alternate; }
@keyframes acard-pulse { from { opacity: 1; } to { opacity: 0.25; } }

.acard__word { position: relative; }
.acard__word[data-on="false"] { visibility: hidden; }
.acard__cursor {
  position: absolute; left: calc(100% + 2px); top: 0.2em; width: 0.45em; height: 1em;
  background: var(--color-text); animation: acard-blink 0.8s steps(2, start) infinite;
}
@keyframes acard-blink { to { visibility: hidden; } }

.acard__after { display: flex; flex-direction: column; gap: 6px; margin-top: 10px; }
.acard__label { font-size: var(--text-small); font-weight: 500; line-height: 1.4; color: var(--color-neutral-600); }
.acard__sources { display: flex; flex-wrap: wrap; gap: 6px; }
.acard__source {
  padding: 4px 8px; border: 1px solid var(--color-neutral-300); border-radius: var(--radius-chip); background: var(--color-neutral-100);
  font-size: var(--text-small); font-weight: 500; line-height: 1.4; color: var(--color-neutral-700);
}
.acard__foot { margin-top: 4px; font-size: var(--text-small); line-height: 1.5; color: var(--color-neutral-600); }
.acard__link {
  font-weight: 500; color: var(--color-text-link);
  text-decoration: underline; text-underline-offset: 3px;
}
.acard__link::after { content: ""; position: absolute; inset: -14px -4px; }
.acard__link:hover { color: var(--color-text-link-hover); }
.acard__link:focus-visible { outline: 2px solid var(--color-focus-ring); outline-offset: 2px; }

.acard__box { border: 1px solid var(--color-neutral-300); border-radius: var(--radius-chip); background: var(--color-neutral-100); padding: 10px 12px; display: flex; flex-direction: column; gap: 4px; }
.acard__head { font-size: var(--text-body); font-weight: 500; line-height: 1.35; color: var(--color-text); }
.acard__flag {
  border-left: 3px solid var(--color-text); border-radius: 0 var(--radius-chip) var(--radius-chip) 0; background: var(--color-neutral-100);
  padding: 10px 12px; display: flex; flex-direction: column; gap: 6px;
}
.acard__head--flag:focus { outline: none; }
.acard__label--stopped { font-weight: 400; }

@media (prefers-reduced-motion: reduce) {
  .acard__loading[data-on="true"] .acard__dot, .acard__cursor { animation: none; }
  .acard__chip, .acard__reset { transition: none; }
}
`;
