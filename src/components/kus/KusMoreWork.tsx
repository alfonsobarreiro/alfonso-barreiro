import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import KusBand from "@/components/kus/KusBand";
import KusCard from "@/components/kus/KusCard";
import { campaignFlipMedia } from "@/components/home/flipPieces";

/* Work (2026-11-08 as More work, Alfonso: "show some of my diverse work
   on the homepage"): six pieces across disciplines. Since 2026-11-10 it is
   "Work", matching the nav and /work, and it leads, before Case studies
   (Alfonso: "Work should go before Case Studies"). It ends in an outline
   button, See all work, like Case studies (no header link, no count). The case studies show how he
   works; this band shows range: websites, a logo, an ad campaign, print,
   and collateral. It replaces nothing (the old Work highlights gallery
   stays cut) and adds no style: the band label is heading, the eyebrows
   mono, the titles heading.

   Cards carry image, eyebrow and title only (Kus tile grammar), no
   summary, stack or depth, so the band stays a glance. Each piece keeps
   its PLATE_MAP color; the six never repeat.
   - The Whittaker: the shared browser frame (the same chrome as the Men's
     Sole Revival card) with the intro screen; the address bar is left
     empty so /hiring shows no studio domain.
   - The shield: the compact mark on its mustard plate (navy on mustard,
     6.08:1), the treatment the Logos band led with.
   - Somos Unidos: the gin and rum flip, opening on the black gin label
     (Alfonso, 2026-11-06).
   - Kendra Toth: the brochure spread card.
   - The Boomtime word-of-mouth playbook (added 2026-11-08 with the
     carousel): marketing collateral for a fifth client, on blue.
   - Emblem (added 2026-11-10 with the grid): the coffee roaster's
     bilingual site, in the same browser frame, on teal.

   A 3 x 2 grid since 2026-11-10 (Alfonso: "work should be a 3x2 grid and
   not a carousel"), after a day as a carousel: every piece in view, no
   controls, and the same three columns as Case studies. Three across
   from 1024, two across from 640 (three rows, no lone card), and on
   phones three stacked (one website, the logo, the ad campaign), with
   See all work for the rest. */
/* Row 1 holds the three plates Case studies also uses (green, mustard,
   teal), so the repeats sit a full row away from that band; row 2 holds
   the three it does not (terracotta, blue, plum). 2026-11-10, audit 14,
   finding 2. */
const SLUGS = [
  "whittaker-hotel",
  "mens-sole-revival-shield",
  "emblem-coffee",
  "kendra-toth-brochure",
  "boomtime-word-of-mouth-playbook",
  "vara-somos-unidos",
];
/* Phones show three, one per discipline: a website, the logo, the ad
   campaign (audit 14, finding 1: Case studies sat 3.4 screens down). */
const PHONE = new Set(["whittaker-hotel", "mens-sole-revival-shield", "vara-somos-unidos"]);
const SIZES = "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 400px";

/* Browser-frame cards (the Men's Sole Revival card's chrome, address bar
   left empty) for the two sites, the compact shield, and the Somos flip.
   The rest use their work.ts card art. */
const browser = (src: string) => (
  <div className="wcard__piece">
    <Image src={src} alt="" fill sizes={SIZES} style={{ objectFit: "contain" }} />
  </div>
);
const MEDIA: Record<string, ReactNode> = {
  "whittaker-hotel": browser("/images/home/cards/whittaker-hotel.png"),
  "emblem-coffee": browser("/images/home/cards/emblem-coffee.png"),
  "mens-sole-revival-shield": (
    <div className="kus-mw__shield" aria-hidden="true">
      <Image src="/images/work/logos/marks/mens-sole-revival-shield-compact.png" alt="" fill sizes="160px" style={{ objectFit: "contain" }} />
    </div>
  ),
  "vara-somos-unidos": campaignFlipMedia["vara-somos-unidos"],
};

export default function KusMoreWork() {
  return (
    <KusBand
      id="work"
      label="Work"
      className="kus-mw"
    >
      <div className="kus-grid kus-grid--3">
        {SLUGS.map((slug) => (
          <div key={slug} className="kus-mw__item" data-phone={PHONE.has(slug) ? "" : undefined}>
            <KusCard
              slug={slug}
              media={MEDIA[slug]}
              sizes={SIZES}
              plate={slug === "mens-sole-revival-shield" ? "mustard" : undefined}
              role={null}
              stack={null}
              summary={false}
              depth={false}
            />
          </div>
        ))}
      </div>
      <p className="kus-band__more" data-reveal="">
        <Link href="/work" className="kus-pill kus-pill--secondary">See all work</Link>
      </p>
      <style>{`
        @media (min-width: 1024px) { .kus-mw .kus-band__label { grid-column: 1 / -1; } }
        .kus-mw__item { min-width: 0; }
        /* Phones: three (PHONE); See all work covers the rest. */
        @media (max-width: 639px) { .kus-mw__item:not([data-phone]) { display: none; } }
        .kus-mw__shield { position: absolute; inset: 18% 0; }
        /* The flip's button needs its strip under the sheet. */
        .kus .kus-mw .flipm__sheet { inset: 4% 4% 44px; }
      `}</style>
    </KusBand>
  );
}
