import { SlideFrame, Eyebrow, wf } from "./SlideFrame";

export default function Slide9() {
  return (
    <SlideFrame index={9} title="Information Architecture">
      <Eyebrow>04 · Design Decisions</Eyebrow>
      <h2 className="font-display" style={{
        margin: "20px 0 0",
        fontSize: 48, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.015em",
        color: wf.n900, maxWidth: 1150,
      }}>
        40+ destinations, two entry points, one discovery path.
      </h2>
      <p className="font-body" style={{
        margin: "20px 0 40px", maxWidth: 980,
        fontSize: 18, lineHeight: 1.55, color: wf.n700,
      }}>
        The globe is the primary entry. Click a region, fly to the continent, hover a pin, open the detail page. The destinations grid is the parallel fallback — same content, filtered by continent, matched to users who already know what region they want.
      </p>

      <div style={{ display: "flex", gap: 32 }}>
        {/* Entry point 1 — globe */}
        <div style={{ flex: 1 }}>
          <Eyebrow>Entry point 1 · Interactive globe</Eyebrow>
          <div style={{
            marginTop: 14, aspectRatio: "16 / 10",
            borderRadius: 12, border: `1px solid ${wf.n200}`,
            background: `linear-gradient(135deg, ${wf.brand900}, ${wf.brand500})`,
            position: "relative", overflow: "hidden",
          }}>
            {/* Faux globe */}
            <div style={{
              position: "absolute", width: 260, height: 260, borderRadius: "50%",
              left: "50%", top: "50%", transform: "translate(-50%,-50%)",
              background: `radial-gradient(circle at 30% 30%, ${wf.brand200}, ${wf.brand700})`,
              boxShadow: `0 0 80px ${wf.brand200}55`,
            }} />
            {/* Pins */}
            {[[160, 90], [320, 140], [250, 210], [180, 180], [280, 80]].map(([x,y], i) => (
              <span key={i} style={{
                position: "absolute", left: x, top: y,
                width: 14, height: 14, borderRadius: "50%",
                background: wf.accent500, border: `2px solid ${wf.white}`,
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              }} />
            ))}
          </div>
        </div>

        {/* Entry point 2 — grid */}
        <div style={{ flex: 1 }}>
          <Eyebrow>Entry point 2 · Filterable grid</Eyebrow>
          <div style={{
            marginTop: 14, aspectRatio: "16 / 10",
            borderRadius: 12, border: `1px solid ${wf.n200}`,
            background: wf.n100, padding: 16,
            display: "flex", flexDirection: "column", gap: 12,
          }}>
            {/* Chip row */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["All 87","Africa 10","Asia 29","Europe 25","N. America 9","S. America 10","Oceania 6"].map((c, i) => (
                <span key={c} style={{
                  padding: "3px 9px", borderRadius: 999, fontSize: 10, fontWeight: 600,
                  background: i === 2 ? wf.brand500 : wf.white,
                  color: i === 2 ? wf.white : wf.n700,
                  border: `1px solid ${i === 2 ? wf.brand500 : wf.n200}`,
                }}>{c}</span>
              ))}
            </div>
            {/* Card grid */}
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[wf.brand200, wf.accent500, wf.sage300, wf.brand500, wf.accent700, wf.brand700].map((c, i) => (
                <div key={i} style={{ background: c, borderRadius: 6, opacity: 0.85 }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
