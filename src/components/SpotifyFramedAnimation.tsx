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
      {/* Phone — action sheet open, rounded mobile corners */}
      <div className="sfa-phone">
        <img
          src="/images/work/spotify/spotify-action-sheet.webp"
          alt="Long-press an item on the Spotify Recently Played shelf opens an action sheet with Pin, Remove, and Pause Listening History."
          loading="lazy"
          decoding="async"
        />
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

        /* Phone — fills the available height of the frame, rounded mobile
           corners, action-sheet image cover-cropped to fit. */
        .sfa-phone {
          position: relative;
          height: 100%;
          aspect-ratio: 780 / 1711;
          overflow: hidden;
          border-radius: clamp(14px, 1.8vw, 24px);
          background: #000;
          flex-shrink: 0;
        }
        .sfa-phone img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
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

        /* Narrow card (or stacked mobile work row): collapse the icon column
           gracefully — let the phone breathe, drop the icon notes. */
        @media (max-width: 540px) {
          .sfa-root {
            grid-template-columns: 1fr;
            justify-items: center;
            gap: 16px;
          }
          .sfa-icons {
            grid-template-rows: none;
            grid-template-columns: 1fr 1fr 1fr;
            max-width: 100%;
            width: 100%;
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
          .sfa-cell { flex-direction: column; align-items: center; text-align: center; gap: 6px; }
          .sfa-cell-note { display: none; }
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
