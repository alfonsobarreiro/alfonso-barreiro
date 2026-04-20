"use client";

/**
 * SpotifySlideViewer
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders the 40-slide Spotify Recently Played Controls case study deck on the
 * portfolio site.
 *
 * ARCHITECTURE
 * ────────────
 * 1. Image-based slides
 *    Each slide is a 2x PNG export of the corresponding Figma frame
 *    (public/images/work/spotify/deck/slide-XX.png). Unlike MSR — where slides
 *    are hand-built React components representing the live MSR site — Spotify's
 *    design deliverable is the Figma prototype itself, so exported PNGs are
 *    the honest representation of that work.
 *
 * 2. Fixed-canvas scaling (same pattern as MSRSlideViewer)
 *    The canvas is 1920×1080 (Spotify's native slide size, vs. MSR's 1440×900).
 *    A `useLayoutEffect` + `ResizeObserver` measures the outer container's
 *    width and applies CSS `transform: scale(containerWidth / 1920)` to the
 *    inner div. Aspect-ratio shell uses `paddingBottom: 56.25%` (16:9).
 *
 * 3. Navigation
 *    Prev / Next buttons + Left/Right arrow keys. With 40 slides, dot
 *    indicators don't scale — replaced with a click-to-jump progress bar
 *    tinted Spotify green (#1DB954) and a "N / 40" counter.
 *
 * 4. Loading
 *    Only the current slide renders as an <img> at any given moment. The
 *    browser caches after first fetch, so re-visiting a slide is instant.
 */

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const SLIDE_W = 1920;
const SLIDE_H = 1080;
const ASPECT  = (SLIDE_H / SLIDE_W) * 100; // 56.25%

const SPOTIFY_GREEN = "#1DB954";

// Slide paths — 40 frames in canonical narrative order (includes 10b variant)
const slides: { src: string; label: string }[] = [
  { src: "/images/work/spotify/deck/slide-00.png",  label: "Cover" },
  { src: "/images/work/spotify/deck/slide-01.png",  label: "Understanding the Challenge" },
  { src: "/images/work/spotify/deck/slide-02.png",  label: "What Users Are Asking For" },
  { src: "/images/work/spotify/deck/slide-03.png",  label: "Why This Matters" },
  { src: "/images/work/spotify/deck/slide-04.png",  label: "Why This Matters — Expanded" },
  { src: "/images/work/spotify/deck/slide-05.png",  label: "Problem Definition" },
  { src: "/images/work/spotify/deck/slide-06.png",  label: "Understanding the User Needs" },
  { src: "/images/work/spotify/deck/slide-07.png",  label: "Where Recently Played Shows Up" },
  { src: "/images/work/spotify/deck/slide-08.png",  label: "Where the Current Experience Falls Short" },
  { src: "/images/work/spotify/deck/slide-09.png",  label: "What Users Need From This Shelf" },
  { src: "/images/work/spotify/deck/slide-10.png",  label: "Evaluating the Opportunity" },
  { src: "/images/work/spotify/deck/slide-10b.png", label: "Frame the Design Space" },
  { src: "/images/work/spotify/deck/slide-11.png",  label: "Designing Within Constraints" },
  { src: "/images/work/spotify/deck/slide-12.png",  label: "Designing Within Constraints — Expanded" },
  { src: "/images/work/spotify/deck/slide-13.png",  label: "What This Opportunity Enables" },
  { src: "/images/work/spotify/deck/slide-14.png",  label: "Early Design Directions" },
  { src: "/images/work/spotify/deck/slide-15.png",  label: "What the Market Already Teaches Us" },
  { src: "/images/work/spotify/deck/slide-16.png",  label: "Competitive Patterns at a Glance" },
  { src: "/images/work/spotify/deck/slide-17.png",  label: "Exploring the Design Space" },
  { src: "/images/work/spotify/deck/slide-18.png",  label: "What the Solution Needs to Achieve" },
  { src: "/images/work/spotify/deck/slide-19.png",  label: "Exploration Themes — Part 1" },
  { src: "/images/work/spotify/deck/slide-20.png",  label: "Sketching Possible Interaction Patterns" },
  { src: "/images/work/spotify/deck/slide-21.png",  label: "Exploration Themes — Part 2" },
  { src: "/images/work/spotify/deck/slide-22.png",  label: "Arriving at a Unified Approach" },
  { src: "/images/work/spotify/deck/slide-23.png",  label: "Introducing the Final Interaction Model" },
  { src: "/images/work/spotify/deck/slide-24.png",  label: "What the Final Model Solves" },
  { src: "/images/work/spotify/deck/slide-25.png",  label: "Clear, Fast, Reversible" },
  { src: "/images/work/spotify/deck/slide-26.png",  label: "Native to Spotify\u2019s Patterns" },
  { src: "/images/work/spotify/deck/slide-27.png",  label: "Inline Controls for Per-Item Editing" },
  { src: "/images/work/spotify/deck/slide-28.png",  label: "A Simple, Reversible Set of Controls" },
  { src: "/images/work/spotify/deck/slide-29.png",  label: "Undo + Temporary States" },
  { src: "/images/work/spotify/deck/slide-30.png",  label: "Consistent Behavior on Desktop" },
  { src: "/images/work/spotify/deck/slide-31.png",  label: "Bringing It All Together" },
  { src: "/images/work/spotify/deck/slide-32.png",  label: "Why This Solution Works" },
  { src: "/images/work/spotify/deck/slide-33.png",  label: "How It Fits Into Spotify\u2019s Future" },
  { src: "/images/work/spotify/deck/slide-34.png",  label: "What This Means for Users" },
  { src: "/images/work/spotify/deck/slide-35.png",  label: "What This Means for Spotify" },
  { src: "/images/work/spotify/deck/slide-36.png",  label: "The Design Principles Carried Forward" },
  { src: "/images/work/spotify/deck/slide-37.png",  label: "Final Takeaway" },
  { src: "/images/work/spotify/deck/slide-38.png",  label: "Thank You" },
];

export default function SpotifySlideViewer() {
  const [current, setCurrent] = useState(0);
  const [scale, setScale]     = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef          = useRef<HTMLDivElement>(null);
  const rootRef               = useRef<HTMLDivElement>(null);
  const progressRef           = useRef<HTMLDivElement>(null);

  // ── Responsive scaling ──────────────────────────────────────────────────
  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const w = containerRef.current.getBoundingClientRect().width;
      setScale(Math.min(w / SLIDE_W, 1)); // never upscale beyond native
    }
  }, []);

  useLayoutEffect(() => {
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [updateScale]);

  // ── Fullscreen toggle ───────────────────────────────────────────────────
  const toggleFullscreen = useCallback(async () => {
    if (!rootRef.current) return;
    if (!document.fullscreenElement) {
      try {
        await rootRef.current.requestFullscreen();
      } catch { /* ignore: some browsers reject on non-user-initiated calls */ }
    } else {
      try {
        await document.exitFullscreen();
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // ── Keyboard nav ────────────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setCurrent((c) => Math.min(c + 1, slides.length - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setCurrent((c) => Math.max(c - 1, 0));
      } else if (e.key === "Home") {
        setCurrent(0);
      } else if (e.key === "End") {
        setCurrent(slides.length - 1);
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [toggleFullscreen]);

  const prev = () => setCurrent((c) => Math.max(c - 1, 0));
  const next = () => setCurrent((c) => Math.min(c + 1, slides.length - 1));

  // ── Click-to-jump progress bar ──────────────────────────────────────────
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const idx = Math.max(0, Math.min(slides.length - 1, Math.floor(pct * slides.length)));
    setCurrent(idx);
  };

  const currentSlide = slides[current];
  const progressPct = ((current + 1) / slides.length) * 100;

  return (
    <div
      ref={rootRef}
      style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        padding: isFullscreen ? "0" : "0 clamp(4px, 2vw, 40px)",
        background: isFullscreen ? "#0A0A0A" : "transparent",
        display: isFullscreen ? "flex" : "block",
        flexDirection: "column",
        justifyContent: isFullscreen ? "center" : undefined,
        height: isFullscreen ? "100vh" : undefined,
      }}
    >
      {/* ── Aspect-ratio shell ─────────────────────────────────────────── */}
      <div
        ref={containerRef}
        style={{
          position:      "relative",
          width:         "100%",
          paddingBottom: `${ASPECT}%`,
          overflow:      "hidden",
          background:    "#0A0A0A",
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
          <Image
            key={currentSlide.src}
            src={currentSlide.src}
            alt={`${current + 1}. ${currentSlide.label}`}
            width={SLIDE_W}
            height={SLIDE_H}
            priority={current < 2}
            sizes="(max-width: 1920px) 100vw, 1920px"
            style={{
              width:    SLIDE_W,
              height:   SLIDE_H,
              display:  "block",
              objectFit:"cover",
            }}
          />
        </div>

        {/* Fullscreen toggle — floating top-right */}
        <button
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen (f)"}
          style={{
            position:     "absolute",
            top:          "12px",
            right:        "12px",
            width:        "36px",
            height:       "36px",
            display:      "flex",
            alignItems:   "center",
            justifyContent: "center",
            background:   "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            border:       "1px solid rgba(255,255,255,0.15)",
            borderRadius: "6px",
            color:        "#FFFFFF",
            cursor:       "pointer",
            padding:      0,
            transition:   "background 0.15s",
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

      {/* ── Progress bar (click to jump) ───────────────────────────────── */}
      <div
        ref={progressRef}
        onClick={handleProgressClick}
        role="slider"
        aria-label="Slide position — click to jump"
        aria-valuemin={1}
        aria-valuemax={slides.length}
        aria-valuenow={current + 1}
        style={{
          position:     "relative",
          width:        "100%",
          height:       "4px",
          background:   "#EEEDEC",
          borderRadius: "2px",
          marginTop:    "16px",
          cursor:       "pointer",
          overflow:     "hidden",
        }}
      >
        <div
          style={{
            position:   "absolute",
            top:        0,
            left:       0,
            height:     "100%",
            width:      `${progressPct}%`,
            background: SPOTIFY_GREEN,
            borderRadius: "2px",
            transition: "width 0.25s ease",
          }}
        />
      </div>

      {/* ── Controls ───────────────────────────────────────────────────── */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        marginTop:      "12px",
        padding:        "0 clamp(4px, 3vw, 64px)",
      }}>
        {/* Prev */}
        <button
          onClick={prev}
          disabled={current === 0}
          style={{
            display:    "flex",
            alignItems: "center",
            gap:        "6px",
            background: "none",
            border:     "none",
            cursor:     current === 0 ? "default" : "pointer",
            padding:    "6px 0",
            color:      current === 0 ? "#C9BFB0" : "#6B6560",
            fontSize:   "12px",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 500,
            transition: "color 0.15s",
          }}
          aria-label="Previous slide"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Previous
        </button>

        {/* Slide label (centered) */}
        <div style={{
          flex:         "1 1 auto",
          textAlign:    "center",
          padding:      "0 16px",
          overflow:     "hidden",
          textOverflow: "ellipsis",
          whiteSpace:   "nowrap",
          fontSize:     "12px",
          color:        "#8A8680",
          fontWeight:   500,
        }}>
          {currentSlide.label}
        </div>

        {/* Next */}
        <button
          onClick={next}
          disabled={current === slides.length - 1}
          style={{
            display:    "flex",
            alignItems: "center",
            gap:        "6px",
            background: "none",
            border:     "none",
            cursor:     current === slides.length - 1 ? "default" : "pointer",
            padding:    "6px 0",
            color:      current === slides.length - 1 ? "#C9BFB0" : "#6B6560",
            fontSize:   "12px",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 500,
            transition: "color 0.15s",
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
        textAlign:     "center",
        fontSize:      "11px",
        color:         "#8A8680",
        margin:        "6px 0 0",
        fontFamily:    "var(--font-dm-sans), sans-serif",
        letterSpacing: "0.05em",
      }}>
        {current + 1} / {slides.length} — Use ← → arrow keys to navigate
      </p>
    </div>
  );
}
