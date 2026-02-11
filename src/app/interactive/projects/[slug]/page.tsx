"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProjectBySlug } from "@/content/registry";
import { Card, Chip } from "@/components/interactive/ui";
import { notFound } from "next/navigation";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center gap-4"
      >
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded border border-white/10 px-3 py-1.5 text-sm text-white/70 hover:bg-white/5"
        >
          ← Back
        </button>
        <h1 className="text-xl font-semibold text-white/95">{project.title}</h1>
        <Chip variant={project.status === "live" ? "healthy" : project.status === "wip" ? "warning" : "neutral"}>
          {project.status}
        </Chip>
      </motion.div>

      <Card title="Description">
        <p className="text-sm text-white/80">{project.description}</p>
      </Card>

      {project.tags.length > 0 && (
        <Card title="Tags" className="mt-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="rounded bg-white/10 px-2 py-1 text-xs text-white/70">
                {t}
              </span>
            ))}
          </div>
        </Card>
      )}

      {project.links && project.links.length > 0 && (
        <Card title="Links" className="mt-4">
          <ul className="space-y-2">
            {project.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div className="mt-6">
        <Link
          href="/interactive/projects"
          className="text-sm text-white/60 hover:text-cyan-400"
        >
          ← All projects
        </Link>
      </div>
    </div>
  );
}
