# alfonso-barreiro

Alfonso's personal portfolio site. Next.js + TypeScript.

## Deploy

**Host: Vercel. Always. Never another host.**

Two environments, both Vercel + GitHub auto-deploy:

- `main` → Production → https://barreiro.com
- `staging` → Preview → https://staging.barreiro.com

Push to `staging` first. Merge to `main` only when staging looks good.
No manual build step on either.

Env vars (`NEXT_PUBLIC_MAPBOX_TOKEN`, etc.) live in Vercel → Settings →
Environment Variables, applied to all three environments. Changes need
a redeploy to take effect.

## Local dev

```
npm run dev
```
→ http://localhost:3000

## Content & docs

Case study copy, design notes, and update logs live in the alfOS vault, not in this repo:
`/Users/alfonsobarreiro/Documents/Claude/Projects/alfOS/Career/UX-UI Portfolio/Portfolio Website/`

When shipping copy or design changes, add a dated note to that vault folder before or alongside the deploy.

## Voice for site copy

Alfonso has a voice-writing skill with a calibrated voice profile. Hard bans include em dashes (—), AI-tell vocabulary (delve, leverage, robust, etc.), and motivational closers. Before editing any user-facing string in this repo, run the proposed copy through that skill or against the voice profile.
