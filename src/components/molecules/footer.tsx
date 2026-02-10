import Link from "next/link"
import { footerInfo } from "@/constants/footer"

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 max-w-[1800px] mx-auto px-12 sm:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-medium text-white">{footerInfo.name}</h2>
            <p className="text-gray-400">{footerInfo.email}</p>
          </div>
          <div className="flex gap-4">
            {footerInfo.socials.map((social) => {
              const Icon = social.icon
              return (
                <Link 
                  key={social.name}
                  href={social.href} 
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                >
                  <Icon className="h-6 w-6" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

