import Link from "next/link";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DISCIPLINES, eyebrowFor, hrefFor, type WorkItem } from "@/lib/work";

/* One card for the /work index, the homepage More work grid, and the
   related row on sample pages. 16:10 image with the 10px browser-window
   radius used for flat screenshots, then eyebrow, title, one line, and a
   depth tag so a case study and a quick sample never read as the same
   kind of entry. */
export function WorkCard({ item, priority = false }: { item: WorkItem; priority?: boolean }) {
  const disciplineLabels = item.disciplines
    .map((d) => DISCIPLINES.find((x) => x.key === d)?.label)
    .filter(Boolean)
    .join(", ");

  return (
    <Link href={hrefFor(item)} className="wcard">
      <div
        className="wcard__img"
        style={{
          position:     "relative",
          aspectRatio:  "16 / 10",
          overflow:     "hidden",
          borderRadius: "10px",
          background:   "var(--color-neutral-100)",
          border:       "1px solid var(--color-neutral-200)",
        }}
      >
        <Image
          src={item.cover.src}
          alt={item.cover.alt}
          fill
          priority={priority}
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 400px"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
      </div>
      <div style={{ marginTop: "16px" }}>
        <Eyebrow style={{ marginBottom: "8px" }}>{eyebrowFor(item)}</Eyebrow>
        <h3
          className="wcard__title"
          style={{
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "clamp(20px, 1.8vw, 24px)",
            fontWeight:    500,
            color:         "var(--color-text)",
            margin:        "0 0 8px",
            letterSpacing: "-0.01em",
            lineHeight:    1.2,
            transition:    "color 0.2s ease",
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize:   "var(--text-body)",
            lineHeight: 1.5,
            color:      "var(--color-neutral-700)",
            margin:     "0 0 10px",
          }}
        >
          {item.summary}
        </p>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize:   "var(--text-small)",
            fontWeight: 500,
            color:      "var(--color-neutral-600)",
            margin:     0,
          }}
        >
          {item.depth} · {disciplineLabels}
        </p>
      </div>
    </Link>
  );
}
