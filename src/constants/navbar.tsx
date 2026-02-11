import type { LucideIcon } from "lucide-react"

export type NavItem = {
  title: string
  id: string
  href?: string
  icon?: LucideIcon
}

export const navItems: NavItem[] = [
  {
    title: "Experiences",
    id: "experience-section",
  },
  {
    title: "Projects",
    id: "projects",
  },
  {
    title: "Achievements",
    id: "achievements",
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

