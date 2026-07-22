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
          /* Precise clip-path around the iPad's rounded rectangle,
             removing the baked #1F1C3B padding so the darker ground-navy
             row shows through cleanly. Values were measured from a
             frame of the source video (960x1200): the iPad occupies a
             centered 792x1098 region with 4.25% vertical and 8.75%
             horizontal insets, and the device corners fit a ~60px
             radius (6.25% of the 960px short side). The slash in the
             round value gives circular corners in the element's 4:5
             box: 6.25% of width equals ~5% of height, both mapping to
             60px at native rendering. WebkitClipPath duplicates for
             older Safari builds. */
          clipPath:       "inset(4.25% 8.75% 4.25% 8.75% round 6.25% / 5%)",
          WebkitClipPath: "inset(4.25% 8.75% 4.25% 8.75% round 6.25% / 5%)",
          display:        "block",
        }}
      >
        <source src="/cs-wayfarer-globe.webm" type="video/webm" />
        <source src="/cs-wayfarer-globe.mp4"  type="video/mp4"  />
      </video>
    </div>
  );
}
