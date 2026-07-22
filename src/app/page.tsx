import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { PersonSchema } from "@/components/structured-data/PersonSchema";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.barreiro.com" },
  openGraph: {
    url: "https://www.barreiro.com",
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
        <EditorialBreak />
        <About />
        <Testimonials />
        <Footer />
      </main>
      <BackToTop />
    </>
  );
}

/* Dark editorial break between Work and About. The site otherwise
   scrolls white-on-white; this one full-bleed section carries the
   composition from portfolio-template to editorial-magazine rhythm.
   Warm dark ground (photo proxy) with a soft radial vignette for
   edge lighting, one large sans pull-quote lifted from the About
   thesis, cream rule above, uppercase attribution below. Sharp
   corners on the container per the site-wide rule against large
   rounded rectangles. */
function EditorialBreak() {
  return (
    <section
      aria-label="Thesis"
      style={{
        background:  "var(--color-ground-navy)",
        color:       "var(--color-cream)",
        padding:     "clamp(120px, 14vw, 200px) clamp(24px, 6vw, 80px)",
        marginLeft:  "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <div
          aria-hidden="true"
          style={{
            width:        "clamp(96px, 12vw, 160px)",
            height:       "1px",
            background:   "rgba(250,250,249,0.55)",
            marginBottom: "40px",
          }}
        />
        <p
          style={{
            fontFamily:    "var(--font-dm-sans), -apple-system, sans-serif",
            fontSize:      "clamp(40px, 6.5vw, 96px)",
            fontWeight:    300,
            lineHeight:    1.02,
            letterSpacing: "-0.04em",
            color:         "#FAFAF9",
            margin:        0,
            maxWidth:      "20ch",
          }}
        >
          Most design problems aren&rsquo;t visual problems. They&rsquo;re unmade decisions.
        </p>
        <p
          style={{
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "11px",
            fontWeight:    700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color:         "rgba(250,250,249,0.62)",
            margin:        "56px 0 0",
          }}
        >
          Alfonso Barreiro &nbsp;·&nbsp; Portland
        </p>
      </div>
    </section>
  );
}
