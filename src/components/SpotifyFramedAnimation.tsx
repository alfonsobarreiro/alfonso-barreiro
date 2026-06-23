/* eslint-disable @next/next/no-img-element */

/**
 * SpotifyFramedAnimation
 * ─────────────────────────────────────────────────────────────────────────────
 * Home page Spotify Work card visual. Mirrors the case study hero treatment
 * so the click-through feels visually continuous:
 *
 *   #6E6E6E mat with the action-sheet phone on the left + three icon badges
 *   stacked on the right (Pin / Remove / Pause), no caption text — the work
 *   row's content column carries title + thesis + tags + CTA already.
 *
 * The live looping animation was swapped out because at thumb size (~166×359
 * inside a 702×439 frame) the motion didn't register and the phone read as
 * a small screenshot. A single bold still + the three colored icons reads in
 * one glance and ties to the case study hero.
 *
 * Name kept (still imported as SpotifyFramedAnimation by Work.tsx) — only the
 * inside changed.
 */
export default function SpotifyFramedAnimation() {
  return (
    <div className="sfa-root">
      {/* Phone with full device chrome — matte bezel, dynamic-island
          notch, home indicator. Reads as a real iPhone presenting the
          interaction, not a flat screenshot. */}
      <div className="sfa-phone">
        <div className="sfa-phone-notch" aria-hidden />
        <div className="sfa-phone-screen">
          <img
            src="/images/work/spotify/spotify-action-sheet.webp"
            alt="Long-press an item on the Spotify Recently Played shelf opens an action sheet with Pin, Remove, and Pause Listening History."
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="sfa-phone-home" aria-hidden />
      </div>

      {/* Icon column — three control badges, same family as the case study */}
      <div className="sfa-icons">
        <IconCell color="#1ED760" glyph={<PinGlyph />}    name="Pin"    note="Keep a favorite at the front" />
        <IconCell color="#E26F5B" glyph={<RemoveGlyph />} name="Remove" note="Hide without deleting" />
        <IconCell color="#9CA3AF" glyph={<PauseGlyph />}  name="Pause"  note="Time-boxed only" />
      </div>

      <style>{`
        .sfa-root {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          background: #6E6E6E;
          overflow: hidden;
          display: grid;
          grid-template-columns: minmax(0, auto) minmax(0, 1fr);
          align-items: center;
          gap: clamp(20px, 3.5vw, 48px);
          padding: clamp(20px, 3vw, 36px);
        }

        /* Phone — matte black bezel wrapping a rounded screen. Aspect
           hugs a real iPhone (clean 9:19.5 outer). Inner screen has its
           own slightly tighter radius so the bezel reads. */
        .sfa-phone {
          position: relative;
          height: 100%;
          aspect-ratio: 780 / 1711;
          border-radius: clamp(22px, 2.4vw, 32px);
          background: linear-gradient(160deg, #1A1A1C 0%, #0A0A0B 100%);
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.04),
            0 14px 30px -10px rgba(0, 0, 0, 0.55);
          padding: clamp(5px, 0.6vw, 9px);
          flex-shrink: 0;
        }
        .sfa-phone-screen {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: clamp(16px, 1.8vw, 24px);
          background: #000;
        }
        .sfa-phone-screen img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        /* Dynamic-island notch hint */
        .sfa-phone-notch {
          position: absolute;
          top: clamp(10px, 1.2vw, 16px);
          left: 50%;
          transform: translateX(-50%);
          width: 24%;
          height: clamp(6px, 0.8vw, 10px);
          background: #000;
          border-radius: 999px;
          z-index: 2;
        }
        /* Home indicator at the bottom of the screen */
        .sfa-phone-home {
          position: absolute;
          bottom: clamp(7px, 0.9vw, 11px);
          left: 50%;
          transform: translateX(-50%);
          width: 36%;
          height: clamp(3px, 0.35vw, 4px);
          background: rgba(255, 255, 255, 0.85);
          border-radius: 999px;
          z-index: 2;
        }

        /* Icon column — three cells stacked vertically. Each cell:
           filled circle badge in the action color + glyph + name + note. */
        .sfa-icons {
          display: grid;
          grid-template-rows: 1fr 1fr 1fr;
          gap: clamp(14px, 1.8vw, 24px);
          height: 100%;
          align-content: center;
          max-width: 320px;
        }

        /* Mobile: keep the desktop "phone-left + icons-right" composition.
           Two constraints to override:
           1) the SFA root's own 16:10 lock (set above)
           2) the parent .work-row-image's 16:10 + overflow:hidden, which
              clips anything taller. Use :has() to relax the parent only
              when it contains this card. */
        @media (max-width: 540px) {
          .work-row-image:has(.sfa-root) {
            aspect-ratio: auto !important;
            overflow: visible !important;
          }
          .sfa-root {
            aspect-ratio: auto;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
            gap: 16px;
            padding: 20px;
            align-items: center;
          }
          .sfa-phone {
            height: auto;
            width: 100%;
            max-width: 200px;
            aspect-ratio: 780 / 1711;
          }
          .sfa-icons {
            grid-template-columns: none;
            grid-template-rows: auto auto auto;
            gap: 14px;
            height: auto;
            max-width: 100%;
            align-content: center;
          }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* IconCell + glyphs — same family as the case study hero so the home card
   reads as a preview of the case study, not a different design system.
   Eased styling (flat tint, thin border, no glow) per earlier direction.    */
/* ─────────────────────────────────────────────────────────────────────────── */

function IconCell({ color, glyph, name, note }: {
  color: string; glyph: React.ReactNode; name: string; note: string;
}) {
  return (
    <div className="sfa-cell">
      <div
        className="sfa-badge"
        style={{
          background: hexA(color, 0.12),
          border: `1px solid ${hexA(color, 0.32)}`,
        }}
      >
        <span style={{ color, display: "inline-flex" }}>{glyph}</span>
      </div>
      <div className="sfa-cell-text">
        <p className="sfa-cell-name">{name}</p>
        <p className="sfa-cell-note">{note}</p>
      </div>
      <style>{`
        .sfa-cell {
          display: flex;
          align-items: center;
          gap: clamp(10px, 1.2vw, 16px);
          min-width: 0;
        }
        .sfa-badge {
          width: clamp(38px, 4vw, 48px);
          height: clamp(38px, 4vw, 48px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .sfa-cell-text {
          min-width: 0;
        }
        .sfa-cell-name {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: clamp(14px, 1.3vw, 16px);
          font-weight: 700;
          color: #FAFAF9;
          letter-spacing: -0.01em;
          margin: 0 0 2px;
        }
        .sfa-cell-note {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: clamp(11px, 1vw, 13px);
          line-height: 1.4;
          color: rgba(250, 250, 249, 0.72);
          margin: 0;
        }
        @media (max-width: 540px) {
          /* Keep the horizontal badge+text layout on mobile because the
             icon column now stacks vertically on the right of the phone. */
          .sfa-cell { gap: 10px; }
          .sfa-cell-name { font-size: 13px; }
          .sfa-cell-note { font-size: 11px; line-height: 1.35; }
          .sfa-badge { width: 32px; height: 32px; }
        }
      `}</style>
    </div>
  );
}

function hexA(hex: string, a: number) {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function PinGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M18.5 2.5l7 7-3.6 1.2L17 16l1.2 5-2.4 2.4L10 17.8 3 24.8v-2L10 16 5 11l2.4-2.4 5 1.2 5-5 1.1-2.3z"
        fill="currentColor" fillOpacity="0.92"
      />
      <path d="M18.5 2.5l3 3-1.5 1.5-3-3z" fill="#FFFFFF" fillOpacity="0.35" />
    </svg>
  );
}
function RemoveGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="11" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.6" />
      <rect x="7" y="12.6" width="14" height="2.8" rx="1.4" fill="currentColor" />
    </svg>
  );
}
function PauseGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="10.5" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.10" />
      <path d="M14 8v6l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M22 14a8 8 0 1 0-5 7.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}
