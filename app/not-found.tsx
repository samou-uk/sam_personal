'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  useEffect(() => {
    // Force scrollbar to appear for consistent width
    document.documentElement.style.overflowY = 'scroll'
    return () => {
      document.documentElement.style.overflowY = ''
    }
  }, [])

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
      <Navigation />
      <div className="pt-20 pb-16 md:pb-0 flex-1 flex items-center justify-center">
        <section className="w-full py-8 sm:py-12 md:py-0">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl md:text-5xl font-extralight text-slate-900 dark:text-slate-100 mb-2 md:mb-1 tracking-tight">
                <span className="inline-block">404</span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-xl font-extralight text-slate-600 dark:text-slate-400 mb-3 md:mb-2">
                Page not found
              </p>
              <p className="text-sm sm:text-base md:text-sm text-slate-500 dark:text-slate-500 font-light max-w-md mx-auto mb-4 md:mb-3">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white text-sm font-light hover:bg-primary-dark transition-colors duration-200 whitespace-nowrap"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </Link>
                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm font-light hover:border-primary/40 dark:hover:border-[#ADD8E6]/60 transition-colors duration-200 whitespace-nowrap"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Hidden element to ensure scrollbar appears */}
      <div className="h-[1px]" aria-hidden="true" />
    </main>
  )
}

