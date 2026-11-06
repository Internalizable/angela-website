import SiteLayout from "../components/layout/SiteLayout";
import Hero from "../components/sections/Hero";
import Marquee from "../components/sections/Marquee";
import AtAGlance from "../components/sections/AtAGlance";
import About from "../components/sections/About";
import Audiences from "../components/sections/Audiences";
import Process from "../components/sections/Process";
import Focus from "../components/sections/Focus";
import Training from "../components/sections/Training";
import Faq from "../components/sections/Faq";
import Booking from "../components/sections/Booking";

export default function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <Marquee />
      <AtAGlance />
      <About />
      <Audiences />
      <Process />
      <Focus />
      <Training />
      <Faq />
      <Booking />
    </SiteLayout>
  );
}
