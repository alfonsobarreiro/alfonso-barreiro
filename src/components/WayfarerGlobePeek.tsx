"use client";

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
  { name: "New Zealand",    lng:  168.7125, lat: -44.5638 },
  { name: "Fiji",           lng:  178.0650, lat: -17.7134 },
  { name: "Bora Bora",      lng: -151.7415, lat: -16.5004 },
  // Americas
  { name: "Easter Island",  lng: -109.3521, lat: -27.1127 },
  { name: "Patagonia",      lng:  -72.2648, lat: -50.3402 },
  { name: "Buenos Aires",   lng:  -58.3816, lat: -34.6037 },
  { name: "Machu Picchu",   lng:  -72.5450, lat: -13.1631 },
  { name: "Cusco",          lng:  -71.9877, lat: -13.5316 },
  { name: "Cartagena",      lng:  -75.4794, lat:  10.3910 },
  { name: "Havana",         lng:  -82.3794, lat:  23.1291 },
  { name: "Tulum",          lng:  -87.4271, lat:  20.2114 },
  { name: "Banff",          lng: -115.5348, lat:  51.4545 },
  // Polar / North Atlantic
  { name: "Reykjavík",      lng:  -21.9426, lat:  64.1466 },
  { name: "Greenland",      lng:  -42.6043, lat:  71.7069 },
  { name: "Svalbard",       lng:   15.6267, lat:  77.9454 },
];

const ACCENT          = "#D27A5E"; // Wayfarer terra cotta — same as DestinationMap
const ROTATE_DEG_PER_SEC = 5.5;    // time-based for consistent smoothness across frame rates
const INITIAL_ZOOM    = 3;         // start zoomed in close
const SETTLED_ZOOM    = 1.6;       // pull back to settled view
const INITIAL_CENTER: [number, number] = [10, 18]; // Atlantic + Europe/Africa visible
const ZOOM_OUT_MS     = 2800;

export default function WayfarerGlobePeek({ paused = false }: { paused?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<mapboxgl.Map | null>(null);
  const rafRef       = useRef<number | null>(null);
  const pausedRef    = useRef(paused);
  const reducedRef   = useRef(false);

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Fail soft: no token → render the dark backdrop only, never crash the page.
    // Happens if NEXT_PUBLIC_MAPBOX_TOKEN isn't set in the deploy environment.
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

    // Catch async errors (bad token, restricted URL, network) without crashing React.
    map.on("error", (e) => {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[WayfarerGlobePeek] Mapbox runtime error:", e?.error?.message || e);
      }
    });

    map.on("style.load", () => {
      // Match Wayfarer's fog
      map.setFog({
        color:           "rgb(50, 55, 65)",
        "high-color":    "rgb(25, 28, 35)",
        "horizon-blend": 0.12,
        "space-color":   "rgb(15, 15, 25)",
        "star-intensity": 0.3,
      });
    });

    map.on("load", () => {
      // Drop markers — same shape as DestinationMap but smaller / non-interactive
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

      // Single rAF loop driving BOTH the opening zoom-out and the continuous
      // rotation — managing them separately causes setCenter to interrupt easeTo.
      const startT = performance.now();
      let lastT    = startT;
      const tick = (now: number) => {
        if (!mapRef.current) return;
        const dt = now - lastT;
        lastT = now;

        // Opening zoom-out: ease from INITIAL_ZOOM → SETTLED_ZOOM over ZOOM_OUT_MS
        const elapsed = now - startT;
        let zoom = SETTLED_ZOOM;
        if (!reducedRef.current && elapsed < ZOOM_OUT_MS) {
          const t      = elapsed / ZOOM_OUT_MS;
          const eased  = 1 - Math.pow(1 - t, 3); // ease-out-cubic
          zoom         = INITIAL_ZOOM + (SETTLED_ZOOM - INITIAL_ZOOM) * eased;
        }

        // Rotation: time-based delta for consistent smoothness
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

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
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
        background:  "rgb(15, 15, 25)", // same space-color as fog so seams disappear
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
