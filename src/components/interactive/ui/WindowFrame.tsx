"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface WindowFrameProps {
  title: string;
  children: ReactNode;
  className?: string;
  focused?: boolean;
  onFocus?: () => void;
  onTitlePointerDown?: (e: React.PointerEvent) => void;
}

export function WindowFrame({ title, children, className = "", focused = true, onFocus, onTitlePointerDown }: WindowFrameProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      onClick={onFocus}
      className={`
        flex flex-col overflow-hidden rounded-md border shadow-lg
        ${focused ? "border-cyan-500/40 bg-gray-900/95 ring-1 ring-cyan-500/20" : "border-white/10 bg-gray-900/80"}
        ${className}
      `}
    >
      <div
        className={`
          flex items-center gap-2 border-b px-3 py-2
          ${focused ? "border-cyan-500/20 bg-white/[0.04]" : "border-white/10 bg-white/[0.02]"}
          ${onTitlePointerDown ? "cursor-grab active:cursor-grabbing" : ""}
        `}
        onPointerDown={onTitlePointerDown}
      >
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <span className="ml-2 text-xs font-medium text-white/80">{title}</span>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </motion.div>
  );
}
