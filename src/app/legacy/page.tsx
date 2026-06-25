import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/legacy/Nav";
import Hero from "@/components/legacy/Hero";
import Work from "@/components/legacy/Work";
import About from "@/components/legacy/About";
import Footer from "@/components/legacy/Footer";
import CookieConsent from "@/components/CookieConsent";
import BackToTop from "@/components/BackToTop";
import { PersonSchema } from "@/components/structured-data/PersonSchema";

/* Legacy homepage — snapshot of the live barreiro.com homepage taken on
   2026-06-24, kept locally for side-by-side comparison against the new
   editorial redesign at /. Not for production: noindex so search
   crawlers don't pick it up, and the page is a notFound() in production
   (only renders on the dev server). */
export const metadata: Metadata = {
  title:    "Legacy Homepage · Alfonso Barreiro",
  robots:   { index: false, follow: false },
};

function SectionDivider() {
  return (
    <div
      style={{
        display:        "flex",
        justifyContent: "center",
        alignItems:     "center",
        padding:        "0 clamp(32px, 6vw, 80px)",
      }}
    >
      <div
        style={{
          width:      "48px",
          height:     "1px",
          background: "#6E6E6A",
        }}
      />
    </div>
  );
}

export default function LegacyHome() {
  /* Internal authoring only — guarded so the legacy snapshot can never
     ship to production. Matches the pattern used by /prototypes/* and
     /audits/*. Renders normally on the dev server. */
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main>
      <PersonSchema />
      <Nav />
      <Hero />
      <SectionDivider />
      <Work />
      <SectionDivider />
      <About />
      <Footer />
      <BackToTop />
      <CookieConsent />
    </main>
  );
}
