import type { ComponentType } from "react";
import { paths } from "./site";

/* Each kind of page is its own chunk, and it's loaded before hydration so the
   client renders exactly what the prerender did. Plain links between pages keep
   them real, crawlable URLs that work without JavaScript. */

export type PageProps = { path: string };
type PageModule = { default: ComponentType<PageProps> };

const loaders: Record<string, () => Promise<PageModule>> = {
  [paths.home]: () => import("./pages/HomePage"),
  [paths.about]: () => import("./pages/AboutPage"),
  [paths.arabic]: () => import("./pages/ArabicPage"),
};

/** TopicPage also renders the not-found state, for any path it doesn't know. */
export function loadPage(path: string): Promise<PageModule> {
  return (loaders[path] ?? (() => import("./pages/TopicPage")))();
}

export function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}
