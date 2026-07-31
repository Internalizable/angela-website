import { site, credentials, focusAreas, faqs } from "../site";

/* Structured data, emitted into the prerendered HTML so search engines and AI
   assistants can read the practice as facts rather than infer them from prose.
   Everything here is derived from site.ts — never hand-maintained in parallel. */

const ORIGIN = __SITE_ORIGIN__;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Psychologist", "MedicalBusiness", "LocalBusiness"],
      "@id": `${ORIGIN}/#practice`,
      name: `${site.name} — Clinical Psychologist & Psychotherapist`,
      alternateName: site.name,
      url: `${ORIGIN}/`,
      image: `${ORIGIN}/og-cover.jpg`,
      logo: `${ORIGIN}/apple-touch-icon.png`,
      telephone: site.phone,
      email: site.email,
      priceRange: "$$",
      currenciesAccepted: "USD, LBP",
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
      areaServed: [
        { "@type": "Country", name: "Lebanon" },
        { "@type": "City", name: "Beirut" },
        { "@type": "City", name: "Dekwaneh" },
        { "@type": "AdministrativeArea", name: "Matn District" },
        { "@type": "AdministrativeArea", name: "Mount Lebanon Governorate" },
      ],
      hasMap: site.googleMapsUrl,
      sameAs: [site.googleMapsUrl],
      founder: { "@id": `${ORIGIN}/#angela` },
      employee: { "@id": `${ORIGIN}/#angela` },
      medicalSpecialty: "Psychiatric",
      availableLanguage: site.languages.map((l) => ({
        "@type": "Language",
        name: l.label,
        alternateName: l.code,
      })),
      openingHoursSpecification: [
        ...site.hours.map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.days,
          opens: h.opens,
          closes: h.closes,
        })),
        // Explicit closures read more clearly than absent days.
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: site.closedDays,
          opens: "00:00",
          closes: "00:00",
        },
      ],
      availableService: [
        {
          "@type": "MedicalTherapy",
          name: "Cognitive Behavioral Therapy (CBT)",
          description:
            "Structured, evidence-based therapy for anxiety, mood disorders, trauma, ADHD and behavioural difficulties.",
        },
        {
          "@type": "MedicalTherapy",
          name: "Dialectical Behavior Therapy (DBT)",
          description:
            "Skills-based therapy for emotional dysregulation, distress tolerance and interpersonal difficulties.",
        },
        {
          "@type": "Service",
          name: "Child and adolescent psychotherapy",
          description: "Therapy for children aged 4–12 and teenagers aged 13–18, with parent support.",
        },
        {
          "@type": "Service",
          name: "Parent psychoeducation and coaching",
          description:
            "Evidence-based strategies to strengthen parent–child relationships, communication and behaviour management.",
        },
        {
          "@type": "Service",
          name: "Training and clinical supervision",
          description:
            "CBT-informed training and workshops for schools, NGOs and companies, plus clinical supervision for practitioners.",
        },
      ],
    },
    {
      "@type": "Person",
      "@id": `${ORIGIN}/#angela`,
      name: site.name,
      jobTitle: site.role,
      // The single most quotable sentence on the site: assistants lift this
      // wholesale, so it carries who, what, where and in which languages.
      description:
        "Angela Barhouch is a licensed clinical psychologist and psychotherapist practising at FortyFour Tower in Dekwaneh, just north of Beirut, Lebanon. She has specialized training in Cognitive Behavioral Therapy (CBT) and Dialectical Behavior Therapy (DBT), and provides evidence-based psychological care across the lifespan — children, teenagers, adults and parents — in Arabic, French and English, in person or online.",
      image: `${ORIGIN}/angela-cutout.webp`,
      url: `${ORIGIN}/`,
      telephone: site.phone,
      email: site.email,
      worksFor: { "@id": `${ORIGIN}/#practice` },
      knowsLanguage: site.languages.map((l) => ({
        "@type": "Language",
        name: l.label,
        alternateName: l.code,
      })),
      knowsAbout: [
        "Cognitive Behavioral Therapy",
        "Dialectical Behavior Therapy",
        "Clinical psychology",
        "Child and adolescent psychology",
        ...focusAreas,
      ],
      alumniOf: credentials.map((c) => ({
        "@type": "EducationalOrganization",
        name: c.school,
      })),
      // Health content is YMYL, so Google weighs verifiable credentials
      // heavily. Spell them out rather than leaving them implied by alumniOf.
      hasCredential: credentials.map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: c.detail,
        credentialCategory: "degree or professional training",
        recognizedBy: { "@type": "EducationalOrganization", name: c.school },
      })),
      hasOccupation: {
        "@type": "Occupation",
        name: "Clinical Psychologist",
        occupationLocation: { "@type": "City", name: "Dekwaneh" },
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${ORIGIN}/#website`,
      url: `${ORIGIN}/`,
      name: `${site.name} — Psychotherapist in Beirut`,
      inLanguage: "en",
      publisher: { "@id": `${ORIGIN}/#practice` },
    },
    {
      // Names the page's subject explicitly, so assistants resolve the entity
      // instead of guessing it from prose. dateModified is a freshness signal
      // that YMYL pages are judged on.
      "@type": ["WebPage", "ProfilePage"],
      "@id": `${ORIGIN}/#webpage`,
      url: `${ORIGIN}/`,
      name: `${site.name} — Clinical Psychologist & Psychotherapist in Beirut, Lebanon`,
      isPartOf: { "@id": `${ORIGIN}/#website` },
      about: { "@id": `${ORIGIN}/#angela` },
      mainEntity: { "@id": `${ORIGIN}/#angela` },
      inLanguage: "en",
      dateModified: __BUILD_DATE__,
      primaryImageOfPage: `${ORIGIN}/og-cover.jpg`,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["#faq", "#about"],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${ORIGIN}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Seo() {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify escapes nothing dangerous here (all values are our own
      // literals), but close any `<` that could terminate the script early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
