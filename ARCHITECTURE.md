# Architecture — Palma's Eldritch Codex

Single-page portfolio. **Astro + Tailwind CSS v4 + vanilla TypeScript.**
No React, no runtime framework — the build ships static HTML, one CSS file,
and ~10 kB of plain JS (3.6 kB gzipped).

Rewritten from Next.js/React in June 2026 (branch `astro-rewrite`). Goals:
fast page, easy edits after months away, content separated from markup.

## Quick recipes (the stuff future-me actually needs)

| I want to... | Edit |
|---|---|
| Add/edit a project | `src/data/projects.json` (description = HTML string) |
| Add/edit a note | New `.md` file in `src/notes/scribbles/` — frontmatter: `title`, `date` (YYYY-MM-DD), body = markdown |
| Add a book review | New `.md` file in `src/notes/tomes/` — same plus `author`, `rating` (potions, halves ok), `tags`, `cover` (image in public/). Potion sprites: `/potion-{full,half,empty}.png` |
| Add/edit a FAQ entry | `src/data/faq.json` (answer = HTML string) |
| Change inventory items | `src/data/inventory.json` (max 48 items: desktop grid 8×6, mobile 6×8) |
| Change the D&D stats | `src/data/stats.json` |
| Change bio / headings / layout | `src/pages/index.astro` |
| Change colors / theme palettes | `@theme` + `.alternate-colors` blocks in `src/styles/global.css` |
| Change loading-screen jokes | `LOADING_FACTS` in `src/scripts/widgets.ts` |
| Style the loading bar | Open site with `?loader` — bar loops forever, ignores session skip |
| Add a sound | Drop file in `public/sounds/`, register it in `SOUNDS` in `src/scripts/sound.ts` |
| Add a new popup window | Add `<Panel id="x" title="X">` in `index.astro` + a button with `data-panel-toggle="x"` |

Deploy = push to `main`. GitHub Actions builds and publishes to GitHub Pages
(`.github/workflows/deploy.yml`). No manual deploy step.

Local dev: `npm run dev` · build: `npm run build` · preview build: `npm run preview`.

## Layout of the code

```
src/
  pages/index.astro      The whole page: header, bio, stats, artifacts,
                         panel declarations, and the single <script> that
                         wires up all behavior modules.
  layouts/Layout.astro   <head>: fonts preload, favicon, inline pre-paint
                         script (theme restore + loading-screen skip).
  components/
    Panel.astro          Generic openable window. Renders BOTH variants:
                         mobile fullscreen modal + desktop draggable popup.
                         Its <slot> is rendered twice (once per variant).
    Inventory.astro      Skill grid (data-driven, two tables: mobile/desktop)
    Projects.astro       Project list (data-driven)
    Notes.astro          Tabbed notes (SCRIBBLES / TOME REVIEWS) + detail
                         views, rendered from the src/notes/ collection
    Faq.astro            Accordion (data-driven)
    Contacts.astro       Static contact panel
    Profile.astro        Framed portrait; frame swaps with theme via CSS only
    Button.astro         Chunky pixel button
    ThemeToggle.astro    Torch button markup (behavior in widgets.ts)
    SoundToggle.astro    Speaker button markup (behavior in widgets.ts)
    LoadingScreen.astro  Decorative fake loading bar (see below)
  data/                  Editable content (JSON) for projects/faq/inventory/
                         stats. "HTML string" fields are injected with
                         set:html — keep them trusted.
  notes/                 One markdown file per entry (Astro content
                         collection; schema in src/content.config.ts).
                         The folder decides the tab: scribbles/ = notes,
                         tomes/ = book reviews.
  content.config.ts      Frontmatter schema — build fails on invalid fields.
  scripts/
    sound.ts             playSound/toggleSound. Plain Audio(), no howler.
                         Enabled state persists: localStorage 'sound-enabled'.
    panels.ts            Open/close/toggle panels, z-order (global counter),
                         drag (pointer events, handle = .drag-handle,
                         clamped to top >= 0), Escape closes topmost,
                         body scroll lock while a mobile modal is open.
    inventory.ts         Desktop: click cell -> open link. Mobile: tap ->
                         tooltip (clamped to screen), double-tap -> link.
    faq.ts               Accordion, one open at a time.
    notes.ts             List <-> detail visibility swaps (views are all
                         pre-rendered static HTML).
    widgets.ts           Theme toggle, sound toggle, mobile controls drawer,
                         chest hover sound/close-animation, eye follows
                         cursor, loading-screen animation.
  styles/global.css      Tailwind v4 import, @font-face (AtlantisText,
                         4 weights), color tokens (@theme), dark palette
                         (.alternate-colors), sprite animations (crow, chest,
                         eye), popUp/popDown keyframes, custom scrollbars.
public/                  Static assets served at / (images, sounds/, fonts/)
.github/workflows/deploy.yml  Push to main -> build -> GitHub Pages
```

## Conventions & mechanics

- **Data attributes drive behavior.** Markup declares intent
  (`data-panel-toggle="faq"`, `data-sound="click1"`, `data-chest`,
  `data-note-open="2"`); scripts query and wire them on load. No IDs are
  used for behavior except `#loading-screen`.
- **Panels**: `Panel.astro` wraps content in a hidden `[data-panel]` div.
  Opening removes `hidden`, plays the `popUp` CSS animation, places the
  desktop popup at its `pos` spawn point (default/left/middle/right as
  viewport fractions) and raises it (z-index counter starts at 50).
  Closing plays `popDown` then re-hides after 150 ms.
- **Theme**: dark mode = `alternate-colors` class on `<html>`, which
  redefines the Tailwind color tokens. Persisted as localStorage
  `theme: 'dark' | 'light'`; restored by an inline script in `<head>`
  before first paint (no flash).
- **Loading screen is a joke.** The site is fully loaded behind it. Shown on
  every page load: bar fills over 4 s (fact-reading time), then the punchline
  caption ("actually loaded in 0.1s") reveals with the real load time, holds
  2 s, fades. Click anywhere skips. Knobs: `DURATION`/`HOLD`/`FADE` in
  `initLoadingScreen` (`src/scripts/widgets.ts`).
- **Mobile vs desktop are separate markup trees** (Tailwind `md:` show/hide),
  same as the original React version. When changing main-page content,
  remember to update both the mobile and the desktop block in `index.astro`.
- **Tooltips** (stats, inventory desktop) are pure CSS `group-hover` /
  `group-focus` — no JS.
- **Border scale is 3 tiers**: `border-16` outer frames (main card, desktop
  popups), `border-6` interactive chunks (buttons, list items, inventory
  grid, header dividers), `border-4` details (tooltips, thumbnails, small
  controls). Don't introduce other widths.
- **Title shadows**: hard pixel offsets only (`text-shadow: NpxNpx 0 var(--color-…)`,
  no blur), 4px main title / 3px subtitles / 2px small headings. Only on
  backgrounds lighter than the text (skip the darker_primary header bars).
- Fonts self-hosted in `public/fonts/`, preloaded in `Layout.astro`,
  `font-display: swap`.

## History / gotchas

- The old Next.js version lives in git history before the `astro-rewrite`
  merge (last Next commit: `a95dd23`). Old `page.tsx` was the orchestrator
  if you ever need to compare behavior.
- The old `next.config.ts` set `basePath: '/portfolio'` in prod, which was
  wrong for a `*.github.io` user-site repo. Astro config uses site root.
- GitHub Pages must be set to deploy from **GitHub Actions** (repo Settings
  → Pages → Source), not from a branch — the old `gh-pages` npm flow is gone.
- `react`/`next` era content references were updated to past tense
  (inventory tooltips for React/Next.js, FAQ tech list, Web Portfolio
  project description).
