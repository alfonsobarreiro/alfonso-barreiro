"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

// Globally distributed pins lifted from the Wayfarer destinations data set —
// chosen for even coverage so markers are always visible as the globe spins.
const DESTINATIONS: Array<{ name: string; lng: number; lat: number }> = [
  // Europe
  { name: "Lisbon",         lng:   -9.1393, lat:  38.7223 },
  { name: "Barcelona",      lng:    2.1734, lat:  41.3851 },
  { name: "Amsterdam",      lng:    4.9041, lat:  52.3676 },
  { name: "Prague",         lng:   14.4378, lat:  50.0755 },
  { name: "Edinburgh",      lng:   -3.1883, lat:  55.9533 },
  { name: "Santorini",      lng:   25.4615, lat:  36.4172 },
  { name: "Istanbul",       lng:   28.9784, lat:  41.0082 },
  // Africa
  { name: "Marrakech",      lng:   -7.9811, lat:  31.6295 },
  { name: "Cairo",          lng:   31.2357, lat:  30.0444 },
  { name: "Zanzibar",       lng:   39.1989, lat:  -6.1526 },
  { name: "Victoria Falls", lng:   25.8383, lat: -17.9250 },
  { name: "Cape Town",      lng:   18.4241, lat: -33.9249 },
  { name: "Madagascar",     lng:   46.8691, lat: -18.7669 },
  // Middle East
  { name: "Petra",          lng:   35.4419, lat:  30.3286 },
  { name: "Dubai",          lng:   55.2708, lat:  25.2048 },
  // Asia
  { name: "Maldives",       lng:   73.2207, lat:   3.2028 },
  { name: "Jaipur",         lng:   75.7873, lat:  26.9124 },
  { name: "Bhutan",         lng:   89.6393, lat:  27.4728 },
  { name: "Lhasa",          lng:   91.1190, lat:  29.6470 },
  { name: "Hanoi",          lng:  105.8542, lat:  21.0285 },
  { name: "Angkor Wat",     lng:  103.8667, lat:  13.3667 },
  { name: "Singapore",      lng:  103.8198, lat:   1.3521 },
  { name: "Bali",           lng:  115.2126, lat:  -8.6705 },
  { name: "Tokyo",          lng:  139.6503, lat:  35.6762 },
  // Oceania
  { name: "Sydney",         lng:  151.2093, lat: -33.8688 },
  { name: "Auckland",       lng:  174.7633, lat: -36.8485 },
  // Americas
  { name: "Mexico City",    lng:  -99.1332, lat:  19.4326 },
  { name: "Cusco",          lng:  -71.9675, lat: -13.5320 },
  { name: "Rio de Janeiro", lng:  -43.1729, lat: -22.9068 },
  { name: "Banff",          lng: -115.5708, lat:  51.1784 },
  { name: "Reykjavik",      lng:  -21.9426, lat:  64.1466 },
  // North America
  { name: "New Orleans",    lng:  -90.0715, lat:  29.9511 },
  { name: "San Francisco",  lng: -122.4194, lat:  37.7749 },
];

const ACCENT          = "#C17F4A";
const INITIAL_ZOOM    = 3;
const SETTLED_ZOOM    = 1.6;
const INITIAL_CENTER: [number, number] = [10, 18];
const ZOOM_OUT_MS     = 2800;
const ROTATE_DEG_PER_SEC = 6;

export default function WayfarerGlobePeek({ paused = false }: { paused?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<mapboxgl.Map | null>(null);
  const rafRef       = useRef<number | null>(null);
  const pausedRef    = useRef(paused);
  const reducedRef   = useRef(false);

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    if (!MAPBOX_TOKEN) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[WayfarerGlobePeek] NEXT_PUBLIC_MAPBOX_TOKEN missing — globe will not render.");
      }
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedRef.current = reduced;

    let map: mapboxgl.Map;
    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;
      map = new mapboxgl.Map({
        container:          containerRef.current,
        style:              "mapbox://styles/mapbox/outdoors-v12",
        center:             INITIAL_CENTER,
        zoom:               reduced ? SETTLED_ZOOM : INITIAL_ZOOM,
        projection:         "globe",
        attributionControl: false,
        interactive:        false,
        dragRotate:         false,
        scrollZoom:         false,
        doubleClickZoom:    false,
        touchZoomRotate:    false,
        keyboard:           false,
      });
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[WayfarerGlobePeek] Mapbox init failed:", err);
      }
      return;
    }

    map.on("error", (e) => {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[WayfarerGlobePeek] Mapbox runtime error:", e?.error?.message || e);
      }
    });

    map.on("style.load", () => {
      map.setFog({
        color:           "rgb(50, 55, 65)",
        "high-color":    "rgb(25, 28, 35)",
        "horizon-blend": 0.12,
        "space-color":   "rgb(15, 15, 25)",
        "star-intensity": 0.3,
      });
    });

    map.on("load", () => {
      map.resize();
      requestAnimationFrame(() => map.resize());
      setTimeout(() => map.resize(), 300);

      DESTINATIONS.forEach((d) => {
        const el = document.createElement("div");
        el.style.cssText = `
          width: 14px;
          height: 14px;
          background: ${ACCENT};
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 1px 4px rgba(0,0,0,0.35);
          pointer-events: none;
        `;
        new mapboxgl.Marker({ element: el })
          .setLngLat([d.lng, d.lat])
          .addTo(map);
      });

      const startT = performance.now();
      let lastT    = startT;
      const tick = (now: number) => {
        if (!mapRef.current) return;
        const dt = now - lastT;
        lastT = now;

        const elapsed = now - startT;
        let zoom = SETTLED_ZOOM;
        if (!reducedRef.current && elapsed < ZOOM_OUT_MS) {
          const t      = elapsed / ZOOM_OUT_MS;
          const eased  = 1 - Math.pow(1 - t, 3);
          zoom         = INITIAL_ZOOM + (SETTLED_ZOOM - INITIAL_ZOOM) * eased;
        }

        const c = mapRef.current.getCenter();
        let lng = c.lng;
        if (!pausedRef.current && !reducedRef.current && dt < 200) {
          lng += (ROTATE_DEG_PER_SEC * dt) / 1000;
        }

        mapRef.current.jumpTo({ center: [lng, c.lat], zoom });
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    });

    mapRef.current = map;

    const ro = new ResizeObserver(() => {
      if (mapRef.current) mapRef.current.resize();
    });
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      ro.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      role="img"
      aria-label="Wayfarer interactive globe preview"
      style={{
        position:    "relative",
        width:       "100%",
        aspectRatio: "16 / 10",
        overflow:    "hidden",
        background:  "rgb(15, 15, 25)",
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          inset:    0,
        }}
      />
    </div>
  );
}
