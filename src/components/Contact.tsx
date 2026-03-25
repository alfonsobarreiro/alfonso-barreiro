"use client";

import { useState, FormEvent } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

// ─── Replace this with your Formspree endpoint ───────────────────────────────
// 1. Go to https://formspree.io and create a free account
// 2. Create a new form → copy the endpoint URL (e.g. https://formspree.io/f/xabcdefg)
// 3. Paste it here
const FORMSPREE_ENDPOINT = "https://formspree.io/f/myknjbpa";
// ─────────────────────────────────────────────────────────────────────────────

export default function Contact() {
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

      if (res.ok) {
        setFormState("success");
        form.reset();
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  const inputStyle = (field: string) => ({
    width:           "100%",
    background:      "transparent",
    border:          "none",
    borderBottom:    focusedField === field
      ? "1px solid #C17F4A"
      : "1px solid rgba(245,243,239,0.20)",
    borderRadius:    0,
    padding:         "12px 0",
    color:           "#F5F5F4",
    fontSize:        "15px",
    fontFamily:      "var(--font-dm-sans), sans-serif",
    fontWeight:      400,
    outline:         "none",
    transition:      "border-color 0.2s",
    caretColor:      "#C17F4A",
  });

  const labelStyle = {
    display:       "block",
    fontSize:      "11px",
    fontWeight:    600,
    letterSpacing: "0.13em",
    textTransform: "uppercase" as const,
    color:         "#C17F4A",
    fontFamily:    "var(--font-dm-sans), sans-serif",
    marginBottom:  "2px",
  };

  return (
    <section
      id="contact"
      className="contact-section"
      style={{
        padding:    "120px 48px",
        background: "#252B28",
      }}
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
        {/* Left — copy */}
        <div>
          <div
            style={{
              display:      "flex",
              alignItems:   "center",
              gap:          "12px",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                display:    "inline-block",
                width:      "24px",
                height:     "1px",
                background: "#C17F4A",
              }}
            />
            <p
              style={{
                fontSize:      "11px",
                fontWeight:    500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color:         "rgba(245,243,239,0.45)",
                margin:        0,
                fontFamily:    "var(--font-dm-sans), sans-serif",
              }}
            >
              Contact
            </p>
          </div>

          <h2
            style={{
              fontFamily:    "var(--font-dm-serif-display), Georgia, serif",
              fontSize:      "clamp(28px, 4vw, 52px)",
              fontWeight:    400,
              color:         "#F5F5F4",
              margin:        "0 0 24px",
              letterSpacing: "-0.03em",
              lineHeight:    1.1,
            }}
          >
            Let&apos;s make<br />
            <span style={{ color: "#C17F4A" }}>something good.</span>
          </h2>

          <p
            style={{
              fontFamily:   "var(--font-dm-sans), sans-serif",
              fontSize:     "16px",
              lineHeight:   1.7,
              color:        "rgba(245,243,239,0.55)",
              marginBottom: "40px",
              maxWidth:     "380px",
            }}
          >
            Open to full-time UX/UI roles, contract work, and thoughtful conversations
            about design problems worth solving.
          </p>

          {/* Direct email */}
          <a
            href="mailto:alfonso@barreiro.com"
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "8px",
              color:         "rgba(245,243,239,0.5)",
              fontSize:      "13px",
              fontWeight:    400,
              fontFamily:    "var(--font-dm-sans), sans-serif",
              letterSpacing: "0.02em",
              transition:    "color 0.2s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F4")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,243,239,0.5)")}
          >
            alfonso@barreiro.com
          </a>
        </div>

        {/* Right — form */}
        <div>
          {formState === "success" ? (
            <div
              style={{
                padding:   "48px",
                border:    "1px solid rgba(193,127,74,0.30)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily:    "var(--font-dm-serif-display), Georgia, serif",
                  fontSize:      "24px",
                  color:         "#F5F5F4",
                  marginBottom:  "12px",
                  letterSpacing: "-0.02em",
                }}
              >
                Message sent.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize:   "15px",
                  color:      "rgba(245,243,239,0.5)",
                  margin:     0,
                }}
              >
                I&apos;ll get back to you within a day or two.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>

                {/* Name */}
                <div>
                  <label htmlFor="name" style={labelStyle}>Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    style={inputStyle("name")}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" style={labelStyle}>Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    style={inputStyle("email")}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" style={labelStyle}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about the role or project…"
                    style={{
                      ...inputStyle("message"),
                      resize:     "vertical",
                      lineHeight: 1.65,
                    }}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                {/* Error state */}
                {formState === "error" && (
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize:   "13px",
                      color:      "#E07070",
                      margin:     0,
                    }}
                  >
                    Something went wrong. Try emailing me directly at alfonso@barreiro.com
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  style={{
                    padding:       "15px 36px",
                    background:    formState === "submitting" ? "rgba(193,127,74,0.6)" : "#C17F4A",
                    color:         "#F5F5F4",
                    border:        "none",
                    borderRadius:  "8px",
                    fontSize:      "13px",
                    fontWeight:    600,
                    fontFamily:    "var(--font-dm-sans), sans-serif",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    cursor:        formState === "submitting" ? "not-allowed" : "pointer",
                    alignSelf:     "flex-start",
                    transition:    "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (formState !== "submitting") e.currentTarget.style.opacity = "0.85";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  {formState === "submitting" ? "Sending…" : "Send message"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
