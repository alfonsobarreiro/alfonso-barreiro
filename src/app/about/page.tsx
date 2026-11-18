import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PersonSchema } from "@/components/structured-data/PersonSchema";
import { ProfilePageSchema } from "@/components/structured-data/ProfilePageSchema";
import { BreadcrumbSchema } from "@/components/structured-data/BreadcrumbSchema";
import { kusDisplay, kusMono } from "@/components/kus/fonts";
import { KusStyles } from "@/components/kus/KusStyles";
import { KusReveal } from "@/components/kus/KusReveal";
import KusBand from "@/components/kus/KusBand";

export const metadata: Metadata = {
  title: "About",
  description:
    "Fifteen years in design. Product designer and web developer in Portland, OR. Five case studies: Alfred, an AI assistant for Men's Sole Revival, plus AIGA Portland Design Month, Men's Sole Revival, Wayfarer travel discovery, and Spotify controls.",
  alternates: { canonical: "https://www.barreiro.com/about" },
  openGraph: {
    type: "website",
    url: "https://www.barreiro.com/about",
    title: "About · Alfonso Barreiro",
    description:
      "Fifteen years in design. Product designer and web developer in Portland, OR. Five case studies: Alfred, an AI assistant for Men's Sole Revival, plus AIGA Portland Design Month, Men's Sole Revival, Wayfarer travel discovery, and Spotify controls.",
    images: ["/about/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About · Alfonso Barreiro",
    description:
      "Fifteen years in design. Product designer and web developer in Portland, OR. Five case studies: Alfred, an AI assistant for Men's Sole Revival, plus AIGA Portland Design Month, Men's Sole Revival, Wayfarer travel discovery, and Spotify controls.",
    images: ["/about/opengraph-image"],
  },
};

/* /about on the homepage system (2026-11-18, the /about audit: 11 type
   styles and 5 inks, the hero 20px off the rail, terracotta-500 text
   under 4.5:1). Same .kus root as "/" and /work: display for the H1,
   heading for band labels, the lede and the timeline's chapter names,
   body for everything else, mono for the timeline's years and meta.
   Inks: navy, terracotta-600, white. Bands use the homepage spacing.

   Copy edits the same day (Alfonso: "Fix the about page"; vault note
   "2026-11-18 — About page fixes"): the two pull quotes repeated lines
   already in the prose and are gone, as is the second "Remote isn't a
   constraint" line; "UX/UI isn't really the right name for it" is cut
   (the site says product designer); "all-in on UX/UI" now reads
   "all-in on product design"; the timeline heading is a plain label. */

/* Value + philosophy sections moved to /process on 2026-07-02. "The file
   behind this site" moved to /behind-this-site (footer link) the same day. */

export default function AboutPage() {
  return (
    <div className={`kus ${kusDisplay.variable} ${kusMono.variable}`}>
      <KusStyles />
      <ProfilePageSchema url="https://www.barreiro.com/about" />
      <PersonSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.barreiro.com/" },
          { name: "About", url: "https://www.barreiro.com/about" },
        ]}
      />
      <Nav />
      <main id="main-content" style={{ paddingTop: "72px" }}>
        <KusReveal />

        {/* ── Hero: the line, the lede, availability, the photo. ───── */}
        <section className="about-hero" aria-labelledby="about-title">
          <div className="kus-wrap about-hero__grid">
            <div className="about-hero__text">
              <h1 id="about-title" className="kus-t-line" data-reveal="">Fifteen years in design.</h1>
              <p className="kus-t-lede" data-reveal="">
                I get to be part of building products that solve real problems. How I came to that is below.
              </p>
              <p className="kus-t-body about-hero__open" data-reveal="">
                <span className="about-hero__dot" aria-hidden="true" />
                Open for work
              </p>
            </div>
            <div className="about-hero__photo" data-reveal="">
              <Image
                src="/images/portrait/alfonso-waterfall.jpg"
                alt="Alfonso Barreiro on a trail in front of a waterfall."
                fill
                priority
                sizes="(max-width: 767px) 100vw, 540px"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          </div>
        </section>

        <KusBand id="pulled-in" label="What pulled me into design" className="about-band">
          <div className="about-prose" data-reveal="">
            <p className="kus-t-body">
              For a long time I thought building meant writing the code. The design
              part was something you did after, to make it presentable.
            </p>
            <p className="kus-t-body">
              The shift didn&apos;t happen from one moment. It happened from watching
              people use the things I built and seeing the gap between what I meant
              and what they saw. The link they couldn&apos;t find. The button they
              didn&apos;t know was a button. The form they abandoned halfway through,
              not because the data was hard but because the next step wasn&apos;t clear.
            </p>
            <p className="kus-t-body">
              That gap is what pulled me into design. Not the visual part. The
              decisions underneath.
            </p>
            <p className="kus-t-body">
              I tried a few directions before this one. Front-end engineering, which
              is where most career-path code people end up. Visual design, which I
              love but wasn&apos;t enough on its own. Eventually I landed where the
              work I actually wanted to do lives. Somewhere between research,
              decision-making, and the screens you ship.
            </p>
          </div>
        </KusBand>

        {/* How I work: the remote-work narrative, then the timeline. */}
        <KusBand id="how-i-work" label="How I work" className="about-band">
          <div className="about-prose" data-reveal="">
            <p className="kus-t-body">
              I started in Albuquerque in 2010, as the founder of a small consultancy. Then seven years at CliffDweller Digital. Agency work, hands-on, in-person every day. In 2018 I moved to Boomtime as Lead Graphic Design, same city, same desk, same shared room. That&apos;s where I learned what most designers learn: the desk next to you is half the work.
            </p>
            <p className="kus-t-body">
              I went remote in 2019, about a year and a half into Boomtime, and stepped up to VP of Operations the same year. At first the change was mine, not the company&apos;s. Then the rest of the industry caught up. We shipped UX/UI work for a hundred-plus client websites without an office. I held the design quality bar the same way I&apos;d held it in person: tight feedback loops, written critique, fewer meetings, more artifacts. The work didn&apos;t suffer. Some of it got cleaner.
            </p>
            <p className="kus-t-body">
              Two-plus years followed at VARA Winery &amp; Distillery as Director of Marketing &amp; DTC Operations. Back in-person in Albuquerque, running the site redesign and the brand identity for a new spirits line. Then in late 2024 I left the director seat to go all-in on product design. The remote chapter resumed in Portland: independent practice, DesignLab UX Academy, five case studies. None of them built from a shared room.
            </p>
            <p className="kus-t-body">
              The five case studies on this site are evidence the model works at the artifact level. Four built solo, one with a three-person volunteer web team, all remote.
            </p>
          </div>
          <RemoteTimeline />
        </KusBand>

        <KusBand id="studio" label="Alpha Beta Design" className="about-band">
          <div className="about-prose" data-reveal="">
            <p className="kus-t-body">
              I run a small studio called{" "}
              <a href="https://alphabeta.design/" target="_blank" rel="noopener noreferrer" className="kus-link">
                Alpha Beta Design
              </a>
              . It sells fixed-price sites, landing pages, brand identity, and website
              teardowns to small businesses, with every price on the page.
            </p>
          </div>
        </KusBand>

        <KusBand id="shelf" label="On the shelf" className="about-band">
          <div className="about-prose" data-reveal="">
            <p className="kus-t-body">
              Two books on the desk right now: <cite>Designing with Intention</cite> and{" "}
              <cite>Refactoring UI</cite>. The first is about how to think about design.
              The second is about how to make a screen actually look right. I&rsquo;m
              trying to read them as one lens, not two separate books.
            </p>
            <p className="kus-t-body">
              I also keep a vault of notes bigger than I&apos;ll ever finish.
              That&apos;s fine. I&apos;d rather have too much material than too little.
            </p>
          </div>
        </KusBand>

        <KusBand id="off-screen" label="Off-screen" className="about-band">
          <div className="about-prose" data-reveal="">
            <p className="kus-t-body">
              I still learn like I&rsquo;m running out of time. I&rsquo;m teaching
              myself Hiragana. I walk five miles a day, building back toward a
              marathon. I meditate. I watch birds. I read everything. If that
              sounds like someone with too many interests, you&rsquo;re probably
              right. But the curiosity is the same muscle I use in research. I
              just don&rsquo;t turn it off.
            </p>
          </div>
        </KusBand>

        <KusBand id="find-me" label="Find me in Portland" className="about-band">
          <div className="about-prose" data-reveal="">
            <p className="kus-t-body">
              If any of this resonates, or you have a problem you want a second
              pair of eyes on, coffee is the easiest way. Book a time at{" "}
              <a href="https://cal.com/alfonso-barreiro" target="_blank" rel="noopener noreferrer" className="kus-link">
                cal.com/alfonso-barreiro
              </a>
              , or email{" "}
              <a href="mailto:alfonso@barreiro.com" className="kus-link">
                alfonso@barreiro.com
              </a>
              .
            </p>
          </div>
        </KusBand>

        <Footer ground="paper" />
      </main>

      <style>{`
        /* Hero: the band's top padding, none below (the first band's top
           padding is the gap). Text and photo share the rail. */
        .about-hero { padding: var(--kus-band-y) var(--kus-pad-x) 0; }
        .about-hero__grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 40px; }
        .about-hero__text { display: flex; flex-direction: column; justify-content: center; }
        .about-hero__text > * + * { margin-top: 24px; }
        .about-hero__open { display: inline-flex; align-items: center; gap: 8px; }
        .about-hero__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--color-terracotta-600); flex: none; }
        .about-hero__photo {
          position: relative; aspect-ratio: 3 / 4; overflow: hidden;
          border-radius: var(--radius-card); background: var(--color-neutral-100);
        }
        @media (max-width: 767px) { .about-hero__photo { order: -1; } }
        @media (min-width: 768px) {
          .about-hero__grid { grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 64px; }
        }
        @media (min-width: 1024px) { .about-band .kus-band__label { grid-column: 1 / -1; } }
        .about-prose > * + * { margin-top: 16px; }
        .about-prose cite { font-style: italic; }

        /* ── Remote timeline ─────────────────────────────────────── */
        .rt { margin-top: 64px; }
        .rt-title { margin: 0 0 32px; }
        .rt-strip { position: relative; margin-bottom: 32px; }
        .rt-ticks, .rt-callout { position: relative; height: 22px; }
        .rt-ticks { margin-bottom: 8px; }
        .rt-callout { margin-top: 8px; }
        .rt-tick, .rt-callout__text, .rt-now {
          position: absolute; top: 0; transform: translateX(-50%); white-space: nowrap;
          font-family: var(--kus-mono); font-size: var(--kus-fs-mono); line-height: 1.45; letter-spacing: 0;
        }
        .rt-tick { color: var(--color-navy); }
        .rt-callout__text, .rt-now { color: var(--color-terracotta-600); }
        .rt-now { top: -30px; transform: translateX(-100%); pointer-events: none; }
        .rt-track {
          position: relative; height: 44px;
          background: var(--color-neutral-100); border: 1px solid var(--color-neutral-200);
          border-radius: var(--radius-chip);
        }
        .rt-bar {
          position: absolute; top: 4px; bottom: 4px; display: block;
          border: 0; padding: 0; cursor: pointer;
          transition: box-shadow var(--kus-dur-out) ease;
        }
        .rt-bar[data-tier="office"] { background: var(--color-navy); }
        .rt-bar[data-tier="remote"] { background: var(--color-terracotta-600); }
        .rt-bar[data-last="false"] { border-right: 1px solid var(--color-paper); }
        .rt-bar:hover, .kus main .rt-bar:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--color-paper), 0 0 0 5px var(--color-navy);
          transition-duration: var(--kus-dur-in);
          z-index: 1;
        }
        .rt-remote-line {
          position: absolute; top: -8px; bottom: -8px; width: 0;
          border-left: 2px dashed var(--color-terracotta-600); pointer-events: none;
        }
        .rt-legend { display: flex; flex-wrap: wrap; gap: 24px; margin: 0 0 40px; padding: 0; list-style: none; }
        .rt-legend li { display: inline-flex; align-items: center; gap: 8px; }
        .rt-swatch { width: 14px; height: 10px; border-radius: 2px; flex: none; }
        .rt-swatch[data-tier="office"] { background: var(--color-navy); }
        .rt-swatch[data-tier="remote"] { background: var(--color-terracotta-600); }
        .rt-cards { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--kus-gap); }
        @media (min-width: 768px) { .rt-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (min-width: 1024px) { .rt-cards { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        .rt-card {
          border: 1px solid var(--color-neutral-300); border-radius: var(--radius-panel);
          padding: 24px; background: var(--color-paper);
          transition: background-color var(--kus-dur-out) ease;
        }
        .rt-card > * + * { margin-top: 8px; }
        .rt-card .kus-t-mono { margin-top: 16px; }
        ${[0, 1, 2, 3, 4, 5].map((i) => `.rt:has(.rt-bar[data-idx="${i}"]:hover) .rt-card[data-idx="${i}"], .rt:has(.rt-bar[data-idx="${i}"]:focus-visible) .rt-card[data-idx="${i}"]`).join(",\n        ")} {
          background: var(--color-neutral-100);
        }
        /* Phones: the proportional strip is unreadable at 390px, so the
           cards are the timeline, each with a left rail in its tier's
           color (audit 2026-07-03). */
        @media (max-width: 767px) {
          .rt-strip, .rt-legend { display: none; }
          .rt-card { border-left-width: 4px; }
          .rt-card[data-tier="office"] { border-left-color: var(--color-navy); }
          .rt-card[data-tier="remote"] { border-left-color: var(--color-terracotta-600); }
        }
        @media (prefers-reduced-motion: reduce) { .rt-bar, .rt-card { transition: none; } }
      `}</style>
    </div>
  );
}

/* ── Remote timeline: the career arc to today. A proportional strip
   (in-office navy, remote terracotta) with a dashed mark where the first
   remote chapter starts, then one card per chapter. Each bar is a button
   that highlights its card on hover or focus. The strip ends today (the
   page is static, so "today" is the build date). */
function RemoteTimeline() {
  const START = 2010;
  const today = new Date();
  const NOW = today.getFullYear() + today.getMonth() / 12;
  const SPAN = NOW - START;
  const pct = (year: number) => `${((year - START) / SPAN) * 100}%`;

  const chapters: {
    name: string;
    role: string;
    location: string;
    note: string;
    start: number;
    end: number;
    remote: boolean;
  }[] = [
    { name: "Sola Fide Design",         role: "Founder & Lead Creative",                location: "Albuquerque",          note: "Brand identity, web design, campaign creative for e-commerce and small business.", start: 2010, end: 2011, remote: false },
    { name: "CliffDweller Digital",     role: "Web Designer & Developer",               location: "Albuquerque",          note: "50+ responsive websites. Started running user tests on priority projects.", start: 2011, end: 2018, remote: false },
    { name: "Boomtime",                 role: "Lead Graphic Design",                    location: "Albuquerque",          note: "Joined as Lead Graphic Design. Set the visual quality bar for client work before going remote and stepping up to VP.", start: 2018, end: 2019.5, remote: false },
    { name: "Boomtime",                 role: "UX & Design Lead (VP of Operations)",    location: "Remote · Albuquerque", note: "Promoted to VP and went remote. Same client roster, distributed team, same quality bar.", start: 2019.5, end: 2021.75, remote: true },
    { name: "VARA Winery & Distillery", role: "Director of Marketing & DTC Operations", location: "Albuquerque",          note: "Back in-person at the winery. Redesigned the site and brand identity for a new spirits line. AI-assisted workflows.", start: 2022.25, end: 2024.85, remote: false },
    { name: "Independent Practice",     role: "Product Design Consultant",              location: "Remote · Portland",    note: "DesignLab UX Academy. Five case studies. Build in Figma, ship in Next.js.", start: 2024.85, end: NOW, remote: true },
  ];
  const isNow = (end: number) => end >= NOW;
  const REMOTE_START = chapters.find((c) => c.remote)?.start ?? 2019.5;

  return (
    <div className="rt" data-reveal="">
      <h3 className="kus-t-title rt-title">Where I&rsquo;ve worked, 2010 to now</h3>

      <div className="rt-strip">
        <div className="rt-ticks" aria-hidden="true">
          {[2010, 2014, 2018, 2022].map((y) => (
            <span key={y} className="rt-tick" style={{ left: pct(y), transform: y === START ? "none" : undefined }}>{y}</span>
          ))}
        </div>
        <div className="rt-track">
          {chapters.map((ch, idx) => {
            const endLabel = isNow(ch.end) ? "now" : String(Math.floor(ch.end));
            return (
              <button
                key={ch.name + ch.start}
                type="button"
                data-idx={idx}
                data-tier={ch.remote ? "remote" : "office"}
                data-last={isNow(ch.end) ? "true" : "false"}
                className="rt-bar"
                aria-label={`${ch.role} at ${ch.name}, ${Math.floor(ch.start)} to ${endLabel}${ch.remote ? ", remote" : ""}. Highlights the matching chapter card below.`}
                style={{ left: pct(ch.start), width: `${((ch.end - ch.start) / SPAN) * 100}%` }}
              />
            );
          })}
          <span className="rt-now" style={{ left: "100%" }} aria-hidden="true">Now</span>
          <span className="rt-remote-line" style={{ left: pct(REMOTE_START) }} aria-hidden="true" />
        </div>
        <div className="rt-callout">
          <span className="rt-callout__text" style={{ left: pct(REMOTE_START) }}>
            <span aria-hidden="true">↑</span> First remote chapter · 2019
          </span>
        </div>
      </div>

      <ul className="rt-legend kus-t-mono">
        <li><span className="rt-swatch" data-tier="office" aria-hidden="true" />In-office · 2010–2019, 2022–2024</li>
        <li><span className="rt-swatch" data-tier="remote" aria-hidden="true" />Remote · 2019–2021, 2024–now</li>
      </ul>

      <div className="rt-cards">
        {chapters.map((ch, idx) => (
          <article key={ch.name + ch.start} data-idx={idx} data-tier={ch.remote ? "remote" : "office"} className="rt-card">
            <h4 className="kus-t-title">{ch.name}</h4>
            <p className="kus-t-body">{ch.note}</p>
            {/* Location already says Remote where it applies, so no
                trailing "· remote" (it read "Remote · … · remote"). */}
            <p className="kus-t-mono">
              {ch.role} · {ch.location} · {Math.floor(ch.start)} to {isNow(ch.end) ? "now" : Math.floor(ch.end)}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
