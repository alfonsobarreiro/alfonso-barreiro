import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MSRSlideViewer from "@/components/MSRSlideViewer";

export const metadata: Metadata = {
  title: "Men's Sole Revival — Slide Deck · Alfonso Barreiro",
  description:
    "The 9-slide narrative deck for the Men's Sole Revival case study: problem, pivot, brand exploration, design system, site architecture, and reflection.",
  openGraph: {
    title: "Men's Sole Revival — Slide Deck · Alfonso Barreiro",
    description: "The 9-slide narrative deck for the Men's Sole Revival case study.",
    url: "https://barreiro.com/work/presentations/mens-sole-revival",
    siteName: "Alfonso Barreiro",
    locale: "en_US",
    type: "article",
  },
};

const c = {
  ink:         "#252B28",
  body:        "#3D4440",
  muted:       "#8A8680",
  accent:      "#C17F4A",
  bg:          "#F5F5F4",
  bgSection:   "#EBEBEA",
  border:      "#E8E4DE",
};

const font = {
  display: "var(--font-dm-serif-display), Georgia, serif",
  sans:    "var(--font-dm-sans), -apple-system, sans-serif",
};

export default function MSRDeckPage() {
  return (
    <>
      <Nav />
      <main style={{ background: c.bg, paddingTop: "72px" }}>

        {/* Header — compact so slides + controls fit above the fold */}
        <div style={{ padding: "16px clamp(24px, 5vw, 80px) 12px" }}>
          <div style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Link
                href="/work/presentations"
                style={{
                  fontFamily: font.sans,
                  fontSize: "13px",
                  color: c.muted,
                  textDecoration: "none",
                }}
              >
                ← All presentations
              </Link>
              <span style={{
                fontFamily: font.sans,
                fontSize: "13px",
                color: c.border,
              }}>
                /
              </span>
              <h1 style={{
                fontFamily: font.sans,
                fontSize: "14px",
                fontWeight: 600,
                color: c.ink,
                margin: 0,
              }}>
                Men&apos;s Sole Revival
              </h1>
            </div>
            <p style={{
              fontFamily: font.sans,
              fontSize: "12px",
              color: c.muted,
              margin: 0,
            }}>
              9 Slides · Use arrow keys to advance
            </p>
          </div>
        </div>

        {/* Deck */}
        <div style={{
          background: c.bgSection,
          borderTop: `1px solid ${c.border}`,
          borderBottom: `1px solid ${c.border}`,
          padding: "16px clamp(16px, 3vw, 48px)",
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <MSRSlideViewer />
          </div>
        </div>

        {/* CTA to written case study */}
        <div style={{ padding: "72px clamp(24px, 5vw, 80px)" }}>
          <div style={{
            maxWidth: "860px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}>
            <div>
              <p style={{
                fontFamily: font.sans,
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: c.muted,
                margin: "0 0 8px",
              }}>
                Go deeper
              </p>
              <p style={{
                fontFamily: font.display,
                fontSize: "clamp(20px, 3vw, 28px)",
                color: c.ink,
                margin: 0,
              }}>
                Read the full written case study
              </p>
            </div>
            <Link
              href="/work/mens-sole-revival"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 28px",
                background: c.ink,
                borderRadius: "8px",
                color: "#F5F5F4",
                fontFamily: font.sans,
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textDecoration: "none",
              }}
            >
              View Case Study
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
