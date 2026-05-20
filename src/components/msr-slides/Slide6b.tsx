// MSR Case Study — Slide 6b: Component Library
// Visual proof of the 13 component sets claimed on Slide 6.

const buttonStates = [
  { label: "Default",  bg: "#C4703A", textColor: "#FFFFFF", opacity: 1,   ring: false, shadow: false, pressed: false },
  { label: "Hover",    bg: "#A35E32", textColor: "#FFFFFF", opacity: 1,   ring: false, shadow: true,  pressed: false },
  { label: "Focus",    bg: "#C4703A", textColor: "#FFFFFF", opacity: 1,   ring: true,  shadow: false, pressed: false },
  { label: "Pressed",  bg: "#8C4520", textColor: "#FFFFFF", opacity: 1,   ring: false, shadow: false, pressed: true  },
  { label: "Disabled", bg: "#C4703A", textColor: "#FFFFFF", opacity: 0.4, ring: false, shadow: false, pressed: false },
];

export default function Slide6b() {
  return (
    <div className="relative overflow-hidden" style={{ width: 1440, height: 900, background: "#F8F7F7" }}>
      <div className="relative z-10 flex flex-col px-[88px] pt-[40px] pb-14 h-full min-h-[900px]">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-display text-xs tracking-[0.25em] uppercase" style={{ color: "#C4703A" }}>06b</span>
          <div className="w-8 h-px" style={{ background: "#C4703A" }} />
          <span className="font-display text-xs tracking-[0.25em] uppercase" style={{ color: "#C4703A" }}>Component Library</span>
        </div>

        {/* Headline */}
        <h1 className="font-display uppercase leading-[1.08] tracking-tight mb-3" style={{ color: "#13100C", fontSize: 30, fontWeight: 800, maxWidth: 1100 }}>
          Thirteen component sets.{" "}
          <span style={{ color: "#C4703A" }}>All token-bound. All matching live code.</span>
        </h1>

        {/* Sub */}
        <p className="font-body leading-relaxed mb-6" style={{ color: "#6B6560", fontSize: 13, maxWidth: 1000 }}>
          Buttons, cards, choice rows, three-state questions, tags, callouts. Every fill, stroke, and corner radius binds to a variable. Switch the color collection between Light and Dark, every variant follows.
        </p>

        {/* Component grid */}
        <div className="flex gap-6 flex-1">

          {/* LEFT COLUMN — interactive components */}
          <div className="flex flex-col gap-5" style={{ flex: "1 1 0", minWidth: 0 }}>

            {/* Buttons */}
            <div>
              <p className="font-display tracking-[0.15em] uppercase mb-2" style={{ color: "#6B6560", fontSize: 10, fontWeight: 700 }}>Buttons · 5 states · matches /components/Button.tsx</p>
              <div className="flex items-center gap-4 px-3 py-3">
                {buttonStates.map((b) => (
                  <div key={b.label} style={{ position: "relative" }}>
                    <div
                      className="rounded-sm px-4 py-2"
                      style={{
                        background: b.bg,
                        opacity:    b.opacity,
                        outline:    b.ring ? "2px solid #112840" : "none",
                        outlineOffset: b.ring ? "2px" : 0,
                        boxShadow:  b.shadow ? "0 2px 6px rgba(0,0,0,0.12)" : b.pressed ? "inset 0 1px 2px rgba(0,0,0,0.18)" : "none",
                      }}
                    >
                      <span className="font-body font-semibold" style={{ fontSize: 12, color: b.textColor }}>Solid</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Choice Row */}
            <div>
              <p className="font-display tracking-[0.15em] uppercase mb-2" style={{ color: "#6B6560", fontSize: 10, fontWeight: 700 }}>Choice row · matches /assessment binary item</p>
              <div className="flex items-center gap-3 px-3 py-3" style={{ background: "#F4F2F0", border: "1px solid #DDC8BB" }}>
                <div className="flex items-center justify-center" style={{ width: 18, height: 18, background: "#C4703A", border: "1.5px solid #C4703A", borderRadius: 2 }}>
                  <span style={{ color: "#FFFFFF", fontSize: 11, fontWeight: 700, lineHeight: 1 }}>✓</span>
                </div>
                <span className="font-body" style={{ fontSize: 13, color: "#13100C" }}>Toenails thicker or yellowing. Pain when wearing shoes.</span>
              </div>
            </div>

            {/* Three-state question */}
            <div>
              <p className="font-display tracking-[0.15em] uppercase mb-2" style={{ color: "#6B6560", fontSize: 10, fontWeight: 700 }}>Three-state question · matches /assessment pain section</p>
              <div className="px-3 py-3 flex flex-col gap-2" style={{ background: "#F4F2F0", border: "1px solid #DDC8BB" }}>
                <span className="font-body" style={{ fontSize: 13, color: "#13100C" }}>Pain or stiffness in heels first thing in the morning.</span>
                <div className="flex gap-2">
                  <span className="font-body font-bold tracking-[0.08em] px-2.5 py-1" style={{ fontSize: 10, color: "#FFFFFF", background: "#C4703A" }}>YES</span>
                  <span className="font-body font-bold tracking-[0.08em] px-2.5 py-1" style={{ fontSize: 10, color: "#6B6560", background: "#FFFFFF", border: "1px solid #B7B2AE" }}>NO</span>
                  <span className="font-body font-bold tracking-[0.08em] px-2.5 py-1" style={{ fontSize: 10, color: "#6B6560", background: "#FFFFFF", border: "1px solid #B7B2AE" }}>NOT SURE</span>
                </div>
              </div>
            </div>

            {/* Callout */}
            <div>
              <p className="font-display tracking-[0.15em] uppercase mb-2" style={{ color: "#6B6560", fontSize: 10, fontWeight: 700 }}>Callout · info · matches mdx/Callout.tsx</p>
              <div className="rounded-xl px-4 py-3 flex flex-col gap-1" style={{ background: "#F0F2F4", border: "1px solid #BBCDDD" }}>
                <span className="font-body font-semibold" style={{ fontSize: 12, color: "#091016" }}>Note</span>
                <p className="font-body leading-snug" style={{ fontSize: 11, color: "#6B6560" }}>This is a guide, not a diagnosis. If symptoms are severe, talk to a clinician.</p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN — surfaces */}
          <div className="flex flex-col gap-5" style={{ flex: "1 1 0", minWidth: 0 }}>

            {/* Tags */}
            <div>
              <p className="font-display tracking-[0.15em] uppercase mb-2" style={{ color: "#6B6560", fontSize: 10, fontWeight: 700 }}>Tag · 3 variants · matches Card.tsx eyebrow</p>
              <div className="flex items-center gap-2 px-3 py-3">
                <span className="font-body font-bold tracking-[0.10em] px-2.5 py-1" style={{ fontSize: 9, color: "#8C4520", background: "#F4F2F0" }}>NAIL HEALTH</span>
                <span className="font-body font-bold tracking-[0.10em] px-2.5 py-1" style={{ fontSize: 9, color: "#091016", background: "#FFFFFF", border: "1px solid #B7B2AE" }}>FEATURED</span>
                <span className="font-body font-bold tracking-[0.10em] px-2.5 py-1" style={{ fontSize: 9, color: "#1C3F5E", background: "#F0F2F4" }}>ROUTINES</span>
              </div>
            </div>

            {/* Card */}
            <div>
              <p className="font-display tracking-[0.15em] uppercase mb-2" style={{ color: "#6B6560", fontSize: 10, fontWeight: 700 }}>Card · matches Card.tsx</p>
              <div className="flex flex-col" style={{ background: "#FFFFFF", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                <div style={{ height: 140, background: "linear-gradient(135deg, #D6D3D1 0%, #B7B2AE 100%)" }} />
                <div className="px-5 py-4 flex flex-col gap-2">
                  <span className="font-body font-bold tracking-[0.10em] px-2 py-0.5 self-start" style={{ fontSize: 9, color: "#8C4520", background: "#F4F2F0" }}>NAIL HEALTH</span>
                  <h3 className="font-display uppercase leading-tight" style={{ fontSize: 18, color: "#13100C", fontWeight: 800 }}>What actually works for toenail thickening</h3>
                  <p className="font-body leading-snug" style={{ fontSize: 11, color: "#6B6560" }}>After 40, nails change. Most thickening is mechanical, not fungal.</p>
                  <p className="font-body font-semibold mt-1" style={{ fontSize: 11, color: "#1C3F5E" }}>Read the guide →</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* WHAT SHIPS callout */}
        <div className="mt-5 rounded-lg flex items-center gap-4 px-5 py-3" style={{ background: "#FFFFFF", border: "1px solid rgba(196,112,58,0.25)" }}>
          <div style={{ width: 3, height: 28, background: "#C4703A", flexShrink: 0 }} />
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <span className="font-display tracking-[0.14em] uppercase" style={{ fontSize: 9, color: "#C4703A", fontWeight: 700 }}>What ships</span>
            <p className="font-body leading-snug" style={{ fontSize: 12, color: "#13100C" }}>167 color tokens · 25 spacings · 8 radii · 19 type styles · Light + Dark · 13 component sets. Reconciled against the production codebase.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
