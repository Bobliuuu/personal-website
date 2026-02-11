# Interactive Control Plane

A Proxmox-inspired “Personal Control Plane” with Hyprland-style workspaces and a Debian-like terminal. Built with Next.js 15 (App Router), Tailwind, Zustand, Framer Motion, and Recharts.

## Routes

| Path | Description |
|------|-------------|
| `/interactive` | Control Plane Dashboard (default) |
| `/interactive/workspaces` | Hyprland-style tiled windows (terminal, services, projects) |
| `/interactive/terminal` | Full-page terminal |
| `/interactive/projects` | Deployed apps list (optional `?tag=ai`) |
| `/interactive/projects/[slug]` | Project detail |
| `/interactive/infra` | Infra docs index |
| `/interactive/infra/[topic]` | Doc page (dns, networking, observability, security, writing, notes) |

## Keybindings

| Key | Action |
|-----|--------|
| **`** (backtick) | Toggle terminal overlay |
| **⌘K** / **Ctrl+K** | Open command palette |
| **1–6** | Switch workspaces (click workspace bar; optional keyboard shortcuts) |
| **Esc** | Close terminal overlay or command palette |

## Terminal Commands

- `help` — list commands
- `clear` — clear screen
- `ls [path]` — list virtual directory
- `cd <path>` — change directory (~, ~/projects, ~/infra, etc.)
- `pwd` — print working directory
- `open <route>` — navigate (e.g. `open projects/portal`, `open infra/dns`)
- `cat <topic>` — print infra doc (e.g. `cat dns`)
- `status` — nodes and services tables
- `neofetch` — ASCII + system summary
- `deploy <project> --dry-run` — simulated deploy steps
- `ssh <node>` — switch prompt to node (virtual; `exit` to return)

## Content

All data lives in **`src/content/registry.ts`**: nodes, services, projects, deploy events, and docs. UI reads from this single source; no hardcoding in components.

## Tech

- **State**: Zustand (`src/lib/interactive-store.ts`) — terminal open/closed, command palette, workspace, terminal cwd/namespace/history
- **Terminal**: Custom parser and commands in `src/lib/terminal/`
- **Charts**: Recharts (sparklines on dashboard)
- **Animations**: Framer Motion (tree expand, overlays, workspace bar, windows)

## Running

```bash
pnpm dev
```

Open [http://localhost:3000/interactive](http://localhost:3000/interactive).
