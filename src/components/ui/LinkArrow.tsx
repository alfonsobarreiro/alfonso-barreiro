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

/* Links that leave barreiro.com open in a new tab (Alfonso, 2026-11-25:
   "All the website links in the site need to open in new tab"), with
   rel="noopener noreferrer" and a screen-reader note, since WCAG asks that
   a new window be announced (technique G201). Same-site links stay Next
   <Link>s. */
const isExternal = (href: string) =>
  /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?barreiro\.com(\/|$)/i.test(href);
export const SR_ONLY: CSSProperties = { position: "absolute", width: 1, height: 1, margin: -1, padding: 0, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0 };

export function LinkArrow({ href, tone = "on-light", size = 14, className, style, children }: LinkArrowProps) {
  const color = tone === "on-light" ? "var(--color-text-link)" : "var(--color-inverse-link)";
  const rootClass = `${CLASS_ROOT} ${CLASS_ROOT}--${tone}${className ? " " + className : ""}`;
  const base: CSSProperties = {
    display:        "inline-flex",
    alignItems:     "center",
    gap:            "8px",
    fontFamily:     "var(--font-dm-sans), -apple-system, sans-serif",
    fontSize:       "var(--text-body)",
    fontWeight:     500,
    letterSpacing:  0,
    color,
    textDecoration: "none",
    transition:     "color 0.2s ease",
  };
  const inner = (
    <>
      <span style={{
        borderBottom:        "1px solid currentColor",
        paddingBottom:       "2px",
      }}>{children}</span>
      <span className={`${CLASS_ROOT}__arrow`} style={{ display: "inline-flex", transition: "transform 0.25s ease" }}>
        <ArrowIcon size={size} />
      </span>
    </>
  );
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={rootClass} style={{ ...base, ...style }}>
        {inner}
        <span style={SR_ONLY}> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={rootClass} style={{ ...base, ...style }}>
      {inner}
    </Link>
  );
}

/* Hover + focus-visible styles live in globals.css under .ui-linkarrow selectors. */
