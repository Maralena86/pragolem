import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getSiteConfig } from "@/lib/api/site-config";
import { getTours } from "@/lib/api/tours";
import { getSiteUrl } from "@/lib/env";
import { getLocalizedToursPath, toLocaleCode } from "@/lib/helpers/page-helpers";
import ToursHeroSection from "./tours-hero-section";
import ToursGridSection from "./tours-grid-section";
import ToursCtaSection from "./tours-cta-section";

/**
 * Builds localized metadata for the tours index page with canonical and hreflang links.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeCode = toLocaleCode(locale);

  const [t, siteConfig] = await Promise.all([
    getTranslations({ locale: localeCode, namespace: "ToursIndexPage.meta" }),
    getSiteConfig(),
  ]);

  const domain = getSiteUrl();
  const canonical = `${domain}/${localeCode}${getLocalizedToursPath(localeCode)}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        en: `${domain}/en/tours`,
        fr: `${domain}/fr/visites`,
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
 * Renders the localized tours index page showing all available walking tours
 * with summary cards and a conversion CTA section.
 */
export default async function ToursIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeCode = toLocaleCode(locale);
  setRequestLocale(localeCode);

  const [t, tours] = await Promise.all([
    getTranslations("ToursIndexPage"),
    getTours(localeCode),
  ]);

  return (
    <main id="main-content" className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-12">
      <ToursHeroSection t={t} />
      <ToursGridSection t={t} tours={tours} localeCode={localeCode} />
      <ToursCtaSection t={t} />
    </main>
  );
}
