'use client'

import { useEffect, useRef, useState } from 'react'
import Image from '@/components/SiteImage'
import Navigation from '@/components/Navigation'

const CITIES = [
  { src: '/index1.webp',  city: 'Shanghai',  country: 'China',    rot: '-2deg',   delay: 0   },
  { src: '/index2.webp',  city: 'Boston',    country: 'USA',      rot:  '1.5deg', delay: 60  },
  { src: '/index3.webp',  city: 'Lisbon',    country: 'Portugal', rot: '-1deg',   delay: 120 },
  { src: '/index4.webp',  city: 'Toronto',   country: 'Canada',   rot:  '2deg',   delay: 40  },
  { src: '/index5.webp',  city: 'Milan',     country: 'Italy',    rot: '-1.5deg', delay: 90  },
  { src: '/index6.webp',  city: 'New York',  country: 'USA',      rot:  '1deg',   delay: 150 },
  { src: '/index7.webp',  city: 'London',    country: 'UK',       rot: '-2deg',   delay: 20  },
  { src: '/index8.webp',  city: 'Reading',   country: 'UK',       rot:  '1.5deg', delay: 80  },
  { src: '/index9.webp',  city: 'Hong Kong SAR', country: 'China',    rot: '-1deg',   delay: 110 },
]

function CityCard({ src, city, country, rot, delay, idx }: typeof CITIES[0] & { idx: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="city-card group relative"
      style={{
        '--rot':   rot,
        '--delay': `${delay}ms`,
        transitionDelay: visible ? `${delay}ms` : '0ms',
      } as React.CSSProperties}
      data-visible={visible}
    >
      {/* Polaroid frame */}
      <div
        className={`relative bg-white dark:bg-slate-800 rounded-[4px] shadow-[0_8px_32px_rgba(15,23,42,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 ease-out city-card-inner ${visible ? 'city-card-visible' : ''}`}
        style={{ '--rot': rot, '--delay': `${delay}ms` } as React.CSSProperties}
      >
        {/* Photo area */}
        <div className="relative overflow-hidden rounded-[2px] mx-3 mt-4 mb-2" style={{ aspectRatio: idx % 3 === 0 ? '3/4' : idx % 3 === 1 ? '4/3' : '1/1' }}>
          <Image
            src={src}
            alt={`${city}, ${country}`}
            fill
            sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Caption strip */}
        <div className="px-3 pb-3 pt-1 flex items-end justify-between">
          <div>
            <p className="text-[13px] font-light text-slate-800 dark:text-slate-100 tracking-tight leading-tight">{city}</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-[0.18em] font-light mt-0.5">{country}</p>
          </div>
          {/* index number */}
          <span className="text-[9px] text-slate-300 dark:text-slate-600 font-light tabular-nums select-none">
            {String(idx + 1).padStart(2, '0')}
          </span>
        </div>

        {/* SVG decorative pin hole at top */}
        <svg aria-hidden className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 opacity-20 dark:opacity-10" viewBox="0 0 12 12">
          <circle cx="6" cy="6" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-500" />
          <circle cx="6" cy="6" r="1.5" fill="currentColor" className="text-slate-500" />
        </svg>
      </div>
    </div>
  )
}

export default function CitiesPage() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navigation />

      <div className="pt-32 pb-20 px-6 sm:px-8 max-w-5xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-12 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <h1 className="mb-6 text-[clamp(4rem,18vw,9rem)] font-extralight lowercase leading-[0.88] tracking-tighter text-slate-900 dark:text-slate-100">
            cities
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 font-light sm:whitespace-nowrap">
            Some of the cities (or towns) that have really resonated with me.
          </p>
        </div>

        {/* Masonry-ish grid */}
        <div className="columns-2 md:columns-3 gap-5 space-y-5">
          {CITIES.map((c, i) => (
            <div key={c.city} className="break-inside-avoid">
              <CityCard {...c} idx={i} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
