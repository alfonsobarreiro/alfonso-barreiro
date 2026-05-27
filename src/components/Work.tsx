"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import MSRPagePeek from "@/components/MSRPagePeek";
import WayfarerGlobePeek from "@/components/WayfarerGlobePeek";
import SpotifyDiagramPeek from "@/components/SpotifyDiagramPeek";

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
    title:       "Men's Sole Revival",
    subtitle:    "Foot Health Content Platform",
    description:
      "A foot health resource for men over 40. Pivoted from e-commerce to content authority in week three; live since April 2026.",
    tags:        ["Content UX", "Visual Design", "Design System"],
    year:        "2026",
    status:      "live",
    href:        "/work/mens-sole-revival",
    image:       "/cs-msr-preview.jpg",
  },
  {
    index:       "02",
    title:       "Spotify",
    subtitle:    "Recently Played Controls",
    description:
      "Three lightweight controls (Pin, Remove, Pause) for Spotify's recently-played shelf. For power users on shared screens who want to manage what's visible without losing convenience. Concept project. The hard part was deciding what to cut: Remove outranked Pin; Pause stayed time-boxed.",
    tags:        ["UX Research", "Interaction Design", "Prototyping"],
    year:        "2026",
    status:      "live",
    href:        "/work/spotify",
    image:       "/cs-spotify-preview.png",
  },
  {
    index:       "03",
    title:       "Wayfarer",
    subtitle:    "Travel Discovery Platform",
    description:
      "A travel discovery platform with an interactive globe and a 40-destination library. For travelers who want to explore before they book. The hard part was the trip planner: modeling day vs. segment vs. saved location without forcing the user to commit to dates that don't exist yet. Duration outranked date; travel-mode logic ran between every segment.",
    tags:        ["UX/UI Design", "Information Architecture", "Design System"],
    year:        "2026",
    status:      "live",
    href:        "/work/wayfarer",
    image:       "/cs-wayfarer-preview.jpg",
  },
];

/* Stagger delays per card index */
const DELAYS = ["0s", "0.1s", "0.2s", "0.35s"];

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>(".scroll-reveal");

    /* 1. Hide immediately, no transition yet */
    targets.forEach((el) => {
      el.style.opacity   = "0";
      el.style.transform = "translateY(32px)";
    });

    /* 2. Next frame: add transitions so the reveal animates */
    requestAnimationFrame(() => {
      targets.forEach((el, i) => {
        const delay = DELAYS[i] || "0s";
        el.style.transition = `opacity 0.7s ease ${delay}, transform 0.7s ease ${delay}`;
      });

      /* 3. Observe */
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

      /* Cleanup stored on section for the return */
      (section as any).__scrollObserver = observer;
    });

    return () => {
      const obs = (section as any).__scrollObserver as IntersectionObserver | undefined;
      if (obs) obs.disconnect();
    };
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="work-section"
      style={{
        padding:    "120px clamp(32px, 6vw, 80px)",
        background: "#FFFFFF",
      }}
    >
      <div style={{ width: "100%", margin: "0 auto" }}>

        {/* Section header */}
        <div
          className="scroll-reveal"
          style={{
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "flex-end",
            marginBottom:   "48px",
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
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "clamp(28px, 4vw, 48px)",
                fontWeight:    600,
                color:         "#252B28",
                margin:        0,
                letterSpacing: "-0.025em",
                lineHeight:    1.1,
              }}
            >
              Three <span style={{ color: "#C17F4A" }}>case studies.</span>
            </h2>
          </div>
        </div>

        {/* Bento grid */}
        <div
          className="work-bento-grid"
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows:    "auto auto",
            gap:                 "16px",
          }}
        >
          {/* Feature card — spans both columns */}
          <div className="scroll-reveal" style={{ gridColumn: "1 / -1" }}>
            <ProjectCard project={projects[0]} featured />
          </div>

          {/* Pair row */}
          <div className="scroll-reveal" style={{ height: "100%" }}>
            <ProjectCard project={projects[1]} />
          </div>
          <div className="scroll-reveal" style={{ height: "100%" }}>
            <ProjectCard project={projects[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isLive = project.status === "live" && !!project.href;

  const cardStyle: React.CSSProperties = {
    display:        "block",
    textDecoration: "none",
    color:          "inherit",
    background:     "#FAFAF9",
    border:         "1px solid #7E715F",
    borderRadius:   0,
    padding:        featured ? "44px 48px" : "40px 40px",
    height:         "100%",
    boxSizing:      "border-box",
    transition:     "transform 0.25s ease, box-shadow 0.25s ease",
    transform:      hovered && isLive ? "translateY(-3px)" : "translateY(0)",
    boxShadow:      hovered && isLive
      ? "0 18px 44px rgba(37,43,40,0.22), 0 4px 12px rgba(37,43,40,0.22)"
      : "0 4px 14px rgba(37,43,40,0.22), 0 1px 3px rgba(37,43,40,0.22)",
    cursor:         isLive ? "pointer" : "default",
  };

  /* ── Featured layout: content left, image right ── */
  const featuredInner = (
    <div
      className="feat-inner"
      style={{
        display:             "grid",
        gridTemplateColumns: "1fr 1.4fr",
        gap:                 "48px",
        alignItems:          "stretch",
        minHeight:           "320px",
      }}
    >
      {/* Left: all text content */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
        {/* Title block — title left, year rectangle pushed flush right */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "14px", marginBottom: "4px", flexWrap: "wrap" }}>
            <h3 style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "clamp(24px, 2.8vw, 36px)",
              fontWeight:    600,
              color:         "#252B28",
              margin:        0,
              letterSpacing: "-0.02em",
            }}>
              {project.title}
            </h3>
            <span style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "12px",
              padding:       "4px 12px",
              border:        "1px solid #A99B8A",
              color:         "#8A8680",
              fontWeight:    500,
              letterSpacing: "0.06em",
              whiteSpace:    "nowrap",
            }}>
              {project.year}
            </span>
          </div>
          <p style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize:   "15px",
            color:      "#8A8680",
            margin:     "0 0 20px",
            fontWeight: 400,
          }}>
            {project.subtitle}
          </p>
          <p style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize:   "14px",
            lineHeight: 1.7,
            color:      "#3D4440",
            margin:     "0 0 24px",
          }}>
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily:   "var(--font-dm-sans), sans-serif",
              fontSize:     "12px",
              padding:      "5px 14px",
              background:   "#F5F5F4",
              color:        "#3D4440",
              fontWeight:   500,
              border:       "1px solid #A99B8A",
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
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
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
            style={{ transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "transform 0.25s ease" }}
          >
            <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Right: image / peek — absolute within its grid column, bleeds to card edges */}
      <div className="feat-img-col" style={{ position: "relative", minHeight: "280px" }}>
        <div className="feat-img-inner" style={{
          position: "absolute",
          top:      "-44px",
          right:    "-48px",
          bottom:   "-44px",
          left:     0,
          overflow: "hidden",
        }}>
          {project.title === "Men's Sole Revival" ? (
            <MSRPagePeek paused={hovered} />
          ) : project.title === "Wayfarer" ? (
            <WayfarerGlobePeek paused={hovered} />
          ) : project.image && (
            <Image
              src={project.image}
              alt={`${project.title}: ${project.subtitle} preview`}
              fill
              sizes="700px"
              style={{
                objectFit:      "cover",
                objectPosition: "center top",
                transition:     "transform 0.4s ease",
                transform:      hovered ? "scale(1.03)" : "scale(1)",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );

  /* ── Compact layout: image top, content below ── */
  const isMSR      = project.title === "Men's Sole Revival";
  const isWayfarer = project.title === "Wayfarer";
  const isSpotify  = project.title === "Spotify";

  // Shared compact image wrapper styles — 16:10 aspect to match the featured top card
  const compactImgWrapper: React.CSSProperties = {
    position:     "relative",
    width:        "calc(100% + 80px)",
    marginLeft:   "-40px",
    marginTop:    "-40px",
    marginBottom: "28px",
    aspectRatio:  "16 / 10",
    overflow:     "hidden",
    borderBottom: "1px solid #A99B8A",
  };

  const compactInner = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Image / peek */}
      {isMSR ? (
        <div className="compact-img" style={compactImgWrapper}>
          <MSRPagePeek paused={hovered} />
        </div>
      ) : isWayfarer ? (
        <div className="compact-img" style={compactImgWrapper}>
          <WayfarerGlobePeek paused={hovered} />
        </div>
      ) : isSpotify ? (
        <div className="compact-img" style={compactImgWrapper}>
          <SpotifyDiagramPeek />
        </div>
      ) : project.image && (
        <div className="compact-img" style={{ ...compactImgWrapper, background: "#0F0F0F" }}>
          <Image
            src={project.image}
            alt={`${project.title}: ${project.subtitle} preview`}
            fill
            sizes="600px"
            style={{
              objectFit:      "cover",
              objectPosition: "center center",
              transition:     "transform 0.4s ease",
              transform:      hovered ? "scale(1.03)" : "scale(1)",
            }}
          />
        </div>
      )}

      {/* Title row — title left, year rectangle pushed flush right */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px", marginBottom: "4px", flexWrap: "wrap" }}>
        <h3 style={{
          fontFamily:    "var(--font-dm-sans), sans-serif",
          fontSize:      "clamp(20px, 2vw, 28px)",
          fontWeight:    600,
          color:         "#252B28",
          margin:        0,
          letterSpacing: "-0.02em",
        }}>
          {project.title}
        </h3>
        <span style={{
          fontFamily:    "var(--font-dm-sans), sans-serif",
          fontSize:      "11px",
          padding:       "4px 10px",
          border:        "1px solid #A99B8A",
          color:         "#8A8680",
          fontWeight:    500,
          letterSpacing: "0.06em",
          whiteSpace:    "nowrap",
        }}>
          {project.year}
        </span>
      </div>
      <p style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize:   "14px",
        color:      "#8A8680",
        margin:     "0 0 18px",
      }}>
        {project.subtitle}
      </p>

      {/* Description */}
      <p style={{
        fontFamily:        "var(--font-dm-sans), sans-serif",
        fontSize:          "14px",
        lineHeight:        1.7,
        color:             "#3D4440",
        margin:            "0 0 24px",
        flex:              1,
        display:           "-webkit-box",
        WebkitLineClamp:   3,
        WebkitBoxOrient:   "vertical" as const,
        overflow:          "hidden",
      }}>
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
        {project.tags.map((tag) => (
          <span key={tag} style={{
            fontFamily:   "var(--font-dm-sans), sans-serif",
            fontSize:     "11px",
            padding:      "4px 12px",
            background:   "#F5F5F4",
            color:        "#3D4440",
            fontWeight:   500,
            border:       "1px solid #A99B8A",
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
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
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
            style={{ transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "transform 0.25s ease" }}
          >
            <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      ) : (
        <p style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize:   "12px",
          color:      "#8A8680",
          margin:     0,
          fontStyle:  "italic",
        }}>
          Case study in progress
        </p>
      )}
    </div>
  );

  const content = featured ? featuredInner : compactInner;

  if (isLive) {
    return (
      <Link
        href={project.href!}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="work-card"
        style={cardStyle}
      >
        {content}
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
      {content}
    </div>
  );
}
