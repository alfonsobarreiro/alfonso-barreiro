import type { SVGProps } from "react";

type IconProps = {
  size?: number;
  strokeWidth?: number;
} & Omit<SVGProps<SVGSVGElement>, "width" | "height">;

export function ArrowIcon({ size = 14, strokeWidth = 1.5, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" {...rest}>
      <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DownloadIcon({ size = 13, strokeWidth = 2, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function CoffeeIcon({ size = 13, strokeWidth = 2, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}

export function LayersIcon({ size = 13, strokeWidth = 2, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

/* LinkedIn — external brand badge. White glyph on --color-brand-linkedin square.
   Size prop controls the outer square; glyph scales with it. */
export function LinkedInBadge({ size = 18 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        justifyContent: "center",
        width:          size,
        height:         size,
        background:     "var(--color-brand-linkedin)",
        borderRadius:   2,
        flexShrink:     0,
      }}
    >
      <svg width={Math.round(size * 0.61)} height={Math.round(size * 0.61)} viewBox="0 0 24 24" fill="var(--color-inverse)">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    </span>
  );
}

export function SearchIcon({ size = 14, strokeWidth = 1.6, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true" {...rest}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}
