import { ar } from "../content/arabic";
import { topics, type Topic } from "../content/topics";
import { clinicalTrainings, education, faqs, focusAreas, paths, site } from "../site";

/* Structured data, emitted into each page's <head> at build time so search
   engines and AI assistants can read the practice as facts rather than infer
   them from prose. Everything is derived from site.ts and the content files,
   never maintained in parallel.

   Only use types and properties that exist on schema.org: there is no
   "Psychologist" type, for instance. MedicalClinic is the closest real one,
   and it is what makes availableService a valid property here. */

const ORIGIN = __SITE_ORIGIN__;
const url = (path: string) => (path === "/" ? `${ORIGIN}/` : `${ORIGIN}${path}`);

const PRACTICE_ID = `${ORIGIN}/#practice`;
const PERSON_ID = `${ORIGIN}/#angela`;
const WEBSITE_ID = `${ORIGIN}/#website`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.locality,
  addressRegion: site.address.region,
  addressCountry: site.address.country,
};

const languages = site.languages.map((l) => ({
  "@type": "Language",
  name: l.label,
  alternateName: l.code,
}));

const bookingAction = {
  "@type": "ReserveAction",
  name: "Book a session on WhatsApp",
  target: {
    "@type": "EntryPoint",
    urlTemplate: site.whatsappUrl,
    actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
  },
};

const whatsappChannel = {
  "@type": "ServiceChannel",
  name: "WhatsApp",
  serviceUrl: site.whatsappUrl,
  availableLanguage: languages,
};

const practice = {
  "@type": "MedicalClinic",
  "@id": PRACTICE_ID,
  name: `${site.name} — Clinical Psychologist & Psychotherapist`,
  alternateName: [site.name, site.nameAr],
  url: url(paths.home),
  image: `${ORIGIN}/og-cover.jpg`,
  logo: `${ORIGIN}/apple-touch-icon.png`,
  telephone: site.phone,
  email: site.email,
  priceRange: "$$",
  currenciesAccepted: "USD, LBP",
  isAcceptingNewPatients: true,
  address: postalAddress,
  geo: { "@type": "GeoCoordinates", latitude: site.geo.latitude, longitude: site.geo.longitude },
  areaServed: [
    { "@type": "Country", name: "Lebanon" },
    { "@type": "City", name: "Beirut" },
    { "@type": "City", name: "Dekwaneh" },
    { "@type": "City", name: "Sin El Fil" },
    { "@type": "AdministrativeArea", name: "Matn District" },
    { "@type": "AdministrativeArea", name: "Mount Lebanon Governorate" },
  ],
  hasMap: site.googleMapsUrl,
  sameAs: [site.googleMapsUrl, ...site.profiles],
  founder: { "@id": PERSON_ID },
  employee: { "@id": PERSON_ID },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "appointments",
    telephone: site.phone,
    email: site.email,
    url: site.whatsappUrl,
    availableLanguage: languages,
  },
  potentialAction: bookingAction,
  openingHoursSpecification: [
    ...site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    // Explicit closures read more clearly than absent days.
    { "@type": "OpeningHoursSpecification", dayOfWeek: site.closedDays, opens: "00:00", closes: "00:00" },
  ],
  availableService: [
    {
      "@type": "MedicalTherapy",
      name: "Cognitive Behavioral Therapy (CBT)",
      url: url(paths.cbt),
      description: "Structured, evidence-based therapy for anxiety, mood disorders, trauma, ADHD and behavioural difficulties.",
    },
    {
      "@type": "MedicalTherapy",
      name: "Dialectical Behavior Therapy (DBT)",
      url: url(paths.dbt),
      description: "Skills-based therapy for emotional dysregulation, distress tolerance and interpersonal difficulties.",
    },
  ],
  // The full service list with its pages, so an assistant that reads any one
  // page can see everything the practice offers and where to find it.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Therapy, training and supervision",
    itemListElement: topics
      .filter((t) => t.group !== "guide")
      .map((t) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: t.serviceType, url: url(t.path) },
      })),
  },
};

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: site.name,
  alternateName: [...site.registeredNames, site.nameAr],
  jobTitle: site.role,
  // The most quotable sentence on the site: assistants lift this wholesale, so
  // it carries who, what, where and in which languages.
  description:
    "Angela Barhouch is a licensed clinical psychologist and psychotherapist practising at FortyFour Tower in Dekwaneh, just north of Beirut, Lebanon. She has specialized training in Cognitive Behavioral Therapy (CBT) and Dialectical Behavior Therapy (DBT), and provides evidence-based psychological care across the lifespan — children, teenagers, adults and parents — in Arabic and English, in person or online.",
  image: `${ORIGIN}/angela-cutout.webp`,
  url: url(paths.about),
  // The profiles that independently describe this person. On the Person rather
  // than the practice, because it's the person those records are about.
  sameAs: site.profiles,
  telephone: site.phone,
  email: site.email,
  worksFor: { "@id": PRACTICE_ID },
  affiliation: { "@type": "CollegeOrUniversity", name: "American University of Beirut", url: "https://www.aub.edu.lb" },
  memberOf: { "@type": "Organization", name: site.licence.orderName, url: site.licence.orderUrl },
  knowsLanguage: languages,
  knowsAbout: [
    { "@type": "Thing", name: "Cognitive Behavioral Therapy", sameAs: "https://en.wikipedia.org/wiki/Cognitive_behavioral_therapy" },
    { "@type": "Thing", name: "Dialectical Behavior Therapy", sameAs: "https://en.wikipedia.org/wiki/Dialectical_behavior_therapy" },
    { "@type": "Thing", name: "Clinical psychology", sameAs: "https://en.wikipedia.org/wiki/Clinical_psychology" },
    "Child and adolescent psychology",
    ...focusAreas.map((f) => f.label),
  ],
  // Degrees only: a short course at Oxford doesn't make someone an alumna.
  alumniOf: [...new Set(education.map((e) => e.school))].map((name) => ({
    "@type": "CollegeOrUniversity",
    name,
  })),
  // Health content is judged on verifiable credentials, so spell them out.
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Licence to practise as a clinical psychologist in Lebanon",
      credentialCategory: "license",
      identifier: site.licence.number,
      url: site.licence.mophListUrl,
      recognizedBy: { "@type": "GovernmentOrganization", name: "Ministry of Public Health, Lebanon", url: "https://www.moph.gov.lb" },
    },
    ...education.map((e) => ({
      "@type": "EducationalOccupationalCredential",
      name: `${e.award} (${e.year})`,
      credentialCategory: "degree",
      recognizedBy: { "@type": "CollegeOrUniversity", name: e.school },
    })),
    ...clinicalTrainings.map((t) => ({
      "@type": "EducationalOccupationalCredential",
      name: t.award,
      credentialCategory: "certificate",
      recognizedBy: { "@type": "EducationalOrganization", name: t.school },
    })),
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Clinical Psychologist",
    occupationalCategory: "19-3033.00",
    occupationLocation: { "@type": "City", name: "Dekwaneh" },
  },
  address: postalAddress,
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: url(paths.home),
  name: `${site.name} — Psychotherapist in Beirut`,
  inLanguage: ["en", "ar"],
  publisher: { "@id": PRACTICE_ID },
};

/* Who wrote it always; "reviewed" only once Angela actually has. */
const authorship = {
  author: { "@id": PERSON_ID },
  dateModified: site.contentUpdated,
  ...(site.clinicalReviewDate ? { reviewedBy: { "@id": PERSON_ID }, lastReviewed: site.clinicalReviewDate } : {}),
};

const faqPage = (path: string, items: readonly { q: string; a: string }[], inLanguage = "en") => ({
  "@type": "FAQPage",
  "@id": `${url(path)}#faq`,
  inLanguage,
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

const breadcrumbs = (path: string, label: string) => ({
  "@type": "BreadcrumbList",
  "@id": `${url(path)}#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: site.name, item: url(paths.home) },
    { "@type": "ListItem", position: 2, name: label, item: url(path) },
  ],
});

const graph = (...nodes: object[]) => ({
  "@context": "https://schema.org",
  // Every page carries the full entities, because an assistant may read only
  // the one page it landed on.
  "@graph": [practice, person, website, ...nodes],
});

export const homeSchema = () =>
  graph(
    {
      // Names the page's subject explicitly, so assistants resolve the entity
      // instead of guessing it from prose.
      "@type": ["WebPage", "ProfilePage"],
      "@id": `${url(paths.home)}#webpage`,
      url: url(paths.home),
      name: `${site.name} — Clinical Psychologist & Psychotherapist in Beirut, Lebanon`,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": PERSON_ID },
      inLanguage: "en",
      dateModified: site.contentUpdated,
      primaryImageOfPage: `${ORIGIN}/og-cover.jpg`,
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["#glance", "#faq"] },
    },
    faqPage(paths.home, faqs),
  );

export const aboutSchema = (title: string) =>
  graph(
    {
      "@type": "ProfilePage",
      "@id": `${url(paths.about)}#webpage`,
      url: url(paths.about),
      name: title,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": PERSON_ID },
      inLanguage: "en",
      dateModified: site.contentUpdated,
      breadcrumb: { "@id": `${url(paths.about)}#breadcrumb` },
    },
    breadcrumbs(paths.about, "About Angela Barhouch"),
  );

export const arabicSchema = () =>
  graph(
    {
      "@type": "WebPage",
      "@id": `${url(paths.arabic)}#webpage`,
      url: url(paths.arabic),
      name: ar.title,
      description: ar.description,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": PERSON_ID },
      inLanguage: "ar",
      dateModified: site.contentUpdated,
    },
    faqPage(paths.arabic, ar.faqs, "ar"),
  );

export const topicSchema = (t: Topic) =>
  graph(
    {
      // Clinical pages are medical content and carry its authorship fields.
      "@type": t.clinical ? "MedicalWebPage" : "WebPage",
      "@id": `${url(t.path)}#webpage`,
      url: url(t.path),
      name: t.title,
      description: t.description,
      isPartOf: { "@id": WEBSITE_ID },
      inLanguage: "en",
      primaryImageOfPage: `${ORIGIN}/og-cover.jpg`,
      breadcrumb: { "@id": `${url(t.path)}#breadcrumb` },
      ...authorship,
      ...(t.about ? { about: { "@type": t.about.type, name: t.about.name, sameAs: t.about.sameAs } } : {}),
      ...(t.sources.length ? { citation: t.sources.map((s) => ({ "@type": "CreativeWork", name: s.title, url: s.url })) } : {}),
    },
    {
      "@type": "Service",
      "@id": `${url(t.path)}#service`,
      name: t.h1,
      serviceType: t.serviceType,
      description: t.lead,
      url: url(t.path),
      provider: { "@id": PRACTICE_ID },
      areaServed: { "@type": "Country", name: "Lebanon" },
      availableChannel: whatsappChannel,
    },
    breadcrumbs(t.path, t.label),
    ...(t.faqs.length ? [faqPage(t.path, t.faqs)] : []),
  );
