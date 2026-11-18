import Link from "next/link";
import KusBand from "@/components/kus/KusBand";
import KusCard from "@/components/kus/KusCard";

/* Case studies (2026-11-06, audit finding 4), in place of Work
   highlights; second since 2026-11-10, after Work (Alfonso's call). Ends
   in an outline button, See all case studies, like Work. Senior portfolios lead with a few deep
   case studies rather than a gallery of samples: Spotify (the strongest,
   with its 40-slide deck linked from its page), Men's Sole Revival, and
   AIGA Portland, which had its own band until the same day's audit
   (finding 1) put every case study in one card system. Alfred keeps its
   band (the demo), directly below this one again since 2026-11-10, on
   the same teal as the Men's Sole Revival card, because it is part of that project.

   The gallery it replaces (websites, logos, ad campaigns and print) stays
   on /work, where every piece already lives; KusHighlights.tsx stays in
   the repo, unused. The heading keeps the big treatment Work highlights
   had (the heading style since 2026-11-08, full width). */
const SLUGS = ["spotify", "mens-sole-revival", "aiga-portland"];
const SIZES_THREE = "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 400px";
/* A result line under the summary (the card's stack slot, so every
   title stays on one line across the row) where one exists (2026-11-06 audit, finding
   3), quoted from the case study's Early outcomes box (GA4, first 16 weeks
   live, Apr to Jul 2026). Spotify is a concept with no live numbers, and
   its eyebrow says so. AIGA's line is its old band statement, trimmed
   ("on Squarespace" is in the summary). */
const RESULT: Record<string, string> = {
  "mens-sole-revival": "First 16 weeks: 4:30 average engagement, 3.2 sessions per user",
  "aiga-portland":     "Built the events calendar and the custom code, on a three-person volunteer web team",
};
/* The depth tag drops "Case study ·" here (the band says it) and keeps
   the disciplines (finding 1, same audit). */

export default function KusCaseStudies() {
  return (
    <KusBand
      id="case-studies-home"
      label="Case studies"
      className="kus-cs"
    >
      <div className="kus-grid kus-grid--3">
        {SLUGS.map((slug, i) => (
          <KusCard key={slug} slug={slug} sizes={SIZES_THREE} role={null} stack={RESULT[slug] ?? null} depth="disciplines" priority={i === 0} />
        ))}
      </div>
      <p className="kus-band__more" data-reveal="">
        <Link href="/work#case-studies" className="kus-pill kus-pill--secondary">See all case studies</Link>
      </p>
      <style>{`
        @media (min-width: 1024px) { .kus-cs .kus-band__label { grid-column: 1 / -1; } }
        /* 640 to 1023 (tablet portrait, phone landscape): one card per
           row, image left and text right, so three cards never leave one
           alone on a half-empty row (2026-11-08). */
        @media (min-width: 640px) and (max-width: 1023px) {
          .kus-cs .kus-grid--3 { grid-template-columns: minmax(0, 1fr); row-gap: 48px; }
          .kus-cs .wcard {
            display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: var(--kus-gap); align-items: start;
          }
          .kus-cs .wcard__body { margin-top: 0; }
        }
        /* The result line: body, navy, like the summary above it (four
           styles since 2026-11-08). */
        .kus-cs .wcard__stack {
          font-family: var(--kus-sans); font-weight: 400;
          font-size: var(--kus-fs-body); line-height: 1.55;
          color: var(--color-navy); margin: 0 0 8px; max-width: 64ch;
        }
      `}</style>
    </KusBand>
  );
}
