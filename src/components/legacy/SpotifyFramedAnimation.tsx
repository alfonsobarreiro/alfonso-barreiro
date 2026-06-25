/* eslint-disable @next/next/no-img-element */

/**
 * SpotifyFramedAnimation
 * ─────────────────────────────────────────────────────────────────────────────
 * Spotify Recently Played action sheet, centered in the home Work card. No
 * device chrome, no side icons, no caption — the work-row content column
 * already carries title, description, tags, and the CTA, so this card stays
 * one clean visual: the actual work.
 */
export default function SpotifyFramedAnimation() {
  return (
    <div
      role="img"
      aria-label="Spotify Recently Played with action sheet open"
      style={{
        position:    "relative",
        width:       "100%",
        aspectRatio: "16 / 10",
        overflow:    "hidden",
        background:  "#0F0F0F",
        display:     "flex",
        alignItems:  "center",
        justifyContent: "center",
      }}
    >
      {/* Action-sheet image at its native portrait aspect, centered. The
          screenshot is already a phone-shaped capture (780 × 1711). */}
      <div style={{
        position:    "relative",
        height:      "100%",
        aspectRatio: "780 / 1711",
        flexShrink:  0,
      }}>
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
    </div>
  );
}
