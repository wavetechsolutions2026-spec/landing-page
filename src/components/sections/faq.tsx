"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

export function FAQ() {
  return (
    <section id="faq" className="bg-surface border-y border-border/40 py-20 md:py-32">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto mb-16 md:mb-24" delay={0}>
          <h2 className="type-h2 text-foreground">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Have a question? Get in touch for a free quote.
          </p>
        </Reveal>

        <Reveal className="mb-8" delay={0.06}>
          <Accordion type="single" collapsible>
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal className="text-center" delay={0.12}>
          <a
            href="#contact"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent-highlight hover:underline transition-colors"
          >
            Get a quote
          </a>
        </Reveal>
      </div>
    </section>
  );
}
