export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-black text-center p-4">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>

      <h2 className="text-2xl mb-6 animate-bounce-slow">
        Page not found
      </h2>

      <a
        href="/"
        className="px-6 py-3 border border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300"
      >
        Go Home
      </a>
    </div>
  )
}
