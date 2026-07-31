import { Section } from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { Pin, Screen, Leaf } from "../ui/Icon";
import { credentials, site } from "../../site";
import portrait from "../../assets/angela-cutout.webp";

export default function About() {
  return (
    <Section id="about" className="bg-cream">
      <div className="grid grid-cols-1 items-center gap-[clamp(2rem,5vw,4.5rem)] md:grid-cols-[0.92fr_1.08fr]">
        {/* portrait — the cutout sits flush with the blob's base so the
            photo's cropped hem reads as an intentional edge */}
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-blob shadow-float [background:radial-gradient(120%_120%_at_20%_10%,var(--color-mint-soft),transparent_55%),linear-gradient(160deg,#f2f7ec,#e3eed9)]">
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-[10%] h-[64%] w-[80%] -translate-x-1/2 rounded-full bg-white/50 blur-3xl"
            />
            <img
              src={portrait}
              alt={`${site.name}, ${site.role.toLowerCase()}`}
              width={1086}
              height={1400}
              className="relative z-[1] mx-auto block w-full max-w-[440px]"
            />
            <div className="grain pointer-events-none absolute inset-0 z-[2] opacity-40 mix-blend-soft-light" />
          </div>

          <div className="absolute bottom-6 left-2 z-[3] max-w-[15rem] rounded-[22px] bg-card/90 px-5 py-4 shadow-float backdrop-blur-md sm:left-6">
            <b className="block font-display text-[1.15rem] leading-tight text-forest">{site.name}</b>
            <span className="mt-1 block text-[0.82rem] font-bold text-sage-ink">{site.role}</span>
          </div>

          <span className="absolute -right-1.5 top-8 z-[3] rotate-[4deg] rounded-full bg-honey px-4 py-2.5 text-[0.82rem] font-extrabold text-honey-ink shadow-float">
            Now accepting new clients
          </span>
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
              I am a licensed Clinical Psychologist with specialized training in Cognitive Behavioral Therapy (CBT)
              and Dialectical Behavior Therapy (DBT), providing evidence-based psychological care across the lifespan.
            </p>
            <p>
              I work with ADHD, autism spectrum disorder and other neurodevelopmental conditions, anxiety and mood
              disorders, trauma, emotional dysregulation, and interpersonal difficulties. I also support adolescents
              with identity, self-esteem, and academic challenges, and work with parents using evidence-based
              strategies to strengthen parent–child relationships, improve communication, and manage behavioral and
              emotional difficulties.
            </p>
            <p>
              Alongside my clinical practice, I teach psychology at the American University of Beirut, integrating the
              latest psychological research into compassionate, evidence-based care.
            </p>
          </Reveal>

          {/* practice facts that used to live on the identity card */}
          <Reveal delay={110} className="mt-7 grid gap-3 sm:grid-cols-3">
            <span className="flex items-center gap-2.5 text-[0.95rem] text-ink-soft">
              <Pin size={20} className="shrink-0 text-sage" /> {site.location}
            </span>
            <span className="flex items-center gap-2.5 text-[0.95rem] text-ink-soft">
              <Screen size={20} className="shrink-0 text-sage" /> {site.modes}
            </span>
            <span className="flex items-center gap-2.5 text-[0.95rem] text-ink-soft">
              <Leaf size={20} className="shrink-0 text-sage" /> Instructor, AUB
            </span>
          </Reveal>

          <Reveal delay={160} className="mt-8 flex flex-wrap gap-2.5">
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
