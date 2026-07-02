"use client";

/**
 * RecentlyPlayedDemo
 * ─────────────────────────────────────────────────────────────────────────
 * Inline interactive proof that the three controls (Pin, Remove, Pause)
 * are what the case study claims they are: native to the shelf, reversible,
 * complete in one or two taps.
 *
 * This is the only piece of the case study you operate instead of read.
 * It sits between DecisionLogic and Prototypes — after the spec, before
 * the looping videos — so the reader has the model in their head and now
 * tries it.
 *
 * Scope guard: simulates the shelf and the action sheet's three options.
 * Does NOT try to reproduce the full state-machine spec (loading, error,
 * sync conflicts). The dossier already documents those; the demo proves
 * the happy path is what we say it is.
 *
 * a11y:
 * - All interactions keyboard-operable (Tab, Space/Enter, Esc dismisses snackbar)
 * - Reduced motion: instant state change, no slide animations
 * - Snackbar is a live region
 * - Action buttons announce their state via aria-pressed / aria-disabled
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type TileId = "daylist" | "surf-rock" | "alt-indie" | "happy-indie" | "quiet-mix" | "soft-indie";

interface Tile {
  id: TileId;
  title: string;
  subtitle: string;
  image: string;
}

const INITIAL_TILES: Tile[] = [
  { id: "daylist",     title: "daylist",              subtitle: "Alternative indie playlist",       image: "/images/work/spotify/tiles/tile-1.png" },
  { id: "surf-rock",   title: "Surf Rock Mix",        subtitle: "Dinner party music, picked for you", image: "/images/work/spotify/tiles/tile-2.png" },
  { id: "alt-indie",   title: "Alternative Indie Mix", subtitle: "Indie rock, picked for you",       image: "/images/work/spotify/tiles/tile-3.png" },
  { id: "happy-indie", title: "Happy Indie Mix",      subtitle: "Cooking music, picked for you",     image: "/images/work/spotify/tiles/tile-4.png" },
  { id: "quiet-mix",   title: "Quiet Mix",            subtitle: "Alternative, picked for you",       image: "/images/work/spotify/tiles/tile-5.png" },
  { id: "soft-indie",  title: "Soft Indie Mix",       subtitle: "Soft indie, picked for you",        image: "/images/work/spotify/tiles/tile-6.png" },
];


const PIN_CAP    = 4;
const PAUSE_SECS = 30;
const SNACK_MS   = 5000;
const SPOTIFY_GREEN = "#1ED760";
const SPOTIFY_JET   = "#121212";

type UndoAction =
  | { kind: "pin";    tileId: TileId; prevOrder: TileId[] }
  | { kind: "remove"; tileId: TileId; prevOrder: TileId[]; tile: Tile };

export default function RecentlyPlayedDemo() {
  const [tiles, setTiles] = useState<Tile[]>(INITIAL_TILES);
  const [pinnedIds, setPinnedIds] = useState<Set<TileId>>(new Set());
  const [selectedId, setSelectedId] = useState<TileId | null>(null);
  const [snackMessage, setSnackMessage] = useState<string>("");
  const [undoAction, setUndoAction] = useState<UndoAction | null>(null);
  const [paused, setPaused] = useState<boolean>(false);
  const [pausedAt, setPausedAt] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const snackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const undoButtonRef = useRef<HTMLButtonElement>(null);

  // Reduced-motion preference detection
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else if (mq.addListener) mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else if (mq.removeListener) mq.removeListener(handler);
    };
  }, []);

  // Snackbar auto-dismiss with timer reset on new messages
  useEffect(() => {
    if (!snackMessage) return;
    if (snackTimerRef.current) clearTimeout(snackTimerRef.current);
    snackTimerRef.current = setTimeout(() => {
      setSnackMessage("");
      setUndoAction(null);
    }, SNACK_MS);
    return () => {
      if (snackTimerRef.current) clearTimeout(snackTimerRef.current);
    };
  }, [snackMessage]);

  // Pause countdown timer
  useEffect(() => {
    if (!paused) {
      setPausedAt(0);
      return;
    }
    setPausedAt(PAUSE_SECS);
    const interval = setInterval(() => {
      setPausedAt(prev => {
        if (prev <= 1) {
          setPaused(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [paused]);

  // Escape dismisses snackbar
  useEffect(() => {
    if (!snackMessage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSnackMessage("");
        setUndoAction(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [snackMessage]);

  const selectedTile = useMemo(
    () => (selectedId ? tiles.find(t => t.id === selectedId) ?? null : null),
    [selectedId, tiles]
  );

  const orderIds = useMemo(() => tiles.map(t => t.id), [tiles]);

  const handlePin = useCallback(() => {
    if (!selectedId || paused) return;
    if (pinnedIds.has(selectedId)) {
      // Already pinned — unpin in place
      setPinnedIds(prev => {
        const next = new Set(prev);
        next.delete(selectedId);
        return next;
      });
      setSnackMessage("Unpinned.");
      return;
    }
    if (pinnedIds.size >= PIN_CAP) {
      setSnackMessage(`Pin cap reached. Unpin one of the ${PIN_CAP} first.`);
      return;
    }
    const tile = tiles.find(t => t.id === selectedId);
    if (!tile) return;
    const prevOrder = orderIds.slice();
    setPinnedIds(prev => new Set(prev).add(selectedId));
    setTiles(prev => [tile, ...prev.filter(t => t.id !== selectedId)]);
    setUndoAction({ kind: "pin", tileId: selectedId, prevOrder });
    setSnackMessage("Pinned to the top.");
  }, [selectedId, paused, pinnedIds, tiles, orderIds]);

  const handleRemove = useCallback(() => {
    if (!selectedId || paused) return;
    const tile = tiles.find(t => t.id === selectedId);
    if (!tile) return;
    const prevOrder = orderIds.slice();
    setTiles(prev => prev.filter(t => t.id !== selectedId));
    setPinnedIds(prev => {
      const next = new Set(prev);
      next.delete(selectedId);
      return next;
    });
    setSelectedId(null);
    setUndoAction({ kind: "remove", tileId: tile.id, prevOrder, tile });
    setSnackMessage("Removed from Recently Played.");
  }, [selectedId, paused, tiles, orderIds]);

  const handlePauseToggle = useCallback(() => {
    setPaused(prev => !prev);
    setSelectedId(null);
  }, []);

  const handleUndo = useCallback(() => {
    if (!undoAction) return;
    const ordered = undoAction.prevOrder
      .map(id => INITIAL_TILES.find(t => t.id === id))
      .filter((t): t is Tile => Boolean(t));
    setTiles(ordered);
    if (undoAction.kind === "pin") {
      setPinnedIds(prev => {
        const next = new Set(prev);
        next.delete(undoAction.tileId);
        return next;
      });
    }
    setSnackMessage("");
    setUndoAction(null);
  }, [undoAction]);

  const handleReset = useCallback(() => {
    setTiles(INITIAL_TILES);
    setPinnedIds(new Set());
    setSelectedId(null);
    setSnackMessage("");
    setUndoAction(null);
    setPaused(false);
  }, []);

  const transition = reducedMotion ? "none" : "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)";

  const shelfEmpty = tiles.length === 0;

  return (
    <section
      aria-label="Interactive demo of Pin, Remove, and Pause on the Recently Played shelf"
      style={{
        background: SPOTIFY_JET,
        padding: "clamp(28px, 4vw, 48px)",
        borderRadius: 0,
        color: "#FAFAF9",
        fontFamily: "var(--font-dm-sans), sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Eyebrow + lead. Restructured 2026-07-01 so the demo reads as a
          Spotify shelf: primary heading is "Recently Played" (the shelf
          label), instruction sits in the eyebrow row and subtitle. */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
        <span style={{ width: "24px", height: "1px", background: SPOTIFY_GREEN }} />
        <span style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "11px", fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: SPOTIFY_GREEN,
        }}>
          Try it · Recently Played
        </span>
      </div>
      <h3 style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "clamp(26px, 3vw, 36px)",
        fontWeight: 800, color: "#FFFFFF", margin: "0 0 6px",
        letterSpacing: "-0.02em", lineHeight: 1.1,
      }}>
        Recently Played
      </h3>
      <p style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "14px", lineHeight: 1.55,
        color: "rgba(255,255,255,0.72)", margin: "0 0 28px",
        maxWidth: "600px",
      }}>
        Pick a tile, then use one of the three controls. Pin slides to the front. Remove deletes with a 5-second undo. Pause stops the shelf from logging. Reduced-motion users get the same logic with no animation.
      </p>

      {/* Action chips */}
      <div role="toolbar" aria-label="Recently Played actions" style={{
        display: "flex", flexWrap: "wrap", gap: "10px",
        marginBottom: "20px",
      }}>
        <ActionChip
          label="Pin"
          icon={<PinIcon />}
          disabled={!selectedId || paused}
          pressed={selectedId ? pinnedIds.has(selectedId) : false}
          tooltip={paused ? "History paused" : !selectedId ? "Pick a tile first" : pinnedIds.has(selectedId) ? "Click to unpin" : `Pin to top (${pinnedIds.size}/${PIN_CAP})`}
          onClick={handlePin}
        />
        <ActionChip
          label="Remove"
          icon={<RemoveIcon />}
          disabled={!selectedId || paused}
          tooltip={paused ? "History paused" : !selectedId ? "Pick a tile first" : "Remove from shelf"}
          onClick={handleRemove}
        />
        <ActionChip
          label={paused ? "Resume" : "Pause"}
          icon={paused ? <ResumeIcon /> : <PauseIcon />}
          pressed={paused}
          tooltip={paused ? `Resumes automatically in ${pausedAt}s` : "Stop the shelf from logging"}
          onClick={handlePauseToggle}
        />
        <button
          type="button"
          onClick={handleReset}
          style={{
            marginLeft: "auto",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.28)",
            color: "rgba(255,255,255,0.78)",
            padding: "8px 14px", minHeight: "44px",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "11px", fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase",
            cursor: "pointer",
            transition: "color 0.15s, border-color 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#FFFFFF"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.78)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"; }}
        >
          Reset
        </button>
      </div>

      {/* Paused banner */}
      {paused && (
        <div role="status" aria-live="polite" style={{
          display: "flex", alignItems: "center", gap: "12px",
          padding: "12px 16px",
          background: "rgba(30, 215, 96, 0.10)",
          borderLeft: `3px solid ${SPOTIFY_GREEN}`,
          marginBottom: "16px",
          color: "#FFFFFF",
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "13px",
        }}>
          <PauseIcon />
          <span>Listening history paused. Resumes in <strong style={{ color: SPOTIFY_GREEN, fontVariantNumeric: "tabular-nums" }}>{pausedAt}s</strong>.</span>
        </div>
      )}

      {/* Show-all row above the tile grid — Spotify's shelves always
          include a "Show all" affordance on the right. Kept the label
          only (no duplicate H4) since the section H3 above already
          says "Recently Played." */}
      <div style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "flex-end",
        gap: "12px",
        margin: "0 0 12px",
      }}>
        <span aria-hidden="true" style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
        }}>
          Show all
        </span>
      </div>

      {/* Shelf */}
      <div
        role="list"
        aria-label="Recently Played shelf"
        className="sp2-demo-shelf"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          gap: "12px",
          minHeight: "120px",
        }}
      >
        {shelfEmpty ? (
          <div style={{
            gridColumn: "1 / -1",
            padding: "32px",
            textAlign: "center",
            color: "rgba(255,255,255,0.55)",
            fontSize: "14px",
            border: "1px dashed rgba(255,255,255,0.18)",
          }}>
            Shelf empty. Click Reset to restore all tiles.
          </div>
        ) : (
          tiles.map((tile) => {
            const isSelected = selectedId === tile.id;
            const isPinned   = pinnedIds.has(tile.id);
            return (
              <button
                key={tile.id}
                role="listitem"
                type="button"
                className="sp2-demo-tile"
                aria-label={`${tile.title}, ${tile.subtitle}${isPinned ? ', pinned' : ''}${isSelected ? ', selected' : ''}`}
                aria-pressed={isSelected}
                onClick={() => setSelectedId(tile.id === selectedId ? null : tile.id)}
                disabled={paused}
                style={{
                  position: "relative",
                  display: "block",
                  textAlign: "left",
                  background: "transparent",
                  padding: 0,
                  border: "none",
                  cursor: paused ? "not-allowed" : "pointer",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  opacity: paused ? 0.5 : 1,
                  transition,
                  outline: "none",
                }}
              >
                {/* Real Spotify shelf tile — Figma-sourced "Made For You"
                    playlist artwork. Aspect matches Alfonso's Figma tile
                    (190:238 portrait). Text is baked into the image, so
                    the below-tile title row is gone. Interactive states
                    (pin badge, play button, selected border) overlay on
                    top. */}
                <div style={{
                  position: "relative",
                  aspectRatio: "190 / 238",
                  border: isSelected ? `2px solid ${SPOTIFY_GREEN}` : `2px solid transparent`,
                  boxShadow: isSelected ? `0 8px 20px rgba(0,0,0,0.4)` : "0 4px 10px rgba(0,0,0,0.25)",
                  transition,
                  overflow: "hidden",
                }}>
                  <img
                    src={tile.image}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      pointerEvents: "none",
                      display: "block",
                    }}
                  />
                  {/* Pin badge */}
                  {isPinned && (
                    <span aria-hidden="true" style={{
                      position: "absolute", top: "8px", right: "8px",
                      background: SPOTIFY_GREEN,
                      borderRadius: "50%",
                      width: "20px", height: "20px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: SPOTIFY_JET,
                    }}>
                      <PinGlyph />
                    </span>
                  )}
                  {/* Play button — appears on hover / selected state. */}
                  <span aria-hidden="true" className="sp2-demo-play" style={{
                    position: "absolute",
                    right: "8px",
                    bottom: "8px",
                    width: "32px",
                    height: "32px",
                    background: SPOTIFY_GREEN,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: SPOTIFY_JET,
                    opacity: isSelected ? 1 : 0,
                    transform: isSelected ? "translateY(0)" : "translateY(4px)",
                    transition: reducedMotion ? "none" : "opacity 0.2s ease, transform 0.2s ease",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.35)",
                  }}>
                    <PlayGlyph />
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Snackbar — slides up from bottom on small screens, anchored top-right on desktop */}
      {snackMessage && (
        <div
          role="status"
          aria-live="polite"
          className="sp2-demo-snack"
          style={{
            position: "absolute",
            left: "clamp(24px, 4vw, 48px)",
            right: "clamp(24px, 4vw, 48px)",
            bottom: "16px",
            maxWidth: "520px",
            margin: "0 auto",
            background: "#FFFFFF",
            color: SPOTIFY_JET,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            boxShadow: "0 10px 28px rgba(0,0,0,0.45)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "13px",
            transform: reducedMotion ? "none" : "translateY(0)",
            transition: reducedMotion ? "none" : "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <span style={{ flex: 1 }}>{snackMessage}</span>
          {undoAction && (
            <button
              ref={undoButtonRef}
              type="button"
              onClick={handleUndo}
              style={{
                background: "transparent",
                border: "none",
                color: SPOTIFY_JET,
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: "8px 4px",
                minHeight: "44px",
                textDecoration: "underline",
              }}
            >
              Undo
            </button>
          )}
        </div>
      )}

      {/* Responsive: collapse to 3 columns on tablet, 2 on phone */}
      <style>{`
        @media (max-width: 960px) {
          .sp2-demo-shelf { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 520px) {
          .sp2-demo-shelf { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        .sp2-demo-chip:focus-visible {
          outline: 2px solid #FFFFFF !important;
          outline-offset: 2px !important;
        }
        /* Tile hover — matches Spotify's Recently Played interaction:
           artwork lifts subtly and the play button fades in. Reduced
           motion users get the fade without transform. */
        .sp2-demo-tile:not(:disabled):hover > div:first-child {
          transform: translateY(-2px);
        }
        .sp2-demo-tile:not(:disabled):hover .sp2-demo-play {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .sp2-demo-tile:focus-visible > div:first-child {
          outline: 2px solid ${SPOTIFY_GREEN};
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .sp2-demo-tile:not(:disabled):hover > div:first-child {
            transform: none !important;
          }
          .sp2-demo-tile > div:first-child {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Sub-components + icons                                                   */
/* ─────────────────────────────────────────────────────────────────────── */

function ActionChip({
  label, icon, onClick, disabled, pressed, tooltip,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  pressed?: boolean;
  tooltip?: string;
}) {
  return (
    <button
      type="button"
      className="sp2-demo-chip"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={pressed ?? undefined}
      title={tooltip}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 16px",
        minHeight: "44px",
        background: pressed ? "rgba(30, 215, 96, 0.15)" : "rgba(255,255,255,0.04)",
        border: pressed ? `1px solid ${SPOTIFY_GREEN}` : "1px solid rgba(255,255,255,0.28)",
        color: disabled ? "rgba(255,255,255,0.36)" : pressed ? SPOTIFY_GREEN : "#FFFFFF",
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background 0.15s, border-color 0.15s, color 0.15s",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        if (!pressed) e.currentTarget.style.background = "rgba(255,255,255,0.08)";
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        if (!pressed) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
      }}
    >
      <span aria-hidden="true">{icon}</span>
      {label}
    </button>
  );
}

/* Thumbtack pin — matches the PinGlyph used in the case-study body
   (page.tsx PinGlyph). Sharing the shape keeps the demo visually
   consistent with the rest of the Spotify write-up. */
function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M18.5 2.5l7 7-3.6 1.2L17 16l1.2 5-2.4 2.4L10 17.8 3 24.8v-2L10 16 5 11l2.4-2.4 5 1.2 5-5 1.1-2.3z"
        fill="currentColor"
      />
    </svg>
  );
}

function PinGlyph() {
  return (
    <svg width="10" height="10" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M18.5 2.5l7 7-3.6 1.2L17 16l1.2 5-2.4 2.4L10 17.8 3 24.8v-2L10 16 5 11l2.4-2.4 5 1.2 5-5 1.1-2.3z"
        fill="currentColor"
      />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M3 2L14 8L3 14L3 2Z" />
    </svg>
  );
}

/* Strikethrough circle — matches the RemoveGlyph in the case-study body. */
function RemoveIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="11" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.6" />
      <rect x="7" y="12.6" width="14" height="2.8" rx="1.4" fill="currentColor" />
    </svg>
  );
}

/* Clock with running timer arc — matches the PauseGlyph in the case-
   study body. Pause was designed as a time-boxed session, so a clock
   reads truer than pause-bars. */
function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="10.5" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.10" />
      <path d="M14 8v6l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M22 14a8 8 0 1 0-5 7.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <polygon points="4,3 13,8 4,13" />
    </svg>
  );
}
