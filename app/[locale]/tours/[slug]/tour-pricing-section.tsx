import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Tour } from "@/lib/types/tour";

/**
 * Renders the pricing card that conditionally shows either a free-tour tip suggestion
 * or a paid-tour booking CTA button based on the tour's price type.
 */
export function TourPricingSection({ t, tour }: { t: (key: string) => string; tour: Tour }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{t("sections.pricing")}</h2>
      <Card>
        <CardHeader>
          <CardTitle>
            {tour.attributes.priceType === "free" ? t("pricing.freeTitle") : t("pricing.paidTitle")}
          </CardTitle>
          <CardDescription>
            {tour.attributes.priceType === "free"
              ? t("pricing.freeDescription")
              : t("pricing.paidDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          {tour.attributes.priceType === "free" ? (
            <div className="space-y-1">
              <p className="font-medium text-foreground">{t("pricing.freeTipLabel")}</p>
              <p>{tour.attributes.practicalInfo.tipSuggestion}</p>
            </div>
          ) : (
            <Button asChild>
              <Link href="/booking">{t("pricing.paidCta")}</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
