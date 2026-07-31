import { lazy, Suspense } from "react";
import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import { ArrowRight, Heart, Spark, WhatsApp } from "../ui/Icon";
import { site, stats } from "../../site";
import { whatsappLink } from "../../lib/whatsapp";
import { useMediaQuery } from "../../hooks/useMediaQuery";

// 3D scene is heavy + browser-only — load it after the rest of the hero paints.
const CouchScene = lazy(() => import("../three/CouchScene"));

/* Small glassy labels that frame the couch and name what therapy is for —
   so the right side reads clearly as "psychology", not empty space. */
function FloatChip({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
}) {
  return (
    <span
      aria-hidden="true"
      style={{ animationDelay: `${delay}s` }}
      className={
        "pointer-events-none absolute inline-flex items-center gap-1.5 rounded-full border border-white/60 " +
        "bg-white/55 px-3.5 py-1.5 text-[0.82rem] font-bold text-forest shadow-soft backdrop-blur-md " +
        "animate-float-slow " +
        className
      }
    >
      {children}
    </span>
  );
}

export default function Hero() {
  const showScene = useMediaQuery("(min-width: 768px) and (prefers-reduced-motion: no-preference)");

  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-16">
      {/* atmosphere */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 60% at 78% 18%, rgba(183,211,172,0.55), transparent 60%)," +
            "radial-gradient(60% 50% at 12% 90%, rgba(231,173,87,0.18), transparent 60%)," +
            "linear-gradient(180deg, var(--color-paper) 0%, var(--color-paper-2) 100%)",
        }}
      />
      {/* 3D couch, beside the headline from md up. Gated on a media query
          rather than CSS: it's ~530kB of Three.js for a decorative backdrop,
          which is the wrong trade on a phone and on reduced-motion. Both
          server and first client render return false, so hydration matches. */}
      {showScene && (
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <CouchScene />
          </Suspense>
        </div>
      )}
      <div className="grain pointer-events-none absolute inset-0 z-[1] opacity-50 mix-blend-soft-light" />

      <div className="relative z-[2] mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-8 px-[clamp(20px,5vw,64px)] md:grid-cols-[1.08fr_0.92fr]">
        <div>
          <span data-anim className="block opacity-0 animate-fade-up [animation-delay:0.15s]">
            <Eyebrow>Psychotherapist · CBT · DBT · {site.location}</Eyebrow>
          </span>

          <h1 className="mt-6 text-[clamp(2.6rem,6.2vw,5rem)] font-semibold leading-[0.98]">
            <span className="reveal-line">
              <span>A calmer mind,</span>
            </span>
            <span className="reveal-line">
              <span className="italic font-medium text-sage [animation-delay:0.09s]">one conversation</span>
            </span>
            <span className="reveal-line">
              <span className="[animation-delay:0.18s]">at a time.</span>
            </span>
          </h1>

          <p
            data-anim
            className="mt-6 max-w-[44ch] text-[1.05rem] text-ink-soft opacity-0 animate-fade-up [animation-delay:0.42s]"
          >
            Practical, evidence-based therapy for children, teens, adults and parents — in person in Beirut, Lebanon,
            or online wherever you are. Plus training and workshops for schools, teams and NGOs.
          </p>

          <div data-anim className="mt-8 flex flex-wrap gap-3.5 opacity-0 animate-fade-up [animation-delay:0.56s]">
            <Button as="a" size="lg" {...whatsappLink}>
              <WhatsApp size={19} />
              Book a session
            </Button>
            <Button as="a" href="#about" variant="ghost" size="lg">
              Meet Angela
              <ArrowRight size={18} className="transition-transform duration-300 ease-spring group-hover:translate-x-1" />
            </Button>
          </div>

          <dl data-anim className="mt-10 flex flex-wrap gap-x-8 gap-y-5 opacity-0 animate-fade-up [animation-delay:0.7s]">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-[0.82rem] text-ink-mute">{s.label}</dt>
                <dd className="order-1 font-display text-2xl leading-none text-forest">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: floating therapy cues framing the 3D couch (wide screens only,
            where the couch moves out beside the headline) */}
        <div
          data-anim
          className="relative hidden h-[440px] opacity-0 animate-fade-up [animation-delay:0.85s] lg:block"
        >
          <FloatChip className="left-2 top-4" delay={0}>
            <Spark size={14} className="text-sage-ink" /> CBT &amp; DBT
          </FloatChip>
          <FloatChip className="right-2 top-16" delay={1.1}>
            <Heart size={14} className="text-blush" /> A safe space
          </FloatChip>
          <FloatChip className="left-0 top-1/2" delay={0.6}>
            Anxiety · Mood · Focus
          </FloatChip>
          <FloatChip className="right-6 top-[58%]" delay={1.6}>
            Real tools, lasting calm
          </FloatChip>

          {/* a small glass booking nudge that doubles as a CTA */}
          <a
            {...whatsappLink}
            className="group absolute bottom-2 right-0 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 p-3 pr-4 text-left shadow-float backdrop-blur-md transition-transform duration-300 ease-spring hover:-translate-y-1"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-mint-soft text-sage-ink">
              <WhatsApp size={22} />
            </span>
            <span>
              <span className="block font-display text-[1.05rem] font-semibold leading-tight text-forest">
                Book on WhatsApp
              </span>
              <span className="text-[0.82rem] text-ink-mute">Message Angela directly · confidential</span>
            </span>
          </a>
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#about"
        data-anim
        className="absolute bottom-7 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-sage-ink opacity-0 animate-fade-up [animation-delay:1s]"
      >
        <span className="relative h-[34px] w-[22px] rounded-xl border-2 border-sage">
          <span className="absolute left-1/2 top-1.5 h-1.5 w-[3px] -translate-x-1/2 rounded bg-sage animate-wheel" />
        </span>
        Scroll
      </a>
    </section>
  );
}
