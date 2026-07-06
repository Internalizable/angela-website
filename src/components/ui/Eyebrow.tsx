import type { ReactNode } from "react";

/* Small tracked label that precedes section titles. The leading rule
   encodes "a new movement begins here". */
export default function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={
        "inline-flex items-center gap-2.5 font-body text-[0.74rem] font-bold uppercase " +
        "tracking-[0.22em] text-sage-ink " +
        className
      }
    >
      <span className="h-0.5 w-6 rounded bg-current opacity-60" aria-hidden="true" />
      {children}
    </span>
  );
}
