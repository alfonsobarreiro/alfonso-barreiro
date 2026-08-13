/* Footer — strict SPD-restraint per the 20-portfolio calibration.
   No availability pill, no CTA cluster, no split-color wordmark.
   Just brand strip + minimal reach-out links + copyright.
   Contact CTA lives in the Nav; email lives on /contact. */

const font  = "var(--font-dm-sans), -apple-system, sans-serif";
const bg    = "var(--color-bg-elevated)";
const ink   = "var(--color-text)";
const muted = "var(--color-neutral-600)";

export default function Footer() {
  return (
    <footer style={{ background: bg, borderTop: "1px solid var(--color-brand)" }}>
      <div style={{ padding: "40px clamp(32px, 6vw, 80px)" }}>
        <div
          className="footer-strip"
          style={{
            maxWidth:       "var(--content-max)",
            margin:         "0 auto",
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "center",
            flexWrap:       "wrap",
            gap:            "16px",
          }}
        >
          <p style={{
            fontFamily: font,
            fontSize:   "15px",
            fontWeight: 400,
            color:      muted,
            margin:     0,
          }}>
            © 2026 Alfonso Barreiro · Product Designer, Portland, OR
          </p>

          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center" }}>
            <a
              href="https://www.linkedin.com/in/alfonso-barreiro/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily:          font,
                fontSize:            "15px",
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
              href="mailto:alfonso@barreiro.com"
              style={{
                fontFamily:          font,
                fontSize:            "15px",
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
