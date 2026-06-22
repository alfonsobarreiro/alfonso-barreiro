"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface SignupStep {
  src:     string;
  alt:     string;
  label:   string;   // "01" ... "06"
  title:   string;   // "Account", "Travel Style", ...
  caption: string;
}

interface Props {
  steps: SignupStep[];
  /** Auto-advance interval in ms. Set to 0 to disable. Default 4500. */
  autoAdvanceMs?: number;
}

/**
 * Interactive slider for the Wayfarer signup flow. Shows one screen at a time,
 * with prev/next controls, step dots, keyboard support, auto-advance, and a
 * brief description. Lives on a dark section of the case study, so color
 * choices assume that background.
 */
export default function SignupSlider({ steps, autoAdvanceMs = 4500 }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userOverride, setUserOverride] = useState(false); // set true on manual interaction
  const [reducedMotion, setReducedMotion] = useState(false);
  const total = steps.length;
  const current = steps[index];
  const touchX = useRef<number | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex(((i % total) + total) % total);
  }, [total]);

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  // Manual nav: pause auto-advance for the rest of the session
  const manual = useCallback((fn: () => void) => {
    setUserOverride(true);
    fn();
  }, []);

  // Detect reduced-motion preference (auto-advance disables entirely if set)
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(m.matches);
    update();
    m.addEventListener?.("change", update);
    return () => m.removeEventListener?.("change", update);
  }, []);

  // Auto-advance
  const autoAdvanceOn = autoAdvanceMs > 0 && !paused && !userOverride && !reducedMotion;
  useEffect(() => {
    if (!autoAdvanceOn) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % total), autoAdvanceMs);
    return () => window.clearTimeout(t);
  }, [autoAdvanceOn, autoAdvanceMs, total, index]);

  // Pause when the tab is hidden (respect background tabs)
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Keyboard: arrow keys when the slider has focus
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft")  { e.preventDefault(); manual(prev); }
    if (e.key === "ArrowRight") { e.preventDefault(); manual(next); }
  };

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(delta) > 40) manual(delta < 0 ? next : prev);
    touchX.current = null;
  };

  // Announce step changes to screen readers
  const liveRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (liveRef.current) liveRef.current.textContent = `Step ${current.label} of ${String(total).padStart(2,"0")}: ${current.title}`;
  }, [index, current.label, current.title, total]);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Wayfarer signup flow walkthrough"
      tabIndex={0}
      onKeyDown={onKey}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      style={{ outline: "none" }}
    >
      {/* Slide viewport */}
      <div style={{
        position:     "relative",
        aspectRatio:  "16 / 11",
        overflow:     "hidden",
        background:   "rgba(245,243,239,0.04)",
        border:       "1px solid rgba(245,243,239,0.1)",
        borderRadius: "14px",
      }}>
        {steps.map((s, i) => (
          <div
            key={s.label}
            aria-hidden={i !== index}
            style={{
              position:  "absolute",
              inset:     0,
              opacity:   i === index ? 1 : 0,
              transition:"opacity 260ms ease",
              pointerEvents: i === index ? "auto" : "none",
            }}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="(max-width: 767px) 100vw, 1100px"
              quality={92}
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        ))}

        {/* Prev */}
        <button
          type="button"
          onClick={() => manual(prev)}
          aria-label="Previous step"
          style={{
            position:      "absolute",
            left:          "16px",
            top:           "50%",
            transform:     "translateY(-50%)",
            width:         "44px",
            height:        "44px",
            display:       "inline-flex",
            alignItems:    "center",
            justifyContent:"center",
            background:    "rgba(30,28,58,0.75)",
            color:         "#F5F3EF",
            border:        "1px solid rgba(245,243,239,0.18)",
            borderRadius:  "999px",
            cursor:        "pointer",
            backdropFilter:"blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={() => manual(next)}
          aria-label="Next step"
          style={{
            position:      "absolute",
            right:         "16px",
            top:           "50%",
            transform:     "translateY(-50%)",
            width:         "44px",
            height:        "44px",
            display:       "inline-flex",
            alignItems:    "center",
            justifyContent:"center",
            background:    "rgba(30,28,58,0.75)",
            color:         "#F5F3EF",
            border:        "1px solid rgba(245,243,239,0.18)",
            borderRadius:  "999px",
            cursor:        "pointer",
            backdropFilter:"blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Step pill in top-left */}
        <div style={{
          position:      "absolute",
          left:          "16px",
          top:           "16px",
          padding:       "6px 10px",
          background:    "rgba(30,28,58,0.75)",
          color:         "#F5F3EF",
          border:        "1px solid rgba(245,243,239,0.18)",
          borderRadius:  "999px",
          fontFamily:    "var(--font-dm-sans), sans-serif",
          fontSize:      "11px",
          fontWeight:    600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}>
          {current.label} of {String(total).padStart(2,"0")} · {current.title}
        </div>

        {/* Auto-advance progress bar (bottom edge). Re-keyed on index so the
            animation restarts per slide; hidden if auto-advance is off. */}
        {autoAdvanceOn && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 0, right: 0, bottom: 0,
              height: "3px",
              background: "rgba(245,243,239,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              key={index}
              style={{
                height: "100%",
                background: "#8B89B8",
                width: "0%",
                animation: `wf-slider-fill ${autoAdvanceMs}ms linear forwards`,
                transformOrigin: "left",
              }}
            />
          </div>
        )}
      </div>

      {/* Keyframes injected inline to keep the component self-contained */}
      <style>{`
        @keyframes wf-slider-fill {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>

      {/* Step dots + caption row */}
      <div style={{
        marginTop:   "20px",
        display:     "flex",
        alignItems:  "center",
        gap:         "20px",
        flexWrap:    "wrap",
      }}>
        {/* Dots */}
        <div role="tablist" aria-label="Signup steps" style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          {steps.map((s, i) => (
            <button
              key={s.label}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to step ${s.label}: ${s.title}`}
              onClick={() => manual(() => goTo(i))}
              style={{
                width:       i === index ? "28px" : "8px",
                height:      "8px",
                borderRadius:"999px",
                background:  i === index ? "#8B89B8" : "rgba(245,243,239,0.25)",
                border:      "none",
                padding:     0,
                cursor:      "pointer",
                transition:  "width 200ms ease, background 200ms ease",
              }}
            />
          ))}
        </div>

        {/* Caption */}
        <p style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize:   "13px",
          lineHeight: 1.55,
          color:      "rgba(245,243,239,0.55)",
          margin:     0,
          flex:       "1 1 auto",
          minWidth:   "200px",
        }}>
          <span style={{ color: "rgba(245,243,239,0.75)", fontWeight: 600 }}>
            {current.title}.
          </span>{" "}
          {current.caption}
        </p>
      </div>

      {/* Screen-reader live region */}
      <p ref={liveRef} aria-live="polite" style={{
        position:"absolute", width: 1, height: 1, padding: 0, margin: -1,
        overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0,
      }} />
    </div>
  );
}
