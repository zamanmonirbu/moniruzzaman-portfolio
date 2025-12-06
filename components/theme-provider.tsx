"use client"

import { useEffect, useState } from "react"
import type * as React from "react"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or system preference
    const saved = localStorage.getItem("theme") as "light" | "dark" | null
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const initial = saved || system

    document.documentElement.classList.toggle("dark", initial === "dark")
    setMounted(true)
  }, [])

  return mounted ? children : null
}

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const initial = saved || system

    setTheme(initial)
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return { theme, toggleTheme, mounted }
}
