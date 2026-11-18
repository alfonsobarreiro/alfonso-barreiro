import { DrawnArrow } from "@/components/kus/DrawnArrow";

/* The line (spec 2.3): "I cut scope, then build what's left." right under
   the reel, at 88px in terracotta-600, with the NameTag's second line as
   the lede. It is a <p>, not a heading, so the close keeps the same
   sentence as its H2: the line here, the echo at the bottom.

   Kus's intro composition (a giant arrow beside the line), drawn with
   Alfonso's own hand-drawn arrow at about 300px, pointing right at the
   line from the left third. It draws on as the band enters. Phones: the
   arrow comes after the lede at 120px, turned to point down and right
   into the work, so the line itself starts inside the first screen.

   No reveal start state on the text: at 390x844 both rows of the line sit
   inside the first screen (740 to 816), because the reel's phone box is
   square (KusReel). At 375x667 the reel gives up height for its caption
   row, and the line starts below the fold instead of peeking in. */
export default function KusIntro() {
  return (
    <section id="intro" className="kus-intro">
      <div className="kus-wrap kus-intro__grid">
        <div className="kus-intro__mark" data-reveal="draw">
          <DrawnArrow width={300} stroke={4} className="kus-intro__arrow kus-intro__arrow--wide" />
        </div>
        <div className="kus-intro__text">
          <p className="kus-t-line" data-spec="DM Sans 600">I cut scope, then build what&rsquo;s left.</p>
          <p className="kus-t-lede kus-intro__lede">
            <span className="kus-intro__s">Fifteen years of websites, logos, print, and products.</span>{" "}
            <span className="kus-intro__s">I design in Figma and build in React, Next.js, and Squarespace.</span>
          </p>
        </div>
        <div className="kus-intro__mark kus-intro__mark--narrow" data-reveal="draw">
          <DrawnArrow width={120} stroke={3} className="kus-intro__arrow" />
        </div>
      </div>
      <style>{`
        .kus-intro {
          padding: var(--kus-band-y) var(--kus-pad-x);
          background: var(--color-paper);
        }
        .kus-intro__grid { display: grid; grid-template-columns: minmax(0, 1fr); }
        .kus-intro__arrow { color: var(--color-terracotta-500); display: block; }
        .kus-intro__mark { display: none; }
        .kus-intro__lede { margin-top: 24px; max-width: 34em; }
        @media (min-width: 1024px) {
          .kus-intro__grid {
            grid-template-columns: repeat(12, minmax(0, 1fr));
            column-gap: var(--kus-gap);
          }
          .kus-intro__mark:not(.kus-intro__mark--narrow) {
            /* Centered on the line's first two lines, and never wider than
               the left third minus a gap. */
            display: flex; align-items: center; justify-content: flex-end;
            padding-right: 32px;
            grid-column: 1 / span 4;
            align-self: start;
            height: calc(2 * clamp(38px, calc(19px + 4.76vw), 88px));
          }
          .kus-intro__arrow--wide { width: min(300px, 100%); height: auto; }
          .kus-intro__text { grid-column: 5 / span 8; }
          .kus-intro__s { display: block; }
          .kus-intro__lede { max-width: none; }
        }
        @media (max-width: 1023px) {
          .kus-intro__mark--narrow { display: block; margin-top: 32px; }
          .kus-intro__mark--narrow .kus-intro__arrow { transform: rotate(35deg); transform-origin: 20% 50%; }
        }
        @media (max-width: 767px) {
          .kus-intro { padding-top: 40px; }
        }
      `}</style>
    </section>
  );
}
