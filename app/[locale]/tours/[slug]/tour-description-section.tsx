/**
 * Renders the long-description section that displays pre-split paragraphs
 * of the tour's detailed marketing copy.
 */
export function TourDescriptionSection({
  t,
  paragraphs,
}: {
  t: (key: string) => string;
  paragraphs: string[];
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{t("sections.description")}</h2>
      <div className="space-y-4 text-muted-foreground">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
