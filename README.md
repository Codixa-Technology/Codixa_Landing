# Codixa — React rebuild

A pixel-faithful React/TypeScript/Vite rebuild of the **Codixa — Modern Portfolio &
Creative Agency** Framer template.

Every measurement (paddings, gaps, max-widths, radii, shadows), every type preset
and every animation curve is ported from the published Framer site rather than
approximated, so the two renders line up at all three breakpoints.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle in dist/
npm run preview  # serve the production bundle
```

---

## Project structure

```
public/assets/
  fonts/          Cal Sans + Inter + Inter Display (self-hosted woff2)
  images/         every image and SVG used by the page
  video/          the looping clip behind the statistics card

src/
  content/        <- all copy, links, images and lists (edit here first)
  styles/         design tokens, typography presets, global reset
  lib/            motion presets and shared hooks
  components/
    primitives/   reusable building blocks
    layout/       Header, Footer
    sections/     one folder per page section
  App.tsx         section order
```

### Editing content

Nothing user-facing is hard-coded inside a component. Each file in `src/content`
owns one area:

| File              | Controls                                                   |
| ----------------- | ---------------------------------------------------------- |
| `site.ts`         | brand name, logo, e-mail, nav items, header CTA, copyright  |
| `hero.ts`         | hero headline tokens, avatars, paragraph, CTA, logo strip   |
| `tickers.ts`      | the two rotated marquee ribbons                             |
| `about.ts`        | scroll-reveal statement and capability chips                |
| `testimonials.ts` | statistics counters and testimonial slides                  |
| `works.ts`        | case-study cards                                            |
| `services.ts`     | service tabs (label, copy, image, tags)                     |
| `founder.ts`      | bio, portrait, socials, career timeline                     |
| `awards.ts`       | award rows                                                  |
| `pricing.ts`      | plans, prices, feature lists, CTAs                          |
| `faq.ts`          | accordion columns and the default-open item                 |
| `contact.ts`      | headline, form fields, e-mail marquee                       |
| `footer.ts`       | footer link columns and artwork                             |

Adding a testimonial, plan, award or FAQ entry is a single array item — the
layout, animation and stagger follow automatically.

### Editing design

`src/styles/tokens.css` holds every colour, radius, shadow, spacing and easing
value as a custom property. `src/styles/typography.css` holds the text presets
(`.t-display1`, `.t-h2`, `.t-body`, …) with their breakpoint overrides. Component
CSS Modules reference tokens only — no raw hex values.

---

## Breakpoints

The three Framer breakpoints are reproduced exactly:

| Range          | Framer variant | Notes                                    |
| -------------- | -------------- | ---------------------------------------- |
| >= 1440px      | Desktop        | 156px shell padding, 1128px content grid |
| 810px – 1439px | Tablet         | 40/30px padding, stacked feature blocks  |
| <= 809px       | Mobile         | 20px padding, fixed header + burger menu |

---

## Motion

`src/lib/motion.ts` contains the ported transitions — the spring constants
(`stiffness`, `damping`, `mass`) and bezier curves are the exact numbers Framer
emits, e.g.:

- header bar — `spring(200, 60)` after 0.6s
- hero banner — `tween(1s, 0.2s, cubic-bezier(.09,.89,.36,.96))` from
  `rotateX(35deg) scale(.8)` with a 3962px perspective
- section reveals — `spring(66, 20)` / `spring(320, 60)` / `spring(200, 40)`
- split text — 10px rise plus 10px blur, 0.05s per character

Everything honours `prefers-reduced-motion` through a single
`<MotionConfig reducedMotion="user">` at the app root; the CSS marquees opt out
separately.

---

## Tooling

`tools/` contains the scripts used to verify fidelity against the original:

```bash
node tools/screenshot.mjs <url> <outDir> <prefix> <widths>   # full-page captures
node tools/shot-at.mjs   <url> <out.png> <scrollY> [w] [h]   # viewport capture
node tools/crop.mjs      <in.png> <out.png> <top> <height>   # slice a capture
node tools/measure.mjs   <url> "<selector>" [width]          # box metrics
node tools/probe.mjs     <url> "<selector>" "<props>"        # computed styles
node tools/dump-dom.mjs  <url> <out.html>                    # hydrated markup
```
