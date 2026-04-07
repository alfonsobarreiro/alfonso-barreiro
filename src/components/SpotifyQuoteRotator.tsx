"use client";

import { useState, useEffect } from "react";

const quotes = [
  { text: "I don't want my partner's eyes to catch my home screen.", source: "Reddit, Oct 2024" },
  { text: "Recently Played is literally the ONE AND ONLY feature of the app I use.", source: "Reddit, Oct 2024" },
  { text: "Spotify always shows the cringiest thing you've listened to.", source: "Reddit, Jul 2023" },
  { text: "I'd play 1 second of a track so it would show in Recently Played.", source: "Spotify Community, 2020" },
  { text: "That annoyed me so much — I left Spotify.", source: "Reddit, Jul 2023" },
  { text: "Listening history is like a diary of my music journey.", source: "Spotify Community, 2021" },
  { text: "Apple Music lets you clear listening history. Spotify should too.", source: "App Store, 2023" },
  { text: "Why hasn't Spotify added a clear history option yet?", source: "Spotify Community, Jun 2020" },
];

interface SpotifyQuoteRotatorProps {
  accentColor?: string;
  mutedColor?: string;
  bodyColor?: string;
  borderColor?: string;
  bgColor?: string;
  fontSans?: string;
  fontDisplay?: string;
}

export default function SpotifyQuoteRotator({
  accentColor = "#C17F4A",
  mutedColor = "#8A8680",
  bodyColor = "#3D4440",
  borderColor = "#E8E4DE",
  bgColor = "#FFFFFF",
  fontSans = "var(--font-dm-sans), system-ui, sans-serif",
  fontDisplay = "var(--font-dm-serif-display), Georgia, serif",
}: SpotifyQuoteRotatorProps) {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % quotes.length);
        setFading(false);
      }, 300);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const quote = quotes[active];

  return (
    <div
      style={{
        padding:    "32px 40px 24px",
        background: bgColor,
        border:     `1px solid ${borderColor}`,
        position:   "relative",
        overflow:   "hidden",
      }}
    >
      {/* accent bar */}
      <div
        style={{
          position:   "absolute",
          top:        0,
          left:       0,
          width:      "3px",
          height:     "100%",
          background: accentColor,
        }}
      />

      {/* fixed-height quote area — prevents layout shift */}
      <div
        style={{
          height:         "100px",
          overflow:       "hidden",
          display:        "flex",
          flexDirection:  "column",
          justifyContent: "center",
          opacity:        fading ? 0 : 1,
          transition:     "opacity 0.3s ease",
        }}
      >
        <p
          style={{
            fontFamily: fontDisplay,
            fontSize:   "clamp(15px, 1.8vw, 19px)",
            fontStyle:  "italic",
            color:      bodyColor,
            margin:     "0 0 10px",
            lineHeight: 1.5,
          }}
        >
          &ldquo;{quote.text}&rdquo;
        </p>
        <p
          style={{
            fontFamily:    fontSans,
            fontSize:      "12px",
            color:         mutedColor,
            margin:        0,
            letterSpacing: "0.04em",
          }}
        >
          {quote.source}
        </p>
      </div>

      {/* dot indicators */}
      <div
        style={{
          display:   "flex",
          gap:       "6px",
          marginTop: "20px",
        }}
      >
        {quotes.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setFading(true);
              setTimeout(() => {
                setActive(i);
                setFading(false);
              }, 300);
            }}
            style={{
              width:        i === active ? "20px" : "6px",
              height:       "6px",
              borderRadius: "3px",
              background:   i === active ? accentColor : borderColor,
              border:       "none",
              cursor:       "pointer",
              padding:      0,
              transition:   "width 0.3s ease, background 0.3s ease",
            }}
            aria-label={`Quote ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
