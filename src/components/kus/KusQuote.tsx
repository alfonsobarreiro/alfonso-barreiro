import { TESTIMONIALS, type Testimonial } from "@/components/home/HomeTestimonials";
import { bySlug } from "@/lib/work";
import KusQuoteDeck, { type DeckItem } from "@/components/kus/KusQuoteDeck";

/* What clients say (spec 2.14, rebuilt 2026-11-05: "Make What Clients say
   much cooler. We have their pictures; add JP. Rotate it somehow cool.").
   One blue slab right before the close (Farley: the client's words come
   right before the ask), all text white at 5.34:1.

   Three clients, one quote at a time at the quote size, beside a deck of
   their portraits as prints. The deck rotates: the front print tucks to
   the back and the next one comes forward (KusQuoteDeck). Each full
   testimonial still sits in a disclosure, so nothing is cut, and the
   pulls are verbatim excerpts of the bodies.

   JP Clement's words are verbatim from this site's earlier testimonials
   carousel (src/components/Testimonials.tsx, commit 4b296b2). His role
   line drops "Founder, The Marketing Distillery", which stays off
   barreiro.com; it keeps the part about VARA and Boomtime, where Alfonso
   worked in-house. Portraits: Kendra Toth's and Pamela Accetta Smith's
   are square crops of the 2025 testimonial photos (iCloud, Portfolio and
   Job Search/Testimonials); JP's is the 179px photo the ABD site uses,
   the only one on file.

   This file stays on the server so work.ts never ships to the client;
   the deck gets plain data. */

const JP: Testimonial = {
  pull: "The deck he built sells me better than I sell myself.",
  body: "Alfonso didn't take my word for what my business should be. He interviewed me like a researcher, pressure-tested my positioning against the actual market, and came back with evidence, not opinions. The deck he built sells me better than I sell myself. If you get the chance to work with him, take it.",
  name: "JP Clement",
  role: "Former CEO, VARA & Boomtime",
  linkedin: "https://www.linkedin.com/in/jpclement/",
};

const PHOTOS: Record<string, { src: string; width: number; height: number }> = {
  "Kendra Toth":          { src: "/images/home/testimonials/kendra-toth.jpg",          width: 720, height: 720 },
  "JP Clement":           { src: "/images/home/testimonials/jp-clement.jpg",           width: 179, height: 179 },
  "Pamela Accetta Smith": { src: "/images/home/testimonials/pamela-accetta-smith.jpg", width: 720, height: 720 },
};

/* Kendra leads (the shorter line, and it speaks to strategy), then JP,
   then Pamela. */
const ORDER = ["Kendra Toth", "JP Clement", "Pamela Accetta Smith"];

/* The sample page for a quote, or null when the slug is gone or no longer a Sample. */
function sampleHref(slug: string): string | null {
  const item = bySlug(slug);
  return item && item.depth === "Sample" ? `/work/samples/${item.slug}` : null;
}

export default function KusQuote() {
  const all = [...TESTIMONIALS, JP];
  const items: DeckItem[] = ORDER.flatMap((name) => {
    const t = all.find((x) => x.name === name);
    const photo = PHOTOS[name];
    if (!t || !photo) return [];
    const href = t.sample ? sampleHref(t.sample.slug) : null;
    return [{
      key: name,
      pull: t.pull,
      body: t.body,
      name: t.name,
      role: t.role,
      linkedin: t.linkedin ?? null,
      /* "See the brochure" here: the name sits right above it, and the
         full "See the Kendra Toth Consulting brochure" wrapped the links
         to three lines on phones (2026-11-10, audit section 13). */
      sample: t.sample && href ? { href, label: t.sample.slug === "kendra-toth-brochure" ? "See the brochure" : t.sample.label } : null,
      photo,
    }];
  });
  if (items.length === 0) return null;

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="kus-band kus-quote">
      <div className="kus-wrap">
        <div className="kus-slab kus-slab--blue kus-quote__slab" data-reveal="">
          <KusQuoteDeck items={items} />
        </div>
      </div>
      <style>{`.kus-quote__slab { padding: var(--kus-slab-pad); }`}</style>
    </section>
  );
}
