"use client";

import Image from "next/image";
import { useEffect, useReducer, useRef, useState, useSyncExternalStore } from "react";
import { DOTS_EVENT, getDots, type DotsState } from "@/lib/dots";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { KUS_COPY } from "@/components/kus/copy";
import { ChevronGlyph, PauseGlyph, PlayGlyph } from "@/components/kus/KusReel";

/* The rotating client quotes (2026-11-05). Left: one quote at a time at
   the quote size, with the name, role, links and the full note. Right: a
   deck of the three portraits as prints, fanned. Every 5s the front print
   swings out and tucks to the back while the next comes forward and its
   quote fades in. Previous runs it the other way: the back print swings
   out and lands on top. Clicking a print brings that client forward.

   It behaves like the reel (KusReel): it plays while at least a third of
   it is in view and the tab is visible; the pointer over the slab pauses
   it, keyboard focus inside or an open full note stops it until Play,
   and Pause stops it (WCAG 2.2.2). Still (reduced motion or "Stop the
   dots"): it never autoplays and changes with instant cuts.

   Screen readers: a carousel region with three slide groups, the hidden
   ones inert; the quotes sit in a live region that is off while it
   rotates and polite when stopped. The deck repeats the names in the
   captions, so it is hidden from them and out of the tab order; Previous
   and Next are the keyboard controls.

   Every quote is stacked in one grid cell, so the tallest sets the
   height and nothing moves when they change.

   Type: six treatments, all existing roles: label, quote, ui (names),
   mono (role and counter), the standalone link, body (the full note). */

export type DeckItem = {
  key: string;
  pull: string;
  body: string;
  name: string;
  role: string;
  linkedin: string | null;
  sample: { href: string; label: string } | null;
  photo: { src: string; width: number; height: number };
};

const HOLD_MS = 5000; // Alfonso, 2026-11-05: "advances every 5 seconds"

/* The three resting spots in the fan: front, next (behind right), last
   (behind left). Shared by the static styles and the two swings. */
const P0 = "translate(0, 0) rotate(-3deg)";
const P1 = "translate(15%, 5%) rotate(6deg) scale(0.94)";
const P2 = "translate(-14%, 8%) rotate(-10deg) scale(0.9)";

type State = { active: number; moved: number | null; kind: "tuck" | "pull"; seq: number };
type Action = { type: "step"; delta: 1 | -1; n: number };

function reducer(s: State, a: Action): State {
  const to = (s.active + a.delta + a.n) % a.n;
  // Forward: the old front tucks to the back. Back: the new front pulls out.
  return a.delta > 0
    ? { active: to, moved: s.active, kind: "tuck", seq: s.seq + 1 }
    : { active: to, moved: to, kind: "pull", seq: s.seq + 1 };
}

function subscribeDots(onChange: () => void) {
  window.addEventListener(DOTS_EVENT, onChange);
  return () => window.removeEventListener(DOTS_EVENT, onChange);
}
const serverDots = (): DotsState => "moving";

type Intent = "auto" | "playing" | "paused";

export default function KusQuoteDeck({ items }: { items: DeckItem[] }) {
  const n = items.length;
  const dots = useSyncExternalStore(subscribeDots, getDots, serverDots);
  const still = dots === "still";
  const q = KUS_COPY.quotes;

  const [state, dispatch] = useReducer(reducer, { active: 0, moved: null, kind: "tuck", seq: 0 });
  const [intent, setIntent] = useState<Intent>("auto");
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const { active } = state;
  const playing = n > 1 && (intent === "playing" || (intent === "auto" && !still));
  const running = playing && inView && !hover && tabVisible && openKey !== items[active]?.key;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) setInView(e.intersectionRatio >= 0.33);
    }, { threshold: [0, 0.33, 0.66] });
    io.observe(el);
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  /* "Stop the dots" at runtime stops it, unless the visitor pressed Play
     before; starting the dots again does not restart a stopped deck. */
  useEffect(() => {
    const onDots = () => {
      if (getDots() === "still") setIntent((i) => (i === "playing" ? "paused" : i));
    };
    window.addEventListener(DOTS_EVENT, onDots);
    return () => window.removeEventListener(DOTS_EVENT, onDots);
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => dispatch({ type: "step", delta: 1, n }), HOLD_MS);
    return () => window.clearTimeout(t);
  }, [running, active, n]);

  const step = (delta: 1 | -1) => dispatch({ type: "step", delta, n });
  const togglePlay = () => setIntent(playing ? "paused" : "playing");
  const onFocusIn = (e: React.FocusEvent<HTMLElement>) => {
    const t = e.target as HTMLElement;
    if (t.matches?.(":focus-visible") && playing) setIntent("paused");
  };

  return (
    <div
      ref={rootRef}
      className="kus-qd"
      role="region"
      aria-roledescription="carousel"
      aria-label={q.label}
      onFocus={onFocusIn}
      onPointerEnter={(e) => { if (e.pointerType === "mouse") setHover(true); }}
      onPointerLeave={() => setHover(false)}
    >
      <div className="kus-qd__head">
        <h2 id="testimonials-title" className="kus-t-label kus-qd__title">What clients say</h2>
        {n > 1 ? (
          <div className="kus-qd__controls">
            <span className="kus-t-mono kus-qd__count" aria-hidden="true">{q.count(active + 1, n)}</span>
            <button type="button" className="kus-qd__btn" onClick={togglePlay} aria-label={playing ? q.pause : q.play}>
              {playing ? <PauseGlyph /> : <PlayGlyph />}
            </button>
            <button type="button" className="kus-qd__btn" onClick={() => step(-1)} aria-label={q.prev}>
              <ChevronGlyph dir="left" />
            </button>
            <button type="button" className="kus-qd__btn" onClick={() => step(1)} aria-label={q.next}>
              <ChevronGlyph dir="right" />
            </button>
          </div>
        ) : null}
      </div>

      <div className="kus-qd__grid">
        <div className="kus-qd__deck" aria-hidden="true">
          {items.map((t, i) => {
            const pos = (i - active + n) % n;
            const move = state.moved === i ? `${state.kind}-${state.seq % 2}` : undefined;
            return (
              <button
                key={t.key}
                type="button"
                tabIndex={-1}
                className="kus-qd__print"
                data-pos={pos}
                data-move={move}
                onClick={() => { if (pos === 1) step(1); else if (pos === 2) step(-1); }}
              >
                <span className="kus-qd__photo">
                  <Image src={t.photo.src} alt="" fill sizes="(max-width: 1023px) 200px, 260px" style={{ objectFit: "cover" }} />
                </span>
              </button>
            );
          })}
        </div>

        <div className="kus-qd__stage" aria-live={running ? "off" : "polite"}>
          {items.map((t, i) => {
            const on = i === active;
            return (
              <figure
                key={t.key}
                className="kus-qd__slide"
                data-on={on ? "" : undefined}
                role="group"
                aria-roledescription="slide"
                aria-label={q.count(i + 1, n)}
                aria-hidden={on ? undefined : true}
                inert={!on}
              >
                <blockquote className="kus-qd__q">
                  <p className="kus-t-quote">&ldquo;{t.pull}&rdquo;</p>
                </blockquote>
                <figcaption className="kus-qd__by">
                  <span className="kus-t-ui">{t.name}</span>
                  <span className="kus-t-mono">{t.role}</span>
                  <span className="kus-qd__links">
                    {t.linkedin ? (
                      <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="kus-link kus-qd__link" aria-label={`${t.name} on LinkedIn (opens in new tab)`}>
                        LinkedIn
                      </a>
                    ) : null}
                    {t.sample ? <LinkArrow href={t.sample.href} tone="on-dark">{t.sample.label}</LinkArrow> : null}
                    {/* The full note's toggle sits on the links row, so a
                        slide carries one row of actions (2026-11-07 audit,
                        section 11, finding 4). A button and a region, not
                        details, so the note opens under the row. */}
                    <button
                      type="button"
                      className="kus-qd__sum"
                      aria-expanded={openKey === t.key}
                      aria-controls={`kus-qd-note-${t.key}`}
                      onClick={() => setOpenKey((k) => (k === t.key ? null : t.key))}
                    >
                      {q.full}<span className="kus-sr"> from {t.name}</span>
                    </button>
                  </span>
                </figcaption>
                <p id={`kus-qd-note-${t.key}`} className="kus-t-body kus-qd__body" hidden={openKey !== t.key}>{t.body}</p>
              </figure>
            );
          })}
        </div>
      </div>

      <style>{CSS}</style>
    </div>
  );
}

const CSS = `
.kus-qd { color: var(--color-paper); }
.kus-qd__head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px 24px; }
.kus-qd__title { color: var(--color-paper); margin: 0; }
.kus-qd__controls { display: flex; align-items: center; gap: 8px; }
.kus-qd__count { color: var(--color-paper); margin-right: 8px; font-variant-numeric: tabular-nums; }
.kus-qd__btn {
  display: grid; place-items: center;
  width: 44px; height: 44px; padding: 0;
  border-radius: 999px;
  border: 2px solid var(--color-paper);
  background: transparent;
  color: var(--color-paper);
  cursor: pointer;
  transition: background-color var(--kus-dur-out) ease, color var(--kus-dur-out) ease;
}
@media (hover: hover) {
  .kus-qd__btn:hover { background: var(--color-paper); color: var(--color-plate-blue); transition-duration: var(--kus-dur-in); }
}
@media (forced-colors: active) { .kus-qd__btn { border-color: ButtonText; } }

.kus-qd__grid {
  display: grid; grid-template-columns: minmax(0, 1fr);
  gap: 48px var(--kus-gap);
  margin-top: 48px;
}
@media (min-width: 1024px) {
  .kus-qd__grid { grid-template-columns: repeat(12, minmax(0, 1fr)); align-items: center; margin-top: 48px; }
  .kus-qd__stage { grid-column: 1 / span 7; grid-row: 1; }
  .kus-qd__deck  { grid-column: 9 / span 4; grid-row: 1; }
}

/* The deck: three prints in a square, fanned from three resting spots. */
.kus-qd__deck {
  position: relative;
  width: min(100%, 220px); aspect-ratio: 1;
  margin: 0 auto;
}
@media (min-width: 1024px) { .kus-qd__deck { width: min(100%, 300px); } }
.kus-qd__print {
  position: absolute; inset: 10%;
  padding: 8px; border: 0; margin: 0;
  background: var(--color-paper);
  border-radius: 14px;
  box-shadow: 0 18px 40px rgb(15 40 61 / 0.32);
  cursor: pointer;
  transform: var(--kus-qd-t);
  transition: transform 640ms var(--kus-ease-spring);
}
.kus-qd__print[data-pos="0"] { --kus-qd-t: ${P0}; z-index: 3; cursor: default; }
.kus-qd__print[data-pos="1"] { --kus-qd-t: ${P1}; z-index: 2; }
.kus-qd__print[data-pos="2"] { --kus-qd-t: ${P2}; z-index: 1; }
.kus-qd__photo { position: relative; display: block; width: 100%; height: 100%; border-radius: 8px; overflow: hidden; }

/* The swings: out to the side and a little up, clear of the controls,
   then behind (tuck) or on top (pull). Two copies of each so a second
   step in the same direction restarts it (the attribute flips between
   -0 and -1). */
.kus-qd__print[data-move="tuck-0"] { animation: kus-qd-tuck-0 760ms var(--kus-ease-out) both; }
.kus-qd__print[data-move="tuck-1"] { animation: kus-qd-tuck-1 760ms var(--kus-ease-out) both; }
.kus-qd__print[data-move="pull-0"] { animation: kus-qd-pull-0 760ms var(--kus-ease-out) both; }
.kus-qd__print[data-move="pull-1"] { animation: kus-qd-pull-1 760ms var(--kus-ease-out) both; }
${[0, 1].map((k) => `
@keyframes kus-qd-tuck-${k} {
  0%   { transform: ${P0}; z-index: 3; }
  45%  { transform: translate(40%, -24%) rotate(14deg); z-index: 3; }
  55%  { transform: translate(36%, -20%) rotate(12deg); z-index: 0; }
  100% { transform: ${P2}; z-index: 1; }
}
@keyframes kus-qd-pull-${k} {
  0%   { transform: ${P2}; z-index: 1; }
  45%  { transform: translate(-40%, -24%) rotate(-14deg); z-index: 1; }
  55%  { transform: translate(-36%, -20%) rotate(-12deg); z-index: 4; }
  100% { transform: ${P0}; z-index: 3; }
}`).join("")}

/* The quotes: stacked in one cell; the one shown fades and rises in. */
.kus-qd__stage { display: grid; }
.kus-qd__slide {
  grid-area: 1 / 1; margin: 0;
  opacity: 0; visibility: hidden; transform: translateY(12px);
  transition: opacity 420ms ease, transform 420ms var(--kus-ease-out), visibility 0s linear 420ms;
}
.kus-qd__slide[data-on] {
  opacity: 1; visibility: visible; transform: none;
  transition: opacity 420ms ease 160ms, transform 520ms var(--kus-ease-out) 160ms, visibility 0s;
}
.kus-qd__q { margin: 0; }
.kus-qd__q .kus-t-quote { color: var(--color-paper); max-width: 18em; text-wrap: balance; }
.kus-qd__by { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; margin-top: 24px; }
.kus-qd__by .kus-t-mono { color: var(--color-paper); }
.kus-qd__links { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 24px; margin-top: 8px; }
.kus-qd__link { position: relative; font-family: var(--kus-sans); font-weight: 400; font-size: var(--text-body); }
.kus-qd__link::before, .kus-qd .ui-linkarrow::before { content: ""; position: absolute; inset: -12px 0; }
.kus-qd__sum {
  background: none; border: 0; padding: 0; color: inherit;
  display: inline-flex; align-items: center; gap: 8px;
  min-height: 44px; cursor: pointer;
  font-family: var(--kus-sans); font-weight: 400; font-size: var(--text-body);
  text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px;
  border-radius: 4px;
}
.kus-qd__sum:hover { text-decoration-thickness: 2px; }
.kus-qd__body { color: var(--color-paper); margin-top: 8px; max-width: 64ch; }
.kus-qd__body[hidden] { display: none; }

@media (prefers-reduced-motion: reduce) {
  .kus-qd__print, .kus-qd__slide, .kus-qd__slide[data-on], .kus-qd__btn { transition: none; }
  .kus-qd__print[data-move] { animation: none; }
}
:root[data-dots="still"] .kus-qd__print,
:root[data-dots="still"] .kus-qd__slide,
:root[data-dots="still"] .kus-qd__slide[data-on] { transition: none; }
:root[data-dots="still"] .kus-qd__print[data-move] { animation: none; }
`;
