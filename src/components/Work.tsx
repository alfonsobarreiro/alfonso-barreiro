"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  index:       string;
  title:       string;
  subtitle:    string;
  description: string;
  tags:        string[];
  year:        string;
  status:      "live" | "coming-soon";
  href?:       string;
  image?:      string;
}

const projects: Project[] = [
  {
    index:       "01",
    title:       "Spotify",
    subtitle:    "Recently Played Controls",
    description:
      "Designing reversible, non-destructive controls — Pin, Remove, and Pause — that give users meaningful agency over Spotify's Home feed without degrading recommendation integrity or breaking discovery behavior.",
    tags:        ["UX Research", "Interaction Design", "Prototyping"],
    year:        "2026",
    status:      "live",
    href:        "/work/spotify",
    image:       "/cs-spotify-preview.png",
  },
  {
    index:       "02",
    title:       "Wayfarer",
    subtitle:    "Travel Planning Site",
    description:
      "An end-to-end travel planning experience built to reduce decision fatigue — surfacing the right information at the right moment across research, planning, and booking phases without fragmenting the journey.",
    tags:        ["UX/UI Design", "Information Architecture", "Design System"],
    year:        "2026",
    status:      "coming-soon",
  },
  {
    index:       "03",
    title:       "Men's Sole Revival",
    subtitle:    "Sneaker Education & Review Site",
    description:
      "A resource-first site helping sneaker enthusiasts research authenticity, compare releases, and navigate the market with confidence — built on editorial clarity, honest reviews, and information architecture that puts the right detail at the right moment.",
    tags:        ["Content UX", "Visual Design", "Mobile-First"],
    year:        "2026",
    status:      "coming-soon",
  },
];

export default function Work() {
  return (
    <section
      id="work"
      className="work-section"
      style={{
        padding:    "120px 48px",
        background: "#EBEBEA",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Section header */}
        <div
          style={{
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "flex-end",
            marginBottom:   "64px",
          }}
        >
          <div>
            <div
              style={{
                display:      "flex",
                alignItems:   "center",
                gap:          "12px",
                marginBottom: "16px",
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
                Selected Work
              </p>
            </div>
            <h2
              style={{
                fontFamily:    "var(--font-dm-serif-display), Georgia, serif",
                fontSize:      "clamp(28px, 4vw, 48px)",
                fontWeight:    400,
                color:         "#252B28",
                margin:        0,
                letterSpacing: "-0.03em",
                lineHeight:    1.1,
              }}
            >
              Flagship Case Studies
            </h2>
          </div>
          <span
            style={{
              fontSize:      "13px",
              color:         "#8A8680",
              letterSpacing: "0.04em",
              fontFamily:    "var(--font-dm-sans), sans-serif",
            }}
          >
            Research → Prototype
          </span>
        </div>

        {/* Project cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {projects.map((project) => (
            <ProjectCard key={project.index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const isLive = project.status === "live" && !!project.href;

  const cardStyle: React.CSSProperties = {
    display:        "block",
    textDecoration: "none",
    color:          "inherit",
    background:     "#FFFFFF",
    border:         "1px solid #E8E4DE",
    borderRadius:   0,
    padding:        "44px 48px",
    transition:     "transform 0.25s ease, box-shadow 0.25s ease",
    transform:      hovered && isLive ? "translateY(-3px)" : "translateY(0)",
    boxShadow:      hovered && isLive
      ? "0 8px 28px rgba(37,43,40,0.08), 0 2px 8px rgba(37,43,40,0.04)"
      : "0 1px 4px rgba(37,43,40,0.05)",
    cursor:         isLive ? "pointer" : "default",
  };

  const cardInner = (
    <>
      {/* Thumbnail */}
      {project.image && (
        <div style={{
          position:     "relative",
          width:        "calc(100% + 96px)",
          marginLeft:   "-48px",
          marginTop:    "-44px",
          marginBottom: "32px",
          aspectRatio:  "16/7",
          overflow:     "hidden",
          borderBottom: "1px solid #E8E4DE",
        }}>
          <Image
            src={project.image}
            alt={`${project.title} — ${project.subtitle} preview`}
            fill
            sizes="(max-width: 767px) 100vw, 1200px"
            style={{
              objectFit:      "cover",
              objectPosition: "center top",
              transition:     "transform 0.4s ease",
              transform:      hovered ? "scale(1.03)" : "scale(1)",
            }}
          />
        </div>
      )}

      {/* Card header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C17F4A" }}>
          {project.index}
        </span>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {/* Label — stays rectangular */}
          <span style={{
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "11px",
            padding:       "4px 12px",
            borderRadius:  0,
            border:        "1px solid rgba(193,127,74,0.30)",
            color:         "#C17F4A",
            fontWeight:    600,
            letterSpacing: "0.06em",
          }}>
            {isLive ? "Case Study" : "Coming Soon"}
          </span>
          <span style={{ fontSize: "12px", color: "#8A8680", fontFamily: "var(--font-dm-sans), sans-serif" }}>
            {project.year}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 style={{ fontFamily: "var(--font-dm-serif-display), Georgia, serif", fontSize: "clamp(22px, 2.8vw, 32px)", fontWeight: 400, color: "#252B28", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
        {project.title}
      </h3>
      <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "15px", color: "#8A8680", margin: "0 0 20px", fontWeight: 400 }}>
        {project.subtitle}
      </p>

      {/* Description */}
      <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "15px", lineHeight: 1.7, color: "#3D4440", margin: "0 0 28px", maxWidth: "560px" }}>
        {project.description}
      </p>

      {/* Tags — stay rectangular */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
        {project.tags.map((tag) => (
          <span key={tag} style={{
            fontFamily:   "var(--font-dm-sans), sans-serif",
            fontSize:     "12px",
            padding:      "5px 14px",
            borderRadius: 0,
            background:   "#F5F5F4",
            color:        "#3D4440",
            fontWeight:   500,
            border:       "1px solid #E8E4DE",
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Hover indicator / status */}
      {isLive ? (
        <div style={{
          display:       "flex",
          alignItems:    "center",
          gap:           "8px",
          color:         "#C17F4A",
          fontSize:      "12px",
          fontWeight:    600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontFamily:    "var(--font-dm-sans), sans-serif",
          opacity:       hovered ? 1 : 0.45,
          transition:    "opacity 0.25s ease",
        }}>
          View Case Study
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            style={{
              transform:  hovered ? "translateX(4px)" : "translateX(0)",
              transition: "transform 0.25s ease",
            }}
          >
            <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      ) : (
        <div style={{
          display:       "flex",
          alignItems:    "center",
          gap:           "10px",
          color:         "#8A8680",
          fontSize:      "12px",
          fontWeight:    500,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          fontFamily:    "var(--font-dm-sans), sans-serif",
        }}>
          <span style={{
            display:    "inline-block",
            width:      "7px",
            height:     "7px",
            borderRadius: "50%",
            background: "#C17F4A",
            opacity:    hovered ? 0.7 : 0.4,
            transition: "opacity 0.3s",
            flexShrink: 0,
          }} />
          In Progress — Q2 2026
        </div>
      )}
    </>
  );

  if (isLive) {
    return (
      <Link
        href={project.href!}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="work-card"
        style={cardStyle}
      >
        {cardInner}
      </Link>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="work-card"
      style={cardStyle}
    >
      {cardInner}
    </div>
  );
}
