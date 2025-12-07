// app/NProgressWrapper.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import { useTheme } from "@/components/theme-provider";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
  minimum: 0.08,
});

export default function NProgressWrapper() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme } = useTheme();

  // Update progress bar color when theme changes
  useEffect(() => {
    const updateProgressBarColor = () => {
      const bar = document.querySelector("#nprogress .bar") as HTMLElement | null;
      if (!bar) return;

      if (theme === "dark") {
        bar.style.background = "linear-gradient(90deg, #a78bfa, #60a5fa, #34d399)";
        bar.style.boxShadow = "0 0 12px rgba(167, 139, 250, 0.8)";
      } else {
        bar.style.background = "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)";
        bar.style.boxShadow = "0 0 12px rgba(139, 92, 246, 0.6)";
      }

      // Smooth transition
      bar.style.transition = "background 0.4s ease, box-shadow 0.4s ease";
    };

    updateProgressBarColor();
  }, [theme]);

  // Handle route changes (start/stop NProgress)
  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    handleStart();
    const timer = setTimeout(handleStop, 300); // Optional: minimum visible time

    return () => {
      clearTimeout(timer);
      handleStop();
    };
  }, [pathname, searchParams]);

  return null;
}