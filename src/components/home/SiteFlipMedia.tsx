import type { ReactNode } from "react";
import { bySlug } from "@/lib/work";
import { SiteFlip, type SiteFlipPage } from "./SiteFlip";

/* Websites band: flip through the live site inside the card frame.

   Pages are the sample's gallery in site order, with the card cover as the
   resting page. When the cover is also a gallery screen (every web sample
   today) it keeps its place in that order; otherwise it goes first. The
   label is the gallery caption without its trailing period.

   Server component on purpose: it reads src/lib/work.ts here and hands the
   client half only the pages it needs, so the work data stays out of the
   browser bundle. */
export function SiteFlipMedia({ slug, priority = false }: { slug: string; priority?: boolean }) {
  const item = bySlug(slug);
  if (!item) return null;

  const pages: SiteFlipPage[] = (item.gallery ?? []).map((g) => ({
    src:   g.src,
    label: g.caption?.replace(/\.\s*$/, "") || undefined,
  }));
  let start = pages.findIndex((p) => p.src === item.cover.src);
  if (start === -1) {
    pages.unshift({ src: item.cover.src, label: item.cover.caption?.replace(/\.\s*$/, "") || undefined });
    start = 0;
  }

  return <SiteFlip pages={pages} start={start} priority={priority} />;
}

/** media={...} for HomeWorkSection: one SiteFlipMedia per slug, with the
    first `priorityCount` covers loaded eagerly to match the band's priority. */
export function siteFlipMedia(slugs: string[], priorityCount = 0): Record<string, ReactNode> {
  return Object.fromEntries(
    slugs.map((slug, i) => [slug, <SiteFlipMedia key={slug} slug={slug} priority={i < priorityCount} />]),
  );
}
