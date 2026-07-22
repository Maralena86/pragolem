import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ReviewsSummarySectionProps {
  t: (key: string) => string;
  ratingValue: number;
  reviewCount: number;
}

/**
 * Renders a three-column stats grid with cards displaying the aggregate
 * rating value, total review count, and review scope (e.g. all platforms).
 */
export function ReviewsSummarySection({ t, ratingValue, reviewCount }: ReviewsSummarySectionProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card size="sm">
        <CardHeader>
          <CardDescription>{t("summary.ratingLabel")}</CardDescription>
          <CardTitle>{ratingValue}/5</CardTitle>
        </CardHeader>
      </Card>
      <Card size="sm">
        <CardHeader>
          <CardDescription>{t("summary.countLabel")}</CardDescription>
          <CardTitle>{reviewCount}</CardTitle>
        </CardHeader>
      </Card>
      <Card size="sm">
        <CardHeader>
          <CardDescription>{t("summary.scopeLabel")}</CardDescription>
          <CardTitle>{t("summary.scopeValue")}</CardTitle>
        </CardHeader>
      </Card>
    </section>
  );
}
