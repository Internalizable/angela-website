# Angela Barhouch — Psychotherapy practice

A warm, playful single-page site for Angela Barhouch, a licensed clinical
psychologist (CBT & DBT) in Beirut. Built with React 19, Vite, Tailwind CSS v4,
and a Three.js hero scene.

## Stack

- **React 19 + TypeScript** — component architecture under `src/components`
- **Tailwind CSS v4** — CSS-first theme (brand tokens) in `src/index.css`
- **Three.js** — the floating clay-couch hero in `src/components/three/CouchScene.tsx`
- **Calendly** — inline embed + popup booking, wrapped in `src/lib/calendly.ts`

## Develop

```bash
bun install
bun run dev      # http://localhost:5173
bun run build    # type-check + production build
bun run lint
```

## Configuring the practice details

All copy and settings a non-developer might change live in **`src/site.ts`**:

- `calendlyUrl` — **replace with Angela's real Calendly link.** The booking
  embed and every "Book a session" button read from this single value.
- `phone`, `email`, `location`, `modes` — contact details
- audiences, therapy process tracks, focus areas, credentials, values

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
    sections/   Nav, Hero, Marquee, About, Audiences, Process, Focus, Booking, Footer
  hooks/        useScrollHeader
  lib/          calendly
  site.ts       all content + configuration
  index.css     Tailwind theme + base + motion
```

Accessibility: keyboard focus rings, a skip link, reduced-motion support
(animations and the 3D scene degrade gracefully), and a no-WebGL fallback for
the hero.
