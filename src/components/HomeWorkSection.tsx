import { WorkCard } from "@/components/work/WorkCard";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { bySlug, type WorkItem } from "@/lib/work";

/* One homepage band per kind of work. Same heading scale, card grid, and
   "See all" link in every band, so websites, logos, campaigns, and case
   studies read as one body of work rather than a portfolio with extras. */
export default function HomeWorkSection({
  id,
  title,
  deck,
  slugs,
  seeAll,
  tinted = false,
  priority = false,
}: {
  id: string;
  title: string;
  deck: string;
  slugs: string[];
  seeAll: { href: string; label: string };
  tinted?: boolean;
  priority?: boolean;
}) {
  const items = slugs.map(bySlug).filter((w): w is WorkItem => Boolean(w));
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      style={{
        padding:    "clamp(72px, 8vw, 112px) clamp(24px, 6vw, 80px)",
        background: tinted ? "var(--color-neutral-100)" : "var(--color-paper)",
        borderTop:  tinted ? "none" : "1px solid var(--color-neutral-200)",
      }}
    >
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
        <h2
          id={`${id}-title`}
          style={{
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "clamp(40px, 5vw, 60px)",
            fontWeight:    500,
            color:         "var(--color-text)",
            margin:        0,
            letterSpacing: "-0.02em",
            lineHeight:    1.05,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize:   "17px",
            lineHeight: 1.45,
            color:      "var(--color-neutral-600)",
            margin:     "12px 0 clamp(40px, 5vw, 56px)",
            maxWidth:   "640px",
          }}
        >
          {deck}
        </p>
        <div className="work-grid">
          {items.map((item, i) => <WorkCard key={item.slug} item={item} priority={priority && i < 3} />)}
        </div>
        <div style={{ marginTop: "clamp(36px, 4vw, 48px)" }}>
          <LinkArrow href={seeAll.href}>{seeAll.label}</LinkArrow>
        </div>
      </div>
    </section>
  );
}
