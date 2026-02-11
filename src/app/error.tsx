// Error boundary for better error handling
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/atoms/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold text-white mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold text-gray-300 mb-6">Something went wrong</h2>
        <p className="text-lg text-gray-400 mb-8 max-w-md mx-auto">
          Don&apos;t worry, we&apos;re on it. Try refreshing the page or go back home.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset} className="bg-cyan-500 hover:bg-cyan-600">
            Try Again
          </Button>
          <Button 
            variant="outline" 
            className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
            onClick={() => window.location.href = '/'}
          >
            Go Home
          </Button>
        </div>
        {error.digest && (
          <p className="text-xs text-gray-600 mt-8">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  )
}
