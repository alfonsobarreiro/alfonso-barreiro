/* The two Portland moments, each on its own switch. They are Portland facts
   rather than Alfonso's own material, so they ship opt-in: flip either to
   false and it leaves the site with nothing else to change.

   - rainDrip:  when the latest KPDX observation reports rain or drizzle,
                columns of hero dots drift down, with a time-stamped caption
                (src/components/home/HeroWeather.tsx, /api/pdx-weather).
   - millEnds:  a footer line measuring the page in CSS inches against Mill
                Ends Park, two feet across (src/components/PageLength.tsx).

   Approved by Alfonso on 2026-10-23. */
export const PORTLAND = {
  rainDrip: true,
  millEnds: true,
} as const;
