import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Guide } from "@/lib/types/guide";

/**
 * Renders the guide profile card with photo, bio, spoken languages, years-in-Prague stat,
 * and a personal blockquote, or a fallback message when no guide is found.
 */
export function TourGuideSection({
  t,
  guide,
}: {
  t: (key: string, values?: Record<string, number>) => string;
  guide: Guide | null | undefined;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{t("sections.guide")}</h2>
      <Card>
        <CardHeader>
          <CardTitle>{guide?.attributes.name ?? t("guide.fallback")}</CardTitle>
          <CardDescription>{guide?.attributes.role}</CardDescription>
        </CardHeader>
        {guide ? (
          <CardContent className="grid gap-4 text-muted-foreground md:grid-cols-[220px_1fr]">
            <div className="relative h-56 w-full">
              <Image
                src={guide.attributes.photo.url}
                alt={guide.attributes.photo.alt}
                fill
                sizes="(min-width: 768px) 220px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-3">
              <p>{guide.attributes.shortBio}</p>
              <p>
                <span className="font-medium text-foreground">{t("guide.languagesLabel")}:</span>{" "}
                {guide.attributes.languages.join(", ")}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  {t("guide.yearsInPrague", { count: guide.attributes.yearsInPrague })}
                </span>
              </p>
              <blockquote className="border-l-2 pl-3">{guide.attributes.quote}</blockquote>
            </div>
          </CardContent>
        ) : (
          <CardContent className="text-muted-foreground">
            <p>{t("guide.fallback")}</p>
          </CardContent>
        )}
      </Card>
    </section>
  );
}
