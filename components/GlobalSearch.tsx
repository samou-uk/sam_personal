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
  // Pages
  { title: 'Home', href: '/', category: 'Page' },
  { title: 'About', href: '/about', category: 'Page' },
  { title: 'Experience', href: '/experience', category: 'Page' },
  { title: 'Projects', href: '/projects', category: 'Page' },
  { title: 'Case Studies', href: '/case-studies', category: 'Page' },
  { title: 'Education', href: '/education', category: 'Page' },
  { title: 'Resume', href: '/resume', category: 'Page' },
  { title: 'Contact', href: '/contact', category: 'Page' },
  { title: 'Restaurant Notes', href: '/restaurants', category: 'Page' },
  { title: 'Privacy Policy', href: '/privacy', category: 'Page' },
  
  // Case Studies
  { title: 'Placecard', href: '/case-studies?project=placecard', category: 'Case Study', description: 'Private supper-club app for UW/WLU students' },
  { title: 'FortuneVantage', href: '/case-studies?project=fortune', category: 'Case Study', description: 'DSS and BI Platform for UK-based food wholesaler' },
  
  // Projects
  { title: 'Placecard', href: '/projects?project=Placecard', category: 'Project', description: 'Private supper-club app for UW/WLU students' },
  { title: 'FortuneVantage', href: '/projects?project=FortuneVantage', category: 'Project', description: 'DSS and BI Platform for UK-based food wholesaler' },
  { title: 'Stock Analysis Tool', href: '/projects?project=Stock Analysis Tool', category: 'Project', description: 'Live trading data with technical & sentiment analysis' },
  { title: 'miniERP', href: '/projects?project=miniERP', category: 'Project', description: 'Lightweight ERP for small business owners' },
  { title: 'Bill Splitter', href: '/projects?project=Bill Splitter', category: 'Project', description: 'Quick app to divide group expenses fairly' },
  { title: 'Automated Food Labelling', href: '/projects?project=Automated Food Labelling', category: 'Project', description: 'Automates translations, compliance checks, and barcode creation' },
  { title: 'Han\'s Reservation System', href: '/projects?project=Han\'s Reservation System', category: 'Project', description: 'Secure, GDPR-compliant restaurant booking system' },
  { title: 'BaoClicker', href: '/projects?project=BaoClicker', category: 'Project', description: 'Hidden clicker game with scores that persist' },
  { title: 'Fortune Express', href: '/projects?project=Fortune Express', category: 'Project', description: 'Pizzeria-style game reimagined for a Fortune Foods store' },
  { title: 'Racing Sim Hardware', href: '/projects?project=Racing Sim Hardware', category: 'Project', description: '3D-printed pedal haptics and wind simulator' },
  { title: 'fortunefoods.co.uk', href: '/projects?project=fortunefoods.co.uk', category: 'Project', description: 'Responsive B2B site with playful interactions' },
  { title: 'hansbuffetbasingstoke.co.uk', href: '/projects?project=hansbuffetbasingstoke.co.uk', category: 'Project', description: 'Restaurant site with integrated reservations' },
  { title: 'fortunefoods.shop', href: '/projects?project=fortunefoods.shop', category: 'Project', description: 'Wholesale platform with smart search & UX' },
  { title: 'cmartshop.co.uk', href: '/projects?project=cmartshop.co.uk', category: 'Project', description: 'Legacy online shop generating £104K in sales' },
  { title: 'taste5.co.uk', href: '/projects?project=taste5.co.uk', category: 'Project', description: 'Modern food and beverage platform' },
]

// Recommended items to show when search is empty
const recommendations: SearchResult[] = [
  { title: 'Placecard', href: '/case-studies?project=placecard', category: 'Case Study', description: 'Private supper-club app for UW/WLU students' },
  { title: 'FortuneVantage', href: '/case-studies?project=fortune', category: 'Case Study', description: 'DSS and BI Platform for UK-based food wholesaler' },
  { title: 'Projects', href: '/projects', category: 'Page' },
  { title: 'About', href: '/about', category: 'Page' },
  { title: 'Experience', href: '/experience', category: 'Page' },
  { title: 'Restaurant Notes', href: '/restaurants', category: 'Page' },
]

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      // Escape to close
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
        item.description?.toLowerCase().includes(searchTerm)
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
          className="p-2.5 rounded-lg transition-all duration-200 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
        
        {/* Tooltip */}
        {hovered && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-light rounded-lg whitespace-nowrap pointer-events-none z-50">
            Search
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-100 rotate-45"></div>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
        onClick={() => {
          setIsOpen(false)
          setQuery('')
        }}
      />
      
      {/* Search Modal */}
      <div className="fixed top-20 sm:top-[30%] left-1/2 -translate-x-1/2 sm:-translate-y-0 w-[calc(100%-2rem)] sm:w-full max-w-2xl sm:mx-4 z-[201]">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[calc(100vh-6rem)] sm:max-h-[32rem]">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search pages, projects, case studies..."
              className="flex-1 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none text-sm font-light"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-light text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 rounded">
              <span className="text-[10px]">⌘</span>K
            </kbd>
            <button
              onClick={() => {
                setIsOpen(false)
                setQuery('')
              }}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {results.length > 0 ? (
              <div className="py-2">
                {!query.trim() && (
                  <div className="px-4 py-2 mb-1">
                    <p className="text-xs font-light text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                      Recommendations
                    </p>
                  </div>
                )}
                {results.map((result, index) => (
                  <Link
                    key={`${result.href}-${index}`}
                    href={result.href}
                    onClick={() => {
                      setIsOpen(false)
                      setQuery('')
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                      index === selectedIndex ? 'bg-slate-50 dark:bg-slate-800' : ''
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-light text-slate-900 dark:text-slate-100">
                          {result.title}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          {result.category}
                        </span>
                      </div>
                      {result.description && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-light truncate">
                          {result.description}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  </Link>
                ))}
              </div>
            ) : query ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light">
                  No results found
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

