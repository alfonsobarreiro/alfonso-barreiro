import type { ReactNode } from "react";
import KusBand from "@/components/kus/KusBand";
import KusCard from "@/components/kus/KusCard";
import { KusRow } from "@/components/kus/KusRow";
import KusLogoStrip from "@/components/kus/KusLogoStrip";
import { siteFlipMedia } from "@/components/home/SiteFlipMedia";
import { campaignFlipMedia } from "@/components/home/flipPieces";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { WORK } from "@/lib/work";

/* Work highlights (Alfonso, 2026-10-27: "Then do work Highlights: 3
   Websites, 2 Logos, and 3 Ad campaigns and print"). One band right under
   the name, in place of the three full bands that used to sit further
   down, each group with a link to the full list on /work.

   Second pass the same day, everything as big as a two-column grid
   allows:
   - Websites: four sites in a 2 x 2, as bare cards (KusCard bare): no
     plate, the screenshot is the card's whole frame, rounded, with a
     hairline so the white first screens hold their edge on the paper.
   - Logos: the two full lockups straight on the page, no plate and no
     panel, each the width of its column.
   - Print: the two VARA pieces side by side on their plates (Kendra Toth
     is out), with the art's margin trimmed.

   None of the eight is a studio piece, so "/" and /hiring show the same
   band. Below 640px the sites are a sideways row (KusRow); the logos and
   print stack.

   Say more with less (2026-11-01): no band statement (the label and "See
   all work" say it); the cards carry image, eyebrow, title, with no
   summary on the sites and logos, no depth tag anywhere in the band (the
   group labels say it), and no role line on the two VARA pieces (the
   title and the eyebrow's "In-house" carry it; /work keeps the line).
   The four sites share one stack line, printed once under the Websites
   label instead of under each card.

   The group labels are not headings: each card title is an h3 under the
   band's h2, so a group is a labelled group instead (role="group"). */

const WEB_SLUGS   = ["whittaker-hotel", "emblem-coffee", "layercue", "bookstore"];
const PRINT_SLUGS = ["vara-somos-unidos", "vara-magazine-ads"];
/* work.ts SAMPLE_STACK, the same for all four sites. */
const WEB_STACK = "Designed in Figma, built in Next.js on Vercel.";

/* One column under 640px, two above, 1240px content max. */
const SIZES_TWO = "(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 610px";

/* Draft copy for Alfonso's voice pass. */
const COPY = {
  label:     "Work highlights",
  web:       { label: "Websites", link: { href: "/work?d=web", label: "See all web work" } },
  logos:     { label: "Logos", link: { href: "/work?d=brand", label: "See all brand work" } },
  print:     { label: "Ad campaigns and print", link: { href: "/work?d=print", label: "See all print work" } },
} as const;

function Group({ id, label, note, link, children }: { id: string; label: string; note?: string; link: { href: string; label: string }; children: ReactNode }) {
  return (
    <div role="group" aria-labelledby={`${id}-label`} className={`kus-hl__group kus-hl__group--${id}`}>
      <div className="kus-hl__head">
        <div>
          <h3 id={`${id}-label`} className="kus-hl__label">{label}</h3>
          {note ? <p className="kus-t-mono kus-hl__note">{note}</p> : null}
        </div>
        <LinkArrow href={link.href}>{link.label}</LinkArrow>
      </div>
      {children}
    </div>
  );
}

export default function KusHighlights({ audience = "all" }: { audience?: "all" | "hiring" }) {
  const webMedia = siteFlipMedia(WEB_SLUGS);
  return (
    <KusBand id="highlights" label={COPY.label} link={{ href: "/work", label: "See all work", count: WORK.length }} className="kus-hl">
      <Group id="hl-web" label={COPY.web.label} note={WEB_STACK} link={COPY.web.link}>
        <KusRow className="kus-grid kus-grid--2" below={640} label={COPY.web.label}>
          {WEB_SLUGS.map((slug) => <KusCard key={slug} slug={slug} media={webMedia[slug]} sizes={SIZES_TWO} bare stack={null} summary={false} depth={false} />)}
        </KusRow>
      </Group>

      <Group id="hl-logos" label={COPY.logos.label} link={COPY.logos.link}>
        <KusLogoStrip audience={audience} />
      </Group>

      <Group id="hl-print" label={COPY.print.label} link={COPY.print.link}>
        <div className="kus-grid kus-grid--2">
          {PRINT_SLUGS.map((slug) => <KusCard key={slug} slug={slug} media={campaignFlipMedia[slug]} sizes={SIZES_TWO} role={null} depth={false} />)}
        </div>
      </Group>

      <style>{`
        /* Groups 144 apart at 1440 (the band token; Alfonso, 2026-11-06: "More
           vertical spacing"): half the 288 between bands, so they still read
           as parts of one band. */
        .kus-hl__group + .kus-hl__group { margin-top: var(--kus-band-y); }
        .kus-hl__head {
          display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between;
          gap: 8px 24px; margin-bottom: 40px;
        }
        .kus-hl__note { margin: 6px 0 0; color: var(--color-neutral-700); }
        /* Headings (Alfonso, 2026-11-06: "Work highlights — h1, Logos —
           h2, Ad campaigns and print"): the band's own heading is big (the
           headline role since the audit the same day), and each group's heading the
           label role every band heading uses (28/600 terracotta-600), so
           the groups sit one clear step above their card titles (22/500).
           The elements stay h2 (band) and h3 (groups): the name is the
           page's only H1. */
        /* Headline size (52), one step under the H1's display (88), so the
           page keeps display for the name, the line and the close
           (2026-11-06 audit, finding 1). */
        .kus-hl .kus-band__label > .kus-t-label {
          font-size: var(--kus-fs-headline);
          line-height: 1.04; letter-spacing: -0.035em;
          text-wrap: balance;
        }
        /* No statement beside it, so the heading takes the full width and
           sits on one line. */
        @media (min-width: 1024px) { .kus-hl .kus-band__label { grid-column: 1 / -1; } }
        .kus-hl__label {
          margin: 0;
          font-family: var(--kus-display); font-weight: 600;
          font-size: var(--kus-fs-label); line-height: 1.05; letter-spacing: -0.03em;
          color: var(--color-terracotta-600);
        }

        /* Sites are bare cards (KusCard bare, KusStyles). Logos: no plate,
           no spotlight, no panel. */
        .kus .kus-hl__group--hl-logos .wcard__frame { background: none; }
        .kus .kus-hl__group--hl-logos .wcard__frame::before { content: none; }

        /* Logos: the screen takes NQ's lockup ratio, the taller of the two,
           so both marks fill the column width and the captions line up. */
        .kus .kus-hl__group--hl-logos .wcard__frame { border-radius: 0; overflow: visible; }
        .kus .kus-hl__group--hl-logos .wcard__screen { aspect-ratio: 1600 / 520; overflow: visible; }

        /* Print: the plate stays, the margin around the art shrinks. The
           flip sheet keeps its 44px strip for the button. */
        .kus .kus-hl__group--hl-print .wcard__piece { inset: 4% 4%; }
        .kus .kus-hl__group--hl-print .flipm__sheet { inset: 4% 4% 44px; }
      `}</style>
    </KusBand>
  );
}
