import type { ReactNode } from "react";
import Nav from "../sections/Nav";
import Footer from "../sections/Footer";

/* The frame every English page shares. Each page must include an element with
   id="book", which the skip link targets. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#book"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-4 focus:py-2 focus:text-on-dark"
      >
        Skip to booking
      </a>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
