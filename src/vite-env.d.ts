/// <reference types="vite/client" />

/** Canonical site origin, injected at build time by vite.config.ts. */
declare const __SITE_ORIGIN__: string;

/** ISO date (YYYY-MM-DD) of the build, for structured-data freshness. */
declare const __BUILD_DATE__: string;
