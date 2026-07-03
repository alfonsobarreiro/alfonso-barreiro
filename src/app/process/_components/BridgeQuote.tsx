"use client";

import { useEffect, useRef, useState } from "react";

const PHRASES = [
  "The work that ships",
  "is the work after the decisions",
  "are clear.",
];

const START_MS = 300;
const STEP_MS  = 700;

export default function BridgeQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(PHRASES.length - 1);
      return;
    }
    const timers: number[] = [];
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      PHRASES.forEach((_, i) => {
        timers.push(window.setTimeout(() => setVisible(i), START_MS + i * STEP_MS));
      });
    }, { threshold: 0.45 });
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <div ref={ref} className="bridge-quote">
      <style>{`
        .bridge-quote {
          max-width:    880px;
          margin:       0 auto;
          padding-left: clamp(20px, 3vw, 40px);
          border-left:  3px solid var(--color-brand);
        }
        .bridge-quote-phrase {
          display:        block;
          font-family:    var(--font-dm-serif-display), Georgia, serif;
          font-style:     italic;
          font-size:      clamp(28px, 5vw, 58px);
          font-weight:    400;
          color:          #252B28;
          margin:         0;
          letter-spacing: -0.02em;
          line-height:    1.18;
          opacity:        0;
          transform:      translateY(10px);
          transition:     opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
                          transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bridge-quote-phrase.is-on { opacity: 1; transform: translateY(0); }
        .bridge-quote-phrase.is-close { color: var(--color-brand); }
        @media (max-width: 640px) {
          .bridge-quote-phrase { font-size: clamp(24px, 6.5vw, 36px); }
        }
      `}</style>
      {PHRASES.map((p, i) => (
        <span
          key={i}
          className={`bridge-quote-phrase ${i <= visible ? "is-on" : ""} ${i === PHRASES.length - 1 ? "is-close" : ""}`}
        >
          {p}
        </span>
      ))}
    </div>
  );
}
