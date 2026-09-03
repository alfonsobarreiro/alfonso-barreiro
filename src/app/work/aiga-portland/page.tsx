import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RelatedCaseStudies from "@/components/RelatedCaseStudies";
import ScrollProgress from "@/components/ScrollProgress";
import StickyArcNavInit from "@/components/StickyArcNavInit";
import { CaseStudySchema } from "@/components/structured-data/CaseStudySchema";
import { BreadcrumbSchema } from "@/components/structured-data/BreadcrumbSchema";

/* ---------------------------------------------------------------------------
   /work/aiga-portland

   Micro case study for the Portland Design Month 2026 landing page,
   designed and built as a volunteer for AIGA Portland. Same Pentagram
   template pattern as MSR / Wayfarer / Spotify: Premise / Research /
   Decisions / Details, with Callout(Decision / Why / Cost) as the
   signature element.

   Voice: matches shipped copy conventions from the other three cases.
   No em-dashes, no semicolons, short declarative sentences.
--------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: { absolute: "Portland Design Month 2026 · AIGA Portland · Alfonso Barreiro" },
  description:
    "Volunteer case study: designed and built the AIGA Portland Design Month 2026 landing page in Squarespace. Custom CSS and page-scoped JS carried the artist's brand system past the platform's defaults.",
  alternates: { canonical: "https://www.barreiro.com/work/aiga-portland" },
  openGraph: {
    type: "article",
    url: "https://www.barreiro.com/work/aiga-portland",
    title: "Portland Design Month 2026 · AIGA Portland",
    description:
      "Volunteer case study: designed and built the AIGA Portland Design Month 2026 landing page in Squarespace. Custom CSS and page-scoped JS carried the artist's brand system past the platform's defaults.",
    images: ["/work/aiga-portland/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portland Design Month 2026 · AIGA Portland",
    description:
      "Volunteer case study: designed and built the AIGA Portland Design Month 2026 landing page in Squarespace. Custom CSS and page-scoped JS carried the artist's brand system past the platform's defaults.",
    images: ["/work/aiga-portland/opengraph-image"],
  },
};

const c = {
  surface:       "var(--color-paper)",
  ink:           "var(--color-text)",
  ink2:          "var(--color-neutral-700)",
  muted:         "var(--color-neutral-600)",
  brand:         "var(--color-brand)",
  accent:        "var(--color-accent)",
  accent2:       "var(--color-accent-hover)",
  border:        "var(--color-neutral-400)",
  borderStrong:  "var(--color-neutral-500)",
  callout:       "var(--color-neutral-50)",
};

const font = { sans: "var(--font-dm-sans), -apple-system, sans-serif" };

const SECTION_X = "clamp(32px, 6vw, 80px)";
const CONTENT_MAX = "var(--content-max)";
const PROSE_MAX   = "680px";

const LIVE_URL = "https://www.aigapdx.org/portland-design-month-2026";

/* ---------- small atoms ---------- */

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily:    font.sans,
      fontSize:      "var(--text-small)",
      fontWeight:    500,
      letterSpacing: "0.01em",
      textTransform: "none",
      color:         c.ink2,
      padding:       "6px 14px",
      border:        `1px solid ${c.borderStrong}`,
    }}>
      {children}
    </span>
  );
}

function Callout({
  decision, why, cost,
}: { decision: string; why: string; cost: string }) {
  const labelStyle: React.CSSProperties = {
    fontFamily:    font.sans,
    fontSize:      "var(--text-small)",
    fontWeight:    500,
    letterSpacing: "0.01em",
    textTransform: "none",
    color:         c.accent,
    margin:        "0 0 10px",
  };
  const bodyStyle: React.CSSProperties = {
    fontFamily: font.sans,
    fontSize:   "var(--text-body)",
    lineHeight: 1.6,
    color:      c.ink2,
    margin:     0,
  };
  return (
    <aside className="aiga2-callout" style={{
      background:   "#FFFFFF",
      border:       `1px solid ${c.border}`,
      padding:      "32px 36px 32px 44px",
      maxWidth:     "760px",
      marginTop:    "40px",
      position:     "relative",
    }}>
      <span aria-hidden="true" style={{
        position: "absolute", left: 0, top: 28, bottom: 28,
        width: "5px",
        display: "grid",
        gridTemplateRows: "1fr 1fr 1fr",
      }}>
        <span style={{ background: c.brand }} />
        <span style={{ background: c.accent }} />
        <span style={{ background: c.ink }} />
      </span>
      <p style={labelStyle}>Decision</p>
      <p style={{
        fontFamily:    font.sans,
        fontSize:      "clamp(20px,2.2vw,28px)",
        fontWeight:    500,
        color:         c.ink,
        margin:        "0 0 28px",
        letterSpacing: "-0.01em",
        lineHeight:    1.15,
      }}>
        {decision}
      </p>
      <div className="aiga2-callout-grid" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "32px",
      }}>
        <div>
          <p style={labelStyle}>Why</p>
          <p style={bodyStyle}>{why}</p>
        </div>
        <div>
          <p style={labelStyle}>Cost</p>
          <p style={bodyStyle}>{cost}</p>
        </div>
      </div>
    </aside>
  );
}

function HeroImage({
  src, alt, cropAspect, priority = false,
}: { src: string; alt: string; cropAspect?: string | null; priority?: boolean }) {
  if (cropAspect) {
    return (
      <div style={{
        width:        "100%",
        maxWidth:     CONTENT_MAX,
        margin:       "0 auto",
        aspectRatio:  cropAspect,
        position:     "relative",
        overflow:     "hidden",
        background:   c.ink,
        border:       `1px solid ${c.border}`,
      }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1240px) 100vw, 1240px"
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      </div>
    );
  }
  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
      <Image
        src={src}
        alt={alt}
        width={2880}
        height={1800}
        priority={priority}
        sizes="(max-width: 1240px) 100vw, 1240px"
        style={{
          width:  "100%",
          height: "auto",
          display: "block",
          border:  `1px solid ${c.border}`,
        }}
      />
    </div>
  );
}

/* CSS code card — used as the visual for the Decisions arc.
   Renders a curated excerpt of the PDM 2026 Custom CSS inline as
   real text, not an image. Accessible, copyable, and stays in sync
   if the excerpt is edited later. */
function CustomCSSCard() {
  const codeColor = {
    bg:      "#0F1419",
    header:  "#1A2028",
    border:  "#2A3038",
    text:    "#E5E7EB",
    comment: "#6B7280",
    prop:    "#93C5FD",
    accent:  "#FF6B9D",
    label:   "#B8B4AC",
  };
  const lines: Array<{ kind: "comment" | "sel" | "prop" | "blank"; text: string }> = [
    { kind: "comment", text: "/* PDM 2026 header — kill Squarespace's teal overlays, force black + Sofia Sans */" },
    { kind: "sel",     text: "body.collection-6a84cf4e42d1fc44ecda4bea #header," },
    { kind: "sel",     text: "body.collection-6a84cf4e42d1fc44ecda4bea #header .header-background-solid," },
    { kind: "sel",     text: "body.collection-6a84cf4e42d1fc44ecda4bea #header .header-menu-bg {" },
    { kind: "prop",    text: "  background-color: #101010 !important;" },
    { kind: "prop",    text: "  font-family: 'Sofia Sans', sans-serif !important;" },
    { kind: "sel",     text: "}" },
    { kind: "blank",   text: "" },
    { kind: "comment", text: "/* PDM 2026 calendar — hot pink cells, IntraNet weekday headers */" },
    { kind: "sel",     text: "body.collection-6a84cf4e42d1fc44ecda4bea #page .yui3-calendar-day {" },
    { kind: "prop",    text: "  background-color: rgba(255, 0, 153, 0.55) !important;" },
    { kind: "prop",    text: "  border: 1px solid #1a1a1a !important;" },
    { kind: "sel",     text: "}" },
    { kind: "sel",     text: "body.collection-6a84cf4e42d1fc44ecda4bea #page .yui3-calendar-weekday {" },
    { kind: "prop",    text: "  color: #FF0099 !important;" },
    { kind: "prop",    text: "  font-family: 'IntraNet', sans-serif !important;" },
    { kind: "prop",    text: "  letter-spacing: -0.05em !important;" },
    { kind: "sel",     text: "}" },
  ];
  const colorFor = (k: typeof lines[number]["kind"]) => {
    if (k === "comment") return codeColor.comment;
    if (k === "prop")    return codeColor.prop;
    return codeColor.text;
  };
  return (
    <div style={{
      maxWidth:  CONTENT_MAX,
      margin:    "0 auto",
      background: codeColor.bg,
      border:     `1px solid ${c.border}`,
      overflow:   "hidden",
    }}>
      <div style={{
        background:   codeColor.header,
        padding:      "12px 20px",
        borderBottom: `1px solid ${codeColor.border}`,
        display:      "flex",
        alignItems:   "center",
        gap:          "12px",
      }}>
        <span aria-hidden="true" style={{
          display:       "inline-block",
          width:         8, height: 8,
          background:    codeColor.accent,
          borderRadius:  0,
        }} />
        <span style={{
          fontFamily:    "ui-monospace, 'SF Mono', Menlo, monospace",
          fontSize:      12,
          color:         codeColor.label,
          letterSpacing: "0.02em",
        }}>
          Excerpt · Custom CSS · scoped to the PDM 2026 collection ID
        </span>
      </div>
      <pre style={{
        margin:      0,
        padding:     "clamp(20px, 3vw, 32px)",
        fontFamily:  "ui-monospace, 'SF Mono', Menlo, monospace",
        fontSize:    "clamp(11px, 1.05vw, 14px)",
        lineHeight:  1.7,
        color:       codeColor.text,
        overflowX:   "auto",
      }}>
        <code>
          {lines.map((l, i) => (
            <span key={i} style={{ color: colorFor(l.kind), display: "block", minHeight: "1.7em" }}>
              {l.text || " "}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

function MetaCell({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p style={{
        fontFamily:    font.sans,
        fontSize:      "var(--text-small)",
        fontWeight:    500,
        letterSpacing: "0.01em",
        textTransform: "none",
        color:         c.accent,
        margin:        "0 0 8px",
      }}>{label}</p>
      <p style={{
        fontFamily: font.sans,
        fontSize:   "var(--text-body)",
        lineHeight: 1.5,
        color:      c.ink,
        margin:     0,
      }}>{value}</p>
    </div>
  );
}

/* BigThree — image + heading + body + callout. Matches MSR / Wayfarer /
   Spotify pattern for major section presentation. */
function BigThree({
  heading, image, imageAlt, imageCrop, body, callout,
}: {
  heading: string;
  image: string;
  imageAlt: string;
  imageCrop: string | null;
  body: React.ReactNode;
  callout: { decision: string; why: string; cost: string };
}) {
  return (
    <section aria-label={heading} style={{ padding: `0 0 120px` }}>
      <div style={{ padding: `0 ${SECTION_X} 64px` }}>
        <HeroImage src={image} alt={imageAlt} cropAspect={imageCrop} />
      </div>
      <div style={{ padding: `0 ${SECTION_X}` }}>
        <div style={{
          maxWidth:             CONTENT_MAX,
          margin:               "0 auto",
          display:              "grid",
          gridTemplateColumns:  "1fr 1.6fr",
          gap:                  "64px",
          alignItems:           "start",
        }} className="aiga2-row">
          <div>
            <h2 style={{
              fontFamily:    font.sans,
              fontSize:      "clamp(28px,4vw,60px)",
              fontWeight:    500,
              color:         c.ink,
              margin:        0,
              letterSpacing: "-0.02em",
              lineHeight:    1.1,
            }}>
              {heading}.
            </h2>
          </div>
          <div>
            <p style={{
              fontFamily: font.sans,
              fontSize:   "clamp(15px,1.6vw,17px)",
              lineHeight: 1.6,
              color:      c.ink2,
              margin:     0,
              maxWidth:   PROSE_MAX,
            }}>
              {body}
            </p>
            <Callout {...callout} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Then vs. now — 2025 next to 2026 ----------
   Sits in the Premise arc below "The problem" as visual proof:
   last year's page inherited AIGA's default look; this year's
   breaks away with the artist's brand system. */
function ThenVsNow() {
  const label: React.CSSProperties = {
    fontFamily:    font.sans,
    fontSize:      "var(--text-small)",
    fontWeight:    500,
    color:         c.accent,
    letterSpacing: "0.01em",
    textTransform: "none",
    margin:        "0 0 6px",
  };
  const title: React.CSSProperties = {
    fontFamily:    font.sans,
    fontSize:      "var(--text-body)",
    color:         c.ink,
    fontWeight:    500,
    margin:        0,
    letterSpacing: "0",
  };
  const note: React.CSSProperties = {
    fontFamily: font.sans,
    fontSize:   "var(--text-body)",
    lineHeight: 1.5,
    color:      c.ink2,
    margin:     "10px 0 0",
  };
  const cells = [
    {
      label: "2025 · Then",
      title: "The page inherited AIGA’s default look.",
      note:  "Same nav, same type stack, same button treatments as the rest of aigapdx.org. Read as a chapter page, not a festival.",
      img:   "/images/work/aiga-portland/then-2025-b.jpg",
      alt:   "The archived 2025 Portland Design Month landing page, top two sections.",
    },
    {
      label: "2026 · Now",
      title: "The artist’s brand runs the page end-to-end.",
      note:  "IntraNet display type, hot pink on ink, sharp corners, floral ornaments. Reads as its own festival with a distinct visual voice.",
      img:   "/images/work/aiga-portland/then-2026-b.jpg",
      alt:   "The 2026 Portland Design Month landing page, top two sections.",
    },
  ];
  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto", padding: `0 ${SECTION_X}` }}>
      {/* Flexbox with explicit 50% widths — no gap, no padding, no margin
          on children so the two images sit truly flush against each other. */}
      <div className="aiga2-then-now" style={{
        display:     "flex",
        flexWrap:    "wrap",
        alignItems:  "flex-start",
        columnGap:   "32px",
        rowGap:      0,
        margin:      0,
        padding:     0,
      }}>
        {cells.map((it, idx) => (
          <div key={it.label} style={{
            width:      "calc(50% - 16px)",
            flex:       "0 0 calc(50% - 16px)",
            minWidth:   0,
            margin:     0,
            padding:    0,
            boxSizing:  "border-box",
          }}>
            <img
              src={it.img}
              alt={it.alt}
              style={{
                display:     "block",
                width:       "100%",
                height:      "auto",
                margin:      0,
                padding:     0,
                border:      0,
                verticalAlign: "top",
              }}
            />
            <p style={{ ...label, marginTop: "20px" }}>{it.label}</p>
            <p style={title}>{it.title}</p>
            <p style={note}>{it.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Research strip (two artifacts, no eyebrows) ---------- */
function ResearchStrip() {
  const stepTitle: React.CSSProperties = {
    fontFamily:    font.sans,
    fontSize:      "clamp(20px, 2vw, 24px)",
    color:         c.ink,
    fontWeight:    500,
    margin:        0,
    letterSpacing: "-0.01em",
    lineHeight:    1.2,
  };
  const stepNote: React.CSSProperties = {
    fontFamily: font.sans,
    fontSize:   "var(--text-body)",
    lineHeight: 1.55,
    color:      c.ink2,
    margin:     "12px 0 0",
    maxWidth:   "52ch",
  };

  const item = {
    title: "The artist’s brand guide",
    note:  "A full Figma working styleguide from the brand artist: display type, body face, color, ornaments, poster system. The source of truth for everything visual on the page.",
    img:   "/images/work/aiga-portland/source-artist-brand-3625.jpg",
    alt:   "Screenshot of the artist's brand styleguide Figma file with type samples, color, and poster system.",
  };

  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto", padding: `0 ${SECTION_X}` }}>
      <div>
        <div style={{
          aspectRatio: "16 / 10",
          border:      `1px solid ${c.border}`,
          background:  "#101010",
          overflow:    "hidden",
          position:    "relative",
          marginBottom: "24px",
        }}>
          <Image
            src={item.img}
            alt={item.alt}
            fill
            sizes="(max-width: 1240px) 100vw, 1240px"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div style={{
          display:             "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap:                 "48px",
          alignItems:          "start",
        }} className="aiga2-research-strip">
          <p style={{ ...stepTitle, fontSize: "clamp(24px, 2.6vw, 32px)" }}>{item.title}</p>
          <p style={{ ...stepNote, fontSize: "clamp(15px, 1.6vw, 17px)" }}>{item.note}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Shipped stack (six vignettes, full-width image + text below) ---------- */
function ShippedStack() {
  const items: { heading: string; body: string; platform: string; img: string; alt: string }[] = [
    {
      heading: "Hero mosaic",
      body: "Three event photos from PDM 2025 in a mosaic on the right side of the purple hero. Each one tilted a few degrees for a snapshot feel. Built by the AIGA Portland Web Chair, not me.",
      platform: "Fluid Engine defaults to a strict grid and rounded corners. Per-block Transform in the editor panel handled the tilts one image at a time. A global sharp-corner rule kept the frames clean.",
      img: "/images/work/aiga-portland/hero-mosaic-3625.jpg",
      alt: "Three tilted event photos from PDM 2025 on the purple hero gradient.",
    },
    {
      heading: "Calendar of events",
      body: "Hot pink cells on black. IntraNet weekday headers. Event days get a transparent ink overlay with the date pinned top-right in white. A short JS routine auto-advances the calendar to October 2026 on page load. Built by the other Web Volunteer on the team, not me.",
      platform: "The calendar plugin runs on YUI3 with no theming primitives exposed. Every custom style meant tracing DOM classes and pinning them with important.",
      img: "/images/work/aiga-portland/calendar-v3-3625.jpg",
      alt: "October 2026 calendar with hot pink cells and IntraNet weekday headers.",
    },
    {
      heading: "Map of events",
      body: "Leaflet-based venue map with every event pinned across Portland. Click a pin to see the venue detail on the right. Built by another teammate, not me. I tuned only the venue-detail typography so it read against the map tiles.",
      platform: "Squarespace has no native venue-map block. The Leaflet embed brought its own tile layer, popover styling, and click-to-detail behavior, all overriding Squarespace's default z-index stack and font cascade.",
      img: "/images/work/aiga-portland/map-v3-3625.jpg",
      alt: "Interactive Leaflet map of Portland with venue pins for Portland Design Month events.",
    },
    {
      heading: "Sponsors marquee",
      body: "Six white sponsor logos scrolling horizontally on an infinite loop. Pause on hover. Edge-fade masks so the strip breathes.",
      platform: "Fluid Engine has no Gallery block that does continuous scroll. iOS Safari also breaks lazy animations without hardware-accelerated transforms. Both got solved in one Code Block.",
      img: "/images/work/aiga-portland/sponsors-marquee-v3-3625.jpg",
      alt: "Sponsor logos scrolling horizontally in a continuous marquee.",
    },
    {
      heading: "Floral ornaments",
      body: "The brand rose and lily placed as decorative marginalia across the Volunteer and Donate blocks. Sized down cleanly across breakpoints.",
      platform: "Squarespace image blocks default to Fill (crop to cell). Switching each to Fit let the flowers stay whole regardless of the cell aspect ratio.",
      img: "/images/work/aiga-portland/ornaments-v3-3625.jpg",
      alt: "Blue lily and red rose illustrations bleeding out of the Volunteer and Donate blocks.",
    },
  ];

  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto", padding: `0 ${SECTION_X}` }}>
      {items.map((it) => (
        <article key={it.heading} style={{
          padding:   "clamp(56px, 6vw, 80px) 0",
        }}>
          {/* Full-width image */}
          <div style={{ marginBottom: "clamp(24px, 3vw, 40px)" }}>
            <Image
              src={it.img}
              alt={it.alt}
              width={1600}
              height={1000}
              sizes="(max-width: 1240px) 100vw, 1240px"
              style={{
                width:  "100%",
                height: "auto",
                display: "block",
                border:  `1px solid ${c.border}`,
              }}
            />
          </div>

          {/* Text row below: heading (left, narrow) + body + platform (right, wider) */}
          <div style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap:                 "48px",
            alignItems:          "start",
          }} className="aiga2-shipped-row">
            <div>
              <h3 style={{
                fontFamily:    font.sans,
                fontSize:      "clamp(24px,2.6vw,32px)",
                fontWeight:    500,
                color:         c.ink,
                margin:        0,
                letterSpacing: "-0.01em",
                lineHeight:    1.15,
              }}>{it.heading}</h3>
            </div>
            <div>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "clamp(15px,1.6vw,17px)",
                lineHeight: 1.6,
                color:      c.ink2,
                margin:     "0 0 20px",
                maxWidth:   PROSE_MAX,
              }}>{it.body}</p>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "var(--text-small)",
                lineHeight: 1.55,
                color:      c.muted,
                margin:     0,
                maxWidth:   PROSE_MAX,
              }} dangerouslySetInnerHTML={{ __html: `<span style="color:${c.accent};font-weight:500;">Platform:</span> ${it.platform}` }} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ---------- Closer: What I cut + What's still open ---------- */
function ClosingArtifacts() {
  const labelStyle: React.CSSProperties = {
    fontFamily:    font.sans,
    fontSize:      "var(--text-small)",
    fontWeight:    500,
    letterSpacing: "0.01em",
    textTransform: "none",
    color:         c.accent,
    margin:        "0 0 10px",
  };
  const bodyStyle: React.CSSProperties = {
    fontFamily: font.sans,
    fontSize:   "var(--text-body)",
    lineHeight: 1.6,
    color:      c.ink2,
    margin:     "0 0 12px",
  };
  return (
    <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto", padding: `0 ${SECTION_X}` }}>
      <div style={{
        display:             "grid",
        gridTemplateColumns: "1fr 1fr",
        gap:                 "32px",
      }} className="aiga2-closer-grid">
        <aside style={{
          background: c.callout,
          border:     `1px solid ${c.border}`,
          borderLeft: `4px solid ${c.brand}`,
          padding:    "28px 32px",
        }}>
          <p style={labelStyle}>What I cut</p>
          <p style={bodyStyle}>
            Cross-page interaction effects. RGB glitch on hover, cursor-following spotlight, image rotation cycles. All tested. All read as designer-showing-off against a volunteer festival page. Cut in favor of the Web Chair’s hero mosaic with artist flourishes.
          </p>
          <p style={{ ...bodyStyle, margin: 0 }}>
            Custom typography for the map plugin’s own zoom controls. The Leaflet integration renders inside a boundary I couldn’t reach cleanly. Left as-is.
          </p>
        </aside>
        <aside style={{
          background: c.callout,
          border:     `1px solid ${c.border}`,
          borderLeft: `4px solid ${c.accent}`,
          padding:    "28px 32px",
        }}>
          <p style={labelStyle}>What’s still open</p>
          <p style={bodyStyle}>
            The map plugin emits mis-encoded punctuation. Middle-dots render as `¬†¬∑¬†` in the venue header. Traced to the plugin’s own JS, not Squarespace. Flagged with the plugin maintainer.
          </p>
          <p style={{ ...bodyStyle, margin: 0 }}>
            Stewardship. The Custom CSS is documented in the chapter vault, but the next volunteer will still need to grok it. Trade for the fidelity.
          </p>
        </aside>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function AIGAPortland() {
  return (
    <>
      <Nav />
      <CaseStudySchema
        name="Portland Design Month 2026 · AIGA Portland"
        description="Volunteer case study: designed and built the AIGA Portland Design Month 2026 landing page in Squarespace. Custom CSS and page-scoped JS carried the artist's brand system past the platform's defaults."
        slug="aiga-portland"
        dateCreated="2026-08"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.barreiro.com/" },
          { name: "Work", url: "https://www.barreiro.com/#work" },
          { name: "Portland Design Month 2026 · AIGA Portland", url: "https://www.barreiro.com/work/aiga-portland" },
        ]}
      />

      <main id="main-content" style={{ background: c.surface, paddingTop: "72px" }}>

        {/* Title block */}
        <header style={{
          padding: `clamp(56px, 12vw, 120px) ${SECTION_X} clamp(40px, 8vw, 80px)`,
        }}>
          <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
            <h1 style={{
              fontFamily:    font.sans,
              fontSize:      "clamp(40px,4.8vw,60px)",
              fontWeight:    500,
              color:         c.ink,
              margin:        "0 0 24px",
              letterSpacing: "-0.02em",
              lineHeight:    1.1,
            }}>
              Portland Design Month 2026
            </h1>

            <p style={{
              fontFamily: font.sans,
              fontSize:   "var(--text-article)",
              lineHeight: 1.6,
              fontWeight: 400,
              color:      c.ink,
              maxWidth:   "680px",
              margin:     "0 0 32px",
            }}>
              A volunteer landing-page build for AIGA Portland’s three-week October festival, on Squarespace 7.1 with a brand system that fights every platform default. A team of four shipped it: the AIGA Portland Web Chair on final calls, the PDM 2026 Featured Artist on the brand system in Figma, another Web Volunteer alongside me, and me on the Squarespace build and custom code.
            </p>

            <p style={{
              fontFamily: font.sans,
              fontSize:   "var(--text-article)",
              lineHeight: 1.5,
              fontWeight: 500,
              color:      c.ink,
              maxWidth:   "680px",
              margin:     "0 0 32px",
            }}>
              The AIGA Portland Web Chair held the final say on the work. Claude and I paired on the CSS and JS that got the artist’s system past the template.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "40px" }}>
              <Tag>Volunteer role</Tag>
              <Tag>Squarespace 7.1</Tag>
              <Tag>Custom CSS / JS</Tag>
              <Tag>Brand fidelity</Tag>
            </div>

            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            "8px",
                fontFamily:     font.sans,
                fontSize:       "var(--text-body)",
                fontWeight:     500,
                letterSpacing:  0,
                color:          "var(--color-text-link)",
                textDecoration: "none",
                borderBottom:   "1px solid currentColor",
                paddingBottom:  "2px",
              }}
            >
              aigapdx.org/portland-design-month-2026 →
            </a>
          </div>
        </header>

        {/* Sticky arc nav */}
        <nav
          aria-label="Case study arcs"
          className="aiga2-arc-nav"
          style={{
            position:     "sticky",
            top:          "72px",
            zIndex:       10,
            alignSelf:    "stretch",
            flexShrink:   0,
            width:        "100%",
            background:   "#FFFFFF",
            borderTop:    `1px solid ${c.border}`,
            borderBottom: `1px solid ${c.border}`,
            margin:       "0 0 40px",
          }}
        >
          <ul style={{
            display:             "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            margin:              0,
            padding:             0,
            listStyle:           "none",
          }}>
            {[
              { key: "premise",   label: "Premise"   },
              { key: "research",  label: "Research"  },
              { key: "decisions", label: "Decisions" },
              { key: "details",   label: "Details"   },
            ].map((arc, i, arr) => (
              <li key={arc.key} style={{
                borderRight: i < arr.length - 1 ? `1px solid ${c.border}` : "none",
              }}>
                <a
                  href={`#arc-${arc.key}`}
                  data-arc-anchor={arc.key}
                  aria-label={arc.label}
                  style={{
                    fontFamily:     font.sans,
                    fontSize:       "var(--text-body)",
                    fontWeight:     500,
                    letterSpacing:  0,
                    color:          c.ink2,
                    textDecoration: "none",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    padding:        "16px 8px",
                    transition:     "color 0.15s ease, background 0.15s ease",
                  }}
                >
                  <span className="aiga2-arc-label">{arc.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <StickyArcNavInit arcs={["premise", "research", "decisions", "details"]} />

        <style>{`
          .aiga2-arc-nav a[data-active] {
            color: var(--color-accent) !important;
            background: rgba(15,61,62,0.06) !important;
            box-shadow: inset 0 -4px 0 var(--color-accent) !important;
            font-weight: 700 !important;
          }
          .aiga2-arc-nav a:hover {
            color: ${c.ink};
            background: rgba(15,61,62,0.04);
          }
          @media (max-width: 760px) {
            .aiga2-arc-nav {
              position: fixed !important;
              left: 0 !important;
              right: 0 !important;
              top: 72px !important;
              padding: 0 !important;
            }
            .aiga2-arc-nav ul { gap: 0 !important; }
            .aiga2-arc-nav a  {
              font-size: 11px !important;
              padding: 12px 4px !important;
              letter-spacing: 0.06em !important;
              gap: 4px !important;
              color: ${c.ink2} !important;
            }
            .aiga2-arc-nav a[data-active] {
              color: var(--color-accent) !important;
              background: rgba(15,61,62,0.06) !important;
              box-shadow: inset 0 -4px 0 var(--color-accent) !important;
              font-weight: 700 !important;
            }
          }
          .aiga2-then-now > * { padding: 0 !important; margin: 0 !important; }
          .aiga2-then-now > * > img { display: block !important; width: 100% !important; margin: 0 !important; padding: 0 !important; }
          @media (max-width: 760px) {
            .aiga2-row              { grid-template-columns: 1fr !important; gap: 32px !important; }
            .aiga2-callout-grid     { grid-template-columns: 1fr !important; gap: 22px !important; }
            .aiga2-research-strip   { grid-template-columns: 1fr !important; gap: 20px !important; }
            .aiga2-then-now         { grid-template-columns: 1fr !important; gap: 0 !important; }
            .aiga2-shipped-row      { grid-template-columns: 1fr !important; gap: 24px !important; }
            .aiga2-closer-grid      { grid-template-columns: 1fr !important; gap: 16px !important; }
            .aiga2-meta             { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          }
        `}</style>

        {/* ── PREMISE arc ── */}
        <div id="arc-premise" style={{ background: "transparent", marginTop: "24px", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)", scrollMarginTop: "140px" }}>
          <section className="aiga2-hero-section" aria-label="Hero" style={{ padding: `0 ${SECTION_X} 120px` }}>
            <HeroImage
              src="/images/work/aiga-portland/hero-live-page-v3-3625.jpg"
              alt="The live AIGA Portland Design Month 2026 landing page. Purple gradient hero, October dates, event photos, calendar, and sponsor row."
              cropAspect={null}
              priority
            />
          </section>

          <section aria-label="Premise quote" style={{
            maxWidth: CONTENT_MAX,
            margin:   "0 auto",
            padding:  `40px ${SECTION_X} 120px`,
          }}>
            <p style={{
              fontFamily:    font.sans,
              fontSize:      "clamp(28px,3.8vw,60px)",
              fontWeight:    400,
              color:         c.ink,
              margin:        0,
              lineHeight:    1.15,
              letterSpacing: "-0.03em",
              maxWidth:      "22ch",
            }}>
              &ldquo;The brand had opinions. Squarespace had defaults. The work was making them talk to each other.&rdquo;
            </p>
            <p style={{
              fontFamily:    font.sans,
              fontSize:      "var(--text-body)",
              fontWeight:    500,
              letterSpacing: 0,
              color:         c.muted,
              margin:        "28px 0 0",
            }}>
              From the build log
            </p>
          </section>

          <BigThree
            heading="The problem"
            image="/images/work/aiga-portland/brand-vs-defaults-v3-3625.jpg"
            imageAlt="The Volunteer + Donate section from the live PDM 2026 page. Brand elements at play: IntraNet display type, hot pink CTAs on the purple hero gradient, rose top-right and lily bottom-left."
            imageCrop={null}
            body={
              <>
                The brand artist delivered a full system in Figma. IntraNet as the display type. Sofia Sans as body. Hot pink #FF0099 on ink black. Sharp corners. Floral ornaments that bleed out of their frames. Squarespace 7.1 defaults toward rounded buttons, a nav that ships in its own type stack, a teal accent baked into the header component, and image blocks that clip everything at the cell boundary. None of the brand fit any of the defaults.
              </>
            }
            callout={{
              decision: "Override Squarespace’s defaults per section instead of hunting for a template that matched the brand.",
              why:      "A template match would have compromised the brand somewhere. Overrides let the artist’s system ship intact.",
              cost:     "Custom CSS the next volunteer steward will need to maintain. Documented in the chapter vault.",
            }}
          />

          {/* Then vs. now — 2025 next to 2026 for visual proof */}
          <section aria-label="Then vs. now" style={{ padding: `0 0 40px` }}>
            <ThenVsNow />
          </section>
        </div>

        {/* ── RESEARCH arc ── */}
        <div id="arc-research" style={{ background: "transparent", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)", scrollMarginTop: "140px" }}>
          <section aria-label="The team" style={{ padding: `0 ${SECTION_X} 80px` }}>
            <div style={{
              maxWidth:             CONTENT_MAX,
              margin:               "0 auto",
              display:              "grid",
              gridTemplateColumns:  "1fr 1.6fr",
              gap:                  "64px",
              alignItems:           "start",
            }} className="aiga2-row">
              <div>
                <h2 style={{
                  fontFamily:    font.sans,
                  fontSize:      "clamp(28px,4vw,60px)",
                  fontWeight:    500,
                  color:         c.ink,
                  margin:        0,
                  letterSpacing: "-0.02em",
                  lineHeight:    1.1,
                }}>
                  The team.
                </h2>
              </div>
              <div>
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "clamp(15px,1.6vw,17px)",
                  lineHeight: 1.6,
                  color:      c.ink2,
                  margin:     0,
                  maxWidth:   PROSE_MAX,
                }}>
                  Four volunteers shipped the page. The AIGA Portland Web Chair set direction, held the final call on every decision that reached the site, and built the hero mosaic with artist flourishes. Another Web Volunteer built the events calendar. The PDM 2026 Featured Artist delivered the full brand system in Figma, source of truth for type, color, and ornament. I owned the Squarespace build and the custom code that translated the brand past the template’s defaults. The four of us collaborated on design and layout.
                </p>
              </div>
            </div>
          </section>
          <section aria-label="Research strip" style={{ padding: `0 0 40px` }}>
            <ResearchStrip />
          </section>
          <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto", padding: `24px ${SECTION_X} 80px` }}>
            <p style={{
              fontFamily: font.sans,
              fontSize:   "clamp(15px,1.6vw,17px)",
              lineHeight: 1.6,
              color:      c.ink2,
              margin:     0,
              maxWidth:   PROSE_MAX,
            }}>
              Not much invention needed on structure. Last year’s page had the sections. The ask was to keep the shape and lift the fidelity. Time went into how each section rendered, not what sections to include.
            </p>
          </div>
        </div>

        {/* ── DECISIONS arc ── */}
        <div id="arc-decisions" style={{ background: "transparent", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)", scrollMarginTop: "140px" }}>
          <section aria-label="The bet" style={{ padding: `0 0 120px` }}>
            {/* Rendered CSS excerpt in place of a page screenshot —
                shows the specificity + override pattern directly. */}
            <div style={{ padding: `0 ${SECTION_X} 64px` }}>
              <CustomCSSCard />
            </div>
            <div style={{ padding: `0 ${SECTION_X}` }}>
              <div style={{
                maxWidth:             CONTENT_MAX,
                margin:               "0 auto",
                display:              "grid",
                gridTemplateColumns:  "1fr 1.6fr",
                gap:                  "64px",
                alignItems:           "start",
              }} className="aiga2-row">
                <div>
                  <h2 style={{
                    fontFamily:    font.sans,
                    fontSize:      "clamp(28px,4vw,60px)",
                    fontWeight:    500,
                    color:         c.ink,
                    margin:        0,
                    letterSpacing: "-0.02em",
                    lineHeight:    1.1,
                  }}>
                    The bet.
                  </h2>
                </div>
                <div>
                  <p style={{
                    fontFamily: font.sans,
                    fontSize:   "clamp(15px,1.6vw,17px)",
                    lineHeight: 1.6,
                    color:      c.ink2,
                    margin:     0,
                    maxWidth:   PROSE_MAX,
                  }}>
                    Every default component fought the brand somewhere. Fluid Engine locks blocks to a fixed grid and rounds their corners. The site header ships with its own type stack and a teal accent baked into the component. The events calendar is a YUI3 plugin with no theming primitives. Image blocks default to Fill, which crops ornaments at the cell boundary. Sponsor galleries have no continuous-scroll option, and iOS Safari drops any animation that isn’t hardware-accelerated. I picked custom CSS plus one page-scoped JS injection as the primary construction mode and used Squarespace’s editor only for content structure: blocks, sections, event data. Every visual override lived in a single Custom CSS pane scoped by the page collection ID, so the rest of AIGA’s site kept its default look.
                  </p>
                  <Callout
                    decision="Ship one Custom CSS file that overrides Squarespace defaults section by section."
                    why="Isolation. The rest of AIGA’s site keeps its default look. Overrides live only on the PDM page."
                    cost="Every override needs an important. The specificity war is louder than I’d like. Trade for the fidelity."
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── DETAILS arc ── */}
        <div id="arc-details" style={{ background: "transparent", paddingTop: "clamp(40px, 8vw, 80px)", paddingBottom: "clamp(24px, 4vw, 40px)", scrollMarginTop: "140px" }}>
          <section aria-label="Shipped" style={{ padding: `0 0 80px` }}>
            <div style={{ padding: `0 ${SECTION_X} 32px` }}>
              <div style={{
                maxWidth:             CONTENT_MAX,
                margin:               "0 auto",
                display:              "grid",
                gridTemplateColumns:  "1fr 1.6fr",
                gap:                  "64px",
                alignItems:           "start",
              }} className="aiga2-row">
                <div>
                  <h2 style={{
                    fontFamily:     font.sans,
                    fontSize:       "clamp(28px,4vw,60px)",
                    fontWeight:     500,
                    color:          c.ink,
                    margin:         0,
                    letterSpacing:  "-0.02em",
                    lineHeight:     1.1,
                  }}>
                    Shipped.
                  </h2>
                </div>
                <div>
                  <p style={{
                    fontFamily: font.sans,
                    fontSize:   "clamp(15px,1.6vw,17px)",
                    lineHeight: 1.6,
                    color:      c.ink2,
                    margin:     0,
                    maxWidth:   PROSE_MAX,
                  }}>
                    Six sections that carry the page. Each one names what shipped and what the platform tried to do instead.
                  </p>
                </div>
              </div>
            </div>
            <ShippedStack />
          </section>

          <section aria-label="What I cut and what is open" style={{ padding: `40px 0 120px` }}>
            <ClosingArtifacts />
          </section>
        </div>

        {/* Colophon */}
        <section aria-label="Colophon" style={{ padding: `0 ${SECTION_X} 120px` }}>
          <div style={{
            maxWidth: CONTENT_MAX,
            margin:   "0 auto",
            display:  "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap:      "48px",
            borderTop: `1px solid ${c.border}`,
            paddingTop: "40px",
          }} className="aiga2-meta">
            <MetaCell label="Role"   value="Team of four: PM (final calls), peer designer, brand artist, me (design + code)" />
            <MetaCell label="Year"   value="2026" />
            <MetaCell label="Stack"  value="Squarespace 7.1 · Custom CSS · Page-scoped JS" />
            <MetaCell label="Live"   value={
              <a href={LIVE_URL} target="_blank" rel="noopener noreferrer"
                 aria-label="AIGA Portland Design Month 2026 (opens in new tab)"
                 style={{ color: c.accent2, textDecoration: "none", borderBottom: `1px solid ${c.accent}` }}>
                aigapdx.org
              </a>
            } />
          </div>
        </section>

      </main>
      <ScrollProgress />
      <RelatedCaseStudies current="aiga-portland" />
      <Footer />
    </>
  );
}
