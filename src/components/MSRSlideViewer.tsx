"use client";

/**
 * MSRSlideViewer
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders all 9 Men's Sole Revival case-study slides inside a responsive
 * container on the portfolio site (localhost:3000).
 *
 * ARCHITECTURE NOTES
 * ──────────────────
 * 1. Fixed-canvas slides (1440 × 900 px)
 *    Each Slide component renders at exactly 1440 × 900 — the same pixel
 *    dimensions as the Figma source — using inline styles and fixed values.
 *    They are NOT responsive on their own.
 *
 * 2. CSS transform scaling
 *    A `useLayoutEffect` + `ResizeObserver` measures the outer container's
 *    width every time it changes. A CSS `transform: scale(ratio)` is applied
 *    to the inner 1440 × 900 div, where ratio = containerWidth / 1440.
 *    `transformOrigin: "top left"` keeps the scaled content flush to the
 *    container's top-left corner.
 *    The outer container uses `paddingBottom: 62.5%` (= 900/1440 × 100%)
 *    to maintain the correct 16:10 aspect ratio at any container width.
 *
 * 3. Font scoping (.msr-slide)
 *    The portfolio uses font-display → DM Serif Display; MSR slides use
 *    font-display → Barlow Condensed. To prevent conflicts, the inner div
 *    carries the class `msr-slide`. In globals.css, `.msr-slide .font-display`,
 *    `.msr-slide .font-heading`, and `.msr-slide .font-body` are overridden
 *    with `!important` to point at the correct MSR typefaces:
 *      font-display  → --font-barlow-condensed (Barlow Condensed 700/800)
 *      font-heading  → --font-lora             (Lora 400–700, normal + italic)
 *      font-body     → --font-dm-sans          (DM Sans 400–600)
 *    Those font variables are loaded in layout.tsx via next/font/google.
 *
 * 4. Navigation
 *    Prev / Next buttons overlay the bottom of the slide area.
 *    Left / Right arrow keys also advance slides.
 *    Dot indicators (active = cognac pill, inactive = gray circle) match
 *    the CaseStudyNav design used on the MSR site (localhost:3001).
 *
 * 5. Never deploy to MSR site
 *    These components live ONLY in the portfolio (localhost:3000 / barreiro.com).
 *    The MSR site (localhost:3001 / menssolereval.com) keeps its own frame pages.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Slide1 from "@/components/msr-slides/Slide1";
import Slide2 from "@/components/msr-slides/Slide2";
import Slide3 from "@/components/msr-slides/Slide3";
import Slide4 from "@/components/msr-slides/Slide4";
import Slide5 from "@/components/msr-slides/Slide5";
import Slide6 from "@/components/msr-slides/Slide6";
import Slide7 from "@/components/msr-slides/Slide7";
import Slide8 from "@/components/msr-slides/Slide8";
import Slide9 from "@/components/msr-slides/Slide9";

const SLIDE_W = 1440;
const SLIDE_H = 900;
const ASPECT  = (SLIDE_H / SLIDE_W) * 100; // 62.5%

const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9];

export default function MSRSlideViewer() {
  const [current, setCurrent]     = useState(0); // 0-indexed
  const [scale, setScale]         = useState(1);
  const containerRef              = useRef<HTMLDivElement>(null);

  // ── Responsive scaling ────────────────────────────────────────────────────
  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const w = containerRef.current.getBoundingClientRect().width;
      setScale(Math.min(w / SLIDE_W, 1)); // never upscale beyond native resolution
    }
  }, []);

  useLayoutEffect(() => {
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [updateScale]);

  // ── Keyboard navigation ───────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setCurrent((c) => Math.min(c + 1, slides.length - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setCurrent((c) => Math.max(c - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const prev = () => setCurrent((c) => Math.max(c - 1, 0));
  const next = () => setCurrent((c) => Math.min(c + 1, slides.length - 1));

  const CurrentSlide = slides[current];

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", padding: "0 40px" }}>
      {/* ── Aspect-ratio shell ─────────────────────────────────────────── */}
      <div
        ref={containerRef}
        style={{
          position:      "relative",
          width:         "100%",
          paddingBottom: `${ASPECT}%`,
          overflow:      "hidden",
          background:    "#F8F7F7",
          border:        "1px solid #E8E4DE",
          borderRadius:  "8px",
          boxShadow:     "0 2px 16px rgba(0,0,0,0.06)",
        }}
      >
        {/* ── Scaled slide canvas ──────────────────────────────────────── */}
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
          {/*
            Explicit-height wrapper: slide components use h-full / flex-1
            internally, which requires a parent with a DEFINITE height.
            Their own outer div only has minHeight:900 (not height:900),
            so percentage heights would be undefined without this wrapper.
          */}
          <div className="msr-slide" style={{ width: SLIDE_W, height: SLIDE_H, overflow: "hidden" }}>
            <CurrentSlide />
          </div>
        </div>
      </div>

      {/* ── Controls ───────────────────────────────────────────────────── */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        marginTop:      "14px",
        padding:        "0 clamp(24px, 4vw, 64px)",
      }}>
        {/* Prev */}
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

        {/* Dot indicators */}
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
                background:   i === current ? "#C4703A" : "#D6D3D1",
                border:       "none",
                cursor:       "pointer",
                padding:      0,
                transition:   "width 0.2s, background 0.2s",
              }}
            />
          ))}
        </div>

        {/* Next */}
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

      {/* Slide counter */}
      <p style={{
        textAlign:   "center",
        fontSize:    "11px",
        color:       "#8A8680",
        margin:      "6px 0 0",
        fontFamily:  "var(--font-dm-sans), sans-serif",
        letterSpacing: "0.05em",
      }}>
        {current + 1} / {slides.length} — Use ← → arrow keys to navigate
      </p>
    </div>
  );
}
