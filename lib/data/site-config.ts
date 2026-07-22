import type { SiteConfig } from "../types/site-config";

// [PLACEHOLDER] Config text and contact email placeholder are ready for CMS replacement.
export const siteConfigData: SiteConfig = {
  id: "site-config-pragolem",
  slug: "site-config",
  locale: "global",
  attributes: {
    siteName: "Pragolem Tours",
    tagline: {
      en: "Made with love by two guides who live Prague every day.",
      fr: "Fait avec amour par deux guides qui vivent Prague au quotidien.",
    },
    contact: {
      phone: "+420 605 513 399",
      whatsapp: "+420 605 513 399",
      email: "info@pragolem.com",
      preferredContact: "whatsapp",
    },
    socialLinks: [
      {
        network: "instagram",
        handle: "@pragolem",
        url: "https://instagram.com/pragolem",
      },
      {
        network: "facebook",
        url: "https://facebook.com/profile.php?id=61576684114303",
      },     {
        network: "whatsapp",
        url: "https://wa.me/420605513399",
      },
    ],
    bookingNotice: {
      en: "[PLACEHOLDER] Booking confirmation details will be sent by email or WhatsApp.",
      fr: "[PLACEHOLDER] Les détails de confirmation sont envoyés par email ou WhatsApp.",
    },
  },
  relationships: {},
};
