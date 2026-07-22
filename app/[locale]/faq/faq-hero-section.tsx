import { Badge } from "@/components/ui/badge";

interface FaqHeroSectionProps {
  t: (key: string) => string;
}

/**
 * Renders the FAQ page hero section with an eyebrow badge, page heading, and subtitle.
 */
export function FaqHeroSection({ t }: FaqHeroSectionProps) {
  return (
    <section className="space-y-4 border-b pb-10">
      <Badge variant="outline">{t("eyebrow")}</Badge>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>
      <p className="max-w-3xl text-muted-foreground">{t("subtitle")}</p>
    </section>
  );
}
