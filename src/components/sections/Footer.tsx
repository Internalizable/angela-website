import Wordmark from "../brand/Wordmark";
import { footerGroups, paths, site } from "../../site";
import { whatsappLink } from "../../lib/whatsapp";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;
const headingClass = "font-body text-[0.8rem] font-extrabold uppercase tracking-[0.16em] text-cream";
const linkClass = "transition-colors hover:text-mint";

export default function Footer() {
  return (
    <footer className="bg-forest-deep px-[clamp(20px,5vw,64px)] pb-8 pt-[clamp(48px,7vw,80px)] text-on-dark">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)]">
          <div className="max-w-[34ch]">
            <Wordmark onDark />
            <p className="mt-4 text-[0.95rem] text-on-dark-soft">
              Licensed clinical psychologist & psychotherapist. CBT & DBT-trained care for children, teens, adults
              and parents — plus training for schools, NGOs and companies — in {site.location} and online.
            </p>
            <ul className="mt-5 grid gap-2 text-[0.95rem] text-on-dark-soft">
              <li>
                <a href={site.phoneHref} className={linkClass}>
                  {site.phone}
                </a>
              </li>
              <li>
                <a {...whatsappLink} className={linkClass}>
                  Book on WhatsApp
                </a>
              </li>
              <li>
                <a href={site.emailHref} className={`break-all ${linkClass}`}>
                  {site.email}
                </a>
              </li>
              <li>
                {site.address.display}
                <br />
                {site.address.area}, Lebanon
              </li>
              <li>{site.modes}</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {footerGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h3 className={headingClass}>{group.title}</h3>
                <ul className="mt-4 grid gap-2.5">
                  {group.links.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} className={`text-[0.95rem] text-on-dark-soft ${linkClass}`}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/10 py-5 text-[0.88rem] text-on-dark-soft">
          <span>
            Licence no. {site.licence.number},{" "}
            <a href={site.licence.mophListUrl} {...external} className={`underline underline-offset-2 ${linkClass}`}>
              Ministry of Public Health
            </a>
          </span>
          <a href={site.licence.orderProfileUrl} {...external} className={`underline underline-offset-2 ${linkClass}`}>
            {site.licence.orderName}
          </a>
          <a href={site.profiles[1]} {...external} className={`underline underline-offset-2 ${linkClass}`}>
            AUB profile
          </a>
          <a href={site.profiles[2]} {...external} className={`underline underline-offset-2 ${linkClass}`}>
            LinkedIn
          </a>
          <a href={site.profiles[3]} {...external} className={`underline underline-offset-2 ${linkClass}`}>
            Instagram
          </a>
          <a href={paths.arabic} lang="ar" hrefLang="ar" className={`underline underline-offset-2 ${linkClass}`}>
            العربية
          </a>
        </div>

        <div className="flex flex-wrap justify-between gap-4 pt-6 text-[0.84rem] text-on-dark-soft">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Sessions are confidential and protected by professional ethical standards.</p>
        </div>
      </div>
    </footer>
  );
}
