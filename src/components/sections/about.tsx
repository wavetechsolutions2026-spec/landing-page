import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { TeamAvatars } from "@/components/team-avatars";
import { stats, type TeamMember } from "@/lib/content";

export function About({ team }: { team: TeamMember[] }) {
  const [specialists, languages] = stats;

  return (
    <section id="about" className="section-y bg-background">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <span className="eyebrow">About us</span>
          <h2 className="type-h2 mt-4 text-foreground">
            We don&rsquo;t just write code. We build what your business needs.
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            From the first conversation to launch and beyond, you work directly with the people who design and build your product. No middlemen and no hand-offs to strangers.
          </p>
          <Link
            href="#team"
            className="mt-6 inline-flex items-center gap-1.5 font-medium text-accent-highlight hover:underline"
          >
            Meet the team
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal className="grid gap-4 sm:grid-cols-2" delay={0.08}>
          <div className="flex flex-col justify-between gap-10 rounded-2xl bg-primary p-6 text-primary-foreground">
            <TeamAvatars team={team} size={44} className="[&>*]:ring-primary" />
            <div>
              <div className="font-display text-6xl font-bold tracking-tight">{team.length || specialists.value}</div>
              <p className="mt-2 text-sm text-primary-foreground/85">{specialists.label}</p>
            </div>
          </div>
          <div className="theme-dark flex flex-col justify-between gap-10 rounded-2xl bg-ink p-6 text-foreground sm:mt-10">
            <span className="font-display text-sm font-semibold tracking-widest text-accent-highlight">
              EN · MY · TH
            </span>
            <div>
              <div className="font-display text-6xl font-bold tracking-tight">{languages.value}</div>
              <p className="mt-2 text-sm text-muted-foreground">{languages.label}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
