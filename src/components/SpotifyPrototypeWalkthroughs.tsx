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
  /** Path to an animated GIF or MP4 recording, served from /public. */
  recording?: string;
  /** Alt text describing what the recording shows. */
  recordingAlt?: string;
  steps:    { t: string; text: string }[];
};

const flows: Flow[] = [
  {
    id:       "pin",
    chip:     "PIN",
    title:    "Pin a favorite to the top",
    duration: "0:09",
    accent: {
      bar:      "#1ED760",
      chipBg:   "#D4F0DD",
      chipText: "#06451F",
      ts:       "#0C6E32",
    },
    recording:    "/images/work/spotify/pin-happy.webm",
    recordingAlt: "Pin happy path: long-press The Roses, tap Pin on top, tile moves to position 1, snackbar confirms.",
    steps: [
      { t: "0:00", text: "Instruction pill fades in: “Long-press The Roses.”" },
      { t: "0:02", text: "User taps The Roses (right column, row 2, marked by the green affordance outline)." },
      { t: "0:03", text: "Action sheet rises with a 200ms ease-out. Pill swaps to “Tap ‘Pin on top.’”" },
      { t: "0:05", text: "User taps the Pin on top row." },
      { t: "0:06", text: "Tile reflows from position 3 to position 1 in 250ms. Toast slides up: “Song pinned.” with green Undo button." },
      { t: "0:07", text: "Conclusion pill: “The Roses pinned to the top.” Loop dissolves back to start." },
    ],
  },
  {
    id:       "remove",
    chip:     "REMOVE",
    title:    "Remove an item without library impact",
    duration: "0:10",
    accent: {
      bar:      "#E22134",
      chipBg:   "#FCD9DC",
      chipText: "#7A0A14",
      ts:       "#A0151F",
    },
    recording:    "/images/work/spotify/undo-happy.webm",
    recordingAlt: "Remove flow with Undo: long-press an accidental play, tap Remove, snackbar appears, tap Undo to restore.",
    steps: [
      { t: "0:00", text: "Instruction pill fades in: “Long-press This is Madonna.”" },
      { t: "0:02", text: "User taps Madonna (left column, row 2, marked by the green affordance outline)." },
      { t: "0:03", text: "Action sheet rises. Pill swaps to “Tap ‘Remove from Recently Played.’”" },
      { t: "0:05", text: "User taps the Remove row in Accent / Red." },
      { t: "0:06", text: "Madonna’s tile fades out, shelf reflows. Toast slides up: “Removed from Recently Played.” with green Undo button." },
      { t: "0:07", text: "User taps Undo on the toast (400ms smart-animate)." },
      { t: "0:08", text: "Madonna fades back in at her original index. Conclusion pill swaps to “Removal undone.”" },
      { t: "0:09", text: "Demo dissolves back to pre-intro so the flow replays." },
    ],
  },
  {
    id:       "pause",
    chip:     "PAUSE",
    title:    "Pause history for a guest’s visit",
    duration: "0:21",
    accent: {
      bar:      "#F5B921",
      chipBg:   "#FFE9B8",
      chipText: "#5C3A00",
      ts:       "#7A4F00",
    },
    recording:    "/images/work/spotify/pause-happy.webm",
    recordingAlt: "Pause happy path: long-press Hollow Coves, toggle Pause listening history, shelf dims, snackbar confirms.",
    steps: [
      { t: "0:00", text: "Instruction pill fades in: “Long-press Hollow Coves.”" },
      { t: "0:02", text: "User taps Hollow Coves (right column, row 1, marked by the green affordance outline)." },
      { t: "0:03", text: "Action sheet rises. Pill swaps to “Toggle ‘Pause listening history.’”" },
      { t: "0:05", text: "User taps the Pause listening history row." },
      { t: "0:06", text: "Toggle crossfades from off to on in 300ms. Sheet holds 0.6s so the state change is visible." },
      { t: "0:07", text: "Sheet slides down. Shelf dims to 50% opacity. Toast slides up: “Listening history paused for 12h.” with green Undo button." },
      { t: "0:08", text: "Conclusion pill: “History paused for 12 hours.”" },
      { t: "0:10", text: "Demo dissolves back to pre-intro so the flow replays." },
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
                {flow.recording ? (
                  <div
                    style={{
                      display:        "flex",
                      alignItems:     "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    {/* Phone-bezel wrapper: hugs the recording with 4px padding so the
                        dark surround reads as a thin device bezel. */}
                    <div
                      style={{
                        background:   "#0A0A0A",
                        padding:      "4px",
                        borderRadius: "28px",
                        boxShadow:    "0 8px 32px rgba(0,0,0,0.25)",
                        display:      "inline-block",
                      }}
                    >
                      {/* Auto-detect file type. MP4/WebM use <video> for crisp playback;
                          GIF falls back to a plain <img> tag so Next.js does not strip the animation. */}
                      {/\.(mp4|webm|mov)$/i.test(flow.recording) ? (
                        <video
                          src={flow.recording}
                          autoPlay
                          loop
                          muted
                          playsInline
                          aria-label={flow.recordingAlt ?? `${flow.chip} walkthrough`}
                          style={{
                            display:      "block",
                            width:        "clamp(157px, 16vw, 202px)",
                            height:       "auto",
                            borderRadius: "24px",
                          }}
                        />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={flow.recording}
                          alt={flow.recordingAlt ?? `${flow.chip} walkthrough`}
                          style={{
                            display:      "block",
                            width:        "clamp(157px, 16vw, 202px)",
                            height:       "auto",
                            borderRadius: "24px",
                          }}
                        />
                      )}
                    </div>
                  </div>
                ) : (
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
                )}

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
