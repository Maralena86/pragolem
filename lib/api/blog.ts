import { blogPostsData } from "../data/blog-posts";
import type { LocaleCode } from "../types/common";
import type { BlogPost } from "../types/blog";

// Replace these implementations with Strapi REST/GraphQL calls when CMS is connected.
export async function getBlogPosts(locale: LocaleCode): Promise<BlogPost[]> {
  return blogPostsData
    .filter((post) => post.locale === locale)
    .sort(
      (a, b) =>
        new Date(b.attributes.publishedAt).getTime() - new Date(a.attributes.publishedAt).getTime(),
    );
}

// Replace this lookup with Strapi filter query:
// /api/blog-posts?locale={locale}&filters[slug][$eq]={slug}
export async function getBlogPostBySlug(
  slug: string,
  locale: LocaleCode,
): Promise<BlogPost | null> {
  return blogPostsData.find((post) => post.locale === locale && post.slug[locale] === slug) ?? null;
}

// Used by generateStaticParams for blog pages.
export async function getAllBlogSlugs(): Promise<Array<{ locale: LocaleCode; slug: string }>> {
  const seen = new Set<string>();
  const pairs: Array<{ locale: LocaleCode; slug: string }> = [];

  for (const post of blogPostsData) {
    for (const [locale, localizedSlug] of Object.entries(post.slug) as Array<[
      LocaleCode,
      string,
    ]>) {
      const key = `${locale}:${localizedSlug}`;
      if (!seen.has(key)) {
        seen.add(key);
        pairs.push({ locale, slug: localizedSlug });
      }
    }
  }

  return pairs;
}
