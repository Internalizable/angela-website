import SiteLayout from "../components/layout/SiteLayout";
import BookingBand from "../components/ui/BookingBand";
import Button from "../components/ui/Button";
import CrisisNote from "../components/ui/CrisisNote";
import Eyebrow from "../components/ui/Eyebrow";
import { ArrowRight, WhatsApp } from "../components/ui/Icon";
import { pageLabels, topicsByPath, type Topic } from "../content/topics";
import { whatsappLink } from "../lib/whatsapp";
import { paths, site } from "../site";
import NotFoundPage from "./NotFoundPage";

const updatedLabel = new Date(`${site.contentUpdated}T00:00:00Z`).toLocaleDateString("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const reviewedLabel = site.clinicalReviewDate
  ? new Date(`${site.clinicalReviewDate}T00:00:00Z`).toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    })
  : null;

/* The answer comes first, in plain text: an assistant quoting this page takes
   the opening lines, so the H1 and lead have to work on their own. */
function Masthead({ topic }: { topic: Topic }) {
  return (
    <header className="bg-[linear-gradient(180deg,var(--color-paper)_0%,var(--color-paper-2)_100%)] px-[clamp(20px,5vw,64px)] pb-[clamp(40px,6vw,72px)] pt-32">
      <div className="mx-auto w-full max-w-[1200px]">
        <nav aria-label="Breadcrumb" className="mb-6 text-[0.88rem] text-ink-mute">
          <a href="/" className="font-semibold text-sage-ink hover:text-forest">
            {site.name}
          </a>
          <span aria-hidden="true"> / </span>
          <span>{topic.label}</span>
        </nav>
        <Eyebrow>{topic.eyebrow}</Eyebrow>
        <h1 className="mt-3 max-w-[20ch] text-[clamp(2.2rem,5.2vw,4rem)] font-semibold">{topic.h1}</h1>
        <p className="mt-6 max-w-[64ch] text-[clamp(1.05rem,1.6vw,1.22rem)] text-ink-soft">{topic.lead}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3.5">
          <Button as="a" size="lg" {...whatsappLink}>
            <WhatsApp size={19} />
            {topic.group === "organisation" ? "Enquire on WhatsApp" : "Book on WhatsApp"}
          </Button>
          <Button as="a" href={paths.about} variant="ghost" size="lg">
            About Angela
            <ArrowRight size={18} className="transition-transform duration-300 ease-spring group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </header>
  );
}

function Facts({ topic }: { topic: Topic }) {
  const rows =
    topic.group === "organisation"
      ? [
          ["Delivered by", `${site.name}, licensed clinical psychologist`],
          ["Where", "Lebanon"],
          ["Languages", "Arabic and English"],
          ["Enquiries", "WhatsApp, with your team size, topic and timeframe"],
        ]
      : [
          ["Psychologist", `${site.name}, Ministry of Public Health licence no. ${site.licence.number}`],
          ["Where", "FortyFour Tower, Dekwaneh, Greater Beirut, or online"],
          ["Languages", "Arabic and English"],
          ["Booking", "WhatsApp, directly with Angela"],
        ];
  return (
    <aside aria-label="Key facts" className="rounded-[26px] bg-card p-6 shadow-soft lg:sticky lg:top-24">
      <dl className="grid gap-4">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-[0.76rem] font-extrabold uppercase tracking-[0.12em] text-sage-ink">{label}</dt>
            <dd className="mt-0.5 text-[0.96rem] text-ink-soft">{value}</dd>
          </div>
        ))}
      </dl>
      <a {...whatsappLink} className="mt-5 inline-flex items-center gap-2 font-bold text-forest underline underline-offset-4">
        <WhatsApp size={18} />
        {site.phone}
      </a>
    </aside>
  );
}

function Byline() {
  return (
    <div className="mt-12 flex items-center gap-4 rounded-[20px] bg-paper p-5">
      <img
        src="/angela-avatar-144.webp"
        alt={`${site.name}, clinical psychologist`}
        width={144}
        height={144}
        loading="lazy"
        className="h-16 w-16 shrink-0 rounded-full bg-mint-soft object-cover"
      />
      <p className="text-[0.92rem] text-ink-soft">
        Written by{" "}
        <a href={paths.about} className="font-bold text-forest underline underline-offset-2">
          {site.name}
        </a>
        , licensed clinical psychologist and psychology instructor at the American University of Beirut.{" "}
        {reviewedLabel ? `Clinically reviewed ${reviewedLabel}.` : `Last updated ${updatedLabel}.`} This page is general
        information and doesn't replace an individual assessment.
      </p>
    </div>
  );
}

export default function TopicPage({ path }: { path: string }) {
  const topic = topicsByPath[path];
  if (!topic) return <NotFoundPage />;

  return (
    <SiteLayout>
      <Masthead topic={topic} />

      <section className="bg-cream px-[clamp(20px,5vw,64px)] py-[clamp(48px,7vw,88px)]">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-start gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[1fr_340px]">
          <div className="lg:order-2">
            <Facts topic={topic} />
          </div>

          <article className="max-w-[68ch] lg:order-1">
            {topic.sections.map((s) => (
              <section key={s.heading} className="mb-10 last:mb-0">
                <h2 className="text-[clamp(1.5rem,2.8vw,2rem)] font-semibold">{s.heading}</h2>
                {s.body?.map((p) => (
                  <p key={p} className="mt-3.5 text-[1.05rem] text-ink-soft">
                    {p}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="mt-3.5 grid gap-2">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="relative pl-5 text-[1.02rem] text-ink-soft before:absolute before:left-0 before:top-[0.66em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-sage"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {topic.clinical && <CrisisNote className="mt-10" />}
            <Byline />
          </article>
        </div>
      </section>

      {/* Answers stay open rather than in an accordion: they're the most
          quotable text on the page, and nothing here should need a click. */}
      {topic.faqs.length > 0 && (
        <section id="faq" className="bg-paper px-[clamp(20px,5vw,64px)] py-[clamp(48px,7vw,88px)]">
          <div className="mx-auto w-full max-w-[1200px]">
            <h2 className="text-[clamp(1.7rem,3.4vw,2.5rem)] font-semibold">Common questions</h2>
            <div className="mt-7 grid gap-3 md:grid-cols-2">
              {topic.faqs.map((f) => (
                <div key={f.q} className="rounded-[20px] bg-card p-6 shadow-soft">
                  <h3 className="text-[1.1rem] font-semibold leading-snug">{f.q}</h3>
                  <p className="mt-2.5 text-[0.98rem] text-ink-soft">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-cream px-[clamp(20px,5vw,64px)] py-[clamp(48px,7vw,80px)]">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-[clamp(2rem,5vw,4rem)] md:grid-cols-2">
          <div>
            <h2 className="text-[1.4rem] font-semibold">Related pages</h2>
            <ul className="mt-4 grid gap-2.5">
              {topic.related.map((href) => (
                <li key={href}>
                  <a href={href} className="group inline-flex items-center gap-2 font-semibold text-sage-ink hover:text-forest">
                    {pageLabels[href]}
                    <ArrowRight size={16} className="transition-transform duration-300 ease-spring group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {topic.sources.length > 0 && (
            <div>
              <h2 className="text-[1.4rem] font-semibold">Sources</h2>
              <ol className="mt-4 grid list-decimal gap-2.5 pl-5 text-[0.92rem] text-ink-mute">
                {topic.sources.map((s) => (
                  <li key={s.url}>
                    {s.org}:{" "}
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-sage-ink underline underline-offset-2 hover:text-forest"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </section>

      <BookingBand
        heading={topic.group === "organisation" ? "Bringing this to your organisation?" : undefined}
        body={
          topic.group === "organisation"
            ? "Tell Angela your team size, topic and timeframe, and she'll build the session around them."
            : undefined
        }
        cta={topic.group === "organisation" ? "Enquire on WhatsApp" : undefined}
      />
    </SiteLayout>
  );
}
