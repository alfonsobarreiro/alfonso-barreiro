"use client";

/**
 * WayfarerSlideViewer
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders the 16-slide Wayfarer case-study deck inside a responsive container
 * on the portfolio site.
 *
 * ARCHITECTURE
 * ────────────
 * 1. Fixed-canvas slides (1440 × 900)
 *    Each Slide component is pixel-exact to its Figma source, using inline
 *    styles and fixed values via the shared SlideFrame helper.
 *
 * 2. CSS transform scaling
 *    Same responsive pattern as MSRSlideViewer: `useLayoutEffect` +
 *    `ResizeObserver` measure the outer container and apply
 *    `transform: scale(ratio)` to the inner 1440 × 900 div. Aspect-ratio
 *    shell uses paddingBottom: 62.5% (= 900/1440).
 *
 * 3. Font scoping (.wayfarer-slide)
 *    Scoped in globals.css so the slide's font-display and font-heading
 *    override to Space Grotesk, and font-body overrides to Inter — without
 *    affecting the rest of the portfolio's typography.
 *
 * 4. Navigation
 *    Prev / Next buttons + ← / → arrow keys + dot indicators + "f" toggles
 *    fullscreen. Dots use brand-500 for the active state.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Slide1  from "@/components/wayfarer-slides/Slide1";
import Slide2  from "@/components/wayfarer-slides/Slide2";
import Slide3  from "@/components/wayfarer-slides/Slide3";
import Slide4  from "@/components/wayfarer-slides/Slide4";
import Slide5  from "@/components/wayfarer-slides/Slide5";
import Slide6  from "@/components/wayfarer-slides/Slide6";
import Slide7  from "@/components/wayfarer-slides/Slide7";
import Slide8  from "@/components/wayfarer-slides/Slide8";
import Slide9  from "@/components/wayfarer-slides/Slide9";
import Slide10 from "@/components/wayfarer-slides/Slide10";
import Slide11 from "@/components/wayfarer-slides/Slide11";
import Slide12 from "@/components/wayfarer-slides/Slide12";
import Slide13 from "@/components/wayfarer-slides/Slide13";
import Slide14 from "@/components/wayfarer-slides/Slide14";
import Slide15 from "@/components/wayfarer-slides/Slide15";
import Slide16 from "@/components/wayfarer-slides/Slide16";

const SLIDE_W = 1440;
const SLIDE_H = 900;
const ASPECT  = (SLIDE_H / SLIDE_W) * 100; // 62.5%

const WAYFARER_NAVY = "#3E3C78";

const slides = [
  Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8,
  Slide9, Slide10, Slide11, Slide12, Slide13, Slide14, Slide15, Slide16,
];

export default function WayfarerSlideViewer() {
  const [current, setCurrent]           = useState(0);
  const [scale, setScale]               = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef                    = useRef<HTMLDivElement>(null);
  const rootRef                         = useRef<HTMLDivElement>(null);

  // Responsive scaling
  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const w = containerRef.current.getBoundingClientRect().width;
      setScale(Math.min(w / SLIDE_W, 1));
    }
  }, []);

  useLayoutEffect(() => {
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [updateScale]);

  // Fullscreen
  const toggleFullscreen = useCallback(async () => {
    if (!rootRef.current) return;
    if (!document.fullscreenElement) {
      try { await rootRef.current.requestFullscreen(); } catch { /* ignore */ }
    } else {
      try { await document.exitFullscreen(); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Keyboard nav
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setCurrent((c) => Math.min(c + 1, slides.length - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setCurrent((c) => Math.max(c - 1, 0));
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [toggleFullscreen]);

  const prev = () => setCurrent((c) => Math.max(c - 1, 0));
  const next = () => setCurrent((c) => Math.min(c + 1, slides.length - 1));
  const CurrentSlide = slides[current];

  return (
    <div
      ref={rootRef}
      style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        padding: isFullscreen ? 0 : "0 clamp(4px, 2vw, 40px)",
        background: isFullscreen ? "#0A0A0A" : "transparent",
        display: isFullscreen ? "flex" : "block",
        flexDirection: "column",
        justifyContent: isFullscreen ? "center" : undefined,
        height: isFullscreen ? "100vh" : undefined,
      }}
    >
      {/* Aspect-ratio shell */}
      <div
        ref={containerRef}
        style={{
          position:      "relative",
          width:         "100%",
          paddingBottom: `${ASPECT}%`,
          overflow:      "hidden",
          background:    "#FFFFFF",
          border:        "1px solid #E8E4DE",
          borderRadius:  "8px",
          boxShadow:     "0 2px 16px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            position:        "absolute",
            top:             0,
            left:            0,
            width:           SLIDE_W,
            height:          SLIDE_H,
            overflow:        "hidden",
            transform:       `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <div className="wayfarer-slide" style={{ width: SLIDE_W, height: SLIDE_H, overflow: "hidden" }}>
            <CurrentSlide />
          </div>
        </div>

        {/* Fullscreen toggle */}
        <button
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen (f)"}
          style={{
            position:       "absolute",
            top:            "12px",
            right:          "12px",
            width:          "36px",
            height:         "36px",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            background:     "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            border:         "1px solid rgba(255,255,255,0.15)",
            borderRadius:   "6px",
            color:          "#FFFFFF",
            cursor:         "pointer",
            padding:        0,
          }}
        >
          {isFullscreen ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M10 2V6H14M6 2V6H2M6 14V10H2M10 14V10H14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M2 6V2H6M14 6V2H10M14 10V14H10M2 10V14H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* Controls */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        marginTop:      "14px",
        padding:        "0 clamp(4px, 3vw, 64px)",
      }}>
        <button
          onClick={prev}
          disabled={current === 0}
          style={{
            display:     "flex",
            alignItems:  "center",
            gap:         "6px",
            background:  "none",
            border:      "none",
            cursor:      current === 0 ? "default" : "pointer",
            padding:     "6px 0",
            color:       current === 0 ? "#C9BFB0" : "#6B6560",
            fontSize:    "12px",
            fontFamily:  "var(--font-dm-sans), sans-serif",
            fontWeight:  500,
            transition:  "color 0.15s",
          }}
          aria-label="Previous slide"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Previous
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width:        i === current ? "18px" : "6px",
                height:       "6px",
                borderRadius: "3px",
                background:   i === current ? WAYFARER_NAVY : "#D6D3D1",
                border:       "none",
                cursor:       "pointer",
                padding:      0,
                transition:   "width 0.2s, background 0.2s",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          style={{
            display:     "flex",
            alignItems:  "center",
            gap:         "6px",
            background:  "none",
            border:      "none",
            cursor:      current === slides.length - 1 ? "default" : "pointer",
            padding:     "6px 0",
            color:       current === slides.length - 1 ? "#C9BFB0" : "#6B6560",
            fontSize:    "12px",
            fontFamily:  "var(--font-dm-sans), sans-serif",
            fontWeight:  500,
            transition:  "color 0.15s",
          }}
          aria-label="Next slide"
        >
          Next
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <p style={{
        textAlign:     "center",
        fontSize:      "11px",
        color:         "#8A8680",
        margin:        "6px 0 0",
        fontFamily:    "var(--font-dm-sans), sans-serif",
        letterSpacing: "0.05em",
      }}>
        {current + 1} / {slides.length} — Use ← → arrow keys to navigate · F for fullscreen
      </p>
    </div>
  );
}
