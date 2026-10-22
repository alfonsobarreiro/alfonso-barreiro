import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { WorkCard } from "@/components/work/WorkCard";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { WORK, sortByStatus, visibleFilters, type Discipline } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies, sample websites, logos, social campaigns, and print by Alfonso Barreiro, designer and web developer in Portland, OR.",
  alternates: { canonical: "https://www.barreiro.com/work" },
};

const SECTION_X = "clamp(32px, 6vw, 80px)";

const h2: React.CSSProperties = {
  fontFamily:    "var(--font-dm-sans), sans-serif",
  fontSize:      "clamp(28px, 3vw, 40px)",
  fontWeight:    500,
  color:         "var(--color-text)",
  margin:        "0 0 8px",
  letterSpacing: "-0.02em",
  lineHeight:    1.1,
};
const deck: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize:   "17px",
  lineHeight: 1.45,
  color:      "var(--color-neutral-600)",
  margin:     "0 0 clamp(28px, 3vw, 40px)",
  maxWidth:   "640px",
};

export default async function WorkIndex({ searchParams }: { searchParams: Promise<{ d?: string }> }) {
  const { d } = await searchParams;
  const filters = visibleFilters();
  const active = filters.find((f) => f.key === d)?.key as Discipline | undefined;
  const items = active ? WORK.filter((w) => w.disciplines.includes(active)) : WORK;
  const caseStudies = items.filter((w) => w.depth === "Case study");
  const samples = sortByStatus(items.filter((w) => w.depth === "Sample"));
  const countFor = (key: Discipline) => WORK.filter((w) => w.disciplines.includes(key)).length;

  return (
    <>
      <Nav />
      <main id="main-content" style={{ background: "var(--color-paper)", paddingTop: "72px" }}>
        <header style={{ padding: `clamp(56px, 10vw, 112px) ${SECTION_X} clamp(32px, 5vw, 56px)` }}>
          <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
            <h1
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "clamp(48px, 6vw, 72px)",
                fontWeight:    500,
                color:         "var(--color-text)",
                margin:        "0 0 16px",
                letterSpacing: "-0.02em",
                lineHeight:    1.05,
              }}
            >
              Work
            </h1>
            <p style={{ ...deck, margin: "0 0 32px" }}>
              Case studies, sample websites, logos, social campaigns, and print. The case studies go deep. The samples are one screen each, with a live link where there is one.
            </p>

            <nav aria-label="Filter work by discipline">
              <ul style={{ display: "flex", flexWrap: "wrap", gap: "8px", listStyle: "none", margin: 0, padding: 0 }}>
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
          <section aria-labelledby="work-case-studies" style={{ padding: `clamp(24px, 3vw, 40px) ${SECTION_X} clamp(56px, 7vw, 96px)` }}>
            <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
              <h2 id="work-case-studies" style={h2}>Case studies</h2>
              <p style={deck}>The problem, the decisions, and what shipped.</p>
              <div className="work-grid">
                {caseStudies.map((item, i) => <WorkCard key={item.slug} item={item} priority={i < 3} />)}
              </div>
            </div>
          </section>
        )}

        {samples.length > 0 && (
          <section aria-labelledby="work-samples" style={{ padding: `0 ${SECTION_X} clamp(64px, 8vw, 112px)` }}>
            <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", borderTop: caseStudies.length ? "1px solid var(--color-neutral-300)" : "none", paddingTop: caseStudies.length ? "clamp(48px, 6vw, 80px)" : 0 }}>
              <h2 id="work-samples" style={h2}>Samples</h2>
              <p style={deck}>Client and in-house work first, then my own ventures, then the concept sites I built for my studio.</p>
              <div className="work-grid">
                {samples.map((item, i) => <WorkCard key={item.slug} item={item} priority={!caseStudies.length && i < 3} />)}
              </div>
            </div>
          </section>
        )}

        <section style={{ padding: `0 ${SECTION_X} clamp(80px, 9vw, 128px)` }}>
          <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", borderTop: "1px solid var(--color-neutral-300)", paddingTop: "clamp(40px, 5vw, 64px)" }}>
            <p style={{ ...deck, color: "var(--color-text)", margin: "0 0 20px" }}>
              The sample sites come from Alpha Beta Design, my studio, where every package has its price on the page.
            </p>
            <LinkArrow href="https://www.alphabeta.design/services">See packages at alphabeta.design</LinkArrow>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
