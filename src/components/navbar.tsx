"use client"

import Link from "next/link"
import { Moon, Sun, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { navItems } from "@/constants/navbar"
import { footerInfo } from "@/constants/footer"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMenuOpen(false)
    }
  }

  return (
    <header className="py-6 fixed top-0 left-0 w-full z-50 bg-black">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-24 flex justify-between items-center relative">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-gray-500 via-gray-100 via-50% to-gray-500 bg-clip-text text-transparent">
            Jerry Zhu
          </span>
        </Link>
        <div className="flex items-center">
          <div className="sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
            {menuOpen && (
              <div className="absolute right-4 top-16 bg-black border border-gray-700 rounded-lg shadow-lg flex flex-col items-end z-50 p-4 space-y-2">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(item.id)}
                    className="text-white text-base py-1 px-4 rounded hover:bg-gray-800 w-full text-right"
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
              </div>
            )}
          </div>
          <nav className="hidden sm:flex items-center space-x-6 text-sm font-medium">
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
      </div>
    </header>
  )
}

