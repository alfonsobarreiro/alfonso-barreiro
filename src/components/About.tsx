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
  borderRadius:   "4px",
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
  background: "#C17F4A",
  border:     "1px solid #C17F4A",
  color:      "#FFFFFF",
};
const pillDefault: React.CSSProperties = {
  ...pillBase,
  border:     "1px solid #C9BFB0",
  background: "#FFFFFF",
  color:      "#3D4440",
};
const pillAccent: React.CSSProperties = {
  ...pillBase,
  border:     "1px solid rgba(193,127,74,0.45)",
  background: "rgba(193,127,74,0.06)",
  color:      "#C17F4A",
};

const skillGroups = [
  {
    category: "Research & Discovery",
    skills:   ["User Interviews", "Competitive Analysis", "Heuristic Evaluation", "AI-Assisted Research"],
  },
  {
    category: "Design & Systems",
    skills:   ["Interaction Design", "Design Systems", "Accessibility (WCAG)", "Responsive UI"],
  },
  {
    category: "Delivery & Craft",
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
        padding:    "120px clamp(32px, 6vw, 80px)",
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
            marginBottom:        "64px",
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
                  background: "#C17F4A",
                }}
              />
              <p
                style={{
                  fontSize:      "11px",
                  fontWeight:    500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color:         "#8A8680",
                  margin:        0,
                  fontFamily:    "var(--font-dm-sans), sans-serif",
                }}
              >
                About
              </p>
            </div>

            {/* Photo */}
            <div
              style={{
                width:        "180px",
                height:       "180px",
                borderRadius: "50%",
                overflow:     "hidden",
                marginBottom: "24px",
                border:       "2px solid #E8E4DE",
              }}
            >
              <Image
                src="/Alfonso-Barreiro-outdoors.png"
                alt="Alfonso Barreiro"
                width={180}
                height={180}
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>

            {/* Availability badge */}
            <div
              style={{
                display:      "inline-flex",
                alignItems:   "center",
                gap:          "8px",
                background:   "#EBEBEA",
                border:       "1px solid #E8E4DE",
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
                  background:   "#C17F4A",
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
                  color:         "#3D4440",
                }}
              >
                Open to full-time roles · Portland, OR or remote
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
              Thirty years of building.<br />
              <span style={{ color: "#C17F4A" }}>Still asking why it doesn&apos;t work better.</span>
            </h2>

            <p
              style={{
                fontFamily:   "var(--font-dm-sans), sans-serif",
                fontSize:     "16px",
                lineHeight:   1.75,
                color:        "#3D4440",
                marginBottom: "20px",
              }}
            >
              I wrote my first code at eight, typing BASIC line by line from a magazine
              into an Atari 800. I built my first website at 22, a Rush fan site that
              probably broke every design rule that existed. Thirty years later, I&apos;m
              still doing the same thing: staring at something on a screen and asking
              why it doesn&apos;t work better.
            </p>
            <p
              style={{
                fontFamily:   "var(--font-dm-sans), sans-serif",
                fontSize:     "16px",
                lineHeight:   1.75,
                color:        "#3D4440",
                marginBottom: "20px",
              }}
            >
              I design from the gaps I actually live in. Spotify is my most-used app,
              and the Recently Played shelf had blind spots that bothered me for years.
              I dealt with plantar fasciitis, toenail fungus, and the quiet shame men
              carry about neglecting their own bodies, so I built a resource for it.
              Each project starts with a real problem I can feel, not a brief I was handed.
            </p>
            <p
              style={{
                fontFamily:   "var(--font-dm-sans), sans-serif",
                fontSize:     "16px",
                lineHeight:   1.75,
                color:        "#3D4440",
                marginBottom: "40px",
              }}
            >
              At 56, I still learn like I&apos;m running out of time. I&apos;m teaching
              myself Hiragana. I walk five miles a day, building back toward a marathon.
              I meditate. I watch birds. I read everything. If that sounds like someone
              with too many interests, you&apos;re probably right. But the curiosity is
              the same muscle I use in research. I just don&apos;t turn it off.
            </p>

            {/* Contact CTAs — primary message link + direct channels */}
            <div style={{ display: "grid", gridTemplateColumns: "auto auto", justifyContent: "start", gap: "10px" }}>
              <Link
                href="/contact"
                style={{ ...pillPrimary, gridColumn: "1 / -1", transition: "transform 0.25s ease, box-shadow 0.25s ease, opacity 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(193,127,74,0.25)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                Send a message <ArrowIcon />
              </Link>
              <a
                href="/Alfonso_Barreiro_Resume_April_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={pillDefault}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#8A8680"; e.currentTarget.style.color = "#252B28"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#C9BFB0"; e.currentTarget.style.color = "#3D4440"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <DownloadIcon /> Resume
              </a>
              <a
                href="https://www.linkedin.com/in/alfonso-barreiro/"
                target="_blank"
                rel="noopener noreferrer"
                style={pillDefault}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#8A8680"; e.currentTarget.style.color = "#252B28"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#C9BFB0"; e.currentTarget.style.color = "#3D4440"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <LinkedInIcon /> LinkedIn
              </a>
              <a
                href="https://cal.com/alfonso-barreiro"
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...pillAccent, gridColumn: "1 / -1" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(193,127,74,0.75)"; e.currentTarget.style.background = "rgba(193,127,74,0.12)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(193,127,74,0.45)"; e.currentTarget.style.background = "rgba(193,127,74,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <CoffeeIcon /> Coffee in Portland
              </a>
            </div>
          </div>

          {/* Right — Skills */}
          <div
            className="skills-box scroll-reveal"
            style={{
              background:   "#FAFAF9",
              border:       "1px solid #C9BFB0",
              borderLeft:   "3px solid #C17F4A",
              borderRadius: 0,
              padding:      "44px",
              boxShadow:    "0 4px 14px rgba(37,43,40,0.06), 0 1px 3px rgba(37,43,40,0.04)",
              position:     "sticky",
              top:          "120px",
              alignSelf:    "start",
            }}
          >
            {skillGroups.map((group, i) => (
              <div
                key={group.category}
                style={{
                  marginBottom:  i < skillGroups.length - 1 ? "32px" : 0,
                  paddingBottom: i < skillGroups.length - 1 ? "32px" : 0,
                  borderBottom:  i < skillGroups.length - 1 ? "1px solid #E8E4DE" : "none",
                }}
              >
                <p
                  style={{
                    fontFamily:    "var(--font-dm-sans), sans-serif",
                    fontSize:      "11px",
                    fontWeight:    600,
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                    color:         "#C17F4A",
                    marginBottom:  "14px",
                  }}
                >
                  {group.category}
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
                        border:       "1px solid #E8E4DE",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process note — full-width box */}
        <div
          className="process-box scroll-reveal"
          style={{
            background:  "#FFFFFF",
            border:      "1px solid #E8E4DE",
            padding:     "44px 52px",
          }}
        >
          <div
            style={{
              display:      "flex",
              alignItems:   "center",
              gap:          "12px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                display:    "inline-block",
                width:      "20px",
                height:     "1px",
                background: "#C17F4A",
                flexShrink: 0,
              }}
            />
            <p
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "11px",
                fontWeight:    600,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                color:         "#C17F4A",
                margin:        0,
              }}
            >
              How I work
            </p>
          </div>
          <p
            style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "clamp(18px, 2.2vw, 26px)",
              fontWeight:    500,
              lineHeight:    1.5,
              color:         "#252B28",
              margin:        0,
              letterSpacing: "-0.015em",
              maxWidth:      "760px",
            }}
          >
            The problem comes first. Figma comes last. Research shapes the brief.
            The brief shapes the structure. The structure shapes the interface.
            The decisions that matter most happen before the first frame.
          </p>
        </div>

      </div>
    </section>
  );
}
