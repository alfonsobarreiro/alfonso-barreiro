"use client";

import { useEffect, useRef } from "react";

/**
 * Hero — text only. The portrait moved to the homepage About section on
 * 2026-10-22.
 * Composition after the 2026-08-25 reference-site synthesis:
 *
 * - Status chip promoted above the H1 as top-of-page anchor (Albera pattern)
 * - Subhead broken into four stacked mechanic clauses (Rauno's form)
 * - Ambient graph-paper dot grid across the hero background (Femke)
 * - Cursor-follows spotlight brightens the dots near the pointer (Femke)
 *
 * Type stack: DM Sans only, weights 400 + 500.
 * Colors: --color-brand (chip), --color-text (H1 + body),
 * --color-neutral-300 (base dots), --color-neutral-500 (spotlight dots).
 * Nothing else.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    // Respect reduced motion — no spotlight tracking for users who opt out
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        section.style.setProperty("--mouse-x", `${x}px`);
        section.style.setProperty("--mouse-y", `${y}px`);
        section.style.setProperty("--spotlight-opacity", "1");
      });
    };

    const onLeave = () => {
      section.style.setProperty("--spotlight-opacity", "0");
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-section hero-dotgrid"
      style={{
        padding:              "clamp(96px, 12vw, 160px) clamp(32px, 6vw, 80px)",
        position:             "relative",
        overflow:             "hidden",
        backgroundColor:      "var(--color-paper)",
        /* Base graph-paper dot grid. Femke pattern, using existing
           tokens. The overlay ::before layer adds the cursor-follows
           spotlight (see the <style> block below). */
        backgroundImage:      "radial-gradient(circle, var(--color-terracotta-300) 1px, transparent 1px)",
        backgroundSize:       "24px 24px",
        backgroundPosition:   "0 0",
      }}
    >
      <div
        className="hero-grid"
        style={{
          maxWidth: "var(--content-max)",
          margin:   "0 auto",
          width:    "100%",
          display:              "grid",
          gridTemplateColumns:  "1fr",
          gap:                  "clamp(40px, 5vw, 80px)",
          justifyContent:       "space-between",
          alignItems:           "start",
          position:             "relative",
          zIndex:               1,
        }}
      >
        <div className="hero-text-col" style={{ maxWidth: "720px" }}>
          <h1
            style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "clamp(32px,7vw,88px)",
              fontWeight:    500,
              lineHeight:    1.05,
              letterSpacing: "-0.02em",
              color:         "var(--color-text)",
              margin:        "0 0 32px",
              maxWidth:      "18ch",
            }}
          >
            I cut scope, then build what&rsquo;s left.
          </h1>

          {/* Subhead — stacked mechanic clauses: identity, what I make,
              track record, ownership. Extra top-margin on the last line so
              the summary claim breathes. */}
          <div className="hero-subhead-stack">
            {[
              "Designer and web developer, fifteen years.",
              "I design and build websites and products end-to-end. Also brand, print, and site audits.",
              "100+ sites shipped across agency, in-house, and product, with AI as the second pair of hands.",
              "Every design call is still mine.",
            ].map((line, i, all) => (
              <p
                key={i}
                style={{
                  fontFamily:    "var(--font-dm-sans), sans-serif",
                  fontSize:      "var(--text-article)",
                  lineHeight:    1.4,
                  fontWeight:    400,
                  letterSpacing: 0,
                  color:         "var(--color-text)",
                  margin:        i === 0 ? "0" : i === all.length - 1 ? "18px 0 0" : "6px 0 0",
                }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Visually-hidden H2 — keyword phrase absent from the H1. */}
          <h2 style={{
            position:   "absolute",
            width:      "1px",
            height:     "1px",
            padding:    0,
            margin:     "-1px",
            overflow:   "hidden",
            clip:       "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            border:     0,
          }}>
            Alfonso Barreiro, designer and web developer in Portland, Oregon.
          </h2>
        </div>

      </div>

      {/* Mobile stacking + cursor spotlight overlay */}
      <style>{`
        /* Cursor spotlight — a second dot layer in a darker neutral,
           revealed only inside a radial mask centered at the cursor.
           Base dots stay faint everywhere; the spotlight brightens
           dots locally so hovering the hero feels responsive. Pointer
           events pass through so the overlay never intercepts clicks. */
        .hero-dotgrid::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(circle, var(--color-terracotta-500) 2px, transparent 2px);
          background-size: 24px 24px;
          background-position: 0 0;
          opacity: var(--spotlight-opacity, 0);
          -webkit-mask-image: radial-gradient(circle 220px at var(--mouse-x, -9999px) var(--mouse-y, -9999px), black 0%, transparent 70%);
                  mask-image: radial-gradient(circle 220px at var(--mouse-x, -9999px) var(--mouse-y, -9999px), black 0%, transparent 70%);
          transition: opacity 0.2s ease;
          z-index: 0;
        }
        /* Reduced-motion + touch users get no spotlight at all */
        @media (prefers-reduced-motion: reduce), (hover: none) {
          .hero-dotgrid::before { display: none; }
        }
        @media (max-width: 899px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: clamp(24px, 5vw, 40px) !important;
          }
        }
      `}</style>
    </section>
  );
}
