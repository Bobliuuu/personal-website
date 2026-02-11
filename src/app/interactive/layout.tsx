"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { TreeNav } from "@/components/interactive/shell/TreeNav";
import { TopStatusBar } from "@/components/interactive/shell/TopStatusBar";
import { WorkspaceBar } from "@/components/interactive/shell/WorkspaceBar";
import { TerminalOverlay } from "@/components/interactive/terminal/TerminalOverlay";
import { CommandPaletteOverlay } from "@/components/interactive/command-palette/CommandPaletteOverlay";
import { useInteractiveStore } from "@/lib/interactive-store";
import "./interactive.css";

function pathToWorkspace(pathname: string): 1 | 2 | 3 | 4 | 5 | 6 {
  if (pathname === "/interactive" || pathname === "/interactive/terminal") return 1;
  if (pathname.startsWith("/interactive/projects") && typeof window !== "undefined") {
    const tag = new URLSearchParams(window.location.search).get("tag");
    if (tag === "ai") return 4;
    return 2;
  }
  if (pathname.startsWith("/interactive/infra/writing")) return 5;
  if (pathname.startsWith("/interactive/infra")) return 3;
  if (pathname.startsWith("/interactive/workspaces")) return 6;
  return 1;
}

export default function InteractiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const setWorkspace = useInteractiveStore((s) => s.setWorkspace);

  useEffect(() => {
    setWorkspace(pathToWorkspace(pathname));
  }, [pathname, setWorkspace]);

  return (
    <div className="interactive-shell flex min-h-screen flex-col">
      <TopStatusBar />
      <div className="interactive-content flex flex-1 overflow-hidden">
        <TreeNav />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      <WorkspaceBar />
      <TerminalOverlay />
      <CommandPaletteOverlay />
    </div>
  );
}
