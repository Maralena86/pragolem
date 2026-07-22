import { Badge } from "@/components/ui/badge";

/**
 * Renders the blog index hero section with an eyebrow badge, the page heading,
 * and a subtitle describing the blog's purpose.
 */
export default function BlogHeroSection({ t }: { t: (key: string) => string }) {
  return (
    <section className="space-y-4 border-b pb-10">
      <Badge variant="outline">{t("eyebrow")}</Badge>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>
      <p className="max-w-3xl text-muted-foreground">{t("subtitle")}</p>
    </section>
  );
}
