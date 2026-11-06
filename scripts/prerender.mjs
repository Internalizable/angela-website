/* Writes one HTML file per page into dist/, plus sitemap.xml and llms.txt, so
   they can't drift from the pages themselves. Run after both the client and SSR
   builds. */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { buildLlmsTxt, buildSitemap, headHtml, pages, render, schemaHtml, site } from "../dist-ssr/entry-server.js";

const INDEX = "dist/index.html";
const ROOT_MARKER = '<div id="root"></div>';
const HEAD_BLOCK = /<!--page-head-->[\s\S]*?<!--\/page-head-->/;
const HTML_TAG = '<html lang="en">';

const shell = readFileSync(INDEX, "utf8");
for (const [name, found] of [
  [ROOT_MARKER, shell.includes(ROOT_MARKER)],
  ["<!--page-head--> block", HEAD_BLOCK.test(shell)],
  [HTML_TAG, shell.includes(HTML_TAG)],
]) {
  if (!found) throw new Error(`prerender: could not find ${name} in ${INDEX}`);
}

let total = 0;
for (const page of pages) {
  const body = await render(page.path);
  if (body.length < 2000) {
    throw new Error(`prerender: suspiciously small render for ${page.path} (${body.length} bytes)`);
  }

  // Function replacers throughout: page text can contain "$", which a string
  // replacement would treat as a special pattern.
  const html = shell
    .replace(HTML_TAG, () => `<html lang="${page.lang}"${page.lang === "ar" ? ' dir="rtl"' : ""}>`)
    .replace(HEAD_BLOCK, () => headHtml(page))
    .replace("</head>", () => `${schemaHtml(page)}\n  </head>`)
    .replace(ROOT_MARKER, () => `<div id="root">${body}</div>`);

  const out = join("dist", page.outFile);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  total += body.length;
}

writeFileSync("dist/sitemap.xml", buildSitemap());
writeFileSync("dist/llms.txt", buildLlmsTxt());
rmSync("dist-ssr", { recursive: true, force: true });

console.log(`prerender: wrote ${pages.length} pages (${total.toLocaleString()} bytes of HTML), sitemap.xml, llms.txt`);
if (!site.clinicalReviewDate) {
  console.warn("prerender: site.clinicalReviewDate is not set, so pages make no clinically-reviewed claim. Set it once Angela has reviewed them.");
}
