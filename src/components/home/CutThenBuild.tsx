"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { TryThis } from "@/components/home/TryThis";
import { DOTS_EVENT, getDots } from "@/lib/dots";

/* "Cut, then build." Puts the visitor in my seat on a real brief. Every
   feature I could have built sits on the hero's dot grid as a toggle
   button over its own cluster of lit dots. Cutting a
   feature dims its dots and strikes it through. "Build what's left" sends
   the surviving dots into a dot-matrix wireframe of the screen that
   shipped, then the real screenshot replaces the dots and one comparison
   line per difference says what I decided and why.

   - Feature lists, calls, and reasons come from the case studies:
     src/app/work/wayfarer/page.tsx (CutVsKept, WhatICut, The bet) and
     src/app/work/mens-sole-revival/page.tsx (PivotInfographic, WhatICut,
     callouts), cross-checked against the alfOS case study masters.
   - Each kept feature owns its real region of the shipped screen
     (measured from the cover screenshot, 1600 by 1000). Cut a feature I
     kept and its region stays empty. Keep a feature I cut and its dots
     fly toward the screen and fade out before they land.
   - The canvas is decorative (aria-hidden). The buttons carry the state
     (aria-pressed means cut) and the result goes to a polite live region.
   - Nothing moves until the visitor acts. Reduced motion and "Stop the
     dots" (html[data-dots="still"], src/lib/dots.ts): cuts are instant,
     and Build shows the wireframe without the flight.
   - The dot grid is CSS, anchored to the feature grid's corner, so it is
     right on the server render and the canvas lights the same dots.
   - Each chip is a coupon: a dashed neutral-600 border with scissors on
     its left edge. Cut, it goes solid, gray-filled, struck through, and
     knocked 2px out of line (no offset under reduced motion).

   Type: DM Sans 400 + 500 only. Color: --color-text, neutrals,
   --color-terracotta-300 (grid), --color-terracotta-500 (lit dots), and
   the DS primary button.

   Two ways to place it:
   - Band (default): its own <section> with the H2 and deck, every brief
     in `briefs` and a "Try another brief" button when there are two.
   - Embedded: just the brief block, for a parent section that supplies
     the heading (the Men's Sole Revival chapter, the Concepts band).
   The block sizes itself with container queries on its own wrapper, so
   it lays out by the column it sits in, not by the viewport. Every id,
   canvas, live region, and listener belongs to one instance, so several
   can share a page. A parent on a surface other than paper can set
   --ctb-surface on itself; chips, the frame, and the scissors' gap in
   the dashes follow it. */

export type BriefId = "mens-sole-revival" | "wayfarer";

type Call = "cut" | "kept";
type Rect = readonly [number, number, number, number];
/* Wireframe shapes in cover pixels (the covers are 1600 by 1000).
   box: outline. bar: filled (text lines, buttons, rules). img: outline
   with both diagonals, the wireframe sign for a photo. dot: one point. */
type Shape = { k: "box" | "bar" | "img"; r: Rect } | { k: "dot"; x: number; y: number };

type Feature = {
  id: string;
  label: string;
  /** The feature inside a sentence: "You kept {phrase}." */
  phrase: string;
  /** What I decided. */
  call: Call;
  /** Follows "I cut it:" or "I kept it:". */
  why: string;
  /** Lower ranks surface first in the comparison lines. */
  rank: number;
  /** Where a kept feature sits on the shipped screen. */
  region?: Shape[];
};

type Brief = {
  id: BriefId;
  title: string;
  brief: string;
  allMatch: string;
  shot: { src: string; alt: string };
  caseStudy: { href: string; label: string };
  base: Shape[];
  features: Feature[];
};

/* The browser window both covers are framed in. */
const CHROME: Shape[] = [
  { k: "box", r: [161, 100, 1439, 944] },
  { k: "bar", r: [161, 145, 1439, 145] },
  { k: "dot", x: 185, y: 122 },
  { k: "dot", x: 207, y: 122 },
  { k: "dot", x: 229, y: 122 },
];

/* Draft copy for Alfonso: titles, brief lines, labels, phrases, reasons,
   the all-match lines, alt text, and link labels. */
const BRIEF_LIST: readonly Brief[] = [
  {
    id: "wayfarer",
    title: "Wayfarer: travel discovery",
    brief: "A travel site for adventurous travelers aged 21 to 30. The brief: redesign the homepage and fix the signup.",
    allMatch: "I cut the booking layer and kept discovery.",
    shot: {
      src: "/images/work/covers/wayfarer.jpg",
      alt: "The Wayfarer homepage as shipped: the headline Discover Unforgettable New Destinations, a Sign Up button, and an aerial photo of boats off a beach.",
    },
    caseStudy: { href: "/work/wayfarer", label: "Read the Wayfarer case study" },
    base: [
      ...CHROME,
      { k: "bar", r: [161, 203, 1439, 203] },   // nav rule
      { k: "bar", r: [253, 161, 379, 185] },    // logo
      { k: "bar", r: [256, 422, 461, 459] },    // H1, three lines
      { k: "bar", r: [257, 475, 591, 516] },
      { k: "bar", r: [257, 529, 677, 566] },
      { k: "img", r: [720, 203, 1439, 944] },   // hero photo
      { k: "bar", r: [759, 903, 841, 913] },    // scroll hint
    ],
    features: [
      {
        id: "wf-globe", label: "Globe explorer", phrase: "the globe explorer", call: "kept", rank: 2,
        why: "it's the front door, so people browse first and search second.",
        region: [{ k: "bar", r: [794, 167, 847, 180] }],                       // Discover
      },
      {
        id: "wf-hotels", label: "Hotel booking", phrase: "hotel booking", call: "cut", rank: 1,
        why: "the brief said discovery, not booking.",
      },
      {
        id: "wf-signup", label: "Multi-step signup", phrase: "the multi-step signup", call: "kept", rank: 3,
        why: "fixing the signup was half the brief.",
        region: [
          { k: "bar", r: [255, 602, 642, 614] },                                // hero copy
          { k: "bar", r: [254, 623, 620, 635] },
          { k: "bar", r: [258, 645, 370, 654] },
          { k: "bar", r: [253, 688, 380, 736] },                                // Sign Up
          { k: "bar", r: [1305, 167, 1345, 180] },                              // Sign in
        ],
      },
      {
        id: "wf-price", label: "Price filters", phrase: "price filters", call: "cut", rank: 4,
        why: "someone browsing Kyoto doesn't need prices competing for their attention.",
      },
      {
        id: "wf-pages", label: "Destination pages", phrase: "destination pages", call: "kept", rank: 5,
        why: "they hold the content that makes people want to go.",
        region: [{ k: "bar", r: [686, 167, 762, 180] }],                       // Destinations
      },
      {
        id: "wf-cars", label: "Car rental", phrase: "car rental", call: "cut", rank: 7,
        why: "booking UI pulled attention away from the core experience.",
      },
      {
        id: "wf-planner", label: "Trip planner", phrase: "the trip planner", call: "kept", rank: 6,
        why: "it turns saved places into an itinerary, and dates are optional.",
        region: [{ k: "bar", r: [878, 167, 902, 180] }],                       // Plan
      },
      {
        id: "wf-confirm", label: "Booking confirmation", phrase: "booking confirmation", call: "cut", rank: 9,
        why: "Wayfarer sits upstream of the booking decision.",
      },
      {
        id: "wf-continent", label: "Continent filters", phrase: "continent filters", call: "kept", rank: 8,
        why: "travelers who know their region can filter straight to it.",
        region: [{ k: "bar", r: [1211, 167, 1273, 180] }],                     // Search
      },
    ],
  },
  {
    id: "mens-sole-revival",
    title: "Men's Sole Revival: foot health for men over 40",
    brief: "Men over 40 quietly Google their foot problems. My first plan was a store built for them.",
    allMatch: "I cut the store and kept the editorial.",
    shot: {
      src: "/images/work/covers/mens-sole-revival.jpg",
      alt: "The Men's Sole Revival homepage as shipped: the headline Your turn. Start with your feet., a Take the assessment button, and a man stretching on a railing by the water.",
    },
    caseStudy: { href: "/work/mens-sole-revival", label: "Read the Men's Sole Revival case study" },
    base: [
      ...CHROME,
      { k: "bar", r: [161, 209, 1439, 209] },   // nav rule
      { k: "bar", r: [312, 158, 342, 196] },    // shield
      { k: "bar", r: [351, 170, 472, 185] },    // wordmark
      { k: "bar", r: [1070, 170, 1109, 184] },  // Ask
      { k: "bar", r: [1126, 170, 1178, 184] },  // Search
      { k: "bar", r: [310, 421, 555, 458] },    // H1, three lines
      { k: "bar", r: [313, 474, 554, 514] },
      { k: "bar", r: [311, 530, 539, 570] },
      { k: "img", r: [940, 240, 1410, 900] },   // hero photo
    ],
    features: [
      {
        id: "msr-shopify", label: "Shopify storefront", phrase: "the Shopify storefront", call: "cut", rank: 1,
        why: "three weeks of margin modeling pointed to information, not products.",
      },
      {
        id: "msr-pillars", label: "Pillar articles", phrase: "pillar articles", call: "kept", rank: 5,
        why: "these men need a resource they trust before they buy anything.",
        region: [
          { k: "bar", r: [518, 170, 558, 184] },                                // Guides
          { k: "bar", r: [312, 613, 894, 621] },                                // hero copy
          { k: "bar", r: [311, 634, 842, 641] },
        ],
      },
      {
        id: "msr-cart", label: "Cart and checkout", phrase: "cart and checkout", call: "cut", rank: 6,
        why: "the transaction can't happen before the trust does.",
      },
      {
        id: "msr-assessment", label: "Symptom assessment", phrase: "the symptom assessment", call: "kept", rank: 3,
        why: "it branches by symptom, and 67 of the 78 visitors who started it finished.",
        region: [
          { k: "bar", r: [310, 676, 494, 724] },                                // Take the assessment
          { k: "box", r: [1199, 161, 1289, 192] },                              // Assessment
        ],
      },
      {
        id: "msr-listings", label: "Product listings", phrase: "product listings", call: "cut", rank: 7,
        why: "affiliate links replaced them, which keeps the editorial independent.",
      },
      {
        id: "msr-reviews", label: "Product reviews", phrase: "product reviews", call: "kept", rank: 2,
        why: "they're laid out like product pages because the reader is deciding, not reading.",
        region: [{ k: "bar", r: [583, 170, 681, 184] }],                       // Product Reviews
      },
      {
        id: "msr-subscription", label: "Subscription tier", phrase: "the subscription tier", call: "cut", rank: 9,
        why: "it belonged to the store plan I dropped in week 3.",
      },
      {
        id: "msr-routines", label: "Routine prompts", phrase: "routine prompts", call: "kept", rank: 8,
        why: "every article ends with something to do: what, how often, and for how long.",
        region: [{ k: "bar", r: [706, 170, 756, 184] }],                       // Routines
      },
      {
        id: "msr-popup", label: "Newsletter popup", phrase: "the newsletter popup", call: "cut", rank: 4,
        why: "this audience hesitates out of shame, and pressure makes that worse.",
      },
    ],
  },
];

const BRIEF_BY_ID = new Map<BriefId, Brief>(BRIEF_LIST.map((b) => [b.id, b]));

/* Men's Sole Revival leads when both show (homepage order, 2026-10-24). */
const DEFAULT_BRIEFS: readonly BriefId[] = ["mens-sole-revival", "wayfarer"];

/* The briefs to show, in order: unknown ids and repeats drop out, and an
   empty list falls back to the default. */
function resolveBriefs(ids: readonly BriefId[] | undefined): Brief[] {
  const out: Brief[] = [];
  for (const id of ids ?? DEFAULT_BRIEFS) {
    const b = BRIEF_BY_ID.get(id);
    if (b && !out.includes(b)) out.push(b);
  }
  return out.length ? out : DEFAULT_BRIEFS.map((id) => BRIEF_BY_ID.get(id)!);
}

const COPY = {
  title:       "Cut, then build",
  deck:        "A real brief and the features I could have built for it. Cut what doesn't belong, then compare your build with what I shipped.",
  instruction: "Cut what the brief doesn't need.",
  build:       "Build what's left",
  another:     "Try another brief",
  hint:        "Your build lands in this frame.",
  shown:       "The shipped homepage is showing.",
};

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

type Result = {
  summary: string;
  lines: string[];
  more: string | null;
  tags: Record<string, Call>;
};

function compare(brief: Brief, cutIds: readonly string[]): Result {
  const total = brief.features.length;
  const diffs = brief.features
    .filter((f) => cutIds.includes(f.id) !== (f.call === "cut"))
    .sort((a, b) => a.rank - b.rank);
  const matched = total - diffs.length;
  const summary =
    diffs.length === 0 ? `Your build matches mine on all ${WORDS[total]} calls.`
    : matched === 0   ? `Your build matches none of my ${WORDS[total]} calls.`
    :                   `Your build matches mine on ${WORDS[matched]} of ${WORDS[total]} calls.`;
  const lines = diffs.length === 0
    ? [brief.allMatch]
    : diffs.slice(0, 2).map((f) =>
        f.call === "cut" ? `You kept ${f.phrase}. I cut it: ${f.why}` : `You cut ${f.phrase}. I kept it: ${f.why}`);
  const rest = diffs.length - 2;
  const more = rest <= 0 ? null : rest === 1 ? "One more is tagged in the list." : `${cap(WORDS[rest])} more are tagged in the list.`;
  return { summary, lines, more, tags: Object.fromEntries(diffs.map((f) => [f.id, f.call])) };
}

/* ── Canvas engine ─────────────────────────────────────────────────────── */

const COVER_W     = 1600;
const COVER_H     = 1000;
const PITCH       = 24;    // the hero's dot grid
const LIT_R       = 2;     // the hero's spotlight dot radius
const WIRE_COLS   = 80;    // dot-matrix columns across the build frame
const EMIT        = 650;   // ms over which dots leave their clusters, top to bottom
const FLY         = 650;
const FLY_JITTER  = 160;
const HOLD        = 260;
const RESOLVE     = 600;   // dots out, screenshot in
const CUT_FADE    = 200;
const PRINT_FADE  = 220;
const STILL_HOLD  = 900;   // reduced motion: how long the still wireframe shows
const MISFITS     = 26;    // dots sent by each feature I cut that the visitor kept
const IMG_WAIT    = 2500;  // longest wait for the screenshot to finish loading
const TAU         = Math.PI * 2;

type Pt = { x: number; y: number };
type ChipGeom = { id: string; cx: number; cy: number; dots: Pt[] };
type Particle = {
  sx: number; sy: number; cx: number; cy: number; tx: number; ty: number;
  delay: number; dur: number; misfit: boolean;
};
type Still = { x: number; y: number; delay: number };
type Anim = {
  t0: number;
  particles: Particle[];
  stills: Still[];
  wireR: number;
  resolveAt: number;
  reduced: boolean;
  fadeFrom: number | null;
  onResolve: () => void;
};

type Engine = {
  measure: () => void;
  /** Re-measure after a font swap; waits for a running build to finish. */
  measureSoon: () => void;
  setCut: (ids: readonly string[], instant: boolean) => void;
  build: (brief: Brief, cutIds: readonly string[], reduced: boolean, onResolve: () => void) => void;
  /** Skip a running build straight to its result ("Stop the dots" mid-flight). */
  settle: () => void;
  cancel: () => void;
  destroy: () => void;
};

/* Small seeded random so a given set of cuts always builds the same way. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ease = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);

/* Rasterize a brief's shipped screen onto the build frame's dot lattice.
   Regions of kept features the visitor cut are claimed but left unlit, so
   the hole shows. Coordinates are frame pixels. */
function wireframe(brief: Brief, keptByVisitor: ReadonlySet<string>, fw: number, fh: number) {
  const p    = fw / WIRE_COLS;
  const cols = WIRE_COLS;
  const rows = Math.floor(fh / p);
  const sx   = fw / COVER_W;
  const sy   = fh / COVER_H;
  const seen = new Set<number>();
  const out: { x: number; y: number; owner: string | null }[] = [];
  const at = (v: number) => v / p - 0.5;

  const put = (i: number, j: number, owner: string | null, lit: boolean) => {
    if (i < 0 || j < 0 || i >= cols || j >= rows) return;
    const key = j * cols + i;
    if (seen.has(key)) return;
    seen.add(key);
    if (lit) out.push({ x: (i + 0.5) * p, y: (j + 0.5) * p, owner });
  };

  const raster = (s: Shape, owner: string | null, lit: boolean) => {
    if (s.k === "dot") {
      put(Math.round(at(s.x * sx)), Math.round(at(s.y * sy)), owner, lit);
      return;
    }
    const [x0, y0, x1, y1] = [s.r[0] * sx, s.r[1] * sy, s.r[2] * sx, s.r[3] * sy];
    if (s.k === "bar") {
      const pad = p * 0.42;
      const i0 = Math.ceil(at(x0 - pad)), i1 = Math.floor(at(x1 + pad));
      const j0 = Math.ceil(at(y0 - pad)), j1 = Math.floor(at(y1 + pad));
      if (i1 < i0 || j1 < j0) {
        put(Math.round(at((x0 + x1) / 2)), Math.round(at((y0 + y1) / 2)), owner, lit);
        return;
      }
      for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) put(i, j, owner, lit);
      return;
    }
    // box and img: the outline, one dot wide.
    const i0 = Math.round(at(x0)), i1 = Math.round(at(x1));
    const j0 = Math.round(at(y0)), j1 = Math.round(at(y1));
    for (let i = i0; i <= i1; i++) { put(i, j0, owner, lit); put(i, j1, owner, lit); }
    for (let j = j0 + 1; j < j1; j++) { put(i0, j, owner, lit); put(i1, j, owner, lit); }
    if (s.k === "img") {
      const n = Math.max(i1 - i0, j1 - j0);
      for (let k = 1; k < n; k++) {
        const u = k / n;
        put(Math.round(i0 + (i1 - i0) * u), Math.round(j0 + (j1 - j0) * u), owner, lit);
        put(Math.round(i0 + (i1 - i0) * u), Math.round(j1 - (j1 - j0) * u), owner, lit);
      }
    }
  };

  for (const f of brief.features) {
    if (!f.region) continue;
    const lit = keptByVisitor.has(f.id);
    for (const s of f.region) raster(s, f.id, lit);
  }
  for (const s of brief.base) raster(s, null, true);
  return { pts: out, p };
}

function createEngine(
  stage: HTMLDivElement,
  canvas: HTMLCanvasElement,
  grid: HTMLDivElement,
  frame: HTMLDivElement,
  imgReady: () => boolean,
): Engine {
  const ctx = canvas.getContext("2d");
  let w = 0, h = 0, dpr = 1;
  let color = "#CF5B48";
  let chips: ChipGeom[] = [];
  let box = { x: 0, y: 0, w: 0, h: 0 };
  const alpha  = new Map<string, number>();
  const target = new Map<string, number>();
  let anim: Anim | null = null;
  let raf  = 0;
  let last = 0;
  let stale = false;

  const draw = (now: number) => {
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = color;

    for (const c of chips) {
      const a = alpha.get(c.id) ?? 1;
      if (a < 0.02) continue;
      ctx.globalAlpha = a;
      ctx.beginPath();
      for (const d of c.dots) { ctx.moveTo(d.x + LIT_R, d.y); ctx.arc(d.x, d.y, LIT_R, 0, TAU); }
      ctx.fill();
    }

    if (anim) {
      const t  = now - anim.t0;
      const wa = anim.fadeFrom === null ? 1 : 1 - clamp01((now - anim.fadeFrom) / RESOLVE);
      const r1 = anim.wireR;

      ctx.globalAlpha = wa;
      ctx.beginPath();
      for (const q of anim.particles) {
        if (q.misfit) continue;
        const u = clamp01((t - q.delay) / q.dur);
        if (u <= 0) continue;
        const e = ease(u);
        const m = 1 - e;
        const x = m * m * q.sx + 2 * m * e * q.cx + e * e * q.tx;
        const y = m * m * q.sy + 2 * m * e * q.cy + e * e * q.ty;
        const r = LIT_R + (r1 - LIT_R) * e;
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, TAU);
      }
      ctx.fill();

      for (const q of anim.particles) {
        if (!q.misfit) continue;
        const u = clamp01((t - q.delay) / q.dur);
        if (u <= 0 || u >= 0.86) continue;
        const e = ease(u);
        const m = 1 - e;
        const x = m * m * q.sx + 2 * m * e * q.cx + e * e * q.tx;
        const y = m * m * q.sy + 2 * m * e * q.cy + e * e * q.ty;
        ctx.globalAlpha = wa * (1 - clamp01((u - 0.4) / 0.46));
        ctx.beginPath();
        ctx.arc(x, y, LIT_R, 0, TAU);
        ctx.fill();
      }

      for (const s of anim.stills) {
        const a = anim.reduced ? 1 : clamp01((t - s.delay) / PRINT_FADE);
        if (a <= 0) continue;
        ctx.globalAlpha = wa * a;
        ctx.beginPath();
        ctx.arc(s.x, s.y, r1, 0, TAU);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  };

  const tick = (now: number) => {
    raf = 0;
    const dt = last ? now - last : 16;
    last = now;
    let moving = false;
    for (const [id, to] of target) {
      const from = alpha.get(id) ?? to;
      if (from === to) continue;
      const step = dt / CUT_FADE;
      const next = from < to ? Math.min(to, from + step) : Math.max(to, from - step);
      alpha.set(id, next);
      if (next !== to) moving = true;
    }

    if (anim) {
      const t = now - anim.t0;
      if (anim.fadeFrom === null && t >= anim.resolveAt && (imgReady() || t >= anim.resolveAt + IMG_WAIT)) {
        const done = anim.onResolve;
        if (anim.reduced) anim = null;
        else anim.fadeFrom = now;
        done();
      }
      if (anim && anim.fadeFrom !== null && now - anim.fadeFrom >= RESOLVE) anim = null;
    }

    if (!anim && stale) { stale = false; measure(); }
    draw(now);
    if (moving || anim) raf = requestAnimationFrame(tick);
    else last = 0;
  };

  const kick = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const measure = () => {
    const sr = stage.getBoundingClientRect();
    const gr = grid.getBoundingClientRect();
    const fr = frame.getBoundingClientRect();
    w   = sr.width;
    h   = sr.height;
    dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width  = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width  = `${w}px`;
    canvas.style.height = `${h}px`;
    color = getComputedStyle(stage).getPropertyValue("--color-terracotta-500").trim() || color;

    // The CSS grid lights a dot at (12 + 24i, 24j) from the feature grid's
    // top-left corner. Chips sit centered between two dot rows, so the lit
    // rows above and below clear them by 14px.
    const ox = gr.left - sr.left + PITCH / 2;
    const oy = gr.top - sr.top;
    const above = getComputedStyle(grid).getPropertyValue("--ctb-halo-above").trim() === "1";
    // A cut chip is knocked 2px out of line by a transform. Measure where
    // it sits in the layout, so the cluster stays on the chip's grid cell.
    chips = Array.from(grid.querySelectorAll<HTMLElement>("[data-feature]")).map((el) => {
      const r = el.getBoundingClientRect();
      const tf = getComputedStyle(el).transform;
      const m = tf && tf !== "none" ? new DOMMatrixReadOnly(tf) : null;
      const tx = m ? m.m41 : 0, ty = m ? m.m42 : 0;
      const left = r.left - sr.left - tx, right = r.right - sr.left - tx;
      const top  = r.top - sr.top - ty,  bottom = r.bottom - sr.top - ty;
      const cy = (top + bottom) / 2, half = (bottom - top) / 2;
      const dots: Pt[] = [];
      const j0 = Math.ceil((cy - half - PITCH - oy) / PITCH);
      const j1 = Math.floor((cy + half + PITCH - oy) / PITCH);
      const i0 = Math.ceil((left + 6 - ox) / PITCH);
      const i1 = Math.floor((right - 6 - ox) / PITCH);
      for (let j = j0; j <= j1; j++) {
        const y = oy + j * PITCH;
        const d = y - cy;
        if (Math.abs(d) < half + 4 || Math.abs(d) > half + PITCH) continue;
        if (d < 0 && !above) continue;
        for (let i = i0; i <= i1; i++) dots.push({ x: ox + i * PITCH, y });
      }
      return { id: el.dataset.feature ?? "", cx: (left + right) / 2, cy, dots };
    });
    box = { x: fr.left - sr.left + 1, y: fr.top - sr.top + 1, w: fr.width - 2, h: fr.height - 2 };

    // A resize mid-build skips straight to the result.
    if (anim) {
      const done = anim.fadeFrom === null ? anim.onResolve : null;
      anim = null;
      done?.();
    }
    draw(performance.now());
  };

  const measureSoon = () => {
    if (anim) stale = true;
    else measure();
  };

  const setCut = (ids: readonly string[], instant: boolean) => {
    target.clear();
    for (const c of chips) {
      const to = ids.includes(c.id) ? 0 : 1;
      target.set(c.id, to);
      if (instant || !alpha.has(c.id)) alpha.set(c.id, to);
    }
    for (const id of Array.from(alpha.keys())) if (!target.has(id)) alpha.delete(id);
    if (instant) draw(performance.now());
    else kick();
  };

  const build = (brief: Brief, cutIds: readonly string[], reduced: boolean, onResolve: () => void) => {
    const keptIds = new Set(brief.features.filter((f) => !cutIds.includes(f.id)).map((f) => f.id));
    const { pts, p } = wireframe(brief, keptIds, box.w, box.h);
    const wireR = Math.max(0.85, p * 0.22);
    const rand  = rng(cutIds.reduce((s, id) => s * 31 + id.length * 7 + id.charCodeAt(id.length - 1), 17 + brief.id.length));
    const geomOf = new Map(chips.map((c) => [c.id, c]));
    const shippedStreams = brief.features
      .filter((f) => f.call === "kept" && keptIds.has(f.id))
      .map((f) => geomOf.get(f.id))
      .filter((g): g is ChipGeom => Boolean(g));

    const particles: Particle[] = [];
    const stills: Still[] = [];
    const source = (g: ChipGeom): Pt => (g.dots.length ? g.dots[Math.floor(rand() * g.dots.length)] : { x: g.cx, y: g.cy });
    const send = (g: ChipGeom, tx: number, ty: number, delay: number, misfit: boolean) => {
      const s  = source(g);
      const dx = tx - s.x, dy = ty - s.y;
      const bend = (rand() - 0.5) * 0.36;
      particles.push({
        sx: s.x, sy: s.y, tx, ty,
        cx: s.x + dx / 2 - dy * bend,
        cy: s.y + dy / 2 + dx * bend,
        delay, dur: FLY + rand() * FLY_JITTER, misfit,
      });
    };

    for (const pt of pts) {
      const tx = box.x + pt.x;
      const ty = box.y + pt.y;
      const delay = EMIT * (pt.y / box.h) + rand() * 90;
      if (reduced) { stills.push({ x: tx, y: ty, delay: 0 }); continue; }
      const own = pt.owner ? geomOf.get(pt.owner) : undefined;
      if (own) { send(own, tx, ty, delay, false); continue; }
      if (shippedStreams.length) send(shippedStreams[Math.floor(rand() * shippedStreams.length)], tx, ty, delay, false);
      else stills.push({ x: tx, y: ty, delay });   // nothing I kept survived: the frame prints in place
    }

    if (!reduced) {
      // Features I cut that the visitor kept head for the screen and fade
      // before they land: the shipped screen has no place for them.
      const winL = box.x + (161 / COVER_W) * box.w, winR = box.x + (1439 / COVER_W) * box.w;
      const winT = box.y + (210 / COVER_H) * box.h, winB = box.y + (944 / COVER_H) * box.h;
      for (const f of brief.features) {
        if (f.call !== "cut" || !keptIds.has(f.id)) continue;
        const g = geomOf.get(f.id);
        if (!g) continue;
        for (let k = 0; k < MISFITS; k++) {
          send(g, winL + rand() * (winR - winL), winT + rand() * (winB - winT), rand() * EMIT, true);
        }
      }
    }

    anim = {
      t0: performance.now(),
      particles,
      stills,
      wireR,
      resolveAt: reduced ? STILL_HOLD : EMIT + 90 + FLY + FLY_JITTER + HOLD,
      reduced,
      fadeFrom: null,
      onResolve,
    };
    if (reduced) draw(performance.now());
    kick();
  };

  const settle = () => {
    for (const [id, to] of target) alpha.set(id, to);
    if (anim) {
      const done = anim.fadeFrom === null ? anim.onResolve : null;
      anim = null;
      done?.();
    }
    draw(performance.now());
  };

  const cancel = () => {
    anim = null;
    kick();
  };

  const destroy = () => {
    cancelAnimationFrame(raf);
    raf  = 0;
    anim = null;
  };

  return { measure, measureSoon, setCut, build, settle, cancel, destroy };
}

/* ── Component ─────────────────────────────────────────────────────────── */

type Phase = "edit" | "building" | "built";

/* Reduced motion, or "Stop the dots": no fades, no flight. */
const motionOff = (reduced: boolean) => reduced || getDots() === "still";

/* The coupon's scissors, drawn on the chip's left edge with the blades
   pointing down the cut line. Decorative: the button's name says "Cut". */
function Scissors() {
  return (
    <svg className="ctb-chip__scissors" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <circle cx="4.5" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="11.5" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.9 6.1 12 15.5M10.1 6.1 4 15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ResultBody({ result, link }: { result: Result; link?: Brief["caseStudy"] }) {
  return (
    <>
      <p className="ctb-summary">{result.summary}</p>
      {result.lines.map((line) => <p key={line}>{line}</p>)}
      {result.more ? <p>{result.more}</p> : null}
      {link ? (
        <div className="ctb-result__link">
          <LinkArrow href={link.href}>{link.label}</LinkArrow>
        </div>
      ) : null}
    </>
  );
}

function HeadBody({ brief, ids, level = 3 }: { brief: Brief; ids?: { title: string; instruction: string }; level?: 3 | 4 }) {
  const Title = level === 4 ? "h4" : "h3";
  return (
    <>
      <Title id={ids?.title} className="ctb-title">{brief.title}</Title>
      <p className="ctb-brief">{brief.brief}</p>
      <p id={ids?.instruction} className="ctb-instruction"><TryThis />{COPY.instruction}</p>
    </>
  );
}

export type CutThenBuildProps = {
  /** Which briefs, in order. Default: Men's Sole Revival, then Wayfarer. */
  briefs?: BriefId[];
  /** Just the brief block, for a parent section that supplies the heading. */
  embedded?: boolean;
  /** The band's id (default "cut-then-build"). Embedded, it goes on the
      block's wrapper only when given. */
  id?: string;
  /** The brief title's heading level: 3 (default), or 4 when the parent
      already opens the block with an h3. */
  titleLevel?: 3 | 4;
};

export default function CutThenBuild({ briefs, embedded = false, id, titleLevel = 3 }: CutThenBuildProps) {
  const headingId = useId();
  const list = resolveBriefs(briefs);
  // A different set of briefs is a different interaction: start it fresh.
  const block = <BriefBlock key={list.map((b) => b.id).join(" ")} list={list} titleLevel={titleLevel} />;

  if (embedded) {
    return <div id={id} className="ctb">{block}</div>;
  }

  return (
    <section
      id={id ?? "cut-then-build"}
      aria-labelledby={headingId}
      style={{
        padding:    "clamp(72px, 8vw, 112px) clamp(24px, 6vw, 80px) 64px",
        background: "var(--color-paper)",
        borderTop:  "1px solid var(--color-neutral-200)",
      }}
    >
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
        <h2
          id={headingId}
          style={{
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "clamp(28px, 4.2vw, 60px)",
            fontWeight:    500,
            color:         "var(--color-text)",
            margin:        0,
            letterSpacing: "-0.02em",
            lineHeight:    1.05,
          }}
        >
          {COPY.title}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize:   "17px",
            lineHeight: 1.45,
            color:      "var(--color-neutral-600)",
            margin:     "12px 0 clamp(40px, 5vw, 56px)",
            maxWidth:   "640px",
          }}
        >
          {COPY.deck}
        </p>
        <div className="ctb">{block}</div>
      </div>
    </section>
  );
}

/* One interaction: brief, chips, actions, frame, result, its own dot
   field, canvas, and live region. */
function BriefBlock({ list, titleLevel }: { list: readonly Brief[]; titleLevel: 3 | 4 }) {
  const uid = useId();
  const stageRef  = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);
  const frameRef  = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const reduceRef = useRef(false);
  const imgRef    = useRef(false);

  const [briefIdx, setBriefIdx] = useState(0);
  const [cut, setCut]           = useState<string[]>([]);
  const [phase, setPhase]       = useState<Phase>("edit");
  const [result, setResult]     = useState<Result | null>(null);
  const [live, setLive]         = useState("");

  const brief = list[Math.min(briefIdx, list.length - 1)];
  const several = list.length > 1;
  const titleId = `${uid}-title`;
  const instructionId = `${uid}-instruction`;

  useEffect(() => {
    const stage = stageRef.current, canvas = canvasRef.current, grid = gridRef.current, frame = frameRef.current;
    if (!stage || !canvas || !grid || !frame) return;
    let alive = true;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceRef.current = mq.matches;
    const onMq = () => { reduceRef.current = mq.matches; };
    mq.addEventListener("change", onMq);

    const engine = createEngine(stage, canvas, grid, frame, () => imgRef.current);
    engineRef.current = engine;
    engine.measure();
    engine.setCut([], true);

    // "Stop the dots" pressed mid-build: land on the result now.
    const onDots = () => { if (getDots() === "still") engine.settle(); };
    window.addEventListener(DOTS_EVENT, onDots);

    let w = stage.offsetWidth, h = stage.offsetHeight;
    const ro = new ResizeObserver(() => {
      if (stage.offsetWidth === w && stage.offsetHeight === h) return;
      w = stage.offsetWidth;
      h = stage.offsetHeight;
      engine.measure();
    });
    ro.observe(stage);
    const remeasure = () => { if (alive) engine.measureSoon(); };
    document.fonts?.ready.then(remeasure);
    document.fonts?.addEventListener("loadingdone", remeasure);

    return () => {
      alive = false;
      mq.removeEventListener("change", onMq);
      window.removeEventListener(DOTS_EVENT, onDots);
      ro.disconnect();
      document.fonts?.removeEventListener("loadingdone", remeasure);
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  // A new brief brings new chips: measure them and light every cluster.
  useLayoutEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    engine.measure();
    engine.setCut([], true);
  }, [briefIdx]);

  const reopen = () => {
    engineRef.current?.cancel();
    setPhase("edit");
    setResult(null);
  };

  const toggle = (id: string) => {
    if (phase !== "edit") reopen();
    setCut((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // The canvas follows the cut list: lit for kept, faint for cut.
  useEffect(() => {
    engineRef.current?.setCut(cut, motionOff(reduceRef.current));
  }, [cut]);

  const build = () => {
    const engine = engineRef.current;
    if (!engine) return;
    const snapshot = cut;
    const b = brief;
    setPhase("building");
    setResult(null);
    setLive("");
    engine.build(b, snapshot, motionOff(reduceRef.current), () => {
      const r = compare(b, snapshot);
      setResult(r);
      setPhase("built");
      setLive([r.summary, ...r.lines, r.more ?? "", COPY.shown].filter(Boolean).join(" "));
    });
  };

  const another = () => {
    if (!several) return;
    engineRef.current?.cancel();
    const next = (briefIdx + 1) % list.length;
    imgRef.current = false;
    setBriefIdx(next);
    setCut([]);
    setPhase("edit");
    setResult(null);
    const b = list[next];
    setLive(`Brief ${WORDS[next + 1]} of ${WORDS[list.length]}: ${b.title}. All ${WORDS[b.features.length]} features are in.`);
  };

  const built = phase === "built";

  return (
    <div ref={stageRef} className="ctb-stage">
      {/* Brief. With several briefs, every brief's text is stacked
          invisibly in the same cell so swapping never changes the height. */}
      <div className="ctb-head">
        <div className="ctb-head__live" key={brief.id}>
          <HeadBody brief={brief} ids={{ title: titleId, instruction: instructionId }} level={titleLevel} />
        </div>
        {several
          ? list.map((b) => (
              <div key={b.id} className="ctb-sizer" aria-hidden="true" inert>
                <HeadBody brief={b} level={titleLevel} />
              </div>
            ))
          : null}
      </div>

      <div ref={gridRef} className="ctb-grid" role="group" aria-labelledby={`${titleId} ${instructionId}`}>
        {brief.features.map((f) => {
          const isCut = cut.includes(f.id);
          const tag = built ? result?.tags[f.id] : undefined;
          const tagText = tag === "cut" ? "I cut it" : tag === "kept" ? "I kept it" : null;
          return (
            <button
              key={f.id}
              type="button"
              className="ctb-chip"
              data-feature={f.id}
              aria-pressed={isCut}
              aria-label={tagText ? `Cut ${f.label}, ${tagText}` : `Cut ${f.label}`}
              onClick={() => toggle(f.id)}
            >
              <Scissors />
              <span className="ctb-chip__text">{f.label}</span>
              {tagText ? <span className="ctb-chip__tag" aria-hidden="true">{tagText}</span> : null}
            </button>
          );
        })}
      </div>

      <div className="ctb-actions">
        <Button size="lg" onClick={build}>{COPY.build}</Button>
        {several ? (
          <Button size="lg" variant="ghost" onClick={another} style={{ background: "var(--ctb-surface, var(--color-paper))" }}>
            {COPY.another}
          </Button>
        ) : null}
      </div>

      <div className="ctb-build">
        <div ref={frameRef} className="ctb-frame" data-phase={phase}>
          <p className="ctb-frame__hint" aria-hidden="true">{COPY.hint}</p>
          <div className="ctb-shot" aria-hidden={!built}>
            <Image
              key={brief.shot.src}
              src={brief.shot.src}
              alt={brief.shot.alt}
              fill
              sizes="(max-width: 759px) 100vw, 720px"
              style={{ objectFit: "cover" }}
              onLoad={() => { imgRef.current = true; }}
            />
          </div>
        </div>

        <div className="ctb-result">
          <div className="ctb-result__live">
            {result ? (
              <div key={result.summary + result.lines.join("")} className="ctb-result__in">
                <ResultBody result={result} link={brief.caseStudy} />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="ctb-canvas" aria-hidden="true" />
      <div className="ctb-sr" aria-live="polite" aria-atomic="true">{live}</div>

      {/* One copy for every instance on the page: React hoists it to the
          head and dedupes it by href. */}
      <style href="cut-then-build" precedence="default">{CSS}</style>
    </div>
  );
}

/* Layout runs on container queries against .ctb, the block's wrapper,
   so an embedded block follows its parent's column. The two widths are
   the band's content column at the old 760px and 1280px viewport
   breakpoints, so the band lays out exactly as before. */
const CSS = `
  .ctb { container: ctb / inline-size; width: 100%; min-width: 0; }

  .ctb-sr {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
  }

  /* The stage bleeds out by its own padding so its content stays on the
     column's left rail while the dot field runs a little wider. */
  .ctb-stage {
    --ctb-pad: clamp(16px, 3vw, 40px);
    position: relative;
    isolation: isolate;
    overflow: hidden;
    margin: 0 calc(-1 * var(--ctb-pad));
    padding: var(--ctb-pad);
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: "head" "grid" "actions" "build";
    font-family: var(--font-dm-sans), sans-serif;
  }
  .ctb-canvas {
    position: absolute; top: 0; left: 0; z-index: 2;
    pointer-events: none;
  }

  .ctb-head { grid-area: head; display: grid; }
  .ctb-head > *, .ctb-result > * { grid-area: 1 / 1; min-width: 0; }
  .ctb-sizer { visibility: hidden; pointer-events: none; }
  .ctb-title {
    margin: 0; font-size: var(--text-h3); font-weight: 500; line-height: 1.3;
    letter-spacing: -0.01em; color: var(--color-text);
  }
  .ctb-brief {
    margin: 8px 0 0; max-width: 34em; font-size: var(--text-body); line-height: 1.55;
    color: var(--color-neutral-700);
  }
  .ctb-instruction {
    margin: 20px 0 0; font-size: var(--text-h3); font-weight: 500; line-height: 1.4;
    color: var(--color-text);
  }

  /* Feature grid. Rows are a multiple of the 24px dot pitch and the
     grid's ::before carries the dot field, anchored to this corner, so
     every chip sits centered between two dot rows. */
  .ctb-grid {
    --ctb-halo-above: 0;
    grid-area: grid;
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 24px;
    grid-auto-rows: 96px;
    align-items: center;
    padding-top: 12px;
  }
  .ctb-grid::before {
    content: "";
    position: absolute;
    top: -2004px; left: -2016px; right: -2016px; bottom: -2016px;
    z-index: -1;
    pointer-events: none;
    background-image: radial-gradient(circle, var(--color-terracotta-300) 1px, transparent 1px);
    background-size: 24px 24px;
  }

  /* A coupon: 44px, square, paper, with a dashed neutral-600 border
     (7.19:1) and scissors on its left edge. Pressed means cut: the border
     goes solid, the fill goes neutral-100 (neutral-600 text on it is
     6.59:1), the label is struck through, its dots dim, and the coupon
     sits 2px out of line. State never rides on a neutral-400 border,
     which fails 3:1. */
  .ctb-chip {
    --ctb-fill: var(--ctb-surface, var(--color-paper));
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 44px;
    padding: 10px 12px;
    border: 1px dashed var(--color-neutral-600);
    border-radius: var(--radius-chip);
    background: var(--ctb-fill);
    font-family: inherit;
    font-size: var(--text-body);
    font-weight: 500;
    line-height: 1.3;
    text-align: left;
    color: var(--color-neutral-700);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
  }
  .ctb-chip:focus-visible { outline: 2px solid var(--color-focus-ring); outline-offset: 3px; }
  /* The scissors sit on the left border, centered on the cut line. A 3px
     strip under them breaks the dashes and leaves the rest of the box
     clear, so the focus ring still shows through. */
  .ctb-chip__scissors {
    position: absolute; left: -7px; top: calc(50% - 7px);
    background: linear-gradient(90deg, transparent 5px, var(--ctb-surface, var(--color-paper)) 5px 6px, var(--ctb-fill) 6px 8px, transparent 8px);
    pointer-events: none;
  }
  /* The strike is a real line-through, so it follows a label that wraps
     to two lines on a phone. */
  .ctb-chip__text {
    text-decoration-line: line-through;
    text-decoration-thickness: 1px;
    text-decoration-color: transparent;
    transition: text-decoration-color 0.2s ease;
  }
  .ctb-chip[aria-pressed="true"] {
    --ctb-fill: var(--color-neutral-100);
    color: var(--color-neutral-600);
    border-style: solid;
    transform: translate(2px, 2px);
  }
  .ctb-chip[aria-pressed="true"] .ctb-chip__text { text-decoration-color: currentColor; }
  @media (hover: hover) {
    .ctb-chip:hover { border-color: var(--color-text); color: var(--color-text); }
    .ctb-chip[aria-pressed="true"]:hover { border-color: var(--color-neutral-700); color: var(--color-neutral-700); }
  }
  @media (forced-colors: active) {
    .ctb-chip__scissors { background: linear-gradient(90deg, transparent 5px, Canvas 5px 8px, transparent 8px); }
  }
  /* After a build: where my call differs, a tag on the chip's top edge,
     so the chip never changes size. */
  .ctb-chip__tag {
    position: absolute; top: 0; right: 8px; transform: translateY(-50%);
    padding: 0 5px; border: 1px solid var(--color-text); border-radius: 4px;
    background: var(--ctb-surface, var(--color-paper)); color: var(--color-text);
    font-size: var(--text-small); font-weight: 500; line-height: 15px; white-space: nowrap;
    pointer-events: none;
  }

  /* Narrow columns: the buttons stack at one width. */
  .ctb-actions {
    grid-area: actions;
    display: grid; gap: 12px;
    margin-top: 8px;
    align-self: start;
  }

  .ctb-build { grid-area: build; min-width: 0; max-width: 720px; margin-top: 40px; }
  .ctb-frame {
    position: relative;
    aspect-ratio: 16 / 10;
    border-radius: var(--radius-panel);
    overflow: hidden;
    border: 1px solid var(--color-neutral-200);
    background: var(--ctb-surface, var(--color-paper));
  }
  .ctb-frame__hint {
    position: absolute; inset: 0; margin: 0;
    display: grid; place-items: center;
    font-size: var(--text-small); font-weight: 500; color: var(--color-neutral-600);
    transition: opacity 0.2s ease;
  }
  .ctb-frame[data-phase="building"] .ctb-frame__hint,
  .ctb-frame[data-phase="built"] .ctb-frame__hint { opacity: 0; }
  .ctb-shot { position: absolute; inset: 0; opacity: 0; transition: opacity 0.25s ease; }
  .ctb-frame[data-phase="built"] .ctb-shot { opacity: 1; transition-duration: 0.6s; }

  .ctb-result { display: grid; margin-top: 20px; }
  .ctb-result p {
    margin: 0; font-size: var(--text-body); line-height: 1.55; color: var(--color-neutral-700);
  }
  .ctb-result p + p { margin-top: 8px; }
  .ctb-result .ctb-summary { font-weight: 500; color: var(--color-text); }
  /* The case-study link is a 44px target; the text sits where a 16px gap
     would put it. */
  .ctb-result__link { margin-top: 5px; }
  .ctb-result__link .ui-linkarrow { min-height: 44px; }
  .ctb-result__in { animation: ctb-in 0.25s ease both; }
  @keyframes ctb-in { from { opacity: 0; } to { opacity: 1; } }

  @container ctb (min-width: 668px) {
    .ctb-grid {
      --ctb-halo-above: 1;
      grid-template-columns: repeat(3, 192px);
      grid-auto-rows: 120px;
      padding-top: 0;
    }
    .ctb-actions { display: flex; flex-wrap: wrap; }
  }

  @container ctb (min-width: 1126px) {
    .ctb-stage {
      grid-template-columns: 624px minmax(0, 1fr);
      grid-template-rows: auto auto 1fr;
      grid-template-areas: "head build" "grid build" "actions build";
      column-gap: 48px;
    }
    .ctb-build { max-width: none; margin-top: 0; align-self: start; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ctb-chip, .ctb-chip__text, .ctb-frame__hint, .ctb-shot,
    .ctb-frame[data-phase="built"] .ctb-shot { transition: none; }
    .ctb-chip[aria-pressed="true"] { transform: none; }
    .ctb-result__in { animation: none; }
  }
  /* "Stop the dots": the same instant cuts and swaps. The 2px knock
     stays, it just lands without sliding. */
  html[data-dots="still"] .ctb-chip,
  html[data-dots="still"] .ctb-chip__text,
  html[data-dots="still"] .ctb-frame__hint,
  html[data-dots="still"] .ctb-shot,
  html[data-dots="still"] .ctb-frame[data-phase="built"] .ctb-shot { transition: none; }
  html[data-dots="still"] .ctb-result__in { animation: none; }
`;
