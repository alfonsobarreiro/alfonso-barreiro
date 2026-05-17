import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Contact Alfonso Barreiro";
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
          alignItems: "center",
          gap: 32,
          padding: "80px",
          background: "#0a0a0a",
          color: "#f5f5f5",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            fontSize: 96,
            lineHeight: 1.05,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          Let’s make something good.
        </div>
        <div style={{ fontSize: 28, opacity: 0.7 }}>
          Alfonso Barreiro · UX/UI Designer · Portland, OR
        </div>
      </div>
    ),
    { ...size }
  );
}
