import { processSteps } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

export function Process() {
  return (
    <section id="process" className="section-y bg-surface">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto mb-12 md:mb-16" delay={0}>
          <span className="eyebrow">How we work</span>
          <h2 className="type-h2 mt-4 text-foreground">
            From first call to launch
          </h2>
          <p className="mt-4 text-muted-foreground">
            A simple, transparent process from start to launch.
          </p>
        </Reveal>

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step.id}>
              <Reveal className="h-full rounded-2xl bg-card p-6" delay={index * 0.08}>
                <span className="font-display text-4xl font-bold text-accent-highlight" aria-hidden="true">
                  {String(step.step).padStart(2, "0")}
                </span>
                <h3 className="type-h3 mt-6 text-foreground">
                  <span className="sr-only">Step {step.step}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
