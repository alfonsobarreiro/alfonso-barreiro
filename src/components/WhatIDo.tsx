import { LinkArrow } from "@/components/ui/LinkArrow";
import ScopePicker from "@/components/home/ScopePicker";

/* Homepage: six capabilities from Alfonso's own list, each linking to the
   work that shows it, then the studio block. Since 2026-11-01 ("say more
   with less") each capability is one line, the body folded into the
   title: every platform name stays, the promises go, since the work above
   made them. `body` is optional and renders only when set. Prices live on alphabeta.design only; this
   section names the packages and links to each one. The package list is
   ScopePicker: check what you need and it cuts to the one package that fits.
   On /hiring (audience "hiring") the studio block is not rendered: job
   applications never link the studio. The capabilities stay. */
export const SERVICES: { title: string; body?: string; href: string; link: string }[] = [
  {
    title: "UX research, design systems, and UX/UI",
    href:  "/work#case-studies",
    link:  "See the case studies",
  },
  {
    title: "Front-end development in Next.js, React, and Framer",
    href:  "/work?d=web",
    link:  "See web work",
  },
  {
    title: "CMS and e-commerce: WordPress, Shopify, and WooCommerce",
    href:  "/resume",
    link:  "See the resume",
  },
  {
    title: "SEO and email marketing",
    href:  "/work?d=social",
    link:  "See campaign work",
  },
  {
    title: "AI assistants that cite their source",
    href:  "/work/msr-chatbot",
    link:  "See Alfred",
  },
  {
    title: "Brand, print, and site audits",
    href:  "/work?d=brand",
    link:  "See brand work",
  },
];

const font = "var(--font-dm-sans), sans-serif";

export default function WhatIDo({ audience = "all" }: { audience?: "all" | "hiring" } = {}) {
  return (
    <section
      id="what-i-do"
      aria-labelledby="what-i-do-title"
      style={{
        padding:    "clamp(72px, 8vw, 112px) clamp(24px, 6vw, 80px)",
        background: "var(--color-neutral-100)",
      }}
    >
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
        <h2
          id="what-i-do-title"
          style={{ fontFamily: font, fontSize: "clamp(28px, 4.2vw, 60px)", fontWeight: 500, color: "var(--color-text)", margin: "0 0 clamp(40px, 5vw, 56px)", letterSpacing: "-0.02em", lineHeight: 1.05 }}
        >
          What I do
        </h2>

        <ul className="whatido-grid" style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "clamp(32px, 3vw, 40px) clamp(32px, 4vw, 56px)" }}>
          {SERVICES.map((s) => (
            <li key={s.title} style={{ borderTop: "1px solid var(--color-neutral-500)", paddingTop: "20px" }}>
              <h3 style={{ fontFamily: font, fontSize: "clamp(20px, 1.8vw, 24px)", fontWeight: 500, color: "var(--color-text)", margin: "0 0 10px", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                {s.title}
              </h3>
              {s.body ? (
                <p style={{ fontFamily: font, fontSize: "var(--text-body)", lineHeight: 1.55, color: "var(--color-neutral-700)", margin: "0 0 16px" }}>
                  {s.body}
                </p>
              ) : null}
              <LinkArrow href={s.href}>{s.link}</LinkArrow>
            </li>
          ))}
        </ul>

        {/* #studio: target of the nav's Studio item. The scroll margin
            clears the fixed 72px nav plus 24px of air. */}
        {audience !== "hiring" && (
          <div
            id="studio"
            className="studio-block"
            style={{
              scrollMarginTop:     "96px",
              marginTop:           "clamp(56px, 7vw, 96px)",
              background:          "var(--color-paper)",
              border:              "1px solid var(--color-neutral-300)",
              borderRadius:        "var(--radius-card)",
              padding:             "clamp(28px, 4vw, 48px)",
              display:             "grid",
              gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
              gap:                 "clamp(28px, 4vw, 56px)",
              alignItems:          "start",
            }}
          >
            <div>
              <p style={{ fontFamily: font, fontSize: "var(--text-small)", fontWeight: 500, color: "var(--color-accent)", margin: "0 0 12px" }}>
                Alpha Beta Design
              </p>
              <p style={{ fontFamily: font, fontSize: "clamp(22px, 2.2vw, 28px)", fontWeight: 500, color: "var(--color-text)", margin: "0 0 16px", lineHeight: 1.25, letterSpacing: "-0.01em" }}>
                Sites, landing pages, brand identity, and teardowns are fixed-price packages at my studio.
              </p>
              <p style={{ fontFamily: font, fontSize: "var(--text-body)", lineHeight: 1.55, color: "var(--color-neutral-700)", margin: "0 0 24px" }}>
                Prices are on the page and research comes before design. On a site build, the code and hosting move to your accounts at launch.
              </p>
              <LinkArrow href="https://www.alphabeta.design/services">Packages and prices</LinkArrow>
            </div>
            <ScopePicker />
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 1023px) { .whatido-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
        @media (max-width: 767px)  { .studio-block { grid-template-columns: 1fr !important; } }
        @media (max-width: 639px)  { .whatido-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
