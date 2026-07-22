import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { FAQCategory, FAQItem } from "@/lib/types/faq";

interface FaqAccordionSectionProps {
  t: (key: string) => string;
  groupedFaqItems: Array<{ category: FAQCategory; items: FAQItem[] }>;
}

/**
 * Renders grouped FAQ categories, each as a card containing an accordion of question/answer pairs.
 */
export function FaqAccordionSection({ t, groupedFaqItems }: FaqAccordionSectionProps) {
  return (
    <section className="space-y-6">
      {groupedFaqItems.map((group) => (
        <Card key={group.category}>
          <CardHeader>
            <CardTitle>{t(`categories.${group.category}.title`)}</CardTitle>
            <CardDescription>{t(`categories.${group.category}.description`)}</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {group.items.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.attributes.question}</AccordionTrigger>
                  <AccordionContent>{item.attributes.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
