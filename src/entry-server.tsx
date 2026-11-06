import { renderToString } from "react-dom/server";
import { loadPage } from "./routes";

export { buildLlmsTxt, buildSitemap, headHtml, pages, schemaHtml } from "./seo/pages";
export { site } from "./site";

/* Build-time prerender entry. Most AI crawlers (and any search bot that skips
   the render queue) don't execute JavaScript, so an SPA shell would look like an
   empty page to them. This renders each page to HTML at build time.

   CouchScene is lazy and gated behind a media query that's false here, so the
   3D hero stays a client-only enhancement. */
export async function render(path: string): Promise<string> {
  const { default: Page } = await loadPage(path);
  return renderToString(<Page path={path} />);
}
