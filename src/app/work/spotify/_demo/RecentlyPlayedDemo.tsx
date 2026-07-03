"use client";

/**
 * RecentlyPlayedDemo
 * ─────────────────────────────────────────────────────────────────────────
 * Inline interactive proof that the three controls (Pin, Remove, Pause)
 * are what the case study claims they are: native to the shelf,
 * reversible, complete in one or two taps.
 *
 * Rebuilt 2026-07-02 to match Spotify's actual Recently Played shelf
 * shape more directly:
 *   - Six artist rows in a 2-column grid (was 6-tile playlist wall)
 *   - Each row: circular initials avatar left, name + meta stacked right
 *   - Pin / Remove / Pause moved BELOW the shelf so the affordance and
 *     the target sit in the reading order the case study advocates
 *   - Pause pushed right of Pin/Remove because it is a shelf-scope
 *     action, not a per-tile action
 *   - Instruction above the action row so the reader knows they need
 *     to pick an artist first (previously implicit)
 *
 * Keyboard shortcuts (fire when the demo is on-screen and no form
 * element is focused): P pin, R remove, Space pause/resume, Cmd/Ctrl+Z
 * undo, Esc dismiss snackbar.
 *
 * Scope guard: simulates the shelf and its three actions. Does not
 * reproduce the full state-machine spec (loading, error, sync
 * conflicts). The dossier already documents those; the demo proves
 * the happy path is what we say it is.
 *
 * a11y:
 * - All interactions keyboard-operable (Tab, Space/Enter, Esc,
 *   plus the P/R/Space shortcuts above)
 * - Reduced motion: instant state change, no slide animations
 * - Snackbar is a live region
 * - Action buttons announce their state via aria-pressed / aria-disabled
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ArtistId =
  | "the-roses"
  | "hollow-coves"
  | "this-is-madonna"
  | "luca-fogale"
  | "max-richter"
  | "your-episodes";

interface Artist {
  id:       ArtistId;
  name:     string;
  meta:     string;
  /** Tile artwork exported 2026-07-03 from the Recently Played Figma file. */
  image:    string;
}

const INITIAL_ARTISTS: Artist[] = [
  { id: "the-roses",       name: "The Roses",       meta: "New release · album",      image: "/images/work/spotify/artists/the-roses.png" },
  { id: "hollow-coves",    name: "Hollow Coves",    meta: "1.8M monthly listeners",   image: "/images/work/spotify/artists/hollow-coves.png" },
  { id: "this-is-madonna", name: "This Is Madonna", meta: "Playlist · Spotify",       image: "/images/work/spotify/artists/madonna.png" },
  { id: "luca-fogale",     name: "Luca Fogale",     meta: "Indie folk",               image: "/images/work/spotify/artists/luca-fogale.png" },
  { id: "max-richter",     name: "Max Richter",     meta: "Modern classical",         image: "/images/work/spotify/artists/max-richter.png" },
  { id: "your-episodes",   name: "Your Episodes",   meta: "Podcasts · Your library",  image: "/images/work/spotify/artists/your-episodes.png" },
];

const PIN_CAP        = 4;
const PAUSE_SECS     = 30;
/* Demo ergonomics — snackbar dismisses in 3s so a user exploring the
   three controls can chain actions without waiting. The shipped spec is
   5s (see PIN_CAP / UNDO_WINDOW / PAUSE_PRESETS constants line above the
   widget); the demo intentionally runs shorter for interaction pace. */
const SNACK_MS       = 3000;
const SPOTIFY_GREEN  = "#1ED760";
const SPOTIFY_JET    = "#121212";

type UndoAction =
  | { kind: "pin";    id: ArtistId; prevOrder: ArtistId[] }
  | { kind: "remove"; id: ArtistId; prevOrder: ArtistId[]; artist: Artist };

export default function RecentlyPlayedDemo() {
  const [artists, setArtists]         = useState<Artist[]>(INITIAL_ARTISTS);
  const [pinnedIds, setPinnedIds]     = useState<Set<ArtistId>>(new Set());
  const [selectedId, setSelectedId]   = useState<ArtistId | null>(null);
  const [snackMessage, setSnackMessage] = useState<string>("");
  const [undoAction, setUndoAction]   = useState<UndoAction | null>(null);
  const [paused, setPaused]           = useState<boolean>(false);
  const [pausedAt, setPausedAt]       = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [onScreen, setOnScreen]       = useState<boolean>(false);
  /* One-shot "breathe" hint: pulses the widget scale twice the first
     time it scrolls into view so the reader clocks it as interactive
     (Alfonso 2026-07-03, option B). Honors prefers-reduced-motion. */
  const [breathe, setBreathe]         = useState<boolean>(false);
  const breathedRef                    = useRef<boolean>(false);

  const snackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef    = useRef<HTMLElement | null>(null);

  /* Reduced-motion preference detection */
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

  /* Snackbar auto-dismiss */
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

  /* Pause countdown timer */
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

  /* Keep `onScreen` around for parity with earlier scoping but bind
     the keyboard listener unconditionally: this component only mounts
     on the Spotify case-study route, so cross-page hijacking is not
     a concern. IntersectionObserver was gating P/R silently before
     it flipped to true, which read as "P and R don't work". */
  useEffect(() => { setOnScreen(true); }, []);

  /* Trigger the breathe pulse once, the first time the widget enters
     view. Reduced-motion users get nothing. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || breathedRef.current) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !breathedRef.current) {
          breathedRef.current = true;
          setBreathe(true);
          window.setTimeout(() => setBreathe(false), 3000);
          io.disconnect();
          break;
        }
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const orderIds = useMemo(() => artists.map(a => a.id), [artists]);

  const handlePin = useCallback(() => {
    if (!selectedId || paused) return;
    if (pinnedIds.has(selectedId)) {
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
    const artist = artists.find(a => a.id === selectedId);
    if (!artist) return;
    const prevOrder = orderIds.slice();
    setPinnedIds(prev => new Set(prev).add(selectedId));
    setArtists(prev => [artist, ...prev.filter(a => a.id !== selectedId)]);
    setUndoAction({ kind: "pin", id: selectedId, prevOrder });
    setSnackMessage("Pinned to the top.");
  }, [selectedId, paused, pinnedIds, artists, orderIds]);

  const handleRemove = useCallback(() => {
    if (!selectedId || paused) return;
    const artist = artists.find(a => a.id === selectedId);
    if (!artist) return;
    const prevOrder = orderIds.slice();
    setArtists(prev => prev.filter(a => a.id !== selectedId));
    setPinnedIds(prev => {
      const next = new Set(prev);
      next.delete(selectedId);
      return next;
    });
    setSelectedId(null);
    setUndoAction({ kind: "remove", id: artist.id, prevOrder, artist });
    setSnackMessage("Removed from Recently Played.");
  }, [selectedId, paused, artists, orderIds]);

  const handlePauseToggle = useCallback(() => {
    setPaused(prev => !prev);
    setSelectedId(null);
  }, []);

  const handleUndo = useCallback(() => {
    if (!undoAction) return;
    const ordered = undoAction.prevOrder
      .map(id => INITIAL_ARTISTS.find(a => a.id === id))
      .filter((a): a is Artist => Boolean(a));
    setArtists(ordered);
    if (undoAction.kind === "pin") {
      setPinnedIds(prev => {
        const next = new Set(prev);
        next.delete(undoAction.id);
        return next;
      });
    }
    setSnackMessage("");
    setUndoAction(null);
  }, [undoAction]);

  const handleReset = useCallback(() => {
    setArtists(INITIAL_ARTISTS);
    setPinnedIds(new Set());
    setSelectedId(null);
    setSnackMessage("");
    setUndoAction(null);
    setPaused(false);
  }, []);

  /* Keyboard shortcuts. Only bind when the demo is on-screen so the
     keys don't hijack other pages / sections. Ignore when a form
     element is focused so the user can still type. Space + P + R
     never intercept when Meta/Ctrl/Alt are held, so browser
     shortcuts (Cmd+P print, Cmd+R reload) pass through. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target && target.tagName;
      const isEditable = target && (target as HTMLElement).isContentEditable;
      if (isEditable || tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      // Cmd/Ctrl+Z undo
      if ((e.metaKey || e.ctrlKey) && (e.key === "z" || e.key === "Z")) {
        if (undoAction) {
          e.preventDefault();
          handleUndo();
        }
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === "Escape") {
        if (snackMessage) {
          e.preventDefault();
          setSnackMessage("");
          setUndoAction(null);
        }
        return;
      }
      if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        if (!selectedId) {
          setSnackMessage("Pick an artist first, then press P.");
        } else {
          handlePin();
        }
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        if (!selectedId) {
          setSnackMessage("Pick an artist first, then press R.");
        } else {
          handleRemove();
        }
      } else if (e.key === " ") {
        // Only intercept space if the focus target is not a native
        // button/link (space would otherwise activate that button).
        if (tag === "BUTTON" || tag === "A") return;
        e.preventDefault();
        handlePauseToggle();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selectedId, snackMessage, undoAction, handlePin, handleRemove, handlePauseToggle, handleUndo]);

  const transition = reducedMotion ? "none" : "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)";
  const shelfEmpty = artists.length === 0;
  const canAct     = Boolean(selectedId) && !paused;

  return (
    <section
      ref={sectionRef}
      aria-label="Interactive demo of Pin, Remove, and Pause on the Recently Played shelf"
      style={{
        /* Widget chrome. #181818 on the section's white marks the object
           via contrast alone — no shadow, matching the flat rest of the
           site (Alfonso 2026-07-03). Width capped to ~820px so the widget
           hugs its content; left-aligned to the section's inner column. */
        background:   "#181818",
        padding:      "clamp(28px, 4vw, 48px)",
        borderRadius: "10px",
        color:        "#FAFAF9",
        fontFamily:   "var(--font-dm-sans), sans-serif",
        position:     "relative",
        overflow:     "hidden",
        width:        "100%",
        maxWidth:     "820px",
        marginInline: "0",
        animation:    breathe ? "sp2RpBreathe 1.2s ease-in-out 2" : "none",
        transformOrigin: "center center",
      }}
    >
      {/* Eyebrow + title + description moved OUT to the section wrapper
          in work/spotify/page.tsx on 2026-07-03. The widget is now
          just the shelf + controls + snackbar — a clean dark instrument
          on the section's light surface. */}

      {/* Shelf — 2-column grid of horizontal artist rows.
          Constrained to a max-width so the rows don't stretch across
          the whole editorial column; keeps each row density closer
          to Spotify's actual Recently Played shelf. */}
      <div
        role="list"
        aria-label="Recently Played shelf"
        className="sp2-demo-shelf"
        style={{
          display:              "grid",
          gridTemplateColumns:  "repeat(2, minmax(0, 1fr))",
          gap:                  "8px",
          minHeight:            "120px",
          maxWidth:             "720px",
        }}
      >
        {shelfEmpty ? (
          <div style={{
            gridColumn: "1 / -1",
            padding:    "32px",
            textAlign:  "center",
            color:      "rgba(255,255,255,0.55)",
            fontSize:   "14px",
            border:     "1px dashed rgba(255,255,255,0.18)",
          }}>
            Shelf empty. Click Reset to restore all artists.
          </div>
        ) : (
          artists.map((artist) => {
            const isSelected = selectedId === artist.id;
            const isPinned   = pinnedIds.has(artist.id);
            return (
              <button
                key={artist.id}
                role="listitem"
                type="button"
                className="sp2-demo-row"
                aria-label={`${artist.name}, ${artist.meta}${isPinned ? ", pinned" : ""}${isSelected ? ", selected" : ""}`}
                aria-pressed={isSelected}
                onClick={() => setSelectedId(artist.id === selectedId ? null : artist.id)}
                disabled={paused}
                style={{
                  position:       "relative",
                  display:        "flex",
                  alignItems:     "center",
                  gap:            "14px",
                  padding:        "10px 12px",
                  textAlign:      "left",
                  background:     isSelected ? "rgba(30,215,96,0.14)" : "rgba(255,255,255,0.14)",
                  border:         isSelected ? `1px solid ${SPOTIFY_GREEN}` : "1px solid transparent",
                  color:          "#FFFFFF",
                  fontFamily:     "var(--font-dm-sans), sans-serif",
                  cursor:         paused ? "not-allowed" : "pointer",
                  opacity:        paused ? 0.5 : 1,
                  transition,
                  outline:        "none",
                }}
              >
                {/* Real artwork exported from the Recently Played Figma
                    file (2026-07-03). Rectangular 48×48 to match Spotify's
                    actual shelf, which shows squares for artists,
                    playlists, and podcast library shortcuts alike. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={artist.image}
                  alt=""
                  aria-hidden="true"
                  width={48}
                  height={48}
                  style={{
                    width:          "48px",
                    height:         "48px",
                    borderRadius:   "4px",
                    objectFit:      "cover",
                    flexShrink:     0,
                    display:        "block",
                    boxShadow:      "inset 0 0 0 1px rgba(255,255,255,0.08)",
                  }}
                />
                <span style={{
                  display:        "flex",
                  flexDirection:  "column",
                  minWidth:       0,
                  flex:           1,
                }}>
                  <span style={{
                    fontSize:       "14px",
                    fontWeight:     600,
                    color:          "#FFFFFF",
                    letterSpacing:  "-0.005em",
                    overflow:       "hidden",
                    textOverflow:   "ellipsis",
                    whiteSpace:     "nowrap",
                  }}>
                    {artist.name}
                  </span>
                  <span style={{
                    fontSize:       "12px",
                    color:          "rgba(255,255,255,0.55)",
                    marginTop:      "2px",
                    overflow:       "hidden",
                    textOverflow:   "ellipsis",
                    whiteSpace:     "nowrap",
                  }}>
                    {artist.meta}
                  </span>
                </span>
                {isPinned && (
                  <span aria-hidden="true" title="Pinned" style={{
                    background:     SPOTIFY_GREEN,
                    color:          SPOTIFY_JET,
                    width:          "22px",
                    height:         "22px",
                    borderRadius:   "50%",
                    display:        "inline-flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    flexShrink:     0,
                  }}>
                    <PinGlyph />
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>

      {/* Instruction line ABOVE the action row. Constrained to the
          same 720px max-width as the shelf so it sits directly
          above the artist rows, not floating in the wider section. */}
      <p style={{
        marginTop:  "clamp(20px, 3vw, 32px)",
        marginBottom: "10px",
        maxWidth:   "720px",
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize:   "12px",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color:      canAct ? SPOTIFY_GREEN : "rgba(255,255,255,0.55)",
        fontWeight: 700,
      }}>
        {selectedId ? "Now pick an action" : "Choose an artist to pin or remove"}
      </p>

      {/* Actions row — matches the shelf's 720px max-width so Pause
          and Reset align to the right edge of the shelf instead of
          floating out to the wider section edge. */}
      <div
        role="toolbar"
        aria-label="Recently Played actions"
        style={{
          display:    "flex",
          flexWrap:   "wrap",
          gap:        "10px",
          alignItems: "center",
          maxWidth:   "720px",
        }}
      >
        <ActionChip
          label="Pin"
          shortcut="P"
          icon={<PinIcon />}
          disabled={!selectedId || paused}
          pressed={selectedId ? pinnedIds.has(selectedId) : false}
          tooltip={paused ? "History paused" : !selectedId ? "Pick an artist first" : pinnedIds.has(selectedId) ? "Click to unpin" : `Pin to top (${pinnedIds.size}/${PIN_CAP})`}
          onClick={handlePin}
        />
        <ActionChip
          label="Remove"
          shortcut="R"
          icon={<RemoveIcon />}
          disabled={!selectedId || paused}
          tooltip={paused ? "History paused" : !selectedId ? "Pick an artist first" : "Remove from shelf"}
          onClick={handleRemove}
        />

        {/* Spacer separates Pause (shelf-scope action) from
            Pin/Remove (artist-scope actions). */}
        <div style={{ flex: 1, minWidth: "12px" }} aria-hidden="true" />

        <ActionChip
          label={paused ? "Resume" : "Pause"}
          shortcut="Space"
          icon={paused ? <ResumeIcon /> : <PauseIcon />}
          pressed={paused}
          tooltip={paused ? `Resumes automatically in ${pausedAt}s` : "Stop the shelf from logging"}
          onClick={handlePauseToggle}
        />
        <button
          type="button"
          onClick={handleReset}
          style={{
            background:     "transparent",
            border:         "1px solid rgba(255,255,255,0.28)",
            color:          "rgba(255,255,255,0.78)",
            padding:        "8px 14px",
            minHeight:      "44px",
            fontFamily:     "var(--font-dm-sans), sans-serif",
            fontSize:       "11px",
            fontWeight:     600,
            letterSpacing:  "0.12em",
            textTransform:  "uppercase",
            cursor:         "pointer",
            transition:     "color 0.15s, border-color 0.15s",
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
          display:      "flex",
          alignItems:   "center",
          gap:          "12px",
          padding:      "12px 16px",
          background:   "rgba(30, 215, 96, 0.10)",
          borderLeft:   `3px solid ${SPOTIFY_GREEN}`,
          marginTop:    "16px",
          color:        "#FFFFFF",
          fontFamily:   "var(--font-dm-sans), sans-serif",
          fontSize:     "13px",
        }}>
          <PauseIcon />
          <span>Listening history paused. Resumes in <strong style={{ color: SPOTIFY_GREEN, fontVariantNumeric: "tabular-nums" }}>{pausedAt}s</strong>.</span>
        </div>
      )}

      {/* Snackbar — center-anchored at the bottom of the widget, capped
          at 480px, slightly rounded so it reads as a toast, not a bar. */}
      {snackMessage && (
        <div
          role="status"
          aria-live="polite"
          className="sp2-demo-snack"
          style={{
            position:     "absolute",
            left:         "50%",
            bottom:       "16px",
            transform:    reducedMotion ? "translateX(-50%)" : "translate(-50%, 0)",
            width:        "calc(100% - 2 * clamp(28px, 4vw, 48px))",
            maxWidth:     "480px",
            background:   "#FFFFFF",
            color:        SPOTIFY_JET,
            padding:      "12px 16px",
            display:      "flex",
            alignItems:   "center",
            gap:          "16px",
            borderRadius: "6px",
            boxShadow:    "0 10px 28px rgba(0,0,0,0.45)",
            fontFamily:   "var(--font-dm-sans), sans-serif",
            fontSize:     "13px",
            transition:   reducedMotion ? "none" : "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <span style={{ flex: 1 }}>{snackMessage}</span>
          {undoAction && (
            <button
              type="button"
              onClick={handleUndo}
              style={{
                background:     "transparent",
                border:         "none",
                color:          SPOTIFY_JET,
                fontFamily:     "var(--font-dm-sans), sans-serif",
                fontSize:       "12px",
                fontWeight:     700,
                letterSpacing:  "0.12em",
                textTransform:  "uppercase",
                cursor:         "pointer",
                padding:        "8px 4px",
                minHeight:      "44px",
                textDecoration: "underline",
              }}
            >
              Undo
            </button>
          )}
        </div>
      )}

      {/* Responsive rules */}
      <style>{`
        @keyframes sp2RpBreathe {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.015); }
          100% { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes sp2RpBreathe {
            0%, 100% { transform: none; }
          }
        }
        @media (max-width: 520px) {
          .sp2-demo-shelf { grid-template-columns: 1fr !important; }
        }
        .sp2-demo-chip:focus-visible,
        .sp2-demo-row:focus-visible {
          outline: 2px solid #FFFFFF !important;
          outline-offset: 2px !important;
        }
        .sp2-demo-row:not(:disabled):hover {
          background: rgba(255,255,255,0.08) !important;
        }
        .sp2-demo-row[aria-pressed="true"]:not(:disabled):hover {
          background: rgba(30,215,96,0.15) !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .sp2-demo-row { transition: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Sub-components + icons                                                   */
/* ─────────────────────────────────────────────────────────────────────── */

function ActionChip({
  label, icon, onClick, disabled, pressed, tooltip, shortcut,
}: {
  label:     string;
  icon:      React.ReactNode;
  onClick:   () => void;
  disabled?: boolean;
  pressed?:  boolean;
  tooltip?:  string;
  shortcut?: string;
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
        display:        "inline-flex",
        alignItems:     "center",
        gap:            "8px",
        padding:        "10px 16px",
        minHeight:      "44px",
        background:     pressed ? "rgba(30, 215, 96, 0.15)" : "rgba(255,255,255,0.04)",
        border:         pressed ? `1px solid ${SPOTIFY_GREEN}` : "1px solid rgba(255,255,255,0.28)",
        color:          disabled ? "rgba(255,255,255,0.36)" : pressed ? SPOTIFY_GREEN : "#FFFFFF",
        fontFamily:     "var(--font-dm-sans), sans-serif",
        fontSize:       "12px",
        fontWeight:     600,
        letterSpacing:  "0.12em",
        textTransform:  "uppercase",
        cursor:         disabled ? "not-allowed" : "pointer",
        transition:     "background 0.15s, border-color 0.15s, color 0.15s",
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
      {shortcut && (
        <span aria-hidden="true" style={{
          marginLeft:     "6px",
          fontFamily:     "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize:       "10px",
          fontWeight:     700,
          padding:        "2px 6px",
          background:     "rgba(255,255,255,0.08)",
          color:          "rgba(255,255,255,0.65)",
          letterSpacing:  "0.06em",
        }}>{shortcut}</span>
      )}
    </button>
  );
}

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

function RemoveIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="11" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.6" />
      <rect x="7" y="12.6" width="14" height="2.8" rx="1.4" fill="currentColor" />
    </svg>
  );
}

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
