"use client";

import { motion } from "framer-motion";

/** Wraps a single interactive child (e.g. a Button) with a subtle hover/tap scale. */
export function TapScale({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.div>
  );
}
