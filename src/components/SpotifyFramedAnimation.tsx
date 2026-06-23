/* eslint-disable @next/next/no-img-element */

/**
 * SpotifyFramedAnimation
 * ─────────────────────────────────────────────────────────────────────────────
 * Spotify Recently Played action sheet rendered inside a real iPhone 13
 * (Figma-sourced Apple device PNG). No side icon column, no side caption —
 * the work-row content column already carries title, description, tags, and
 * the CTA, so this card stays one moment: the device with the work on it.
 */

/* Screen area inside /devices/iphone.png (1:1 mockup). Portrait iPhone sits
   centered; screen is ~32% × 69% of the canvas. */
const SCREEN = {
  topPct:    15.4,
  leftPct:   33.4,
  widthPct:  33.2,
  heightPct: 69.0,
};

export default function SpotifyFramedAnimation() {
  return (
    <div
      role="img"
      aria-label="Spotify Recently Played action sheet on an iPhone"
      style={{
        position:    "relative",
        width:       "100%",
        aspectRatio: "16 / 10",
        overflow:    "hidden",
        background:  "#252628",
        display:     "flex",
        alignItems:  "center",
        justifyContent: "center",
      }}
    >
      <div style={{
        position:    "relative",
        height:      "100%",
        aspectRatio: "1 / 1",
        flexShrink:  0,
      }}>
        {/* Screen content under the iPhone chrome */}
        <div
          style={{
            position:   "absolute",
            top:        `${SCREEN.topPct}%`,
            left:       `${SCREEN.leftPct}%`,
            width:      `${SCREEN.widthPct}%`,
            height:     `${SCREEN.heightPct}%`,
            overflow:   "hidden",
            background: "#000",
            zIndex:     1,
          }}
        >
          <img
            src="/images/work/spotify/spotify-action-sheet.webp"
            alt="Long-press an item on the Spotify Recently Played shelf opens an action sheet with Pin, Remove, and Pause Listening History."
            loading="lazy"
            decoding="async"
            style={{
              position:       "absolute",
              inset:          0,
              width:          "100%",
              height:         "100%",
              objectFit:      "cover",
              objectPosition: "top center",
              display:        "block",
            }}
          />
        </div>

        {/* iPhone mockup PNG on top */}
        <img
          src="/devices/iphone.png"
          alt=""
          style={{
            position:      "absolute",
            inset:         0,
            width:         "100%",
            height:        "100%",
            objectFit:     "contain",
            zIndex:        2,
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
