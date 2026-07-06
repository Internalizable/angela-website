/* Thin, typed wrapper around the Calendly widget script loaded in index.html.
   Keeps every component decoupled from the global `window.Calendly` object. */

type CalendlyGlobal = {
  initPopupWidget: (opts: { url: string }) => void;
  initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
};

declare global {
  interface Window {
    Calendly?: CalendlyGlobal;
  }
}

/** Append Calendly's UTM/branding params for a cleaner embedded look. */
export function withEmbedParams(url: string): string {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}hide_gdpr_banner=1&background_color=fbfaf3&text_color=2e4636&primary_color=6f9e72`;
}

/** Open the Calendly scheduling popup. Falls back to a new tab if the
    widget script hasn't loaded (e.g. blocked by a content blocker). */
export function openCalendlyPopup(url: string): void {
  if (typeof window !== "undefined" && window.Calendly) {
    window.Calendly.initPopupWidget({ url: withEmbedParams(url) });
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

/** Initialise an inline embed inside `parent`. Returns true on success. */
export function initCalendlyInline(parent: HTMLElement, url: string): boolean {
  if (typeof window !== "undefined" && window.Calendly) {
    window.Calendly.initInlineWidget({ url: withEmbedParams(url), parentElement: parent });
    return true;
  }
  return false;
}
