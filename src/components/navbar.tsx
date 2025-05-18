"use client"

import Link from "next/link"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { navItems } from "@/constants/navbar"
import { footerInfo } from "@/constants/footer"

export default function Navbar() {
  const { theme, setTheme } = useTheme()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="py-6 fixed top-0 left-0 w-full z-50 bg-black">
      <div className="max-w-[1800px] mx-auto px-12 sm:px-16 lg:px-24 flex justify-between items-center relative">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-gray-500 via-gray-100 via-50% to-gray-500 bg-clip-text text-transparent">
            Jerry Zhu
          </span>
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <div className="bg-gray-600 flex space-x-4 rounded-lg pt-1 pb-1 pl-2 pr-2">
            {footerInfo.socials.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-white hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-white/10 duration-200"
                  target="_blank"
                >
                  <Icon className="h-6 w-6" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(item.id)}
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.title}
            </button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>
      </div>
    </header>
  )
}

