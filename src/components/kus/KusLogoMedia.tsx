import Image from "next/image";
import type { CSSProperties } from "react";
import { KUS_COPY } from "@/components/kus/copy";

/* Card media for the Logos band (the logo pick, "D layout, C panels, real
   places", vault note "Logo options 2026-10-24"). Server components, no
   client state: the slider is gone, and every size here comes from the
   page width alone, so nothing shifts while the images load.

   - LogoTileMedia: a paper panel (14px radius) inside the card's plate,
     holding the mark in its own colors, so no client art is recolored.
     Tiles show the compact form. A wide tile (BeCourageous on /hiring)
     shows the full lockup at its fullFrom height when its panel can hold
     it (a container query per slug), else the compact form.
   - LogoLeadMedia: the Men's Sole Revival shield drawn large on the plate,
     with keylines along its own box and dashed center axes (no clear-space
     number until it is confirmed in the MSR Figma file), and a paper panel
     listing where it runs on menssolerevival.com: the nav lockup (48px from
     768px, 40px below, the same breakpoint MSR's nav uses), the home screen
     icon (navy ground, as app/apple-icon.tsx) and the 16px browser tab.

   Art: public/images/work/logos/marks/ (the files LogoSizer uses), trimmed
   to the ink. Marks are decorative (alt=""): each card's title link names
   the piece. The lead panel's words are real text, and the lead's link
   points aria-describedby at them. */

const DIR = "/images/work/logos/marks";

type Art = { src: string; w: number; h: number };
type Mark = {
  full: Art;
  compact: Art;
  /** The full lockup holds down to this height (LogoSizer's thresholds). */
  fullFrom: 24 | 32 | 96;
  /** The compact mark's height as a share of the tile panel, so the marks
      read as equal in weight. */
  tileScale: number;
};

const MARKS: Record<string, Mark> = {
  "sky-valley-comm": {
    full:    { src: `${DIR}/sky-valley-comm-full.png`, w: 1319, h: 404 },
    compact: { src: `${DIR}/sky-valley-comm-compact.png`, w: 389, h: 404 },
    fullFrom: 96, tileScale: 0.55,
  },
  "nq-zebraworks": {
    full:    { src: `${DIR}/nq-zebraworks-full.png`, w: 1600, h: 520 },
    compact: { src: `${DIR}/nq-zebraworks-compact.png`, w: 1193, h: 828 },
    fullFrom: 24, tileScale: 0.48,
  },
  "becourageous-leadership": {
    full:    { src: `${DIR}/becourageous-leadership-full.png`, w: 860, h: 359 },
    compact: { src: `${DIR}/becourageous-leadership-compact.png`, w: 419, h: 350 },
    fullFrom: 96, tileScale: 0.5,
  },
  "alpha-beta-mark": {
    full:    { src: `${DIR}/alpha-beta-mark-full.png`, w: 1600, h: 153 },
    compact: { src: `${DIR}/alpha-beta-mark-compact.png`, w: 1478, h: 677 },
    fullFrom: 24, tileScale: 0.3,
  },
};

const SHIELD = {
  full:    { src: `${DIR}/mens-sole-revival-shield-full.png`, w: 1600, h: 415 },
  compact: { src: `${DIR}/mens-sole-revival-shield-compact.png`, w: 804, h: 1011 },
};

/* The panel's inset inside the plate, and the room a full lockup needs
   around it (18px a side) before the tile shows it. */
const TILE_INSET = "clamp(14px, 2vw, 26px)";
const FULL_ROOM = 36;

/* One container rule per wide-capable mark: the full form shows once the
   panel can hold it at its fullFrom height. */
const SWAP_CSS = Object.entries(MARKS)
  .map(([slug, m]) => {
    const minW = Math.ceil(m.fullFrom * (m.full.w / m.full.h)) + FULL_ROOM;
    const minH = m.fullFrom + FULL_ROOM;
    return `@container ltile (min-width: ${minW}px) and (min-height: ${minH}px) {
  .ltile[data-wide][data-slug="${slug}"] .ltile__full { display: block; }
  .ltile[data-wide][data-slug="${slug}"] .ltile__compact { display: none; }
}`;
  })
  .join("\n");

const ar = (a: Art) => `${a.w} / ${a.h}`;

/** The full lockup on its own: no plate, no panel (Work highlights,
    2026-10-27: "remove the backgrounds from the logos"). It fills the
    card's screen and stands on its left edge, the caption's rail; the
    screen sets the size. */
export function LogoMarkMedia({ slug, sizes }: { slug: string; sizes: string }) {
  const m = MARKS[slug];
  if (!m) return null;
  return (
    <>
      <style href="kus-logo-mark" precedence="default">{MARK_CSS}</style>
      <div className="lmark" aria-hidden="true">
        <Image src={m.full.src} alt="" fill sizes={sizes} style={{ objectFit: "contain", objectPosition: "left center" }} />
      </div>
    </>
  );
}

const MARK_CSS = `
.lmark { position: absolute; inset: 0; transform-origin: left center; transition: transform 0.4s ease; }
@media (hover: hover) { .wcard:hover .lmark { transform: scale(1.02); } }
@media (prefers-reduced-motion: reduce) { .lmark { transition: none; } }
`;

export function LogoTileMedia({ slug, wide = false }: { slug: string; wide?: boolean }) {
  const m = MARKS[slug];
  if (!m) return null;
  return (
    <>
      <style href="kus-logo-tile" precedence="default">{TILE_CSS}</style>
      <div className="ltile" data-slug={slug} data-wide={wide ? "" : undefined} aria-hidden="true">
        <div
          className="ltile__mark ltile__compact"
          style={{ "--k": m.tileScale, "--ar": ar(m.compact) } as CSSProperties}
        >
          <Image src={m.compact.src} alt="" fill sizes="(max-width: 1023px) 40vw, 240px" style={{ objectFit: "contain" }} />
        </div>
        {wide ? (
          <div
            className="ltile__mark ltile__full"
            style={{ "--ar": ar(m.full), height: `${m.fullFrom}px` } as CSSProperties}
          >
            <Image src={m.full.src} alt="" fill sizes="(max-width: 1023px) 80vw, 320px" style={{ objectFit: "contain" }} />
          </div>
        ) : null}
      </div>
    </>
  );
}

const TILE_CSS = `
.ltile {
  position: absolute; inset: ${TILE_INSET};
  border-radius: var(--radius-panel);
  background: var(--color-paper);
  container: ltile / size;
  display: grid; place-items: center;
}
.ltile__mark { grid-area: 1 / 1; position: relative; aspect-ratio: var(--ar); }
.ltile__compact { height: calc(var(--k) * 100cqh); max-width: 84cqw; }
.ltile__full { display: none; max-width: calc(100cqw - ${FULL_ROOM}px); }
${SWAP_CSS}
.ltile__mark, .llead__shield { transition: transform 0.4s ease; }
@media (hover: hover) {
  .wcard:hover .ltile__mark, .wcard:hover .llead__shield { transform: scale(1.02); }
}
@media (prefers-reduced-motion: reduce) {
  .ltile__mark, .llead__shield { transition: none; }
  .wcard:hover .ltile__mark, .wcard:hover .llead__shield { transform: none; }
}
:root[data-dots="still"] .ltile__mark, :root[data-dots="still"] .llead__shield { transition: none; }
:root[data-dots="still"] .wcard:hover .ltile__mark, :root[data-dots="still"] .wcard:hover .llead__shield { transform: none; }
@media (forced-colors: active) { .ltile, .llead__panel { border: 1px solid CanvasText; } }
`;

export function LogoLeadMedia() {
  const c = KUS_COPY.logos;
  return (
    <>
      <style href="kus-logo-tile" precedence="default">{TILE_CSS}</style>
      <style href="kus-logo-lead" precedence="default">{LEAD_CSS}</style>
      <div className="llead">
        <div className="llead__stage" aria-hidden="true">
          <div className="llead__shield">
            <span className="llead__keys">
              <span className="llead__key llead__key--t" />
              <span className="llead__key llead__key--b" />
              <span className="llead__key llead__key--l" />
              <span className="llead__key llead__key--r" />
              <span className="llead__key llead__key--x" />
              <span className="llead__key llead__key--y" />
            </span>
            <Image src={SHIELD.compact.src} alt="" fill sizes="(max-width: 639px) 120px, 240px" style={{ objectFit: "contain" }} />
          </div>
        </div>
        <div className="llead__panel">
          <p id="logo-lead-where-title" className="llead__title">{c.whereTitle}</p>
          <ul id="logo-lead-where" aria-labelledby="logo-lead-where-title" className="llead__list">
            <li className="llead__item llead__item--nav">
              <span className="llead__lockup" aria-hidden="true">
                <Image src={SHIELD.full.src} alt="" fill sizes="200px" style={{ objectFit: "contain", objectPosition: "left center" }} />
              </span>
              <span className="llead__label llead__label--desktop">{c.navDesktop}</span>
              <span className="llead__label llead__label--phone">{c.navPhone}</span>
            </li>
            <li className="llead__item">
              <span className="llead__icon" aria-hidden="true">
                <span className="llead__icon-art">
                  <Image src={SHIELD.compact.src} alt="" fill sizes="48px" style={{ objectFit: "contain" }} />
                </span>
              </span>
              <span className="llead__label">{c.homeIcon}</span>
            </li>
            <li className="llead__item">
              <span className="llead__tabbar" aria-hidden="true">
                <span className="llead__tab">
                  <span className="llead__tab-icon">
                    <Image src={SHIELD.compact.src} alt="" fill sizes="16px" style={{ objectFit: "contain" }} />
                  </span>
                  <span className="llead__tab-title">{c.tabTitle}</span>
                </span>
              </span>
              <span className="llead__label">{c.tab}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

/* Three arrangements, every box a fixed size:
   - Phones (under 640px): the lead drops the fixed frame and stacks, a
     214px plate area with the shield at 150px, then the panel inset 14px.
     The icon and the tab share a row and wrap when the panel is narrow.
   - From 640px, the lead is a fixed box (16:10 to 1023px, the two-row
     slot from 1024px) and a size container. Wide enough (560px and up),
     the shield sits left and the panel stands on the right, 252px wide,
     28px in, centered, its three rows stacked.
   - Narrower than 560px (the two-row slot from 1024px to about 1250px),
     the shield takes the top and the panel runs along the bottom, with
     the icon and the tab side by side. */
const LEAD_CSS = `
.llead { position: relative; display: flex; flex-direction: column; }
.llead__stage {
  position: relative; height: 214px;
  display: grid; place-items: center;
  container: lstage / size;
}
.llead__shield {
  position: relative;
  height: 150px; aspect-ratio: ${ar(SHIELD.compact)};
}
.llead__keys { position: absolute; inset: 0; opacity: 0.35; pointer-events: none; }
.llead__key { position: absolute; background: var(--color-navy); }
.llead__key--t, .llead__key--b { left: -18px; right: -18px; height: 1px; }
.llead__key--t { top: 0; }
.llead__key--b { bottom: 0; }
.llead__key--l, .llead__key--r { top: -18px; bottom: -18px; width: 1px; }
.llead__key--l { left: 0; }
.llead__key--r { right: 0; }
.llead__key--x {
  left: -18px; right: -18px; top: 50%; height: 1px;
  background: repeating-linear-gradient(to right, var(--color-navy) 0 2px, transparent 2px 7px);
}
.llead__key--y {
  top: -18px; bottom: -18px; left: 50%; width: 1px;
  background: repeating-linear-gradient(to bottom, var(--color-navy) 0 2px, transparent 2px 7px);
}
.llead__panel {
  position: relative; z-index: 0;
  margin: 0 14px 14px;
  padding: 20px;
  border-radius: var(--radius-panel);
  background: var(--color-paper);
}
.llead__title {
  margin: 0 0 14px;
  font-family: var(--kus-sans); font-weight: 500; font-size: var(--kus-fs-ui); line-height: 1.3;
  color: var(--color-navy);
}
.llead__list {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-wrap: wrap; align-items: flex-end; gap: 16px;
}
.llead__item { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; margin: 0; }
.llead__item--nav { flex-basis: 100%; }
.llead__label {
  font-family: var(--kus-mono); font-weight: 400; font-size: var(--kus-fs-mono); line-height: 1.5; letter-spacing: 0;
  color: var(--color-neutral-700);
}
.llead__label--desktop { display: none; }
.llead__lockup { position: relative; display: block; height: 40px; width: 154px; }
@media (min-width: 768px) {
  .llead__label--desktop { display: inline; }
  .llead__label--phone { display: none; }
  .llead__lockup { height: 48px; width: 185px; }
}
.llead__icon {
  position: relative; display: grid; place-items: center;
  width: 56px; height: 56px; border-radius: 22.5%;
  background: var(--color-navy);
}
.llead__icon-art { position: relative; height: 72%; aspect-ratio: ${ar(SHIELD.compact)}; }
.llead__tabbar {
  position: relative; display: block;
  width: 190px; height: 35px;
  border-bottom: 1px solid var(--color-neutral-400);
}
.llead__tab {
  position: absolute; left: 8px; bottom: -1px;
  box-sizing: border-box; width: 170px; height: 35px;
  display: flex; align-items: center; gap: 8px; padding: 0 12px;
  border: 1px solid var(--color-neutral-400); border-bottom: 0;
  border-radius: 9px 9px 0 0;
  background: var(--color-paper);
}
.llead__tab-icon { position: relative; flex: none; height: 16px; aspect-ratio: ${ar(SHIELD.compact)}; }
.llead__tab-title {
  font-family: var(--kus-sans); font-weight: 500; font-size: 13px; line-height: 1;
  color: var(--color-navy); white-space: nowrap;
}

@media (min-width: 640px) {
  /* The card's screen is the size container (a box cannot query itself). */
  .wcard__screen:has(> .llead) { container: llead / size; }
  .llead {
    position: absolute; inset: 0;
    flex-direction: row; align-items: center;
  }
  .llead__stage { flex: 1 1 auto; align-self: stretch; height: auto; min-width: 0; }
  .llead__shield { height: min(296px, 78cqh, calc((100cqw - 84px) * ${(SHIELD.compact.h / SHIELD.compact.w).toFixed(4)})); }
  .llead__panel { flex: none; width: 252px; box-sizing: border-box; margin: 0 28px 0 0; }
  .llead__list { flex-direction: column; flex-wrap: nowrap; align-items: flex-start; }
  @container llead (max-width: 559px) {
    .llead { flex-direction: column; align-items: stretch; }
    .llead__stage { flex: 1 1 0; min-height: 0; }
    .llead__panel { width: auto; margin: 0 14px 14px; }
    .llead__list { flex-direction: row; flex-wrap: wrap; align-items: flex-end; }
  }
}
`;
