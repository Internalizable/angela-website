/* The brand mark: a couch and a floor lamp — the therapy room itself.
   Two planes of depth, outlined lamp behind and filled couch in front,
   themeable via the colour props. Shapes are laid out on a shared floor
   line at y=83 so the pair reads as one scene at small sizes. */
type Props = {
  className?: string;
  lamp?: string;
  lampFill?: string;
  couch?: string;
  couchFill?: string;
  title?: string;
};

export default function LogoMark({
  className,
  lamp = "var(--color-mint)",
  lampFill = "var(--color-mint-soft)",
  couch = "var(--color-sage)",
  couchFill = "var(--color-cream)",
  title = "Angela Barhouch",
}: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={title}>
      {/* floor lamp */}
      <g
        fill="none"
        stroke={lamp}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 37 13.5 17h13L33 37Z" fill={lampFill} />
        <path d="M20 37v46" />
        <path d="M12 83h16" />
      </g>

      {/* couch — backrest, then seat over it, then arms on top */}
      <g stroke={couch} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
        <rect x="46" y="44" width="40" height="24" rx="8" fill={couchFill} />
        <rect x="38" y="60" width="56" height="18" rx="8" fill={couchFill} />
        <rect x="38" y="52" width="12" height="26" rx="6" fill={couchFill} />
        <rect x="82" y="52" width="12" height="26" rx="6" fill={couchFill} />
        <path d="M46 78v5M86 78v5" fill="none" />
      </g>
    </svg>
  );
}
