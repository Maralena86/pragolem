import { toursData } from "../data/tours";
import type { LocaleCode } from "../types/common";
import type { Tour } from "../types/tour";

// Replace these implementations with Strapi REST/GraphQL calls when CMS is connected.
export async function getTours(locale: LocaleCode): Promise<Tour[]> {
  return toursData.filter((tour) => tour.locale === locale);
}

// Replace this lookup with Strapi filter query:
// /api/tours?locale={locale}&filters[slug][$eq]={slug}
export async function getTourBySlug(slug: string, locale: LocaleCode): Promise<Tour | null> {
  return toursData.find((tour) => tour.locale === locale && tour.slug[locale] === slug) ?? null;
}

// Used by generateStaticParams for tour pages.
export async function getAllTourSlugs(): Promise<Array<{ locale: LocaleCode; slug: string }>> {
  const seen = new Set<string>();
  const pairs: Array<{ locale: LocaleCode; slug: string }> = [];

  for (const tour of toursData) {
    for (const [locale, localizedSlug] of Object.entries(tour.slug) as Array<[
      LocaleCode,
      string,
    ]>) {
      const key = `${locale}:${localizedSlug}`;
      if (!seen.has(key)) {
        seen.add(key);
        pairs.push({ locale, slug: localizedSlug });
      }
    }
  }

  return pairs;
}
