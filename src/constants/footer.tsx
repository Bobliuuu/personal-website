import { Home, Github, Linkedin, Youtube, MessageCircle, BookOpen } from "lucide-react"

// Custom X (Twitter) icon component - 30% smaller
const XIcon = ({ className, size, ...props }: { className?: string; size?: number; [key: string]: unknown }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size || 14}
    height={size || 14}
    className={className || "w-3.5 h-3.5"} 
    fill="currentColor" 
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

// Custom Devpost icon component - 30% smaller 
const DevpostIcon = ({ className, size, ...props }: { className?: string; size?: number; [key: string]: unknown }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size || 14}
    height={size || 14}
    className={className || "w-3.5 h-3.5"} 
    fill="currentColor" 
    {...props}
  >
    <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31c0 4.436-3.21 6.302-6.456 6.302H7.595z"/>
  </svg>
)

export const footerInfo = {
  name: "Jerry Zhu",
  email: "j25zhuo@uwaterloo.ca",
  socials: [
    {
      name: "Home",
      icon: Home,
      href: "/",
    },
    {
      name: "Blog",
      icon: BookOpen,
      href: "https://blog.jerryzhu.org",
    },
    {
      name: "Discord",
      icon: MessageCircle,
      href: "https://discord.com/users/393878246065963031",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/bobliuuu",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/jerryzhu2/",
    },
    {
      name: "Twitter",
      icon: XIcon,
      href: "https://x.com/Bobliuuu/",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://youtube.com/@jerryzhu",
    },
    {
      name: "Devpost",
      icon: DevpostIcon,
      href: "https://devpost.com/Bobliuuu",
    },
  ],
}
