import { team } from "@/lib/content";
import { TeamCard } from "@/components/team-card";
import { Reveal } from "@/components/motion/reveal";

export function Team() {
  return (
    <section id="team" className="bg-background py-20 md:py-32">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto mb-16 md:mb-24" delay={0}>
          <h2 className="type-h2 text-foreground">
            Meet the team
          </h2>
          <p className="mt-4 text-muted-foreground">
            A small team of developers. Explore our individual work below.
          </p>
        </Reveal>

        <div className="card-row">
          {team.map((member, index) => (
            <Reveal key={member.name} className="card-row-item" delay={index * 0.08}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
