import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Renders a placeholder card when the blog has no published posts,
 * displaying a localized title and description.
 */
export default function BlogEmptyState({ t }: { t: (key: string) => string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("empty.title")}</CardTitle>
        <CardDescription>{t("empty.description")}</CardDescription>
      </CardHeader>
    </Card>
  );
}
