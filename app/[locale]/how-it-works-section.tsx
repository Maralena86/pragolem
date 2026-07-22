import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface HowItWorksSectionProps {
  t: (key: string) => string;
  steps: Array<{ title: string; body: string }>;
}

/**
 * Renders the "How It Works" section with numbered step cards
 * explaining the booking/tour process.
 */
export function HowItWorksSection({ t, steps }: HowItWorksSectionProps) {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">{t("sections.howItWorks.title")}</h2>
        <p className="text-muted-foreground">{t("sections.howItWorks.subtitle")}</p>
      </div>
      <ol className="grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <Card key={step.title} size="sm">
            <CardHeader>
              <CardDescription>
                {t("how.stepLabel")} {index + 1}
              </CardDescription>
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{step.body}</p>
            </CardContent>
          </Card>
        ))}
      </ol>
    </section>
  );
}
