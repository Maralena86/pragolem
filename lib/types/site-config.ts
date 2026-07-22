import type { ContentLocale, StrapiMeta } from "./common";

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  preferredContact: "whatsapp" | "email" | "phone";
}

export interface SocialLink {
  network: "instagram" | "facebook" | "whatsapp";
  handle?: string;
  url: string;
}

export interface SiteConfigAttributes extends StrapiMeta {
  siteName: string;
  tagline: Record<"en" | "fr", string>;
  contact: ContactInfo;
  socialLinks: SocialLink[];
  bookingNotice: Record<"en" | "fr", string>;
}

export interface SiteConfig {
  id: string;
  slug: string;
  locale: ContentLocale;
  attributes: SiteConfigAttributes;
  relationships: Record<string, never>;
}
