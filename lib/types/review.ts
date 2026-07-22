import type { LocaleCode, StrapiMeta, StrapiRelationRef } from "./common";

export type ReviewSource = "google" | "tripadvisor" | "direct";

export interface ReviewAttributes extends StrapiMeta {
  authorName: string;
  rating: number;
  text: string;
  tourSlug?: string;
  source?: ReviewSource;
  date?: string;
  isRealReview: boolean;
}

export interface ReviewRelationships {
  tour?: {
    data: StrapiRelationRef;
  };
}

export interface Review {
  id: string;
  slug: string;
  locale: LocaleCode;
  attributes: ReviewAttributes;
  relationships: ReviewRelationships;
}
