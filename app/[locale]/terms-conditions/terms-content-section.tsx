// [PLACEHOLDER] Legal text below is generic placeholder content.
// Replace with real legal copy reviewed by a qualified professional.

const SECTION_KEYS = [
  "general",
  "booking",
  "freeModel",
  "privateTours",
  "cancellation",
  "liability",
  "privacy",
  "intellectual",
  "modifications",
  "contact",
] as const;

/**
 * Renders the prose article containing all legal sections, each with an h2
 * title and a body paragraph mapped from the SECTION_KEYS constant.
 */
export default function TermsContentSection({
  t,
}: {
  t: (key: string) => string;
}) {
  return (
    <article className="prose prose-neutral max-w-none space-y-8">
      {SECTION_KEYS.map((key) => (
        <section key={key} className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">
            {t(`sections.${key}.title`)}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t(`sections.${key}.body`)}
          </p>
        </section>
      ))}
    </article>
  );
}
