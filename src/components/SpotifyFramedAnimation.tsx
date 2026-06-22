"use client";

import SpotifyRemoveAnimation from "@/components/SpotifyRemoveAnimation";

/**
 * SpotifyFramedAnimation
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps the bare Spotify Remove animation in a 16:10 landscape frame, scaled
 * up so the action sheet beat fills the visible band. Used inside the Work
 * card on the home page — the work-row image area is landscape, the phone is
 * portrait, so we zoom in on the interaction zone instead of letterboxing.
 *
 * Layout choice: phone left, caption right. The phone reads as a real device
 * mid-interaction, the caption gives the one-sentence thesis without forcing
 * the eye to stop scanning.
 */
export default function SpotifyFramedAnimation() {
  return (
    <div className="sfa-root">
      {/* Left: the phone, with bigger sizing than the hero bare variant */}
      <div className="sfa-phone-wrap">
        <SpotifyRemoveAnimation variant="bare" />
      </div>

      {/* Right: thesis caption + tiny "live demo" label */}
      <div className="sfa-caption">
        <p className="sfa-eyebrow">Live interaction · loop</p>
        <p className="sfa-thesis">
          Long-press to pin, pause, or remove. One surface, reversible.
        </p>
        <p className="sfa-meta">
          Three controls Spotify should have built already.
        </p>
      </div>

      <style>{`
        .sfa-root {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          background: #0F0F0F;
          overflow: hidden;
          display: grid;
          grid-template-columns: minmax(0, auto) minmax(0, 1fr);
          align-items: center;
          gap: clamp(20px, 3vw, 40px);
          padding: clamp(20px, 3vw, 40px);
        }

        /* Phone wrap — override the bare variant's clamp width so the phone
           scales with the row rather than topping out at 300px.
           Plain global CSS (no styled-jsx :global) so the rule applies. */
        .sfa-phone-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .sfa-phone-wrap .spra-bare {
          width: auto !important;
          height: 100% !important;
          aspect-ratio: 390 / 844 !important;
        }
        .sfa-phone-wrap .spra-root {
          padding: 0 !important;
          gap: 0 !important;
          width: auto !important;
          height: 100% !important;
          align-items: center !important;
        }

        .sfa-caption {
          color: #FAFAF9;
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 420px;
        }
        .sfa-eyebrow {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          /* var(--color-accent) is a deep teal that disappears against #0F0F0F.
             Use a brighter near-white teal instead so the label reads. */
          color: #6FE0C9;
          margin: 0;
        }
        .sfa-thesis {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: clamp(18px, 1.7vw, 23px);
          line-height: 1.45;
          font-weight: 500;
          color: #FAFAF9;
          margin: 0;
        }
        .sfa-meta {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.55;
          font-style: italic;
          color: rgba(250, 250, 249, 0.78);
          margin: 0;
        }

        /* On narrow viewports, the row collapses to a single column anyway
           (per .work-row mobile rule), but inside the framed peek we still
           want the phone visible — drop the caption when there's no room */
        @media (max-width: 540px) {
          .sfa-caption { display: none; }
          .sfa-root { grid-template-columns: 1fr; justify-items: center; }
        }
      `}</style>
    </div>
  );
}
