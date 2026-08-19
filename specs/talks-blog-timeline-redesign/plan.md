# Talks & Blog Timeline Redesign — Plan

## Goal

Redesign the Blog and Talks list pages so a first-time visitor grasps, within a
few seconds and without scrolling, **what** these pages cover, **how much**, and —
most importantly — **how consistently over the years**. The narrative is
longevity and consistency, not raw counts.

Both pages share one shell and interaction model. The Talks page carries more
nuance (place, decks, code, embeds) handled through an adaptive card body, not a
separate layout.

## Core concept

A **year-anchored timeline** is the primary view. Content is grouped into year
sections (newest first). A **cadence strip** of per-year cells sits at the top as
a scroll-spy "you are here" map: it highlights the active year as you scroll, and
clicking a cell smooth-scrolls to that year's section. A **topic filter** (broad,
counted tags) lets visitors narrow the timeline to a subject.

```text
Page title
[ Filter by topic ▾ ]   <- toggle button (collapsed by default, web + mobile)
   └── (expanded) JavaScript (18) · Java (12) · AI/LLM (6) · Testing (5) …  [All]
Cadence strip (thin, sticky) — ▪▪▫▪▪▪▫▪▪▪▪  years, scroll-spy
Timeline
  ├── 2025 ──────────  [cards]
  ├── 2024 ──────────  [cards]
  └── …  down to the first year
```

## Decisions locked

- **Hero tagline dropped.** No "Writing since 20XX" line; the landing page covers
  the personal intro. The cadence strip itself conveys longevity.
- **Timeline layers:** year sections, newest at top; scroll to browse, or jump via
  the cadence strip.
- **Tags are broad and clickable.** A small set of canonical topics power the
  filter. Narrower raw tags map up into these broad topics.
- **Tag mapping lives in code** (a `TAG_MAP` in `src/lib/api.ts`), manually
  maintained. New raw tags appearing in markdown are folded in by editing the map.
- **Existing posts get normalized tags** as part of this work, including
  hand-assigning tags to posts that currently have none.
- **Talks get tags too**, hand-assigned from the same vocabulary (only 19 entries).
- **Multi-tag posts allowed.** Tile counts may sum to more than the post total;
  that is acceptable and reflects breadth.
- **Tile counts are global totals**, computed at build time; they do not
  recompute when a filter is active.
- **Selection is single-select + "All" default.** One topic at a time.
- **Filter is a toggle** on both web and mobile — collapsed behind a button so it
  never occupies prime top space. Expands to reveal the tiles.
- **Talks vs Blog:** identical shell; only the card body differs (adaptive).
- **Talk/description is collapsed by default** with a "more" toggle.
- **Animation layers:** scroll-in reveal, cadence scroll-spy, hover enhancement.
  No spine-draw. No `framer-motion`. Filter transitions are CSS-only.
- **Mobile is a first-class constraint** across every element.

## Tag taxonomy

Canonical topics (broad), with the raw `category` variants they absorb.
Casing, ordering, and duplicates all collapse together. `tech` is dropped
entirely as noise (it appears on nearly everything).

| Canonical tag  | Absorbs (raw variants)                          |
| -------------- | ----------------------------------------------- |
| AI/LLM         | `llm`, `ai`, `langchain`                         |
| Java           | `java`, `Java`                                   |
| JavaScript     | `javascript`, `javaScript`, `node`, `angular`, `react` |
| Ruby           | `ruby`                                           |
| Android        | `android`                                        |
| Testing        | `testing`                                        |
| DevOps         | `docker`, `dev-ops`, `aws`, `git`                |
| Architecture   | `architecture`                                   |
| Web            | `cors`, `web`, `css`                             |
| Clojure        | `clojure`, `Clojure`                             |
| Go             | `golang`                                         |
| Tips & Tricks  | `tricks`, `windows`, `mac`, `ubuntu`             |

Notes:

- Node, Angular, React fold into **JavaScript** so single-post subjects do not
  fragment the filter bar. The broad tile shows more, while narrower raw tags can
  still be attached to individual posts.
- Clojure and Go stay standalone even at low counts — they signal range.
- The map is the single source of truth. When a new raw tag appears, add a row.

## Data layer

All computed at build time in `getStaticProps` (no client fetching).

1. **`TAG_MAP`** in `src/lib/api.ts`: raw tag (lowercased, trimmed) → canonical
   topic. Unknown raw tags fall through to `Tips & Tricks` (or are flagged for
   manual mapping).
2. **`tags[]` derivation:** for each post, split `category`, normalize each raw
   value through `TAG_MAP`, dedupe → `tags: string[]`. Original frontmatter is
   left untouched; normalization happens in code.
3. **Tag counts:** `{ tag: count }` across all posts → feeds tile labels.
4. **Year buckets:** group posts by year → feeds both the timeline sections and
   the cadence strip.
5. **Year counts:** `{ year: count }` → cadence strip intensity + hover tooltips.
6. **Talks:** add a `tags: string[]` field to each entry in
   `content/_talks/entries.json`; same derivation of counts and year buckets.

### Content task: normalize existing posts

- Review all 73 posts. Ensure each resolves to at least one sensible canonical
  tag through the map.
- Hand-assign tags to posts that currently have no `category`.
- Where a post's raw category is ambiguous or missing, add an explicit tag.
- Hand-assign tags to all 19 talks.

## Components

- **`TimelineShell`** (new, shared): renders the toggleable topic filter, the
  sticky cadence strip, and the year-sectioned timeline. Accepts a list of
  year-bucketed items, the tag-count map, the year-count map, and a render-prop /
  slot for the card body so Blog and Talks can supply their own card.
- **`TopicFilter`** (new): the toggle button + collapsible tile row. Single-select
  with an `All` reset. Tiles show `Label (count)`. Horizontally scrollable on
  mobile.
- **`CadenceStrip`** (new): per-year cells, intensity by count, sticky, scroll-spy
  active state, click-to-jump, hover tooltip.
- **`YearSection`** (new): a year anchor heading + its grid of cards; target of
  scroll-spy and jump.
- **Blog card** (adapt existing `PostListItem`): compact — title, tags, read-time,
  links to the post.
- **Talk card** (adapt existing `TalkListItem`): richer body — place, a compact
  resource row rendering existing links as labeled icon-chips (deck / code /
  video / blog) reusing the current detection logic, and a **collapsed
  description with a "more" toggle**.
- **Pages** `src/pages/blog.tsx` and `src/pages/talks.tsx`: thin wrappers that
  load data, compute build-time aggregates, and render `TimelineShell` with the
  appropriate card.

## Interaction & animation

Layers included: scroll-in reveal, cadence scroll-spy, hover. All gated behind
`prefers-reduced-motion`. No new dependencies.

1. **Scroll-in reveal:** year sections and their cards fade + rise as they enter
   the viewport, lightly staggered, firing **once** per element via
   `IntersectionObserver`. Must be cheap with ~73 cards; no re-animation on
   scroll-up. Lighter stagger on mobile.
2. **Cadence scroll-spy (signature):** scrolling highlights the active year cell;
   clicking a cell smooth-scrolls to that year. Two-way binding between strip and
   sections. Hover shows `YEAR · N posts`.
3. **Hover:** keep the current subtle lift / shadow / border. Small addition: tag
   chips brighten on card hover. Nothing busy at rest.
4. **Filter transition:** CSS-only — non-matching cards fade out, empty year
   sections collapse.

## Mobile behavior

- **Topic filter:** collapsed behind a toggle by default (same as web). When open,
  tiles are a horizontally scrollable single row with momentum; `All` pinned
  first; tap targets ≥ 44px.
- **Cadence strip:** the single sticky element — compact horizontal dots, tap to
  jump.
- **Cards:** single column, tighter padding; collapsed descriptions matter most
  here.
- **Animations:** lighter, one-shot, reduced-motion aware.

## Phasing

1. **Data foundation** — `TAG_MAP`, `tags[]` derivation, tag/year count
   aggregates for posts; add `tags[]` to talks. Normalize existing post content
   and hand-assign missing tags.
2. **Shared `TimelineShell`** — toggle filter + cadence strip + year sections, on
   the existing glass/gradient tokens.
3. **Blog first** — adaptive blog card wired into the shell.
4. **Talks** — same shell, adaptive talk card with resource chips + collapsible
   description.
5. **Polish** — deep-linkable filters (`/blog?topic=javascript`), empty-year
   handling, scroll-in + scroll-spy tuning, mobile passes.

## Open items to revisit during build

- Exact deep-link/query-param scheme for the active topic.
- Whether the cadence strip shows every year (including zero-post years as ticks)
  or only years with content.
- Final visual weight of the cadence strip intensity scale.
