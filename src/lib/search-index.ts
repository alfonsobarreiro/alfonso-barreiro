// Curated search index for the Cmd+K command palette.
//
// Hand-maintained because the site is small (~40 entries). When you add
// a new section or page, add an entry here. Section anchors are emitted
// by the Section component (id="section-{label}"); page-level entries
// just link to the route.

export type SearchKind = "page" | "case-study" | "section" | "presentation";

export type SearchEntry = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  kind: SearchKind;
  keywords?: string; // extra terms used only for matching, never displayed
};

export const searchIndex: SearchEntry[] = [
  // ── Top-level pages ──
  { id: "home", title: "Home", subtitle: "Three case studies", href: "/", kind: "page", keywords: "alfonso barreiro homepage" },
  { id: "work", title: "Work", subtitle: "Selected case studies", href: "/#work", kind: "page" },
  { id: "about", title: "About", subtitle: "Origin, process, what I read", href: "/#about", kind: "page", keywords: "bio age hiragana marathon birds research process curiosity portland" },
  { id: "connect", title: "Connect", subtitle: "Get in touch", href: "/connect", kind: "page", keywords: "contact email alphabeta studio" },
  { id: "presentations", title: "Presentations", subtitle: "Slide decks for each case study", href: "/work/presentations", kind: "page", keywords: "slides deck" },

  // ── Case studies (top-level) ──
  {
    id: "cs-spotify",
    title: "Spotify · Recently Played Controls",
    subtitle: "Concept project · Pin, Remove, Pause",
    href: "/work/spotify",
    kind: "case-study",
    keywords: "spotify music shelf controls pin remove pause validation framework concept",
  },
  {
    id: "cs-wayfarer",
    title: "Wayfarer · Travel Discovery Platform",
    subtitle: "DesignLab capstone",
    href: "/work/wayfarer",
    kind: "case-study",
    keywords: "wayfarer travel globe destinations signup designlab capstone discovery",
  },
  {
    id: "cs-msr",
    title: "Men's Sole Revival · Foot Health Content Platform",
    subtitle: "Live at menssolerevival.com",
    href: "/work/mens-sole-revival",
    kind: "case-study",
    keywords: "msr mens sole revival foot health editorial content ga4 men over 40",
  },

  // ── Spotify sections ──
  { id: "sp-01", title: "Problem & Constraints",  subtitle: "Spotify §01", href: "/work/spotify#section-01", kind: "section" },
  { id: "sp-02", title: "Research & Discovery",   subtitle: "Spotify §02", href: "/work/spotify#section-02", kind: "section", keywords: "personas competitive audit" },
  { id: "sp-03", title: "Design Decisions",       subtitle: "Spotify §03", href: "/work/spotify#section-03", kind: "section" },
  { id: "sp-04", title: "Feature Details",        subtitle: "Spotify §04", href: "/work/spotify#section-04", kind: "section", keywords: "pin remove pause flow" },
  { id: "sp-05", title: "Constraints & Trade-offs", subtitle: "Spotify §05", href: "/work/spotify#section-05", kind: "section" },
  { id: "sp-06", title: "Validation Plan",        subtitle: "Spotify §06", href: "/work/spotify#section-06", kind: "section", keywords: "moderated test acceptance criteria" },
  { id: "sp-07", title: "Reflection",             subtitle: "Spotify §07", href: "/work/spotify#section-07", kind: "section" },

  // ── Wayfarer sections ──
  { id: "wf-01", title: "Context & Brief",          subtitle: "Wayfarer §01", href: "/work/wayfarer#section-01", kind: "section" },
  { id: "wf-02", title: "The Problem",              subtitle: "Wayfarer §02", href: "/work/wayfarer#section-02", kind: "section" },
  { id: "wf-03", title: "What Not to Build",        subtitle: "Wayfarer §03", href: "/work/wayfarer#section-03", kind: "section", keywords: "scope ai tools cut booking" },
  { id: "wf-04", title: "Multi-Step Signup",        subtitle: "Wayfarer §04", href: "/work/wayfarer#section-04", kind: "section", keywords: "form zod validation 5 step" },
  { id: "wf-05", title: "Information Architecture", subtitle: "Wayfarer §05", href: "/work/wayfarer#section-05", kind: "section", keywords: "ia globe grid routes browse-first" },
  { id: "wf-06", title: "Design System",            subtitle: "Wayfarer §06", href: "/work/wayfarer#section-06", kind: "section", keywords: "tokens components" },
  { id: "wf-07", title: "Outcomes",                 subtitle: "Wayfarer §07", href: "/work/wayfarer#section-07", kind: "section", keywords: "shipped delivered brief vs built" },
  { id: "wf-08", title: "Evaluation Plan",          subtitle: "Wayfarer §08", href: "/work/wayfarer#section-08", kind: "section", keywords: "hypotheses thresholds usability" },
  { id: "wf-09", title: "Reflection",               subtitle: "Wayfarer §09", href: "/work/wayfarer#section-09", kind: "section" },

  // ── MSR sections ──
  { id: "msr-01", title: "Context",             subtitle: "MSR §01", href: "/work/mens-sole-revival#section-01", kind: "section" },
  { id: "msr-02", title: "The Competitive Gap", subtitle: "MSR §02", href: "/work/mens-sole-revival#section-02", kind: "section", keywords: "venn clinical wellness product-first" },
  { id: "msr-03", title: "Competitor Analysis", subtitle: "MSR §03", href: "/work/mens-sole-revival#section-03", kind: "section" },
  { id: "msr-04", title: "The Pivot",           subtitle: "MSR §04", href: "/work/mens-sole-revival#section-04", kind: "section", keywords: "ecommerce to content authority margin" },
  { id: "msr-05", title: "Site Architecture",   subtitle: "MSR §05", href: "/work/mens-sole-revival#section-05", kind: "section" },
  { id: "msr-06", title: "User Flows",          subtitle: "MSR §06", href: "/work/mens-sole-revival#section-06", kind: "section" },
  { id: "msr-07", title: "Assessment Redesign", subtitle: "MSR §07", href: "/work/mens-sole-revival#section-07", kind: "section" },
  { id: "msr-08", title: "Design Decisions",    subtitle: "MSR §08", href: "/work/mens-sole-revival#section-08", kind: "section", keywords: "brand direction dark editorial" },
  { id: "msr-09", title: "Design System",       subtitle: "MSR §09", href: "/work/mens-sole-revival#section-09", kind: "section", keywords: "tokens components" },
  { id: "msr-10", title: "Impact",              subtitle: "MSR §10", href: "/work/mens-sole-revival#section-10", kind: "section", keywords: "ga4 metrics analytics" },
  { id: "msr-11", title: "Reflection",          subtitle: "MSR §11", href: "/work/mens-sole-revival#section-11", kind: "section" },

  // ── Presentations ──
  { id: "pres-spotify",  title: "Spotify Slide Deck",  subtitle: "Presentation · 40 slides", href: "/work/presentations/spotify", kind: "presentation", keywords: "deck slides" },
  { id: "pres-wayfarer", title: "Wayfarer Slide Deck", subtitle: "Presentation",            href: "/work/presentations/wayfarer", kind: "presentation", keywords: "deck slides" },
  { id: "pres-msr",      title: "MSR Slide Deck",      subtitle: "Presentation",            href: "/work/presentations/mens-sole-revival", kind: "presentation", keywords: "deck slides" },
];

// Simple fuzzy scorer. No deps. Tuned for ~40 entries — anything bigger
// should move to a real engine (fuse.js, flexsearch).
//
// Scoring:
//   exact title match   → 100
//   title startsWith q  →  50
//   title includes q    →  30
//   per token in title  →  +10
//   per token in haystack (title + subtitle + keywords) → +5
//   kind multiplier: case-study 1.1, page 1.05
export function searchEntries(query: string, limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const tokens = q.split(/\s+/).filter(Boolean);

  const scored = searchIndex.map((entry) => {
    const titleLower = entry.title.toLowerCase();
    const haystack = [entry.title, entry.subtitle ?? "", entry.keywords ?? ""].join(" ").toLowerCase();

    let score = 0;
    if (titleLower === q) score += 100;
    else if (titleLower.startsWith(q)) score += 50;
    else if (titleLower.includes(q)) score += 30;

    for (const t of tokens) {
      if (titleLower.includes(t)) score += 10;
      else if (haystack.includes(t)) score += 5;
    }

    if (entry.kind === "case-study") score *= 1.1;
    else if (entry.kind === "page") score *= 1.05;

    return { entry, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.entry);
}
