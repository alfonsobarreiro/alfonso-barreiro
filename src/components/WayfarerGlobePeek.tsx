/* eslint-disable @next/next/no-img-element */

/**
 * WayfarerGlobePeek
 * ─────────────────────────────────────────────────────────────────────────────
 * Pre-recorded walkthrough of the Wayfarer interactive globe playing one
 * full Bhutan → Lisbon → Cape Town demo cycle, baked into a 42 s loop
 * video. The original component was a live Mapbox + WebGL globe that was
 * fragile on iOS Safari (and unreliable on slower mobile connections).
 *
 * The recording was captured from the actual component running in Chrome
 * via Puppeteer, so it's the same animation the live page used to show.
 * The iPad chrome is baked into each frame — no separate PNG overlay.
 *
 * The live interactive globe still lives on the Wayfarer case study page;
 * this is just the homepage Work-section peek.
 */
export default function WayfarerGlobePeek({ paused: _paused = false }: { paused?: boolean }) {
  return (
    <div
      role="img"
      aria-label="Wayfarer interactive globe on an iPad Pro"
      style={{
        position: "relative",
        width:    "100%",
        height:   "100%",
        overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        src="/cs-wayfarer-globe.webm"
        poster="/cs-wayfarer-preview.png"
        aria-label="Wayfarer globe rotating then flying to Bhutan, Lisbon, and Cape Town in turn."
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
          objectPosition: "center",
          /* No transform crop — the outer shell is now a matching
             navy radial, so the video's baked-in navy edges are
             welcome and the row reads as one continuous field. */
          display:        "block",
        }}
      >
        <source src="/cs-wayfarer-globe.webm" type="video/webm" />
        <source src="/cs-wayfarer-globe.mp4"  type="video/mp4"  />
      </video>
    </div>
  );
}
