"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { Sun, Moon } from "lucide-react"
import { useUser } from "@/hooks/use-user"
import Image from "next/image"

export default function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { data: user } = useUser()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    handleScroll() // initial check
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path)

  // Shared nav link style
  const navLinkBase = 
    "px-4 py-1 rounded-xl font-medium transition-all duration-200 font-medium text-sm flex items-center justify-center"

  const navLinkInactive = 
    "text-foreground/70 hover:text-foreground hover:bg-foreground/5"

  const navLinkActive = 
    "bg-primary text-primary-foreground shadow-md hover:shadow-lg"

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/5 backdrop-blur-sm  " 
          : "bg-background"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={user?.profilePicture || "/placeholder.svg"}
            alt="Monir Dev"
            width={32}
            height={32}
            className="w-6 h-6 rounded-full object-cover ring-2 ring-primary/20 hover:ring-primary/40 transition-all"
          />
        </Link>

        {/* Nav Links + Theme Toggle */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2  px-4 py-2 rounded-2xl backdrop-blur-sm ">
            <Link
              href="/"
              className={`${navLinkBase} ${
                isActive("/") ? navLinkActive : navLinkInactive
              }`}
            >
              About
            </Link>

            <Link
              href="/projects"
              className={`${navLinkBase} ${
                isActive("/projects") ? navLinkActive : navLinkInactive
              }`}
            >
              Projects
            </Link>

            <Link
              href="/blogs"
              className={`${navLinkBase} ${
                isActive("/blogs") ? navLinkActive : navLinkInactive
              }`}
            >
              Articles
            </Link>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2.5 rounded-xl  transition-all hover:scale-110"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-foreground/70" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}