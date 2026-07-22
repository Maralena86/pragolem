export type LocaleCode = "en" | "fr";
export type ContentLocale = LocaleCode | "global";

export interface MediaAsset {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface StrapiRelationRef {
  id: string;
  type: string;
  slug?: string;
  locale?: LocaleCode;
}

export interface StrapiMeta {
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}
