import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Lost · Alfonso Barreiro",
  description:
    "That page isn't here. Most design problems aren't visual problems though, so let's get you back to one I've actually solved.",
  robots: { index: false, follow: false },
};

/**
 * /not-found
 * ─────────────────────────────────────────────────────────────────────────────
 * Catches 404s. Built as a brand moment: borrows the site's hero treatment
 * (big editorial type, mint eyebrow, crimson Barreiro), turns the missed link
 * into a calm sentence + three real destinations. Voice mirrors the rest of
 * the site (no apology theatre, no motivational closer).
 */
export default function NotFound() {
  return (
    <>
      <Nav />
      <main
        className="notfound-section"
        style={{
          minHeight:      "auto",
          display:        "flex",
          alignItems:     "center",
          padding:        "96px clamp(32px, 6vw, 80px) 56px",
          background:     "#FFFFFF",
          position:       "relative",
          overflow:       "hidden",
        }}
      >
        {/* Oversized 404 mark — sits behind everything, low opacity so the
            number is the texture, not the message. */}
        <div
          aria-hidden="true"
          style={{
            position:      "absolute",
            top:           "-4vw",
            right:         "-6vw",
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "clamp(280px, 38vw, 560px)",
            fontWeight:    200,
            lineHeight:    0.8,
            letterSpacing: "-0.06em",
            color:         "#F1EFEB",
            userSelect:    "none",
            pointerEvents: "none",
          }}
        >
          404
        </div>

        <div
          style={{
            position:  "relative",
            zIndex:    2,
            maxWidth:  "720px",
            margin:    "0 auto",
            width:     "100%",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display:      "flex",
              alignItems:   "center",
              gap:          "14px",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                display:    "inline-block",
                width:      "32px",
                height:     "1px",
                background: "var(--color-accent)",
                flexShrink: 0,
              }}
            />
            <p
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "13px",
                fontWeight:    500,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color:         "#3D4440",
                margin:        0,
              }}
            >
              That page isn&apos;t here · 404
            </p>
          </div>

          {/* Editorial headline */}
          <h1
            style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "clamp(40px, 6vw, 80px)",
              fontWeight:    300,
              lineHeight:    0.98,
              letterSpacing: "-0.025em",
              color:         "#252B28",
              margin:        "0 0 32px",
              maxWidth:      "640px",
            }}
          >
            A link that didn&apos;t exist yet.
            <span style={{
              color:      "var(--color-brand)",
              fontWeight: 500,
              display:    "block",
              marginTop:  "0.35em",
            }}>
              Decision someone hasn&apos;t made.
            </span>
          </h1>

          {/* Voice-matched body */}
          <p
            style={{
              fontFamily:   "var(--font-dm-sans), sans-serif",
              fontSize:     "clamp(16px, 1.6vw, 18px)",
              lineHeight:   1.65,
              color:        "#3D4440",
              maxWidth:     "480px",
              marginBottom: "44px",
              fontWeight:   400,
            }}
          >
            You hit a URL that doesn&apos;t map to anything on this site. Could
            be a stale link, a typo, or a page I haven&apos;t shipped yet.
            Three places that are real:
          </p>

          {/* Three real destinations */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap:                 "20px",
              marginBottom:        "44px",
            }}
          >
            {[
              { label: "Three case studies",  href: "/#work",  meta: "MSR · Spotify · Wayfarer" },
              { label: "How I work",          href: "/about",  meta: "About · 15-year arc"     },
              { label: "Get in touch",        href: "/contact",meta: "Coffee in Portland?"     },
            ].map((d) => (
              <Link
                key={d.href}
                href={d.href}
                style={{
                  display:        "block",
                  padding:        "20px 22px",
                  border:         "1px solid #DEDCD7",
                  background:     "#FAFAF9",
                  textDecoration: "none",
                  color:          "inherit",
                  transition:     "transform 0.25s ease, border-color 0.25s ease, background 0.25s ease",
                }}
                className="nf-card"
              >
                <p
                  style={{
                    fontFamily:    "var(--font-dm-sans), sans-serif",
                    fontSize:      "16px",
                    fontWeight:    600,
                    color:         "#252B28",
                    margin:        "0 0 4px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {d.label} →
                </p>
                <p
                  style={{
                    fontFamily:    "var(--font-dm-sans), sans-serif",
                    fontSize:      "12px",
                    color:         "#6E6E6A",
                    margin:        0,
                    letterSpacing: "0.04em",
                  }}
                >
                  {d.meta}
                </p>
              </Link>
            ))}
          </div>

          {/* Primary CTA */}
          <Link
            href="/"
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            "10px",
              padding:        "14px 32px",
              background:     "var(--color-brand)",
              color:          "#FAFAF9",
              fontSize:       "14px",
              fontWeight:     500,
              fontFamily:     "var(--font-dm-sans), sans-serif",
              letterSpacing:  "0.03em",
              textDecoration: "none",
              transition:     "transform 0.25s ease",
            }}
            className="nf-home"
          >
            Back to the home page
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <style>{`
          .nf-card:hover {
            transform: translateY(-3px);
            border-color: var(--color-accent);
            background: #FFFFFF;
          }
          .nf-home:hover {
            transform: translateY(-2px);
          }
          /* Mirror Home Hero's mobile padding at the same 899px breakpoint. */
          @media (max-width: 899px) {
            .notfound-section {
              padding: 56px clamp(24px, 5vw, 48px) 40px !important;
            }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}
