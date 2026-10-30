import {
  Cpu,
  Headphones,
  MessageCircle,
  Scale,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { whyUs } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageCircle,
  Cpu,
  Scale,
  Headphones,
};

export function WhyUs() {
  return (
    <section id="why-us" className="bg-background py-20 md:py-32">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto mb-16 md:mb-24" delay={0}>
          <h2 className="type-h2 text-foreground">
            Why work with us
          </h2>
          <p className="mt-4 text-muted-foreground">
            A small team focused on clear communication and quality software.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((point, index) => {
            const Icon = ICONS[point.icon];
            return (
              <Reveal key={point.id} className="h-full" delay={index * 0.08}>
                <Card className="h-full">
                  <CardContent className="space-y-3 pt-6">
                    <div className="icon-tile mb-4">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h3 className="type-h3 text-foreground">{point.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {point.label}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
