import AboutPrints from "@/components/home/AboutPrints";
import KusDotField from "@/components/kus/KusDotField";

/* The first screen (spec 2.2, rebuilt 2026-11-06). The reel was cut that
   morning ("Kill the hero!"); KusReel.tsx and plates.ts stay in the repo.
   Then: "Move my pictures to the hero. Use the font treatment (orange and
   large) and bring back the dots and the dot-hover effect."

   - The name line is the page's only H1, in the display role (88/600,
     terracotta-600). "Product designer" since the 2026-11-06 audit
     (Alfonso repositioned as a Product Designer, 2026-07-27). Under it,
     the line and its lede at the title size.
   - The two prints (AboutPrints: at work, off the clock) moved here from
     About; the swap button comes with them.
   - Behind both, the 24px dot lattice with the pointer spotlight
     (KusDotField). Small type on the lattice gets a paper ground, as in
     the close, so no dot crosses it.

   From 1024px the name takes columns 1 to 8 and the prints sit in 9 to 12;
   below, the prints follow the name. #hero wraps #top: the nav logo's
   "Back to top" scrolls to #hero. */
export default function KusFirstScreen() {
  return (
    <KusDotField id="hero" className="kus-first">
      <div className="kus-wrap kus-first__grid">
        <section id="top" aria-labelledby="kus-name" className="kus-first__name">
          <h1 id="kus-name" className="kus-t-line kus-first__h1" data-spec="DM Sans 600">
            Alfonso Barreiro, product designer and web developer in Portland, Oregon.
          </h1>
          {/* The line and its lede, verbatim, moved up from their own band
              (2026-11-06 audit, section 10, finding 2), at the title size
              in navy so they do not stack a second display line. */}
          <p className="kus-t-title kus-first__lede">
            I cut scope, then build what&rsquo;s left. Fifteen years of products, websites, logos, and print. I design in Figma and build in React, Next.js, and Squarespace.
          </p>
        </section>
        <div className="kus-first__prints">
          <AboutPrints />
        </div>
      </div>
      <style>{`
        /* Entrance on load (2026-11-10, Alfonso: fade in "all sections as
           they appear"): the same fade and 24px rise as KusReveal, but in
           CSS, so the name never waits for JavaScript to show. Name, then
           lede, then prints, 80ms apart. Off with reduced motion or the
           dots stopped. */
        @keyframes kus-first-in {
          from { opacity: 0; transform: translate3d(0, var(--kus-rise), 0); }
          to   { opacity: 1; transform: none; }
        }
        :root:not([data-dots="still"]) .kus-first__h1,
        :root:not([data-dots="still"]) .kus-first__lede,
        :root:not([data-dots="still"]) .kus-first__prints {
          animation: kus-first-in var(--kus-dur-enter) var(--kus-ease-out) both;
        }
        :root:not([data-dots="still"]) .kus-first__lede   { animation-delay: 80ms; }
        :root:not([data-dots="still"]) .kus-first__prints { animation-delay: 160ms; }
        @media (prefers-reduced-motion: reduce) {
          .kus-first__h1, .kus-first__lede, .kus-first__prints { animation: none !important; }
        }
        .kus-first {
          position: relative; isolation: isolate;
          /* 72px clears the fixed nav, then the band's own air. */
          padding: calc(72px + var(--kus-band-y)) var(--kus-pad-x) var(--kus-band-y);
          background-color: var(--color-paper);
          background-image: radial-gradient(circle, var(--color-terracotta-300) 1px, transparent 1px);
          background-size: 24px 24px;
          background-position: 0 0;
        }
        /* The spotlight: bigger terracotta-500 dots in register with the
           lattice, shown only in a soft circle around the pointer. */
        .kus-first::before {
          content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;
          background-image: radial-gradient(circle, var(--color-terracotta-500) 2px, transparent 2px);
          background-size: 24px 24px;
          background-position: 0 0;
          opacity: var(--kus-dot-on, 0);
          -webkit-mask-image: radial-gradient(circle 220px at var(--kus-dot-x, -9999px) var(--kus-dot-y, -9999px), #000 0%, transparent 70%);
                  mask-image: radial-gradient(circle 220px at var(--kus-dot-x, -9999px) var(--kus-dot-y, -9999px), #000 0%, transparent 70%);
          transition: opacity 0.2s ease;
        }
        :root[data-dots="still"] .kus-first::before { display: none; }
        @media (prefers-reduced-motion: reduce) { .kus-first::before { transition: none; } }

        .kus-first__grid { display: grid; grid-template-columns: minmax(0, 1fr); row-gap: 48px; }
        .kus-first__h1 { padding-bottom: 0.12em; max-width: 12em; }
        .kus-first__lede { margin-top: 32px; max-width: 30em; text-wrap: pretty; }
        /* The lede on the lattice: a paper ground, as small type gets. */
        .kus-first__lede { width: fit-content; background: var(--color-paper); padding: 4px 8px; margin-left: -8px; -webkit-box-decoration-break: clone; box-decoration-break: clone; }
        @media (min-width: 1024px) {
          .kus-first__grid { grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: var(--kus-gap); align-items: center; }
          .kus-first__name   { grid-column: 1 / span 8; }
          .kus-first__prints { grid-column: 9 / span 4; justify-self: end; }
        }
        /* Small type and the button on the lattice: a paper ground. */
        .kus-first .ap__caption { width: fit-content; background: var(--color-paper); padding: 2px 6px; margin-left: -6px; }
        .kus-first .ap__button { background: var(--color-paper) !important; }
      `}</style>
    </KusDotField>
  );
}
