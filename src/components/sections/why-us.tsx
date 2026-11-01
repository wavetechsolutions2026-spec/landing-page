import {
  Cpu,
  Headphones,
  MessageCircle,
  Scale,
} from "lucide-react";
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
    <section id="why-us" className="section-y bg-background">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <span className="eyebrow">Why choose us</span>
          <h2 className="type-h2 mt-4 text-foreground">
            A team that speaks your language
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            A small team focused on clear communication and quality software. You always know what we&rsquo;re working on and why.
          </p>
        </Reveal>

        <ul className="divide-y divide-border border-y border-border">
          {whyUs.map((point, index) => {
            const Icon = ICONS[point.icon];
            return (
              <li key={point.id}>
                <Reveal className="flex gap-5 py-6" delay={index * 0.06}>
                  <div className="icon-tile">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="type-h3 text-foreground">{point.title}</h3>
                    <p className="mt-1 text-muted-foreground leading-relaxed">
                      {point.label}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
