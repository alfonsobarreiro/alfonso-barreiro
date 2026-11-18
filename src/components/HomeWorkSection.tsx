import type { ReactNode } from "react";
import { CARD_SIZES_TWO_UP, PLATE_SPECTRUM, WorkCard } from "@/components/work/WorkCard";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { bySlug, type WorkItem } from "@/lib/work";

/* One homepage band per kind of work. Same heading scale, card grid, and
   "See all" link in every band, so websites, logos, campaigns, and case
   studies read as one body of work rather than a portfolio with extras.
   Two cards to a row. Plates: with `spectrum` set, cards rotate the six
   plate colors from that starting color (WorkCard PLATE_SPECTRUM), and
   `plate` only sets the band's fallback; `plate="bare"` drops plates
   (logos).

   Slots for the composer, top to bottom: title, deck, `note` (a stack or
   role line), `before` (a control above the grid), the grid, `after` (a
   follow-on piece under the grid, such as a Cut, then build brief or a
   case study link), then the see-all link when one is given. */
export default function HomeWorkSection({
  id,
  title,
  deck,
  note,
  slugs,
  seeAll,
  tinted = false,
  priority = false,
  media,
  before,
  after,
  wide = [],
  plate = "blue",
  spectrum,
}: {
  id: string;
  title: string;
  deck: string;
  /** A short line under the deck, for a stack line or a role line. Inline content: it renders inside a <p>. */
  note?: ReactNode;
  slugs: string[];
  /** The band's closing link. Omit it and the band ends at the grid (or at `after`). */
  seeAll?: { href: string; label: string };
  tinted?: boolean;
  priority?: boolean;
  /** Interactive media for specific cards, keyed by slug. */
  media?: Record<string, ReactNode>;
  /** A control rendered between the deck and the grid (for example the logo size slider). */
  before?: ReactNode;
  /** Content rendered under the grid and above the see-all link. */
  after?: ReactNode;
  /** Slugs whose cards span the full row. */
  wide?: string[];
  /** The card plate's color, or "bare" for no plate. */
  plate?: "blue" | "teal" | "terracotta" | "bare";
  /** Rotate the six plate colors card by card, starting at this index of
      PLATE_SPECTRUM. Each band starts somewhere else, so the page never
      repeats a color across a band boundary. Ignored on a bare band. */
  spectrum?: number;
}) {
  const items = slugs.map(bySlug).filter((w): w is WorkItem => Boolean(w));
  const gridGap = "clamp(40px, 5vw, 56px)";
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      data-plate={plate}
      style={{
        padding:    "clamp(72px, 8vw, 112px) clamp(24px, 6vw, 80px)",
        background: tinted ? "var(--color-neutral-100)" : "var(--color-paper)",
        borderTop:  tinted ? "none" : "1px solid var(--color-neutral-200)",
      }}
    >
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
        <h2
          id={`${id}-title`}
          style={{
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "clamp(28px, 4.2vw, 60px)",
            fontWeight:    500,
            color:         "var(--color-text)",
            margin:        0,
            letterSpacing: "-0.02em",
            lineHeight:    1.05,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize:   "17px",
            lineHeight: 1.45,
            color:      "var(--color-neutral-600)",
            /* With a note, the note carries the space above the grid. */
            margin:     note ? "12px 0 0" : `12px 0 ${gridGap}`,
            maxWidth:   "640px",
          }}
        >
          {deck}
        </p>
        {note && (
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize:   "15px",
              lineHeight: 1.5,
              color:      "var(--color-neutral-700)",
              margin:     `8px 0 ${gridGap}`,
              maxWidth:   "640px",
            }}
          >
            {note}
          </p>
        )}
        {/* `before` and the grid share a wrapper, so a sticky control in
            `before` lets go at the end of the grid, above the see-all link. */}
        <div>
          {before}
          <div className="work-grid work-grid--two">
            {items.map((item, i) => <WorkCard key={item.slug} item={item} priority={priority && i < 2} media={media?.[item.slug]} wide={wide.includes(item.slug)} sizes={CARD_SIZES_TWO_UP} plateColor={spectrum === undefined || plate === "bare" ? undefined : PLATE_SPECTRUM[(spectrum + i) % PLATE_SPECTRUM.length]} />)}
          </div>
        </div>
        {/* Outside the wrapper above, so a sticky `before` control has
            already let go by the time `after` scrolls in. */}
        {after && (
          <div style={{ marginTop: "clamp(36px, 4vw, 48px)" }}>
            {after}
          </div>
        )}
        {seeAll && (
          <div style={{ marginTop: "clamp(36px, 4vw, 48px)" }}>
            <LinkArrow href={seeAll.href}>{seeAll.label}</LinkArrow>
          </div>
        )}
      </div>
    </section>
  );
}
