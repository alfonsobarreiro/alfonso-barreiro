"use client";

import { useEffect } from "react";

/**
 * KeyboardModality
 * ─────────────────────────────────────────────────────────────────────────
 * Tracks whether the user is currently navigating with the keyboard or a
 * pointer. Sets `data-keyboard-nav` on <body> when Tab (or arrow keys
 * inside a focused widget) is pressed; clears it on mousedown/touchstart.
 *
 * The skip link in globals.css gates its visible state on this attribute
 * so mouse-driven Next.js route changes can't reveal it. Other components
 * can use the same attribute selector if they want keyboard-only visuals.
 */
export default function KeyboardModality() {
  useEffect(() => {
    const NAV_KEYS = new Set(["Tab", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
    const setKeyboard = (on: boolean) => {
      if (on) document.body.setAttribute("data-keyboard-nav", "");
      else    document.body.removeAttribute("data-keyboard-nav");
    };

    const onKey = (e: KeyboardEvent) => {
      if (NAV_KEYS.has(e.key)) setKeyboard(true);
    };
    const onPointer = () => setKeyboard(false);

    document.addEventListener("keydown", onKey, true);
    document.addEventListener("mousedown", onPointer, true);
    document.addEventListener("touchstart", onPointer, { capture: true, passive: true });

    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("mousedown", onPointer, true);
      document.removeEventListener("touchstart", onPointer, true);
    };
  }, []);

  return null;
}
