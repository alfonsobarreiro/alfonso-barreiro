import { SlideFrame, Eyebrow, wf } from "./SlideFrame";

const cards = [
  {
    title: "What I learned",
    body:  "AI tools expand what’s possible to build. They don’t expand what should be built. The brief is still the brief. The user’s task is still the user’s task. The discipline shifts from “can we?” to “should we?”",
  },
  {
    title: "What I’d test first",
    body:  "The globe interaction model. It’s the signature feature but also the riskiest on mobile. I don’t know yet whether users treat it as the front door or a novelty — and that question matters more than any visual polish.",
  },
  {
    title: "The honest gap",
    body:  "No competitive analysis, no user research, no card sort. Decisions reasoned from the brief and the style guide — not validated by talking to the audience. That’s the next step, not a finished one.",
  },
];

export default function Slide15() {
  return (
    <SlideFrame index={15} title="Reflection">
      <Eyebrow>08 · Reflection</Eyebrow>
      <h2 className="font-display" style={{
        margin: "20px 0 40px",
        fontSize: 48, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.015em",
        color: wf.n900, maxWidth: 1100,
      }}>
        The hardest decision wasn’t any single UI choice.
      </h2>

      <div style={{ display: "flex", gap: 24 }}>
        {cards.map((c) => (
          <div key={c.title} style={{
            flex: 1, padding: "36px 28px", borderRadius: 16,
            background: wf.n100, border: `1px solid ${wf.n200}`,
          }}>
            <div style={{ width: 40, height: 4, background: wf.accent500, borderRadius: 2, marginBottom: 20 }} />
            <h3 className="font-heading" style={{
              margin: "0 0 12px",
              fontSize: 22, fontWeight: 700, color: wf.n900, letterSpacing: "-0.01em",
            }}>{c.title}</h3>
            <p className="font-body" style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: wf.n700 }}>{c.body}</p>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}
