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
        background:    c.paper,
        border:        `1px solid ${c.border}`,
        padding:       "clamp(24px, 4vw, 48px)",
        fontFamily:    font.sans,
        color:         c.ink,
      }}
    >
      <header style={{ marginBottom: "28px" }}>
        <span style={{
          fontFamily:    font.sans,
          fontSize:      "11px",
          fontWeight:    700,
          letterSpacing: "0.2em",
          color:         c.brand,
          textTransform: "uppercase",
          display:       "block",
          marginBottom:  "10px",
        }}>
          Live demo · Diagnostic routing
        </span>
        <h3 style={{
          fontFamily:    font.sans,
          fontSize:      "clamp(20px, 2.4vw, 26px)",
          fontWeight:    600,
          color:         c.ink,
          margin:        "0 0 8px",
          letterSpacing: "-0.015em",
        }}>
          Try the routing logic.
        </h3>
        <p style={{
          fontFamily: font.sans,
          fontSize:   "15px",
          lineHeight: 1.55,
          color:      c.ink2,
          margin:     0,
          maxWidth:   "60ch",
        }}>
          Select what's bothering you. The same routing logic lives behind the assessment on the live site.
        </p>
      </header>

      {/* Stepper */}
      <ol
        aria-label="Demo progress"
        style={{
          display:      "flex",
          gap:          "8px",
          padding:      0,
          margin:       "0 0 28px",
          listStyle:    "none",
          fontFamily:   font.sans,
          fontSize:     "12px",
          fontWeight:   600,
          letterSpacing:"0.08em",
          textTransform:"uppercase",
        }}
      >
        {[
          { n: 1, label: "Select" },
          { n: 2, label: "Route"  },
          { n: 3, label: "Hand off" },
        ].map((s) => (
          <li
            key={s.n}
            aria-current={step === s.n ? "step" : undefined}
            style={{
              padding:      "6px 12px",
              border:       `1px solid ${step >= s.n ? c.brand : c.border}`,
              color:        step >= s.n ? c.brand : c.muted,
              background:   step === s.n ? "rgba(140,26,26,0.06)" : "transparent",
              transition,
            }}
          >
            {s.n} · {s.label}
          </li>
        ))}
      </ol>

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
            {SYMPTOMS.map((s) => {
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
                    padding:       "16px 18px",
                    textAlign:     "left",
                    fontFamily:    font.sans,
                    fontSize:      "15px",
                    fontWeight:    600,
                    cursor:        "pointer",
                    minHeight:     "64px",
                    transition,
                    letterSpacing: "-0.01em",
                  }}
                  className="msr-diag-chip"
                >
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
        .msr-diag-chip:focus-visible {
          outline: 2px solid ${c.accent};
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .msr-diag-chip { transition: none !important; }
        }
      `}</style>
    </div>
  );
}
