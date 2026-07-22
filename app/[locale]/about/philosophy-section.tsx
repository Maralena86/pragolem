import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PhilosophySectionProps {
  t: (key: string) => string;
}

const principles = ["accuracy", "human", "clarity"] as const;

/**
 * Renders the operating philosophy section with a heading, body text,
 * and a three-column grid of principle Cards (accuracy, human touch, clarity).
 */
export function PhilosophySection({ t }: PhilosophySectionProps) {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">{t("philosophy.title")}</h2>
        <p className="text-muted-foreground">{t("philosophy.body")}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {principles.map((principle) => (
          <Card key={principle} size="sm">
            <CardHeader>
              <CardTitle>{t(`philosophy.principles.${principle}.title`)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t(`philosophy.principles.${principle}.body`)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
