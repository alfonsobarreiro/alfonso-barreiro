import { SlideFrame, Eyebrow, wf } from "./SlideFrame";

const problems = [
  ["01", "Onboarding Friction",     "A multi-step signup that felt like paperwork, not discovery."],
  ["02", "Layout Inconsistency",    "Spacing and hierarchy shifted unpredictably across devices."],
  ["03", "No Visual Storytelling",  "Destinations were listed as data, not revealed as invitation."],
];

export default function Slide3() {
  return (
    <SlideFrame index={3} title="The Problem">
      <Eyebrow>02 · The Problem</Eyebrow>

      <h2 className="font-display" style={{
        margin: "24px 0 0",
        fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em",
        color: wf.n900, maxWidth: 1150,
      }}>
        Three problems sat inside the brief.
      </h2>
      <p className="font-body" style={{
        margin: "12px 0 0", fontSize: 20, lineHeight: 1.5, color: wf.n500,
      }}>
        Each pointed to a different kind of design work.
      </p>

      <div style={{ display: "flex", gap: 24, marginTop: 48 }}>
        {problems.map(([n, title, desc]) => (
          <div key={n} style={{
            flex: 1, padding: "32px 28px", borderRadius: 16,
            background: wf.n100, border: `1px solid ${wf.n200}`,
          }}>
            <div className="font-display" style={{
              fontSize: 56, fontWeight: 700, color: wf.accent500, lineHeight: 1,
            }}>{n}</div>
            <h3 className="font-heading" style={{
              margin: "18px 0 10px", fontSize: 24, fontWeight: 700, color: wf.n900, letterSpacing: "-0.01em",
            }}>{title}</h3>
            <p className="font-body" style={{ fontSize: 15, lineHeight: 1.55, color: wf.n700, margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}
