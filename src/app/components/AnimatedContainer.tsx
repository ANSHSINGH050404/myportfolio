"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  initialY?: number;
  as?: "div" | "article" | "section" | "header" | "footer";
}

export default function AnimatedContainer({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  initialY = 20,
  as = "div",
}: AnimatedContainerProps) {
  const MotionComponent = motion[as];

  return (
    <MotionComponent
      initial={{ opacity: 0, y: initialY }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
