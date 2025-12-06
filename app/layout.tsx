import type React from "react"
import type { Metadata } from "next"
import { Space_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "./providers"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "MD. MONIRUZZAMAN - Developer",
  description: "Software Engineer, Educator, and Programming Enthusiast.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/icon-dark-32x32.png",
  },
}

// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${spaceMono.variable} font-sans`}
        suppressHydrationWarning // ← Add this line
      >
        <ThemeProvider>
          <Providers>
            {children}
            <Analytics />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}