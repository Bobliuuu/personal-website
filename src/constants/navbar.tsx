import type { LucideIcon } from "lucide-react"

export type NavItem = {
  title: string
  id: string
  href?: string
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
    href: "/ZhuJerryResume.pdf",
  },
]

