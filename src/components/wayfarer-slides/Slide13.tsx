import { SlideFrame, Eyebrow, wf } from "./SlideFrame";

const routes = [
  ["/",                    "Homepage",     "Orient",      "Understand what Wayfarer is and whether to explore further."],
  ["/destinations",        "Explorer",     "Browse",      "Filter and scan destinations by continent."],
  ["/discover",            "Globe",        "Explore",     "Discover destinations through the interactive 3D map."],
  ["/destinations/[slug]", "Detail",       "Evaluate",    "Go deeper on a single destination."],
  ["/planner",             "Trip Planner", "Plan",        "Build a day-by-day itinerary with drag-to-reorder."],
  ["Modal",                "Sign-up Form", "Personalize", "Create an account with preference data."],
];

export default function Slide13() {
  return (
    <SlideFrame index={13} title="Site Architecture">
      <Eyebrow>06 · Site Architecture</Eyebrow>
      <h2 className="font-display" style={{
        margin: "20px 0 32px",
        fontSize: 48, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.015em",
        color: wf.n900, maxWidth: 1100,
      }}>
        Six page types. Each designed for a different user task.
      </h2>

      <div style={{ border: `1px solid ${wf.n200}`, borderRadius: 8, overflow: "hidden" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "260px 160px 160px 1fr",
          padding: "14px 20px", background: wf.n100,
          borderBottom: `1px solid ${wf.n200}`,
        }}>
          {["ROUTE","TYPE","USER TASK","PURPOSE"].map((h) => (
            <div key={h} className="font-body" style={{
              fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", color: wf.n500,
            }}>{h}</div>
          ))}
        </div>
        {routes.map((r, i) => (
          <div key={r[0]} style={{
            display: "grid", gridTemplateColumns: "260px 160px 160px 1fr",
            padding: "14px 20px", alignItems: "center",
            borderBottom: i < routes.length - 1 ? `1px solid ${wf.n200}` : "none",
          }}>
            <div className="font-body" style={{ fontSize: 13, fontFamily: "monospace", color: wf.n500 }}>{r[0]}</div>
            <div className="font-body" style={{ fontSize: 14, fontWeight: 600, color: wf.n900 }}>{r[1]}</div>
            <div className="font-body" style={{ fontSize: 14, fontWeight: 600, color: wf.brand500 }}>{r[2]}</div>
            <div className="font-body" style={{ fontSize: 14, color: wf.n700 }}>{r[3]}</div>
          </div>
        ))}
      </div>

      <p className="font-body" style={{
        margin: "24px 0 0", fontSize: 15, lineHeight: 1.55, color: wf.n500, maxWidth: 1100,
      }}>
        Orient → Browse / Explore → Evaluate → Plan → Personalize. Users don’t have to follow this linearly — globe and grid are parallel entry points into the same content — but the architecture supports the natural discovery sequence without forcing it.
      </p>
    </SlideFrame>
  );
}
