import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "About Alfonso Barreiro — UX/UI Designer";
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
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8C1A1A",
            fontWeight: 600,
          }}
        >
          About · Alfonso Barreiro
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
          Most design problems aren't visual problems. They're decisions someone hasn't made yet.
        </div>
        <div style={{ fontSize: 28, opacity: 0.7, marginTop: 16 }}>
          UX/UI Designer · Portland, OR
        </div>
      </div>
    ),
    { ...size }
  );
}
