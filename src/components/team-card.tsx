"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type TeamMember } from "@/lib/content";
import { initials } from "@/components/team-avatars";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-card-border bg-card p-3">
      {/* Full-width portrait; needs a large source (1200x900) to stay sharp. */}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-accent-fill">
        {member.portrait ? (
          <Image
            className="object-cover"
            src={member.portrait}
            alt={`Photo of ${member.name}`}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
            priority
          />
        ) : (
          <span className="font-display text-6xl font-bold text-accent-highlight" aria-hidden="true">
            {initials(member.name)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-3 pt-5">
        <div>
          <h3 className="type-h3 text-foreground">{member.name}</h3>
          <div className="text-sm font-medium text-accent-highlight">{member.role}</div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {member.bio}
        </p>

        <div className="flex flex-wrap gap-2">
          {member.skills.slice(0, 5).map((skill) => (
            <Badge key={skill} variant="outline" className="font-normal">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {member.portfolioUrl && (
            <ExternalButton href={member.portfolioUrl}>Portfolio</ExternalButton>
          )}
          {member.githubUrl && (
            <ExternalButton href={member.githubUrl}>GitHub</ExternalButton>
          )}
          {member.linkedinUrl && (
            <ExternalButton href={member.linkedinUrl}>LinkedIn</ExternalButton>
          )}
        </div>
      </div>
    </article>
  );
}

function ExternalButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Button asChild variant="outline" size="sm" className="h-10 px-4">
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <ArrowUpRight aria-hidden="true" />
      </Link>
    </Button>
  );
}
