import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { TourStop } from "@/lib/types/tour";

/**
 * Renders the itinerary section mapping sorted stops into numbered cards,
 * each showing the stop name, description, and optional duration in minutes.
 */
export function TourItinerarySection({
  t,
  stops,
}: {
  t: (key: string, values?: Record<string, number>) => string;
  stops: TourStop[];
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{t("sections.itinerary")}</h2>
      <ol className="grid gap-4 md:grid-cols-2">
        {stops.map((stop) => (
          <Card key={`${stop.order}-${stop.name}`} size="sm">
            <CardHeader>
              <CardDescription>{t("itinerary.stopLabel", { order: stop.order })}</CardDescription>
              <CardTitle>{stop.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p>{stop.description}</p>
              {typeof stop.durationMinutes === "number" && (
                <p className="text-foreground">
                  {t("itinerary.duration", { minutes: stop.durationMinutes })}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </ol>
    </section>
  );
}
