import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Alfonso Barreiro",
  description:
    "Get in touch. Open to full-time UX/UI roles, contract work, and thoughtful conversations about design problems worth solving.",
  openGraph: {
    title: "Contact · Alfonso Barreiro",
    description:
      "Open to full-time UX/UI roles, contract work, and design problems worth solving.",
    url: "https://barreiro.com/contact",
    siteName: "Alfonso Barreiro",
    locale: "en_US",
    type: "website",
  },
};

const c = {
  ink:    "#252B28",
  body:   "#3D4440",
  muted:  "#8A8680",
  accent: "#C17F4A",
};

const font = "var(--font-dm-sans), -apple-system, sans-serif";

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main style={{ background: "#FFFFFF", paddingTop: "72px" }}>

        <section
          className="contact-page-section"
          style={{ padding: "120px clamp(32px, 6vw, 80px)" }}
        >
          <div
            className="contact-page-grid"
            style={{
              display:             "grid",
              gridTemplateColumns: "1fr 1fr",
              gap:                 "80px",
              alignItems:          "start",
            }}
          >
            {/* Left — intro */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span style={{ display: "inline-block", width: "24px", height: "1px", background: c.accent }} />
                <p style={{
                  fontFamily:    font,
                  fontSize:      "11px",
                  fontWeight:    500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color:         c.muted,
                  margin:        0,
                }}>
                  Contact
                </p>
              </div>
              <h1 style={{
                fontFamily:    font,
                fontSize:      "clamp(32px, 5vw, 64px)",
                fontWeight:    600,
                color:         c.ink,
                margin:        "0 0 28px",
                letterSpacing: "-0.025em",
                lineHeight:    1.05,
              }}>
                Let&apos;s make<br />
                <span style={{ color: c.accent }}>something good.</span>
              </h1>
              <p style={{
                fontFamily: font,
                fontSize:   "18px",
                lineHeight: 1.65,
                color:      c.body,
                margin:     "0 0 40px",
                maxWidth:   "460px",
              }}>
                Open to full-time UX/UI roles, contract work, and thoughtful
                conversations about design problems worth solving. I&apos;ll
                get back to you within a day or two.
              </p>
              <p style={{
                fontFamily: font,
                fontSize:   "14px",
                lineHeight: 1.6,
                color:      c.muted,
                margin:     0,
              }}>
                Prefer email?{" "}
                <a
                  href="mailto:alfonso@barreiro.com"
                  style={{
                    color:              c.accent,
                    textDecoration:     "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  alfonso@barreiro.com
                </a>
              </p>
            </div>

            {/* Right — form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
