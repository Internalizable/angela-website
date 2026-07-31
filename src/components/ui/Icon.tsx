/* A small, tree-shakeable set of line icons. Stroke uses currentColor so
   each icon inherits text colour from its Tailwind context. */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 24, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
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

export const ArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const Phone = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L19 12l3 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 1-2Z" />
  </Base>
);

export const Pin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Base>
);

export const Screen = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </Base>
);

export const Calendar = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 3v4M16 3v4" />
  </Base>
);

export const Shield = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z" />
    <path d="M9 12l2 2 4-4" />
  </Base>
);

export const Spark = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
  </Base>
);

export const Compass = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5Z" />
  </Base>
);

export const Heart = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 20s-7-4.5-7-9.5A4 4 0 0 1 12 7a4 4 0 0 1 7 3.5C19 15.5 12 20 12 20Z" />
  </Base>
);

/* WhatsApp glyph — solid mark rather than a line icon, so it stays
   recognisable at button size. */
export const WhatsApp = ({ size = 24, ...rest }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...rest}>
    <path d="M12.04 2a9.87 9.87 0 0 0-8.4 15.1L2 22l5.05-1.6A9.87 9.87 0 1 0 12.04 2Zm0 1.9a7.97 7.97 0 1 1-4.06 14.83l-.29-.17-3 .95.96-2.92-.19-.3A7.97 7.97 0 0 1 12.04 3.9Zm-3.5 3.7c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.6c.13.17 1.76 2.8 4.34 3.82 2.14.84 2.58.67 3.05.63.46-.05 1.5-.61 1.71-1.2.21-.6.21-1.1.15-1.2-.07-.11-.24-.17-.5-.3-.25-.12-1.5-.74-1.73-.82-.23-.09-.4-.13-.57.12-.17.26-.65.83-.8 1-.14.16-.29.19-.54.06-.25-.12-1.07-.39-2.04-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.3.38-.44.12-.15.16-.25.25-.42.08-.17.04-.32-.02-.44-.06-.13-.56-1.38-.79-1.88-.19-.42-.38-.4-.53-.4l-.44-.01Z" />
  </svg>
);

export const Clock = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </Base>
);

export const Globe = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
  </Base>
);

export const Leaf = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 20C4 11 11 4 20 4c0 9-7 16-16 16Z" />
    <path d="M4 20 14 10" />
  </Base>
);
