/* Animated line icons for the "Who I work with" cards, replacing the emoji
   glyphs that used to sit in those tiles. Same house style as ui/Icon.tsx —
   24-box, currentColor stroke — so each one takes its colour from the card.

   Motion is CSS-only: one gentle idle loop per icon, applied to an inner <g>
   so the wrapper stays free for the card's hover transform. Every keyframe
   starts and ends at rest, which means the global prefers-reduced-motion rule
   (animation-duration: 0.001ms) freezes them neutral rather than mid-tilt. */
import type { SVGProps } from "react";
import type { AudienceIconName } from "../../site";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

/* Children — a balloon drifting on its string. */
const Balloon = (p: IconProps) => (
  <Base {...p}>
    <g className="animate-icon-bob">
      <circle cx="12" cy="8" r="5.4" />
      <path d="M10.6 12.9 12 14.6l1.4-1.7" />
      <path d="M12 14.6c0 1.9-2 2.2-2 3.7 0 1.1 1 1.8 2 2.1" />
    </g>
  </Base>
);

/* Teens & adolescents — headphones, the ear cups pulsing off-beat. */
const Headphones = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 14.4v-2.2a7 7 0 0 1 14 0v2.2" />
    <g className="origin-center animate-icon-beat [transform-box:fill-box]">
      <rect x="2.6" y="13" width="4.4" height="6.4" rx="2.2" />
    </g>
    <g className="origin-center animate-icon-beat [animation-delay:-1.2s] [transform-box:fill-box]">
      <rect x="17" y="13" width="4.4" height="6.4" rx="2.2" />
    </g>
  </Base>
);

/* Adults — a sprout, each leaf swaying out of phase with the other. */
const Sprout = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21v-8.4" />
    <g className="origin-bottom-left animate-icon-sway [transform-box:fill-box]">
      <path d="M12 12.6c0-3.6 2.4-6.1 6-6.6.4 3.9-2 6.6-6 6.6Z" />
    </g>
    <g className="origin-bottom-right animate-icon-sway [animation-delay:-2.2s] [transform-box:fill-box]">
      <path d="M12 15.6c-3.2 0-5.2-2-5.4-5 3.2.3 5.4 2.2 5.4 5Z" />
    </g>
  </Base>
);

/* Parents — a grown-up and a child, with a heartbeat between them. */
const Family = (p: IconProps) => (
  <Base {...p}>
    <circle cx="7.5" cy="7.6" r="2.6" />
    <path d="M3 20c0-3.4 2-5.4 4.5-5.4s4.5 2 4.5 5.4" />
    <circle cx="16.5" cy="11.6" r="2.1" />
    <path d="M13 20c0-2.5 1.5-3.9 3.5-3.9s3.5 1.4 3.5 3.9" />
    <g className="origin-center animate-icon-beat [transform-box:fill-box]">
      <path d="M17.6 4.3c.5-1 2-.9 2 .4 0 1.1-1.4 1.9-2 2.2-.6-.3-2-1.1-2-2.2 0-1.3 1.5-1.4 2-.4Z" />
    </g>
  </Base>
);

/* Corporate & businesses — a briefcase on the move. */
const Briefcase = (p: IconProps) => (
  <Base {...p}>
    <g className="animate-icon-lift">
      <path d="M9 8.6V7a1.6 1.6 0 0 1 1.6-1.6h2.8A1.6 1.6 0 0 1 15 7v1.6" />
      <rect x="2.8" y="8.6" width="18.4" height="11" rx="2.6" />
      <path d="M2.8 13.2h18.4" />
      <rect x="10.2" y="11.6" width="3.6" height="3.2" rx="1.2" />
    </g>
  </Base>
);

/* NGOs & training — a mortarboard with a swinging tassel. */
const GradCap = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4.6 2.6 9.2 12 13.8l9.4-4.6L12 4.6Z" />
    <path d="M6.4 11v4.6c0 1.6 2.5 2.7 5.6 2.7s5.6-1.1 5.6-2.7V11" />
    <g className="origin-top animate-icon-swing [transform-box:fill-box]">
      <path d="M19.6 10.4v3.4" />
      <circle cx="19.6" cy="15.1" r="1.2" />
    </g>
  </Base>
);

const icons: Record<AudienceIconName, (p: IconProps) => React.ReactElement> = {
  children: Balloon,
  teens: Headphones,
  adults: Sprout,
  parents: Family,
  work: Briefcase,
  orgs: GradCap,
};

export default function AudienceIcon({ name, ...rest }: IconProps & { name: AudienceIconName }) {
  const Glyph = icons[name];
  return <Glyph {...rest} />;
}
