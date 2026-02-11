"use client";

import { motion } from "framer-motion";
import { TerminalCore } from "@/components/interactive/terminal/TerminalCore";

export default function TerminalPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-[calc(100vh-120px)] flex-col p-4"
    >
      <div className="mb-2 text-xs text-white/50">Full-page terminal</div>
      <div className="flex-1 min-h-0">
        <TerminalCore className="h-full" minHeight="100%" />
      </div>
    </motion.div>
  );
}
