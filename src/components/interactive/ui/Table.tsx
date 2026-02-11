"use client";

import type { ReactNode } from "react";

interface TableProps {
  headers: string[];
  children: ReactNode;
  className?: string;
  stickyHeader?: boolean;
}

export function Table({ headers, children, className = "", stickyHeader }: TableProps) {
  return (
    <div className={`overflow-x-auto rounded border border-white/10 ${className}`}>
      <table className="w-full min-w-[320px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.04]">
            {headers.map((h) => (
              <th
                key={h}
                className={`px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-white/60 ${stickyHeader ? "sticky top-0 z-10 bg-white/[0.06]" : ""}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">{children}</tbody>
      </table>
    </div>
  );
}

export function TableRow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <tr className={`text-white/90 transition-colors hover:bg-white/[0.04] ${className}`}>{children}</tr>;
}

export function TableCell({ children, className = "", mono }: { children: ReactNode; className?: string; mono?: boolean }) {
  return (
    <td className={`px-4 py-2.5 ${mono ? "font-mono text-xs" : ""} ${className}`}>
      {children}
    </td>
  );
}
