import type { ReactNode } from "react";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { curl } from "@/components/kus/copy";

/* One band, Kus's grammar: label, then statement (spec 1.3). A dotted rule
   across the top of the label row, then a small label on the left third
   (columns 1 to 4 from 1024px: an optional mono eyebrow, the H2 at the
   label size in terracotta-600, an optional role line and link, whose
   optional `count` sits after the label in mono: Snellenberg's "More
   work 11") and one
   sentence at 40px on the right two thirds, with no divider. Below 1024px
   they stack.

   Content goes in one of two places:
   - `children` with `placement="full"` (default): the full width under
     the label row, 48px down from 1024px, 32px below.
   - `children` with `placement="right"`, plus an `aside`: the right
     column under the statement, and the aside under the label on the
     left. The DOM order is label, right, aside, which is the phone order
     (the Cut, then build band: H2, statement, the interaction, then the
     Men's Sole Revival card).

   The label and the statement are reveal blocks; cards reveal on their
   own (KusCard). String labels, statements and ledes are display type,
   so their apostrophes and quotes are curled (copy.ts curl). */
export default function KusBand({
  id,
  label,
  eyebrow,
  role,
  note,
  link,
  statement,
  lede,
  aside,
  children,
  placement = "full",
  className,
}: {
  id: string;
  label: string;
  eyebrow?: string;
  role?: string;
  /** One body-type line under the label (the /work bands' intros,
      2026-11-18). */
  note?: ReactNode;
  link?: { href: string; label: string; count?: number };
  statement?: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
  placement?: "full" | "right";
  className?: string;
}) {
  const titleId = `${id}-title`;
  /* Display sizes get curly apostrophes and quotes (copy.ts curl). */
  const display = (n: ReactNode) => (typeof n === "string" ? curl(n) : n);
  const split = placement === "right";
  const head = (statement || lede) ? (
    <>
      {statement ? <p className="kus-t-statement" data-spec="DM Sans 600">{display(statement)}</p> : null}
      {lede ? <p className="kus-t-lede">{display(lede)}</p> : null}
    </>
  ) : null;

  return (
    <section id={id} aria-labelledby={titleId} className={`kus-band${className ? " " + className : ""}`}>
      <div className="kus-wrap">
        <div className="kus-rule" aria-hidden="true" />
        <div className={split ? "kus-band__grid kus-band__grid--split" : "kus-band__grid"}>
          <div className="kus-band__label" data-reveal="">
            {eyebrow ? <p className="kus-t-mono">{eyebrow}</p> : null}
            <h2 id={titleId} className="kus-t-label">{curl(label)}</h2>
            {role ? <p className="kus-t-mono">{role}</p> : null}
            {note ? <p className="kus-t-body">{note}</p> : null}
            {link ? (
              <div>
                <LinkArrow href={link.href}>
                  {link.label}
                  {link.count ? <span className="kus-band__count">{link.count}</span> : null}
                </LinkArrow>
              </div>
            ) : null}
          </div>
          {split ? (
            <div className="kus-band__right">
              {head ? <div className="kus-band__content" data-reveal="">{head}</div> : null}
              {children}
            </div>
          ) : head ? (
            <div className="kus-band__content" data-reveal="">{head}</div>
          ) : null}
          {split && aside ? <div className="kus-band__aside">{aside}</div> : null}
        </div>
        {!split && children ? <div className="kus-band__body">{children}</div> : null}
      </div>
    </section>
  );
}
