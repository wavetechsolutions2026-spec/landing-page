import Link from "next/link";
import { Check, Code, Layout, LayoutGrid, ShoppingCart, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Layout,
  LayoutGrid,
  ShoppingCart,
  Smartphone,
  Code,
};

export function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="section-y bg-surface">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal className="self-start lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
          <span className="eyebrow">Our services</span>
          <h2 className="type-h2 mt-4 text-foreground">
            What we build
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Pick what you need. Not sure? We&rsquo;ll help you choose the right fit for your goals and budget.
          </p>
          <Button asChild variant="outline" className="mt-8">
            <Link href="#contact">Ask us which fits</Link>
          </Button>
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2">
          {services.map((service, index) => (
            <li
              key={service.id}
              // An odd last card spans both columns instead of sitting alone.
              className={cn(index === services.length - 1 && services.length % 2 === 1 && "sm:col-span-2")}
            >
              <Reveal className="h-full" delay={(index % 2) * 0.08}>
                <ServiceCard service={service} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = ICONS[service.icon] ?? Code;

  return (
    <article className="h-full rounded-2xl border border-card-border bg-card p-6 transition-shadow hover:shadow-md">
      <div className="icon-tile">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <h3 className="type-h3 mt-5 text-foreground">{service.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
      <ul className="mt-4 space-y-2 text-sm text-foreground">
        {service.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-accent-highlight" aria-hidden="true" />
            {bullet}
          </li>
        ))}
      </ul>
    </article>
  );
}
