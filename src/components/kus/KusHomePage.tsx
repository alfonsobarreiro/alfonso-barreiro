import { existsSync, statSync } from "node:fs";
import path from "node:path";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { PersonSchema } from "@/components/structured-data/PersonSchema";
import { WorkStyles } from "@/components/work/WorkStyles";
import type { HomeAudience } from "@/components/home/HomePage";
import { kusDisplay, kusMono } from "@/components/kus/fonts";
import { KusStyles } from "@/components/kus/KusStyles";
import { KusReveal } from "@/components/kus/KusReveal";
import { KusSelect } from "@/components/kus/KusSelect";
import KusFirstScreen from "@/components/kus/KusFirstScreen";
import KusAlfred from "@/components/kus/KusAlfred";
import KusCaseStudies from "@/components/kus/KusCaseStudies";
import KusMoreWork from "@/components/kus/KusMoreWork";
import KusQuote from "@/components/kus/KusQuote";
import KusClose from "@/components/kus/KusClose";
import KusPlay from "@/components/kus/KusPlay";

/* The Kus-led homepage (vault spec "Kus-led direction 2026-10-24"), for
   "/" and /hiring (since 2026-10-25) and the /prototypes/home-kus preview.

   Order: proof first, the ask last. The name with the line and the
   prints (the reel above it was cut 2026-11-06), Case studies (Spotify,
   Men's Sole Revival, AIGA Portland; Work highlights until 2026-11-06),
   More work (a five-piece carousel, added 2026-11-08, above Alfred since
   2026-11-10), Alfred, What clients say, then the close (Alfred moved above the
   quotes 2026-11-07). The line moved into the hero
   and AIGA into Case studies the same day (audit section 10). Cut 2026-11-06 (Alfonso): About (its
   photos moved to the hero; the nav's About and Resume carry the rest),
   What I do and Before you ask (the close heading answers contract or
   full-time).
   Cut, then build, Concepts and the studio slab were cut 2026-11-04
   (Alfonso); the case studies they carried stay on /work.

   `audience="hiring"` is the /hiring version: every studio surface is
   left out of the render (the nav's Studio, the studio's site and mark,
   the studio slab, the Studio tab, the close's studio door, the studio
   clause in the FAQ). Not hidden with CSS.

   Copy that HomePage.tsx keeps unexported is repeated here verbatim;
   keep the two in step until this ships and HomePage takes this
   composition. */

/* The resume's size, read on the server so the label cannot go stale. A
   missing file drops the size instead of failing the page. */
function resumeFacts(): { pdfKB: number | null; hasTxt: boolean } {
  const pub = path.join(process.cwd(), "public");
  let pdfKB: number | null = null;
  let hasTxt = false;
  try {
    pdfKB = Math.round(statSync(path.join(pub, "Alfonso_Barreiro_Resume.pdf")).size / 1024) || null;
  } catch { pdfKB = null; }
  try {
    hasTxt = existsSync(path.join(pub, "Alfonso_Barreiro_Resume.txt"));
  } catch { hasTxt = false; }
  return { pdfKB, hasTxt };
}

export default function KusHomePage({ audience }: { audience: HomeAudience }) {
  const { pdfKB, hasTxt } = resumeFacts();

  return (
    <div className={`kus ${kusDisplay.variable} ${kusMono.variable}`} data-audience={audience}>
      <KusStyles />
      <PersonSchema />
      <Nav audience={audience} inPage />
      <main id="main-content">
        <WorkStyles />
        <KusReveal />
        <KusSelect />

        {/* Order: the name and the line, Work, Case studies, Alfred,
            What clients say, the close. Work leads (Alfonso, 2026-11-10:
            "Work should go before Case Studies"); its band is #work, so
            older /#work links land on it. Alfred follows the case studies,
            next to the Men's Sole Revival card it belongs to. */}
        <KusFirstScreen />

        <KusMoreWork />

        <KusCaseStudies />

        <KusAlfred />

        <KusQuote />

        <KusClose audience={audience} pdfKB={pdfKB} hasPlainText={hasTxt} />
        <Footer ground="paper" controls={<KusPlay />} />
      </main>
      <BackToTop />

      <style>{`
        .kus .kus-grid > .kus-card { min-width: 0; }
      `}</style>
    </div>
  );
}
