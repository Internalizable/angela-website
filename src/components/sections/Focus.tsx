import { Section, SectionHead } from "../ui/Section";
import Reveal from "../ui/Reveal";
import { Compass, Spark, Heart, Shield } from "../ui/Icon";
import { focusAreas, values } from "../../site";

const valueIcons = [Compass, Spark, Heart];

export default function Focus() {
  return (
    <Section id="focus" className="bg-cream">
      <SectionHead
        eyebrow="What we work on"
        title={
          <>
            Bring what's heavy. <span className="italic font-medium text-sage">We'll make sense of it together.</span>
          </>
        }
        intro="A snapshot of the concerns I work with most — and the principles that guide how we'll work on them."
      />

      <div className="grid grid-cols-1 items-start gap-[clamp(2rem,5vw,4rem)] md:grid-cols-[0.85fr_1.15fr]">
        {/* focus chips */}
        <Reveal className="flex flex-wrap gap-2.5">
          {focusAreas.map((area) => (
            <span
              key={area}
              className="cursor-default rounded-full border border-forest/10 bg-card px-4 py-2.5 text-[0.95rem] font-semibold text-forest shadow-soft transition-[transform,background-color,color] duration-300 ease-spring hover:-translate-y-1 hover:-rotate-[1.5deg] hover:bg-sage hover:text-cream"
            >
              {area}
            </span>
          ))}
        </Reveal>

        {/* values + confidentiality */}
        <div className="grid gap-4">
          {values.map((v, i) => {
            const VIcon = valueIcons[i];
            return (
              <Reveal key={v.title} delay={i * 80}>
                <div className="flex items-start gap-4.5 rounded-[20px] bg-paper p-5.5 shadow-soft">
                  <span className="grid h-[50px] w-[50px] shrink-0 place-items-center rounded-[14px] bg-tint-adults text-sage-ink">
                    <VIcon size={24} />
                  </span>
                  <div>
                    <h3 className="text-[1.18rem] font-semibold">{v.title}</h3>
                    <p className="mt-1 text-[0.95rem] text-ink-soft">{v.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}

          <Reveal delay={240}>
            <div className="mt-1 flex items-center gap-4.5 rounded-[30px] p-[clamp(1.4rem,3vw,2rem)] shadow-soft [background:linear-gradient(150deg,var(--color-mint-soft),var(--color-tint-adults))]">
              <Shield size={32} className="shrink-0 text-sage-ink" />
              <p className="text-[1rem] text-forest">
                <b className="font-display">Confidentiality comes first.</b> Everything shared in session stays
                protected by professional ethics. For teens, parents are only ever contacted if there's a real safety
                concern.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
