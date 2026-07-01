"use client";

import { useEffect, useRef, useState } from "react";

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

const LIVE_URL = "https://wayfarer.barreiro.com/";

export default function GlobeIframeDemo() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = window.setTimeout(() => {
      if (!loaded) setFailed(true);
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [loaded]);

  return (
    <section
      aria-label="Try the live globe"
      style={{
        background: c.paper,
        border:     `1px solid ${c.border}`,
        padding:    "clamp(24px, 4vw, 48px)",
        fontFamily: font.sans,
        color:      c.ink,
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

      <div style={{ position: "relative", width: "100%", aspectRatio: "640 / 420", border: `1px solid ${c.border}`, background: "#000" }}>
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
              href={LIVE_URL}
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
          href={LIVE_URL}
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
    </section>
  );
}
