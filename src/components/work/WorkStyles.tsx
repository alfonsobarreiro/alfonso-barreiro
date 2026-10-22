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
@media (max-width: 639px)  { .work-grid { grid-template-columns: 1fr; } }
.wcard { display: block; text-decoration: none; color: inherit; }
.wcard__img img { transition: transform 0.4s ease; }
.wcard:hover .wcard__img img { transform: scale(1.02); }
.wcard:hover .wcard__title { color: var(--color-text-link); }
.wcard:focus-visible { outline: 2px solid var(--color-focus-ring); outline-offset: 6px; border-radius: 12px; }
.work-filter {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 14px; min-height: 44px; box-sizing: border-box;
  border: 1px solid var(--color-neutral-400);
  font-family: var(--font-dm-sans), sans-serif; font-size: var(--text-body); font-weight: 500;
  color: var(--color-neutral-700); text-decoration: none;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}
.work-filter:hover { border-color: var(--color-text); color: var(--color-text); }
.work-filter[aria-current="page"] { background: var(--color-text); border-color: var(--color-text); color: var(--color-paper); }
.work-filter:focus-visible { outline: 2px solid var(--color-focus-ring); outline-offset: 3px; }
.work-filter__count { font-weight: 400; opacity: 0.75; }
@media (prefers-reduced-motion: reduce) {
  .wcard__img img { transition: none; }
  .wcard:hover .wcard__img img { transform: none; }
}
`;

export function WorkStyles() {
  return <style>{CSS}</style>;
}
