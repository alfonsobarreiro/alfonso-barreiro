"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "ab-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Small delay so it doesn't flash immediately on load
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  // Avoid hydration mismatch
  if (!mounted) return null;
  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position:   "fixed",
        bottom:     "32px",
        right:      "32px",
        zIndex:     9999,
        maxWidth:   "340px",
        width:      "calc(100vw - 64px)",
        background: "#252B28",
        border:     "1px solid rgba(193,127,74,0.25)",
        padding:    "28px 32px",
        boxShadow:  "0 16px 48px rgba(0,0,0,0.24), 0 4px 16px rgba(0,0,0,0.12)",
        // Fade + slide in
        animation:  "cookieSlideIn 0.35s ease forwards",
      }}
    >
      {/* Eyebrow rule */}
      <div
        style={{
          display:      "flex",
          alignItems:   "center",
          gap:          "10px",
          marginBottom: "14px",
        }}
      >
        <span
          style={{
            display:    "inline-block",
            width:      "20px",
            height:     "1px",
            background: "#C17F4A",
            flexShrink: 0,
          }}
        />
        <p
          style={{
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "10px",
            fontWeight:    600,
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            color:         "#C17F4A",
            margin:        0,
          }}
        >
          Cookies
        </p>
      </div>

      <p
        style={{
          fontFamily:   "var(--font-dm-sans), sans-serif",
          fontSize:     "13px",
          lineHeight:   1.65,
          color:        "rgba(245,243,239,0.70)",
          margin:       "0 0 24px",
        }}
      >
        This site uses cookies to understand how visitors interact with it. No data is
        sold or shared with third parties.
      </p>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={accept}
          style={{
            flex:          1,
            padding:       "10px 0",
            background:    "#C17F4A",
            color:         "#F5F5F4",
            border:        "none",
            borderRadius:  "8px",
            fontSize:      "12px",
            fontWeight:    600,
            fontFamily:    "var(--font-dm-sans), sans-serif",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            cursor:        "pointer",
            transition:    "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Accept
        </button>
        <button
          onClick={decline}
          style={{
            flex:          1,
            padding:       "10px 0",
            background:    "transparent",
            color:         "rgba(245,243,239,0.50)",
            border:        "1px solid rgba(245,243,239,0.18)",
            borderRadius:  "8px",
            fontSize:      "12px",
            fontWeight:    500,
            fontFamily:    "var(--font-dm-sans), sans-serif",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            cursor:        "pointer",
            transition:    "color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color       = "rgba(245,243,239,0.85)";
            e.currentTarget.style.borderColor = "rgba(245,243,239,0.40)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color       = "rgba(245,243,239,0.50)";
            e.currentTarget.style.borderColor = "rgba(245,243,239,0.18)";
          }}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
