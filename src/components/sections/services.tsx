import { Code, Layout, LayoutGrid, ShoppingCart, Smartphone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { services } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Layout,
  LayoutGrid,
  ShoppingCart,
  Smartphone,
  Code,
};

export function Services() {
  return (
    <section id="services" className="bg-surface border-y border-border/40">
      <div className="container-page py-20 md:py-32">
        <Reveal className="text-center max-w-2xl mx-auto mb-16 md:mb-24" delay={0}>
          <h2 className="type-h2 text-foreground">
            What we build
          </h2>
          <p className="mt-4 text-muted-foreground">
            Pick what you need. Not sure? We&rsquo;ll help you choose.
          </p>
        </Reveal>

        <div className="card-row">
          {services.map((service, index) => (
            <Reveal key={service.id} className="card-row-item" delay={index * 0.08}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const Icon = ICONS[service.icon];

  return (
    <Card className="h-full hover:border-accent-highlight/50 transition-colors">
      <CardHeader className="space-y-2">
        <div className="icon-tile mb-2">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <CardTitle className="text-foreground">{service.title}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1 text-sm text-muted-foreground">
          {service.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="shrink-0" aria-hidden="true">•</span>{bullet}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
