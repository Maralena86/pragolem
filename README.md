# Pragolem Tours Website

Bilingual (EN/FR) Next.js website for Pragolem Tours, a guided walking tour company in Prague. SEO-first, statically generated, and ready for Strapi CMS integration.

## Quick Start

```bash
npm install
npm run dev         # Development server at localhost:3000
npm run build       # Production build (use --webpack flag if turbopack causes issues)
npm run start       # Serve production build
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **i18n**: next-intl (EN/FR with localized pathnames)
- **Deployment**: Vercel

## Project Structure

```
app/
  [locale]/               # All locale-prefixed routes
    page.tsx              # Homepage
    about/                # /en/about, /fr/a-propos
    blog/                 # /en/blog, /fr/blog
      [slug]/             # Blog detail pages
    booking/              # /en/booking, /fr/reservation
    contact/              # /en/contact, /fr/contact
    faq/                  # /en/faq, /fr/faq
    reviews/              # /en/reviews, /fr/avis
    terms-conditions/     # /en/terms-conditions, /fr/conditions-generales
    tours/                # /en/tours, /fr/visites
      [slug]/             # Tour detail pages
    layout.tsx            # Shared shell (header, footer, toaster)
    not-found.tsx         # Localized 404 page
  sitemap.ts              # Dynamic sitemap with hreflang
  robots.ts               # Robots.txt

components/
  layout/                 # Header, Footer, LanguageSwitcher
  forms/                  # BookingForm, ContactForm
  reviews/                # ReviewsFilterGrid
  blog/                   # BlogMarkdownContent
  ui/                     # shadcn/ui primitives

i18n/
  routing.ts              # Locale config + localized pathnames
  navigation.ts           # Locale-aware Link, useRouter, etc.
  request.ts              # Server-side locale resolution

messages/
  en.json                 # English translations
  fr.json                 # French translations

lib/
  utils.ts                # Utility functions (shadcn/ui)
  types/                  # Shared TypeScript interfaces
  data/                   # Static content (Strapi replacement)
  api/                    # API access layer (only import point for pages)
  seo/                    # SEO inventory + automated audit pipeline
```

## Content Architecture (Strapi-Ready)

All content follows a three-layer pattern:

1. **Types** (`lib/types/`): TypeScript interfaces for each content type.
2. **Data** (`lib/data/`): Static TS files with placeholder and real content. Marked with `// [PLACEHOLDER]` or `// [REAL REVIEW]`.
3. **API** (`lib/api/`): Access functions that pages import. When Strapi goes live, only this layer changes.

**Rule**: Pages and components must never import from `lib/data/*` directly. Always go through `lib/api/*`.

## Strapi Migration Guide

When connecting Strapi CMS:

1. **Set up Strapi content types** matching the interfaces in `lib/types/`:
   - Tour, Guide, Review, FAQItem, BlogPost, SiteConfig
2. **Update API functions** in `lib/api/` to fetch from Strapi instead of static data files.
3. **Keep the same return types** so pages and components work without changes.
4. **Remove static data files** in `lib/data/` once Strapi is the source of truth.
5. **Update sitemap/SEO inventory** (`lib/seo/inventory.ts`) if slug patterns change.

Environment variables to add:
```env
STRAPI_API_URL=https://your-strapi-instance.com/api
STRAPI_API_TOKEN=your-read-only-token
```

## i18n / Localization

- Default locale: `en`
- Supported locales: `en`, `fr`
- Localized pathnames defined in `i18n/routing.ts`
- All UI strings live in `messages/en.json` and `messages/fr.json`
- Pages use `getTranslations()` (server) or `useTranslations()` (client)

## SEO Infrastructure

- **Sitemap**: Auto-generated at `/sitemap.xml` with hreflang alternates for all pages.
- **Robots**: Generated at `/robots.txt`.
- **Audit pipeline**: `lib/seo/audit.ts` runs blocking checks at build time:
  - Hreflang parity and reciprocity
  - Metadata uniqueness (no duplicate titles/descriptions)
  - Canonical + OpenGraph + Twitter coverage
  - Schema coverage by page type
  - Route surface completeness
- **Structured data**: Organization, TouristAttraction, FAQPage, AggregateRating, TouristTrip, BreadcrumbList, BlogPosting.

## Environment Variables

| Variable | Purpose | Required |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID | No |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console verification tag | No |

## Build Notes

- Use `npm run build -- --webpack` if turbopack causes issues in your environment.
- All pages are statically generated (SSG). No server-side runtime required.
- Forms log to console and show toasts. Wire up Strapi/email backend before production.
- Terms page contains placeholder legal text. Replace with reviewed copy before launch.

## Key Design Decisions

- **No client-side routing for data**: All data is fetched at build time via `generateStaticParams` and async server components.
- **shadcn/ui theme lock**: Theme variables, colors, fonts, and radius are frozen. Do not modify without explicit approval.
- **Semantic HTML**: All pages use proper heading hierarchy, landmark elements, and ARIA attributes.
- **Skip-to-content link**: Present in the layout shell for keyboard accessibility.
