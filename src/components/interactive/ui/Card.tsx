"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  noPadding?: boolean;
  id?: string;
}

export function Card({ children, className = "", title, noPadding, id }: CardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`
        rounded-md border border-white/10 bg-white/[0.03] shadow-sm
        ${noPadding ? "" : "p-4"}
        ${className}
      `}
    >
      {title && (
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/70">
          {title}
        </h3>
      )}
      {children}
    </motion.div>
  );
}
