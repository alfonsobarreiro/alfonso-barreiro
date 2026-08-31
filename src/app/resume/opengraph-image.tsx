import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Resume · Alfonso Barreiro · Product Designer";
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
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 32,
          padding: "96px",
          background: "#0a0a0a",
          color: "#f5f5f5",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.01em",
            textTransform: "uppercase",
            color: "#8C1A1A",
            fontWeight: 500,
          }}
        >
          Resume · Alfonso Barreiro
        </div>
        <div
          style={{
            fontSize: 96,
            lineHeight: 1.05,
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          Product Designer
        </div>
        <div
          style={{
            fontSize: 32,
            opacity: 0.7,
            lineHeight: 1.35,
            maxWidth: 900,
          }}
        >
          Fifteen years across agency, in-house, and independent practice. Portland, OR.
        </div>
      </div>
    ),
    { ...size }
  );
}
