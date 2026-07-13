"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

type FormState = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const FORMSPREE_ENDPOINT = "https://formspree.io/f/myknjbpa";

const font = "var(--font-dm-sans), -apple-system, sans-serif";

// Lightweight inline validation. Keeps the form's "calm correspondence"
// feel — no toasts, no on-keystroke errors, just one line under the
// field after blur if the value is invalid.
function validateField(name: string, value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Required.";
  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address.";
  if (name === "message" && v.length < 10) return "A few more words about the role or project would help.";
  return undefined;
}

/* Marginalia readout for the message field. Word ranges cross a few
   editorial thresholds so the reader sees the note change as they
   write — reads as an author annotating their draft, not a form. */
function marginNote(words: number): string {
  if (words === 0)  return "";
  if (words < 8)    return "a start";
  if (words < 25)   return "warming up";
  if (words < 60)   return "sounds thoughtful";
  if (words < 120)  return "you're making a case";
  return "a proper letter";
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [msgWords, setMsgWords] = useState<number>(0);
  const successRef = useRef<HTMLDivElement>(null);
  const isSubmitting = formState === "submitting";

  useEffect(() => {
    if (formState === "success") successRef.current?.focus();
  }, [formState]);

  function onBlurValidate(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    // Capture name + value BEFORE the state updates. React nulls
    // e.currentTarget after the handler returns, and setErrors runs
    // its updater later — reading e.currentTarget.name inside the
    // updater throws in the production build (dev keeps the ref
    // alive longer, which is why this only surfaced on staging).
    const fieldName  = e.currentTarget.name;
    const fieldValue = e.currentTarget.value;
    setFocusedField(null);
    const err = validateField(fieldName, fieldValue);
    setErrors((prev) => ({ ...prev, [fieldName]: err }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    // Run validators on submit so a user who tabbed past the fields
    // still sees inline errors instead of a generic submit failure.
    const data = new FormData(form);
    const next: FieldErrors = {};
    (["name", "email", "message"] as const).forEach((k) => {
      const err = validateField(k, String(data.get(k) ?? ""));
      if (err) next[k] = err;
    });
    if (Object.keys(next).length) {
      setErrors(next);
      const firstInvalid = form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      firstInvalid?.focus();
      return;
    }
    setFormState("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method:  "POST",
        body:    data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) { setFormState("success"); form.reset(); setErrors({}); }
      else        { setFormState("error"); }
    } catch      { setFormState("error"); }
  }

  const inputStyle = (field: string, hasError: boolean): React.CSSProperties => ({
    width:        "100%",
    background:   "#FFFFFF",
    border:       hasError
      ? "1px solid #B91C1C"
      : focusedField === field
      ? "1px solid var(--color-accent)"
      : "1px solid #8A8680",
    borderRadius: 4,
    padding:      "12px 14px",
    color:        "#252B28",
    fontSize:     "15px",
    fontFamily:   font,
    fontWeight:   400,
    outline:      "none",
    transition:   "border-color 0.2s, box-shadow 0.2s",
    boxShadow:    focusedField === field ? "0 0 0 3px rgba(15, 61, 62, 0.10)" : "none",
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

  const errorTextStyle: React.CSSProperties = {
    fontFamily: font,
    fontSize:   "12px",
    color:      "#B91C1C",
    margin:     "6px 0 0",
  };

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

  // Single live region carries every status update — submit error,
  // submission-in-flight, validation failures. One announcement
  // channel avoids stale messages competing across two regions.
  const liveMessage =
    formState === "error" ? "Something went wrong sending your message. Try emailing me directly at alfonso@barreiro.com." :
    isSubmitting          ? "Sending your message." :
    "";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      aria-busy={isSubmitting}
    >
      <input type="hidden" name="_subject" value="New message from barreiro.com" />

      <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
        {(["name", "email", "message"] as const).map((field) => {
          const isMessage = field === "message";
          const label = field === "name" ? "Name" : field === "email" ? "Email" : "Message";
          const placeholder = field === "name"
            ? "Your name"
            : field === "email"
            ? "your@email.com"
            : "Tell me about the role or project…";
          const err = errors[field];
          const errId = err ? `${field}-error` : undefined;
          const commonProps = {
            id: field,
            name: field,
            required: true,
            "aria-required": true,
            "aria-invalid": !!err,
            "aria-describedby": errId,
            placeholder,
            onFocus: () => setFocusedField(field),
            onBlur: onBlurValidate,
            suppressHydrationWarning: true,
          };
          return (
            <div key={field} style={isMessage ? { position: "relative" } : undefined}>
              <div style={
                isMessage
                  ? { display: "flex", justifyContent: "space-between", alignItems: "baseline" }
                  : undefined
              }>
                <label htmlFor={field} style={labelStyle}>{label}{reqAsterisk}</label>
                {isMessage && msgWords > 0 && (
                  <span
                    aria-hidden="true"
                    style={{
                      fontFamily:    "var(--font-dm-serif-display), Georgia, serif",
                      fontStyle:     "italic",
                      fontSize:      "13px",
                      color:         "#6B6E6A",
                      letterSpacing: "-0.005em",
                      transition:    "opacity 200ms ease",
                    }}
                  >
                    <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--color-brand)", fontStyle: "normal", fontFamily: font, fontWeight: 600, marginRight: 6 }}>
                      {msgWords}
                    </span>
                    {msgWords === 1 ? "word" : "words"}
                    &nbsp;&middot;&nbsp;{marginNote(msgWords)}
                  </span>
                )}
              </div>
              {isMessage ? (
                <textarea
                  {...commonProps}
                  rows={5}
                  onChange={(e) => {
                    const v = e.currentTarget.value.trim();
                    setMsgWords(v ? v.split(/\s+/).filter(Boolean).length : 0);
                  }}
                  style={{ ...inputStyle(field, !!err), resize: "vertical", lineHeight: 1.65 }}
                />
              ) : (
                <input
                  {...commonProps}
                  type={field === "email" ? "email" : "text"}
                  style={inputStyle(field, !!err)}
                />
              )}
              {err && (
                <p id={errId} style={errorTextStyle}>
                  {err}
                </p>
              )}
            </div>
          );
        })}

        {/* Single dynamic live region — handles error + submit-in-flight
            states without competing announcements. */}
        <p
          role="status"
          aria-live="polite"
          style={{
            fontFamily: font,
            fontSize: "13px",
            color: formState === "error" ? "#B91C1C" : "#5A5752",
            margin: 0,
            minHeight: liveMessage ? "20px" : 0,
          }}
        >
          {liveMessage}
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="on-crimson"
          style={{
            padding: "15px 36px",
            background: isSubmitting ? "rgba(140,26,26,0.6)" : "var(--color-brand)",
            color: "#FFFFFF", border: "none", borderRadius: 4,
            fontSize: "13px", fontWeight: 600, fontFamily: font,
            letterSpacing: "0.07em", textTransform: "uppercase",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            alignSelf: "flex-start", transition: "opacity 0.2s",
            minHeight: "44px",
          }}
          onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.opacity = "0.85"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        >
          {isSubmitting ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
