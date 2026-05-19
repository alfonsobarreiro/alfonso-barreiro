"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LogoMark from "./LogoMark";
import CommandPalette, { openCommandPalette } from "./CommandPalette";

const navLinks = ["work", "about"] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname  = usePathname();
  const isHome    = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); // check initial position
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick(id: string) {
    setMenuOpen(false);
    if (isHome) {
      setTimeout(() => scrollTo(id), 300);
    }
    // When not on homepage, navigation is handled by the <Link href> on the element
  }

  function handleLogoClick() {
    setMenuOpen(false);
    if (isHome) scrollTo("hero");
  }

  return (
    <>
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
          background:     menuOpen
            ? "#252B28"
            : scrolled
              ? "rgba(255,255,255,0.82)"
              : "#FFFFFF",
          backdropFilter: !menuOpen && scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: !menuOpen && scrolled ? "blur(12px)" : "none",
          borderBottom:   menuOpen
            ? "1px solid rgba(245,243,239,0.08)"
            : scrolled
              ? "1px solid rgba(232,228,222,0.6)"
              : "1px solid #A99B8A",
          boxShadow:      !menuOpen && scrolled
            ? "0 1px 8px rgba(37,43,40,0.12)"
            : "none",
          transition:     "background 0.3s, border-color 0.3s, box-shadow 0.3s, backdrop-filter 0.3s",
        }}
      >
        {/* Logo + wordmark */}
        {isHome ? (
          <button
            onClick={handleLogoClick}
            aria-label="Back to top"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, zIndex: 310, display: "flex", alignItems: "center", gap: "12px" }}
          >
            <LogoMark size={24} variant={menuOpen ? "light" : "dark"} />
            <span
              className="nav-wordmark"
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "18px",
                fontWeight:    600,
                letterSpacing: "-0.015em",
                color:         menuOpen ? "#F5F5F4" : "#252B28",
                transition:    "color 0.3s",
                lineHeight:    1,
              }}
            >
              Alfonso <span style={{ color: "#C17F4A" }}>Barreiro</span>
            </span>
          </button>
        ) : (
          <Link href="/" aria-label="Back to home" style={{ lineHeight: 0, zIndex: 310, display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <LogoMark size={24} variant={menuOpen ? "light" : "dark"} />
            <span
              className="nav-wordmark"
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "18px",
                fontWeight:    600,
                letterSpacing: "-0.015em",
                color:         menuOpen ? "#F5F5F4" : "#252B28",
                transition:    "color 0.3s",
                lineHeight:    1,
              }}
            >
              Alfonso <span style={{ color: "#C17F4A" }}>Barreiro</span>
            </span>
          </Link>
        )}

        {/* Desktop nav links */}
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          {navLinks.map((link) => (
            <NavLink
              key={link}
              label={link}
              isHome={isHome}
              onScrollClick={() => scrollTo(link)}
            />
          ))}
          <SearchTrigger />
          <Link
            href="/contact"
            style={{
              padding:        "10px 24px",
              background:     "#C17F4A",
              border:         "none",
              borderRadius:   "8px",
              color:          "#FFFFFF",
              fontSize:       "13px",
              fontWeight:     500,
              letterSpacing:  "0.04em",
              cursor:         "pointer",
              transition:     "transform 0.25s ease, box-shadow 0.25s ease",
              textDecoration: "none",
              display:        "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(193,127,74,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile-only search icon next to hamburger */}
        <button
          className="nav-search-mobile"
          onClick={() => { setMenuOpen(false); openCommandPalette(); }}
          aria-label="Search"
          style={{
            display:        "none", // overridden by media query on mobile
            alignItems:     "center",
            justifyContent: "center",
            background:     "none",
            border:         "none",
            cursor:         "pointer",
            padding:        "4px 8px 4px 4px",
            zIndex:         310,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke={menuOpen ? "#F5F5F4" : "#252B28"} strokeWidth="1.6" />
            <path d="M20 20L16.5 16.5" stroke={menuOpen ? "#F5F5F4" : "#252B28"} strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M6 18L18 6" stroke={menuOpen ? "#F5F5F4" : "#252B28"} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="#252B28" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </nav>

      {/* Full-screen menu overlay */}
      <div
        style={{
          position:        "fixed",
          inset:           0,
          zIndex:          200,
          background:      "#252B28",
          display:         "flex",
          flexDirection:   "column",
          justifyContent:  "center",
          padding:         "40px 32px",
          transform:       menuOpen ? "translateY(0)" : "translateY(-100%)",
          transition:      "transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)",
          pointerEvents:   menuOpen ? "auto" : "none",
        }}
      >
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
          isHome ? (
            <button
              key={link}
              onClick={() => handleNavClick(link)}
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "clamp(42px, 12vw, 72px)",
                fontWeight:    500,
                color:         "rgba(245,243,239,0.85)",
                letterSpacing: "-0.025em",
                lineHeight:    1.1,
                background:    "none",
                border:        "none",
                borderBottom:  "1px solid rgba(245,243,239,0.08)",
                cursor:        "pointer",
                padding:       "12px 0",
                textAlign:     "left",
                transition:    "color 0.2s",
                width:         "100%",
                display:       "block",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C17F4A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,243,239,0.85)")}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </button>
          ) : (
            <Link
              key={link}
              href={`/#${link}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily:     "var(--font-dm-sans), sans-serif",
                fontSize:       "clamp(42px, 12vw, 72px)",
                fontWeight:     500,
                color:          "rgba(245,243,239,0.85)",
                letterSpacing:  "-0.025em",
                lineHeight:     1.1,
                borderBottom:   "1px solid rgba(245,243,239,0.08)",
                padding:        "12px 0",
                textAlign:      "left",
                transition:     "color 0.2s",
                width:          "100%",
                display:        "block",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C17F4A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,243,239,0.85)")}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </Link>
          )
        ))}

        {/* CTA */}
        <Link
          href="/contact"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop:      "40px",
            padding:        "16px 32px",
            background:     "#C17F4A",
            border:         "none",
            borderRadius:   "8px",
            color:          "#FFFFFF",
            fontSize:       "13px",
            fontWeight:     600,
            letterSpacing:  "0.07em",
            textTransform:  "uppercase",
            fontFamily:     "var(--font-dm-sans), sans-serif",
            cursor:         "pointer",
            alignSelf:      "flex-start",
            textDecoration: "none",
            display:        "inline-block",
          }}
        >
          Get in touch
        </Link>

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

      {/* Cmd+K command palette — listens globally, opens on shortcut or via openCommandPalette() */}
      <CommandPalette />
    </>
  );
}

function SearchTrigger() {
  return (
    <button
      onClick={() => openCommandPalette()}
      aria-label="Search (⌘K)"
      style={{
        display:       "inline-flex",
        alignItems:    "center",
        gap:           "8px",
        padding:       "6px 10px 6px 8px",
        background:    "transparent",
        border:        "1px solid #E8E4DE",
        borderRadius:  "8px",
        cursor:        "pointer",
        color:         "#8A8680",
        fontFamily:    "var(--font-dm-sans), sans-serif",
        fontSize:      "12px",
        transition:    "color 0.2s, border-color 0.2s, background 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#252B28";
        e.currentTarget.style.borderColor = "#C9BFB0";
        e.currentTarget.style.background = "#FAFAF9";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#8A8680";
        e.currentTarget.style.borderColor = "#E8E4DE";
        e.currentTarget.style.background = "transparent";
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
        <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span>Search</span>
      <kbd style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize:   "10px",
        padding:    "2px 5px",
        background: "#FAFAF9",
        border:     "1px solid #E8E4DE",
        borderRadius: "3px",
        color:      "#8A8680",
        lineHeight: 1,
        marginLeft: "2px",
      }}>
        ⌘K
      </kbd>
    </button>
  );
}

function NavLink({
  label,
  isHome,
  onScrollClick,
}: {
  label: string;
  isHome: boolean;
  onScrollClick: () => void;
}) {
  const sharedStyle: React.CSSProperties = {
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
    textDecoration: "none",
    display:       "inline-block",
  };

  if (isHome) {
    return (
      <button
        onClick={onScrollClick}
        style={sharedStyle}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#252B28")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8680")}
      >
        {label}
      </button>
    );
  }

  return (
    <Link
      href={`/#${label}`}
      style={sharedStyle}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#252B28")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8680")}
    >
      {label}
    </Link>
  );
}
