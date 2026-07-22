import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Tour } from "@/lib/types/tour";

interface HeroSectionProps {
  t: (key: string) => string;
  aggregateRating: { ratingValue: number; reviewCount: number };
  tourCount: number;
}

/**
 * Renders the homepage hero section with headline, CTAs, and key stats
 * (rating, review count, and tour count) displayed in compact cards.
 */
export function HeroSection({ t, aggregateRating, tourCount }: HeroSectionProps) {
  return (
    <section className="grid gap-6 border-b pb-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
      <div className="space-y-4">
        <Badge variant="outline">{t("hero.badge")}</Badge>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>
        <p className="max-w-2xl text-muted-foreground">{t("subtitle")}</p>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/booking">{t("hero.primaryCta")}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/tours">{t("hero.secondaryCta")}</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
        <Card size="sm">
          <CardHeader>
            <CardTitle>{aggregateRating.ratingValue}/5</CardTitle>
            <CardDescription>{t("hero.ratingLabel")}</CardDescription>
          </CardHeader>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>{aggregateRating.reviewCount}</CardTitle>
            <CardDescription>{t("hero.reviewsLabel")}</CardDescription>
          </CardHeader>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>{tourCount}</CardTitle>
            <CardDescription>{t("hero.toursLabel")}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}
