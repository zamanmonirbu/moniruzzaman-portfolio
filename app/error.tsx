"use client"

import { useEffect } from "react"

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center p-4 animate-fadeIn">
      <h1 className="text-4xl font-bold mb-4">Something went wrong 😥</h1>
      <p className="mb-6 opacity-80">{error.message}</p>

      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-300"
      >
        Try Again
      </button>
    </div>
  )
}
