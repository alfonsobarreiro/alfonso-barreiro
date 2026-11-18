import { DM_Sans, DM_Mono } from "next/font/google";

/* The Kus-led preview's two new faces (decisions D1 and D2 in the vault
   spec, Kus-led direction 2026-10-24). Loaded from this module so "/" and
   /hiring never download them; on ship they move into src/app/layout.tsx.

   - DM Sans 600: display type only, 22px and up (the name, band labels,
     statements, the line, the close, the email, tile labels). Reading and
     UI stay on the layout's DM Sans 400 and 500.
   - DM Mono 400: the small second voice (eyebrows, role and stack lines,
     reel meta, counters, dates, size tags). Mixed case, 14px and under.
     No other brand of Alfonso's uses it (MSR is Barlow Condensed and Lora,
     Wayfarer is Space Grotesk and Inter). */
export const kusDisplay = DM_Sans({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-kus-display",
  display: "swap",
});

export const kusMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-kus-mono",
  display: "swap",
});
