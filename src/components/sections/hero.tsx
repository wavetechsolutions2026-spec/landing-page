import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LaptopMockup } from "@/components/laptop-mockup";
import { TeamAvatars } from "@/components/team-avatars";
import type { TeamMember, Tech } from "@/lib/content";

// Rendered without reveal animations so the headline is visible on first
// paint, before JavaScript loads.
export function Hero({ team, techStack }: { team: TeamMember[]; techStack: Tech[] }) {
  return (
    <section id="home" className="hero-glow overflow-hidden pt-16 md:pt-24">
      <div className="container-page text-center">
        <span className="eyebrow">
          <span className="size-1.5 rounded-full bg-accent-highlight" aria-hidden="true" />
          Serving Myanmar, Thailand, and remote clients
        </span>

        <h1 className="type-display mx-auto mt-6 max-w-4xl text-foreground">
          Websites, online stores{" "}
          {/* The team, set into the headline like an inline image. */}
          <span className="hidden translate-y-[-0.1em] items-center rounded-full border border-card-border bg-background p-1.5 align-middle shadow-sm sm:inline-flex">
            <TeamAvatars team={team} size={44} />
          </span>{" "}
          and apps for your business.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          A small team covering development, design, and project management. We design and build websites, online stores, mobile apps, and custom software for businesses in Myanmar, Thailand, and beyond.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link href="#contact">
              Get a free quote
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#team">Meet the team</Link>
          </Button>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <p className="text-sm text-muted-foreground">Built with tools trusted worldwide</p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {techStack.map((tool) => (
              <li
                key={tool.id}
                className="flex items-center gap-2 font-display text-lg font-semibold text-foreground/70"
              >
                {tool.logo && (
                  // Plain img: logos are small, and SVGs vary in aspect ratio.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={tool.logo} alt="" className="h-6 w-auto" loading="lazy" />
                )}
                {tool.name}
              </li>
            ))}
          </ul>
        </div>

        <LaptopMockup className="theme-dark mx-auto mt-14 max-w-4xl md:mt-16" />
      </div>
    </section>
  );
}
