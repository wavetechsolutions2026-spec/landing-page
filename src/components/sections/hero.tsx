import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LaptopMockup } from "@/components/laptop-mockup";

// Rendered without reveal animations so the headline is visible on first
// paint, before JavaScript loads.
export function Hero() {
  return (
    <section id="home" className="hero-glow bg-background py-20 md:py-32">
      <div className="container-page text-center">
        <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-muted-foreground">
          <span className="size-1.5 rounded-full bg-accent-highlight" aria-hidden="true" />
          Serving Myanmar, Thailand, and remote clients
        </span>

        <h1 className="type-display mx-auto mt-6 max-w-4xl text-foreground">
          Websites, online stores and apps for your business.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground leading-relaxed md:text-xl">
          We design and build websites, online stores, mobile apps, and custom software for businesses in Myanmar, Thailand, and beyond.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="px-8">
            <Link href="#contact">Get a quote</Link>
          </Button>
          <Button asChild variant="outline" className="px-8">
            <Link href="#services">Our services</Link>
          </Button>
        </div>

        <LaptopMockup className="mx-auto mt-16 max-w-4xl md:mt-20" />
      </div>
    </section>
  );
}
