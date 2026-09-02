"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import MSRPagePeek from "@/components/MSRPagePeek";
import WayfarerGlobePeek from "@/components/WayfarerGlobePeek";
import SpotifyFramedAnimation from "@/components/SpotifyFramedAnimation";
import { LinkArrow } from "@/components/ui/LinkArrow";

interface Project {
  title:       string;
  subtitle:    string;
  description: string;
  /** One-line "what I figured out" — signals decision-making depth. Renders italic deep-teal under the description. */
  thesis:      string;
  /** Magazine-style deck: the smaller subhead carrying the constraint
      or method beneath the thesis. Two short sentences max. */
  deck?:       string;
  /** Hover-revealed meta line: role · year · status. Editorial eyebrow style. */
  meta:        string;
  tags:        string[];
  year:        string;
  status:      "live" | "coming-soon";
  href?:       string;
  image?:      string;
  /** If true, renders an "Interactive prototype" badge under the eyebrow.
      Signals to scanners that the case study contains a working demo,
      not just static comps. */
  interactive?: boolean;
  /** Per-case brand atmosphere for the row. Data-driven replacement for
      the isSpotify/isWayfarer/isMSR/isABD ternary chains in ProjectCard.
      Only `shellBg` is required — the other fields fall through to the
      per-project ternary defaults when omitted. */
  atmosphere?: {
    shellBg:       string;
    aspect?:       string;
    shellPadding?: string;
    shellWidth?:   { width: string; maxWidth: string };
  };
}

/* Order: Spotify → Wayfarer → MSR → ABD UI.
   MSR is already the hero (86% completion stat over the live site), so leading with it again
   would repeat the same evidence twice. Spotify opens the work section with
   interaction craft, Wayfarer carries the shipped-product range, MSR closes
   the project triad with the measurable-result case the hero set up. ABD UI
   sits last as the operating system behind every client project, the proof
   that the work scales because the system underneath it does. */
const projects: Project[] = [
  {
    title:       "Spotify",
    subtitle:    "Recently Played Controls",
    description:
      "Three lightweight controls (Pin, Remove, Pause) for Spotify's recently-played shelf. For power users on shared screens who want to manage what's visible without losing convenience. Concept project. The hard part was deciding what to cut: Remove outranked Pin; Pause stayed time-boxed.",
    thesis:      "Three controls I keep wanting Spotify to add.",
    deck:        "The shelf 600M+ Spotify users see daily, with no controls. Pin · Remove · Pause, grounded in 200+ user posts.",
    meta:        "Designer · 2026 · Concept",
    tags:        ["Feature design", "Interaction model", "Constraint mapping"],
    year:        "2026",
    status:      "live",
    href:        "/work/spotify",
    image:       "/cs-spotify-preview.png",
    interactive: true,
  },
  {
    title:       "Wayfarer",
    subtitle:    "Travel Discovery Platform",
    description:
      "A travel discovery platform with an interactive globe and a 40-destination library. For travelers who want to explore before they book. The hard part was the trip planner: modeling day vs. segment vs. saved location without forcing the user to commit to dates that don't exist yet. Duration outranked date; travel-mode logic ran between every segment.",
    thesis:      "Built the trip planner around duration, not dates.",
    deck:        "Homepage as an editorial cover. Discovery through a globe and curated cards.",
    meta:        "Designer · 2026 · Live",
    tags:        ["Information Architecture", "Design System", "Multi-step Form UX"],
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
    deck:        "Cost: the storefront I'd already designed. Diagnostic-first resource for men over 40, live since April. 86% of visitors finish the assessment.",
    meta:        "Designer · 2026 · Live since April",
    tags:        ["Brand Identity", "Content UX", "Editorial"],
    year:        "2026",
    status:      "live",
    href:        "/work/mens-sole-revival",
    image:       "/cs-msr-preview.jpg",
  },
  {
    title:       "AIGA Portland",
    subtitle:    "Portland Design Month 2026",
    description:
      "Volunteer landing-page build for AIGA Portland's Design Month 2026. Squarespace 7.1 with a brand system that fought every platform default. Custom CSS and page-scoped JS closed the gap.",
    thesis:      "The artist's brand shipped intact past Squarespace's defaults.",
    deck:        "Team of four. PM on final calls, artist on this year's brand system, peer designer on the map, me on the Squarespace build and custom code.",
    meta:        "Volunteer · 2026 · Live",
    tags:        ["Editorial", "Brand", "Volunteer"],
    year:        "2026",
    status:      "live",
    href:        "/work/aiga-portland",
    image:       "/images/work/aiga-portland/then-2026-cropped.jpg",
  },
  // ABD UI hidden 2026-07-01 pending case-study rework to match the
  // Spotify/Wayfarer/MSR arc pattern. Restore this entry when the
  // rework ships.
  // {
  //   title:       "ABD UI",
  //   subtitle:    "Production Design System",
  //   description:
  //     "A token-driven design system that powers every Alpha Beta Design client site. One source of truth published to CSS, JSON, and Figma. 120 components, 15 color tokens, one accessibility floor. The hard part was choosing role-based tokens over a literal palette so a brand swap takes minutes, not days.",
  //   thesis:      "The button has to get designed once.",
  //   deck:        "Token-driven. Published to CSS, JSON, and Figma from one source. Refuses one-off values.",
  //   meta:        "Design System · Live · Ongoing",
  //   tags:        ["Design Tokens", "Component API", "Accessibility"],
  //   year:        "2026",
  //   status:      "live",
  //   href:        "/work/abd-ui-system",
  //   image:       "/cs-abdui-preview.png",
  // },
];

/* Stagger delays per card index */
const DELAYS = ["0s", "0.1s", "0.2s", "0.35s"];

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="work-section"
      style={{
        padding:    "clamp(80px, 9vw, 128px) clamp(32px, 6vw, 80px) clamp(80px, 9vw, 128px)",
        background: "var(--color-paper)",
        borderTop:  "none",
        overflowX:  "clip",
      }}
    >
      <div style={{ width: "100%", maxWidth: "var(--content-max)", margin: "0 auto" }}>

        {/* Section header */}
        <div
          className="scroll-reveal"
          style={{
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "flex-end",
            marginBottom:   "clamp(48px, 6vw, 80px)",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "clamp(48px,6vw,72px)",
                fontWeight:    500,
                color:         "var(--color-text)",
                margin:        0,
                letterSpacing: "-0.02em",
                lineHeight:    1.05,
              }}
            >
              Work
            </h2>
            <p
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "17px",
                lineHeight:    1.4,
                fontWeight:    400,
                color:         "var(--color-neutral-600)",
                margin:        "12px 0 0",
                maxWidth:      "640px",
              }}
            >
              Four case studies. Two shipped and running. Two concepts that argue from evidence, not opinion.
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
            gap:            "clamp(48px, 6vw, 96px)",
          }}
        >
          {projects.map((project, idx) => (
            <div key={project.title} className="scroll-reveal">
              <ProjectCard project={project} index={idx} imageOnRight={idx % 2 === 0} />
            </div>
          ))}
        </div>
      </div>

      {/* Responsive: stack row contents on mobile so the device shell goes
          first (full width) and the editorial block sits below it. The
          desktop zigzag alternation collapses cleanly to a single column. */}
      <style>{`
        @media (max-width: 899px) {
          .work-row {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: clamp(28px, 6vw, 44px) !important;
            justify-content: flex-start !important;
            min-height: auto !important;
            padding: clamp(56px, 12vw, 96px) clamp(24px, 6vw, 40px) !important;
          }
          .work-row .work-row-image {
            order: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .work-row .work-row-content {
            order: 1 !important;
            max-width: 100% !important;
          }
          .work-row .work-row-thesis {
            font-size: clamp(28px, 8vw, 40px) !important;
            line-height: 1.15 !important;
          }
          .work-row .work-row-deck {
            font-size: clamp(15px, 4vw, 20px) !important;
          }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({
  project,
  index = 0,
  imageOnRight = false,
}: {
  project: Project;
  index?: number;
  featured?: boolean;
  imageOnRight?: boolean;
}) {
  /* Hover state is scoped tight — only flips when the cursor is over the
     device showroom or the View Case Study link. Drives the device peek
     pause, the tag-pill reveal, the shell lift, and the CTA arrow nudge.
     Reading the thesis or deck does NOT trigger hover. */
  const [hovered, setHovered] = useState(false);
  const isLive = project.status === "live" && !!project.href;

  const isMSR      = project.title === "Men's Sole Revival";
  const isWayfarer = project.title === "Wayfarer";
  const isSpotify  = project.title === "Spotify";
  const isAiga     = project.title === "AIGA Portland";
  const isABD      = project.title === "ABD UI";

  /* Per-project aspect ratio: MSR (landscape MacBook) stays 16:10 so the
     laptop reads landscape; Wayfarer and Spotify use 4:5 so portrait iPad /
     iPhone fill the frame the same way the hero iPad does. */
  /* imgBox aspect matches each device's natural visible aspect so the
     gray shell hugs the chrome (no transparent dead space). */
  const imgAspect = isMSR     ? "4 / 3"
                  : isWayfarer ? "3 / 4"
                  : isSpotify  ? "2 / 3"
                  : isAiga     ? "1431 / 1877"
                  : isABD      ? "16 / 10"
                  : "16 / 10";

  /* Plate hugs the device tighter so the text column has more room —
     the "bounce" is now a thin gray border rather than a wide field.
     Combined with the reduced shell widths below, the device inside
     stays the same size while the surrounding plate shrinks. */
  const shellPadding = "clamp(18px, 2.2vw, 28px) clamp(20px, 2.5vw, 32px)";

  /* Contained-with-bounce field. All rows share one whisper-quiet neutral
     radial (Comeau pattern) so each case study's palette carries through
     the image itself rather than through a brand-tinted panel. The field
     is barely perceptible against the page — its job is to give the
     device peek a plate to bounce off, not to compete with it. Sharp
     corners per DS default. Falls back to the neutral radial for any
     project that ships without an explicit atmosphere override. */
  const shellBg = project.atmosphere?.shellBg
    ?? "var(--color-bg-inverse)";

  /* Contained editorial row — sits inside the section's --content-max
     wrapper (no 100vw bleed). The row itself is transparent; only the
     device shell carries the neutral field. Text sits on the page's
     warm-white so the words never touch the plate. Zigzag alternation
     preserved via justifyContent. */
  const rowStyle: React.CSSProperties = {
    display:        "flex",
    alignItems:     "center",
    gap:            isMSR ? "clamp(32px, 4vw, 64px)" : "clamp(40px, 6vw, 100px)",
    justifyContent: imageOnRight ? "flex-end" : "flex-start",
    background:     "transparent",
    padding:        0,
    textDecoration: "none",
    color:          "inherit",
    cursor:         "default",
  };

  /* The shell now carries the neutral field — the "plate" behind the
     device. Sharp corners, generous padding so the field shows around
     the device chrome (that visible margin IS the bounce). Device stays
     its declared width via box-sizing:content-box so the plate grows
     around it rather than compressing it. */
  const shellStyle: React.CSSProperties = {
    display:      "block",
    background:   shellBg,
    padding:      shellPadding,
    borderRadius: 0,
    boxSizing:    "content-box",
    order:        imageOnRight ? 2 : 0,
    textDecoration: "none",
    color:        "inherit",
    transition:   "transform 0.3s ease",
    transform:    hovered && isLive ? "translateY(-3px)" : "translateY(0)",
    flex:         "0 0 auto",
    ...(isSpotify  && { width: "360px", maxWidth: "34vw" }),
    ...(isWayfarer && { width: "340px", maxWidth: "30vw" }),
    ...(isMSR      && { width: "620px", maxWidth: "50vw", padding: "clamp(6px, 0.8vw, 10px) clamp(6px, 0.8vw, 10px)" }),
    ...(isAiga     && { width: "400px", maxWidth: "34vw" }),
    ...(isABD      && { width: "440px", maxWidth: "42vw" }),
  };

  const imgBox: React.CSSProperties = {
    position:     "relative",
    width:        "100%",
    aspectRatio:  imgAspect,
    overflow:     "hidden",
    background:   "transparent",
  };

  /* The image gets wrapped in a Link if the project is live, so the
     device mockup itself is the clickable target. The title block is NOT
     clickable — only the image and the "View Case Study" link below are. */
  const imageInner = (
    <>
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
    </>
  );

  const imageBlock = isLive ? (
    <Link
      href={project.href!}
      aria-label={`${project.title} case study`}
      style={shellStyle}
      className="work-row-image"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={imgBox}>{imageInner}</div>
    </Link>
  ) : (
    <div
      style={shellStyle}
      className="work-row-image"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={imgBox}>{imageInner}</div>
    </div>
  );

  /* Editorial content block — same shape for every project: thesis
     (display), deck (body), View Case Study link. No eyebrow, no
     interactive-prototype pill, no photo credit — restraint per brand. */
  const contentBlock = (
    <div
      className="work-row-content"
      style={{
        order:    imageOnRight ? 1 : 2,
        maxWidth: "640px",
      }}
    >
      <h3
        className="work-row-thesis"
        style={{
          fontFamily:    "var(--font-dm-sans), sans-serif",
          fontSize:      "clamp(28px,3vw,40px)",
          fontWeight:    500,
          color:         "var(--color-navy)",
          margin:        "0 0 24px",
          letterSpacing: "-0.02em",
          lineHeight:    1.05,
        }}
      >
        {project.thesis}
      </h3>

      {/* Deck — magazine-style subhead carrying the constraint or method
          beneath the thesis. The thesis is the insight; the deck is what
          a recruiter needs to see next. */}
      {project.deck ? (
        <p
          className="work-row-deck"
          style={{
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "17px",
            fontWeight:    400,
            color:         "var(--color-neutral-600)",
            margin:        "0 0 32px",
            letterSpacing: "0",
            lineHeight:    1.4,
            maxWidth:      "560px",
          }}
        >
          {project.deck}
        </p>
      ) : null}

      {isLive ? (
        /* View-case-study CTA. The DS LinkArrow handles the arrow-nudge
           on hover/focus via .ui-linkarrow styles in globals.css, so the
           per-instance onMouseEnter/onFocus hover state that drove a
           JS translate is no longer needed. The link's accessible name
           comes from its children ("View case study"). The image above
           already carries a project-specific aria-label, so assistive
           tech can still land on the correct case study by link. */
        <LinkArrow href={project.href!} tone="on-light">
          View case study
        </LinkArrow>
      ) : (
        <p style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize:   "var(--text-small)",
          color:      "var(--color-neutral-500)",
          margin:     0,
        }}>
          Case study in progress
        </p>
      )}
    </div>
  );

  /* Row is a plain div. Hover state lives on the image and the View
     Case Study link only — reading the thesis or deck does not trigger
     the pause, the pill reveal, or the shell lift. */
  return (
    <div className="work-row" style={rowStyle}>
      {imageBlock}
      {contentBlock}
    </div>
  );
}

