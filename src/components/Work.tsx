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
}

/* Order: Spotify → Wayfarer → MSR → ABD UI.
   MSR is already the hero (13× over the live site), so leading with it again
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
    thesis:      "People are reaching for affordances that don't exist yet.",
    deck:        "Pin · Remove · Pause. Three reversible controls. Each one completes in one or two taps.",
    meta:        "DESIGNER · 2026 · CONCEPT",
    tags:        ["Feature design", "Interaction model", "Constraint mapping"],
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
    thesis:      "Travel content is invitation, not data.",
    deck:        "Homepage as editorial cover, not a directory. Discovery through a globe and curated cards.",
    meta:        "DESIGNER · 2026 · LIVE",
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
    deck:        "Diagnostic-first resource for men over 40. Live since April. 13× return-visits on the results page.",
    meta:        "DESIGNER · 2026 · LIVE SINCE APRIL",
    tags:        ["Brand Identity", "Content UX", "Editorial"],
    year:        "2026",
    status:      "live",
    href:        "/work/mens-sole-revival",
    image:       "/cs-msr-preview.jpg",
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
  //   meta:        "DESIGN SYSTEM · LIVE · ONGOING",
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
        padding:    "clamp(80px, 9vw, 128px) clamp(32px, 6vw, 80px)",
        background: "#FFFFFF",
        borderTop:  "1px solid rgba(0, 0, 0, 0.06)",
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
            marginBottom:   "28px",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "clamp(28px, 4vw, 48px)",
                fontWeight:    600,
                color:         "#252B28",
                margin:        "0 0 12px",
                letterSpacing: "-0.025em",
                lineHeight:    1.1,
              }}
            >
              Selected Work
            </h2>
            <p
              style={{
                fontFamily:   "var(--font-dm-sans), sans-serif",
                fontSize:     "clamp(15px, 1.4vw, 17px)",
                lineHeight:   1.55,
                color:        "#5A5752",
                margin:       0,
                maxWidth:     "620px",
              }}
            >
              Three projects, three different problems. A concept scoped like a hire, a live product built like a concept, and a live product with the receipts.
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
            gap:            "clamp(64px, 8vw, 120px)",
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
            gap: clamp(24px, 5vw, 36px) !important;
            justify-content: flex-start !important;
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
          /* Tag pills stay visible on mobile so the capability taxonomy
             is scannable at first paint — desktop hides them behind a
             hover reveal, but touch has no hover. */
          .work-row .work-tag-pills {
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
            transform: none !important;
            margin-top: 12px !important;
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

  // Editorial row — flex layout, device and thesis sit close together.
  // The row alignment alternates left/right via imageOnRight (passed in
  // by index parity at the call site).
  const rowStyle: React.CSSProperties = {
    display:        "flex",
    width:          "100%",
    alignItems:     "center",
    gap:            "clamp(40px, 5vw, 80px)",
    justifyContent: imageOnRight ? "flex-end" : "flex-start",
    textDecoration: "none",
    color:          "inherit",
    cursor:         "default",
  };

  /* Per-project aspect ratio: MSR (landscape MacBook) stays 16:10 so the
     laptop reads landscape; Wayfarer and Spotify use 4:5 so portrait iPad /
     iPhone fill the frame the same way the hero iPad does. */
  /* imgBox aspect matches each device's natural visible aspect so the
     gray shell hugs the chrome (no transparent dead space). */
  const imgAspect = isMSR     ? "4 / 3"
                  : isWayfarer ? "4 / 5"
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
     of three template instances. */
  /* All three case-study rows share the same radial rhythm now:
     ellipse anchored slightly-high-center, ~30 units of lightness
     spread from center to edge. Prior Spotify gradient was too tight
     to read as radial; prior Wayfarer was solid. Palettes stay
     brand-anchored (Spotify Jet, Wayfarer navy, MSR neutral gray). */
  const shellBg = isSpotify
    ? "radial-gradient(ellipse 80% 60% at 50% 35%, #2E2E2E 0%, #181818 60%, #0A0A0A 100%)"
    : isWayfarer
    /* Wayfarer row: SOLID #1F1C3B — the exact hex the video's baked
       backdrop uses in every sampled edge pixel (ffmpeg + PIL).
       Any radial with a lifted center reads as purple-inside-navy;
       matching the video exactly makes shell + video read as one
       continuous field. */
    ? "#1F1C3B"
    : isMSR
    /* MSR row: dark neutral gray gradient. The MacBook Pro's Space
       Black chassis was disappearing against warm ink #13100C; a
       medium-dark gray backdrop lets the device silhouette read
       cleanly. Keeps the radial rhythm the Spotify row uses. */
    ? "radial-gradient(ellipse 80% 60% at 50% 35%, #4A4A4A 0%, #333333 60%, #262626 100%)"
    : isABD
    /* ABD UI: dark slate ground with cyan-ink center so the system
       screenshot reads as software-on-display, not a fourth case-
       study template instance. */
    ? "radial-gradient(ellipse 80% 60% at 50% 35%, #1B2228 0%, #14181A 60%, #0F1316 100%)"
    : "#F5F5F4";

  const shellStyle: React.CSSProperties = {
    display:      "block",
    background:   shellBg,
    padding:      shellPadding,
    borderRadius: 0,
    order:        imageOnRight ? 2 : 0,
    textDecoration: "none",
    color:        "inherit",
    transition:   "transform 0.3s ease",
    transform:    hovered && isLive ? "translateY(-3px)" : "translateY(0)",
    /* Per-project shell width. Each device gets a footprint sized to its
       editorial showroom — iPhone smallest, iPad mid, MBP largest. Using
       flex shorthand (grow 0, shrink 1, basis = target width) so the shell
       actually claims its declared width inside the flex row, then can
       shrink at narrower viewports. */
    ...(isSpotify  && { width: "460px", maxWidth: "100%" }),
    ...(isWayfarer && { width: "540px", maxWidth: "100%" }),
    ...(isMSR      && { width: "540px", maxWidth: "100%" }),
    ...(isABD      && { width: "540px", maxWidth: "100%" }),
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

  /* Editorial mockup (Spotify only for now): number eyebrow, thesis as
     display headline, project title demoted to a small label, no tag pills.
     The other rows keep the original title + subtitle + tags layout until
     we decide whether to roll this pattern out across all three. */
  /* Per-project eyebrow carries info the thesis doesn't (category +
     year), keeping the project name out so the eyebrow isn't a redundant
     label for what the thesis already implies. */
  const eyebrowLabel = isSpotify   ? "Interaction Study · 2026"
                     : isWayfarer ? "Travel Discovery · 2026 · Live"
                     : isMSR      ? "Foot Health Editorial · 2026 · Live"
                     : project.meta;

  const editorialEyebrow = (
    <div style={{
      fontFamily:     "var(--font-dm-sans), sans-serif",
      fontSize:       "11px",
      fontWeight:     600,
      letterSpacing:  "0.18em",
      textTransform:  "uppercase",
      color:          "#5A5752",
      marginBottom:   "28px",
    }}>
      {eyebrowLabel}
    </div>
  );

  /* Editorial content block — same shape for every project so the section
     reads as three magazine spreads, not three template instances.
     Eyebrow + thesis (display weight) + hover-revealed pills + crimson
     View Case Study CTA. */
  const contentBlock = (
    <div
      className="work-row-content"
      style={{
        order:    imageOnRight ? 1 : 2,
        maxWidth: "560px",
      }}
    >
      {editorialEyebrow}

      <p style={{
        fontFamily:    "var(--font-dm-sans), sans-serif",
        fontSize:      "clamp(28px, 3.4vw, 44px)",
        fontWeight:    500,
        color:         "#252B28",
        margin:        "0 0 18px",
        letterSpacing: "-0.03em",
        lineHeight:    1.1,
      }}>
        {project.thesis}
      </p>

      {/* Deck — magazine-style subhead carrying the constraint or method
          beneath the thesis. The thesis is the insight; the deck is what
          a recruiter needs to see next. */}
      {project.deck ? (
        <p style={{
          fontFamily:    "var(--font-dm-sans), sans-serif",
          fontSize:      "clamp(16px, 1.5vw, 20px)",
          fontWeight:    400,
          color:         "#5A5752",
          margin:        "0 0 28px",
          letterSpacing: "-0.005em",
          lineHeight:    1.45,
          maxWidth:      "560px",
        }}>
          {project.deck}
        </p>
      ) : null}

      {/* Hover-revealed pills — payoff for closer attention. Reserved
          space prevents layout shift; opacity + transform animate only.
          Hidden on mobile (no hover) so the View Case Study link sits
          right under the deck instead of after dead air. */}
      <div
        className="work-tag-pills"
        aria-hidden={!hovered}
        style={{
          display:      "flex",
          gap:          "8px",
          flexWrap:     "wrap",
          marginBottom: "28px",
          opacity:      hovered ? 1 : 0,
          transform:    hovered ? "translateY(0)" : "translateY(6px)",
          transition:   "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
        {project.tags.map((tag) => (
          <span key={tag} style={{
            fontFamily:   "var(--font-dm-sans), sans-serif",
            fontSize:     "13px",
            padding:      "6px 14px",
            background:   "#F5F5F4",
            color:        "#252B28",
            fontWeight:   400,
            border:       "1px solid #6E6E6A",
          }}>
            {tag}
          </span>
        ))}
      </div>

      {isLive ? (
        <Link
          href={project.href!}
          aria-label={`View ${project.title} case study`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          style={{
            display:        "inline-flex",
            alignItems:     "center",
            gap:            "10px",
            color:          "var(--color-brand)",
            fontFamily:     "var(--font-dm-sans), sans-serif",
            fontSize:       "14px",
            fontWeight:     500,
            letterSpacing:  "0.02em",
            textDecoration: "none",
            opacity:        hovered ? 1 : 0.85,
            transition:     "opacity 0.25s ease",
          }}
        >
          View Case Study
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
            style={{ transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "transform 0.25s ease" }}
          >
            <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      ) : (
        <p style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize:   "13px",
          color:      "#5A5752",
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

