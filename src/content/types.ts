export interface Node {
  id: string;
  name: string;
  status: "online" | "offline" | "maintenance";
  load?: number;
  uptime?: string;
  cpu?: number;
  memory?: number;
}

export interface Service {
  id: string;
  name: string;
  status: "running" | "stopped" | "degraded";
  port?: number;
  lastDeploy?: string;
  description?: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  status: "live" | "wip" | "archived";
  description: string;
  tags: string[];
  links?: ProjectLink[];
}

export interface DeployEvent {
  id: string;
  project: string;
  env: string;
  at: string;
  status: "success" | "failed" | "pending";
  duration?: string;
}

export interface DocTopic {
  slug: string;
  title: string;
  content: string;
}
