"use client";

import { useEffect, useId, useRef, useState, type ChangeEvent, type CSSProperties } from "react";
import Link from "next/link";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { TryThis } from "@/components/home/TryThis";

/* "Cut it to one." The studio block's package list, with a short set of
   needs above it. As needs are checked, the list narrows to the one
   package that fits and says why, following the studio's real rules
   (alphabeta-design-v2/content/packages.ts and scopes.ts):

   - Site is one to three pages. Site+ adds ONE of four expansions picked
     at kickoff (content editor, three more pages, copy pass, custom
     component). A second expansion is a paid add-on or waits.
   - Bilingual (EN/ES) sites are Site+, with a translation review round.
   - A teardown comes first and is credited toward Site or Site+ within
     60 days. Brand identity comes before a build so the design system
     is done when the build starts. A launch page folds into a site.

   No prices here; they live on alphabeta.design. Without JavaScript the
   needs are hidden and the server render is the plain five-package list. */

type PackageSlug = "site" | "site-plus" | "landing-page" | "brand-identity" | "website-teardown";
type NeedId = "site" | "edit" | "pages" | "spanish" | "launch" | "brand" | "fix";
type Cut = "after-launch" | "later";

const PACKAGES: { slug: PackageSlug; name: string }[] = [
  { slug: "site",             name: "Site" },
  { slug: "site-plus",        name: "Site+" },
  { slug: "landing-page",     name: "Landing page" },
  { slug: "brand-identity",   name: "Brand identity" },
  { slug: "website-teardown", name: "Website teardown" },
];

const NEEDS: { id: NeedId; label: string }[] = [
  { id: "site",    label: "A site for my business" },
  { id: "edit",    label: "I want to edit it myself" },
  { id: "pages",   label: "More than three pages" },
  { id: "spanish", label: "English and Spanish" },
  { id: "launch",  label: "One page for a launch" },
  { id: "brand",   label: "A logo and brand" },
  { id: "fix",     label: "My site isn't working" },
];

const CUT_LABEL: Record<Cut, string> = {
  "after-launch": "After launch",
  later:          "Later",
};

/* Draft copy for Alfonso. One "why" line per result, one optional note
   for whatever got cut, one optional proof link. */
const COPY = {
  site:           "Up to three pages, one design round, live in two weeks.",
  siteWithLaunch: "Site covers up to three pages, so the launch page can be one of them.",
  edit:           "The content editor is your one expansion, so you can update text and images yourself.",
  pages:          "Three more pages is your one expansion, for up to six in all.",
  spanishOnly:    "Bilingual sites are Site+, with a translation review round for the Spanish.",
  spanishAdded:   "The Spanish gets its own translation review round.",
  secondExpansion:"Site+ includes one expansion, picked at kickoff. A second is a paid add-on, or it waits until after launch.",
  landing:        "One page, one goal, live in a week.",
  brand:          "Two logo directions, a palette, a type system, and templates for web, email, and social.",
  brandFirst:     "The brand comes first, so the design system is done when the build starts.",
  teardown:       "A review of your current site in 48 hours, with a fix for every finding.",
  teardownFirst:  "Start with what is broken: a review in 48 hours, with a fix for every finding.",
  allFive:        "Showing all five packages.",
};

const PROOF = {
  emblem:   { href: "/work/samples/emblem-coffee", label: "See Emblem in English and Spanish" },
  websites: { href: "#websites", label: "See the sample sites" },
  logos:    { href: "#logos", label: "See the logos" },
  review:   { href: "https://www.alphabeta.design/writings/sample-launch-review", label: "Read a sample review" },
};

type Result = {
  pkg: PackageSlug;
  why: string;
  note?: string;
  proof?: { href: string; label: string };
  cuts: Partial<Record<NeedId, Cut>>;
};

const SITE_NEEDS: NeedId[] = ["site", "edit", "pages", "spanish"];
const EXPANSIONS: NeedId[] = ["edit", "pages"];

const nameOf = (slug: PackageSlug) => PACKAGES.find((p) => p.slug === slug)?.name ?? "";

/* `picked` is in the order the visitor checked things, so the first
   expansion checked is the one kept for kickoff. */
function resolve(picked: NeedId[]): Result | null {
  if (picked.length === 0) return null;
  const has = (id: NeedId) => picked.includes(id);
  const allLater = (ids: NeedId[]) =>
    Object.fromEntries(ids.map((id) => [id, "later" as Cut])) as Partial<Record<NeedId, Cut>>;

  // A teardown comes first: it is the smallest step and is credited toward a build.
  if (has("fix")) {
    const rest = picked.filter((id) => id !== "fix");
    const next = resolve(rest);
    let note: string | undefined;
    if (next) {
      const credited = next.pkg === "site" || next.pkg === "site-plus";
      note = credited
        ? `${nameOf(next.pkg)} comes next, and the teardown is credited toward it if you build within 60 days.`
        : `${nameOf(next.pkg)} comes next.`;
    }
    return {
      pkg:   "website-teardown",
      why:   rest.length ? COPY.teardownFirst : COPY.teardown,
      note,
      proof: PROOF.review,
      cuts:  allLater(rest),
    };
  }

  // Brand before a build, so the build starts on a finished system.
  if (has("brand")) {
    const rest = picked.filter((id) => id !== "brand");
    const next = resolve(rest);
    return {
      pkg:   "brand-identity",
      why:   rest.length ? COPY.brandFirst : COPY.brand,
      note:  next ? `${nameOf(next.pkg)} comes next, built on the new brand.` : undefined,
      proof: PROOF.logos,
      cuts:  allLater(rest),
    };
  }

  if (picked.some((id) => SITE_NEEDS.includes(id))) {
    const expansions = picked.filter((id) => EXPANSIONS.includes(id));
    const kept = expansions[0];
    const extra = expansions.slice(1);
    const plus = Boolean(kept) || has("spanish");
    const cuts = Object.fromEntries(extra.map((id) => [id, "after-launch" as Cut])) as Partial<Record<NeedId, Cut>>;

    if (!plus) {
      return {
        pkg:   "site",
        why:   has("launch") ? COPY.siteWithLaunch : COPY.site,
        proof: PROOF.websites,
        cuts,
      };
    }
    const why = [
      kept === "edit" ? COPY.edit : kept === "pages" ? COPY.pages : "",
      has("spanish") ? (kept ? COPY.spanishAdded : COPY.spanishOnly) : "",
    ].filter(Boolean).join(" ");
    return {
      pkg:   "site-plus",
      why,
      note:  extra.length ? COPY.secondExpansion : undefined,
      proof: has("spanish") ? PROOF.emblem : PROOF.websites,
      cuts,
    };
  }

  return { pkg: "landing-page", why: COPY.landing, cuts: {} };
}

/* The longest results, rendered invisibly in the same grid cell as the
   live result so the block is always as tall as its tallest state and
   nothing below it moves. Ranked by text length across every
   combination, in both expansion orders. */
const SIZERS: Result[] = (() => {
  const ids = NEEDS.map((n) => n.id);
  const seen = new Map<string, { r: Result; len: number }>();
  for (let mask = 1; mask < 1 << ids.length; mask++) {
    const picked = ids.filter((_, i) => mask & (1 << i));
    const orders = picked.includes("edit") && picked.includes("pages")
      ? [picked, [...picked].sort((a, b) => (a === "pages" ? -1 : b === "pages" ? 1 : 0))]
      : [picked];
    for (const order of orders) {
      const r = resolve(order);
      if (!r) continue;
      const key = `${r.pkg}|${r.why}|${r.note ?? ""}|${r.proof?.label ?? ""}`;
      const len = r.why.length + (r.note?.length ?? 0) * 1.05 + (r.proof ? 40 : 0);
      if (!seen.has(key)) seen.set(key, { r, len });
    }
  }
  return [...seen.values()].sort((a, b) => b.len - a.len).slice(0, 4).map((s) => s.r);
})();

const font = "var(--font-dm-sans), sans-serif";

const body: CSSProperties = {
  fontFamily: font,
  fontSize:   "var(--text-body)",
  lineHeight: 1.55,
  color:      "var(--color-neutral-700)",
  margin:     0,
};

const rowLink: CSSProperties = {
  display:        "flex",
  justifyContent: "space-between",
  alignItems:     "center",
  padding:        "14px 0",
  minHeight:      "48px",
  boxSizing:      "border-box",
  borderTop:      "1px solid var(--color-neutral-300)",
  fontFamily:     font,
  fontSize:       "17px",
  fontWeight:     500,
  color:          "var(--color-text)",
  textDecoration: "none",
};

function Note({ result }: { result: Result }) {
  return (
    <>
      <p style={body}>{result.why}</p>
      {result.note ? <p style={{ ...body, marginTop: "8px" }}>{result.note}</p> : null}
    </>
  );
}

export default function ScopePicker() {
  const uid = useId();
  const fieldsetRef = useRef<HTMLFieldSetElement>(null);
  const [picked, setPicked] = useState<NeedId[]>([]);
  const [touched, setTouched] = useState(false);

  /* Pick up anything checked before hydration, or restored by the
     browser on back/forward, so the result matches the boxes. */
  useEffect(() => {
    const inputs = fieldsetRef.current?.querySelectorAll<HTMLInputElement>("input[type=checkbox]");
    const restored = inputs ? [...inputs].filter((i) => i.checked).map((i) => i.value as NeedId) : [];
    if (!restored.length) return;
    const frame = requestAnimationFrame(() => {
      setPicked(restored);
      setTouched(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value as NeedId;
    const on = e.target.checked;
    setTouched(true);
    setPicked((prev) => (on ? [...prev.filter((p) => p !== id), id] : prev.filter((p) => p !== id)));
  };

  const result = resolve(picked);
  const resultKey = result ? `${result.pkg}|${result.why}|${result.note ?? ""}` : "none";
  const hintId = `${uid}-hint`;

  return (
    <div className="scope-picker">
      <noscript dangerouslySetInnerHTML={{ __html: "<style>.scope-fieldset{display:none!important}</style>" }} />

      <fieldset ref={fieldsetRef} className="scope-fieldset" aria-describedby={hintId}>
        <legend className="scope-legend"><TryThis />Check what you need.</legend>
        <p id={hintId} style={{ ...body, margin: "4px 0 20px" }}>
          The list below cuts to one package.
        </p>
        <div className="scope-chips">
          {NEEDS.map((n) => {
            const cut = result?.cuts[n.id];
            return (
              <label key={n.id} className="scope-chip" data-cut={cut ?? undefined}>
                <input type="checkbox" name="scope-need" value={n.id} onChange={onChange} />
                <span className="scope-chip__text">{n.label}</span>
                {cut ? (
                  <span className="scope-chip__tag">
                    <span className="scope-sr">, </span>
                    {CUT_LABEL[cut]}
                  </span>
                ) : null}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="scope-result">
        <div className="scope-result__live">
          <ul aria-label="Packages" className="scope-list">
            {PACKAGES.map((p) => {
              const out = result !== null && result.pkg !== p.slug;
              return (
                <li key={p.slug} className="scope-row" data-out={out || undefined} inert={out} aria-hidden={out || undefined}>
                  <div className="scope-row__inner">
                    <Link
                      href={`https://www.alphabeta.design/services#${p.slug}`}
                      className="studio-package"
                      style={rowLink}
                    >
                      {p.name}
                      <span aria-hidden="true" style={{ color: "var(--color-text-link)" }}>→</span>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>

          <div aria-live="polite" aria-atomic="true" className="scope-note">
            {result ? (
              <div key={resultKey} className="scope-note__body">
                <span className="scope-sr">{nameOf(result.pkg)}. </span>
                <Note result={result} />
              </div>
            ) : touched ? (
              <span className="scope-sr">{COPY.allFive}</span>
            ) : null}
          </div>

          {result?.proof ? (
            <div key={`${resultKey}-proof`} className="scope-note__body" style={{ marginTop: "16px" }}>
              <LinkArrow href={result.proof.href}>{result.proof.label}</LinkArrow>
            </div>
          ) : null}
        </div>

        <div className="scope-result__sizer" aria-hidden="true" inert>
          <div style={{ borderBottom: "1px solid var(--color-neutral-300)" }}>
            {PACKAGES.map((p) => <div key={p.slug} style={rowLink}>{p.name}<span>→</span></div>)}
          </div>
        </div>
        {SIZERS.map((r, i) => (
          <div key={i} className="scope-result__sizer" aria-hidden="true" inert>
            <div style={{ ...rowLink, borderBottom: "1px solid var(--color-neutral-300)" }}>{nameOf(r.pkg)}<span>→</span></div>
            <div className="scope-note"><Note result={r} /></div>
            {r.proof ? <div style={{ ...body, marginTop: "16px", paddingBottom: "3px" }}>{r.proof.label}</div> : null}
          </div>
        ))}
      </div>

      <style>{`
        .scope-sr {
          position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
        }
        .scope-fieldset { border: 0; margin: 0 0 28px; padding: 0; min-width: 0; }
        .scope-legend {
          padding: 0; font-family: ${font}; font-size: var(--text-h3); font-weight: 500;
          line-height: 1.4; color: var(--color-text);
        }
        .scope-chips { display: flex; flex-wrap: wrap; gap: 14px 8px; container: scope-chips / inline-size; }

        /* Same chip as .work-filter: 44px, square, ink-filled when on. */
        .scope-chip {
          position: relative; display: inline-flex; align-items: center;
          padding: 10px 14px; min-height: 44px; box-sizing: border-box;
          border: 1px solid var(--color-neutral-400); border-radius: var(--radius-chip); background: var(--color-paper);
          font-family: ${font}; font-size: var(--text-body); font-weight: 500; line-height: 1.3;
          color: var(--color-neutral-700); cursor: pointer; user-select: none;
          -webkit-tap-highlight-color: transparent;
          transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
        }
        @media (hover: hover) {
          .scope-chip:hover { border-color: var(--color-text); color: var(--color-text); }
        }
        /* In a narrow column (phones, and the two-column block at tablet
           widths) one need per row, full width: a tidy checklist instead of
           a ragged stack. */
        @container scope-chips (max-width: 400px) {
          .scope-chip { flex: 1 1 100%; }
        }
        .scope-chip:has(input:checked) { background: var(--color-text); border-color: var(--color-text); color: var(--color-paper); }
        .scope-chip:has(input:focus-visible) { outline: 2px solid var(--color-focus-ring); outline-offset: 3px; }
        .scope-chip input {
          position: absolute; inset: 0; width: 100%; height: 100%; margin: 0;
          opacity: 0; cursor: pointer;
        }
        .scope-chip__text { position: relative; }
        /* The cut: a line drawn through the need, left to right. */
        .scope-chip__text::after {
          content: ""; position: absolute; left: -3px; right: -3px; top: 54%;
          height: 1px; background: currentColor;
          transform: scaleX(0); transform-origin: left center;
          transition: transform 0.32s ease-out;
        }
        .scope-chip[data-cut] .scope-chip__text::after { transform: scaleX(1); }
        /* Tag pinned to the chip's top edge, so the chip never changes size. */
        .scope-chip__tag {
          position: absolute; top: 0; right: 8px; transform: translateY(-50%);
          padding: 0 5px; border: 1px solid var(--color-text); border-radius: 4px;
          background: var(--color-paper); color: var(--color-text);
          font-size: var(--text-small); font-weight: 500; line-height: 15px; white-space: nowrap;
          pointer-events: none;
        }

        /* Result: the live content and the invisible sizers share one cell. */
        .scope-result { display: grid; }
        .scope-result > * { grid-area: 1 / 1; min-width: 0; }
        .scope-result__sizer { visibility: hidden; pointer-events: none; }
        .scope-list { list-style: none; margin: 0; padding: 0; border-bottom: 1px solid var(--color-neutral-300); }
        .scope-row {
          display: grid; grid-template-rows: 1fr; overflow: hidden;
          transition: grid-template-rows 0.3s ease, opacity 0.2s ease;
        }
        .scope-row__inner { min-height: 0; overflow: hidden; }
        .scope-row[data-out] { grid-template-rows: 0fr; opacity: 0; }
        .scope-note { margin-top: 16px; }
        .scope-note:empty { margin-top: 0; }
        .scope-note__body { animation: scope-in 0.25s ease both; }
        @keyframes scope-in { from { opacity: 0; } to { opacity: 1; } }

        .studio-package:hover { color: var(--color-text-link) !important; }
        /* The row clips its content so it can collapse, which would clip the
           link's outline too. Draw the ring on the row instead, like .wcard. */
        .studio-package:focus-visible { outline: none; }
        .scope-row:has(.studio-package:focus-visible) { outline: 2px solid var(--color-focus-ring); outline-offset: 2px; }

        @media (prefers-reduced-motion: reduce) {
          .scope-chip, .scope-row { transition: none; }
          .scope-chip__text::after { transition: none; }
          .scope-note__body { animation: none; }
        }
      `}</style>
    </div>
  );
}
