import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPublishedDate } from "@/lib/helpers/page-helpers";
import type { BlogPost } from "@/lib/types/blog";
import type { LocaleCode } from "@/lib/types/common";

/**
 * Renders a responsive grid of blog post cards, each displaying its featured image,
 * author/date/reading-time meta line, title, excerpt, an inline read-more link,
 * and a CTA button linking to the full article.
 */
export default function BlogPostGrid({
  t,
  posts,
  localeCode,
}: {
  t: (key: string, values?: Record<string, string | number | Date>) => string;
  posts: BlogPost[];
  localeCode: LocaleCode;
}) {
  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <div className="relative aspect-16/10 border-b">
            <Image
              src={post.attributes.featuredImage.url}
              alt={post.attributes.featuredImage.alt}
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority={false}
            />
          </div>
          <CardHeader className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>{t("card.byAuthor", { author: post.attributes.author })}</span>
              <span>•</span>
              <time dateTime={post.attributes.publishedAt}>
                {formatPublishedDate(post.attributes.publishedAt, localeCode)}
              </time>
              <span>•</span>
              <span>{t("card.readingTime", { minutes: post.attributes.readingTimeMinutes })}</span>
            </div>
            <CardTitle className="text-xl leading-tight">{post.attributes.title}</CardTitle>
            <CardDescription>{post.attributes.excerpt}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              className="inline-flex text-sm font-medium underline underline-offset-2"
              href={{ pathname: "/blog/[slug]", params: { slug: post.slug[localeCode] } }}
            >
              {t("card.inlineLink")}
            </Link>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href={{ pathname: "/blog/[slug]", params: { slug: post.slug[localeCode] } }}>
                {t("card.cta")}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
