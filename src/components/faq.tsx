import type { Dictionary } from "@/i18n/get-dictionary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/motion/reveal";

export function Faq({ dict }: { dict: Dictionary }) {
  const { faq } = dict;

  return (
    <section id="faq" className="py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
            <span className="size-1.5 rounded-full bg-brass" aria-hidden />
            {faq.eyebrow}
          </span>
          <h2 className="mt-4 text-balance font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            {faq.title}
          </h2>
          <p className="mt-3 text-pretty text-base text-muted-foreground sm:text-lg">
            {faq.subtitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Accordion
            type="single"
            collapsible
            className="mt-10 rounded-3xl border border-border bg-card px-6 sm:px-8"
          >
            {faq.items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="py-5 text-base font-medium text-foreground hover:no-underline sm:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
