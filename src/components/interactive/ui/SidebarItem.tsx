"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface SidebarItemProps {
  href: string;
  label: string;
  indent?: boolean;
}

export function SidebarItem({ href, label, indent }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/interactive" && pathname.startsWith(href));

  return (
    <Link href={href} className="block">
      <motion.span
        className={`
          block rounded px-3 py-1.5 text-sm transition-colors
          ${indent ? "pl-6" : ""}
          ${isActive ? "bg-cyan-500/15 text-cyan-400" : "text-white/70 hover:bg-white/5 hover:text-white/90"}
        `}
        whileHover={{ x: 2 }}
        transition={{ duration: 0.1 }}
      >
        {label}
      </motion.span>
    </Link>
  );
}
