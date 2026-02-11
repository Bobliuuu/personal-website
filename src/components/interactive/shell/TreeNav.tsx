"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type TreeLeaf = { label: string; href: string; fragment?: string };
type TreeNode = TreeLeaf | { label: string; openKey?: string; href?: string; children: TreeNode[] };

const tree: TreeNode[] = [
  { label: "Datacenter", openKey: "dc", children: [
    { label: "Cluster", openKey: "cluster", href: "/interactive", children: [
      { label: "Nodes", href: "/interactive", fragment: "nodes" },
      { label: "Storage", href: "/interactive/infra/observability" },
      { label: "Networks", href: "/interactive/infra/networking" },
      { label: "Services", href: "/interactive", fragment: "services" },
      { label: "Deployments", href: "/interactive", fragment: "deploys" },
      { label: "Logs", href: "/interactive/infra/observability" },
      { label: "Projects", href: "/interactive/projects" },
      { label: "Infra", href: "/interactive/infra" },
      { label: "About", href: "/interactive/infra/security" },
    ]},
  ]},
];

function isBranch(node: TreeNode): node is TreeNode & { children: TreeNode[] } {
  return "children" in node && Array.isArray(node.children);
}

function TreeItem({
  label,
  href,
  fragment,
  childItems,
  depth = 0,
  defaultOpen = true,
}: {
  label: string;
  href?: string;
  fragment?: string;
  childItems?: TreeNode[];
  depth?: number;
  defaultOpen?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(defaultOpen);
  const hasChildNodes = childItems && childItems.length > 0;
  const linkHref = href ? (fragment ? `${href}#${fragment}` : href) : undefined;
  const isActive = linkHref && href ? (pathname === href || (href !== "/interactive" && pathname.startsWith(href))) : false;

  return (
    <div className="select-none">
      <div
        className={`
          flex items-center gap-1 rounded px-3 py-1.5 text-sm transition-colors
          ${depth === 0 ? "font-semibold text-white/90" : "text-white/70 hover:bg-white/5 hover:text-white/90"}
          ${isActive ? "bg-cyan-500/15 text-cyan-400" : ""}
        `}
        style={{ paddingLeft: 12 + depth * 12 }}
      >
        {hasChildNodes ? (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex w-5 shrink-0 items-center justify-center rounded hover:bg-white/10"
            aria-expanded={open}
          >
            <motion.span
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.15 }}
              className="text-white/60"
            >
              ▶
            </motion.span>
          </button>
        ) : (
          <span className="w-5 shrink-0" />
        )}
        {linkHref ? (
          <Link href={linkHref} className="flex-1 min-w-0 truncate">
            {label}
          </Link>
        ) : (
          <span className="flex-1 truncate">{label}</span>
        )}
      </div>
      <AnimatePresence initial={false}>
        {hasChildNodes && open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {childItems!.map((child) => (
              isBranch(child) ? (
                <TreeItem
                  key={(child as { openKey?: string }).openKey ?? child.label}
                  label={child.label}
                  href={child.href}
                  fragment={undefined}
                  childItems={child.children}
                  depth={depth + 1}
                  defaultOpen={false}
                />
              ) : (
                <div key={child.label} style={{ paddingLeft: 12 + (depth + 1) * 12 }}>
                  <Link
                    href={child.fragment ? `${child.href}#${child.fragment}` : child.href}
                    className={`
                      block rounded px-3 py-1.5 text-sm transition-colors
                      ${pathname === child.href || (child.href !== "/interactive" && pathname.startsWith(child.href))
                        ? "bg-cyan-500/15 text-cyan-400"
                        : "text-white/70 hover:bg-white/5 hover:text-white/90"}
                    `}
                  >
                    {child.label}
                  </Link>
                </div>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function TreeNav() {
  return (
    <nav
      className="flex w-52 flex-col border-r border-white/10 bg-black/20 py-3"
      aria-label="Main navigation"
    >
      <div className="px-2 text-xs font-semibold uppercase tracking-wider text-white/50">
        Navigation
      </div>
      <div className="mt-2 space-y-0.5">
        {tree.map((item) => (
          <TreeItem
            key={isBranch(item) ? (item as { openKey?: string }).openKey ?? item.label : item.label}
            label={item.label}
            href={isBranch(item) ? item.href : (item as TreeLeaf).href}
            childItems={isBranch(item) ? item.children : undefined}
            defaultOpen={true}
          />
        ))}
      </div>
    </nav>
  );
}
