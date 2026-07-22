import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Review } from "@/lib/types/review";

interface ReviewsSectionProps {
  t: (key: string, values?: Record<string, string | number | Date>) => string;
  reviews: Review[];
  aggregateRating: { ratingValue: number; reviewCount: number };
}

/**
 * Renders the reviews section with featured review cards, an aggregate
 * rating badge, and a link to the full reviews page.
 */
export function ReviewsSection({ t, reviews, aggregateRating }: ReviewsSectionProps) {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">{t("sections.reviews.title")}</h2>
          <p className="text-muted-foreground">{t("sections.reviews.subtitle")}</p>
        </div>
        <Badge variant="outline">
          {t("reviews.aggregate", {
            rating: aggregateRating.ratingValue,
            count: aggregateRating.reviewCount,
          })}
        </Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((review) => {
          const source = review.attributes.source ?? "direct";
          const stars = "\u2605".repeat(review.attributes.rating);
          return (
            <Card key={review.id} size="sm">
              <CardHeader>
                <CardTitle>{review.attributes.authorName}</CardTitle>
                <CardDescription>
                  <span aria-hidden="true">{stars}</span>
                  <span className="sr-only">{review.attributes.rating}/5</span>
                  {" \u00b7 "}{t(`reviews.source.${source}`)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {!review.attributes.isRealReview && (
                  <Badge variant="outline">{t("reviews.placeholderBadge")}</Badge>
                )}
                <p className="text-muted-foreground">{review.attributes.text}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Button variant="outline" asChild>
        <Link href="/reviews">{t("reviews.cta")}</Link>
      </Button>
    </section>
  );
}
