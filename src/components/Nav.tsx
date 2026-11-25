"use client";

import { useState, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SR_ONLY } from "@/components/ui/LinkArrow";
import LogoMark from "./LogoMark";
import CommandPalette, { openCommandPalette } from "./CommandPalette";
import { HIRING_EXCLUDE } from "@/lib/search-index";
import { Eyebrow } from "@/components/ui/Eyebrow";

/* Nav items: Work · Case studies · Studio · About · Resume, plus Search.
   Email left the header 2026-11-04 (Alfonso): the address lives in the
   hire block at the bottom of the homepage. Case studies jumps to that
   section of /work; the mobile menu already lists each case study under
   its main links, so it is desktop only. Process and Behind this site
   sit in the footer on desktop and stay in the mobile menu. Studio links
   to alphabeta.design. */
type NavItem =
  | { kind: "route"; key: string; href: string; label: string }
  | { kind: "studio"; key: "studio"; label: string };

const WORK:    NavItem = { kind: "route",  key: "work",    href: "/work",             label: "Work" };
const STUDIO:  NavItem = { kind: "studio", key: "studio",                             label: "Studio" };
const ABOUT:   NavItem = { kind: "route",  key: "about",   href: "/about",            label: "About" };
const RESUME:  NavItem = { kind: "route",  key: "resume",  href: "/resume",           label: "Resume" };
const PROCESS: NavItem = { kind: "route",  key: "process", href: "/process",          label: "Process" };
const BEHIND:  NavItem = { kind: "route",  key: "behind",  href: "/behind-this-site", label: "Behind this site" };
const CASES:   NavItem = { kind: "route",  key: "cases",   href: "/work#case-studies", label: "Case studies" };

const DESKTOP_ITEMS: NavItem[] = [WORK, CASES, STUDIO, ABOUT, RESUME];
const MENU_ITEMS:    NavItem[] = [WORK, STUDIO, ABOUT, RESUME, PROCESS, BEHIND];

/* /hiring (audience "hiring") is the link job applications use, and
   job applications never link the studio, so Studio is left out of both
   lists there. Every other item stays as it is. */
const notStudio = (item: NavItem) => item.kind !== "studio";
const DESKTOP_ITEMS_HIRING: NavItem[] = DESKTOP_ITEMS.filter(notStudio);
const MENU_ITEMS_HIRING:    NavItem[] = MENU_ITEMS.filter(notStudio);


const CASE_STUDIES = [
  { href: "/work/msr-chatbot",        label: "Alfred (MSR chatbot)"       },
  { href: "/work/aiga-portland",      label: "AIGA PDX"                   },
  { href: "/work/mens-sole-revival",  label: "Men's Sole Revival"         },
  { href: "/work/wayfarer",           label: "Wayfarer"                   },
  { href: "/work/spotify",            label: "Spotify"                    },
  // { href: "/work/abd-ui-system",      label: "ABD UI System"      }, // hidden 2026-07-01, rework pending
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function isActiveRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/* Studio: the studio's own site, since the homepage studio slab was cut
   (2026-11-04). Same tab, like every other nav item. */
const STUDIO_URL = "https://www.alphabeta.design";

function StudioLink({
  className,
  style,
  onNavigate,
  children,
}: {
  isHome?: boolean;
  className?: string;
  style?: CSSProperties;
  onNavigate?: () => void;
  children: ReactNode;
}) {
  return (
    /* The studio is another site, so it opens in a new tab (2026-11-25). */
    <a href={STUDIO_URL} target="_blank" rel="noopener noreferrer" className={className} style={style} onClick={onNavigate}>
      {children}
      <span style={SR_ONLY}> (opens in a new tab)</span>
    </a>
  );
}

export default function Nav({
  audience = "all",
  inPage = false,
}: {
  audience?: "all" | "hiring";
  /** The page is a homepage composition on another route (the
      /prototypes/home-kus preview): the logo scrolls to #hero and Studio is
      an in-page #studio anchor, as on "/". Default false. */
  inPage?: boolean;
} = {}) {
  const desktopItems = audience === "hiring" ? DESKTOP_ITEMS_HIRING : DESKTOP_ITEMS;
  const menuItems    = audience === "hiring" ? MENU_ITEMS_HIRING    : MENU_ITEMS;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname  = usePathname();
  // /hiring counts as home: its logo scrolls back to its own top instead of
  // linking to /, which carries the studio.
  const isHome    = inPage || pathname === "/" || audience === "hiring";
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

  function handleLogoClick() {
    setMenuOpen(false);
    if (isHome) scrollTo("hero");
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Skip link: first focusable element on every page. Visually
          hidden until focused, then snaps to the top-left of the viewport
          so keyboard users can jump past the nav landmark to <main id=
          "main-content">. Pairs with the id on each page's <main>. */}
      <a href="#main-content" className="skip-link">Skip to main content</a>
      {/* Main nav bar */}
      <nav
        className="main-nav"
        data-menu-open={menuOpen ? "" : undefined}
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
          /* Open: terracotta-600, the overlay's ground, so the bar and the
             menu read as one surface. White on it measures 5.43:1. */
          background:     menuOpen
            ? "var(--color-terracotta-600)"
            : scrolled
              ? "var(--color-bg-nav-scrolled)"
              : "var(--color-paper)",
          backdropFilter: !menuOpen && scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: !menuOpen && scrolled ? "blur(12px)" : "none",
          /* Border always renders at 1px so the color transition can
             animate cleanly. Using "none" for the unscrolled state made
             the browser interpolate from the default (dark) border-color
             on the first scroll, producing a dark flash before settling
             on --color-neutral-200. Transparent to neutral-200 fades in
             quietly without the flash. */
          borderBottom:   menuOpen
            ? "1px solid var(--color-inverse-hairline)"
            : scrolled
              ? "1px solid var(--color-neutral-200)"
              : "1px solid transparent",
          transition:     "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
        }}
      >
        {/* Logo + wordmark */}
        {isHome ? (
          <button
            onClick={handleLogoClick}
            aria-label="Alfonso Barreiro, back to top"
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
          {desktopItems.map((item) => {
            if (item.kind === "route") {
              const active = isActiveRoute(pathname, item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className="nav-item"
                  style={NAV_ITEM_STYLE}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <StudioLink key={item.key} isHome={isHome} className="nav-item" style={NAV_ITEM_STYLE}>
                {item.label}
              </StudioLink>
            );
          })}
          <SearchTrigger />
        </div>

        {/* Mobile bar actions (below 1024px): Resume stays one tap away as
            a visible text link, then Search, then the menu button. */}
        <div className="nav-mobile-actions">
          <Link
            href="/resume"
            className="nav-item nav-resume-mobile"
            style={NAV_ITEM_STYLE}
            onClick={closeMenu}
            aria-current={isActiveRoute(pathname, "/resume") ? "page" : undefined}
          >
            Resume
          </Link>

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

          {/* Hamburger / Close button, mobile only */}
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6L18 18M6 18L18 6" stroke="var(--color-inverse)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
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
          /* Terracotta-600, not 500: white text measures 5.43:1 here, so
             the 12px "Case studies" label and the 22px case-study links
             pass AA. 500 measured 4.01:1 with white. */
          background:      "var(--color-terracotta-600)",
          display:         "flex",
          flexDirection:   "column",
          /* Top-aligned, not centered: centering a block taller than the
             viewport clips both ends (was cutting "Work" on small screens).
             Top padding = 72px nav + 16px breathing. overflowY:auto lets
             the menu scroll on short viewports instead of clipping. */
          padding:         "88px 32px 40px",
          overflowY:       "auto",
          WebkitOverflowScrolling: "touch",
          transform:       menuOpen ? "translateY(0)" : "translateY(-100%)",
          transition:      "transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)",
          pointerEvents:   menuOpen ? "auto" : "none",
        }}
      >
        {/* Nav links */}
        {menuItems.map((item) => {
          if (item.kind === "route") {
            const active = isActiveRoute(pathname, item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={closeMenu}
                className="menu-item"
                style={OVERLAY_ITEM_STYLE}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          }
          return (
            <StudioLink key={item.key} isHome={isHome} onNavigate={closeMenu} className="menu-item" style={OVERLAY_ITEM_STYLE}>
              {item.label}
            </StudioLink>
          );
        })}

        {/* Case studies: quick-jump under the main links. No borderTop
            here; the previous item's borderBottom already provides
            separation (was a doubled hairline). */}
        <div style={{
          marginTop:    "28px",
          display:      "flex",
          flexDirection:"column",
          gap:          "14px",
        }}>
          {/* Full white: at 12px this label needs 4.5:1, and white on
              terracotta-600 measures 5.43:1. The old 85% white measured
              under 4.5:1 on this ground. */}
          <Eyebrow
            tone="inverse"
            style={{
              fontSize:     "var(--text-small)",
              color:        "var(--color-inverse)",
              marginBottom: "4px",
            }}
          >
            Case studies
          </Eyebrow>
          {CASE_STUDIES.map((cs) => (
            <Link
              key={cs.href}
              href={cs.href}
              onClick={closeMenu}
              className="menu-subitem"
              style={{
                fontFamily:     "var(--font-dm-sans), sans-serif",
                /* Bumped from --text-h3 (20px): was reading as caption
                   next to the 60px primary nav. This lands the case
                   studies as a real subordinate level, not a footnote. */
                fontSize:       "clamp(22px, 5.5vw, 30px)",
                fontWeight:     500,
                color:          "var(--color-inverse)",
                letterSpacing:  "-0.01em",
                textDecoration: "none",
                lineHeight:     1.2,
              }}
            >
              {cs.label} →
            </Link>
          ))}
        </div>

      </div>

      {/* Cmd+K command palette: listens globally, opens on shortcut or via openCommandPalette() */}
      <CommandPalette exclude={audience === "hiring" ? HIRING_EXCLUDE : undefined} />

      <style>{`
        /* Desktop items share one color + hover rule. */
        .nav-item       { color: var(--color-neutral-700); transition: color 0.2s; }
        .nav-item:hover { color: var(--color-text); }

        /* Mobile bar: Resume, Search, Menu. Hidden on desktop, where the
           full link row takes over. */
        .nav-mobile-actions { display: none; align-items: center; }
        @media (max-width: 1023px) {
          .nav-mobile-actions { display: flex; }
        }
        /* The menu button's 44px box reaches 10px into the right gutter, so
           its glyph sits on the content edge. */
        .nav-mobile-actions .hamburger { margin-right: -10px; }

        /* The wordmark stays on one line at every width (the logo is a
           button on the homepage, and a wrapped name centered itself in
           two lines). Mark, name, Resume, Search and Menu need 412px.
           Below that the infinity mark drops out and the name stays, so a
           390px phone reads "Alfonso Barreiro" on one line with a clear
           gap before Resume. Below 360px the name steps down to 17px. */
        .nav-wordmark { white-space: nowrap; text-align: left; }
        /* 44px hit area for the logo. The bar centers it, so nothing moves. */
        .main-nav .site-logo { min-height: 44px; }
        @media (max-width: 411px) {
          .main-nav .site-logo-mark { display: none; }
        }
        @media (max-width: 359px) {
          .main-nav .nav-wordmark { font-size: 17px !important; }
        }

        /* Menu open: the bar turns terracotta-600, so its text and focus
           ring go white (5.43:1). Terracotta-500 rings vanish on it. */
        .main-nav[data-menu-open] .nav-resume-mobile,
        .main-nav[data-menu-open] .nav-resume-mobile:hover { color: var(--color-inverse); }
        .main-nav[data-menu-open] a:focus-visible,
        .main-nav[data-menu-open] button:focus-visible { outline-color: var(--color-inverse); }

        /* Overlay hover. Primary items (40px and up) dim to 72% white,
           which still clears the 3:1 large-text floor. The 22px case-study
           links underline instead, because a dim would drop them under
           4.5:1. Hover only where a real pointer can hover, so a tap on a
           phone never leaves an item stuck dim. */
        .menu-item, .menu-subitem { transition: opacity 0.2s; }
        @media (hover: hover) {
          .menu-item:hover    { opacity: 0.72; }
          .menu-subitem:hover { text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 4px; }
        }

        /* Reduced motion, or the viewer stopped the dots: the menu opens
           and closes in place, with no slide. */
        @media (prefers-reduced-motion: reduce) {
          #mobile-menu-overlay, .main-nav, .nav-item, .menu-item, .menu-subitem { transition: none !important; }
        }
        html[data-dots="still"] #mobile-menu-overlay { transition: none !important; }
      `}</style>
    </>
  );
}

/* Shared by every desktop item. Color lives in .nav-item so :hover can
   change it without inline handlers. */
const NAV_ITEM_STYLE: CSSProperties = {
  background:     "none",
  border:         "none",
  cursor:         "pointer",
  fontFamily:     "inherit",
  fontSize:       "var(--text-body)",
  fontWeight:     500,
  lineHeight:     "inherit",
  letterSpacing:  "0.01em",
  /* 12px vertical padding on the inherited line height gives a ~46px
     hit target, over the 44px house floor. */
  padding:        "12px 4px",
  textDecoration: "none",
  display:        "inline-flex",
  alignItems:     "center",
  textAlign:      "left",
};

const OVERLAY_ITEM_STYLE: CSSProperties = {
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
  width:          "100%",
  display:        "block",
  textDecoration: "none",
};

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
        /* Same 12px vertical padding as the links: a 47px hit area on a
           touch laptop or an iPad in landscape, with no visual change. */
        padding:       "12px 0",
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
