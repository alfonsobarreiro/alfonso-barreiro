"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useReducer, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { DOTS_EVENT, getDots, type DotsState } from "@/lib/dots";
import { KUS_COPY } from "@/components/kus/copy";
import type { ReelFrame } from "@/components/kus/plates";

/* The first screen's reel (spec 2.2, decisions D4 and D6): eight real
   pieces with the caption always visible under them. The three websites
   run full bleed, the screenshot covering the frame edge to edge from the
   top (Alfonso, 2026-11-04); the rest sit on their own plate. Proof, not an effect: every frame is named and each caption is a
   link. The order is set in KusFirstScreen.

   It opens on AIGA Portland (Alfonso, 2026-10-25). Alfred is frame 5,
   so it no longer sits one screen before the Alfred band: that frame is
   the finished product, a screenshot of the Ask page as it runs on
   menssolerevival.com, and the band is the demo a visitor can play
   (AlfredCardDemo, recorded answers, nothing sent).

   Full width (Alfonso, 2026-10-27): the frames run edge to edge with
   square ends, since a full-bleed band has no corners to round; the
   control and caption bar keeps to the content column and left rail, and
   the H1 sits under it (KusFirstScreen).

   Motion: the next plate wipes in (320ms, odd frames from the left, even
   frames from the bottom), then its art rises 24px and fades in (280ms
   spring from 120ms), then it holds. A full-bleed frame skips the rise,
   which would open a gap under the image: the wipe is its motion. 4s a frame, about 27s a loop. It keeps
   looping until the visitor pauses it (Alfonso, 2026-11-05: "keep it
   auto-scrolling until paused"); the Pause button meets WCAG 2.2.2.

   When it runs: autoplay begins 1.2s after frame 1's image loads, only
   while at least a quarter of the reel is in view, the tab is visible and
   the dots move. The pointer over the frames pauses it. Keyboard focus
   anywhere inside stops it until the visitor presses Play (the ARIA
   carousel pattern). Leaving the viewport or hiding the tab pauses it
   until it returns. "Stop the dots" pauses it on the current frame.

   Still (reduced motion, "Stop the dots", or no JavaScript): frame 1
   renders on the server with its caption and never autoplays. Play under
   still runs the timer with instant cuts, because the visitor asked.

   Clicking the art: a real link over the frames goes to the piece shown,
   so Cmd-click, middle-click and "Open in new tab" work. It is out of the
   tab order and hidden from screen readers, because the caption's title
   is the same link for keyboard and screen-reader visitors.

   Screen readers: a carousel region; each frame is a slide group, the
   hidden ones inert. The frames sit in a live region that is off while
   rotating and polite when paused or stopped; images are alt="" and the
   caption carries the words.

   Performance and CLS: the box never depends on image size. Frame 1 is
   the LCP (priority). Frames mount one ahead: frame 2 when autoplay
   starts, then n+1 when n shows. Under still only frame 1 is requested
   until the visitor asks for more. The caption cell stacks every caption
   invisibly, so a long one never changes the row's height. */

const WIPE_MS = 320; // Alfonso, 2026-11-05: "tighten the wipe" (was 450)
const FRAME_MS = 4000; // Alfonso, 2026-11-05: "a little quicker" than 5s
const START_DELAY_MS = 1200;
const SIZES = "(max-width: 767px) calc(100vw - 48px), (max-width: 1399px) calc(100vw - 160px), 1240px";
const BLEED_SIZES = "100vw";
/* The fit box every plated frame draws in: the old AIGA card's ratio, so
   the plated pieces keep the size they had when that card was frame 1. */
const FIT_W = 1476;
const FIT_H = 951;
const MARK_SIZES = "(max-width: 767px) 45vw, 40vw";

type View = { shown: number; incoming: number | null; dir: "x" | "y" };
type Action =
  | { type: "go"; to: number; instant: boolean }
  | { type: "settle" };

function reducer(v: View, a: Action): View {
  if (a.type === "settle") return v.incoming === null ? v : { shown: v.incoming, incoming: null, dir: v.dir };
  const from = v.incoming ?? v.shown;
  if (a.to === from) return v;
  if (a.instant) return { shown: a.to, incoming: null, dir: v.dir };
  // A step while a wipe is still running settles that wipe first.
  return { shown: from, incoming: a.to, dir: a.to % 2 === 0 ? "x" : "y" };
}

function subscribeDots(onChange: () => void) {
  window.addEventListener(DOTS_EVENT, onChange);
  return () => window.removeEventListener(DOTS_EVENT, onChange);
}
const serverDots = (): DotsState => "moving";
const subscribeNoop = () => () => {};

type Intent = "auto" | "playing" | "paused";

export function KusReel({ frames }: { frames: ReelFrame[] }) {
  const n = frames.length;
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const dots = useSyncExternalStore(subscribeDots, getDots, serverDots);
  const still = dots === "still";

  const [view, dispatch] = useReducer(reducer, { shown: 0, incoming: null, dir: "x" });
  const [intent, setIntent] = useState<Intent>("auto");
  const [started, setStarted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [wentBack, setWentBack] = useState(false);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  const rootRef = useRef<HTMLElement>(null);
  const firstImgRef = useRef<HTMLDivElement>(null);

  const current = view.incoming ?? view.shown;
  const playing = intent === "playing" || (intent === "auto" && !still);
  const running = playing && started && !hover && inView && tabVisible;
  const warm = started || intent === "playing";

  /* Frame 1 loaded: next/image reports it, and the check below covers an
     image that finished before hydration. */
  useEffect(() => {
    const img = firstImgRef.current?.querySelector("img");
    if (!img?.complete) return;
    const t = window.setTimeout(() => setLoaded(true), 0);
    return () => window.clearTimeout(t);
  }, []);

  /* Autoplay begins 1.2s after frame 1 loads, if the dots move. */
  useEffect(() => {
    if (!loaded || started || !playing) return;
    const t = window.setTimeout(() => setStarted(true), START_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [loaded, started, playing]);

  /* In view (25%) and tab visibility. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) setInView(e.intersectionRatio >= 0.25);
    }, { threshold: [0, 0.25, 0.5] });
    io.observe(el);
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  /* "Stop the dots" at runtime pauses the reel on its current frame (a
     running wipe lands at once). Starting the dots again resumes it,
     unless the visitor had paused it. */
  useEffect(() => {
    const onDots = () => {
      if (getDots() !== "still") return;
      dispatch({ type: "settle" });
      setIntent((i) => (i === "playing" ? "paused" : i));
    };
    window.addEventListener(DOTS_EVENT, onDots);
    return () => window.removeEventListener(DOTS_EVENT, onDots);
  }, []);

  /* The hold: one timer per frame shown. Prev and Next change `current`,
     which restarts it. It loops until paused. */
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => {
      dispatch({ type: "go", to: (current + 1) % n, instant: getDots() === "still" });
    }, frames[current]?.holdMs ?? FRAME_MS);
    return () => window.clearTimeout(t);
  }, [running, current, n, frames]);

  /* A wipe that never reports its end (a background tab) still settles. */
  useEffect(() => {
    if (view.incoming === null) return;
    const t = window.setTimeout(() => dispatch({ type: "settle" }), WIPE_MS + 200);
    return () => window.clearTimeout(t);
  }, [view.incoming]);

  const go = (delta: number) => {
    setStarted(true);
    if (delta < 0) setWentBack(true);
    dispatch({ type: "go", to: (current + delta + n) % n, instant: getDots() === "still" });
  };

  const togglePlay = () => {
    if (playing) {
      setIntent("paused");
      return;
    }
    setStarted(true);
    setIntent("playing");
  };

  /* Keyboard focus inside stops rotation until Play. A mouse click on
     Previous or Next does not: those only reset the hold. */
  const onFocusIn = (e: React.FocusEvent<HTMLElement>) => {
    const t = e.target as HTMLElement;
    if (t.matches?.(":focus-visible") && playing) setIntent("paused");
  };

  /* The rendered frames: the one shown, the one wiping in, and the warm
     neighbors (next, and previous once the visitor has gone back). */
  const mounted = new Set<number>([view.shown]);
  if (view.incoming !== null) mounted.add(view.incoming);
  if (warm) mounted.add((current + 1) % n);
  if (wentBack) mounted.add((current - 1 + n) % n);
  const order = Array.from(mounted).sort((a, b) => a - b);

  const cur = frames[current];
  const countText = KUS_COPY.reel.count(current + 1, n);

  return (
    <section
      ref={rootRef}
      id="reel"
      className="kus-reel"
      aria-roledescription="carousel"
      aria-label={KUS_COPY.reel.label}
      data-ready={hydrated ? "" : undefined}
      onFocus={onFocusIn}
    >
      <div
        className="kus-reel__frames"
        style={{ "--kus-reel-ratio": `${FIT_W} / ${FIT_H}`, "--kus-reel-r": FIT_W / FIT_H } as CSSProperties}
        aria-live={playing ? "off" : "polite"}
        onPointerEnter={(e) => { if (e.pointerType !== "touch") setHover(true); }}
        onPointerLeave={(e) => { if (e.pointerType !== "touch") setHover(false); }}
      >
        {order.map((i) => {
          const f = frames[i];
          const layer = i === view.incoming ? "in" : i === view.shown ? "base" : "pre";
          const isCurrent = i === current;
          return (
            <div
              key={f.key}
              className="kus-reel__frame"
              data-layer={layer}
              data-dir={layer === "in" ? view.dir : undefined}
              data-kus-plate={f.plate}
              data-kind={f.kind}
              role="group"
              aria-roledescription="slide"
              aria-label={`${KUS_COPY.reel.count(i + 1, n)}: ${f.title}`}
              aria-hidden={isCurrent ? undefined : true}
              inert={!isCurrent}
              onAnimationEnd={(e) => {
                if (e.target === e.currentTarget && e.animationName.startsWith("kus-reel-wipe")) dispatch({ type: "settle" });
              }}
              ref={i === 0 ? firstImgRef : undefined}
            >
              <FrameArt frame={f} priority={i === 0} eager={i !== 0} onLoad={i === 0 ? () => setLoaded(true) : undefined} />
            </div>
          );
        })}
        <Link href={cur.href} className="kus-reel__hit" tabIndex={-1} aria-hidden="true" />
        <p className="kus-sr">{`${countText}: ${cur.title}. ${cur.meta}`}</p>
      </div>

      <div className="kus-reel__bar">
        <div className="kus-reel__controls">
          <button type="button" className="kus-reel__btn" onClick={togglePlay} aria-label={playing ? KUS_COPY.reel.pause : KUS_COPY.reel.play}>
            {playing ? <PauseGlyph /> : <PlayGlyph />}
          </button>
          <button type="button" className="kus-reel__btn" onClick={() => go(-1)} aria-label={KUS_COPY.reel.prev}>
            <ChevronGlyph dir="left" />
          </button>
          <button type="button" className="kus-reel__btn" onClick={() => go(1)} aria-label={KUS_COPY.reel.next}>
            <ChevronGlyph dir="right" />
          </button>
        </div>
        <span className="kus-reel__count kus-t-mono-sm" aria-hidden="true">{countText}</span>
        <div className="kus-reel__cap">
          <p key={cur.key} className="kus-reel__line kus-reel__line--live">
            <Link href={cur.href} className="kus-reel__title">{cur.title}</Link>
            <span className="kus-reel__meta kus-t-mono">{cur.meta}</span>
          </p>
          {frames.map((f) => (
            <p key={f.key} className="kus-reel__line kus-reel__line--sizer" aria-hidden="true">
              <span className="kus-reel__title">{f.title}</span>
              <span className="kus-reel__meta kus-t-mono">{f.meta}</span>
            </p>
          ))}
        </div>
      </div>

      <style>{CSS}</style>
    </section>
  );
}

function FrameArt({ frame, priority, eager, onLoad }: { frame: ReelFrame; priority: boolean; eager: boolean; onLoad?: () => void }) {
  if (frame.kind === "logos" && frame.marks) {
    return (
      <div className="kus-reel__art">
        <div className="kus-reel__logos">
          {frame.marks.map((m) => (
            <span key={m.src} className="kus-reel__mark">
              <Image src={m.src} alt="" fill sizes={MARK_SIZES} loading={eager ? "eager" : undefined} style={{ objectFit: "contain" }} />
            </span>
          ))}
        </div>
      </div>
    );
  }
  if (!frame.src) return null;
  if (frame.kind === "bleed") {
    return (
      <div className="kus-reel__art kus-reel__art--bleed">
        <Image src={frame.src} alt="" fill sizes={BLEED_SIZES} priority={priority} loading={priority ? undefined : eager ? "eager" : undefined} onLoad={onLoad} />
      </div>
    );
  }
  const large = frame.fit === "large" && frame.width && frame.height;
  return (
    <div className="kus-reel__art">
      <div
        className={large ? "kus-reel__fit kus-reel__fit--large" : "kus-reel__fit"}
        style={large ? ({ "--kus-art-r": frame.width! / frame.height! } as CSSProperties) : undefined}
      >
        <Image src={frame.src} alt="" fill sizes={SIZES} priority={priority} loading={priority ? undefined : eager ? "eager" : undefined} onLoad={onLoad} style={{ objectFit: "contain" }} />
      </div>
    </div>
  );
}

export function PauseGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <rect x="3.5" y="2.5" width="3" height="11" rx="1" fill="currentColor" />
      <rect x="9.5" y="2.5" width="3" height="11" rx="1" fill="currentColor" />
    </svg>
  );
}

export function PlayGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M5 2.8v10.4a.6.6 0 0 0 .9.5l8-5.2a.6.6 0 0 0 0-1L5.9 2.3a.6.6 0 0 0-.9.5Z" fill="currentColor" />
    </svg>
  );
}

export function ChevronGlyph({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d={dir === "left" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CSS = `
.kus-reel { margin-top: 0; }
.kus-reel__frames {
  position: relative;
  height: clamp(360px, calc(100svh - 260px), 720px);
  border-radius: 0;
  overflow: hidden;
  isolation: isolate;
  background: var(--color-paper);
}
@media (max-width: 1023px) { .kus-reel__frames { height: auto; aspect-ratio: 16 / 10; } }
/* Phones: square, not 4:5. Every frame draws inside frame 1's 16:10
   footprint, which is as wide as fits (84% of the width) in any box from
   about 0.66 of the width up, so a taller box only added empty plate. The
   square keeps the art the same size. On a short screen the box gives up
   height (down to 260px) so the controls and the caption stay inside it:
   220px is the nav above (72px) plus the caption row and its gap below
   (about 129px) and some air; the H1 now sits under the reel, so the
   first screen no longer has to hold it. */
@media (max-width: 767px) {
  /* width: 100% (not auto) so the max-height isn't carried across the
     ratio into a narrower box. */
  .kus-reel__frames { width: 100%; aspect-ratio: 1 / 1; max-height: max(260px, calc(100svh - 220px)); }
}
/* Below 375px the longest caption takes a third line (20px more). */
@media (max-width: 374px) {
  .kus-reel__frames { max-height: max(260px, calc(100svh - 240px)); }
}

/* The art is one link to the piece shown (see the header comment). */
.kus-reel__hit { position: absolute; inset: 0; z-index: 3; border-radius: inherit; cursor: pointer; }

.kus-reel__frame {
  position: absolute; inset: 0;
  border-radius: inherit;
  container-type: size;
  background: var(--kus-plate, var(--color-paper));
}
.kus-reel__frame[data-kus-plate="paper"] {
  background: var(--color-paper);
  box-shadow: inset 0 0 0 1px var(--color-neutral-200);
}
.kus-reel__frame[data-layer="pre"]  { z-index: 0; visibility: hidden; }
.kus-reel__frame[data-layer="base"] { z-index: 1; }
.kus-reel__frame[data-layer="in"]   { z-index: 2; }
.kus-reel__frame[data-layer="in"][data-dir="x"] { animation: kus-reel-wipe-x ${WIPE_MS}ms var(--kus-ease-out) both; }
.kus-reel__frame[data-layer="in"][data-dir="y"] { animation: kus-reel-wipe-y ${WIPE_MS}ms var(--kus-ease-out) both; }
.kus-reel__frame[data-layer="in"] .kus-reel__art { animation: kus-reel-rise 280ms var(--kus-ease-spring) 120ms both; }
.kus-reel__frame[data-layer="in"] .kus-reel__art--bleed { animation: none; }
@keyframes kus-reel-wipe-x { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes kus-reel-wipe-y { from { clip-path: inset(100% 0 0 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes kus-reel-rise { from { opacity: 0; transform: translate3d(0, 24px, 0); } to { opacity: 1; transform: none; } }

/* Every plated frame draws inside one fit box (FIT_W by FIT_H),
   inscribed in the art inset (8% top and bottom, 10% sides from 768px;
   10% and 8% below). Frame 1 is full bleed, larger than any plated
   piece, so it stays the largest paint and the LCP while the reel turns. */
.kus-reel__art { position: absolute; inset: 0; display: grid; place-items: center; }
.kus-reel__fit {
  position: relative;
  width: min(80cqw, calc(84cqh * var(--kus-reel-r, 1.5)));
  aspect-ratio: var(--kus-reel-ratio, 3 / 2);
}
@media (max-width: 767px) {
  .kus-reel__fit { width: min(84cqw, calc(80cqh * var(--kus-reel-r, 1.5))); }
}
/* Full bleed: cover, anchored top and centered. The phone frame is
   square, so a 16:10 desktop capture loses a third of its width there;
   below 768px it anchors top left instead, which keeps each site's logo
   and headline (where a visitor starts reading) in the frame. */
.kus-reel__art--bleed { display: block; }
/* A "large" piece (plates.ts fit) draws at its own ratio, up to 92% of
   the frame's height and 88% of its width (92% on phones), not in the
   shared fit box. Frame 1 is full bleed, so it is still the largest paint. */
.kus-reel__fit--large {
  width: min(88cqw, calc(92cqh * var(--kus-art-r, 1)));
  aspect-ratio: var(--kus-art-r, 1);
}
@media (max-width: 767px) {
  .kus-reel__fit--large { width: min(92cqw, calc(92cqh * var(--kus-art-r, 1))); }
}
.kus-reel__art--bleed img { object-fit: cover; object-position: center top; }
@media (max-width: 767px) { .kus-reel__art--bleed img { object-position: left top; } }
/* The logos (Alfonso, 2026-11-04: "have the 4 logos in a grid"): two
   by two, each mark as large as its cell allows (object-fit: contain),
   so the wide lockups fill the width and BeCourageous the height. The
   grid does not move, so it holds like any other frame. */
.kus-reel__logos {
  position: absolute; inset: 0; margin: auto;
  width: 80cqw; height: 72cqh;
  display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;
  gap: 10cqh 10cqw;
}
.kus-reel__mark { position: relative; display: block; min-width: 0; min-height: 0; }
@media (max-width: 767px) {
  /* The square phone frame: less gap, so each mark gets more width. */
  .kus-reel__logos { width: 90cqw; height: 60cqh; gap: 12cqh 7cqw; }
}

.kus-reel__bar {
  /* The frames bleed; the bar keeps to the content column and left rail. */
  box-sizing: border-box;
  max-width: calc(var(--content-max) + 2 * var(--kus-pad-x));
  margin-inline: auto;
  padding-inline: var(--kus-pad-x);
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr);
  align-items: center;
  column-gap: 16px;
  min-height: 56px;
  margin-top: 12px;
}
.kus-reel__controls { display: flex; gap: 8px; }
.kus-reel:not([data-ready]) .kus-reel__controls { visibility: hidden; }
.kus-reel__btn {
  display: grid; place-items: center;
  width: 44px; height: 44px; padding: 0;
  border-radius: 999px;
  border: 2px solid var(--color-navy);
  background: var(--color-paper);
  color: var(--color-navy);
  cursor: pointer;
  transition: background-color var(--kus-dur-out) ease, color var(--kus-dur-out) ease;
}
@media (hover: hover) {
  .kus-reel__btn:hover { background: var(--color-navy); color: var(--color-paper); transition-duration: var(--kus-dur-in); }
}
.kus-reel__count { min-width: 6ch; font-variant-numeric: tabular-nums; white-space: nowrap; align-self: first baseline; }
/* Desktop: the counter and the caption share a first baseline, so "1 of 9"
   sits on the caption's first line however many lines it wraps to, and
   both drop 18px so that first line centers on the 44px buttons. */
.kus-reel__cap { display: grid; min-width: 0; align-self: first baseline; }
.kus-reel__count, .kus-reel__cap { margin-top: 18px; }
.kus-reel__line {
  grid-area: 1 / 1;
  display: flex; flex-wrap: wrap; align-items: baseline;
  column-gap: 12px; row-gap: 2px;
  margin: 0;
}
.kus-reel__line--sizer { visibility: hidden; }
.kus-reel__line--live { animation: kus-reel-cap 200ms ease both; }
@keyframes kus-reel-cap { from { opacity: 0; } to { opacity: 1; } }
.kus-reel__title {
  position: relative;
  font-family: var(--kus-sans); font-weight: 500; font-size: var(--kus-fs-ui); line-height: 1.25;
  color: var(--color-navy);
  text-decoration: none;
  transition: color var(--kus-dur-out) ease;
}
a.kus-reel__title::before { content: ""; position: absolute; inset: -12px 0; }
a.kus-reel__title:hover { color: var(--color-terracotta-700); text-decoration: underline; text-underline-offset: 3px; transition-duration: var(--kus-dur-in); }
.kus-reel__meta { min-width: 0; }

@media (max-width: 767px) {
  .kus-reel__bar {
    grid-template-columns: auto minmax(0, 1fr);
    grid-template-rows: 44px auto;
    row-gap: 12px;
    min-height: 104px;
    align-content: start;
  }
  .kus-reel__count { justify-self: end; align-self: center; margin-top: 0; }
  .kus-reel__cap { align-self: start; margin-top: 0; }
  .kus-reel__cap { grid-column: 1 / -1; }
}

@media (prefers-reduced-motion: reduce) {
  .kus-reel__frame[data-layer="in"], .kus-reel__frame[data-layer="in"] .kus-reel__art, .kus-reel__line--live { animation: none; }
}
:root[data-dots="still"] .kus-reel__frame[data-layer="in"],
:root[data-dots="still"] .kus-reel__frame[data-layer="in"] .kus-reel__art,
:root[data-dots="still"] .kus-reel__line--live { animation: none; }
:root[data-dots="still"] .kus-reel__btn { transition: none; }
@media (forced-colors: active) { .kus-reel__btn { border-color: ButtonText; } }
`;
