import { siteConfigData } from "../data/site-config";
import type { ContactInfo, SiteConfig } from "../types/site-config";

// Replace these implementations with Strapi REST/GraphQL calls when CMS is connected.
export async function getSiteConfig(): Promise<SiteConfig> {
  return siteConfigData;
}

// Replace this with Strapi query selecting only contact fields.
export async function getContactInfo(): Promise<ContactInfo> {
  return siteConfigData.attributes.contact;
}
