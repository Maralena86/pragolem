import type { LocaleCode, StrapiMeta } from "./common";

export type FAQCategory = "free-tours" | "tours" | "private-tours" | "pragolem";

export interface FAQItemAttributes extends StrapiMeta {
  question: string;
  answer: string;
  category: FAQCategory;
  order: number;
}

export interface FAQItem {
  id: string;
  slug: string;
  locale: LocaleCode;
  attributes: FAQItemAttributes;
  relationships: Record<string, never>;
}
