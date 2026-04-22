import { SlideFrame, Eyebrow, wf } from "./SlideFrame";

const rows = [
  { token: "brand-500",   wayfarer: "#3E3C78", portfolio: "#1C3F5E", msr: "#1C3F5E" },
  { token: "brand-900",   wayfarer: "#2C2B5A", portfolio: "#091016", msr: "#091016" },
  { token: "accent-500",  wayfarer: "#D27A5E", portfolio: "#C4703A", msr: "#C4703A" },
  { token: "neutral-50",  wayfarer: "#F8F9FB", portfolio: "#F8F7F7", msr: "#F8F7F7" },
  { token: "neutral-500", wayfarer: "#6B6560", portfolio: "#6B6560", msr: "#6B6560" },
];

function Cell({ hex, emphasis }: { hex: string; emphasis?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span style={{
        width: 16, height: 16, borderRadius: 3,
        background: hex, border: `1px solid ${wf.n200}`,
      }} />
      <span className="font-body" style={{
        fontSize: 14, fontFamily: "monospace",
        color: emphasis ? wf.n900 : wf.n500,
        fontWeight: emphasis ? 600 : 400,
      }}>{hex}</span>
    </span>
  );
}

export default function Slide12() {
  return (
    <SlideFrame index={12} title="Design System">
      <Eyebrow>05 · Design System</Eyebrow>
      <h2 className="font-display" style={{
        margin: "20px 0 16px",
        fontSize: 52, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em",
        color: wf.n900, maxWidth: 1100,
      }}>
        One vocabulary. Different values per project.
      </h2>
      <p className="font-body" style={{
        margin: "0 0 36px", maxWidth: 1000,
        fontSize: 17, lineHeight: 1.55, color: wf.n700,
      }}>
        Three-tier token architecture shared across Wayfarer, the portfolio, and MSR: CSS custom properties as the source of truth, TypeScript semantic aliases for components, Tailwind utilities for development. Same names, different values — the same token role carries three different brands without refactoring.
      </p>

      {/* Token table */}
      <div style={{ border: `1px solid ${wf.n200}`, borderRadius: 8, overflow: "hidden" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "180px 1fr 1fr 1fr",
          padding: "14px 20px", background: wf.n100,
          borderBottom: `1px solid ${wf.n200}`,
        }}>
          {["TOKEN","WAYFARER","PORTFOLIO","MSR"].map((h) => (
            <div key={h} className="font-body" style={{
              fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", color: wf.n500,
            }}>{h}</div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={r.token} style={{
            display: "grid", gridTemplateColumns: "180px 1fr 1fr 1fr",
            padding: "16px 20px", alignItems: "center",
            borderBottom: i < rows.length - 1 ? `1px solid ${wf.n200}` : "none",
          }}>
            <div className="font-body" style={{ fontSize: 14, fontFamily: "monospace", color: wf.n900, fontWeight: 600 }}>{r.token}</div>
            <Cell hex={r.wayfarer} emphasis />
            <Cell hex={r.portfolio} />
            <Cell hex={r.msr} />
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}
