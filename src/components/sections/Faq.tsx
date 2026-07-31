import { Section, SectionHead } from "../ui/Section";
import Reveal from "../ui/Reveal";
import { faqs } from "../../site";

/* Native <details> rather than a JS accordion: the answers stay in the
   prerendered HTML and remain readable with scripting disabled, which is
   what search and AI crawlers actually parse. */
export default function Faq() {
  return (
    <Section id="faq" className="bg-cream">
      <SectionHead
        eyebrow="Questions"
        title={
          <>
            The things people ask <span className="italic font-medium text-sage">before booking</span>.
          </>
        }
        intro="Straight answers on fees, confidentiality, how sessions run, and what happens first."
      />

      <div className="grid gap-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={Math.min(i, 5) * 60}>
            <details className="group rounded-[20px] bg-card px-6 py-5 shadow-soft">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <h3 className="text-[1.05rem] font-semibold text-forest">{f.q}</h3>
                <span
                  aria-hidden="true"
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-tint-adults text-sage-ink transition-transform duration-300 ease-spring group-open:rotate-45"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 max-w-[72ch] text-[0.98rem] text-ink-soft">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>

      {/* Outbound citations to recognised clinical authorities. Google's
          quality raters check health content against bodies like the APA and
          NIMH, and linking to them is a trust signal rather than a leak. */}
      <Reveal delay={120}>
        <p className="mt-8 text-[0.9rem] text-ink-mute">
          Independent reading on these therapies from clinical authorities:{" "}
          <a
            className="font-semibold text-sage-ink underline underline-offset-2 hover:text-forest"
            href="https://www.apa.org/ptsd-guideline/patients-and-families/cognitive-behavioral"
            target="_blank"
            rel="noopener noreferrer"
          >
            APA on CBT
          </a>
          ,{" "}
          <a
            className="font-semibold text-sage-ink underline underline-offset-2 hover:text-forest"
            href="https://www.apa.org/topics/psychotherapy/dialectical-behavior-therapy"
            target="_blank"
            rel="noopener noreferrer"
          >
            APA on DBT
          </a>
          , and{" "}
          <a
            className="font-semibold text-sage-ink underline underline-offset-2 hover:text-forest"
            href="https://www.nimh.nih.gov/health/topics/psychotherapies"
            target="_blank"
            rel="noopener noreferrer"
          >
            NIMH on psychotherapies
          </a>
          . This site is not a substitute for individual clinical assessment.
        </p>
      </Reveal>
    </Section>
  );
}
