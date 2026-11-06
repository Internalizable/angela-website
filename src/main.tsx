import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import { loadPage, normalizePath } from './routes'

const root = document.getElementById('root')!
const path = normalizePath(window.location.pathname)

loadPage(path).then(({ default: Page }) => {
  const app = (
    <StrictMode>
      <Page path={path} />
    </StrictMode>
  )

  // Production HTML is prerendered, so attach to the existing markup instead of
  // throwing it away. Dev serves an empty shell and still needs a fresh root.
  if (root.firstElementChild) {
    hydrateRoot(root, app)
  } else {
    createRoot(root).render(app)
  }
})
