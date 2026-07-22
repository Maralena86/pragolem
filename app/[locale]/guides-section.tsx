import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Guide } from "@/lib/types/guide";

interface GuidesSectionProps {
  t: (key: string, values?: Record<string, string | number | Date>) => string;
  guides: Guide[];
}

/**
 * Renders the guides section with cards displaying each guide's name,
 * role, short bio, languages spoken, years in Prague, and a personal quote.
 */
export function GuidesSection({ t, guides }: GuidesSectionProps) {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">{t("sections.guides.title")}</h2>
        <p className="text-muted-foreground">{t("sections.guides.subtitle")}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {guides.map((guide) => (
          <Card key={guide.id}>
            <CardHeader>
              <CardTitle>{guide.attributes.name}</CardTitle>
              <CardDescription>{guide.attributes.role}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">{guide.attributes.shortBio}</p>
              <p className="text-muted-foreground">
                {t("guides.languagesLabel")}: {guide.attributes.languages.join(", ")}
              </p>
              <p className="text-muted-foreground">
                {t("guides.yearsInPrague", { count: guide.attributes.yearsInPrague })}
              </p>
              <p className="border-l-2 pl-3 text-muted-foreground">{guide.attributes.quote}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
