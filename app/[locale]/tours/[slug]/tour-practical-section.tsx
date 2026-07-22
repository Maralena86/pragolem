import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Tour } from "@/lib/types/tour";

/**
 * Renders a two-column grid of practical-info cards: meeting point details
 * (address, description, Google Maps link, accessibility, weather policy,
 * child-friendly info) and a what-to-bring list with payment methods.
 */
export function TourPracticalSection({ t, tour }: { t: (key: string) => string; tour: Tour }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{t("sections.practicalInfo")}</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("practical.meetingPoint")}</CardTitle>
            <CardDescription>{t("practical.meetingPointDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div className="space-y-1">
              <p className="font-medium text-foreground">{tour.attributes.meetingPoint.address}</p>
              <p>{tour.attributes.meetingPoint.description}</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={tour.attributes.meetingPoint.googleMapsUrl} target="_blank" rel="noreferrer">
                {t("practical.mapCta")}
              </a>
            </Button>
            <div className="space-y-1">
              <h3 className="font-medium text-foreground">{t("practical.accessibility")}</h3>
              <p>{tour.attributes.practicalInfo.accessibility}</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium text-foreground">{t("practical.weatherPolicy")}</h3>
              <p>{tour.attributes.practicalInfo.weatherPolicy}</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium text-foreground">{t("practical.childFriendly")}</h3>
              <p>{tour.attributes.practicalInfo.childFriendly}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("practical.whatToBring")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <ul className="list-disc space-y-1 pl-5">
              {tour.attributes.practicalInfo.whatToBring.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="space-y-1">
              <h3 className="font-medium text-foreground">{t("practical.paymentMethods")}</h3>
              <p>{tour.attributes.practicalInfo.paymentMethods.join(", ")}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
