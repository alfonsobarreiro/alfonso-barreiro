import { LinkArrow } from "@/components/ui/LinkArrow";
import { KUS_COPY } from "@/components/kus/copy";
import type { HomeAudience } from "@/components/home/HomePage";

/* About (spec 2.13): the label in the left third like every band (the two
   prints moved to the hero 2026-11-06), then the lead at the lede size, the four roles as one flat list (a dotted rule
   between rows, the role name in the ui size, the facts in body), then
   "More about me" and the resume side by side. The roles were tabs
   (Room Five's move) until 2026-11-01: Ahlin, Chiang and Couldwell show
   the whole history at once, and a flat list costs no words and no
   script. On /hiring the Studio row is not rendered. */
export default function KusAbout({ audience }: { audience: HomeAudience }) {
  const { lead, rolesLabel, roles } = KUS_COPY.about;
  const shown = roles.filter((r) => audience !== "hiring" || !r.studio);

  return (
    <section id="about" aria-labelledby="about-title" className="kus-band kus-about">
      <div className="kus-wrap">
        <div className="kus-rule" aria-hidden="true" />
        <div className="kus-band__grid kus-about__grid">
          <div className="kus-band__label" data-reveal="">
            <h2 id="about-title" className="kus-t-label">About</h2>
          </div>
          <div className="kus-band__content kus-about__text" data-reveal="">
            <p className="kus-t-lede kus-about__lead">{lead}</p>
            <div className="kus-about__roles">
              <h3 className="kus-t-mono kus-about__roles-title">{rolesLabel}</h3>
              <dl className="kus-about__list">
                {shown.map((r) => (
                  <div key={r.id} className="kus-about__row">
                    <div className="kus-rule" aria-hidden="true" />
                    <dt className="kus-t-ui">{r.label}</dt>
                    <dd className="kus-t-body">{r.panel}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="kus-about__more">
              <LinkArrow href="/about">More about me</LinkArrow>
              <LinkArrow href="/resume">See the resume</LinkArrow>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .kus-about__text > .kus-about__lead { margin-top: 0; max-width: 34em; }
        .kus-about__roles { margin-top: 28px; }
        .kus-about__roles-title { margin: 0 0 12px; }
        .kus-about__list { margin: 0; }
        .kus-about__row { padding: 12px 0 4px; }
        .kus-about__row > dt { margin-top: 12px; }
        .kus-about__row > dd { margin: 6px 0 0; max-width: 34em; }
        .kus-about__more { display: flex; flex-wrap: wrap; gap: 12px 28px; margin-top: 28px; }
      `}</style>
    </section>
  );
}
