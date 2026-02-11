import { create } from "zustand";

export type WorkspaceId = 1 | 2 | 3 | 4 | 5 | 6;

export interface InteractiveState {
  terminalOpen: boolean;
  commandPaletteOpen: boolean;
  workspace: WorkspaceId;
  terminalCwd: string;
  terminalNamespace: string | null; // e.g. "proxmox-1" for ssh
  terminalHistory: string[];
  terminalHistoryIndex: number;
  liveMode: boolean;
  setTerminalOpen: (open: boolean) => void;
  toggleTerminal: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  setWorkspace: (w: WorkspaceId) => void;
  setTerminalCwd: (cwd: string) => void;
  setTerminalNamespace: (ns: string | null) => void;
  pushTerminalHistory: (cmd: string) => void;
  setTerminalHistoryIndex: (i: number) => void;
  getTerminalHistoryUp: () => string | null;
  getTerminalHistoryDown: () => string | null;
  setLiveMode: (v: boolean) => void;
}

const INITIAL_CWD = "~";
const MAX_HISTORY = 100;

export const useInteractiveStore = create<InteractiveState>((set, get) => ({
  terminalOpen: false,
  commandPaletteOpen: false,
  workspace: 1,
  terminalCwd: INITIAL_CWD,
  terminalNamespace: null,
  terminalHistory: [],
  terminalHistoryIndex: -1,
  liveMode: false,

  setTerminalOpen: (open) => set({ terminalOpen: open }),
  toggleTerminal: () => set((s) => ({ terminalOpen: !s.terminalOpen })),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  toggleCommandPalette: () => set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),
  setWorkspace: (workspace) => set({ workspace }),
  setTerminalCwd: (terminalCwd) => set({ terminalCwd }),
  setTerminalNamespace: (terminalNamespace) => set({ terminalNamespace }),
  pushTerminalHistory: (cmd) =>
    set((s) => ({
      terminalHistory:
        cmd && s.terminalHistory[0] !== cmd
          ? [cmd, ...s.terminalHistory].slice(0, MAX_HISTORY)
          : s.terminalHistory,
      terminalHistoryIndex: -1,
    })),
  setTerminalHistoryIndex: (i) => set({ terminalHistoryIndex: i }),
  getTerminalHistoryUp: () => {
    const { terminalHistory, terminalHistoryIndex } = get();
    if (terminalHistory.length === 0) return null;
    const next = terminalHistoryIndex === -1 ? 0 : Math.min(terminalHistoryIndex + 1, terminalHistory.length - 1);
    set({ terminalHistoryIndex: next });
    return terminalHistory[next] ?? null;
  },
  getTerminalHistoryDown: () => {
    const { terminalHistory, terminalHistoryIndex } = get();
    if (terminalHistoryIndex <= 0) {
      set({ terminalHistoryIndex: -1 });
      return null;
    }
    const next = terminalHistoryIndex - 1;
    set({ terminalHistoryIndex: next });
    return terminalHistory[next] ?? null;
  },
  setLiveMode: (liveMode) => set({ liveMode }),
}));
