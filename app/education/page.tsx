'use client'

import React from 'react'
import Navigation from '@/components/Navigation'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

const education = [
  {
    school: 'University of Waterloo',
    location: 'Waterloo, Canada',
    summary:
      'Pursuing Mathematics/Financial Analysis & Risk Management with Statistics Joint Honours, CFA Specialization, and Computational Mathematics Minor.',
    coursework: ['Optimization', 'Computational Finance', 'Stochastic Simulation Methods', 'Investment Science', 'Business Law'],
    activities: null as string[] | null,
    image: '/UW.svg',
    year: '2023 – Present',
  },
  {
    school: 'Tonbridge School',
    location: 'Tonbridge, United Kingdom',
    summary:
      'Completed A-Levels in Mathematics, Physics and Computer Science, AS Further Mathematics. Served as House Praepostor (Prefect).',
    coursework: null as string[] | null,
    activities: ['Competitive Coding Society', 'Fencing Team', 'Tennis', 'Field Hockey XIII', 'Berkshire Youth Symphony Orchestra'],
    image: '/tonbridge.webp',
    year: '2021 – 2023',
  },
] as const

type Education = (typeof education)[number]

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-lg border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-light text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/[0.04] hover:text-primary hover:shadow-sm dark:border-slate-600/60 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-[#ADD8E6]/40 dark:hover:bg-[#ADD8E6]/[0.06] dark:hover:text-[#ADD8E6]">
      {label}
    </span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2.5">
      <span className="h-px w-6 bg-primary/45 dark:bg-[#ADD8E6]/45" />
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        {children}
      </p>
    </div>
  )
}

function EduEntry({ edu, index }: { edu: Education; index: number }) {
  const reduce = useReducedMotion()

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden py-16 first:pt-0 sm:py-20 md:py-24"
    >
      <div className="relative w-full space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 sm:flex-row sm:items-start"
        >
          <motion.div
            whileHover={reduce ? undefined : { scale: 1.04, rotate: -1.5 }}
            transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[14px] border border-slate-200/80 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:border-slate-600/50 dark:bg-slate-800 dark:shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
          >
            <Image
              src={edu.image}
              alt={edu.school}
              fill
              sizes="64px"
              className="object-contain p-2.5"
              priority={index === 0}
            />
          </motion.div>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-3xl font-extralight tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                {edu.school}
              </h2>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-light text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                {edu.year}
              </span>
            </div>
            <p className="flex items-center gap-1.5 text-sm font-light text-slate-500 dark:text-slate-400">
              <MapPin className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" aria-hidden />
              {edu.location}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="w-full text-base font-light leading-relaxed text-slate-600 dark:text-slate-300 text-balance [text-wrap:pretty] sm:text-[1.0625rem] sm:leading-[1.65] md:text-lg md:leading-relaxed">
            {edu.summary}
          </p>
        </motion.div>

        {edu.coursework && edu.coursework.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel>Coursework</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {edu.coursework.map((c) => (
                <Tag key={c} label={c} />
              ))}
            </div>
          </motion.div>
        )}

        {edu.activities && edu.activities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel>Activities</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {edu.activities.map((a) => (
                <Tag key={a} label={a} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.article>
  )
}

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />
      <div className="pt-20 pb-16 md:pb-0">
        <section className="pt-32 pb-24">
          <div className="mx-auto max-w-5xl px-6 sm:px-8">
            <header className="relative z-10 mb-16 md:mb-20">
              <h1 className="text-6xl font-extralight tracking-tight text-slate-900 dark:text-slate-100 md:text-7xl">
                <span className="inline-block">Where I&apos;ve</span>{' '}
                <span className="inline-block text-primary dark:text-[#ADD8E6]">studied</span>
              </h1>
            </header>

            <div className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
              {education.map((edu, index) => (
                <EduEntry key={edu.school} edu={edu} index={index} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
