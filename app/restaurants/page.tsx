'use client'

import React, { useEffect, useMemo, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import { restaurants, type Restaurant } from './restaurants.data'

type RatingState = Record<string, number>

type DropdownOption = {
  value: string
  label: string
}

type FilterDropdownProps = {
  label?: string
  value: string
  options: DropdownOption[]
  onChange: (value: string) => void
  id: string
  openDropdown: string | null
  setOpenDropdown: (id: string | null) => void
}

function FilterDropdown({ label, value, options, onChange, id, openDropdown, setOpenDropdown }: FilterDropdownProps) {
  const open = openDropdown === id
  const active = options.find((o) => o.value === value)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, setOpenDropdown])

  return (
    <div ref={dropdownRef} className={`relative text-xs sm:text-[13px] ${open ? 'z-[50]' : 'z-[35]'}`}>
      <button
        type="button"
        onClick={() => setOpenDropdown(open ? null : id)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-primary/40 dark:hover:border-[#ADD8E6]/60 transition-colors min-w-[9rem] justify-between"
      >
        <span className="flex items-center gap-1">
          {label && (
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              {label}
            </span>
          )}
          <span className="font-light truncate">
            {active?.label ?? 'Select'}
          </span>
        </span>
        <span className="text-[9px] text-slate-400 dark:text-slate-500">
          {open ? '▲' : '▼'}
        </span>
      </button>
      {open && (
        <div className="absolute z-[60] mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg max-h-64 overflow-y-auto">
          {options.map((opt) => {
            const isActive = opt.value === value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value)
                  setOpenDropdown(null)
                }}
                className={`w-full text-left px-3 py-1.5 text-xs sm:text-[13px] font-light ${
                  isActive
                    ? 'bg-primary/10 dark:bg-[#ADD8E6]/20 text-primary dark:text-[#ADD8E6]'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/70'
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

const RestaurantMap = dynamic(
  () => import('@/components/RestaurantLeafletMap'),
  { ssr: false }
)

export default function RestaurantsPage() {
  const [search, setSearch] = useState('')
  const [cityFilter, setCityFilter] = useState<'All' | Restaurant['city']>('All')
  const [priceFilter, setPriceFilter] = useState<'All' | Restaurant['price']>('All')
  const [categoryFilter, setCategoryFilter] = useState<'All' | Restaurant['category']>('All')
  const [selectedId, setSelectedId] = useState<string | null>(restaurants[0]?.id ?? null)
  const [ratings, setRatings] = useState<RatingState>({})
  const [sortBy, setSortBy] = useState<
    'featured' | 'rating-desc' | 'rating-asc' | 'price-asc' | 'price-desc' | 'name-asc'
  >('featured')

  const [page, setPage] = useState(1)
  const PAGE_SIZE = 3
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Load saved ratings from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = window.localStorage.getItem('restaurant-ratings')
      if (stored) {
        setRatings(JSON.parse(stored))
      }
    } catch {
      // ignore
    }
  }, [])

  // Persist ratings
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem('restaurant-ratings', JSON.stringify(ratings))
    } catch {
      // ignore
    }
  }, [ratings])

  const cities = useMemo(
    () => ['All', ...Array.from(new Set(restaurants.map(r => r.city)))],
    []
  ) as ('All' | Restaurant['city'])[]

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(restaurants.map(r => r.category)))],
    []
  ) as ('All' | Restaurant['category'])[]

  const prices: ('All' | Restaurant['price'])[] = ['All', '$', '$$', '$$$', '$$$$']

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      const q = search.toLowerCase().trim()
      const matchesSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.headline.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)) ||
        (r.neighbourhood ?? '').toLowerCase().includes(q)

      const matchesCity = cityFilter === 'All' || r.city === cityFilter
      const matchesPrice = priceFilter === 'All' || r.price === priceFilter
      const matchesCategory = categoryFilter === 'All' || r.category === categoryFilter

      return matchesSearch && matchesCity && matchesPrice && matchesCategory
    })
  }, [search, cityFilter, priceFilter, categoryFilter])

  // Reset to first page when filters/sort/search change
  useEffect(() => {
    setPage(1)
  }, [search, cityFilter, priceFilter, categoryFilter, sortBy])

  const filteredWithRatings = useMemo(() => {
    const withRatings = filtered.map((r, index) => ({
      ...r,
      rating: ratings[r.id] ?? r.defaultRating,
      _index: index, // preserve original order for "featured"
    }))

    const priceValue = (price: Restaurant['price']) => {
      if (price === '$') return 1
      if (price === '$$') return 2
      if (price === '$$$') return 3
      return 4
    }

    const sorted = [...withRatings].sort((a, b) => {
      switch (sortBy) {
        case 'rating-desc':
          return b.rating - a.rating
        case 'rating-asc':
          return a.rating - b.rating
        case 'price-asc':
          return priceValue(a.price) - priceValue(b.price)
        case 'price-desc':
          return priceValue(b.price) - priceValue(a.price)
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'featured':
        default:
          return a._index - b._index
      }
    })

    return sorted
  }, [filtered, ratings, sortBy])

  const selected =
    filteredWithRatings.find((r) => r.id === selectedId) ??
    filteredWithRatings[0] ??
    null

  // Ensure selectedId always points at a restaurant in the current filtered set
  useEffect(() => {
    if (!filteredWithRatings.length) return
    if (!selectedId || !filteredWithRatings.some((r) => r.id === selectedId)) {
      setSelectedId(filteredWithRatings[0].id)
    }
  }, [filteredWithRatings, selectedId])

  const totalPages = Math.max(1, Math.ceil(filteredWithRatings.length / PAGE_SIZE))
  const paginated = useMemo(
    () =>
      filteredWithRatings.slice(
        (page - 1) * PAGE_SIZE,
        (page - 1) * PAGE_SIZE + PAGE_SIZE
      ),
    [filteredWithRatings, page, PAGE_SIZE]
  )

  const handleRating = (id: string, value: number) => {
    setRatings(prev => ({ ...prev, [id]: value }))
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />

      <div className="pt-20 pb-16 md:pb-0">
        <section className="pt-32 pb-32">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-10">
            <header>
              <h1 className="text-5xl md:text-6xl font-extralight text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
                <span className="inline-block">Restaurant</span>{' '}
                <span className="inline-block text-primary dark:text-[#ADD8E6]">notes</span>
              </h1>
              <p className="text-base text-slate-600 dark:text-slate-400 font-light max-w-2xl">
                A small, highly opinionated list of spots I actually rate (and a few I really don&apos;t) — closer to personal favourites than a generic directory.
              </p>
            </header>

            {/* Filters, search, sort */}
            <div className="rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/80 p-4 sm:p-5 flex flex-col gap-4">
              {/* City pills */}
              <div className="flex flex-wrap gap-1.5 text-[11px] sm:text-xs">
                  {(['All', ...cities.filter((c) => c !== 'All')] as (
                    | 'All'
                    | Restaurant['city']
                  )[]).map((c) => {
                    const isActive = cityFilter === c
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCityFilter(c)}
                        className={`px-3 py-1 rounded-full border text-xs font-light transition-all ${
                          isActive
                            ? 'bg-primary/10 dark:bg-[#ADD8E6]/15 border-primary/40 dark:border-[#ADD8E6]/40 text-primary dark:text-[#ADD8E6]'
                            : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary/30 dark:hover:border-[#ADD8E6]/40'
                        }`}
                      >
                        {c === 'All' ? 'Everywhere' : c}
                      </button>
                    )
                  })}
              </div>
              {/* Search */}
              <div className="w-full">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, city, neighbourhood, or tag"
                  className="w-full text-sm sm:text-base px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary dark:focus:border-[#ADD8E6]"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-[13px] justify-between">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <FilterDropdown
                    id="cuisine"
                    label="Cuisine"
                    value={categoryFilter}
                    options={categories.map((c) => ({
                      value: c,
                      label: c === 'All' ? 'All cuisines' : c,
                    }))}
                    onChange={(v) => setCategoryFilter(v as any)}
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                  />
                  <FilterDropdown
                    id="price"
                    label="Price"
                    value={priceFilter}
                    options={prices.map((p) => ({
                      value: p,
                      label: p === 'All' ? 'Any price' : p,
                    }))}
                    onChange={(v) => setPriceFilter(v as any)}
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
                    Sort
                  </span>
                  <FilterDropdown
                    id="sort"
                    value={sortBy}
                    options={[
                      { value: 'featured', label: 'Featured' },
                      { value: 'rating-desc', label: 'Rating: high to low' },
                      { value: 'rating-asc', label: 'Rating: low to high' },
                      { value: 'price-asc', label: 'Price: low to high' },
                      { value: 'price-desc', label: 'Price: high to low' },
                      { value: 'name-asc', label: 'Name A–Z' },
                    ]}
                    onChange={(v) => setSortBy(v as any)}
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Map / detail side – first on mobile, left on desktop */}
              <div className="order-1 md:order-1">
                <RestaurantMap
                  restaurants={filteredWithRatings}
                  selectedId={selected?.id ?? null}
                />
              </div>

              {/* List – below on mobile, right on desktop */}
              <div className="order-2 md:order-2 space-y-3 max-w-md lg:max-w-lg md:max-w-none">
                {filteredWithRatings.length === 0 && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-light">
                    Nothing matches yet. Try widening your filters.
                  </p>
                )}
                {paginated.map((r) => {
                  const currentRating = r.rating
                  const isSelected = selected?.id === r.id
                  const bestTag = r.tags.find((tag) =>
                    tag.toLowerCase().startsWith('best ')
                  )
                  return (
                    <div
                      key={r.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedId(r.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelectedId(r.id)
                        }
                      }}
                      className={`w-full text-left rounded-2xl border px-4 py-4 sm:px-5 sm:py-5 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-primary/30 dark:border-[#ADD8E6]/40 bg-primary/5 dark:bg-[#ADD8E6]/10 shadow-sm'
                          : 'border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 hover:border-primary/30 dark:hover:border-[#ADD8E6]/40 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 font-light mb-1">
                            {r.city} {r.neighbourhood ? `· ${r.neighbourhood}` : ''}
                          </p>
                          <h2 className="text-base sm:text-lg font-extralight text-slate-900 dark:text-slate-100 tracking-tight">
                            {r.name}
                          </h2>
                          {bestTag && (
                            <p className="mt-1 inline-flex items-center gap-1 rounded-full border border-amber-300/70 bg-amber-50/70 text-[11px] text-amber-800 px-2 py-0.5 dark:border-amber-400/60 dark:bg-amber-500/10 dark:text-amber-200">
                              <span className="text-[10px]">★</span>
                              <span className="font-light">{bestTag}</span>
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
                            {r.category} · {r.price}
                          </p>
                          <div className="flex items-center gap-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => {
                                const fullStars = Math.floor(currentRating)
                                const hasHalf =
                                  currentRating - fullStars >= 0.25 &&
                                  currentRating - fullStars < 0.75
                                const isFull = star <= fullStars
                                const isHalf = !isFull && hasHalf && star === fullStars + 1

                                return (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleRating(r.id, star)
                                    }}
                                    className="text-xs sm:text-sm leading-none"
                                  >
                                    <span className="relative inline-block align-middle">
                                      {/* base star */}
                                      <span
                                        className={
                                          isFull
                                            ? 'text-amber-500'
                                            : 'text-slate-300 dark:text-slate-700'
                                        }
                                      >
                                        ★
                                      </span>
                                      {isHalf && (
                                        <>
                                          {/* grey star under */}
                                          <span className="absolute inset-0 text-slate-300 dark:text-slate-700">
                                            ★
                                          </span>
                                          {/* half gold overlay */}
                                          <span
                                            className="absolute inset-0 text-amber-500"
                                            style={{ clipPath: 'inset(0 50% 0 0)' }}
                                          >
                                            ★
                                          </span>
                                        </>
                                      )}
                                    </span>
                                  </button>
                                )
                              })}
                            </div>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-light">
                              {currentRating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light mb-2">
                        {r.headline}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {r.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-[11px] font-light bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}

                {/* Pagination controls */}
                {filteredWithRatings.length > PAGE_SIZE && (
                  <div className="flex items-center justify-between pt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light">
                    <span>
                      Page {page} of {totalPages}
                    </span>
                    <div className="inline-flex rounded-lg border border-slate-200/80 dark:border-slate-700/80 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className={`px-3 py-1 border-r border-slate-200/80 dark:border-slate-700/80 transition-colors ${
                          page === 1
                            ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        Prev
                      </button>
                      <button
                        type="button"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className={`px-3 py-1 transition-colors ${
                          page === totalPages
                            ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

