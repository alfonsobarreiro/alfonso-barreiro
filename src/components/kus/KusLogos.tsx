import type { ReactNode } from "react";
import Link from "next/link";
import KusBand from "@/components/kus/KusBand";
import { LogoLeadMedia, LogoTileMedia } from "@/components/kus/KusLogoMedia";
import { LOGO_SLUGS_ALL, PLATE_MAP, STUDIO_SLUGS } from "@/components/kus/plates";
import { curl } from "@/components/kus/copy";
import { WorkMediaTransition } from "@/components/home/WorkMediaTransition";
import type { HomeAudience } from "@/components/home/HomePage";
import { DISCIPLINES, bySlug, eyebrowFor, hrefFor } from "@/lib/work";

/* Logos (the logo pick, "D layout, C panels, real places", vault note
   "Logo options 2026-10-24"). The heading and the statement on paper, then
   one grid: the Men's Sole Revival shield leads, a card two columns wide
   and two rows tall from 1024px, with the shield drawn large on its plate
   and a paper panel listing where it runs on menssolerevival.com
   (LogoLeadMedia). The other marks sit beside it two by two, each in its
   own colors on a paper panel inside its plate (LogoTileMedia).

   /hiring has no Alpha Beta mark, so its third tile, BeCourageous, goes
   wide and shows its full lockup when the panel holds it. Phones: the
   lead first, then the tiles two to a row, the odd one wide. No slider
   and no sticky bar: this band is read while scrolling.

   Each card is one link (the title, stretched over the card) to its
   sample page, and nothing appears only on hover. The lead's link also
   points aria-describedby at the panel's heading and list. Plates come
   from PLATE_MAP (mustard, green, plum, blue, terracotta), so no two
   neighbors match. The cards are WorkCard's "kus" markup, written out
   here because WorkCard renders logo entries bare (no plate). */
export default function KusLogos({ audience }: { audience: HomeAudience }) {
  const slugs = audience === "hiring" ? LOGO_SLUGS_ALL.filter((s) => !STUDIO_SLUGS.has(s)) : LOGO_SLUGS_ALL;
  const [lead, ...tiles] = slugs;
  const oddWide = tiles.length % 2 === 1 ? tiles[tiles.length - 1] : null;
  return (
    <KusBand
      id="logos"
      label="Logos"
      link={{ href: "/work?d=brand", label: "See all brand work" }}
      statement="Marks for clients and for my own ventures."
      className="kus-logos"
    >
      <div className="kus-lgrid">
        {lead ? (
          <LogoCard slug={lead} lead describedBy="logo-lead-where-title logo-lead-where" media={<LogoLeadMedia />} />
        ) : null}
        {tiles.map((slug) => (
          <LogoCard
            key={slug}
            slug={slug}
            wide={slug === oddWide}
            media={<LogoTileMedia slug={slug} wide={slug === oddWide} />}
          />
        ))}
      </div>
      <style>{LOGO_GRID_CSS}</style>
    </KusBand>
  );
}

export function LogoCard({
  slug,
  media,
  lead = false,
  wide = false,
  describedBy,
  summary = true,
  depth = true,
}: {
  slug: string;
  media: ReactNode;
  lead?: boolean;
  wide?: boolean;
  describedBy?: string;
  /** false drops the summary line (the highlights band). */
  summary?: boolean;
  /** false drops the depth tag (the highlights band). */
  depth?: boolean;
}) {
  const item = bySlug(slug);
  if (!item) return null;
  const id = `wcard-${item.slug}`;
  const disciplines = item.disciplines
    .map((d) => DISCIPLINES.find((x) => x.key === d)?.label)
    .filter(Boolean)
    .join(", ");
  const depthTag = item.depth === "Case study" ? `Case study · ${disciplines}` : disciplines;
  const describedIds = [summary ? `${id}-desc` : null, describedBy ?? null].filter(Boolean).join(" ") || undefined;
  const cls = ["wcard", "kus-lcard", lead ? "kus-lcard--lead" : "", wide ? "kus-lcard--wide" : ""].filter(Boolean).join(" ");
  return (
    <article className={cls} data-slug={item.slug} data-kus-plate={PLATE_MAP[slug]} data-reveal="">
      <div className="wcard__frame">
        <WorkMediaTransition slug={item.slug}>
          <div className="wcard__screen">{media}</div>
        </WorkMediaTransition>
      </div>
      <div className="wcard__body">
        <p className="wcard__eyebrow">{eyebrowFor(item)}</p>
        <h3 className="wcard__title">
          <Link href={hrefFor(item)} className="wcard__link" aria-describedby={describedIds}>
            {curl(item.title)}
          </Link>
        </h3>
        {summary ? <p id={`${id}-desc`} className="wcard__summary">{item.summary}</p> : null}
        {depth ? <p className="wcard__depth">{depthTag}</p> : null}
      </div>
    </article>
  );
}

/* Tiles are 4:3 from the grid's own width (container units), so every box
   is known before an image loads. Two columns below 1024px with the lead
   and any odd tile full width; four from 1024px, with the lead in the
   first two columns over two rows. */
export const LOGO_GRID_CSS = `
.kus-lgrid {
  container-type: inline-size;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 40px var(--kus-gap);
  --tile-h: calc((100cqi - var(--kus-gap)) / 2 * 0.75);
}
.kus-lgrid > .kus-lcard { min-width: 0; }
.kus-lgrid > .kus-lcard--lead,
.kus-lgrid > .kus-lcard--wide { grid-column: 1 / -1; }
.kus-lgrid > .kus-lcard:not(.kus-lcard--lead) .wcard__screen { aspect-ratio: auto; height: var(--tile-h); }
.kus-lgrid > .kus-lcard--lead .wcard__screen { aspect-ratio: 16 / 10; }
@media (max-width: 639px) {
  .kus-lgrid > .kus-lcard--lead .wcard__screen { aspect-ratio: auto; }
}
@media (min-width: 1024px) {
  .kus-lgrid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    row-gap: 48px;
    --tile-h: calc((100cqi - 3 * var(--kus-gap)) / 4 * 0.75);
  }
  .kus-lgrid > .kus-lcard--lead {
    grid-column: 1 / span 2; grid-row: 1 / span 2;
    display: grid; grid-template-rows: minmax(0, 1fr) auto;
  }
  .kus-lgrid > .kus-lcard--wide { grid-column: span 2; }
  .kus-lgrid > .kus-lcard--lead .wcard__screen { aspect-ratio: auto; height: 100%; }
}
`;
