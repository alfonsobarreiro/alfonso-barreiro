"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/* Stagger delays for about section elements */
const ABOUT_DELAYS = ["0s", "0.12s", "0.24s", "0.36s"];

/* ── Icons (reused from footer pattern) ── */
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
const CoffeeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" /><line x1="6" y1="2" x2="6" y2="4" /><line x1="10" y1="2" x2="10" y2="4" /><line x1="14" y1="2" x2="14" y2="4" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Pill styles ── */
const pillBase: React.CSSProperties = {
  display:        "inline-flex",
  alignItems:     "center",
  gap:            "8px",
  padding:        "10px 20px",
  borderRadius:   0,
  fontSize:       "11px",
  fontWeight:     600,
  fontFamily:     "var(--font-dm-sans), sans-serif",
  letterSpacing:  "0.08em",
  textTransform:  "uppercase",
  textDecoration: "none",
  transition:     "border-color 0.2s, background 0.2s, color 0.2s, opacity 0.2s, transform 0.25s ease, box-shadow 0.25s ease",
  cursor:         "pointer",
};
const pillPrimary: React.CSSProperties = {
  ...pillBase,
  padding:    "12px 24px",
  fontSize:   "12px",
  background: "var(--color-brand)",
  border:     "1px solid var(--color-brand)",
  color:      "#FFFFFF",
};
const pillDefault: React.CSSProperties = {
  ...pillBase,
  border:     "1px solid #6E6E6A",
  background: "#FFFFFF",
  color:      "#2F3531",
};
const pillAccent: React.CSSProperties = {
  ...pillBase,
  border:     "1px solid rgba(61,38,69,0.45)",
  background: "rgba(61,38,69,0.06)",
  color:      "var(--color-brand)",
};

const skillGroups = [
  {
    category: "Research & Discovery",
    value:    "Sharpens the problem before the team commits. Cuts the false-start weeks where a beautiful answer gets built for the wrong brief.",
    skills:   ["User Interviews", "Competitive Analysis", "Heuristic Evaluation", "AI-Assisted Research"],
  },
  {
    category: "Design & Systems",
    value:    "Tokenized systems halve handoff time and let multiple products share one vocabulary. Accessibility shipped from day one, not patched in QA.",
    skills:   ["Interaction Design", "Design Systems", "Accessibility (WCAG)", "Responsive UI"],
  },
  {
    category: "Delivery & Craft",
    value:    "Prototypes that earn their keep. Usability findings that move the next sprint, not the next slide. Dev handoff that engineers actually use.",
    skills:   ["Figma", "Prototyping", "Dev Handoff", "Usability Testing"],
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>(".scroll-reveal");

    /* 1. Hide immediately */
    targets.forEach((el) => {
      el.style.opacity   = "0";
      el.style.transform = "translateY(32px)";
    });

    /* 2. Next frame: add transitions then observe */
    requestAnimationFrame(() => {
      targets.forEach((el, i) => {
        const delay = ABOUT_DELAYS[i] || "0s";
        el.style.transition = `opacity 0.7s ease ${delay}, transform 0.7s ease ${delay}`;
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              el.style.opacity   = "1";
              el.style.transform = "translateY(0)";
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
      );

      targets.forEach((el) => observer.observe(el));
      (section as any).__scrollObserver = observer;
    });

    return () => {
      const obs = (section as any).__scrollObserver as IntersectionObserver | undefined;
      if (obs) obs.disconnect();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section"
      style={{
        padding:    "clamp(80px, 9vw, 128px) clamp(32px, 6vw, 80px)",
        borderTop:  "1px solid rgba(0, 0, 0, 0.06)",
        background: "#FFFFFF",
      }}
    >
      <div style={{ width: "100%", margin: "0 auto" }}>

        {/* Two-column: Bio + Skills */}
        <div
          className="about-grid"
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 "80px",
            alignItems:          "start",
            marginBottom:        "clamp(80px, 8vw, 120px)",
          }}
        >
          {/* Left — Bio */}
          <div className="scroll-reveal">
            {/* Eyebrow */}
            <div
              style={{
                display:      "flex",
                alignItems:   "center",
                gap:          "12px",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  display:    "inline-block",
                  width:      "24px",
                  height:     "1px",
                  background: "var(--color-accent)",
                }}
              />
              <p
                style={{
                  fontSize:      "11px",
                  fontWeight:    500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color:         "#5A5752",
                  margin:        0,
                  fontFamily:    "var(--font-dm-sans), sans-serif",
                }}
              >
                About
              </p>
            </div>

            {/* Photo — editorial portrait crop at the source's native 3:4
                aspect (750x1000). Was 180x180 circle which wasted the
                vertical portrait by squaring it; now 240x320 with subtle
                8px corners reads as editorial gravitas without going
                full square-fine-art. No border per direction — the image
                edges speak for themselves, with a soft box-shadow doing
                the elevation work the removed border used to do. */}
            <div
              className="about-portrait"
              style={{
                width:        "100%",
                maxWidth:     "240px",
                aspectRatio:  "3 / 4",
                borderRadius: 0,
                overflow:     "hidden",
                marginBottom: "28px",
                border:       "1px solid rgba(110, 110, 108, 0.25)",
              }}
            >
              <Image
                src="/Alfonso-Barreiro-outdoors.png"
                alt="Alfonso Barreiro"
                width={240}
                height={320}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
              />
            </div>

            {/* Availability badge */}
            <div
              style={{
                display:      "inline-flex",
                alignItems:   "center",
                gap:          "8px",
                background:   "#EBEBEA",
                border:       "1px solid #6E6E6A",
                padding:      "6px 14px",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  display:      "inline-block",
                  width:        "7px",
                  height:       "7px",
                  borderRadius: "50%",
                  background:   "var(--color-accent)",
                  flexShrink:   0,
                  // CSS pulse animation via style tag below
                  animation:    "pulse 2.2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily:    "var(--font-dm-sans), sans-serif",
                  fontSize:      "11px",
                  fontWeight:    500,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  color:         "#2F3531",
                }}
              >
                Open to full-time UX/UI roles and selective contract work. Portland, OR or remote.
              </span>
            </div>

            <h2
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "clamp(26px, 3.5vw, 44px)",
                fontWeight:    600,
                color:         "#252B28",
                margin:        "0 0 28px",
                letterSpacing: "-0.02em",
                lineHeight:    1.15,
              }}
            >
              I design from the gaps I actually live in.
            </h2>

            <p
              style={{
                fontFamily:   "var(--font-dm-sans), sans-serif",
                fontSize:     "16px",
                lineHeight:   1.75,
                color:        "#2F3531",
                marginBottom: "20px",
                maxWidth:     "640px",
              }}
            >
              I learned BASIC from a magazine, typing it line by line. I built my
              first website as a Rush fan site that probably broke every design
              rule that existed. I&apos;m still doing the same thing: building
              things I actually want to use.
            </p>
            <p
              style={{
                fontFamily:   "var(--font-dm-sans), sans-serif",
                fontSize:     "16px",
                lineHeight:   1.75,
                color:        "#2F3531",
                marginBottom: "40px",
                maxWidth:     "640px",
              }}
            >
              I design from the gaps I actually live in. Spotify is my most-used app,
              and the Recently Played shelf had blind spots that bothered me for years.
              I dealt with plantar fasciitis, toenail fungus, and the quiet shame men
              carry about neglecting their own bodies, so I built a resource for it.
              Each project starts with a real problem I can feel, not a brief I was handed.
            </p>
            {/* Para 3 (Hiragana, walks, birds, etc.) moved to /about's
                "Off-screen" section — keeps the home About at 2 paragraphs
                for the Cate-style quieter home pattern. The deeper personal
                voice still lives one click away. */}

            {/* Contact CTAs — primary message link + resume. Trimmed from
                four (was: Send / Resume / LinkedIn / Coffee in Portland) to
                two for home restraint, matching the Cate-style quieter
                home pattern. LinkedIn + Cal.com booking still live on
                /contact and in the footer. */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{ ...pillPrimary, transition: "transform 0.25s ease, box-shadow 0.25s ease, opacity 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Send a message <ArrowIcon />
              </Link>
              <a
                href="/Alfonso_Barreiro_Resume_April_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={pillDefault}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#5A5752"; e.currentTarget.style.color = "#252B28"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#6E6E6A"; e.currentTarget.style.color = "#2F3531"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <DownloadIcon /> Resume
              </a>
            </div>

            {/* Coffee in Portland — personality garnish. Lives as a small
                inline line below the two CTAs rather than a third button.
                Keeps the home-restraint pattern while bringing back the
                warmth the earlier CTA-trim removed. */}
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize:   "13px",
                color:      "#5A5752",
                margin:     "18px 0 0",
                lineHeight: 1.55,
              }}
            >
              Coffee in Portland?{" "}
              <a
                href="https://cal.com/alfonso-barreiro"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color:          "var(--color-accent)",
                  textDecoration: "none",
                  borderBottom:   "1px solid var(--color-accent)",
                  paddingBottom:  "1px",
                  transition:     "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-accent-hover)"; e.currentTarget.style.borderBottomColor = "var(--color-accent-hover)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-accent)"; e.currentTarget.style.borderBottomColor = "var(--color-accent)"; }}
              >
                Book a time
              </a>
            </p>
          </div>

          {/* Right — Skills */}
          <div
            className="skills-box scroll-reveal"
            style={{
              background:   "transparent",
              borderLeft:   "3px solid var(--color-brand)",
              borderRadius: 0,
              padding:      "8px 0 8px 32px",
              position:     "sticky",
              top:          "120px",
              alignSelf:    "start",
              maxHeight:    "calc(100vh - 140px)",
              overflowY:    "auto",
            }}
          >
            {skillGroups.map((group, i) => (
              <div
                key={group.category}
                style={{
                  marginBottom:  i < skillGroups.length - 1 ? "32px" : 0,
                  paddingBottom: i < skillGroups.length - 1 ? "32px" : 0,
                  borderBottom:  i < skillGroups.length - 1 ? "1px solid #A8A39A" : "none",
                }}
              >
                <p
                  style={{
                    fontFamily:    "var(--font-dm-sans), sans-serif",
                    fontSize:      "11px",
                    fontWeight:    600,
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                    color:         "var(--color-accent-hover)",
                    marginBottom:  "10px",
                  }}
                >
                  {group.category}
                </p>
                <p
                  style={{
                    fontFamily:   "var(--font-dm-sans), sans-serif",
                    fontSize:     "14px",
                    lineHeight:   1.6,
                    color:        "#3D4440",
                    marginTop:    0,
                    marginBottom: "16px",
                  }}
                >
                  {group.value}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily:   "var(--font-dm-sans), sans-serif",
                        fontSize:     "13px",
                        padding:      "6px 14px",
                        borderRadius: 0,
                        background:   "#F5F5F4",
                        color:        "#252B28",
                        fontWeight:   400,
                        border:       "1px solid #A8A39A",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* About-page discovery CTA — quieter than the home CTAs in the
                left column, sits at the foot of the skills box for a reader
                who wants the full story. */}
            <div
              style={{
                marginTop:  "32px",
                paddingTop: "24px",
                borderTop:  "1px solid #DEDCD7",
              }}
            >
              <Link
                href="/about"
                style={{
                  display:        "inline-flex",
                  alignItems:     "center",
                  gap:            "8px",
                  fontFamily:     "var(--font-dm-sans), sans-serif",
                  fontSize:       "13px",
                  fontWeight:     600,
                  letterSpacing:  "0.04em",
                  color:          "var(--color-brand)",
                  textDecoration: "none",
                  borderBottom:   "1px solid rgba(110, 110, 108, 0.30)",
                  paddingBottom:  "2px",
                  transition:     "border-color 0.2s, color 0.2s, transform 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-brand)";
                  e.currentTarget.style.transform   = "translateX(2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(110, 110, 108, 0.30)";
                  e.currentTarget.style.transform   = "translateX(0)";
                }}
              >
                Read the full About <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>

        {/* Process note — promoted from a small bordered card to a
            page-width editorial moment. Display-size opening line carries
            the page's signature take; the rest reads as the supporting
            paragraph. Aligns with the editorial cadence used in the case
            studies (display thesis + body deck). */}
        <section
          className="process-section scroll-reveal"
          style={{
            padding:      "clamp(80px, 9vw, 128px) 0 0",
            borderTop:    "1px solid rgba(110, 110, 108, 0.18)",
            marginTop:    "clamp(40px, 5vw, 64px)",
            maxWidth:     "100%",
          }}
        >
          <p
            style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "11px",
              fontWeight:    600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:         "#5A5752",
              margin:        "0 0 28px",
            }}
          >
            How I work
          </p>
          <h2
            style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "clamp(32px, 4.5vw, 56px)",
              fontWeight:    600,
              lineHeight:    1.1,
              color:         "#252B28",
              margin:        "0 0 24px",
              letterSpacing: "-0.025em",
              maxWidth:      "900px",
            }}
          >
            Figma comes last.
          </h2>
          <p
            style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "clamp(17px, 1.6vw, 20px)",
              fontWeight:    400,
              lineHeight:    1.55,
              color:         "#5A5752",
              margin:        0,
              letterSpacing: "-0.005em",
              maxWidth:      "760px",
            }}
          >
            By the time I open it, the research, the brief, and the structure
            have already done most of the work. The interface is the last step,
            not the first place I look for answers.
          </p>
        </section>

      </div>

      {/* Responsive: stack bio above skills on mobile so the category
          labels read as proper "blurbs above the pill rows" and the
          paragraphs aren't competing with the sticky skills sidebar. */}
      <style>{`
        @media (max-width: 899px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
          .about-grid .skills-box {
            position: static !important;
            top: auto !important;
          }
          /* Portrait fills the column on mobile instead of capping at 240 px.
             Aspect 4:5 reads stronger at full width than 3:4. */
          .about-portrait {
            max-width: 100% !important;
            aspect-ratio: 4 / 5 !important;
          }
        }
      `}</style>
    </section>
  );
}
