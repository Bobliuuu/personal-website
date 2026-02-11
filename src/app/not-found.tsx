// Custom 404 page for better user experience and SEO
import Link from "next/link"
import { Button } from "@/components/atoms/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="text-center px-6">
        <h1 className="text-9xl font-bold text-white mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-300 mb-6">Page Not Found</h2>
        <p className="text-lg text-gray-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button className="bg-cyan-500 hover:bg-cyan-600">
              Go Home
            </Button>
          </Link>
          <Link href="/#contact">
            <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
              Contact Me
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
