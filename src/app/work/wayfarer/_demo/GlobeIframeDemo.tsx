"use client";

import { useRef, useState } from "react";

const c = {
  ink:     "#1A2236",
  ink2:    "#3D4566",
  muted:   "#5A6378",
  paper:   "#F4F6F7",
  border:  "#8A8680",
  navy:    "#1A2236",
  accent:  "#0F3D3E",
  coral:   "#C4584A",
};

const font = {
  sans: '"DM Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
};

/* The globe explorer lives at /discover, not the marketing homepage.
   Before this change the iframe loaded / and readers just saw the
   editorial cover; they never reached the Mapbox globe the caption
   promises. */
const LIVE_URL       = "https://wayfarer.barreiro.com/discover";
const LIVE_ROOT_URL  = "https://wayfarer.barreiro.com/";

export default function GlobeIframeDemo() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  /* The prior 6-second timeout-based failure fallback fired too
     aggressively — on any slow connection the fallback panel replaced
     the iframe before wayfarer.barreiro.com finished loading, and
     because the fallback removes the iframe from the DOM, the demo
     could never recover. Removed the timer entirely. The always-visible
     "Open the full site ↗" link below the frame is the escape hatch
     for any browser that actually blocks the embed. */
  const failed = false;

  return (
    <section
      aria-label="Try the live globe"
      style={{
        background:    c.paper,
        border:        `1px solid ${c.border}`,
        borderLeft:    "none",
        /* Signature three-stack left bar (navy / Deep Teal / ink) —
           the visual wordmark reused across every Decision Callout on
           this case study. Declares the demo as a native member of the
           decision family rather than a supporting artifact. */
        backgroundImage: `linear-gradient(to bottom, ${c.navy} 0%, ${c.navy} 33.33%, ${c.accent} 33.33%, ${c.accent} 66.66%, ${c.ink} 66.66%, ${c.ink} 100%)`,
        backgroundSize:     "6px 100%",
        backgroundRepeat:   "no-repeat",
        backgroundPosition: "left top",
        paddingTop:    "clamp(24px, 4vw, 48px)",
        paddingRight:  "clamp(24px, 4vw, 48px)",
        paddingBottom: "clamp(24px, 4vw, 48px)",
        paddingLeft:   "calc(clamp(24px, 4vw, 48px) + 6px)",
        fontFamily:    font.sans,
        color:         c.ink,
      }}
    >
      <header style={{ marginBottom: "20px" }}>
        <span style={{
          fontFamily:    font.sans,
          fontSize:      "11px",
          fontWeight:    700,
          letterSpacing: "0.2em",
          color:         c.coral,
          textTransform: "uppercase",
          display:       "block",
          marginBottom:  "10px",
        }}>
          Live · embedded
        </span>
        <h3 style={{
          fontFamily:    font.sans,
          fontSize:      "clamp(20px, 2.4vw, 26px)",
          fontWeight:    600,
          color:         c.navy,
          margin:        "0 0 8px",
          letterSpacing: "-0.015em",
        }}>
          Try it yourself.
        </h3>
        <p style={{
          fontFamily: font.sans,
          fontSize:   "15px",
          lineHeight: 1.55,
          color:      c.ink2,
          margin:     0,
          maxWidth:   "60ch",
        }}>
          The live globe explorer is below, embedded directly from wayfarer.barreiro.com. Spin it, click any pin, see the destination card open on the right.
        </p>
      </header>

      <div className="wf-globe-iframe-frame" style={{ position: "relative", width: "100%", aspectRatio: "640 / 420", border: `1px solid ${c.border}`, background: "#000" }}>
        {!failed && (
          <iframe
            ref={iframeRef}
            src={LIVE_URL}
            title="Wayfarer live globe explorer"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setLoaded(true)}
            style={{
              position: "absolute",
              inset:    0,
              width:    "100%",
              height:   "100%",
              border:   "none",
              display:  "block",
            }}
          />
        )}

        {!loaded && !failed && (
          <div
            role="status"
            aria-live="polite"
            style={{
              position:       "absolute",
              inset:          0,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              background:     "rgba(26,34,54,0.92)",
              color:          "#F4F6F7",
              fontFamily:     font.sans,
              fontSize:       "14px",
              fontWeight:     500,
              letterSpacing:  "0.02em",
              pointerEvents:  "none",
            }}
          >
            Loading the globe…
          </div>
        )}

        {failed && (
          <div
            role="status"
            aria-live="polite"
            style={{
              position:       "absolute",
              inset:          0,
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              justifyContent: "center",
              background:     "#0E1424",
              color:          "#F4F6F7",
              textAlign:      "center",
              padding:        "24px",
              gap:            "12px",
            }}
          >
            <p style={{
              fontFamily: font.sans,
              fontSize:   "16px",
              fontWeight: 600,
              margin:     0,
              maxWidth:   "44ch",
            }}>
              The embed isn't loading in this browser.
            </p>
            <p style={{
              fontFamily: font.sans,
              fontSize:   "14px",
              color:      "rgba(244,246,247,0.78)",
              margin:     0,
              maxWidth:   "44ch",
            }}>
              Some browsers block cross-site iframes on slower connections. Open the live site to spin the globe.
            </p>
            <a
              href={LIVE_ROOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop:       "8px",
                background:      c.coral,
                color:           "#FFFFFF",
                padding:         "12px 22px",
                fontFamily:      font.sans,
                fontSize:        "13px",
                fontWeight:      600,
                letterSpacing:   "0.04em",
                textTransform:   "uppercase",
                textDecoration:  "none",
                minHeight:       "44px",
                display:         "inline-flex",
                alignItems:      "center",
              }}
            >
              Open wayfarer.barreiro.com ↗
            </a>
          </div>
        )}
      </div>

      <footer
        style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          gap:            "16px",
          flexWrap:       "wrap",
          marginTop:      "16px",
        }}
      >
        <p style={{
          fontFamily:    font.sans,
          fontSize:      "12px",
          fontWeight:    500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color:         c.muted,
          margin:        0,
        }}>
          Click any pin · sticky card opens on the right
        </p>
        <a
          href={LIVE_ROOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily:     font.sans,
            fontSize:       "13px",
            fontWeight:     600,
            color:          c.accent,
            textDecoration: "none",
            borderBottom:   `1px solid ${c.accent}`,
            paddingBottom:  "2px",
          }}
        >
          Open the full site ↗
        </a>
      </footer>
      <style>{`
        /* On phones, the 640×420 landscape frame renders at ~247px tall,
           which is too small to actually explore the globe. Switch to a
           taller portrait aspect ratio so the globe reads at usable size. */
        @media (max-width: 760px) {
          .wf-globe-iframe-frame { aspect-ratio: 4 / 5 !important; }
        }
      `}</style>
    </section>
  );
}
