"use client";

import { useEffect, useState, useSyncExternalStore, type CSSProperties, type RefObject } from "react";
import { PORTLAND } from "@/lib/portland";
import { DOTS_EVENT, getDots, type DotsState } from "@/lib/dots";
import { isFresh, isPdxWeather, pdxCaption, PDX_MAX_AGE_MS, type PdxReading } from "@/lib/pdxWeather";

/**
 * "When Portland rains, the dots run" (PORTLAND.rainDrip). Two parts, one
 * reading, in two homes:
 *
 * - The close (HireClose.tsx, the homepage's last band): CloseWeather is
 *   its dateline, a fixed-height slot under the Updated line, and CloseRain
 *   runs the drip on the close's 24px dot grid.
 * - The old hero (Hero.tsx, kept for the prototype pages): HeroWeather and
 *   HeroRain, unchanged.
 *
 * The caption: plain text, not a live region. Its slot has a fixed height
 * (set by the caller's CSS), so filling it in late never moves anything.
 * The drip: sparse lattice columns, outside the text column and the
 * portrait, drift down one 24px pitch every 2.6 to 4.1s. CSS keyframes
 * only; this file only places the columns. aria-hidden. Stop the dots
 * removes it in the caller's CSS, at once.
 *
 * 1024px and up only, and phones never fetch. One fetch per visit, after
 * load and idle. A reading 3 hours old or older never shows, and one that
 * ages past 3 hours on an open page clears. A failed or stale reading
 * leaves the slot empty and the dots still.
 */

const WIDE = "(min-width: 1024px)";
const PITCH = 24;            // the lattice: dots at 12 + 24n, section coordinates
const MIN_COLS = 8;
const MAX_COLS = 14;
const TEXT_CLEAR = PITCH;    // one empty lattice column either side of the text column

/* ---- The reading: one module-level store, shared by every part. ---- */

let reading: PdxReading | null = null;
let started = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}
function subscribeReading(onChange: () => void) {
  listeners.add(onChange);
  return () => { listeners.delete(onChange); };
}
const getReading = () => reading;
const serverReading = () => null;

/* Development only: ?pdx=rain|dry|stale|fail on the page forwards to the
   route's ?mock=, so each state can be seen in the browser. Compiled out
   of production builds. */
function endpoint() {
  let url = "/api/pdx-weather";
  if (process.env.NODE_ENV !== "production") {
    try {
      const pdx = new URLSearchParams(window.location.search).get("pdx");
      if (pdx && /^(rain|dry|stale|fail)$/.test(pdx)) url += `?mock=${pdx}`;
    } catch {
      /* no mock */
    }
  }
  return url;
}

function load() {
  fetch(endpoint())
    .then((res) => (res.ok ? res.json() : null))
    .then((data: unknown) => {
      if (!isPdxWeather(data) || !data.ok || !isFresh(data.observedAt)) return;
      reading = data;
      emit();
      // Clear it when it turns 3 hours old on a page left open.
      const left = Date.parse(data.observedAt) + PDX_MAX_AGE_MS - Date.now();
      window.setTimeout(() => {
        if (reading === data) {
          reading = null;
          emit();
        }
      }, Math.max(0, left));
    })
    .catch(() => {
      /* the slot stays empty and the dots stay still */
    });
}

/** Once per visit: after load, when the browser is idle, and only once
    the viewport is 1024px or wider. */
function startPdxWeather() {
  if (started || !PORTLAND.rainDrip) return;
  started = true;

  const whenIdle = () => {
    if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(load, { timeout: 3000 });
    else window.setTimeout(load, 300);
  };
  const whenLoaded = () => {
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });
  };

  const mq = window.matchMedia(WIDE);
  if (mq.matches) {
    whenLoaded();
    return;
  }
  const onChange = (e: MediaQueryListEvent) => {
    if (!e.matches) return;
    mq.removeEventListener("change", onChange);
    whenLoaded();
  };
  mq.addEventListener("change", onChange);
}

/* ---- The dots state (html[data-dots]). ---- */

function subscribeDots(onChange: () => void) {
  window.addEventListener(DOTS_EVENT, onChange);
  return () => window.removeEventListener(DOTS_EVENT, onChange);
}
const serverDots = (): DotsState => "moving";

/** The KPDX caption, or null until a fresh reading arrives (and always
    null on the server). Starts the one fetch per visit. */
function usePdxCaption(): string | null {
  const r    = useSyncExternalStore(subscribeReading, getReading, serverReading);
  const dots = useSyncExternalStore(subscribeDots, getDots, serverDots);

  useEffect(() => {
    startPdxWeather();
  }, []);

  return r ? pdxCaption(r, dots === "still") : null;
}

/* ---- The captions ---- */

/** The close's dateline. Renders the slot (an empty <p> until a reading
    arrives) so the caller's fixed height holds the space; nothing at all
    when PORTLAND.rainDrip is off. The caption sits in a <span> so the
    caller can give it a ground over the dot grid. */
export function CloseWeather({ className }: { className?: string }) {
  const caption = usePdxCaption();
  if (!PORTLAND.rainDrip) return null;
  return <p className={className}>{caption && <span>{caption}</span>}</p>;
}

/** The old hero's caption (Hero.tsx, prototype pages). Styled by Hero. */
export default function HeroWeather() {
  const caption = usePdxCaption();
  if (!PORTLAND.rainDrip) return null;

  return (
    <div className="hero-weather">
      <p className="hero-weather__caption">
        {caption && <span className="hero-chip hero-weather__text">{caption}</span>}
      </p>
    </div>
  );
}

/* ---- The drip ---- */

type RainCol = {
  k: number;          // lattice column: dot centers at 24k + 12
  dur: number;        // seconds per pitch, 2.6 to 4.1
  delay: number;      // negative, so columns start out of step
  top: number;        // the streak's tail, % of the section's height
  bottom: number;     // the streak's head
  opacity: number;
};

/** A stable 0..1 value per column and salt, so the pattern never shuffles
    between renders or visits. */
function rand(k: number, salt: number) {
  let h = Math.imul(k + 1, 0x9e3779b1) ^ Math.imul(salt + 1, 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 15), 0x2c1b3c6d);
  h = Math.imul(h ^ (h >>> 12), 0x297a2d39);
  h ^= h >>> 15;
  return (h >>> 0) / 4294967296;
}

/** Lattice columns clear of the text column and the portrait, thinned to a
    sparse, irregular set: never two side by side. */
function pickColumns(eligible: number[]): number[] {
  const picked: number[] = [];
  for (const k of eligible) {
    if (picked.length && picked[picked.length - 1] === k - 1) continue;
    if (rand(k, 1) < 0.7) picked.push(k);
  }
  // Top up toward the minimum with any column that has no picked neighbor.
  for (const k of eligible) {
    if (picked.length >= MIN_COLS) break;
    if (picked.includes(k) || picked.includes(k - 1) || picked.includes(k + 1)) continue;
    picked.push(k);
  }
  picked.sort((a, b) => a - b);
  if (picked.length > MAX_COLS) {
    return picked
      .map((k) => [k, rand(k, 2)] as const)
      .sort((a, b) => a[1] - b[1])
      .slice(0, MAX_COLS)
      .map(([k]) => k)
      .sort((a, b) => a - b);
  }
  return picked;
}

function toCol(k: number): RainCol {
  const dur  = 2.6 + rand(k, 3) * 1.5;
  const top  = 6 + rand(k, 4) * 48;
  const len  = 18 + rand(k, 5) * 26;
  return {
    k,
    dur:     Math.round(dur * 100) / 100,
    delay:   -Math.round(rand(k, 6) * dur * 100) / 100,
    top:     Math.round(top),
    bottom:  Math.round(Math.min(94, top + len)),
    opacity: Math.round((0.4 + rand(k, 7) * 0.2) * 100) / 100,
  };
}

type Refs = {
  /** The section whose 24px dot grid the drip runs on (lattice at 0 0 of
      its padding box, no side borders). */
  sectionRef:  RefObject<HTMLElement | null>;
  /** The text column the drip stays clear of. */
  colRef:      RefObject<HTMLElement | null>;
  /** The portrait the drip stays clear of, when there is one. */
  portraitRef?: RefObject<HTMLElement | null>;
};

/** The drip's columns. `cls` names the classes the caller styles:
    `${cls}`, `${cls}__col`, `${cls}__dots`. */
function Rain({ sectionRef, colRef, portraitRef, cls }: Refs & { cls: string }) {
  const r = useSyncExternalStore(subscribeReading, getReading, serverReading);
  const raining = PORTLAND.rainDrip && !!r?.raining;
  const [cols, setCols] = useState<RainCol[]>([]);

  useEffect(() => {
    startPdxWeather();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const col     = colRef.current;
    if (!raining || !section || !col) return;

    let last = "";
    const measure = () => {
      let ks: number[] = [];
      if (window.matchMedia(WIDE).matches) {
        const s = section.getBoundingClientRect();
        const c = col.getBoundingClientRect();
        const p = portraitRef?.current?.getClientRects().length ? portraitRef.current.getBoundingClientRect() : null;
        const textL = c.left  - s.left - TEXT_CLEAR;
        const textR = c.right - s.left + TEXT_CLEAR;
        const portL = p ? p.left  - s.left - PITCH / 2 : Infinity;
        const portR = p ? p.right - s.left + PITCH / 2 : -Infinity;
        const eligible: number[] = [];
        for (let k = 0; k * PITCH + PITCH <= s.width; k++) {
          const x = k * PITCH + PITCH / 2;
          if (x >= textL && x <= textR) continue;
          if (x >= portL && x <= portR) continue;
          eligible.push(k);
        }
        ks = pickColumns(eligible);
      }
      const key = ks.join(",");
      if (key === last) return;
      last = key;
      setCols(ks.map(toCol));
    };

    // ResizeObserver reports once on observe, so this also places the
    // first set.
    const ro = new ResizeObserver(measure);
    ro.observe(section);
    return () => ro.disconnect();
  }, [raining, sectionRef, colRef, portraitRef]);

  if (!raining || !cols.length) return null;

  return (
    <div className={cls} aria-hidden="true">
      {cols.map((c) => {
        const mask = `linear-gradient(to bottom, transparent ${c.top}%, #000 ${c.bottom - 3}%, transparent ${c.bottom}%)`;
        const style = {
          left:            c.k * PITCH,
          opacity:         c.opacity,
          WebkitMaskImage: mask,
          maskImage:       mask,
          "--rain-dur":    `${c.dur}s`,
          "--rain-delay":  `${c.delay}s`,
        } as CSSProperties;
        return (
          <span key={c.k} className={`${cls}__col`} style={style}>
            <span className={`${cls}__dots`} />
          </span>
        );
      })}
    </div>
  );
}

/** The drip behind the close. Styled by HireClose (.close-rain). */
export function CloseRain(refs: Refs) {
  return <Rain {...refs} cls="close-rain" />;
}

/** The drip behind the old hero. Styled by Hero (.hero-rain). */
export function HeroRain(refs: Refs) {
  return <Rain {...refs} cls="hero-rain" />;
}
