"use client";

/* The page, measured in Mill Ends Parks (homepage plan, weird moment 9).
   A footer line that measures the page the viewer is on in CSS inches,
   which are not physical inches on most screens, and says how many Mill
   Ends Parks long it is. Opt-in: PORTLAND.millEnds in src/lib/portland.ts.

   Sources, checked 2026-10-24:
   - Mill Ends Park is two feet across. Portland Parks & Recreation,
     https://www.portland.gov/parks/mill-ends-park (the page's canonical
     URL): "The park is a small circle 2 feet across, with a total area of
     452 square inches (0.00007205784 acres)."
   - CSS fixes the inch at 96px. CSS Values and Units Module Level 4,
     absolute lengths, https://www.w3.org/TR/css-values-4/#absolute-lengths:
     "1in = 2.54cm = 96px".
   - The daily walk. src/app/about/page.tsx, the Off-screen section: "I walk
     five miles a day, building back toward a marathon." Five miles is
     5 x 5,280 = 26,400 feet. If that sentence leaves /about, drop the walk
     clause here too.

   Math, from document.documentElement.scrollHeight in CSS px:
     inches = px / 96, feet = inches / 12, parks = feet / 2,
     N = 26,400 / feet (rounded to a whole number).
   Feet and parks print to one decimal; N prints with en-US separators.
   Each figure comes from the unrounded length, so the three can disagree
   with each other in the last digit.

   Layout: the sentence renders on the server with placeholder figures at
   least as wide as real ones (tabular figures), hidden, so the line holds
   its height before the numbers arrive and CLS stays 0. Hidden with
   visibility, so the placeholder is never read out or focusable. It
   recomputes on resize and whenever the body changes height, both
   debounced 200ms, and only re-renders when a printed figure changes.
   There is no live region: the line updates quietly. */

import { useEffect, useState } from "react";
import { PORTLAND } from "@/lib/portland";
import { SR_ONLY } from "@/components/ui/LinkArrow";

const PX_PER_INCH = 96;
const INCHES_PER_FOOT = 12;
const PARK_FEET = 2;
const WALK_FEET = 5 * 5280;
const PARK_URL = "https://www.portland.gov/parks/mill-ends-park";
const DEBOUNCE_MS = 200;

type Reading = { feet: string; parks: string; walk: string };

// With tabular figures, these are at least as wide as the real ones for
// any page from 0.3 to 99.9 feet long (300px to 115,000px), so the real
// sentence is never longer than the reserved shell.
const PLACEHOLDER: Reading = { feet: "00.0", parks: "00.0", walk: "00,000" };

const ONE_DECIMAL = { minimumFractionDigits: 1, maximumFractionDigits: 1 } as const;

function measure(): Reading | null {
  const px = document.documentElement.scrollHeight;
  if (!px) return null;
  // Round the length to a tenth of a foot first and derive the rest from
  // that, so the sentence checks out by hand: 3.8 feet is 1.9 parks and
  // 1/6,947 of the walk.
  const tenths = Math.max(1, Math.round((px / PX_PER_INCH / INCHES_PER_FOOT) * 10));
  const feet = tenths / 10;
  const parks = Math.round(tenths / PARK_FEET) / 10;
  const walk = Math.max(1, Math.round((WALK_FEET * 10) / tenths));
  return {
    feet:  feet.toLocaleString("en-US", ONE_DECIMAL),
    parks: parks.toLocaleString("en-US", ONE_DECIMAL),
    walk:  walk.toLocaleString("en-US"),
  };
}

function PageLengthLine() {
  const [reading, setReading] = useState<Reading | null>(null);

  useEffect(() => {
    let last = "";
    let timer: number | undefined;

    const update = () => {
      const next = measure();
      if (!next) return;
      const key = `${next.feet}|${next.parks}|${next.walk}`;
      if (key === last) return;
      last = key;
      setReading(next);
    };
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(update, DEBOUNCE_MS);
    };

    const frame = window.requestAnimationFrame(update);
    window.addEventListener("resize", schedule);
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
    observer?.observe(document.body);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
    };
  }, []);

  const shown = reading ?? PLACEHOLDER;
  const singular = shown.parks === "1.0";

  return (
    <>
      <p
        className="page-length"
        style={{ visibility: reading ? "visible" : "hidden" }}
      >
        In CSS inches, this page is {shown.feet} {shown.feet === "1.0" ? "foot" : "feet"} long: {shown.parks}{" "}
        <a href={PARK_URL} target="_blank" rel="noopener noreferrer">{singular ? "Mill Ends Park" : "Mill Ends Parks"}<span style={SR_ONLY}> (opens in a new tab)</span></a>, or 1/{shown.walk} of my
        daily walk.
      </p>
      <style>{`
        .page-length {
          margin: 24px 0 0;
          font-family: var(--font-dm-sans), -apple-system, sans-serif;
          font-size: var(--text-small);
          font-weight: 400;
          line-height: 1.5;
          color: var(--color-text-muted); /* neutral-600; 700 on the homepage */
          font-variant-numeric: tabular-nums;
        }
        /* Same treatment as the footer's own links: ink text, muted
           underline. The vertical padding grows the tap area to 44px
           without touching the line box, since padding on an inline
           element does not change line height. */
        .page-length a {
          color: var(--color-text);
          text-decoration: underline;
          text-decoration-color: var(--color-neutral-600);
          text-underline-offset: 3px;
          padding: 14px 0;
        }
      `}</style>
    </>
  );
}

export default function PageLength() {
  if (!PORTLAND.millEnds) return null;
  return <PageLengthLine />;
}
