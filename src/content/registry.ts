import type { Node, Service, Project, DeployEvent, DocTopic } from "./types";

export const nodes: Node[] = [
  { id: "z8-g4", name: "z8-g4", status: "online", load: 0.12, uptime: "45d 3h", cpu: 8, memory: 64 },
  { id: "proxmox-1", name: "proxmox-1", status: "online", load: 0.45, uptime: "120d 7h", cpu: 16, memory: 128 },
  { id: "storage-1", name: "storage-1", status: "online", load: 0.08, uptime: "90d 2h", cpu: 4, memory: 32 },
];

export const services: Service[] = [
  { id: "caddy", name: "caddy", status: "running", port: 443, lastDeploy: "2025-02-10T14:00:00Z", description: "Reverse proxy" },
  { id: "grafana", name: "grafana", status: "running", port: 3001, lastDeploy: "2025-02-09T10:00:00Z", description: "Observability" },
  { id: "gitea", name: "gitea", status: "running", port: 3000, lastDeploy: "2025-02-08T09:00:00Z", description: "Git" },
  { id: "paperless", name: "paperless-ngx", status: "running", port: 8000, lastDeploy: "2025-02-07T12:00:00Z", description: "Document management" },
  { id: "immich", name: "immich", status: "running", port: 2283, lastDeploy: "2025-02-06T11:00:00Z", description: "Photos" },
  { id: "vaultwarden", name: "vaultwarden", status: "running", port: 8080, lastDeploy: "2025-02-05T08:00:00Z", description: "Password manager" },
  { id: "postgres", name: "postgres", status: "running", lastDeploy: "2025-01-15T00:00:00Z", description: "Database" },
];

export const projects: Project[] = [
  { slug: "portal", title: "Portal", status: "live", description: "Unified dashboard and API gateway.", tags: ["infra", "typescript"], links: [{ label: "Repo", href: "#" }] },
  { slug: "caap-llm", title: "CAAP-LLM", status: "live", description: "LLM inference and tooling pipeline.", tags: ["ai", "python"], links: [{ label: "Docs", href: "#" }] },
  { slug: "good-samaritan", title: "Good Samaritan", status: "wip", description: "Community safety and response app.", tags: ["mobile", "react"], links: [{ label: "Demo", href: "#" }] },
  { slug: "observability-stack", title: "Observability Stack", status: "live", description: "Grafana, Prometheus, Loki.", tags: ["infra", "observability"], links: [] },
  { slug: "writing", title: "Writing", status: "live", description: "Notes and long-form content.", tags: ["writing"], links: [] },
  { slug: "playground", title: "Playground", status: "live", description: "Experiments and toys.", tags: ["playground"], links: [] },
];

export const deployEvents: DeployEvent[] = [
  { id: "1", project: "portal", env: "prod", at: "2025-02-10T14:00:00Z", status: "success", duration: "2m 14s" },
  { id: "2", project: "caap-llm", env: "staging", at: "2025-02-10T12:30:00Z", status: "success", duration: "5m 02s" },
  { id: "3", project: "good-samaritan", env: "dev", at: "2025-02-09T18:00:00Z", status: "failed", duration: "0m" },
  { id: "4", project: "observability-stack", env: "prod", at: "2025-02-09T08:00:00Z", status: "success", duration: "1m 45s" },
  { id: "5", project: "portal", env: "staging", at: "2025-02-08T16:00:00Z", status: "success", duration: "1m 58s" },
];

export const docs: DocTopic[] = [
  {
    slug: "dns",
    title: "DNS",
    content: `# DNS

Internal resolution uses CoreDNS. Public records are managed via the registrar.

- **A**: \`home.jerryzhu.org\` → Proxmox host
- **CNAME**: \`*.apps\` → Caddy
- **TXT**: SPF/DKIM for mail (if used)

Update zone files in \`/etc/coredns/\` and reload.`,
  },
  {
    slug: "networking",
    title: "Networking",
    content: `# Networking

- **VLAN 10**: Management (Proxmox, SSH, admin)
- **VLAN 20**: Services (containers, reverse proxy)
- **VLAN 30**: IoT/guest (isolated)

Firewall: iptables on host + Caddy rate limits.`,
  },
  {
    slug: "observability",
    title: "Observability",
    content: `# Observability

Stack: Prometheus (metrics) + Loki (logs) + Grafana (dashboards).

- Scrape interval: 15s
- Retention: 30d metrics, 7d logs
- Alerts: PagerDuty (optional) or webhook to Slack`,
  },
  {
    slug: "security",
    title: "Security",
    content: `# Security

- SSH: key-only, no root login
- Services: behind Caddy with TLS (Let's Encrypt)
- Secrets: Vaultwarden for credentials; env files never in repo
- Updates: unattended-upgrades on nodes; manual for Proxmox`,
  },
  {
    slug: "writing",
    title: "Writing",
    content: `# Writing

Long-form notes and essays. Stored in markdown; rendered via static site or Notion-style editor.

Topics: eng notes, infra runbooks, occasional essays.`,
  },
  {
    slug: "notes",
    title: "Notes",
    content: `# Notes

Quick reference and scratch. Linked from Writing for longer pieces.`,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getDocBySlug(slug: string): DocTopic | undefined {
  return docs.find((d) => d.slug === slug);
}

export function getNodeById(id: string): Node | undefined {
  return nodes.find((n) => n.id === id);
}
