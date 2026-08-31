import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ABD UI · Production Design System · Case Study";
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
            letterSpacing: "0.01em",
            textTransform: "uppercase",
          }}
        >
          <span>Case Study · Design System</span>
          <span>Ongoing</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 32, opacity: 0.7 }}>Alpha Beta Design</div>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.05,
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            ABD UI · Production Design System
          </div>
          <div
            style={{
              fontSize: 28,
              opacity: 0.7,
              lineHeight: 1.35,
              maxWidth: 900,
            }}
          >
            A token-driven design system that ships. Role-based tokens
            published to CSS, JSON, and Figma so design and code read from
            one source.
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
