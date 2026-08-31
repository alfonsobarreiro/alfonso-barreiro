import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Behind this site — How Alfonso Barreiro's portfolio is built";
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
          Behind this site · Alfonso Barreiro
        </div>
        <div
          style={{
            fontSize: 82,
            lineHeight: 1.05,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            maxWidth: 1000,
          }}
        >
          How this site is built.
        </div>
        <div style={{ fontSize: 28, opacity: 0.7, marginTop: 16 }}>
          The mark, the design system, the stack, and the eight elements
          that came off in the twenty-portfolio calibration.
        </div>
      </div>
    ),
    { ...size }
  );
}
