"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { searchEntries, type SearchEntry } from "@/lib/search-index";

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
    const list = results;
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
        background: "rgba(0, 0, 0, 0.75)",
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
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: 16,
          boxShadow: "0 18px 60px rgba(37,43,40,0.18), 0 4px 12px rgba(37,43,40,0.08)",
          overflow: "hidden",
        }}
      >
        {/* Input */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 20px", borderBottom: "1px solid var(--color-border)" }}>
          <SearchSvg />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Search"
            style={{
              flex: 1,
              padding: "20px 0",
              border: "none",
              outline: "none",
              fontSize: "15px",
              fontFamily: "var(--font-dm-sans), sans-serif",
              color: "var(--color-text)",
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
              fontSize: "15px",
              color: "var(--color-text-muted)",
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
        background: selected ? "var(--color-bg-page)" : "transparent",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        borderLeft: selected ? "2px solid var(--color-accent)" : "2px solid transparent",
      }}
    >
      <KindBadge kind={entry.kind} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "15px",
          fontWeight: 500,
          color: "var(--color-text)",
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
            color: "var(--color-text-muted)",
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
        fontSize: "12px",
        color: "var(--color-neutral-400)",
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
    "case-study":   { label: "Case",   bg: "var(--color-terracotta-100)", color: "var(--color-text-link)" },
    "section":      { label: "§",      bg: "var(--color-neutral-100)",    color: "var(--color-neutral-700)" },
    "page":         { label: "Page",   bg: "var(--color-neutral-100)",    color: "var(--color-neutral-700)" },
    "presentation": { label: "Slides", bg: "var(--color-neutral-100)",    color: "var(--color-neutral-700)" },
  };
  const { label, bg, color } = map[kind];
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "44px",
      padding: "3px 8px",
      borderRadius: 0,
      background: bg,
      color,
      fontFamily: "var(--font-dm-sans), sans-serif",
      fontSize: "12px",
      fontWeight: 500,
      letterSpacing: "0.01em",
      flexShrink: 0,
    }}>
      {label}
    </span>
  );
}

function SearchSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, opacity: 0.5 }}>
      <circle cx="11" cy="11" r="7" stroke="var(--color-text)" strokeWidth="1.6" />
      <path d="M20 20L16.5 16.5" stroke="var(--color-text)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
