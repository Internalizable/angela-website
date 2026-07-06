import { useEffect, useRef, useState } from "react";
import { Section } from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import { Phone, Pin, Screen, Calendar } from "../ui/Icon";
import { site } from "../../site";
import { initCalendlyInline, openCalendlyPopup } from "../../lib/calendly";

/* Inline Calendly embed. The widget script loads async, so we retry briefly
   until window.Calendly exists, then fall back to a popup button. */
function CalendlyInline() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let tries = 0;
    const id = window.setInterval(() => {
      if (initCalendlyInline(el, site.calendlyUrl)) {
        setReady(true);
        window.clearInterval(id);
      } else if (++tries > 40) {
        window.clearInterval(id);
      }
    }, 150);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-[680px] overflow-hidden rounded-[30px] bg-card shadow-float">
      <div ref={ref} className="calendly-inline-widget h-[700px] min-w-full" />
      {!ready && (
        <div className="absolute inset-0 grid place-items-center p-8 text-center">
          <div>
            <p className="text-ink-mute">Loading the calendar…</p>
            <Button className="mt-4" onClick={() => openCalendlyPopup(site.calendlyUrl)}>
              <Calendar size={18} /> Open scheduling in a window
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Booking() {
  return (
    <Section id="book" className="[background:linear-gradient(180deg,var(--color-paper)_0%,var(--color-paper-2)_100%)]">
      <div className="grid grid-cols-1 items-stretch gap-[clamp(2rem,4vw,3.5rem)] md:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="flex flex-col">
          <Eyebrow>Book a session</Eyebrow>
          <h2 className="mt-2 text-[clamp(2rem,4.6vw,3.2rem)] font-semibold">
            Pick a time that <span className="italic font-medium text-sage">works for you</span>.
          </h2>
          <p className="mt-4 max-w-[42ch] text-[1.08rem] text-ink-soft">
            Choose a slot below for a free, no-pressure intro call. We'll talk through what's going on and whether
            we're a good fit — no commitment needed.
          </p>

          <div className="mt-7 grid gap-3.5">
            <a href={site.phoneHref} className="group flex items-center gap-3.5 rounded-[20px] bg-card p-4 shadow-soft transition-transform duration-300 ease-spring hover:translate-x-1">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-tint-teens text-sage-ink">
                <Phone size={20} />
              </span>
              <span>
                <b className="block font-bold text-forest">{site.phone}</b>
                <span className="text-[0.9rem] text-ink-mute">Call or WhatsApp</span>
              </span>
            </a>
            <div className="flex items-center gap-3.5 rounded-[20px] bg-card p-4 shadow-soft">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-tint-kids text-sage-ink">
                <Pin size={20} />
              </span>
              <span>
                <b className="block font-bold text-forest">{site.location}</b>
                <span className="text-[0.9rem] text-ink-mute">In-person practice</span>
              </span>
            </div>
            <div className="flex items-center gap-3.5 rounded-[20px] bg-card p-4 shadow-soft">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-tint-parents text-sage-ink">
                <Screen size={20} />
              </span>
              <span>
                <b className="block font-bold text-forest">Online sessions</b>
                <span className="text-[0.9rem] text-ink-mute">Secure video, anywhere</span>
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <CalendlyInline />
        </Reveal>
      </div>
    </Section>
  );
}
