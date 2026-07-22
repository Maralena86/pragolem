import { Badge } from "@/components/ui/badge";

/**
 * Renders the contact page hero section with an eyebrow badge, the main heading,
 * and a subtitle paragraph, all separated from the rest of the page by a bottom border.
 */
export function ContactHeroSection({ t }: { t: (key: string) => string }) {
  return (
    <section className="space-y-3 border-b pb-8">
      <Badge variant="outline">{t("eyebrow")}</Badge>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>
      <p className="max-w-3xl text-muted-foreground">{t("subtitle")}</p>
    </section>
  );
}
