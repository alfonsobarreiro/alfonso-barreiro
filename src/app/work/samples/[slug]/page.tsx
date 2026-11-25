import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { WorkStyles } from "@/components/work/WorkStyles";
import { WorkMediaTransition } from "@/components/home/WorkMediaTransition";
import { kusDisplay, kusMono } from "@/components/kus/fonts";
import { KusStyles } from "@/components/kus/KusStyles";
import { KusReveal } from "@/components/kus/KusReveal";
import KusBand from "@/components/kus/KusBand";
import { KusWorkGrid, newestFirst } from "@/components/work/KusWorkGrid";
import { PLATE_MAP } from "@/components/kus/plates";
import { WORK, bySlug, eyebrowFor, type WorkImage } from "@/lib/work";

/* A sample page, on the homepage system since 2026-11-25 (the sample-page
   audit: 7 type styles and 5 inks, the old nav and footer, 12px labels in
   deep teal, and "More like this" on the old cards with rotating colors
   and bare logos). Same .kus root as "/", /work, /about and /resume:
   display for the title, mono for the eyebrow and the fact labels, body
   for the note, facts and captions, all navy; links terracotta-600.
   "More like this" is a standard band with the /work grid (KusWorkGrid),
   so each piece keeps its homepage color and the logos sit on panels. */

export const dynamicParams = false;

export function generateStaticParams() {
  return WORK.filter((w) => w.depth === "Sample").map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = bySlug(slug);
  if (!item) return {};
  // Concept samples say so in search results and link previews, not only on the page.
  const title = item.status === "Concept" ? `${item.title} (concept site)` : item.title;
  const description = item.status === "Concept" ? `Concept site, real code. ${item.summary}` : item.summary;
  const url = `https://www.barreiro.com/work/samples/${item.slug}`;
  const image = { url: item.cover.src, width: item.cover.width, height: item.cover.height, alt: item.cover.alt };
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "Alfonso Barreiro",
      locale: "en_US",
      title: `${title} · Alfonso Barreiro`,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · Alfonso Barreiro`,
      description,
      images: [item.cover.src],
    },
  };
}

export default async function SamplePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = bySlug(slug);
  if (!item || item.depth !== "Sample") notFound();

  const facts: [string, string | undefined][] = [
    ["The brief", item.brief],
    ["What it shows", item.shows],
    ["Built with", item.builtWith],
    ["My role", item.role],
  ];
  const [first, ...rest] = item.gallery ?? [];
  const figMax = item.narrow ? "820px" : "100%";
  /* Three pieces from the same first discipline, newest first, skipping
     any whose homepage plate matches the card before it (Alfred and Men's
     Sole Revival are both teal and would sit side by side). */
  const pool = newestFirst(
    WORK.filter((w) => w.slug !== item.slug && w.disciplines.includes(item.disciplines[0])),
  );
  const related: typeof pool = [];
  for (const w of pool) {
    if (related.length === 3) break;
    const prev = related[related.length - 1];
    if (prev && PLATE_MAP[prev.slug] && PLATE_MAP[prev.slug] === PLATE_MAP[w.slug]) continue;
    related.push(w);
  }
  for (const w of pool) if (related.length < 3 && !related.includes(w)) related.push(w);

  return (
    <div className={`kus ${kusDisplay.variable} ${kusMono.variable}`}>
      <KusStyles />
      <Nav />
      <main id="main-content" style={{ paddingTop: "72px" }}>
        <WorkStyles />
        <KusReveal />
        <header className="sample-head">
          <div className="kus-wrap">
            <Link href="/work" className="ui-linkarrow ui-linkarrow--on-light sample-back">
              <span aria-hidden="true">←</span>
              <span className="sample-back__label">All work</span>
            </Link>
            <p className="kus-t-mono" data-reveal="">{eyebrowFor(item)}</p>
            <h1 className="kus-t-line sample-head__title" data-reveal="">{item.title}</h1>
            {item.note && <p className="kus-t-body" data-reveal="">{item.note}</p>}
          </div>
        </header>

        {first && (
          <section aria-label={`${item.title} images`} className="sample-band">
            <div className="kus-wrap">
              <Figure g={first} priority max={figMax} morphSlug={item.slug} />
            </div>
          </section>
        )}

        <section aria-label="About this piece" className="sample-band sample-facts">
          <div className="kus-wrap">
            <dl data-reveal="">
              {facts.filter(([, v]) => v).map(([label, value]) => (
                <div key={label} className="sample-fact">
                  <dt className="kus-t-mono">{label}</dt>
                  <dd className="kus-t-body">{value}</dd>
                </div>
              ))}
            </dl>
            {item.live && (
              <p className="sample-live" data-reveal="">
                <LinkArrow href={item.live.href}>Open {item.live.label}</LinkArrow>
              </p>
            )}
          </div>
        </section>

        {rest.length > 0 && (
          <section aria-label={`More ${item.title} images`} className="sample-band">
            <div className="kus-wrap sample-gallery">
              {rest.map((g) => <Figure key={g.src} g={g} max={figMax} />)}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <KusBand id="more-like-this" label="More like this" className="sample-more">
            <KusWorkGrid items={related} />
            <p className="kus-band__more" data-reveal="">
              <Link href="/work" className="kus-pill kus-pill--secondary">See all work</Link>
            </p>
          </KusBand>
        )}

        <Footer ground="paper" />
      </main>

      <style>{`
        /* Header: the band's top padding; 48px down to the first image. */
        .sample-head { padding: var(--kus-band-y) var(--kus-pad-x) 48px; }
        .sample-back { display: inline-flex; align-items: center; gap: 8px; padding: 10px 0; margin-bottom: 48px; text-decoration: none; color: var(--color-text-link); }
        .sample-back__label { border-bottom: 1px solid currentColor; padding-bottom: 2px; }
        .sample-head .kus-t-mono + .sample-head__title { margin-top: 16px; }
        .sample-head__title { max-width: 16em; }
        .sample-head__title + .kus-t-body { margin-top: 24px; }
        .sample-band { padding: 0 var(--kus-pad-x); }
        .sample-facts { padding-top: 48px; padding-bottom: 48px; }
        .sample-facts dl { display: grid; gap: 16px; max-width: 820px; margin: 0; padding: 0; }
        .sample-fact { display: grid; grid-template-columns: 160px minmax(0, 1fr); gap: 24px; align-items: baseline; }
        .sample-fact dd { margin: 0; }
        .sample-live { margin: 32px 0 0; }
        .sample-gallery { display: grid; gap: 48px; }
        /* The block right before "More like this" ends flush, so that gap
           is the band's own padding, as between every band (2026-11-25). */
        .sample-facts:has(+ .sample-more) { padding-bottom: 0; }
        .sample-figure { margin: 0; }
        .sample-figure__frame { border-radius: var(--radius-panel); overflow: hidden; border: 1px solid var(--color-neutral-200); background: var(--color-neutral-100); }
        .sample-figure figcaption { margin-top: 12px; }
        @media (min-width: 1024px) { .sample-more .kus-band__label { grid-column: 1 / -1; } }
        @media (max-width: 639px) {
          .sample-fact { grid-template-columns: minmax(0, 1fr); gap: 4px; }
        }
      `}</style>
    </div>
  );
}

/* `morphSlug` gives the image frame the same view-transition name as the
   piece's WorkCard frame, so opening the card morphs it into this image. */
function Figure({ g, priority = false, max = "100%", morphSlug }: { g: WorkImage; priority?: boolean; max?: string; morphSlug?: string }) {
  const frame = (
    <div className="sample-figure__frame">
      <Image
        src={g.src}
        alt={g.alt}
        width={g.width}
        height={g.height}
        priority={priority}
        sizes={max === "100%" ? "(max-width: 1320px) 100vw, 1240px" : `(max-width: 900px) 100vw, ${max}`}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </div>
  );
  return (
    <figure className="sample-figure" style={{ maxWidth: max }}>
      {morphSlug ? <WorkMediaTransition slug={morphSlug}>{frame}</WorkMediaTransition> : frame}
      {g.caption && <figcaption className="kus-t-body">{g.caption}</figcaption>}
    </figure>
  );
}
