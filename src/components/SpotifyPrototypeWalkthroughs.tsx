const c = {
  ink:         "#252B28",
  body:        "#3D4440",
  muted:       "#8A8680",
  bgSection:   "#F5F5F5",
  cardBg:      "#FFFFFF",
  border:      "#E5E5E4",
  borderStrong:"#A99B8A",
};

const font = {
  display: "var(--font-dm-serif-display), Georgia, serif",
  sans:    "var(--font-dm-sans), -apple-system, sans-serif",
};

type Flow = {
  id:       "pin" | "remove" | "pause";
  chip:     string;
  title:    string;
  duration: string;
  accent:   { bar: string; chipBg: string; chipText: string; ts: string };
  embed?:   string;
  steps:    { t: string; text: string }[];
};

const flows: Flow[] = [
  {
    id:       "pin",
    chip:     "PIN",
    title:    "Pin a favorite to the top",
    duration: "0:38",
    accent: {
      bar:      "#1ED760",
      chipBg:   "#D4F0DD",
      chipText: "#06451F",
      ts:       "#0C6E32",
    },
    steps: [
      { t: "0:00", text: "Recently Played shelf in default state, six tiles visible." },
      { t: "0:04", text: "Long-press on the third tile. Action sheet rises with a 200ms ease-out." },
      { t: "0:09", text: "Pin row highlighted. Tap commits the action." },
      { t: "0:11", text: "Tile animates from position 3 to position 1 in 250ms. Adjacent tiles reflow." },
      { t: "0:15", text: "Snackbar appears: “Song pinned.” with Undo button. 5s timer visible." },
      { t: "0:20", text: "Snackbar dismisses. Pin chip persists on the tile at position 1." },
      { t: "0:28", text: "Cap-reached state shown briefly: 5th pin attempt → Pin row visibly Disabled with inline microcopy." },
    ],
  },
  {
    id:       "remove",
    chip:     "REMOVE",
    title:    "Remove an item without library impact",
    duration: "0:32",
    accent: {
      bar:      "#E22134",
      chipBg:   "#FCD9DC",
      chipText: "#7A0A14",
      ts:       "#A0151F",
    },
    steps: [
      { t: "0:00", text: "Recently Played shelf with an accidental play visible." },
      { t: "0:03", text: "Long-press → action sheet opens. Remove row in Accent / Red." },
      { t: "0:08", text: "Tap Remove. Tile collapses with a 250ms ease-out." },
      { t: "0:10", text: "Snackbar: “Removed from Recently Played.” + Undo, 5s timer." },
      { t: "0:14", text: "Undo path: tap Undo → tile re-enters at original index." },
      { t: "0:22", text: "Timeout path: 5s expires, removal commits. Tile gone." },
      { t: "0:28", text: "Library check: open Liked Songs / playlist; track is still there. Device-scoped scope made visible." },
    ],
  },
  {
    id:       "pause",
    chip:     "PAUSE",
    title:    "Pause history for a guest’s visit",
    duration: "0:44",
    accent: {
      bar:      "#F5B921",
      chipBg:   "#FFE9B8",
      chipText: "#5C3A00",
      ts:       "#7A4F00",
    },
    steps: [
      { t: "0:00", text: "Recently Played shelf in default state." },
      { t: "0:04", text: "Long-press → action sheet. Pause toggle row visible." },
      { t: "0:08", text: "Toggle on. 200ms toggle animation." },
      { t: "0:10", text: "Snackbar: “Listening history paused for 12h.” + Undo." },
      { t: "0:14", text: "Shelf dims to 50% opacity. “Paused” chip appears in shelf header." },
      { t: "0:22", text: "Time-skip 12h. Auto-resume snackbar at top of shelf: “Listening history resumed.”" },
      { t: "0:30", text: "Tiles re-saturate. Chip disappears from header." },
      { t: "0:38", text: "User-toggle-off path shown alternately: user opens sheet, toggles off, resume happens instantly." },
    ],
  },
];

export default function SpotifyPrototypeWalkthroughs() {
  return (
    <div
      style={{
        background:   c.bgSection,
        borderTop:    `1px solid ${c.borderStrong}`,
        borderBottom: `1px solid ${c.borderStrong}`,
        padding:      "72px clamp(24px, 5vw, 80px)",
        marginTop:    "48px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Eyebrow */}
        <p
          style={{
            fontFamily:    font.sans,
            fontSize:      "11px",
            fontWeight:    600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color:         c.muted,
            margin:        "0 0 16px",
          }}
        >
          Prototype Walkthroughs
        </p>

        {/* Section title */}
        <h2
          style={{
            fontFamily:    font.display,
            fontSize:      "clamp(28px, 4vw, 44px)",
            fontWeight:    400,
            color:         c.ink,
            margin:        "0 0 48px",
            letterSpacing: "-0.025em",
            lineHeight:    1.15,
            maxWidth:      "720px",
          }}
        >
          Three controls. Each one walked through end to end.
        </h2>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {flows.map((flow) => (
            <article
              key={flow.id}
              style={{
                background:    c.cardBg,
                borderRadius:  "12px",
                borderLeft:    `6px solid ${flow.accent.bar}`,
                boxShadow:     "0 4px 12px rgba(0,0,0,0.08)",
                padding:       "clamp(24px, 3vw, 40px)",
                display:       "flex",
                flexDirection: "column",
                gap:           "24px",
              }}
              aria-labelledby={`walkthrough-${flow.id}-title`}
            >

              {/* Header row */}
              <header
                style={{
                  display:    "flex",
                  alignItems: "center",
                  gap:        "16px",
                  flexWrap:   "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily:    font.sans,
                    fontSize:      "11px",
                    fontWeight:    700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color:         flow.accent.chipText,
                    background:    flow.accent.chipBg,
                    padding:       "4px 10px",
                    borderRadius:  "999px",
                  }}
                >
                  {flow.chip}
                </span>

                <h3
                  id={`walkthrough-${flow.id}-title`}
                  style={{
                    fontFamily:    font.display,
                    fontSize:      "clamp(22px, 2.6vw, 30px)",
                    fontWeight:    400,
                    color:         c.ink,
                    margin:        0,
                    letterSpacing: "-0.02em",
                    lineHeight:    1.15,
                    flex:          1,
                  }}
                >
                  {flow.title}
                </h3>

                <span
                  style={{
                    fontFamily:    font.sans,
                    fontSize:      "13px",
                    fontWeight:    600,
                    fontVariantNumeric: "tabular-nums",
                    color:         c.muted,
                    letterSpacing: "0.04em",
                  }}
                  aria-label={`Runtime ${flow.duration}`}
                >
                  {flow.duration}
                </span>
              </header>

              {/* Body grid */}
              <div
                className="cs-walkthrough-grid"
                style={{
                  display:             "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap:                 "clamp(20px, 3vw, 40px)",
                  alignItems:          "start",
                }}
              >

                {/* Recording slot */}
                <div
                  style={{
                    border:         `1px dashed ${flow.accent.bar}66`,
                    borderRadius:   "8px",
                    aspectRatio:    "16 / 10",
                    display:        "flex",
                    flexDirection:  "column",
                    alignItems:     "center",
                    justifyContent: "center",
                    gap:            "12px",
                    background:     `linear-gradient(180deg, ${flow.accent.chipBg}26 0%, transparent 100%)`,
                    padding:        "24px",
                    textAlign:      "center",
                  }}
                  role="img"
                  aria-label={`Prototype recording placeholder for ${flow.chip.toLowerCase()} flow`}
                >
                  <span
                    style={{
                      fontFamily:    font.sans,
                      fontSize:      "11px",
                      fontWeight:    700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color:         c.muted,
                    }}
                  >
                    Prototype Recording
                  </span>
                  <span
                    style={{
                      fontFamily: font.sans,
                      fontSize:   "13px",
                      lineHeight: 1.5,
                      color:      c.body,
                      maxWidth:   "320px",
                    }}
                  >
                    Capture from the interactive Figma prototype. Linked from the case study.
                  </span>
                </div>

                {/* Annotations */}
                <div>
                  <p
                    style={{
                      fontFamily:    font.sans,
                      fontSize:      "11px",
                      fontWeight:    600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color:         c.muted,
                      margin:        "0 0 16px",
                    }}
                  >
                    What the walkthrough shows
                  </p>

                  <ol
                    style={{
                      listStyle: "none",
                      margin:    0,
                      padding:   0,
                      display:   "flex",
                      flexDirection: "column",
                      gap:       "10px",
                    }}
                  >
                    {flow.steps.map((step, i) => (
                      <li
                        key={i}
                        style={{
                          display:    "grid",
                          gridTemplateColumns: "48px 1fr",
                          gap:        "16px",
                          alignItems: "baseline",
                        }}
                      >
                        <span
                          style={{
                            fontFamily:    font.sans,
                            fontSize:      "12px",
                            fontWeight:    700,
                            fontVariantNumeric: "tabular-nums",
                            color:         flow.accent.ts,
                            letterSpacing: "0.02em",
                          }}
                        >
                          {step.t}
                        </span>
                        <span
                          style={{
                            fontFamily: font.sans,
                            fontSize:   "14px",
                            lineHeight: 1.55,
                            color:      c.body,
                          }}
                        >
                          {step.text}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Mobile responsive override */}
      <style>{`
        @media (max-width: 760px) {
          .cs-walkthrough-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
