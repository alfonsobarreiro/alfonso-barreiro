import Link from "next/link";
import LogoMark from "./LogoMark";

/* ─────────────────────────────────────────────
   Tokens
───────────────────────────────────────────── */
const font = "var(--font-dm-sans), -apple-system, sans-serif";

const bg     = "#252B28";
const accent = "#C17F4A";
const light  = "#F5F5F4";

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer style={{ background: bg }}>
      <div style={{ padding: "56px clamp(32px, 6vw, 80px) 32px" }}>

        {/* ── CTA section: microcopy (left) + buttons (right) ── */}
        <div
          className="footer-cta-row"
          style={{
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "center",
            flexWrap:       "wrap",
            gap:            "28px",
            paddingBottom:  "32px",
            marginBottom:   "32px",
            borderBottom:   "1px solid rgba(245,243,239,0.08)",
          }}
        >
          {/* Left: microcopy */}
          <div style={{ maxWidth: "480px" }}>
            <p style={{
              fontFamily:    font,
              fontSize:      "clamp(18px, 2vw, 22px)",
              fontWeight:    600,
              color:         light,
              margin:        "0 0 8px",
              letterSpacing: "-0.015em",
              lineHeight:    1.25,
            }}>
              Let&apos;s work <span style={{ color: accent }}>together.</span>
            </p>
            <p style={{
              fontFamily: font,
              fontSize:   "13px",
              lineHeight: 1.55,
              color:      "rgba(245,243,239,0.55)",
              margin:     0,
            }}>
              Open to full-time UX/UI roles, contract work, and thoughtful design conversations. Portland, OR or remote.
            </p>
          </div>

          {/* Right: CTA pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <a
              href="/Alfonso_Barreiro_Resume_April_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-pill footer-pill--default"
            >
              <DownloadIcon /> Resume
            </a>
            <a
              href="https://www.linkedin.com/in/alfonso-barreiro/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-pill footer-pill--default"
            >
              <LinkedInIcon /> LinkedIn
            </a>
            <Link
              href="/contact"
              className="footer-pill footer-pill--accent"
            >
              Contact <ArrowIcon />
            </Link>
          </div>
        </div>

        {/* ── Brand strip: logo + role (left) / copyright (right) ── */}
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
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <LogoMark size={20} variant="light" opacity={0.4} />
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{
                fontFamily:    font,
                fontSize:      "14px",
                fontWeight:    600,
                color:         "rgba(245,243,239,0.55)",
                letterSpacing: "-0.015em",
                lineHeight:    1,
              }}>
                Alfonso <span style={{ color: accent }}>Barreiro</span>
              </span>
              <span style={{
                fontFamily:    font,
                fontSize:      "10px",
                fontWeight:    500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color:         "rgba(245,243,239,0.25)",
                lineHeight:    1,
              }}>
                UX / UI Designer · Portland, OR
              </span>
            </div>
          </div>

          <p style={{
            fontFamily: font,
            fontSize:   "12px",
            color:      "rgba(245,243,239,0.3)",
            margin:     0,
          }}>
            © 2026 Alfonso Barreiro
          </p>
        </div>
      </div>

      {/* Scoped styles for CTAs */}
      <style>{`
        .footer-pill {
          display:         inline-flex;
          align-items:     center;
          gap:             8px;
          padding:         10px 18px;
          border-radius:   4px;
          font-family:     var(--font-dm-sans), -apple-system, sans-serif;
          font-size:       11px;
          font-weight:     600;
          letter-spacing:  0.08em;
          text-transform:  uppercase;
          text-decoration: none;
          transition:      border-color 0.2s, background 0.2s, color 0.2s;
          cursor:          pointer;
        }
        .footer-pill--default {
          border:     1px solid rgba(245,243,239,0.20);
          background: rgba(245,243,239,0.04);
          color:      rgba(245,243,239,0.65);
        }
        .footer-pill--default:hover {
          border-color: rgba(245,243,239,0.45);
          background:   rgba(245,243,239,0.08);
          color:        rgba(245,243,239,0.90);
        }
        .footer-pill--accent {
          border:     1px solid rgba(193,127,74,0.55);
          background: rgba(193,127,74,0.14);
          color:      ${light};
        }
        .footer-pill--accent:hover {
          border-color: ${accent};
          background:   ${accent};
          color:        ${light};
        }

        /* Mobile: stack microcopy above CTAs */
        @media (max-width: 639px) {
          .footer-cta-row {
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
}
