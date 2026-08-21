"use client";

import { Button } from "@/components/ui/Button";

/**
 * Hero — text-only. Right column (MSR iPad + 86% stat) removed per the
 * 20-portfolio reference calibration: 20 of 20 senior portfolios ship
 * no hero image, no metrics block, no entrance animation.
 * Right-column slot reserved for a portrait when shot.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        minHeight:  "65vh",
        display:    "flex",
        alignItems: "center",
        padding:    "clamp(96px, 12vw, 160px) clamp(32px, 6vw, 80px)",
        position:   "relative",
        overflow:   "hidden",
        background: "var(--color-paper)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--content-max)",
          margin:   "0 auto",
          width:    "100%",
        }}
      >
        <div className="hero-text-col" style={{ maxWidth: "720px" }}>
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
            I find the problem, then I design the fix.
          </h1>

          <p
            style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "var(--text-article)",
              lineHeight:    1.6,
              fontWeight:    400,
              letterSpacing: 0,
              color:         "var(--color-text)",
              margin:        "0",
            }}
          >
            Fifteen years in agency, in-house, and product. Now, a Product Designer.<br />100+ sites shipped.
          </p>

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

          <div className="hero-cta-row" style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "32px" }}>
            <Button variant="primary" size="lg" href="#work">
              View Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
