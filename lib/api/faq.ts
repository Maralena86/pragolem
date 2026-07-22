import { faqData } from "../data/faq";
import type { LocaleCode } from "../types/common";
import type { FAQCategory, FAQItem } from "../types/faq";

// Replace these implementations with Strapi REST/GraphQL calls when CMS is connected.
export async function getFAQItems(
  locale: LocaleCode,
  category?: FAQCategory,
): Promise<FAQItem[]> {
  const localized = faqData
    .filter((item) => item.locale === locale)
    .sort((a, b) => a.attributes.order - b.attributes.order);

  if (!category) {
    return localized;
  }

  return localized.filter((item) => item.attributes.category === category);
}
