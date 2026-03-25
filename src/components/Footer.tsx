"use client";

import LogoMark from "./LogoMark";

const footerLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/alfonso-barreiro/", target: "_blank" },
  { label: "Resume",   href: "/Alfonso_Barreiro_Resume_2026.pdf",              target: "_blank" },
];

export default function Footer() {
  return (
    <footer
      style={{
        padding:    "28px 48px",
        background: "#1C211E",
        borderTop:  "1px solid rgba(245,243,239,0.06)",
      }}
    >
      <div
        className="footer-inner"
        style={{
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
        }}
      >
        <LogoMark size={19} variant="light" opacity={0.35} />

        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize:   "12px",
            color:      "rgba(245,243,239,0.25)",
            margin:     0,
          }}
        >
          © 2026 Alfonso Barreiro · Portland, OR
        </p>

        <div style={{ display: "flex", gap: "24px" }}>
          {footerLinks.map(({ label, href, target }) => (
            <a
              key={label}
              href={href}
              target={target}
              rel={target === "_blank" ? "noopener noreferrer" : undefined}
              style={{
                fontFamily:     "var(--font-dm-sans), sans-serif",
                fontSize:       "12px",
                color:          "rgba(245,243,239,0.3)",
                letterSpacing:  "0.06em",
                transition:     "color 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,243,239,0.75)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,243,239,0.3)")}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
