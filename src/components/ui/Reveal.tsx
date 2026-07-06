import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/* Reveals children on first scroll into view. One responsibility: visibility.
   Honours prefers-reduced-motion via the CSS `.reveal` rules. */
type Props = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
};

export default function Reveal({ children, as, delay = 0, className = "" }: Props) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    // Safety: never leave content permanently hidden if the observer
    // can't run (unsupported, or an odd timing/headless edge case).
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const fallback = window.setTimeout(() => setShown(true), 2500);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
          window.clearTimeout(fallback);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [shown]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
