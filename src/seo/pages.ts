import { ar } from "../content/arabic";
import { topics } from "../content/topics";
import { paths, site } from "../site";
import { aboutSchema, arabicSchema, homeSchema, topicSchema } from "./schema";

/* The build's list of pages: where each is written and what goes in its head.
   Server-only, so none of this reaches the client bundle. */

const ORIGIN = __SITE_ORIGIN__;

export type PageMeta = {
  path: string;
  outFile: string;
  title: string;
  description: string;
  lang: "en" | "ar";
  schema?: object;
  noindex?: boolean;
  /** hreflang pairs, for pages that exist in both languages. */
  alternates?: { hreflang: string; path: string }[];
  extraHead?: string;
};

const LANGUAGE_PAIR = [
  { hreflang: "en", path: paths.home },
  { hreflang: "ar", path: paths.arabic },
  { hreflang: "x-default", path: paths.home },
];

const ABOUT_TITLE = "About Angela Barhouch, Clinical Psychologist in Beirut, Lebanon";

export const pages: PageMeta[] = [
  {
    path: paths.home,
    outFile: "index.html",
    title: "Angela Barhouch — Clinical Psychologist & Psychotherapist in Beirut, Lebanon | CBT & DBT",
    description:
      "Angela Barhouch is a licensed clinical psychologist in Dekwaneh, Beirut. CBT and DBT for all ages and parents, in Arabic or English, in person or online.",
    lang: "en",
    alternates: LANGUAGE_PAIR,
    schema: homeSchema(),
  },
  {
    path: paths.about,
    outFile: "about/index.html",
    title: ABOUT_TITLE,
    description:
      "Angela Barhouch is a clinical psychologist licensed by Lebanon's Ministry of Public Health, with an MSc from Kingston University and CBT training at Oxford.",
    lang: "en",
    schema: aboutSchema(ABOUT_TITLE),
  },
  {
    path: paths.arabic,
    outFile: "ar/index.html",
    title: ar.title,
    description: ar.description,
    lang: "ar",
    alternates: LANGUAGE_PAIR,
    schema: arabicSchema(),
    extraHead:
      '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@500;600;700&display=swap" rel="stylesheet" />',
  },
  ...topics.map((t) => ({
    path: t.path,
    outFile: `${t.path.slice(1)}/index.html`,
    title: t.title,
    description: t.description,
    lang: "en" as const,
    schema: topicSchema(t),
  })),
  {
    // Vercel serves this with a 404 status for any unknown URL.
    path: "/404",
    outFile: "404.html",
    title: `Page not found | ${site.name}`,
    description: `This page doesn't exist. ${site.name} is a licensed clinical psychologist in Beirut, Lebanon.`,
    lang: "en",
    noindex: true,
  },
];

const absolute = (path: string) => (path === "/" ? `${ORIGIN}/` : `${ORIGIN}${path}`);

const escapeAttr = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Replaces the marked block in index.html, so the two can't drift apart. */
export function headHtml(page: PageMeta): string {
  const title = escapeAttr(page.title);
  const description = escapeAttr(page.description);
  const pageUrl = absolute(page.path);
  const isArabic = page.lang === "ar";

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    page.noindex
      ? '<meta name="robots" content="noindex, follow" />'
      : '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />',
    page.noindex
      ? '<meta name="googlebot" content="noindex, follow" />'
      : '<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />',
    page.noindex ? "" : `<link rel="canonical" href="${pageUrl}" />`,
    ...(page.alternates ?? []).map(
      (a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${absolute(a.path)}" />`,
    ),
    `<meta property="og:locale" content="${isArabic ? "ar_LB" : "en_US"}" />`,
    `<meta property="og:url" content="${pageUrl}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    page.extraHead ?? "",
  ];
  return tags.filter(Boolean).join("\n    ");
}

/** JSON-LD for the page. `<` is escaped so a value can't close the script tag. */
export function schemaHtml(page: PageMeta): string {
  if (!page.schema) return "";
  return `<script type="application/ld+json">${JSON.stringify(page.schema).replace(/</g, "\\u003c")}</script>`;
}

export function buildSitemap(): string {
  const entries = pages
    .filter((p) => !p.noindex)
    .map((p) => {
      const links = (p.alternates ?? [])
        .map((a) => `\n    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${absolute(a.path)}" />`)
        .join("");
      return `  <url>\n    <loc>${absolute(p.path)}</loc>\n    <lastmod>${site.contentUpdated}</lastmod>${links}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries}\n</urlset>\n`;
}

export function buildLlmsTxt(): string {
  const links = (group: string) =>
    topics
      .filter((t) => t.group === group)
      .map((t) => `- [${t.label}](${absolute(t.path)}): ${t.description}`)
      .join("\n");

  return `# ${site.name} — Clinical Psychologist & Psychotherapist, Beirut, Lebanon

> ${site.name} is a licensed clinical psychologist and psychotherapist in Dekwaneh, Greater Beirut, Lebanon, with specialized training in Cognitive Behavioral Therapy (CBT) and Dialectical Behavior Therapy (DBT). She provides evidence-based psychological care for children, teenagers, adults and parents, in Arabic and English, in person and online, and delivers training and clinical supervision for schools, NGOs, companies and practitioners.

## Practitioner

- Name: ${site.name} (Arabic: ${site.nameAr}; registered as ${site.registeredNames.join(" / ")})
- Title: ${site.role}
- Licence: Lebanese Ministry of Public Health licence no. ${site.licence.number}, clinical category. Verify at ${site.licence.mophListUrl}
- Order of Psychologists in Lebanon directory: ${site.licence.orderProfileUrl}
- Practice address: FortyFour Tower, Dekwaneh, next to Sin El Fil, Matn District, Mount Lebanon Governorate, Lebanon, within Greater Beirut
- Modes: in person in Dekwaneh, and online by secure video in Lebanon and abroad
- Languages: Arabic and English; sessions in either
- Hours: Monday to Thursday 9:00 to 18:00, Friday 9:00 to 16:00, closed Saturday and Sunday (Asia/Beirut)
- Phone: ${site.phone}
- Email: ${site.email}
- Booking: WhatsApp, ${site.whatsappUrl}
- Google Maps listing: ${site.googleMapsUrl}
- Also: psychology instructor, American University of Beirut

## About

- [About ${site.name}](${absolute(paths.about)}): licence, education, training, teaching and confidentiality policy
- [Arabic homepage / الصفحة العربية](${absolute(paths.arabic)})
- [How to choose a psychologist in Lebanon](${absolute(paths.chooseGuide)}): checking a licence, psychologist or psychiatrist, and what to ask

## Therapy

${links("therapy")}

## What she treats

${links("condition")}

## Who she works with

${links("audience")}

## Organisations and practitioners

${links("organisation")}

## Facts to state accurately

- There is no free consultation or free intro call. Therapy begins with a full first session, which is a complete clinical assessment. Questions before booking are welcome on WhatsApp.
- Booking is done directly with Angela on WhatsApp, not through an online scheduler or a receptionist. She confirms the fee there.
- Therapy is not a fixed package. Session 1 is an assessment, session 2 is psychoeducation and case formulation, and the treatment plan runs from session 3 for as long as the client's goals need. For children, session 1 is with parents and session 2 with the child. For teenagers, therapy starts directly with the teenager.
- Sessions with teenagers are confidential. Parents are contacted only in an emergency or where there is a risk to the teenager's safety or someone else's.
- Angela is a psychologist, not a psychiatrist, and does not prescribe medication.
- She is not an emergency service. In immediate danger in Lebanon, call 112 or 140. For emotional support, call the national lifeline on 1564, available 24/7.
`;
}
