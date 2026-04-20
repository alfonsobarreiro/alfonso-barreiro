"use client";

import Image from "next/image";

const skillGroups = [
  {
    category: "Research & Discovery",
    skills:   ["User Interviews", "Competitive Analysis", "Heuristic Evaluation", "Jobs-to-be-Done"],
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
  return (
    <section
      id="about"
      className="about-section"
      style={{
        padding:    "120px 48px",
        background: "#F5F5F4",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

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
          <div>
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
                fontFamily:    "var(--font-dm-serif-display), Georgia, serif",
                fontSize:      "clamp(26px, 3.5vw, 44px)",
                fontWeight:    400,
                color:         "#252B28",
                margin:        "0 0 28px",
                letterSpacing: "-0.025em",
                lineHeight:    1.15,
              }}
            >
              Design is a<br />
              <span style={{ color: "#C17F4A" }}>decision problem.</span>
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
              Every project starts the same way: I look for the space between what users
              expect and what the product actually gives them. That gap is where the design
              work lives. I frame the problem, map the constraints, then build the simplest
              thing that closes it.
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
              My work spans consumer apps, content platforms, and e-commerce. Beyond the
              interface, I care about the systems underneath: interaction patterns, information
              architecture, accessibility, and the handoff details that make or break implementation.
            </p>

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            "8px",
                color:          "#252B28",
                fontSize:       "13px",
                fontWeight:     600,
                letterSpacing:  "0.07em",
                textTransform:  "uppercase",
                fontFamily:     "var(--font-dm-sans), sans-serif",
                borderBottom:   "1px solid #C9BFB0",
                borderTop:      "none",
                borderLeft:     "none",
                borderRight:    "none",
                paddingBottom:  "4px",
                background:     "none",
                cursor:         "pointer",
                transition:     "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color       = "#C17F4A";
                e.currentTarget.style.borderColor = "#C17F4A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color       = "#252B28";
                e.currentTarget.style.borderColor = "#C9BFB0";
              }}
            >
              Let&apos;s talk
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Right — Skills */}
          <div
            className="skills-box"
            style={{
              background:   "#FFFFFF",
              border:       "1px solid #E8E4DE",
              borderRadius: 0,
              padding:      "44px",
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
          className="process-box"
          style={{
            background:  "#EBEBEA",
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
              fontFamily:    "var(--font-dm-serif-display), Georgia, serif",
              fontSize:      "clamp(18px, 2.2vw, 26px)",
              fontWeight:    400,
              lineHeight:    1.5,
              color:         "#252B28",
              margin:        0,
              letterSpacing: "-0.02em",
              maxWidth:      "760px",
            }}
          >
            I start with the problem before opening Figma. Research shapes the brief.
            The brief shapes the structure. The structure shapes the interface. In that order.
            The decisions that matter most happen before the first frame.
          </p>
        </div>

      </div>
    </section>
  );
}
