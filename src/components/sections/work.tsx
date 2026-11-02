import Image from "next/image";
import { ArrowUpRight, Car, Cloud, Gift, GraduationCap, HeartPulse, House } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { MiniAvatar } from "@/components/team-avatars";
import { industries, type Project, type TeamMember } from "@/lib/content";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  HeartPulse,
  Gift,
  GraduationCap,
  Car,
  House,
  Cloud,
};

// Placeholder panels cycle through three tones so a row of image-less cards
// still has rhythm. Replaced by `project.image` once photos are supplied.
const TONES = [
  "bg-accent-fill text-accent-highlight",
  "bg-primary text-primary-foreground",
  "theme-dark bg-ink text-accent-highlight",
];

export function Work({ projects, team }: { projects: Project[]; team: TeamMember[] }) {
  // Each industry tile names the people whose projects are in it.
  const peopleIn = (industryId: string) =>
    [...new Set(projects.filter((p) => p.industry === industryId).flatMap((p) => p.members))].filter(Boolean);

  return (
    <section id="work" className="section-y bg-background">
      <div className="container-page">
        <Reveal className="max-w-2xl mb-12" delay={0}>
          <span className="eyebrow">Our work</span>
          <h2 className="type-h2 mt-4 text-foreground">
            Selected work from our team
          </h2>
          <p className="mt-4 text-muted-foreground">
            Before starting Wave Tech, we designed, built, and delivered products across these industries. Each project below is our team members&rsquo; own work.
          </p>
        </Reveal>

        <Reveal delay={0.04}>
          <h3 className="sr-only">Industries we have worked in</h3>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {industries.map((industry) => {
              const Icon = ICONS[industry.icon];
              return (
                <li
                  key={industry.id}
                  className="flex flex-col gap-3 rounded-2xl border border-card-border bg-card p-4"
                >
                  <div className="icon-tile">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{industry.title}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{peopleIn(industry.id).join(", ")}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.id}>
              <Reveal className="h-full" delay={(index % 3) * 0.08}>
                <ProjectCard
                  project={project}
                  members={project.members.flatMap((name) => team.find((m) => m.shortName === name) ?? [])}
                  tone={TONES[index % TONES.length]}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({ project, members, tone }: { project: Project; members: TeamMember[]; tone: string }) {
  const industry = industries.find((i) => i.id === project.industry);
  const Icon = industry ? ICONS[industry.icon] : null;

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-card-border bg-card p-3 transition-shadow hover:shadow-md">
      <div className={cn("relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl", !project.image && tone)}>
        {project.image ? (
          <Image
            className="object-cover"
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
          />
        ) : (
          <>
            <span className="dot-grid absolute inset-0 opacity-15" aria-hidden="true" />
            {Icon && <Icon className="relative size-14 opacity-90" aria-hidden="true" />}
          </>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-background px-2.5 py-1 text-xs font-medium text-foreground shadow-sm">
          {industry?.title}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-3 pt-5">
        <div>
          <div className="text-sm font-medium text-accent-highlight">{project.category}</div>
          <h3 className="type-h3 mt-1 text-foreground">{project.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{project.summary}</p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
          <div className="flex min-w-0 items-center gap-2.5">
            {members.length > 0 && (
              <span className="inline-flex shrink-0 -space-x-2">
                {members.map((member) => (
                  <MiniAvatar key={member.id ?? member.name} member={member} size={32} />
                ))}
              </span>
            )}
            <div className="min-w-0 text-xs">
              <div className="font-medium text-foreground">
                {formatNames(project.members)}
                <span className="ml-1.5 rounded-full bg-muted px-1.5 py-0.5 font-normal text-muted-foreground">
                  {project.members.length > 1 ? "Joint project" : "Individual project"}
                </span>
              </div>
              <div className="truncate text-muted-foreground">{project.context}</div>
            </div>
          </div>
          {/* Stretched link: the whole card opens the project. */}
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full p-2 text-accent-highlight transition-colors after:absolute after:inset-0 after:rounded-2xl group-hover:bg-accent-fill"
            aria-label={`${project.linkLabel}: ${project.title}`}
          >
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

// "Kyaw", "Kyaw & Thuta", "Kyaw, Thuta & Christine"
function formatNames(names: string[]) {
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} & ${names.at(-1)}` : (names[0] ?? "");
}
