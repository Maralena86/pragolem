import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { LocaleCode } from "@/lib/types/common";
import type { Tour } from "@/lib/types/tour";

/**
 * Renders the related-tours grid showing cards with price badges, titles, descriptions,
 * duration, and detail links, or an empty-state message when no related tours exist.
 */
export function TourRelatedSection({
  t,
  relatedTours,
  localeCode,
}: {
  t: (key: string) => string;
  relatedTours: Tour[];
  localeCode: LocaleCode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{t("sections.relatedTours")}</h2>
      {relatedTours.length === 0 ? (
        <p className="text-muted-foreground">{t("relatedTours.empty")}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {relatedTours.map((relatedTour) => (
            <Card key={relatedTour.id}>
              <CardHeader>
                <Badge
                  variant={relatedTour.attributes.priceType === "free" ? "secondary" : "outline"}
                >
                  {t(`priceType.${relatedTour.attributes.priceType}`)}
                </Badge>
                <CardTitle>{relatedTour.attributes.title}</CardTitle>
                <CardDescription>{relatedTour.attributes.shortDescription}</CardDescription>
              </CardHeader>
              {/* <CardContent className="text-muted-foreground">
                <p>
                  {t("relatedTours.durationLabel")}: {relatedTour.attributes.durationDisplay}
                </p>
              </CardContent> */}
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link
                    href={{
                      pathname: "/tours/[slug]",
                      params: { slug: relatedTour.slug[localeCode] },
                    }}
                  >
                    {t("relatedTours.cta")}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
