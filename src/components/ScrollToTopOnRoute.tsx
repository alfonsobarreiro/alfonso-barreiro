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
 *
 * Exception: URLs with a hash fragment (e.g. /work/spotify#try-it) must
 * anchor to the fragment's element instead of scrolling to top. The natural
 * browser anchor jump fires before React hydrates the target section, so
 * this component takes over after mount and calls scrollIntoView() on the
 * target once the DOM is ready. `scroll-margin-top` on the target handles
 * the sticky-nav clearance.
 */
export default function ScrollToTopOnRoute() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    const hash = window.location.hash.slice(1);
    if (hash) {
      const scrollToHash = () => {
        const target = document.getElementById(hash);
        if (target) target.scrollIntoView();
      };
      // First attempt after this render pass. If the target is still not
      // in the DOM (deferred section rendering, lazy content), retry on
      // the next frame so slow-hydrating pages still land right.
      scrollToHash();
      requestAnimationFrame(scrollToHash);
    } else {
      window.scrollTo(0, 0);
    }

    html.style.scrollBehavior = prev;
  }, [pathname]);

  return null;
}
