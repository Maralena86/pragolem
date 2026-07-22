import { Badge } from "@/components/ui/badge";

/**
 * Renders the terms page header with a badge eyebrow, the page title,
 * and a last-updated date paragraph.
 */
export default function TermsHeroSection({
  t,
}: {
  t: (key: string, values?: Record<string, string>) => string;
}) {
  return (
    <header className="space-y-4 border-b pb-8">
      <Badge variant="outline">{t("eyebrow")}</Badge>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("title")}
      </h1>
      <p className="text-sm text-muted-foreground">
        {t("lastUpdated", { date: "2026-03-04" })}
      </p>
    </header>
  );
}
