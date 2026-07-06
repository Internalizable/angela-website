/* The brand mark from the primary logo: two overlapping speech bubbles that
   together read as a couch — conversation + a safe place to sit.
   Outlined version, themeable via the `tone` props. */
type Props = {
  className?: string;
  back?: string;
  front?: string;
  dots?: string;
  title?: string;
};

export default function LogoMark({
  className,
  back = "var(--color-mint)",
  front = "var(--color-sage)",
  dots = "var(--color-forest)",
  title = "Angela Barhouch",
}: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={title}>
      {/* back bubble (couch back) */}
      <path
        d="M22 22h38a11 11 0 0 1 11 11v16a11 11 0 0 1-11 11H37l-10 9 1.6-9H22a11 11 0 0 1-11-11V33a11 11 0 0 1 11-11Z"
        fill="none"
        stroke={back}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      {/* front bubble (couch seat) */}
      <path
        d="M46 40h32a11 11 0 0 1 11 11v13a11 11 0 0 1-11 11h-7l1.6 8-8.6-8H46a11 11 0 0 1-11-11V51a11 11 0 0 1 11-11Z"
        fill="var(--color-cream)"
        stroke={front}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <circle cx="54" cy="57" r="2.6" fill={dots} />
      <circle cx="62" cy="57" r="2.6" fill={dots} />
      <circle cx="70" cy="57" r="2.6" fill={dots} />
    </svg>
  );
}
