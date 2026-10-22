/* ---------------------------------------------------------------------------
   Work index data: case studies (deep) and samples (one screen each).

   One status vocabulary across barreiro.com and alphabeta.design:
   Client, Volunteer, Own venture, In-house, Concept.

   Copy rules: facts only. No team sizes, metrics, research, or ownership
   claims that the source files don't support. Concept samples always say
   the business is fictional and the photos are stock.
--------------------------------------------------------------------------- */

export type Discipline = "web" | "brand" | "social" | "print" | "product";
export type Status = "Client" | "Volunteer" | "Own venture" | "In-house" | "Concept";
export type Depth = "Case study" | "Sample";

export const DISCIPLINES: { key: Discipline; label: string }[] = [
  { key: "web",     label: "Web" },
  { key: "brand",   label: "Brand" },
  { key: "social",  label: "Social and marketing" },
  { key: "print",   label: "Print" },
  { key: "product", label: "Product" },
];

/** Shipped client and volunteer work first, then own ventures and in-house work, then concepts. */
export const STATUS_ORDER: Status[] = ["Client", "Volunteer", "Own venture", "In-house", "Concept"];

/** A filter stays hidden until it has at least this many entries. */
export const MIN_PER_FILTER = 3;

export interface WorkImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

export interface WorkItem {
  slug: string;
  title: string;
  /** Short context shown in the eyebrow before the status, e.g. "Boutique hotel". */
  org?: string;
  status: Status;
  year?: string;
  depth: Depth;
  disciplines: Discipline[];
  /** One line on the card. */
  summary: string;
  cover: WorkImage;
  /** Case studies link to their own page. Samples get /work/samples/{slug}. */
  caseStudyHref?: string;
  brief?: string;
  shows?: string;
  builtWith?: string;
  role?: string;
  live?: { href: string; label: string };
  /** Disclosure line under the H1. */
  note?: string;
  gallery?: WorkImage[];
}

const CONCEPT_NOTE =
  "Concept business, real code. I built this sample for Alpha Beta Design, my studio. The business is fictional and the photos are stock.";
const VARA_NOTE =
  "Made in-house at VARA Winery & Distillery, where I was Director of Marketing and DTC Operations.";
const BOOMTIME_NOTE = "Made in-house at Boomtime, the marketing agency where I led design.";
const SAMPLE_STACK = "Designed in Figma, built in Next.js on Vercel.";

const img = (src: string, alt: string, caption?: string, width = 1600, height = 1000): WorkImage => ({
  src, width, height, alt, caption,
});
const board = (src: string, alt: string, caption?: string) => img(src, alt, caption, 1600, 1067);

export function hrefFor(item: WorkItem): string {
  return item.caseStudyHref ?? `/work/samples/${item.slug}`;
}

export const WORK: WorkItem[] = [
  /* ── Case studies ─────────────────────────────────────────────────── */
  {
    slug: "msr-chatbot",
    title: "Alfred",
    org: "Men's Sole Revival",
    status: "Own venture",
    year: "2026",
    depth: "Case study",
    disciplines: ["product", "web"],
    summary: "An AI assistant that answers men's foot questions from the site's own guides and cites the guide it used.",
    cover: img("/images/work/covers/msr-chatbot-answer.jpg", "Alfred on the Ask page answering What is plantar fasciitis?"),
    caseStudyHref: "/work/msr-chatbot",
  },
  {
    slug: "aiga-portland",
    title: "AIGA Portland",
    org: "Portland Design Month 2026",
    status: "Volunteer",
    year: "2026",
    depth: "Case study",
    disciplines: ["web"],
    summary: "The festival landing page on Squarespace, carrying the Featured Artist's brand past the platform's defaults.",
    cover: img("/images/work/covers/aiga-portland.jpg", "The Portland Design Month 2026 landing page in a browser window."),
    caseStudyHref: "/work/aiga-portland",
  },
  {
    slug: "mens-sole-revival",
    title: "Men's Sole Revival",
    status: "Own venture",
    year: "2026",
    depth: "Case study",
    disciplines: ["product", "web", "brand"],
    summary: "A foot-health site for men over 40 that launched as guides and a self-assessment instead of a store.",
    cover: img("/images/work/covers/mens-sole-revival.jpg", "The Men's Sole Revival homepage in a browser window."),
    caseStudyHref: "/work/mens-sole-revival",
  },
  {
    slug: "wayfarer",
    title: "Wayfarer",
    status: "Concept",
    year: "2026",
    depth: "Case study",
    disciplines: ["product", "web", "brand"],
    summary: "A travel-discovery site with an interactive globe and a trip planner built around trip length instead of dates.",
    cover: img("/images/work/covers/wayfarer.jpg", "The Wayfarer homepage in a browser window."),
    caseStudyHref: "/work/wayfarer",
  },
  {
    slug: "spotify",
    title: "Spotify",
    org: "Not affiliated with Spotify",
    status: "Concept",
    year: "2026",
    depth: "Case study",
    disciplines: ["product"],
    summary: "Three reversible controls for the Recently Played shelf, with a working demo.",
    cover: img("/images/work/covers/spotify.jpg", "Spotify Recently Played controls shown on phone and desktop.", undefined, 1600, 900),
    caseStudyHref: "/work/spotify",
  },

  /* ── Brand: logos ─────────────────────────────────────────────────── */
  {
    slug: "sky-valley-comm",
    title: "Sky Valley Comm",
    org: "Logo",
    status: "Client",
    depth: "Sample",
    disciplines: ["brand"],
    summary: "Logo for a marketing, design, and communications firm.",
    cover: img("/images/work/logos/08-logo-1-sky-valley-comm.jpg", "Sky Valley Comm logo: an S and V monogram in an open circle beside a serif wordmark."),
    brief: "A logo for Sky Valley Comm, a marketing, design, and communications firm.",
    shows: "An S and V monogram inside an open circle, a serif wordmark, and the firm's three services set underneath.",
    note: "Client work.",
    gallery: [img("/images/work/logos/08-logo-1-sky-valley-comm.jpg", "Sky Valley Comm logo: an S and V monogram in an open circle beside a serif wordmark.")],
  },
  {
    slug: "nq-zebraworks",
    title: "nQ Zebraworks",
    org: "Logo",
    status: "Client",
    depth: "Sample",
    disciplines: ["brand"],
    summary: "A wordmark with a zebra set inside the Q.",
    cover: img("/images/work/logos/08-logo-2-nq-zebraworks.jpg", "nQ Zebraworks logo: a red Q holding a zebra's head, beside a two-line wordmark."),
    brief: "A logo for nQ Zebraworks.",
    shows: "A red Q that frames a zebra's head, set into a two-line wordmark.",
    note: "Client work.",
    gallery: [img("/images/work/logos/08-logo-2-nq-zebraworks.jpg", "nQ Zebraworks logo: a red Q holding a zebra's head, beside a two-line wordmark.")],
  },
  {
    slug: "becourageous-leadership",
    title: "BeCourageous Leadership",
    org: "Logo",
    status: "Client",
    depth: "Sample",
    disciplines: ["brand"],
    summary: "A framed Be monogram with a letterspaced wordmark.",
    cover: img("/images/work/logos/08-logo-3-becourageous-leadership.jpg", "BeCourageous Leadership logo: a blue Be monogram inside a gray bracket frame, beside a letterspaced wordmark."),
    brief: "A logo for BeCourageous Leadership.",
    shows: "A blue Be monogram inside a gray bracket frame, with a letterspaced two-line wordmark.",
    note: "Client work.",
    gallery: [img("/images/work/logos/08-logo-3-becourageous-leadership.jpg", "BeCourageous Leadership logo: a blue Be monogram inside a gray bracket frame, beside a letterspaced wordmark.")],
  },
  {
    slug: "alpha-beta-mark",
    title: "Alpha Beta mark",
    org: "Logo",
    status: "Own venture",
    year: "2026",
    depth: "Sample",
    disciplines: ["brand"],
    summary: "The a and b of Alpha Beta drawn as one loop. It marks both barreiro.com and the studio.",
    cover: img("/images/work/logos/08-logo-4-alpha-beta-design-barreirocom.jpg", "The Alpha Beta mark: a lowercase a and b joined into one continuous loop."),
    brief: "One mark for my portfolio and my studio, Alpha Beta Design.",
    shows: "A lowercase a and b joined into one continuous loop.",
    note: "My own mark. The full usage guide lives in the barreiro.com brand file in Figma.",
    gallery: [img("/images/work/logos/08-logo-4-alpha-beta-design-barreirocom.jpg", "The Alpha Beta mark: a lowercase a and b joined into one continuous loop.")],
  },
  {
    slug: "mens-sole-revival-shield",
    title: "Men's Sole Revival shield",
    org: "Logo",
    status: "Own venture",
    year: "2026",
    depth: "Sample",
    disciplines: ["brand"],
    summary: "A navy shield with a foot cut out in negative space.",
    cover: img("/images/work/logos/08-logo-5-mens-sole-revival.jpg", "The Men's Sole Revival shield: a navy shield with a white foot in negative space."),
    brief: "The mark for Men's Sole Revival, my foot-health site for men over 40.",
    shows: "A navy shield with a foot cut out in negative space.",
    note: "My own venture. The full story is in the Men's Sole Revival case study.",
    gallery: [img("/images/work/logos/08-logo-5-mens-sole-revival.jpg", "The Men's Sole Revival shield: a navy shield with a white foot in negative space.")],
  },

  /* ── Social and marketing: VARA ───────────────────────────────────── */
  {
    slug: "vara-social",
    title: "VARA social campaigns",
    org: "VARA Winery & Distillery",
    status: "In-house",
    year: "2023",
    depth: "Sample",
    disciplines: ["social"],
    summary: "Sale, holiday, event, and product posts for a winery and distillery, built from one layout system.",
    cover: board("/images/work/vara/00-vara-social-cover.jpg", "A grid of VARA social posts: sale countdowns, holiday promos, flamenco nights, and bottle shots."),
    brief: "Keep VARA's tasting rooms and online store in front of followers through sales, holidays, live music, and new releases.",
    shows: "One layout system reused across countdown, announcement, and day-of posts, plus event and product posts.",
    builtWith: "Photoshop.",
    role: "Director of Marketing and DTC Operations",
    note: VARA_NOTE,
    gallery: [
      board("/images/work/vara/01-vara-social-campaign-system.jpg", "Six Appreciation Day posts sharing one layout: countdown, announcement, and day-of versions.", "Appreciation Day: one sale, many formats."),
      board("/images/work/vara/02-vara-social-holiday.jpg", "Six holiday posts from Black Friday through Cyber Monday.", "Black Friday through Cyber Monday. The offer first, the bottles second."),
      board("/images/work/vara/03-vara-social-events.jpg", "Six event posts for flamenco nights, live music, and wine holidays.", "Live music and tasting-room events."),
      board("/images/work/vara/04-vara-social-product.jpg", "Six product posts: bottle features, bottling news, tasting-room hours, and shipping offers.", "Product posts and online-store promos."),
      img("/images/work/vara/09-vara-ads-contact-sheet.jpg", "A contact sheet of 82 VARA posts and ads: sales, holidays, events, awards, the tasting rooms, and the online store.", "All 82 pieces from 2022 and 2023.", 1600, 1558),
    ],
  },
  {
    slug: "vara-cellar-sale",
    title: "VARA Cellar Sale",
    org: "VARA Winery & Distillery",
    status: "In-house",
    year: "2023",
    depth: "Sample",
    disciplines: ["print", "social"],
    summary: "A monthly promo piece sized for print inserts, then reused for email and social.",
    cover: board("/images/work/vara/06-vara-cellar-sale.jpg", "The Cellar Sale promo: two featured bottles with prices and a case special."),
    brief: "A monthly promo that works as a print insert, an email, and a social post.",
    shows: "Two featured bottles with tasting notes, sale prices, and a case special, framed in VARA's black and gold.",
    role: "Director of Marketing and DTC Operations",
    note: VARA_NOTE,
    gallery: [board("/images/work/vara/06-vara-cellar-sale.jpg", "The Cellar Sale promo: two featured bottles with prices and a case special.")],
  },

  {
    slug: "vara-distributor-leave-behind",
    title: "VARA distributor leave-behind",
    org: "VARA Winery & Distillery",
    status: "In-house",
    year: "2022",
    depth: "Sample",
    disciplines: ["print", "social"],
    summary: "A two-sided card for distributor and buyer meetings: brand story, founders, and portfolio.",
    cover: board("/images/work/vara/07-vara-distributor-leave-behind.jpg", "Both sides of the VARA distributor leave-behind: a cover photo, the brand story, the founders, and the portfolio."),
    brief: "A card the sales team could leave with distributors and buyers after a meeting.",
    shows: "The brand story, the founders, and the wine and spirits portfolio on two sides.",
    role: "Director of Marketing and DTC Operations",
    note: VARA_NOTE,
    gallery: [board("/images/work/vara/07-vara-distributor-leave-behind.jpg", "Both sides of the VARA distributor leave-behind: a cover photo, the brand story, the founders, and the portfolio.")],
  },
  {
    slug: "vara-rack-card-tasting-cards",
    title: "VARA Santa Fe rack card and tasting cards",
    org: "VARA Winery & Distillery",
    status: "In-house",
    year: "2022",
    depth: "Sample",
    disciplines: ["print", "social"],
    summary: "A rack card for the Santa Fe tasting room, plus shelf-size tasting notes for the spirits line.",
    cover: board("/images/work/vara/08-vara-rack-card-tasting-cards.jpg", "The Santa Fe rack card, front and back, beside three shelf tasting cards for VARA brandies."),
    brief: "Print for the Santa Fe tasting room: a rack card for visitors, and tasting notes for the spirits shelf.",
    shows: "A two-sided rack card with the wine, spirits, and tapas offer, and three shelf cards with tasting notes and proof.",
    role: "Director of Marketing and DTC Operations",
    note: VARA_NOTE,
    gallery: [board("/images/work/vara/08-vara-rack-card-tasting-cards.jpg", "The Santa Fe rack card, front and back, beside three shelf tasting cards for VARA brandies.")],
  },

  /* ── Print: Boomtime ──────────────────────────────────────────────── */
  {
    slug: "boomtime-one-pager",
    title: "Boomtime agency one-pager",
    org: "Boomtime",
    status: "In-house",
    year: "2019",
    depth: "Sample",
    disciplines: ["print", "social"],
    summary: "A two-sided sales sheet: the offer on the front, the agency process on the back.",
    cover: board("/images/work/boomtime/01-boomtime-one-pager.jpg", "Front and back of the Boomtime one-pager: the offer, and a diagram of the agency process."),
    brief: "A leave-behind that explains what the agency does and how a client moves through it.",
    shows: "The front explains the offer. The back maps the agency process from first touch to client.",
    note: BOOMTIME_NOTE,
    gallery: [board("/images/work/boomtime/01-boomtime-one-pager.jpg", "Front and back of the Boomtime one-pager: the offer, and a diagram of the agency process.")],
  },
  {
    slug: "boomtime-word-of-mouth-playbook",
    title: "B2B Word of Mouth Marketing Playbook",
    org: "Boomtime",
    status: "In-house",
    depth: "Sample",
    disciplines: ["print", "social"],
    summary: "A 17-page gated playbook for B2B owners, with a cover, a contents system, and interior templates.",
    cover: board("/images/work/boomtime/02-boomtime-wom-playbook.jpg", "The cover and three interior spreads of the Word of Mouth Marketing Playbook."),
    brief: "A lead magnet: a playbook B2B owners download in exchange for an email address.",
    shows: "A cover, a contents system, and interior templates for 17 pages.",
    builtWith: "InDesign.",
    note: BOOMTIME_NOTE,
    gallery: [board("/images/work/boomtime/02-boomtime-wom-playbook.jpg", "The cover and three interior spreads of the Word of Mouth Marketing Playbook.")],
  },
  {
    slug: "boomtime-recession-playbook",
    title: "B2B Marketing in a Recession",
    org: "Boomtime",
    status: "In-house",
    year: "2020",
    depth: "Sample",
    disciplines: ["print", "social"],
    summary: "A 24-page second edition on the same system, turned around for the 2020 downturn.",
    cover: board("/images/work/boomtime/03-boomtime-recession-playbook.jpg", "The cover and three interior spreads of B2B Marketing in a Recession."),
    brief: "A second lead-magnet playbook, written for B2B owners during the 2020 downturn.",
    shows: "The Word of Mouth playbook's system, extended to 24 pages for new content.",
    builtWith: "InDesign.",
    note: BOOMTIME_NOTE,
    gallery: [board("/images/work/boomtime/03-boomtime-recession-playbook.jpg", "The cover and three interior spreads of B2B Marketing in a Recession.")],
  },

  /* ── Web: studio and sample sites ─────────────────────────────────── */
  {
    slug: "alphabeta-design",
    title: "Alpha Beta Design",
    org: "My studio",
    status: "Own venture",
    year: "2026",
    depth: "Sample",
    disciplines: ["web"],
    summary: "My studio's site: packages and prices on the page, how a project runs, in English and Spanish.",
    cover: img("/images/work/samples/alphabeta-design/01-home.jpg", "The Alpha Beta Design homepage."),
    brief: "A studio site that answers a small business's first three questions on one page: what it costs, how long it takes, and what they get.",
    shows: "Published prices for every package, a step-by-step project process, ten sample sites, and a full Spanish version.",
    builtWith: SAMPLE_STACK,
    live: { href: "https://www.alphabeta.design", label: "alphabeta.design" },
    note: "My own studio. This is where the packages and prices live.",
    gallery: [
      img("/images/work/samples/alphabeta-design/01-home.jpg", "The Alpha Beta Design homepage.", "Home."),
      img("/images/work/samples/alphabeta-design/02-services.jpg", "The services page with package prices.", "Services, with every price on the page."),
      img("/images/work/samples/alphabeta-design/04-how-it-works.jpg", "The How a project runs page.", "How a project runs."),
      img("/images/work/samples/alphabeta-design/03-es-home.jpg", "The Spanish homepage.", "The Spanish version."),
    ],
  },
  {
    slug: "whittaker-hotel",
    title: "The Whittaker",
    org: "Boutique hotel",
    status: "Concept",
    year: "2026",
    depth: "Sample",
    disciplines: ["web"],
    summary: "A 42-room boutique hotel: rooms and rates, dining, a rooftop bar, and a booking flow.",
    cover: img("/images/work/samples/whittaker-hotel/03-rooms.jpg", "The Whittaker rooms section: a room photo beside its description and rate."),
    brief: "A sample site for a 42-room boutique hotel in Portland's Pearl District.",
    shows: "A narrative introduction, room types with rates, dining, the rooftop, and a booking flow.",
    builtWith: SAMPLE_STACK,
    live: { href: "https://hotel.alphabeta.design", label: "hotel.alphabeta.design" },
    note: CONCEPT_NOTE,
    gallery: [
      img("/images/work/samples/whittaker-hotel/02-intro.jpg", "The Whittaker introduction section.", "Introduction."),
      img("/images/work/samples/whittaker-hotel/03-rooms.jpg", "Room types with rates.", "Rooms and rates."),
      img("/images/work/samples/whittaker-hotel/04-dining.jpg", "The dining section.", "Dining."),
      img("/images/work/samples/whittaker-hotel/05-rooftop.jpg", "The rooftop bar section.", "Rooftop."),
      img("/images/work/samples/whittaker-hotel/07-booking.jpg", "The booking form.", "Booking."),
    ],
  },
  {
    slug: "emblem-coffee",
    title: "Emblem",
    org: "Coffee roaster",
    status: "Concept",
    year: "2026",
    depth: "Sample",
    disciplines: ["web"],
    summary: "A single-shop roaster: the menu, a single-origin story, and visit hours, in English and Spanish.",
    cover: img("/images/work/samples/emblem-coffee/01-hero.jpg", "Emblem's homepage hero: a bowl of roasted beans and the line Roasted here. Poured slow."),
    brief: "A sample site for a single-shop coffee roaster.",
    shows: "An espresso and pour-over menu, a single-origin story, an about page, and visit hours, with a full Spanish version.",
    builtWith: SAMPLE_STACK,
    live: { href: "https://coffee.alphabeta.design", label: "coffee.alphabeta.design" },
    note: CONCEPT_NOTE,
    gallery: [
      img("/images/work/samples/emblem-coffee/01-hero.jpg", "Emblem's homepage hero.", "Home."),
      img("/images/work/samples/emblem-coffee/02-menu.jpg", "The espresso and pour-over menu.", "Menu."),
      img("/images/work/samples/emblem-coffee/04-single-origin.jpg", "The single-origin story.", "Single origin."),
      img("/images/work/samples/emblem-coffee/05-about.jpg", "The about section.", "About."),
      img("/images/work/samples/emblem-coffee/06-visit.jpg", "Visit hours and location.", "Visit."),
    ],
  },
  {
    slug: "sandwich-shop",
    title: "Halverson",
    org: "Sandwich shop",
    status: "Concept",
    year: "2026",
    depth: "Sample",
    disciplines: ["web"],
    summary: "A daily-menu sandwich shop: the walk-up in one screen, then a bread story and a pickup flow.",
    cover: img("/images/work/samples/sandwich-shop/01-hero.jpg", "Halverson's homepage hero with a sandwich photo and the shop name.", undefined, 1600, 974),
    brief: "A sample site for a neighborhood sandwich shop that bakes its bread each morning.",
    shows: "A menu board, a featured sandwich, the bread story, and catering.",
    builtWith: "Designed in Figma, built in Next.js on Vercel, with a Sanity content editor.",
    live: { href: "https://sandwich.alphabeta.design", label: "sandwich.alphabeta.design" },
    note: CONCEPT_NOTE,
    gallery: [
      img("/images/work/samples/sandwich-shop/01-hero.jpg", "Halverson's homepage hero.", "Home.", 1600, 974),
      img("/images/work/samples/sandwich-shop/02-menu-board.jpg", "The dark green menu board.", "Menu board.", 1600, 974),
      img("/images/work/samples/sandwich-shop/03-foster-product.jpg", "A featured sandwich with its ingredients.", "A featured sandwich.", 1600, 974),
      img("/images/work/samples/sandwich-shop/04-bread-story.jpg", "The bread story section.", "Bread story.", 1600, 974),
      img("/images/work/samples/sandwich-shop/07-catering-footer.jpg", "Catering and the footer.", "Catering.", 1600, 974),
    ],
  },
  {
    slug: "bookstore",
    title: "Foxglove & Co.",
    org: "Independent bookstore",
    status: "Concept",
    year: "2026",
    depth: "Sample",
    disciplines: ["web"],
    summary: "Staff picks with handwritten notes, a rare books room, an events calendar, and four ways to browse.",
    cover: img("/images/work/samples/bookstore/01-hero.jpg", "Foxglove & Co.'s homepage hero: Reading, well kept, beside a photo of bookshelves."),
    brief: "A sample site for an independent bookstore in Hudson, New York.",
    shows: "Staff picks with notes, a rare books room, four ways to browse the catalog, and an events calendar.",
    builtWith: SAMPLE_STACK,
    live: { href: "https://bookstore.alphabeta.design", label: "bookstore.alphabeta.design" },
    note: CONCEPT_NOTE,
    gallery: [
      img("/images/work/samples/bookstore/01-hero.jpg", "Foxglove & Co.'s homepage hero.", "Home."),
      img("/images/work/samples/bookstore/02-staff-picks.jpg", "Staff picks of the week.", "Staff picks."),
      img("/images/work/samples/bookstore/03-rare-books.jpg", "The rare books room.", "Rare books."),
      img("/images/work/samples/bookstore/04-browse.jpg", "Four ways to browse.", "Four ways to browse."),
      img("/images/work/samples/bookstore/06-events.jpg", "Readings, signings, and evenings.", "Events."),
    ],
  },
  {
    slug: "yoga-studio",
    title: "Northbrook Yoga",
    org: "Yoga studio",
    status: "Concept",
    year: "2026",
    depth: "Sample",
    disciplines: ["web"],
    summary: "Class styles, teacher bios, a week-view schedule, and a membership offer.",
    cover: img("/images/work/samples/yoga-studio/01-hero.jpg", "Northbrook Yoga's homepage hero: a student in a sunlit studio and the line Slow practice. Long savasana."),
    brief: "A sample site for a neighborhood yoga studio.",
    shows: "Four class styles, teacher bios, a week-view schedule, and an intro membership offer.",
    builtWith: SAMPLE_STACK,
    live: { href: "https://yoga.alphabeta.design", label: "yoga.alphabeta.design" },
    note: CONCEPT_NOTE,
    gallery: [
      img("/images/work/samples/yoga-studio/01-hero.jpg", "Northbrook Yoga's homepage hero.", "Home."),
      img("/images/work/samples/yoga-studio/02-studio.jpg", "The studio and classes section.", "Studio and classes."),
      img("/images/work/samples/yoga-studio/04-teachers.jpg", "Teacher bios.", "Teachers."),
      img("/images/work/samples/yoga-studio/05-schedule.jpg", "The intro offer and schedule.", "Schedule and intro offer."),
    ],
  },
  {
    slug: "tattoo",
    title: "Iris Calder",
    org: "Tattoo studio",
    status: "Concept",
    year: "2026",
    depth: "Sample",
    disciplines: ["web"],
    summary: "A fine-line artist's portfolio, a featured piece with a process note, and a brief-first booking form.",
    cover: img("/images/work/samples/tattoo/02-featured.jpg", "A featured tattoo piece, a rose on an arm, on a dark page."),
    brief: "A sample site for a fine-line tattoo artist.",
    shows: "A portfolio grid, a featured piece with the artist's process note, a bio, and a booking form that asks for the idea first.",
    builtWith: SAMPLE_STACK,
    live: { href: "https://tattoo.alphabeta.design", label: "tattoo.alphabeta.design" },
    note: CONCEPT_NOTE,
    gallery: [
      img("/images/work/samples/tattoo/02-featured.jpg", "A featured piece.", "Featured piece."),
      img("/images/work/samples/tattoo/03-portfolio.jpg", "The portfolio grid.", "Portfolio."),
      img("/images/work/samples/tattoo/05-about.jpg", "The artist's statement.", "About."),
      img("/images/work/samples/tattoo/06-brief.jpg", "The booking brief.", "Booking brief."),
    ],
  },
  {
    slug: "canopy-collective",
    title: "Canopy Collective",
    org: "Forest conservancy",
    status: "Concept",
    year: "2026",
    depth: "Sample",
    disciplines: ["web"],
    summary: "A conservancy site: a four-part work model, impact numbers, field stories, and volunteer days.",
    cover: img("/images/work/samples/canopy-collective/01-hero.jpg", "Canopy Collective's homepage hero: We buy back forest. And hold it forever."),
    brief: "A sample site for a Pacific Northwest conservancy that buys back forestland.",
    shows: "The mission, a four-part work model, impact numbers, field stories, volunteer days, and a closing pledge.",
    builtWith: SAMPLE_STACK,
    live: { href: "https://nonprofit.alphabeta.design", label: "nonprofit.alphabeta.design" },
    note: CONCEPT_NOTE,
    gallery: [
      img("/images/work/samples/canopy-collective/01-hero.jpg", "Canopy Collective's homepage hero.", "Home."),
      img("/images/work/samples/canopy-collective/03-work.jpg", "The work, in four parts.", "The work, in four parts."),
      img("/images/work/samples/canopy-collective/04-numbers.jpg", "Impact numbers.", "Numbers."),
      img("/images/work/samples/canopy-collective/05-stories.jpg", "Field stories.", "Stories."),
      img("/images/work/samples/canopy-collective/07-cta.jpg", "The closing pledge.", "Closing pledge."),
    ],
  },
  {
    slug: "church-sites",
    title: "Church site kit",
    org: "Faith communities",
    status: "Concept",
    year: "2026",
    depth: "Sample",
    disciplines: ["web"],
    summary: "One template kit, three congregations: a rural parish, a Spanish-first church, and a mountain-town church.",
    cover: img("/images/work/samples/church-sites/06-high-country-hero.jpg", "A mountain-town church homepage: Church at 8,400 feet."),
    brief: "A reusable kit for small churches, shown with three sample congregations.",
    shows: "Three content spines on one template, including a Spanish-first site with an English version.",
    builtWith: "Designed in Figma, built in Next.js on Vercel, with a Sanity content editor.",
    live: { href: "https://abd-church-sites.vercel.app/el-valle", label: "The Spanish-first sample" },
    note: "Concept congregations, real code. I built this kit for Alpha Beta Design, my studio. The churches are fictional.",
    gallery: [
      img("/images/work/samples/church-sites/06-high-country-hero.jpg", "The mountain-town church homepage.", "Mountain-town church."),
      img("/images/work/samples/church-sites/02-rio-pecos-hero.jpg", "The rural parish homepage.", "Rural parish."),
      img("/images/work/samples/church-sites/04-el-valle-hero.jpg", "The Spanish-first church homepage.", "Spanish-first church."),
      img("/images/work/samples/church-sites/05-el-valle-detail.jpg", "A detail section of the Spanish-first site.", "Spanish-first detail."),
      img("/images/work/samples/church-sites/07-high-country-detail.jpg", "A detail section of the mountain-town site.", "Mountain-town detail."),
    ],
  },
  {
    slug: "woodworker",
    title: "Owen Caldwell",
    org: "Furniture maker",
    status: "Concept",
    year: "2026",
    depth: "Sample",
    disciplines: ["web"],
    summary: "A commission gallery for a furniture maker: large photography, a maker statement, and an inquiry form.",
    cover: img("/images/work/samples/woodworker/02-commissions.jpg", "Recent commissions: a dining table and a chair on a light page."),
    brief: "A sample site for a furniture maker who takes a few commissions a year.",
    shows: "A commission gallery, piece details, a maker statement, and a commission inquiry form.",
    builtWith: "Designed in Figma, built in Next.js on Vercel, with a Sanity content editor.",
    live: { href: "https://woodworker.alphabeta.design", label: "woodworker.alphabeta.design" },
    note: CONCEPT_NOTE,
    gallery: [
      img("/images/work/samples/woodworker/01-hero.jpg", "The homepage hero.", "Home."),
      img("/images/work/samples/woodworker/02-commissions.jpg", "Recent commissions.", "Commissions."),
      img("/images/work/samples/woodworker/03-detail.jpg", "Piece details.", "Piece details."),
      img("/images/work/samples/woodworker/05-maker.jpg", "The maker statement.", "The maker."),
    ],
  },
  {
    slug: "layercue",
    title: "LayerCue",
    org: "SaaS",
    status: "Concept",
    year: "2026",
    depth: "Sample",
    disciplines: ["web"],
    summary: "A design-review product site: the feature story, an interface breakdown, and pricing, dark-first.",
    cover: img("/images/work/samples/layercue/01-hero.jpg", "LayerCue's homepage hero on a dark purple page: Design review, without the chaos."),
    brief: "A sample marketing site for a design-review SaaS product.",
    shows: "A feature story, an interface breakdown with coded product mockups, and a pricing table with a free tier.",
    builtWith: SAMPLE_STACK,
    live: { href: "https://saas.alphabeta.design", label: "saas.alphabeta.design" },
    note: "Concept product, real code. I built this sample for Alpha Beta Design, my studio. The product is fictional and the interface shots are coded mockups.",
    gallery: [
      img("/images/work/samples/layercue/01-hero.jpg", "LayerCue's homepage hero.", "Home."),
      img("/images/work/samples/layercue/02-features.jpg", "The feature story.", "Features."),
      img("/images/work/samples/layercue/03-app-detail.jpg", "An interface breakdown.", "Interface."),
      img("/images/work/samples/layercue/05-pricing.jpg", "The pricing table.", "Pricing."),
    ],
  },
];

export function bySlug(slug: string): WorkItem | undefined {
  return WORK.find((w) => w.slug === slug);
}

export function sortByStatus(items: WorkItem[]): WorkItem[] {
  return [...items].sort((a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status));
}

/** Disciplines with enough entries to show as a filter. */
export function visibleFilters() {
  return DISCIPLINES.filter((d) => WORK.filter((w) => w.disciplines.includes(d.key)).length >= MIN_PER_FILTER);
}

export function eyebrowFor(item: WorkItem): string {
  return [item.org, item.status, item.year].filter(Boolean).join(" · ");
}
