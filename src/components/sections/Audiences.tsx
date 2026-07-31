import { Section, SectionHead } from "../ui/Section";
import Reveal from "../ui/Reveal";
import { audiences } from "../../site";

export default function Audiences() {
  return (
    <Section id="who" className="bg-paper">
      <SectionHead
        eyebrow="Who I work with"
        title={
          <>
            Care shaped around <span className="italic font-medium text-sage">who you are</span>.
          </>
        }
        intro="Every age — and every organisation — meets the world differently. Each path below is built around what that stage of life, or that team, actually needs."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {audiences.map((a, i) => (
          <Reveal key={a.title} delay={i * 80}>
            <article
              className="group relative isolate flex h-full items-center gap-3.5 overflow-hidden rounded-[20px] p-4 transition-[transform,box-shadow] duration-500 ease-spring hover:-translate-y-1 hover:shadow-float"
              style={{ background: a.tint }}
            >
              <span
                className="absolute -right-8 -top-8 -z-10 h-[96px] w-[96px] rounded-full opacity-30 blur-[2px] transition-transform duration-500 ease-spring group-hover:scale-150"
                style={{ background: a.accent }}
              />
              <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-[15px] bg-card text-[1.35rem] shadow-soft">
                {a.emoji}
              </span>
              <h3 className="text-[1.05rem] font-semibold leading-tight">{a.title}</h3>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
