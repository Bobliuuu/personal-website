"use client";

import { motion } from "framer-motion";

type Variant = "healthy" | "warning" | "error" | "neutral" | "live";

const variants: Record<Variant, string> = {
  healthy: "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
  warning: "border-amber-500/50 bg-amber-500/10 text-amber-400",
  error: "border-red-500/50 bg-red-500/10 text-red-400",
  neutral: "border-white/20 bg-white/5 text-white/70",
  live: "border-cyan-500/50 bg-cyan-500/10 text-cyan-400",
};

interface ChipProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

export function Chip({ children, variant = "neutral", className = "" }: ChipProps) {
  return (
    <motion.span
      initial={{ scale: 0.95, opacity: 0.9 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </motion.span>
  );
}
