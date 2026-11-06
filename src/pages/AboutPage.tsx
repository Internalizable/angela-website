import SiteLayout from "../components/layout/SiteLayout";
import BookingBand from "../components/ui/BookingBand";
import Button from "../components/ui/Button";
import Eyebrow from "../components/ui/Eyebrow";
import { WhatsApp } from "../components/ui/Icon";
import { whatsappLink } from "../lib/whatsapp";
import { clinicalTrainings, education, focusAreas, paths, site, trainingCertifications, trainingProgramme } from "../site";

const external = {
  target: "_blank",
  rel: "noopener noreferrer",
  className: "font-semibold text-sage-ink underline underline-offset-2 hover:text-forest",
} as const;

const h2Class = "text-[clamp(1.5rem,2.8vw,2rem)] font-semibold";
const textClass = "mt-3.5 text-[1.05rem] text-ink-soft";
const bulletClass =
  "relative pl-5 text-[1.02rem] text-ink-soft before:absolute before:left-0 before:top-[0.66em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-sage";

export default function AboutPage() {
  return (
    <SiteLayout>
      <header className="bg-[linear-gradient(180deg,var(--color-paper)_0%,var(--color-paper-2)_100%)] px-[clamp(20px,5vw,64px)] pb-[clamp(40px,6vw,72px)] pt-32">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-[clamp(2rem,5vw,4.5rem)] md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 text-[0.88rem] text-ink-mute">
              <a href="/" className="font-semibold text-sage-ink hover:text-forest">
                {site.name}
              </a>
              <span aria-hidden="true"> / </span>
              <span>About</span>
            </nav>
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-3 text-[clamp(2.2rem,5.2vw,4rem)] font-semibold">
              Angela Barhouch, licensed clinical psychologist in Beirut, Lebanon
            </h1>
            <p className="mt-6 max-w-[58ch] text-[clamp(1.05rem,1.6vw,1.22rem)] text-ink-soft">
              Angela Barhouch ({site.nameAr}) is a clinical psychologist and psychotherapist licensed by Lebanon's
              Ministry of Public Health. She practises at FortyFour Tower in Dekwaneh, Greater Beirut, and online, in
              Arabic and English, and teaches psychology at the American University of Beirut.
            </p>
            <Button as="a" size="lg" className="mt-8" {...whatsappLink}>
              <WhatsApp size={19} />
              Book on WhatsApp
            </Button>
          </div>
          <div className="relative overflow-hidden rounded-blob shadow-float [background:radial-gradient(120%_120%_at_20%_10%,var(--color-mint-soft),transparent_55%),linear-gradient(160deg,#f2f7ec,#e3eed9)]">
            <img
              src="/angela-cutout.webp"
              srcSet="/angela-cutout-440.webp 440w, /angela-cutout-880.webp 880w"
              sizes="(min-width: 768px) 400px, 88vw"
              alt={`${site.name}, licensed clinical psychologist and psychotherapist`}
              width={880}
              height={1134}
              className="mx-auto block w-full max-w-[400px]"
            />
          </div>
        </div>
      </header>

      <section className="bg-cream px-[clamp(20px,5vw,64px)] py-[clamp(48px,7vw,88px)]">
        <div className="mx-auto grid w-full max-w-[1000px] gap-12">
          <section>
            <h2 className={h2Class}>Licence and registration</h2>
            <p className={textClass}>
              Angela holds Ministry of Public Health licence number <b>{site.licence.number}</b>, in the clinical
              category. You can check this for yourself on the{" "}
              <a href={site.licence.mophListUrl} {...external}>
                Ministry's list of licensed psychologists
              </a>{" "}
              and in the{" "}
              <a href={site.licence.orderProfileUrl} {...external}>
                {site.licence.orderName} directory
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Education</h2>
            <ul className="mt-3.5 grid gap-2">
              {education.map((e) => (
                <li key={e.award} className={bulletClass}>
                  {e.award}, {e.school}, {e.year}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={h2Class}>Certifications and professional training</h2>
            <ul className="mt-3.5 grid gap-2">
              {clinicalTrainings.map((t) => (
                <li key={t.award} className={bulletClass}>
                  {t.award}, {t.school}
                </li>
              ))}
            </ul>
            <h3 className="mt-7 text-[1.2rem] font-semibold">{trainingProgramme}</h3>
            <div className="mt-3 grid gap-5 md:grid-cols-3">
              {trainingCertifications.map((c) => (
                <div key={c.title} className="rounded-[20px] bg-card p-5 shadow-soft">
                  <h4 className="text-[1.02rem] font-semibold leading-snug">{c.title}</h4>
                  <ul className="mt-2.5 grid gap-1.5 text-[0.92rem] text-ink-soft">
                    {c.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className={h2Class}>Clinical work</h2>
            <p className={textClass}>
              Angela works with children, teenagers, young adults, middle-aged adults and parents, providing
              evidence-based psychological assessment and treatment tailored to each person's needs.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {focusAreas.map((area) => (
                <li key={area.label}>
                  <a
                    href={area.href}
                    className="inline-block rounded-full border border-forest/10 bg-card px-4 py-2 text-[0.92rem] font-semibold text-forest shadow-soft hover:bg-tint-adults"
                  >
                    {area.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={h2Class}>Therapeutic approach</h2>
            <blockquote className="mt-4 rounded-[20px] bg-paper p-6 font-display text-[clamp(1.15rem,2vw,1.4rem)] italic text-forest">
              "My therapeutic approach is collaborative, structured, and compassionate, with a strong focus on helping
              clients develop insight, effective coping skills, and long-term psychological resilience."
            </blockquote>
          </section>

          <section>
            <h2 className={h2Class}>Teaching at the American University of Beirut</h2>
            <p className={textClass}>
              Angela is a psychology instructor at AUB, teaching undergraduate courses including Cognitive Psychology at
              senior level and Introduction to Psychology at sophomore level. Her teaching emphasizes critical thinking,
              clinical application and the integration of theory with evidence-based practice.{" "}
              <a href={site.profiles[1]} {...external}>
                View her AUB faculty profile
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Confidentiality and ethics</h2>
            <p className={textClass}>
              Clients sign an informed consent form outlining confidentiality and their rights. Confidentiality is breached
              only in cases of serious risk or legal obligation, and no identifying information is disclosed without
              explicit client consent.
            </p>
            <ul className="mt-3.5 grid gap-2">
              <li className={bulletClass}>
                Teenagers: parents aren't told what is discussed unless there is a safety concern.
              </li>
              <li className={bulletClass}>
                Adults: confidentiality is maintained even if family members try to contact Angela.
              </li>
            </ul>
          </section>

          <section>
            <h2 className={h2Class}>Find Angela elsewhere</h2>
            <ul className="mt-3.5 flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <a href={site.googleMapsUrl} {...external}>
                  Google Maps
                </a>
              </li>
              <li>
                <a href={site.profiles[2]} {...external}>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={site.profiles[3]} {...external}>
                  Instagram
                </a>
              </li>
              <li>
                <a href={paths.chooseGuide} className={external.className}>
                  Her guide to choosing a psychologist in Lebanon
                </a>
              </li>
            </ul>
          </section>
        </div>
      </section>

      <BookingBand />
    </SiteLayout>
  );
}
