"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInteractiveStore } from "@/lib/interactive-store";
import { TerminalCore } from "./TerminalCore";

export function TerminalOverlay() {
  const isOpen = useInteractiveStore((s) => s.terminalOpen);
  const setOpen = useInteractiveStore((s) => s.setTerminalOpen);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "`" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setOpen(!useInteractiveStore.getState().terminalOpen);
      }
      if (e.key === "Escape") setOpen(false);
    },
    [setOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-4xl px-4 pb-4 pt-2"
            role="dialog"
            aria-label="Terminal overlay"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-gray-900/95 px-3 py-2 rounded-t border border-b-0 border-white/10">
              <span className="text-xs font-medium text-white/70">Terminal (Esc or ` to close)</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded px-2 py-1 text-xs text-white/60 hover:bg-white/10 hover:text-white/90 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              >
                Close
              </button>
            </div>
            <TerminalCore className="rounded-b" minHeight="280px" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
