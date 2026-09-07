'use client'

import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { Search, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'

type SearchResult = {
  title: string
  href: string
  description?: string
  category: string
}

const searchData: SearchResult[] = [
  { title: 'home', href: '/', category: 'page' },
  { title: 'experience', href: '/experience', category: 'page' },
  { title: 'projects', href: '/projects', category: 'page' },
  { title: 'case studies', href: '/case-studies', category: 'page' },
  { title: 'education', href: '/education', category: 'page' },
  { title: 'skills', href: '/skills', category: 'page' },
  { title: 'resume', href: '/resume', category: 'page' },
  { title: 'contact', href: '/contact', category: 'page' },
  { title: 'cities', href: '/cities', category: 'page' },
  { title: 'restaurants', href: '/restaurants', category: 'page' },
  { title: 'privacy', href: '/privacy', category: 'page' },

  { title: 'placecard', href: '/case-studies?project=placecard', category: 'case study', description: 'Private supper-club app for UW/WLU students' },
  { title: 'fortunevantage', href: '/case-studies?project=fortune', category: 'case study', description: 'DSS and BI platform for UK food wholesaler' },

  { title: 'fortune commerce', href: '/projects?project=Fortune Commerce', category: 'project', description: 'Full-stack B2B e-commerce' },
  { title: 'fortunevantage', href: '/projects?project=FortuneVantage', category: 'project', description: 'DSS and BI platform' },
  { title: 'fortunefoods.co.uk', href: '/projects?project=fortunefoods.co.uk', category: 'project', description: 'Responsive B2B site' },
  { title: 'cmartshop.co.uk', href: '/projects?project=cmartshop.co.uk', category: 'project', description: 'Oriental retail storefront' },
  { title: 'taste5.co.uk', href: '/projects?project=taste5.co.uk', category: 'project', description: 'Food and beverage platform' },
  { title: 'hansbuffetbasingstoke.co.uk', href: '/projects?project=hansbuffetbasingstoke.co.uk', category: 'project', description: 'Restaurant site with reservations' },
  { title: 'samou.co.uk', href: '/projects?project=samou.co.uk', category: 'project', description: 'Personal portfolio' },
  { title: 'baoclicker', href: '/projects?project=BaoClicker', category: 'project', description: 'Hidden clicker game' },
  { title: 'bill splitter', href: '/projects?project=Bill Splitter', category: 'project', description: 'Group expense splitter' },
  { title: 'racing sim hardware', href: '/projects?project=Racing Sim Hardware', category: 'project', description: 'Pedal haptics and wind simulator' },
]

const recommendations: SearchResult[] = [
  { title: 'projects', href: '/projects', category: 'page' },
  { title: 'experience', href: '/experience', category: 'page' },
  { title: 'case studies', href: '/case-studies', category: 'page' },
  { title: 'placecard', href: '/case-studies?project=placecard', category: 'case study' },
  { title: 'fortunefoods.co.uk', href: '/projects?project=fortunefoods.co.uk', category: 'project' },
  { title: 'restaurants', href: '/restaurants', category: 'page' },
]

export default function GlobalSearch({ forceWhite = false }: { forceWhite?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        setQuery('')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setResults(recommendations)
      setSelectedIndex(0)
      return
    }

    const searchTerm = query.toLowerCase()
    const filtered = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description?.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    )
    setResults(filtered.slice(0, 8))
    setSelectedIndex(0)
  }, [query])

  const closeSearch = () => {
    setIsOpen(false)
    setQuery('')
  }

  const handleSelect = (href: string) => {
    router.push(href)
    closeSearch()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault()
      handleSelect(results[selectedIndex].href)
    }
  }

  const modal =
    isOpen && mounted
      ? createPortal(
          <div className="fixed inset-0 z-[300]" role="dialog" aria-modal="true" aria-label="search">
            <div
              className="absolute inset-0 bg-slate-950/45 dark:bg-black/60"
              onClick={closeSearch}
            />

            <div className="pointer-events-none absolute inset-0 flex items-start justify-center px-4 pt-20 sm:items-center sm:pt-0">
              <div
                className="pointer-events-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900 flex max-h-[calc(100vh-6rem)] flex-col sm:max-h-[32rem]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-shrink-0 items-center gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                  <Search className="h-5 w-5 text-slate-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="search"
                    className="flex-1 bg-transparent text-base font-light lowercase text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500 sm:text-sm"
                    style={{ fontSize: '16px' }}
                  />
                  <kbd className="hidden items-center gap-1 rounded border border-slate-200 px-2 py-1 text-xs font-light lowercase text-slate-400 dark:border-slate-700 dark:text-slate-500 sm:inline-flex">
                    <span className="text-[10px]">⌘</span>k
                  </kbd>
                  <button
                    onClick={closeSearch}
                    className="rounded p-1 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-label="close search"
                  >
                    <X className="h-4 w-4 text-slate-400" />
                  </button>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto">
                  {results.length > 0 ? (
                    <div className="py-2">
                      {results.map((result, index) => (
                        <Link
                          key={`${result.href}-${index}`}
                          href={result.href}
                          onClick={closeSearch}
                          className={`flex items-center gap-3 px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 ${
                            index === selectedIndex ? 'bg-slate-50 dark:bg-slate-800' : ''
                          }`}
                        >
                          <div className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
                            <span className="truncate text-sm font-light lowercase text-slate-900 dark:text-slate-100">
                              {result.title}
                            </span>
                            <span className="shrink-0 text-xs font-light lowercase text-slate-400 dark:text-slate-500">
                              {result.category}
                            </span>
                          </div>
                          <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-400" />
                        </Link>
                      ))}
                    </div>
                  ) : query ? (
                    <div className="px-4 py-8 text-center">
                      <p className="text-sm font-light lowercase text-slate-500 dark:text-slate-400">
                        no results
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`rounded-lg p-2.5 transition-all duration-200 ${
            forceWhite
              ? 'text-white/70 hover:text-white md:text-slate-500 md:hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
          }`}
          aria-label="search"
        >
          <Search className="h-5 w-5" />
        </button>

        {hovered && !isOpen && (
          <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-light lowercase text-white dark:bg-slate-100 dark:text-slate-900">
            search
            <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-900 dark:bg-slate-100" />
          </div>
        )}
      </div>
      {modal}
    </>
  )
}
