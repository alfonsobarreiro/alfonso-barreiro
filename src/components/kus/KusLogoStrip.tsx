import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { LOGO_SLUGS_ALL, STUDIO_SLUGS } from "@/components/kus/plates";
import { bySlug, hrefFor } from "@/lib/work";

/* Work highlights, Logos (Alfonso, 2026-11-04: "Logos should be auto
   scrolling"): every logo in one strip that scrolls left on its own, each
   mark a link to its page. The set is drawn twice so the loop has no seam;
   the copy is hidden from screen readers and out of the tab order, so each
   logo is announced and reachable once. Hovering or focusing the strip
   pauses it. With the dots still or reduced motion it does not move: the
   marks wrap in centered rows. On /hiring the studio mark is left out.

   Marks are the full lockups from /images/work/logos/marks, all set to one
   height; the wide Alpha Beta wordmark is capped so it does not outweigh
   the rest. */
const MARKS: Record<string, { src: string; width: number; height: number }> = {
  "mens-sole-revival-shield": { src: "/images/work/logos/marks/mens-sole-revival-shield-full.png", width: 1600, height: 415 },
  "sky-valley-comm":          { src: "/images/work/logos/marks/sky-valley-comm-full.png",          width: 1319, height: 404 },
  "nq-zebraworks":            { src: "/images/work/logos/marks/nq-zebraworks-full.png",            width: 1600, height: 520 },
  "becourageous-leadership":  { src: "/images/work/logos/marks/becourageous-leadership-full.png",  width: 860,  height: 359 },
  "alpha-beta-mark":          { src: "/images/work/logos/marks/alpha-beta-mark-full.png",          width: 1600, height: 153 },
};

export default function KusLogoStrip({ audience }: { audience: "all" | "hiring" }) {
  const slugs = audience === "hiring" ? LOGO_SLUGS_ALL.filter((s) => !STUDIO_SLUGS.has(s)) : LOGO_SLUGS_ALL;
  const items = slugs
    .map((slug) => ({ slug, item: bySlug(slug), mark: MARKS[slug] }))
    .filter((x): x is { slug: string; item: NonNullable<ReturnType<typeof bySlug>>; mark: (typeof MARKS)[string] } => Boolean(x.item && x.mark));

  return (
    <div className="kus-ls">
      <div className="kus-ls__track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="kus-ls__set" role="list" aria-hidden={copy ? true : undefined} data-copy={copy ? "" : undefined}>
            {items.map(({ slug, item, mark }) => (
              <li key={slug}>
                <Link
                  href={hrefFor(item)}
                  className="kus-ls__link"
                  tabIndex={copy ? -1 : undefined}
                  style={{ "--kus-ls-r": mark.width / mark.height } as CSSProperties}
                >
                  <Image src={mark.src} alt={copy ? "" : item.title} fill sizes="(max-width: 767px) 60vw, 360px" style={{ objectFit: "contain" }} />
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <style>{CSS}</style>
    </div>
  );
}

const CSS = `
.kus-ls {
  overflow: hidden;
  padding-block: 24px;
  /* Soft edges so marks fade in and out instead of being cut. */
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
}
.kus-ls__track { display: flex; width: max-content; animation: kus-ls-scroll 36s linear infinite; }
.kus-ls:hover .kus-ls__track, .kus-ls:focus-within .kus-ls__track { animation-play-state: paused; }
.kus-ls__set {
  display: flex; align-items: center;
  gap: clamp(48px, 7vw, 112px); padding: 0 clamp(48px, 7vw, 112px) 0 0;
  margin: 0; list-style: none;
}
.kus-ls__link {
  position: relative; display: block; flex: none;
  height: clamp(56px, 7vw, 96px);
  width: min(calc(clamp(56px, 7vw, 96px) * var(--kus-ls-r, 3)), 380px);
  border-radius: 4px;
}
@keyframes kus-ls-scroll { to { transform: translate3d(-50%, 0, 0); } }
@media (prefers-reduced-motion: reduce) {
  .kus-ls { -webkit-mask-image: none; mask-image: none; }
  .kus-ls__track { animation: none; width: auto; }
  .kus-ls__set { flex-wrap: wrap; justify-content: center; row-gap: 32px; padding: 0; width: 100%; }
  .kus-ls__set[data-copy] { display: none; }
}
:root[data-dots="still"] .kus-ls { -webkit-mask-image: none; mask-image: none; }
:root[data-dots="still"] .kus-ls__track { animation: none; width: auto; }
:root[data-dots="still"] .kus-ls__set { flex-wrap: wrap; justify-content: center; row-gap: 32px; padding: 0; width: 100%; }
:root[data-dots="still"] .kus-ls__set[data-copy] { display: none; }
`;
