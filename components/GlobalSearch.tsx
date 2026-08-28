'use client'

import React, { useState, useEffect, useRef } from 'react'
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
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

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

  const handleSelect = (href: string) => {
    router.push(href)
    setIsOpen(false)
    setQuery('')
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

  if (!isOpen) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`p-2.5 rounded-lg transition-all duration-200 ${forceWhite ? 'text-white/70 hover:text-white md:text-slate-500 md:hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'}`}
          aria-label="search"
        >
          <Search className="w-5 h-5" />
        </button>

        {hovered && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-light lowercase rounded-lg whitespace-nowrap pointer-events-none z-50">
            search
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-100 rotate-45" />
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
        onClick={() => {
          setIsOpen(false)
          setQuery('')
        }}
      />

      <div className="fixed top-20 sm:top-[30%] left-1/2 -translate-x-1/2 sm:-translate-y-0 w-[calc(100%-2rem)] sm:w-full max-w-2xl sm:mx-4 z-[201]">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[calc(100vh-6rem)] sm:max-h-[32rem]">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="search"
              className="flex-1 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none text-base sm:text-sm font-light lowercase"
              style={{ fontSize: '16px' }}
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-light text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 rounded lowercase">
              <span className="text-[10px]">⌘</span>k
            </kbd>
            <button
              onClick={() => {
                setIsOpen(false)
                setQuery('')
              }}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="close search"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            {results.length > 0 ? (
              <div className="py-2">
                {results.map((result, index) => (
                  <Link
                    key={`${result.href}-${index}`}
                    href={result.href}
                    onClick={() => {
                      setIsOpen(false)
                      setQuery('')
                    }}
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                      index === selectedIndex ? 'bg-slate-50 dark:bg-slate-800' : ''
                    }`}
                  >
                    <div className="flex-1 min-w-0 flex items-baseline justify-between gap-3">
                      <span className="text-sm font-light lowercase text-slate-900 dark:text-slate-100 truncate">
                        {result.title}
                      </span>
                      <span className="shrink-0 text-xs font-light lowercase text-slate-400 dark:text-slate-500">
                        {result.category}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  </Link>
                ))}
              </div>
            ) : query ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light lowercase">
                  no results
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}
