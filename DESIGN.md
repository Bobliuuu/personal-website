# Design system: "Field Notes"

Theme: a recruiting profile for an athlete. Scoreboard numbers, scouting-report tables, season logs. Dark "stadium night" by default, light "paper" via the toggle.

## Layers (`src/styles`)
1. `tokens.css`: primitives (ink, paper, lime, gold), semantic tokens (`--bg`, `--fg`, `--accent`), type scale (`--step--1…5`), 4px space scale, radii, shadows, motion, layout. `@layer reset, tokens, base, components, utilities` fixes cascade order.
2. `base.css`: reset, element defaults, utilities (`.wrap`, `.mono`, `.reveal`).
3. `components.css`: `.btn`, `.chip`, `.card`, `.sec-head`, `.stat`, `.log`, `.field`, `.nav`.

Astro components wrapping them: `Button`, `Chip`, `SectionHead`, `Scenery` (mountain / forest / water SVG), `Hero`, `Nav`.

## Rules
- No raw colours, sizes, or durations outside `tokens.css`.
- Display type: Barlow Condensed 800 uppercase. Body: Inter Variable. Labels and numbers: JetBrains Mono.
- One accent (disc lime; gold for honours). Never both in the same component.
- Motion: reveals use `--ease-out`; everything respects `prefers-reduced-motion`.
- Boids background (`src/scripts/boids.ts`): a flock of discs that flee the cursor; paused when the tab is hidden.

## Performance budget
Static HTML, system of self-hosted fonts, images via `astro:assets` (AVIF/WebP), video lazily paused off-screen. Target: Lighthouse 100 on mobile.
