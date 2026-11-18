/* The Kus-led preview's shared styles, in one inline <style> (the
   WorkStyles pattern: it ships with the HTML, so a stale global stylesheet
   can never drop it). Everything is scoped under the .kus root, so nothing
   here reaches "/" or /hiring.

   What lives here: the scoped tokens (type, spacing, radius, motion, the
   plate and slab variables), the type classes, the grid, bands and slabs,
   pills and links, the two-color focus ring, the reveal start states, and
   the overrides for reused parts (card captions, plates flat at rest, the
   Resume pill in the nav, the Cut, then build rest frame, the rounded prints, the footer buttons). Each kus component
   carries its own layout CSS.

   Colors come only from globals.css tokens; the kus scope adds no color.
   New non-color tokens (--kus-*) move into globals.css on ship. */

const CSS = `
.kus {
  --kus-display: var(--font-kus-display), var(--font-dm-sans), sans-serif;
  --kus-sans:    var(--font-dm-sans), sans-serif;
  --kus-mono:    var(--font-kus-mono), ui-monospace, SFMono-Regular, Menlo, monospace;

  /* Homepage overrides of two site tokens (2026-11-05, vault "DS — Visual
     anti-Claude standards" 7, calls 6 and 8): no real text under 13px,
     and fine print in navy (no gray since 2026-11-08). The pictured
     interfaces (Alfred's chat card, the site flip cards) keep 12px. */
  --text-small: 13px;
  --color-text-muted: var(--color-navy); /* no gray since 2026-11-08 */
  /* Links rest on terracotta-600 and hover to 700 (three inks since
     2026-11-08; LinkArrow and the footer read these). */
  --color-text-link: var(--color-terracotta-600);
  --color-text-link-hover: var(--color-terracotta-700);

  --kus-pad-x:  clamp(24px, 6vw, 80px);
  --kus-gap:    clamp(16px, 1.7vw, 24px);
  /* 144 at 1440, 80 on phones (Alfonso, 2026-11-06: "A lot more white
     spaces"; 96 since 2026-11-05, 72 before). 144 is the top step of the
     spec's spacing scale (1.3). */
  --kus-band-y: clamp(80px, 10vw, 144px);
  --kus-slab-pad: clamp(24px, 4vw, 64px);
  --kus-radius-slab: clamp(24px, 2.4vw, 32px);

  --kus-ease-spring: cubic-bezier(0.34, 1.3, 0.64, 1);
  --kus-ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --kus-dur-in:    280ms;
  --kus-dur-out:   480ms;
  --kus-dur-enter: 640ms;
  --kus-stagger:   80ms;
  --kus-rise:      24px;

  /* Work plates: each piece points at one of these through
     data-kus-plate. "Swap the plates" (footer) remaps them one step along
     the spectrum, which is the token system showing itself. */
  --kus-plate-blue:       var(--color-plate-blue);
  --kus-plate-terracotta: var(--color-plate-terracotta);
  --kus-plate-teal:       var(--color-plate-teal);
  --kus-plate-mustard:    var(--color-plate-mustard);
  --kus-plate-green:      var(--color-plate-green);
  --kus-plate-plum:       var(--color-plate-plum);
  /* Slabs and tiles carry white text, so they never swap. */
  --kus-slab-blue:       var(--color-plate-blue);
  --kus-slab-plum:       var(--color-plate-plum);
  --kus-slab-teal:       var(--color-plate-teal);
  --kus-slab-terracotta: var(--color-terracotta-600);

  position: relative;
  /* Clip, not hidden: no scroll container, so sticky and observers keep
     working. A safety net for the selection frame over a card that is
     half out of a sideways row. */
  overflow-x: clip;
  background: var(--color-paper);
  color: var(--color-navy);
}
.kus [data-kus-plate="blue"]       { --kus-plate: var(--kus-plate-blue); }
.kus [data-kus-plate="terracotta"] { --kus-plate: var(--kus-plate-terracotta); }
.kus [data-kus-plate="teal"]       { --kus-plate: var(--kus-plate-teal); }
.kus [data-kus-plate="mustard"]    { --kus-plate: var(--kus-plate-mustard); }
.kus [data-kus-plate="green"]      { --kus-plate: var(--kus-plate-green); }
.kus [data-kus-plate="plum"]       { --kus-plate: var(--kus-plate-plum); }

/* ── Type ─────────────────────────────────────────────────────────── */
/* ── Type: four styles, three inks (2026-11-08, Alfonso: "3-4 type
   styles and 2-3 text colors"). Was eight roles (2026-11-05). The older
   role names and class names stay as aliases, so markup did not move;
   each now resolves to one of the four.
     display  88/600  the name, the close heading
     heading  28/600  band labels, card titles, the hero lede, Alfred's
                      line, the quote, the email, the close tiles
     body     16/400  everything else: paragraphs, links, buttons, nav,
                      names, controls, footer text
     mono     14/400  meta: eyebrows, disciplines, stacks, dates, counts,
                      captions
   Inks: navy for text on paper, terracotta-600 for display, band labels
   and links (5.43:1 on white), white on the colored slabs, tiles and
   pills. No gray: hierarchy comes from size and weight. */
.kus {
  --kus-fs-display:   clamp(38px, calc(19px + 4.76vw), 88px);
  --kus-fs-heading:   clamp(22px, calc(20px + 0.57vw), 28px);
  --kus-fs-headline:  var(--kus-fs-heading);
  --kus-fs-statement: var(--kus-fs-heading);
  --kus-fs-label:     var(--kus-fs-heading);
  --kus-fs-title:     var(--kus-fs-heading);
  --kus-fs-body:      16px;
  --kus-fs-ui:        16px;
  --kus-fs-mono:      14px;
  /* Site tokens the shared components read, mapped onto the styles. */
  --text-body: var(--kus-fs-body);
}
.kus-t-close, .kus-t-line, .kus-t-email, .kus-t-name, .kus-t-statement, .kus-t-tile, .kus-t-label, .kus-t-quote, .kus-t-title, .kus-t-lede {
  font-family: var(--kus-display);
  font-weight: 600;
  margin: 0;
}
/* display */
.kus-t-close, .kus-t-line {
  font-size: var(--kus-fs-display);
  line-height: 1; letter-spacing: -0.04em;
  color: var(--color-terracotta-600);
  text-wrap: balance;
}
/* heading: one size, one leading, one tracking for every alias. */
.kus-t-email, .kus-t-name, .kus-t-statement, .kus-t-quote, .kus-t-label, .kus-t-tile, .kus-t-title, .kus-t-lede {
  font-size: var(--kus-fs-heading);
  line-height: 1.2; letter-spacing: -0.02em;
  color: var(--color-navy);
  text-wrap: balance;
}
.kus-t-name { padding-bottom: 0.16em; }
.kus-t-label { color: var(--color-terracotta-600); }
.kus-t-quote, .kus-t-tile { color: var(--color-paper); }
.kus-t-lede { text-wrap: pretty; }
/* body */
.kus-t-body, .kus-t-small, .kus-t-ui {
  font-family: var(--kus-sans); font-weight: 400; margin: 0;
  font-size: var(--kus-fs-body);
  line-height: 1.55;
  color: var(--color-navy);
  text-wrap: pretty;
}
.kus-t-body, .kus-t-small { max-width: 64ch; }
.kus-t-ui { line-height: 1.3; color: inherit; }
/* mono */
.kus-t-mono, .kus-t-mono-sm {
  font-family: var(--kus-mono); font-weight: 400; margin: 0;
  font-size: var(--kus-fs-mono);
  line-height: 1.45; letter-spacing: 0;
  color: var(--color-navy);
}

/* Shared parts at body weight (four styles since 2026-11-08): the nav
   links and Search, LinkArrow (inline 500), the prints' toggle, and the
   footer. The wordmark keeps its own 20/500: it is the logo, not text. */
.kus .main-nav .nav-item, .kus .main-nav .nav-links ~ * span, .kus .main-nav button span,
.kus .ui-linkarrow, .kus .ap__label-row, .kus .ap__button,
.kus .site-footer p, .kus .site-footer a, .kus .site-footer button, .kus .site-footer span {
  font-weight: 400 !important;
}
.kus .main-nav .nav-wordmark, .kus .main-nav .nav-wordmark span { font-weight: 500 !important; }
/* The pictured interfaces keep their own 12px (carve-out). */
.kus .acard, .kus .sflip { --text-small: 12px; }
/* Shared components on the homepage, mapped onto the eight roles
   (2026-11-05). Button sets its size and tracking inline, hence the
   !important. Small overlay controls and the footer's page-length line
   take mono; real buttons take ui. */
.kus .footer-dots-toggle, .kus .ap__button { font-size: var(--kus-fs-ui) !important; letter-spacing: 0 !important; }
.kus .flipm__btn { font-family: var(--kus-mono); font-weight: 400; font-size: var(--kus-fs-mono); letter-spacing: 0; }
.kus .page-length { font-family: var(--kus-mono); font-size: var(--kus-fs-mono); }
/* About's print captions: mono, the role for small metadata. */
.kus .ap__caption { font-family: var(--kus-mono); font-size: var(--kus-fs-mono); letter-spacing: 0; }

/* ── Layout ───────────────────────────────────────────────────────── */
.kus-wrap { max-width: var(--content-max); margin: 0 auto; }
.kus-band {
  padding: var(--kus-band-y) var(--kus-pad-x);
  background: var(--color-paper);
  scroll-margin-top: 72px;
}
/* The dotted rule: the only ornament besides the plate spotlight, the Cut,
   then build field, and the close's lattice and rain (decision D5). */
.kus-rule {
  height: 4px;
  background: radial-gradient(circle, var(--color-terracotta-500) 1px, transparent 1.5px) 0 50% / 8px 4px repeat-x;
}
.kus-band > .kus-wrap > .kus-rule { margin-bottom: 24px; }
.kus-band__grid { display: grid; grid-template-columns: minmax(0, 1fr); row-gap: 16px; }
.kus-band__label > * + * { margin-top: 8px; }
.kus-band__label .ui-linkarrow { margin-top: 16px; }
.kus-band__count {
  margin-left: 8px; vertical-align: top;
  font-family: var(--kus-mono); font-size: var(--kus-fs-mono); line-height: 1.2; letter-spacing: 0;
  font-weight: 400; /* mono is 400 only; the link around it is 500 */
}
.kus-band__content > * + * { margin-top: 16px; }
.kus-band__content .kus-t-statement { max-width: 24em; }
.kus-band__body { margin-top: 32px; }
/* A band's closing See all button (Work, Case studies; 2026-11-10): the
   same offset as the band body, 32px, 48px from 1024px. */
.kus-band__more { margin: 32px 0 0; }
@media (min-width: 1024px) { .kus-band__more { margin-top: 48px; } }
.kus-band__grid--split { row-gap: 32px; }
@media (min-width: 1024px) {
  .kus-band__grid {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: var(--kus-gap);
  }
  .kus-band__label   { grid-column: 1 / span 4; grid-row: 1; }
  .kus-band__content { grid-column: 5 / span 8; grid-row: 1; }
  .kus-band__body    { margin-top: 48px; }
  /* Split: label, then the aside under it on the left; the statement and
     the main block share the right column. DOM order is label, right,
     aside, which is the phone order. */
  .kus-band__grid--split { grid-template-rows: auto 1fr; row-gap: 32px; }
  .kus-band__grid--split > .kus-band__right { grid-column: 5 / span 8; grid-row: 1 / span 2; }
  .kus-band__grid--split > .kus-band__aside { grid-column: 1 / span 4; grid-row: 2; align-self: start; }
}
.kus-band__right > * + * { margin-top: 16px; }

.kus-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 48px var(--kus-gap); }
@media (min-width: 640px) {
  .kus-grid--2, .kus-grid--3 { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 48px; }
}
@media (min-width: 1024px) {
  .kus-grid--3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

/* ── Slabs ────────────────────────────────────────────────────────── */
.kus-slab {
  border-radius: var(--kus-radius-slab);
  padding: var(--kus-slab-pad);
}
.kus-slab--blue  { background: var(--kus-slab-blue);  color: var(--color-paper); }
.kus-slab--plum  { background: var(--kus-slab-plum);  color: var(--color-paper); }
.kus-slab--teal  { background: var(--kus-slab-teal); }

/* ── Pills and links ──────────────────────────────────────────────── */
.kus-pill {
  position: relative;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 44px; padding: 8px 24px;
  border-radius: 999px;
  border: 2px solid var(--color-terracotta-600);
  background: var(--color-terracotta-600);
  color: var(--color-paper);
  font-family: var(--kus-sans); font-weight: 400; font-size: var(--kus-fs-ui); line-height: 1.2;
  text-decoration: none; cursor: pointer;
  transition: background-color var(--kus-dur-out) ease, color var(--kus-dur-out) ease, border-color var(--kus-dur-out) ease;
}
.kus-pill:hover {
  background: transparent; color: var(--color-terracotta-700);
  transition-duration: var(--kus-dur-in);
}
.kus-pill--secondary {
  background: var(--color-paper); border-color: var(--color-navy); color: var(--color-navy);
}
.kus-pill--secondary:hover { background: var(--color-navy); color: var(--color-paper); }
.kus-pill--on-slab {
  background: var(--color-paper); border-color: var(--color-paper); color: var(--color-navy);
}
.kus-pill--on-slab:hover { background: transparent; color: var(--color-paper); }

.kus-link {
  color: var(--color-terracotta-600);
  text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px;
  transition: color var(--kus-dur-out) ease;
}
.kus-link:hover {
  color: var(--color-terracotta-700); text-decoration-thickness: 2px;
  transition-duration: var(--kus-dur-in);
}
.kus-slab .kus-link, .kus-slab .kus-link:hover { color: var(--color-paper); }
/* LinkArrow on a slab: white, and the hover keeps white (terracotta-300
   on blue or plum measures under 4.5:1). */
.kus .kus-slab .ui-linkarrow--on-dark:hover { color: var(--color-paper); }
.kus .kus-slab .ui-linkarrow--on-dark:hover > span:first-child { border-bottom-width: 2px; }

.kus-sr {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}

/* ── Cards (WorkCard variant="kus") ───────────────────────────────── */
/* Plates go flat at rest: the printed dots are off; the spotlight's lit
   dots still show under the pointer (PlateSpotlight). */
html .kus .wcard__frame {
  --plate: var(--kus-plate, var(--kus-plate-blue));
  background-image: none;
}
/* Bare cards (KusCard bare: websites): no plate, no spotlight. The
   screenshot fills the frame and the frame's radius clips it; a hairline
   keeps a white first screen from running into the page. */
.kus .kus-card[data-bare] .wcard__frame { background: none; box-shadow: 0 0 0 1px var(--color-neutral-200); }
.kus .kus-card[data-bare] .wcard__frame::before { content: none; }
.kus .wcard__body { margin-top: 16px; }
.kus .wcard__eyebrow { font-family: var(--kus-mono); font-size: var(--kus-fs-mono); line-height: 1.45; color: var(--color-navy); margin: 0 0 4px; }
.kus .wcard__role    { font-family: var(--kus-mono); font-size: var(--kus-fs-mono); line-height: 1.45; color: var(--color-navy); margin: 0 0 8px; }
.kus .wcard__title {
  font-family: var(--kus-display); font-weight: 600;
  font-size: var(--kus-fs-heading); line-height: 1.2; letter-spacing: -0.02em;
  color: var(--color-navy); margin: 4px 0 8px;
  transition: color var(--kus-dur-out) ease;
}
.kus .wcard:hover .wcard__title { transition-duration: var(--kus-dur-in); }
.kus .wcard__summary { font-family: var(--kus-sans); font-size: var(--kus-fs-body); line-height: 1.55; color: var(--color-navy); margin: 0 0 8px; max-width: 64ch; text-wrap: pretty; }
.kus .wcard__stack   { font-family: var(--kus-mono); font-size: var(--kus-fs-mono); line-height: 1.5; letter-spacing: 0; color: var(--color-navy); margin: 0 0 4px; }
.kus .wcard__depth   { font-family: var(--kus-mono); font-size: var(--kus-fs-mono); line-height: 1.5; letter-spacing: 0; color: var(--color-navy); margin: 0; }

/* ── Focus: navy ring with a paper halo (WCAG technique C40). Navy clears
   3:1 on paper, terracotta, teal, mustard and green; the paper halo
   clears it on blue and plum. The nav keeps its own rings. ─────────── */
html .kus main :focus-visible:not(.wcard__link) {
  outline: 3px solid var(--color-navy);
  outline-offset: 2px;
  box-shadow: 0 0 0 2px var(--color-paper);
}
/* The ring follows the plate's round top; the bottom corners stay tight so
   the curve never cuts through the caption's last line. */
html .kus .wcard:has(.wcard__link:focus-visible) {
  outline: 3px solid var(--color-navy);
  outline-offset: 6px;
  border-radius: var(--radius-card) var(--radius-card) var(--radius-chip) var(--radius-chip);
}
@media (forced-colors: active) {
  html .kus main :focus-visible:not(.wcard__link),
  html .kus .wcard:has(.wcard__link:focus-visible) { outline-color: Highlight; box-shadow: none; }
}

/* ── Reveal (KusReveal): once, on entering view. The start state applies
   only with JavaScript and only while the dots move, so content is never
   hidden without JS, under reduced motion, or with the dots stopped.
   Opacity and transform only, so nothing counts as layout shift. ───── */
/* data-reveal="draw" (the drawn arrows) only draws its stroke on. */
:root[data-js]:not([data-dots="still"]) .kus [data-reveal]:not([data-reveal="draw"]):not([data-in]) {
  opacity: 0;
  transform: translate3d(0, var(--kus-rise), 0);
}
.kus [data-reveal] {
  transition:
    opacity var(--kus-dur-enter) var(--kus-ease-out),
    transform var(--kus-dur-enter) var(--kus-ease-spring);
}
.kus [data-reveal][data-instant],
:root[data-dots="still"] .kus [data-reveal] { transition: none; }

/* ── Overrides for reused parts ───────────────────────────────────── */
/* Nav: Resume is the solid pill (Kus's Contact move), the other items
   gain a navy pill outline on hover. Attribute selectors for the
   preview; a proper tone prop comes on ship. Nav sets these inline, so
   the overrides need !important. */
.kus .main-nav .nav-links { gap: 12px !important; }
.kus .main-nav .nav-item {
  padding: 12px 14px !important;
  border-radius: 999px;
  color: var(--color-navy);
  transition: box-shadow var(--kus-dur-out) ease, background-color var(--kus-dur-out) ease, color var(--kus-dur-out) ease;
}
@media (hover: hover) {
  .kus .main-nav .nav-item:not([href="/resume"]):hover {
    box-shadow: inset 0 0 0 1px var(--color-navy);
    transition-duration: var(--kus-dur-in);
  }
}
.kus .main-nav a.nav-item[href="/resume"] {
  min-height: 44px;
  padding: 8px 18px !important;
  background: var(--color-terracotta-600) !important;
  color: var(--color-paper) !important;
  box-shadow: inset 0 0 0 2px var(--color-terracotta-600);
}
.kus .main-nav a.nav-item[href="/resume"]:hover {
  background: transparent !important;
  color: var(--color-terracotta-700) !important;
  transition-duration: var(--kus-dur-in);
}
.kus .main-nav[data-menu-open] a.nav-item[href="/resume"] {
  background: var(--color-paper) !important;
  color: var(--color-terracotta-600) !important;
  box-shadow: none;
}
/* Phones: the bar holds the name, the Resume pill, Search and Menu. The
   pill is wider than the text link Nav plans for, so up to 440px the
   infinity mark stays out (Nav drops it below 412px) and the pill
   tightens, keeping a gap after the name; below 340px the name steps down
   to 15px so the menu button stays on screen at 320px. Search and Menu
   keep their 44px boxes. */
@media (max-width: 440px) {
  .kus .main-nav .site-logo-mark { display: none; }
  .kus .main-nav a.nav-item.nav-resume-mobile { padding: 8px 12px !important; }
}
@media (max-width: 339px) {
  .kus .main-nav a.nav-item.nav-resume-mobile { padding: 8px 10px !important; }
  .kus .main-nav .nav-wordmark { font-size: 15px !important; }
}

/* Cut, then build: the empty frame reads as a drop target. The 2px width
   holds in every phase, so the frame's insides never move by a pixel. */
.kus .ctb-frame { border: 2px dashed var(--color-terracotta-500); border-radius: var(--radius-panel); }
.kus .ctb-frame:not([data-phase="edit"]) { border-color: transparent; }
.kus .ctb-frame__hint {
  font-family: var(--kus-display); font-size: var(--kus-fs-heading); font-weight: 600;
  color: var(--color-terracotta-600);
}

/* DS Buttons inside reused parts (Cut, then build, the prints' swap,
   ScopePicker): fully round, like every control here. Button sets its
   radius inline. */
.kus main .ui-btn { border-radius: 999px !important; }

/* About prints (the hero photos): framed like the What clients say
   prints (Alfonso, 2026-11-18: "I like the white border from the What
   clients say images"): an 8px paper border, 14px outside radius (6px
   inside), and the same shadow. A border, not padding, because the
   photo is position: absolute and fills the padding box. */
.kus .ap__print {
  border: 8px solid var(--color-paper);
  border-radius: 14px;
  background: var(--color-paper);
  box-shadow: 0 18px 40px rgb(15 40 61 / 0.32);
}

/* Footer: pills with a 2px navy border, like every secondary control here. */
.kus .site-footer .ui-btn--ghost {
  border-radius: 999px !important;
  border: 2px solid var(--color-navy) !important;
  color: var(--color-navy) !important;
  font-size: var(--kus-fs-ui) !important;
  letter-spacing: 0 !important;
}
.kus .site-footer .ui-btn--ghost:hover { background: var(--color-navy) !important; color: var(--color-paper) !important; }
.kus .site-footer .ui-btn--ghost[aria-pressed="true"] { background: var(--color-navy) !important; color: var(--color-paper) !important; }

@media (prefers-reduced-motion: reduce) {
  .kus .kus-pill, .kus .kus-link, .kus .main-nav .nav-item { transition: none; }
}
:root[data-dots="still"] .kus .kus-pill,
:root[data-dots="still"] .kus .kus-link { transition: none; }
`;

export function KusStyles() {
  return <style>{CSS}</style>;
}
