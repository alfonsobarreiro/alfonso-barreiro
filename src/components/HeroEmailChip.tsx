"use client";

import { useState } from "react";

/**
 * HeroEmailChip
 * ─────────────────────────────────────────────────────────────────────────────
 * Click-to-copy email chip sitting as a peer to the "Portland, OR · Open for
 * work" chip in the hero. On click, copies alfonso@barreiro.com to the
 * clipboard and swaps the label to "Copied" in terracotta for 1.2s. Rauno
 * pattern — one micro-interaction that does the job a CTA button would,
 * without shipping a button.
 *
 * Fallback: if clipboard write fails (Safari permission, older browsers),
 * selects the address as text so the user can copy manually.
 */
const EMAIL = "alfonso@barreiro.com";

export default function HeroEmailChip() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Fallback: highlight the text so a manual copy still works
      const sel = window.getSelection();
      if (sel) {
        const range = document.createRange();
        const el = document.getElementById("hero-email-label");
        if (el) {
          range.selectNodeContents(el);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Email address copied to clipboard" : `Copy email address ${EMAIL} to clipboard`}
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        gap:            "8px",
        background:     "transparent",
        border:         "none",
        padding:        0,
        margin:         0,
        cursor:         "pointer",
        fontFamily:     "var(--font-dm-sans), sans-serif",
        fontSize:       "var(--text-body)",
        fontWeight:     500,
        color:          copied ? "var(--color-brand)" : "var(--color-text)",
        lineHeight:     1.35,
        transition:     "color 0.15s ease",
      }}
    >
      <span id="hero-email-label">{copied ? "Copied" : EMAIL}</span>
    </button>
  );
}
