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
              <CardTitle>{stop.name}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </ol>
    </section>
  );
}
