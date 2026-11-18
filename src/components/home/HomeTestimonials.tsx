import { LinkArrow } from "@/components/ui/LinkArrow";
import { LinkedInBadge } from "@/components/ui/icons";
import { bySlug } from "@/lib/work";

/* Homepage testimonials: a reading band directly above the close, so doubt
   gets handled right before the ask. Two real, named clients, two up from
   768px and stacked on phones. Static on purpose: no carousel, no autoplay,
   nothing that moves.

   The data lives here, in a module without "use client", so this band stays
   server-rendered. The old carousel (src/components/Testimonials.tsx, not
   rendered anywhere) imports the same list, so there is one copy of each
   quote. A client module cannot hand plain data to a server component, which
   is why the list sits on this side of the boundary.

   Each quote names the piece it is about, and that piece is already on the
   homepage: the Sky Valley Comm logo in Logos, the Kendra Toth brochure in
   Ad campaigns and print. `sample` is a work.ts slug; the link renders only
   while that slug is a Sample, so a renamed slug drops the link instead of
   linking to a 404. */
export type Testimonial = {
  /** The oversized line. A verbatim excerpt of `body`, so the quote is never altered. */
  pull:      string;
  /** The full testimonial, as the client wrote it. */
  body:      string;
  name:      string;
  /** Role and company on one line. */
  role:      string;
  /** Full LinkedIn profile URL. */
  linkedin?: string;
  /** The work this quote is about: a work.ts slug with depth "Sample", and the link's label. */
  sample?:   { slug: string; label: string };
};

export const TESTIMONIALS: Testimonial[] = [
  {
    pull: "His ability to listen and translate my ideas into a professional, unique logo that stands out.",
    body: "Working with Alfonso on my company logo for Sky Valley Comm was a great experience. His keen eye for design and attention to detail helped bring my vision to life in a way that represents my brand. The most beneficial part of our collaboration was his ability to listen and translate my ideas into a professional, unique logo that stands out. His expertise made the process seamless, and the final result exceeded my expectations. Thanks to Alfonso’s work, my brand now has a strong and memorable identity.",
    name: "Pamela Accetta Smith",
    role: "Founder & CEO, Sky Valley Comm",
    linkedin: "https://www.linkedin.com/in/pamela-accetta-smith-5278379/",
    sample: { slug: "sky-valley-comm", label: "See the Sky Valley Comm logo" },
  },
  {
    pull: "He offered a perspective on my work that I often miss.",
    body: "Alfonso Barreiro’s expertise is truly remarkable. The Branding and Marketing Plan he designed for my small business was comprehensive, insightful, and creatively inspiring. He offered a perspective on my work that I often miss, exceeding my expectations with both depth and detail. His collaborative approach ensured the final product aligned perfectly with my vision and business needs. I’m deeply grateful for his skill, dedication, and guidance in helping take my business to the next level.",
    name: "Kendra Toth",
    role: "Kendra Toth Consulting",
    linkedin: "https://www.linkedin.com/in/kendra-toth-1b95a0159/",
    sample: { slug: "kendra-toth-brochure", label: "See the Kendra Toth Consulting brochure" },
  },
];

const font = "var(--font-dm-sans), sans-serif";

/* The sample page for a quote, or null when the slug is gone or no longer a Sample. */
function sampleHref(slug: string): string | null {
  const item = bySlug(slug);
  return item && item.depth === "Sample" ? `/work/samples/${item.slug}` : null;
}

export default function HomeTestimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="home-testimonials-title"
      style={{
        padding:    "clamp(72px, 8vw, 112px) clamp(24px, 6vw, 80px)",
        background: "var(--color-paper)",
        borderTop:  "1px solid var(--color-neutral-200)",
      }}
    >
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
        <h2
          id="home-testimonials-title"
          style={{ fontFamily: font, fontSize: "clamp(28px, 4.2vw, 60px)", fontWeight: 500, color: "var(--color-text)", margin: "0 0 clamp(40px, 5vw, 56px)", letterSpacing: "-0.02em", lineHeight: 1.05 }}
        >
          What clients say
        </h2>

        <div className="home-testimonials-grid">
          {TESTIMONIALS.map((t) => {
            const href = t.sample ? sampleHref(t.sample.slug) : null;
            return (
              <figure key={t.name} className="home-testimonial">
                {/* The pull repeats a sentence of the body, so screen
                    readers skip it and hear the quote once, in full. */}
                <p
                  aria-hidden="true"
                  className="home-testimonial-pull"
                  style={{ fontFamily: font, fontSize: "clamp(22px, 2.2vw, 30px)", fontWeight: 400, lineHeight: 1.25, letterSpacing: "-0.01em", color: "var(--color-text)", margin: "0 0 20px" }}
                >
                  &ldquo;{t.pull}&rdquo;
                </p>
                <blockquote style={{ margin: "0 0 28px" }}>
                  <p style={{ fontFamily: font, fontSize: "17px", lineHeight: 1.55, color: "var(--color-neutral-700)", margin: 0 }}>
                    {t.body}
                  </p>
                </blockquote>
                <figcaption style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  {t.linkedin ? (
                    <a
                      href={t.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t.name} on LinkedIn (opens in new tab)`}
                      className="home-testimonial-name"
                      style={{ fontFamily: font, fontSize: "17px", fontWeight: 500, lineHeight: 1.2, color: "var(--color-text)", textDecoration: "none" }}
                    >
                      {t.name}
                      <LinkedInBadge size={18} />
                    </a>
                  ) : (
                    <span style={{ fontFamily: font, fontSize: "17px", fontWeight: 500, lineHeight: 1.2, color: "var(--color-text)" }}>
                      {t.name}
                    </span>
                  )}
                  <span style={{ fontFamily: font, fontSize: "15px", lineHeight: 1.45, color: "var(--color-neutral-600)", marginTop: "4px" }}>
                    {t.role}
                  </span>
                  {t.sample && href && (
                    <LinkArrow href={href} className="home-testimonial-work">
                      {t.sample.label}
                    </LinkArrow>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
      <style>{`
        .home-testimonials-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 56px;
        }
        @media (min-width: 768px) {
          .home-testimonials-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: clamp(40px, 5vw, 80px);
          }
        }
        /* The same rule and inset as the What I do rows: a reading band, not cards. */
        .home-testimonial {
          margin: 0;
          border-top: 1px solid var(--color-neutral-500);
          padding-top: 24px;
          max-width: 640px;
        }
        /* No one-word last line on the pull. */
        .home-testimonial-pull { text-wrap: pretty; }
        /* Tap areas: 44px or more for each link. An invisible ::before
           grows the target past the text, so the layout and the focus ring
           stay on the text itself. */
        .home-testimonial-name,
        .home-testimonial-work.ui-linkarrow { position: relative; }
        .home-testimonial-name::before,
        .home-testimonial-work.ui-linkarrow::before {
          content: "";
          position: absolute;
          inset: -13px 0;
        }
        .home-testimonial-name {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border-radius: 2px;
        }
        .home-testimonial-name:hover { color: var(--color-text-link); text-decoration: underline; text-underline-offset: 3px; }
        .home-testimonial-name:focus-visible { outline: 2px solid var(--color-focus-ring); outline-offset: 3px; }
        .home-testimonial-work.ui-linkarrow { margin-top: 16px; }
      `}</style>
    </section>
  );
}
