"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/* Copy the email address in one tap. The site has no /contact route on
   purpose, so email is a button: it writes the address to the clipboard,
   reads "Copied" for two seconds, and a polite status line says so for
   screen readers. Where the clipboard is blocked (an insecure origin, an
   old browser, a denied permission) it falls back to opening mailto.

   Unstyled on purpose beyond the label swap: callers pass className/style
   so it matches the nav link, the hero's small button, or the footer. The
   longer of the two labels reserves the width so the swap never shifts. */

export const EMAIL = "alfonso@barreiro.com";

export function CopyEmail({
  label = "Email",
  copiedLabel = "Copied",
  className,
  style,
}: {
  label?: string;
  copiedLabel?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("no clipboard");
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <>
      <button type="button" onClick={copy} className={className} style={style} aria-label={copied ? undefined : label.toLowerCase() === "copy" ? `Copy ${EMAIL}` : `${label}, copy ${EMAIL}`}>
        <span style={{ display: "inline-grid" }}>
          <span style={{ gridArea: "1 / 1", visibility: copied ? "hidden" : "visible" }}>{label}</span>
          <span style={{ gridArea: "1 / 1", visibility: copied ? "visible" : "hidden" }} aria-hidden={!copied}>{copiedLabel}</span>
        </span>
      </button>
      <span role="status" style={SR_ONLY}>{copied ? "Email address copied." : ""}</span>
    </>
  );
}

const SR_ONLY: CSSProperties = {
  position: "absolute", width: 1, height: 1, padding: 0, margin: -1,
  overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0,
};
