"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Hero — text + compact portrait, two-column on desktop, stacked on mobile.
 * Composition after the 2026-08-25 reference-site synthesis:
 *
 * - Status chip promoted above the H1 as top-of-page anchor (Albera pattern)
 * - Subhead broken into four stacked mechanic clauses (Rauno's form)
 * - Portrait sized to match the copy block's vertical extent (Femke)
 * - Ambient graph-paper dot grid across the hero background (Femke)
 * - Cursor-follows spotlight brightens the dots near the pointer (Femke)
 *
 * Type stack: DM Sans only, weights 400 + 500.
 * Colors: --color-brand (chip), --color-text (H1 + body),
 * --color-neutral-100 (portrait placeholder), --color-neutral-300 (base
 * dots), --color-neutral-500 (spotlight dots). Nothing else.
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
        backgroundImage:      "radial-gradient(circle, var(--color-terracotta-200) 1px, transparent 1px)",
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
          gridTemplateColumns:  "minmax(0, 1fr) auto",
          gap:                  "clamp(40px, 6vw, 96px)",
          alignItems:           "start",
          position:             "relative",
          zIndex:               1,
        }}
      >
        <div className="hero-text-col" style={{ maxWidth: "720px" }}>
          {/* Status chip promoted above the H1 — Albera-pattern top-of-page
              anchor. Location merged into the label. */}
          <p
            style={{
              display:    "inline-flex",
              alignItems: "center",
              gap:        "10px",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize:   "var(--text-body)",
              fontWeight: 500,
              color:      "var(--color-brand)",
              margin:     "0 0 28px",
              lineHeight: 1.35,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display:      "inline-block",
                width:        "8px",
                height:       "8px",
                borderRadius: "50%",
                background:   "var(--color-brand)",
              }}
            />
            Portland, OR · Open for work
          </p>

          <h1
            style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "clamp(40px,4vw,60px)",
              fontWeight:    500,
              lineHeight:    1.1,
              letterSpacing: "-0.02em",
              color:         "var(--color-text)",
              margin:        "0 0 32px",
              maxWidth:      "18ch",
            }}
          >
            Design isn&rsquo;t taste. It&rsquo;s chaos reduction.
          </h1>

          {/* Subhead — four stacked mechanic clauses, each on its own line. */}
          <div className="hero-subhead-stack">
            {[
              "Product Designer, fifteen years.",
              "100+ sites shipped across agency, in-house, and product.",
              "AI is the second pair of hands.",
              "Every design call is still mine.",
            ].map((line, i) => (
              <p
                key={i}
                style={{
                  fontFamily:    "var(--font-dm-sans), sans-serif",
                  fontSize:      "var(--text-article)",
                  lineHeight:    1.35,
                  fontWeight:    400,
                  letterSpacing: 0,
                  color:         "var(--color-text)",
                  margin:        i === 0 ? "0" : "6px 0 0",
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
            Alfonso Barreiro, Product Designer in Portland, Oregon.
          </h2>
        </div>

        {/* Portrait column — compact, sized to match the copy's vertical
            extent. Sharp corners, no rotation, no sticker. */}
        <div
          className="hero-image-col"
          style={{
            position:    "relative",
            width:       "380px",
            aspectRatio: "3 / 4",
            overflow:    "hidden",
            background:  "var(--color-neutral-100)",
          }}
        >
          <Image
            src="/Alfonso-Barreiro-outdoors.png"
            alt="Alfonso Barreiro outdoors in Portland."
            fill
            priority
            sizes="380px"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
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
          background-image: radial-gradient(circle, var(--color-terracotta-500) 1px, transparent 1px);
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
          .hero-image-col {
            order: -1;
            width: 200px !important;
            aspect-ratio: 3 / 4 !important;
          }
        }
      `}</style>
    </section>
  );
}
