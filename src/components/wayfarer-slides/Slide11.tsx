import { SlideFrame, Eyebrow, wf } from "./SlideFrame";

const swatches = [
  { name: "Navy",        hex: "#3E3C78", color: wf.brand500, category: "Primary" },
  { name: "Lavender",    hex: "#C5C7E3", color: wf.brand200, category: "Primary" },
  { name: "Deep Indigo", hex: "#2C2B5A", color: wf.brand900, category: "Primary" },
  { name: "Terra Cotta", hex: "#D27A5E", color: wf.accent500, category: "Secondary" },
  { name: "Sage Green",  hex: "#A3C9A8", color: wf.sage300,   category: "Secondary" },
  { name: "Off-White",   hex: "#F8F9FB", color: "#F8F9FB",    category: "Neutral" },
];

export default function Slide11() {
  return (
    <SlideFrame index={11} title="Visual Language">
      <Eyebrow>04 · Design Decisions</Eyebrow>
      <h2 className="font-display" style={{
        margin: "20px 0 40px",
        fontSize: 48, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.015em",
        color: wf.n900, maxWidth: 1100,
      }}>
        Two typefaces, six hues. The palette serves the content.
      </h2>

      {/* Palette grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 20, marginBottom: 48 }}>
        {swatches.map((s) => (
          <div key={s.name}>
            <div style={{
              aspectRatio: "1 / 1", borderRadius: 12,
              background: s.color, border: `1px solid ${wf.n200}`,
              marginBottom: 14,
            }} />
            <div className="font-body" style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
              color: wf.n500, textTransform: "uppercase", marginBottom: 4,
            }}>{s.category}</div>
            <div className="font-body" style={{ fontSize: 15, fontWeight: 500, color: wf.n900 }}>{s.name}</div>
            <div className="font-body" style={{ fontSize: 12, color: wf.n500, fontFamily: "monospace" }}>{s.hex}</div>
          </div>
        ))}
      </div>

      {/* Typography specimens */}
      <div style={{ display: "flex", gap: 96, paddingTop: 24, borderTop: `1px solid ${wf.n200}` }}>
        <div>
          <Eyebrow tone="muted">Headings</Eyebrow>
          <div className="font-display" style={{
            margin: "8px 0 6px", fontSize: 40, fontWeight: 700, color: wf.n900,
            letterSpacing: "-0.015em",
          }}>Space Grotesk Bold</div>
          <div className="font-body" style={{ fontSize: 13, color: wf.n500, fontFamily: "monospace" }}>
            60 / 48 / 32 / 24 px · H1 H2 H3 H4
          </div>
        </div>
        <div>
          <Eyebrow tone="muted">Body</Eyebrow>
          <div className="font-display" style={{
            margin: "8px 0 6px", fontSize: 40, fontWeight: 700, color: wf.n900,
            letterSpacing: "-0.015em",
          }}>Inter Regular</div>
          <div className="font-body" style={{ fontSize: 13, color: wf.n500, fontFamily: "monospace" }}>
            20 / 18 / 16 px · Large / Default / Small
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
