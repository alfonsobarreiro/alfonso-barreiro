"use client";

import { useEffect, useRef, useState } from "react";

/* Stylized Portland walk trace. An SVG path that strokes itself into
   existence when the reader scrolls the Off-screen section into view.
   Starts at a small dot ("home"), turns through blocks, ends at a
   small circle ("today's mark"). Editorial marginalia for the "walk
   five miles a day" line — argues the ritual by showing the path,
   not just naming it. */
export default function WalkTrace() {
  const ref = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReveal(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      window.setTimeout(() => setReveal(true), 200);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Zigzag route through a rough block grid. Approximates a real
     Portland loop (Southeast up to Ladd's Addition and back). */
  const PATH = "M 22 194 L 60 194 L 60 150 L 108 150 L 108 116 L 158 116 L 158 78 L 216 78 L 216 50 L 264 50 L 264 88 L 306 88 L 306 130 L 348 130 L 348 168 L 380 168";
  const PATH_LEN = 900;

  return (
    <div ref={ref} className={`walktrace ${reveal ? "is-on" : ""}`} aria-hidden="true">
      <style>{`
        .walktrace {
          margin-top: 32px;
          max-width: 460px;
        }
        .walktrace-svg { display: block; width: 100%; height: auto; }
        .walktrace-path {
          fill: none;
          stroke: var(--color-brand);
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: ${PATH_LEN};
          stroke-dashoffset: ${PATH_LEN};
          transition: stroke-dashoffset 2400ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .walktrace.is-on .walktrace-path { stroke-dashoffset: 0; }
        .walktrace-marker {
          fill: var(--color-brand);
          opacity: 0;
          transition: opacity 400ms ease;
        }
        .walktrace.is-on .walktrace-marker { opacity: 1; }
        .walktrace-marker.is-end {
          transition-delay: 2000ms;
        }
        .walktrace-marker.is-start {
          transition-delay: 200ms;
        }
        .walktrace-caption {
          margin-top: 12px;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 12px;
          color: #6B6E6A;
          letter-spacing: 0.04em;
          display: flex;
          justify-content: space-between;
        }
        .walktrace-caption b {
          color: var(--color-brand);
          font-weight: 600;
          letter-spacing: 0.02em;
        }
      `}</style>
      <svg className="walktrace-svg" viewBox="0 0 400 220" role="presentation">
        <circle className="walktrace-marker is-start" cx="22" cy="194" r="4" />
        <path className="walktrace-path" d={PATH} />
        <circle className="walktrace-marker is-end" cx="380" cy="168" r="5" fill="none" stroke="var(--color-brand)" strokeWidth="2" />
      </svg>
      <p className="walktrace-caption">
        <span>Home</span>
        <span><b>~3 miles</b> &middot; almost daily</span>
        <span>Today&apos;s mark</span>
      </p>
    </div>
  );
}
