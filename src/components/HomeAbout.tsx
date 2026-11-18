import { LinkArrow } from "@/components/ui/LinkArrow";
import AboutPrints from "@/components/home/AboutPrints";

/* Homepage About band, the personal beat right before the close. The close
   carries Alf 05 (the plaid photo); the prints here show Alf 04 and the
   trail photo, so the page never repeats a picture. Copy is drawn from the
   Contra profile wording, trimmed so it does not repeat the name tag (the
   Figma and code line) or the close (Resume and Book a coffee chat).
   The portrait is two stacked prints (AboutPrints, a client island) so the
   rest of the band stays server-rendered. Its column is the 280px print
   plus the 12px offset of the print behind it. */
const font = "var(--font-dm-sans), sans-serif";

/* On /hiring (audience "hiring") the studio sentence is left out: job
   applications never link the studio. It is the second paragraph's only
   sentence now, so on /hiring that paragraph is not rendered. */
export default function HomeAbout({ audience = "all" }: { audience?: "all" | "hiring" } = {}) {
  return (
    <section
      id="about"
      aria-labelledby="home-about-title"
      style={{
        padding:   "clamp(72px, 8vw, 112px) clamp(24px, 6vw, 80px)",
        background: "var(--color-paper)",
        borderTop: "1px solid var(--color-neutral-200)",
      }}
    >
      <div
        className="home-about-grid"
        style={{
          maxWidth:            "var(--content-max)",
          margin:              "0 auto",
          display:             "grid",
          gridTemplateColumns: "292px minmax(0, 640px)",
          gap:                 "clamp(40px, 6vw, 96px)",
          alignItems:          "start",
        }}
      >
        <AboutPrints />
        <div>
          <h2
            id="home-about-title"
            style={{ fontFamily: font, fontSize: "clamp(28px, 4.2vw, 60px)", fontWeight: 500, color: "var(--color-text)", margin: "0 0 24px", letterSpacing: "-0.02em", lineHeight: 1.05 }}
          >
            About
          </h2>
          <p style={{ fontFamily: font, fontSize: "clamp(17px, 1.6vw, 20px)", lineHeight: 1.55, color: "var(--color-text)", margin: audience === "hiring" ? "0 0 32px" : "0 0 18px" }}>
            I&rsquo;m a designer and web developer in Portland, Oregon. I&rsquo;ve built 50+ sites on WordPress and Drupal, led 100+ client sites at Boomtime, and redesigned VARA Winery &amp; Distillery&rsquo;s Commerce7 and Shopify store, where I also ran Mailchimp email and campaign creative.
          </p>
          {/* The studio sentence, on "/" only. The Figma and code line that
              used to follow it lives in the name tag at the top now. */}
          {audience !== "hiring" && (
            <p style={{ fontFamily: font, fontSize: "clamp(17px, 1.6vw, 20px)", lineHeight: 1.55, color: "var(--color-text)", margin: "0 0 32px" }}>
              Now I run Alpha Beta Design, my <span style={{ whiteSpace: "nowrap" }}>one-person</span> studio.
            </p>
          )}
          {/* One link. Resume and Book a coffee chat sit in the close below. */}
          <div style={{ display: "flex" }}>
            <LinkArrow href="/about" className="home-about-more">More about me</LinkArrow>
          </div>
        </div>
      </div>
      <style>{`
        /* A 44px tap area: an invisible ::before grows the target past the
           text, so the layout and the focus ring stay on the text. */
        .home-about-more.ui-linkarrow { position: relative; }
        .home-about-more.ui-linkarrow::before { content: ""; position: absolute; inset: -12px 0; }
        @media (max-width: 767px) {
          .home-about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
