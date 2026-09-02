/* Footer — strict SPD-restraint per the 20-portfolio calibration.
   Status chip (Portland, OR · Open for work) moved here from the hero
   2026-08-25 so the fold's opening beat is the H1, not a status label.
   Brand strip + minimal reach-out links + copyright below the chip. */

const font  = "var(--font-dm-sans), -apple-system, sans-serif";
const bg    = "var(--color-bg-elevated)";
const ink   = "var(--color-text)";
const muted = "var(--color-neutral-600)";
const brand = "var(--color-brand)";

export default function Footer() {
  return (
    <footer style={{ background: bg, borderTop: "none" }}>
      <div style={{ padding: "40px clamp(32px, 6vw, 80px)" }}>
        <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
          {/* Status chip — same dot + brand-color label treatment as the
              About page chip; anchors the availability signal at the
              bottom of every page where recruiters naturally look for
              reach-out info. */}
          <p
            style={{
              display:    "inline-flex",
              alignItems: "center",
              gap:        "10px",
              fontFamily: font,
              fontSize:   "var(--text-body)",
              fontWeight: 500,
              color:      brand,
              margin:     "0 0 20px",
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
                background:   brand,
              }}
            />
            Portland, OR · Open for work
          </p>

          <div
            className="footer-strip"
            style={{
              display:        "flex",
              justifyContent: "space-between",
              alignItems:     "center",
              flexWrap:       "wrap",
              gap:            "16px",
            }}
          >
          <p style={{
            fontFamily: font,
            fontSize:   "var(--text-body)",
            fontWeight: 400,
            color:      muted,
            margin:     0,
          }}>
            © 2026 Alfonso Barreiro · Product Designer
          </p>

          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center" }}>
            <a
              href="https://www.linkedin.com/in/alfonso-barreiro/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily:          font,
                fontSize:            "var(--text-body)",
                fontWeight:          500,
                color:               ink,
                textDecoration:      "underline",
                textDecorationColor: muted,
                textUnderlineOffset: "3px",
              }}
            >
              LinkedIn
            </a>
            <a
              href="/resume"
              style={{
                fontFamily:          font,
                fontSize:            "var(--text-body)",
                fontWeight:          500,
                color:               ink,
                textDecoration:      "underline",
                textDecorationColor: muted,
                textUnderlineOffset: "3px",
              }}
            >
              Resume
            </a>
            <a
              href="mailto:alfonso@barreiro.com"
              style={{
                fontFamily:          font,
                fontSize:            "var(--text-body)",
                fontWeight:          500,
                color:               ink,
                textDecoration:      "underline",
                textDecorationColor: muted,
                textUnderlineOffset: "3px",
              }}
            >
              alfonso@barreiro.com
            </a>
          </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 639px) {
          .footer-strip {
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
}
