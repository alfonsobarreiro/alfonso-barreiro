"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

type Destination = {
  name:     string;
  country:  string;
  lng:      number;
  lat:      number;
  tagline?: string;
  /* Card thumbnail — CSS background value (gradient or image url). Lets
     the card carry a photo-like visual without external dependencies;
     swap for real image URLs when desired. */
  media?:   string;
};

const DESTINATIONS: Destination[] = [
  { name: "Lisbon",         country: "Portugal",         lng:   -9.1393, lat:  38.7223, tagline: "Atlantic edge",
    media: "url('https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=240&q=80&auto=format&fit=crop'), linear-gradient(180deg, #FFE3A0 0%, #C0552A 60%, #1A0E08 100%)" },
  { name: "Barcelona",      country: "Spain",            lng:    2.1734, lat:  41.3851 },
  { name: "Amsterdam",      country: "Netherlands",      lng:    4.9041, lat:  52.3676 },
  { name: "Prague",         country: "Czechia",          lng:   14.4378, lat:  50.0755 },
  { name: "Edinburgh",      country: "Scotland",         lng:   -3.1883, lat:  55.9533 },
  { name: "Santorini",      country: "Greece",           lng:   25.4615, lat:  36.4172 },
  { name: "Istanbul",       country: "Türkiye",          lng:   28.9784, lat:  41.0082 },
  { name: "Marrakech",      country: "Morocco",          lng:   -7.9811, lat:  31.6295 },
  { name: "Cairo",          country: "Egypt",            lng:   31.2357, lat:  30.0444 },
  { name: "Zanzibar",       country: "Tanzania",         lng:   39.1989, lat:  -6.1526 },
  { name: "Victoria Falls", country: "Zambia / Zimbabwe", lng:   25.8383, lat: -17.9250 },
  { name: "Cape Town",      country: "South Africa",     lng:   18.4241, lat: -33.9249, tagline: "Where two oceans meet",
    media: "url('https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=240&q=80&auto=format&fit=crop'), linear-gradient(180deg, #C8E4EA 0%, #2A6373 60%, #051820 100%)" },
  { name: "Madagascar",     country: "Madagascar",       lng:   46.8691, lat: -18.7669 },
  { name: "Petra",          country: "Jordan",           lng:   35.4419, lat:  30.3286 },
  { name: "Dubai",          country: "UAE",              lng:   55.2708, lat:  25.2048 },
  { name: "Maldives",       country: "Maldives",         lng:   73.2207, lat:   3.2028 },
  { name: "Jaipur",         country: "India",            lng:   75.7873, lat:  26.9124 },
  { name: "Bhutan",         country: "Bhutan",           lng:   89.6393, lat:  27.4728, tagline: "The Last Shangri-La",
    media: "url('https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=240&q=80&auto=format&fit=crop'), linear-gradient(180deg, #8AA8C8 0%, #6B4530 60%, #1A2418 100%)" },
  { name: "Lhasa",          country: "Tibet",            lng:   91.1190, lat:  29.6470 },
  { name: "Hanoi",          country: "Vietnam",          lng:  105.8542, lat:  21.0285 },
  { name: "Angkor Wat",     country: "Cambodia",         lng:  103.8667, lat:  13.3667 },
  { name: "Singapore",      country: "Singapore",        lng:  103.8198, lat:   1.3521 },
  { name: "Bali",           country: "Indonesia",        lng:  115.2126, lat:  -8.6705 },
  { name: "Tokyo",          country: "Japan",            lng:  139.6503, lat:  35.6762 },
  { name: "Sydney",         country: "Australia",        lng:  151.2093, lat: -33.8688 },
  { name: "Auckland",       country: "New Zealand",      lng:  174.7633, lat: -36.8485 },
  { name: "Mexico City",    country: "Mexico",           lng:  -99.1332, lat:  19.4326 },
  { name: "Cusco",          country: "Peru",             lng:  -71.9675, lat: -13.5320 },
  { name: "Rio de Janeiro", country: "Brazil",           lng:  -43.1729, lat: -22.9068 },
  { name: "Banff",          country: "Canada",           lng: -115.5708, lat:  51.1784 },
  { name: "Reykjavik",      country: "Iceland",          lng:  -21.9426, lat:  64.1466 },
  { name: "New Orleans",    country: "United States",    lng:  -90.0715, lat:  29.9511 },
  { name: "San Francisco",  country: "United States",    lng: -122.4194, lat:  37.7749 },
];

const ACCENT          = "#C17F4A";
const INITIAL_ZOOM    = 3;
const SETTLED_ZOOM    = 1.6;
const ZOOMED_IN       = 4.2;
const INITIAL_CENTER: [number, number] = [10, 18];
const ZOOM_OUT_MS     = 2800;
const ROTATE_DEG_PER_SEC = 6;
const FLY_IN_MS       = 1400;
const HOLD_MS         = 3000;
const FLY_OUT_MS      = 1400;

/**
 * WayfarerGlobePeek
 * ─────────────────────────────────────────────────────────────────────────────
 * Interactive Mapbox globe inside the Figma iPad Pro mockup. The globe
 * auto-rotates by default. Clicking a pin flies the camera in, shows a
 * city/country chip, holds for a few seconds, flies back out, and resumes
 * the rotation. The auto-rotate loop also pauses while the parent card is
 * hovered (existing behavior).
 */
export default function WayfarerGlobePeek({ paused = false }: { paused?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<mapboxgl.Map | null>(null);
  const rafRef       = useRef<number | null>(null);
  const pausedRef    = useRef(paused);
  const reducedRef   = useRef(false);
  const flyingRef    = useRef(false);
  const demoStartRef = useRef<number | null>(null);
  const demoTickRef  = useRef<number | null>(null);
  const [selected, setSelected] = useState<Destination | null>(null);
  const [failed,   setFailed]   = useState(false);

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    if (!MAPBOX_TOKEN) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[WayfarerGlobePeek] NEXT_PUBLIC_MAPBOX_TOKEN missing — globe will not render.");
      }
      setFailed(true);
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
      setFailed(true);
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

    /* Pin click → fly in, show chip, hold, fly out, resume rotation. */
    const flyToDestination = (d: Destination) => {
      if (!mapRef.current || flyingRef.current) return;
      flyingRef.current = true;
      setSelected(d);

      mapRef.current.flyTo({
        center:   [d.lng, d.lat],
        zoom:     ZOOMED_IN,
        duration: FLY_IN_MS,
        essential: true,
      });

      window.setTimeout(() => {
        if (!mapRef.current) return;
        setSelected(null);
        mapRef.current.flyTo({
          center:   [d.lng + 8, d.lat - 4],
          zoom:     SETTLED_ZOOM,
          duration: FLY_OUT_MS,
          essential: true,
        });
        window.setTimeout(() => { flyingRef.current = false; }, FLY_OUT_MS + 60);
      }, FLY_IN_MS + HOLD_MS);
    };

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
          pointer-events: auto;
          cursor: pointer;
          transition: transform 0.2s ease;
        `;
        el.addEventListener("mouseenter", () => { el.style.transform = "scale(1.35)"; });
        el.addEventListener("mouseleave", () => { el.style.transform = "scale(1)"; });
        el.addEventListener("click", (ev) => {
          ev.stopPropagation();
          ev.preventDefault();
          flyToDestination(d);
        });
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

        /* While a fly-to is running, leave Mapbox alone — don't fight its
           own camera animation with our jumpTo. */
        if (flyingRef.current) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }

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

      /* Auto-demo — cycle through a curated set of destinations so a
         recruiter sees the interactive pin → country reveal without
         needing to click. Skips when paused (hover) or when a fly-to
         is already in flight. Reduced-motion users see no demo. */
      const DEMO_SEQUENCE = ["Bhutan", "Lisbon", "Cape Town"];
      let demoIdx = 0;
      const stepDemo = () => {
        if (pausedRef.current || flyingRef.current || reducedRef.current) return;
        const target = DESTINATIONS.find(d => d.name === DEMO_SEQUENCE[demoIdx]);
        if (target) flyToDestination(target);
        demoIdx = (demoIdx + 1) % DEMO_SEQUENCE.length;
      };
      /* First demo flight fires ~2.5s after the globe is in the viewport
         (not after map load) so a recruiter scrolling down sees the
         interaction happen right under their cursor instead of having
         missed it while the section was offscreen. Subsequent cycles fire
         every 13s = fly-in (1.4s) + hold (3s) + fly-out (1.4s) + ~7s
         breather. */
      const startDemoOnce = () => {
        if (demoStartRef.current !== null || demoTickRef.current !== null) return;
        demoStartRef.current = window.setTimeout(() => {
          stepDemo();
          demoTickRef.current = window.setInterval(stepDemo, 13000);
        }, 2500);
      };
      const viewportObserver = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.3) {
            startDemoOnce();
            viewportObserver.disconnect();
            break;
          }
        }
      }, { threshold: [0.3] });
      if (containerRef.current) viewportObserver.observe(containerRef.current);
    });

    mapRef.current = map;

    const ro = new ResizeObserver(() => {
      if (mapRef.current) mapRef.current.resize();
    });
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      if (demoStartRef.current !== null) {
        window.clearTimeout(demoStartRef.current);
        demoStartRef.current = null;
      }
      if (demoTickRef.current !== null) {
        window.clearInterval(demoTickRef.current);
        demoTickRef.current = null;
      }
      ro.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      role="img"
      aria-label="Wayfarer interactive globe on an iPad Pro"
      style={{
        position: "relative",
        width:    "100%",
        height:   "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position:     "absolute",
          left:         "13.13%",
          top:          "7.63%",
          width:        "73.74%",
          height:       "84.67%",
          overflow:     "hidden",
          borderRadius: "1.4%",
          background:   "rgb(15, 15, 25)",
          zIndex:       2,
        }}
      >
        <div
          ref={containerRef}
          style={{ position: "absolute", inset: 0 }}
        />

        {/* Empty / error state — when Mapbox can't load (missing token,
            network failure, etc.) render a quiet fallback so the screen
            isn't a silent dark void. Cate: "silence is rarely neutral." */}
        {failed && (
          <div
            style={{
              position:       "absolute",
              inset:          0,
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              justifyContent: "center",
              padding:        "8% 12%",
              textAlign:      "center",
              color:          "#FAFAF9",
              fontFamily:     "var(--font-dm-sans), sans-serif",
              gap:            "10px",
            }}
          >
            <span
              style={{
                fontSize:      "10px",
                fontWeight:    700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color:         ACCENT,
              }}
            >
              Wayfarer
            </span>
            <p
              style={{
                fontSize:   "clamp(12px, 1.2vw, 15px)",
                lineHeight: 1.45,
                margin:     0,
                opacity:    0.85,
              }}
            >
              Travel discovery platform with an interactive globe.
            </p>
            <p
              style={{
                fontSize:      "11px",
                margin:        "6px 0 0",
                opacity:       0.65,
                letterSpacing: "0.03em",
              }}
            >
              View the case study →
            </p>
          </div>
        )}

        {/* Destination card — appears on pin click / auto-demo, overlays
            the globe. Picture block left, text right, matching the live
            site's destination card pattern. */}
        {selected && (
          <div
            aria-live="polite"
            style={{
              position:        "absolute",
              left:            "50%",
              bottom:          "7%",
              transform:       "translateX(-50%)",
              background:      "rgba(15, 15, 25, 0.94)",
              backdropFilter:  "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              borderRadius:    "12px",
              color:           "#FAFAF9",
              fontFamily:      "var(--font-dm-sans), sans-serif",
              boxShadow:       "0 16px 40px -12px rgba(0,0,0,0.75)",
              pointerEvents:   "none",
              zIndex:          3,
              animation:       "wayfarerChipIn 0.3s ease-out forwards",
              display:         "flex",
              alignItems:      "stretch",
              gap:             "16px",
              padding:         "14px",
              width:           "min(88%, 360px)",
            }}
          >
            <div
              aria-hidden
              style={{
                flex:               "0 0 auto",
                width:              "100px",
                height:             "100px",
                borderRadius:       "8px",
                backgroundImage:    selected.media || "linear-gradient(180deg, #2A3B52, #1A2530)",
                backgroundSize:     "cover",
                backgroundPosition: "center",
                backgroundRepeat:   "no-repeat",
                backgroundColor:    "#1A2530",
              }}
            />
            <div style={{ flex: "1 1 auto", display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
              <div style={{ fontSize: "17px", fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.15 }}>
                {selected.name}
              </div>
              <div style={{ fontSize: "13px", opacity: 0.78, marginTop: "4px", letterSpacing: "0.01em", lineHeight: 1.35 }}>
                {selected.tagline || selected.country}
              </div>
              <div style={{ fontSize: "10px", color: ACCENT, marginTop: "10px", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
                View full guide →
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes wayfarerChipIn {
            from { opacity: 0; transform: translate(-50%, 8px); }
            to   { opacity: 1; transform: translate(-50%, 0); }
          }
        `}</style>
      </div>

      <img
        src="/images/devices/ipad-pro.png"
        alt=""
        aria-hidden
        style={{
          position:      "absolute",
          left:          "-34.40%",
          top:           "-17.50%",
          width:         "168.81%",
          maxWidth:      "none",
          height:        "auto",
          pointerEvents: "none",
          zIndex:        1,
        }}
      />
    </div>
  );
}
