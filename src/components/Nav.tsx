"use client";

import LogoMark from "./LogoMark";

const navLinks = ["work", "about", "contact"] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Nav() {
  return (
    <nav
      className="main-nav"
      style={{
        position:       "fixed",
        top:            0,
        left:           0,
        right:          0,
        zIndex:         100,
        height:         "72px",
        padding:        "0 48px",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        background:     "#FFFFFF",
        borderBottom:   "1px solid #E8E4DE",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .main-nav          { padding: 0 24px !important; }
          .nav-links         { display: none !important; }
          .nav-cta           { display: none !important; }
        }
      `}</style>
      {/* Logo — always dark on white, no filter needed */}
      <button
        onClick={() => scrollTo("hero")}
        aria-label="Back to top"
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        <LogoMark size={26} variant="dark" />
      </button>

      {/* Nav links + CTA */}
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
    </nav>
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
