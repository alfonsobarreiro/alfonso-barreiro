/**
 * Shared 1440×900 slide shell for the Wayfarer deck.
 * Handles background, wordmark, page number, and padding so individual
 * slides can focus on their own content.
 */
import type { ReactNode } from "react";

export const SLIDE_W = 1440;
export const SLIDE_H = 900;
export const WAYFARER_TOTAL_SLIDES = 16;

/** Shared palette — same anchors as the Figma deck. */
export const wf = {
  bg:        "#FFFFFF",
  bgDark:    "#1C1C1E",
  brand50:   "#F3F3FA",
  brand100:  "#E1E2F1",
  brand200:  "#C5C7E3",
  brand500:  "#3E3C78",
  brand700:  "#353469",
  brand900:  "#2C2B5A",
  accent500: "#D27A5E",
  accent700: "#8F4A37",
  sage300:   "#A3C9A8",
  n100:      "#EEEEF0",
  n200:      "#D8D9E0",
  n400:      "#8E8B90",
  n500:      "#6B6560",
  n700:      "#3F3D3B",
  n900:      "#1C1C1E",
  white:     "#FFFFFF",
  success50: "#F0FDF4",
  error50:   "#FEF2F2",
  error500:  "#EF4444",
  error600:  "#DC2626",
  success500:"#22C55E",
  success600:"#16A34A",
} as const;

interface SlideFrameProps {
  index: number;              // 1-based slide number
  title: string;              // short title for the top-right pill
  variant?: "light" | "dark"; // background theme
  children: ReactNode;
}

export function SlideFrame({ index, title, variant = "light", children }: SlideFrameProps) {
  const isDark   = variant === "dark";
  const bg       = isDark ? wf.bgDark : wf.bg;
  const fgText   = isDark ? wf.white : wf.n900;
  const mutedText= isDark ? wf.n400  : wf.n500;
  const border   = isDark ? "rgba(255,255,255,0.12)" : wf.n200;

  return (
    <div
      className="font-body"
      style={{
        width:    SLIDE_W,
        height:   SLIDE_H,
        background: bg,
        color:    fgText,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Wordmark — top-left */}
      <div style={{
        position:      "absolute",
        top:           56,
        left:          96,
        fontFamily:    "var(--font-inter), Inter, sans-serif",
        fontSize:      14,
        fontWeight:    500,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color:         fgText,
      }}>
        WAYFARER
      </div>

      {/* Page number + title pill — top-right */}
      <div style={{
        position:    "absolute",
        top:         56,
        right:       96,
        display:     "flex",
        alignItems:  "center",
        gap:         12,
      }}>
        <span style={{
          fontFamily:    "var(--font-inter), Inter, sans-serif",
          fontSize:      11,
          fontWeight:    600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color:         mutedText,
        }}>
          {String(index).padStart(2,"0")} / {String(WAYFARER_TOTAL_SLIDES).padStart(2,"0")}
        </span>
        <span style={{ width: 1, height: 12, background: border }} />
        <span style={{
          fontFamily:    "var(--font-inter), Inter, sans-serif",
          fontSize:      11,
          fontWeight:    600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color:         mutedText,
        }}>
          {title}
        </span>
      </div>

      {/* Slide content area — 96 px inner padding */}
      <div style={{
        position:  "absolute",
        left:      96,
        right:     96,
        top:       144,
        bottom:    96,
      }}>
        {children}
      </div>
    </div>
  );
}

/** Small section eyebrow label. */
export function Eyebrow({ children, tone = "accent" }: { children: ReactNode; tone?: "accent" | "muted" | "light" }) {
  const color = tone === "accent" ? wf.accent700 : tone === "light" ? "rgba(255,255,255,0.55)" : wf.n500;
  return (
    <div style={{
      fontFamily:    "var(--font-inter), Inter, sans-serif",
      fontSize:      12,
      fontWeight:    600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color,
    }}>
      {children}
    </div>
  );
}
