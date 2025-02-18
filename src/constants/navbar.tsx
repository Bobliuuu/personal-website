import type { LucideIcon } from "lucide-react"

export type NavItem = {
  title: string
  id: string
  icon?: LucideIcon
}

export const navItems: NavItem[] = [
  {
    title: "Projects",
    id: "projects",
  },
  {
    title: "Experiences",
    id: "experiences",
  },
  {
    title: "Contact",
    id: "contact",
  },
  {
    title: "Resume",
    id: "resume",
  },
]

