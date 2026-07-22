import { reviewsData } from "../data/reviews";
import type { LocaleCode } from "../types/common";
import type { Review } from "../types/review";

// Replace these implementations with Strapi REST/GraphQL calls when CMS is connected.
export async function getReviews(locale: LocaleCode, tourSlug?: string): Promise<Review[]> {
  const localized = reviewsData.filter((review) => review.locale === locale);

  if (!tourSlug) {
    return localized;
  }

  return localized.filter((review) => review.attributes.tourSlug === tourSlug);
}

// Replace this with Strapi aggregate query once reviews are in CMS.
export async function getAggregateRating(
  locale?: LocaleCode,
): Promise<{ ratingValue: number; reviewCount: number }> {
  const source = locale
    ? reviewsData.filter((review) => review.locale === locale)
    : reviewsData;

  if (source.length === 0) {
    return { ratingValue: 0, reviewCount: 0 };
  }

  const total = source.reduce((sum, review) => sum + review.attributes.rating, 0);

  return {
    ratingValue: Number((total / source.length).toFixed(1)),
    reviewCount: source.length,
  };
}
