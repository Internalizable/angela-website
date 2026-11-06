import SiteLayout from "../components/layout/SiteLayout";
import BookingBand from "../components/ui/BookingBand";
import { footerGroups } from "../site";

export default function NotFoundPage() {
  return (
    <SiteLayout>
      <section className="bg-paper px-[clamp(20px,5vw,64px)] pb-20 pt-36">
        <div className="mx-auto w-full max-w-[1200px]">
          <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] font-semibold">This page doesn't exist.</h1>
          <p className="mt-4 max-w-[52ch] text-[1.08rem] text-ink-soft">
            The link may be old or mistyped. You can head to the{" "}
            <a href="/" className="font-semibold text-sage-ink underline underline-offset-2">
              homepage
            </a>{" "}
            or pick a topic below.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="font-body text-[0.8rem] font-extrabold uppercase tracking-[0.16em] text-forest">
                  {group.title}
                </h2>
                <ul className="mt-3 grid gap-2">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="text-[0.96rem] text-ink-soft hover:text-forest">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <BookingBand />
    </SiteLayout>
  );
}
