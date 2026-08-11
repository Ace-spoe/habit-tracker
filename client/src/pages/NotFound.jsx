import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen w-full bg-[#f0fdfa] flex flex-col justify-between p-6 sm:p-8 font-sans text-slate-800">

      {/* Main Centered 404 Content */}
      <main className="my-auto text-center flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-8xl sm:text-9xl font-black text-teal-400 tracking-tight leading-none mb-4">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Page Not Found
        </h2>

        <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto mb-8">
          The habit you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="px-6 py-3.5 bg-teal-400 hover:bg-teal-500 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-teal-400/20 active:scale-[0.98]"
        >
          Go Back Home
        </Link>
      </main>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-slate-400 font-medium">
        © {new Date().getFullYear()} HabitFlow Technologies Inc. All rights reserved.
      </footer>

    </div>
  )
}

export default NotFound