import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { WorkStyles } from "@/components/work/WorkStyles";
import { kusDisplay, kusMono } from "@/components/kus/fonts";
import { KusStyles } from "@/components/kus/KusStyles";
import { KusReveal } from "@/components/kus/KusReveal";
import KusBand from "@/components/kus/KusBand";
import { WORK, visibleFilters, type Discipline } from "@/lib/work";
import { KusWorkGrid, newestFirst } from "@/components/work/KusWorkGrid";

const DESCRIPTION =
  "Case studies, sample websites, logos, social campaigns, and print by Alfonso Barreiro, product designer and web developer in Portland, OR.";

export const metadata: Metadata = {
  title: "Work",
  description: DESCRIPTION,
  alternates: { canonical: "https://www.barreiro.com/work" },
  openGraph: {
    type: "website",
    url: "https://www.barreiro.com/work",
    siteName: "Alfonso Barreiro",
    locale: "en_US",
    title: "Work · Alfonso Barreiro",
    description: DESCRIPTION,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Alfonso Barreiro · Product designer and web developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work · Alfonso Barreiro",
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

/* /work on the homepage's system (2026-11-18, the /work audit: eight type
   styles and six inks against the homepage's four and three). The page
   sits in the same .kus root as "/", so it takes the same type (display,
   heading, body, mono), the same three inks (navy, terracotta-600,
   white), the same band spacing, the same nav and footer, the same card
   markup (KusCard), and the same row reveal.

   Cards: eyebrow, title, summary. The depth tag is gone (the filters say
   the discipline). Each piece keeps its homepage plate (PLATE_MAP), so a
   color means the same piece on both pages; pieces the homepage never
   shows take the first spectrum color that no neighbor uses, at three,
   two or one across. The pieces the homepage frames keep that media:
   the browser frame for Alfred, The Whittaker and Emblem, the shield on
   mustard, the Somos Unidos flip, and the logos on paper panels inside
   their plates. */

export default async function WorkIndex({ searchParams }: { searchParams: Promise<{ d?: string }> }) {
  const { d } = await searchParams;
  const filters = visibleFilters();
  const active = filters.find((f) => f.key === d)?.key as Discipline | undefined;
  const items = active ? WORK.filter((w) => w.disciplines.includes(active)) : WORK;
  const caseStudies = items.filter((w) => w.depth === "Case study");
  const samples = newestFirst(items.filter((w) => w.depth === "Sample"));
  const countFor = (key: Discipline) => WORK.filter((w) => w.disciplines.includes(key)).length;

  return (
    <div className={`kus ${kusDisplay.variable} ${kusMono.variable}`}>
      <KusStyles />
      <Nav />
      <main id="main-content" style={{ paddingTop: "72px" }}>
        <WorkStyles />
        <KusReveal />

        <header className="work-head">
          <div className="kus-wrap">
            <h1 className="kus-t-line" data-reveal="">Work</h1>
            <p className="kus-t-body work-head__deck" data-reveal="">
              Case studies, sample websites, logos, social campaigns, and print. The case studies go deep. The samples are one screen each, with a live link where there is one.
            </p>
            <nav aria-label="Filter work by discipline" data-reveal="">
              <ul className="work-filters">
                <li>
                  <Link href="/work" className="work-filter" aria-current={active ? undefined : "page"}>
                    All <span className="work-filter__count">{WORK.length}</span>
                  </Link>
                </li>
                {filters.map((f) => (
                  <li key={f.key}>
                    <Link
                      href={`/work?d=${f.key}`}
                      className="work-filter"
                      aria-current={active === f.key ? "page" : undefined}
                    >
                      {f.label} <span className="work-filter__count">{countFor(f.key)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        {caseStudies.length > 0 && (
          <KusBand id="case-studies" label="Case studies" note="The problem, the decisions, and what shipped." className="work-band">
            <KusWorkGrid items={caseStudies} priority />
          </KusBand>
        )}

        {samples.length > 0 && (
          <KusBand
            id="samples"
            label="Samples"
            note="Client and in-house work first, then my own ventures, then the concept sites I built for my studio."
            className="work-band"
          >
            <KusWorkGrid items={samples} priority={!caseStudies.length} />
          </KusBand>
        )}

        <section className="kus-band work-studio" aria-label="Studio">
          <div className="kus-wrap">
            <div className="kus-rule" aria-hidden="true" />
            <p className="kus-t-body" data-reveal="">
              The concept sites come from Alpha Beta Design, my studio, where every package has its price on the page.
            </p>
            <p data-reveal="">
              <LinkArrow href="https://www.alphabeta.design/services">See packages at alphabeta.design</LinkArrow>
            </p>
          </div>
        </section>

        <Footer ground="paper" />
      </main>

      <style>{`
        /* Header: the band's top padding, no bottom (the first band's top
           padding is the gap). */
        .work-head { padding: var(--kus-band-y) var(--kus-pad-x) 0; }
        .work-head__deck { margin-top: 24px; }
        .work-filters { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; margin: 32px 0 0; padding: 0; }
        /* Filters: the secondary pill (body, navy, 2px navy border), count
           in mono; the current one fills navy with white text. */
        .kus .work-filter {
          gap: 8px; min-height: 44px; padding: 8px 20px;
          border: 2px solid var(--color-navy); border-radius: 999px;
          font-family: var(--kus-sans); font-size: var(--kus-fs-ui); font-weight: 400; line-height: 1.2;
          color: var(--color-navy); background: var(--color-paper);
          transition: background-color var(--kus-dur-out) ease, color var(--kus-dur-out) ease;
        }
        .kus .work-filter:hover, .kus .work-filter[aria-current="page"] { background: var(--color-navy); color: var(--color-paper); transition-duration: var(--kus-dur-in); }
        .kus .work-filter__count { font-family: var(--kus-mono); font-size: var(--kus-fs-mono); font-weight: 400; opacity: 1; }
        @media (min-width: 1024px) { .work-band .kus-band__label { grid-column: 1 / -1; } }
        .work-band .kus-band__label .kus-t-body { max-width: 64ch; }
        /* The studio line: no label, so the rule sits on the band's top. */
        .work-studio .kus-rule { margin-bottom: 24px; }
        .work-studio p + p { margin-top: 16px; }
        @media (prefers-reduced-motion: reduce) { .kus .work-filter { transition: none; } }
      `}</style>
    </div>
  );
}
