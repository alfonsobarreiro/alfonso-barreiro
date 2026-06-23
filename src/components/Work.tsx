"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import MSRPagePeek from "@/components/MSRPagePeek";
import WayfarerGlobePeek from "@/components/WayfarerGlobePeek";
import SpotifyFramedAnimation from "@/components/SpotifyFramedAnimation";

interface Project {
  title:       string;
  subtitle:    string;
  description: string;
  /** One-line "what I figured out" — signals decision-making depth. Renders italic deep-teal under the description. */
  thesis:      string;
  /** Hover-revealed meta line: role · year · status. Editorial eyebrow style. */
  meta:        string;
  tags:        string[];
  year:        string;
  status:      "live" | "coming-soon";
  href?:       string;
  image?:      string;
}

/* Order: Spotify → Wayfarer → MSR.
   MSR is already the hero (13× over the live site), so leading with it again
   would repeat the same evidence twice. Spotify opens the work section with
   interaction craft, Wayfarer carries the shipped-product range, MSR closes
   with the measurable-result case the hero set up. */
const projects: Project[] = [
  {
    title:       "Spotify",
    subtitle:    "Recently Played Controls",
    description:
      "Three lightweight controls (Pin, Remove, Pause) for Spotify's recently-played shelf. For power users on shared screens who want to manage what's visible without losing convenience. Concept project. The hard part was deciding what to cut: Remove outranked Pin; Pause stayed time-boxed.",
    thesis:      "Three controls Spotify should have built already.",
    meta:        "DESIGNER · 2026 · CONCEPT",
    tags:        ["UX Research", "Interaction Design", "Prototyping"],
    year:        "2026",
    status:      "live",
    href:        "/work/spotify",
    image:       "/cs-spotify-preview.png",
  },
  {
    title:       "Wayfarer",
    subtitle:    "Travel Discovery Platform",
    description:
      "A travel discovery platform with an interactive globe and a 40-destination library. For travelers who want to explore before they book. The hard part was the trip planner: modeling day vs. segment vs. saved location without forcing the user to commit to dates that don't exist yet. Duration outranked date; travel-mode logic ran between every segment.",
    thesis:      "Trip planning without forcing dates that don't exist yet.",
    meta:        "DESIGNER · 2026 · LIVE",
    tags:        ["UX/UI Design", "Information Architecture", "Design System"],
    year:        "2026",
    status:      "live",
    href:        "/work/wayfarer",
    image:       "/cs-wayfarer-preview.jpg",
  },
  {
    title:       "Men's Sole Revival",
    subtitle:    "Foot Health Content Platform",
    description:
      "A foot health resource for men over 40. Pivoted from e-commerce to content authority in week three; live since April 2026.",
    thesis:      "Pivoted from e-commerce to editorial in week 3.",
    meta:        "DESIGNER · 2026 · LIVE SINCE APRIL",
    tags:        ["Content UX", "Visual Design", "Design System"],
    year:        "2026",
    status:      "live",
    href:        "/work/mens-sole-revival",
    image:       "/cs-msr-preview.jpg",
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

    /* 1. Hide immediately, with a subtle scale-down so the row reads as
          "off in the distance" before it blooms forward. 4% scale + 24px
          translateY is the SLUX dose — premium-feeling, never theatrical. */
    targets.forEach((el) => {
      el.style.opacity        = "0";
      el.style.transform      = "translateY(24px) scale(0.96)";
      el.style.transformOrigin = "center top";
    });

    /* 2. Next frame: register the eased transition so the reveal can animate.
          Longer 0.9s with a calm cubic-bezier reads as deliberate rather
          than snappy. */
    requestAnimationFrame(() => {
      targets.forEach((el, i) => {
        const delay = DELAYS[i] || "0s";
        el.style.transition =
          `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay},` +
          ` transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}`;
      });

      /* 3. Observe — bloom each row to identity once it crosses the threshold */
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              el.style.opacity   = "1";
              el.style.transform = "translateY(0) scale(1)";
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
                  background: "var(--color-accent)",
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
                Selected Work · 2026
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
              Three <span style={{ color: "var(--color-brand)" }}>case studies.</span>
            </h2>
            <p
              style={{
                fontFamily:   "var(--font-dm-sans), sans-serif",
                fontSize:     "clamp(15px, 1.5vw, 17px)",
                lineHeight:   1.65,
                color:        "#3D4440",
                margin:       "20px 0 0",
                maxWidth:     "640px",
                fontWeight:   400,
              }}
            >
              Consumer apps, e-commerce, and travel. Built solo, remote, end to end. Different industries, same operating model: research first, decisions made explicit, shipped to a live product.
            </p>
          </div>
        </div>

        {/* Zigzag editorial rows — each case study gets its own full row
            with image (60%) and content (40%) alternating sides. Image-left
            on odd rows, image-right on even rows. */}
        <div
          className="work-zigzag"
          style={{
            display:        "flex",
            flexDirection:  "column",
            gap:            "clamp(120px, 13vw, 180px)",
          }}
        >
          {projects.map((project, idx) => (
            <div key={project.title} className="scroll-reveal">
              <ProjectCard project={project} index={idx} imageOnRight={idx % 2 === 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  imageOnRight = false,
}: {
  project: Project;
  index?: number;
  featured?: boolean;
  imageOnRight?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isLive = project.status === "live" && !!project.href;

  const isMSR      = project.title === "Men's Sole Revival";
  const isWayfarer = project.title === "Wayfarer";
  const isSpotify  = project.title === "Spotify";

  // Editorial row — 2-col grid, image on one side (60%), content on the other (40%).
  // On mobile the row collapses to image-top + content-below via the
  // .work-row class + globals.css media query.
  const rowStyle: React.CSSProperties = {
    display:             "grid",
    gridTemplateColumns: imageOnRight ? "0.66fr 1fr" : "1fr 0.66fr",
    gap:                 "clamp(32px, 5vw, 72px)",
    alignItems:          "center",
    textDecoration:      "none",
    color:               "inherit",
    cursor:              isLive ? "pointer" : "default",
  };

  const imgBox: React.CSSProperties = {
    position:     "relative",
    width:        "100%",
    aspectRatio:  "16 / 10",
    overflow:     "hidden",
    background:   "#0F0F0F",
    order:        imageOnRight ? 2 : 0,
    transition:   "transform 0.3s ease",
    transform:    hovered && isLive ? "translateY(-3px)" : "translateY(0)",
  };

  const imageBlock = (
    <div style={imgBox} className="work-row-image">
      {isMSR ? (
        <MSRPagePeek paused={hovered} />
      ) : isWayfarer ? (
        <WayfarerGlobePeek paused={hovered} />
      ) : isSpotify ? (
        <SpotifyFramedAnimation />
      ) : project.image && (
        <Image
          src={project.image}
          alt={`${project.title}: ${project.subtitle} preview`}
          fill
          sizes="(max-width: 767px) 100vw, 60vw"
          style={{
            objectFit:      "cover",
            objectPosition: "center center",
            transition:     "transform 0.4s ease",
            transform:      hovered ? "scale(1.03)" : "scale(1)",
          }}
        />
      )}

      {/* Thesis band — slides up from the bottom on hover.
          Gives each card a third hover beat (image lift + scale + this), and
          surfaces the project's one-line thesis without making the reader
          travel all the way to the content column to find it.

          Skipped on Spotify because the SpotifyFramedAnimation already
          carries the thesis in its own caption inside the frame; doubling
          it on hover reads as a duplicated line. */}
      {!isSpotify && (
      <div
        aria-hidden="true"
        style={{
          position:       "absolute",
          left:           0,
          right:          0,
          bottom:         0,
          padding:        "18px 22px 20px",
          background:     "linear-gradient(to top, rgba(15,15,15,0.96) 0%, rgba(15,15,15,0.72) 60%, rgba(15,15,15,0) 100%)",
          color:          "#FAFAF9",
          transform:      hovered ? "translateY(0)" : "translateY(100%)",
          opacity:        hovered ? 1 : 0,
          transition:     "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease",
          pointerEvents:  "none",
          zIndex:         5,
        }}
      >
        <p style={{
          fontFamily:    "var(--font-dm-sans), sans-serif",
          fontSize:      "11px",
          fontWeight:    700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color:         "var(--color-accent)",
          margin:        "0 0 6px",
        }}>
          {project.tags[0]} · {project.meta.split(" · ").pop()}
        </p>
        <p style={{
          fontFamily:    "var(--font-dm-sans), sans-serif",
          fontSize:      "clamp(15px, 1.4vw, 18px)",
          fontWeight:    500,
          lineHeight:    1.35,
          letterSpacing: "-0.005em",
          color:         "#FAFAF9",
          margin:        0,
        }}>
          {project.thesis}
        </p>
      </div>
      )}
    </div>
  );

  const contentBlock = (
    <div className="work-row-content" style={{ order: imageOnRight ? 1 : 2 }}>
      {/* Title — display weight, room to breathe now. */}
      <h3 style={{
        fontFamily:    "var(--font-dm-sans), sans-serif",
        fontSize:      "clamp(34px, 4.5vw, 56px)",
        fontWeight:    600,
        color:         "#252B28",
        margin:        "0 0 10px",
        letterSpacing: "-0.025em",
        lineHeight:    1.05,
      }}>
        {project.title}
      </h3>

      {/* Subtitle + year — quiet editorial eyebrow */}
      <p style={{
        fontFamily:    "var(--font-dm-sans), sans-serif",
        fontSize:      "14px",
        color:         "#8A8680",
        margin:        "0 0 24px",
        fontWeight:    500,
        letterSpacing: "0.02em",
      }}>
        {project.subtitle} · {project.year}
      </p>

      {/* Description — capped so the line length stays in the 55-75 char
          readability band on tablet, where the work-row collapses to a
          single column and the content cell suddenly becomes full-width. */}
      <p style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize:   "clamp(15px, 1.4vw, 17px)",
        lineHeight: 1.7,
        color:      "#3D4440",
        margin:     "0 0 18px",
        maxWidth:   "640px",
      }}>
        {project.description}
      </p>

      {/* Thesis — italic accent line */}
      <p style={{
        fontFamily:    "var(--font-dm-sans), sans-serif",
        fontSize:      "14px",
        lineHeight:    1.55,
        color:         "var(--color-accent)",
        fontStyle:     "italic",
        margin:        "0 0 28px",
        letterSpacing: "-0.005em",
        maxWidth:      "640px",
      }}>
        {project.thesis}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
        {project.tags.map((tag) => (
          <span key={tag} style={{
            fontFamily:   "var(--font-dm-sans), sans-serif",
            fontSize:     "11px",
            padding:      "4px 12px",
            background:   "#F5F5F4",
            color:        "#3D4440",
            fontWeight:   500,
            border:       "1px solid #A8A39A",
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
          color:         "var(--color-brand)",
          fontSize:      "13px",
          fontWeight:    600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontFamily:    "var(--font-dm-sans), sans-serif",
          opacity:       hovered ? 1 : 0.75,
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
          fontSize:   "13px",
          color:      "#8A8680",
          margin:     0,
          fontStyle:  "italic",
        }}>
          Case study in progress
        </p>
      )}
    </div>
  );

  const inner = (
    <>
      {imageBlock}
      {contentBlock}
    </>
  );

  if (isLive) {
    return (
      <Link
        href={project.href!}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="work-row"
        style={rowStyle}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="work-row"
      style={rowStyle}
    >
      {inner}
    </div>
  );
}

