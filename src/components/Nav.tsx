"use client";

import { useState, useEffect, useRef } from "react";
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
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); // check initial position
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu open/close a11y wiring: Esc closes; focus moves to first link
  // on open; focus returns to hamburger on close; body scroll locks.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Move focus into the menu so keyboard + screen reader users land
    // inside the modal on open. requestAnimationFrame waits for the
    // overlay's inert state to clear.
    requestAnimationFrame(() => {
      const firstLink = overlayRef.current?.querySelector<HTMLElement>("a, button");
      firstLink?.focus();
    });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      // Return focus to the hamburger on close so the user knows where
      // they are in the document.
      hamburgerRef.current?.focus();
    };
  }, [menuOpen]);

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
      {/* Skip link — first focusable element on every page. Visually
          hidden until focused, then snaps to the top-left of the viewport
          so keyboard users can jump past the nav landmark to <main id=
          "main-content">. Pairs with the id on each page's <main>. */}
      <a href="#main-content" className="skip-link">Skip to main content</a>
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
            ? "var(--color-brand)"
            : scrolled
              ? "rgba(255,255,255,0.82)"
              : "#FFFFFF",
          backdropFilter: !menuOpen && scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: !menuOpen && scrolled ? "blur(12px)" : "none",
          borderBottom:   menuOpen
            ? "1px solid rgba(245,243,239,0.08)"
            : scrolled
              ? "1px solid rgba(232,228,222,0.6)"
              : "none",
          transition:     "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
        }}
      >
        {/* Logo + wordmark */}
        {isHome ? (
          <button
            onClick={handleLogoClick}
            aria-label="Back to top"
            className="site-logo"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, zIndex: 310, display: "flex", alignItems: "center", gap: "12px" }}
          >
            <span className="site-logo-mark">
              <LogoMark size={24} variant={menuOpen ? "light" : "dark"} />
            </span>
            <span
              className="nav-wordmark"
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "18px",
                fontWeight:    600,
                letterSpacing: "-0.015em",
                color:         menuOpen ? "#F5F5F4" : "#252B28",
                transition:    "color 0.25s ease",
                lineHeight:    1,
              }}
            >
              <span className="site-logo-first">Alfonso</span>{" "}
              <span style={{ color: menuOpen ? "#F5F5F4" : "var(--color-brand)" }}>Barreiro</span>
            </span>
          </button>
        ) : (
          <Link href="/" aria-label="Back to home" className="site-logo" style={{ lineHeight: 0, zIndex: 310, display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <span className="site-logo-mark">
              <LogoMark size={24} variant={menuOpen ? "light" : "dark"} />
            </span>
            <span
              className="nav-wordmark"
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "18px",
                fontWeight:    600,
                letterSpacing: "-0.015em",
                color:         menuOpen ? "#F5F5F4" : "#252B28",
                transition:    "color 0.25s ease",
                lineHeight:    1,
              }}
            >
              <span className="site-logo-first">Alfonso</span>{" "}
              <span style={{ color: menuOpen ? "#F5F5F4" : "var(--color-brand)" }}>Barreiro</span>
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
              routeHref={link === "about" ? "/about" : undefined}
              onScrollClick={() => scrollTo(link)}
            />
          ))}
          <SearchTrigger />
          <Link
            href="/contact"
            className="on-crimson"
            style={{
              padding:        "10px 24px",
              background:     "var(--color-brand)",
              border:         "none",
              borderRadius:   0,
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
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
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
            padding:        "11px",
            minWidth:       "44px",
            minHeight:      "44px",
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
          ref={hamburgerRef}
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu-overlay"
          style={{
            display:        "none", // overridden by media query on mobile
            flexDirection:  "column",
            justifyContent: "center",
            alignItems:     "center",
            gap:            "5px",
            background:     "none",
            border:         "none",
            cursor:         "pointer",
            padding:        "10px",
            minWidth:       "44px",
            minHeight:      "44px",
            zIndex:         310,
          }}
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M6 18L18 6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="#252B28" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </nav>

      {/* Full-screen menu overlay. `inert` + aria-hidden when closed
          keeps the focus order out of the hidden links. role=dialog +
          aria-modal pairs with the focus management in useEffect. */}
      <div
        ref={overlayRef}
        id="mobile-menu-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        inert={!menuOpen}
        aria-hidden={!menuOpen}
        className="menu-overlay-crimson"
        style={{
          position:        "fixed",
          inset:           0,
          zIndex:          200,
          background:      "var(--color-brand)",
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
          <span style={{ width: "20px", height: "1px", background: "rgba(255,255,255,0.55)" }} />
          <span style={{
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "11px",
            fontWeight:    600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color:         "rgba(255,255,255,0.78)",
          }}>
            Navigation
          </span>
        </div>

        {/* Nav links */}
        {navLinks.map((link) => {
          const overlayLinkStyle: React.CSSProperties = {
            fontFamily:     "var(--font-dm-sans), sans-serif",
            fontSize:       "clamp(42px, 12vw, 72px)",
            fontWeight:     500,
            color:          "#FFFFFF",
            letterSpacing:  "-0.025em",
            lineHeight:     1.1,
            background:     "none",
            border:         "none",
            borderBottom:   "1px solid rgba(255,255,255,0.18)",
            cursor:         "pointer",
            padding:        "12px 0",
            textAlign:      "left",
            transition:     "opacity 0.2s",
            width:          "100%",
            display:        "block",
            textDecoration: "none",
          };
          // Crimson backdrop: dim the link slightly on hover instead of
          // shifting hue. Brand-crimson hover on crimson bg would vanish.
          const onEnter = (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.opacity = "0.72");
          const onLeave = (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.opacity = "1");

          // "about" always routes to /about, regardless of current page
          if (link === "about") {
            return (
              <Link
                key={link}
                href="/about"
                onClick={() => setMenuOpen(false)}
                style={overlayLinkStyle}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                About
              </Link>
            );
          }

          return isHome ? (
            <button
              key={link}
              onClick={() => handleNavClick(link)}
              style={overlayLinkStyle}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </button>
          ) : (
            <Link
              key={link}
              href={`/#${link}`}
              onClick={() => setMenuOpen(false)}
              style={overlayLinkStyle}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </Link>
          );
        })}

        {/* Case studies — quick-jump under Work. No borderTop here;
            the previous link's borderBottom already provides separation
            (was a doubled hairline). */}
        <div style={{
          marginTop:    "28px",
          display:      "flex",
          flexDirection:"column",
          gap:          "14px",
        }}>
          <span style={{
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "10px",
            fontWeight:    700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color:         "rgba(255,255,255,0.65)",
            marginBottom:  "2px",
          }}>
            Case studies
          </span>
          {[
            { href: "/work/spotify",            label: "Spotify"            },
            { href: "/work/wayfarer",           label: "Wayfarer"           },
            { href: "/work/mens-sole-revival",  label: "Men's Sole Revival" },
          ].map((cs) => (
            <Link
              key={cs.href}
              href={cs.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily:     "var(--font-dm-sans), sans-serif",
                fontSize:       "18px",
                fontWeight:     500,
                color:          "#FFFFFF",
                letterSpacing:  "-0.005em",
                textDecoration: "none",
                transition:     "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.72")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {cs.label} →
            </Link>
          ))}
        </div>

        {/* CTA — inverted on the crimson menu backdrop (white card with
            crimson text instead of the usual crimson-on-white button). */}
        <Link
          href="/contact"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop:      "40px",
            padding:        "16px 32px",
            background:     "#FFFFFF",
            border:         "none",
            borderRadius:   0,
            color:          "var(--color-brand)",
            fontSize:       "13px",
            fontWeight:     700,
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
          color:      "rgba(255,255,255,0.85)",
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
      className="nav-search-pill"
      onClick={() => openCommandPalette()}
      aria-label="Search (⌘K)"
      style={{
        display:       "inline-flex",
        alignItems:    "center",
        gap:           "8px",
        padding:       "6px 10px 6px 8px",
        background:    "transparent",
        border:        "1px solid #8A8680",
        borderRadius:  0,
        cursor:        "pointer",
        color:         "#3D4440",
        minHeight:     "40px",
        fontFamily:    "var(--font-dm-sans), sans-serif",
        fontSize:      "12px",
        transition:    "color 0.2s, border-color 0.2s, background 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#252B28";
        e.currentTarget.style.borderColor = "#B8B0A2";
        e.currentTarget.style.background = "#FAFAF9";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#3D4440";
        e.currentTarget.style.borderColor = "#8A8680";
        e.currentTarget.style.background = "transparent";
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
        <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span className="nav-search-label">Search</span>
      <kbd className="nav-search-kbd" style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize:   "10px",
        padding:    "2px 5px",
        background: "#FAFAF9",
        border:     "1px solid #8A8680",
        borderRadius: "3px",
        color:      "#5A5752",
        lineHeight: 1,
        marginLeft: "2px",
      }}>
        ⌘K
      </kbd>
      <style>{`
        /* Below 960px, collapse the search pill to icon-only so the
           desktop nav (logo + 2 links + search + Get in touch CTA) has
           room without elements squeezing into each other. */
        @media (max-width: 960px) {
          .nav-search-pill {
            padding: 8px !important;
            border-color: transparent !important;
          }
          .nav-search-pill .nav-search-label,
          .nav-search-pill .nav-search-kbd {
            display: none !important;
          }
        }
      `}</style>
    </button>
  );
}

function NavLink({
  label,
  isHome,
  routeHref,
  onScrollClick,
}: {
  label: string;
  isHome: boolean;
  routeHref?: string;
  onScrollClick: () => void;
}) {
  const sharedStyle: React.CSSProperties = {
    background:    "none",
    border:        "none",
    cursor:        "pointer",
    color:         "#3D4440",
    fontSize:      "13px",
    fontWeight:    500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    /* Padded to clear WCAG 2.5.8 Target Size (Minimum) — 24x24 floor.
       13px line-height + 12px vertical padding = ~37px hit target. */
    padding:       "12px 4px",
    transition:    "color 0.2s",
    textDecoration: "none",
    display:       "inline-flex",
    alignItems:    "center",
  };

  // If a routeHref is provided, always navigate to that route (regardless of current page)
  if (routeHref) {
    return (
      <Link
        href={routeHref}
        style={sharedStyle}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#252B28")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#3D4440")}
      >
        {label}
      </Link>
    );
  }

  if (isHome) {
    return (
      <button
        onClick={onScrollClick}
        style={sharedStyle}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#252B28")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#3D4440")}
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
      onMouseLeave={(e) => (e.currentTarget.style.color = "#3D4440")}
    >
      {label}
    </Link>
  );
}
