import type React from "react"
import { ThemeProvider } from "@/providers/theme-provider"
import "./globals.css"

export const metadata = {
  title: "Jerry Zhu",
  description: "Software Engineer @StackAdapt | CS @UWaterloo",
  icons: {
    icon: [
      { url: "/frisbee.png" },
      { url: "/favicon.ico" },
    ],
    apple: "/frisbee.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}