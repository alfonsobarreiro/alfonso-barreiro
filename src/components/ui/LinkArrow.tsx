import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowIcon } from "./icons";

/*
  DS LinkArrow primitive. Underlined text label + right-arrow SVG with a
  small hover translateX. Underline carries the affordance; arrow signals
  destination.

  tone='on-light' → --color-text-link  (Terracotta-700 on Warm White)
  tone='on-dark'  → --color-inverse-link (Warm White on Navy)
*/

type LinkArrowProps = {
  href:   string;
  tone?:  "on-light" | "on-dark";
  size?:  number; // arrow size
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

const CLASS_ROOT = "ui-linkarrow";

export function LinkArrow({ href, tone = "on-light", size = 14, className, style, children }: LinkArrowProps) {
  const color = tone === "on-light" ? "var(--color-text-link)" : "var(--color-inverse-link)";
  const rootClass = `${CLASS_ROOT} ${CLASS_ROOT}--${tone}${className ? " " + className : ""}`;
  const base: CSSProperties = {
    display:        "inline-flex",
    alignItems:     "center",
    gap:            "8px",
    fontFamily:     "var(--font-dm-sans), -apple-system, sans-serif",
    fontSize:       "15px",
    fontWeight:     500,
    letterSpacing:  0,
    color,
    textDecoration: "none",
    transition:     "color 0.2s ease",
  };
  return (
    <Link href={href} className={rootClass} style={{ ...base, ...style }}>
      <span style={{
        borderBottom:        "1px solid currentColor",
        paddingBottom:       "2px",
      }}>{children}</span>
      <span className={`${CLASS_ROOT}__arrow`} style={{ display: "inline-flex", transition: "transform 0.25s ease" }}>
        <ArrowIcon size={size} />
      </span>
    </Link>
  );
}

/* Hover + focus-visible styles live in globals.css under .ui-linkarrow selectors. */
