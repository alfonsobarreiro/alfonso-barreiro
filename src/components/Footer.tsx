import Link from "next/link";
import LogoMark from "./LogoMark";

/* ─────────────────────────────────────────────
   Tokens
───────────────────────────────────────────── */
const font = "var(--font-dm-sans), -apple-system, sans-serif";

const bg     = "#FAFAF9";  // cool off-white surface
const brand  = "var(--color-brand)";  // crimson — wordmark + primary CTA
const accent = "var(--color-accent)";  // deep teal — eyebrow rule + accent
const ink    = "#252B28";
const ink2   = "#2F3531";
const muted  = "#5A5752";

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
    <footer style={{ background: bg, borderTop: "1px solid rgba(110, 110, 108, 0.25)" }}>
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
            borderBottom:   "1px solid rgba(110, 110, 108, 0.18)",
          }}
        >
          {/* Left: availability microcopy only — the "Let's work together"
              headline lived here previously but duplicated the Contact hero
              one click away. The body line + adjacent Contact pill carry the
              same intent without the duplicate ceremony. */}
          <div style={{ maxWidth: "560px" }}>
            <p style={{
              fontFamily:    font,
              fontSize:      "14px",
              lineHeight:    1.55,
              color:         ink2,
              margin:        0,
              letterSpacing: "-0.005em",
            }}>
              Open to full-time UX/UI roles and selective contract work. Portland, OR or remote.
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
            <LogoMark size={20} variant="dark" opacity={0.6} />
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{
                fontFamily:    font,
                fontSize:      "14px",
                fontWeight:    600,
                color:         ink2,
                letterSpacing: "-0.015em",
                lineHeight:    1,
              }}>
                Alfonso <span style={{ color: brand }}>Barreiro</span>
              </span>
              <span style={{
                fontFamily:    font,
                fontSize:      "10px",
                fontWeight:    500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color:         muted,
                lineHeight:    1,
              }}>
                UX / UI Designer · Portland, OR
              </span>
            </div>
          </div>

          <p style={{
            fontFamily: font,
            fontSize:   "12px",
            color:      muted,
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
          border-radius:   0;
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
          border:     1px solid rgba(110, 110, 108, 0.40);
          background: transparent;
          color:      ${ink2};
        }
        .footer-pill--default:hover {
          border-color: ${ink};
          color:        ${ink};
        }
        .footer-pill--accent {
          border:     1px solid ${brand};
          background: ${brand};
          color:      ${bg};
        }
        .footer-pill--accent:hover {
          /* Brand crimson, slightly deeper. var() doesn't apply inside
             template-literal style strings, so we shade via the
             color-mix wrapper that reads --color-brand at runtime. */
          background:   color-mix(in srgb, var(--color-brand) 88%, #000);
          border-color: color-mix(in srgb, var(--color-brand) 88%, #000);
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
