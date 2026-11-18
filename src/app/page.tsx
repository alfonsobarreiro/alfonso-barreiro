import type { Metadata } from "next";
import KusHomePage from "@/components/kus/KusHomePage";

/* The homepage is the Kus-led composition (src/components/kus/KusHomePage.tsx,
   swapped in 2026-10-25; spec in the vault, "Kus-led direction 2026-10-24").
   /hiring was removed 2026-11-18 (it redirects here, next.config.ts).
   The earlier composition, src/components/home/HomePage.tsx, is no longer
   routed; it stays for one release in case the swap needs rolling back. */

export const metadata: Metadata = {
  alternates: { canonical: "https://www.barreiro.com" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.barreiro.com",
    siteName: "Alfonso Barreiro",
    title: "Alfonso Barreiro · Product designer and web developer",
    description:
      "Product designer and web developer in Portland, OR. Fifteen years in design. Websites, logos, ad campaigns, and print, plus five case studies: Alfred (an AI assistant for Men's Sole Revival), AIGA Portland, Men's Sole Revival, Wayfarer, Spotify.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Alfonso Barreiro · Product designer and web developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alfonso Barreiro · Product designer and web developer",
    description:
      "Product designer and web developer in Portland, OR. Fifteen years in design. Websites, logos, ad campaigns, and print, plus five case studies: Alfred (an AI assistant for Men's Sole Revival), AIGA Portland, Men's Sole Revival, Wayfarer, Spotify.",
    images: ["/opengraph-image"],
    creator: "@alfbarreiro",
  },
};

export default function Home() {
  return <KusHomePage audience="all" />;
}
