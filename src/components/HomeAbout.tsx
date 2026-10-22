import Image from "next/image";
import { LinkArrow } from "@/components/ui/LinkArrow";

/* Homepage About band, near the bottom. The portrait lives here now; the
   hero is text only. Copy is drawn from the Contra profile wording. */
const font = "var(--font-dm-sans), sans-serif";

export default function HomeAbout() {
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
          gridTemplateColumns: "280px minmax(0, 640px)",
          gap:                 "clamp(40px, 6vw, 96px)",
          alignItems:          "start",
        }}
      >
        <div
          className="home-about-photo"
          style={{ position: "relative", width: "100%", aspectRatio: "3 / 4", overflow: "hidden", background: "var(--color-neutral-100)" }}
        >
          <Image
            src="/images/portrait/alfonso-office-plaid.jpg"
            alt="Alfonso Barreiro in a plaid shirt in an office hallway."
            fill
            sizes="(max-width: 767px) 200px, 280px"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div>
          <h2
            id="home-about-title"
            style={{ fontFamily: font, fontSize: "clamp(40px, 5vw, 60px)", fontWeight: 500, color: "var(--color-text)", margin: "0 0 24px", letterSpacing: "-0.02em", lineHeight: 1.05 }}
          >
            About
          </h2>
          <p style={{ fontFamily: font, fontSize: "clamp(17px, 1.6vw, 20px)", lineHeight: 1.55, color: "var(--color-text)", margin: "0 0 18px" }}>
            I&rsquo;m a designer and web developer in Portland, Oregon. I&rsquo;ve built 50+ sites on WordPress and Drupal, led 100+ client sites at Boomtime, and redesigned VARA Winery &amp; Distillery&rsquo;s Commerce7 and Shopify store, where I also ran Mailchimp email and campaign creative.
          </p>
          <p style={{ fontFamily: font, fontSize: "clamp(17px, 1.6vw, 20px)", lineHeight: 1.55, color: "var(--color-text)", margin: "0 0 32px" }}>
            Now I run Alpha Beta Design, my one-person studio. I design in Figma and build in React, Next.js, and Squarespace.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 32px" }}>
            <LinkArrow href="/about">More about me</LinkArrow>
            <LinkArrow href="/resume">Resume</LinkArrow>
            <LinkArrow href="https://cal.com/alfonso-barreiro">Book a coffee chat</LinkArrow>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          .home-about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .home-about-photo { width: 200px !important; }
        }
      `}</style>
    </section>
  );
}
