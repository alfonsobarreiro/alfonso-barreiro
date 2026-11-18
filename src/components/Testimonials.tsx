"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { LinkedInBadge } from "@/components/ui/icons";
import { TESTIMONIALS, type Testimonial } from "@/components/home/HomeTestimonials";
import { getDots } from "@/lib/dots";

/* The quotes live in src/components/home/HomeTestimonials.tsx, a module
   without "use client", so the homepage band stays server-rendered and this
   carousel reuses the same list instead of a copy. Two clients: Pamela
   Accetta Smith and Kendra Toth. This carousel is not rendered anywhere;
   the homepage uses the static HomeTestimonials band. */
const ITEMS: Testimonial[] = TESTIMONIALS;

/* ── SVG glyphs ─────────────────────────────────────────────────────── */

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* ── Tokens ─────────────────────────────────────────────────────────── */

const SECTION_X = "clamp(24px, 6vw, 80px)";
const CONTENT_MAX = "var(--content-max)";

const font = {
  sans: "var(--font-dm-sans), -apple-system, sans-serif",
};

const c = {
  ink:     "var(--color-text)",
  body:    "var(--color-text-body)",
  muted:   "var(--color-text-muted)",
  brand:   "var(--color-terracotta)",
  accent:  "var(--color-deep-teal)",
  surface: "var(--color-paper)",
  border:  "var(--color-neutral-200)",
};

/* ── Autoscroll config ──────────────────────────────────────────────── */

const AUTOSCROLL_INTERVAL = 8000;   // ms between auto-advances
const MANUAL_PAUSE_DURATION = 15000; // ms to pause after a user click

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  /* Refs for pause state so the autoplay interval can read them
     without needing to re-subscribe on every mouse/focus event. */
  const isHoveredRef = useRef(false);
  const isFocusedRef = useRef(false);
  const pausedUntilRef = useRef(0);

  /* prefers-reduced-motion — respect the OS preference by disabling
     autoscroll entirely for users who ask for it. */
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* Programmatic scroll to a specific card. Uses trackRef.scrollTo with
     smooth behavior; since each card is 100% of the track's width, the
     target offset is simply index * clientWidth. */
  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const total = ITEMS.length;
    const wrapped = ((index % total) + total) % total; // supports negative + overflow
    track.scrollTo({ left: wrapped * track.clientWidth, behavior: "smooth" });
    setActiveIndex(wrapped);
  }, []);

  const pauseManually = useCallback(() => {
    pausedUntilRef.current = Date.now() + MANUAL_PAUSE_DURATION;
  }, []);

  const prev = () => { pauseManually(); scrollToIndex(activeIndex - 1); };
  const next = () => { pauseManually(); scrollToIndex(activeIndex + 1); };
  const jumpTo = (i: number) => { pauseManually(); scrollToIndex(i); };

  /* Autoscroll: single interval, gated by hover / focus / manual pause /
     reduced-motion. Loops back to 0 after the last card. */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const id = setInterval(() => {
      if (isHoveredRef.current) return;
      if (isFocusedRef.current) return;
      if (Date.now() < pausedUntilRef.current) return;
      /* Stop the dots (html[data-dots="still"]) stops the autoplay too. */
      if (getDots() === "still") return;

      const track = trackRef.current;
      if (!track) return;

      setActiveIndex((prev) => {
        const nextIdx = (prev + 1) % ITEMS.length;
        track.scrollTo({ left: nextIdx * track.clientWidth, behavior: "smooth" });
        return nextIdx;
      });
    }, AUTOSCROLL_INTERVAL);

    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  /* Keep activeIndex in sync with touch/trackpad scrolls (swipe on mobile,
     two-finger horizontal on trackpad). IntersectionObserver with the
     track as root reports which card is centered. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const index = Array.from(track.children).indexOf(entry.target as HTMLElement);
            if (index >= 0) setActiveIndex(index);
          }
        });
      },
      { root: track, threshold: [0.6] }
    );

    Array.from(track.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  /* Keyboard nav — arrow keys navigate when the track has focus. */
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  return (
    <section
      aria-labelledby="testimonials-h2"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
      onFocus={() => { isFocusedRef.current = true; }}
      onBlur={() => { isFocusedRef.current = false; }}
      style={{
        background: c.surface,
        padding:    "clamp(80px, 9vw, 140px) " + SECTION_X,
        borderTop:  `none`,
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>

        {/* Section header — eyebrow + h2, plus carousel controls on the right */}
        <div
          className="testimonials-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "24px",
            marginBottom: "clamp(48px, 6vw, 72px)",
          }}
        >
          <div>
            <Eyebrow tone="accent" style={{ margin: "0 0 18px" }}>
              Client voices
            </Eyebrow>
            <h2
              id="testimonials-h2"
              style={{
                fontFamily: font.sans, fontSize: "var(--text-h2)",
                fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.01em",
                color: c.ink, margin: 0, maxWidth: "640px",
              }}
            >
              What people say.
            </h2>
          </div>

          {/* Carousel controls: counter + prev/next arrows */}
          <div
            className="testimonials-controls"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexShrink: 0,
            }}
          >
            <span
              aria-live="polite"
              style={{
                fontFamily: font.sans, fontSize: "var(--text-small)", fontWeight: 500,
                letterSpacing: "0.01em",
                color: c.muted,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <span style={{ color: c.ink }}>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span style={{ margin: "0 6px", opacity: 0.5 }}>/</span>
              {String(ITEMS.length).padStart(2, "0")}
            </span>
            <Button
              variant="ghost"
              shape="circle"
              size="sm"
              onClick={prev}
              ariaLabel="Previous testimonial"
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="ghost"
              shape="circle"
              size="sm"
              onClick={next}
              ariaLabel="Next testimonial"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>

        {/* Scroll-snap track */}
        <div
          ref={trackRef}
          className="testimonials-track"
          tabIndex={0}
          role="region"
          aria-label="Testimonials carousel"
          aria-roledescription="carousel"
          onKeyDown={onKeyDown}
          style={{
            display:         "grid",
            gridAutoFlow:    "column",
            gridAutoColumns: "100%",
            gap:             "clamp(24px, 4vw, 48px)",
            overflowX:       "auto",
            scrollSnapType:  "x mandatory",
            scrollBehavior:  "smooth",
            outline:         "none",
            paddingBottom:   "4px",
          }}
        >
          {ITEMS.map((t, i) => (
            <figure
              key={t.name}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${ITEMS.length}: ${t.name}`}
              className="testimonial-card"
              style={{
                margin: 0,
                scrollSnapAlign: "start",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  maxWidth:    "760px",
                  width:       "100%",
                  paddingLeft: "24px",
                  borderLeft:  `2px solid ${c.brand}`,
                }}
              >
                <blockquote style={{ margin: 0 }}>
                  {/* Pull-quote */}
                  <p style={{
                    fontFamily:    font.sans,
                    fontSize:      "var(--text-h2)",
                    fontWeight:    400,
                    lineHeight:    1.15,
                    letterSpacing: "-0.01em",
                    color:         c.ink,
                    margin:        "0 0 28px",
                  }}>
                    &ldquo;{t.pull}&rdquo;
                  </p>

                  {/* Full body */}
                  <p style={{
                    fontFamily: font.sans,
                    fontSize:   "var(--text-body)",
                    lineHeight: 1.5,
                    color:      c.body,
                    margin:     "0 0 28px",
                  }}>
                    {t.body}
                  </p>
                </blockquote>

                <figcaption style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {t.linkedin ? (
                    <a
                      href={t.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="testimonial-name-link"
                      style={{
                        display:        "inline-flex",
                        alignItems:     "center",
                        gap:            "10px",
                        fontFamily:     font.sans,
                        fontSize:       "var(--text-body)",
                        fontWeight:     500,
                        color:          c.ink,
                        letterSpacing:  "0.01em",
                        textDecoration: "none",
                        width:          "fit-content",
                      }}
                    >
                      {t.name}
                      <LinkedInBadge size={18} />
                    </a>
                  ) : (
                    <span style={{
                      fontFamily: font.sans, fontSize: "var(--text-body)", fontWeight: 500,
                      color: c.ink, letterSpacing: "0.01em",
                    }}>
                      {t.name}
                    </span>
                  )}
                  <span style={{
                    fontFamily: font.sans, fontSize: "var(--text-small)",
                    color: c.muted, letterSpacing: "0.01em",
                  }}>
                    {t.role}
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        {/* Dot indicator */}
        <div
          role="tablist"
          aria-label="Testimonial position"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "36px",
          }}
        >
          {ITEMS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to testimonial ${i + 1}: ${t.name}`}
              onClick={() => jumpTo(i)}
              className="testimonial-dot"
              style={{
                width:  i === activeIndex ? "24px" : "8px",
                height: "8px",
                borderRadius: "999px",
                border: "none",
                padding: 0,
                background: i === activeIndex ? c.brand : c.border,
                cursor: "pointer",
                transition: "background 0.2s, width 0.25s ease",
              }}
            />
          ))}
        </div>

      </div>

      <style>{`
        /* Hide scrollbar in the track — the counter + dots + arrows provide
           position feedback. Native scrollbar would compete visually. */
        .testimonials-track { scrollbar-width: none; -ms-overflow-style: none; }
        .testimonials-track::-webkit-scrollbar { display: none; }

        /* Keyboard focus ring on the track container. */
        .testimonials-track:focus-visible {
          outline: 2px solid var(--color-focus-ring);
          outline-offset: 4px;
          border-radius: 2px;
        }

        /* Dot hover for the inactive dots. */
        .testimonial-dot:hover { background: var(--color-neutral-400); }
        .testimonial-dot:focus-visible {
          outline: 2px solid var(--color-focus-ring);
          outline-offset: 3px;
        }

        /* Mobile: stack header/controls, tighten card padding. */
        @media (max-width: 760px) {
          .testimonials-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .testimonials-controls { align-self: flex-end; }
          .testimonial-card > div { padding-left: 20px !important; }
        }
      `}</style>
    </section>
  );
}
