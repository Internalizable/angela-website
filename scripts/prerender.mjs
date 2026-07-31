/* Injects the prerendered markup into dist/index.html.
   Run after both the client and SSR builds. */
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { render } from "../dist-ssr/entry-server.js";

const INDEX = "dist/index.html";
const MARKER = '<div id="root"></div>';

const shell = readFileSync(INDEX, "utf8");
if (!shell.includes(MARKER)) {
  throw new Error(`prerender: could not find ${MARKER} in ${INDEX}`);
}

const body = render();
if (body.length < 5000) {
  throw new Error(`prerender: suspiciously small render (${body.length} bytes) — did the app fail to render?`);
}

writeFileSync(INDEX, shell.replace(MARKER, `<div id="root">${body}</div>`));
rmSync("dist-ssr", { recursive: true, force: true });

console.log(`prerender: injected ${body.length.toLocaleString()} bytes of HTML`);
