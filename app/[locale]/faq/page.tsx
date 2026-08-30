import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getFAQItems } from "@/lib/api/faq";
import { getSiteConfig } from "@/lib/api/site-config";
import { getSiteUrl } from "@/lib/env";
import { toLocaleCode } from "@/lib/helpers/page-helpers";
import type { FAQCategory, FAQItem } from "@/lib/types/faq";
import { FaqHeroSection } from "./faq-hero-section";
import { FaqAccordionSection } from "./faq-accordion-section";
import { FaqCtaSection } from "./faq-cta-section";

const FAQ_CATEGORY_ORDER: FAQCategory[] = ["walking-tours", "tours", "private-tours", "pragolem"];

/**
 * Groups FAQ items by category using a stable category order.
 * The output preserves each category's item ordering from the API layer.
 */
function groupFaqItemsByCategory(items: FAQItem[]): Array<{ category: FAQCategory; items: FAQItem[] }> {
  const grouped = new Map<FAQCategory, FAQItem[]>();

  for (const item of items) {
    const existing = grouped.get(item.attributes.category) ?? [];
    existing.push(item);
    grouped.set(item.attributes.category, existing);
  }

  return FAQ_CATEGORY_ORDER.filter((category) => grouped.has(category)).map((category) => ({
    category,
    items: grouped.get(category) ?? [],
  }));
}

/**
 * Builds localized metadata for the FAQ page and wires canonical + hreflang URLs.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeCode = toLocaleCode(locale);

  const [t, siteConfig] = await Promise.all([
    getTranslations({ locale: localeCode, namespace: "FaqPage.meta" }),
    getSiteConfig(),
  ]);

  const domain = getSiteUrl();
  const canonical = `${domain}/${localeCode}/faq`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        en: `${domain}/en/faq`,
        fr: `${domain}/fr/faq`,
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
 * Renders the full localized FAQ page with grouped accordion sections and
 * complete FAQPage structured data for all FAQ items in the locale.
 */
export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeCode = toLocaleCode(locale);
  setRequestLocale(localeCode);

  const [t, faqItems] = await Promise.all([getTranslations("FaqPage"), getFAQItems(localeCode)]);
  const groupedFaqItems = groupFaqItemsByCategory(faqItems);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: localeCode,
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.attributes.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.attributes.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main id="main-content" className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-12">
        <FaqHeroSection t={t} />
        <FaqAccordionSection t={t} groupedFaqItems={groupedFaqItems} />
        <FaqCtaSection t={t} />
      </main>
    </>
  );
}
