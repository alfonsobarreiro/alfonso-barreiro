import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Men’s Sole Revival · Foot Health Content Platform — Case Study";
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
          <span>Case Study · 03</span>
          <span>Live since April 2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 32, opacity: 0.7 }}>Men’s Sole Revival</div>
          <div
            style={{
              fontSize: 80,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            From E-Commerce to Content Authority
          </div>
          <div
            style={{
              fontSize: 28,
              opacity: 0.7,
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            The pivot in week three is what shipped. Editorial, clinically
            grounded, product-informed.
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
