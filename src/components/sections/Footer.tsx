import Wordmark from "../brand/Wordmark";
import { nav, site } from "../../site";
import { whatsappLink } from "../../lib/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-forest-deep px-[clamp(20px,5vw,64px)] pb-8 pt-[clamp(48px,7vw,80px)] text-on-dark">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-wrap justify-between gap-10 border-b border-white/10 pb-10">
          <div className="max-w-[30ch]">
            <Wordmark onDark />
            <p className="mt-4 text-[0.95rem] text-on-dark-soft">
              Licensed clinical psychologist & psychotherapist. CBT & DBT-trained care for children, teens, adults
              and parents — plus training for schools, NGOs and companies — in {site.location} and online.
            </p>
          </div>

          <div className="flex flex-wrap gap-[clamp(2rem,6vw,5rem)]">
            <nav>
              <h4 className="font-body text-[0.8rem] font-extrabold uppercase tracking-[0.16em] text-cream">Explore</h4>
              <ul className="mt-4 grid gap-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-[0.95rem] text-on-dark-soft transition-colors hover:text-mint">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h4 className="font-body text-[0.8rem] font-extrabold uppercase tracking-[0.16em] text-cream">Contact</h4>
              <ul className="mt-4 grid gap-2.5 text-[0.95rem] text-on-dark-soft">
                <li>
                  <a href={site.phoneHref} className="transition-colors hover:text-mint">
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a {...whatsappLink} className="transition-colors hover:text-mint">
                    Book on WhatsApp
                  </a>
                </li>
                <li>
                  <a href={site.emailHref} className="break-all transition-colors hover:text-mint">
                    {site.email}
                  </a>
                </li>
                <li>{site.location}</li>
                <li>{site.modes}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 pt-6 text-[0.84rem] text-on-dark-soft">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>
            Sessions are confidential and protected by professional ethical standards.
          </p>
        </div>
      </div>
    </footer>
  );
}
