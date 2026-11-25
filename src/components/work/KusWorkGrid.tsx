import Image from "next/image";
import type { ReactNode } from "react";
import KusCard from "@/components/kus/KusCard";
import { LogoTileMedia } from "@/components/kus/KusLogoMedia";
import { PLATE_MAP } from "@/components/kus/plates";
import { campaignFlipMedia } from "@/components/home/flipPieces";
import { PLATE_SPECTRUM, type PlateColor } from "@/components/work/WorkCard";
import { sortByStatus, type WorkItem } from "@/lib/work";

/* The /work card grid, shared by /work and the sample pages' "More like
   this" (2026-11-25, moved out of src/app/work/page.tsx so a sample page
   shows the same cards as /work). Renders inside a .kus root.

   Cards: eyebrow, title, summary (no depth tag). Each piece keeps its
   homepage plate (PLATE_MAP), so a color means the same piece everywhere;
   pieces the homepage never shows take the first spectrum color no
   neighbor uses at three, two or one across. Pieces the homepage frames
   keep that media: the browser frame for Alfred, The Whittaker and Emblem,
   the shield on mustard, the Somos Unidos flip, and the logos on paper
   panels inside their plates. From 640 to 1023 px, one card per row,
   image left and text right. */

const SIZES = "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 400px";

const browser = (src: string, eager: boolean) => (
  <div className="wcard__piece">
    <Image src={src} alt="" fill priority={eager} sizes={SIZES} style={{ objectFit: "contain" }} />
  </div>
);
const BROWSER_CARDS: Record<string, string> = {
  "msr-chatbot": "/images/home/cards/msr-chatbot.png",
  "whittaker-hotel": "/images/home/cards/whittaker-hotel.png",
  "emblem-coffee": "/images/home/cards/emblem-coffee.png",
};

function mediaFor(item: WorkItem, eager: boolean): ReactNode {
  if (BROWSER_CARDS[item.slug]) return browser(BROWSER_CARDS[item.slug], eager);
  if (item.slug === "mens-sole-revival-shield") {
    return (
      <div className="kus-wgrid__shield" aria-hidden="true">
        <Image src="/images/work/logos/marks/mens-sole-revival-shield-compact.png" alt="" fill sizes="160px" style={{ objectFit: "contain" }} />
      </div>
    );
  }
  if (item.slug === "vara-somos-unidos") return campaignFlipMedia["vara-somos-unidos"];
  return item.narrow ? <LogoTileMedia slug={item.slug} /> : undefined;
}

/** The homepage plate where there is one; otherwise the first spectrum
    color that differs from the left neighbor and the card above at three
    and two across, and from any mapped card that follows. */
export function platesFor(items: WorkItem[]): PlateColor[] {
  const out: PlateColor[] = [];
  items.forEach((item, i) => {
    const mapped = PLATE_MAP[item.slug];
    if (mapped) { out.push(mapped); return; }
    const taken = new Set<PlateColor | undefined>([
      out[i - 1], out[i - 2], out[i - 3],
      PLATE_MAP[items[i + 1]?.slug ?? ""], PLATE_MAP[items[i + 2]?.slug ?? ""], PLATE_MAP[items[i + 3]?.slug ?? ""],
    ]);
    const start = i % PLATE_SPECTRUM.length;
    const pick = [...PLATE_SPECTRUM.slice(start), ...PLATE_SPECTRUM.slice(0, start)].find((c) => !taken.has(c));
    out.push(pick ?? PLATE_SPECTRUM[start]);
  });
  return out;
}

/* Newest first inside each status group (client, volunteer, in-house, own
   venture, concept). A range counts by its last year; no year sorts last
   in its group. */
const lastYear = (item: WorkItem) => Math.max(0, ...(item.year?.match(/\d{4}/g) ?? []).map(Number));
export const newestFirst = (items: WorkItem[]) =>
  sortByStatus([...items].sort((a, b) => lastYear(b) - lastYear(a)));

export function KusWorkGrid({ items, priority = false }: { items: WorkItem[]; priority?: boolean }) {
  const plates = platesFor(items);
  return (
    <>
      <div className="kus-grid kus-grid--3 kus-wgrid">
        {items.map((item, i) => (
          <KusCard
            key={item.slug}
            slug={item.slug}
            media={mediaFor(item, priority && i === 0)}
            sizes={SIZES}
            plate={plates[i]}
            role={null}
            stack={null}
            depth={false}
            priority={priority && i < 3}
          />
        ))}
      </div>
      <style href="kus-wgrid" precedence="default">{`
        .kus .kus-wgrid > .kus-card { min-width: 0; }
        /* No trailing margin under a card's last line, so the space below a
           grid is exactly the next band's padding (2026-11-25). */
        .kus .kus-wgrid .wcard__body > :last-child { margin-bottom: 0; }
        @media (min-width: 640px) and (max-width: 1023px) {
          .kus-wgrid.kus-grid--3 { grid-template-columns: minmax(0, 1fr); row-gap: 48px; }
          .kus-wgrid .wcard {
            display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: var(--kus-gap); align-items: start;
          }
          .kus-wgrid .wcard__body { margin-top: 0; }
        }
        .kus-wgrid__shield { position: absolute; inset: 18% 0; }
        /* The flip's button needs its strip under the sheet. */
        .kus .kus-wgrid .flipm__sheet { inset: 4% 4% 44px; }
      `}</style>
    </>
  );
}
