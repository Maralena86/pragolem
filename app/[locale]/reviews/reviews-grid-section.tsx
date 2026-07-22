import { ReviewsFilterGrid } from "@/components/reviews/ReviewsFilterGrid";
import type { ReviewFilterItem } from "@/components/reviews/ReviewsFilterGrid";
import { Card, CardContent } from "@/components/ui/card";
import type { LocaleCode } from "@/lib/types/common";

interface ReviewsGridSectionProps {
  t: (key: string) => string;
  items: ReviewFilterItem[];
  defaultLanguage: LocaleCode;
}

/**
 * Renders the review grid section with a heading, subtitle, and a card
 * wrapping the client-side ReviewsFilterGrid component for filtering reviews.
 */
export function ReviewsGridSection({ t, items, defaultLanguage }: ReviewsGridSectionProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">{t("grid.title")}</h2>
        <p className="text-muted-foreground">{t("grid.subtitle")}</p>
      </div>
      <Card>
        <CardContent className="pt-4">
          <ReviewsFilterGrid items={items} defaultLanguage={defaultLanguage} />
        </CardContent>
      </Card>
    </section>
  );
}
