import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { BlogMarkdownContent } from "@/components/blog/BlogMarkdownContent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/api/blog";
import { getSiteConfig } from "@/lib/api/site-config";
import { getTours } from "@/lib/api/tours";
import { getSiteUrl } from "@/lib/env";
import {
  buildBlogIndexUrl,
  formatPublishedDate,
  getAlternateLocale,
  toAbsoluteAssetUrl,
  toLocaleCode,
} from "@/lib/helpers/page-helpers";
import type { LocaleCode } from "@/lib/types/common";
import type { Tour } from "@/lib/types/tour";

/**
 * Builds the absolute URL for a localized blog detail page using locale-specific slugs.
 */
function buildBlogDetailUrl(domain: string, locale: LocaleCode, slug: string): string {
  return `${buildBlogIndexUrl(domain, locale)}/${slug}`;
}

/**
 * Resolves related tours declared on a blog post using the locale-specific tours collection.
 * This keeps the page Strapi-ready by relying only on API-layer reads and relation slugs.
 */
function getRelatedTours(tours: Tour[], locale: LocaleCode, relatedSlugs: string[]): Tour[] {
  const toursBySlug = new Map(tours.map((tour) => [tour.slug[locale], tour]));

  return relatedSlugs
    .map((slug) => toursBySlug.get(slug))
    .filter((tour): tour is Tour => Boolean(tour));
}

/**
 * Generates all locale + slug pairs for blog posts so every localized article page
 * is statically generated at build time.
 */
export async function generateStaticParams(): Promise<Array<{ locale: LocaleCode; slug: string }>> {
  return getAllBlogSlugs();
}

/**
 * Generates per-post metadata with locale-aware canonical/hreflang links and article social previews.
 * When a post slug does not exist, metadata intentionally returns noindex values.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const localeCode = toLocaleCode(locale);

  const [post, siteConfig, t] = await Promise.all([
    getBlogPostBySlug(slug, localeCode),
    getSiteConfig(),
    getTranslations({ locale: localeCode, namespace: "BlogDetailPage.meta" }),
  ]);

  if (!post) {
    return {
      title: t("notFoundTitle"),
      description: t("notFoundDescription"),
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonical = buildBlogDetailUrl(getSiteUrl(), localeCode, post.slug[localeCode]);
  const ogImage = toAbsoluteAssetUrl(getSiteUrl(), post.attributes.seo.ogImage);

  return {
    title: post.attributes.seo.metaTitle,
    description: post.attributes.seo.metaDescription,
    alternates: {
      canonical,
      languages: {
        en: buildBlogDetailUrl(getSiteUrl(), "en", post.slug.en),
        fr: buildBlogDetailUrl(getSiteUrl(), "fr", post.slug.fr),
      },
    },
    openGraph: {
      title: post.attributes.seo.metaTitle,
      description: post.attributes.seo.metaDescription,
      url: canonical,
      siteName: siteConfig.attributes.siteName,
      locale: localeCode === "fr" ? "fr_FR" : "en_US",
      type: "article",
      publishedTime: post.attributes.publishedAt,
      authors: [post.attributes.author],
      images: [
        {
          url: ogImage,
          alt: post.attributes.featuredImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.attributes.seo.metaTitle,
      description: post.attributes.seo.metaDescription,
      images: [ogImage],
    },
  };
}

/**
 * Renders the localized blog detail page with markdown content, related-tour conversion CTAs,
 * and BlogPosting schema markup for SEO-rich article indexing.
 */
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const localeCode = toLocaleCode(locale);
  setRequestLocale(localeCode);

  const [post, siteConfig, t] = await Promise.all([
    getBlogPostBySlug(slug, localeCode),
    getSiteConfig(),
    getTranslations("BlogDetailPage"),
  ]);

  if (!post) {
    notFound();
  }

  const tours = await getTours(localeCode);
  const relatedSlugs = post.relationships.relatedTours.data
    .filter((tourRef) => !tourRef.locale || tourRef.locale === localeCode)
    .map((tourRef) => tourRef.slug)
    .filter((tourSlug): tourSlug is string => Boolean(tourSlug));
  const relatedTours = getRelatedTours(tours, localeCode, relatedSlugs);
  const alternateLocale = getAlternateLocale(localeCode);
  const canonicalUrl = buildBlogDetailUrl(getSiteUrl(), localeCode, post.slug[localeCode]);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.attributes.title,
    description: post.attributes.excerpt,
    url: canonicalUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    image: [
      toAbsoluteAssetUrl(getSiteUrl(), post.attributes.featuredImage.url),
      toAbsoluteAssetUrl(getSiteUrl(), post.attributes.seo.ogImage),
    ],
    inLanguage: localeCode,
    author: {
      "@type": "Person",
      name: post.attributes.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.attributes.siteName,
      url: getSiteUrl(),
    },
    datePublished: post.attributes.publishedAt,
    dateModified: post.attributes.updatedAt ?? post.attributes.publishedAt,
    isPartOf: {
      "@type": "Blog",
      name: siteConfig.attributes.siteName,
      url: buildBlogIndexUrl(getSiteUrl(), localeCode),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      <main id="main-content" className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-12">
        <nav aria-label={t("breadcrumbs.ariaLabel")}>
          <ol className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <li>
              <Link href="/" className="underline-offset-2 hover:underline">
                {t("breadcrumbs.home")}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="underline-offset-2 hover:underline">
                {t("breadcrumbs.blog")}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">{post.attributes.title}</li>
          </ol>
        </nav>

        <header className="space-y-5 border-b pb-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{t("eyebrow")}</Badge>
            <Badge variant="secondary">{t("byline.readingTime", { minutes: post.attributes.readingTimeMinutes })}</Badge>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{post.attributes.title}</h1>
          <p className="text-lg text-muted-foreground">{post.attributes.excerpt}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>{t("byline.byAuthor", { author: post.attributes.author })}</span>
            <span>•</span>
            <time dateTime={post.attributes.publishedAt}>
              {formatPublishedDate(post.attributes.publishedAt, localeCode)}
            </time>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <Link href="/blog">{t("actions.backToIndex")}</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link
                locale={alternateLocale}
                href={{ pathname: "/blog/[slug]", params: { slug: post.slug[alternateLocale] } }}
              >
                {t(`actions.switchLocale.${alternateLocale}`)}
              </Link>
            </Button>
          </div>
        </header>

        <section className="space-y-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border">
            <Image
              src={post.attributes.featuredImage.url}
              alt={post.attributes.featuredImage.alt}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <BlogMarkdownContent content={post.attributes.content} />
        </section>

        <section className="space-y-5 border-t pt-10">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">{t("relatedTours.title")}</h2>
            <p className="text-muted-foreground">{t("relatedTours.subtitle")}</p>
          </div>

          {relatedTours.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>{t("relatedTours.empty.title")}</CardTitle>
                <CardDescription>{t("relatedTours.empty.description")}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href="/booking">{t("relatedTours.primaryCta")}</Link>
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                {relatedTours.map((tour) => (
                  <Card key={tour.id}>
                    <CardHeader>
                      
                      <CardTitle>{tour.attributes.title}</CardTitle>
                      <CardDescription>{tour.attributes.shortDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1 text-sm text-muted-foreground">
                      <p>{t("relatedTours.card.duration", { value: tour.attributes.durationDisplay })}</p>
                      <p>{t(`relatedTours.card.priceType.${tour.attributes.priceType}`)}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild>
                        <Link href={{ pathname: "/tours/[slug]", params: { slug: tour.slug[localeCode] } }}>
                          {t("relatedTours.card.cta")}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <Button asChild>
                <Link href="/booking">{t("relatedTours.primaryCta")}</Link>
              </Button>
            </>
          )}
        </section>
      </main>
    </>
  );
}
