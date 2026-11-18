/* The top of the homepage: who this is, and nothing else. It replaces the
   old hero (Hero.tsx, kept for the prototype pages), whose pieces moved to
   the close at the bottom (HireClose.tsx): the ask, the portrait, the
   weather, and the drip.

   The page's only H1, then one line. No buttons, no portrait, no dot grid,
   no effects. Short on purpose, so the Men's Sole Revival band starts
   inside the first screen: the bottom sits at about 300px at 1440x900
   and about 330px at 390x844. The nav carries Resume and Email for
   anyone who wants out early.

   Same left rail and content max as every band below it. The top padding
   is the fixed 72px nav plus one 24px lattice row. Server-rendered, no
   client code. */

export default function NameTag() {
  return (
    <section id="top" aria-labelledby="nametag-title" className="nametag">
      <div className="nametag__inner">
        <h1 id="nametag-title" className="nametag__h1">
          Alfonso Barreiro, designer and web developer in Portland, Oregon.
        </h1>
        {/* One sentence per line from 768px; one paragraph below. */}
        <p className="nametag__line">
          <span className="nametag__s">Fifteen years of websites, logos, print, and products.</span>{" "}
          <span className="nametag__s">I design in Figma and build in React, Next.js, and Squarespace.</span>
        </p>
      </div>
      <style>{CSS}</style>
    </section>
  );
}

const CSS = `
.nametag {
  padding: 96px clamp(24px, 6vw, 80px) 24px;
  background: var(--color-paper);
}
.nametag__inner {
  max-width: var(--content-max);
  margin: 0 auto;
}
.nametag__h1 {
  font-family: var(--font-dm-sans), sans-serif;
  font-size: clamp(28px, 3.6vw, 48px);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: var(--color-text);
  margin: 0;
  max-width: 28ch;
  text-wrap: balance;
}
.nametag__line {
  font-family: var(--font-dm-sans), sans-serif;
  font-size: clamp(17px, 1.6vw, 20px);
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-text);
  margin: 12px 0 0;
  max-width: 640px;
}
@media (min-width: 768px) {
  .nametag__line { max-width: none; }
  .nametag__s { display: block; }
}
`;
