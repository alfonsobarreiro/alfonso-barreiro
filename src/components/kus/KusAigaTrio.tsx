import Image from "next/image";

/* Card media for Portland Design Month 2026 (Alfonso, 2026-10-27: "3
   images of AIGA Portland: 1 longer one and 2 smaller ones. No
   background."). From 640px: the full-page capture of the 2026 site in
   the left column, cropped from the top, with the events calendar and the
   venue map stacked on the right. The right column's two 16:10 shots set
   the height and the long one stretches to match, so every size comes
   from the page width and nothing shifts while the images load. Below
   640px the three stack, the long one at 3:4.

   Each shot is rounded with the bare cards' hairline (KusStyles). The
   card's title link names the piece, so the shots are decorative
   (alt=""), as on every other card.

   Shots: fresh captures of the live page at 1600 wide (2026-10-27), taken
   with WebGL on, since the section backgrounds are Squarespace
   background-effect canvases (without WebGL every section falls back to
   flat teal). The long one is stitched at section edges from viewport
   shots, with the sticky header hidden below the first, so the header
   shows once (the case study's then-2026-b.jpg caught it twice), and cut
   at 1600 x 2240, past the deepest window any layout shows. Its window
   ends on the calendar's header, so the calendar shot is a close-up the
   long one doesn't hold: Wednesday to Saturday of Oct 4 to 17, readable.
   The map has one venue selected (PSU's art building, four events) with
   its panel open. */

const DIR = "/images/home/sites";
const SHOTS = {
  long:     `${DIR}/aiga-portland-page.jpg`,
  calendar: `${DIR}/aiga-portland-calendar-weeks.jpg`,
  map:      `${DIR}/aiga-portland-map.jpg`,
} as const;

const SIZES = "(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 610px";

export function KusAigaTrio() {
  return (
    <div className="aiga3" aria-hidden="true">
      <div className="aiga3__shot aiga3__shot--long">
        <Image src={SHOTS.long} alt="" fill sizes={SIZES} style={{ objectFit: "cover", objectPosition: "center top" }} />
      </div>
      <div className="aiga3__shot">
        <Image src={SHOTS.calendar} alt="" fill sizes={SIZES} style={{ objectFit: "cover", objectPosition: "center top" }} />
      </div>
      <div className="aiga3__shot">
        <Image src={SHOTS.map} alt="" fill sizes={SIZES} style={{ objectFit: "cover", objectPosition: "center" }} />
      </div>
      <style href="kus-aiga-trio" precedence="default">{CSS}</style>
    </div>
  );
}

const CSS = `
.aiga3 { display: grid; grid-template-columns: minmax(0, 1fr); gap: 16px; }
.aiga3__shot {
  position: relative; overflow: hidden;
  aspect-ratio: 16 / 10;
  border-radius: var(--radius-card);
  box-shadow: 0 0 0 1px var(--color-neutral-200);
}
.aiga3__shot--long { aspect-ratio: 3 / 4; }
@media (min-width: 640px) {
  .aiga3 { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--kus-gap); }
  .aiga3__shot--long { grid-row: span 2; aspect-ratio: auto; }
}
/* The card hover zoom (WorkStyles: .wcard__img > img) one level down,
   since each shot wraps its image; WorkStyles' transition reaches it. */
.wcard:hover .aiga3__shot > img { transform: scale(1.02); }
@media (prefers-reduced-motion: reduce) {
  .wcard:hover .aiga3__shot > img { transform: none; }
}
`;
