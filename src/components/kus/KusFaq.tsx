import { KUS_COPY } from "@/components/kus/copy";
import { AVAILABILITY, formatUpdated } from "@/lib/availability";
import type { HomeAudience } from "@/components/home/HomePage";

/* Before you ask (spec 2.12, from Pumo): native disclosures, closed by
   default, no numbering, dotted rules between rows. Enter and Space open
   them with no script. Each summary row is at least 56px tall, with a
   drawn plus sign in terracotta-600 that turns 45 degrees when open.

   The remote row renders only once Alfonso's own sentence exists
   (KUS_COPY.faq.remoteNow). There is no pricing question: prices live on
   alphabeta.design, linked from the close. On /hiring the
   concepts answer drops the studio clause. "What do you build in?" was
   cut 2026-11-01: What I do answers it. */
export default function KusFaq({ audience }: { audience: HomeAudience }) {
  const f = KUS_COPY.faq;
  const updated = formatUpdated();
  const rows: { q: string; a: string }[] = [
    { q: f.contract, a: updated ? `${AVAILABILITY.line} ${updated}` : AVAILABILITY.line },
    ...(f.remoteNow ? [{ q: f.remoteQ, a: `${f.remoteFacts} ${f.remoteNow}` }] : []),
    { q: f.conceptsQ, a: audience === "hiring" ? f.conceptsA.hiring : f.conceptsA.all },
  ];

  return (
    <section id="faq" aria-labelledby="faq-title" className="kus-band kus-faq">
      <div className="kus-wrap">
        <div className="kus-rule" aria-hidden="true" />
        <div className="kus-band__grid">
          <div className="kus-band__label" data-reveal="">
            <h2 id="faq-title" className="kus-t-label">{f.title}</h2>
          </div>
          <div className="kus-band__content kus-faq__list" data-reveal="">
            {rows.map((r, i) => (
              <div key={r.q}>
              {i > 0 ? <div className="kus-rule" aria-hidden="true" /> : null}
              <details className="kus-faq__row">
                <summary className="kus-faq__q">
                  <span className="kus-t-title">{r.q}</span>
                  <svg className="kus-faq__plus" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false">
                    <path d="M11 3.2c.2 5.4-.1 10.6.1 15.6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M3.3 11.2c5.2-.3 10.3.1 15.4-.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </summary>
                <p className="kus-t-body kus-faq__a">{r.a}</p>
              </details>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .kus-faq__list > * + * { margin-top: 0; }
        .kus-faq__row { display: block; }
        .kus-faq__q {
          display: flex; align-items: center; justify-content: space-between; gap: 24px;
          min-height: 56px; padding: 12px 0;
          list-style: none; cursor: pointer;
          border-radius: 4px;
        }
        .kus-faq__q::-webkit-details-marker { display: none; }
        .kus-faq__q::marker { content: ""; }
        .kus-faq__plus {
          flex: none; color: var(--color-terracotta-600);
          transition: transform var(--kus-dur-in) var(--kus-ease-spring);
        }
        .kus-faq__row[open] .kus-faq__plus { transform: rotate(45deg); }
        @media (hover: hover) { .kus-faq__q:hover .kus-t-title { color: var(--color-terracotta-700); } }
        .kus-faq__a { padding: 0 0 20px; }
        @media (prefers-reduced-motion: reduce) { .kus-faq__plus { transition: none; } }
        :root[data-dots="still"] .kus-faq__plus { transition: none; }
        @media (forced-colors: active) { .kus-faq__plus { color: CanvasText; } }
      `}</style>
    </section>
  );
}
