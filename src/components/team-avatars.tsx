import Image from "next/image";
import type { TeamMember } from "@/lib/content";
import { cn } from "@/lib/utils";

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Overlapping round photos of the team; initials stand in for missing photos.
export function TeamAvatars({
  team,
  className,
  size = 40,
}: {
  team: TeamMember[];
  className?: string;
  size?: number;
}) {
  return (
    <span className={cn("inline-flex -space-x-2.5", className)} aria-hidden="true">
      {team.map((member) => (
        <MiniAvatar key={member.id ?? member.name} member={member} size={size} />
      ))}
    </span>
  );
}

export function MiniAvatar({ member, size }: { member: TeamMember; size: number }) {
  const style = { width: size, height: size };
  const ring = "rounded-full ring-2 ring-background";

  return member.photo ? (
    <Image
      className={cn(ring, "object-cover")}
      style={style}
      src={member.photo}
      alt=""
      width={size}
      height={size}
    />
  ) : (
    <span
      className={cn(ring, "inline-flex items-center justify-center bg-accent-fill text-xs font-semibold text-accent-highlight")}
      style={style}
    >
      {initials(member.name)}
    </span>
  );
}
