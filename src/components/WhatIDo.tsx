import Link from "next/link";
import { LinkArrow } from "@/components/ui/LinkArrow";

/* Homepage: six capabilities from Alfonso's own list, each linking to the
   work that shows it, then the studio block. Prices live on alphabeta.design only; this
   section names the packages and links to each one. */
const SERVICES = [
  {
    title: "UX research and design",
    body:  "UX research, design systems, and UX/UI, from the first question to the shipped screen.",
    href:  "/work?d=product",
    link:  "See the case studies",
  },
  {
    title: "Front-end development",
    body:  "Next.js, React, and Framer. Designed in Figma, built in code.",
    href:  "/work?d=web",
    link:  "See web work",
  },
  {
    title: "CMS and e-commerce",
    body:  "WordPress, Shopify, and WooCommerce.",
    href:  "/resume",
    link:  "See the resume",
  },
  {
    title: "SEO and email marketing",
    body:  "Search setup, email capture, and the campaigns that run on them.",
    href:  "/work?d=social",
    link:  "See marketing work",
  },
  {
    title: "AI and chatbots",
    body:  "Assistants that answer from your own content, cite their source, and know when to stop.",
    href:  "/work/msr-chatbot",
    link:  "See Alfred",
  },
  {
    title: "Brand, print, and site audits",
    body:  "Logos, collateral, and audits with a fix for every finding.",
    href:  "/work?d=brand",
    link:  "See brand work",
  },
];

const PACKAGES = [
  { name: "Site",             anchor: "site" },
  { name: "Site+",            anchor: "site-plus" },
  { name: "Landing page",     anchor: "landing-page" },
  { name: "Brand identity",   anchor: "brand-identity" },
  { name: "Website teardown", anchor: "website-teardown" },
];

const font = "var(--font-dm-sans), sans-serif";

export default function WhatIDo() {
  return (
    <section
      id="what-i-do"
      aria-labelledby="what-i-do-title"
      style={{
        padding:    "clamp(80px, 9vw, 128px) clamp(32px, 6vw, 80px)",
        background: "var(--color-neutral-100)",
      }}
    >
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
        <h2
          id="what-i-do-title"
          style={{ fontFamily: font, fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 500, color: "var(--color-text)", margin: "0 0 clamp(40px, 5vw, 64px)", letterSpacing: "-0.02em", lineHeight: 1.05 }}
        >
          What I do
        </h2>

        <ul className="whatido-grid" style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "clamp(32px, 3vw, 40px) clamp(32px, 4vw, 56px)" }}>
          {SERVICES.map((s) => (
            <li key={s.title} style={{ borderTop: "1px solid var(--color-neutral-500)", paddingTop: "20px" }}>
              <h3 style={{ fontFamily: font, fontSize: "clamp(20px, 1.8vw, 24px)", fontWeight: 500, color: "var(--color-text)", margin: "0 0 10px", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: font, fontSize: "var(--text-body)", lineHeight: 1.55, color: "var(--color-neutral-700)", margin: "0 0 16px" }}>
                {s.body}
              </p>
              <LinkArrow href={s.href}>{s.link}</LinkArrow>
            </li>
          ))}
        </ul>

        <div
          className="studio-block"
          style={{
            marginTop:           "clamp(56px, 7vw, 96px)",
            background:          "var(--color-paper)",
            border:              "1px solid var(--color-neutral-300)",
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
              I sell this work as fixed-price packages through my studio.
            </p>
            <p style={{ fontFamily: font, fontSize: "var(--text-body)", lineHeight: 1.55, color: "var(--color-neutral-700)", margin: "0 0 24px" }}>
              Every price is on the page, every project starts with research, and the code and hosting are yours at launch.
            </p>
            <LinkArrow href="https://www.alphabeta.design/services">Packages and prices at alphabeta.design</LinkArrow>
          </div>
          <ul aria-label="Packages" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {PACKAGES.map((p, i) => (
              <li key={p.anchor} style={{ borderTop: i === 0 ? "1px solid var(--color-neutral-300)" : "none", borderBottom: "1px solid var(--color-neutral-300)" }}>
                <Link
                  href={`https://www.alphabeta.design/services#${p.anchor}`}
                  className="studio-package"
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", minHeight: "48px", boxSizing: "border-box", fontFamily: font, fontSize: "17px", fontWeight: 500, color: "var(--color-text)", textDecoration: "none" }}
                >
                  {p.name}
                  <span aria-hidden="true" style={{ color: "var(--color-text-link)" }}>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .studio-package:hover { color: var(--color-text-link) !important; }
        .studio-package:focus-visible { outline: 2px solid var(--color-focus-ring); outline-offset: 2px; }
        @media (max-width: 1023px) { .whatido-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
        @media (max-width: 767px)  { .studio-block { grid-template-columns: 1fr !important; } }
        @media (max-width: 639px)  { .whatido-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
