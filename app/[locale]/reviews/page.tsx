import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { ReviewFilterItem } from "@/components/reviews/ReviewsFilterGrid";
import { getAggregateRating, getReviews } from "@/lib/api/reviews";
import { getSiteConfig } from "@/lib/api/site-config";
import { getTours } from "@/lib/api/tours";
import { getSiteUrl } from "@/lib/env";
import { toLocaleCode } from "@/lib/helpers/page-helpers";
import type { LocaleCode } from "@/lib/types/common";
import type { Review } from "@/lib/types/review";
import type { Tour } from "@/lib/types/tour";
import { ReviewsGridSection } from "./reviews-grid-section";
import { ReviewsHeroSection } from "./reviews-hero-section";
import { ReviewsSummarySection } from "./reviews-summary-section";

/**
 * Returns the localized pathname for the reviews index route.
 */
function getLocalizedReviewsPath(locale: LocaleCode): string {
  return locale === "fr" ? "/avis" : "/reviews";
}

/**
 * Builds a lookup table mapping locale-specific tour keys (`{locale}:{slug}`)
 * to human-readable localized tour titles for review filtering UI.
 */
function getTourTitleByKeyMap(toursByLocale: Record<LocaleCode, Tour[]>): Map<string, string> {
  const tourTitleByKey = new Map<string, string>();

  for (const [locale, tours] of Object.entries(toursByLocale) as Array<[LocaleCode, Tour[]]>) {
    for (const tour of tours) {
      tourTitleByKey.set(`${locale}:${tour.slug[locale]}`, tour.attributes.title);
    }
  }

  return tourTitleByKey;
}

/**
 * Converts raw review entities into client-friendly filter records and applies
 * deterministic ordering so review grids remain stable across renders.
 */
function getReviewFilterItems(reviews: Review[], tourTitleByKey: Map<string, string>): ReviewFilterItem[] {
  return reviews
    .toSorted((left, right) => {
      if (left.attributes.isRealReview !== right.attributes.isRealReview) {
        return Number(right.attributes.isRealReview) - Number(left.attributes.isRealReview);
      }
      if (left.attributes.rating !== right.attributes.rating) {
        return right.attributes.rating - left.attributes.rating;
      }
      return left.attributes.authorName.localeCompare(right.attributes.authorName);
    })
    .map((review) => {
      const tourSlug = review.attributes.tourSlug;
      const tourKey = tourSlug ? `${review.locale}:${tourSlug}` : null;
      const tourTitle = tourKey ? (tourTitleByKey.get(tourKey) ?? tourSlug ?? null) : null;

      return {
        id: review.id,
        locale: review.locale,
        authorName: review.attributes.authorName,
        rating: review.attributes.rating,
        text: review.attributes.text,
        source: review.attributes.source ?? "direct",
        isRealReview: review.attributes.isRealReview,
        tourKey,
        tourTitle,
      };
    });
}

/**
 * Builds localized metadata for the reviews page with canonical and hreflang links.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeCode = toLocaleCode(locale);

  const [t, siteConfig] = await Promise.all([
    getTranslations({ locale: localeCode, namespace: "ReviewsPage.meta" }),
    getSiteConfig(),
  ]);

  const domain = getSiteUrl();
  const canonical = `${domain}/${localeCode}${getLocalizedReviewsPath(localeCode)}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        en: `${domain}/en/reviews`,
        fr: `${domain}/fr/avis`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonical,
      siteName: siteConfig.attributes.siteName,
      locale: localeCode === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

/**
 * Renders the localized reviews page with a client-filterable review grid and
 * an AggregateRating schema sourced from the API layer.
 */
export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeCode = toLocaleCode(locale);
  setRequestLocale(localeCode);

  const [t, siteConfig, aggregateRating, enReviews, frReviews, enTours, frTours] = await Promise.all([
    getTranslations("ReviewsPage"),
    getSiteConfig(),
    getAggregateRating(),
    getReviews("en"),
    getReviews("fr"),
    getTours("en"),
    getTours("fr"),
  ]);

  const domain = getSiteUrl();
  const canonical = `${domain}/${localeCode}${getLocalizedReviewsPath(localeCode)}`;
  const tourTitleByKey = getTourTitleByKeyMap({ en: enTours, fr: frTours });
  const reviewItems = getReviewFilterItems([...enReviews, ...frReviews], tourTitleByKey);
  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.attributes.siteName,
    url: canonical,
    inLanguage: localeCode,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />

      <main id="main-content" className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-12">
        <ReviewsHeroSection t={t} />
        <ReviewsSummarySection t={t} ratingValue={aggregateRating.ratingValue} reviewCount={aggregateRating.reviewCount} />
        <ReviewsGridSection t={t} items={reviewItems} defaultLanguage={localeCode} />
      </main>
    </>
  );
}
