# alfonso-barreiro

Source for **[barreiro.com](https://www.barreiro.com)** — Alfonso Barreiro's
UX/UI design portfolio. Built with Next.js 15 + React 19, deployed on Vercel
with a GitHub auto-deploy hook.

```
Production : https://www.barreiro.com
Preview    : every push to a branch → auto-generated *.vercel.app URL
```

---

## Quick start

```bash
git clone https://github.com/alfonsobarreiro/alfonso-barreiro.git
cd alfonso-barreiro
npm install
npm run dev         # http://localhost:3000
```

```bash
npm run build       # production build
npm run start       # serve the build on :3000
npm run lint        # eslint
```

No environment variables required for local dev — the portfolio is fully
static except for fonts (`next/font` pulls from Google at build time).

---

## Architecture

### Route map

| Route | Purpose | Source |
|---|---|---|
| `/` | Homepage — hero, featured work, about, contact | `src/app/page.tsx` |
| `/work/wayfarer` | Case study — Wayfarer travel discovery | `src/app/work/wayfarer/page.tsx` |
| `/work/mens-sole-revival` | Case study — MSR (content-first foot health) | `src/app/work/mens-sole-revival/page.tsx` |
| `/work/spotify` | Case study — Spotify Recently Played Controls | `src/app/work/spotify/page.tsx` |
| `/work/presentations` | Deck index | `src/app/work/presentations/page.tsx` |
| `/work/presentations/wayfarer` | 16-slide Wayfarer deck | `src/app/work/presentations/wayfarer/page.tsx` |
| `/work/presentations/mens-sole-revival` | 9-slide MSR deck | `src/app/work/presentations/mens-sole-revival/page.tsx` |
| `/work/presentations/spotify` | 40-slide Spotify deck | `src/app/work/presentations/spotify/page.tsx` |

### Top-level layout

```
src/
├── app/
│   ├── layout.tsx        Fonts (DM Serif + DM Sans portfolio, Barlow/Lora for MSR slides, Space Grotesk/Inter for Wayfarer slides)
│   ├── page.tsx          Homepage composition
│   ├── globals.css       Tailwind entry + design tokens + slide-scoped font overrides
│   └── work/
│       ├── wayfarer/
│       │   ├── page.tsx
│       │   └── SignupSlider.tsx      Client component — signup-walkthrough carousel with auto-advance
│       ├── mens-sole-revival/page.tsx
│       ├── spotify/page.tsx
│       └── presentations/
│           ├── page.tsx               Deck index cards
│           ├── wayfarer/page.tsx
│           ├── mens-sole-revival/page.tsx
│           └── spotify/page.tsx
│
├── components/
│   ├── Nav.tsx                        Global top nav
│   ├── Hero.tsx                       Homepage hero
│   ├── About.tsx                      Homepage about section
│   ├── Work.tsx                       Homepage featured work block
│   ├── Footer.tsx
│   ├── WayfarerSlideViewer.tsx        Responsive 1440×900 slide carousel (MSR pattern)
│   ├── wayfarer-slides/               16 TSX slides + SlideFrame helper + _ProblemSlide
│   ├── MSRSlideViewer.tsx             Same pattern for MSR
│   ├── msr-slides/                    9 TSX slides
│   └── SpotifySlideViewer.tsx         PNG-based deck viewer (images in /public/images/work/spotify/deck)
│
└── (root)
    ├── next.config.ts                 reactCompiler: true
    ├── tsconfig.json
    └── package.json
```

### Case-study pattern

Each written case study follows the same 8-section skeleton drawn from the
Cate Silva "Designing with Intention" rubric — every section answers a *why*,
not just a *what*:

```
Hero (eyebrow + thesis-style H1 + subhead + metadata row + links block)
01 Context & Brief
02 The Problem
03 What Not to Build
04 Design Decisions
05 Design System
06 Site Architecture
07 Evaluation Plan
08 Reflection
→ Next case study CTA
```

Implementations diverge in content, not in structure. A new case study should
clone `src/app/work/wayfarer/page.tsx` as a starting point.

### Slide-deck pattern

Two patterns coexist because the source material differs:

1. **Bespoke TSX** (Wayfarer + MSR) — each slide is a fixed 1440×900 React
   component using inline styles. The viewer applies `transform: scale(x)` via
   `ResizeObserver` to fit any container width while preserving pixel layout.
   Fonts are scoped via a wrapper class (`.wayfarer-slide`, `.msr-slide`) so
   each deck uses its project's typefaces without leaking into the portfolio's
   own DM Serif + DM Sans.
2. **Image-based** (Spotify) — exported PNGs from a Figma prototype, since
   that *is* the design deliverable. The viewer swaps `<img>` sources with
   prev/next controls and a progress bar.

All three decks support keyboard nav (←/→), fullscreen (F key), and click-to-jump
on the dot/progress indicators.

---

## Design tokens

Tokens live in `src/app/globals.css` under a Tailwind 4 `@theme inline` block.
The naming mirrors the parallel systems in
[`wayfarer-travel`](https://github.com/alfonsobarreiro/wayfarer-travel) and
`mens-sole-revival` — same vocabulary, different values per project.

```
brand-{50..900}     Primary palette (cognac/warm-brown for portfolio)
accent-500          Interactive / CTA accent
neutral-{50..900}   Warm-gray neutrals
ink, body, muted    Semantic text aliases
bg, bgSection       Page + section backgrounds
```

Slide wrappers (`.msr-slide`, `.wayfarer-slide`) override the three font-class
utilities (`.font-display`, `.font-heading`, `.font-body`) so slides render
with their project's typefaces without any per-slide prop drilling.

Case-study pages **don't** use the Tailwind theme — they ship bespoke inline
styles (see the `const c = {…}` block at the top of every case-study file).
This is intentional: case studies evolve on their own rhythm, and keeping
their styles lexically local means one file is the whole story.

---

## Deployment

### Hosting

- **Platform:** Vercel (project linked to this GitHub repo)
- **Production domain:** `www.barreiro.com` → Vercel, 307 redirect from apex
- **Subdomain:** `wayfarer.barreiro.com` → separate
  [`wayfarer-travel`](https://github.com/alfonsobarreiro/wayfarer-travel) project
  on the same Vercel team; see that repo's `DEPLOY.md` for the Mapbox token env
  var and Fly/Docker alternatives

### Auto-deploy flow

```
git push origin main            → Vercel builds + promotes to production
git push origin <branch>        → Vercel builds preview deploy
                                  + posts preview URL as a PR comment
```

No manual `vercel deploy` is needed. Environment variables are managed in the
Vercel dashboard (Project → Settings → Environment Variables). The portfolio
currently has none — it's fully static past the fonts.

### Rolling back

Vercel keeps every deploy. If a push breaks prod:

1. Dashboard → Deployments → pick a prior green deploy → "Promote to Production"
2. `git revert <bad-sha> && git push origin main` for the permanent fix

### Sister projects

| Repo | Domain | Purpose |
|---|---|---|
| [`alfonso-barreiro`](https://github.com/alfonsobarreiro/alfonso-barreiro) (this repo) | `www.barreiro.com` | Portfolio |
| [`wayfarer-travel`](https://github.com/alfonsobarreiro/wayfarer-travel) | `wayfarer.barreiro.com` | Live Wayfarer concept site (Next.js + Mapbox) |
| `mens-sole-revival` | `www.menssolerevival.com` | MSR shipped product |

---

## Conventions

- **Client components** declared explicitly with `"use client"`. Default is
  server-rendered.
- **Inline styles** over Tailwind classes for one-off case-study layouts.
  Utility classes for shared, reusable components (Nav, Hero, About).
- **Font variables** loaded once in `src/app/layout.tsx`, referenced via
  CSS custom properties (`var(--font-dm-serif-display)`, etc.).
- **Image assets** live under `public/images/work/<slug>/`. WebP preferred;
  PNG acceptable for exports where WebP would lose fidelity (e.g. complex
  vector-heavy slides).
- **Case-study tokens** are local (`const c = {…}` per page) — do not
  import from a shared file. If two case studies need the same value,
  duplicate it.
- **`next/font`** for every typeface. Never add a `<link rel=stylesheet>` to
  Google Fonts manually — it breaks the font-variable pattern.

---

## Adding a new case study

1. `mkdir src/app/work/<slug> && cp src/app/work/wayfarer/page.tsx src/app/work/<slug>/page.tsx`
2. Update `metadata` (title, description, openGraph URL)
3. Rewrite the 8 sections; keep the structure
4. Add images to `public/images/work/<slug>/` (WebP)
5. Add a featured-work card in `src/components/Work.tsx`
6. If shipping a deck too:
   - `cp -r src/components/msr-slides src/components/<slug>-slides`
   - Build 9–16 slides following the `SlideFrame` pattern
   - `cp src/components/MSRSlideViewer.tsx src/components/<Slug>SlideViewer.tsx`
     and rewire imports
   - Add a new route `src/app/work/presentations/<slug>/page.tsx`
   - Add a font scope for the deck in `globals.css` if it uses different typefaces
   - Register the deck in the `decks[]` array in `src/app/work/presentations/page.tsx`
7. Push → Vercel auto-deploys the preview URL for review

---

## Tooling

- **Framework:** Next.js 15 (App Router)
- **Runtime:** React 19 with the React Compiler enabled (`reactCompiler: true`)
- **Styling:** Tailwind 4 with `@theme inline` + inline styles for case studies
- **Fonts:** `next/font/google` (DM Serif Display, DM Sans, Barlow Condensed,
  Lora, Space Grotesk, Inter)
- **Images:** `next/image` + raw WebP where the Image component fights the
  design (e.g. fixed-canvas slide components use `next/image` with explicit
  `sizes`; exported PNG decks use plain `<img>`)
- **Linting:** ESLint 9 flat config (`eslint.config.mjs`)

---

## License

All source code, copy, and design work in this repository is © 2026
Alfonso Barreiro. Not open-source — the repo is public for portfolio
transparency only. Please don't copy the case-study structure wholesale for
your own work; reading for inspiration is welcome.
