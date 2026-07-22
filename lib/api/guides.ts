import { guidesData } from "../data/guides";
import type { LocaleCode } from "../types/common";
import type { Guide } from "../types/guide";

// Replace these implementations with Strapi REST/GraphQL calls when CMS is connected.
export async function getGuides(locale: LocaleCode): Promise<Guide[]> {
  return guidesData.filter((guide) => guide.locale === locale);
}

// Replace this lookup with Strapi filter query:
// /api/guides?locale={locale}&filters[slug][$eq]={slug}
export async function getGuideBySlug(slug: string, locale: LocaleCode): Promise<Guide | null> {
  return guidesData.find((guide) => guide.locale === locale && guide.slug === slug) ?? null;
}
