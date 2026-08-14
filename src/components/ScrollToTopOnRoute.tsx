"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollToTopOnRoute
 * ─────────────────────────────────────────────────────────────────────────────
 * Every route change lands at scroll Y=0. Neutralizes the combination of
 * `html { scroll-behavior: smooth }` + Next.js scroll restoration + bfcache,
 * which was producing a visible smooth-scroll to a mid-page position when
 * arriving at /about, /process, and other tall pages.
 */
export default function ScrollToTopOnRoute() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }, [pathname]);

  return null;
}
