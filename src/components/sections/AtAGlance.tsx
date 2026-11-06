import { Section } from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { paths, site } from "../../site";

/* The facts people and assistants look for, in plain text near the top of the
   page: assistants cite what they can lift whole, and they favour the opening
   of a page. Each row must make sense on its own. */
const link = "font-semibold text-sage-ink underline underline-offset-2 hover:text-forest";

const facts = [
  {
    label: "Licence",
    value: (
      <>
        Ministry of Public Health licence no. {site.licence.number} (clinical).{" "}
        <a className={link} href={site.licence.mophListUrl} target="_blank" rel="noopener noreferrer">
          Ministry list
        </a>{" "}
        ·{" "}
        <a className={link} href={site.licence.orderProfileUrl} target="_blank" rel="noopener noreferrer">
          Order of Psychologists
        </a>
      </>
    ),
  },
  {
    label: "Location",
    value: <>FortyFour Tower, Dekwaneh, next to Sin El Fil, in {site.address.area}</>,
  },
  { label: "Sessions", value: "In person, or online by secure video in Lebanon and abroad" },
  { label: "Languages", value: "Arabic and English, and you can move between them" },
  { label: "Who I see", value: "Children (4–12), teens (13–18), adults and parents" },
  {
    label: "Approach",
    value: (
      <>
        <a className={link} href={paths.cbt}>
          Cognitive Behavioral Therapy (CBT)
        </a>{" "}
        and{" "}
        <a className={link} href={paths.dbt}>
          Dialectical Behavior Therapy (DBT)
        </a>
      </>
    ),
  },
  { label: "Training", value: "Workshops for schools, NGOs and companies; clinical supervision for practitioners" },
  { label: "Booking", value: "On WhatsApp, directly with Angela. The first session is a full clinical assessment" },
];

export default function AtAGlance() {
  return (
    <Section id="glance" className="bg-paper !py-[clamp(48px,7vw,84px)]">
      <Reveal>
        <h2>
          <Eyebrow>Angela Barhouch at a glance</Eyebrow>
        </h2>
        <p className="mt-3 max-w-[62ch] text-[clamp(1.05rem,1.6vw,1.2rem)] text-ink-soft">
          Angela Barhouch is a licensed clinical psychologist and psychotherapist in Dekwaneh, Greater Beirut, Lebanon,
          who provides evidence-based therapy in Arabic and English, in person and online.
        </p>
      </Reveal>
      <Reveal delay={80}>
        <dl className="mt-8 grid grid-cols-1 gap-x-10 border-t border-forest/10 sm:grid-cols-2">
          {facts.map((f) => (
            <div key={f.label} className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-forest/10 py-3.5">
              <dt className="text-[0.82rem] font-extrabold uppercase tracking-[0.1em] text-sage-ink">{f.label}</dt>
              <dd className="text-[0.96rem] text-ink-soft">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
