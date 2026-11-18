"use client";

/* Footer: strict SPD-restraint per the 20-portfolio calibration.
   Status chip (Portland, OR · Open for work) moved here from the hero
   2026-08-25 so the fold's opening beat is the H1, not a status label.
   Brand strip + minimal reach-out links + copyright below the chip.
   2026-10-23: Process and Behind this site moved here from the nav, and
   the row carries the site's second "Stop the dots" switch (the first is
   in the hero cue row). Client component only for that switch. */

import { useSyncExternalStore, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { SITE_YEAR } from "@/lib/work";
import PageLength from "@/components/PageLength";
import { DOTS_EVENT, getDots, setDots, type DotsState } from "@/lib/dots";

const font  = "var(--font-dm-sans), -apple-system, sans-serif";
const bg    = "var(--color-bg-elevated)";
const ink   = "var(--color-text)";
const muted = "var(--color-text-muted)"; /* neutral-600 site-wide; the homepage scope maps it to 700 */
const brand = "var(--color-brand)";
// Terracotta-500 text measured 3.67:1 on this footer ground, under AA.
// 600 keeps the hue and clears 4.5:1; the dot stays 500.
const brandText = "var(--color-terracotta-600)";

const linkStyle = {
  fontFamily:          font,
  fontSize:            "var(--text-body)",
  fontWeight:          500,
  color:               ink,
  textDecoration:      "underline",
  textDecorationColor: muted,
  textUnderlineOffset: "3px",
} as const;

const LINKS = [
  { href: "/process",                                    label: "Process" },
  { href: "/behind-this-site",                           label: "Behind this site" },
  { href: "https://www.linkedin.com/in/alfonso-barreiro/", label: "LinkedIn", external: true },
  { href: "/resume",                                     label: "Resume" },
  { href: "mailto:alfonso@barreiro.com",                 label: "alfonso@barreiro.com" },
];

/* The dots state lives on <html data-dots>. Every control writes it with
   setDots, which fires DOTS_EVENT, so this button and the hero's stay in
   step. The server snapshot is "moving"; the head script may already have
   set "still", and the first client render picks that up. */
function subscribeDots(onChange: () => void) {
  window.addEventListener(DOTS_EVENT, onChange);
  return () => window.removeEventListener(DOTS_EVENT, onChange);
}
const serverDots = (): DotsState => "moving";

function DotsToggle() {
  const dots = useSyncExternalStore(subscribeDots, getDots, serverDots);
  const still = dots === "still";
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setDots(still ? "moving" : "still")}
      className="footer-dots-toggle"
      style={{ minHeight: "44px" }}
    >
      {/* Both labels share one grid cell, so the button keeps the width
          of the longer one and the swap never shifts the row. The label
          itself names the action, so there is no aria-pressed on top. */}
      <span style={{ display: "inline-grid" }}>
        <span style={{ gridArea: "1 / 1", visibility: still ? "hidden" : "visible" }} aria-hidden={still}>Stop the dots</span>
        <span style={{ gridArea: "1 / 1", visibility: still ? "visible" : "hidden" }} aria-hidden={!still}>Start the dots</span>
      </span>
    </Button>
  );
}

export default function Footer({
  ground = "elevated",
  controls,
}: {
  /** "paper": a white ground with a neutral-200 hairline on top, for a
      page whose last band is also paper (the /prototypes/home-kus preview).
      Default "elevated": the neutral-100 ground every page renders. */
  ground?: "elevated" | "paper";
  /** More controls beside the "Stop the dots" switch. Default none. */
  controls?: ReactNode;
} = {}) {
  return (
    <footer
      className="site-footer"
      style={ground === "paper"
        ? { background: "var(--color-paper)", borderTop: "1px solid var(--color-neutral-200)" }
        : { background: bg, borderTop: "none" }}
    >
      <div className="site-footer-pad" style={{ padding: "40px clamp(32px, 6vw, 80px)" }}>
        <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
          <div
            className="footer-top"
            style={{
              display:        "flex",
              justifyContent: "space-between",
              alignItems:     "center",
              flexWrap:       "wrap",
              gap:            "12px 16px",
              margin:         "0 0 20px",
            }}
          >
            {/* Status chip: same dot + brand-color label treatment as the
                About page chip; anchors the availability signal at the
                bottom of every page where recruiters naturally look for
                reach-out info. */}
            <p
              style={{
                display:    "inline-flex",
                alignItems: "center",
                gap:        "10px",
                fontFamily: font,
                fontSize:   "var(--text-body)",
                fontWeight: 500,
                color:      brandText,
                margin:     0,
                lineHeight: 1.35,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display:      "inline-block",
                  width:        "8px",
                  height:       "8px",
                  borderRadius: "50%",
                  background:   brand,
                }}
              />
              Portland, OR · Open for work
            </p>

            {controls ? (
              <div className="footer-controls" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
                {controls}
                <DotsToggle />
              </div>
            ) : (
              <DotsToggle />
            )}
          </div>

          <div
            className="footer-strip"
            style={{
              display:        "flex",
              justifyContent: "space-between",
              alignItems:     "center",
              flexWrap:       "wrap",
              gap:            "16px",
            }}
          >
          <p style={{
            fontFamily: font,
            fontSize:   "var(--text-body)",
            fontWeight: 400,
            color:      muted,
            margin:     0,
          }}>
            © {SITE_YEAR} Alfonso Barreiro · Product designer and web developer
          </p>

          {/* 24px between rows as well as items, so the 44px tap areas of
              wrapped links touch but never overlap. */}
          <div className="footer-links" style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center" }}>
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                style={linkStyle}
              >
                {l.label}
              </a>
            ))}
          </div>
          </div>

          {/* The Mill Ends line (PORTLAND.millEnds): one 12px line under
              the strip, renders nothing when the switch is off. */}
          <PageLength />
        </div>
      </div>

      <style>{`
        /* Links keep their 15px type; the padding grows each tap area
           to 44px and the matching negative margin keeps the layout. */
        .footer-links a { display: inline-block; padding: 12px 0; margin: -12px 0; }
        @media (max-width: 639px) {
          .footer-strip,
          .footer-top {
            align-items: flex-start !important;
          }
          .footer-top { flex-direction: column; }
        }
      `}</style>
    </footer>
  );
}
