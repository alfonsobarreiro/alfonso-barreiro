import { LinkArrow } from "@/components/ui/LinkArrow";
import { SERVICES } from "@/components/WhatIDo";

/* What I do (spec 2.11), on paper (today's band is a light gray box). The
   six existing capabilities in the content column, two columns from 640px
   and one below (three across the full width until 2026-11-05),
   each with a dotted rule, the title (one line since 2026-11-01, the body
   folded in) and its link: real links, unlike Kus's arrows that go
   nowhere. The Alpha Beta Design slab under the list was cut 2026-11-04
   (Alfonso); the nav's Studio item now goes to alphabeta.design. */
export default function KusWhatIDo() {
  return (
    <section id="what-i-do" aria-labelledby="what-i-do-title" className="kus-band kus-wid">
      <div className="kus-wrap">
        <div className="kus-rule" aria-hidden="true" />
        <div className="kus-band__grid">
          <div className="kus-band__label" data-reveal="">
            <h2 id="what-i-do-title" className="kus-t-label">What I do</h2>
          </div>
          <div className="kus-band__content">
            <ul className="kus-wid__list">
              {SERVICES.map((s) => (
                <li key={s.title} className="kus-wid__item" data-reveal="">
                  <div className="kus-rule" aria-hidden="true" />
                  <h3 className="kus-t-title kus-wid__t">{s.title}</h3>
                  {s.body ? <p className="kus-t-small kus-wid__b">{s.body}</p> : null}
                  <LinkArrow href={s.href}>{s.link}</LinkArrow>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <style>{`
        .kus-wid__list {
          list-style: none; padding: 0;
          display: grid; grid-template-columns: minmax(0, 1fr);
          gap: 40px var(--kus-gap); margin: 16px 0 0;
        }
        /* Two columns in the content column from 640px: the same label,
           then content split as FAQ and the bands above (2026-11-05). */
        @media (min-width: 640px)  { .kus-wid__list { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (min-width: 1024px) { .kus-wid__list { margin-top: 0; } }
        /* The first row sits under the band's own rule, so it skips its
           own (FAQ's first question does the same). */
        .kus-wid__item:first-child > .kus-rule { display: none; }
        .kus-wid__item:first-child > .kus-wid__t { margin-top: 0; }
        @media (min-width: 640px) {
          .kus-wid__item:nth-child(2) > .kus-rule { display: none; }
          .kus-wid__item:nth-child(2) > .kus-wid__t { margin-top: 0; }
        }
        .kus-wid__t { margin-top: 20px; margin-bottom: 14px; text-wrap: balance; }
        .kus-wid__b { margin: -4px 0 16px; max-width: 40ch; }
      `}</style>
    </section>
  );
}
