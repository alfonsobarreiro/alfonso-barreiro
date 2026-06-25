import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Spotify · Recently Played Controls · Case Study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0a0a0a",
          color: "#f5f5f5",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            opacity: 0.6,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          <span>Case Study · 01</span>
          <span>2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 32, opacity: 0.7 }}>Spotify</div>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            Recently Played Controls
          </div>
          <div
            style={{
              fontSize: 28,
              opacity: 0.7,
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            Pin, Remove, Pause. Three reversible controls. The hard part was
            deciding what to cut.
          </div>
        </div>
        <div style={{ fontSize: 24, opacity: 0.6 }}>
          Alfonso Barreiro · barreiro.com
        </div>
      </div>
    ),
    { ...size }
  );
}
