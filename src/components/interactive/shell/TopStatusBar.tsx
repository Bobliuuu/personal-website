"use client";

import { Chip } from "../ui";
import { useInteractiveStore } from "@/lib/interactive-store";

const BUILD_HASH = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local";

export function TopStatusBar() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "UTC";
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const date = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const setTerminalOpen = useInteractiveStore((s) => s.setTerminalOpen);
  const setCommandPaletteOpen = useInteractiveStore((s) => s.setCommandPaletteOpen);

  return (
    <header
      className="flex items-center justify-between border-b border-white/10 bg-black/30 px-4 py-2"
      role="banner"
    >
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-white/90">Cluster: JERRY-CORE</span>
        <span className="text-xs text-white/50">build {BUILD_HASH}</span>
        <span className="text-xs text-white/50">{tz}</span>
        <button
          type="button"
          onClick={() => setTerminalOpen(true)}
          className="rounded px-2 py-1 text-xs text-white/60 hover:bg-white/10 hover:text-white/90"
          title="Toggle terminal (`)"
        >
          Terminal
        </button>
        <button
          type="button"
          onClick={() => setCommandPaletteOpen(true)}
          className="rounded px-2 py-1 text-xs text-white/60 hover:bg-white/10 hover:text-white/90"
          title="Command palette (⌘K)"
        >
          ⌘K
        </button>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-white/50">
          {date} {time}
        </span>
        <Chip variant="healthy">HEALTHY</Chip>
      </div>
    </header>
  );
}
