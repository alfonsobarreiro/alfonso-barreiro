"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { CopyEmail, EMAIL } from "@/components/CopyEmail";
import { DotPortrait } from "@/components/home/DotPortrait";
import { CloseRain, CloseWeather } from "@/components/home/HeroWeather";
import { AVAILABILITY, formatAvailabilityDate } from "@/lib/availability";
import { getDots } from "@/lib/dots";

/**
 * The close: the homepage's last band before the footer, and the end of
 * the argument. The old hero, rebuilt at the bottom, so the ask comes
 * after the work instead of before it.
 *
 * Top to bottom: the H2 at display size (the page's biggest type, echoing
 * the two Cut, then build bands above), the Alf 05 portrait, the
 * availability line with its Updated date (src/lib/availability.ts,
 * edited monthly), the KPDX dateline (1024px and up), the actions
 * (resume, email with Copy, coffee chat, LinkedIn), and on "/" only the
 * studio door.
 *
 * - Ground: paper with the old hero's static 24px terracotta-300 dot grid,
 *   so the drip has a lattice to run on. No spotlight, no x-ray.
 * - Portrait: the halftone at rest, the plain photo on hover, while focus
 *   is inside the close, and for 1.6s after a tap. A cross-fade only. See
 *   DotPortrait. From 1024px it sits beside the text column, its corner
 *   snapped to a lattice dot; below that it follows the H2.
 * - Rain (PORTLAND.rainDrip, 1024px and up): when KPDX reports rain,
 *   sparse lattice columns outside the text column and the portrait drift
 *   down. CSS keyframes only, behind the text, aria-hidden. See
 *   HeroWeather.
 * - "Stop the dots" (html[data-dots="still"]), reduced motion included:
 *   no drip, the plain photo, no fade.
 * - CLS 0: the portrait box and the dateline slot have fixed sizes, and
 *   from 1024px the section's min-height clears the portrait.
 *
 * `audience="hiring"` is /hiring, the page job applications link to: no
 * studio door (job applications never link the studio). It is not
 * rendered at all, not hidden with CSS.
 *
 * Type: DM Sans only, weights 400 + 500. Rounded corners (globals.css radius tokens).
 */

export const LINKEDIN = "https://www.linkedin.com/in/alfonso-barreiro/";
export const COFFEE   = "https://cal.com/alfonso-barreiro";
const TAP_HOLD_MS = 1600;

/* html carries scroll-behavior: smooth, so the jump up to #studio would
   glide. With the dots still (reduced motion starts there) it jumps
   instead: auto for this one jump, restored on the next task. The
   anchor's own default action still runs (hash, history, focus start). */
function jumpIfStill() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (getDots() !== "still" && !reduced) return;
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.setTimeout(() => { html.style.scrollBehavior = prev; }, 0);
}

/* Visually hidden, read by screen readers. */
function NewTab() {
  return <span className="hire-close__sr"> (opens in a new tab)</span>;
}

export default function HireClose({ audience }: { audience: "all" | "hiring" }) {
  const sectionRef  = useRef<HTMLElement>(null);
  const colRef      = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const updated     = formatAvailabilityDate(AVAILABILITY.updated);

  // Touch and pen: a tap on the portrait brings the photo into focus for
  // TAP_HOLD_MS, then it fades back to the print. Passive, so scrolling is
  // never blocked. Mouse uses :hover (DotPortrait's CSS).
  useEffect(() => {
    const portrait = portraitRef.current;
    if (!portrait) return;
    let timer = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      window.clearTimeout(timer);
      portrait.setAttribute("data-reveal", "");
      timer = window.setTimeout(() => portrait.removeAttribute("data-reveal"), TAP_HOLD_MS);
    };
    portrait.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      portrait.removeEventListener("pointerdown", onDown);
      window.clearTimeout(timer);
      portrait.removeAttribute("data-reveal");
    };
  }, []);

  return (
    <section ref={sectionRef} id="hire" aria-labelledby="hire-title" className="hire-close">
      {/* The drip, behind everything but the ground (z-index -1 inside the
          section's own stacking context). */}
      <CloseRain sectionRef={sectionRef} colRef={colRef} portraitRef={portraitRef} />

      <div className="hire-close__inner">
        <div ref={colRef} className="hire-close__col">
          <h2 id="hire-title" className="hire-close__title">
            I cut scope, then build what&rsquo;s left.
          </h2>

          <DotPortrait variant="close" className="hire-close__portrait" ref={portraitRef} />

          <p className="hire-close__status">{AVAILABILITY.line}</p>
          {updated && (
            <p className="hire-close__meta">
              <span>Updated <time dateTime={AVAILABILITY.updated}>{updated}</time>.</span>
            </p>
          )}
          {/* The KPDX dateline, 1024px and up, in a fixed two-line slot. */}
          <CloseWeather className="hire-close__meta hire-close__dateline" />

          <div className="hire-close__actions">
            <Button href="/resume" variant="primary" size="lg" style={{ minHeight: "44px" }}>
              See the resume
            </Button>
            <span className="hire-close__email">
              <a href={`mailto:${EMAIL}`} className="hire-close__link">{EMAIL}</a>
              <CopyEmail label="Copy" className="hire-close__copy" />
            </span>
            <a href={COFFEE} target="_blank" rel="noopener noreferrer" className="hire-close__link">
              Book a coffee chat<NewTab />
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hire-close__link">
              LinkedIn<NewTab />
            </a>
          </div>

          {/* The second door, for buyers. Not on /hiring. */}
          {audience !== "hiring" && (
            <p className="hire-close__door">
              Need a site or a logo for your business?{" "}
              <a href="#studio" className="hire-close__link hire-close__link--inline" onClick={jumpIfStill}>Find your package</a>
            </p>
          )}
        </div>
      </div>

      <style>{CSS}</style>
    </section>
  );
}

const CSS = `
.hire-close {
  --hc-pad-top:    clamp(72px, 8vw, 112px);
  --hc-pad-bottom: clamp(72px, 8vw, 112px);
  --hc-pad-x:      clamp(24px, 6vw, 80px);
  --hc-h2:         clamp(40px, 7vw, 88px);
  position: relative;
  /* Its own stacking context, so the drip at z-index -1 paints over the
     ground and under the text. */
  isolation: isolate;
  padding: var(--hc-pad-top) var(--hc-pad-x) var(--hc-pad-bottom);
  border-top: 1px solid var(--color-neutral-200);
  scroll-margin-top: 72px;
  /* The old hero's static lattice: dots at 12 + 24n from the padding
     box's corner, where the drip's columns are placed. */
  background-color: var(--color-paper);
  background-image: radial-gradient(circle, var(--color-terracotta-300) 1px, transparent 1px);
  background-size: 24px 24px;
  background-position: 0 0;
}
.hire-close__inner {
  max-width: var(--content-max);
  margin: 0 auto;
}
.hire-close__col { max-width: 720px; }

.hire-close__title {
  font-family: var(--font-dm-sans), sans-serif;
  font-size: var(--hc-h2);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0 0 24px;
  max-width: 18ch;
  text-wrap: balance;
}
.hire-close .hire-close__portrait { margin: 0 0 24px; }

.hire-close__status {
  font-family: var(--font-dm-sans), sans-serif;
  font-size: clamp(17px, 1.6vw, 20px);
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-text);
  margin: 0;
}
/* Updated date and dateline: one lattice row each. */
.hire-close__meta {
  font-family: var(--font-dm-sans), sans-serif;
  font-size: var(--text-small);
  font-weight: 400;
  line-height: 24px;
  color: var(--color-neutral-600);
  margin: 4px 0 0;
}
/* A paper ground under the small text only, so no lattice dot crosses
   12px type (as the old hero's label chips did). The negative margin keeps
   the text on the rail. */
.hire-close__meta > span {
  background: var(--color-paper);
  padding: 2px 6px;
  margin: 0 -6px;
  -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
}
.hire-close__dateline { display: none; }

.hire-close__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 28px;
  margin-top: 24px;
}
.hire-close__email { display: inline-flex; align-items: center; gap: 4px; }
.hire-close__link {
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
.hire-close__link:hover { color: var(--color-text-link-hover); }
.hire-close__link:focus-visible,
.hire-close__copy:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}
/* Copy: a small chip inside a 44px target. */
.hire-close__copy {
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
.hire-close__copy > span {
  border: 1px solid var(--color-neutral-400);
  border-radius: var(--radius-chip);
  background: var(--color-paper);
  padding: 4px 8px;
  line-height: 16px;
  transition: border-color 0.2s ease;
}
.hire-close__copy:hover > span { border-color: var(--color-neutral-600); }

.hire-close__door {
  margin: 16px 0 0;
  font-family: var(--font-dm-sans), sans-serif;
  font-size: var(--text-body);
  line-height: 1.4;
  color: var(--color-text);
}
.hire-close__link--inline { vertical-align: middle; }

.hire-close__sr {
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

/* Focus anywhere in the close: the photo, no halftone. */
.hire-close:focus-within .dotportrait-close__photo { opacity: 1; }

/* 768 to 1023px: the portrait floats right and the copy wraps around
   it, so the band does not read as a stretched phone layout. */
@media (min-width: 768px) and (max-width: 1023px) {
  .hire-close__col { max-width: none; display: flow-root; }
  .hire-close .hire-close__portrait {
    float: right;
    margin: 8px 0 24px 40px;
  }
}

@media (min-width: 1024px) {
  /* Leave the portrait's column clear, snap included. */
  .hire-close__col { max-width: min(720px, calc(100% - 360px)); }
  /* The dateline slot's empty second row already spaces the actions. */
  .hire-close__dateline + .hire-close__actions { margin-top: 16px; }
  /* The dateline slot: two lattice rows, so a reading that arrives late
     (or never) moves nothing. The longest caption takes two at 1024px. */
  .hire-close__dateline {
    display: block;
    height: 48px;
    margin: 0;
  }
  .hire-close {
    /* Portrait top: the H2's cap line. */
    --hc-ptop: calc(var(--hc-pad-top) + 0.166 * var(--hc-h2));
    /* The section always clears the portrait (1px is the top border). */
    min-height: calc(1px + var(--hc-ptop) + 384px + var(--hc-pad-bottom));
  }
  .hire-close .hire-close__portrait {
    position: absolute;
    margin: 0;
    top: var(--hc-ptop);
    /* Right edge on the content column's right edge. 100% is the
       section's width here (the containing block). */
    --c: calc(100% - 2 * var(--hc-pad-x));
    left: calc(var(--hc-pad-x) + (var(--c) + min(var(--c), var(--content-max))) / 2 - 288px);
  }
}
@supports (top: round(down, 1px, 1px)) {
  @media (min-width: 1024px) {
    /* Snap the portrait's corner to a lattice dot (12 + 24n). */
    .hire-close {
      --hc-ptop: calc(round(nearest, var(--hc-pad-top) + 0.166 * var(--hc-h2) - 12px, 24px) + 12px);
    }
    .hire-close .hire-close__portrait {
      left: calc(round(down, var(--hc-pad-x) + (var(--c) + min(var(--c), var(--content-max))) / 2 - 300px, 24px) + 12px);
    }
  }
}

/* The drip (PORTLAND.rainDrip), 1024px and up. Each column is one lattice
   column of lit dots (terracotta-500, 2px) at low opacity, masked to a
   streak. The dots hold on the lattice, then run down one pitch, so they
   stay in register with the ground. */
.hire-close .close-rain { display: none; }
@media (min-width: 1024px) {
  .hire-close .close-rain {
    display: block;
    position: absolute;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
  }
  .close-rain__col {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 24px;
  }
  .close-rain__dots {
    position: absolute;
    top: -24px;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: radial-gradient(circle, var(--color-terracotta-500) 2px, transparent 2px);
    background-size: 24px 24px;
    background-position: 0 0;
    animation: close-rain-run var(--rain-dur, 3.2s) infinite;
    animation-delay: var(--rain-delay, 0s);
    will-change: transform;
  }
}
@keyframes close-rain-run {
  0%, 45% { transform: translate3d(0, 0, 0); animation-timing-function: cubic-bezier(0.55, 0, 0.45, 1); }
  100%    { transform: translate3d(0, 24px, 0); }
}
:root[data-dots="still"] .hire-close .close-rain { display: none; }
@media (forced-colors: active) { .hire-close .close-rain { display: none; } }
`;
