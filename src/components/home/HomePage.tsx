import type { CSSProperties } from "react";
import Image from "next/image";
import Nav from "@/components/Nav";
import HomeWorkSection from "@/components/HomeWorkSection";
import WhatIDo from "@/components/WhatIDo";
import HomeAbout from "@/components/HomeAbout";
import { WorkStyles } from "@/components/work/WorkStyles";
import NameTag from "@/components/home/NameTag";
import CutThenBuild from "@/components/home/CutThenBuild";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import HireClose from "@/components/home/HireClose";
import AlfredBand from "@/components/home/AlfredBand";
import { siteFlipMedia } from "@/components/home/SiteFlipMedia";
import { LogoMarkMedia, LogoSizerControl } from "@/components/home/LogoSizer";
import { campaignFlipMedia } from "@/components/home/flipPieces";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { PersonSchema } from "@/components/structured-data/PersonSchema";
import { bySlug } from "@/lib/work";

/* The homepage composition, shared by two routes:
   - "/"        audience "all": everything, the studio included.
   - "/hiring"  audience "hiring": the link full-time job applications use.
                Alfonso's rule (Get Me Hired, Crosscheck Findings, Sept 9):
                job applications never link Alpha Beta Design. So this
                version leaves out every studio surface (nav Studio, the
                studio's site and mark, the studio block, the About
                sentence, the close's studio door). They are not rendered
                at all, not hidden with CSS.

   Order (Oct 24 plan, alfOS Portfolio Website/Inspiration 2026-10-24):
   the name tag, then the work, then the ask. Proof first, so the close
   asks after the visitor has tried Alfred and cut a store.
    1. Name tag: the page's only H1 and one line. No buttons, no effects.
    2. Alfred (AlfredBand): two columns, the demo slides in from the right.
    3. AIGA Portland, with the role line. It sits between the two Men's
       Sole Revival pieces so they never run back to back (Alfonso,
       Oct 24: "we are doing two Mens Sole Revival in a row").
    4. Cut, then build on the MSR brief, then the MSR case study card.
    5. Websites, 6. Logos, 7. Ad campaigns and print (unchanged).
    8. Concepts: Cut, then build on the Wayfarer brief, then the Wayfarer
       and Spotify cards.
    9. What I do (studio block on "/" only), 10. Testimonials, 11. About,
   12. The close (the old hero, rebuilt at the bottom), then the footer.
   The old Case studies band is gone: its cards live in 2, 3, 4 and 8.

   Studio slugs: the studio's own site in Websites, its mark in Logos. */
export type HomeAudience = "all" | "hiring";

const STUDIO_SLUGS = new Set(["alphabeta-design", "alpha-beta-mark"]);

const WEB_SLUGS_ALL  = ["alphabeta-design", "whittaker-hotel", "emblem-coffee", "sandwich-shop", "bookstore", "layercue"];
const LOGO_SLUGS_ALL = ["sky-valley-comm", "nq-zebraworks", "becourageous-leadership", "alpha-beta-mark", "mens-sole-revival-shield"];

const WEB_DECK = {
  all:    "My studio's site and the sample sites I built for it. Every one is live.",
  hiring: "Concept sites I designed and built. Every one is live.",
} as const;

/* Band decks for the two case-study bands come from work.ts, so the card
   and the band never disagree. */
const MSR  = bySlug("mens-sole-revival");
const AIGA = bySlug("aiga-portland");

/* Draft copy for Alfonso's voice pass. */
const COPY = {
  alfredStack: "Claude Haiku 4.5 · Red-flag triage: 911, today, or this week · WCAG 2.1 AA",
  aigaRole:    "I built the events calendar and the custom code on Squarespace, on a three-person volunteer web team.",
  ctbTitle:    "Cut, then build",
  ctbDeck:     "A real brief and the features I could have built for it. Cut what doesn't belong, then compare your build with what I shipped.",
  concepts:    "Fictional businesses, real code.",
} as const;

const font = "var(--font-dm-sans), sans-serif";

/* `sizes` for a wide card, which spans the whole content column (1240px
   max) at every width. HomeWorkSection hands every card the two-up value,
   so a wide card's art would load at half its drawn width. */
const CARD_SIZES_WIDE = "(max-width: 1399px) 100vw, 1240px";

/* A wide card's art, sized for the full column: the same piece WorkCard
   draws for a card with card art, passed in as `media` so HomeWorkSection
   cards get the wide `sizes`. */
function WideCardArt({ src }: { src: string }) {
  return (
    <div className="wcard__piece">
      <Image src={src} alt="" fill sizes={CARD_SIZES_WIDE} style={{ objectFit: "contain" }} />
    </div>
  );
}

/* A band's sub-heading: the h3 that opens a Cut, then build block inside
   a band. The step is the one WhatIDo's featured line uses, between the
   band H2 and the brief's own h3. */
const subTitle: CSSProperties = {
  fontFamily:    font,
  fontSize:      "clamp(22px, 2.2vw, 28px)",
  fontWeight:    500,
  lineHeight:    1.25,
  letterSpacing: "-0.01em",
  color:         "var(--color-text)",
  margin:        0,
};

/* A Cut, then build block inside a band: the h3, then the embedded
   brief. The brief's stage carries its own padding
   (clamp(16px, 3vw, 40px)) above its title, so the heading adds 16px on
   top of it: 56px to the brief's title on desktop, 32px on phones. */
function CutThenBuildBlock({ brief }: { brief: "mens-sole-revival" | "wayfarer" }) {
  return (
    <div>
      <h3 style={subTitle}>{COPY.ctbTitle}</h3>
      <div style={{ marginTop: "16px" }}>
        <CutThenBuild briefs={[brief]} embedded titleLevel={4} />
      </div>
    </div>
  );
}

export default function HomePage({ audience }: { audience: HomeAudience }) {
  const hiring = audience === "hiring";
  const webSlugs  = hiring ? WEB_SLUGS_ALL.filter((s) => !STUDIO_SLUGS.has(s))  : WEB_SLUGS_ALL;
  const logoSlugs = hiring ? LOGO_SLUGS_ALL.filter((s) => !STUDIO_SLUGS.has(s)) : LOGO_SLUGS_ALL;

  return (
    <>
      <PersonSchema />
      <Nav audience={audience} />
      <main id="main-content">
        <WorkStyles />
        {/* #hero: the nav logo's "Back to top" scrolls to this id
            (Nav.tsx). The name tag's own id is "top"; once the nav targets
            "top", this wrapper can go. */}
        <div id="hero">
          <NameTag />
        </div>

        {/* #work: every band of work, so the older /#work links (case-study
            breadcrumbs, legacy pages) land on the first band. */}
        <div id="work" style={{ scrollMarginTop: "72px" }}>
          {/* Alfred, two columns: the story and the live-site button on the
              left, the recorded demo sliding in from the right. */}
          <AlfredBand />
          <HomeWorkSection
            id="aiga-portland"
            spectrum={3}
            title="Portland Design Month 2026"
            deck={COPY.aigaRole}
            slugs={["aiga-portland"]}
            plate="blue"
            media={AIGA?.card ? { "aiga-portland": <WideCardArt src={AIGA.card.src} /> } : undefined}
            wide={["aiga-portland"]}
          />
          {/* Cut, then build on the MSR brief, after AIGA so the two Men's
              Sole Revival pieces never sit back to back. It ends on the MSR
              write-up. */}
          <HomeWorkSection
            id="cut-then-build"
            spectrum={4}
            title={COPY.ctbTitle}
            deck={COPY.ctbDeck}
            slugs={["mens-sole-revival"]}
            plate="blue"
            media={MSR?.card ? { "mens-sole-revival": <WideCardArt src={MSR.card.src} /> } : undefined}
            wide={["mens-sole-revival"]}
            before={
              <div style={{ marginBottom: "clamp(24px, 3vw, 32px)" }}>
                <CutThenBuild briefs={["mens-sole-revival"]} embedded />
              </div>
            }
          />
          <HomeWorkSection
            id="websites"
            spectrum={2}
            title="Websites"
            deck={WEB_DECK[audience]}
            slugs={webSlugs}
            seeAll={{ href: "/work?d=web", label: "See all web work" }}
            plate="teal"
            media={siteFlipMedia(webSlugs)}
          />
          <HomeWorkSection
            id="logos"
            title="Logos"
            deck="Marks for clients and for my own ventures."
            slugs={logoSlugs}
            seeAll={{ href: "/work?d=brand", label: "See all brand work" }}
            before={<LogoSizerControl />}
            plate="bare"
            media={Object.fromEntries(logoSlugs.map((slug) => [slug, <LogoMarkMedia key={slug} slug={slug} />]))}
          />
          <HomeWorkSection
            id="campaigns"
            spectrum={3}
            title="Ad campaigns and print"
            deck="Labels, magazine ads, social campaigns, and print. Made in-house at VARA Winery & Distillery and Boomtime, and for clients."
            slugs={["vara-somos-unidos", "vara-magazine-ads", "vara-social", "kendra-toth-brochure", "boomtime-word-of-mouth-playbook", "vara-distributor-leave-behind"]}
            seeAll={{ href: "/work", label: "See all work" }}
            plate="terracotta"
            media={campaignFlipMedia}
          />
          {/* Concepts after the real work: the Wayfarer brief, then both
              concept case studies. */}
          <HomeWorkSection
            id="concepts"
            spectrum={5}
            title="Concepts"
            deck={COPY.concepts}
            slugs={["wayfarer", "spotify"]}
            plate="blue"
            before={
              <div style={{ marginBottom: "clamp(24px, 3vw, 32px)" }}>
                <CutThenBuildBlock brief="wayfarer" />
              </div>
            }
          />
        </div>

        <WhatIDo audience={audience} />
        <HomeTestimonials />
        <HomeAbout audience={audience} />
        <HireClose audience={audience} />
        <Footer />
      </main>
      <BackToTop />
    </>
  );
}
