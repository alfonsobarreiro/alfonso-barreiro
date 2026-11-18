"use client";

import { useEffect, useState } from "react";
import { KUS_COPY } from "@/components/kus/copy";

/* Play (spec 2.16, from Pumo's Play section), moved into the footer row
   beside "Stop the dots" so it adds no band. One toggle button with
   aria-pressed; the choice is remembered per visitor in localStorage
   (every read and write wrapped, so blocked storage only means the
   choice lasts the visit).

   Swap the plates was removed 2026-11-11 (Alfonso: "Make updates", after
   the audit 15 read): it was a second toy beside Show the specs, which
   ties to the type work. A choice stored by the old button is cleared on
   load so no visitor stays stuck on swapped plates.

   Show the specs: data-specs on the root, and a mono tag over each
     [data-spec] element (the name, the line, the statements, the close)
     with its face and its live size, line height and tracking from
     getComputedStyle, for example "DM Sans 600 · 88/88 · -0.04em".
     Tags are absolutely positioned on the root, so nothing shifts, and
     aria-hidden. */

const PLATES_KEY = "barreiro-kus-plates"; // retired 2026-11-11, cleared on load
const SPECS_KEY  = "barreiro-kus-specs";

function read(key: string): boolean {
  try { return localStorage.getItem(key) === "on"; } catch { return false; }
}
function write(key: string, on: boolean) {
  try { localStorage.setItem(key, on ? "on" : "off"); } catch { /* blocked storage: this visit only */ }
}

function fmt(n: number) {
  return Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, "");
}

function specText(el: HTMLElement) {
  const cs = getComputedStyle(el);
  const size = parseFloat(cs.fontSize);
  const lh = cs.lineHeight === "normal" ? size * 1.2 : parseFloat(cs.lineHeight);
  const ls = cs.letterSpacing === "normal" ? 0 : parseFloat(cs.letterSpacing) / size;
  const face = el.getAttribute("data-spec") || "DM Sans";
  const track = ls === 0 ? "0" : `${ls.toFixed(3).replace(/0+$/, "").replace(/\.$/, "")}em`;
  return `${face} · ${fmt(Math.round(size * 10) / 10)}/${fmt(Math.round(lh * 10) / 10)} · ${track}`;
}

export default function KusPlay() {
  const [specs, setSpecs] = useState(false);

  /* Restore the stored choices once, after hydration. */
  useEffect(() => {
    const t = window.setTimeout(() => {
      try { localStorage.removeItem(PLATES_KEY); } catch { /* blocked storage */ }
      setSpecs(read(SPECS_KEY));
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".kus");
    if (!root || !specs) return;
    root.setAttribute("data-specs", "");
    const layer = document.createElement("div");
    layer.className = "kus-specs";
    layer.setAttribute("aria-hidden", "true");
    root.appendChild(layer);

    const draw = () => {
      layer.textContent = "";
      const o = root.getBoundingClientRect();
      root.querySelectorAll<HTMLElement>("[data-spec]").forEach((el) => {
        if (!el.getClientRects().length) return;
        const r = el.getBoundingClientRect();
        const tag = document.createElement("span");
        tag.className = "kus-specs__tag";
        tag.textContent = specText(el);
        tag.style.transform = `translate3d(${Math.round(r.left - o.left)}px, ${Math.round(r.top - o.top - 26)}px, 0)`;
        layer.appendChild(tag);
      });
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(root);
    return () => {
      ro.disconnect();
      layer.remove();
      root.removeAttribute("data-specs");
    };
  }, [specs]);

  return (
    <>
      <button
        type="button"
        className="kus-play__btn"
        aria-pressed={specs}
        onClick={() => { const next = !specs; setSpecs(next); write(SPECS_KEY, next); }}
      >
        {KUS_COPY.play.specs}
      </button>
      <style>{`
        .kus-play__btn {
          display: inline-flex; align-items: center; justify-content: center;
          min-height: 44px; padding: 8px 18px;
          border-radius: 999px;
          border: 2px solid var(--color-navy);
          background: var(--color-paper); color: var(--color-navy);
          font-family: var(--kus-sans); font-weight: 400; font-size: var(--kus-fs-ui); line-height: 1.2;
          cursor: pointer;
          transition: background-color var(--kus-dur-out) ease, color var(--kus-dur-out) ease;
        }
        .kus-play__btn[aria-pressed="true"] { background: var(--color-navy); color: var(--color-paper); }
        @media (hover: hover) {
          .kus-play__btn:hover { background: var(--color-navy); color: var(--color-paper); transition-duration: var(--kus-dur-in); }
        }
        :root[data-dots="still"] .kus-play__btn { transition: none; }
        .kus-specs { position: absolute; inset: 0 auto auto 0; width: 0; height: 0; z-index: 6; pointer-events: none; }
        .kus-specs__tag {
          position: absolute; left: 0; top: 0;
          padding: 2px 8px;
          border-radius: var(--radius-chip);
          background: var(--color-navy); color: var(--color-paper);
          font-family: var(--kus-mono); font-size: var(--kus-fs-mono); line-height: 1.5; letter-spacing: 0;
          white-space: nowrap;
        }
      `}</style>
    </>
  );
}
