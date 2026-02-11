import type { ParsedCommand } from "./parser";
import { completeCommand as completeCmd } from "./parser";
import {
  nodes,
  services,
  projects,
  deployEvents,
  docs,
  getDocBySlug,
  getProjectBySlug,
  getNodeById,
} from "@/content/registry";

export type CommandResult = {
  output: string[];
  navigate?: string;
  clearScreen?: boolean;
  setCwd?: string;
  setNamespace?: string | null;
};

function normalizePath(cwd: string, arg: string): string {
  if (arg === "~" || arg === "") return "~";
  if (arg === "..") {
    if (cwd === "~" || cwd === "~/") return "~";
    const parts = cwd.replace(/^~\//, "").split("/").filter(Boolean);
    parts.pop();
    return parts.length ? "~/" + parts.join("/") : "~";
  }
  if (arg.startsWith("~/")) return arg;
  if (arg.startsWith("/")) return "~" + arg;
  const base = cwd === "~" ? "~" : cwd;
  return arg === "." ? base : (base === "~" ? `~/${arg}` : `${base}/${arg}`);
}

const VIRTUAL_FS: Record<string, string[]> = {
  "~": ["projects", "infra", "nodes", "services", "deploys", "README"],
  "~/projects": projects.map((p) => p.slug),
  "~/infra": docs.map((d) => d.slug),
  "~/nodes": nodes.map((n) => n.id),
  "~/services": services.map((s) => s.id),
  "~/deploys": deployEvents.map((d) => d.id),
};

function listDir(cwd: string): string[] {
  const key = cwd === "~/" ? "~" : cwd;
  return VIRTUAL_FS[key] ?? ["(empty)"];
}

export function runCommand(
  parsed: ParsedCommand,
  cwd: string,
  namespace: string | null
): CommandResult {
  const { name, args } = parsed;

  switch (name) {
    case "help": {
      return {
        output: [
          "Available commands:",
          "  help              this message",
          "  clear             clear screen",
          "  ls [path]         list directory",
          "  cd <path>         change directory",
          "  pwd               print working directory",
          "  open <route>      open project or route (e.g. open projects/portal)",
          "  cat <topic>       print infra doc (e.g. cat dns)",
          "  status            show nodes & services",
          "  neofetch          system summary",
          "  deploy <project> [--dry-run]  simulate deploy",
          "  ssh <node>        switch to node namespace (virtual)",
          "  exit              close ssh session",
        ],
      };
    }

    case "clear":
      return { output: [], clearScreen: true };

    case "ls": {
      const path = args[0] ? normalizePath(cwd, args[0]) : cwd;
      const entries = listDir(path);
      return { output: entries.join("  ") ? [entries.join("  ")] : ["(empty)"] };
    }

    case "cd": {
      const path = args[0] ? normalizePath(cwd, args[0]) : "~";
      const key = path === "~/" ? "~" : path;
      const valid = key in VIRTUAL_FS || path === "~";
      return {
        output: valid ? [] : ["cd: no such directory"],
        setCwd: valid ? (path === "~" ? "~" : path) : undefined,
      };
    }

    case "pwd":
      return { output: [cwd] };

    case "open": {
      const route = args[0];
      if (!route) return { output: ["usage: open <project|infra-topic|route>"] };
      const project = getProjectBySlug(route);
      if (project) return { output: [`Opening ${project.title}...`], navigate: `/interactive/projects/${project.slug}` };
      const doc = getDocBySlug(route);
      if (doc) return { output: [`Opening ${doc.title}...`], navigate: `/interactive/infra/${doc.slug}` };
      if (route === "projects") return { output: ["Opening projects..."], navigate: "/interactive/projects" };
      if (route === "infra") return { output: ["Opening infra..."], navigate: "/interactive/infra" };
      if (route === "terminal") return { output: ["Opening terminal..."], navigate: "/interactive/terminal" };
      if (route === "workspaces") return { output: ["Opening workspaces..."], navigate: "/interactive/workspaces" };
      return { output: ["Unknown route. Try: projects, infra, projects/<slug>, infra/<topic>"], navigate: `/interactive/${route}` };
    }

    case "cat": {
      const topic = args[0];
      if (!topic) return { output: ["usage: cat <infra-topic>"] };
      const d = getDocBySlug(topic);
      if (!d) return { output: [`cat: ${topic}: no such doc`] };
      return { output: d.content.split("\n") };
    }

    case "status": {
      const lines = [
        "NODES",
        "------",
        ...nodes.map((n) => `${n.name}\t${n.status}\tload ${n.load ?? "-"}\tuptime ${n.uptime ?? "-"}`),
        "",
        "SERVICES",
        "--------",
        ...services.map((s) => `${s.name}\t${s.status}\tport ${s.port ?? "-"}\tlast deploy ${s.lastDeploy ?? "-"}`),
      ];
      return { output: lines };
    }

    case "neofetch": {
      const node = namespace ? getNodeById(namespace) : null;
      const host = node?.name ?? "control-plane";
      const lines = [
        "                    .-.",
        "                   (   )",
        "                    '-'",
        "                   .-.",
        "                  (   )",
        "                   '-'",
        `       jerry@${host}`,
        "----------------",
        `OS: Control Plane ${namespace ? `(ssh ${namespace})` : ""}`,
        `Cluster: JERRY-CORE`,
        `Nodes: ${nodes.length}  Services: ${services.length}  Projects: ${projects.length}`,
        "----------------",
      ];
      return { output: lines };
    }

    case "deploy": {
      const project = args[0];
      const dryRun = args.includes("--dry-run");
      if (!project) return { output: ["usage: deploy <project> [--dry-run]"] };
      const p = getProjectBySlug(project);
      if (!p) return { output: [`deploy: unknown project '${project}'`] };
      const steps = dryRun
        ? [
            `[dry-run] Deploying ${p.title} (${p.slug})`,
            "  → Pull image",
            "  → Run migrations",
            "  → Switch traffic",
            "  → Done.",
          ]
        : [`Deploy is simulated only. Use --dry-run to see steps.`];
      return { output: steps };
    }

    case "ssh": {
      const nodeId = args[0];
      if (!nodeId) return { output: ["usage: ssh <node>"], setNamespace: null };
      const n = getNodeById(nodeId);
      if (!n) return { output: [`ssh: could not resolve host ${nodeId}`] };
      return {
        output: [`Switched to ${n.name}. Type 'exit' to return.`],
        setNamespace: n.id,
      };
    }

    case "exit": {
      if (namespace) {
        return { output: ["Connection to " + namespace + " closed."], setNamespace: null };
      }
      return { output: ["(not in ssh session)"] };
    }

    default:
      return { output: [parsed.raw ? `command not found: ${parsed.name}` : ""] };
  }
}

export function getCompletions(prefix: string, cwd: string): string[] {
  const parts = prefix.split(/\s+/);
  if (parts.length <= 1) {
    return completeCmd(parts[0] ?? "");
  }
  const first = (parts[0] ?? "").toLowerCase();
  if (first === "open" || first === "cat") {
    const list = first === "cat" ? docs.map((d) => d.slug) : [...projects.map((p) => p.slug), "projects", "infra", "terminal", "workspaces"];
    const last = (parts[parts.length - 1] ?? "").toLowerCase();
    return list.filter((x) => x.startsWith(last));
  }
  if (first === "ssh") {
    const last = (parts[parts.length - 1] ?? "").toLowerCase();
    return nodes.map((n) => n.id).filter((id) => id.startsWith(last));
  }
  if (first === "deploy") {
    const last = (parts[parts.length - 1] ?? "").toLowerCase();
    return projects.map((p) => p.slug).filter((s) => s.startsWith(last));
  }
  if (first === "cd" || first === "ls") {
    const last = parts[parts.length - 1] ?? "";
    const dirs = listDir(cwd);
    return dirs.filter((d) => d.startsWith(last));
  }
  return [];
}
