import type {
  LocaleCode,
  MediaAsset,
  StrapiMeta,
  StrapiRelationRef,
} from "./common";

export interface BlogSeo {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
}

export interface BlogPostAttributes extends StrapiMeta {
  title: string;
  excerpt: string;
  content: string;
  featuredImage: MediaAsset;
  author: string;
  publishedAt: string;
  readingTimeMinutes: number;
  seo: BlogSeo;
}

export interface BlogPostRelationships {
  relatedTours: {
    data: StrapiRelationRef[];
  };
}

export interface BlogPost {
  id: string;
  slug: Record<LocaleCode, string>;
  locale: LocaleCode;
  attributes: BlogPostAttributes;
  relationships: BlogPostRelationships;
}
