"use client";

import { useEffect, useRef, useState } from "react";

type MoveKind = "framing" | "research" | "decisions" | "ship" | "figma";

type Move = {
  label: string;
  hours: number;
  color: string;
  kind:  MoveKind;
  words: string;
};

const MOVES: Move[] = [
  { label: "Framing",   hours: 28, color: "#8C1A1A", kind: "framing",   words: "Sharpen the question. Cut the wrong-brief weeks." },
  { label: "Research",  hours: 22, color: "#6F2020", kind: "research",  words: "Interviews. Clustering. The pattern surfaces." },
  { label: "Decisions", hours: 20, color: "#0F3D3E", kind: "decisions", words: "Trade-offs named in the language the org tracks." },
  { label: "Ship",      hours: 18, color: "#3D5C5A", kind: "ship",      words: "Handoff, QA, iteration. The work ships." },
  { label: "Figma",     hours: 12, color: "#B8B4AE", kind: "figma",     words: "Finally, the pixels. Twelve of one hundred." },
];

const STEP_MS   = 260;
const START_MS  = 500;
const REVEAL_MS = 620;
const FIGMA_IDX = MOVES.length - 1;

// Cumulative starting %s
const CUM: number[] = [];
{
  let acc = 0;
  for (const m of MOVES) { CUM.push(acc); acc += m.hours; }
}
const FIGMA_CENTER = CUM[FIGMA_IDX] + MOVES[FIGMA_IDX].hours / 2;

function idxFromPct(pct: number): number {
  let acc = 0;
  for (let i = 0; i < MOVES.length; i++) {
    acc += MOVES[i].hours;
    if (pct <= acc) return i;
  }
  return MOVES.length - 1;
}

export default function HoursRibbon() {
  const ref      = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [reveal,      setReveal]      = useState(-1);
  const [callout,     setCallout]     = useState(false);
  const [closing,     setClosing]     = useState(false);
  const [interactive, setInteractive] = useState(false);

  // Interactive state (desktop only, after reveal)
  const [activeIdx, setActiveIdx] = useState(-1);
  const [dotPct,    setDotPct]    = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReveal(MOVES.length - 1);
      setCallout(true);
      setClosing(true);
      setInteractive(true);
      setActiveIdx(FIGMA_IDX);
      setDotPct(FIGMA_CENTER);
      return;
    }
    const timers: number[] = [];
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();

      MOVES.forEach((_, i) => {
        timers.push(window.setTimeout(() => setReveal(i), START_MS + i * STEP_MS));
      });
      const settled = START_MS + (MOVES.length - 1) * STEP_MS + REVEAL_MS;
      timers.push(window.setTimeout(() => setCallout(true), settled + 100));
      timers.push(window.setTimeout(() => {
        setInteractive(true);
        setActiveIdx(FIGMA_IDX);
        setDotPct(FIGMA_CENTER);
      }, settled + 300));
      timers.push(window.setTimeout(() => setClosing(true), settled + 600));
    }, { threshold: 0.2 });
    io.observe(el);
    return () => { io.disconnect(); timers.forEach((t) => window.clearTimeout(t)); };
  }, []);

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!interactive || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setDotPct(pct);
    setActiveIdx(idxFromPct(pct));
  };

  const onMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    if (!interactive) return;
    setActiveIdx(FIGMA_IDX);
    setDotPct(FIGMA_CENTER);
  };

  const displayDotPct = interactive ? dotPct : (reveal >= 0 ? 100 : 0);
  const showWords     = activeIdx >= 0 && interactive;
  const wordsMove     = showWords ? MOVES[activeIdx] : MOVES[FIGMA_IDX];

  return (
    <div ref={ref} className={`hours-rib ${interactive ? "is-interactive" : ""}`}>
      <style>{`
        .hours-rib {
          position:   relative;
          margin-top: 40px;
          padding:    32px 0 12px;
        }

        /* ── Editorial callout pointing at the Figma segment ── */
        .hours-rib-call {
          position:         absolute;
          top:              0;
          transform:        translateX(-100%) rotate(-2deg);
          transform-origin: right center;
          font-family:      var(--font-dm-serif-display), Georgia, serif;
          font-style:       italic;
          font-size:        17px;
          color:            #252B28;
          white-space:      nowrap;
          opacity:          0;
          transition:       opacity 500ms ease;
        }
        .hours-rib-call.is-on { opacity: 1; }
        .hours-rib-call-arrow {
          display:     inline-block;
          margin-left: 6px;
          font-family: var(--font-dm-sans), sans-serif;
          font-style:  normal;
          color:       var(--color-brand);
        }

        /* ── Numbered labels above segments (DESKTOP) ── */
        .hours-rib-labels {
          position:      relative;
          display:       flex;
          margin-bottom: 18px;
          margin-top:    36px;
          height:        44px;
        }
        .hours-rib-lab {
          text-align: center;
          padding:    0 4px;
          opacity:    0;
          transform:  translateY(-6px);
          transition: opacity 300ms ease, transform 300ms ease;
        }
        .hours-rib-lab.is-on { opacity: 1; transform: translateY(0); }
        .hours-rib-lab-num {
          font-family:     var(--font-dm-sans), sans-serif;
          font-size:       10px;
          font-weight:     700;
          letter-spacing:  0.18em;
          color:           #6B6E6A;
          margin:          0;
        }
        .hours-rib-lab-name {
          font-family:    var(--font-dm-sans), sans-serif;
          font-size:      13px;
          font-weight:    600;
          color:          #252B28;
          margin:         2px 0 0;
          letter-spacing: -0.005em;
        }

        /* ── Segment header + per-row words — visible on mobile only ── */
        .hours-rib-seg-head,
        .hours-rib-seg-words { display: none; }
        .hours-rib-seg-scene { position: absolute; inset: 0; }

        /* ── The strip ── */
        .hours-rib-track {
          position: relative;
          display:  flex;
          height:   140px;
          background: #F4F6F7;
          overflow: hidden;
          cursor:   default;
        }
        .hours-rib.is-interactive .hours-rib-track { cursor: crosshair; }

        .hours-rib-seg {
          position:         relative;
          overflow:         hidden;
          transform-origin: left center;
          transform:        scaleX(0);
          transition:       transform ${REVEAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hours-rib-seg.is-on { transform: scaleX(1); }
        .hours-rib.is-interactive .hours-rib-seg.is-active { filter: brightness(1.12); }

        /* ── Framing scene ── */
        .fr-q {
          position:    absolute;
          transform:   translate(-50%, -50%);
          font-family: var(--font-dm-serif-display), Georgia, serif;
          font-style:  italic;
          font-size:   24px;
          color:       rgba(255,255,255,0.55);
          transition:  transform 700ms cubic-bezier(0.22, 1, 0.36, 1) 500ms, opacity 400ms ease 500ms;
        }
        .hours-rib-seg.is-on .fr-q { opacity: 0; transform: translate(-50%, -50%) scale(0.2); }
        .fr-bang {
          position:    absolute;
          top:         50%; left: 50%;
          transform:   translate(-50%, -50%) scale(0);
          font-family: var(--font-dm-serif-display), Georgia, serif;
          font-style:  italic;
          font-size:   36px;
          color:       #FFFFFF;
          transition:  transform 500ms cubic-bezier(0.22, 1, 0.36, 1) 1000ms;
        }
        .hours-rib-seg.is-on .fr-bang { transform: translate(-50%, -50%) scale(1); }

        /* ── Research scene ── */
        .re-dot {
          position:      absolute;
          top:           36%;
          width:         8px; height: 8px;
          border-radius: 50%;
          background:    rgba(255,255,255,0.6);
          transform:     translate(-50%, -50%) scale(0);
          transition:    transform 380ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hours-rib-seg.is-on .re-dot { transform: translate(-50%, -50%) scale(1); }
        .re-line {
          position:       absolute;
          top:            62%;
          left:           22%; right: 22%;
          height:         1px;
          background:     #FFFFFF;
          transform:      scaleX(0);
          transform-origin: center;
          transition:     transform 500ms cubic-bezier(0.22, 1, 0.36, 1) 900ms;
        }
        .hours-rib-seg.is-on .re-line { transform: scaleX(1); }

        /* ── Decisions scene ── */
        .de-mark {
          position:    absolute;
          left:        50%;
          transform:   translate(-50%, -50%);
          font-family: var(--font-dm-serif-display), Georgia, serif;
          font-style:  italic;
          font-size:   20px;
          color:       #FFFFFF;
          opacity:     0;
          transition:  opacity 380ms ease;
        }
        .de-mark.de-x     { top: 34%; color: rgba(255,255,255,0.5); transition-delay: 700ms; }
        .de-mark.de-check { top: 66%; color: #FFFFFF;                transition-delay: 950ms; }
        .hours-rib-seg.is-on .de-mark { opacity: 1; }

        /* ── Ship scene ── */
        .sh-line {
          position: absolute;
          top:      50%;
          left:     15%; right: 15%;
          height:   1px;
          background: rgba(255,255,255,0.35);
        }
        .sh-target {
          position:   absolute;
          top:        50%;
          right:      12%;
          width:      14px; height: 14px;
          border:     1px solid rgba(255,255,255,0.7);
          transform:  translate(50%, -50%) scale(0);
          transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1) 400ms;
        }
        .hours-rib-seg.is-on .sh-target { transform: translate(50%, -50%) scale(1); }
        .sh-dot {
          position:      absolute;
          top:           50%;
          left:          15%;
          width:         10px; height: 10px;
          border-radius: 50%;
          background:    #FFFFFF;
          transform:     translate(-50%, -50%);
          transition:    left 900ms cubic-bezier(0.22, 1, 0.36, 1) 600ms;
        }
        .hours-rib-seg.is-on .sh-dot { left: 82%; }

        /* ── Figma scene ── */
        .fi-frame {
          position: absolute;
          top:      50%; left: 50%;
          width:    44px; height: 34px;
          border:   1px solid rgba(255,255,255,0.6);
          transform: translate(-50%, -50%);
          display:  flex;
          align-items: center;
          justify-content: center;
        }
        .fi-cursor {
          position:   absolute;
          width:      2px; height: 18px;
          background: #FFFFFF;
          opacity:    0;
          transition: opacity 200ms ease 700ms;
        }
        .hours-rib-seg.is-on .fi-cursor {
          opacity:   1;
          animation: rib-blink 800ms steps(1) infinite;
        }
        .fi-letter {
          position:    absolute;
          font-family: var(--font-dm-sans), sans-serif;
          font-size:   18px;
          font-weight: 700;
          color:       #FFFFFF;
          opacity:     0;
          transition:  opacity 400ms ease 1500ms;
        }
        .hours-rib-seg.is-on .fi-letter { opacity: 1; }
        @keyframes rib-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }

        /* ── Hours below strip (DESKTOP) ── */
        .hours-rib-below {
          position: relative;
          display:  flex;
          margin-top: 14px;
        }
        .hours-rib-hrs {
          text-align:  center;
          padding:     0 4px;
          font-family: var(--font-dm-sans), sans-serif;
          font-size:   12px;
          font-weight: 500;
          color:       #6B6E6A;
          font-variant-numeric: tabular-nums;
          opacity:     0;
          transition:  opacity 300ms ease 400ms;
        }
        .hours-rib-hrs.is-on { opacity: 1; }

        /* ── Traveler thread (DESKTOP) ── */
        .hours-rib-thread {
          position:   relative;
          height:     28px;
          margin-top: 24px;
        }
        .hours-rib-thread-line {
          position:   absolute;
          top:        50%;
          left:       0; right: 0;
          height:     1px;
          background: repeating-linear-gradient(90deg, #C6C2BC 0 4px, transparent 4px 8px);
        }
        .hours-rib-thread-node {
          position:      absolute;
          top:           50%;
          transform:     translate(-50%, -50%);
          width:         8px; height: 8px;
          border-radius: 50%;
          background:    #FFFFFF;
          border:        1px solid #C6C2BC;
          opacity:       0;
          transition:    opacity 300ms ease;
        }
        .hours-rib-thread-node.is-on { opacity: 1; }
        .hours-rib-traveler {
          position:       absolute;
          top:            50%;
          left:           0%;
          width:          12px; height: 12px;
          border-radius:  50%;
          background:     var(--color-brand);
          transform:      translate(-50%, -50%);
          transition:     left 1800ms cubic-bezier(0.65, 0, 0.35, 1) 200ms;
          box-shadow:     0 0 12px rgba(140, 26, 26, 0.35);
          pointer-events: none;
        }
        .hours-rib.is-interactive .hours-rib-traveler {
          transition: left 140ms ease-out;
        }
        .hours-rib-thread-ends {
          position:       absolute;
          top:            calc(50% + 14px);
          font-family:    var(--font-dm-sans), sans-serif;
          font-size:      10px;
          font-weight:    600;
          letter-spacing: 0.14em;
          color:          #6B6E6A;
        }
        .hours-rib-thread-ends.is-start { left: 0; }
        .hours-rib-thread-ends.is-end   { right: 0; }

        /* ── Interactive words display (DESKTOP) ── */
        .hours-rib-words {
          margin-top:  32px;
          min-height:  56px;
          text-align:  center;
          font-family: var(--font-dm-serif-display), Georgia, serif;
          font-style:  italic;
          font-size:   19px;
          color:       #252B28;
          letter-spacing: -0.005em;
          line-height: 1.35;
          opacity:     0;
          animation:   rib-words-in 400ms ease forwards;
        }
        .hours-rib-words-eyebrow {
          display:        block;
          font-family:    var(--font-dm-sans), sans-serif;
          font-style:     normal;
          font-size:      10px;
          font-weight:    700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color:          var(--color-brand);
          margin-bottom:  8px;
        }
        @keyframes rib-words-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0);   }
        }

        /* ── Interaction hint ── */
        .hours-rib-hint {
          margin-top:  10px;
          text-align:  center;
          font-family: var(--font-dm-sans), sans-serif;
          font-size:   11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color:       #6B6E6A;
          opacity:     0;
          transition:  opacity 500ms ease;
        }
        .hours-rib.is-interactive .hours-rib-hint { opacity: 1; }

        /* ── Closing editorial line ── */
        .hours-rib-close {
          margin-top:  40px;
          padding-top: 20px;
          border-top:  1px solid #E8E4DE;
          text-align:  center;
          font-family: var(--font-dm-serif-display), Georgia, serif;
          font-style:  italic;
          font-size:   19px;
          color:       #252B28;
          opacity:     0;
          transition:  opacity 500ms ease;
        }
        .hours-rib-close.is-on { opacity: 1; }

        /* ═══════════════════ MOBILE — vertical stack ═══════════════════ */
        @media (max-width: 640px) {
          .hours-rib-call,
          .hours-rib-labels,
          .hours-rib-below,
          .hours-rib-thread,
          .hours-rib-words,
          .hours-rib-hint { display: none; }

          .hours-rib-track {
            flex-direction: column;
            height:         auto;
            background:     transparent;
            gap:            2px;
          }
          .hours-rib-seg {
            flex-basis:       auto !important;
            width:            100%;
            transform-origin: center top !important;
            transform:        scaleY(0);
            transition:       transform ${REVEAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1);
            display:          flex;
            flex-direction:   column;
            padding:          16px clamp(16px, 4vw, 24px) 16px;
          }
          .hours-rib-seg.is-on { transform: scaleY(1); }

          /* Mobile: proportional heights (Framing tallest, Figma shortest) */
          .hours-rib-seg[data-kind="framing"]   { height: 220px; }
          .hours-rib-seg[data-kind="research"]  { height: 172px; }
          .hours-rib-seg[data-kind="decisions"] { height: 158px; }
          .hours-rib-seg[data-kind="ship"]      { height: 140px; }
          .hours-rib-seg[data-kind="figma"]     { height: 96px;  }

          /* Row header — visible on mobile */
          .hours-rib-seg-head {
            display:        flex;
            justify-content: space-between;
            align-items:    baseline;
            color:          #FFFFFF;
          }
          .hours-rib-seg-num {
            font-family:    var(--font-dm-sans), sans-serif;
            font-size:      10px;
            font-weight:    700;
            letter-spacing: 0.22em;
            opacity:        0.7;
          }
          .hours-rib-seg-name {
            font-family:    var(--font-dm-sans), sans-serif;
            font-size:      14px;
            font-weight:    600;
            letter-spacing: -0.005em;
            margin-left:    10px;
            margin-right:   auto;
          }
          .hours-rib-seg-hrs {
            font-family:    var(--font-dm-sans), sans-serif;
            font-size:      13px;
            font-weight:    600;
            font-variant-numeric: tabular-nums;
          }

          /* Scene area on mobile: sits between header and words */
          .hours-rib-seg-scene {
            position: relative;
            inset:    auto;
            flex:     1;
          }

          /* Words inside each row (italic serif subtitle) */
          .hours-rib-seg-words {
            display:     block;
            font-family: var(--font-dm-serif-display), Georgia, serif;
            font-style:  italic;
            font-size:   14px;
            color:       rgba(255,255,255,0.85);
            margin:      0;
            line-height: 1.4;
          }

          /* Rescale scene marks for smaller rows */
          .fr-q      { font-size: 18px; }
          .fr-bang   { font-size: 30px; }
          .de-mark   { font-size: 17px; }
          .fi-frame  { width: 32px; height: 26px; }
          .fi-letter { font-size: 15px; }
          .fi-cursor { height: 15px; }
          .re-dot    { width: 6px; height: 6px; }
          .sh-dot    { width: 8px; height: 8px; }
          .sh-target { width: 10px; height: 10px; }

          .hours-rib-close { font-size: 15px; }
        }
      `}</style>

      {/* Editorial callout — desktop only */}
      <div
        className={`hours-rib-call ${callout ? "is-on" : ""}`}
        style={{ left: `${FIGMA_CENTER}%` }}
      >
        twelve of one hundred
        <span className="hours-rib-call-arrow">↘</span>
      </div>

      {/* Numbered labels — desktop only */}
      <div className="hours-rib-labels">
        {MOVES.map((m, i) => (
          <div
            key={m.label}
            className={`hours-rib-lab ${i <= reveal ? "is-on" : ""}`}
            style={{ flexBasis: `${m.hours}%`, transitionDelay: `${i * 60}ms` }}
          >
            <p className="hours-rib-lab-num">0{i + 1}</p>
            <p className="hours-rib-lab-name">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Ribbon strip */}
      <div
        ref={trackRef}
        className="hours-rib-track"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {MOVES.map((m, i) => (
          <div
            key={m.label}
            data-kind={m.kind}
            className={`hours-rib-seg ${i <= reveal ? "is-on" : ""} ${activeIdx === i ? "is-active" : ""}`}
            style={{
              flexBasis:  `${m.hours}%`,
              background: m.color,
              transitionDelay: `${i * 40}ms`,
            }}
          >
            {/* Mobile-only row header */}
            <div className="hours-rib-seg-head">
              <span className="hours-rib-seg-num">0{i + 1}</span>
              <span className="hours-rib-seg-name">{m.label}</span>
              <span className="hours-rib-seg-hrs">{m.hours}h</span>
            </div>

            {/* Scene */}
            <div className="hours-rib-seg-scene">
              {m.kind === "framing" && (
                <>
                  <span className="fr-q" style={{ top: "32%", left: "28%" }}>?</span>
                  <span className="fr-q" style={{ top: "32%", left: "72%" }}>?</span>
                  <span className="fr-q" style={{ top: "72%", left: "50%" }}>?</span>
                  <span className="fr-bang">!</span>
                </>
              )}
              {m.kind === "research" && (
                <>
                  <span className="re-dot" style={{ left: "26%", transitionDelay: "500ms" }} />
                  <span className="re-dot" style={{ left: "50%", transitionDelay: "620ms" }} />
                  <span className="re-dot" style={{ left: "74%", transitionDelay: "740ms" }} />
                  <span className="re-line" />
                </>
              )}
              {m.kind === "decisions" && (
                <>
                  <span className="de-mark de-x">✕</span>
                  <span className="de-mark de-check">✓</span>
                </>
              )}
              {m.kind === "ship" && (
                <>
                  <span className="sh-line" />
                  <span className="sh-target" />
                  <span className="sh-dot" />
                </>
              )}
              {m.kind === "figma" && (
                <div className="fi-frame">
                  <span className="fi-cursor" />
                  <span className="fi-letter">F</span>
                </div>
              )}
            </div>

            {/* Mobile words inside each row */}
            <p className="hours-rib-seg-words">{m.words}</p>
          </div>
        ))}
      </div>

      {/* Hours below — desktop only */}
      <div className="hours-rib-below">
        {MOVES.map((m, i) => (
          <div
            key={m.label}
            className={`hours-rib-hrs ${i <= reveal ? "is-on" : ""}`}
            style={{ flexBasis: `${m.hours}%`, transitionDelay: `${i * 60 + 200}ms` }}
          >
            {m.hours}h
          </div>
        ))}
      </div>

      {/* Traveler thread — desktop only */}
      <div className="hours-rib-thread">
        <span className="hours-rib-thread-line" />
        {[0, ...CUM.slice(1), 100].map((pos, i) => (
          <span
            key={i}
            className={`hours-rib-thread-node ${reveal >= 0 ? "is-on" : ""}`}
            style={{ left: `${pos}%`, transitionDelay: `${i * 100}ms` }}
          />
        ))}
        <span
          className="hours-rib-traveler"
          style={{ left: `${displayDotPct}%` }}
        />
        <span className="hours-rib-thread-ends is-start">0h</span>
        <span className="hours-rib-thread-ends is-end">100h</span>
      </div>

      {/* Interactive words — desktop only */}
      <div className="hours-rib-words" key={activeIdx}>
        <span className="hours-rib-words-eyebrow">
          0{Math.max(0, activeIdx) + 1} · {wordsMove.label}
        </span>
        {wordsMove.words}
      </div>

      <p className="hours-rib-hint">Move across the ribbon to explore each move</p>

      {/* Closing editorial line */}
      <p className={`hours-rib-close ${closing ? "is-on" : ""}`}>
        One project. One hundred hours. Five moves.
      </p>
    </div>
  );
}
