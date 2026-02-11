import type React from "react"
import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "@/providers/theme-provider"
import "./globals.css"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jerryzhu.org"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jerry Zhu | Software Engineer",
    template: "%s | Jerry Zhu",
  },
  description: "Software Engineer @StackAdapt | CS @UWaterloo. Passionate about building scalable web applications with React, Next.js, and TypeScript. Winner of 19+ hackathons.",
  keywords: [
    "Jerry Zhu",
    "Software Engineer",
    "StackAdapt",
    "University of Waterloo",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "Hackathon Winner",
    "Computer Science",
  ],
  authors: [{ name: "Jerry Zhu", url: siteUrl }],
  creator: "Jerry Zhu",
  publisher: "Jerry Zhu",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: "/frisbee.png", sizes: "any" }],
    apple: "/frisbee.png",
    shortcut: "/frisbee.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Jerry Zhu | Software Engineer",
    description: "Software Engineer @StackAdapt | CS @UWaterloo. Building scalable web applications and winning hackathons.",
    siteName: "Jerry Zhu",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Jerry Zhu - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jerry Zhu | Software Engineer",
    description: "Software Engineer @StackAdapt | CS @UWaterloo. Building scalable web applications and winning hackathons.",
    creator: "@Bobliuuu",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jerry Zhu",
              url: siteUrl,
              image: `${siteUrl}/jerry-warriors-final.png`,
              jobTitle: "Software Engineer",
              worksFor: {
                "@type": "Organization",
                name: "StackAdapt",
              },
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "University of Waterloo",
              },
              sameAs: [
                "https://github.com/bobliuuu",
                "https://linkedin.com/in/jerryzhu2",
                "https://twitter.com/Bobliuuu",
                "https://devpost.com/Bobliuuu",
              ],
              knowsAbout: [
                "Software Engineering",
                "Web Development",
                "React",
                "Next.js",
                "TypeScript",
                "Full Stack Development",
              ],
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}