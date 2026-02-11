"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/content/registry";
import { Card, Chip } from "@/components/interactive/ui";

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const filtered = tag ? projects.filter((p) => p.tags.includes(tag)) : projects;

  return (
    <div className="p-6">
      <motion.h1
        className="mb-6 text-xl font-semibold text-white/95"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Deployed Apps {tag ? `· ${tag}` : ""}
      </motion.h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={`/interactive/projects/${p.slug}`}>
              <Card className="h-full transition-colors hover:border-cyan-500/30 hover:bg-white/[0.05]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white/95">{p.title}</span>
                  <Chip variant={p.status === "live" ? "healthy" : p.status === "wip" ? "warning" : "neutral"}>
                    {p.status}
                  </Chip>
                </div>
                <p className="mt-2 text-sm text-white/60">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white/60">
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
