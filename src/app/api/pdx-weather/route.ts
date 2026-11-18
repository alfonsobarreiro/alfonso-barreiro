import type { NextRequest } from "next/server";
import { PORTLAND } from "@/lib/portland";
import {
  mockPdxWeather,
  parseObservation,
  PDX_REVALIDATE_S,
  PDX_STATION_URL,
  PDX_TIMEOUT_MS,
  PDX_USER_AGENT,
  type PdxWeather,
} from "@/lib/pdxWeather";

/* GET /api/pdx-weather: the latest KPDX observation, as a small reading
   for the hero's rain drip. { ok: true, observedAt, tempF, description,
   raining }, or { ok: false } on any failure.

   Cached for 30 minutes (ISR on this route and the Data Cache on the
   upstream fetch). In production the handler never reads the request, so
   the route stays static and the browser never talks to api.weather.gov.
   The browser checks the reading's age itself (3 hours), so a cached
   response can never show an old reading. */

// Must stay a literal for Next's static analysis (PDX_REVALIDATE_S).
export const revalidate = 1800;

async function latest(): Promise<PdxWeather> {
  try {
    const res = await fetch(PDX_STATION_URL, {
      headers: { "User-Agent": PDX_USER_AGENT, Accept: "application/geo+json" },
      signal: AbortSignal.timeout(PDX_TIMEOUT_MS),
      next: { revalidate: PDX_REVALIDATE_S },
    });
    if (!res.ok) return { ok: false };
    return parseObservation(await res.json());
  } catch {
    return { ok: false };
  }
}

export async function GET(request: NextRequest) {
  if (!PORTLAND.rainDrip) return Response.json({ ok: false } satisfies PdxWeather);

  // Development only: ?mock=rain|dry|stale|fail. The whole branch is
  // compiled out of production builds, which ignore the param.
  if (process.env.NODE_ENV !== "production") {
    const mock = mockPdxWeather(request.nextUrl.searchParams.get("mock"));
    if (mock) return Response.json(mock, { headers: { "Cache-Control": "no-store" } });
  }

  return Response.json(await latest());
}
