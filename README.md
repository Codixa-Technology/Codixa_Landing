# Codixa Technologies — codixa.space

The official website of Codixa Technologies: a statically generated, trilingual
(EN / HY / RU) Next.js site built on the Codixa Brand Identity Guidelines v1.0.

## Stack

- **Next.js 16** (App Router), fully static. Every page is pre-rendered at build time.
- **React 19**, **TypeScript** (strict), **CSS Modules** plus global design tokens. No UI framework.
- **Fonts:** Manrope, JetBrains Mono and Noto Sans Armenian, self-hosted through `next/font`.
- **EmailJS** for the contact form. It is loaded only when the form is submitted.
- **Runtime dependencies:** `next`, `react`, `react-dom`, `@emailjs/browser`.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (47 static pages)
npm start            # serve the production build
npm run typecheck && npm run lint
```

## Structure

```
src/
  app/
    [locale]/            all pages, one root layout per locale (html lang)
      page.tsx           homepage
      services/          overview + [slug] service pages
      about/ contact/ privacy/ work/
      [...rest]/         localized 404 for unknown paths
      not-found.tsx      localized 404 view
    global-not-found.tsx 404 for URLs outside any locale
    sitemap.ts robots.ts manifest.ts fonts.ts
  content/
    types.ts             the content contract (TypeScript enforces complete translations)
    en/ hy/ ru/          all copy: common, home, services, pages
  i18n/                  locale config, content loader, params helper
  lib/                   site facts, SEO metadata, JSON-LD, routes, services, EmailJS
  components/
    layout/              Header, LanguageSwitcher, Footer, RevealObserver, head script
    sections/            page sections (home/, service/, shared blocks)
    ui/                  Button, Icon, Logo, SectionHeading
    visuals/             CodePanel (hero), ServiceVisual (schematic SVGs)
    contact/             ContactForm
  styles/                tokens.css (brand palette and scales), globals.css
public/brand/            official wordmark, mark, OG images
scripts/                 QA and asset-generation scripts
email-templates/         EmailJS templates (notification + auto-reply)
```

## Editing content

All user-facing text lives in `src/content/{en,hy,ru}`. Each locale exports one
`SiteContent` object, so a missing translation is a TypeScript error. Edit all
three languages together. After publishing content changes, update
`CONTENT_UPDATED` in `src/lib/routes.ts`; it feeds the sitemap and the privacy page.

Verified company facts (email, location, founding year, social profiles) live in
`src/lib/site.ts`. Add social profiles to `site.socials` only with real URLs.
They appear automatically in the footer and in the Organization schema (`sameAs`).

### Adding portfolio projects

The `/work` section is built but stays hidden until it has content. With no
projects it returns a 404 and is excluded from navigation and the sitemap.
To publish a case study:

1. Put real, client-approved screenshots in `public/images/work/<slug>/`.
2. Add a `ProjectContent` entry to `work.projects` in **all three** `pages.ts` files.
   Use the same `slug` in each.
3. Build. The Work link, `/work`, `/work/<slug>` and the sitemap entries appear automatically.

Only add verified work and verified results.

## Internationalization

- URLs: `/en/...`, `/hy/...`, `/ru/...`. Slugs are identical across languages, so
  the language switcher always keeps the reader on the equivalent page.
- `/` permanently redirects (308) to `/en`, the x-default language. Language is
  never auto-redirected based on the browser.
- Every page outputs a canonical URL, `hreflang` for en/hy/ru plus x-default, and
  localized Open Graph tags and images (`public/brand/og-{locale}.png`).

## SEO

- `sitemap.xml`: every locale URL with `xhtml:link` alternates. `robots.txt`
  references it. (The previous `robotos.txt` typo meant production had no robots.txt.)
- JSON-LD: Organization, WebSite, WebPage / AboutPage / ContactPage /
  CollectionPage, Service and BreadcrumbList. No ratings or reviews.
- Redirects in `next.config.ts`: `/` → `/en`, and locale-less paths
  (`/services`, `/about`, `/contact`, `/privacy`, `/services/:slug`) → `/en/...`.

## Brand reveal and motion

On the first page load of a session, the header wordmark is revealed by a wipe
while the orange Cut sweeps across it. It never covers the page, plays once per
session, and is skipped for `prefers-reduced-motion` and when JavaScript is off.
Section reveals use one IntersectionObserver. All animations use
transform/opacity only.

## Quality checks

Run against a production server (`npm run build && npm start`):

```bash
BASE_URL=http://localhost:3000 npm run qa:seo           # metadata, canonical, hreflang, sitemap, robots, JSON-LD, links, redirects, 404s
BASE_URL=http://localhost:3000 npm run qa:a11y          # axe-core WCAG 2.2 A/AA on every page, desktop + mobile
BASE_URL=http://localhost:3000 npm run qa:interactions  # menu, keyboard, language switch, FAQ, form, reveal, reduced motion, no-JS
BASE_URL=http://localhost:3000 npm run qa:visual        # screenshots at 375/820/1440 + overflow and console checks (.qa/visual)
node scripts/generate-brand-assets.mjs                  # regenerate icons and OG images
```

## Deployment (Vercel)

- `vercel.json` sets the framework to `nextjs`, because the project was
  previously deployed as a Vite app.
- **Environment variables:** the EmailJS variables already set on Vercel under
  `VITE_EMAILJS_*` keep working. `next.config.ts` maps them, and
  `NEXT_PUBLIC_EMAILJS_*` names also work. `NEXT_PUBLIC_SITE_URL` is optional and
  defaults to `https://codixa.space`.
- Without EmailJS credentials the form shows an honest "write to us by email"
  message. It never fakes a successful send.
- After deploying: submit `https://codixa.space/sitemap.xml` in Google Search
  Console and inspect `/en`, `/hy` and `/ru` with the URL Inspection tool.
