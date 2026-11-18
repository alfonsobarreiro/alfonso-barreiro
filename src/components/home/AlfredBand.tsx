import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { AlfredCardDemo } from "@/components/home/AlfredCardDemo";
import { SlideIn } from "@/components/home/SlideIn";
import { bySlug, eyebrowFor, hrefFor } from "@/lib/work";

/* The first band after the name tag: Alfred, the assistant on Men's Sole
   Revival, in two columns (Alfonso, 2026-10-24: "two columns and slide out
   from the right", with a button and an arrow pointing at the demo).

   Left: what it is, the stack line, an arrow note pointing at the demo,
   and the button that opens the real assistant on menssolerevival.com
   (a link only; nothing here runs on or deploys to the MSR site). Right:
   the recorded demo on its plate, sliding in from the right the first
   time it scrolls into view (SlideIn; in place under reduced motion and
   "Stop the dots"). Below 1024px the columns stack and the arrow turns to
   point down at the demo.

   The section clips horizontal overflow (overflow-x: clip, not on html or
   body, which would break sticky children elsewhere), so the demo's start
   position never adds a sideways scroll. */

const ALFRED = bySlug("msr-chatbot");
const LIVE_URL = "https://www.menssolerevival.com/ask";

/* Draft copy for Alfonso's voice pass. */
const COPY = {
  stack:  "Claude Haiku 4.5 · Red-flag triage: 911, today, or this week · WCAG 2.1 AA",
  arrow:  "See the AI chatbot in action",
  live:   "Try it IRL",
  study:  "Read the case study",
} as const;

export default function AlfredBand() {
  if (!ALFRED) return null;
  return (
    <section id="alfred" aria-labelledby="alfred-title" className="alfred-band">
      <div className="alfred-band__inner">
        <div className="alfred-band__text">
          <Eyebrow style={{ marginBottom: "12px" }}>{eyebrowFor(ALFRED)}</Eyebrow>
          <h2 id="alfred-title" className="alfred-band__title">{ALFRED.title}</h2>
          <p className="alfred-band__deck">{ALFRED.summary}</p>
          <p className="alfred-band__stack">
            {/* Each item stays on one line; the line breaks only between items. */}
            {COPY.stack.split(" · ").map((part, i) => (
              <span key={part}>{i > 0 && " · "}<span style={{ whiteSpace: "nowrap" }}>{part}</span></span>
            ))}
          </p>

          <p className="alfred-band__arrow">
            <span>{COPY.arrow}</span>
            <svg className="alfred-band__arrow-svg" width="72" height="28" viewBox="0 0 72 28" fill="none" aria-hidden="true" focusable="false">
              <path d="M2 18c14-12 34-15 62-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M56 4.5 65 12l-9.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </p>

          <div className="alfred-band__actions">
            <Button href={LIVE_URL} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" style={{ minHeight: "44px" }}>
              {COPY.live}
              <span className="alfred-band__sr"> (opens menssolerevival.com in a new tab)</span>
            </Button>
            <LinkArrow href={hrefFor(ALFRED)}>{COPY.study}</LinkArrow>
          </div>
        </div>

        <SlideIn className="alfred-band__demo">
          {/* The card chrome without a stretched link: the demo's chips are
              the controls here, and the case study has its own link. */}
          <div className="wcard wcard--wide">
            <div className="wcard__frame" style={{ ["--plate" as string]: "var(--color-plate-blue)" }}>
              <div className="wcard__screen">
                <AlfredCardDemo />
              </div>
            </div>
          </div>
        </SlideIn>
      </div>

      <style>{`
        .alfred-band {
          padding: clamp(56px, 7vw, 104px) clamp(24px, 6vw, 80px);
          background: var(--color-paper);
          border-top: 1px solid var(--color-neutral-200);
          overflow-x: clip;
        }
        .alfred-band__inner {
          max-width: var(--content-max);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: clamp(28px, 4vw, 40px);
          align-items: center;
        }
        @media (min-width: 1024px) {
          .alfred-band__inner {
            grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
            gap: clamp(40px, 4.5vw, 72px);
          }
        }
        .alfred-band__title {
          margin: 0;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: clamp(28px, 4.2vw, 60px); font-weight: 500;
          line-height: 1.05; letter-spacing: -0.02em;
          color: var(--color-text);
        }
        .alfred-band__deck {
          margin: 12px 0 0; max-width: 34em;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 17px; line-height: 1.45; color: var(--color-neutral-600);
        }
        .alfred-band__stack {
          margin: 8px 0 0; max-width: 34em;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 15px; line-height: 1.5; color: var(--color-neutral-700);
        }
        .alfred-band__arrow {
          display: flex; align-items: center; gap: 10px;
          margin: clamp(24px, 3vw, 36px) 0 0;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: var(--text-h3); font-weight: 500; line-height: 1.3;
          color: var(--color-terracotta-700);
        }
        .alfred-band__arrow-svg { flex: none; }
        .alfred-band__arrow > span { text-wrap: balance; }
        /* Stacked: the arrow note moves under the buttons so it points down
           at the demo, not at the case-study link. */
        @media (max-width: 1023px) {
          .alfred-band__text { display: flex; flex-direction: column; align-items: flex-start; }
          .alfred-band__arrow { order: 2; margin-top: 24px; }
          .alfred-band__actions { order: 1; }
          .alfred-band__arrow-svg { transform: rotate(90deg) translateX(10px); transform-origin: center; }
        }
        .alfred-band__actions {
          display: flex; flex-wrap: wrap; align-items: center; gap: 16px 28px;
          margin-top: 20px;
        }
        .alfred-band__sr {
          position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
          overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
        }
        @media (forced-colors: active) { .alfred-band__arrow { color: LinkText; } }
      `}</style>
    </section>
  );
}
