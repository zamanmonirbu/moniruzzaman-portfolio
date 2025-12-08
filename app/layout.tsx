// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { ThemeProvider } from "@/components/theme-provider";
import NProgressWrapper from "./NProgressWrapper"; // ← Import the client wrapper
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "MD. MONIRUZZAMAN - Developer",
  description: "Software Engineer, Educator, and Programming Enthusiast.",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon-dark-32x32.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Optional: Load NProgress CSS from CDN (or use local) */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
      </head>
      <body
        className={`${spaceMono.variable} font-sans min-h-screen`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Providers>
            {/* This is the only client component needed */}
            <NProgressWrapper />

            {children}
            <Analytics />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}