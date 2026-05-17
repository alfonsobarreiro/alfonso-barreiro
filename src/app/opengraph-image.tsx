import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Alfonso Barreiro — UX/UI Designer";
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
            fontSize: 28,
            opacity: 0.6,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Alfonso Barreiro
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            UX/UI Designer
          </div>
          <div style={{ fontSize: 36, opacity: 0.8, lineHeight: 1.3 }}>
            Research. Decide. Ship.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            opacity: 0.6,
          }}
        >
          <span>Portland, OR</span>
          <span>barreiro.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
