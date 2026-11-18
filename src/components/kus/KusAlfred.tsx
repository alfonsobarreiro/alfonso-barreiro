import { LinkArrow } from "@/components/ui/LinkArrow";
import { AlfredCardDemo } from "@/components/home/AlfredCardDemo";
import { SlideIn } from "@/components/home/SlideIn";
import { curl } from "@/components/kus/copy";
import { PLATE_MAP } from "@/components/kus/plates";
import { bySlug, eyebrowFor, hrefFor } from "@/lib/work";

/* Alfred, the first band of work (spec 2.4), right after the line.

   Row 1, label then statement: the H2, the mono eyebrow, and the existing
   summary at 40px. (The role line and the arrow note with its drawn arrow
   were cut 2026-11-06 to thin the band; "Own venture" already says solo.)
   Row 2, the demo: on the left third, the stack line one item per line
   (Pumo's stack), "Try it IRL" as the outline pill (a link to
   menssolerevival.com/ask in a new tab; nothing here runs on or deploys
   to the MSR site) and the case-study link. On the right two
   thirds, the recorded demo on its blue plate, sliding in from the right
   (SlideIn, unchanged). The two columns align to the top, so the left
   one reads as one block under the label instead of floating at the
   demo's middle.
   (Row 3, "How Alfred answers", was cut 2026-11-01: the numbers live on
   the case study and the demo's chips already show the three outcomes.)

   The reel opens on Alfred too. There it is the finished product (a
   screenshot of the Ask page); here it is the demo a visitor can play.

   The button and link labels, the stack line and the
   live URL are AlfredBand's existing copy (its COPY is not exported).
   The section clips horizontal overflow for the SlideIn start position. */
const ALFRED = bySlug("msr-chatbot");
const LIVE_URL = "https://www.menssolerevival.com/ask";
const COPY = {
  stack: "Claude Haiku 4.5 · Red-flag triage: 911, today, or this week · WCAG 2.1 AA",
  live:  "Try it IRL",
  study: "Read the case study",
} as const;

export default function KusAlfred() {
  if (!ALFRED) return null;
  const stack = COPY.stack.split(" · ");
  return (
    <section id="alfred" aria-labelledby="alfred-title" className="kus-band kus-alfred">
      <div className="kus-wrap">
        <div className="kus-rule" aria-hidden="true" />
        <div className="kus-band__grid">
          <div className="kus-band__label" data-reveal="">
            {/* Label first, like every band (2026-11-05); the venture line
                moved under it. */}
            <h2 id="alfred-title" className="kus-t-label">{ALFRED.title}</h2>
            <p className="kus-t-mono">{eyebrowFor(ALFRED)}</p>
          </div>
          <div className="kus-band__content" data-reveal="">
            <p className="kus-t-statement" data-spec="DM Sans 600">{curl(ALFRED.summary)}</p>
          </div>
        </div>

        <div className="kus-band__body kus-alfred__row">
          <div className="kus-alfred__aside" data-reveal="draw">
            <p className="kus-t-mono kus-alfred__stack">
              {stack.map((part, i) => (
                <span key={part}>{i > 0 ? <br /> : null}{part}</span>
              ))}
            </p>
            <div className="kus-alfred__actions">
              {/* Outline, not filled: the nav's Resume pill is the page's one
                  filled action (2026-11-06). */}
              <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" className="kus-pill kus-pill--secondary">
                {COPY.live}
                <span className="kus-sr"> (opens menssolerevival.com in a new tab)</span>
              </a>
              <LinkArrow href={hrefFor(ALFRED)}>{COPY.study}</LinkArrow>
            </div>
          </div>

          <SlideIn className="kus-alfred__demo">
            {/* The card chrome without a stretched link: the demo's chips
                are the controls here, and the case study has its own link. */}
            <div className="wcard wcard--wide" data-kus-plate={PLATE_MAP["msr-chatbot"]}>
              <div className="wcard__frame">
                <div className="wcard__screen">
                  <AlfredCardDemo />
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </div>

      <style>{`
        .kus-alfred { overflow-x: clip; }
        .kus-alfred__row {
          display: grid; grid-template-columns: minmax(0, 1fr);
          gap: 32px; align-items: start;
        }
        @media (min-width: 1024px) {
          .kus-alfred__row { grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: var(--kus-gap); }
          .kus-alfred__aside { grid-column: 1 / span 4; }
          .kus-alfred__demo  { grid-column: 5 / span 8; }
        }
        .kus-alfred__actions {
          display: flex; flex-wrap: wrap; align-items: center; gap: 16px 24px;
          margin-top: 32px;
        }
      `}</style>
    </section>
  );
}
