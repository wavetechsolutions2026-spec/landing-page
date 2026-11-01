"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

export function FAQ() {
  return (
    <section id="faq" className="section-y bg-background">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal className="self-start">
          <span className="eyebrow">FAQ</span>
          <h2 className="type-h2 mt-4 text-foreground">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Have a question that isn&rsquo;t here? Get in touch for a free quote.
          </p>
          <Button asChild className="mt-8">
            <Link href="#contact">Get a quote</Link>
          </Button>
        </Reveal>

        <Reveal className="rounded-2xl border border-card-border bg-card px-6" delay={0.06}>
          <Accordion type="single" collapsible>
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="last:border-b-0">
                <AccordionTrigger className="py-5 text-left text-base text-foreground hover:no-underline hover:text-accent-highlight">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
