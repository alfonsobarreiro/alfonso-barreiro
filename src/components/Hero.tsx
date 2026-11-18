"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CopyEmail, EMAIL } from "@/components/CopyEmail";
import { TryThis } from "@/components/home/TryThis";
import { DotPortrait } from "@/components/home/DotPortrait";
import HeroWeather, { HeroRain } from "@/components/home/HeroWeather";
import { DOTS_EVENT, getDots, setDots, type DotsState } from "@/lib/dots";

/**
 * Hero: who, whether, and how to reach me, on the 24px dot grid.
 *
 * Top to bottom: H1, the byline (the page's keyword H2, now visible), two
 * plain lines (what I make, availability), the actions (resume, email with
 * Copy, coffee), the studio door line below 1024px, and the cue row.
 *
 * - Ambient graph-paper dot grid across the hero background.
 * - Cursor-follows spotlight brightens the dots near the pointer.
 * - X-ray inside the spotlight: the hero's real structure, measured live.
 *   Hairlines for the left rail and the text column's right edge, the
 *   baseline of each rendered H1 line, and one 12px label beside the
 *   pointer naming the type spec, the lattice, or the portrait under it.
 *   Touch gets the same view at the tap point for 1.6s.
 * - Show the specs pins every label (a slot under the portrait from
 *   1024px, an inline list below the cue row under that). The same list,
 *   "How this hero is set", stays in the accessibility tree when unpinned.
 * - Portrait (1024px and up): a two-ink halftone on the lattice that comes
 *   into focus under the spotlight. Below 1024px a 56px photo sits beside
 *   the byline. See DotPortrait.
 * - "Stop the dots" (html[data-dots="still"]) and reduced motion: no
 *   tracking and no spotlight; the specs and the plain photo still work.
 *
 * Type stack: DM Sans only, weights 400 + 500.
 * Colors: --color-text (navy), --color-terracotta-300 (base dots),
 * --color-terracotta-500 (spotlight dots + x-ray hairlines),
 * --color-text-link (links), --color-neutral-600 on --color-paper (labels).
 */

type Box = { l: number; t: number; r: number; b: number };
type Hit = Box & { label: string };
type Guides = { rail: number; edge: number; baselines: number[] };

const LABEL_GAP_X   = 16;   // mouse: label sits right of and below the cursor
const LABEL_GAP_Y   = 20;
const LABEL_ABOVE   = 8;    // mouse near the hero's bottom: label sits above
const TOUCH_GAP     = 36;   // touch: label sits above the fingertip
const TOUCH_MIN_GAP = 16;   // closest a touch label may sit to the tap point
const LINE_HIT      = 4;    // px either side of a hairline that names it
const EDGE_PAD      = 8;    // keep the label inside the hero
const TOUCH_HOLD_MS = 1600;
const TOUCH_FADE    = "0.4s";
const TOUCH_FADE_MS = 400;
const SLOT_GAP      = 24;   // one lattice row between the portrait and the pinned specs

/* Pinned specs before the first measurement (and without JS): the values
   the 1440px desktop renders. Replaced by live measurements on mount. */
const DEFAULT_SPECS = [
  "H1, DM Sans 500, 88/92",
  "H2, DM Sans 500, 17/24",
  "Body, DM Sans 400, 17/24",
  "Body, DM Sans 400, 15/21",
  "Left rail, 100px",
  "Text column, 720px",
  "Dot grid, 24px. CSS calls that a quarter inch.",
];

/** One box per rendered line of an element's text, in section coordinates. */
function textLines(el: Element, origin: DOMRect): Box[] {
  const range = document.createRange();
  range.selectNodeContents(el);
  const lines: Box[] = [];
  for (const r of Array.from(range.getClientRects())) {
    if (r.width < 1 || r.height < 1) continue;
    const box = {
      l: r.left   - origin.left,
      t: r.top    - origin.top,
      r: r.right  - origin.left,
      b: r.bottom - origin.top,
    };
    const line = lines.find((ln) => Math.abs(ln.t - box.t) < 2);
    if (line) {
      line.l = Math.min(line.l, box.l);
      line.r = Math.max(line.r, box.r);
      line.b = Math.max(line.b, box.b);
    } else {
      lines.push(box);
    }
  }
  return lines;
}

/** Font family, weight, and size/line-height in px, read from the cascade. */
function typeSpec(el: Element) {
  const cs   = getComputedStyle(el);
  const size = parseFloat(cs.fontSize);
  const lh   = cs.lineHeight.endsWith("px")
    ? parseFloat(cs.lineHeight)
    : cs.lineHeight === "normal"
      ? size * 1.2
      : parseFloat(cs.lineHeight) * size;
  const family = cs.fontFamily.split(",")[0].replace(/["']/g, "").trim();
  return {
    cs,
    lineHeight: lh,
    text: `${family} ${cs.fontWeight}, ${Math.round(size)}/${Math.round(lh)}`,
  };
}

/* The dots state lives on <html data-dots>. Every control writes it with
   setDots, which fires DOTS_EVENT, so this button and the footer's stay
   in step. The server snapshot is "moving"; the head script may already
   have set "still", and the first client render picks that up. */
function subscribeDots(onChange: () => void) {
  window.addEventListener(DOTS_EVENT, onChange);
  return () => window.removeEventListener(DOTS_EVENT, onChange);
}
const serverDots = (): DotsState => "moving";

/* The DS ghost button at size sm, for the one control Button can't carry
   (it has no aria-pressed). Hover and focus come from .ui-btn in
   globals.css. */
const GHOST_SM: CSSProperties = {
  display:        "inline-flex",
  alignItems:     "center",
  justifyContent: "center",
  gap:            "8px",
  fontFamily:     "var(--font-dm-sans), -apple-system, sans-serif",
  fontWeight:     500,
  letterSpacing:  "0.01em",
  borderRadius:   "var(--radius-button)",
  cursor:         "pointer",
  transition:     "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
  padding:        "10px 18px",
  fontSize:       "var(--text-small)",
  background:     "transparent",
  color:          "var(--color-text)",
  border:         "1px solid var(--color-neutral-400)",
  minHeight:      "44px",
};

/** `audience="hiring"` is /hiring, the page job applications link to: no
    buyer's door (job applications never link the studio). */
export default function Hero({ audience = "all" }: { audience?: "all" | "hiring" } = {}) {
  const sectionRef  = useRef<HTMLElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);
  const colRef      = useRef<HTMLDivElement>(null);
  const h1Ref       = useRef<HTMLHeadingElement>(null);
  const h2Ref       = useRef<HTMLHeadingElement>(null);
  const labelRef    = useRef<HTMLSpanElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const specsRef    = useRef<HTMLDivElement>(null);
  const [guides, setGuides] = useState<Guides | null>(null);
  const [specs, setSpecs]   = useState<string[]>(DEFAULT_SPECS);
  const [pinned, setPinned] = useState(false);
  const dots  = useSyncExternalStore(subscribeDots, getDots, serverDots);
  const still = dots === "still";

  useEffect(() => {
    const section = sectionRef.current;
    const grid    = gridRef.current;
    const col     = colRef.current;
    const h1      = h1Ref.current;
    const h2      = h2Ref.current;
    const label   = labelRef.current;
    const specsEl = specsRef.current;
    if (!section || !grid || !col || !h1 || !h2 || !label || !specsEl) return;
    const portrait = portraitRef.current;

    let alive      = true;
    let lastGuides = "";
    let lastSpecs  = "";
    let lastText   = "";
    const labelSizes = new Map<string, [number, number]>();
    const ctx        = document.createElement("canvas").getContext("2d");

    // Measured on mount, on resize, and when fonts finish loading. Always
    // on, so Show the specs reads live values even with the dots still.
    const m = {
      hits:          [] as Hit[],
      rail:          0,
      edge:          0,
      railLabel:     "",
      edgeLabel:     "",
      gridLabel:     "",
      navClear:      0,
      portrait:      null as Box | null,
      portraitLabel: "",
    };

    const measure = () => {
      if (!alive) return;
      const origin = section.getBoundingClientRect();
      const column = col.getBoundingClientRect();

      // H1: one hit box per rendered line, plus its baseline. The client
      // rect of a text line is the font's content area (ascent + descent),
      // so the baseline sits at the ascent share of that height.
      const h1Spec  = typeSpec(h1);
      const h1Lines = textLines(h1, origin);
      let ascentShare = 0.76;
      if (ctx) {
        ctx.font = `${h1Spec.cs.fontWeight} ${h1Spec.cs.fontSize} ${h1Spec.cs.fontFamily}`;
        const mt = ctx.measureText("H");
        if (mt.fontBoundingBoxAscent > 0 && mt.fontBoundingBoxDescent > 0) {
          ascentShare = mt.fontBoundingBoxAscent / (mt.fontBoundingBoxAscent + mt.fontBoundingBoxDescent);
        }
      }

      const next: Hit[] = [];
      const push = (lines: Box[], lineHeight: number, text: string) => {
        for (const ln of lines) {
          // Grow short content areas to the full line box so the label
          // does not flicker in the leading between body lines.
          const lead = Math.max(0, (lineHeight - (ln.b - ln.t)) / 2);
          next.push({ l: ln.l - 4, t: ln.t - lead, r: ln.r + 4, b: ln.b + lead, label: text });
        }
      };
      push(h1Lines, h1Spec.lineHeight, `H1, ${h1Spec.text}`);
      const h2Spec = typeSpec(h2);
      push(textLines(h2, origin), h2Spec.lineHeight, `H2, ${h2Spec.text}`);
      for (const p of Array.from(col.querySelectorAll("[data-xray]"))) {
        if (!p.getClientRects().length) continue;   // display: none at this width
        const spec = typeSpec(p);
        push(textLines(p, origin), spec.lineHeight, `Body, ${spec.text}`);
      }
      m.hits = next;

      const sectionCs = getComputedStyle(section);
      const lattice   = sectionCs.backgroundSize.split(" ")[0];
      const pitch     = parseFloat(lattice) || 24;
      m.gridLabel = `Dot grid, ${lattice}. CSS calls that a quarter inch.`;
      // The hero's scroll-margin-top is the fixed nav's height. A touch
      // label never tucks under it.
      m.navClear  = parseFloat(sectionCs.scrollMarginTop) || 0;

      m.rail = Math.round(column.left  - origin.left);
      m.edge = Math.round(column.right - origin.left);
      m.railLabel = `Left rail, ${m.rail}px`;
      m.edgeLabel = `Text column, ${Math.round(column.width)}px`;

      // Portrait (1024px and up): its box for the label, its offset for
      // the photo's mask, and the pinned-specs slot one row under it.
      m.portrait = null;
      if (portrait && portrait.getClientRects().length) {
        const r = portrait.getBoundingClientRect();
        const g = grid.getBoundingClientRect();
        m.portrait = {
          l: r.left   - origin.left,
          t: r.top    - origin.top,
          r: r.right  - origin.left,
          b: r.bottom - origin.top,
        };
        portrait.style.setProperty("--pl", `${m.portrait.l}px`);
        portrait.style.setProperty("--pt", `${m.portrait.t}px`);
        const w = Math.round(r.width);
        const h = Math.round(r.height);
        m.portraitLabel = `Portrait, ${w} by ${h}px, ${Math.round(w / pitch)} by ${Math.round(h / pitch)} grid squares.`;
        specsEl.style.setProperty("--specs-x", `${Math.round(r.left - g.left)}px`);
        specsEl.style.setProperty("--specs-y", `${Math.round(r.bottom - g.top + SLOT_GAP)}px`);
      }

      labelSizes.clear();
      lastText = "";

      const gd: Guides = {
        rail:      m.rail,
        edge:      m.edge,
        baselines: h1Lines.map((ln) => Math.round(ln.t + (ln.b - ln.t) * ascentShare)),
      };
      const gKey = JSON.stringify(gd);
      if (gKey !== lastGuides) {
        lastGuides = gKey;
        setGuides(gd);
      }

      // The pinned list: every label the pointer can find, once each, in
      // reading order.
      const list: string[] = [];
      for (const hit of next) if (!list.includes(hit.label)) list.push(hit.label);
      list.push(m.railLabel, m.edgeLabel, m.gridLabel);
      if (m.portrait) list.push(m.portraitLabel);
      const sKey = JSON.stringify(list);
      if (sKey !== lastSpecs) {
        lastSpecs = sKey;
        setSpecs(list);
      }
    };

    const labelFor = (x: number, y: number) => {
      // A hairline under the pointer wins: it is the most precise target.
      if (Math.abs(x - m.rail) <= LINE_HIT)       return m.railLabel;
      if (Math.abs(x - (m.edge - 1)) <= LINE_HIT) return m.edgeLabel;
      for (const h of m.hits) {
        if (x >= h.l && x <= h.r && y >= h.t && y <= h.b) return h.label;
      }
      const p = m.portrait;
      if (p && x >= p.l && x <= p.r && y >= p.t && y <= p.b) return m.portraitLabel;
      return m.gridLabel;
    };

    // Pointer tracking: only while the dots move and motion is allowed.
    const setup = () => {
      let raf       = 0;
      let timer     = 0;
      let outTimer  = 0;
      let clientX   = 0;
      let clientY   = 0;
      let touchMode = false;

      const frame = () => {
        raf = 0;
        const rect = section.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        section.style.setProperty("--mouse-x", `${x}px`);
        section.style.setProperty("--mouse-y", `${y}px`);
        section.style.setProperty("--spotlight-opacity", "1");

        const text = labelFor(x, y);
        if (text !== lastText) {
          label.textContent = text;
          lastText = text;
        }
        let size = labelSizes.get(text);
        if (!size) {
          size = [label.offsetWidth, label.offsetHeight];
          labelSizes.set(text, size);
        }
        const [w, h] = size;
        const W = rect.width;
        const H = rect.height;

        let lx: number;
        let ly: number;
        if (touchMode) {
          // Centered above the fingertip so the finger never covers it.
          // Clamp below the fixed nav; drop under the finger only when
          // there is no room above.
          lx = Math.min(Math.max(x - w / 2, EDGE_PAD), W - w - EDGE_PAD);
          const minTop = Math.max(EDGE_PAD, m.navClear - rect.top + 4);
          ly = Math.max(y - TOUCH_GAP - h, minTop);
          if (y - (ly + h) < TOUCH_MIN_GAP) ly = Math.min(y + TOUCH_GAP, H - h - EDGE_PAD);
        } else {
          lx = x + LABEL_GAP_X;
          if (lx + w > W - EDGE_PAD) lx = x - LABEL_GAP_X - w;
          ly = y + LABEL_GAP_Y;
          if (ly + h > H - EDGE_PAD) ly = y - LABEL_ABOVE - h;
        }
        label.style.transform = `translate3d(${Math.round(lx)}px, ${Math.round(ly)}px, 0)`;
      };

      const schedule = () => {
        if (!raf) raf = requestAnimationFrame(frame);
      };

      const clearReveal = () => {
        window.clearTimeout(outTimer);
        portrait?.removeAttribute("data-reveal");
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType === "touch") return;
        if (touchMode) {
          touchMode = false;
          window.clearTimeout(timer);
          clearReveal();
          section.style.removeProperty("--spotlight-fade");
        }
        clientX = e.clientX;
        clientY = e.clientY;
        schedule();
      };

      const onLeave = (e: PointerEvent) => {
        if (e.pointerType === "touch") return;
        cancelAnimationFrame(raf);
        raf = 0;
        section.style.setProperty("--spotlight-opacity", "0");
      };

      // Touch: a passive listener, so scrolling is never blocked. Shows the
      // spotlight and x-ray at the tap point, holds, then fades. A tap on
      // the portrait (touch tablets) brings the whole photo into focus for
      // the same hold.
      const onDown = (e: PointerEvent) => {
        if (e.pointerType !== "touch") return;
        // A tap on a control is for the control, not the grid.
        if ((e.target as Element | null)?.closest?.("a, button")) return;
        touchMode = true;
        clientX = e.clientX;
        clientY = e.clientY;
        window.clearTimeout(timer);
        section.style.removeProperty("--spotlight-fade");
        schedule();

        const rect = section.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const p = m.portrait;
        clearReveal();
        if (portrait && p && x >= p.l && x <= p.r && y >= p.t && y <= p.b) {
          portrait.setAttribute("data-reveal", "in");
        }

        timer = window.setTimeout(() => {
          section.style.setProperty("--spotlight-fade", TOUCH_FADE);
          section.style.setProperty("--spotlight-opacity", "0");
          if (portrait?.hasAttribute("data-reveal")) {
            portrait.setAttribute("data-reveal", "out");
            outTimer = window.setTimeout(() => portrait.removeAttribute("data-reveal"), TOUCH_FADE_MS);
          }
        }, TOUCH_HOLD_MS);
      };

      section.addEventListener("pointermove", onMove);
      section.addEventListener("pointerleave", onLeave);
      section.addEventListener("pointerdown", onDown, { passive: true });

      return () => {
        section.removeEventListener("pointermove", onMove);
        section.removeEventListener("pointerleave", onLeave);
        section.removeEventListener("pointerdown", onDown);
        cancelAnimationFrame(raf);
        window.clearTimeout(timer);
        clearReveal();
        section.style.setProperty("--spotlight-opacity", "0");
        section.style.removeProperty("--spotlight-fade");
        section.style.removeProperty("--mouse-x");
        section.style.removeProperty("--mouse-y");
      };
    };

    const ro = new ResizeObserver(() => measure());
    ro.observe(section);
    ro.observe(h1);
    document.fonts?.ready.then(measure);
    document.fonts?.addEventListener("loadingdone", measure);

    // "Stop the dots": no tracking. Reduced motion arrives here as "still"
    // too (the head script in layout.tsx maps it), so a visitor who turns
    // the dots back on gets them. A change takes effect without a reload.
    let teardown: (() => void) | null = null;
    const sync = () => {
      teardown?.();
      teardown = getDots() !== "still" ? setup() : null;
    };
    sync();
    window.addEventListener(DOTS_EVENT, sync);

    return () => {
      alive = false;
      ro.disconnect();
      document.fonts?.removeEventListener("loadingdone", measure);
      window.removeEventListener(DOTS_EVENT, sync);
      teardown?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-section hero-dotgrid"
      data-specs={pinned ? "on" : undefined}
      style={{
        padding:              "var(--hero-pad-top) var(--hero-pad-x)",
        position:             "relative",
        overflow:             "hidden",
        backgroundColor:      "var(--color-paper)",
        /* Base graph-paper dot grid. The overlay ::before layer adds the
           cursor-follows spotlight (see the <style> block below). */
        backgroundImage:      "radial-gradient(circle, var(--color-terracotta-300) 1px, transparent 1px)",
        backgroundSize:       "24px 24px",
        backgroundPosition:   "0 0",
      }}
    >
      {/* Rain drip (PORTLAND.rainDrip): when KPDX reports rain, sparse
          lattice columns drift down. Behind the text, aria-hidden, CSS
          keyframes only. See HeroWeather. */}
      <HeroRain sectionRef={sectionRef} colRef={colRef} portraitRef={portraitRef} />

      {/* X-ray guides: the hero's measured structure, revealed only inside
          the spotlight (or everywhere while the specs are pinned). Above
          the dots, below the text. Decorative. */}
      <div className="hero-xray" aria-hidden="true">
        {guides && (
          <>
            <span className="hero-xray__v" style={{ left: guides.rail }} />
            <span className="hero-xray__v" style={{ left: guides.edge - 1 }} />
            {guides.baselines.map((y, i) => (
              <span
                key={i}
                className="hero-xray__h"
                style={{ top: y, left: guides.rail, width: guides.edge - guides.rail }}
              />
            ))}
          </>
        )}
      </div>

      <div ref={gridRef} className="hero-grid">
        <div ref={colRef} className="hero-text-col">
          <h1 ref={h1Ref} className="hero-h1">
            I cut scope, then build what&rsquo;s left.
          </h1>

          {/* Byline: the page's keyword heading, visible. Below 1024px the
              56px photo sits beside it. */}
          <div className="hero-byline">
            <DotPortrait variant="avatar" className="hero-avatar" />
            <h2 ref={h2Ref} className="hero-byline__text">
              Alfonso Barreiro, designer and web developer in Portland, Oregon.
            </h2>
          </div>

          <p className="hero-line" data-xray="">
            Fifteen years of websites, logos, print, and products. I design in Figma and build in React, Next.js, and Squarespace.
          </p>
          <p className="hero-line hero-line--status" data-xray="">
            Open to design and web development roles, contract or full-time.
          </p>

          <div className="hero-actions">
            <Button href="/resume" variant="primary" size="lg" style={{ minHeight: "44px" }}>
              See the resume
            </Button>
            <span className="hero-email">
              <a href={`mailto:${EMAIL}`} className="hero-link">{EMAIL}</a>
              <CopyEmail label="Copy" className="hero-copy" />
            </span>
            <a
              href="https://cal.com/alfonso-barreiro"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link"
            >
              Book a coffee chat
              <span style={{ position: "absolute", width: 1, height: 1, margin: -1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}> (opens in a new tab)</span>
            </a>
          </div>

          {/* The buyer's door. Below 1024px only: the desktop nav carries
              Studio. Not on /hiring. */}
          {audience !== "hiring" && (
            <p className="hero-door" data-xray="">
              Need a site or a logo for your business?{" "}
              <Link href="/#studio" className="hero-link hero-link--inline">Find your package</Link>
            </p>
          )}

          <div className="hero-cue">
            <p className="hero-cue__text" data-xray="">
              <TryThis />
              <span className="hero-cue__pointer">Point at the grid. It names what&rsquo;s under your pointer.</span>
              <span className="hero-cue__touch">Tap the grid. It names what&rsquo;s under your finger.</span>
            </p>
            <div className="hero-cue__buttons">
              <button
                type="button"
                className="ui-btn ui-btn--ghost ui-btn--rect hero-specs-btn"
                style={GHOST_SM}
                aria-pressed={pinned}
                aria-controls="hero-specs"
                onClick={() => setPinned((p) => !p)}
              >
                Show the specs
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDots(still ? "moving" : "still")}
                className="hero-dots-btn"
                style={{ minHeight: "44px" }}
              >
                {/* Both labels share one grid cell, so the button keeps the
                    width of the longer one and the swap never shifts the
                    row. The label names the action, so no aria-pressed. */}
                <span style={{ display: "inline-grid" }}>
                  <span style={{ gridArea: "1 / 1", visibility: still ? "hidden" : "visible" }} aria-hidden={still}>Stop the dots</span>
                  <span style={{ gridArea: "1 / 1", visibility: still ? "visible" : "hidden" }} aria-hidden={!still}>Start the dots</span>
                </span>
              </Button>
            </div>
          </div>

          {/* The KPDX caption (1024px and up), under the cue row beside
              the Stop the dots button it refers to. See HeroWeather. */}
          <HeroWeather />

          {/* Every x-ray label as a list. Visually hidden until pinned; on
              wide screens it pins into the slot under the portrait, below
              1024px it opens under the cue row. */}
          <div ref={specsRef} id="hero-specs" className="hero-specs">
            <h3 className="hero-specs__title">How this hero is set</h3>
            <ul className="hero-specs__list">
              {specs.map((s) => (
                <li key={s}><span className="hero-chip">{s}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Two-ink portrait on the lattice, 1024px and up. */}
      <DotPortrait variant="print" className="hero-portrait" ref={portraitRef} />

      {/* X-ray label: names what is under the pointer. Written by the
          effect above (textContent + transform), never by React. */}
      <span ref={labelRef} className="hero-xray__label hero-chip" aria-hidden="true" />

      <style>{`
        .hero-section {
          --hero-pad-top: clamp(96px, 12vw, 160px);
          --hero-pad-x:   clamp(32px, 6vw, 80px);
          --hero-h1:      clamp(40px, 7vw, 88px);
        }
        .hero-grid {
          max-width: var(--content-max);
          margin: 0 auto;
          width: 100%;
          position: relative;
          z-index: 1;
        }
        .hero-text-col { max-width: 720px; }

        .hero-h1 {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: var(--hero-h1);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--color-text);
          margin: 0 0 20px;
          max-width: 18ch;
        }
        .hero-byline {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 0 0 20px;
        }
        .hero-byline__text {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: var(--text-article);
          line-height: 1.4;
          font-weight: 500;
          letter-spacing: 0;
          color: var(--color-text);
          margin: 0;
        }
        .hero-line {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: var(--text-article);
          line-height: 1.4;
          font-weight: 400;
          letter-spacing: 0;
          color: var(--color-text);
          margin: 0;
        }
        .hero-line--status { margin-top: 8px; }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px 28px;
          margin-top: 32px;
        }
        .hero-email { display: inline-flex; align-items: center; gap: 4px; }
        .hero-link {
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: var(--text-body);
          font-weight: 500;
          color: var(--color-text-link);
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 3px;
          transition: color 0.2s ease;
        }
        .hero-link:hover { color: var(--color-text-link-hover); }
        .hero-link:focus-visible,
        .hero-copy:focus-visible {
          outline: 2px solid var(--color-focus-ring);
          outline-offset: 2px;
        }
        /* Copy: a small chip inside a 44px target. */
        .hero-copy {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          min-width: 44px;
          padding: 0 4px;
          background: none;
          border: 0;
          cursor: pointer;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: var(--text-small);
          font-weight: 500;
          letter-spacing: 0.01em;
          color: var(--color-text);
        }
        .hero-copy > span {
          border: 1px solid var(--color-neutral-400);
          padding: 4px 8px;
          line-height: 16px;
          transition: border-color 0.2s ease;
        }
        .hero-copy:hover > span { border-color: var(--color-neutral-600); }

        .hero-door {
          display: none;
          margin: 16px 0 0;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: var(--text-body);
          line-height: 1.4;
          color: var(--color-text);
        }
        .hero-link--inline { vertical-align: middle; }

        .hero-cue {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px 16px;
          margin-top: 24px;
        }
        .hero-cue__text {
          flex: 1 1 auto;
          margin: 0;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: var(--text-body);
          line-height: 1.4;
          color: var(--color-text);
        }
        .hero-cue__touch { display: none; }
        @media (hover: none) {
          .hero-cue__pointer { display: none; }
          .hero-cue__touch   { display: inline; }
        }
        .hero-cue__buttons { display: flex; flex-wrap: wrap; gap: 8px; }
        .hero-specs-btn[aria-pressed="true"] {
          border-color: var(--color-text) !important;
          background: var(--color-neutral-100) !important;
        }

        /* Labels: the floating x-ray label and the pinned list share one
           chip. Sharp corners. */
        .hero-chip {
          display: inline-block;
          white-space: nowrap;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: var(--text-small);
          font-weight: 500;
          line-height: 16px;
          letter-spacing: 0;
          color: var(--color-neutral-600);
          background: var(--color-paper);
          padding: 2px 6px;
          border-radius: 0;
        }

        /* The specs list: in the accessibility tree always, on screen
           only when pinned. */
        .hero-specs {
          position: absolute;
          width: 1px;
          height: 1px;
          margin: -1px;
          padding: 0;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
          border: 0;
        }
        .hero-specs__title {
          margin: 0;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: var(--text-small);
          font-weight: 500;
          line-height: 24px;
          color: var(--color-text);
        }
        .hero-specs__list { list-style: none; margin: 0; padding: 0; }
        .hero-specs__list li { display: block; height: 24px; }
        .hero-section[data-specs="on"] .hero-specs {
          position: static;
          width: auto;
          height: auto;
          margin: 16px 0 0;
          overflow: visible;
          clip: auto;
        }
        .hero-section[data-specs="on"] .hero-specs__title { padding: 0 6px; }

        .hero-portrait { display: none; }

        @media (max-width: 767px) {
          .hero-h1 { margin-bottom: 16px; }
        }
        @media (max-width: 1023px) {
          .hero-door { display: block; }
        }
        @media (min-width: 1024px) {
          .hero-avatar { display: none; }
          /* Leave the portrait's column clear, snap included. */
          .hero-text-col { max-width: min(720px, calc(100% - 360px)); }
          /* Portrait top: the H1's cap line, snapped to a lattice dot
             (dots sit at 12px + 24n in section coordinates). */
          .hero-section {
            --hero-ptop: calc(var(--hero-pad-top) + 0.166 * var(--hero-h1));
            /* Room for the portrait and the pinned specs under it, so
               pinning never grows the hero. */
            min-height: calc(var(--hero-ptop) + 384px + ${SLOT_GAP}px + 216px + 48px);
          }
          .hero-section > .hero-portrait {
            display: block;
            position: absolute;
            z-index: 1;
            top: var(--hero-ptop);
            /* Right edge on the content column's right edge. 100% is the
               section's width here (the containing block). */
            --c: calc(100% - 2 * var(--hero-pad-x));
            left: calc(var(--hero-pad-x) + (var(--c) + min(var(--c), var(--content-max))) / 2 - 288px);
          }
          .hero-section[data-specs="on"] .hero-specs {
            position: absolute;
            z-index: 2;
            left: var(--specs-x, 0px);
            top: var(--specs-y, 0px);
            margin: 0;
          }
        }
        @supports (top: round(down, 1px, 1px)) {
          @media (min-width: 1024px) {
            .hero-section {
              --hero-ptop: calc(round(nearest, var(--hero-pad-top) + 0.166 * var(--hero-h1) - 12px, 24px) + 12px);
            }
            .hero-section > .hero-portrait {
              left: calc(round(down, var(--hero-pad-x) + (var(--c) + min(var(--c), var(--content-max))) / 2 - 300px, 24px) + 12px);
            }
          }
        }

        /* Cursor spotlight: a second dot layer in terracotta-500, revealed
           only inside a radial mask centered at the cursor. Pointer
           events pass through so the overlay never intercepts clicks.
           Touch shows it at the tap point (opacity is 0 until then). */
        .hero-dotgrid::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(circle, var(--color-terracotta-500) 2px, transparent 2px);
          background-size: 24px 24px;
          background-position: 0 0;
          opacity: var(--spotlight-opacity, 0);
          -webkit-mask-image: radial-gradient(circle 220px at var(--mouse-x, -9999px) var(--mouse-y, -9999px), black 0%, transparent 70%);
                  mask-image: radial-gradient(circle 220px at var(--mouse-x, -9999px) var(--mouse-y, -9999px), black 0%, transparent 70%);
          transition: opacity var(--spotlight-fade, 0.2s) ease;
          z-index: 0;
        }
        /* X-ray guides share the spotlight's mask, opacity, and timing. */
        .hero-xray {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: var(--spotlight-opacity, 0);
          -webkit-mask-image: radial-gradient(circle 220px at var(--mouse-x, -9999px) var(--mouse-y, -9999px), black 0%, transparent 70%);
                  mask-image: radial-gradient(circle 220px at var(--mouse-x, -9999px) var(--mouse-y, -9999px), black 0%, transparent 70%);
          transition: opacity var(--spotlight-fade, 0.2s) ease;
        }
        /* Pinned (768px and up): every guide, full strength, no mask.
           Phones get the list only, so nothing draws over the text. */
        @media (min-width: 768px) {
          .hero-section[data-specs="on"] .hero-xray {
            display: block;
            opacity: 1;
            -webkit-mask-image: none;
                    mask-image: none;
          }
        }
        .hero-xray__v,
        .hero-xray__h {
          position: absolute;
          background: var(--color-terracotta-500);
        }
        .hero-xray__v { top: 0; bottom: 0; width: 1px; }
        .hero-xray__h { height: 1px; }
        /* The label stays unmasked so it holds full contrast. */
        .hero-xray__label {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          pointer-events: none;
          opacity: var(--spotlight-opacity, 0);
          transition: opacity var(--spotlight-fade, 0.2s) ease;
          will-change: transform;
        }
        /* Portland rain (PORTLAND.rainDrip, see HeroWeather), 1024px and
           up only.
           Caption: the hero's label chip, wrapping, one lattice row's
           line height. Its anchor has no height and the line sits in the
           hero's bottom padding, so filling it in late shifts nothing and
           an empty slot costs nothing. Two lines are reserved; the
           longest caption takes two at 1024px.
           Drip: each column is one lattice column of the spotlight's lit
           dots (terracotta-500, 2px) at low opacity, masked to a streak.
           The dots hold on the lattice, then run down one pitch, so they
           stay in register. */
        .hero-weather,
        .hero-rain { display: none; }
        @media (min-width: 1024px) {
          .hero-weather { display: block; position: relative; height: 0; }
          .hero-weather__caption {
            position: absolute;
            top: 16px;
            left: 0;
            right: 0;
            height: 48px;
            margin: 0;
            font-family: var(--font-dm-sans), sans-serif;
            font-size: var(--text-small);
            line-height: 24px;
          }
          .hero-weather__text {
            display: inline;
            white-space: normal;
            -webkit-box-decoration-break: clone;
                    box-decoration-break: clone;
          }
          .hero-rain {
            display: block;
            position: absolute;
            inset: 0;
            z-index: 0;
            overflow: hidden;
            pointer-events: none;
          }
          .hero-rain__col {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 24px;
          }
          .hero-rain__dots {
            position: absolute;
            top: -24px;
            bottom: 0;
            left: 0;
            right: 0;
            background-image: radial-gradient(circle, var(--color-terracotta-500) 2px, transparent 2px);
            background-size: 24px 24px;
            background-position: 0 0;
            animation: hero-rain-run var(--rain-dur, 3.2s) infinite;
            animation-delay: var(--rain-delay, 0s);
            will-change: transform;
          }
        }
        @keyframes hero-rain-run {
          0%, 45% { transform: translate3d(0, 0, 0); animation-timing-function: cubic-bezier(0.55, 0, 0.45, 1); }
          100%    { transform: translate3d(0, 24px, 0); }
        }
        :root[data-dots="still"] .hero-rain { display: none; }
        @media (forced-colors: active) { .hero-rain { display: none; } }

        /* Stop the dots (reduced motion starts there): the static grid
           only. The pinned specs (list and guides) still show. The cue
           line promises the pointer layer, so it goes too; visibility
           keeps its space, and the buttons stay. */
        :root[data-dots="still"] .hero-dotgrid::before,
        :root[data-dots="still"] .hero-xray__label,
        :root[data-dots="still"] .hero-section:not([data-specs="on"]) .hero-xray { display: none; }
        :root[data-dots="still"] .hero-cue__text { visibility: hidden; }
      `}</style>
    </section>
  );
}
