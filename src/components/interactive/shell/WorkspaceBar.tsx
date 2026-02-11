"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useInteractiveStore, type WorkspaceId } from "@/lib/interactive-store";

const WORKSPACES: { id: WorkspaceId; path: string; label: string }[] = [
  { id: 1, path: "/interactive", label: "Overview" },
  { id: 2, path: "/interactive/projects", label: "Projects" },
  { id: 3, path: "/interactive/infra", label: "Infra" },
  { id: 4, path: "/interactive/projects?tag=ai", label: "AI/ML" },
  { id: 5, path: "/interactive/infra/writing", label: "Writing" },
  { id: 6, path: "/interactive/workspaces", label: "Playground" },
];

function pathMatchesWorkspace(pathname: string, path: string): boolean {
  if (path === "/interactive") return pathname === "/interactive" || pathname === "/interactive/terminal";
  if (path.startsWith("/interactive/projects?tag=")) return pathname === "/interactive/projects" && typeof window !== "undefined" && new URLSearchParams(window.location.search).get("tag") === "ai";
  return pathname.startsWith(path);
}

export function WorkspaceBar() {
  const pathname = usePathname();
  const workspace = useInteractiveStore((s) => s.workspace);
  const setWorkspace = useInteractiveStore((s) => s.setWorkspace);

  return (
    <footer
      className="flex items-center justify-center gap-1 border-t border-white/10 bg-black/30 py-2"
      role="navigation"
      aria-label="Workspaces"
    >
      {WORKSPACES.map((w) => {
        const isActive = pathMatchesWorkspace(pathname, w.path) || workspace === w.id;
        return (
          <Link
            key={w.id}
            href={w.path}
            onClick={() => setWorkspace(w.id)}
            className="relative flex h-9 w-9 items-center justify-center rounded text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white/90 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            aria-current={isActive ? "true" : undefined}
            title={w.label}
          >
            {isActive && (
              <motion.span
                layoutId="workspace-indicator"
                className="absolute inset-0 rounded bg-cyan-500/25 ring-1 ring-cyan-500/40"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{w.id}</span>
          </Link>
        );
      })}
    </footer>
  );
}
