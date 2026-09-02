import Image from "next/image";

/**
 * Hero — text + compact portrait, two-column on desktop, stacked on mobile.
 * Composition after the 2026-08-25 reference-site synthesis:
 *
 * - Status chip promoted above the H1 as top-of-page anchor (Albera pattern)
 * - Location merged into chip: "Portland, OR · Open for work"
 * - Subhead broken into four stacked mechanic clauses (Rauno's form)
 * - Portrait sized to match the copy block's vertical extent (Femke's move
 *   stripped to Alfonso's rules: sharp corners, no rotation, no sticker)
 *
 * Type stack: DM Sans only, weights 400 + 500.
 * Colors: --color-brand (terracotta chip), --color-text (navy H1 + body),
 * --color-neutral-100 (portrait placeholder background). Nothing else.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        padding:    "clamp(96px, 12vw, 160px) clamp(32px, 6vw, 80px)",
        position:   "relative",
        overflow:   "hidden",
        background: "var(--color-paper)",
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

          {/* Subhead — four stacked mechanic clauses, each on its own line.
              Each names a concrete mechanic (tenure, project count, tool,
              ownership) to stay clear of the aphorism trap. */}
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
            width:       "340px",
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
            sizes="340px"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </div>

      {/* Mobile: stack columns, portrait above the text, sized down further
          so the text stays the anchor of the fold. */}
      <style>{`
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
