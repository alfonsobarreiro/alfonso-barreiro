import type { ReactNode } from "react";
import { CARD_SIZES, WorkCard, type PlateColor } from "@/components/work/WorkCard";
import { PLATE_MAP } from "@/components/kus/plates";
import { curl } from "@/components/kus/copy";
import { bySlug } from "@/lib/work";

/* A work card in the preview: WorkCard's "kus" variant (the same frame,
   stretched link and view-transition name, with the caption as class
   hooks) on the piece's own plate from PLATE_MAP. Captions are always
   visible, in this order: mono eyebrow, role line, title (the link),
   summary, stack line, depth tag. The title is display type (22px at
   1440), so its apostrophes are curled (copy.ts curl); work.ts keeps its
   plain text.

   `role` and `stack`: left out, they come from work.ts (`role`,
   `builtWith`); null drops the line; a string overrides it. `summary`
   and `depth` false drop those lines (the highlights band, 2026-11-01:
   image, eyebrow, title). The wrapper is the reveal block, so the card's
   own hover transforms never fight the entrance.

   `plate` set explicitly wins even for a narrow piece (the shield in
   More work, 2026-11-08); otherwise narrow pieces stay plateless.

   `bare` (websites, 2026-10-27): no plate. The screenshot is the whole
   frame, clipped to the card radius (KusStyles, .kus-card[data-bare]). */
export default function KusCard({
  slug,
  media,
  wide = false,
  sizes = CARD_SIZES,
  role,
  stack,
  plate,
  reveal = true,
  priority = false,
  bare = false,
  summary = true,
  depth = true,
}: {
  slug: string;
  media?: ReactNode;
  wide?: boolean;
  sizes?: string;
  role?: string | null;
  stack?: string | null;
  plate?: PlateColor;
  reveal?: boolean;
  priority?: boolean;
  bare?: boolean;
  summary?: boolean;
  depth?: boolean | "disciplines";
}) {
  const item = bySlug(slug);
  if (!item) return null;
  const roleLine  = role  === undefined ? item.role      : role  ?? undefined;
  const stackLine = stack === undefined ? item.builtWith : stack ?? undefined;
  return (
    <div className="kus-card" data-reveal={reveal ? "" : undefined} data-bare={bare ? "" : undefined}>
      <WorkCard
        variant="kus"
        item={{ ...item, title: curl(item.title) }}
        media={media}
        wide={wide}
        sizes={sizes}
        role={roleLine}
        stack={stackLine}
        summary={summary}
        depth={depth}
        plateColor={bare ? undefined : plate ?? (item.narrow ? undefined : PLATE_MAP[slug])}
        priority={priority}
      />
    </div>
  );
}
