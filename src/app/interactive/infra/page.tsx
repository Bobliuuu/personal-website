"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { docs } from "@/content/registry";
import { Card } from "@/components/interactive/ui";

export default function InfraIndexPage() {
  return (
    <div className="p-6">
      <motion.h1
        className="mb-6 text-xl font-semibold text-white/95"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Infra
      </motion.h1>
      <p className="mb-6 text-sm text-white/60">
        Documentation and runbooks for DNS, networking, observability, and security.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((d, i) => (
          <motion.div
            key={d.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={`/interactive/infra/${d.slug}`}>
              <Card className="h-full transition-colors hover:border-cyan-500/30 hover:bg-white/[0.05]">
                <h3 className="font-semibold text-white/90">{d.title}</h3>
                <p className="mt-1 text-xs text-white/50">{d.slug}</p>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
