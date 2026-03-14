"use client";

import { useState } from "react";
import LogoMark from "./LogoMark";

const navLinks = ["work", "about", "contact"] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNavClick(id: string) {
    setMenuOpen(false);
    setTimeout(() => scrollTo(id), 300); // wait for menu to close
  }

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .main-nav   { padding: 0 24px !important; }
          .nav-links  { display: none !important; }
          .hamburger  { display: flex !important; }
        }
        @media (min-width: 768px) {
          .hamburger  { display: none !important; }
        }
        .menu-overlay {
          position:   fixed;
          inset:      0;
          z-index:    200;
          background: #252B28;
          display:    flex;
          flex-direction: column;
          justify-content: center;
          padding:    40px 32px;
          transform:  translateY(-100%);
          transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .menu-overlay.open {
          transform: translateY(0);
        }
        .menu-link {
          font-family:    var(--font-dm-serif-display), Georgia, serif;
          font-size:      clamp(42px, 12vw, 72px);
          font-weight:    400;
          color:          rgba(245,243,239,0.85);
          letter-spacing: -0.03em;
          line-height:    1.1;
          background:     none;
          border:         none;
          cursor:         pointer;
          padding:        12px 0;
          text-align:     left;
          transition:     color 0.2s;
          border-bottom:  1px solid rgba(245,243,239,0.08);
          width:          100%;
        }
        .menu-link:last-of-type { border-bottom: none; }
        .menu-link:hover        { color: #C17F4A; }
      `}</style>

      {/* Main nav bar */}
      <nav
        className="main-nav"
        style={{
          position:       "fixed",
          top:            0,
          left:           0,
          right:          0,
          zIndex:         300,
          height:         "72px",
          padding:        "0 48px",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          background:     menuOpen ? "#252B28" : "#FFFFFF",
          borderBottom:   menuOpen ? "1px solid rgba(245,243,239,0.08)" : "1px solid #E8E4DE",
          transition:     "background 0.3s, border-color 0.3s",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => { setMenuOpen(false); scrollTo("hero"); }}
          aria-label="Back to top"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, zIndex: 310 }}
        >
          <LogoMark size={26} variant={menuOpen ? "light" : "dark"} />
        </button>

        {/* Desktop nav links */}
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          {navLinks.map((link) => (
            <NavLink key={link} label={link} onClick={() => scrollTo(link)} />
          ))}
          <button
            onClick={() => scrollTo("contact")}
            style={{
              padding:       "10px 24px",
              background:    "#C17F4A",
              border:        "none",
              borderRadius:  0,
              color:         "#FFFFFF",
              fontSize:      "13px",
              fontWeight:    500,
              letterSpacing: "0.04em",
              cursor:        "pointer",
              transition:    "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Get in touch
          </button>
        </div>

        {/* Hamburger / Close button — mobile only */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{
            display:        "none", // overridden by media query on mobile
            flexDirection:  "column",
            justifyContent: "center",
            gap:            "5px",
            background:     "none",
            border:         "none",
            cursor:         "pointer",
            padding:        "4px",
            zIndex:         310,
          }}
        >
          {menuOpen ? (
            // X icon
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M6 18L18 6" stroke={menuOpen ? "#F5F3EF" : "#252B28"} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            // Hamburger icon
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="#252B28" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </nav>

      {/* Full-screen menu overlay */}
      <div className={`menu-overlay${menuOpen ? " open" : ""}`}>
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "48px" }}>
          <span style={{ width: "20px", height: "1px", background: "#C17F4A" }} />
          <span style={{
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "11px",
            fontWeight:    600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color:         "#C17F4A",
          }}>
            Navigation
          </span>
        </div>

        {/* Nav links */}
        {navLinks.map((link) => (
          <button
            key={link}
            className="menu-link"
            onClick={() => handleNavClick(link)}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </button>
        ))}

        {/* CTA */}
        <button
          onClick={() => handleNavClick("contact")}
          style={{
            marginTop:     "40px",
            padding:       "16px 32px",
            background:    "#C17F4A",
            border:        "none",
            color:         "#FFFFFF",
            fontSize:      "13px",
            fontWeight:    600,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            fontFamily:    "var(--font-dm-sans), sans-serif",
            cursor:        "pointer",
            alignSelf:     "flex-start",
          }}
        >
          Get in touch
        </button>

        {/* Footer note */}
        <p style={{
          position:   "absolute",
          bottom:     "40px",
          left:       "32px",
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize:   "12px",
          color:      "rgba(245,243,239,0.25)",
          margin:     0,
        }}>
          © 2026 Alfonso Barreiro
        </p>
      </div>
    </>
  );
}

function NavLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background:    "none",
        border:        "none",
        cursor:        "pointer",
        color:         "#8A8680",
        fontSize:      "13px",
        fontWeight:    500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding:       "4px 0",
        transition:    "color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#252B28")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8680")}
    >
      {label}
    </button>
  );
}
