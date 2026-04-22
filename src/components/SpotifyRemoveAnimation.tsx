"use client";

/**
 * SpotifyRemoveAnimation
 * ─────────────────────────────────────────────────────────────────────────────
 * Prototype-style looping animation of the Remove flow. Composed from user-
 * supplied PNG layers:
 *
 *   • spotify-background-action.webp   Frame 1 / 2 base (shelf with Madonna)
 *   • spotify-background-result.webp   Frame 3 base (shelf after removal)
 *   • spotify-overlay.webp             Dim overlay (fades in during Frame 2)
 *   • spotify-tray.webp                Action sheet (slides up / down)
 *   • spotify-cursor.png              Hand pointer (animated position)
 *
 * Plus one HTML element — the Undo toast — with a white background and
 * black text per the spec.
 *
 * 18-second cycle:
 *
 *   0.0 – 2.5s    FRAME 1   Default shelf visible. Cursor off-screen.
 *   2.5 – 4.0s    Cursor enters and lands on Madonna.
 *   4.0 – 5.8s    Long-press hold on Madonna (~1.8s at 0.9 scale).
 *   5.8 – 7.2s    Overlay fades in; tray slides up slowly.
 *   7.2 – 8.1s    Cursor briefly lingers over Madonna while tray settles.
 *   8.1 – 9.4s    Cursor moves down to "Remove from Recently Played".
 *   9.4 – 9.9s    Tap (cursor scales down and back).
 *   9.9 – 10.8s   Tray slides down, overlay fades, shelf crossfades to
 *                 after-remove. Cursor fades out.
 *  10.8 – 11.7s   Undo toast slides up (white background, black letters).
 *  11.7 – 15.8s   FRAME 3   Toast + clean shelf held. Annotation appears.
 *  15.8 – 16.9s   Reset: shelf returns, toast slides out.
 *  16.9 – 18.0s   Pause before the next loop.
 */

import Image from "next/image";

type Props = {
  /**
   * "full" (default) — iPhone frame + annotations + caption. For case study embeds.
   * "bare"            — just the screen with soft rounded corners and shadow.
   *                    No phone bezel, no annotations, no caption.
   *                    For hero embeds or compact spots.
   */
  variant?: "full" | "bare";
};

export default function SpotifyRemoveAnimation({ variant = "full" }: Props) {
  const isBare = variant === "bare";
  return (
    <>
      <style>{`
        /* ===== Keyframes ===================================================== */

        /* Shelf layers are cut, not crossfaded.
           A crossfade between similar shelf images (even a fast one) briefly shows
           both at ~0.5 opacity — the composite reads as a ghosted/darkened frame.
           Using adjacent keyframes (0.01% = ~1.8ms) forces a sub-frame snap so
           only one shelf image is ever visible. */

        /* Frame 1 base — default shelf (trigger), Madonna normal.
           Snaps off at press (27%), snaps back on at reset (88%). */
        @keyframes spra-base {
          0%, 27%        { opacity: 1; }
          27.01%, 87.99% { opacity: 0; }
          88%, 100%      { opacity: 1; }
        }

        /* During long-press — Madonna highlighted (action state).
           Snaps on at press (27%), snaps off at Remove tap (56%). */
        @keyframes spra-highlight {
          0%, 27%      { opacity: 0; }
          27.01%, 56%  { opacity: 1; }
          56.01%, 100% { opacity: 0; }
        }

        /* Frame 3 — shelf without Madonna (result).
           Snaps on at tap (56%), snaps off at reset (88%). */
        @keyframes spra-after {
          0%, 56%        { opacity: 0; }
          56.01%, 87.99% { opacity: 1; }
          88%, 100%      { opacity: 0; }
        }

        /* Dim overlay — rises WITH the highlight (no dead zone between press and dim),
           and fades out in sync with the tray slide-down. */
        @keyframes spra-overlay {
          0%, 27%   { opacity: 0; }
          32%, 55%  { opacity: 1; }
          62%, 100% { opacity: 0; }
        }

        /* Tray — slides up slowly, holds, slides down.
           Starts rising with the overlay fade-in so they arrive together. */
        @keyframes spra-tray {
          0%, 30%   { transform: translateY(100%); }
          40%, 55%  { transform: translateY(0%); }
          62%, 100% { transform: translateY(100%); }
        }

        /* Undo toast — slides up after shelf reflow */
        @keyframes spra-toast {
          0%, 60%   { transform: translateY(200%); opacity: 0; }
          65%, 88%  { transform: translateY(0%);   opacity: 1; }
          94%, 100% { transform: translateY(200%); opacity: 0; }
        }

        /* Cursor — appears early, slides slowly to Madonna, taps lower on Remove */
        @keyframes spra-cursor {
          0%        { left: 74%; top: 100%; transform: scale(1);    opacity: 0; }
          4%        { left: 74%; top: 100%; transform: scale(1);    opacity: 1; } /* appears at 0.72s */
          24%       { left: 22%; top: 22%;  transform: scale(1);    opacity: 1; } /* arrives on Madonna (20% transit = 3.6s) */
          27%       { left: 22%; top: 22%;  transform: scale(0.9);  opacity: 1; } /* press down → triggers highlight */
          37%       { left: 22%; top: 22%;  transform: scale(0.9);  opacity: 1; } /* long-press hold */
          42%       { left: 22%; top: 22%;  transform: scale(1);    opacity: 1; } /* release as tray rises */
          45%       { left: 22%; top: 22%;  transform: scale(1);    opacity: 1; } /* brief linger */
          54%       { left: 24%; top: 70%;  transform: scale(1);    opacity: 1; } /* move to Remove (9% transit) */
          56%       { left: 24%; top: 70%;  transform: scale(0.85); opacity: 1; } /* tap */
          58%       { left: 24%; top: 70%;  transform: scale(1);    opacity: 1; }
          62%       { left: 24%; top: 70%;  transform: scale(1);    opacity: 0; } /* fade out */
          100%      { left: 74%; top: 100%; transform: scale(1);    opacity: 0; }
        }

        /* Annotations */
        @keyframes spra-ann2 {
          0%, 36%   { opacity: 0; transform: translateX(-6px); }
          42%, 55%  { opacity: 1; transform: translateX(0); }
          60%, 100% { opacity: 0; transform: translateX(-6px); }
        }
        @keyframes spra-ann3 {
          0%, 68%   { opacity: 0; transform: translateX(-6px); }
          74%, 88%  { opacity: 1; transform: translateX(0); }
          93%, 100% { opacity: 0; transform: translateX(-6px); }
        }

        /* ===== Layout ======================================================== */
        .spra-root {
          display: flex;
          gap: clamp(24px, 4vw, 56px);
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          width: 100%;
          padding: clamp(16px, 3vw, 32px) 0;
        }

        /* Bare variant — just the screen, no phone chrome */
        .spra-bare {
          position: relative;
          width: clamp(220px, 30vw, 300px);
          aspect-ratio: 390 / 844;
          background: #000;
          border-radius: 28px;
          overflow: hidden;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.05) inset,
            0 18px 50px rgba(0,0,0,0.18),
            0 6px 16px rgba(0,0,0,0.10);
        }

        /* iPhone frame */
        .spra-phone {
          position: relative;
          width: clamp(240px, 40vw, 300px);
          aspect-ratio: 390 / 844;
          background: #0A0A0A;
          border-radius: 42px;
          padding: 10px;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.06),
            0 20px 60px rgba(0,0,0,0.4),
            0 8px 20px rgba(0,0,0,0.25);
          flex-shrink: 0;
        }
        .spra-island {
          position: absolute;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          width: 28%;
          height: 22px;
          background: #000;
          border-radius: 999px;
          z-index: 30;
        }
        .spra-screen {
          position: relative;
          width: 100%;
          height: 100%;
          background: #000;
          border-radius: 34px;
          overflow: hidden;
        }

        /* Background layers */
        .spra-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .spra-base      { animation: spra-base      18s infinite; z-index: 1; }
        .spra-highlight { animation: spra-highlight 18s infinite; opacity: 0; z-index: 2; }
        .spra-after     { animation: spra-after     18s infinite; opacity: 0; z-index: 3; }

        /* Dim overlay */
        .spra-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          animation: spra-overlay 18s ease-in-out infinite;
          z-index: 5;
          pointer-events: none;
        }

        /* Tray — sits at the bottom, slides in from below */
        .spra-tray {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          /* Tray aspect: ~780 × 890. Height relative to screen: ~52% */
          height: 52%;
          transform: translateY(100%);
          animation: spra-tray 18s cubic-bezier(0.22, 0.61, 0.36, 1) infinite;
          z-index: 10;
        }
        .spra-tray img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: bottom;
        }

        /* Undo toast — white bg, black text */
        .spra-toast {
          position: absolute;
          left: 3%;
          right: 3%;
          bottom: 13%;
          background: #FFFFFF;
          border-radius: 9px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          opacity: 0;
          transform: translateY(200%);
          animation: spra-toast 18s cubic-bezier(0.22, 0.61, 0.36, 1) infinite;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
          z-index: 12;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", var(--font-dm-sans), sans-serif;
        }
        .spra-toast-text {
          color: #000000;
          font-size: 10px;
          font-weight: 600;
        }
        .spra-toast-undo {
          color: #000000;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0;
          padding: 3px 10px;
          border: 1px solid rgba(0,0,0,0.35);
          border-radius: 999px;
          flex-shrink: 0;
        }

        /* Cursor — ease-out expo curve gives a natural "fast off, settle in" feel */
        .spra-cursor {
          position: absolute;
          width: 28px;
          height: 28px;
          transform-origin: 35% 15%; /* fingertip area */
          pointer-events: none;
          opacity: 0;
          animation: spra-cursor 18s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          z-index: 20;
          filter: drop-shadow(0 3px 6px rgba(0,0,0,0.5));
        }
        .spra-cursor img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* Annotations outside the phone */
        .spra-annotations {
          position: relative;
          width: clamp(200px, 30vw, 300px);
          min-height: 240px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 32px;
          font-family: var(--font-dm-sans), -apple-system, sans-serif;
        }
        .spra-ann {
          position: relative;
          padding-left: 18px;
          border-left: 2px solid #1DB954;
          opacity: 0;
          transform: translateX(-6px);
        }
        .spra-ann-2 { animation: spra-ann2 18s infinite; }
        .spra-ann-3 { animation: spra-ann3 18s infinite; }
        .spra-ann-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #1DB954;
          margin-bottom: 8px;
        }
        .spra-ann-title {
          font-family: var(--font-dm-serif-display), Georgia, serif;
          font-size: clamp(17px, 2.2vw, 22px);
          line-height: 1.3;
          color: #F5F5F4;
          letter-spacing: -0.005em;
          margin: 0;
        }
        .spra-ann-sub {
          margin-top: 8px;
          font-size: 13px;
          line-height: 1.5;
          color: rgba(245,243,239,0.55);
        }

        .spra-caption {
          width: 100%;
          text-align: center;
          margin-top: 18px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(245,243,239,0.35);
          font-family: var(--font-dm-sans), sans-serif;
        }

        /* Note: prefers-reduced-motion freeze intentionally omitted.
           iOS Low Power Mode forces the reduce-motion media query ON,
           which would hide the prototype animation for any visitor with
           a yellow battery indicator. Since this animation IS the case
           study content (it demonstrates the UX decision), freezing it
           would strip the page of its point. The motion is slow, contained,
           loops over 18s, and has no parallax/zoom/flashing — low vestibular
           risk. Users who need motion stopped can pause the tab or scroll past. */
      `}</style>

      {isBare ? (
        <div className="spra-bare" aria-label="Animated prototype: Remove interaction on Spotify Recently Played">
          <Screen />
        </div>
      ) : (
        <div className="spra-root">
          <div className="spra-phone" aria-label="Animated prototype of the Remove interaction">
            <div className="spra-island" aria-hidden />
            <div className="spra-screen">
              <Screen />
            </div>
          </div>
          <div className="spra-annotations">
            <div className="spra-ann spra-ann-2">
              <div className="spra-ann-eyebrow">Frame 2</div>
              <h4 className="spra-ann-title">One surface, three controls.</h4>
              <p className="spra-ann-sub">
                Long-press reveals Pin, Pause, and Remove in a single iOS-native action sheet. Same entry point for every interaction.
              </p>
            </div>
            <div className="spra-ann spra-ann-3">
              <div className="spra-ann-eyebrow">Frame 3</div>
              <h4 className="spra-ann-title">Undo safety net. Device-scoped, not global.</h4>
              <p className="spra-ann-sub">
                The item is hidden, not deleted. Removal is scoped to this device. The toast makes the action reversible for 3&ndash;4 seconds. No trash layer needed.
              </p>
            </div>
          </div>
          <p className="spra-caption">Loops every 18 seconds</p>
        </div>
      )}
    </>
  );
}

/** Shared inner screen content used by both "full" and "bare" variants. */
function Screen() {
  return (
    <>
      {/* Frame 1 base — default shelf, Madonna normal */}
      <Image
        src="/images/work/spotify/spotify-background-trigger.webp"
        alt=""
        aria-hidden
        fill
        sizes="(max-width: 767px) 90vw, 300px"
        className="spra-layer spra-base"
        priority
      />
      {/* During press — Madonna highlighted */}
      <Image
        src="/images/work/spotify/spotify-background-action.webp"
        alt=""
        aria-hidden
        fill
        sizes="(max-width: 767px) 90vw, 300px"
        className="spra-layer spra-highlight"
      />
      {/* Frame 3 — shelf without Madonna */}
      <Image
        src="/images/work/spotify/spotify-background-result.webp"
        alt=""
        aria-hidden
        fill
        sizes="(max-width: 767px) 90vw, 300px"
        className="spra-layer spra-after"
      />
      <Image
        src="/images/work/spotify/spotify-overlay.webp"
        alt=""
        aria-hidden
        fill
        sizes="(max-width: 767px) 90vw, 300px"
        className="spra-overlay"
      />
      <div className="spra-tray" aria-hidden>
        <Image
          src="/images/work/spotify/spotify-tray.webp"
          alt=""
          fill
          sizes="(max-width: 767px) 90vw, 300px"
        />
      </div>
      <div className="spra-toast" aria-hidden>
        <span className="spra-toast-text">Removed from Recently Played</span>
        <span className="spra-toast-undo">Undo</span>
      </div>
      <div className="spra-cursor" aria-hidden>
        <Image
          src="/images/work/spotify/spotify-cursor.webp"
          alt=""
          width={96}
          height={96}
          sizes="28px"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    </>
  );
}
