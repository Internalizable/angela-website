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
        intro="Every age meets the world differently. Each path below is built around what that stage of life actually needs."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {audiences.map((a, i) => (
          <Reveal key={a.title} delay={i * 80}>
            <article
              className="group relative isolate flex h-full flex-col overflow-hidden rounded-[30px] p-7 transition-[transform,box-shadow] duration-500 ease-spring hover:-translate-y-2 hover:shadow-float sm:min-h-[270px]"
              style={{ background: a.tint }}
            >
              <span
                className="absolute -right-10 -top-10 -z-10 h-[150px] w-[150px] rounded-full opacity-30 blur-[2px] transition-transform duration-500 ease-spring group-hover:scale-150"
                style={{ background: a.accent }}
              />
              <span className="grid h-[58px] w-[58px] place-items-center rounded-[20px] bg-card text-3xl shadow-soft">
                {a.emoji}
              </span>
              <h3 className="mt-4 text-[1.35rem] font-semibold">{a.title}</h3>
              <p className="mt-2 flex-1 text-[0.95rem] text-ink-soft">{a.body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-forest">
                {a.tag}
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
