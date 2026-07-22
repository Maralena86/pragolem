import { Link } from "@/i18n/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { FAQItem } from "@/lib/types/faq";

interface FAQSectionProps {
  t: (key: string) => string;
  faqItems: FAQItem[];
}

/**
 * Renders the FAQ section with an accordion of frequently asked questions
 * and a link to the full FAQ page.
 */
export function FAQSection({ t, faqItems }: FAQSectionProps) {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">{t("sections.faq.title")}</h2>
          <p className="text-muted-foreground">{t("sections.faq.subtitle")}</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/faq">{t("faq.cta")}</Link>
        </Button>
      </div>
      <Card>
        <CardContent>
          <Accordion type="single" collapsible>
            {faqItems.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.attributes.question}</AccordionTrigger>
                <AccordionContent>{faq.attributes.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
}
