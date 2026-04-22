import { SlideFrame, Eyebrow, wf } from "./SlideFrame";

const rows = [
  ["Globe drives discovery",             "Time to first destination click", "< 30s",      "If the globe is doing its job, curiosity outpaces confusion."],
  ["Signup feels like discovery",        "Completion rate",                 "> 80%",      "5 steps is a lot. If the framing works, users finish."],
  ["Steps feel purposeful",              "Per-step drop-off",               "< 10% / step","Even drop-off signals each step earns its place."],
  ["Detail pages answer the question",   "Time on detail page",             "> 90s",      "Users reading tips and gallery are engaged."],
  ["Trip planner is intuitive",          "Build 3-day trip task time",      "< 4 min",    "Drag-to-reorder should be discoverable."],
];

export default function Slide14() {
  return (
    <SlideFrame index={14} title="Evaluation Plan">
      <Eyebrow>07 · Evaluation Plan</Eyebrow>
      <h2 className="font-display" style={{
        margin: "16px 0 12px",
        fontSize: 44, fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.015em",
        color: wf.n900, maxWidth: 1200,
      }}>
        Concept project. No live traffic. Here’s how I’d test it.
      </h2>
      <p className="font-body" style={{
        margin: "0 0 24px", fontSize: 15, color: wf.n500, maxWidth: 1000,
      }}>
        Moderated usability test. 5–6 participants matching the target persona. Three task scenarios. Think-aloud, 40 minutes per session.
      </p>

      <div style={{ border: `1px solid ${wf.n200}`, borderRadius: 8, overflow: "hidden" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "340px 240px 140px 1fr",
          padding: "12px 20px", background: wf.n100,
          borderBottom: `1px solid ${wf.n200}`,
        }}>
          {["HYPOTHESIS","METRIC","THRESHOLD","RATIONALE"].map((h) => (
            <div key={h} className="font-body" style={{
              fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", color: wf.n500,
            }}>{h}</div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={r[0]} style={{
            display: "grid", gridTemplateColumns: "340px 240px 140px 1fr",
            padding: "14px 20px", alignItems: "center",
            borderBottom: i < rows.length - 1 ? `1px solid ${wf.n200}` : "none",
          }}>
            <div className="font-body" style={{ fontSize: 14, fontWeight: 600, color: wf.n900 }}>{r[0]}</div>
            <div className="font-body" style={{ fontSize: 13, color: wf.n700 }}>{r[1]}</div>
            <div className="font-body" style={{ fontSize: 13, fontWeight: 700, color: wf.brand500 }}>{r[2]}</div>
            <div className="font-body" style={{ fontSize: 12, color: wf.n500 }}>{r[3]}</div>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}
