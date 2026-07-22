interface StorySectionProps {
  t: (key: string) => string;
}

/**
 * Renders the "Our Story" section with a heading and two body paragraphs
 * describing the company origin and mission.
 */
export function StorySection({ t }: StorySectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{t("story.title")}</h2>
      <div className="space-y-4 text-muted-foreground">
        <p>{t("story.paragraph1")}</p>
        <p>{t("story.paragraph2")}</p>
      </div>
    </section>
  );
}
