import Button from "./Button";
import { ArrowRight, WhatsApp } from "./Icon";
import { whatsappLink } from "../../lib/whatsapp";

/* The closing call to action on inner pages, and the skip link's target. */
export default function BookingBand({
  heading = "One message is all it takes to start.",
  body = "Tell Angela who the session is for and what's going on. She'll suggest times, in person in Dekwaneh or online, and confirm the fee.",
  cta = "Book on WhatsApp",
}: {
  heading?: string;
  body?: string;
  cta?: string;
}) {
  return (
    <section id="book" className="bg-forest px-[clamp(20px,5vw,64px)] py-[clamp(56px,8vw,96px)] text-on-dark">
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-end justify-between gap-8">
        <div className="max-w-[56ch]">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold text-cream">{heading}</h2>
          <p className="mt-3 text-[1.05rem] text-on-dark-soft">{body}</p>
        </div>
        <Button as="a" variant="accent" size="lg" {...whatsappLink}>
          <WhatsApp size={19} />
          {cta}
          <ArrowRight size={18} className="transition-transform duration-300 ease-spring group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
}
