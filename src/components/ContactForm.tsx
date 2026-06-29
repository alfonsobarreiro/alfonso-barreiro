"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/myknjbpa";

const font = "var(--font-dm-sans), -apple-system, sans-serif";

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // When the form submits successfully, move focus to the success
  // heading so screen-reader users hear the confirmation and the
  // sighted keyboard user knows their action landed.
  useEffect(() => {
    if (formState === "success") {
      successRef.current?.focus();
    }
  }, [formState]);

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
    // Active focus uses accent teal; idle uses #8A8680 which passes
    // 1.4.11 non-text contrast (3.32:1 on white). Underline-only fields
    // need the idle stroke to be reliably visible.
    borderBottom: focusedField === field
      ? "1px solid var(--color-accent)"
      : "1px solid #8A8680",
    borderRadius: 0,
    // 14px vertical padding + 15px line-height = ~43-44px hit target.
    padding:      "14px 0",
    color:        "#252B28",
    fontSize:     "15px",
    fontFamily:   font,
    fontWeight:   400,
    outline:      "none",
    transition:   "border-color 0.2s",
    caretColor:   "var(--color-accent)",
  });

  const labelStyle: React.CSSProperties = {
    display:       "block",
    fontSize:      "11px",
    fontWeight:    600,
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    color:         "var(--color-accent)",
    fontFamily:    font,
    marginBottom:  "6px",
  };

  // Visible "required" asterisk so sighted users know which fields
  // are required before submitting.
  const reqAsterisk = (
    <span aria-hidden="true" style={{ color: "var(--color-brand)", marginLeft: "4px" }}>*</span>
  );

  if (formState === "success") {
    return (
      <div
        ref={successRef}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        style={{ padding: "48px", border: "1px solid var(--color-accent)", textAlign: "center", background: "#F4F6F7", outline: "none" }}
      >
        <p style={{ fontFamily: font, fontSize: "24px", fontWeight: 600, color: "#252B28", marginBottom: "12px", letterSpacing: "-0.02em" }}>
          Message sent.
        </p>
        <p style={{ fontFamily: font, fontSize: "15px", color: "#5A5752", margin: 0 }}>
          I&apos;ll get back to you within a day or two.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
      {/* Formspree helper — sets the email subject line */}
      <input type="hidden" name="_subject" value="New message from barreiro.com" />

      <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
        <div>
          <label htmlFor="name" style={labelStyle}>Name{reqAsterisk}</label>
          <input id="name" name="name" type="text" required aria-required="true" placeholder="Your name"
            style={inputStyle("name")}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            suppressHydrationWarning
          />
        </div>
        <div>
          <label htmlFor="email" style={labelStyle}>Email{reqAsterisk}</label>
          <input id="email" name="email" type="email" required aria-required="true" placeholder="your@email.com"
            style={inputStyle("email")}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            suppressHydrationWarning
          />
        </div>
        <div>
          <label htmlFor="message" style={labelStyle}>Message{reqAsterisk}</label>
          <textarea id="message" name="message" required aria-required="true" rows={5}
            placeholder="Tell me about the role or project…"
            style={{ ...inputStyle("message"), resize: "vertical", lineHeight: 1.65 }}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            suppressHydrationWarning
          />
        </div>
        <p role="status" aria-live="polite" style={{
          fontFamily: font,
          fontSize: "13px",
          color: "#B91C1C",
          margin: 0,
          minHeight: "20px",
        }}>
          {formState === "error" && "Something went wrong. Try emailing me directly at alfonso@barreiro.com"}
        </p>
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="on-crimson"
          style={{
            padding: "15px 36px",
            background: formState === "submitting" ? "rgba(140,26,26,0.6)" : "var(--color-brand)",
            color: "#FFFFFF", border: "none", borderRadius: 0,
            fontSize: "13px", fontWeight: 600, fontFamily: font,
            letterSpacing: "0.07em", textTransform: "uppercase",
            cursor: formState === "submitting" ? "not-allowed" : "pointer",
            alignSelf: "flex-start", transition: "opacity 0.2s",
            minHeight: "44px",
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
