import type { CSSProperties, ReactNode, ElementType } from "react";

/*
  DS Eyebrow primitive. Consolidates 8+ inline-styled eyebrow labels
  across Nav / Hero / Work / About / Testimonials / Footer.

  Renders at --text-small (12px) / weight 500 / tracking +0.01em.
  Mixed case only (uppercase reserved for buttons per DS rule).

  tone='muted'   → --color-text-muted (neutral-600 on light)
  tone='accent'  → --color-deep-teal (small accent)
  tone='inverse' → --color-inverse-caption (dark-surface eyebrow)
*/

type EyebrowTone = "muted" | "accent" | "inverse";

type EyebrowProps = {
  tone?: EyebrowTone;
  as?:   ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

const TONE_COLOR: Record<EyebrowTone, string> = {
  muted:   "var(--color-text-muted)",
  accent:  "var(--color-deep-teal)",
  inverse: "var(--color-inverse-caption)",
};

export function Eyebrow({ tone = "muted", as: Tag = "p", className, style, children }: EyebrowProps) {
  const base: CSSProperties = {
    fontFamily:    "var(--font-dm-sans), -apple-system, sans-serif",
    fontSize:      "var(--text-small)",
    fontWeight:    500,
    letterSpacing: "0.01em",
    color:         TONE_COLOR[tone],
    margin:        0,
  };
  return (
    <Tag className={className} style={{ ...base, ...style }}>
      {children}
    </Tag>
  );
}
