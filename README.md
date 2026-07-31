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

`bun run build` runs three stages: the normal client build, a second SSR build
of `src/entry-server.tsx`, and `scripts/prerender.mjs`, which renders the app to
HTML and injects it into `dist/index.html`. `main.tsx` hydrates that markup in
production and falls back to `createRoot` in dev, where the shell is empty.

This exists because most AI crawlers — and any search bot that skips the render
queue — don't execute JavaScript, and would otherwise see an empty `#root`.
Two consequences worth remembering when editing:

- **Don't hide content behind state.** The scroll-reveal rule is scoped to
  `.js .reveal` so the prerendered page isn't invisible without scripting, and
  the process tabs keep every track in the DOM rather than only the active one.
- **Don't import images in components.** The SSR build hashes assets
  separately, so component images live in `public/` and are referenced by a
  stable path.

## SEO and AI discoverability

- `src/components/Seo.tsx` emits JSON-LD (`Psychologist`/`LocalBusiness`,
  `Person`, `WebSite`, `FAQPage`) built from `site.ts`, so structured data can
  never drift from the visible copy.
- `public/llms.txt` is a plain-language brief for AI assistants.
- `public/robots.txt` explicitly allows AI crawlers; `public/sitemap.xml`
  lists the single page.
- FAQ answers in `site.ts` are written to be quotable standalone — assistants
  lift them without surrounding context.

## Configuring the practice details

All copy and settings a non-developer might change live in **`src/site.ts`**:

- `whatsappUrl` — Angela's WhatsApp Business chat. Every "Book a session" and
  training-enquiry button reads from this single value. There is no online
  scheduler and no free consultation: booking is a direct conversation.
- `phone`, `email`, `location`, `modes` — contact details
- audiences, therapy process tracks, focus areas, credentials, values
- `trainingStats` / `trainingPathways` — figures transcribed from Angela's CBT
  letter of completion. The awarding body is intentionally not named on the site

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
  components/
    brand/      LogoMark, Wordmark
    three/      CouchScene (Three.js hero)
    ui/         Button, Section, Eyebrow, Reveal, Icon (primitives)
    sections/   Nav, Hero, Marquee, About, Audiences, Process, Focus, Training, Booking, Footer
  hooks/        useScrollHeader
  lib/          whatsapp
  site.ts       all content + configuration
  index.css     Tailwind theme + base + motion
```

Accessibility: keyboard focus rings, a skip link, reduced-motion support
(animations and the 3D scene degrade gracefully), and a no-WebGL fallback for
the hero.
