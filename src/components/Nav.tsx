"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LogoMark from "./LogoMark";
import CommandPalette, { openCommandPalette } from "./CommandPalette";
import { Eyebrow } from "@/components/ui/Eyebrow";

const navLinks = ["work", "process", "about", "behind"] as const;

const NAV_ROUTES: Partial<Record<(typeof navLinks)[number], { href: string; label: string }>> = {
  about:   { href: "/about",             label: "About" },
  process: { href: "/process",           label: "Process" },
  behind:  { href: "/behind-this-site",  label: "Behind this site" },
};

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

  // Menu open/close a11y wiring: Esc closes; Tab cycles within the
  // dialog; focus moves to first link on open; focus returns to
  // hamburger on close; body scroll locks.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || !overlayRef.current) return;
      const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last  = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      // Trap forward + backward Tab so focus can't leak back to the
      // hamburger underneath the modal.
      if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
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
          padding:        "0 max(clamp(32px, 6vw, 80px), calc((100vw - var(--content-max)) / 2))",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          background:     menuOpen
            ? "var(--color-terracotta)"
            : scrolled
              ? "var(--color-bg-nav-scrolled)"
              : "var(--color-paper)",
          backdropFilter: !menuOpen && scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: !menuOpen && scrolled ? "blur(12px)" : "none",
          borderBottom:   menuOpen
            ? "1px solid var(--color-inverse-hairline)"
            : scrolled
              ? "1px solid var(--color-neutral-200)"
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
                fontSize:      "var(--text-h3)",
                fontWeight:    500,
                letterSpacing: "-0.03em",
                color:         menuOpen ? "var(--color-inverse)" : "var(--color-text)",
                transition:    "color 0.25s ease",
                lineHeight:    1,
              }}
            >
              <span className="site-logo-first">Alfonso</span>{" "}
              <span>Barreiro</span>
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
                fontSize:      "var(--text-h3)",
                fontWeight:    500,
                letterSpacing: "-0.03em",
                color:         menuOpen ? "var(--color-inverse)" : "var(--color-text)",
                transition:    "color 0.25s ease",
                lineHeight:    1,
              }}
            >
              <span className="site-logo-first">Alfonso</span>{" "}
              <span>Barreiro</span>
            </span>
          </Link>
        )}

        {/* Desktop nav links */}
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          {navLinks.map((link) => (
            <NavLink
              key={link}
              label={NAV_ROUTES[link]?.label ?? link}
              isHome={isHome}
              routeHref={NAV_ROUTES[link]?.href}
              onScrollClick={() => scrollTo(link)}
            />
          ))}
          <SearchTrigger />
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
            <circle cx="11" cy="11" r="7" stroke={menuOpen ? "var(--color-inverse)" : "var(--color-text)"} strokeWidth="1.6" />
            <path d="M20 20L16.5 16.5" stroke={menuOpen ? "var(--color-inverse)" : "var(--color-text)"} strokeWidth="1.6" strokeLinecap="round" />
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
              <path d="M6 6L18 18M6 18L18 6" stroke="var(--color-inverse)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round"/>
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
        className="menu-overlay-terracotta"
        style={{
          position:        "fixed",
          inset:           0,
          zIndex:          200,
          background:      "var(--color-terracotta)",
          display:         "flex",
          flexDirection:   "column",
          justifyContent:  "center",
          padding:         "40px 32px",
          transform:       menuOpen ? "translateY(0)" : "translateY(-100%)",
          transition:      "transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)",
          pointerEvents:   menuOpen ? "auto" : "none",
        }}
      >
        {/* Nav links */}
        {navLinks.map((link) => {
          const overlayLinkStyle: React.CSSProperties = {
            fontFamily:     "var(--font-dm-sans), sans-serif",
            fontSize:       "clamp(40px,8vw,60px)",
            fontWeight:     500,
            color:          "var(--color-inverse)",
            letterSpacing:  "-0.02em",
            lineHeight:     1.1,
            background:     "none",
            border:         "none",
            borderBottom:   "1px solid var(--color-inverse-hairline)",
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

          // Route-based nav items always link to their pages regardless of current page
          const route = NAV_ROUTES[link];
          if (route) {
            const { href, label } = route;
            return (
              <Link
                key={link}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={overlayLinkStyle}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                {label}
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
          <Eyebrow tone="inverse" style={{ fontSize: "var(--text-small)", marginBottom: "2px" }}>Case studies</Eyebrow>
          {[
            { href: "/work/spotify",            label: "Spotify"            },
            { href: "/work/wayfarer",           label: "Wayfarer"           },
            { href: "/work/mens-sole-revival",  label: "Men's Sole Revival" },
            { href: "/work/aiga-portland",      label: "AIGA PDX"           },
            // { href: "/work/abd-ui-system",      label: "ABD UI System"      }, // hidden 2026-07-01 — rework pending
          ].map((cs) => (
            <Link
              key={cs.href}
              href={cs.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily:     "var(--font-dm-sans), sans-serif",
                fontSize:       "var(--text-h3)",
                fontWeight:     500,
                color:          "var(--color-inverse)",
                letterSpacing:  "-0.01em",
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

        {/* Footer note */}
        <p style={{
          position:   "absolute",
          bottom:     "40px",
          left:       "32px",
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize:   "var(--text-small)",
          color:      "var(--color-inverse-body)",
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
      type="button"
      onClick={() => openCommandPalette()}
      aria-label="Search"
      title="Search (⌘K)"
      style={{
        display:       "inline-flex",
        alignItems:    "center",
        gap:           "8px",
        padding:       0,
        background:    "transparent",
        border:        "none",
        cursor:        "pointer",
        color:         "var(--color-text-muted)",
        fontFamily:    "var(--font-dm-sans), sans-serif",
        fontSize:      "var(--text-body)",
        fontWeight:    500,
        transition:    "color 0.2s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-text)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-muted)"; }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <span>Search</span>
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
    color:         "var(--color-neutral-700)",
    fontSize:      "var(--text-body)",
    fontWeight:    500,
    letterSpacing: "0.01em",
    /* Padded to clear WCAG 2.5.8 Target Size (Minimum) — 24x24 floor.
       15px line-height + 12px vertical padding = ~39px hit target. */
    padding:       "12px 4px",
    transition:    "color 0.2s",
    textDecoration: "none",
    display:       "inline-flex",
    alignItems:    "center",
  };
  const displayLabel = label.charAt(0).toUpperCase() + label.slice(1);

  // If a routeHref is provided, always navigate to that route (regardless of current page)
  if (routeHref) {
    return (
      <Link
        href={routeHref}
        style={sharedStyle}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-neutral-700)")}
      >
        {displayLabel}
      </Link>
    );
  }

  if (isHome) {
    return (
      <button
        onClick={onScrollClick}
        style={sharedStyle}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-neutral-700)")}
      >
        {displayLabel}
      </button>
    );
  }

  return (
    <Link
      href={`/#${label}`}
      style={sharedStyle}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-neutral-700)")}
    >
      {displayLabel}
    </Link>
  );
}
