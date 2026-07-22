import { Badge } from "@/components/ui/badge";

/**
 * Renders the booking page hero section with an eyebrow badge,
 * a heading, and a subtitle paragraph.
 */
export function BookingHeroSection({ t }: { t: (key: string) => string }) {
  return (
    <section className="space-y-3 border-b pb-8">
      <Badge variant="outline">{t("eyebrow")}</Badge>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>
      <p className="max-w-3xl text-muted-foreground">{t("subtitle")}</p>
    </section>
  );
}
