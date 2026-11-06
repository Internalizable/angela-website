# Angela Barhouch — Psychotherapy practice

A warm, playful single-page site for Angela Barhouch, a licensed clinical
psychologist (CBT & DBT) in Beirut. Built with React 19, Vite, Tailwind CSS v4,
and a Three.js hero scene.

## Stack

- **React 19 + TypeScript** — component architecture under `src/components`
- **Tailwind CSS v4** — CSS-first theme (brand tokens) in `src/index.css`
- **Three.js** — the floating clay-couch hero in `src/components/three/CouchScene.tsx`
- **WhatsApp Business** — every booking CTA opens Angela's chat, wrapped in `src/lib/whatsapp.ts`

## Develop

```bash
bun install
bun run dev      # http://localhost:5173
bun run build    # type-check, client build, SSR build, prerender
bun run lint
```

## Prerendering

`bun run build` runs four stages: the client build, a second SSR build of
`src/entry-server.tsx`, `scripts/prerender.mjs`, which writes one HTML file per
page into `dist/`, and `scripts/check-seo.mjs`, which fails the build on missing
metadata, broken internal links, invalid JSON-LD or a page without exactly one
H1. `main.tsx` hydrates the markup in production and falls back to `createRoot`
in dev, where the shell is empty.

This exists because most AI crawlers — and any search bot that skips the render
queue — don't execute JavaScript, and would otherwise see an empty `#root`.
Things worth remembering when editing:

- **Don't hide content behind state.** The scroll-reveal rule is scoped to
  `.js .reveal` so the prerendered page isn't invisible without scripting, and
  the process tabs keep every track in the DOM rather than only the active one.
- **Don't import images in components.** The SSR build hashes assets
  separately, so component images live in `public/` and are referenced by a
  stable path.
- **`vite preview` isn't a faithful test.** It serves the homepage for
  extensionless URLs like `/about`, which shows up as a false hydration error.
  Production routing lives in `vercel.json`. Check a deployment with
  `SITE_URL=<deployment url> bun run post-deploy --check`.

## SEO and AI discoverability

Assistants split one question into several searches and cite the page that
answers each part, so every service, condition and audience has its own URL.

- **Adding or changing a page:** landing pages are entries in
  `src/content/topics.ts`, rendered by `src/pages/TopicPage.tsx`. Slugs live in
  `paths` in `site.ts`. Read the rules at the top of `topics.ts` first: this is
  health content under Angela's name, so nothing about her practice may be added
  without her confirmation, and claims about conditions need a source.
- **Clinical review:** set `site.clinicalReviewDate` once Angela has reviewed the
  pages. Until then the site makes no "clinically reviewed" claim anywhere.
- **Freshness:** update `site.contentUpdated` when copy really changes. It drives
  sitemap `lastmod`, `dateModified` and the visible "last updated" line.
- **Structured data:** `src/seo/schema.ts` builds JSON-LD from `site.ts` and the
  content files, and it's written into each page's head at build time. Use only
  real schema.org types and properties; `Psychologist` isn't one.
- **Generated files:** `sitemap.xml` and `llms.txt` are built from the page list
  by `src/seo/pages.ts`. Don't add them to `public/`.
- **Arabic:** `/ar` is one complete right-to-left page, with copy in
  `src/content/arabic.ts` and its own fonts. Letter-spacing is forced to zero
  there because it breaks Arabic's joined letters.
- **After every production deploy:** run `bun run post-deploy`. It checks that
  every page answers 200 with its own canonical and that unknown URLs answer 404,
  then notifies IndexNow, which feeds Bing.
- `public/robots.txt` explicitly allows AI crawlers. Blocking `OAI-SearchBot`
  would remove the site from ChatGPT search answers.

## Configuring the practice details

All copy and settings a non-developer might change live in **`src/site.ts`**:

- `whatsappUrl` — Angela's WhatsApp Business chat. Every "Book a session" and
  training-enquiry button reads from this single value. There is no online
  scheduler and no free consultation: booking is a direct conversation.
- `phone`, `email`, `location`, `modes` — contact details
- `licence` — Ministry of Public Health number and Order of Psychologists links
- audiences, therapy process tracks, focus areas, credentials, values
- `trainingCertifications` — the CBT trainings and certifications Angela has
  completed. The awarding body is intentionally not named on the site

## Portrait assets

`src/assets/angela-cutout.webp` (About section) and `angela-avatar.webp`
(booking card) are derived from `angela_barhouch.png` in the repo root, which is
a studio shot on a white backdrop. The background was keyed out by flood-filling
from the borders on a min-channel threshold — a plain threshold would have
punched holes in her near-white t-shirt — then un-premultiplying the white matte
so hair edges don't fringe. The source carries Gemini's sparkle watermark in an
empty corner well clear of her; the crop to her silhouette excludes it.

## Brand

The palette and type are derived from the primary logo (`assets/`): sage and
forest greens with warm honey / sky / blush accents, set in **Fraunces**
(display) and **Mulish** (body). The mark — two overlapping speech bubbles that
read as a couch — is recreated as a themeable SVG in
`src/components/brand/LogoMark.tsx` and as the favicon in `public/favicon.svg`.

## Structure

```
src/
  pages/        HomePage, AboutPage, TopicPage, ArabicPage, NotFoundPage
  content/      topics (landing pages), arabic (/ar copy)
  seo/          schema (JSON-LD), pages (per-page head, sitemap, llms.txt)
  components/
    brand/      LogoMark, Wordmark
    layout/     SiteLayout
    three/      CouchScene (Three.js hero)
    ui/         Button, Section, Eyebrow, Reveal, Icon, BookingBand, CrisisNote
    sections/   Nav, Hero, Marquee, AtAGlance, About, Audiences, Process, Focus, Training, Faq, Booking, Footer
  hooks/        useScrollHeader
  lib/          whatsapp
  routes.ts     path to page chunk, loaded before hydration
  site.ts       facts, paths and homepage content
  index.css     Tailwind theme + base + motion
scripts/        prerender, check-seo (build), post-deploy (after deploying)
```

Accessibility: keyboard focus rings, a skip link, reduced-motion support
(animations and the 3D scene degrade gracefully), and a no-WebGL fallback for
the hero.
