import { Section } from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { Pin, Screen, Leaf } from "../ui/Icon";
import { credentials, site } from "../../site";

export default function About() {
  return (
    <Section id="about" className="bg-cream">
      <div className="grid grid-cols-1 items-center gap-[clamp(2rem,5vw,4.5rem)] md:grid-cols-[0.92fr_1.08fr]">
        {/* identity card */}
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-blob p-[clamp(20px,3vw,34px)] shadow-float [background:radial-gradient(120%_120%_at_20%_10%,var(--color-mint-soft),transparent_55%),linear-gradient(160deg,#f2f7ec,#e3eed9)]">
            <div className="relative z-[2] rounded-[30px] bg-card p-[clamp(22px,3vw,34px)] shadow-soft">
              <div className="grid h-[78px] w-[78px] place-items-center rounded-full bg-gradient-to-br from-sage to-forest font-display text-3xl text-cream shadow-soft">
                A
              </div>
              <h3 className="mt-4 text-2xl font-semibold">{site.name}</h3>
              <p className="mt-1 text-[0.92rem] font-bold text-sage-ink">{site.role}</p>
              <ul className="mt-6 grid gap-2.5">
                <li className="flex items-center gap-2.5 text-[0.96rem] text-ink-soft">
                  <Pin size={20} className="shrink-0 text-sage" /> {site.location}
                </li>
                <li className="flex items-center gap-2.5 text-[0.96rem] text-ink-soft">
                  <Screen size={20} className="shrink-0 text-sage" /> {site.modes} sessions
                </li>
                <li className="flex items-center gap-2.5 text-[0.96rem] text-ink-soft">
                  <Leaf size={20} className="shrink-0 text-sage" /> Instructor of Psychology, AUB
                </li>
              </ul>
            </div>
            <span className="absolute -right-1.5 bottom-6 z-[3] rotate-[4deg] rounded-full bg-honey px-4 py-2.5 text-[0.82rem] font-extrabold text-honey-ink shadow-float">
              Now accepting new clients
            </span>
          </div>
        </Reveal>

        {/* bio */}
        <div>
          <Reveal>
            <Eyebrow>About Angela</Eyebrow>
            <h2 className="mt-2 text-[clamp(1.9rem,4.4vw,3rem)] font-semibold">
              Therapy that's <span className="italic font-medium text-sage">structured</span>, collaborative and genuinely kind.
            </h2>
          </Reveal>
          <Reveal delay={80} className="mt-5 space-y-4 text-ink-soft">
            <p className="text-[clamp(1.05rem,1.6vw,1.25rem)]">
              I'm a licensed clinical psychologist trained in Cognitive Behavioral Therapy and Dialectical Behavior
              Therapy, working with people across every stage of life.
            </p>
            <p>
              My work spans ADHD, autism and other neurodevelopmental differences, mood and anxiety disorders,
              trauma, emotional dysregulation and the interpersonal patterns that keep us stuck. With teens I focus on
              self-esteem, identity and academic stress; with parents, on the skills that strengthen connection at home.
            </p>
            <p>
              Alongside my practice I teach psychology at the American University of Beirut — so theory and
              evidence quietly shape everything that happens in the room.
            </p>
          </Reveal>

          <Reveal delay={140} className="mt-8 flex flex-wrap gap-2.5">
            {credentials.map((c) => (
              <span
                key={c.school}
                className="inline-flex items-center gap-1.5 rounded-full border border-forest/10 bg-paper px-3.5 py-2 text-[0.86rem] font-semibold text-forest"
                title={c.detail}
              >
                <b className="text-sage-ink">✦</b> {c.school}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
