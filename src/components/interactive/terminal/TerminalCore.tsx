"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { parseLine } from "@/lib/terminal/parser";
import { runCommand, getCompletions } from "@/lib/terminal/commands";
import { useInteractiveStore } from "@/lib/interactive-store";

function Prompt({ cwd, namespace }: { cwd: string; namespace: string | null }) {
  const user = namespace ? "jerry" : "jerry";
  const host = namespace ?? "control-plane";
  return (
    <span className="text-cyan-400">
      {user}@{host}:<span className="text-amber-400/90">{cwd}</span>$
    </span>
  );
}

interface TerminalCoreProps {
  className?: string;
  minHeight?: string;
}

export function TerminalCore({ className = "", minHeight = "200px" }: TerminalCoreProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const cwd = useInteractiveStore((s) => s.terminalCwd);
  const namespace = useInteractiveStore((s) => s.terminalNamespace);
  const setCwd = useInteractiveStore((s) => s.setTerminalCwd);
  const setNamespace = useInteractiveStore((s) => s.setTerminalNamespace);
  const pushHistory = useInteractiveStore((s) => s.pushTerminalHistory);
  const getHistoryUp = useInteractiveStore((s) => s.getTerminalHistoryUp);
  const getHistoryDown = useInteractiveStore((s) => s.getTerminalHistoryDown);

  const [lines, setLines] = useState<{ type: "prompt" | "output" | "command"; content: string }[]>([
    { type: "output", content: "Control Plane terminal. Type 'help' for commands." },
  ]);
  const [input, setInput] = useState("");
  const [completionIndex, setCompletionIndex] = useState(0);

  const focusInput = useCallback(() => inputRef.current?.focus(), []);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [lines]);

  const run = useCallback(
    (raw: string) => {
      if (!raw.trim()) {
        setLines((prev) => [...prev, { type: "prompt", content: "" }]);
        return;
      }
      pushHistory(raw);
      setLines((prev) => [...prev, { type: "command", content: raw }]);
      const parsed = parseLine(raw);
      const result = runCommand(parsed, cwd, namespace);
      if (result.setCwd !== undefined) setCwd(result.setCwd);
      if (result.setNamespace !== undefined) setNamespace(result.setNamespace);
      if (result.clearScreen) {
        setLines([{ type: "output", content: "" }]);
        return;
      }
      if (result.navigate) router.push(result.navigate);
      if (result.output.length) {
        setLines((prev) => [...prev, ...result.output.map((o) => ({ type: "output" as const, content: o }))]);
      }
      setLines((prev) => [...prev, { type: "prompt", content: "" }]);
    },
    [cwd, namespace, pushHistory, setCwd, setNamespace, router]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      run(input);
      setInput("");
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const prefix = input.trim();
      const comps = getCompletions(prefix, cwd);
      if (comps.length === 0) return;
      const chosen = comps[completionIndex % comps.length];
      const parts = prefix.split(/\s+/);
      if (parts.length <= 1) setInput(chosen + " ");
      else {
        parts[parts.length - 1] = chosen;
        setInput(parts.join(" ") + " ");
      }
      setCompletionIndex((i) => (i + 1) % comps.length);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = getHistoryUp();
      if (prev !== null) setInput(prev);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = getHistoryDown();
      setInput(next ?? "");
      return;
    }
    setCompletionIndex(0);
  };

  return (
    <div
      className={`flex flex-col overflow-hidden rounded border border-white/10 bg-black/60 font-mono text-sm ${className}`}
      style={{ minHeight }}
      onClick={focusInput}
    >
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-3 font-mono-interactive text-xs leading-relaxed"
      >
        {lines.map((line, i) => (
          <div key={i} className="mb-0.5">
            {line.type === "prompt" && (
              <span>
                <Prompt cwd={cwd} namespace={namespace} /> {line.content}
              </span>
            )}
            {line.type === "command" && (
              <span>
                <Prompt cwd={cwd} namespace={namespace} /> <span className="text-white/90">{line.content}</span>
              </span>
            )}
            {line.type === "output" && (
              <span className="text-white/70">{line.content || " "}</span>
            )}
          </div>
        ))}
        <div className="flex items-center gap-1">
          <Prompt cwd={cwd} namespace={namespace} />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-w-[200px] flex-1 border-none bg-transparent px-1 py-0 text-white/90 outline-none placeholder:text-white/40"
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  );
}
