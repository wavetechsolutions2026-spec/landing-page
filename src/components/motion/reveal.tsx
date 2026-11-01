"use client";

import { motion } from "motion/react";

// Slides content up as it scrolls into view. Opacity is never animated, so
// the server-rendered markup is readable before JavaScript loads.
// Reduced motion is handled globally by MotionProvider.
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
