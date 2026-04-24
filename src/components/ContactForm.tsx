"use client";

import { useState, FormEvent } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/myknjbpa";

const font = "var(--font-dm-sans), -apple-system, sans-serif";

export default function ContactForm() {
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
      ? "1px solid #C17F4A"
      : "1px solid #C9BFB0",
    borderRadius: 0,
    padding:      "12px 0",
    color:        "#252B28",
    fontSize:     "15px",
    fontFamily:   font,
    fontWeight:   400,
    outline:      "none",
    transition:   "border-color 0.2s",
    caretColor:   "#C17F4A",
  });

  const labelStyle: React.CSSProperties = {
    display:       "block",
    fontSize:      "11px",
    fontWeight:    600,
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    color:         "#C17F4A",
    fontFamily:    font,
    marginBottom:  "2px",
  };

  if (formState === "success") {
    return (
      <div style={{ padding: "48px", border: "1px solid rgba(193,127,74,0.30)", textAlign: "center", background: "#FAFAF9" }}>
        <p style={{ fontFamily: font, fontSize: "24px", fontWeight: 600, color: "#252B28", marginBottom: "12px", letterSpacing: "-0.02em" }}>
          Message sent.
        </p>
        <p style={{ fontFamily: font, fontSize: "15px", color: "#8A8680", margin: 0 }}>
          I&apos;ll get back to you within a day or two.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Formspree helper — sets the email subject line */}
      <input type="hidden" name="_subject" value="New message from barreiro.com" />

      <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
        <div>
          <label htmlFor="name" style={labelStyle}>Name</label>
          <input id="name" name="name" type="text" required placeholder="Your name"
            style={inputStyle("name")}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            suppressHydrationWarning
          />
        </div>
        <div>
          <label htmlFor="email" style={labelStyle}>Email</label>
          <input id="email" name="email" type="email" required placeholder="your@email.com"
            style={inputStyle("email")}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            suppressHydrationWarning
          />
        </div>
        <div>
          <label htmlFor="message" style={labelStyle}>Message</label>
          <textarea id="message" name="message" required rows={5}
            placeholder="Tell me about the role or project…"
            style={{ ...inputStyle("message"), resize: "vertical", lineHeight: 1.65 }}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            suppressHydrationWarning
          />
        </div>
        {formState === "error" && (
          <p style={{ fontFamily: font, fontSize: "13px", color: "#E07070", margin: 0 }}>
            Something went wrong. Try emailing me directly at alfonso@barreiro.com
          </p>
        )}
        <button type="submit" disabled={formState === "submitting"} style={{
          padding: "15px 36px",
          background: formState === "submitting" ? "rgba(193,127,74,0.6)" : "#C17F4A",
          color: "#FFFFFF", border: "none", borderRadius: "8px",
          fontSize: "13px", fontWeight: 600, fontFamily: font,
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
  );
}
