import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PersonSchema } from "@/components/structured-data/PersonSchema";
import { Eyebrow } from '@/components/ui/Eyebrow';

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Alfonso Barreiro. Open to product and UX/UI roles, contract or full-time. Portland, OR or remote. Fifteen years in design and shipping.",
  alternates: { canonical: "https://www.barreiro.com/contact" },
  openGraph: {
    type: "website",
    url: "https://www.barreiro.com/contact",
    title: "Contact — Alfonso Barreiro",
    description:
      "Get in touch with Alfonso Barreiro. Open to product and UX/UI roles, contract or full-time. Portland, OR or remote. Fifteen years in design and shipping.",
    images: ["/contact/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Alfonso Barreiro",
    description:
      "Get in touch with Alfonso Barreiro. Open to product and UX/UI roles, contract or full-time. Portland, OR or remote. Fifteen years in design and shipping.",
    images: ["/contact/opengraph-image"],
  },
};

const c = {
  ink:    "#252B28",
  body:   "#3D4440",
  // Deepened from #8A8680 (3.4:1) for WCAG AA on body text.
  muted:  "#5A5752",
  brand:  "var(--color-brand)",
  accent: "var(--color-accent)",
};

const font = "var(--font-dm-sans), -apple-system, sans-serif";

export default function ContactPage() {
  return (
    <>
      <PersonSchema />
      <Nav />
      <main id="main-content" style={{ background: "#FFFFFF", paddingTop: "72px" }}>

        <section
          aria-labelledby="contact-heading"
          className="contact-page-section"
          style={{ padding: "120px clamp(32px, 6vw, 80px)" }}
        >
          <div
            className="contact-page-grid"
            style={{
              maxWidth: "720px",
            }}
          >
            {/* Left — intro */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span style={{ display: "inline-block", width: "24px", height: "1px", background: c.accent }} />
                <Eyebrow style={{ margin: 0 }}>
                  Contact
                </Eyebrow>
              </div>
              <h1 id="contact-heading" style={{
                fontFamily:    font,
                fontSize:      "clamp(28px,5vw,64px)",
                fontWeight:    500,
                color:         c.ink,
                margin:        "0 0 28px",
                letterSpacing: "-0.02em",
                lineHeight:    1.05,
              }}>
                Say hello.
              </h1>
              <p style={{
                fontFamily: font,
                fontSize:   "var(--text-article)",
                lineHeight: 1.6,
                color:      c.body,
                margin:     "0 0 40px",
                maxWidth:   "460px",
              }}>
                Open to product and UX/UI roles, contract or full-time.
                Portland, OR or remote. I&apos;ll get back to you within a day
                or two.
              </p>
              <p style={{
                fontFamily: font,
                fontSize:   "var(--text-h3)",
                lineHeight: 1.5,
                color:      c.ink,
                margin:     0,
              }}>
                <a
                  href="mailto:alfonso@barreiro.com"
                  style={{
                    color:               c.accent,
                    textDecoration:      "underline",
                    textUnderlineOffset: "4px",
                  }}
                >
                  alfonso@barreiro.com
                </a>
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
