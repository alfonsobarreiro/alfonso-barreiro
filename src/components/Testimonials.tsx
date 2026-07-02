import React from "react";

type Testimonial = {
  pull:     string;          // oversized pull-quote line
  body:     string;          // full testimonial body
  name:     string;
  role:     string;          // role + company on one line
  linkedin?: string;         // full LinkedIn profile URL — optional
};

const ITEMS: Testimonial[] = [
  {
    pull: "He offered a perspective on my work that I often miss.",
    body: "Alfonso Barreiro's expertise is truly remarkable. The Branding and Marketing Plan he designed for my small business was comprehensive, insightful, and creatively inspiring. He offered a perspective on my work that I often miss, exceeding my expectations with both depth and detail. His collaborative approach ensured the final product aligned perfectly with my vision and business needs. I'm deeply grateful for his skill, dedication, and guidance in helping take my business to the next level.",
    name: "Kendra Toth",
    role: "Kendra Toth Consulting",
    linkedin: "https://www.linkedin.com/in/kendra-toth-1b95a0159/",
  },
  {
    pull: "His ability to listen and translate my ideas into a logo that stands out.",
    body: "Working with Alfonso on my company logo for Sky Valley Comm was a great experience. His keen eye for design and attention to detail helped bring my vision to life in a way that truly represents my brand. The most beneficial part of our collaboration was his ability to listen and translate my ideas into a professional, unique logo that stands out. His expertise made the process seamless, and the final result exceeded my expectations. Thanks to Alfonso's work, my brand now has a strong and memorable identity.",
    name: "Pamela Accetta Smith",
    role: "Founder & CEO, Sky Valley Comm",
    linkedin: "https://www.linkedin.com/in/pamela-accetta-smith-5278379/",
  },
];

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SECTION_X = "clamp(24px, 6vw, 80px)";
const CONTENT_MAX = "1240px";

const font = {
  sans:  "var(--font-dm-sans), -apple-system, sans-serif",
  serif: "var(--font-dm-serif-display), Georgia, serif",
};

const c = {
  ink:     "#252B28",
  body:    "#3D4440",
  muted:   "#5A5752",
  brand:   "var(--color-brand)",
  accent:  "var(--color-accent)",
  surface: "#FFFFFF",
  border:  "#E6E3DE",
};

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-h2"
      style={{
        background: c.surface,
        padding:    "clamp(80px, 9vw, 140px) " + SECTION_X,
        borderTop:  `1px solid ${c.border}`,
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>

        {/* Section header */}
        <div style={{ marginBottom: "clamp(48px, 6vw, 72px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
            <span style={{ display: "inline-block", width: "32px", height: "1px", background: c.accent, flexShrink: 0 }} />
            <p style={{
              fontFamily: font.sans, fontSize: "12px", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: c.accent, margin: 0,
            }}>
              Client voices
            </p>
          </div>
          <h2
            id="testimonials-h2"
            style={{
              fontFamily: font.sans, fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.02em",
              color: c.ink, margin: 0, maxWidth: "640px",
            }}
          >
            What clients said about the part that doesn&rsquo;t ship in the file.
          </h2>
        </div>

        {/* Two-up grid */}
        <div
          className="testimonials-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 5vw, 72px)",
          }}
        >
          {ITEMS.map((t) => (
            <figure
              key={t.name}
              style={{
                margin: 0,
                paddingLeft: "20px",
                borderLeft: `2px solid ${c.brand}`,
              }}
            >
              <blockquote style={{ margin: 0 }}>
                {/* Pull-quote */}
                <p style={{
                  fontFamily:    font.sans,
                  fontSize:      "clamp(22px, 2.4vw, 30px)",
                  fontWeight:    400,
                  lineHeight:    1.25,
                  letterSpacing: "-0.02em",
                  color:         c.ink,
                  margin:        "0 0 24px",
                }}>
                  &ldquo;{t.pull}&rdquo;
                </p>

                {/* Full body */}
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "15px",
                  lineHeight: 1.65,
                  color: c.body,
                  margin: "0 0 24px",
                }}>
                  {t.body}
                </p>
              </blockquote>

              <figcaption style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {t.linkedin ? (
                  <a
                    href={t.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="testimonial-name-link"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontFamily: font.sans,
                      fontSize: "14px",
                      fontWeight: 600,
                      color: c.ink,
                      letterSpacing: "0.01em",
                      textDecoration: "none",
                      width: "fit-content",
                    }}
                  >
                    {t.name}
                    <span style={{ color: c.muted, display: "inline-flex" }}>
                      <LinkedInIcon />
                    </span>
                  </a>
                ) : (
                  <span style={{
                    fontFamily: font.sans, fontSize: "14px", fontWeight: 600,
                    color: c.ink, letterSpacing: "0.01em",
                  }}>
                    {t.name}
                  </span>
                )}
                <span style={{
                  fontFamily: font.sans, fontSize: "12px",
                  color: c.muted, letterSpacing: "0.04em",
                }}>
                  {t.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
            gap: clamp(48px, 8vw, 64px) !important;
          }
        }
        .testimonial-name-link svg {
          transition: color 0.2s ease;
        }
        .testimonial-name-link:hover svg {
          color: var(--color-brand) !important;
        }
      `}</style>
    </section>
  );
}
