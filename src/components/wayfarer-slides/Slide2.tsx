import { SlideFrame, Eyebrow, wf } from "./SlideFrame";

export default function Slide2() {
  return (
    <SlideFrame index={2} title="Context & Brief">
      <Eyebrow>01 · Context &amp; Brief</Eyebrow>

      <h2 className="font-display" style={{
        margin: "24px 0 0",
        fontSize: 52, fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.015em",
        color: wf.n900, maxWidth: 1100,
      }}>
        A concept travel platform, designed around one constraint.
      </h2>

      <div style={{ display: "flex", gap: 64, marginTop: 40 }}>
        <div style={{ flex: 1 }}>
          <Eyebrow>The assignment</Eyebrow>
          <p className="font-body" style={{ marginTop: 14, fontSize: 18, lineHeight: 1.55, color: wf.n700 }}>
            DesignLab assigned me Wayfarer, a travel discovery platform. The brief was specific: redesign the homepage, fix the onboarding flow. Users found the existing multi-step signup confusing and repetitive. The visual language didn’t match the audience.
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <Eyebrow>The audience</Eyebrow>
          <p className="font-body" style={{ marginTop: 14, fontSize: 18, lineHeight: 1.55, color: wf.n700 }}>
            Adventurous travelers aged 21–30. Digitally native, mobile-first. More interested in authentic cultural experiences than resort packages. They research before they commit. They browse before they plan.
          </p>
        </div>
      </div>

      {/* The Constraint callout */}
      <div style={{
        marginTop: 40, padding: "28px 32px", borderRadius: 12,
        background: wf.brand50, borderLeft: `4px solid ${wf.brand500}`,
      }}>
        <Eyebrow tone="muted">The constraint</Eyebrow>
        <p className="font-body" style={{ margin: "10px 0 0", fontSize: 20, lineHeight: 1.45, color: wf.brand900 }}>
          Wayfarer is a discovery tool, not a booking platform. The brief said so explicitly. Everything I built had to survive that filter.
        </p>
      </div>
    </SlideFrame>
  );
}
