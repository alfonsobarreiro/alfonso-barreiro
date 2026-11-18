import { PlateSpotlight } from "@/components/work/PlateSpotlight";

/* Card grid, card, and filter styles for /work, the homepage work bands,
   and sample pages. Rendered as a <style> block with the page instead of
   living in globals.css: on 2026-10-22 a stale Vercel build cache served
   an old global stylesheet without these rules, and inline blocks ship
   with the HTML. Same pattern as Hero, WhatIDo, and HomeAbout. */
const CSS = `
.work-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(32px, 3.5vw, 48px) clamp(24px, 2.5vw, 36px);
}
@media (max-width: 1023px) { .work-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
/* Homepage bands: two up from tablet width, so every piece shows bigger. */
.work-grid--two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(48px, 5vw, 72px) clamp(24px, 3vw, 48px);
}
@media (max-width: 639px)  { .work-grid, .work-grid--two { grid-template-columns: 1fr; } }

/* Plate: a solid color with the 24px dot grid printed on it, rounded
   (--radius-card). Colors (globals.css, --color-plate-*): blue by default;
   a band or a card can set --plate (HomeWorkSection rotates six colors
   card by card). Base dots are white at low alpha; the lit layer under
   the pointer (PlateSpotlight) is brighter white, which reads on every
   plate color. */
.wcard__frame {
  --plate: var(--color-plate-blue);
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-card);
  background-color: var(--plate);
  background-image: radial-gradient(circle, rgb(255 255 255 / 0.28) 1px, transparent 1px);
  background-size: 24px 24px;
  background-position: 12px 12px;
}
[data-plate="teal"] .wcard__frame { --plate: var(--color-plate-teal); }
[data-plate="terracotta"] .wcard__frame { --plate: var(--color-plate-terracotta); }
[data-plate="blue"] .wcard__frame { --plate: var(--color-plate-blue); }
.wcard__frame::before {
  content: "";
  position: absolute; inset: 0; z-index: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, rgb(255 255 255 / 0.85) 2px, transparent 2px);
  background-size: 24px 24px;
  background-position: 12px 12px;
  opacity: 0;
  -webkit-mask-image: radial-gradient(circle 180px at var(--plate-x, 50%) var(--plate-y, 50%), black 0%, transparent 70%);
          mask-image: radial-gradient(circle 180px at var(--plate-x, 50%) var(--plate-y, 50%), black 0%, transparent 70%);
  transition: opacity 0.2s ease;
}
@media (hover: hover) { .wcard:hover .wcard__frame::before { opacity: 1; } }
/* Controls on a plate (flip buttons, the Alfred chips): the terracotta ring
   vanishes on terracotta and fades on the other plates, so the ring is
   navy with a paper halo, which reads on all six. */
.wcard .wcard__frame :focus-visible {
  outline: 2px solid var(--color-text);
  outline-offset: 2px;
  box-shadow: 0 0 0 5px var(--color-paper);
}
/* The 16:10 screen: transparent, so the plate shows wherever the work
   does not cover it. Card art floats inside it with a margin. */
/* No z-index here: a stacking context on the screen would trap the media's
   .wcard__control buttons (z-index 2) under the card's stretched link. The
   plate's lit layer (::before) comes first in tree order, so the screen
   still paints over it. */
.wcard__screen { position: relative; aspect-ratio: 16 / 10; overflow: hidden; }
.wcard__piece { position: absolute; inset: 7% 6%; }
/* Bare: no plate. The work sits on the band itself (logos). */
[data-plate="bare"] .wcard__frame { background: none; overflow: visible; }
[data-plate="bare"] .wcard__frame::before { content: none; }
[data-plate="bare"] .wcard__screen { overflow: visible; }
/* A bare logo mark stands on the card's left rail, on the eyebrow's line. */
[data-plate="bare"] .wcard__piece { inset: 30% 0 0 0; }
[data-plate="bare"] .wcard__piece > img { object-position: left bottom; }
.wcard { position: relative; display: block; color: inherit; }
.wcard__link { color: inherit; text-decoration: none; }
.wcard__link::after { content: ""; position: absolute; inset: 0; z-index: 1; }
.wcard__link:focus-visible { outline: none; }
.wcard:has(.wcard__link:focus-visible) { outline: 2px solid var(--color-focus-ring); outline-offset: 6px; border-radius: calc(var(--radius-card) + 6px); }
.wcard__control { position: relative; z-index: 2; }
@media (min-width: 640px) { .work-grid > .wcard--wide { grid-column: span 2; } }
.wcard__img img { transition: transform 0.4s ease; }
.wcard:hover .wcard__img > img, .wcard:hover .wcard__img > span > img, .wcard:hover .wcard__piece > img { transform: scale(1.02); }
.wcard:hover .wcard__title { color: var(--color-text-link); }
.work-filter {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 14px; min-height: 44px; box-sizing: border-box;
  border: 1px solid var(--color-neutral-400); border-radius: var(--radius-chip);
  font-family: var(--font-dm-sans), sans-serif; font-size: var(--text-body); font-weight: 500;
  color: var(--color-neutral-700); text-decoration: none;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}
.work-filter:hover { border-color: var(--color-text); color: var(--color-text); }
.work-filter[aria-current="page"] { background: var(--color-text); border-color: var(--color-text); color: var(--color-paper); }
.work-filter:focus-visible { outline: 2px solid var(--color-focus-ring); outline-offset: 3px; }
.work-filter__count { font-weight: 400; opacity: 0.75; }
@media (prefers-reduced-motion: reduce) {
  .wcard__frame::before { transition: none; }
  .wcard__img img { transition: none; }
  .wcard:hover .wcard__img > img, .wcard:hover .wcard__img > span > img, .wcard:hover .wcard__piece > img { transform: none; }
}
`;

export function WorkStyles() {
  return (
    <>
      <style>{CSS}</style>
      <PlateSpotlight />
    </>
  );
}
