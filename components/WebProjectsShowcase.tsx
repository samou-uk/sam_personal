'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Image from '@/components/SiteImage'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export type WebShowcaseSite = {
  name: string
  tagline: string
  link?: string
  image: string
  darkImage?: string
  icon?: string
  iconImageClassName?: string
  navLabel?: string
}

const AUTO_MS = 6000

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 56 : -56,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -56 : 56,
    opacity: 0,
    scale: 0.98,
  }),
}

export default function WebProjectsShowcase({
  sites,
  onProjectClick,
}: {
  sites: WebShowcaseSite[]
  onProjectClick: (name: string) => void
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const root = document.documentElement
    const sync = () => setIsDark(root.classList.contains('dark'))
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const goTo = useCallback(
    (index: number, dir?: number) => {
      const next = (index + sites.length) % sites.length
      setDirection(dir ?? (next > activeIndex || (activeIndex === sites.length - 1 && next === 0) ? 1 : -1))
      setActiveIndex(next)
      setProgress(0)
    },
    [activeIndex, sites.length]
  )

  useEffect(() => {
    setProgress(0)
  }, [activeIndex])

  useEffect(() => {
    if (reduceMotion || isPaused || sites.length <= 1) return

    const start = Date.now()
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - start
      if (elapsed >= AUTO_MS) {
        setDirection(1)
        setActiveIndex((current) => (current + 1) % sites.length)
        return
      }
      setProgress((elapsed / AUTO_MS) * 100)
    }, 40)

    return () => window.clearInterval(tick)
  }, [activeIndex, isPaused, reduceMotion, sites.length])

  if (sites.length === 0) return null

  const current = sites[activeIndex]
  const imageSrc = isDark && current.darkImage ? current.darkImage : current.image

  return (
    <div
      className="grid gap-8 lg:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] lg:gap-8 xl:gap-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <nav className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide lg:flex-col lg:overflow-visible lg:pb-0">
        {sites.map((site, index) => {
          const isActive = index === activeIndex
          return (
            <motion.button
              key={site.name}
              type="button"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => goTo(index, index > activeIndex ? 1 : -1)}
              className={`relative flex shrink-0 items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-left transition-all duration-200 sm:px-4 sm:py-3.5 lg:w-full ${
                isActive
                  ? 'text-slate-900 dark:text-slate-100'
                  : 'text-slate-500 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800/50 dark:hover:text-slate-200'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="web-site-active"
                  className="absolute inset-0 rounded-xl border border-primary/25 bg-primary/[0.05] shadow-sm dark:border-[#ADD8E6]/25 dark:bg-[#ADD8E6]/[0.08]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {site.icon && (
                <span className="relative z-10 h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-transparent">
                  <Image
                    src={site.icon}
                    alt=""
                    fill
                    sizes="32px"
                    className={site.iconImageClassName ?? 'object-cover'}
                  />
                </span>
              )}
              <span className="relative z-10 min-w-0">
                <span className="block whitespace-nowrap text-sm font-light lowercase sm:text-base">
                  {site.navLabel ?? site.name}
                </span>
              </span>
            </motion.button>
          )
        })}
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <button
          type="button"
          onClick={() => onProjectClick(current.name)}
          className="group relative block w-full overflow-hidden rounded-xl border border-slate-300 bg-white text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)] dark:border-slate-700/80 dark:bg-slate-950 dark:hover:border-[#ADD8E6]/30 dark:hover:shadow-lg"
        >
          <div className="relative aspect-[4/3] min-h-[260px] overflow-hidden bg-slate-50 sm:min-h-[340px] lg:aspect-[16/10] lg:min-h-[400px] xl:min-h-[460px] dark:bg-slate-950">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${activeIndex}-${imageSrc}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 p-0.5 sm:p-1"
              >
                <Image
                  src={imageSrc}
                  alt={current.name}
                  fill
                  priority={activeIndex === 0}
                  quality={95}
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  className="object-contain object-top"
                />
              </motion.div>
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-slate-950/50" />
          </div>

          {!reduceMotion && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-200/50 dark:bg-slate-800">
              <motion.div
                className="h-full bg-primary dark:bg-[#ADD8E6]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          )}
        </button>

        <motion.div
          key={current.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-4 flex items-center justify-between gap-4"
        >
          <button type="button" onClick={() => onProjectClick(current.name)} className="group/name text-left">
            <p className="text-sm font-light lowercase text-slate-900 transition-colors group-hover/name:text-primary dark:text-slate-100 dark:group-hover/name:text-[#ADD8E6] sm:text-base">{current.name}</p>
          </button>
          {current.link && (
            <a
              href={current.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 text-xs font-light text-slate-500 transition-all hover:text-primary hover:gap-2 dark:text-slate-400 dark:hover:text-[#ADD8E6] sm:text-sm"
            >
              visit
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
