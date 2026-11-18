"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

/* Homepage About portrait as two prints on a table: the office photo on
   top, the trail photo underneath, offset down and to the right so its
   edge shows. The button under the stack pulls the back print out to the
   right and lays it on top; pressing it again swaps them back. No tilt,
   no autoplay.

   The box is fixed: print width x 3:4 plus the offset, so the swap never
   moves the text column. The caption and the button label each reserve
   the width or height of their longest string, so neither resizes when
   the text changes.

   The motion runs on the Web Animations API instead of CSS keyframes so
   it can start from wherever the prints are. A second press mid-swap
   reverses from the current position instead of jumping. The resting
   positions live in CSS on data-slot, so without JS, and with
   prefers-reduced-motion, the swap is instant.

   Screen readers: the back print is aria-hidden, so only the photo in
   front is read. The caption is a polite live region and announces the
   new photo after each swap. */

type PrintKey = "office" | "trail";

type Print = {
  src: string;
  alt: string;
  /** Caption shown while this print is in front. */
  caption: string;
  /** Button label while this print is at the back (pressing brings it forward). */
  label: string;
};

const PRINTS: Record<PrintKey, Print> = {
  office: {
    /* Alf 05, the plaid office photo, plain (Alfonso, 2026-10-27: it moved
       here from the close, "not dotted"). */
    src:     "/images/portrait/alfonso-office-plaid.jpg",
    alt:     "Alfonso Barreiro in a plaid shirt in an office hallway.",
    caption: "At work, in the office.",
    label:   "At work",
  },
  trail: {
    src:     "/images/portrait/alfonso-waterfall.jpg",
    alt:     "Alfonso Barreiro on a trail in front of a waterfall.",
    caption: "Off the clock, on a trail.",
    label:   "Off the clock",
  },
};

/* DOM order never changes; stacking comes from data-slot and z-index. */
const ORDER: PrintKey[] = ["office", "trail"];

const DURATION = 520; // ms
const SHADOW = "0 1px 2px rgb(37 43 40 / 0.10), 0 6px 14px -6px rgb(37 43 40 / 0.22)";
const SHADOW_LIFTED = "0 2px 4px rgb(37 43 40 / 0.10), 0 14px 28px -10px rgb(37 43 40 / 0.30)";

type Pose = { x: number; y: number; s: number };

function readPose(el: HTMLElement): Pose {
  const t = getComputedStyle(el).transform;
  if (!t || t === "none") return { x: 0, y: 0, s: 1 };
  const m = new DOMMatrixReadOnly(t);
  return { x: m.m41, y: m.m42, s: Math.hypot(m.a, m.b) };
}

const pose = ({ x, y, s }: Pose) => `translate(${x}px, ${y}px) scale(${s})`;

export default function AboutPrints() {
  const [front, setFront] = useState<PrintKey>("office");
  const stackRef = useRef<HTMLDivElement>(null);
  const printRefs = useRef<Record<PrintKey, HTMLDivElement | null>>({ office: null, trail: null });

  const back: PrintKey = front === "office" ? "trail" : "office";

  function swap() {
    const rising = printRefs.current[back];
    const sinking = printRefs.current[front];
    const stack = stackRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduce && rising && sinking && stack && typeof rising.animate === "function") {
      const vars = getComputedStyle(stack);
      const offset = parseFloat(vars.getPropertyValue("--ap-offset")) || 12;
      const slide = parseFloat(vars.getPropertyValue("--ap-slide")) || 32;

      // Read where both prints are right now (mid-swap included) before
      // cancelling anything, so the next motion starts from there.
      const rFrom = readPose(rising);
      const sFrom = readPose(sinking);
      const risingOnTop = Number(getComputedStyle(rising).zIndex) > Number(getComputedStyle(sinking).zIndex);
      rising.getAnimations?.().forEach((a) => a.cancel());
      sinking.getAnimations?.().forEach((a) => a.cancel());

      const home: Pose = { x: 0, y: 0, s: 1 };
      const behind: Pose = { x: offset, y: offset, s: 1 };

      if (risingOnTop) {
        // Reversed mid-swap after it already crossed over: settle straight back.
        rising.animate(
          [
            { transform: pose(rFrom), zIndex: 3 },
            { transform: pose(home), zIndex: 3 },
          ],
          { duration: DURATION * 0.6, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
        );
      } else {
        // Slide out from under the front print, lift, then lay on top.
        const out: Pose = { x: offset + slide, y: offset, s: 1.02 };
        rising.animate(
          [
            { offset: 0,    transform: pose(rFrom), zIndex: 1, boxShadow: SHADOW,        easing: "cubic-bezier(0.33, 0, 0.2, 1)" },
            { offset: 0.45, transform: pose(out),   zIndex: 1, boxShadow: SHADOW_LIFTED },
            { offset: 0.45, transform: pose(out),   zIndex: 3, boxShadow: SHADOW_LIFTED, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
            { offset: 1,    transform: pose(home),  zIndex: 3, boxShadow: SHADOW },
          ],
          { duration: DURATION },
        );
      }
      sinking.animate(
        [
          { transform: pose(sFrom),  zIndex: 2 },
          { transform: pose(behind), zIndex: 2 },
        ],
        { duration: risingOnTop ? DURATION * 0.6 : DURATION, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
      );
    }

    setFront(back);
  }

  return (
    <div className="ap">
      <figure style={{ margin: 0 }}>
        <div ref={stackRef} className="ap__stack">
          {ORDER.map((key) => {
            const p = PRINTS[key];
            const isFront = key === front;
            return (
              <div
                key={key}
                ref={(el) => { printRefs.current[key] = el; }}
                className="ap__print"
                data-slot={isFront ? "front" : "back"}
                aria-hidden={isFront ? undefined : true}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 767px) 200px, 280px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
            );
          })}
        </div>
        <figcaption className="ap__caption">
          {/* Sizers reserve the longest caption so a swap never reflows. */}
          {ORDER.map((key) => (
            <span key={key} className="ap__cell ap__sizer" aria-hidden="true">{PRINTS[key].caption}</span>
          ))}
          <span className="ap__cell" aria-live="polite" aria-atomic="true">{PRINTS[front].caption}</span>
        </figcaption>
      </figure>

      {/* Both labels share one grid cell, so the button keeps the width of
          the longer one and a second tap lands in the same place. */}
      <Button variant="ghost" size="md" onClick={swap} className="ap__button">
        <span className="ap__label">
          {ORDER.map((key) => (
            <span
              key={key}
              className="ap__cell ap__label-row"
              aria-hidden={key === back ? undefined : true}
              style={{ visibility: key === back ? "visible" : "hidden" }}
            >
              <SwapIcon />
              {PRINTS[key].label}
            </span>
          ))}
        </span>
      </Button>

      <style>{`
        .ap {
          --ap-w:      280px;
          --ap-offset: 12px;
          --ap-slide:  32px;
          width: calc(var(--ap-w) + var(--ap-offset));
        }
        .ap__stack {
          position: relative;
          width:    100%;
          height:   calc(var(--ap-w) * 4 / 3 + var(--ap-offset));
        }
        .ap__print {
          position:      absolute;
          top:           0;
          left:          0;
          width:         var(--ap-w);
          aspect-ratio:  3 / 4;
          overflow:      hidden;
          border-radius: var(--radius-panel);
          border-radius: 2px;
          background:    var(--color-neutral-100);
          box-shadow:    ${SHADOW};
          transform-origin: 50% 50%;
        }
        .ap__print[data-slot="front"] { transform: translate(0, 0); z-index: 2; }
        .ap__print[data-slot="back"]  { transform: translate(var(--ap-offset), var(--ap-offset)); z-index: 1; }

        .ap__caption {
          display:     grid;
          margin:      12px 0 0;
          font-family: var(--font-dm-sans), sans-serif;
          font-size:   var(--text-small);
          line-height: 1.5;
          color:       var(--color-text-muted);
        }
        .ap__cell  { grid-area: 1 / 1; }
        .ap__sizer { visibility: hidden; }

        .ap__button { margin-top: 16px; }
        .ap__label     { display: inline-grid; justify-items: center; }
        .ap__label-row { display: inline-flex; align-items: center; gap: 8px; }

        @media (max-width: 767px) {
          .ap { --ap-w: 200px; }
        }
      `}</style>
    </div>
  );
}

/* Two offset frames, the same arrangement as the prints. Decorative: the
   button's text is its name. */
function SwapIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <rect x="1.75" y="1.25" width="9" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12.75 4.25h0.5a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-0.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
