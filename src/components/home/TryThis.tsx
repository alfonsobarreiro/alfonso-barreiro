/* "Try this." The cue in front of an interaction's instruction line, so a
   visitor reads it as something to do, not a caption. Terracotta-700 (the
   link color on white) at the line's own size, with a hand-drawn arrow
   that bends down toward the controls. The arrow is decorative; the words
   carry the cue, and the period keeps screen readers pausing before the
   instruction. */
export function TryThis() {
  return (
    <span className="try-this">
      Try this.
      <svg className="try-this__arrow" width="26" height="22" viewBox="0 0 26 22" fill="none" aria-hidden="true" focusable="false">
        <path d="M2 4c7-3 15-1 18 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M15.5 9.5 20.5 12l1.5-5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <style>{`
        .try-this {
          display: inline-flex; align-items: flex-start; gap: 2px;
          margin-right: 6px;
          color: var(--color-terracotta-700); font-weight: 500;
        }
        .try-this__arrow { flex: none; margin-top: 0.35em; }
        @media (forced-colors: active) { .try-this { color: LinkText; } }
      `}</style>
    </span>
  );
}
