/* KPDX weather for the hero's rain drip (PORTLAND.rainDrip in portland.ts).

   The route handler (src/app/api/pdx-weather/route.ts) fetches the latest
   observation at Portland International Airport from api.weather.gov and
   returns a small reading. The hero (src/components/home/HeroWeather.tsx)
   fetches that after load, checks the reading's age in the browser, and
   captions it with the reading's own time, never "right now".

   Shared by server and client: no Node or browser-only APIs at the top
   level. */

export const PDX_STATION_URL = "https://api.weather.gov/stations/KPDX/observations/latest";
/* api.weather.gov asks for a User-Agent that identifies the site. It names
   the site, not a person or an inbox. */
export const PDX_USER_AGENT = "barreiro.com (https://www.barreiro.com)";
export const PDX_REVALIDATE_S = 1800;
export const PDX_TIMEOUT_MS = 3000;
/** A reading older than this never shows (checked in the browser). */
export const PDX_MAX_AGE_MS = 3 * 60 * 60 * 1000;
/** Clock skew allowed for a reading stamped slightly in the future. */
const PDX_MAX_SKEW_MS = 15 * 60 * 1000;

export type PdxReading = {
  ok: true;
  /** ISO 8601, UTC. */
  observedAt: string;
  /** Whole degrees Fahrenheit, or null when the station reported none. */
  tempF: number | null;
  /** NWS textDescription, lowercased ("light rain"), or null. */
  description: string | null;
  raining: boolean;
};
export type PdxWeather = PdxReading | { ok: false };

const RAIN = /\b(rain|drizzle|showers?)\b/i;

type Obj = Record<string, unknown>;
const isObj = (x: unknown): x is Obj => typeof x === "object" && x !== null;

/** NWS quantitative value to whole °F. degC is what KPDX reports; degF is
    accepted as is. Missing, rejected (qualityControl "X"), or another
    unit: null. */
export function toFahrenheit(q: unknown): number | null {
  if (!isObj(q)) return null;
  const { value, unitCode, qualityControl } = q;
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  if (qualityControl === "X") return null;
  const unit = typeof unitCode === "string" ? unitCode : "";
  if (unit.endsWith("degC")) return Math.round((value * 9) / 5 + 32);
  if (unit.endsWith("degF")) return Math.round(value);
  return null;
}

/** "Light Rain and Fog/Mist" to "light rain and mist". NWS writes the
    METAR code BR (mist) as "Fog/Mist"; a caption reads "mist". */
export function describe(text: unknown): string | null {
  if (typeof text !== "string") return null;
  const d = text
    .trim()
    .toLowerCase()
    .replace(/\bfog\/mist\b/g, "mist")
    .replace(/\s*\/\s*/g, " and ")
    .replace(/\s+/g, " ");
  return d || null;
}

/** presentWeather entries name the phenomenon in snake case ("rain",
    "rain_showers", "freezing_drizzle"). */
function weatherWords(presentWeather: unknown): string[] {
  if (!Array.isArray(presentWeather)) return [];
  const out: string[] = [];
  for (const w of presentWeather) {
    if (!isObj(w) || typeof w.weather !== "string") continue;
    const intensity = typeof w.intensity === "string" ? `${w.intensity} ` : "";
    out.push(`${intensity}${w.weather.replace(/_/g, " ")}`.toLowerCase().trim());
  }
  return out;
}

export function isRaining(presentWeather: unknown, textDescription: unknown): boolean {
  if (weatherWords(presentWeather).some((w) => RAIN.test(w))) return true;
  return typeof textDescription === "string" && RAIN.test(textDescription);
}

/** api.weather.gov observation (GeoJSON Feature) to a reading. */
export function parseObservation(json: unknown): PdxWeather {
  if (!isObj(json) || !isObj(json.properties)) return { ok: false };
  const p = json.properties;
  const t = typeof p.timestamp === "string" ? Date.parse(p.timestamp) : NaN;
  if (!Number.isFinite(t)) return { ok: false };

  const raining = isRaining(p.presentWeather, p.textDescription);
  let description = describe(p.textDescription);
  // No text but the weather codes say rain: name it from the codes.
  if (!description && raining) {
    description = weatherWords(p.presentWeather).find((w) => RAIN.test(w)) ?? null;
  }
  const tempF = toFahrenheit(p.temperature);
  if (tempF === null && description === null) return { ok: false };

  return { ok: true, observedAt: new Date(t).toISOString(), tempF, description, raining };
}

/** The route's JSON, checked on the client before it is trusted. */
export function isPdxWeather(x: unknown): x is PdxWeather {
  if (!isObj(x)) return false;
  if (x.ok === false) return true;
  return (
    x.ok === true &&
    typeof x.observedAt === "string" &&
    (x.tempF === null || (typeof x.tempF === "number" && Number.isFinite(x.tempF))) &&
    (x.description === null || typeof x.description === "string") &&
    typeof x.raining === "boolean"
  );
}

/** Under 3 hours old (and not from the future beyond a little skew). */
export function isFresh(observedAt: string, now = Date.now()): boolean {
  const t = Date.parse(observedAt);
  return Number.isFinite(t) && now - t < PDX_MAX_AGE_MS && t - now < PDX_MAX_SKEW_MS;
}

const PDX_TIME = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

/** "2:53 p.m." in Portland time (America/Los_Angeles, DST included). */
export function formatPdxTime(iso: string): string | null {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return null;
  const parts = PDX_TIME.formatToParts(new Date(t));
  const hour   = parts.find((x) => x.type === "hour")?.value;
  const minute = parts.find((x) => x.type === "minute")?.value;
  const period = parts.find((x) => x.type === "dayPeriod")?.value ?? "";
  if (!hour || !minute) return null;
  return `${hour}:${minute} ${/^a/i.test(period) ? "a.m." : "p.m."}`;
}

/** The hero caption (DRAFT copy, Alfonso's voice pass pending). A missing
    temperature or description drops its clause. */
export function pdxCaption(r: PdxReading, motionOff: boolean): string | null {
  const time = formatPdxTime(r.observedAt);
  if (!time) return null;
  const temp = r.tempF === null ? null : `${r.tempF}°F`;
  const what = [temp, r.description].filter(Boolean).join(" and ");
  if (!what) return null;
  const lead = `Portland at ${time}: ${what}`;
  if (!r.raining) return `${lead}. When it rains here, the dots run.`;
  if (motionOff) return `${lead}. The dots would be running, but motion is off.`;
  return `${lead}, so the dots are running.`;
}

/** Development only (the route ignores it in production): fixed fake
    readings for ?mock=rain|dry|stale|fail. The values are the plan's
    samples; the times are relative to now. */
export function mockPdxWeather(kind: string | null, now = Date.now()): PdxWeather | null {
  const minutesAgo = (m: number) => new Date(Math.floor((now - m * 60_000) / 60_000) * 60_000).toISOString();
  switch (kind) {
    case "rain":  return { ok: true, observedAt: minutesAgo(23),  tempF: 51, description: "light rain", raining: true };
    case "dry":   return { ok: true, observedAt: minutesAgo(23),  tempF: 64, description: "cloudy",     raining: false };
    case "stale": return { ok: true, observedAt: minutesAgo(240), tempF: 51, description: "light rain", raining: true };
    case "fail":  return { ok: false };
    default:      return null;
  }
}
