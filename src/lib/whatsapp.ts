/* Booking runs through Angela's WhatsApp Business chat — there is no
   online scheduler and no free intro call. Every CTA spreads these props
   so the link, target and rel stay identical across the site. */
import { site } from "../site";

export const whatsappLink = {
  href: site.whatsappUrl,
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
