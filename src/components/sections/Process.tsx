import { useState } from "react";
import { Section, SectionHead } from "../ui/Section";
import Reveal from "../ui/Reveal";
import { processTracks } from "../../site";

/* The therapy journey genuinely differs by age, so it's a real sequence —
   numbered steps are earned here, not decoration. Tabs switch the track. */
export default function Process() {
  const [active, setActive] = useState(0);
  const track = processTracks[active];

  return (
    <Section id="process" className="bg-forest text-on-dark">
      <SectionHead
        tone="onDark"
        eyebrow="How therapy works"
        title={<span className="text-cream">A clear path from first hello to lasting change.</span>}
        intro="No mystery, no jargon. Here's exactly how the first sessions tend to unfold — choose a path to see it."
      />

      <Reveal
        className="mb-10 inline-flex flex-wrap gap-1.5 rounded-full bg-white/[0.07] p-1.5"
        as="div"
      >
        {processTracks.map((t, i) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={[
              "rounded-full px-5 py-2.5 text-[0.92rem] font-bold transition-colors duration-300 ease-soft",
              i === active ? "bg-mint text-forest-deep" : "text-on-dark-soft hover:text-cream",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </Reveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {track.steps.map((s, i) => (
          <Reveal key={`${track.key}-${i}`} delay={i * 90}>
            <article className="h-full rounded-[30px] border border-white/10 bg-white/[0.05] p-7 transition-[transform,background-color] duration-500 ease-spring hover:-translate-y-1.5 hover:bg-white/[0.09]">
              <span className="font-display text-[2.6rem] leading-none text-mint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[1.25rem] font-semibold text-cream">{s.title}</h3>
              <p className="mt-2.5 text-[0.95rem] text-on-dark-soft">{s.body}</p>
              <span className="mt-5 block text-[0.8rem] font-bold uppercase tracking-[0.12em] text-honey">
                {s.line}
              </span>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Therapy isn't a three-session package — say so plainly. */}
      <Reveal delay={280}>
        <p className="mt-8 max-w-[62ch] text-[0.98rem] text-on-dark-soft">
          <b className="font-display text-cream">Therapy continues from there.</b> These are the opening sessions, not
          the whole course — from session three onward we work through the treatment plan for as long as your goals
          need, reviewing progress together as we go.
        </p>
      </Reveal>
    </Section>
  );
}
