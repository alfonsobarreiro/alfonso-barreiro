"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

/* Logos band: one size slider for the whole band, and a logo in each card
   that redraws at that size the way a responsive logo system does. Large
   sizes show the full lockup. Below its own threshold each mark swaps to
   its compact form, cut from the same art (a monogram crop or the client's
   own logomark file), never redrawn.

   No shared React state. LogoSizerControl writes two things onto its
   closest <section>: the --logo-size custom property (for the height) and
   data-logo-size (for the swap, since CSS cannot compare lengths). Every
   LogoMarkMedia in that section reads both through plain CSS, so the cards
   stay free of client state and resize together.

   Size means the height of the logo's ink. Wide lockups also stop at the
   width of the card frame, so at the top stops they fill the frame instead
   of growing past it.

   Thresholds: a lockup holds until its smallest type drops under about
   6px tall. The two small wordmarks (Sky Valley's service line and the
   letterspaced BeCourageous) give out first, between 96 and 64. The MSR
   wordmark goes between 32 and 24, nQ's stacked "zebra works" between 24
   and 16. The Alpha Beta Design lockup still reads at 16px (it runs at
   that size in the studio's mobile nav), so it switches at 16 for a
   different reason: 16px is favicon size, and the studio uses the mark
   alone there.

   Art lives in public/images/work/logos/marks/, trimmed to the ink so the
   slider value is the logo's real height. The Alpha Beta Design lockup is
   a capture of the nav lockup on alphabeta.design; the MSR lockup is the
   MSR site's lockups/nav-light.svg rasterized.

   The media is aria-hidden. Each card's title link names the piece, and
   the slider's description says what moving it does. */

export const LOGO_STOPS = [16, 24, 32, 48, 64, 96, 160] as const;
export type LogoStop = (typeof LOGO_STOPS)[number];
const DEFAULT_SIZE: LogoStop = 96;

type Mark = {
  full: string;
  compact?: string;
  /** The full lockup shows at this size and up; smaller stops show the compact form. */
  fullFrom?: LogoStop;
};

const DIR = "/images/work/logos/marks";

const MARKS: Record<string, Mark> = {
  "sky-valley-comm": {
    full:     `${DIR}/sky-valley-comm-full.png`,
    compact:  `${DIR}/sky-valley-comm-compact.png`,
    fullFrom: 96,
  },
  "nq-zebraworks": {
    full:     `${DIR}/nq-zebraworks-full.png`,
    compact:  `${DIR}/nq-zebraworks-compact.png`,
    fullFrom: 24,
  },
  "becourageous-leadership": {
    full:     `${DIR}/becourageous-leadership-full.png`,
    compact:  `${DIR}/becourageous-leadership-compact.png`,
    fullFrom: 96,
  },
  "alpha-beta-mark": {
    full:     `${DIR}/alpha-beta-mark-full.png`,
    compact:  `${DIR}/alpha-beta-mark-compact.png`,
    fullFrom: 24,
  },
  "mens-sole-revival-shield": {
    full:     `${DIR}/mens-sole-revival-shield-full.png`,
    compact:  `${DIR}/mens-sole-revival-shield-compact.png`,
    fullFrom: 32,
  },
};

/* One selector per (stop, threshold) pair where the stop sits below the
   threshold, so any mark can switch at any stop without new CSS. */
const SWAP_SELECTORS = LOGO_STOPS.flatMap((threshold) =>
  LOGO_STOPS.filter((s) => s < threshold).map(
    (s) => `[data-logo-size="${s}"] .lmark[data-full-from="${threshold}"]`,
  ),
).join(",\n");

/* No box: the band runs bare (data-plate="bare"), so each mark sits on the
   page, on the card's left rail and on a shared baseline just above the
   card's eyebrow. The stage is a fixed 176px, tall enough for the largest
   stop, so dragging the slider never moves the grid. */
const MEDIA_CSS = `
.wcard__screen:has(> .lmark) { aspect-ratio: auto; height: 176px; }
.lmark {
  position: absolute; inset: 0;
  display: grid; grid-template: minmax(0, 1fr) / minmax(0, 1fr); place-items: end start;
}
.lmark__form {
  grid-area: 1 / 1; position: relative;
  width: 100%; height: var(--logo-size, ${DEFAULT_SIZE}px); max-height: 100%;
  transition: height 0.3s ease, opacity 0.2s ease;
}
.lmark__form--full { opacity: var(--lmark-full, 1); }
.lmark__form--compact { opacity: var(--lmark-compact, 0); }
${SWAP_SELECTORS} { --lmark-full: 0; --lmark-compact: 1; }
@media (prefers-reduced-motion: reduce) { .lmark__form { transition: none; } }
`;

const SIZES = "(max-width: 639px) calc(100vw - 48px), 640px";

function Form({ src, kind }: { src: string; kind: "full" | "compact" }) {
  return (
    <div className={`lmark__form lmark__form--${kind}`}>
      <Image src={src} alt="" fill sizes={SIZES} style={{ objectFit: "contain", objectPosition: "left bottom" }} />
    </div>
  );
}

/** Card media for the five logo slugs. Unknown slugs render nothing, so the
    card falls back to its cover image. */
export function LogoMarkMedia({ slug }: { slug: string }) {
  const mark = MARKS[slug];
  if (!mark) return null;
  return (
    <>
      <style href="logo-mark-media" precedence="default">{MEDIA_CSS}</style>
      <div
        className="lmark"
        data-full-from={mark.compact ? mark.fullFrom : undefined}
        aria-hidden="true"
      >
        <Form src={mark.full} kind="full" />
        {mark.compact && <Form src={mark.compact} kind="compact" />}
      </div>
    </>
  );
}

/* ── Control ──────────────────────────────────────────────────────────────

   One row: label, slider, readout. The row is sticky under the fixed site
   nav (72px) for as long as the band's grid is on screen, so on a phone,
   where the five cards stack into one long column, the slider stays in
   reach while you scroll to the card you want to watch. The hint under it
   scrolls away normally. The bar's background defaults to paper, the
   untinted band ground; set --lsz-bg on the section for a tinted band.

   Range input on stop indexes (0 to 6), so arrow keys, Home, End, and a
   drag all snap to a stop. The readout is aria-hidden because the input's
   aria-valuetext already says the same thing to a screen reader. */

const THUMB = 22; // px; the fill and the ticks line up with its center
const NAV_H = 72; // px; the fixed site nav (src/components/Nav.tsx)

const CONTROL_CSS = `
.lsz {
  position: sticky; top: ${NAV_H}px; z-index: 3;
  container-type: scroll-state;
  margin: 0; font-family: var(--font-dm-sans), sans-serif;
}
.lsz__bar {
  background: var(--lsz-bg, var(--color-paper));
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}
@container scroll-state(stuck: top) { .lsz__bar { border-bottom-color: var(--color-neutral-200); } }
.lsz__row { display: flex; align-items: center; gap: 16px; max-width: 480px; padding: 6px 0; }
.lsz__label { flex: none; font-size: var(--text-body); font-weight: 500; line-height: 1.4; color: var(--color-text); }
.lsz__out {
  flex: none; min-width: 3.4em; text-align: right;
  font-size: var(--text-body); font-weight: 400; line-height: 1.4; color: var(--color-neutral-700);
  font-variant-numeric: tabular-nums; white-space: nowrap;
}
.lsz__track { position: relative; flex: 1 1 auto; min-width: 0; height: 44px; }
.lsz__input {
  -webkit-appearance: none; appearance: none;
  position: relative; z-index: 1;
  display: block; width: 100%; height: 44px; margin: 0; padding: 0;
  background: transparent; cursor: pointer; touch-action: pan-y;
  --lsz-at: calc(${THUMB / 2}px + var(--lsz-p, 0) * (100% - ${THUMB}px));
}
.lsz__input:focus { outline: none; }
.lsz__input::-webkit-slider-runnable-track {
  height: 2px; border: 0;
  background: linear-gradient(to right, var(--color-text) var(--lsz-at), var(--color-neutral-400) var(--lsz-at));
}
.lsz__input::-moz-range-track {
  height: 2px; border: 0;
  background: linear-gradient(to right, var(--color-text) var(--lsz-at), var(--color-neutral-400) var(--lsz-at));
}
.lsz__input::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none;
  width: ${THUMB}px; height: ${THUMB}px; margin-top: -${THUMB / 2 - 1}px;
  border: 0; border-radius: 50%; background: var(--color-text);
}
.lsz__input::-moz-range-thumb {
  width: ${THUMB}px; height: ${THUMB}px;
  border: 0; border-radius: 50%; background: var(--color-text);
}
.lsz__input:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 3px var(--color-paper), 0 0 0 5px var(--color-focus-ring); }
.lsz__input:focus-visible::-moz-range-thumb { box-shadow: 0 0 0 3px var(--color-paper), 0 0 0 5px var(--color-focus-ring); }
.lsz__ticks { position: absolute; left: 0; right: 0; top: 18px; height: 9px; pointer-events: none; }
.lsz__tick { position: absolute; top: 0; width: 1px; height: 9px; margin-left: -0.5px; background: var(--color-neutral-400); }
.lsz__hint {
  margin: 0 0 clamp(28px, 3.5vw, 40px);
  font-family: var(--font-dm-sans), sans-serif;
  font-size: var(--text-body); font-weight: 400; line-height: 1.5; color: var(--color-neutral-600);
}
/* Card titles land below the nav and the bar when focus scrolls them in. */
section:has(.lsz) .wcard__link { scroll-margin-top: ${NAV_H + 72}px; }
@media (forced-colors: active) {
  .lsz__input { -webkit-appearance: auto; appearance: auto; }
  .lsz__ticks { display: none; }
}
@media (prefers-reduced-motion: reduce) { .lsz__bar { transition: none; } }
`;

/** The band's size slider. Render it through HomeWorkSection's `before` slot
    so its closest <section> is the Logos band and its sticky row can ride
    along the band's grid. */
export function LogoSizerControl({
  defaultSize = DEFAULT_SIZE,
  sticky = true,
}: {
  defaultSize?: LogoStop;
  /** false adds the lsz--static modifier class for a page that styles the
      row as static (the /prototypes/home-kus logo slab). Default true: the
      row rides under the nav as it does on the homepage. */
  sticky?: boolean;
}) {
  const uid = useId();
  const inputId = `${uid}-size`;
  const hintId = `${uid}-hint`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(() => Math.max(0, LOGO_STOPS.indexOf(defaultSize)));
  const size = LOGO_STOPS[index];
  const last = LOGO_STOPS.length - 1;

  useEffect(() => {
    const section = rootRef.current?.closest("section");
    if (!section) return;
    section.style.setProperty("--logo-size", `${size}px`);
    section.setAttribute("data-logo-size", String(size));
  }, [size]);

  useEffect(() => {
    const section = rootRef.current?.closest("section");
    return () => {
      section?.style.removeProperty("--logo-size");
      section?.removeAttribute("data-logo-size");
    };
  }, []);

  return (
    <>
      <style>{CONTROL_CSS}</style>
      <div ref={rootRef} className={sticky ? "lsz" : "lsz lsz--static"}>
        <div className="lsz__bar">
          <div className="lsz__row">
            <label htmlFor={inputId} className="lsz__label">Logo size</label>
            <div className="lsz__track">
              <div className="lsz__ticks" aria-hidden="true">
                {LOGO_STOPS.map((s, i) => (
                  <span
                    key={s}
                    className="lsz__tick"
                    style={{ left: `calc(${THUMB / 2}px + ${i / last} * (100% - ${THUMB}px))` }}
                  />
                ))}
              </div>
              <input
                id={inputId}
                className="lsz__input"
                type="range"
                min={0}
                max={last}
                step={1}
                value={index}
                onChange={(e) => setIndex(Number(e.currentTarget.value))}
                aria-valuetext={`${size} pixels tall`}
                aria-describedby={hintId}
                style={{ "--lsz-p": index / last } as CSSProperties}
              />
            </div>
            <span className="lsz__out" aria-hidden="true">{size} px</span>
          </div>
        </div>
      </div>
      <p id={hintId} className="lsz__hint">Each logo swaps to its compact mark at small sizes.</p>
    </>
  );
}
