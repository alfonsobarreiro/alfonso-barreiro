import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HomeWorkSection from "@/components/HomeWorkSection";
import WhatIDo from "@/components/WhatIDo";
import HomeAbout from "@/components/HomeAbout";
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
    title: "Alfonso Barreiro · Designer and web developer",
    description:
      "Designer and web developer in Portland, OR. Fifteen years in design. Websites, logos, ad campaigns, and print, plus five case studies: Alfred (an AI assistant for Men's Sole Revival), AIGA Portland, Men's Sole Revival, Wayfarer, Spotify.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Alfonso Barreiro · Designer and web developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alfonso Barreiro · Designer and web developer",
    description:
      "Designer and web developer in Portland, OR. Fifteen years in design. Websites, logos, ad campaigns, and print, plus five case studies: Alfred (an AI assistant for Men's Sole Revival), AIGA Portland, Men's Sole Revival, Wayfarer, Spotify.",
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
        <HomeWorkSection
          id="websites"
          title="Websites"
          deck="My studio's site and the sample sites I built for it. Every one is live."
          slugs={["alphabeta-design", "whittaker-hotel", "emblem-coffee", "sandwich-shop", "bookstore", "layercue"]}
          seeAll={{ href: "/work?d=web", label: "See all web work" }}
          priority
        />
        <HomeWorkSection
          id="logos"
          title="Logos"
          deck="Marks for clients and for my own ventures."
          slugs={["sky-valley-comm", "nq-zebraworks", "becourageous-leadership", "alpha-beta-mark", "mens-sole-revival-shield"]}
          seeAll={{ href: "/work?d=brand", label: "See all brand work" }}
        />
        <HomeWorkSection
          id="campaigns"
          title="Ad campaigns and print"
          deck="Social campaigns, sales collateral, and lead-magnet playbooks, made in-house at VARA Winery & Distillery and Boomtime."
          slugs={["vara-social", "vara-cellar-sale", "vara-distributor-leave-behind", "vara-rack-card-tasting-cards", "boomtime-word-of-mouth-playbook", "boomtime-one-pager"]}
          seeAll={{ href: "/work?d=social", label: "See all social and marketing work" }}
        />
        <HomeWorkSection
          id="work"
          title="Case studies"
          deck="The problem, the decisions, and what shipped."
          slugs={["msr-chatbot", "aiga-portland", "mens-sole-revival", "wayfarer", "spotify"]}
          seeAll={{ href: "/work", label: "See all work" }}
        />
        <WhatIDo />
        <HomeAbout />
        <Footer />
      </main>
      <BackToTop />
    </>
  );
}

