import { Section } from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import { Phone, Pin, Screen, WhatsApp, ArrowRight, Clock, Globe } from "../ui/Icon";
import { site } from "../../site";
import { whatsappLink } from "../../lib/whatsapp";
const avatar = "/angela-avatar.webp";

/* What to expect when the chat opens — sets honest expectations in place
   of a scheduler, since booking is a direct conversation with Angela. */
const steps = [
  "Tell Angela briefly who the session is for and what's going on.",
  "She'll suggest times that fit — in person in Beirut, or online.",
  "You'll get the fee, the address or video link, and what to bring.",
];

export default function Booking() {
  return (
    <Section id="book" className="[background:linear-gradient(180deg,var(--color-paper)_0%,var(--color-paper-2)_100%)]">
      <div className="grid grid-cols-1 items-stretch gap-[clamp(2rem,4vw,3.5rem)] md:grid-cols-[0.95fr_1.05fr]">
        <Reveal className="flex flex-col">
          <Eyebrow>Book a session</Eyebrow>
          <h2 className="mt-2 text-[clamp(2rem,4.6vw,3.2rem)] font-semibold">
            One message is all it <span className="italic font-medium text-sage">takes to start</span>.
          </h2>
          <p className="mt-4 max-w-[42ch] text-[1.08rem] text-ink-soft">
            Booking happens on WhatsApp, directly with Angela — no forms, no waiting room. We begin with a full first
            session, so the work starts from the very first hour.
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
            <a
              href={site.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5 rounded-[20px] bg-card p-4 shadow-soft transition-transform duration-300 ease-spring hover:translate-x-1"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-tint-kids text-sage-ink">
                <Pin size={20} />
              </span>
              <span>
                <b className="block font-bold text-forest">{site.address.display}</b>
                <span className="text-[0.9rem] text-ink-mute">
                  In-person practice · {site.address.area} · Directions
                </span>
              </span>
            </a>
            <div className="flex items-center gap-3.5 rounded-[20px] bg-card p-4 shadow-soft">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-tint-parents text-sage-ink">
                <Screen size={20} />
              </span>
              <span>
                <b className="block font-bold text-forest">Online sessions</b>
                <span className="text-[0.9rem] text-ink-mute">Secure video, anywhere</span>
              </span>
            </div>

            <div className="flex items-start gap-3.5 rounded-[20px] bg-card p-4 shadow-soft">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-tint-work text-sage-ink">
                <Clock size={20} />
              </span>
              <span>
                <b className="block font-bold text-forest">Opening hours</b>
                {site.hours.map((h) => (
                  <span key={h.label} className="block text-[0.9rem] text-ink-mute">
                    {h.label} · {h.display}
                  </span>
                ))}
                <span className="block text-[0.9rem] text-ink-mute">
                  {site.closedDays.join(" & ")} · closed
                </span>
              </span>
            </div>

            <div className="flex items-center gap-3.5 rounded-[20px] bg-card p-4 shadow-soft">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-tint-orgs text-sage-ink">
                <Globe size={20} />
              </span>
              <span>
                <b className="block font-bold text-forest">
                  {site.languages.map((l) => l.label).join(" · ")}
                </b>
                <span className="text-[0.9rem] text-ink-mute">
                  Sessions in {site.languages.length > 2 ? "any of them" : "either"}
                </span>
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex h-full flex-col justify-center rounded-[30px] bg-card p-[clamp(1.75rem,4vw,3rem)] shadow-float">
            <div className="flex items-center gap-4">
              <span className="relative shrink-0">
                <img
                  src={avatar}
                  srcSet="/angela-avatar-144.webp 144w, /angela-avatar-288.webp 288w"
                  sizes="72px"
                  alt=""
                  width={288}
                  height={288}
                  className="h-[72px] w-[72px] rounded-full bg-mint-soft object-cover"
                />
                <span className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-card text-sage-ink shadow-soft">
                  <WhatsApp size={18} />
                </span>
              </span>
              <span className="text-[0.9rem] text-ink-mute">
                You'll be messaging
                <b className="block text-[0.98rem] font-bold text-forest">{site.name}</b>
                directly — not a receptionist.
              </span>
            </div>

            <h3 className="mt-6 text-[clamp(1.5rem,3vw,2rem)] font-semibold">Message Angela on WhatsApp</h3>
            <p className="mt-3 text-ink-soft">
              Individual therapy, parent sessions, and training enquiries for schools, NGOs and companies all start in
              the same chat.
            </p>

            <ol className="mt-7 grid gap-4">
              {steps.map((step, i) => (
                <li key={step} className="flex items-start gap-3.5">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-tint-adults font-display text-[0.9rem] font-semibold text-forest">
                    {i + 1}
                  </span>
                  <span className="text-[0.98rem] text-ink-soft">{step}</span>
                </li>
              ))}
            </ol>

            <Button as="a" size="lg" className="mt-8 self-start" {...whatsappLink}>
              <WhatsApp size={19} />
              Open WhatsApp
              <ArrowRight size={18} className="transition-transform duration-300 ease-spring group-hover:translate-x-1" />
            </Button>

            <p className="mt-5 text-[0.88rem] text-ink-mute">
              Everything you share is confidential and protected by professional ethical standards.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
