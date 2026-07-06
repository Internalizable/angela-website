import { useEffect, useState } from "react";

/* Drives the contextual navbar: `scrolled` once past the hero lip,
   `hidden` when scrolling down (and not near the top). */
export function useScrollHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Only hide after a meaningful downward move, never near the top.
      if (y > 160 && y > last + 6) setHidden(true);
      else if (y < last - 6 || y < 160) setHidden(false);
      last = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { scrolled, hidden };
}
