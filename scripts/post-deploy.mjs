/* Run after a production deploy: `bun run post-deploy`.
   Confirms the live site behaves (every page answers 200 with its own canonical,
   unknown URLs answer 404), then tells IndexNow about the URLs, which feeds Bing
   and with it the assistants that search through Bing.
   Pass --check to verify only, for example against a preview deployment:
   SITE_URL=https://preview-url.vercel.app bun run post-deploy --check */
import { existsSync, readdirSync, readFileSync } from "node:fs";

const SITE = (process.env.SITE_URL || "https://www.angelabarhouch.com").replace(/\/+$/, "");
const CANONICAL_HOST = "https://www.angelabarhouch.com";
const checkOnly = process.argv.includes("--check");

const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
if (!urls.length) throw new Error("No URLs found in the sitemap");

let failed = 0;
const report = (ok, message) => {
  if (!ok) failed += 1;
  console.log(`${ok ? "ok  " : "FAIL"} ${message}`);
};

for (const url of urls) {
  const path = new URL(url).pathname;
  const res = await fetch(`${SITE}${path}`, { redirect: "manual" });
  const html = res.status === 200 ? await res.text() : "";
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const expected = `${CANONICAL_HOST}${path}`;
  report(res.status === 200 && canonical === expected, `${path} -> ${res.status}, canonical ${canonical}`);
}

const missing = await fetch(`${SITE}/this-page-should-not-exist-${Date.now()}`, { redirect: "manual" });
report(missing.status === 404, `unknown URL -> ${missing.status} (want 404)`);

if (urls.length > 1) {
  const sample = new URL(urls[1]).pathname;
  const slash = await fetch(`${SITE}${sample}/`, { redirect: "manual" });
  report(slash.status === 308, `${sample}/ -> ${slash.status} (want 308 to the version without the slash)`);
}

if (failed) {
  console.error(`\n${failed} check(s) failed. Not notifying IndexNow.`);
  process.exit(1);
}
if (checkOnly) process.exit(0);

const keyFile = readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile || !existsSync(`public/${keyFile}`)) throw new Error("IndexNow key file not found in public/");
const key = readFileSync(`public/${keyFile}`, "utf8").trim();

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(CANONICAL_HOST).host, key, urlList: urls }),
});
console.log(`IndexNow -> ${res.status} for ${urls.length} URLs`);
if (!res.ok) process.exit(1);
