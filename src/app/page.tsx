import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { PersonSchema } from "@/components/structured-data/PersonSchema";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.barreiro.com" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.barreiro.com",
    siteName: "Alfonso Barreiro",
    title: "Alfonso Barreiro · Product Designer",
    description:
      "Product Designer (UX/UI) in Portland, OR. Fifteen years in design. Five case studies: Alfred (an AI assistant for Men's Sole Revival), AIGA Portland, Men's Sole Revival, Wayfarer, Spotify.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Alfonso Barreiro · Product Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alfonso Barreiro · Product Designer",
    description:
      "Product Designer (UX/UI) in Portland, OR. Fifteen years in design. Five case studies: Alfred (an AI assistant for Men's Sole Revival), AIGA Portland, Men's Sole Revival, Wayfarer, Spotify.",
    images: ["/opengraph-image"],
    creator: "@alfbarreiro",
  },
};

export default function Home() {
  return (
    <>
      <PersonSchema />
      <Nav />
      <main id="main-content">
        <Hero />
        <Work />
        <Footer />
      </main>
      <BackToTop />
    </>
  );
}

