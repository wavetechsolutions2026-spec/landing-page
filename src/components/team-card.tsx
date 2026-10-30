"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { type TeamMember } from "@/lib/content";

export function TeamCard({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col gap-4 pt-6">
        <div className="flex items-center gap-3">
          {member.photo ? (
            <Image
              className="h-12 w-12 rounded-full object-cover"
              src={member.photo}
              alt={`Photo of ${member.name}`}
              width={48}
              height={48}
              priority
            />
          ) : (
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-accent-fill/30 font-medium text-accent-highlight">
                {initials}
              </AvatarFallback>
            </Avatar>
          )}
          <div>
            <h3 className="type-h3 text-foreground">
              {member.name}
            </h3>
            <div className="text-sm text-muted-foreground">{member.role}</div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {member.bio}
        </p>

        <div className="flex flex-wrap gap-2">
          {member.skills.slice(0, 5).map((skill) => (
            <Badge key={skill} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex flex-col sm:flex-row gap-2 sm:gap-3">
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
      </CardContent>
    </Card>
  );
}

function ExternalButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Button asChild variant="outline" className="sm:flex-1">
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    </Button>
  );
}
