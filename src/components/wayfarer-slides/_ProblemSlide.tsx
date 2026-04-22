/** Shared layout for the three Problem slides (04, 05, 06). */
import { SlideFrame, Eyebrow, wf } from "./SlideFrame";

export default function ProblemSlide({
  index, number, title, lead, paragraphs,
}: {
  index: number;
  number: string;
  title: string;
  lead: string;
  paragraphs: string[];
}) {
  return (
    <SlideFrame index={index} title={title.replace(/\.$/, "")}>
      <div style={{ display: "flex", gap: 80, height: "100%" }}>
        {/* Left — big number + title */}
        <div style={{ width: 520 }}>
          <Eyebrow>02 · The Problem</Eyebrow>
          <div className="font-display" style={{
            marginTop: 32,
            fontSize: 220, fontWeight: 700, color: wf.accent500,
            lineHeight: 0.9, letterSpacing: "-0.04em",
          }}>
            {number}
          </div>
          <h2 className="font-display" style={{
            marginTop: 24,
            fontSize: 52, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em",
            color: wf.n900,
          }}>
            {title}
          </h2>
        </div>

        {/* Right — lead quote + paragraphs */}
        <div style={{ flex: 1, paddingTop: 56 }}>
          <p className="font-heading" style={{
            margin: 0, fontSize: 28, fontWeight: 700, lineHeight: 1.3,
            letterSpacing: "-0.01em", color: wf.n900, maxWidth: 700,
          }}>
            {lead}
          </p>
          <div style={{ width: 64, height: 3, background: wf.accent500, margin: "24px 0", borderRadius: 2 }} />
          {paragraphs.map((p, i) => (
            <p key={i} className="font-body" style={{
              margin: i === 0 ? 0 : "16px 0 0",
              fontSize: 18, lineHeight: 1.55, color: wf.n700, maxWidth: 700,
            }}>{p}</p>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
