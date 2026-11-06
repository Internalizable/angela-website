import Wordmark from "../components/brand/Wordmark";
import Button from "../components/ui/Button";
import { WhatsApp } from "../components/ui/Icon";
import { ar } from "../content/arabic";
import { whatsappLink } from "../lib/whatsapp";
import { crisis, paths, site } from "../site";

/* The Arabic homepage, right-to-left, as one complete page: "Arabic speaking
   psychologist" searches are a distinct audience in Lebanon and the Gulf, and an
   English site can't be matched to a question asked in Arabic. */
const h2Class = "text-[clamp(1.6rem,3.2vw,2.3rem)] font-semibold";
const sectionClass = "px-[clamp(20px,5vw,64px)] py-[clamp(48px,7vw,84px)]";
const innerClass = "mx-auto w-full max-w-[1000px]";

export default function ArabicPage() {
  return (
    <div lang="ar" dir="rtl">
      <header className="absolute inset-x-0 top-0 z-50 px-[clamp(20px,5vw,64px)] py-3.5">
        <nav className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4">
          <span dir="ltr" lang="en">
            <Wordmark />
          </span>
          <a href={paths.home} lang="en" hrefLang="en" className="font-semibold text-forest underline underline-offset-4">
            {ar.englishLink}
          </a>
        </nav>
      </header>

      <main>
        <section className="bg-[linear-gradient(180deg,var(--color-paper)_0%,var(--color-paper-2)_100%)] px-[clamp(20px,5vw,64px)] pb-[clamp(44px,6vw,76px)] pt-32">
          <div className={innerClass}>
            <h1 className="max-w-[22ch] text-[clamp(2rem,4.8vw,3.6rem)] font-semibold">{ar.h1}</h1>
            <p className="mt-6 max-w-[64ch] text-[clamp(1.08rem,1.7vw,1.25rem)] text-ink-soft">{ar.lead}</p>
            <Button as="a" size="lg" className="mt-8" {...whatsappLink}>
              <WhatsApp size={19} />
              {ar.cta}
            </Button>

            <dl className="mt-10 grid grid-cols-1 gap-x-10 border-t border-forest/10 sm:grid-cols-2">
              {ar.facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[5rem_1fr] gap-3 border-b border-forest/10 py-3.5">
                  <dt className="font-bold text-sage-ink">{f.label}</dt>
                  <dd className="text-[0.98rem] text-ink-soft">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className={`${sectionClass} bg-cream`}>
          <div className={innerClass}>
            <h2 className={h2Class}>{ar.conditionsHeading}</h2>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {ar.conditions.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-forest/10 bg-card px-4 py-2 text-[0.98rem] font-semibold text-forest shadow-soft"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${sectionClass} bg-forest text-on-dark`}>
          <div className={innerClass}>
            <h2 className={`${h2Class} !text-cream`}>{ar.processHeading}</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {ar.process.map((p) => (
                <div key={p.title} className="rounded-[24px] border border-white/10 bg-white/[0.05] p-6">
                  <h3 className="text-[1.25rem] font-semibold !text-cream">{p.title}</h3>
                  <ol className="mt-3 grid gap-2.5 text-[0.98rem] text-on-dark-soft">
                    {p.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
            <p className="mt-7 max-w-[62ch] text-on-dark-soft">{ar.processNote}</p>
          </div>
        </section>

        <section className={`${sectionClass} bg-cream`}>
          <div className={`${innerClass} grid gap-10 md:grid-cols-2`}>
            <div>
              <h2 className={h2Class}>{ar.credentialsHeading}</h2>
              <ul className="mt-5 grid gap-2.5 text-ink-soft">
                {ar.credentials.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="mt-5 text-[0.98rem] text-ink-soft">
                {ar.verifyLabel}{" "}
                <a
                  href={site.licence.mophListUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sage-ink underline underline-offset-2"
                >
                  {ar.verifyMoph}
                </a>
                {" · "}
                <a
                  href={site.licence.orderProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sage-ink underline underline-offset-2"
                >
                  {ar.verifyOrder}
                </a>
              </p>
            </div>
            <div>
              <h2 className={h2Class}>{ar.trainingHeading}</h2>
              <p className="mt-5 text-ink-soft">{ar.training}</p>
            </div>
          </div>
        </section>

        <section id="faq" className={`${sectionClass} bg-paper`}>
          <div className={innerClass}>
            <h2 className={h2Class}>{ar.faqHeading}</h2>
            <div className="mt-7 grid gap-3 md:grid-cols-2">
              {ar.faqs.map((f) => (
                <div key={f.q} className="rounded-[20px] bg-card p-6 shadow-soft">
                  <h3 className="text-[1.12rem] font-semibold">{f.q}</h3>
                  <p className="mt-2.5 text-ink-soft">{f.a}</p>
                </div>
              ))}
            </div>
            <aside className="mt-6 rounded-[20px] border border-forest/10 bg-tint-parents p-5 text-ink">
              {ar.crisis}{" "}
              <a
                href={crisis.lifelineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-forest underline underline-offset-2"
              >
                moph.gov.lb
              </a>
            </aside>
          </div>
        </section>

        <section id="book" className="bg-forest px-[clamp(20px,5vw,64px)] py-[clamp(56px,8vw,96px)] text-on-dark">
          <div className="mx-auto flex w-full max-w-[1000px] flex-wrap items-end justify-between gap-8">
            <div className="max-w-[56ch]">
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold !text-cream">{ar.bookHeading}</h2>
              <p className="mt-3 text-[1.08rem] text-on-dark-soft">{ar.bookBody}</p>
            </div>
            <Button as="a" variant="accent" size="lg" {...whatsappLink}>
              <WhatsApp size={19} />
              {ar.cta}
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-forest-deep px-[clamp(20px,5vw,64px)] py-8 text-[0.92rem] text-on-dark-soft">
        <div className="mx-auto flex w-full max-w-[1000px] flex-wrap justify-between gap-4">
          <p>{ar.licenceLine}</p>
          <p dir="ltr">
            <a href={site.phoneHref} className="hover:text-mint">
              {site.phone}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
