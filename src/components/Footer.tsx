"use client";

import { useState, FormEvent } from "react";
import LogoMark from "./LogoMark";

type FormState = "idle" | "submitting" | "success" | "error";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/myknjbpa";

/* ─────────────────────────────────────────────
   Tokens
───────────────────────────────────────────── */
const font = {
  display: "var(--font-dm-serif-display), Georgia, serif",
  sans:    "var(--font-dm-sans), -apple-system, sans-serif",
};

const bg      = "#252B28";
const accent  = "#C17F4A";
const light   = "#F5F5F4";

/* ─────────────────────────────────────────────
   SVG icons
───────────────────────────────────────────── */
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);

const CoffeeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" /><line x1="6" y1="2" x2="6" y2="4" /><line x1="10" y1="2" x2="10" y2="4" /><line x1="14" y1="2" x2="14" y2="4" />
  </svg>
);

/* ─────────────────────────────────────────────
   Pill button styles
───────────────────────────────────────────── */
const pillBase: React.CSSProperties = {
  display:        "inline-flex",
  alignItems:     "center",
  gap:            "8px",
  padding:        "8px 16px",
  borderRadius:   "4px",
  fontSize:       "11px",
  fontWeight:     600,
  fontFamily:     font.sans,
  letterSpacing:  "0.08em",
  textTransform:  "uppercase",
  textDecoration: "none",
  transition:     "border-color 0.2s, background 0.2s, color 0.2s",
  cursor:         "pointer",
};

const pillDefault: React.CSSProperties = {
  ...pillBase,
  border:     `1px solid rgba(245,243,239,0.20)`,
  background: "rgba(245,243,239,0.04)",
  color:      "rgba(245,243,239,0.65)",
};

const pillAccent: React.CSSProperties = {
  ...pillBase,
  border:     `1px solid rgba(193,127,74,0.45)`,
  background: "rgba(193,127,74,0.10)",
  color:      accent,
};

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function Footer() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method:  "POST",
        body:    data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) { setFormState("success"); form.reset(); }
      else        { setFormState("error"); }
    } catch      { setFormState("error"); }
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width:        "100%",
    background:   "transparent",
    border:       "none",
    borderBottom: focusedField === field
      ? `1px solid ${accent}`
      : "1px solid rgba(245,243,239,0.20)",
    borderRadius: 0,
    padding:      "12px 0",
    color:        light,
    fontSize:     "15px",
    fontFamily:   font.sans,
    fontWeight:   400,
    outline:      "none",
    transition:   "border-color 0.2s",
    caretColor:   accent,
  });

  const labelStyle: React.CSSProperties = {
    display:       "block",
    fontSize:      "11px",
    fontWeight:    600,
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    color:         accent,
    fontFamily:    font.sans,
    marginBottom:  "2px",
  };

  return (
    <footer id="contact" style={{ background: bg }}>

      {/* ── Contact section ── */}
      <div
        className="contact-section"
        style={{ padding: "120px 48px 0" }}
      >
        <div
          className="contact-grid"
          style={{
            maxWidth:            "1200px",
            margin:              "0 auto",
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 "80px",
            alignItems:          "start",
          }}
        >
          {/* Left — copy + CTAs */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
              <span style={{ display: "inline-block", width: "24px", height: "1px", background: accent }} />
              <p style={{
                fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em",
                textTransform: "uppercase", color: "rgba(245,243,239,0.45)",
                margin: 0, fontFamily: font.sans,
              }}>
                Contact
              </p>
            </div>

            <h2 style={{
              fontFamily: font.display, fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 400, color: light, margin: "0 0 24px",
              letterSpacing: "-0.03em", lineHeight: 1.1,
            }}>
              Let&apos;s make<br />
              <span style={{ color: accent }}>something good.</span>
            </h2>

            <p style={{
              fontFamily: font.sans, fontSize: "16px", lineHeight: 1.7,
              color: "rgba(245,243,239,0.55)", marginBottom: "40px", maxWidth: "380px",
            }}>
              Open to full-time UX/UI roles, contract work, and thoughtful conversations
              about design problems worth solving.
            </p>

            {/* CTA buttons — 2-across grid */}
            <div style={{ display: "grid", gridTemplateColumns: "auto auto", justifyContent: "start", gap: "10px" }}>
              <a href="/Alfonso_Barreiro_Resume_April_2026.pdf" target="_blank" rel="noopener noreferrer" style={pillDefault}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(245,243,239,0.45)"; e.currentTarget.style.background = "rgba(245,243,239,0.08)"; e.currentTarget.style.color = "rgba(245,243,239,0.9)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(245,243,239,0.20)"; e.currentTarget.style.background = "rgba(245,243,239,0.04)"; e.currentTarget.style.color = "rgba(245,243,239,0.65)"; }}
              >
                <DownloadIcon /> Resume
              </a>
              <a href="https://www.linkedin.com/in/alfonso-barreiro/" target="_blank" rel="noopener noreferrer" style={pillDefault}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(245,243,239,0.45)"; e.currentTarget.style.background = "rgba(245,243,239,0.08)"; e.currentTarget.style.color = "rgba(245,243,239,0.9)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(245,243,239,0.20)"; e.currentTarget.style.background = "rgba(245,243,239,0.04)"; e.currentTarget.style.color = "rgba(245,243,239,0.65)"; }}
              >
                <LinkedInIcon /> LinkedIn
              </a>
              <a href="https://cal.com/alfonso-barreiro" target="_blank" rel="noopener noreferrer" style={{ ...pillAccent, gridColumn: "1 / -1" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(193,127,74,0.65)"; e.currentTarget.style.background = "rgba(193,127,74,0.18)"; e.currentTarget.style.color = "#d4974f"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(193,127,74,0.45)"; e.currentTarget.style.background = "rgba(193,127,74,0.10)"; e.currentTarget.style.color = accent; }}
              >
                <CoffeeIcon /> Coffee in Portland
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {formState === "success" ? (
              <div style={{ padding: "48px", border: `1px solid rgba(193,127,74,0.30)`, textAlign: "center" }}>
                <p style={{ fontFamily: font.display, fontSize: "24px", color: light, marginBottom: "12px", letterSpacing: "-0.02em" }}>
                  Message sent.
                </p>
                <p style={{ fontFamily: font.sans, fontSize: "15px", color: "rgba(245,243,239,0.5)", margin: 0 }}>
                  I&apos;ll get back to you within a day or two.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
                  <div>
                    <label htmlFor="name" style={labelStyle}>Name</label>
                    <input id="name" name="name" type="text" required placeholder="Your name"
                      style={inputStyle("name")}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={labelStyle}>Email</label>
                    <input id="email" name="email" type="email" required placeholder="your@email.com"
                      style={inputStyle("email")}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" style={labelStyle}>Message</label>
                    <textarea id="message" name="message" required rows={5}
                      placeholder="Tell me about the role or project…"
                      style={{ ...inputStyle("message"), resize: "vertical", lineHeight: 1.65 }}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  {formState === "error" && (
                    <p style={{ fontFamily: font.sans, fontSize: "13px", color: "#E07070", margin: 0 }}>
                      Something went wrong. Try emailing me directly at alfonso@barreiro.com
                    </p>
                  )}
                  <button type="submit" disabled={formState === "submitting"} style={{
                    padding: "15px 36px",
                    background: formState === "submitting" ? "rgba(193,127,74,0.6)" : accent,
                    color: light, border: "none", borderRadius: "8px",
                    fontSize: "13px", fontWeight: 600, fontFamily: font.sans,
                    letterSpacing: "0.07em", textTransform: "uppercase",
                    cursor: formState === "submitting" ? "not-allowed" : "pointer",
                    alignSelf: "flex-start", transition: "opacity 0.2s",
                  }}
                    onMouseEnter={(e) => { if (formState !== "submitting") e.currentTarget.style.opacity = "0.85"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                  >
                    {formState === "submitting" ? "Sending…" : "Send message"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── CTA buttons + copyright strip ── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>

        {/* Divider */}
        <div style={{
          marginTop:   "80px",
          borderTop:   "1px solid rgba(245,243,239,0.08)",
          paddingTop:  "28px",
          paddingBottom: "28px",
        }}>
          <div style={{
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "center",
            flexWrap:       "wrap",
            gap:            "16px",
          }}>
            {/* Left: logo */}
            <LogoMark size={19} variant="light" opacity={0.35} />

            {/* Right: copyright */}
            <p style={{
              fontFamily: font.sans, fontSize: "12px",
              color: "rgba(245,243,239,0.25)", margin: 0,
            }}>
              © 2026 Alfonso Barreiro · Portland, OR
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
