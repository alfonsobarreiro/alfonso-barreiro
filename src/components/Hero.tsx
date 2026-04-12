"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        minHeight:      "100vh",
        display:        "flex",
        flexDirection:  "column",
        justifyContent: "center",
        padding:        "120px 48px 80px",
        position:       "relative",
        overflow:       "hidden",
        background:     "#F5F5F4",
      }}
    >
      <div style={{ maxWidth: "900px", position: "relative" }}>

        {/* Eyebrow — role + location first */}
        <div
          style={{
            display:      "flex",
            alignItems:   "center",
            gap:          "14px",
            marginBottom: "28px",
          }}
        >
          <span
            style={{
              display:    "inline-block",
              width:      "32px",
              height:     "1px",
              background: "#C17F4A",
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontFamily:    "var(--font-dm-sans), sans-serif",
              fontSize:      "13px",
              fontWeight:    500,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color:         "#3D4440",
              margin:        0,
            }}
          >
            UX / UI Designer — Portland, OR
          </p>
        </div>

        {/* Name — primary anchor */}
        <h1
          style={{
            fontFamily:    "var(--font-dm-serif-display), Georgia, serif",
            fontSize:      "clamp(56px, 9vw, 110px)",
            fontWeight:    400,
            lineHeight:    0.95,
            letterSpacing: "-0.03em",
            color:         "#252B28",
            margin:        "0 0 40px",
          }}
        >
          Alfonso
          <br />
          Barreiro
        </h1>

        {/* Supporting statement */}
        <p
          style={{
            fontFamily:   "var(--font-dm-sans), sans-serif",
            fontSize:     "clamp(16px, 1.7vw, 19px)",
            lineHeight:   1.65,
            color:        "#8A8680",
            maxWidth:     "480px",
            marginBottom: "52px",
            fontWeight:   400,
          }}
        >
          Making complex things feel clear — from research through
          prototype, with an eye on the decisions underneath.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <a
            href="#work"
            style={{
              padding:    "14px 32px",
              background: "#252B28",
              color:      "#F5F5F4",
              borderRadius: "8px",
              fontSize:   "14px",
              fontWeight: 500,
              fontFamily: "var(--font-dm-sans), sans-serif",
              letterSpacing: "0.03em",
              display:    "inline-flex",
              alignItems: "center",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            View Work
          </a>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding:    "14px 32px",
              background: "transparent",
              color:      "#3D4440",
              border:     "1px solid #C9BFB0",
              borderRadius: "8px",
              fontSize:   "14px",
              fontWeight: 400,
              fontFamily: "var(--font-dm-sans), sans-serif",
              display:    "inline-flex",
              alignItems: "center",
              cursor:     "pointer",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#8A8680";
              e.currentTarget.style.color       = "#252B28";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#C9BFB0";
              e.currentTarget.style.color       = "#3D4440";
            }}
          >
            Say hello
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="scroll-hint"
        style={{
          position:      "absolute",
          bottom:        "48px",
          left:          "48px",
          display:       "flex",
          alignItems:    "center",
          gap:           "10px",
          color:         "#C9BFB0",
          fontSize:      "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontFamily:    "var(--font-dm-sans), sans-serif",
        }}
      >
        <div
          style={{
            width:      "1px",
            height:     "44px",
            background: "linear-gradient(to bottom, transparent, #C9BFB0)",
          }}
        />
        Scroll
      </div>
    </section>
  );
}
