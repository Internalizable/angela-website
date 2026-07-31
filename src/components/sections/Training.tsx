import { Section, SectionHead } from "../ui/Section";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import { Spark, WhatsApp, ArrowRight } from "../ui/Icon";
import { trainingProgramme, trainingStats, trainingPathways, trainingOffers } from "../../site";
import { whatsappLink } from "../../lib/whatsapp";

/* Two halves: the accredited training Angela completed (the credibility
   behind the clinical work), and the training she now delivers. */
export default function Training() {
  return (
    <Section id="training" className="bg-paper">
      <SectionHead
        eyebrow="Training & supervision"
        title={
          <>
            Trained deeply, so the room is <span className="italic font-medium text-sage">never improvised</span>.
          </>
        }
        intro="Accredited CBT training across complex cases, children and adolescents, and supervision — completed with high distinction."
      />

      <div className="grid grid-cols-1 gap-[clamp(1.5rem,3vw,2.5rem)] lg:grid-cols-[1.05fr_0.95fr]">
        {/* Certificate summary */}
        <Reveal>
          <div className="flex h-full flex-col rounded-[30px] bg-forest p-[clamp(1.6rem,3.5vw,2.6rem)] text-on-dark shadow-float">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-mint">
              <Spark size={14} /> Letter of completion
            </span>
            <h3 className="mt-4 text-[1.5rem] font-semibold text-cream">{trainingProgramme}</h3>

            <dl className="mt-7 grid gap-5 sm:grid-cols-3">
              {trainingStats.map((s) => (
                <div key={s.label}>
                  <dd className="font-display text-[1.7rem] leading-tight text-mint">{s.value}</dd>
                  <dt className="mt-1 text-[0.84rem] text-on-dark-soft">{s.label}</dt>
                </div>
              ))}
            </dl>

            <div className="mt-8 grid gap-5 border-t border-white/10 pt-7">
              {trainingPathways.map((p) => (
                <div key={p.title}>
                  <span className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-honey">{p.tag}</span>
                  <h4 className="mt-1 text-[1.1rem] font-semibold text-cream">{p.title}</h4>
                  <ul className="mt-2.5 flex flex-wrap gap-1.5">
                    {p.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-[0.84rem] text-on-dark-soft"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Training she delivers */}
        <Reveal delay={120}>
          <div className="flex h-full flex-col gap-4">
            {trainingOffers.map((o) => (
              <div key={o.title} className="rounded-[26px] bg-card p-6 shadow-soft">
                <h3 className="text-[1.18rem] font-semibold">{o.title}</h3>
                <p className="mt-2 text-[0.95rem] text-ink-soft">{o.body}</p>
              </div>
            ))}

            <div className="mt-auto rounded-[26px] p-6 shadow-soft [background:linear-gradient(150deg,var(--color-mint-soft),var(--color-tint-orgs))]">
              <h3 className="text-[1.18rem] font-semibold">Bringing training to your organisation?</h3>
              <p className="mt-2 text-[0.95rem] text-ink-soft">
                Tell Angela your team size, topic and timeframe — she'll build the session around it.
              </p>
              <Button as="a" variant="solid" className="mt-5" {...whatsappLink}>
                <WhatsApp size={18} />
                Enquire about training
                <ArrowRight size={18} className="transition-transform duration-300 ease-spring group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
