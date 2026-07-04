"use client";

import { useEffect } from "react";

/* Wires up the sticky arc-nav on each case study.

   Was a `<script dangerouslySetInnerHTML>` inlined in each page,
   which fired once on hard load but not on Next.js client-side
   route changes — so hopping from one case study to another left
   the arc-nav's active state stuck (Alfonso 2026-07-03: "the
   sticky navs take a refresh to register on all the case studies").

   Client Component with useEffect fixes that: the effect re-runs on
   every navigation into a case study page, re-attaching the scroll
   listener, click handler, and hashchange sync fresh each time. */
export default function StickyArcNavInit({
  arcs,
  navStackHeight = 140,
}: {
  arcs: string[];
  navStackHeight?: number;
}) {
  useEffect(() => {
    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[data-arc-anchor]"));
    if (!anchors.length) return;
    const targets = arcs
      .map((k) => document.getElementById(`arc-${k}`))
      .filter((el): el is HTMLElement => !!el);
    if (targets.length < arcs.length) return;

    const map: Record<string, HTMLAnchorElement> = {};
    anchors.forEach((a) => { map[a.getAttribute("data-arc-anchor")!] = a; });

    let activeKey: string | null = null;
    let rafScheduled = false;

    function computeActive() {
      rafScheduled = false;
      const scrollY = window.scrollY;
      const activeLine = scrollY + window.innerHeight * 0.33;
      const seen = targets.map((el) => ({
        key: el.id.replace("arc-", ""),
        top: el.getBoundingClientRect().top + scrollY,
      }));
      let nextKey: string | null = null;
      if (activeLine >= seen[0].top) {
        for (let j = 0; j < seen.length; j++) {
          const next = j + 1 < seen.length ? seen[j + 1].top : Infinity;
          if (activeLine >= seen[j].top && activeLine < next) {
            nextKey = seen[j].key;
            break;
          }
        }
      }
      if (nextKey === activeKey) return;
      activeKey = nextKey;
      anchors.forEach((a) => {
        if (nextKey && a.getAttribute("data-arc-anchor") === nextKey) {
          a.setAttribute("data-active", "true");
        } else {
          a.removeAttribute("data-active");
        }
      });
      /* Move the Wayfarer sliding underline if present. Harmless on
         MSR/Spotify (they use a per-anchor box-shadow instead of a
         shared bar, so querySelector just returns null). */
      const slider = document.querySelector<HTMLElement>(".wf2-arc-slider");
      if (slider) {
        const activeIdx = anchors.findIndex((a) => a.getAttribute("data-active") === "true");
        if (activeIdx >= 0) {
          slider.style.transform = `translateX(${activeIdx * 100}%)`;
          slider.style.opacity = "1";
        } else {
          slider.style.opacity = "0";
        }
      }
    }

    function onScroll() {
      if (rafScheduled) return;
      rafScheduled = true;
      requestAnimationFrame(computeActive);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    computeActive();

    /* Click handler: paint the active chip immediately and scroll
       to the target under the nav stack. */
    const clickHandlers: Array<[HTMLAnchorElement, EventListener]> = [];
    anchors.forEach((a) => {
      const handler: EventListener = (ev) => {
        const key = a.getAttribute("data-arc-anchor");
        if (!key) return;
        const target = document.getElementById(`arc-${key}`);
        if (!target) return;
        ev.preventDefault();
        anchors.forEach((x) => x.removeAttribute("data-active"));
        a.setAttribute("data-active", "true");
        const y = target.getBoundingClientRect().top + window.scrollY - navStackHeight;
        window.scrollTo({ top: y, behavior: "smooth" });
        if (history && history.replaceState) history.replaceState(null, "", `#arc-${key}`);
      };
      a.addEventListener("click", handler);
      clickHandlers.push([a, handler]);
    });

    /* Hashchange sync — deep links (#arc-decisions) land with the
       right chip painted and scroll through the nav-stack math. */
    function syncFromHash() {
      const m = /^#arc-([a-z]+)$/.exec(window.location.hash || "");
      if (!m) return;
      const key = m[1];
      const target = document.getElementById(`arc-${key}`);
      if (!target) return;
      anchors.forEach((x) => x.removeAttribute("data-active"));
      if (map[key]) map[key].setAttribute("data-active", "true");
      const y = target.getBoundingClientRect().top + window.scrollY - navStackHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    window.addEventListener("hashchange", syncFromHash);
    if (window.location.hash) window.setTimeout(syncFromHash, 200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", syncFromHash);
      clickHandlers.forEach(([a, h]) => a.removeEventListener("click", h));
    };
  }, [arcs, navStackHeight]);

  return null;
}
