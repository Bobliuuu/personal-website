export interface ParsedCommand {
  name: string;
  args: string[];
  raw: string;
}

export function parseLine(line: string): ParsedCommand {
  const raw = line.trim();
  const parts = raw.split(/\s+/).filter(Boolean);
  const name = parts[0]?.toLowerCase() ?? "";
  const args = parts.slice(1);
  return { name, args, raw };
}

export const KNOWN_COMMANDS = [
  "help", "clear", "ls", "cd", "pwd", "open", "cat", "status", "neofetch",
  "deploy", "ssh", "exit",
];

export function completeCommand(prefix: string): string[] {
  if (!prefix) return KNOWN_COMMANDS;
  const lower = prefix.toLowerCase();
  return KNOWN_COMMANDS.filter((c) => c.startsWith(lower));
}
