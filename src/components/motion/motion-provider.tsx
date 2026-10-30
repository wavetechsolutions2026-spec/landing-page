"use client";

import { MotionConfig } from "motion/react";

// "user" follows the OS reduced-motion setting: transforms are skipped,
// opacity fades still run. Keeps server and client markup identical.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
