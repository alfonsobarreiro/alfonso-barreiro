import { SlideFrame, Eyebrow, wf } from "./SlideFrame";

/** Slide 01 — Title. Single vertical flow with generous whitespace; no absolute positioning inside. */
export default function Slide1() {
  return (
    <SlideFrame index={1} title="Title">
      <div style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
        {/* Top block — eyebrow + accent bar + headline + subhead */}
        <div style={{ display: "flex", gap: 40 }}>
          {/* Accent bar — fixed 6px wide, tall */}
          <div style={{ width: 6, background: wf.accent500, borderRadius: 3, flexShrink: 0 }} />

          <div style={{ flex: 1, paddingTop: 20 }}>
            <Eyebrow>Wayfarer · UX Case Study</Eyebrow>

            <h1 className="font-display" style={{
              margin: "24px 0 0",
              fontSize: 60, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em",
              color: wf.n900, maxWidth: 1080,
            }}>
              The brief said discovery.<br />
              The tools said build everything.<br />
              The discipline was knowing the difference.
            </h1>

            <p className="font-body" style={{
              margin: "28px 0 0", maxWidth: 820,
              fontSize: 18, lineHeight: 1.55, color: wf.n700,
            }}>
              A concept travel discovery platform for DesignLab. AI-assisted development
              made it possible to build far beyond the brief. The real design work was
              deciding what to cut.
            </p>
          </div>
        </div>

        {/* Bottom block — metadata row, flush to the content-area bottom */}
        <div style={{
          display: "flex",
          gap: 64,
          paddingTop: 24,
          borderTop: `1px solid ${wf.n200}`,
        }}>
          {[
            ["ROLE",     "UX/UI Designer"],
            ["TYPE",     "DesignLab · Concept"],
            ["TIMELINE", "4 weeks"],
            ["TOOLS",    "Figma · Next.js · Mapbox"],
          ].map(([label, value]) => (
            <div key={label}>
              <div className="font-body" style={{
                fontSize: 11, fontWeight: 600, letterSpacing: "0.14em",
                color: wf.n500, marginBottom: 6, textTransform: "uppercase",
              }}>
                {label}
              </div>
              <div className="font-body" style={{ fontSize: 15, color: wf.n900 }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
