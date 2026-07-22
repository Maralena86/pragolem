import type { LocaleCode } from "@/lib/types/common";

/**
 * Converts a route locale segment into a supported locale code.
 * Any unsupported locale safely falls back to English so metadata and rendering stay deterministic.
 */
export function toLocaleCode(locale: string): LocaleCode {
  return locale === "fr" ? "fr" : "en";
}

/**
 * Removes trailing slashes from domain strings to prevent malformed absolute URLs
 * when page-specific path segments are appended.
 */
export function normalizeDomain(domain: string): string {
  return domain.endsWith("/") ? domain.slice(0, -1) : domain;
}

/**
 * Returns the opposite locale so pages can surface a direct cross-link to their translated version.
 */
export function getAlternateLocale(locale: LocaleCode): LocaleCode {
  return locale === "fr" ? "en" : "fr";
}

/**
 * Returns the localized pathname segment for the tours index route.
 */
export function getLocalizedToursPath(locale: LocaleCode): string {
  return locale === "fr" ? "/visites" : "/tours";
}

/**
 * Returns the localized pathname segment for the blog index route.
 * The segment is currently shared across locales but centralized to keep future path localization safe.
 */
export function getLocalizedBlogPath(_locale: LocaleCode): string {
  return "/blog";
}

/**
 * Builds an absolute URL for a localized tour detail page using the locale-aware tours segment.
 */
export function buildTourUrl(domain: string, locale: LocaleCode, slug: string): string {
  return `${normalizeDomain(domain)}/${locale}${getLocalizedToursPath(locale)}/${slug}`;
}

/**
 * Builds an absolute URL for a localized blog index page.
 */
export function buildBlogIndexUrl(domain: string, locale: LocaleCode): string {
  return `${normalizeDomain(domain)}/${locale}${getLocalizedBlogPath(locale)}`;
}

/**
 * Builds a tel URI from the configured phone number by stripping non-digit characters except "+".
 */
export function buildPhoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/**
 * Formats an ISO date string using locale-aware formatting so dates read naturally for EN/FR visitors.
 */
export function formatPublishedDate(dateIso: string, locale: LocaleCode): string {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    dateStyle: "long",
  }).format(new Date(dateIso));
}

/**
 * Converts a relative asset path to an absolute URL while preserving already-absolute sources.
 */
export function toAbsoluteAssetUrl(domain: string, assetUrl: string): string {
  if (assetUrl.startsWith("https://") || assetUrl.startsWith("http://")) {
    return assetUrl;
  }

  return `${normalizeDomain(domain)}${assetUrl.startsWith("/") ? assetUrl : `/${assetUrl}`}`;
}
