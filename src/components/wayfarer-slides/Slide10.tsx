import { SlideFrame, Eyebrow, wf } from "./SlideFrame";

const steps = [
  ["01", "Account",      "Name and email"],
  ["02", "Travel Style", "Solo/couple/family/group + budget + group size"],
  ["03", "Interests",    "Eight categories, multi-select"],
  ["04", "Destinations", "Select from featured options"],
  ["05", "Review",       "Full summary with edit-back"],
];

export default function Slide10() {
  return (
    <SlideFrame index={10} title="Multi-Step Signup">
      <Eyebrow>04 · Design Decisions</Eyebrow>
      <h2 className="font-display" style={{
        margin: "20px 0 36px",
        fontSize: 48, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.015em",
        color: wf.n900, maxWidth: 1100,
      }}>
        Five steps. Each narrows personalization without feeling like a form.
      </h2>

      {/* Step cards in a row */}
      <div style={{ display: "flex", gap: 16 }}>
        {steps.map(([n, t, d], i) => (
          <div key={n} style={{
            flex: 1, padding: "22px 18px", borderRadius: 12,
            background: wf.n100, border: `1px solid ${wf.n200}`,
          }}>
            {/* Progress bar */}
            <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
              {steps.map((_, j) => (
                <div key={j} style={{
                  flex: 1, height: 3, borderRadius: 2,
                  background: j <= i ? wf.brand500 : wf.n200,
                }} />
              ))}
            </div>
            <div className="font-body" style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
              color: wf.accent700, marginBottom: 6,
            }}>STEP {n}</div>
            <div className="font-heading" style={{
              fontSize: 18, fontWeight: 700, color: wf.n900, marginBottom: 8, letterSpacing: "-0.01em",
            }}>{t}</div>
            <div className="font-body" style={{
              fontSize: 13, lineHeight: 1.5, color: wf.n700,
            }}>{d}</div>
          </div>
        ))}
      </div>

      <p className="font-body" style={{
        margin: "44px 0 0", maxWidth: 980,
        fontSize: 18, lineHeight: 1.55, color: wf.n700,
      }}>
        Step 2 establishes context. Step 3 maps interests. Step 4 anchors aspiration. The review screen lets users correct before committing. Each step earns its place — when the framing works, users finish because they want their result.
      </p>
    </SlideFrame>
  );
}
