import Wordmark from "../brand/Wordmark";
import Button from "../ui/Button";
import { WhatsApp } from "../ui/Icon";
import { useScrollHeader } from "../../hooks/useScrollHeader";
import { nav, site } from "../../site";
import { whatsappLink } from "../../lib/whatsapp";

/* Contextual header: solidifies on scroll, hides on the way down,
   returns the moment you scroll back up. */
export default function Nav() {
  const { scrolled, hidden } = useScrollHeader();

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 flex justify-center px-[clamp(20px,5vw,64px)] py-3.5",
        "transition-[transform,background-color,box-shadow] duration-500 ease-soft",
        hidden ? "-translate-y-[110%]" : "translate-y-0",
        scrolled
          ? "bg-paper/80 shadow-[0_1px_0_rgba(46,70,54,0.08)] backdrop-blur-md backdrop-saturate-150"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="flex w-full max-w-[1200px] items-center justify-between gap-4">
        <Wordmark />

        <ul className="hidden items-center gap-[clamp(1rem,2.4vw,2.2rem)] lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group relative whitespace-nowrap py-1 text-[0.95rem] font-semibold text-ink-soft transition-colors hover:text-forest"
              >
                {item.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded bg-sage transition-transform duration-300 ease-soft group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href={site.phoneHref} className="hidden text-[0.95rem] font-semibold text-forest tabular-nums lg:inline">
            {site.phone}
          </a>
          <Button as="a" {...whatsappLink} aria-label="Book a session with Angela on WhatsApp">
            <WhatsApp size={18} />
            Book<span className="hidden sm:inline">&nbsp;a session</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}
