import { processSteps } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

export function Process() {
  return (
    <section id="process" className="bg-surface border-y border-border/40 py-20 md:py-32">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto mb-16 md:mb-24" delay={0}>
          <h2 className="type-h2 text-foreground">
            How we work
          </h2>
          <p className="mt-4 text-muted-foreground">
            A simple, transparent process from start to launch.
          </p>
        </Reveal>

        <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, index) => (
            <li key={step.id}>
              <Reveal className="h-full" delay={index * 0.08}>
                <ProcessStep step={step} isLast={index === processSteps.length - 1} />
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  isLast,
}: {
  step: (typeof processSteps)[number];
  isLast: boolean;
}) {
  return (
    <div className="relative flex gap-4 lg:flex-col">
      {/* Connector: vertical below the number on mobile, horizontal toward the next number on desktop. */}
      {!isLast && (
        <span
          className="absolute left-4 top-10 -bottom-8 w-px bg-border lg:left-12 lg:-right-4 lg:top-4 lg:bottom-auto lg:h-px lg:w-auto"
          aria-hidden="true"
        />
      )}
      <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-fill text-sm font-semibold text-white">
        {step.step}
      </span>
      <div className="space-y-2">
        <h3 className="type-h3 text-foreground">
          {step.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}
