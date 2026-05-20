// MSR Case Study — Slide 7a: Assessment Redesign
// Six-artifact grid lifted from portfolio Section 07 (the redesigned diagnostic).

const artifacts = [
  {
    label: "Artifact 03a",
    title: "Problem & comparative analysis",
    body:  "Three gaps in the live assessment. Five intake tools benchmarked: Function Health, WHOOP, BetterHelp, Hims, Eight Sleep. Net moves: symptom-first triage, why-we-ask microcopy, scheduled re-engagement.",
  },
  {
    label: "Artifact 03h",
    title: "Every question, in order",
    body:  "Twenty-nine items across five sections. Step 0 is the only branching question. Pain & Inflammation uses three-state because pain is interoceptive. The rest are binary.",
  },
  {
    label: "Artifact 03c",
    title: "Wireframes at component fidelity",
    body:  "Six desktop states plus two mobile variants. Triage, in-progress with sidebar, skip confirmation, acknowledgment, results, email capture with a 30 and 90 day check-in opt-in.",
  },
  {
    label: "Artifact 03g",
    title: "Decision flow",
    body:  "Every branch in the routing logic, surfaced as a flowchart. composeResult bucketizes flags, shifts on duration, surfaces the clinic callout only when a section bucket reads high.",
  },
  {
    label: "Artifact 03d",
    title: "Trade-offs & decision argument",
    body:  "Nine decisions documented as chose-X-over-Y. Closes with the case-study argument: personalization and re-engagement earned without trading editorial trust.",
  },
  {
    label: "Artifact 03i",
    title: "Layout rationale",
    body:  "Four layout decisions defended on usability, cognition, and emotional grounds. Centered form, supporting education beside it, narrow column, editorial typography. All to lower the stigma barrier.",
  },
];

export default function Slide7a() {
  return (
    <div className="relative overflow-hidden" style={{ width: 1440, height: 900, background: "#F8F7F7" }}>
      <div className="relative z-10 flex flex-col px-[88px] pt-[40px] pb-14 h-full min-h-[900px]">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-display text-xs tracking-[0.25em] uppercase" style={{ color: "#C4703A" }}>07a</span>
          <div className="w-8 h-px" style={{ background: "#C4703A" }} />
          <span className="font-display text-xs tracking-[0.25em] uppercase" style={{ color: "#C4703A" }}>Assessment Redesign</span>
        </div>

        {/* Headline */}
        <h1 className="font-display uppercase leading-[1.08] tracking-tight mb-3" style={{ color: "#13100C", fontSize: 30, fontWeight: 800, maxWidth: 1100 }}>
          Six artifacts.{" "}
          <span style={{ color: "#C4703A" }}>One diagnostic redesign.</span>
        </h1>

        {/* Sub */}
        <p className="font-body leading-relaxed mb-6" style={{ color: "#6B6560", fontSize: 13, maxWidth: 900 }}>
          The original assessment ends in a tier label. The redesign ends in a specific next step.
        </p>

        {/* 3 × 2 tile grid */}
        <div className="grid grid-cols-3 gap-5 flex-1">
          {artifacts.map((a) => (
            <div key={a.label} className="rounded-lg p-5 flex flex-col" style={{ background: "#FFFFFF", border: "1px solid #EEEDEC" }}>
              <span className="font-display tracking-[0.14em] uppercase mb-2" style={{ fontSize: 10, color: "#C4703A", fontWeight: 700 }}>{a.label}</span>
              <h2 className="font-body font-semibold leading-tight mb-2" style={{ fontSize: 16, color: "#13100C" }}>{a.title}</h2>
              <p className="font-body leading-snug" style={{ fontSize: 11, color: "#6B6560" }}>{a.body}</p>
            </div>
          ))}
        </div>

        {/* Closing argument quote */}
        <div className="mt-5 rounded-lg px-6 py-3 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(196,112,58,0.06) 0%, rgba(196,112,58,0.01) 100%)", border: "1px solid rgba(196,112,58,0.2)" }}>
          <p className="font-heading italic leading-relaxed text-center" style={{ color: "#C4703A", fontSize: 14 }}>&ldquo;Personalization, re-engagement, and first-party data can be earned without trading the editorial trust the audience came for.&rdquo;</p>
        </div>

      </div>
    </div>
  );
}
