"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { nodes, services, deployEvents, projects } from "@/content/registry";
import { Card, Chip, Table, TableRow, TableCell } from "@/components/interactive/ui";

const sparklineData = [
  { t: "00:00", cpu: 12, mem: 45 },
  { t: "04:00", cpu: 8, mem: 48 },
  { t: "08:00", cpu: 35, mem: 52 },
  { t: "12:00", cpu: 22, mem: 50 },
  { t: "16:00", cpu: 18, mem: 55 },
  { t: "20:00", cpu: 28, mem: 52 },
  { t: "24:00", cpu: 15, mem: 48 },
];

const statusVariant = (s: string) =>
  s === "online" || s === "running" || s === "success" ? "healthy" : s === "failed" ? "error" : "warning";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

const pinnedProjects = projects.slice(0, 3);

export default function InteractiveDashboardPage() {
  return (
    <div className="p-6">
      <motion.h1
        className="mb-6 text-xl font-semibold text-white/95"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        Control Plane Dashboard
      </motion.h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Cluster Health">
          <div className="flex items-center gap-3">
            <Chip variant="healthy">HEALTHY</Chip>
            <span className="text-xs text-white/50">Uptime 120d+</span>
          </div>
        </Card>

        <Card title="CPU / Memory">
          <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                <XAxis dataKey="t" hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(222 30% 11%)", border: "1px solid rgba(255,255,255,0.1)" }}
                  labelStyle={{ color: "rgba(255,255,255,0.7)" }}
                  formatter={(value: number | undefined) => [value != null ? value + "%" : "", ""]}
                />
                <Line type="monotone" dataKey="cpu" stroke="hsl(173 58% 39%)" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="mem" stroke="hsl(280 65% 60%)" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-1 text-xs text-white/50">CPU (teal) · Memory (purple)</p>
        </Card>

        <Card id="nodes" title="Nodes" className="scroll-mt-4">
          <Table headers={["Name", "Status", "Load", "Uptime"]} stickyHeader>
            {nodes.map((n) => (
              <TableRow key={n.id}>
                <TableCell mono>{n.name}</TableCell>
                <TableCell>
                  <Chip variant={n.status === "online" ? "healthy" : "error"}>{n.status}</Chip>
                </TableCell>
                <TableCell mono>{n.load ?? "-"}</TableCell>
                <TableCell mono>{n.uptime ?? "-"}</TableCell>
              </TableRow>
            ))}
          </Table>
        </Card>

        <Card id="services" title="Services">
          <Table headers={["Name", "Status", "Port", "Last Deploy"]} stickyHeader>
            {services.map((s) => (
              <TableRow key={s.id}>
                <TableCell mono>{s.name}</TableCell>
                <TableCell>
                  <Chip variant={s.status === "running" ? "healthy" : "warning"}>{s.status}</Chip>
                </TableCell>
                <TableCell mono>{s.port ?? "-"}</TableCell>
                <TableCell mono>{s.lastDeploy ? formatDate(s.lastDeploy) : "-"}</TableCell>
              </TableRow>
            ))}
          </Table>
        </Card>

        <Card id="deploys" title="Recent Deploys">
          <ul className="space-y-2">
            {deployEvents.slice(0, 5).map((d) => (
              <li key={d.id} className="flex items-center justify-between text-sm">
                <span className="text-white/80">{d.project}</span>
                <span className="text-white/50">{d.env}</span>
                <Chip variant={statusVariant(d.status)}>{d.status}</Chip>
                <span className="text-xs text-white/40">{formatDate(d.at)}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Pinned Projects">
          <div className="space-y-2">
            {pinnedProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/interactive/projects/${p.slug}`}
                className="block rounded border border-white/10 bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white/90">{p.title}</span>
                  <Chip variant={p.status === "live" ? "healthy" : "neutral"}>{p.status}</Chip>
                </div>
                <p className="mt-1 text-xs text-white/50">{p.description}</p>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
