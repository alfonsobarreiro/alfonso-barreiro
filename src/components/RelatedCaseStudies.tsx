import Image from "next/image";
import Link from "next/link";

/**
 * RelatedCaseStudies
 * ─────────────────────────────────────────────────────────────────────────────
 * Sits at the bottom of each case study page, above the contact CTA. Shows
 * the other two case studies as wide thumbnails with title + tagline so the
 * reader has an obvious next step. Pentagram-style "Next: X / Then: Y" pattern.
 *
 * Pass `current` to exclude the current case from the list. The order of the
 * displayed pair preserves the Home work-section order (Spotify → Wayfarer →
 * MSR), so coming off Spotify you see Wayfarer then MSR.
 */

type Slug = "spotify" | "wayfarer" | "mens-sole-revival";

interface Card {
  slug:    Slug;
  title:   string;
  tagline: string;
  meta:    string;
  image:   string;
  href:    string;
}

const ALL: Card[] = [
  {
    slug:    "spotify",
    title:   "Spotify",
    tagline: "Three controls Spotify should have built already.",
    meta:    "Recently Played Controls · 2026",
    image:   "/images/work/spotify/spotify-hero-cover.webp",
    href:    "/work/spotify",
  },
  {
    slug:    "wayfarer",
    title:   "Wayfarer",
    tagline: "Trip planning without forcing dates that don't exist yet.",
    meta:    "Travel Discovery Platform · 2026",
    image:   "/cs-wayfarer-preview.jpg",
    href:    "/work/wayfarer",
  },
  {
    slug:    "mens-sole-revival",
    title:   "Men's Sole Revival",
    tagline: "Pivoted from e-commerce to editorial. 86% of visitors finish the assessment.",
    meta:    "Foot Health Content Platform · 2026",
    image:   "/cs-msr-preview.jpg",
    href:    "/work/mens-sole-revival",
  },
];

interface Props {
  current: Slug;
}

export default function RelatedCaseStudies({ current }: Props) {
  const others = ALL.filter((c) => c.slug !== current);

  return (
    <section
      className="related-cs"
      style={{
        background: "#FFFFFF",
        padding:    "clamp(80px, 9vw, 140px) clamp(24px, 5vw, 80px)",
        borderTop:  "none",
      }}
    >
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
          <h2
            style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "clamp(28px, 3.5vw, 40px)",
              fontWeight:    500,
              lineHeight:    1.15,
              letterSpacing: "-0.01em",
              color:         "var(--color-text)",
              margin:        0,
              maxWidth:      "560px",
            }}
          >
            Two more case studies.
          </h2>
        </div>

        {/* Pair */}
        <div
          className="related-cs-grid"
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 "clamp(32px, 4vw, 56px)",
          }}
        >
          {others.map((c, i) => (
            <Link
              key={c.slug}
              href={c.href}
              className="related-cs-card"
              style={{
                display:        "block",
                textDecoration: "none",
                color:          "inherit",
              }}
            >
              {/* Thumbnail */}
              <div
                className="related-cs-thumb"
                style={{
                  position:    "relative",
                  width:       "100%",
                  aspectRatio: "16 / 10",
                  overflow:    "hidden",
                  background:  "#0F0F0F",
                  marginBottom: "20px",
                }}
              >
                <Image
                  src={c.image}
                  alt={`${c.title} case study preview`}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>

              {/* Title + tagline (meta eyebrow removed per SPD restraint) */}
              <h3
                style={{
                  fontFamily:    "var(--font-dm-sans), sans-serif",
                  fontSize:      "clamp(28px, 3.5vw, 40px)",
                  fontWeight:    500,
                  lineHeight:    1.15,
                  letterSpacing: "-0.01em",
                  color:         "var(--color-text)",
                  margin:        "0 0 14px",
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize:   "15px",
                  lineHeight: 1.5,
                  color:      "var(--color-text)",
                  margin:     "0 0 20px",
                }}
              >
                {c.tagline}
              </p>
              <span
                className="related-cs-cta"
                style={{
                  display:        "inline-flex",
                  alignItems:     "center",
                  gap:            "8px",
                  color:          "var(--color-text-link)",
                  fontSize:       "15px",
                  fontWeight:     500,
                  fontFamily:     "var(--font-dm-sans), sans-serif",
                  letterSpacing:  0,
                  transition:     "color 0.2s ease",
                }}
              >
                <span style={{ borderBottom: "1px solid currentColor", paddingBottom: "2px" }}>
                  Read case study
                </span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .related-cs-card .related-cs-thumb {
          transition: transform 0.4s ease;
        }
        .related-cs-card:hover .related-cs-thumb img {
          transform: scale(1.03);
          transition: transform 0.6s ease;
        }
        .related-cs-card:hover .related-cs-cta {
          transform: translateX(4px);
        }
        @media (max-width: 760px) {
          .related-cs-grid {
            grid-template-columns: 1fr !important;
            gap: clamp(40px, 8vw, 64px) !important;
          }
        }
      `}</style>
    </section>
  );
}
