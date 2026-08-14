"use client";

import { useEffect } from "react";

/**
 * SpotifyControlsInit
 * ─────────────────────────────────────────────────────────────────────────────
 * Wires the Recently-Played Controls sticky chip nav + the state-diagram
 * horizontal centering. Previously an inline <script dangerouslySetInnerHTML>
 * inside the server-rendered page; React 19 / Next 16 flag inline scripts in
 * component trees because they don't execute during client-side re-renders.
 * Same code, now runs on mount via useEffect.
 *
 * Guarded by typeof window checks + document.readyState so the wire-up
 * survives SSR + hot reload + hydration races.
 */
export default function SpotifyControlsInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const KEYS = ["pin", "remove", "pause"];

    /* Active detector. Re-queries the DOM each tick to survive
       React hot-reload + hydration races. Picks the section
       straddling viewport center; falls back to the last section
       whose top has crossed the chip nav. */
    function update() {
      const anchors = document.querySelectorAll("a[data-control-anchor]");
      if (!anchors.length) return;
      const sections = KEYS
        .map((k) => document.getElementById("control-" + k))
        .filter((s): s is HTMLElement => Boolean(s));
      if (!sections.length) return;
      const probe = window.innerHeight / 2;
      let bestKey: string | null = null;
      sections.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          bestKey = s.id.replace("control-", "");
        }
      });
      if (!bestKey) {
        let bestTop = -Infinity;
        const navBottom = 124;
        sections.forEach((s) => {
          const top = s.getBoundingClientRect().top;
          if (top <= navBottom && top > bestTop) {
            bestTop = top;
            bestKey = s.id.replace("control-", "");
          }
        });
      }
      const currentActive = document.querySelector(".sp2-control-nav a[data-active]");
      const currentKey = currentActive ? currentActive.getAttribute("data-control-anchor") : null;
      if (bestKey === currentKey) return;
      anchors.forEach((a) => {
        a.removeAttribute("data-active");
        a.removeAttribute("aria-current");
      });
      const target = [...anchors].find((a) => a.getAttribute("data-control-anchor") === bestKey);
      if (target) {
        target.setAttribute("data-active", "true");
        target.setAttribute("aria-current", "location");
      }
    }

    let frameQueued = false;
    function schedule() {
      if (frameQueued) return;
      frameQueued = true;
      requestAnimationFrame(() => {
        frameQueued = false;
        update();
      });
    }

    let trigger: IntersectionObserver | null = null;
    function wireObserver() {
      if (trigger) trigger.disconnect();
      trigger = new IntersectionObserver(schedule, { threshold: [0, 0.25, 0.5, 0.75, 1] });
      KEYS.forEach((k) => {
        const el = document.getElementById("control-" + k);
        if (el && trigger) trigger.observe(el);
      });
    }

    function syncChipToHash() {
      const m = /^#control-(pin|remove|pause)$/.exec(window.location.hash || "");
      if (!m) return;
      const key = m[1];
      document.querySelectorAll(".sp2-control-nav a[data-control-anchor]").forEach((a) => {
        if (a.getAttribute("data-control-anchor") === key) {
          a.setAttribute("data-active", "true");
          a.setAttribute("aria-current", "location");
        } else {
          a.removeAttribute("data-active");
          a.removeAttribute("aria-current");
        }
      });
    }

    function chipInit() {
      syncChipToHash();
      wireObserver();
      update();
    }

    const onHashChange = () => {
      syncChipToHash();
      setTimeout(schedule, 900);
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") schedule();
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const link = t && t.closest ? (t.closest("a[data-control-anchor]") as HTMLElement | null) : null;
      if (link) {
        document.querySelectorAll(".sp2-control-nav a[data-control-anchor]").forEach((a) => {
          a.removeAttribute("data-active");
          a.removeAttribute("aria-current");
        });
        link.setAttribute("data-active", "true");
        link.setAttribute("aria-current", "location");
        setTimeout(() => {
          wireObserver();
          schedule();
        }, 400);
      }
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("touchmove", schedule, { passive: true });
    window.addEventListener("touchend", schedule, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("click", onClick, { passive: true } as AddEventListenerOptions);

    if (document.readyState === "complete") setTimeout(chipInit, 200);
    else window.addEventListener("load", () => setTimeout(chipInit, 200));

    /* State-diagram horizontal centering. The interesting nodes sit in
       the middle of the canvas, so scrollLeft=0 would land on empty
       whitespace. Re-centers aggressively because Next Image swaps src
       after initial paint, mobile Safari fires viewport resize as the
       URL bar collapses, and layout shifts as fonts finish loading. */
    function centerState() {
      const el = document.querySelector<HTMLElement>(".sp2-state-scroll");
      if (!el) return;
      if (el.scrollWidth > el.clientWidth) {
        el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
      }
    }

    let mo: MutationObserver | null = null;
    let ro: ResizeObserver | null = null;
    const centerTimers: number[] = [];

    function wireStateCenter() {
      centerState();
      const el = document.querySelector<HTMLElement>(".sp2-state-scroll");
      const img = el && el.querySelector("img");
      if (img) {
        if (!img.complete) img.addEventListener("load", centerState, { once: true });
        try {
          mo = new MutationObserver(centerState);
          mo.observe(img, { attributes: true, attributeFilter: ["src", "srcset"] });
        } catch (_) {}
      }
      if (el && typeof ResizeObserver === "function") {
        try {
          ro = new ResizeObserver(centerState);
          ro.observe(el);
        } catch (_) {}
      }
      [50, 150, 400, 800, 1500, 2500].forEach((t) => {
        centerTimers.push(window.setTimeout(centerState, t));
      });
    }

    if (document.readyState === "complete") wireStateCenter();
    else window.addEventListener("load", wireStateCenter);
    window.addEventListener("resize", centerState);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) centerState();
    });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("touchmove", schedule);
      window.removeEventListener("touchend", schedule);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("resize", centerState);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("click", onClick);
      if (trigger) trigger.disconnect();
      if (mo) mo.disconnect();
      if (ro) ro.disconnect();
      centerTimers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return null;
}
