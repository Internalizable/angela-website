import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/* og:image must be an absolute URL — WhatsApp and friends won't resolve a
   relative one, and crawlers are unreliable about following redirects for it.
   The apex 308-redirects to www, so www is the host that actually answers 200
   and the one every absolute URL here must use. Set SITE_URL to override. */
const SITE_URL = (process.env.SITE_URL || 'https://www.angelabarhouch.com').replace(/\/+$/, '')

// https://vite.dev/config/
export default defineConfig({
  // Structured data needs the same absolute origin as the meta tags.
  define: {
    __SITE_ORIGIN__: JSON.stringify(SITE_URL),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
  },
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'inject-site-url',
      transformIndexHtml: (html: string) => html.replaceAll('__SITE_URL__', SITE_URL),
    },
  ],
})
