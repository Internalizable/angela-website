import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/* og:image must be an absolute URL — WhatsApp and friends won't resolve a
   relative one. angelabarhouch.com is the canonical host, so it wins over
   Vercel's per-deploy domain (which would otherwise point previews and any
   *.vercel.app alias at the wrong origin). Set SITE_URL to override. */
const SITE_URL = (process.env.SITE_URL || 'https://angelabarhouch.com').replace(/\/+$/, '')

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'inject-site-url',
      transformIndexHtml: (html: string) => html.replaceAll('__SITE_URL__', SITE_URL),
    },
  ],
})
