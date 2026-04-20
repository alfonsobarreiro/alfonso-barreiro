import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Presentations — Case Study Slide Decks · Alfonso Barreiro",
  description:
    "The narrative slide decks for each case study. Skim the deck, or dive into the long-form write-up.",
  openGraph: {
    title: "Presentations · Alfonso Barreiro",
    description: "Narrative slide decks for each case study.",
    url: "https://barreiro.com/work/presentations",
    siteName: "Alfonso Barreiro",
    locale: "en_US",
    type: "website",
  },
};

const c = {
  ink:         "#252B28",
  body:        "#3D4440",
  muted:       "#8A8680",
  accent:      "#C17F4A",
  bg:          "#F5F5F4",
  bgSection:   "#EBEBEA",
  surface:     "#FFFFFF",
  border:      "#E8E4DE",
};

const font = {
  display: "var(--font-dm-serif-display), Georgia, serif",
  sans:    "var(--font-dm-sans), -apple-system, sans-serif",
};

type Deck = {
  slug: string;
  title: string;
  subtitle: string;
  cover: string;
  coverAlt: string;
  meta: string;
  caseStudyHref: string;
};

const decks: Deck[] = [
  {
    slug: "mens-sole-revival",
    title: "Men's Sole Revival",
    subtitle:
      "Content-first foot health for men — brand direction, design system, and the editorial argument for the pivot from e-commerce.",
    cover: "/images/work/msr/msr-cover.webp",
    coverAlt: "Men's Sole Revival homepage — dark editorial design",
    meta: "9 slides · 5 min read",
    caseStudyHref: "/work/mens-sole-revival",
  },
  {
    slug: "spotify",
    title: "Spotify: Recently Played Controls",
    subtitle:
      "Research, UX architecture, and the design of three new controls for the Recently Played feed.",
    cover: "/images/work/spotify/spotify-hero-cover.webp",
    coverAlt: "Spotify Recently Played Controls case study cover",
    meta: "40 slides · 10 min read",
    caseStudyHref: "/work/spotify",
  },
];

export default function PresentationsIndex() {
  return (
    <>
      <Nav />
      <main style={{ background: c.bg, paddingTop: "72px" }}>

        {/* Header */}
        <div style={{ padding: "80px clamp(24px, 5vw, 80px) 40px" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <p style={{
              fontFamily: font.sans,
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: c.muted,
              margin: "0 0 12px",
            }}>
              Presentations
            </p>
            <h1 style={{
              fontFamily: font.display,
              fontSize: "clamp(32px, 5vw, 56px)",
              lineHeight: 1.1,
              color: c.ink,
              margin: "0 0 20px",
              letterSpacing: "-0.01em",
            }}>
              Slide decks for each case study.
            </h1>
            <p style={{
              fontFamily: font.sans,
              fontSize: "18px",
              lineHeight: 1.6,
              color: c.body,
              margin: 0,
              maxWidth: "640px",
            }}>
              The narrative version of each project — if you want the argument before the long read, or the argument instead of the long read.
            </p>
          </div>
        </div>

        {/* Deck grid */}
        <div style={{ padding: "24px clamp(24px, 5vw, 80px) 96px" }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "32px",
          }}>
            {decks.map((d) => (
              <Link
                key={d.slug}
                href={`/work/presentations/${d.slug}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  background: c.surface,
                  border: `1px solid ${c.border}`,
                  borderRadius: "6px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                className="deck-card"
              >
                <div style={{ position: "relative", aspectRatio: "16 / 10", background: c.bgSection }}>
                  <Image
                    src={d.cover}
                    alt={d.coverAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, 600px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "24px 24px 28px" }}>
                  <p style={{
                    fontFamily: font.sans,
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: c.muted,
                    margin: "0 0 10px",
                  }}>
                    {d.meta}
                  </p>
                  <h2 style={{
                    fontFamily: font.display,
                    fontSize: "24px",
                    lineHeight: 1.2,
                    color: c.ink,
                    margin: "0 0 10px",
                  }}>
                    {d.title}
                  </h2>
                  <p style={{
                    fontFamily: font.sans,
                    fontSize: "14px",
                    lineHeight: 1.6,
                    color: c.body,
                    margin: "0 0 16px",
                  }}>
                    {d.subtitle}
                  </p>
                  <span style={{
                    fontFamily: font.sans,
                    fontSize: "13px",
                    fontWeight: 500,
                    color: c.accent,
                  }}>
                    View deck →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Footer />
      </main>

      <style>{`
        .deck-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }
      `}</style>
    </>
  );
}
