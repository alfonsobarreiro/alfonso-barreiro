import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { WorkCard } from "@/components/work/WorkCard";
import { WORK, bySlug, eyebrowFor, sortByStatus } from "@/lib/work";

const SECTION_X = "clamp(32px, 6vw, 80px)";
const PROSE_MAX = "680px";

export const dynamicParams = false;

export function generateStaticParams() {
  return WORK.filter((w) => w.depth === "Sample").map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = bySlug(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `https://www.barreiro.com/work/samples/${item.slug}` },
    openGraph: { title: `${item.title} · Alfonso Barreiro`, description: item.summary, images: [item.cover.src] },
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
  const related = sortByStatus(
    WORK.filter((w) => w.slug !== item.slug && w.disciplines.includes(item.disciplines[0])),
  ).slice(0, 3);

  return (
    <>
      <Nav />
      <main id="main-content" style={{ background: "var(--color-paper)", paddingTop: "72px" }}>
        <header style={{ padding: `clamp(40px, 7vw, 80px) ${SECTION_X} clamp(32px, 4vw, 48px)` }}>
          <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
            <Link
              href="/work"
              className="ui-linkarrow ui-linkarrow--on-light"
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            "8px",
                fontFamily:     "var(--font-dm-sans), sans-serif",
                fontSize:       "var(--text-body)",
                fontWeight:     500,
                color:          "var(--color-text-link)",
                textDecoration: "none",
                marginBottom:   "clamp(32px, 5vw, 56px)",
                padding:        "10px 0",
              }}
            >
              <span aria-hidden="true">←</span>
              <span style={{ borderBottom: "1px solid currentColor", paddingBottom: "2px" }}>All work</span>
            </Link>

            <Eyebrow style={{ marginBottom: "14px" }}>{eyebrowFor(item)}</Eyebrow>
            <h1
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "clamp(40px, 4.8vw, 60px)",
                fontWeight:    500,
                color:         "var(--color-text)",
                margin:        "0 0 20px",
                letterSpacing: "-0.02em",
                lineHeight:    1.1,
              }}
            >
              {item.title}
            </h1>
            {item.note && (
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize:   "var(--text-body)",
                  lineHeight: 1.55,
                  color:      "var(--color-neutral-600)",
                  margin:     "0 0 32px",
                  maxWidth:   PROSE_MAX,
                }}
              >
                {item.note}
              </p>
            )}

            <dl style={{ margin: "0 0 32px", padding: 0, display: "grid", gap: "16px", maxWidth: "820px" }}>
              {facts.filter(([, v]) => v).map(([label, value]) => (
                <div
                  key={label}
                  className="sample-fact"
                  style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "24px", alignItems: "baseline" }}
                >
                  <dt style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "var(--text-small)", fontWeight: 500, color: "var(--color-accent)", margin: 0 }}>
                    {label}
                  </dt>
                  <dd style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "17px", lineHeight: 1.5, color: "var(--color-text)", margin: 0 }}>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {item.live && <LinkArrow href={item.live.href}>Open {item.live.label}</LinkArrow>}
          </div>
        </header>

        {item.gallery && item.gallery.length > 0 && (
          <section aria-label="Images" style={{ padding: `clamp(16px, 2vw, 24px) ${SECTION_X} clamp(64px, 8vw, 112px)` }}>
            <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", display: "grid", gap: "clamp(32px, 4vw, 56px)" }}>
              {item.gallery.map((g, i) => (
                <figure key={g.src} style={{ margin: 0 }}>
                  <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid var(--color-neutral-200)", background: "var(--color-neutral-100)" }}>
                    <Image
                      src={g.src}
                      alt={g.alt}
                      width={g.width}
                      height={g.height}
                      priority={i === 0}
                      sizes="(max-width: 1320px) 100vw, 1240px"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                  {g.caption && (
                    <figcaption style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "var(--text-body)", color: "var(--color-neutral-600)", marginTop: "12px" }}>
                      {g.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section aria-labelledby="sample-related" style={{ padding: `0 ${SECTION_X} clamp(80px, 9vw, 128px)` }}>
            <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", borderTop: "1px solid var(--color-neutral-300)", paddingTop: "clamp(48px, 6vw, 80px)" }}>
              <h2
                id="sample-related"
                style={{
                  fontFamily:    "var(--font-dm-sans), sans-serif",
                  fontSize:      "clamp(28px, 3vw, 40px)",
                  fontWeight:    500,
                  color:         "var(--color-text)",
                  margin:        "0 0 clamp(28px, 3vw, 40px)",
                  letterSpacing: "-0.02em",
                  lineHeight:    1.1,
                }}
              >
                More like this
              </h2>
              <div className="work-grid">
                {related.map((r) => <WorkCard key={r.slug} item={r} />)}
              </div>
              <div style={{ marginTop: "clamp(32px, 4vw, 48px)" }}>
                <LinkArrow href="/work">All work</LinkArrow>
              </div>
            </div>
          </section>
        )}

        <style>{`
          @media (max-width: 639px) {
            .sample-fact { grid-template-columns: 1fr !important; gap: 4px !important; }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}
