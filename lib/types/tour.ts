import type {
  LocaleCode,
  MediaAsset,
  StrapiMeta,
  StrapiRelationRef,
} from "./common";

export interface TourStop {
  order: number;
  name: string;
  description: string;
  image?: MediaAsset;
  durationMinutes?: number;
}

export interface TourPracticalInfo {
  whatToBring: string[];
  accessibility: string;
  weatherPolicy: string;
  childFriendly: string;
  tipSuggestion: string;
  paymentMethods: string[];
}

export interface TourMeetingPoint {
  address: string;
  description: string;
  latitude: number;
  longitude: number;
  googleMapsUrl: string;
}

export interface TourSeo {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  keywords: string[];
}

export interface TourAttributes extends StrapiMeta {
  title: string;
  shortDescription: string;
  longDescription: string;
  heroImage: MediaAsset;
  duration: string;
  durationDisplay: string;
  languages: string[];
  maxGroupSize: number;
  priceType: "free" | "paid";
  meetingPoint: TourMeetingPoint;
  itinerary: TourStop[];
  practicalInfo: TourPracticalInfo;
  seo: TourSeo;
}

export interface TourRelationships {
  guide: {
    data: StrapiRelationRef;
  };
  relatedTours: {
    data: StrapiRelationRef[];
  };
}

export interface Tour {
  id: string;
  slug: Record<LocaleCode, string>;
  locale: LocaleCode;
  attributes: TourAttributes;
  relationships: TourRelationships;
}
