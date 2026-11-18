import Image, { getImageProps } from "next/image";
import type { Ref } from "react";

/* The portrait, Alf 05 (the plaid office photo), in three forms.

   "close" (the homepage close, HireClose.tsx): a two-ink halftone, navy
   and terracotta-500 on paper at a 6px screen, with the plain photo
   stacked over it at opacity 0. At rest you see the print. It comes into
   focus as the plain photo, a simple cross-fade with no pointer tracking:
   on mouse hover, while focus is inside the close (that rule lives in
   HireClose's CSS, which owns the section), and for 1.6s after a tap
   (HireClose sets data-reveal). "Stop the dots" shows
   the plain photo only, with no fade; reduced motion starts there (the
   head script in layout.tsx). Box, 3:4, every size a whole number of
   24px lattice cells: 288x384 from 1024px, 216x288 from 768px, 144x192
   below (half the art, so the 6px screen halves cleanly). Lazy, with no
   preload: it sits at the bottom of the page.

   "print" (the old hero, Hero.tsx, kept for the prototype pages): the
   288x384 halftone with the photo showing through a lens centered on the
   hero spotlight's pointer position. The section writes --mouse-x /
   --mouse-y (section coordinates) and --spotlight-opacity, and Hero
   writes this box's offset inside the section to --pl / --pt. Fully
   revealed while keyboard focus is inside the hero, and for 1.6s after a
   tap (Hero sets data-reveal).

   "avatar" (the old hero below 1024px): the plain photo as a 56px circle
   beside the byline.

   Both art files are baked offline by scripts/halftone.py (run it with
   '{"pitch": 12}' for this file) to public/images/home/portrait/ at 2x of
   288x384. The halftone is a 16-color palette PNG (about 32KB) served as
   is: the optimizer's lossy WebP is larger and softens the dot edges. One
   meaningful image per form carries the alt text; the halftone layer is
   decorative. The fixed box keeps CLS at 0.

   LCP ("print" only), measured 2026-10-23 (headless Chrome, H1 vs the
   288x384 box, 110,592px): the H1 is the LCP element from about 1130px
   up. From 1024px to about 1130px the H1 wraps narrower than the box, so
   the portrait becomes the LCP element. Only that band gets a preload,
   with margin to 1199px. Phones and wide screens fetch nothing early. */

export const PORTRAIT_ALT = "Alfonso Barreiro";
const PHOTO    = "/images/home/portrait/alf05-photo.jpg";
const HALFTONE = "/images/home/portrait/alf05-halftone-6px.png";
const PRELOAD_MEDIA = "(min-width: 1024px) and (max-width: 1199px)";
const PHOTO_PRINT = { src: PHOTO, alt: PORTRAIT_ALT, width: 576, height: 768, sizes: "288px" } as const;
const CLOSE_SIZES = "(min-width: 1024px) 288px, (min-width: 768px) 216px, 144px";

export function DotPortrait({
  variant,
  className,
  ref,
}: {
  variant: "close" | "print" | "avatar";
  className?: string;
  ref?: Ref<HTMLDivElement>;
}) {
  if (variant === "close") {
    return (
      <div ref={ref} className={`dotportrait-close${className ? " " + className : ""}`}>
        <Image
          className="dotportrait-close__halftone"
          src={HALFTONE}
          alt=""
          aria-hidden="true"
          width={576}
          height={768}
          unoptimized
        />
        <Image
          className="dotportrait-close__photo"
          src={PHOTO}
          alt={PORTRAIT_ALT}
          width={576}
          height={768}
          sizes={CLOSE_SIZES}
        />
        <style>{CLOSE_CSS}</style>
      </div>
    );
  }

  if (variant === "avatar") {
    return (
      <span className={`dotportrait-avatar${className ? " " + className : ""}`}>
        <Image
          src={PHOTO}
          alt={PORTRAIT_ALT}
          width={576}
          height={768}
          sizes="56px"
          style={{ width: 56, height: 56, objectFit: "cover", objectPosition: "50% 30%" }}
        />
        <style>{AVATAR_CSS}</style>
      </span>
    );
  }

  const { props: photo } = getImageProps(PHOTO_PRINT);

  return (
    <div ref={ref} className={`dotportrait${className ? " " + className : ""}`}>
      {/* React hoists these to <head>. */}
      <link rel="preload" as="image" href={HALFTONE} media={PRELOAD_MEDIA} fetchPriority="high" />
      <link rel="preload" as="image" href={photo.src} imageSrcSet={photo.srcSet} imageSizes={photo.sizes} media={PRELOAD_MEDIA} fetchPriority="high" />
      <Image
        className="dotportrait__halftone"
        src={HALFTONE}
        alt=""
        aria-hidden="true"
        width={576}
        height={768}
        unoptimized
      />
      <Image className="dotportrait__photo" {...PHOTO_PRINT} alt={PORTRAIT_ALT} />
      <style>{PRINT_CSS}</style>
    </div>
  );
}

const CLOSE_CSS = `
/* Rounded like the cards (--radius-card). Callers may position the box. */
.dotportrait-close {
  position: relative;
  flex: none;
  width: 144px;
  height: 192px;
  overflow: hidden;
  border-radius: var(--radius-card);
  background: var(--color-paper);
}
.dotportrait-close > img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
}
.dotportrait-close__photo {
  opacity: 0;
  transition: opacity 0.3s ease;
}
/* Mouse hover only, so a tap never leaves a sticky hover behind. Taps
   use data-reveal, written by the caller. */
@media (hover: hover) {
  .dotportrait-close:hover .dotportrait-close__photo { opacity: 1; }
}
.dotportrait-close[data-reveal] .dotportrait-close__photo { opacity: 1; }
/* Still: the plain photo, no fade. */
:root[data-dots="still"] .dotportrait-close__halftone { display: none; }
:root[data-dots="still"] .dotportrait-close__photo {
  opacity: 1;
  transition: none;
}
@media (min-width: 768px) {
  .dotportrait-close { width: 216px; height: 288px; }
}
@media (min-width: 1024px) {
  .dotportrait-close { width: 288px; height: 384px; }
}
`;

const PRINT_CSS = `
/* Rounded like the cards (--radius-card). Callers may position the box. */
.dotportrait {
  position: relative;
  width: 288px;
  height: 384px;
  overflow: hidden;
  border-radius: var(--radius-card);
  background: var(--color-paper);
}
.dotportrait > img {
  position: absolute;
  inset: 0;
  display: block;
  width: 288px;
  height: 384px;
}
.dotportrait__photo {
  opacity: var(--spotlight-opacity, 0);
  -webkit-mask-image: radial-gradient(circle 160px at calc(var(--mouse-x, -9999px) - var(--pl, 0px)) calc(var(--mouse-y, -9999px) - var(--pt, 0px)), black 0%, black 50%, transparent 100%);
          mask-image: radial-gradient(circle 160px at calc(var(--mouse-x, -9999px) - var(--pl, 0px)) calc(var(--mouse-y, -9999px) - var(--pt, 0px)), black 0%, black 50%, transparent 100%);
  transition: opacity var(--spotlight-fade, 0.2s) ease;
}
/* Keyboard focus anywhere in the hero, or a tap on a touch tablet:
   the whole photo, no mask. */
.hero-section:has(:focus-visible) .dotportrait__photo,
.dotportrait[data-reveal] .dotportrait__photo {
  opacity: 1;
  -webkit-mask-image: none;
          mask-image: none;
}
.dotportrait[data-reveal="out"] .dotportrait__photo {
  opacity: 0;
  transition-duration: 0.4s;
}
/* Still: the plain photo, in register, nothing tracks. */
:root[data-dots="still"] .dotportrait__halftone { display: none; }
:root[data-dots="still"] .dotportrait__photo {
  opacity: 1;
  -webkit-mask-image: none;
          mask-image: none;
  transition: none;
}
`;

const AVATAR_CSS = `
.dotportrait-avatar {
  flex: none;
  display: block;
  width: 56px;
  height: 56px;
  border-radius: 999px;
  overflow: hidden;
  background: var(--color-neutral-100);
}
.dotportrait-avatar > img { display: block; }
`;
