/* "Stop the dots": one site-wide switch for the dot grid's motion (the hero
   spotlight, the plate spotlight, and anything else that moves on the grid).

   State lives on <html data-dots="still">, so CSS can read it before React
   hydrates. DOTS_HEAD_SCRIPT runs inline in <head> (src/app/layout.tsx) and
   applies the stored choice before first paint, so nothing moves for a frame
   and then stops. prefers-reduced-motion starts in "still" unless the viewer
   has explicitly turned the dots back on. The script also sets
   <html data-js>, so entrance motion (SlideIn) can hide its start state
   from the first paint without hiding content when JavaScript is off.

   The stored choice is a per-viewer convenience: every read and write is
   wrapped, so a blocked localStorage only means the choice lasts the visit.
   Components listen for DOTS_EVENT to stay in sync across controls. */

export const DOTS_KEY = "barreiro-dots";
export const DOTS_EVENT = "barreiro:dots";

export type DotsState = "moving" | "still";

export const DOTS_HEAD_SCRIPT = `(function(){try{document.documentElement.setAttribute("data-js","");var s=null;try{s=localStorage.getItem("${DOTS_KEY}")}catch(e){}var rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;if(s==="still"||(s!=="moving"&&rm)){document.documentElement.setAttribute("data-dots","still")}}catch(e){}})();`;

export function getDots(): DotsState {
  if (typeof document === "undefined") return "moving";
  return document.documentElement.getAttribute("data-dots") === "still" ? "still" : "moving";
}

export function setDots(next: DotsState) {
  const root = document.documentElement;
  if (next === "still") root.setAttribute("data-dots", "still");
  else root.removeAttribute("data-dots");
  try {
    localStorage.setItem(DOTS_KEY, next);
  } catch {
    /* blocked storage: the choice lasts this visit */
  }
  window.dispatchEvent(new CustomEvent<DotsState>(DOTS_EVENT, { detail: next }));
}
