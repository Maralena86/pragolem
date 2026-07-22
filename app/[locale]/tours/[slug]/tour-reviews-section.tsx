import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Review } from "@/lib/types/review";

/**
 * Renders the reviews section showing an aggregate-rating badge, a grid of featured
 * review cards (with star ratings, source labels, and placeholder badges), or an
 * empty-state message when there are no reviews, plus a "view all" link.
 */
export function TourReviewsSection({
  t,
  featuredReviews,
  aggregate,
}: {
  t: (key: string, values?: Record<string, string | number>) => string;
  featuredReviews: Review[];
  aggregate: { ratingValue: number; reviewCount: number };
}) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-2xl font-semibold tracking-tight">{t("sections.reviews")}</h2>
        {aggregate.reviewCount > 0 && (
          <Badge variant="outline">
            {t("reviews.ratingSummary", {
              rating: aggregate.ratingValue,
              count: aggregate.reviewCount,
            })}
          </Badge>
        )}
      </div>
      {featuredReviews.length === 0 ? (
        <p className="text-muted-foreground">{t("reviews.noReviews")}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredReviews.map((review) => {
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
      )}
      <Button variant="outline" asChild>
        <Link href="/reviews">{t("reviews.viewAll")}</Link>
      </Button>
    </section>
  );
}
