"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { searchEntries, searchIndex, type SearchEntry } from "@/lib/search-index";

// Custom event names used to open/close the palette from outside (e.g. the
// nav button). Keeps the component self-contained without needing a context.
const OPEN_EVENT  = "openCommandPalette";
const CLOSE_EVENT = "closeCommandPalette";

/**
 * Open the palette programmatically. Call this from anywhere in the app
 * (Nav search button, future onboarding, etc.).
 */
export function openCommandPalette() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query ? searchEntries(query, 8) : [];
  const quickLinks = searchIndex.filter((e) => e.kind === "case-study");

  // Cmd+K / Ctrl+K global listener + custom open/close events
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen  = () => setOpen(true);
    const onClose = () => setOpen(false);

    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT,  onOpen);
    window.addEventListener(CLOSE_EVENT, onClose);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT,  onOpen);
      window.removeEventListener(CLOSE_EVENT, onClose);
    };
  }, []);

  // Reset input + focus when opening
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 20);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Reset selection on query change
  useEffect(() => { setSelectedIdx(0); }, [query]);

  const navigate = useCallback((entry: SearchEntry) => {
    setOpen(false);
    router.push(entry.href);
  }, [router]);

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    const list = query ? results : quickLinks;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, list.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && list[selectedIdx]) {
      e.preventDefault();
      navigate(list[selectedIdx]);
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        background: "rgba(37,43,40,0.55)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "10vh 16px 0",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "640px",
          background: "#FFFFFF",
          border: "1px solid #E8E4DE",
          borderRadius: "12px",
          boxShadow: "0 18px 60px rgba(37,43,40,0.18), 0 4px 12px rgba(37,43,40,0.08)",
          overflow: "hidden",
        }}
      >
        {/* Input */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 20px", borderBottom: "1px solid #E8E4DE" }}>
          <SearchSvg />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Search case studies, sections, pages…"
            style={{
              flex: 1,
              padding: "20px 0",
              border: "none",
              outline: "none",
              fontSize: "16px",
              fontFamily: "var(--font-dm-sans), sans-serif",
              color: "#252B28",
              background: "transparent",
            }}
          />
        </div>

        {/* Results */}
        <div style={{ maxHeight: "60vh", overflow: "auto", padding: "8px 0" }}>
          {query && results.length === 0 && (
            <p style={{
              padding: "32px 20px",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "14px",
              color: "#8A8680",
              textAlign: "center",
              margin: 0,
            }}>
              No matches for &ldquo;{query}&rdquo;.
            </p>
          )}

          {query && results.map((entry, i) => (
            <ResultRow
              key={entry.id}
              entry={entry}
              selected={i === selectedIdx}
              onHover={() => setSelectedIdx(i)}
              onSelect={() => navigate(entry)}
            />
          ))}

          {!query && (
            <>
              <p style={{
                padding: "8px 20px 4px",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#8A8680",
                margin: 0,
              }}>
                Quick links
              </p>
              {quickLinks.map((entry, i) => (
                <ResultRow
                  key={entry.id}
                  entry={entry}
                  selected={i === selectedIdx}
                  onHover={() => setSelectedIdx(i)}
                  onSelect={() => navigate(entry)}
                />
              ))}
            </>
          )}
        </div>

        {/* Footer hints */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "10px 20px",
          borderTop: "1px solid #E8E4DE",
          background: "#FAFAF9",
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "11px",
          color: "#8A8680",
        }}>
          <Hint kbd="↑↓" label="navigate" />
          <Hint kbd="↩" label="select" />
          <Hint kbd="esc" label="close" />
        </div>
      </div>
    </div>
  );
}

function ResultRow({
  entry,
  selected,
  onHover,
  onSelect,
}: {
  entry: SearchEntry;
  selected: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      onMouseEnter={onHover}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        padding: "12px 18px 12px 18px",
        background: selected ? "#FAFAF9" : "transparent",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        borderLeft: selected ? "2px solid #C17F4A" : "2px solid transparent",
      }}
    >
      <KindBadge kind={entry.kind} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "14px",
          fontWeight: 500,
          color: "#252B28",
          margin: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          {entry.title}
        </p>
        {entry.subtitle && (
          <p style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "12px",
            color: "#8A8680",
            margin: "2px 0 0",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            {entry.subtitle}
          </p>
        )}
      </div>
      <span style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "11px",
        color: "#A8A39C",
        opacity: selected ? 1 : 0,
        transition: "opacity 0.15s",
      }}>
        ↩
      </span>
    </button>
  );
}

function KindBadge({ kind }: { kind: SearchEntry["kind"] }) {
  const map: Record<SearchEntry["kind"], { label: string; bg: string; color: string }> = {
    "case-study":   { label: "Case",   bg: "rgba(193,127,74,0.12)", color: "#C17F4A" },
    "section":      { label: "§",      bg: "rgba(37,43,40,0.06)",   color: "#3D4440" },
    "page":         { label: "Page",   bg: "rgba(37,43,40,0.06)",   color: "#3D4440" },
    "presentation": { label: "Slides", bg: "rgba(37,43,40,0.06)",   color: "#3D4440" },
  };
  const { label, bg, color } = map[kind];
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "44px",
      padding: "3px 8px",
      borderRadius: "4px",
      background: bg,
      color,
      fontFamily: "var(--font-dm-sans), sans-serif",
      fontSize: "10px",
      fontWeight: 700,
      letterSpacing: "0.06em",
      flexShrink: 0,
    }}>
      {label}
    </span>
  );
}

function Hint({ kbd, label }: { kbd: string; label: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
      <kbd style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "10px",
        padding: "2px 6px",
        background: "#FFFFFF",
        border: "1px solid #E8E4DE",
        borderRadius: "4px",
        color: "#525252",
        lineHeight: 1,
      }}>{kbd}</kbd>
      <span>{label}</span>
    </span>
  );
}

function SearchSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, opacity: 0.5 }}>
      <circle cx="11" cy="11" r="7" stroke="#252B28" strokeWidth="1.6" />
      <path d="M20 20L16.5 16.5" stroke="#252B28" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
