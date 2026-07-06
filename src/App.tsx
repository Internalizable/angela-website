import Nav from "./components/sections/Nav";
import Hero from "./components/sections/Hero";
import Marquee from "./components/sections/Marquee";
import About from "./components/sections/About";
import Audiences from "./components/sections/Audiences";
import Process from "./components/sections/Process";
import Focus from "./components/sections/Focus";
import Booking from "./components/sections/Booking";
import Footer from "./components/sections/Footer";

export default function App() {
  return (
    <>
      <a
        href="#book"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-4 focus:py-2 focus:text-on-dark"
      >
        Skip to booking
      </a>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Audiences />
        <Process />
        <Focus />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
