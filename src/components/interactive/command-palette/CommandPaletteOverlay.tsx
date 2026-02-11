"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useInteractiveStore } from "@/lib/interactive-store";
import { projects, docs } from "@/content/registry";

type PaletteItem = {
  id: string;
  label: string;
  subtitle?: string;
  type: "route" | "command" | "project" | "doc";
  path?: string;
  action?: () => void;
};

const NAV_ITEMS: PaletteItem[] = [
  { id: "nav-dashboard", label: "Dashboard", type: "route", path: "/interactive" },
  { id: "nav-projects", label: "Projects", type: "route", path: "/interactive/projects" },
  { id: "nav-infra", label: "Infra", type: "route", path: "/interactive/infra" },
  { id: "nav-workspaces", label: "Workspaces", type: "route", path: "/interactive/workspaces" },
  { id: "nav-terminal", label: "Terminal", type: "route", path: "/interactive/terminal" },
];

export function CommandPaletteOverlay() {
  const router = useRouter();
  const isOpen = useInteractiveStore((s) => s.commandPaletteOpen);
  const setOpen = useInteractiveStore((s) => s.setCommandPaletteOpen);
  const setTerminalOpen = useInteractiveStore((s) => s.setTerminalOpen);

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items = useMemo((): PaletteItem[] => {
    const q = query.trim().toLowerCase();
    const result: PaletteItem[] = [];
    if (!q) {
      result.push(
        ...NAV_ITEMS,
        { id: "cmd-terminal", label: "Open Terminal", subtitle: "`", type: "command", action: () => setTerminalOpen(true) }
      );
      return result;
    }
    NAV_ITEMS.forEach((item) => {
      if (item.label.toLowerCase().includes(q)) result.push(item);
    });
    projects.forEach((p) => {
      if (p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q)) {
        result.push({ id: `proj-${p.slug}`, label: p.title, subtitle: p.slug, type: "project", path: `/interactive/projects/${p.slug}` });
      }
    });
    docs.forEach((d) => {
      if (d.title.toLowerCase().includes(q) || d.slug.toLowerCase().includes(q)) {
        result.push({ id: `doc-${d.slug}`, label: d.title, subtitle: d.slug, type: "doc", path: `/interactive/infra/${d.slug}` });
      }
    });
    if ("terminal".includes(q)) result.push({ id: "cmd-terminal", label: "Open Terminal", subtitle: "`", type: "command", action: () => setTerminalOpen(true) });
    return result.slice(0, 12);
  }, [query, setTerminalOpen]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!isOpen);
        setQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape") setOpen(false);
    },
    [isOpen, setOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const select = useCallback(
    (item: PaletteItem) => {
      if (item.action) {
        item.action();
        setOpen(false);
        return;
      }
      if (item.path) {
        router.push(item.path);
        setOpen(false);
      }
    },
    [router, setOpen]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % items.length);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + items.length) % items.length);
    }
    if (e.key === "Enter" && items[selectedIndex]) {
      e.preventDefault();
      select(items[selectedIndex]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-xl -translate-x-1/2 rounded-lg border border-white/10 bg-gray-900/95 shadow-xl"
            role="dialog"
            aria-label="Command palette"
          >
            <div className="border-b border-white/10 px-3 py-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search commands, projects, infra..."
                className="w-full border-none bg-transparent py-2 text-sm text-white placeholder:text-white/40 outline-none"
                autoFocus
                aria-label="Search"
              />
            </div>
            <ul className="max-h-72 overflow-auto py-2">
              {items.length === 0 ? (
                <li className="px-4 py-3 text-sm text-white/50">No results</li>
              ) : (
                items.map((item, i) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => select(item)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`
                        flex w-full items-center justify-between gap-2 px-4 py-2 text-left text-sm
                        ${i === selectedIndex ? "bg-cyan-500/20 text-cyan-100" : "text-white/90 hover:bg-white/5"}
                      `}
                    >
                      <span>{item.label}</span>
                      {item.subtitle && <span className="text-xs text-white/50">{item.subtitle}</span>}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
