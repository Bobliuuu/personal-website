"use client"

import Link from "next/link"
import { footerInfo } from "@/constants/footer"
import { Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"

export default function Socials() {
  const [isDark, setIsDark] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDark(savedTheme === "dark")
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    }
    
    // Animate in after mount
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
    document.documentElement.classList.toggle("dark", newTheme)
  }

  return (
    <div 
      className={`fixed bottom-8 left-1/2 z-50 transition-all duration-700 ease-out ${
        isVisible 
          ? '-translate-x-1/2 translate-y-0 opacity-100' 
          : '-translate-x-1/2 translate-y-20 opacity-0'
      }`}
    >
      <div className="flex items-center gap-2 bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 rounded-full px-4 py-3 shadow-2xl">
        {footerInfo.socials.map((social, index) => {
          const Icon = social.icon
          const isCustomIcon = social.name === "Twitter" || social.name === "Devpost"
          const iconSize = isCustomIcon ? 24 : 28 // 30% smaller vs 40% bigger
          const iconClass = isCustomIcon ? "w-5.5 h-5.5" : "w-7 h-7"
          const isHovered = hoveredIndex === index
          
          return (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-150 hover:bg-white/10"
              aria-label={social.name}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                animation: isVisible ? `slideUp 0.4s ease-out ${index * 0.05}s both` : 'none',
                marginLeft: isHovered ? 16 : 2,
                marginRight: isHovered ? 16 : 2,
                transition: 'margin 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <Icon 
                size={iconSize}
                className={`${iconClass} transition-colors duration-150 text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white`}
                strokeWidth={1.5}
              />
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-black/90 dark:bg-black/90 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {social.name}
              </div>
            </Link>
          )
        })}
        
        {/* Divider */}
        <div className="w-px h-7 bg-gray-300/30 dark:bg-white/20 mx-1 flex-shrink-0" />
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="group relative flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-150 hover:bg-white/10"
          aria-label="Toggle theme"
          onMouseEnter={() => setHoveredIndex(footerInfo.socials.length)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            animation: isVisible ? `slideUp 0.4s ease-out ${footerInfo.socials.length * 0.05}s both` : 'none',
            marginLeft: hoveredIndex === footerInfo.socials.length ? 16 : 2,
            marginRight: hoveredIndex === footerInfo.socials.length ? 16 : 2,
            transition: 'margin 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {isDark ? (
            <Sun 
              size={28}
              className="w-7 h-7 transition-colors duration-150 text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white"
              strokeWidth={1.5}
            />
          ) : (
            <Moon 
              size={28}
              className="w-7 h-7 transition-colors duration-150 text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white"
              strokeWidth={1.5}
            />
          )}
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-black/90 dark:bg-black/90 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {isDark ? "Light" : "Dark"} Mode
          </div>
        </button>
      </div>
    </div>
  )
}
