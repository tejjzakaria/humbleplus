"use client";

import { createContext, useContext, Children, isValidElement } from "react";
import { motion, type Transition } from "framer-motion";

const easeOut: Transition["ease"] = [0.22, 1, 0.36, 1];

/** Fades and slides a single block into view once as it enters the viewport. */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerGroup/StaggerItem intentionally avoid framer-motion's parent->child
 * variant propagation (context-based orchestration is unreliable in this
 * app's React/framer-motion combo) and instead give each item its own
 * whileInView animation with a delay derived from its sibling index.
 */
const StaggerIndexContext = createContext(0);

export function StaggerGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <div className={className}>
      {items.map((child, index) => (
        <StaggerIndexContext.Provider key={child.key ?? index} value={index}>
          {child}
        </StaggerIndexContext.Provider>
      ))}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const index = useContext(StaggerIndexContext);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}
