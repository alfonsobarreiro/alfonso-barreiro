import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WorkMediaTransition } from "@/components/home/WorkMediaTransition";
import { DISCIPLINES, eyebrowFor, hrefFor, type WorkItem } from "@/lib/work";

/* One card for the /work index, the homepage work bands, and the related
   row on sample pages. 16:10 frame with the 10px browser-window radius used
   for flat screenshots, then eyebrow, title, one line, and a depth tag so a
   case study and a quick sample never read as the same kind of entry.

   The title link stretches over the whole card (.wcard__link::after), so the
   card is still one big target, and the frame can hold its own controls:
   anything clickable inside `media` takes the .wcard__control class to sit
   above the stretched link. Pointer-driven media should listen on the
   closest .wcard, since the link overlay receives the pointer events.

   The frame is a plate: a solid color from the band (--plate, blue by
   default) with the dot grid printed on it, lit under the pointer
   (PlateSpotlight). Screenshots fill the 16:10 screen edge to edge. Pieces
   that were shot on a light board (print, browser mockups) use their card
   art instead, cut out of the board, so they float on the plate color with
   their own shadows. A band with data-plate="bare" drops the plate, for
   logos that sit on the page.

   The screen carries a per-slug view-transition name (WorkMediaTransition),
   so opening a sample morphs the screen into the sample page's first image. */
/** The plate colors (globals.css --color-plate-*). */
export type PlateColor = "blue" | "terracotta" | "teal" | "mustard" | "green" | "plum";
/** The order cards rotate through, so neighbors never share a color. */
export const PLATE_SPECTRUM: PlateColor[] = ["blue", "terracotta", "teal", "mustard", "green", "plum"];

export const CARD_SIZES = "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 400px";
/** Two-column homepage bands: the screen is about half the content width. */
export const CARD_SIZES_TWO_UP = "(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 640px";

export function WorkCard({
  item,
  priority = false,
  media,
  wide = false,
  sizes = CARD_SIZES,
  plateColor,
  variant = "default",
  role,
  stack,
  summary = true,
  depth = true,
}: {
  item: WorkItem;
  priority?: boolean;
  /** Spans two grid columns from 640px up (the homepage Alfred demo). */
  wide?: boolean;
  /** Replaces the cover image inside the 16:10 screen (homepage interactions). */
  media?: ReactNode;
  /** `sizes` for the cover image; match it to the grid's column count. */
  sizes?: string;
  /** This card's plate color; without it the card takes the band's (or blue). */
  plateColor?: PlateColor;
  /** "kus" (the /prototypes/home-kus preview): the caption renders with
      class hooks and no inline type, so the page's own styles set it, and
      the plate color goes on data-kus-plate instead of an inline --plate.
      "default" is the markup every other page renders. */
  variant?: "default" | "kus";
  /** "kus" only: a role line under the eyebrow. Renders only when set. */
  role?: string;
  /** "kus" only: a stack line under the summary. Renders only when set. */
  stack?: string;
  /** "kus" only: false drops the summary line (the homepage highlights,
      Kus tile grammar: image, eyebrow, title). The title link then has no
      aria-describedby. */
  summary?: boolean;
  /** "kus" only: false drops the depth tag (Case study · Web);
      "disciplines" keeps only the disciplines, for a band already headed
      Case studies (2026-11-07 audit, section 11, finding 1). */
  depth?: boolean | "disciplines";
}) {
  const disciplineLabels = item.disciplines
    .map((d) => DISCIPLINES.find((x) => x.key === d)?.label)
    .filter(Boolean)
    .join(", ");
  const id = `wcard-${item.slug}`;

  if (variant === "kus") {
    return (
      <KusCardMarkup
        item={item}
        id={id}
        priority={priority}
        media={media}
        wide={wide}
        sizes={sizes}
        plateColor={plateColor}
        role={role}
        stack={stack}
        summary={summary}
        depth={depth ? (item.depth === "Case study" && depth !== "disciplines" ? `Case study · ${disciplineLabels}` : disciplineLabels) : undefined}
      />
    );
  }

  return (
    <article
      className={wide ? "wcard wcard--wide" : "wcard"}
      data-slug={item.slug}
      /* Logos (narrow entries) never sit on a plate: their marks are dark. */
      data-plate={item.narrow ? "bare" : undefined}
    >
      <div className="wcard__frame" style={plateColor ? ({ "--plate": `var(--color-plate-${plateColor})` } as CSSProperties) : undefined}>
        <WorkMediaTransition slug={item.slug}>
          <div className="wcard__screen wcard__img">
            {media ?? (item.card ? (
              <div className="wcard__piece">
                <Image src={item.card.src} alt="" fill priority={priority} sizes={sizes} style={{ objectFit: "contain" }} />
              </div>
            ) : (
              <Image
                src={item.cover.src}
                alt=""
                fill
                priority={priority}
                sizes={sizes}
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            ))}
          </div>
        </WorkMediaTransition>
      </div>
      <div style={{ marginTop: "16px" }}>
        <Eyebrow style={{ marginBottom: "8px" }}>{eyebrowFor(item)}</Eyebrow>
        <h3
          className="wcard__title"
          style={{
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "clamp(20px, 1.8vw, 24px)",
            fontWeight:    500,
            color:         "var(--color-text)",
            margin:        "0 0 8px",
            letterSpacing: "-0.01em",
            lineHeight:    1.2,
            transition:    "color 0.2s ease",
          }}
        >
          <Link href={hrefFor(item)} className="wcard__link" aria-describedby={`${id}-desc`}>
            {item.title}
          </Link>
        </h3>
        <p
          id={`${id}-desc`}
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize:   "var(--text-body)",
            lineHeight: 1.5,
            color:      "var(--color-neutral-700)",
            margin:     "0 0 10px",
          }}
        >
          {item.summary}
        </p>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize:   "var(--text-small)",
            fontWeight: 500,
            color:      "var(--color-neutral-600)",
            margin:     0,
          }}
        >
          {item.depth === "Case study" ? `Case study · ${disciplineLabels}` : disciplineLabels}
        </p>
      </div>
    </article>
  );
}

/* The "kus" variant's markup: the same frame, screen, stretched link and
   view-transition name as the default card, with the caption as plain
   class hooks (wcard__eyebrow, __role, __title, __summary, __stack,
   __depth) in that order, so the page that uses it sets the type. The
   eyebrow drops a year that matches the footer's (work.ts SITE_YEAR). */
function KusCardMarkup({
  item,
  id,
  priority,
  media,
  wide,
  sizes,
  plateColor,
  role,
  stack,
  summary,
  depth,
}: {
  item: WorkItem;
  id: string;
  priority: boolean;
  media?: ReactNode;
  wide: boolean;
  sizes: string;
  plateColor?: PlateColor;
  role?: string;
  stack?: string;
  summary: boolean;
  depth?: string;
}) {
  return (
    <article
      className={wide ? "wcard wcard--wide" : "wcard"}
      data-slug={item.slug}
      data-plate={item.narrow && !plateColor ? "bare" : undefined}
      data-kus-plate={plateColor}
    >
      <div className="wcard__frame">
        <WorkMediaTransition slug={item.slug}>
          <div className="wcard__screen wcard__img">
            {media ?? (item.card ? (
              <div className="wcard__piece">
                <Image src={item.card.src} alt="" fill priority={priority} sizes={sizes} style={{ objectFit: "contain" }} />
              </div>
            ) : (
              <Image
                src={item.cover.src}
                alt=""
                fill
                priority={priority}
                sizes={sizes}
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            ))}
          </div>
        </WorkMediaTransition>
      </div>
      <div className="wcard__body">
        {/* Non-breaking hyphens, so "In-house" never splits, and a
            no-break space before each dot, so a line never starts with
            one, in a narrow card (2026-11-08). */}
        <p className="wcard__eyebrow">{eyebrowFor(item).replace(/-/g, "\u2011").replace(/ · /g, "\u00a0· ")}</p>
        {role ? <p className="wcard__role">{role}</p> : null}
        <h3 className="wcard__title">
          <Link href={hrefFor(item)} className="wcard__link" aria-describedby={summary ? `${id}-desc` : undefined}>
            {item.title}
          </Link>
        </h3>
        {summary ? <p id={`${id}-desc`} className="wcard__summary">{item.summary}</p> : null}
        {stack ? <p className="wcard__stack">{stack}</p> : null}
        {depth ? <p className="wcard__depth">{depth}</p> : null}
      </div>
    </article>
  );
}
