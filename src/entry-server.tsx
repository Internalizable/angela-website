import { renderToString } from "react-dom/server";
import App from "./App";

/* Build-time prerender entry. Most AI crawlers (and any search bot that skips
   the render queue) don't execute JavaScript, so the SPA shell would look like
   an empty page to them. This renders the whole app to HTML at build time.

   CouchScene is lazy, so it suspends here and renderToString emits its
   Suspense fallback (null) — the 3D hero stays a client-only enhancement. */
export function render(): string {
  return renderToString(<App />);
}
