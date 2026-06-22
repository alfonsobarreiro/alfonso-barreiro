import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import BackToTop from "@/components/BackToTop";
import { PersonSchema } from "@/components/structured-data/PersonSchema";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.barreiro.com" },
  openGraph: {
    url: "https://www.barreiro.com",
  },
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

export default function Home() {
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
