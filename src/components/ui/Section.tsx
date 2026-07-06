import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

/* A page section with consistent rhythm. Optional header (eyebrow + title +
   intro) keeps every section's masthead structurally identical. */
type Props = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, className = "", children }: Props) {
  return (
    <section id={id} className={`relative py-[clamp(72px,11vw,140px)] ${className}`}>
      <div className="mx-auto w-full max-w-[1200px] px-[clamp(20px,5vw,64px)]">{children}</div>
    </section>
  );
}

type HeadProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
  tone?: "default" | "onDark";
};

export function SectionHead({ eyebrow, title, intro, className = "", tone = "default" }: HeadProps) {
  return (
    <Reveal as="header" className={`mb-[clamp(36px,5vw,60px)] max-w-[640px] ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-2 text-[clamp(2rem,5vw,3.4rem)] font-semibold">{title}</h2>
      {intro && (
        <p className={`mt-[1.1rem] text-[1.08rem] ${tone === "onDark" ? "text-on-dark-soft" : "text-ink-soft"}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
