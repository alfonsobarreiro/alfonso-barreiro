import type { CSSProperties } from "react";

/* Alfonso's hand-drawn arrow (the one beside "See the AI chatbot in
   action" in the Alfred band), at any size. The same two paths in the
   same 72 by 28 box, scaled; the stroke width is set in box units so it
   draws at `stroke` px whatever the size. Decorative: aria-hidden.

   Draw-on (KusStyles reveal rules): pathLength 1, so a dash offset of 1
   hides each stroke and 0 shows it. The shaft draws in 900ms and the
   head 300ms after a 600ms delay, once the nearest [data-reveal] lands.
   Without JS, under reduced motion and with the dots stopped, it is
   simply drawn.

   direction="down" turns the drawing a quarter turn inside its own box
   (28 by 72 at width 72), so the layout box matches what is drawn and a
   neighbor never has to make room for a rotated 72 by 28 box. `width` is
   still the arrow's length. */
export function DrawnArrow({
  width,
  stroke,
  direction = "right",
  className,
  style,
}: {
  /** The arrow's length in px. */
  width: number;
  /** Stroke width in px at the drawn size. */
  stroke: number;
  direction?: "right" | "down";
  className?: string;
  style?: CSSProperties;
}) {
  const across = Math.round((width * 28) / 72);
  const down = direction === "down";
  const sw = (stroke * 72) / width;
  return (
    <>
    <style href="kus-arrow" precedence="default">{ARROW_CSS}</style>
    <svg
      className={`kus-arrow${className ? " " + className : ""}`}
      width={down ? across : width}
      height={down ? width : across}
      viewBox={down ? "0 0 28 72" : "0 0 72 28"}
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ overflow: "visible", ...style }}
    >
      <g transform={down ? "translate(28 0) rotate(90)" : undefined}>
        <path className="kus-arrow__shaft" d="M2 18c14-12 34-15 62-6" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" pathLength={1} />
        <path className="kus-arrow__head" d="M56 4.5 65 12l-9.5 5" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
      </g>
    </svg>
    </>
  );
}

const ARROW_CSS = `
.kus-arrow path { stroke-dasharray: 1 1; stroke-dashoffset: 0; }
:root[data-js]:not([data-dots="still"]) [data-reveal]:not([data-in]) .kus-arrow path { stroke-dashoffset: 1; }
.kus-arrow__shaft { transition: stroke-dashoffset 900ms cubic-bezier(0.16, 1, 0.3, 1); }
.kus-arrow__head  { transition: stroke-dashoffset 300ms cubic-bezier(0.16, 1, 0.3, 1) 600ms; }
[data-reveal][data-instant] .kus-arrow path,
:root[data-dots="still"] .kus-arrow path { transition: none; }
@media (forced-colors: active) { .kus-arrow { color: CanvasText; } }
`;
