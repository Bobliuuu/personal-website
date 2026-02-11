"use client";

import { useState } from "react";
import { motion, Reorder, useDragControls } from "framer-motion";
import { services, projects } from "@/content/registry";
import { WindowFrame } from "@/components/interactive/ui";
import { TerminalCore } from "@/components/interactive/terminal/TerminalCore";
import { Table, TableRow, TableCell } from "@/components/interactive/ui";

type WindowId = "terminal" | "services" | "projects";

const WINDOW_ORDER: WindowId[] = ["terminal", "services", "projects"];

function DraggableWindow({
  id,
  focused,
  onFocus,
}: {
  id: WindowId;
  focused: boolean;
  onFocus: () => void;
}) {
  const dragControls = useDragControls();
  const title = id === "terminal" ? "Terminal" : id === "services" ? "Services" : "Projects";
  return (
    <Reorder.Item
      value={id}
      dragControls={dragControls}
      dragListener={false}
      className="min-h-[180px] flex-[1] flex flex-col"
    >
      <WindowFrame
        title={title}
        focused={focused}
        onFocus={onFocus}
        onTitlePointerDown={(e) => dragControls.start(e)}
      >
      {id === "terminal" && (
        <div className="p-2 h-full min-h-[160px]">
          <TerminalCore minHeight="160px" />
        </div>
      )}
      {id === "services" && (
        <div className="p-4 overflow-auto">
          <Table headers={["Name", "Status", "Port"]}>
            {services.map((s) => (
              <TableRow key={s.id}>
                <TableCell mono>{s.name}</TableCell>
                <TableCell>{s.status}</TableCell>
                <TableCell mono>{s.port ?? "-"}</TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
      )}
      {id === "projects" && (
        <div className="p-4 overflow-auto">
          <div className="grid gap-2 sm:grid-cols-2">
            {projects.slice(0, 6).map((p) => (
              <div
                key={p.slug}
                className="rounded border border-white/10 bg-white/[0.02] p-3 text-sm"
              >
                <span className="font-medium text-white/90">{p.title}</span>
                <p className="mt-1 text-xs text-white/50">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      </WindowFrame>
    </Reorder.Item>
  );
}

export default function WorkspacesPage() {
  const [order, setOrder] = useState<WindowId[]>(WINDOW_ORDER);
  const [focused, setFocused] = useState<WindowId>("terminal");

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col p-4">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-4 text-xs text-white/50"
      >
        Hyprland-style tiled view. Click a window to focus. Drag the title bar to reorder.
      </motion.p>
      <Reorder.Group
        axis="y"
        values={order}
        onReorder={setOrder}
        className="flex flex-1 flex-col gap-4 overflow-auto"
      >
        {order.map((id) => (
          <DraggableWindow key={id} id={id} focused={focused === id} onFocus={() => setFocused(id)} />
        ))}
      </Reorder.Group>
    </div>
  );
}
