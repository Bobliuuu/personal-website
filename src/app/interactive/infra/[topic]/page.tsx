"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { getDocBySlug } from "@/content/registry";
import { Card } from "@/components/interactive/ui";
import { notFound } from "next/navigation";

function renderMarkdownLike(content: string) {
  const lines = content.split("\n");
  const out: React.ReactNode[] = [];
  let key = 0;
  for (const line of lines) {
    if (line.startsWith("# ")) {
      out.push(<h1 key={key++} className="mb-4 mt-6 text-lg font-semibold text-white/95 first:mt-0">{line.slice(2)}</h1>);
    } else if (line.startsWith("- **")) {
      const match = line.match(/- \*\*(.+?)\*\*:?(.*)/);
      if (match) out.push(<p key={key++} className="ml-4 text-sm text-white/80"><strong className="text-white/90">{match[1]}</strong>{match[2]}</p>);
      else out.push(<p key={key++} className="ml-4 text-sm text-white/80">{line}</p>);
    } else if (line.startsWith("- ")) {
      out.push(<p key={key++} className="ml-4 text-sm text-white/80">{line.slice(2)}</p>);
    } else if (line.trim() === "") {
      out.push(<br key={key++} />);
    } else {
      out.push(<p key={key++} className="text-sm text-white/80">{line}</p>);
    }
  }
  return out;
}

export default function InfraTopicPage() {
  const params = useParams();
  const router = useRouter();
  const topic = params.topic as string;
  const doc = getDocBySlug(topic);

  if (!doc) notFound();

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
        <h1 className="text-xl font-semibold text-white/95">{doc.title}</h1>
      </motion.div>

      <Card noPadding className="p-6">
        <div className="prose prose-invert max-w-none text-sm">
          {renderMarkdownLike(doc.content)}
        </div>
      </Card>

      <div className="mt-6">
        <Link href="/interactive/infra" className="text-sm text-white/60 hover:text-cyan-400">
          ← All infra docs
        </Link>
      </div>
    </div>
  );
}
