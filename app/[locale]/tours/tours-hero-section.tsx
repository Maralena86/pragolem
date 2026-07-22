import { Badge } from "@/components/ui/badge";

/**
 * Renders the tours page hero section with a badge eyebrow,
 * the page title as an h1, and a subtitle paragraph.
 */
export default function ToursHeroSection({
  t,
}: {
  t: (key: string) => string;
}) {
  return (
    <section className="space-y-4 border-b pb-10">
      <Badge variant="outline">{t("eyebrow")}</Badge>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("title")}
      </h1>
      <p className="max-w-3xl text-muted-foreground">{t("subtitle")}</p>
    </section>
  );
}
