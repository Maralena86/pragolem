import enMessages from "@/messages/en.json";
import frMessages from "@/messages/fr.json";
import { getBlogPosts } from "@/lib/api/blog";
import { getTours } from "@/lib/api/tours";
import { getSiteUrl } from "@/lib/env";
import type { LocaleCode } from "@/lib/types/common";

const SUPPORTED_LOCALES: LocaleCode[] = ["en", "fr"];

const EN_MESSAGES = enMessages as Record<string, unknown>;
const FR_MESSAGES = frMessages as Record<string, unknown>;

/**
 * Represents the set of page families that participate in SEO audits and
 * sitemap generation.
 */
export type SeoPageType =
  | "home"
  | "about"
  | "booking"
  | "contact"
  | "faq"
  | "reviews"
  | "blog-index"
  | "tours-index"
  | "terms"
  | "tour-detail"
  | "blog-detail";

/**
 * Describes whether each metadata channel is implemented for an indexable page.
 */
export interface MetadataCoverage {
  canonical: boolean;
  openGraph: boolean;
  twitter: boolean;
}

/**
 * Normalized SEO entry used across sitemap generation and automated audits.
 */
export interface SeoInventoryEntry {
  id: string;
  routeGroupId: string;
  pageType: SeoPageType;
  locale: LocaleCode;
  url: string;
  alternates: Record<LocaleCode, string>;
  title: string;
  description: string;
  metadataCoverage: MetadataCoverage;
  schemas: string[];
  lastModified: Date;
}

interface StaticSeoRouteDefinition {
  id: string;
  pageType: Exclude<SeoPageType, "tour-detail" | "blog-detail">;
  pathByLocale: Record<LocaleCode, string>;
  titlePath: string;
  descriptionPath: string;
  schemas: string[];
}

const STATIC_ROUTE_DEFINITIONS: StaticSeoRouteDefinition[] = [
  {
    id: "home",
    pageType: "home",
    pathByLocale: { en: "/", fr: "/" },
    titlePath: "HomePage.meta.title",
    descriptionPath: "HomePage.meta.description",
    schemas: ["Organization", "TouristAttraction", "FAQPage"],
  },
  {
    id: "about",
    pageType: "about",
    pathByLocale: { en: "/about", fr: "/a-propos" },
    titlePath: "AboutPage.meta.title",
    descriptionPath: "AboutPage.meta.description",
    schemas: [],
  },
  {
    id: "booking",
    pageType: "booking",
    pathByLocale: { en: "/booking", fr: "/reservation" },
    titlePath: "BookingPage.meta.title",
    descriptionPath: "BookingPage.meta.description",
    schemas: [],
  },
  {
    id: "contact",
    pageType: "contact",
    pathByLocale: { en: "/contact", fr: "/contact" },
    titlePath: "ContactPage.meta.title",
    descriptionPath: "ContactPage.meta.description",
    schemas: [],
  },
  {
    id: "faq",
    pageType: "faq",
    pathByLocale: { en: "/faq", fr: "/faq" },
    titlePath: "FaqPage.meta.title",
    descriptionPath: "FaqPage.meta.description",
    schemas: ["FAQPage"],
  },
  {
    id: "reviews",
    pageType: "reviews",
    pathByLocale: { en: "/reviews", fr: "/avis" },
    titlePath: "ReviewsPage.meta.title",
    descriptionPath: "ReviewsPage.meta.description",
    schemas: ["AggregateRating"],
  },
  {
    id: "blog-index",
    pageType: "blog-index",
    pathByLocale: { en: "/blog", fr: "/blog" },
    titlePath: "BlogIndexPage.meta.title",
    descriptionPath: "BlogIndexPage.meta.description",
    schemas: [],
  },
  {
    id: "tours-index",
    pageType: "tours-index",
    pathByLocale: { en: "/tours", fr: "/visites" },
    titlePath: "ToursIndexPage.meta.title",
    descriptionPath: "ToursIndexPage.meta.description",
    schemas: [],
  },
  {
    id: "terms",
    pageType: "terms",
    pathByLocale: { en: "/terms-conditions", fr: "/conditions-generales" },
    titlePath: "TermsPage.meta.title",
    descriptionPath: "TermsPage.meta.description",
    schemas: [],
  },
];

/**
 * Declares expected metadata channel coverage by page type. The audit system
 * verifies each generated entry against this matrix to prevent SEO regressions.
 */
const METADATA_COVERAGE_BY_PAGE_TYPE: Record<SeoPageType, MetadataCoverage> = {
  home: { canonical: true, openGraph: true, twitter: true },
  about: { canonical: true, openGraph: true, twitter: true },
  booking: { canonical: true, openGraph: true, twitter: true },
  contact: { canonical: true, openGraph: true, twitter: true },
  faq: { canonical: true, openGraph: true, twitter: true },
  reviews: { canonical: true, openGraph: true, twitter: true },
  "blog-index": { canonical: true, openGraph: true, twitter: true },
  "tours-index": { canonical: true, openGraph: true, twitter: true },
  terms: { canonical: true, openGraph: true, twitter: true },
  "tour-detail": { canonical: true, openGraph: true, twitter: true },
  "blog-detail": { canonical: true, openGraph: true, twitter: true },
};

/**
 * Defines required schema coverage by page type according to the build spec.
 * Each page type listed here must implement all schema types in its array.
 */
export const REQUIRED_SCHEMAS_BY_PAGE_TYPE: Partial<Record<SeoPageType, string[]>> = {
  home: ["Organization", "TouristAttraction"],
  faq: ["FAQPage"],
  reviews: ["AggregateRating"],
  "tour-detail": ["TouristTrip", "BreadcrumbList"],
  "blog-detail": ["BlogPosting"],
};

/**
 * Declares page types that are expected to exist in the current route surface.
 * Missing types are reported as warnings rather than build-blocking errors.
 */
export const EXPECTED_PAGE_TYPES: SeoPageType[] = [
  "home",
  "tours-index",
  "about",
  "booking",
  "contact",
  "faq",
  "reviews",
  "blog-index",
  "terms",
  "tour-detail",
  "blog-detail",
];

/**
 * Removes trailing slash characters from a configured domain so absolute URL
 * concatenation produces valid canonical and alternate links.
 */
export function normalizeDomain(domain: string): string {
  return domain.endsWith("/") ? domain.slice(0, -1) : domain;
}

/**
 * Builds an absolute localized URL from domain, locale segment, and a pathname.
 * The root pathname (`/`) is collapsed so it does not generate duplicate slashes.
 */
export function buildLocalizedUrl(domain: string, locale: LocaleCode, pathname: string): string {
  const normalizedDomain = normalizeDomain(domain);

  if (pathname === "/") {
    return `${normalizedDomain}/${locale}`;
  }

  const normalizedPathname = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${normalizedDomain}/${locale}${normalizedPathname}`;
}

/**
 * Resolves a dot-delimited path within a message catalog object and returns the
 * located value when each segment exists.
 */
function getMessageValueByPath(messages: Record<string, unknown>, dottedPath: string): unknown {
  return dottedPath.split(".").reduce<unknown>((current, segment) => {
    if (typeof current !== "object" || current === null) {
      return undefined;
    }

    return (current as Record<string, unknown>)[segment];
  }, messages);
}

/**
 * Reads a localized string value from the EN/FR message catalogs and throws a
 * descriptive error when the configured path does not resolve to a string.
 */
function getLocalizedMessageString(locale: LocaleCode, dottedPath: string): string {
  const catalog = locale === "fr" ? FR_MESSAGES : EN_MESSAGES;
  const value = getMessageValueByPath(catalog, dottedPath);

  if (typeof value !== "string") {
    throw new Error(`Missing localized SEO message at path \"${dottedPath}\" for locale \"${locale}\".`);
  }

  return value;
}

/**
 * Builds an EN/FR alternates object for a localized route path definition.
 */
function buildAlternates(domain: string, pathByLocale: Record<LocaleCode, string>): Record<LocaleCode, string> {
  return {
    en: buildLocalizedUrl(domain, "en", pathByLocale.en),
    fr: buildLocalizedUrl(domain, "fr", pathByLocale.fr),
  };
}

/**
 * Creates SEO inventory entries for every static localized page by combining
 * route paths, localized metadata strings, and page-type schema expectations.
 */
function getStaticSeoEntries(domain: string): SeoInventoryEntry[] {
  const now = new Date();

  return STATIC_ROUTE_DEFINITIONS.flatMap((definition) => {
    const alternates = buildAlternates(domain, definition.pathByLocale);

    return SUPPORTED_LOCALES.map((locale) => ({
      id: `${definition.id}:${locale}`,
      routeGroupId: definition.id,
      pageType: definition.pageType,
      locale,
      url: alternates[locale],
      alternates,
      title: getLocalizedMessageString(locale, definition.titlePath),
      description: getLocalizedMessageString(locale, definition.descriptionPath),
      metadataCoverage: METADATA_COVERAGE_BY_PAGE_TYPE[definition.pageType],
      schemas: definition.schemas,
      lastModified: now,
    }));
  });
}

/**
 * Creates SEO inventory entries for localized tour detail pages using only
 * API-layer reads so sitemap and audits stay Strapi-ready.
 */
async function getTourSeoEntries(domain: string): Promise<SeoInventoryEntry[]> {
  const [enTours, frTours] = await Promise.all([getTours("en"), getTours("fr")]);

  return [...enTours, ...frTours].map((tour) => {
    const alternates = {
      en: buildLocalizedUrl(domain, "en", `/tours/${tour.slug.en}`),
      fr: buildLocalizedUrl(domain, "fr", `/visites/${tour.slug.fr}`),
    };

    return {
      id: `tour:${tour.slug.en}:${tour.locale}`,
      routeGroupId: `tour:${tour.slug.en}`,
      pageType: "tour-detail" as const,
      locale: tour.locale,
      url: alternates[tour.locale],
      alternates,
      title: tour.attributes.seo.metaTitle,
      description: tour.attributes.seo.metaDescription,
      metadataCoverage: METADATA_COVERAGE_BY_PAGE_TYPE["tour-detail"],
      schemas: ["TouristTrip", "BreadcrumbList"],
      lastModified: new Date(),
    };
  });
}

/**
 * Creates SEO inventory entries for localized blog detail pages with per-entry
 * lastModified timestamps based on content publication/update fields.
 */
async function getBlogSeoEntries(domain: string): Promise<SeoInventoryEntry[]> {
  const [enPosts, frPosts] = await Promise.all([getBlogPosts("en"), getBlogPosts("fr")]);

  return [...enPosts, ...frPosts].map((post) => {
    const alternates = {
      en: buildLocalizedUrl(domain, "en", `/blog/${post.slug.en}`),
      fr: buildLocalizedUrl(domain, "fr", `/blog/${post.slug.fr}`),
    };

    return {
      id: `blog:${post.slug.en}:${post.locale}`,
      routeGroupId: `blog:${post.slug.en}`,
      pageType: "blog-detail" as const,
      locale: post.locale,
      url: alternates[post.locale],
      alternates,
      title: post.attributes.seo.metaTitle,
      description: post.attributes.seo.metaDescription,
      metadataCoverage: METADATA_COVERAGE_BY_PAGE_TYPE["blog-detail"],
      schemas: ["BlogPosting"],
      lastModified: new Date(post.attributes.updatedAt ?? post.attributes.publishedAt),
    };
  });
}

/**
 * Generates the complete SEO inventory used by sitemap and SEO audits,
 * including static pages plus all localized tour and blog detail pages.
 */
export async function getSeoInventoryEntries(): Promise<SeoInventoryEntry[]> {
  const domain = getSiteUrl();

  const [tourEntries, blogEntries] = await Promise.all([
    getTourSeoEntries(domain),
    getBlogSeoEntries(domain),
  ]);

  return [...getStaticSeoEntries(domain), ...tourEntries, ...blogEntries];
}
