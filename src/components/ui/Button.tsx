import type { CSSProperties, ReactNode, MouseEvent } from "react";
import Link from "next/link";

/*
  DS Button primitive. Consolidates the 6 hand-rolled primary CTAs plus the
  3 ghost pills that lived across Nav / Hero / About / Footer / BackToTop.

  Variants:
    - primary  → filled terracotta-600, inverse text, terracotta-700 hover
    - ghost    → transparent bg, neutral-400 border, text-body, neutral-600 hover border
    - inverse-fill → paper bg, terracotta-700 text, neutral-100 hover (mobile menu CTA on crimson overlay)

  Sizes:
    - sm  → 10px 18px, 12px font
    - md  → 12px 24px, 12px font
    - lg  → 14px 32px, 15px font

  Shapes:
    - rect   → borderRadius var(--radius-button) = 0
    - pill   → 999
    - circle → aspect 1:1, borderRadius 999 (for icon-only buttons; expects an icon child + ariaLabel)

  Renders as <Link> when href is set, otherwise <button>. Mixed case labels
  by default (uppercase is a per-callsite override).
*/

type ButtonVariant = "primary" | "ghost" | "inverse-fill";
type ButtonSize    = "sm" | "md" | "lg";
type ButtonShape   = "rect" | "pill" | "circle";

type CommonProps = {
  variant?: ButtonVariant;
  size?:    ButtonSize;
  shape?:   ButtonShape;
  className?: string;
  style?:     CSSProperties;
  ariaLabel?: string;
  children:   ReactNode;
};

type LinkishProps = CommonProps & {
  href:     string;
  target?:  string;
  rel?:     string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

type ButtonishProps = CommonProps & {
  href?:    never;
  type?:    "button" | "submit" | "reset";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

type ButtonProps = LinkishProps | ButtonishProps;

const SIZE_MAP: Record<ButtonSize, CSSProperties> = {
  sm: { padding: "10px 18px", fontSize: "12px" },
  md: { padding: "12px 24px", fontSize: "12px" },
  lg: { padding: "14px 32px", fontSize: "15px" },
};

const CIRCLE_SIZE_MAP: Record<ButtonSize, CSSProperties> = {
  sm: { width: 36, height: 36, padding: 0 },
  md: { width: 44, height: 44, padding: 0 },
  lg: { width: 48, height: 48, padding: 0 },
};

const SHAPE_RADIUS: Record<ButtonShape, string | number> = {
  rect:   "var(--radius-button)",
  pill:   999,
  circle: 999,
};

function baseStyle(variant: ButtonVariant, size: ButtonSize, shape: ButtonShape): CSSProperties {
  const isCircle = shape === "circle";
  const variantStyle: CSSProperties =
    variant === "primary"
      ? { background: "var(--color-bg-cta-primary)", color: "var(--color-inverse)", border: "1px solid var(--color-bg-cta-primary)" }
      : variant === "ghost"
        ? { background: "transparent", color: "var(--color-text)", border: "1px solid var(--color-neutral-400)" }
        : /* inverse-fill */ { background: "var(--color-paper)", color: "var(--color-terracotta-700)", border: "1px solid var(--color-paper)" };

  return {
    display:        "inline-flex",
    alignItems:     "center",
    justifyContent: "center",
    gap:            "8px",
    fontFamily:     "var(--font-dm-sans), -apple-system, sans-serif",
    fontWeight:     500,
    letterSpacing:  "0.01em",
    borderRadius:   SHAPE_RADIUS[shape],
    textDecoration: "none",
    cursor:         "pointer",
    transition:     "background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.25s ease",
    ...(isCircle ? CIRCLE_SIZE_MAP[size] : SIZE_MAP[size]),
    ...variantStyle,
  };
}

/* Hover behavior lives in a scoped <style> block below so :hover works on
   both button and <Link> anchors without inline onMouseEnter handlers. */
const CLASS_ROOT = "ui-btn";

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", shape = "rect", className, style, ariaLabel, children } = props;
  const rootClass = `${CLASS_ROOT} ${CLASS_ROOT}--${variant} ${CLASS_ROOT}--${shape}${className ? " " + className : ""}`;
  const merged = { ...baseStyle(variant, size, shape), ...style };

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        target={props.target}
        rel={props.rel}
        onClick={props.onClick}
        aria-label={ariaLabel}
        className={rootClass}
        style={merged}
      >
        {children}
      </Link>
    );
  }
  const { type = "button", onClick, disabled } = props as ButtonishProps;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={rootClass}
      style={merged}
    >
      {children}
    </button>
  );
}

/* Hover + focus-visible styles live in globals.css under .ui-btn selectors. */
