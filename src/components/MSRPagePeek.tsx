/* eslint-disable @next/next/no-img-element */

/**
 * MSRPagePeek
 * ─────────────────────────────────────────────────────────────────────────────
 * MSR site auto-scrolling inside the Figma MacBook Pro 14" Space Gray mockup
 * (public/images/devices/macbook-pro-14.webp).
 *
 * The scroll was originally a CSS keyframe animation on the homepage screenshot.
 * That pattern was fragile on iOS Safari, so it's now baked into a 34 s loop
 * video — same approach as SpotifyFramedAnimation and the Hero iPad walkthrough.
 *
 * Layout math: the PNG is 2000×2000; the laptop's display sits at
 * (506, 650, 897, 581). The PNG renders into a 4:3 frame with width 139.4 %
 * and offsets so the chrome fills the panel; the display's frame-relative
 * coordinates become (18 %, 18 %, 64 %, 60 %).
 */
export default function MSRPagePeek({ paused: _paused = false }: { paused?: boolean }) {
  return (
    <div
      role="img"
      aria-label="Men's Sole Revival homepage on a MacBook Pro"
      style={{
        position:    "relative",
        width:       "100%",
        aspectRatio: "4 / 3",
        overflow:    "hidden",
      }}
    >
      {/* Display (above the device PNG) — looping video of the MSR
          homepage scrolling top to bottom and snapping back. Same
          autoplay-loop-muted-playsInline pattern as the Spotify
          and Hero peeks for cross-device reliability.

          Screen coords derived from the PNG bbox: with the device
          PNG at width 139.4% and top -37.5% inside a 4:3 container,
          the actual laptop screen sits at ~top 23% / height 54%.
          Prior values (top 18% / height 60%) let the video spill
          out the top of the bezel. */}
      <div
        style={{
          position:     "absolute",
          left:         "18.7%",
          top:          "23%",
          width:        "62.5%",
          height:       "54%",
          overflow:     "hidden",
          background:   "#13100C",
          borderRadius: "3px",
          zIndex:       2,
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          src="/cs-msr-page-scroll.webm"
          poster="/cs-msr-homepage.jpg"
          aria-label="Men's Sole Revival homepage scrolling from hero to footer and looping back."
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            position:       "absolute",
            inset:          0,
            width:          "100%",
            height:         "100%",
            objectFit:      "cover",
            objectPosition: "top center",
            display:        "block",
          }}
        >
          <source src="/cs-msr-page-scroll.webm" type="video/webm" />
          <source src="/cs-msr-page-scroll.mp4"  type="video/mp4"  />
        </video>
      </div>

      {/* MacBook Pro chrome (below the display) — repositioned for the new
          4:3 showroom. The MBP chrome bbox inside the 2000×2000 PNG sits at
          (506, 650, 897×581). At width 139.4 % of the frame the chrome
          renders ~62.5 % wide, with even breathing left/right and top/bottom. */}
      <img
        src="/images/devices/macbook-pro-14.webp"
        alt=""
        aria-hidden
        style={{
          position:      "absolute",
          left:          "-16.60%",
          top:           "-37.50%",
          width:         "139.40%",
          maxWidth:      "none",
          height:        "auto",
          pointerEvents: "none",
          zIndex:        1,
        }}
      />
    </div>
  );
}
