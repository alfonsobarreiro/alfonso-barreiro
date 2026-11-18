"use client";

import { useState } from "react";
import Image from "next/image";

/* FlipMedia: card media for two-sided print pieces on the homepage
   (Ad campaigns and print band). The frame shows one side; a small button
   in the corner turns the piece over with a 3D rotateY flip. Reduced motion
   gets a short crossfade instead, with no 3D.

   Lives inside WorkCard's 16:10 .wcard__screen. Structure matters here:
   `perspective` creates a stacking context, so it sits on the stage, and the
   button is the stage's sibling. If the button were inside the stage, its
   z-index would be trapped below the card's stretched title link (::after,
   z-index 1) and clicks would open the piece instead of flipping it.

   The button's text changes with the side ("Show the gin label" / "Show the
   rum label"), so it is an action button, not a toggle: aria-pressed with a
   changing label would announce "Show the rum label, pressed" while the gin
   label is showing. A polite status line confirms each change for screen
   readers, and the side that is turned away is aria-hidden. */

export type FlipSide = { src: string; width: number; height: number; alt: string };

export function FlipMedia({
  front,
  back,
  frontLabel,
  backLabel,
  bare = false,
}: {
  front: FlipSide;
  back: FlipSide;
  /** Noun for the front side, used in "Show the {label}" (e.g. "rum label"). */
  frontLabel: string;
  /** Noun for the back side (e.g. "gin label"). */
  backLabel: string;
  /** The images are bare crops of white paper with no shadow of their own:
      give the sheet a shadow so it sits on the plate. */
  bare?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const [status, setStatus] = useState("");

  const toggle = () => {
    const next = !flipped;
    setFlipped(next);
    setStatus(`Showing the ${next ? backLabel : frontLabel}.`);
  };

  return (
    <div
      className={`flipm${bare ? " flipm--bare" : ""}`}
      data-side={flipped ? "back" : "front"}
      style={{ position: "absolute", inset: 0 }}
    >
      <div className="flipm__stage" style={{ position: "absolute", inset: 0 }}>
        <div className="flipm__card" style={{ position: "absolute", inset: 0 }}>
          <Face side={front} className="flipm__face flipm__face--front" hidden={flipped} />
          <Face side={back} className="flipm__face flipm__face--back" hidden={!flipped} />
        </div>
      </div>

      <button
        type="button"
        className="wcard__control flipm__btn"
        onClick={toggle}
        style={{ position: "absolute", right: "8px", bottom: "8px" }}
      >
        <FlipIcon />
        {/* Both labels share one grid cell so the button keeps the width of
            the longer one and never jumps when the text swaps. The hidden one
            is visibility: hidden, which also keeps it out of the accessible name. */}
        <span style={{ display: "grid" }}>
          <span style={{ gridArea: "1 / 1", visibility: flipped ? "hidden" : "visible" }}>Show the {backLabel}</span>
          <span style={{ gridArea: "1 / 1", visibility: flipped ? "visible" : "hidden" }}>Show the {frontLabel}</span>
        </span>
      </button>

      <span role="status" className="flipm__sr">{status}</span>

      <style>{CSS}</style>
    </div>
  );
}

function Face({ side, className, hidden }: { side: FlipSide; className: string; hidden: boolean }) {
  return (
    <div className={className} aria-hidden={hidden || undefined} style={{ position: "absolute", inset: 0 }}>
      <div className="flipm__sheet" style={{ position: "absolute" }}>
        <Image
          src={side.src}
          alt={side.alt}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 640px"
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}

/* Two arrows chasing each other: the piece turns over and back. */
function FlipIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden focusable="false">
      <path
        d="M2.25 6.5a4.75 4.75 0 0 1 8.6-2.4M11.25 1.75v2.6h-2.6M11.75 7.5a4.75 4.75 0 0 1-8.6 2.4M2.75 12.25v-2.6h2.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CSS = `
.flipm__stage { perspective: 1400px; }
.flipm__card {
  transform-style: preserve-3d;
  transition: transform 500ms cubic-bezier(0.65, 0, 0.35, 1);
}
.flipm[data-side="back"] .flipm__card { transform: rotateY(180deg); }
.flipm__face { -webkit-backface-visibility: hidden; backface-visibility: hidden; }
.flipm__face--back { transform: rotateY(180deg); }
/* Every side sits in the same box: a 5% margin, plus a 44px strip at the
   bottom that belongs to the button, so the button never covers the work. */
.flipm__sheet { inset: 5% 5% 44px; }
/* White paper on a colored plate: a shadow so the sheet sits on it. Written
   as drop-shadow so it follows the image and not the letterbox around it. */
.flipm--bare .flipm__sheet img {
  filter: drop-shadow(0 10px 18px rgb(0 0 0 / 0.32)) drop-shadow(0 2px 4px rgb(0 0 0 / 0.2));
}

.flipm__btn {
  display: inline-flex; align-items: center; gap: 6px;
  height: 32px; padding: 0 12px; box-sizing: border-box;
  background: var(--color-paper);
  border: 1px solid var(--color-neutral-400);
  border-radius: var(--radius-button);
  box-shadow: var(--shadow-1);
  font-family: var(--font-dm-sans), sans-serif;
  font-size: var(--text-small); font-weight: 500; letter-spacing: 0.01em; line-height: 1;
  color: var(--color-text);
  white-space: nowrap;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.2s ease;
}
/* 44px hit area around the 32px chip. */
.flipm__btn::before { content: ""; position: absolute; inset: -6px; }
@media (hover: hover) { .flipm__btn:hover { border-color: var(--color-text); } }
.flipm__btn:focus-visible { outline: 2px solid var(--color-focus-ring); outline-offset: 2px; }

.flipm__sr {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}

@media (prefers-reduced-motion: reduce) {
  .flipm__stage { perspective: none; }
  .flipm__card, .flipm[data-side="back"] .flipm__card { transform: none; transition: none; }
  .flipm__face, .flipm__face--back {
    transform: none;
    -webkit-backface-visibility: visible; backface-visibility: visible;
    transition: opacity 150ms ease;
  }
  .flipm[data-side="front"] .flipm__face--back,
  .flipm[data-side="back"] .flipm__face--front { opacity: 0; }
}
`;
