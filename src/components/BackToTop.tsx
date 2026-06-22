"use client";

import { useEffect, useState } from "react";

/**
 * BackToTop
 * ─────────────────────────────────────────────────────────────────────────────
 * Floating bottom-right chevron-up that fades in after the user has scrolled
 * past the first ~600px. Smooth-scrolls to the top on click. Honors
 * prefers-reduced-motion (jumps instead of scrolls).
 */
const REVEAL_AT_PX = 600;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > REVEAL_AT_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label="Back to top"
        className="back-to-top-btn"
        style={{
          position:        "fixed",
          right:           "clamp(20px, 3vw, 36px)",
          bottom:          "clamp(20px, 3vw, 36px)",
          width:           "48px",
          height:          "48px",
          background:      "var(--color-brand)",
          color:           "#FAFAF9",
          border:          "none",
          borderRadius:    0,
          cursor:          "pointer",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          boxShadow:       "0 6px 18px rgba(0, 0, 0, 0.18)",
          opacity:         visible ? 1 : 0,
          pointerEvents:   visible ? "auto" : "none",
          transform:       visible ? "translateY(0)" : "translateY(8px)",
          /* Two transitions: the always-on visibility transition + a quick
             hover-only one for the lift. Defined separately so the hover
             lift doesn't fight the slower opacity/visibility curve. */
          transition:      "opacity 0.3s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), background 0.25s ease, box-shadow 0.25s ease",
          zIndex:          40,
        }}
      >
        <svg className="btt-arrow" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M9 14V4M4 8L9 3L14 8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <style>{`
        .back-to-top-btn:hover {
          /* Lift on hover, plus the arrow nudges up to reinforce the action.
             Background darkens to the ink tone so the affordance is unmistakable
             without changing brand identity. */
          background: #252B28 !important;
          transform: translateY(-4px) !important;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28) !important;
        }
        .back-to-top-btn:hover .btt-arrow {
          transform: translateY(-2px);
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .back-to-top-btn .btt-arrow {
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .back-to-top-btn:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: 3px;
        }
      `}</style>
    </>
  );
}
