"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const c = {
  ink:    "#1A1714",
  ink2:   "#3D3833",
  muted:  "#5A5752",
  paper:  "#FAFAF7",
  border: "#8A8680",
  brand:  "#8C1A1A",
  accent: "#0F3D3E",
  cardBg: "#FFFFFF",
};

const font = {
  sans: '"DM Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
};

type SymptomId = "pain" | "nails" | "skin" | "alignment" | "fit";

interface Symptom {
  id: SymptomId;
  label: string;
  hint: string;
}

const SYMPTOMS: Symptom[] = [
  { id: "pain",      label: "Pain",          hint: "Plantar, arch, heel, ball-of-foot" },
  { id: "nails",     label: "Nails",         hint: "Thickening, discoloration, ingrown" },
  { id: "skin",      label: "Skin",          hint: "Cracking, itching, calluses" },
  { id: "alignment", label: "Alignment",     hint: "Knees, hips, gait, flat feet" },
  { id: "fit",       label: "Footwear fit",  hint: "Width, length, drop, lacing" },
];

/* Small diagnostic marks per symptom. Stroke-only, 24x24 viewBox, use
   currentColor so they invert cleanly on the selected (crimson) state. */
function SymptomMark({ id }: { id: SymptomId }) {
  const common = {
    width: 22, height: 22, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: 1.5,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (id) {
    case "pain":
      return (
        <svg {...common}>
          <path d="M12 3 C 8 8, 5 12, 5 16 A 7 7 0 0 0 19 16 C 19 12, 16 8, 12 3 Z" />
          <circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "nails":
      return (
        <svg {...common}>
          <path d="M7 9 Q 7 4, 12 4 T 17 9 L 17 19 L 7 19 Z" />
          <path d="M7 9 L 17 9" />
        </svg>
      );
    case "skin":
      return (
        <svg {...common}>
          <path d="M4 8 Q 8 6, 12 8 T 20 8" />
          <path d="M4 12 Q 8 10, 12 12 T 20 12" />
          <path d="M4 16 Q 8 14, 12 16 T 20 16" />
        </svg>
      );
    case "alignment":
      return (
        <svg {...common}>
          <path d="M12 4 L 12 20" />
          <circle cx="12" cy="6" r="1.6" fill="currentColor" stroke="none" />
          <path d="M8 20 L 16 20" />
          <path d="M6 12 L 18 12" strokeDasharray="1.5 2.5" opacity="0.55" />
        </svg>
      );
    case "fit":
      return (
        <svg {...common}>
          <path d="M4 17 L 4 11 Q 4 9, 6 9 L 13 9 Q 15 9, 15 11 L 17 13 L 20 17 L 20 19 L 4 19 Z" />
        </svg>
      );
  }
}

/* Routing diagram — small horizontal three-node path shown above the
   demo body. Nodes fill as steps complete; filaments extend from the
   Select node as categories are picked, converging into the Route node.
   Argues the case-study thesis ("the routing is the whole case") in
   the visual language, not just the copy. */
function RoutingPath({
  step, selectedCount,
}: {
  step: 1 | 2 | 3; selectedCount: number;
}) {
  const stepDone = (n: 1 | 2 | 3) => step >= n;
  const active   = (n: 1 | 2 | 3) => step === n;
  const brand    = c.brand;
  const border   = c.border;
  const muted    = c.muted;
  const ink      = c.ink;

  return (
    <div style={{ marginBottom: "28px" }}>
      <svg
        viewBox="0 0 400 80"
        role="img"
        aria-label={`Routing path. Currently on step ${step} of 3.`}
        style={{ width: "100%", height: "auto", display: "block", maxHeight: "88px" }}
      >
        {/* Baseline path connecting the three nodes */}
        <line
          x1="60"  y1="34" x2="200" y2="34"
          stroke={stepDone(2) ? brand : border}
          strokeWidth="1.5"
          strokeDasharray={stepDone(2) ? "0" : "3 3"}
          style={{ transition: "stroke 300ms ease" }}
        />
        <line
          x1="200" y1="34" x2="340" y2="34"
          stroke={stepDone(3) ? brand : border}
          strokeWidth="1.5"
          strokeDasharray={stepDone(3) ? "0" : "3 3"}
          style={{ transition: "stroke 300ms ease" }}
        />

        {/* Filaments — small crimson lines rise from below the Select
            node when categories are picked, then bend into the Route
            node. Reads as "input signal → routing decision." */}
        {selectedCount > 0 && step === 1 && (
          <g stroke={brand} strokeWidth="1" strokeLinecap="round" opacity="0.65">
            {Array.from({ length: Math.min(selectedCount, 5) }).map((_, i) => {
              const x = 30 + i * 12;
              return (
                <path
                  key={i}
                  d={`M ${x} 72 Q ${x + 4} 50, 60 34`}
                  fill="none"
                />
              );
            })}
          </g>
        )}

        {/* Node · Select */}
        <circle
          cx="60" cy="34" r="10"
          fill={stepDone(1) ? brand : "#FFFFFF"}
          stroke={stepDone(1) ? brand : border}
          strokeWidth="1.5"
          style={{ transition: "fill 300ms ease, stroke 300ms ease" }}
        />
        {active(1) && (
          <circle cx="60" cy="34" r="14" fill="none" stroke={brand} strokeWidth="1" opacity="0.4" />
        )}

        {/* Node · Route */}
        <circle
          cx="200" cy="34" r="10"
          fill={stepDone(2) ? brand : "#FFFFFF"}
          stroke={stepDone(2) ? brand : border}
          strokeWidth="1.5"
          style={{ transition: "fill 300ms ease, stroke 300ms ease" }}
        />
        {active(2) && (
          <circle cx="200" cy="34" r="14" fill="none" stroke={brand} strokeWidth="1" opacity="0.4" />
        )}

        {/* Node · Hand off */}
        <circle
          cx="340" cy="34" r="10"
          fill={stepDone(3) ? brand : "#FFFFFF"}
          stroke={stepDone(3) ? brand : border}
          strokeWidth="1.5"
          style={{ transition: "fill 300ms ease, stroke 300ms ease" }}
        />
        {active(3) && (
          <circle cx="340" cy="34" r="14" fill="none" stroke={brand} strokeWidth="1" opacity="0.4" />
        )}

        {/* Node numerals */}
        <text x="60"  y="38.5" textAnchor="middle" fontSize="10" fontWeight="700" fill={stepDone(1) ? "#FFFFFF" : muted} fontFamily="var(--font-dm-sans), sans-serif">1</text>
        <text x="200" y="38.5" textAnchor="middle" fontSize="10" fontWeight="700" fill={stepDone(2) ? "#FFFFFF" : muted} fontFamily="var(--font-dm-sans), sans-serif">2</text>
        <text x="340" y="38.5" textAnchor="middle" fontSize="10" fontWeight="700" fill={stepDone(3) ? "#FFFFFF" : muted} fontFamily="var(--font-dm-sans), sans-serif">3</text>

        {/* Labels below the nodes */}
        <text x="60"  y="66" textAnchor="middle" fontSize="10" letterSpacing="1.4" fill={active(1) ? ink : muted} fontWeight={active(1) ? 700 : 600} fontFamily="var(--font-dm-sans), sans-serif">SELECT</text>
        <text x="200" y="66" textAnchor="middle" fontSize="10" letterSpacing="1.4" fill={active(2) ? ink : muted} fontWeight={active(2) ? 700 : 600} fontFamily="var(--font-dm-sans), sans-serif">ROUTE</text>
        <text x="340" y="66" textAnchor="middle" fontSize="10" letterSpacing="1.4" fill={active(3) ? ink : muted} fontWeight={active(3) ? 700 : 600} fontFamily="var(--font-dm-sans), sans-serif">HAND OFF</text>
      </svg>
    </div>
  );
}

interface ResultCard {
  id: string;
  category: string;
  title: string;
  body: string;
}

const RESULTS: Record<SymptomId, ResultCard> = {
  pain: {
    id:       "pain",
    category: "Pain",
    title:    "Start with triage, then the right pillar article.",
    body:     "Plantar fasciitis, heel spurs, and arch strain present alike but have different fixes. The assessment routes by symptom location and onset.",
  },
  nails: {
    id:       "nails",
    category: "Nails",
    title:    "Fungus vs trauma vs ingrown. Different routes.",
    body:     "Toenail issues are the most-mistaken category. The assessment narrows by appearance and whether there's pain underneath.",
  },
  skin: {
    id:       "skin",
    category: "Skin",
    title:    "Cracked heels, athlete's foot, calluses.",
    body:     "Skin issues often signal a deeper alignment or footwear problem. The assessment surfaces routine fixes before recommending products.",
  },
  alignment: {
    id:       "alignment",
    category: "Alignment",
    title:    "Knee and hip pain that starts at the feet.",
    body:     "Flat feet, overpronation, and gait asymmetry route to a different reading set than acute pain. The assessment captures stance and footwear wear patterns.",
  },
  fit: {
    id:       "fit",
    category: "Footwear",
    title:    "You're probably wearing the wrong size.",
    body:     "Most men over 40 are in shoes a half-size too small with the wrong width. The assessment routes to sizing guidance and the boots-that-fit pillar.",
  },
};

export default function DiagnosticFlowDemo() {
  const [selected, setSelected] = useState<Set<SymptomId>>(new Set());
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const liveRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function toggle(id: SymptomId) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function advance() {
    if (selected.size === 0) return;
    setStep(2);
  }

  function reset() {
    setSelected(new Set());
    setStep(1);
  }

  const selectedArr = useMemo(() => SYMPTOMS.filter((s) => selected.has(s.id)), [selected]);
  const resultCards = useMemo(() => selectedArr.map((s) => RESULTS[s.id]).slice(0, 3), [selectedArr]);

  const transition = reducedMotion ? "none" : "background-color 160ms ease, border-color 160ms ease, color 160ms ease, transform 160ms ease";

  return (
    <div
      role="region"
      aria-label="Interactive diagnostic flow demo"
      style={{
        background:    "#FFFFFF",
        border:        `1px solid ${c.border}`,
        /* Instrument chrome. Replaced the 4px crimson left rail (which
           was making the demo blend into the WhatICut / HonestRisks /
           Callout family per Ryan 2026-07-02) with a pure white ground
           and elevation shadow — reads as an object placed on the page,
           not a section of it. Top status strip signals "live routing"
           without duplicating the outer arrival copy. */
        boxShadow:     "0 24px 60px rgba(37,43,40,0.10), 0 4px 12px rgba(37,43,40,0.06)",
        padding:       "clamp(24px, 4vw, 48px)",
        fontFamily:    font.sans,
        color:         c.ink,
        position:      "relative",
      }}
    >
      {/* Top status strip — thin band signaling "this is an instrument,
          not an aside." Green dot + LIVE label reads as a running interface. */}
      <div style={{
        display:       "flex",
        alignItems:    "center",
        gap:           "10px",
        marginBottom:  "24px",
        paddingBottom: "16px",
        borderBottom:  `1px solid ${c.border}33`,
      }}>
        <span aria-hidden="true" style={{
          display:       "inline-block",
          width:         "8px",
          height:        "8px",
          borderRadius:  "50%",
          background:    c.accent,
          boxShadow:     `0 0 0 3px ${c.accent}22`,
        }} />
        <span style={{
          fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize:      "11px",
          fontWeight:    600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color:         c.muted,
        }}>
          Live · Diagnostic routing
        </span>
      </div>

      {/* Routing path — visualizes the case-study thesis. Three nodes
          connected by a hairline; filaments extend from Select when
          categories are picked, then converge into Route. */}
      <RoutingPath step={step} selectedCount={selected.size} />

      {/* STEP 1 — symptom selection */}
      {step === 1 && (
        <div role="group" aria-labelledby="diag-step1-h">
          <p
            id="diag-step1-h"
            style={{
              fontFamily:    font.sans,
              fontSize:      "16px",
              fontWeight:    600,
              color:         c.ink,
              margin:        "0 0 16px",
              letterSpacing: "-0.01em",
            }}
          >
            Where's the trouble? (Pick one or more.)
          </p>

          <div
            role="list"
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap:                 "12px",
              marginBottom:        "24px",
            }}
          >
            {SYMPTOMS.map((s, i) => {
              const isOn = selected.has(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  role="listitem"
                  aria-pressed={isOn}
                  onClick={() => toggle(s.id)}
                  style={{
                    appearance:    "none",
                    background:    isOn ? c.brand : c.cardBg,
                    color:         isOn ? "#FFFFFF" : c.ink,
                    border:        `1px solid ${isOn ? c.brand : c.border}`,
                    padding:       "18px 20px 20px",
                    textAlign:     "left",
                    fontFamily:    font.sans,
                    fontSize:      "15px",
                    fontWeight:    600,
                    cursor:        "pointer",
                    minHeight:     "108px",
                    transition,
                    letterSpacing: "-0.01em",
                    position:      "relative",
                    display:       "flex",
                    flexDirection: "column",
                    gap:           "12px",
                    animationDelay: `${i * 70}ms`,
                  }}
                  className="msr-diag-chip"
                >
                  {/* Diagnostic mark, upper-left */}
                  <span
                    aria-hidden="true"
                    style={{
                      display:    "inline-flex",
                      alignItems: "center",
                      color:      isOn ? "rgba(255,255,255,0.9)" : c.accent,
                      transition,
                    }}
                  >
                    <SymptomMark id={s.id} />
                  </span>

                  <span style={{ display: "block" }}>
                    <span style={{ display: "block", marginBottom: "4px" }}>{s.label}</span>
                    <span style={{
                      display:       "block",
                      fontSize:      "12px",
                      fontWeight:    500,
                      color:         isOn ? "rgba(255,255,255,0.85)" : c.muted,
                      lineHeight:    1.35,
                      letterSpacing: 0,
                    }}>
                      {s.hint}
                    </span>
                  </span>

                  {/* Selected checkmark chip, upper-right */}
                  {isOn && (
                    <span
                      aria-hidden="true"
                      style={{
                        position:      "absolute",
                        top:           "12px",
                        right:         "12px",
                        width:         "20px",
                        height:        "20px",
                        borderRadius:  "50%",
                        background:    "#FFFFFF",
                        color:         c.brand,
                        display:       "inline-flex",
                        alignItems:    "center",
                        justifyContent:"center",
                        fontSize:      "12px",
                        fontWeight:    700,
                        lineHeight:    1,
                      }}
                    >
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              gap:            "16px",
              flexWrap:       "wrap",
            }}
          >
            <p
              ref={liveRef}
              aria-live="polite"
              style={{
                fontFamily: font.sans,
                fontSize:   "13px",
                color:      c.muted,
                margin:     0,
              }}
            >
              {selected.size === 0
                ? "Select at least one to continue."
                : `${selected.size} selected.`}
            </p>
            <button
              type="button"
              onClick={advance}
              disabled={selected.size === 0}
              style={{
                appearance:    "none",
                background:    selected.size === 0 ? c.border : c.brand,
                color:         "#FFFFFF",
                border:        "none",
                padding:       "14px 28px",
                fontFamily:    font.sans,
                fontSize:      "14px",
                fontWeight:    600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                cursor:        selected.size === 0 ? "not-allowed" : "pointer",
                minHeight:     "44px",
                transition,
              }}
            >
              See routing →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 — result cards */}
      {step === 2 && (
        <div role="group" aria-labelledby="diag-step2-h">
          <p
            id="diag-step2-h"
            style={{
              fontFamily:    font.sans,
              fontSize:      "16px",
              fontWeight:    600,
              color:         c.ink,
              margin:        "0 0 6px",
              letterSpacing: "-0.01em",
            }}
          >
            Based on what you picked, start here.
          </p>
          <p style={{
            fontFamily: font.sans,
            fontSize:   "13px",
            color:      c.muted,
            margin:     "0 0 24px",
          }}>
            On the live site, the assessment narrows further by onset, severity, and footwear. This is the entry routing.
          </p>

          <div
            role="list"
            aria-live="polite"
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap:                 "16px",
              marginBottom:        "28px",
            }}
          >
            {resultCards.map((card) => (
              <article
                key={card.id}
                role="listitem"
                style={{
                  background: c.cardBg,
                  border:     `1px solid ${c.border}`,
                  padding:    "20px",
                }}
              >
                <span style={{
                  fontFamily:    font.sans,
                  fontSize:      "11px",
                  fontWeight:    700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color:         c.brand,
                  display:       "block",
                  marginBottom:  "10px",
                }}>
                  {card.category}
                </span>
                <h4 style={{
                  fontFamily:    font.sans,
                  fontSize:      "16px",
                  fontWeight:    600,
                  color:         c.ink,
                  margin:        "0 0 8px",
                  letterSpacing: "-0.01em",
                  lineHeight:    1.3,
                }}>
                  {card.title}
                </h4>
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "14px",
                  lineHeight: 1.55,
                  color:      c.ink2,
                  margin:     0,
                }}>
                  {card.body}
                </p>
              </article>
            ))}
          </div>

          <div
            style={{
              display:        "flex",
              gap:            "12px",
              flexWrap:       "wrap",
              alignItems:     "center",
              justifyContent: "space-between",
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                appearance:    "none",
                background:    "transparent",
                color:         c.ink2,
                border:        `1px solid ${c.border}`,
                padding:       "12px 20px",
                fontFamily:    font.sans,
                fontSize:      "13px",
                fontWeight:    600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                cursor:        "pointer",
                minHeight:     "44px",
                transition,
              }}
            >
              ← Start over
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              style={{
                appearance:    "none",
                background:    c.brand,
                color:         "#FFFFFF",
                border:        "none",
                padding:       "14px 28px",
                fontFamily:    font.sans,
                fontSize:      "14px",
                fontWeight:    600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                cursor:        "pointer",
                minHeight:     "44px",
                transition,
              }}
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — handoff CTA */}
      {step === 3 && (
        <div role="group" aria-labelledby="diag-step3-h">
          <p
            id="diag-step3-h"
            style={{
              fontFamily:    font.sans,
              fontSize:      "16px",
              fontWeight:    600,
              color:         c.ink,
              margin:        "0 0 6px",
              letterSpacing: "-0.01em",
            }}
          >
            Take it on the live site.
          </p>
          <p style={{
            fontFamily: font.sans,
            fontSize:   "14px",
            lineHeight: 1.6,
            color:      c.ink2,
            margin:     "0 0 12px",
            maxWidth:   "56ch",
          }}>
            The full assessment runs twelve frames. It captures onset, severity, footwear history, and routine. The output is a personalized starter set you can email to yourself or save as a PDF.
          </p>
          <p style={{
            fontFamily: font.sans,
            fontSize:   "13px",
            lineHeight: 1.55,
            color:      c.muted,
            margin:     "0 0 24px",
            maxWidth:   "56ch",
          }}>
            Six users started the flow. Five reached results. Three downloaded the takeaway. That funnel is graphed right below.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <a
              href="https://www.menssolerevival.com/assessment"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                appearance:     "none",
                background:     c.brand,
                color:          "#FFFFFF",
                border:         "none",
                padding:        "14px 28px",
                fontFamily:     font.sans,
                fontSize:       "14px",
                fontWeight:     600,
                letterSpacing:  "0.04em",
                textTransform:  "uppercase",
                textDecoration: "none",
                cursor:         "pointer",
                minHeight:      "44px",
                display:        "inline-flex",
                alignItems:     "center",
                transition,
              }}
            >
              Open the full assessment ↗
            </a>
            <button
              type="button"
              onClick={reset}
              style={{
                appearance:    "none",
                background:    "transparent",
                color:         c.ink2,
                border:        `1px solid ${c.border}`,
                padding:       "12px 20px",
                fontFamily:    font.sans,
                fontSize:      "13px",
                fontWeight:    600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                cursor:        "pointer",
                minHeight:     "44px",
                transition,
              }}
            >
              Run the demo again
            </button>
          </div>
        </div>
      )}

      <style>{`
        .msr-diag-chip {
          opacity:   0;
          transform: translateY(6px);
          animation: msr-diag-chip-in 500ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes msr-diag-chip-in {
          to { opacity: 1; transform: translateY(0); }
        }
        .msr-diag-chip:hover {
          transform:  translateY(-2px);
          box-shadow: 0 6px 18px rgba(37,43,40,0.10);
        }
        .msr-diag-chip:focus-visible {
          outline: 2px solid ${c.accent};
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .msr-diag-chip {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .msr-diag-chip:hover { transform: none !important; box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}
