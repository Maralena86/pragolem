import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  t: (key: string) => string;
}

/**
 * Renders the About page intro section with an outline badge (eyebrow),
 * the page heading, and a subtitle paragraph.
 */
export function HeroSection({ t }: HeroSectionProps) {
  return (
    <section className="space-y-4 border-b pb-10">
      <Badge variant="outline">{t("eyebrow")}</Badge>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>
      <p className="max-w-3xl text-muted-foreground">{t("subtitle")}</p>
    </section>
  );
}
