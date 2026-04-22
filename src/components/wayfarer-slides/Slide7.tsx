import { SlideFrame, Eyebrow, wf } from "./SlideFrame";

/** Slide 07 — signature dark "What Not to Build" slide. */
export default function Slide7() {
  return (
    <SlideFrame index={7} title="What Not to Build" variant="dark">
      {/* Accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 60,
        width: 8, height: 180, borderRadius: 4,
        background: wf.accent500,
      }} />

      <div style={{ position: "absolute", left: 48, top: 60, width: 1180 }}>
        <Eyebrow tone="light">03 · What Not to Build</Eyebrow>

        <h2 className="font-display" style={{
          margin: "28px 0 0",
          fontSize: 72, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em",
          color: wf.white,
        }}>
          “AI tools expand what’s possible to build.<br />
          They don’t expand what should be built.”
        </h2>

        <div style={{ marginTop: 44, maxWidth: 900 }}>
          <p className="font-body" style={{ margin: 0, fontSize: 18, lineHeight: 1.55, color: wf.n200 }}>
            Four weeks in, I had a working booking interface. Hotels, cars, detail pages. The tools made it possible to go from concept to functional UI in hours.
          </p>
          <p className="font-body" style={{ margin: "18px 0 0", fontSize: 18, lineHeight: 1.55, color: wf.n100 }}>
            The brief said discovery, not booking. The booking UI was good work. It just wasn’t right work.
          </p>
          <p className="font-body" style={{ margin: "18px 0 0", fontSize: 20, lineHeight: 1.5, color: wf.white, fontWeight: 500 }}>
            When the tools make everything buildable, the design discipline shifts from “can we?” to “should we?” That’s a harder question, and it’s the one that matters.
          </p>
        </div>
      </div>
    </SlideFrame>
  );
}
