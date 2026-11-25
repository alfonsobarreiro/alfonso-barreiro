"use client";

import Link from "next/link";
import { useRef } from "react";
import { CopyEmail, EMAIL } from "@/components/CopyEmail";
import { CloseRain, CloseWeather } from "@/components/home/HeroWeather";
import { COFFEE, LINKEDIN } from "@/components/home/HireClose";
import { DrawnArrow } from "@/components/kus/DrawnArrow";
import { KUS_COPY } from "@/components/kus/copy";
import { AVAILABILITY, formatAvailabilityDate } from "@/lib/availability";
import type { HomeAudience } from "@/components/home/HomePage";

/* The close (spec 2.15): the loudest moment on the page, and the echo.

   - The line at the close size (120px), the same sentence as the intro,
     on its own: the portrait moved out (Alfonso, 2026-10-27: "Move my
     image away from I cut scope"); that photo is now About's "At work"
     print, plain, not dotted.
   - The work he wants most: [his words], not rendered until written.
   - Availability, its Updated date, and the KPDX dateline (1024px and up,
     a fixed slot).
   - The email at 56px with Copy (Kus's Contact page, where the email is
     the headline). The mailto carries a subject per audience (Patrick
     David's move, 2026-11-01), so a note arrives labelled; Copy still
     copies the bare address.
   - Three colored tiles: the resume on blue, the coffee chat on plum,
     LinkedIn on terracotta-600, all white text (5.34, 5.42, 5.43:1).
   - Resume formats in mono: the PDF with its size, read on the server
     from public/ so it cannot go stale, and plain text only once that
     file exists.
   - "/" only: the studio door, to the packages on alphabeta.design (the
     homepage studio slab was cut 2026-11-04).

   Every block fades and rises in as it enters view (data-reveal,
   KusReveal; 2026-11-10): heading, Updated line, email, the three tiles
   in turn, then the formats line.

   Ground: paper with HireClose's 24px terracotta-300 lattice and the rain
   drip (CloseRain, KPDX rain only, 1024px and up, off with the dots
   stopped). Below 1024px the tiles stack and the email drops to 26px. */

function NewTab() {
  return <span className="kus-sr"> (opens in a new tab)</span>;
}


export default function KusClose({
  audience,
  pdfKB,
  hasPlainText,
}: {
  audience: HomeAudience;
  pdfKB: number | null;
  hasPlainText: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const colRef     = useRef<HTMLDivElement>(null);
  const updated    = formatAvailabilityDate(AVAILABILITY.updated);
  const c = KUS_COPY.close;

  return (
    <section ref={sectionRef} id="hire" aria-labelledby="hire-title" className="kus-close">
      <CloseRain sectionRef={sectionRef} colRef={colRef} />

      <div ref={colRef} className="kus-wrap kus-close__col">
        {/* The heading is the availability line (Alfonso, 2026-11-05: "use
            'Open to design and web development roles, contract or
            full-time' as the heading"). "I cut scope" stays once, under
            the reel. */}
        <h2 id="hire-title" className="kus-t-close kus-close__title" data-spec="DM Sans 600" data-reveal="">
          {AVAILABILITY.line}
        </h2>

        {c.wantMost ? <p className="kus-t-lede kus-close__want">{c.wantMost}</p> : null}
        {updated ? (
          <p className="kus-t-small kus-close__meta" data-reveal="">
            <span>Updated <time dateTime={AVAILABILITY.updated}>{updated}</time>.</span>
          </p>
        ) : null}
        <CloseWeather className="kus-t-small kus-close__meta kus-close__dateline" />

        <p className="kus-close__email" data-reveal="">
          <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(c.subject[audience])}`} className="kus-t-email kus-close__mail">{EMAIL}</a>
          <CopyEmail label="Copy" className="kus-pill kus-pill--secondary kus-close__copy" />
        </p>

        <ul className="kus-close__tiles" role="list">
          <li data-reveal="">
            <Link href="/resume" className="kus-close__tile kus-close__tile--blue">
              <span className="kus-t-tile">See the resume</span>
              <DrawnArrow width={40} stroke={2.5} className="kus-close__tile-arrow" />
            </Link>
          </li>
          <li data-reveal="">
            <a href={COFFEE} target="_blank" rel="noopener noreferrer" className="kus-close__tile kus-close__tile--plum">
              <span className="kus-t-tile">Book a coffee chat<NewTab /></span>
              {c.coffeeSub ? <span className="kus-close__tile-sub">{c.coffeeSub}</span> : null}
              <DrawnArrow width={40} stroke={2.5} className="kus-close__tile-arrow" />
            </a>
          </li>
          <li data-reveal="">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="kus-close__tile kus-close__tile--terracotta">
              <span className="kus-t-tile">LinkedIn<NewTab /></span>
              <DrawnArrow width={40} stroke={2.5} className="kus-close__tile-arrow" />
            </a>
          </li>
        </ul>

        {/* One body line under the tiles (2026-11-06 audit, section 10,
            finding 5): the resume formats, then the studio door on "/". */}
        <p className="kus-t-body kus-close__formats" data-reveal="">
          <span>
            {c.formatsLead}{" "}
            <a href="/Alfonso_Barreiro_Resume.pdf" className="kus-link">{c.formatsPdf(pdfKB)}</a>
            {hasPlainText ? (
              <>
                {" "}{c.formatsOr}{" "}
                <a href="/Alfonso_Barreiro_Resume.txt" className="kus-link">{c.formatsTxt}</a>
              </>
            ) : null}
            .
            {audience !== "hiring" ? (
              <>
                {" "}Need a site or a logo for your business?{" "}
                <a href="https://www.alphabeta.design/services" target="_blank" rel="noopener noreferrer" className="kus-link">Find your package<span className="kus-sr"> (opens in a new tab)</span></a>
              </>
            ) : null}
          </span>
        </p>
      </div>

      <style>{CSS}</style>
    </section>
  );
}

const CSS = `
.kus-close {
  position: relative;
  isolation: isolate;
  padding: var(--kus-band-y) var(--kus-pad-x) calc(var(--kus-band-y) + 24px);
  scroll-margin-top: 72px;
  background-color: var(--color-paper);
  background-image: radial-gradient(circle, var(--color-terracotta-300) 1px, transparent 1px);
  background-size: 24px 24px;
  background-position: 0 0;
}
.kus-close__col { display: flow-root; }
.kus-close__title { margin: 0; }
.kus-close__want { margin-top: 32px; max-width: 34em; }
/* Small type over the lattice gets a paper ground, so no dot crosses it. */
.kus-close__meta > span, .kus-close__formats > span, .kus-close__door > span {
  background: var(--color-paper);
  padding: 2px 6px; margin: 0 -6px;
  -webkit-box-decoration-break: clone; box-decoration-break: clone;
}
.kus-close__meta { margin-top: 8px; line-height: 24px; }
/* The first line under the heading (the availability line is the heading
   since 2026-11-05, so the status paragraph is gone). */
.kus-close__title + .kus-close__meta, .kus-close__want + .kus-close__meta { margin-top: 32px; clear: both; }
.kus-close__dateline { display: none; }
@media (min-width: 1024px) {
  .kus-close__dateline { display: block; height: 48px; margin: 0; }
}
.kus-close__email {
  display: flex; flex-wrap: wrap; align-items: center; gap: 16px 24px;
  margin: 48px 0 0;
}
.kus-close__mail {
  position: relative;
  text-decoration: underline;
  text-decoration-color: var(--color-terracotta-500);
  text-decoration-thickness: 2px;
  text-underline-offset: 6px;
  overflow-wrap: anywhere;
  transition: color var(--kus-dur-out) ease;
}
/* A 44px tall hit area at every size; the type sets the layout. */
.kus-close__mail::before { content: ""; position: absolute; left: 0; right: 0; top: 50%; height: 44px; transform: translateY(-50%); min-height: 100%; }
.kus-close__mail:hover { color: var(--color-terracotta-700); transition-duration: var(--kus-dur-in); }
.kus-close__copy { padding: 8px 24px; }

.kus-close__tiles {
  list-style: none; padding: 0;
  clear: both;
  display: grid; grid-template-columns: minmax(0, 1fr);
  gap: var(--kus-gap);
  margin: 32px 0 0;
}
/* Three across from 640 (2026-11-08), so phone landscape and tablet
   portrait keep the desktop row instead of three full-width bars. */
@media (min-width: 640px) { .kus-close__tiles { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.kus-close__tile {
  position: relative;
  display: flex; flex-direction: column; justify-content: space-between; gap: 16px;
  min-height: 96px; height: 100%;
  padding: 24px 24px 64px;
  border-radius: var(--radius-card);
  color: var(--color-paper);
  text-decoration: none;
  transition: transform var(--kus-dur-out) var(--kus-ease-spring), box-shadow var(--kus-dur-out) ease;
}
@media (min-width: 640px) { .kus-close__tile { min-height: 136px; } }
.kus-close__tile--blue       { background: var(--kus-slab-blue); }
.kus-close__tile--plum       { background: var(--kus-slab-plum); }
.kus-close__tile--terracotta { background: var(--kus-slab-terracotta); }
.kus-close__tile .kus-t-tile { color: var(--color-paper); }
.kus-close__tile-sub { font-family: var(--kus-sans); font-size: var(--kus-fs-body); line-height: 1.4; color: var(--color-paper); }
.kus-close__tile-arrow {
  position: absolute; right: 24px; bottom: 24px;
  color: var(--color-paper);
  transition: transform var(--kus-dur-out) var(--kus-ease-spring);
}
@media (hover: hover) {
  .kus-close__tile:hover { transform: translate3d(0, -4px, 0); box-shadow: var(--shadow-1); transition-duration: var(--kus-dur-in); }
  .kus-close__tile:hover .kus-close__tile-arrow { transform: translate3d(6px, 0, 0); transition-duration: var(--kus-dur-in); }
}
.kus-close__tile:focus-visible .kus-close__tile-arrow { transform: translate3d(6px, 0, 0); }

.kus-close__formats { margin-top: 24px; }
.kus-close__door { margin-top: 16px; }

@media (prefers-reduced-motion: reduce) {
  .kus-close__tile, .kus-close__tile-arrow, .kus-close__mail { transition: none; }
  .kus-close__tile:hover { transform: none; }
  .kus-close__tile:hover .kus-close__tile-arrow, .kus-close__tile:focus-visible .kus-close__tile-arrow { transform: none; }
}
:root[data-dots="still"] .kus-close__tile,
:root[data-dots="still"] .kus-close__tile-arrow { transition: none; }
:root[data-dots="still"] .kus-close__tile:hover { transform: none; }
:root[data-dots="still"] .kus-close__tile:hover .kus-close__tile-arrow,
:root[data-dots="still"] .kus-close__tile:focus-visible .kus-close__tile-arrow { transform: none; }

/* The drip (PORTLAND.rainDrip), HireClose's rules for the close's lattice. */
.kus-close .close-rain { display: none; }
@media (min-width: 1024px) {
  .kus-close .close-rain {
    display: block;
    position: absolute; inset: 0; z-index: -1;
    overflow: hidden; pointer-events: none;
  }
  .kus-close .close-rain__col { position: absolute; top: 0; bottom: 0; width: 24px; }
  .kus-close .close-rain__dots {
    position: absolute; top: -24px; bottom: 0; left: 0; right: 0;
    background-image: radial-gradient(circle, var(--color-terracotta-500) 2px, transparent 2px);
    background-size: 24px 24px;
    background-position: 0 0;
    animation: kus-close-rain var(--rain-dur, 3.2s) infinite;
    animation-delay: var(--rain-delay, 0s);
    will-change: transform;
  }
}
@keyframes kus-close-rain {
  0%, 45% { transform: translate3d(0, 0, 0); animation-timing-function: cubic-bezier(0.55, 0, 0.45, 1); }
  100%    { transform: translate3d(0, 24px, 0); }
}
:root[data-dots="still"] .kus-close .close-rain { display: none; }
@media (forced-colors: active) { .kus-close .close-rain { display: none; } }
`;
