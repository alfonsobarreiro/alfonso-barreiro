import { SlideFrame, wf } from "./SlideFrame";

export default function Slide16() {
  return (
    <SlideFrame index={16} title="End" variant="dark">
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center",
      }}>
        <div style={{ width: 64, height: 6, background: wf.accent500, borderRadius: 3, marginBottom: 36 }} />

        <h2 className="font-display" style={{
          margin: 0,
          fontSize: 140, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em",
          color: wf.white,
        }}>
          Thank you.
        </h2>

        <p className="font-body" style={{
          margin: "32px 0 0",
          fontSize: 18, color: "rgba(255,255,255,0.65)",
          letterSpacing: "0.08em",
        }}>
          Alfonso Barreiro &nbsp;·&nbsp; UX/UI Designer &nbsp;·&nbsp; alfonso@barreiro.com
        </p>
      </div>
    </SlideFrame>
  );
}
