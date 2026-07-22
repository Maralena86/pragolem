import type { LocaleCode, MediaAsset, StrapiMeta, StrapiRelationRef } from "./common";

export interface GuideAttributes extends StrapiMeta {
  name: string;
  photo: MediaAsset;
  role: string;
  languages: string[];
  shortBio: string;
  fullBio: string;
  quote: string;
  tourLanguages: string;
  yearsInPrague: number;
}

export interface GuideRelationships {
  tours: {
    data: StrapiRelationRef[];
  };
}

export interface Guide {
  id: string;
  slug: string;
  locale: LocaleCode;
  attributes: GuideAttributes;
  relationships: GuideRelationships;
}
