import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getSiteConfig } from "@/lib/api/site-config";
import { getSiteUrl } from "@/lib/env";
import { toLocaleCode } from "@/lib/helpers/page-helpers";
import type { LocaleCode } from "@/lib/types/common";
import TermsHeroSection from "./terms-hero-section";
import TermsContentSection from "./terms-content-section";

/**
 * Returns the localized pathname for the terms page route.
 */
function getLocalizedTermsPath(locale: LocaleCode): string {
  return locale === "fr" ? "/conditions-generales" : "/terms-conditions";
}

/**
 * Builds localized metadata for the terms page with canonical and hreflang links.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeCode = toLocaleCode(locale);

  const [t, siteConfig] = await Promise.all([
    getTranslations({ locale: localeCode, namespace: "TermsPage.meta" }),
    getSiteConfig(),
  ]);

  const domain = getSiteUrl();
  const canonical = `${domain}/${localeCode}${getLocalizedTermsPath(localeCode)}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        en: `${domain}/en/terms-conditions`,
        fr: `${domain}/fr/conditions-generales`,
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
 * Renders the localized terms and conditions page with placeholder legal
 * sections that will be replaced with real legal copy before launch.
 */
export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeCode = toLocaleCode(locale);
  setRequestLocale(localeCode);

  const t = await getTranslations("TermsPage");

  return (
    <main id="main-content" className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12">
      <TermsHeroSection t={t} />
      <TermsContentSection t={t} />
    </main>
  );
}
