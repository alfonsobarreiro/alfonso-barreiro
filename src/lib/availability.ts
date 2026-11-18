/* Availability, shown in the homepage close (src/components/home/HireClose.tsx)
   on "/" and /hiring.

   Alfonso edits this file once a month: change `line` if it changed, and set
   `updated` to the day you checked it, as YYYY-MM-DD. The close prints it as
   "Updated October 24, 2026." A malformed date drops the Updated line rather
   than printing a wrong one. */

export type Availability = {
  /** One sentence, shown as is. */
  line: string;
  /** The day the line was last checked, YYYY-MM-DD. */
  updated: string;
};

export const AVAILABILITY: Availability = {
  line: "Open to design and web development roles, contract or full-time.",
  updated: "2026-11-10",
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-10-24" to "October 24, 2026", or null when the date is malformed.
    Parsed by hand, not through Date, so no time zone can shift the day and
    the server and the browser always print the same thing. */
export function formatAvailabilityDate(iso: string = AVAILABILITY.updated): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return null;
  const year  = Number(m[1]);
  const month = Number(m[2]);
  const day   = Number(m[3]);
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  if (month < 1 || month > 12 || day < 1 || day > daysInMonth) return null;
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

/** "Updated October 24, 2026.", or null when the date is malformed. */
export function formatUpdated(iso: string = AVAILABILITY.updated): string | null {
  const date = formatAvailabilityDate(iso);
  return date ? `Updated ${date}.` : null;
}
