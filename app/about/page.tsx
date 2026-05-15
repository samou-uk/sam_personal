'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import WorldGlobe from '@/components/WorldGlobe'
import { ArrowDown } from 'lucide-react'

// ─── chapter data ──────────────────────────────────────────────────────────
const chapters = [
  {
    id: 'roots',
    number: '01',
    label: 'Roots',
    eyebrow: 'Chapter 01',
    title: 'Across the Pond',
    body: "I was born in London and spent the first 18 years of my life enduring the torrential rain before hopping across the pond to Waterloo, Canada to pursue my Bachelor's Degree.",
    body2: "A major part of my decision to come to Canada was a friendly interaction with a CBSA officer when I first arrived in Toronto in 2018 (on holiday). Their friendliness and professionalism left a lasting impression on me, shaping my perception of Canada. That first impression stuck with me, and ultimately influenced my decision to move across the pond for university.",
    note: "A lot of how I think comes from living between contexts: UK and Canada, business and engineering, precision and practicality.",
    image: '/tonbridge.webp',
    imageAlt: 'Tonbridge, London',
    imageFit: 'object-cover' as const,
    flip: false,
    numberColor: 'text-slate-400 dark:text-slate-500',
    numberClass: 'chapter-num',
    accentBar: 'bg-slate-400 dark:bg-slate-500',
    accentGlow: 'accent-glow-slate',
    noteClass: 'border-slate-200/70 bg-slate-50/70 dark:border-slate-700/50 dark:bg-slate-800/40',
  },
  {
    id: 'tennis',
    number: '02',
    label: 'Sports',
    eyebrow: 'Chapter 02',
    title: 'Outside of academia\nand its tribulations…',
    body: "I enjoy playing golf, tennis and sabre fencing. Tennis, being the most accessible, is probably my favourite sport. The other two are slightly more difficult to facilitate!\n\nI also enjoy watching Formula One. As a result, I fell down the rabbit hole of simracing too (a very costly rabbit hole at that!)",
    note: "I like things that reward repetition, timing, and tiny improvements over time. That loop feels very familiar to building.",
    image: '/tennis_about.webp',
    imageAlt: 'Sam playing tennis',
    imageFit: 'object-cover' as const,
    flip: false,
    numberColor: 'text-slate-400 dark:text-slate-500',
    numberClass: 'chapter-num',
    accentBar: 'bg-slate-400 dark:bg-slate-500',
    accentGlow: 'accent-glow-slate',
    noteClass: 'border-slate-200/70 bg-slate-50/70 dark:border-slate-700/50 dark:bg-slate-800/40',
  },
  {
    id: 'cooking',
    number: '03',
    label: 'Cooking',
    eyebrow: 'Chapter 03',
    title: 'I like food',
    body: "Having learned to cook at a young age, this skill has become particularly important since starting university in September 2023. While my cooking predominantly involves Chinese techniques, my girlfriend always claims that I make a brilliant Chicken & Mash!",
    note: "It's one of the clearest reminders that precision and instinct don't compete. Also, apparently the Chicken & Mash is unusually strong.",
    image: '/chickenmash_about.webp',
    imageAlt: 'Chicken and mash',
    imageFit: 'object-cover' as const,
    flip: true,
    numberColor: 'text-slate-400 dark:text-slate-500',
    numberClass: 'chapter-num-right',
    accentBar: 'bg-slate-400 dark:bg-slate-500',
    accentGlow: 'accent-glow-slate',
    noteClass: 'border-slate-200/70 bg-slate-50/70 dark:border-slate-700/50 dark:bg-slate-800/40',
  },
  {
    id: 'music',
    number: '04',
    label: 'Music',
    eyebrow: 'Chapter 04',
    title: 'Music.',
    body: "I have been involved in music ever since I was 8 years old (as you can see in the video!) Throughout my childhood, I played the piano, clarinet and saxophone. However, my move across the pond has not only severely diminished my free time, but also deprived me of access to a piano. These days, I am more of an appreciator of music than a musician.",
    note: "Music still influences how I think about pacing, texture, and when something feels controlled without feeling lifeless.",
    image: '/samyoungpiano_about.webp',
    imageAlt: 'Sam as a child playing piano',
    imageFit: 'object-cover' as const,
    flip: false,
    numberColor: 'text-slate-400 dark:text-slate-500',
    numberClass: 'chapter-num',
    accentBar: 'bg-slate-500',
    accentGlow: 'accent-glow-slate',
    noteClass: 'border-slate-200/70 bg-slate-50/70 dark:border-slate-700/50 dark:bg-slate-800/40',
  },
] as const

type Chapter = (typeof chapters)[number]

// ─── per-chapter animation config ─────────────────────────────────────────
const chapterMeta = {
  roots:   { textAnim: 'about-animate',      photoAnim: 'about-photo-animate', darkSection: false },
  tennis:  { textAnim: 'about-animate',      photoAnim: 'about-photo-far',     darkSection: false },
  cooking: { textAnim: 'about-animate-fade', photoAnim: 'about-photo-fade',    darkSection: false },
  music:   { textAnim: 'about-animate',      photoAnim: 'about-photo-scale',   darkSection: true  },
} as const

// ─── typewriter ────────────────────────────────────────────────────────────
const INTRO_PREFIX = "Hi, I'm "
const INTRO_ACCENT = 'Sam.'
const INTRO_FULL = INTRO_PREFIX + INTRO_ACCENT

function TypewriterHeadline({ count }: { count: number }) {
  const prefixCount = Math.min(count, INTRO_PREFIX.length)
  const accentCount = Math.max(0, count - INTRO_PREFIX.length)
  return (
    <h1
      dir="ltr"
      className="text-left text-balance text-5xl md:text-7xl lg:text-[5.75rem] font-extralight text-slate-900 dark:text-slate-100 tracking-tight leading-[0.92] lg:whitespace-nowrap"
    >
      <span>{INTRO_PREFIX.slice(0, prefixCount)}</span>
      <span className="text-primary dark:text-[#ADD8E6]">{INTRO_ACCENT.slice(0, accentCount)}</span>
      {count < INTRO_FULL.length && (
        <span className="inline-block h-[0.85em] w-[2px] bg-primary dark:bg-[#ADD8E6] align-[-0.05em] animate-pulse ml-1" />
      )}
    </h1>
  )
}

// ─── interstitial ──────────────────────────────────────────────────────────
const INTERSTITIAL_TEXT = "I won't bore you too much, but here's a little bit about me…"

function InterstitialSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!triggered) return
    let i = 0
    const interval = setInterval(() => {
      i += 1
      setCount(i)
      if (i >= INTERSTITIAL_TEXT.length) clearInterval(interval)
    }, 36)
    return () => clearInterval(interval)
  }, [triggered])

  return (
    <section ref={ref} className="relative flex min-h-0 items-center py-10 sm:py-12 pb-12 sm:pb-14 px-8 sm:px-12 xl:px-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto w-full">
        <p className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extralight text-slate-600 dark:text-slate-400 tracking-tight leading-[1.28]">
          {INTERSTITIAL_TEXT.slice(0, count)}
          {count < INTERSTITIAL_TEXT.length && (
            <span className="inline-block h-[0.82em] w-[2px] bg-slate-300 dark:bg-slate-600 align-[-0.05em] animate-pulse ml-0.5" />
          )}
        </p>
      </div>
    </section>
  )
}

// ─── side nav ─────────────────────────────────────────────────────────────
function ChapterNav({
  chapters,
  activeId,
  onJump,
  onJumpHero,
}: {
  chapters: readonly Chapter[]
  activeId: string | null
  onJump: (id: string) => void
  onJumpHero: () => void
}) {
  const navItems = [
    { id: 'hero', label: 'Hi', onClick: onJumpHero },
    ...chapters.map((ch) => ({ id: ch.id, label: ch.label, onClick: () => onJump(ch.id) })),
  ]

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-1 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-3 shadow-sm">
      {/* connecting line */}
      <div className="pointer-events-none absolute right-[17px] top-[18px] bottom-[18px] w-px bg-slate-200 dark:bg-slate-700" />

      {navItems.map((item) => {
        const active = item.id === activeId
        return (
          <button
            key={item.id}
            onClick={item.onClick}
            className="group relative flex items-center justify-end gap-2.5 py-1"
            aria-label={`Go to ${item.label}`}
          >
            <span className={`text-[10px] uppercase tracking-[0.18em] font-medium transition-all duration-200 ${
              active
                ? 'opacity-100 text-slate-800 dark:text-slate-100 translate-x-0'
                : 'opacity-40 text-slate-600 dark:text-slate-400 translate-x-1 group-hover:opacity-80 group-hover:translate-x-0'
            }`}>
              {item.label}
            </span>
            <span className={`relative z-10 shrink-0 rounded-full transition-all duration-200 ${
              active
                ? 'h-[10px] w-[10px] bg-slate-900 dark:bg-white ring-[2.5px] ring-slate-900/20 dark:ring-white/20'
                : 'h-[7px] w-[7px] bg-slate-300 dark:bg-slate-600 group-hover:bg-slate-500 dark:group-hover:bg-slate-400'
            }`} />
          </button>
        )
      })}
    </nav>
  )
}

// ─── main page ─────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [typedCount, setTypedCount] = useState(0)
  const [heroReady, setHeroReady] = useState(false)
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set())
  const [activeId, setActiveId] = useState<string | null>('hero')
  const [scrollPct, setScrollPct] = useState(0)
  const [heroScroll, setHeroScroll] = useState(0)
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())
  const heroSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      i += 1
      setTypedCount(i)
      if (i >= INTRO_FULL.length) clearInterval(t)
    }, 90)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    // Hero active tracking
    if (heroSectionRef.current) {
      const heroActive = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId('hero') },
        { threshold: 0.4 }
      )
      heroActive.observe(heroSectionRef.current)
      observers.push(heroActive)
    }

    sectionRefs.current.forEach((el, id) => {
      const reveal = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleIds((prev) => { const next = new Set(prev); next.add(id); return next })
            reveal.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      reveal.observe(el)
      observers.push(reveal)

      const active = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { threshold: 0.4 }
      )
      active.observe(el)
      observers.push(active)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      setScrollPct(el.scrollTop / (el.scrollHeight - el.clientHeight) || 0)
      setHeroScroll(el.scrollTop)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const jump = (id: string) => {
    sectionRefs.current.get(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const jumpHero = () => {
    heroSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 overflow-x-hidden">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-violet-400 to-amber-400 transition-[width] duration-75 ease-linear"
          style={{ width: `${scrollPct * 100}%` }}
        />
      </div>

      <Navigation />

      {/* ──────────── HERO ──────────── */}
      <section ref={heroSectionRef} className="relative min-h-screen overflow-hidden">

        {/* full-bleed portrait (desktop) — parallax */}
        <div className="absolute inset-y-0 right-0 hidden w-[52%] lg:block overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ transform: `translateY(${heroScroll * 0.22}px)`, willChange: 'transform' }}
          >
            <Image
              src="/about.webp"
              alt="Sam"
              fill
              sizes="52vw"
              className="object-cover object-center scale-110"
              priority
            />
            {/* gradients travel with the image so there's never a gap */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-10"
              style={{
                height: '160px',
                background: 'linear-gradient(to bottom, var(--hero-fade) 0%, var(--hero-fade-mid) 55%, transparent 100%)',
              }}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white to-transparent dark:from-slate-900" />
          </div>
        </div>

        {/* ── MOBILE HERO — full-bleed; copy bottom-anchored, typewriter LTR / left-aligned ── */}
        <div className="lg:hidden relative flex min-h-screen flex-col justify-end">
          {/* Full-bleed photo */}
          <Image
            src="/about.webp"
            alt="Sam"
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority
          />

          {/* Readability: stronger wash toward bottom where copy sits */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/80" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/75 to-transparent" />

          <div
            className={`relative z-10 mb-5 w-full max-w-none px-5 pb-[calc(4.5rem+env(safe-area-inset-bottom)+3.75rem)] pt-8 text-left space-y-4 transition-all duration-700 sm:mb-6 sm:px-6 ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {/* Inline typewriter — white on dark photo; LTR, grows left → right */}
            <h1
              dir="ltr"
              className="w-full text-5xl font-extralight text-white tracking-tight leading-[0.92] text-left text-balance"
            >
              <span>{INTRO_PREFIX.slice(0, Math.min(typedCount, INTRO_PREFIX.length))}</span>
              <span className="text-[#ADD8E6]">{INTRO_ACCENT.slice(0, Math.max(0, typedCount - INTRO_PREFIX.length))}</span>
              {typedCount < INTRO_FULL.length && (
                <span className="inline-block h-[0.85em] w-[2px] bg-white/50 align-[-0.05em] animate-pulse ml-1" />
              )}
            </h1>

            <p className="w-full max-w-none text-left text-sm text-white/75 font-light leading-relaxed text-balance">
              A student at the University of Waterloo studying Mathematics/Financial Analysis & Risk Management alongside Statistics, Joint Honours, and a Computational Mathematics minor.
            </p>

            <div className="flex w-full items-center justify-start gap-2 pt-1">
              <span className="text-xs text-white/45 font-light">Scroll</span>
              <ArrowDown className="h-3 w-3 shrink-0 animate-bounce" aria-hidden />
            </div>
          </div>
        </div>

        {/* ── DESKTOP HERO — block centered in column; all copy left-aligned inside it ── */}
        <div className="hidden lg:relative lg:z-10 lg:flex lg:min-h-screen lg:w-[52%] lg:flex-col lg:items-center lg:justify-center lg:px-12 xl:px-20 lg:py-12">
          <div className="mx-auto w-full max-w-xl space-y-8 text-left">
            <div className={`w-full transition-all duration-700 delay-100 ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <TypewriterHeadline count={typedCount} />
            </div>
            <p className={`w-full text-left text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed text-balance transition-all duration-700 delay-200 ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              A student at the University of Waterloo studying Mathematics/Financial Analysis & Risk Management alongside Statistics, Joint Honours, and a Computational Mathematics minor.
            </p>
            <div className={`flex w-full items-center justify-start gap-3 text-left text-sm text-slate-400 dark:text-slate-500 font-light select-none transition-all duration-700 delay-300 ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span>Scroll through the chapters</span>
              <ArrowDown className="h-3.5 w-3.5 animate-bounce" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── INTERSTITIAL ──────────── */}
      <InterstitialSection />

      {/* ──────────── CHAPTERS ──────────── */}
      {chapters.map((ch, idx) => {
        const visible = visibleIds.has(ch.id)
        const meta = chapterMeta[ch.id as keyof typeof chapterMeta]
        // ── Sports / Tennis: polaroid photo + standard layout ─────────────
        if (ch.id === 'tennis') {
          return (
            <section
              key={ch.id}
              id={`chapter-${ch.id}`}
              ref={(el) => { if (el) sectionRefs.current.set(ch.id, el) }}
              className="relative flex items-center py-10 sm:py-14 lg:py-20 px-6 sm:px-10 overflow-hidden scroll-mt-20 border-t border-slate-300/70 bg-gradient-to-b from-slate-100/95 via-slate-50 to-white dark:border-slate-700/45 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900"
            >
              <div className="relative z-10 max-w-6xl mx-auto w-full grid gap-8 lg:gap-12 items-center lg:grid-cols-[1fr_1.1fr]">

                {/* Text */}
                <div className="space-y-6 lg:order-1">
                  <div className={`about-slide-left ${visible ? 'about-visible' : ''}`} style={{ '--delay': '0ms' } as React.CSSProperties}>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] font-light">{ch.eyebrow}</span>
                  </div>
                  <div
                    className={`h-[1.5px] w-14 origin-left rounded-full ${ch.accentBar} ${visible ? ch.accentGlow : ''} transition-all duration-700 ease-out ${visible ? 'scale-x-100' : 'scale-x-0'}`}
                    style={{ transitionDelay: '80ms' }}
                  />
                  <h2 className={`about-slide-left ${visible ? 'about-visible' : ''} text-4xl md:text-5xl lg:text-[3.5rem] font-extralight text-slate-900 dark:text-slate-100 tracking-tight leading-[1.06] whitespace-pre-line`} style={{ '--delay': '120ms' } as React.CSSProperties}>
                    {ch.title}
                  </h2>
                  <p className={`about-slide-left ${visible ? 'about-visible' : ''} text-base md:text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-lg`} style={{ '--delay': '220ms' } as React.CSSProperties}>
                    {ch.body}
                  </p>
                </div>

                {/* Photos — horizontal scroll on mobile, 2-col grid on desktop */}
                <div className="lg:order-2">
                  {/* mobile: 2-col photo grid */}
                  <div className="grid lg:hidden grid-cols-2 gap-3">
                    <div className="flex flex-col gap-3">
                      <div className={`food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.1rem] overflow-hidden border border-slate-200/75 dark:border-slate-600/45 shadow-[0_12px_30px_rgba(15,23,42,0.08)]`} style={{ '--delay': '60ms', '--rot': '0deg', aspectRatio: '3/4' } as React.CSSProperties}>
                        <Image src="/tennis (2).jpeg" alt="Tennis" fill className="object-cover object-center" sizes="45vw" />
                      </div>
                      <div className={`food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.1rem] overflow-hidden border border-slate-200/75 dark:border-slate-600/45 shadow-[0_12px_30px_rgba(15,23,42,0.08)]`} style={{ '--delay': '200ms', '--rot': '0deg', aspectRatio: '4/3' } as React.CSSProperties}>
                        <Image src="/tennis (4).jpeg" alt="Tennis" fill className="object-cover object-center" sizes="45vw" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 pt-6">
                      <div className={`food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.1rem] overflow-hidden border border-slate-200/75 dark:border-slate-600/45 shadow-[0_12px_30px_rgba(15,23,42,0.08)]`} style={{ '--delay': '130ms', '--rot': '0deg', aspectRatio: '1/1' } as React.CSSProperties}>
                        <Image src="/tennis_about.webp" alt="Tennis" fill className="object-cover object-top" sizes="45vw" />
                      </div>
                      <div className={`food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.1rem] overflow-hidden border border-slate-200/75 dark:border-slate-600/45 shadow-[0_12px_30px_rgba(15,23,42,0.08)]`} style={{ '--delay': '300ms', '--rot': '0deg', aspectRatio: '3/4' } as React.CSSProperties}>
                        <Image src="/tennis (1).jpeg" alt="Tennis" fill className="object-cover object-center" sizes="45vw" />
                      </div>
                    </div>
                  </div>

                  {/* desktop: original 2-col staggered grid */}
                  <div className="hidden lg:grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4">
                      <div
                        className={`photo-lift food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.25rem] overflow-hidden border border-slate-200/75 dark:border-slate-600/45 shadow-[0_20px_50px_rgba(15,23,42,0.09)]`}
                        style={{ '--delay': '80ms', '--rot': '-1deg', aspectRatio: '3/4' } as React.CSSProperties}
                      >
                        <Image src="/tennis (2).jpeg" alt="Tennis" fill className="object-cover object-center" sizes="260px" />
                      </div>
                      <div
                        className={`photo-lift food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.25rem] overflow-hidden border border-slate-200/75 dark:border-slate-600/45 shadow-[0_20px_50px_rgba(15,23,42,0.09)]`}
                        style={{ '--delay': '240ms', '--rot': '0.5deg', aspectRatio: '4/3' } as React.CSSProperties}
                      >
                        <Image src="/tennis (4).jpeg" alt="Tennis" fill className="object-cover object-center" sizes="260px" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 pt-10">
                      <div
                        className={`photo-lift food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.25rem] overflow-hidden border border-slate-200/75 dark:border-slate-600/45 shadow-[0_20px_50px_rgba(15,23,42,0.09)]`}
                        style={{ '--delay': '160ms', '--rot': '1.5deg', aspectRatio: '1/1' } as React.CSSProperties}
                      >
                        <Image src="/tennis_about.webp" alt="Tennis" fill className="object-cover object-top" sizes="220px" />
                      </div>
                      <div
                        className={`photo-lift food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.25rem] overflow-hidden border border-slate-200/75 dark:border-slate-600/45 shadow-[0_20px_50px_rgba(15,23,42,0.09)]`}
                        style={{ '--delay': '320ms', '--rot': '-1deg', aspectRatio: '3/4' } as React.CSSProperties}
                      >
                        <Image src="/tennis (1).jpeg" alt="Tennis" fill className="object-cover object-center" sizes="220px" />
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-end mt-1">
                      <span className="hidden text-[10px] uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 font-light tabular-nums md:inline">
                        {String(idx + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        }

        // ── Cooking: stone background + photo mosaic ───────────────────────
        if (ch.id === 'cooking') {
          return (
            <section
              key={ch.id}
              id={`chapter-${ch.id}`}
              ref={(el) => { if (el) sectionRefs.current.set(ch.id, el) }}
              className="relative flex items-center py-10 sm:py-14 lg:py-20 px-6 sm:px-10 overflow-hidden scroll-mt-20 border-t border-stone-300/60 bg-gradient-to-b from-stone-100/90 via-stone-50 to-slate-50 dark:border-slate-600/35 dark:from-slate-950 dark:via-stone-950 dark:to-slate-950"
            >
              {/* Soft depth — same cool family as other chapters */}
              <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[44rem] w-[44rem] rounded-full bg-slate-200/25 dark:bg-slate-800/20 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -left-20 bottom-0 h-[28rem] w-[28rem] rounded-full bg-cyan-100/20 dark:bg-cyan-950/20 blur-3xl" />


              <div className="relative z-10 max-w-6xl mx-auto w-full grid gap-8 lg:gap-12 items-center lg:grid-cols-[1.2fr_1fr]">

                {/* Photo mosaic */}
                <div className="lg:order-1">
                  {/* mobile: 2-col photo grid */}
                  <div className="grid lg:hidden grid-cols-2 gap-3">
                    <div className="flex flex-col gap-3">
                      <div className={`food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.1rem] overflow-hidden border border-stone-200/60 dark:border-stone-700/40 shadow-[0_12px_30px_rgba(15,23,42,0.09)]`} style={{ '--delay': '60ms', '--rot': '0deg', aspectRatio: '1/1' } as React.CSSProperties}>
                        <Image src="/chickenmash_about.webp" alt="Chicken and mash" fill className="object-cover" sizes="45vw" />
                      </div>
                      <div className={`food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.1rem] overflow-hidden border border-stone-200/60 dark:border-stone-700/40 shadow-[0_12px_30px_rgba(15,23,42,0.09)]`} style={{ '--delay': '220ms', '--rot': '0deg', aspectRatio: '2/3' } as React.CSSProperties}>
                        <Image src="/food (3).jpeg" alt="Food" fill className="object-cover" sizes="45vw" />
                      </div>
                      <div className={`food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.1rem] overflow-hidden border border-stone-200/60 dark:border-stone-700/40 shadow-[0_12px_30px_rgba(15,23,42,0.09)]`} style={{ '--delay': '360ms', '--rot': '0deg', aspectRatio: '4/3' } as React.CSSProperties}>
                        <Image src="/food (2).jpeg" alt="Food" fill className="object-cover" sizes="45vw" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 pt-5">
                      <div className={`food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.1rem] overflow-hidden border border-stone-200/60 dark:border-stone-700/40 shadow-[0_12px_30px_rgba(15,23,42,0.09)]`} style={{ '--delay': '130ms', '--rot': '0deg', aspectRatio: '4/3' } as React.CSSProperties}>
                        <Image src="/food (1).jpeg" alt="Food" fill className="object-cover" sizes="45vw" />
                      </div>
                      <div className={`food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.1rem] overflow-hidden border border-stone-200/60 dark:border-stone-700/40 shadow-[0_12px_30px_rgba(15,23,42,0.09)]`} style={{ '--delay': '290ms', '--rot': '0deg', aspectRatio: '3/4' } as React.CSSProperties}>
                        <Image src="/food (4).jpeg" alt="Food" fill className="object-cover" sizes="45vw" />
                      </div>
                      <div className={`food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.1rem] overflow-hidden border border-stone-200/60 dark:border-stone-700/40 shadow-[0_12px_30px_rgba(15,23,42,0.09)]`} style={{ '--delay': '430ms', '--rot': '0deg', aspectRatio: '1/1' } as React.CSSProperties}>
                        <Image src="/food (5).jpeg" alt="Food" fill className="object-cover" sizes="45vw" />
                      </div>
                    </div>
                  </div>

                  {/* desktop: 3-col staggered mosaic */}
                  <div className="hidden lg:grid grid-cols-3 gap-3 sm:gap-4">
                    <div className="flex flex-col gap-3 sm:gap-4">
                      <div className={`photo-lift food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.1rem] overflow-hidden border border-stone-200/60 dark:border-stone-700/40 shadow-[0_16px_40px_rgba(15,23,42,0.09)]`} style={{ '--delay': '60ms', '--rot': '-1.5deg', aspectRatio: '2/3' } as React.CSSProperties}>
                        <Image src="/food (3).jpeg" alt="Food" fill className="object-cover" sizes="180px" />
                      </div>
                      <div className={`photo-lift food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.1rem] overflow-hidden border border-stone-200/60 dark:border-stone-700/40 shadow-[0_16px_40px_rgba(15,23,42,0.09)]`} style={{ '--delay': '200ms', '--rot': '1deg', aspectRatio: '1/1' } as React.CSSProperties}>
                        <Image src="/food (5).jpeg" alt="Food" fill className="object-cover" sizes="180px" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 sm:gap-4 pt-8 lg:pt-12">
                      <div className={`photo-lift food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.1rem] overflow-hidden border border-stone-200/60 dark:border-stone-700/40 shadow-[0_16px_40px_rgba(15,23,42,0.09)]`} style={{ '--delay': '120ms', '--rot': '0.5deg', aspectRatio: '1/1' } as React.CSSProperties}>
                        <Image src="/chickenmash_about.webp" alt="Chicken and mash" fill className="object-cover" sizes="180px" />
                      </div>
                      <div className={`photo-lift food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.1rem] overflow-hidden border border-stone-200/60 dark:border-stone-700/40 shadow-[0_16px_40px_rgba(15,23,42,0.09)]`} style={{ '--delay': '280ms', '--rot': '-1deg', aspectRatio: '4/3' } as React.CSSProperties}>
                        <Image src="/food (1).jpeg" alt="Food" fill className="object-cover" sizes="180px" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 sm:gap-4 pt-4 lg:pt-6">
                      <div className={`photo-lift food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.1rem] overflow-hidden border border-stone-200/60 dark:border-stone-700/40 shadow-[0_16px_40px_rgba(15,23,42,0.09)]`} style={{ '--delay': '160ms', '--rot': '-0.5deg', aspectRatio: '3/4' } as React.CSSProperties}>
                        <Image src="/food (4).jpeg" alt="Food" fill className="object-cover" sizes="180px" />
                      </div>
                      <div className={`photo-lift food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.1rem] overflow-hidden border border-stone-200/60 dark:border-stone-700/40 shadow-[0_16px_40px_rgba(15,23,42,0.09)]`} style={{ '--delay': '340ms', '--rot': '1.2deg', aspectRatio: '1/1' } as React.CSSProperties}>
                        <Image src="/food (2).jpeg" alt="Food" fill className="object-cover" sizes="180px" />
                      </div>
                      <div className={`photo-lift food-card-stagger ${visible ? 'food-card-visible' : ''} relative rounded-[1.1rem] overflow-hidden border border-stone-200/60 dark:border-stone-700/40 shadow-[0_16px_40px_rgba(15,23,42,0.09)]`} style={{ '--delay': '460ms', '--rot': '-0.8deg', aspectRatio: '4/3' } as React.CSSProperties}>
                        <Image src="/food (6).jpeg" alt="Food" fill className="object-cover" sizes="180px" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-6 lg:order-2">
                  <div className={`about-slide-right ${visible ? 'about-visible' : ''}`} style={{ '--delay': '0ms' } as React.CSSProperties}>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] font-light">{ch.eyebrow}</span>
                  </div>
                  <div className={`h-[1.5px] w-14 origin-left rounded-full ${ch.accentBar} ${visible ? ch.accentGlow : ''} transition-all duration-700 ease-out ${visible ? 'scale-x-100' : 'scale-x-0'}`} style={{ transitionDelay: '80ms' }} />
                  <h2 className={`about-slide-right ${visible ? 'about-visible' : ''} text-4xl md:text-5xl lg:text-[3.5rem] font-extralight text-slate-900 dark:text-slate-100 tracking-tight leading-[1.06] whitespace-pre-line`} style={{ '--delay': '120ms' } as React.CSSProperties}>
                    {ch.title}
                  </h2>
                  <p className={`about-slide-right ${visible ? 'about-visible' : ''} text-base md:text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-lg`} style={{ '--delay': '220ms' } as React.CSSProperties}>
                    {ch.body}
                  </p>
                  <div className="flex justify-start pt-2">
                    <span className="hidden text-[10px] uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 font-light tabular-nums md:inline">
                      {String(idx + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )
        }

        // ── Music: editorial dark layout — full-width headline + wide video ─
        if (ch.id === 'music') {
          return (
            <section
              key={ch.id}
              id={`chapter-${ch.id}`}
              ref={(el) => { if (el) sectionRefs.current.set(ch.id, el) }}
              className="dark relative overflow-hidden scroll-mt-20 border-t border-slate-800/90 bg-slate-950 pb-20 pt-14 sm:pb-24 sm:pt-16 px-6 sm:px-10"
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-25%,rgba(6,182,212,0.07),transparent_52%)]" />
              <div className="relative z-10 max-w-6xl mx-auto w-full space-y-8">

                {/* Heading block — spans full width, no competing image */}
                <div className="space-y-5 max-w-3xl">
                  <div className={`about-slide-left ${visible ? 'about-visible' : ''}`} style={{ '--delay': '0ms' } as React.CSSProperties}>
                    <span className="text-[10px] text-slate-500 uppercase tracking-[0.22em] font-light">{ch.eyebrow}</span>
                  </div>
                  <div className={`h-[1.5px] w-14 origin-left rounded-full ${ch.accentBar} ${visible ? ch.accentGlow : ''} transition-all duration-700 ease-out ${visible ? 'scale-x-100' : 'scale-x-0'}`} style={{ transitionDelay: '80ms' }} />
                  <h2
                    className={`about-slide-left ${visible ? 'about-visible' : ''} text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] font-extralight text-slate-100 tracking-tight leading-[1.02] whitespace-pre-line`}
                    style={{ '--delay': '120ms' } as React.CSSProperties}
                  >
                    {ch.title}
                  </h2>
                </div>

                {/* Wide landscape video */}
                <div
                  className={`about-banner-animate ${visible ? 'about-visible' : ''} relative w-full overflow-hidden rounded-[1.75rem] border border-white/[0.08] shadow-[0_32px_80px_rgba(0,0,0,0.55)]`}
                  style={{ aspectRatio: '16/9' }}
                >
                  <video
                    src="/piano.webm"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* top fade */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-slate-950/65 to-transparent" />
                  {/* bottom fade */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  {/* inset vignette */}
                  <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.5)]" />
                </div>

                {/* Body below the video */}
                <p
                  className={`about-animate ${visible ? 'about-visible' : ''} text-base md:text-lg text-slate-400 font-light leading-relaxed`}
                  style={{ '--delay': '200ms' } as React.CSSProperties}
                >
                  {ch.body}
                </p>

                {/* Counter */}
                <div className="flex justify-end">
                  <span className="hidden text-[10px] uppercase tracking-[0.3em] text-slate-500 font-light tabular-nums md:inline">
                    {String(idx + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </section>
          )
        }

        // ── Standard layout (roots only) ──────────────────────────────────
        return (
          <section
            key={ch.id}
            id={`chapter-${ch.id}`}
            ref={(el) => { if (el) sectionRefs.current.set(ch.id, el) }}
            className="relative flex items-center py-10 sm:py-14 lg:py-20 px-6 sm:px-10 overflow-hidden scroll-mt-20 bg-gradient-to-b from-white to-slate-50/90 dark:from-slate-900 dark:to-slate-950"
          >
            <div className="relative z-10 max-w-6xl mx-auto w-full grid gap-8 lg:gap-12 items-center lg:grid-cols-[1.05fr_1fr]">

              {/* text block */}
              <div className="space-y-6 order-2 lg:order-1">
                <div className={`about-slide-left ${visible ? 'about-visible' : ''}`} style={{ '--delay': '0ms' } as React.CSSProperties}>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] font-light">{ch.eyebrow}</span>
                </div>
                <div className={`h-[1.5px] w-14 origin-left rounded-full ${ch.accentBar} ${visible ? ch.accentGlow : ''} transition-all duration-700 ease-out ${visible ? 'scale-x-100' : 'scale-x-0'}`} style={{ transitionDelay: '80ms' }} />
                <h2 className={`about-slide-left ${visible ? 'about-visible' : ''} text-4xl md:text-5xl lg:text-[3.5rem] font-extralight text-slate-900 dark:text-slate-100 tracking-tight leading-[1.06] whitespace-pre-line`} style={{ '--delay': '120ms' } as React.CSSProperties}>
                  {ch.title}
                </h2>
                <p className={`about-slide-left ${visible ? 'about-visible' : ''} text-base md:text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-lg`} style={{ '--delay': '220ms' } as React.CSSProperties}>
                  {ch.body}
                </p>
                {'body2' in ch && ch.body2 && (
                  <p className={`about-slide-left ${visible ? 'about-visible' : ''} text-base md:text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-lg`} style={{ '--delay': '320ms' } as React.CSSProperties}>
                    {ch.body2}
                  </p>
                )}
              </div>

              {/* Globe */}
              <div
                className={`order-1 lg:order-2 about-slide-right ${visible ? 'about-visible' : ''}`}
                style={{ '--delay': '180ms' } as React.CSSProperties}
              >
                <div
                  className="relative w-full overflow-hidden rounded-[2rem] border border-slate-700/40 bg-slate-950 shadow-[0_32px_80px_rgba(15,23,42,0.28)] dark:shadow-[0_32px_80px_rgba(0,0,0,0.55)]"
                  style={{ aspectRatio: '1/1' }}
                >
                  <WorldGlobe />
                </div>
                <div className="mt-5 flex justify-end lg:pr-4">
                  <span className="hidden text-[10px] uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 font-light tabular-nums md:inline">
                    {String(idx + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      <div className="h-8 shrink-0 bg-slate-950 md:h-10" aria-hidden />
    </main>
  )
}
