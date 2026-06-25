/* eslint-disable @next/next/no-img-element */

/**
 * SpotifyFramedAnimation
 * ─────────────────────────────────────────────────────────────────────────────
 * Spotify Recently Played pin-happy.webm inside the Figma iPhone mockup
 * (public/images/devices/iphone.png).
 *
 * The peek fills the parent 4:5 card frame (set in Work.tsx). The iPhone
 * PNG is scaled to ~60 % of the panel width so it reads as a real device;
 * screen overlay matches the iPhone screen rectangle inside the PNG.
 */
export default function SpotifyFramedAnimation() {
  return (
    <div
      role="img"
      aria-label="Spotify Recently Played action sheet on an iPhone"
      style={{
        position: "relative",
        width:    "100%",
        height:   "100%",
        overflow: "hidden",
      }}
    >
      {/* Display (above the device PNG) — pin-happy webm fills the screen.
          iPhone scaled to 40 % of panel width so the device reads as a
          phone you can actually see. Overlay tightened ~1 pp inside the
          iPhone body on each side for sub-pixel safety. */}
      <div
        style={{
          position:     "absolute",
          left:         "24.46%",
          top:          "13.02%",
          width:        "51.01%",
          height:       "72.10%",
          overflow:     "hidden",
          borderRadius: "5.5%",
          background:   "#0F0F0F",
          zIndex:       2,
        }}
      >
        <video
          src="/images/work/spotify/pin-happy.webm"
          poster="/images/work/spotify/spotify-action-sheet.webp"
          aria-label="Long-press an item on the Spotify Recently Played shelf opens an action sheet; tapping Pin moves it to the top."
          autoPlay
          loop
          muted
          playsInline
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

      {/* iPhone chrome (below the display) */}
      {/* Ambient halo behind the iPhone — soft warm-white glow centered
          below the device so the iPhone reads as if sitting on a lit studio
          surface instead of floating on a flat dark plane. */}
      <div
        aria-hidden
        style={{
          position:      "absolute",
          left:          "0",
          top:           "50%",
          width:         "100%",
          height:        "70%",
          background:    "radial-gradient(ellipse 55% 45% at 50% 55%, rgba(255, 248, 235, 0.08) 0%, rgba(255, 248, 235, 0.03) 45%, transparent 75%)",
          pointerEvents: "none",
          zIndex:        0,
        }}
      />

      <img
        src="/images/devices/iphone-cropped.png"
        alt=""
        aria-hidden
        style={{
          position:      "absolute",
          left:          "21.96%",
          top:           "11.74%",
          width:         "56.09%",
          height:        "auto",
          maxWidth:      "none",
          pointerEvents: "none",
          zIndex:        1,
        }}
      />
    </div>
  );
}
