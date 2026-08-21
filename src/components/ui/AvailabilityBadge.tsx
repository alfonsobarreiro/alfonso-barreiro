import type { CSSProperties } from "react";

/*
  DS AvailabilityBadge primitive. Consolidates the two duplicate
  availability displays in About and Footer, sourcing the microcopy
  from one AVAILABILITY_COPY constant so it can't drift.

  variant='card'    → bordered chip on neutral-200 (About site)
  variant='inline'  → plain paragraph with leading dot (Footer site)

  Both share the pulsing deep-teal dot. Pulse keyframes are already
  defined in globals.css @keyframes pulse (used by the current
  .availability-dot class).
*/

export const AVAILABILITY_COPY = "Open to product and UX/UI roles, contract or full-time. Portland, OR or remote.";

type AvailabilityBadgeProps = {
  variant?: "card" | "inline";
  style?: CSSProperties;
};

const DOT: CSSProperties = {
  display:       "inline-block",
  width:         "8px",
  height:        "8px",
  borderRadius:  "50%",
  background:    "var(--color-deep-teal)",
  verticalAlign: "middle",
  animation:     "pulse 2.2s ease-in-out infinite",
  flexShrink:    0,
};

export function AvailabilityBadge({ variant = "inline", style }: AvailabilityBadgeProps) {
  if (variant === "card") {
    return (
      <div
        style={{
          display:      "inline-flex",
          alignItems:   "center",
          gap:          "8px",
          padding:      "8px 16px",
          background:   "var(--color-neutral-200)",
          border:       "1px solid var(--color-neutral-500)",
          borderRadius: 0,
          ...style,
        }}
      >
        <span className="availability-dot" aria-hidden="true" style={DOT} />
        <span
          style={{
            fontFamily:    "var(--font-dm-sans), sans-serif",
            fontSize:      "var(--text-small)",
            fontWeight:    500,
            letterSpacing: "0.01em",
            color:         "var(--color-text)",
            lineHeight:    1.5,
          }}
        >
          {AVAILABILITY_COPY}
        </span>
      </div>
    );
  }

  // inline
  return (
    <p
      style={{
        fontFamily:  "var(--font-dm-sans), sans-serif",
        fontSize:    "var(--text-body)",
        lineHeight:  1.5,
        color:       "var(--color-text)",
        margin:      0,
        ...style,
      }}
    >
      <span
        className="availability-dot"
        aria-hidden="true"
        style={{ ...DOT, marginRight: "8px" }}
      />
      {AVAILABILITY_COPY}
    </p>
  );
}
