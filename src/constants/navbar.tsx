import type { LucideIcon } from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon?: LucideIcon
}

export const navItems: NavItem[] = [
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Experiences",
    href: "/experiences",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Resume",
    href: "/resume",
  },
]

