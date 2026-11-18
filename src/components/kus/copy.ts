/* Every DRAFT string in the Kus-led preview, in one place for Alfonso's
   voice pass (spec section 2.18). Existing copy stays where it lives
   (work.ts, HomePage.tsx, WhatIDo.tsx, HomeTestimonials.tsx, HireClose.tsx,
   availability.ts) and is imported, not retyped, except where a module
   does not export it (noted at the use).

   `null` marks a [his words] slot: something only Alfonso can write. A
   slot that is null does not render at all. Checked: no em or en dashes,
   no aphorisms, no exclamation marks, no invented facts, clients, metrics
   or quotes, no all-caps, no prices. */

export const KUS_COPY = {
  reel: {
    label: "Reel of my work",
    pause: "Pause the reel",
    play:  "Play the reel",
    prev:  "Previous piece",
    next:  "Next piece",
    count: (n: number, total: number) => `${n} of ${total}`,
    /* Names the three clients; the strip also carries my own ventures,
       which the meta line says ("Client and own venture"). */
    logosTitle: "Logos for Sky Valley Comm, nQ Zebraworks, and BeCourageous Leadership",
  },

  alfred: {
    /* From /about: "Four built solo". Confirm. */
    role: "Solo · design and build",
    /* "How Alfred answers" (the five steps) was cut 2026-11-01 ("say
       more with less"): every number is on /work/msr-chatbot and the
       demo's chips show the cited answer, the decline and the 911 stop. */
  },

  /* The AIGA card's stack line ("Squarespace, with custom code.") was cut
     the same day: the band's statement already says it. */

  msr: {
    /* Confirm. */
    role: "Solo · brand, design, and build",
    /** [his words] */
    stack: null as string | null,
  },

  wayfarer: {
    /** [his words] */
    role: null as string | null,
  },

  spotify: {
    /* The deck's existing role (work.ts spotify-deck). Confirm it covers the case study. */
    role: "Solo UX/UI designer",
  },

  faq: {
    title: "Before you ask",
    contract: "Contract or full-time?",
    remoteQ: "Remote, hybrid, or on site?",
    /* Draft from /about facts. Renders only once `remoteNow` exists. */
    remoteFacts: "I went remote in 2019 at Boomtime and have worked that way since, apart from two-plus years in person at VARA in Albuquerque. All five case studies here were built remote.",
    /** [his words]: what he wants now, including whether on-site work in Portland is in. */
    remoteNow: null as string | null,
    /* "What do you build in?" was cut 2026-11-01: What I do answers it. */
    conceptsQ: "Why are so many of the sites concepts?",
    conceptsA: {
      all:    "The businesses are fictional and the photos are stock. The code is real, every site is live, and I built them as samples for my studio. Every card says what kind of work it is: client, volunteer, in-house, own venture, or concept.",
      hiring: "The businesses are fictional and the photos are stock. The code is real and every site is live. Every card says what kind of work it is: client, volunteer, in-house, own venture, or concept.",
    },
  },

  about: {
    /* Set at the lede size (24px), so curled (curl, below). */
    lead: curl("I've built 50+ sites on WordPress and Drupal."),
    rolesLabel: "Where I've worked",
    /* Reverse-chronological, one flat list since 2026-11-01 (tabs before
       that). Role names are his call. Every fact is from /about,
       HomeAbout, or work.ts. Studio renders on "/" only. */
    roles: [
      { id: "studio",    label: "Studio",    studio: true,  panel: "I run Alpha Beta Design, a one-person studio for small businesses." },
      { id: "volunteer", label: "Volunteer", studio: false, panel: "One of three on AIGA Portland's volunteer web team for Portland Design Month 2026." },
      { id: "in-house",  label: "In-house",  studio: false, panel: "Two-plus years as Director of Marketing and DTC Operations at VARA Winery & Distillery in Albuquerque. I redesigned the Commerce7 and Shopify store, ran Mailchimp email, and made the labels, ads, and social campaigns." },
      { id: "agency",    label: "Agency",    studio: false, panel: "Seven years at CliffDweller Digital, then Boomtime, where I started as Lead Graphic Design and became VP of Operations in 2019. At Boomtime I led 100+ client sites and made the sales sheet and the B2B playbooks." },
    ],
  },

  logos: {
    /* The lead card's panel: where the shield runs on its own site
       (MSR repo: components/SiteLayout.tsx h-12 and h-10 at md,
       app/apple-icon.tsx, app/icon.tsx). One of the two nav labels shows,
       by the same 768px breakpoint MSR's nav uses. */
    whereTitle: "On menssolerevival.com",
    navDesktop: "Desktop nav, 48 px",
    navPhone:   "Phone nav, 40 px",
    homeIcon:   "Home screen icon",
    tab:        "Browser tab, 16 px",
    /* The tab art's text (aria-hidden): the site's real tab title,
       SITE_NAME in MSR's lib/site.ts. Existing, not DRAFT. */
    tabTitle:   "Men's Sole Revival",
  },

  quotes: {
    full: "Read the full note",
    /* The rotating deck's controls (2026-11-05). */
    label: "Client quotes",
    pause: "Pause the quotes",
    play:  "Play the quotes",
    prev:  "Previous quote",
    next:  "Next quote",
    count: (n: number, total: number) => `${n} of ${total}`,
  },

  close: {
    /** [his words]: the work he wants most. Two candidates built from
        facts already on the page, for him to keep, cut or rewrite
        (Hallman's close: "Landing pages and microsites are my love
        language."):
        1. "The work I want most: a site or an assistant I design and
            build end to end, for a team that ships."
        2. "I want the next Alfred: a product with a real user and a
            reason to cut scope." */
    wantMost: null as string | null,
    /* The mailto subject, by audience, so a note arrives labelled. */
    subject: {
      all:    "A project or a role for Alfonso",
      hiring: "A role for Alfonso",
    } as Record<"all" | "hiring", string>,
    /** [his words, and only if true]: meeting in person in Portland. */
    coffeeSub: null as string | null,
    formatsLead: "Also as a",
    formatsPdf: (kb: number | null) => (kb ? `PDF (${kb} KB)` : "PDF"),
    formatsOr: "or",
    formatsTxt: "plain text",
  },

  play: {
    specs: "Show the specs",
  },
} as const;


/* Display typography: curls straight apostrophes and quotes for text set
   at 22px and up (statements, band labels, card titles), where a straight
   ' next to a curly one shows. work.ts keeps its plain ASCII; this runs at
   render. Small text (eyebrows, summaries, mono) is left as written.

   - an apostrophe inside a word (men's, doesn't) or before a decade ('90s)
     becomes a right single quote;
   - a quote after a space, an opening bracket or the start opens (left
     single or double), and every other one closes (right). */
export function curl(text: string): string {
  return text
    .replace(/([A-Za-z0-9\u00C0-\u024F])'(?=[A-Za-z0-9\u00C0-\u024F])/g, "$1\u2019")
    .replace(/'(?=\d0s\b)/g, "\u2019")
    .replace(/(^|[\s([{\u201C])'/g, "$1\u2018")
    .replace(/'/g, "\u2019")
    .replace(/(^|[\s([{\u2018])"/g, "$1\u201C")
    .replace(/"/g, "\u201D");
}
