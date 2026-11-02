import type { TeamMember } from "@/lib/content";
import { TeamCard } from "@/components/team-card";
import { Reveal } from "@/components/motion/reveal";

export function Team({ team }: { team: TeamMember[] }) {
  return (
    <section id="team" className="section-y bg-surface">
      <div className="container-page">
        <Reveal className="max-w-2xl mb-12 md:mb-16" delay={0}>
          <span className="eyebrow">Our team</span>
          <h2 className="type-h2 mt-4 text-foreground">
            The people behind your project
          </h2>
          <p className="mt-4 text-muted-foreground">
            A developer, a project manager, and a product designer. Each of us has delivered real projects. Explore our individual work below.
          </p>
        </Reveal>

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <li key={member.id ?? member.name}>
              <Reveal className="h-full" delay={index * 0.08}>
                <TeamCard member={member} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
