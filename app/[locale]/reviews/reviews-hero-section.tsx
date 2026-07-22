import { Badge } from "@/components/ui/badge";

interface ReviewsHeroSectionProps {
  t: (key: string) => string;
}

/**
 * Renders the reviews page intro section with a badge eyebrow, page heading,
 * and a descriptive subtitle separated from the rest of the page by a border.
 */
export function ReviewsHeroSection({ t }: ReviewsHeroSectionProps) {
  return (
    <section className="space-y-4 border-b pb-10">
      <Badge variant="outline">{t("eyebrow")}</Badge>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>
      <p className="max-w-3xl text-muted-foreground">{t("subtitle")}</p>
    </section>
  );
}
