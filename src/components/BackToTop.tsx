"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

/**
 * BackToTop
 * ─────────────────────────────────────────────────────────────────────────────
 * Floating bottom-right chevron-up that fades in after the user has scrolled
 * past the first ~600px. Smooth-scrolls to the top on click. Honors
 * prefers-reduced-motion (jumps instead of scrolls, and appears without the
 * fade).
 *
 * Hides again while the footer is in view (IntersectionObserver), so on a
 * phone it never sits on top of the footer's email link. Hidden means out of
 * the tab order and the accessibility tree too: the wrapper goes inert.
 *
 * Built on the DS Button primitive (variant="primary" shape="circle"). The
 * back-to-top-specific hover behavior (bigger lift, ink background swap, arrow
 * nudge) lives in globals.css under `.back-to-top-btn`. DS rule: no inline
 * JS handlers for hover, extend via className + CSS.
 */
const REVEAL_AT_PX = 600;

/* Local up-chevron. Kept in-file because BackToTop is the only consumer;
   promote to ui/icons.tsx if a second surface needs it. */
function UpChevronIcon() {
  return (
    <svg
      className="btt-arrow"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
    >
      <path
        d="M9 14V4M4 8L9 3L14 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BackToTop() {
  const [scrolledPast, setScrolledPast] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > REVEAL_AT_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const footer =
      document.querySelector<HTMLElement>("footer.site-footer") ??
      document.querySelector<HTMLElement>("footer");
    if (!footer) return;
    const io = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const visible = scrolledPast && !footerInView;

  const handleClick = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="back-to-top-wrap" inert={!visible}>
      <Button
        variant="primary"
        shape="circle"
        size="md"
        onClick={handleClick}
        ariaLabel="Back to top"
        className="back-to-top-btn"
        style={{
          position:      "fixed",
          right:         "clamp(20px, 3vw, 36px)",
          bottom:        "clamp(20px, 3vw, 36px)",
          boxShadow:     "var(--shadow-2)",
          opacity:       visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          /* Reveal transform (translateY(0) visible, 8px offscreen). The
             back-to-top-btn:hover rule in globals.css uses !important to
             override this inline transform with the -4px lift. */
          transform:     visible ? "translateY(0)" : "translateY(8px)",
          transition:
            "opacity 0.3s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), background 0.25s ease, box-shadow 0.25s ease",
          zIndex:        40,
        }}
      >
        <UpChevronIcon />
      </Button>
      {/* Reduced motion, or the viewer stopped the dots: the button
          appears and disappears in place, with no fade or slide. */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .back-to-top-btn { transition: none !important; }
        }
        html[data-dots="still"] .back-to-top-btn { transition: none !important; }
      `}</style>
    </div>
  );
}
