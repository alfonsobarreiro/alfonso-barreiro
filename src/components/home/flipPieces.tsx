import type { ReactNode } from "react";
import { FlipMedia, type FlipSide } from "@/components/home/FlipMedia";
import { bySlug } from "@/lib/work";

/* Card media for the two-sided pieces in the homepage "Ad campaigns and
   print" band. Pass straight to HomeWorkSection: media={campaignFlipMedia}.

   No "use client" here on purpose: page.tsx is a server component and can
   import this record; FlipMedia itself is the client boundary.

   The rum and gin images are card versions of the gallery boards, cut out
   of the board (/images/home/cards/, transparent PNG with the labels' own
   shadows), so each label floats on the band's plate color while the card
   turns. Their alt text is read from the gallery entry in work.ts, so an
   edit there reaches the card too. */

function withGalleryAlt(slug: string, gallerySrc: string, card: Omit<FlipSide, "alt">, fallbackAlt: string): FlipSide {
  const hit = bySlug(slug)?.gallery?.find((g) => g.src === gallerySrc);
  return { ...card, alt: hit?.alt ?? fallbackAlt };
}

export const campaignFlipMedia: Record<string, ReactNode> = {
  /* Opens on the black gin label (Alfonso, 2026-11-06: "start with the
     black label only and the same size as the yellow label on the back
     side"): the gin body label without its neck band, cut from the same
     production file and drawn at the rum label's exact size, so the card
     keeps one shape as it turns. */
  "vara-somos-unidos": (
    <FlipMedia
      front={{
        /* Own alt: the gallery entry describes the neck band, which this
           card leaves out. */
        src: "/images/home/cards/gin-body-label.png",
        width: 1600,
        height: 775,
        alt: "The Somos Unidos Gin label laid flat, black with yellow smoke and a Southwest Style Gin seal.",
      }}
      back={withGalleryAlt(
        "vara-somos-unidos",
        "/images/work/vara-somos-unidos/01-vara-somos-unidos-rum-label.jpg",
        { src: "/images/home/cards/rum-label.png", width: 1600, height: 775 },
        "The Somos Unidos Rum label laid flat.",
      )}
      frontLabel="gin label"
      backLabel="rum label"
    />
  ),
  "vara-distributor-leave-behind": (
    <FlipMedia
      front={{
        src: "/images/work/vara/07-vara-distributor-leave-behind-front.jpg",
        width: 1310,
        height: 579,
        alt: "The outside of the VARA distributor leave-behind, laid flat: a woman tasting rosé on the fold-in panel, the sales contact and address on the back cover, and a grape cluster in red soil under the VARA crown and star on the cover.",
      }}
      back={{
        src: "/images/work/vara/07-vara-distributor-leave-behind-back.jpg",
        width: 1288,
        height: 569,
        alt: "The inside of the leave-behind: the brand story under the line wine. spirits. food. art., notes on awards, the team, and the planned agro-tourism site, and a photo of the two co-founders.",
      }}
      frontLabel="outside"
      backLabel="inside"
      bare
    />
  ),
};
