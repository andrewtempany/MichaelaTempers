# Michaela Tempers — Artist Website

## Project Overview

A 4-page static promotional website for Michaela Tempers, a New Zealand folk-roots musician. Plain HTML, CSS, and vanilla JavaScript — no frameworks, no build tools. Deploys to GitHub Pages.

**Pages:** `index.html` (landing/bio), `shows.html` (tour dates from Google Sheets CSV), `press-kit.html` (festival pitch/press materials), `merch.html` (merchandise listings)

**Design direction:** Bold, editorial, expressive. Folk-inspired warmth — not generic AI output. Think album liner notes, gig posters, indie record label aesthetics. The site should feel like it was designed by someone who goes to house concerts and letterpress prints their own zines.

## Stack

- Plain HTML, CSS, vanilla JS
- Self-hosted fonts: Damona (headings), Montserrat Thin (body)
- Color palette: terracotta / teal / cream
- SVG placeholders until real photography is ready
- Mobile-responsive with hamburger nav (`js/nav.js`)
- Google Sheets CSV integration for live show listings
- Target: GitHub Pages with optional custom domain

## Design Tool Workflow

Three tools are in play: **Impeccable** (design quality guardian), **Google Stitch** (high-fidelity screen generation), and **21st.dev Magic** (component inspiration). They are not interchangeable — each has a distinct role and a specific point in the process where it belongs. Follow the stages below in order.

---

### Prerequisites — Do This Once

Before any design work begins on a fresh checkout:

1. Confirm `.impeccable.md` exists in the project root. If not, run `/impeccable` and teach it the project context:
   - **Audience:** Music fans, festival bookers, venue promoters, press/media in NZ and Australia
   - **Brand personality:** Warm, grounded, handcrafted, intimate, confident but not flashy
   - **Anti-vibes:** Corporate, tech-startup, SaaS dashboard, generic template, AI slop
   - **References:** Album liner notes, indie record label sites, letterpress poster aesthetics, folk festival programs
2. Read `css/styles.css` to confirm the current custom property names before writing any new CSS.
3. Run `/audit` across all four pages to establish a baseline. Note any existing issues before touching anything.

---

### Stage 1 — Diagnose (Impeccable)

**When:** Before starting any new page, feature, or significant change.  
**Tool:** Impeccable  
**Goal:** Understand the current state. Never design blind.

- Run `/critique` on the page or section in scope. Read the heuristic scores — note where it falls short on visual hierarchy, emotional resonance, or cognitive load.
- Run `/audit [page]` to surface anti-patterns (gradient text, purple drift, nested cards, low contrast, broken font fallbacks).
- Write down the 2–3 most important problems to solve before moving forward. These become the success criteria for this work session.

---

### Stage 2 — Define (Impeccable / Shape)

**When:** After diagnosis, before any visual exploration.  
**Tool:** Impeccable (`/shape`) or manual planning  
**Goal:** Agree on what the page/section needs to *do* — not how it looks yet.

- Run `/shape` to run a structured UX discovery pass. Answer its questions about purpose, audience, and content hierarchy.
- Output of this stage: a one-paragraph brief describing the page's job, the visitor's goal, and the 3–5 content blocks in priority order.
- Do not open Stitch or write code until this brief exists.

---

### Stage 3 — Explore Layouts (Google Stitch)

**When:** Brief is written. Ready to explore visual directions.  
**Tool:** Google Stitch (`mcp__stitch__generate_screen_from_text`)  
**Goal:** Generate 2–3 distinct layout directions as high-fidelity visual references.

**How to prompt Stitch for this project:**

Always include all of the following in every Stitch prompt:
- Palette: `terracotta #C4654A, teal #2A7B6F, cream #F5F0E8`
- Font direction: `heavy serif display headings, thin sans-serif body`
- Mood: `folk music, handcrafted, editorial, warm — like an indie record label site or album gatefold`
- The page's purpose and specific content blocks (from Stage 2 brief)
- Explicit constraints from the Design Rules section: no cards-in-cards, no shadows, no gradients

Generate 2–3 variants with meaningfully different compositional approaches (e.g. full-bleed hero vs. split layout vs. typographic-only). Use `mcp__stitch__generate_variants` if exploring a single component.

**What to extract from Stitch output:**
- Retrieve the screen image with `mcp__stitch__get_screen` to use as a visual reference
- Retrieve the code with `mcp__stitch__get_screen` to study layout structure and spacing rhythm
- **Do not copy Stitch HTML/CSS directly.** It will not use the project's custom properties, class conventions, or semantic structure. Treat it as a sketch, not source code.
- Decide on one direction to carry forward. Note specifically what spacing, proportion, and compositional choices you are borrowing.

**Example prompts:**

- *Homepage hero:* "Folk musician landing page. Cream #F5F0E8 background. Full-width hero: artist name 'Michaela Tempers' in a very large heavy serif, a two-line tagline below in thin sans-serif. Below hero: short bio paragraph max 60 chars wide, then streaming links as minimal outlined pills. No images yet — design around a solid terracotta #C4654A block as photo placeholder. Mood: gatefold album sleeve, intimate and editorial."
- *Shows page:* "Tour dates listing for a folk musician. Cream background. Each show is a horizontal rule row: large serif date left, venue and city center, small teal ticket link right. Terracotta #C4654A hairline dividers. No cards. No shadows. No gradients. Desktop and mobile views."
- *Music player:* "A persistent fixed music player bar at the bottom of the viewport. Cream background, terracotta progress bar, teal icon accents. Shows: track title in serif, play/pause button, scrubber, volume. Minimal and handcrafted — not a streaming app widget."

---

### Stage 4 — Detail Components (21st.dev Magic)

**When:** Layout direction chosen from Stitch. Need to work out a specific interactive element.  
**Tool:** 21st.dev Magic (`mcp__magic__21st_magic_component_builder`)  
**Goal:** Find interaction patterns and micro-detail inspiration for individual components.

Use Magic selectively — only when a component has non-trivial interaction (hover states, transitions, custom controls) that is hard to imagine without seeing it. Do not use Magic for full-page layouts (that's Stitch's job).

**Appropriate use cases for this project:**
- Music player controls (play/pause state, progress scrubber, track transitions)
- Hamburger nav animation and slide-in menu
- Streaming platform pill buttons with hover states
- Merch item hover/focus treatment
- Tour date row hover highlight

**How to use Magic:**
1. Use `mcp__magic__21st_magic_component_builder` with a focused, single-component prompt
2. Use `mcp__magic__21st_magic_component_inspiration` to browse existing patterns first — often faster than generating
3. Review the visual output. Note the CSS transition values, hover state color shifts, timing functions
4. **Translate to vanilla HTML/CSS/JS.** Magic outputs React. Do not use it directly. Extract:
   - The CSS property values (easing curves, durations, transform values)
   - The hover/focus state logic
   - The visual proportion and sizing
5. Rewrite from scratch using the project's class conventions and custom properties

**Example Magic prompts:**
- "A minimal fixed music player bar: play/pause toggle button, track title, scrubber progress bar, volume slider. Cream background, warm terracotta accent on active/progress states. Subtle ease-out transitions, no bouncing."
- "A hamburger menu icon that morphs to an X on click, with a smooth slide-in side panel. Clean, no glassmorphism, cream panel, teal active state on links."
- "A merchandise product card: no border-radius, no shadow, flat editorial layout. Image block on top, product name in serif below, price in small sans-serif, add-to-cart link as plain underline text."

---

### Stage 5 — Build (Code)

**When:** Layout direction and component patterns are defined.  
**Tool:** Code editor  
**Goal:** Implement in clean semantic HTML + CSS + vanilla JS.

Rules:
- Write semantic HTML first (`<main>`, `<section>`, `<article>`, `<nav>`, etc.) before touching CSS
- Use only CSS custom properties from `css/styles.css` — no hardcoded colors or fonts
- Keep selectors flat. No nesting beyond two levels
- Every interactive element gets `aria-*` attributes and keyboard support at build time — not as an afterthought
- Add JSON-LD structured data for any new page or feature that warrants it (see SEO section)
- Mobile styles first, then layer in desktop with `min-width` breakpoints

---

### Stage 6 — Quality Gate (Impeccable)

**When:** Build is complete. Before committing.  
**Tool:** Impeccable  
**Goal:** Catch problems before they ship.

Run these in order — each targets a different quality dimension:

1. `/audit [page]` — Anti-pattern scan. Fix anything flagged P0 or P1 before proceeding.
2. `/typeset` — Typography review. Critical given the custom fonts. Check size, weight, leading, measure.
3. `/polish [page]` — Final alignment, spacing, and micro-detail pass.
4. If the result still feels too safe or bland: run `/bolder` to push the expressiveness.
5. If the result feels cluttered or overworked: run `/distill` to strip back to essentials.
6. Run `/normalize` if changes touched multiple pages — catches cross-page inconsistency.

Do not commit until `/audit` returns no P0 issues and `/polish` has run.

---

### Stage 7 — Ship Check

**When:** All Impeccable passes are clean.  
**Goal:** Final non-design checks before commit.

- [ ] Keyboard-only navigation test on every new interactive element
- [ ] Check color contrast ratios for any new color pairings (WCAG AA minimum)
- [ ] Verify `prefers-reduced-motion` suppresses any new animations
- [ ] Confirm all new images have descriptive `alt` text
- [ ] Confirm `<title>` and `<meta name="description">` are updated if page content changed
- [ ] Test on mobile viewport (375px) and confirm nothing breaks
- [ ] If shows page was touched, verify Google Sheets CSV integration still loads correctly

---

### Quick Reference: Which Tool for What

| Situation | Tool | Stage |
|---|---|---|
| Starting fresh on a page | Impeccable `/critique` + `/audit` | 1 — Diagnose |
| Deciding what a page needs | Impeccable `/shape` | 2 — Define |
| Exploring full-page layout options | Google Stitch | 3 — Explore |
| Designing a specific interactive component | 21st.dev Magic | 4 — Detail |
| Writing the actual code | Code editor | 5 — Build |
| Catching design drift or anti-patterns | Impeccable `/audit` | 6 — Quality Gate |
| Final typography review | Impeccable `/typeset` | 6 — Quality Gate |
| Pre-commit cleanup pass | Impeccable `/polish` | 6 — Quality Gate |
| Pushing a bland design to be bolder | Impeccable `/bolder` | 6 — Quality Gate |
| Simplifying an overworked design | Impeccable `/distill` | 6 — Quality Gate |
| Cross-page consistency check | Impeccable `/normalize` | 6 — Quality Gate |

---

### Abbreviated Workflow — Small Changes

For single-section tweaks, copy fixes, or minor feature additions (not full pages):

1. **Diagnose** — `/audit` the affected page. Note current issues.
2. **Build** — Make the change.
3. **Gate** — `/audit` again, then `/polish`. Fix anything new that appeared.
4. **Ship check** — Run the Ship Check list above, scoped to what changed.

Skip Stitch and Magic for changes that don't involve new layout or interaction patterns.

---

### Tool Reference

**Impeccable commands used in this project:**
- `/audit [page]` — Anti-pattern scan with severity ratings
- `/critique` — Full heuristic design review with scoring
- `/shape` — Structured UX discovery interview → design brief
- `/polish [page]` — Final micro-detail cleanup pass
- `/typeset` — Typography audit and improvement
- `/bolder` — Push design expressiveness when it's too safe
- `/distill` — Remove unnecessary complexity
- `/normalize` — Enforce consistency across pages

**Stitch tools used in this project:**
- `mcp__stitch__generate_screen_from_text` — Generate a new screen from a text prompt
- `mcp__stitch__generate_variants` — Generate multiple variants of a screen
- `mcp__stitch__get_screen` — Retrieve screen image and/or code
- `mcp__stitch__edit_screens` — Iterate on an existing Stitch screen
- `mcp__stitch__list_screens` — Review previously generated screens

**Magic tools used in this project:**
- `mcp__magic__21st_magic_component_builder` — Generate a component from a text prompt
- `mcp__magic__21st_magic_component_inspiration` — Browse existing component patterns
- `mcp__magic__21st_magic_component_refiner` — Iterate on a generated component

## Design Rules (Non-Negotiable)

These apply to all design tool output AND manual code:

- **No gradients on text.** Ever.
- **No purple.** The palette is terracotta, teal, and cream. Stick to it.
- **No cards-in-cards.** Keep the layout flat and editorial.
- **No drop shadows or glows.** Use whitespace and typography for hierarchy.
- **No Inter, no system font stack as primary.** Damona for headings, Montserrat Thin for body. Fall back to Georgia/sans-serif.
- **No bounce/elastic easing.** Use subtle, grounded transitions (`ease-out`, `ease-in-out`). This is folk music, not a tech product.
- **No glassmorphism, no blur effects.** Keep it tactile and print-inspired.
- **Minimum body text size: 18px.** Thin fonts need room to breathe.
- **Touch targets: minimum 44px.** Especially streaming links and nav items.
- **Line length: max 70 characters** for body text readability.

## CSS Architecture

All design tokens live in `css/style.css` (note: singular, not `styles.css`). Always use custom properties — never hardcode colors, fonts, or spacing values.

### Colors — Fixed, Do Not Change

These are the canonical variable names. The CLAUDE.md previously used aliases like `--color-terracotta` — those do not exist. Use only the names below.

| Variable | Value | Role |
|---|---|---|
| `--color-primary` | `#C75B4F` | Terracotta/rust — main accent, CTAs, active states |
| `--color-secondary` | `#2D5A5A` | Deep teal — secondary accent, footer background |
| `--color-accent` | `#D4A574` | Soft gold — blockquote borders, focus rings |
| `--color-background` | `#FAF7F2` | Cream — page background |
| `--color-text` | `#2C2C2C` | Charcoal — primary body text |
| `--color-text-light` | `#5A5A5A` | Mid-gray — secondary text, captions, meta |
| `--color-border` | `#E5DFD6` | Warm light gray — dividers, borders |
| `--color-white` | `#FFFFFF` | White — nav background, card backgrounds |

### Typography

| Variable | Current Value | Fixed? | Notes |
|---|---|---|---|
| `--font-heading` | `'Damona', 'Georgia', 'Times New Roman', serif` | **Fixed** | All h1–h6. Damona is the brand typeface and will not change. |
| `--font-body` | `'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | Mutable | Body text, buttons |

**Active issue:** Body `font-weight` is set to `100` (Montserrat Thin) globally. `strong` overrides to `400`. Do not change without testing both font files load correctly.

**Active issue:** Base `font-size` on `<html>` is `16px`, but the design rule specifies a minimum of `18px` for body text. This is a known inconsistency to resolve.

### Spacing Scale — Mutable During Development

| Variable | Value | Usage |
|---|---|---|
| `--spacing-xs` | `0.5rem` / 8px | Tight gaps, icon padding |
| `--spacing-sm` | `1rem` / 16px | Button padding, small gaps |
| `--spacing-md` | `1.5rem` / 24px | Default paragraph margin, container padding |
| `--spacing-lg` | `2rem` / 32px | Section internal gaps, nav spacing |
| `--spacing-xl` | `3rem` / 48px | Section top/bottom padding |
| `--spacing-xxl` | `4rem` / 64px | Hero padding, footer margin |

### Layout — Mutable During Development

| Variable | Current Value | Notes |
|---|---|---|
| `--max-width` | `900px` | `.container` max-width; also used by `.nav-container` and `.shows-grid` |
| `--nav-height` | `70px` | Used for sticky nav height and mobile menu offset |

### Border Radius — Mutable During Development

| Variable | Value | Current usage |
|---|---|---|
| `--radius-sm` | `4px` | Minor rounding |
| `--radius-md` | `8px` | Buttons, cards, quote blocks |
| `--radius-lg` | `12px` | Hero images, merch items, EP card |

**Design tension:** The editorial/print-inspired direction leans toward sharper corners. Consider reducing or removing these during a `/distill` or `/polish` pass. Merch cards in particular should have `border-radius: 0` per the design rules.

### Shadows — Mutable During Development

| Variable | Value | Current usage |
|---|---|---|
| `--shadow-sm` | `0 2px 4px rgba(0,0,0,0.1)` | Nav bar, show cards, press links |
| `--shadow-md` | `0 4px 8px rgba(0,0,0,0.12)` | Button hover, EP card, download links, photo items |
| `--shadow-lg` | `0 8px 16px rgba(0,0,0,0.15)` | Mobile nav drawer, merch hover, profile image |

**Active issue:** The Design Rules prohibit drop shadows. Shadows are currently used throughout the codebase. These should be removed and replaced with whitespace, borders, or background-color contrast during future `/polish` or `/audit` passes.

### Transitions — Mutable During Development

| Variable | Value | Usage |
|---|---|---|
| `--transition-fast` | `0.2s ease` | Links, buttons, nav links, interactive elements |
| `--transition-normal` | `0.3s ease` | Mobile nav slide-in |

### Known Design Rule Violations in Current CSS

These exist in `css/style.css` and should be fixed during the next design pass:

1. **`.hero` uses `linear-gradient()`** — violates "no gradients" rule. Replace with a solid color or a texture/photo background.
2. **Shadows used everywhere** — violates "no drop shadows or glows" rule. Remove `box-shadow` from `.show-card`, `.ep-card`, `.merch-item`, `.profile-image img`, `.photo-item img`, and nav.
3. **`font-size: 16px` base** — body text falls below the 18px minimum. Bump `html { font-size }` to at least `18px` or override body size directly.
4. **`.merch-item`, `.ep-card`, `.show-card` have `border-radius: var(--radius-lg)`** — violates the "no rounded corners on merch cards" editorial direction.
5. **Button hover states use `transform: translateY(-2px)`** — borderline; acceptable if kept subtle, but worth reviewing in a `/polish` pass.

### CSS Conventions

- Selectors stay flat — no nesting beyond two levels
- No BEM unless already established in the file
- Mobile styles first; desktop overrides with `@media (min-width: 768px)`
- Mobile breakpoint: `767px` max / `768px` min (used consistently throughout)
- All new properties must use tokens from the list above — no hardcoded values

## File Structure

```
/
├── index.html
├── shows.html
├── press-kit.html
├── merch.html
├── css/
│   └── styles.css
├── js/
│   └── nav.js
├── fonts/
│   ├── Damona-[weights].*
│   └── Montserrat-Thin.*
├── img/
│   └── (SVG placeholders, eventually real photos)
├── .impeccable.md          ← design context (generated by /impeccable teach)
└── CLAUDE.md               ← this file
```

## Working With Photography Placeholders

The site currently uses SVG placeholders. When generating designs in Stitch or referencing components from Magic, always design WITH placeholder awareness:

- Use aspect ratios that will work for both placeholders and eventual real photos
- Design layouts that look intentional with solid-color blocks (not broken without images)
- Add `alt` text to all image elements describing what the final photo should be

## Accessibility

- Semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- Skip-to-content link
- Sufficient color contrast (especially cream backgrounds with teal/terracotta text — verify ratios)
- Keyboard-navigable hamburger menu
- `prefers-reduced-motion` media query for any transitions
- Proper heading hierarchy (h1 → h2 → h3, no skips)

## Creative Features

This site should feel alive and exciting for visitors — not just a static brochure. Prioritize creative, memorable experiences that reflect Michaela's artistry.

**Music Player**
- Embed a persistent music player (bottom of viewport, fixed) for Michaela's tracks
- Source audio from Bandcamp embed, SoundCloud, or self-hosted audio files in `/audio/`
- Player should feel handcrafted — custom styled, not a default browser control
- Include: play/pause, track title, progress bar, volume. Keep it minimal and elegant
- Player should not autoplay — respect user intent
- Keyboard accessible (spacebar to play/pause, arrow keys for seek)
- Respect `prefers-reduced-motion` for any player animations

**Other Creative Feature Ideas (implement where appropriate)**
- Animated hero section — subtle parallax or text reveal on load that feels editorial, not gimmicky
- Tour date countdown — show a live countdown to the next upcoming show
- Lyric snippets or pull quotes styled as handwritten/typeset callouts between sections
- Newsletter signup with personality — copy that sounds like Michaela, not MailChimp
- "Now Playing" ambient mood: soft background texture shift tied to the music player state
- Easter eggs for engaged visitors (e.g., a hidden track, a message in the page source)

**Creative direction:** Surprise and delight without noise. Each feature should feel intentional, like something a thoughtful musician would actually put on their own site — not a feature checklist.

## SEO

Apply these SEO improvements consistently across all pages:

- Descriptive `<title>` tags per page: e.g. `Michaela Tempers — Folk Roots Music from New Zealand`
- `<meta name="description">` with 150–160 character summaries unique to each page
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) for social sharing
- Twitter Card meta tags
- Canonical `<link rel="canonical">` on each page
- Structured data (JSON-LD) where appropriate:
  - `Person` or `MusicGroup` schema on the homepage
  - `Event` schema on the shows page for each tour date
  - `Product` schema on the merch page
- Descriptive, keyword-rich `alt` text on all images (including SVG placeholders)
- Semantic landmark roles (`<main>`, `<nav>`, `<footer>`, `aria-label` on sections)
- Page load performance: lazy-load images below the fold, defer non-critical JS
- Sitemap (`sitemap.xml`) and `robots.txt` at the project root

## Accessibility (Extended)

Beyond the basics above:

- `aria-label` or `aria-labelledby` on all interactive regions and landmark elements
- Focus-visible styles that are clearly visible (not just the browser default outline)
- `aria-live` region for music player track changes
- Color contrast: verify all text/background combinations meet WCAG AA (4.5:1 for normal text, 3:1 for large)
- All custom interactive elements (player controls, hamburger) must have explicit `role` and `aria-*` attributes
- `lang` attribute on `<html>` set to `en-NZ`
- Avoid `title` attributes as tooltips — use visible labels or `aria-label` instead
- Test with keyboard-only navigation on every page before shipping
