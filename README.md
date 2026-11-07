# jerryzhu.org

Recruiting-style profile for Jerry Zhu: a varsity ultimate player who also happens to ship backend, data, and ML systems.

**Stack:** Astro 7 (static) · vanilla CSS with design tokens · ~3 KB of hand-written TS · self-hosted fonts · Cloudflare static assets.
No React, no three.js, no particles library. The old Next.js version shipped all of those.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # -> dist/
npm run preview
```

## Deploy to Cloudflare

```bash
npx wrangler login        # once
npm run deploy            # astro build && wrangler deploy
```

Config lives in `wrangler.jsonc` (static assets from `dist/`, 404 page enabled). Cache and security headers are in `public/_headers`. Or connect the repo in the Cloudflare dashboard (build command `npm run build`, output `dist`).

## Hero video

The hero is a scroll-driven transition: full-bleed video that crops into the right-hand portrait panel while name and stats slide in.

```bash
scripts/encode-hero.sh path/to/huck.mov 12 6   # start at 12s, 6s loop
```

Writes AV1 + H.264 + poster into `public/video/` (muted, no audio, 1080p max). **The current clip is a synthetic placeholder.**

## Design system

See [DESIGN.md](./DESIGN.md) and the live style guide at `/design`.

## Content

All copy lives in `src/data/*.ts`. Edit data, not markup.
