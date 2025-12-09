// components/navigation.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { Sun, Moon, Menu, X } from "lucide-react"
import { useUser } from "@/hooks/use-user"
import Image from "next/image"
import NavigationSkeleton from "./ui/skeleton-loader"

export default function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { data: user, isLoading: userLoading } = useUser()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path)

  const navLinkBase = "px-4 py-1 rounded-xl font-medium transition-all duration-200 text-sm flex items-center justify-center"
  const navLinkInactive = "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
  const navLinkActive = "bg-primary text-primary-foreground shadow-md hover:shadow-lg"

  if (userLoading) {
    return <NavigationSkeleton />
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-sm" 
          : "bg-background"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          {user?.logo ? (
            <Image
              src={user.logo}
              alt="Monir Dev"
              width={32}
              height={32}
              className="w-6 h-6 rounded-full object-cover ring-2 ring-primary/20 hover:ring-primary/40 transition-all"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-primary/20 ring-2 ring-primary/20 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">M</span>
            </div>
          )}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl backdrop-blur-sm bg-background/50">
            <Link href="/" className={`${navLinkBase} ${isActive("/") ? navLinkActive : navLinkInactive}`}>
              About
            </Link>
            <Link href="/projects" className={`${navLinkBase} ${isActive("/projects") ? navLinkActive : navLinkInactive}`}>
              Projects
            </Link>
            <Link href="/blogs" className={`${navLinkBase} ${isActive("/blogs") ? navLinkActive : navLinkInactive}`}>
              Articles
            </Link>
          </div>

          <button
            onClick={toggleTheme}
            className="ml-4 p-2.5 rounded-xl transition-all hover:scale-110 hover:bg-foreground/5"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-foreground/70" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl hover:bg-foreground/5"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-yellow-400" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/30 bg-background">
          <div className="px-6 py-4 space-y-2">
            <Link href="/" className={`block ${navLinkBase} ${isActive("/") ? navLinkActive : navLinkInactive}`}>
              About
            </Link>
            <Link href="/projects" className={`block ${navLinkBase} ${isActive("/projects") ? navLinkActive : navLinkInactive}`}>
              Projects
            </Link>
            <Link href="/blogs" className={`block ${navLinkBase} ${isActive("/blogs") ? navLinkActive : navLinkInactive}`}>
              Articles
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}