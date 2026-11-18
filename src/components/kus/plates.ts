import type { PlateColor } from "@/components/work/WorkCard";
import { bySlug, eyebrowFor, hrefFor } from "@/lib/work";
import { KUS_COPY } from "@/components/kus/copy";

/* One plate per piece (decision D3). The six plates stop rotating: each
   piece keeps one color everywhere it appears (its reel frame and its card
   in a band), so a color comes to mean that piece. Within each band's grid
   the six colors appear once each, and no two neighbors match at 3-up,
   2-up, or on /hiring. Client brand colors are not borrowed (three-brands
   isolation, and most client palettes are not documented in the repo). */
export const PLATE_MAP: Record<string, PlateColor> = {
  /* Teal, Men's Sole Revival's plate, since 2026-11-07 (audit section 11,
     finding 2): Alfred is part of that project, and its blue sat right
     after the blue testimonial slab. */
  "msr-chatbot":                     "teal",
  "aiga-portland":                   "mustard",
  "mens-sole-revival":               "teal",
  "alphabeta-design":                "teal",
  /* Green since 2026-11-08: in More work it sits beside the Somos
     Unidos labels (plum), the shield (mustard) and the Kendra Toth
     brochure (terracotta). */
  "whittaker-hotel":                 "green",
  /* Teal since 2026-11-10: in the More work grid it sits beside the
     Boomtime playbook (blue). */
  "emblem-coffee":                   "teal",
  "sandwich-shop":                   "green",
  "bookstore":                       "terracotta",
  "layercue":                        "mustard",
  "vara-somos-unidos":               "plum",
  "vara-magazine-ads":               "teal",
  "vara-social":                     "mustard",
  "kendra-toth-brochure":            "terracotta",
  "boomtime-word-of-mouth-playbook": "blue",
  "vara-distributor-leave-behind":   "green",
  "wayfarer":                        "plum",
  "spotify":                         "green",
  /* Logos (the logo pick, "D layout, C panels, real places"): the
     Men's Sole Revival shield leads on mustard, where its navy measures
     6.08:1; the tiles run green, plum, blue, terracotta. Every mark sits
     on a paper panel inside its plate except the lead shield, so no
     client art is recolored. Neighbors never match: lead beside green and
     blue, the two-by-two (green, plum / blue, terracotta) on "/", and
     green, plum over a wide blue on /hiring; on phones the lead stacks
     over green, plum. */
  "mens-sole-revival-shield":        "mustard",
  "sky-valley-comm":                 "green",
  "nq-zebraworks":                   "plum",
  "becourageous-leadership":         "blue",
  "alpha-beta-mark":                 "terracotta",
};

export function plateFor(slug: string): PlateColor | undefined {
  return PLATE_MAP[slug];
}

/* The studio's own pieces. Mirrors STUDIO_SLUGS in
   src/components/home/HomePage.tsx (not exported there): /hiring never
   renders either one. */
export const STUDIO_SLUGS = new Set(["alphabeta-design", "alpha-beta-mark"]);

export const WEB_SLUGS_ALL  = ["alphabeta-design", "whittaker-hotel", "emblem-coffee", "sandwich-shop", "bookstore", "layercue"];
/* The shield leads (it is on both audiences, so the lead never changes). */
export const LOGO_SLUGS_ALL = ["mens-sole-revival-shield", "sky-valley-comm", "nq-zebraworks", "becourageous-leadership", "alpha-beta-mark"];
export const CAMPAIGN_SLUGS = ["vara-somos-unidos", "vara-magazine-ads", "vara-social", "kendra-toth-brochure", "boomtime-word-of-mouth-playbook", "vara-distributor-leave-behind"];

/* The reel (spec 2.2): six real pieces, captions from work.ts, one per
   discipline: web (AIGA Portland), packaging (Somos Unidos), AI (Alfred),
   print (Kendra Toth), social (VARA) and brand (the logos). Alfonso,
   2026-11-04. The two websites run full bleed, the screenshot edge to
   edge with no plate; the rest sit on their own plate. Cut the same day:
   Men's Sole Revival's card (Alfred already shows the site), the
   Halverson concept (the only concept) and the Boomtime playbook. KusFirstScreen's REEL_ORDER sets the order: it opens on
   AIGA Portland (Alfonso, 2026-10-25), and no two neighbors share a plate
   or a venture. No frame is from the
   studio, so both audiences get the same six; the filter below keeps a
   later edit from leaking one onto /hiring. Left out on purpose: LayerCue,
   the tattoo sample and the Spotify cover read as dark tiles, Emblem's
   first screen is a dark brown photo, and Wayfarer is a concept. */
export type ReelMark = { src: string; width: number; height: number };

export type ReelFrame = {
  key: string;
  /** art: contained on its plate. bleed: a screenshot covering the
      whole frame, anchored top. logos: the three marks on paper. */
  kind: "art" | "bleed" | "logos";
  /** A plate color, or "paper" for the logos frame. Under a bleed frame
      it only shows while the image loads. */
  plate: PlateColor | "paper";
  title: string;
  meta: string;
  href: string;
  src?: string;
  width?: number;
  height?: number;
  /** "large": the art draws at its own ratio, up to 92% of the frame's
      height, instead of in the shared fit box (84%). For a square piece
      the shared box caps it at the box height. */
  fit?: "large";
  /** How long the frame holds, if not the reel's default. */
  holdMs?: number;
  marks?: ReelMark[];
};

type Def =
  | { slug: string; kind: "art" | "bleed"; src: string; width: number; height: number; fit?: "large" }
  | { slug: "logos"; kind: "logos" };

const DEFS: Def[] = [
  { slug: "vara-somos-unidos",               kind: "art",  src: "/images/home/cards/vara-somos-unidos.png",        width: 2000, height: 1364 },
  { slug: "msr-chatbot",                     kind: "bleed", src: "/images/work/covers/msr-chatbot-answer.jpg",     width: 1600, height: 1000 },
  /* The full-page capture (KusAigaTrio's long shot), not the browser
     mockup card: anchored top, the band shows the hero and the nav. */
  { slug: "aiga-portland",                   kind: "bleed", src: "/images/home/sites/aiga-portland-page.jpg",      width: 1600, height: 2240 },
  { slug: "kendra-toth-brochure",            kind: "art",  src: "/images/home/cards/kendra-toth-brochure.png",     width: 2840, height: 1888 },
  /* Reel only (Alfonso, 2026-11-04: "make them all bigger, but change the
     first one"): nine posts rebuilt from the 1080px originals, drawn
     large. Tile 1 is now Happy Thanksgiving; the cropped Appreciation Day
     post it replaces repeated tile 9's sale. */
  { slug: "vara-social",                     kind: "art",  src: "/images/home/cards/vara-social-grid.png",         width: 1600, height: 1600, fit: "large" },
  { slug: "logos",                           kind: "logos" },
];

const LOGO_MARKS: ReelMark[] = [
  { src: "/images/work/logos/marks/sky-valley-comm-full.png",         width: 1319, height: 404 },
  { src: "/images/work/logos/marks/nq-zebraworks-full.png",           width: 1600, height: 520 },
  { src: "/images/work/logos/marks/becourageous-leadership-full.png", width: 860,  height: 359 },
  /* Added 2026-11-04 ("the four logos"), once the Men's Sole Revival card
     left the reel. */
  { src: "/images/work/logos/marks/mens-sole-revival-shield-full.png", width: 1600, height: 415 },
];

/** The six frames, built on the server so work.ts stays out of the client bundle. */
export function reelFrames(): ReelFrame[] {
  const out: ReelFrame[] = [];
  for (const d of DEFS) {
    if (d.kind === "logos") {
      const sky = bySlug("sky-valley-comm");
      out.push({
        key: "logos",
        kind: "logos",
        plate: "paper",
        title: KUS_COPY.reel.logosTitle,
        meta: sky ? `${sky.org} · Client and own venture` : "Logo · Client and own venture",
        href: "/work?d=brand",
        marks: LOGO_MARKS,
      });
      continue;
    }
    if (STUDIO_SLUGS.has(d.slug)) continue;
    const item = bySlug(d.slug);
    const plate = PLATE_MAP[d.slug];
    if (!item || !plate) continue;
    out.push({
      key: d.slug,
      kind: d.kind,
      plate,
      title: item.title,
      meta: eyebrowFor(item),
      href: hrefFor(item),
      src: d.src,
      width: d.width,
      height: d.height,
      fit: d.fit,
    });
  }
  return out;
}
