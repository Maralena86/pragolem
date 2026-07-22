import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getGuides } from "@/lib/api/guides";
import { getSiteConfig } from "@/lib/api/site-config";
import { getSiteUrl } from "@/lib/env";
import { toLocaleCode } from "@/lib/helpers/page-helpers";
import type { LocaleCode } from "@/lib/types/common";
import type { Guide } from "@/lib/types/guide";
import { HeroSection } from "./hero-section";
import { StorySection } from "./story-section";
import { AboutGuidesSection } from "./about-guides-section";
import { PhilosophySection } from "./philosophy-section";
import { MediaSection } from "./media-section";

/**
 * Returns the localized pathname segment used by the About page
 * so canonical and hreflang metadata remain locale-aware.
 */
function getLocalizedAboutPath(locale: LocaleCode): string {
  return locale === "fr" ? "/a-propos" : "/about";
}

/**
 * Finds one guide by slug from the locale-filtered guide list.
 * Returning `null` for missing entries lets the page degrade gracefully
 * if a guide record is removed or temporarily unavailable in CMS.
 */
function getGuideBySlug(guides: Guide[], slug: string): Guide | null {
  return guides.find((guide) => guide.slug === slug) ?? null;
}

/**
 * Builds localized metadata for the About page, including canonical and
 * hreflang URLs derived from the configured production domain.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeCode = toLocaleCode(locale);

  const [t, siteConfig] = await Promise.all([
    getTranslations({ locale: localeCode, namespace: "AboutPage.meta" }),
    getSiteConfig(),
  ]);

  const domain = getSiteUrl();
  const canonical = `${domain}/${localeCode}${getLocalizedAboutPath(localeCode)}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        en: `${domain}/en/about`,
        fr: `${domain}/fr/a-propos`,
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
 * Renders the localized About page with company story, guide profiles,
 * operating philosophy, and a media mention callout.
 */
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeCode = toLocaleCode(locale);
  setRequestLocale(localeCode);

  const [t, guides] = await Promise.all([getTranslations("AboutPage"), getGuides(localeCode)]);
  const lucas = getGuideBySlug(guides, "lucas");
  const nathan = getGuideBySlug(guides, "nathan");
  const coreGuides = [lucas, nathan].filter((guide): guide is Guide => Boolean(guide));

  return (
    <main id="main-content" className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 sm:py-12">
      <HeroSection t={t} />
      <StorySection t={t} />
      <AboutGuidesSection t={t} guides={coreGuides} />
      <PhilosophySection t={t} />
      <MediaSection t={t} />
    </main>
  );
}
