import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/tours": {
      en: "/tours",
      fr: "/visites",
    },
    "/tours/[slug]": {
      en: "/tours/[slug]",
      fr: "/visites/[slug]",
    },
    "/booking": {
      en: "/booking",
      fr: "/reservation",
    },
    "/about": {
      en: "/about",
      fr: "/a-propos",
    },
    "/faq": "/faq",
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/contact": "/contact",
    "/reviews": {
      en: "/reviews",
      fr: "/avis",
    },
    "/terms-conditions": {
      en: "/terms-conditions",
      fr: "/conditions-generales",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
