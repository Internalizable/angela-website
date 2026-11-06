/* Fails the build if a page would lose search or AI visibility without anyone
   noticing: missing or duplicate metadata, broken internal links, invalid
   structured data, or more than one H1. */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const errors = [];
const seenTitles = new Map();
const seenDescriptions = new Map();

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return name === "assets" ? [] : htmlFiles(full);
    return name.endsWith(".html") && !name.startsWith("google") ? [full] : [];
  });
}

const attr = (html, pattern) => html.match(pattern)?.[1];
const fileFor = (path) => (path === "/" ? join(DIST, "index.html") : join(DIST, path.slice(1), "index.html"));

const pagesHtml = new Map(htmlFiles(DIST).map((file) => [file, readFileSync(file, "utf8")]));

for (const [file, html] of pagesHtml) {
  const fail = (message) => errors.push(`${file}: ${message}`);
  const is404 = file.endsWith("404.html");

  const title = attr(html, /<title>(.*?)<\/title>/);
  const description = attr(html, /<meta name="description" content="([^"]*)"/);
  if (!title) fail("missing <title>");
  if (!description) fail("missing meta description");
  // Search results cut descriptions off at around 160 characters.
  if ((description?.length ?? 0) > 165) fail(`description is ${description.length} chars, over the 165 limit`);
  if (seenTitles.has(title)) fail(`duplicate title, also on ${seenTitles.get(title)}`);
  if (seenDescriptions.has(description)) fail(`duplicate description, also on ${seenDescriptions.get(description)}`);
  seenTitles.set(title, file);
  seenDescriptions.set(description, file);

  const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1s !== 1) fail(`expected exactly one <h1>, found ${h1s}`);

  if (is404) {
    if (!html.includes("noindex")) fail("404 page must be noindex");
  } else {
    const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
    if (!canonical) fail("missing canonical");
    const canonicalFile = canonical && fileFor(new URL(canonical).pathname);
    if (canonicalFile && canonicalFile !== file) fail(`canonical ${canonical} points at another page`);

    const jsonLd = attr(html, /<script type="application\/ld\+json">(.*?)<\/script>/s);
    if (!jsonLd) fail("missing JSON-LD");
    else {
      try {
        JSON.parse(jsonLd);
      } catch (e) {
        fail(`invalid JSON-LD: ${e.message}`);
      }
    }
  }

  // Every internal link must land on a page, and every #fragment on an element.
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    const [path, hash] = href.split("#");
    const target = path === "" ? file : fileFor(path.replace(/\/$/, "") || "/");
    if (!existsSync(target)) {
      fail(`broken link ${href}`);
      continue;
    }
    if (hash) {
      const targetHtml = pagesHtml.get(target) ?? "";
      if (!new RegExp(`\\bid="${hash}"`).test(targetHtml)) fail(`link ${href} has no matching id`);
    }
  }
}

for (const required of ["sitemap.xml", "llms.txt", "robots.txt"]) {
  if (!existsSync(join(DIST, required))) errors.push(`dist/${required} is missing`);
}

if (errors.length) {
  console.error(`check-seo: ${errors.length} problem(s)\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
console.log(`check-seo: ${pagesHtml.size} pages OK`);
