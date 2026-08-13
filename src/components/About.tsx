"use client";

import { useRef } from "react";
import Image from "next/image";
import { LinkArrow } from "@/components/ui/LinkArrow";

/**
 * About (homepage) — 2-column editorial bio: portrait left, copy right.
 * Full narrative (bio, how I work, ABD, reading, walking, Portland) lives
 * on /about. This block is the entry point.
 * No photo credit, no availability pill, no CTA row, no skills chips
 * — per 20-of-20 senior portfolio pattern.
 */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section"
      style={{
        padding:    "clamp(80px, 9vw, 128px) clamp(32px, 6vw, 80px)",
        borderTop:  "1px solid var(--color-neutral-200)",
        background: "var(--color-paper)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "var(--content-max)", margin: "0 auto" }}>
        <div
          className="about-grid"
          style={{
            display:             "grid",
            gridTemplateColumns: "minmax(240px, 320px) 1fr",
            gap:                 "clamp(48px, 6vw, 96px)",
            alignItems:          "start",
          }}
        >
          {/* Portrait — left column */}
          <div
            className="about-portrait portrait-photo"
            style={{
              width:        "100%",
              aspectRatio:  "3 / 4",
              borderRadius: 0,
              overflow:     "hidden",
              border:       "1px solid var(--color-neutral-400)",
            }}
          >
            <Image
              src="/Alfonso-Barreiro-outdoors.png"
              alt="Alfonso Barreiro outdoors in Portland, hands in jacket pockets, mid-conversation."
              width={320}
              height={427}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
            />
          </div>

          {/* Copy — right column */}
          <div style={{ maxWidth: "640px" }}>
            <h2
              style={{
                fontFamily:    "var(--font-dm-sans), sans-serif",
                fontSize:      "clamp(28px, 3.5vw, 40px)",
                fontWeight:    500,
                color:         "var(--color-text)",
                margin:        "0 0 24px",
                letterSpacing: "-0.02em",
                lineHeight:    1.15,
              }}
            >
              Research, decide, design, and build.
            </h2>

            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize:   "15px",
                lineHeight: 1.5,
                color:      "var(--color-text)",
                margin:     "0 0 32px",
              }}
            >
              I learned BASIC from a magazine, typing it line by line. I built my
              first website as a Rush fan site that probably broke every design
              rule that existed. I&rsquo;m still doing the same thing: building
              things I actually want to use.
            </p>

            <LinkArrow href="/about" tone="on-light">Read the full About</LinkArrow>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 899px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-portrait {
            max-width: 320px;
          }
        }
      `}</style>
    </section>
  );
}
