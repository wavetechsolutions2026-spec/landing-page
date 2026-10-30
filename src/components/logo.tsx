"use client";

import { Waves } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#home"
      className={cn(
        "flex items-center gap-2 font-semibold tracking-tight",
        className,
      )}
      aria-label="Wave Tech Solution home"
    >
      <Waves className="size-5 text-accent-highlight" aria-hidden="true" />
      <span className="text-foreground">
        Wave Tech <span className="font-normal text-muted-foreground">Solution</span>
      </span>
    </a>
  );
}
