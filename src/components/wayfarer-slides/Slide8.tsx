import { SlideFrame, Eyebrow, wf } from "./SlideFrame";

const cut = [
  "Hotel search and booking interface",
  "Car rental browsing and comparison",
  "Price-based filtering and sorting",
  "Booking confirmation flow",
];
const kept = [
  "Globe explorer as primary discovery interface",
  "Destination detail pages (content, gallery, tips, map)",
  "Multi-step signup with preference collection",
  "Trip planner for itinerary building",
  "Continent-based filtering and search",
];

function List({ variant, heading, items }: { variant: "cut" | "kept"; heading: string; items: string[] }) {
  const isCut   = variant === "cut";
  const bg      = isCut ? wf.error50   : wf.success50;
  const dot     = isCut ? wf.error500  : wf.success500;
  const chipBg  = isCut ? wf.error600  : wf.success600;
  const border  = isCut ? "#FECACA"    : "#BBF7D0";
  return (
    <div style={{
      flex: 1, padding: "32px 32px", borderRadius: 16,
      background: bg, border: `1px solid ${border}`,
    }}>
      <div style={{
        display: "inline-block", padding: "3px 10px",
        borderRadius: 999, background: chipBg, color: wf.white,
        fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
        fontFamily: "var(--font-inter), Inter, sans-serif",
      }}>
        {isCut ? "CUT" : "KEPT"}
      </div>
      <h3 className="font-heading" style={{
        margin: "16px 0 14px",
        fontSize: 24, fontWeight: 700, color: wf.n900, letterSpacing: "-0.01em",
      }}>{heading}</h3>
      {items.map((text) => (
        <div key={text} style={{ display: "flex", gap: 12, margin: "10px 0", alignItems: "flex-start" }}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: dot, flexShrink: 0, marginTop: 8 }} />
          <p className="font-body" style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: wf.n700 }}>{text}</p>
        </div>
      ))}
    </div>
  );
}

export default function Slide8() {
  return (
    <SlideFrame index={8} title="Cut vs Kept">
      <Eyebrow>03 · What Not to Build</Eyebrow>
      <h2 className="font-display" style={{
        margin: "20px 0 10px",
        fontSize: 52, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em",
        color: wf.n900,
      }}>
        I scaled it back.
      </h2>
      <p className="font-body" style={{ margin: "0 0 32px", fontSize: 20, color: wf.n500 }}>
        Removed booking UI. Kept discovery as the center of gravity.
      </p>

      <div style={{ display: "flex", gap: 24 }}>
        <List variant="cut"  heading="What was cut"           items={cut} />
        <List variant="kept" heading="What survived the filter" items={kept} />
      </div>
    </SlideFrame>
  );
}
