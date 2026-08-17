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
    atmosphere: {
      /* Spotify Jet, radial-anchored slightly-high-center. Raw hex is a
         per-case brand nod intentionally kept outside the token layer. */
      shellBg: "radial-gradient(ellipse 80% 60% at 50% 35%, #2E2E2E 0%, #181818 60%, #0A0A0A 100%)",
    },
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
    atmosphere: {
      /* Wayfarer row: darker cool ground-navy so the iPad sits on a
         distinct atmosphere rather than the video's baked navy filling
         the whole panel. WayfarerGlobePeek masks the video's baked
         #1F1C3B edges via a radial mask, so this ground shows through
         the video's periphery. */
      shellBg: "var(--color-bg-inverse)",
    },
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
    atmosphere: {
      /* MSR row: dark neutral gray gradient so the MacBook Pro's Space
         Black chassis reads cleanly (warm ink #13100C was swallowing
         the silhouette). Keeps the radial rhythm the Spotify row uses. */
      shellBg: "radial-gradient(ellipse 80% 60% at 50% 35%, #4A4A4A 0%, #333333 60%, #262626 100%)",
    },
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
        padding:    "clamp(48px, 6vw, 80px) clamp(32px, 6vw, 80px) clamp(80px, 9vw, 128px)",
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
                fontSize:      "clamp(28px,4vw,40px)",
                fontWeight:    500,
                color:         "var(--color-text)",
                margin:        0,
                letterSpacing: "-0.01em",
                lineHeight:    1.1,
              }}
            >
              Work
            </h2>
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
            gap:            0,
          }}
        >
          {projects.map((project, idx) => (
            <div key={project.title} className="scroll-reveal">
              <ProjectCard project={project} index={idx} imageOnRight={idx % 2 === 1} />
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
  const isABD      = project.title === "ABD UI";

  /* Per-project aspect ratio: MSR (landscape MacBook) stays 16:10 so the
     laptop reads landscape; Wayfarer and Spotify use 4:5 so portrait iPad /
     iPhone fill the frame the same way the hero iPad does. */
  /* imgBox aspect matches each device's natural visible aspect so the
     gray shell hugs the chrome (no transparent dead space). */
  const imgAspect = isMSR     ? "4 / 3"
                  : isWayfarer ? "3 / 4"
                  : isSpotify  ? "2 / 3"
                  : isABD      ? "16 / 10"
                  : "16 / 10";

  /* MSR gets ~10% more vertical padding so the MBP has extra breathing room
     top and bottom inside the gray showroom. Horizontal stays the same so
     the gray still hugs the laptop on the sides. */
  const shellPadding = isMSR
    ? "clamp(20px, 2.4vw, 40px) clamp(6px, 0.6vw, 10px)"
    : isWayfarer
    /* Asymmetric padding: extra top/bottom so the iPad shell matches the
       iPhone shell's overall height, even sides for visible dark breathing
       around the chrome. */
    ? "clamp(34px, 3.2vw, 41px) clamp(20px, 2.4vw, 30px)"
    : "clamp(6px, 0.6vw, 10px)";

  /* Per-project brand-anchored backdrop. Each row gets its own
     atmosphere so the section reads as three editorial spreads instead
     of three template instances. Palettes stay brand-anchored
     (Spotify Jet, Wayfarer navy, MSR neutral gray, ABD slate) and are
     declared on each project entry via `atmosphere.shellBg` — see the
     per-project data at the top of the file. Falls back to per-case
     ternaries (kept for the commented-out ABD entry) then neutral-100
     for any future entry that ships without an atmosphere. */
  const shellBg = project.atmosphere?.shellBg
    ?? (isABD
      /* ABD UI: dark slate ground with cyan-ink center so the system
         screenshot reads as software-on-display, not a fourth case-
         study template instance. Raw hex is a per-case brand nod. */
      ? "radial-gradient(ellipse 80% 60% at 50% 35%, #1B2228 0%, #14181A 60%, #0F1316 100%)"
      : "var(--color-neutral-100)");

  /* Full-bleed editorial row (Option B) — each project becomes its own
     cinematic 100vw panel. The row escapes the section's horizontal
     padding via calc(50% - 50vw) negative margins, and the per-project
     brand-anchored gradient (previously on the device shell only) now
     paints the entire panel. Zigzag alternation is preserved through
     justifyContent driven by imageOnRight. */
  /* MSR row hugs its content: the landscape MacBook is already the widest
     shell in the section, so the panel tightens (padding, min-height, and
     the image↔text gap) to close the inner spacing toward the margins. */
  const rowStyle: React.CSSProperties = {
    display:        "flex",
    alignItems:     "center",
    gap:            isMSR ? "clamp(32px, 4vw, 64px)" : "clamp(40px, 6vw, 100px)",
    justifyContent: imageOnRight ? "flex-end" : "flex-start",
    background:     shellBg,
    minHeight:      isMSR ? "clamp(560px, 62vh, 760px)" : "clamp(720px, 80vh, 960px)",
    padding:        isMSR
      ? "clamp(48px, 6vw, 88px) max(clamp(40px, 5vw, 80px), calc((100vw - var(--content-max)) / 2))"
      : "clamp(80px, 10vw, 160px) max(clamp(48px, 8vw, 120px), calc((100vw - var(--content-max)) / 2))",
    marginLeft:     "calc(50% - 50vw)",
    marginRight:    "calc(50% - 50vw)",
    textDecoration: "none",
    color:          "inherit",
    cursor:         "default",
  };

  /* The shell background is now transparent — the row's shellBg paints
     the whole panel, so the shell only carries its per-device padding
     for chrome breathing room. flex:0 0 auto keeps the shell at its
     declared width; maxWidth caps it at ~45–50vw so the content column
     always has room to breathe on wide viewports. */
  const shellStyle: React.CSSProperties = {
    display:      "block",
    background:   "transparent",
    padding:      shellPadding,
    borderRadius: 0,
    order:        imageOnRight ? 2 : 0,
    textDecoration: "none",
    color:        "inherit",
    transition:   "transform 0.3s ease",
    transform:    hovered && isLive ? "translateY(-3px)" : "translateY(0)",
    flex:         "0 0 auto",
    ...(isSpotify  && { width: "460px", maxWidth: "45vw" }),
    ...(isWayfarer && { width: "440px", maxWidth: "40vw" }),
    ...(isMSR      && { width: "720px", maxWidth: "58vw" }),
    ...(isABD      && { width: "540px", maxWidth: "50vw" }),
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
      <h2
        className="work-row-thesis"
        style={{
          fontFamily:    "var(--font-dm-sans), sans-serif",
          fontSize:      "clamp(28px,3vw,40px)",
          fontWeight:    500,
          color:         "var(--color-inverse)",
          margin:        "0 0 24px",
          letterSpacing: "-0.02em",
          lineHeight:    1.05,
        }}
      >
        {project.thesis}
      </h2>

      {/* Deck — magazine-style subhead carrying the constraint or method
          beneath the thesis. The thesis is the insight; the deck is what
          a recruiter needs to see next. */}
      {project.deck ? (
        <p
          className="work-row-deck"
          style={{
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "clamp(15px,1.6vw,20px)",
            fontWeight:    400,
            color:         "var(--color-inverse-body)",
            margin:        "0 0 32px",
            letterSpacing: "0",
            lineHeight:    1.5,
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
        <LinkArrow href={project.href!} tone="on-dark">
          View case study
        </LinkArrow>
      ) : (
        <p style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize:   "12px",
          color:      "var(--color-inverse-muted)",
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

