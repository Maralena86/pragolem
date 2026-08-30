import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getFAQItems } from "@/lib/api/faq";
import { getGuideBySlug } from "@/lib/api/guides";
import { getReviews } from "@/lib/api/reviews";
import { getSiteConfig } from "@/lib/api/site-config";
import { getAllTourSlugs, getTourBySlug, getTours } from "@/lib/api/tours";
import { getSiteUrl } from "@/lib/env";
import {
	buildTourUrl,
	getAlternateLocale,
	getLocalizedToursPath,
	toAbsoluteAssetUrl,
	toLocaleCode,
} from "@/lib/helpers/page-helpers";
import type { LocaleCode } from "@/lib/types/common";
import type { FAQCategory } from "@/lib/types/faq";
import type { Review } from "@/lib/types/review";
import type { Tour } from "@/lib/types/tour";
import { TourBreadcrumb } from "./tour-breadcrumb";
import { TourDescriptionSection } from "./tour-description-section";
import { TourFaqSection } from "./tour-faq-section";
import { TourGuideSection } from "./tour-guide-section";
import { TourHeroSection } from "./tour-hero-section";
import { TourItinerarySection } from "./tour-itinerary-section";
import { TourPracticalSection } from "./tour-practical-section";
import { TourPricingSection } from "./tour-pricing-section";
import { TourRelatedSection } from "./tour-related-section";
import { TourReviewsSection } from "./tour-reviews-section";

/**
 * Selects the most relevant FAQ category for the tour format so the FAQ section stays contextual.
 */
function getFaqCategoryForTour(tour: Tour): FAQCategory {
	return tour.attributes.priceType === "paid" ? "private-tours" : "free-tours";
}

/**
 * Splits long marketing copy into readable paragraphs using blank-line separators.
 */
function splitParagraphs(content: string): string[] {
	return content
		.split(/\n\s*\n/u)
		.map((paragraph) => paragraph.trim())
		.filter(Boolean);
}

/**
 * Computes a tour-local aggregate rating from the currently loaded reviews.
 */
function getTourAggregateRating(reviews: Review[]): {
	ratingValue: number;
	reviewCount: number;
} {
	if (reviews.length === 0) {
		return { ratingValue: 0, reviewCount: 0 };
	}

	const total = reviews.reduce(
		(sum, review) => sum + review.attributes.rating,
		0,
	);
	return {
		ratingValue: Number((total / reviews.length).toFixed(1)),
		reviewCount: reviews.length,
	};
}

/**
 * Generates all static locale + slug combinations so every localized tour detail page is pre-rendered.
 */
export async function generateStaticParams(): Promise<
	Array<{ locale: LocaleCode; slug: string }>
> {
	return getAllTourSlugs();
}

/**
 * Generates per-tour metadata including locale-aware canonical/hreflang URLs and social preview data.
 */
export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
	const { locale, slug } = await params;
	const localeCode = toLocaleCode(locale);

	const [tour, siteConfig, t] = await Promise.all([
		getTourBySlug(slug, localeCode),
		getSiteConfig(),
		getTranslations({ locale: localeCode, namespace: "TourPage.meta" }),
	]);

	if (!tour) {
		return {
			title: t("notFoundTitle"),
			description: t("notFoundDescription"),
			robots: {
				index: false,
				follow: false,
			},
		};
	}

	const siteUrl = getSiteUrl();
	const canonical = buildTourUrl(siteUrl, localeCode, tour.slug[localeCode]);
	const enUrl = buildTourUrl(siteUrl, "en", tour.slug.en);
	const frUrl = buildTourUrl(siteUrl, "fr", tour.slug.fr);
	const ogImage = toAbsoluteAssetUrl(siteUrl, tour.attributes.seo.ogImage);

	return {
		title: tour.attributes.seo.metaTitle,
		description: tour.attributes.seo.metaDescription,
		keywords: tour.attributes.seo.keywords,
		alternates: {
			canonical,
			languages: {
				en: enUrl,
				fr: frUrl,
			},
		},
		openGraph: {
			title: tour.attributes.seo.metaTitle,
			description: tour.attributes.seo.metaDescription,
			url: canonical,
			siteName: siteConfig.attributes.siteName,
			locale: localeCode === "fr" ? "fr_FR" : "en_US",
			type: "website",
			images: [
				{
					url: ogImage,
					alt: tour.attributes.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: tour.attributes.seo.metaTitle,
			description: tour.attributes.seo.metaDescription,
			images: [ogImage],
		},
	};
}

/**
 * Renders the localized tour detail page with structured content sections and SEO schema.
 */
export default async function TourDetailPage({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}) {
	const { locale, slug } = await params;
	const localeCode = toLocaleCode(locale);
	setRequestLocale(localeCode);

	const [tour, siteConfig, t] = await Promise.all([
		getTourBySlug(slug, localeCode),
		getSiteConfig(),
		getTranslations({ locale: localeCode, namespace: "TourPage" }),
	]);

	if (!tour) {
		notFound();
	}

	const [guides, allTours, reviews, faqItems] = await Promise.all([
		Promise.all(
			tour.relationships.guide.data.map((g) =>
				getGuideBySlug(g.slug!, localeCode),
			),
		),
		getTours(localeCode),
		getReviews(localeCode, tour.slug[localeCode]),
		getFAQItems(localeCode, getFaqCategoryForTour(tour)),
	]);

	const relatedToursBySlug = new Map(
		allTours.map((candidate) => [candidate.slug[localeCode], candidate]),
	);
	const relatedTours = tour.relationships.relatedTours.data
		.map((ref) => ref.slug && relatedToursBySlug.get(ref.slug))
		.filter((candidate): candidate is Tour => Boolean(candidate));
	const featuredReviews = reviews
		.toSorted(
			(a, b) =>
				Number(b.attributes.isRealReview) - Number(a.attributes.isRealReview),
		)
		.slice(0, 4);
	const itineraryStops = tour.attributes.itinerary.toSorted(
		(a, b) => a.order - b.order,
	);
	const longDescriptionParagraphs = splitParagraphs(
		tour.attributes.longDescription,
	);
	const faqPreview = faqItems.slice(0, 6);
	const aggregate = getTourAggregateRating(reviews);
	const alternateLocale = getAlternateLocale(localeCode);
	const tourAbsoluteUrl = buildTourUrl(
		getSiteUrl(),
		localeCode,
		tour.slug[localeCode],
	);
	const homeAbsoluteUrl = `${getSiteUrl()}/${localeCode}`;
	const toursAbsoluteUrl = `${homeAbsoluteUrl}${getLocalizedToursPath(localeCode)}`;

	const touristTripSchema = {
		"@context": "https://schema.org",
		"@type": "TouristTrip",
		name: tour.attributes.title,
		description: tour.attributes.shortDescription,
		url: tourAbsoluteUrl,
		inLanguage: localeCode,
		image: [
			toAbsoluteAssetUrl(getSiteUrl(), tour.attributes.heroImage.url),
			toAbsoluteAssetUrl(getSiteUrl(), tour.attributes.seo.ogImage),
		],
		touristType: t("schema.touristType"),
		provider: {
			"@type": "TravelAgency",
			name: siteConfig.attributes.siteName,
			url: getSiteUrl(),
		},
		location: {
			"@type": "Place",
			name: tour.attributes.meetingPoint.address,
			description: tour.attributes.meetingPoint.description,
			geo: {
				"@type": "GeoCoordinates",
				latitude: tour.attributes.meetingPoint.latitude,
				longitude: tour.attributes.meetingPoint.longitude,
			},
		},
		itinerary: {
			"@type": "ItemList",
			itemListElement: itineraryStops.map((stop) => ({
				"@type": "ListItem",
				position: stop.order,
				item: {
					"@type": "TouristAttraction",
					name: stop.name,
					description: stop.description,
				},
			})),
		},
		offers:
			tour.attributes.priceType === "free"
				? {
						"@type": "Offer",
						price: "0",
						priceCurrency: "EUR",
						availability: "https://schema.org/InStock",
						description: t("pricing.freeSchemaOffer"),
					}
				: undefined,
	};

	const breadcrumbSchema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: t("breadcrumbs.home"),
				item: homeAbsoluteUrl,
			},
			{
				"@type": "ListItem",
				position: 2,
				name: t("breadcrumbs.tours"),
				item: toursAbsoluteUrl,
			},
			{
				"@type": "ListItem",
				position: 3,
				name: tour.attributes.title,
				item: tourAbsoluteUrl,
			},
		],
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
			/>

			<main
				id="main-content"
				className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 sm:py-12"
			>
				<TourBreadcrumb t={t} tourTitle={tour.attributes.title} />
				<TourHeroSection t={t} tour={tour} alternateLocale={alternateLocale} />
				<TourDescriptionSection t={t} paragraphs={longDescriptionParagraphs} />
				<TourItinerarySection t={t} stops={itineraryStops} />
				<TourPracticalSection t={t} tour={tour} />
				<TourPricingSection t={t} tour={tour} />
				<TourGuideSection t={t} guides={guides} />
				<TourReviewsSection
					t={t}
					featuredReviews={featuredReviews}
					aggregate={aggregate}
				/>
				<TourRelatedSection
					t={t}
					relatedTours={relatedTours}
					localeCode={localeCode}
				/>
				<TourFaqSection t={t} faqPreview={faqPreview} />
			</main>
		</>
	);
}
