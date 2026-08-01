import LogoMark from "./LogoMark";

/* Lockup used in the nav and footer: mark + the name set in the display serif,
   echoing the logo ("Angela" italic + "Barhouch" roman). */
type Props = {
  className?: string;
  onDark?: boolean;
};

export default function Wordmark({ className = "", onDark = false }: Props) {
  return (
    <a href="#top" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Angela Barhouch — home">
      {/* the mark is 1.61:1, so size by height and let width follow */}
      <LogoMark className="h-8 w-auto shrink-0" color={onDark ? "var(--color-mint)" : "var(--color-sage)"} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.18rem] tracking-tight ${onDark ? "text-cream" : "text-forest"}`}>
          <span className="italic font-medium">Angela</span> Barhouch
        </span>
        <span className="mt-[3px] font-body text-[0.6rem] font-bold uppercase tracking-[0.2em] text-sage-ink">
          Psychotherapist · CBT · DBT
        </span>
      </span>
    </a>
  );
}
