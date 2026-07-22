import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getBlogPosts } from "@/lib/api/blog";
import { getSiteConfig } from "@/lib/api/site-config";
import { getSiteUrl } from "@/lib/env";
import { buildBlogIndexUrl, toLocaleCode } from "@/lib/helpers/page-helpers";
import BlogEmptyState from "./blog-empty-state";
import BlogHeroSection from "./blog-hero-section";
import BlogPostGrid from "./blog-post-grid";

/**
 * Generates localized metadata for the blog index, including canonical and hreflang alternates,
 * so search engines can correctly map English and French versions of the listing page.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeCode = toLocaleCode(locale);

  const [t, siteConfig] = await Promise.all([
    getTranslations({ locale: localeCode, namespace: "BlogIndexPage.meta" }),
    getSiteConfig(),
  ]);

  const canonical = buildBlogIndexUrl(getSiteUrl(), localeCode);

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        en: buildBlogIndexUrl(getSiteUrl(), "en"),
        fr: buildBlogIndexUrl(getSiteUrl(), "fr"),
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonical,
      siteName: siteConfig.attributes.siteName,
      locale: localeCode === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

/**
 * Renders the localized blog index page with statically generated post cards and locale-aware links
 * to each article detail route.
 */
export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeCode = toLocaleCode(locale);
  setRequestLocale(localeCode);

  const [t, posts] = await Promise.all([getTranslations("BlogIndexPage"), getBlogPosts(localeCode)]);

  return (
    <main id="main-content" className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-12">
      <BlogHeroSection t={t} />

      {posts.length === 0 ? (
        <BlogEmptyState t={t} />
      ) : (
        <BlogPostGrid t={t} posts={posts} localeCode={localeCode} />
      )}
    </main>
  );
}
