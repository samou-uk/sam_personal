'use client'

import React from 'react'
import Navigation from '@/components/Navigation'
import Image from '@/components/SiteImage'
import { motion, useReducedMotion } from 'framer-motion'

const education = [
  {
    school: 'University of Waterloo',
    location: 'Waterloo, Canada',
    dates: '2023 — present',
    degree:
      'Bachelor of Mathematics — Mathematics/Financial Analysis & Risk Management and Statistics (joint honours), Computational Mathematics minor.',
    details: "President's Scholarship.",
    coursework: [
      'Optimization',
      'Computational Finance',
      'Stochastic Simulation Methods',
      'Investment Science',
      'Business Law',
    ],
    image: '/UW.svg',
  },
  {
    school: 'Tonbridge School',
    location: 'Tonbridge, United Kingdom',
    dates: '2021 — 2023',
    degree: 'A-Levels in Mathematics, Physics and Computer Science; AS Further Mathematics.',
    details:
      'House Praepostor. Competitive Coding Society, fencing, tennis, field hockey XIII, Berkshire Youth Symphony Orchestra.',
    coursework: null as string[] | null,
    image: '/tonbridge.webp',
  },
] as const

type Education = (typeof education)[number]

const ease = [0.22, 1, 0.36, 1] as const

function EduEntry({ edu, index }: { edu: Education; index: number }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease }}
      className="grid gap-6 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/80 dark:shadow-none sm:grid-cols-[7.5rem_1fr] sm:gap-10 sm:p-8"
    >
      <p className="text-sm font-light tabular-nums text-slate-500 dark:text-slate-400">{edu.dates}</p>

      <div className="min-w-0 space-y-5">
        <header className="flex items-start gap-4">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700/70 dark:bg-slate-800">
            <Image
              src={edu.image}
              alt=""
              fill
              sizes="44px"
              className="object-contain p-1.5"
              priority={index === 0}
            />
          </div>
          <div className="min-w-0 pt-0.5">
            <h2 className="text-2xl font-extralight tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              {edu.school}
            </h2>
            <p className="mt-1 text-sm font-light text-slate-500 dark:text-slate-400">{edu.location}</p>
          </div>
        </header>

        <p className="max-w-2xl text-base font-light leading-relaxed text-slate-700 dark:text-slate-300">
          {edu.degree}
        </p>

        <p className="max-w-2xl text-sm font-light leading-relaxed text-slate-600 dark:text-slate-400">
          {edu.details}
        </p>

        {edu.coursework && edu.coursework.length > 0 && (
          <ul className="max-w-xl space-y-1.5 border-l border-slate-300 pl-4 dark:border-slate-700">
            {edu.coursework.map((course) => (
              <li key={course} className="text-sm font-light text-slate-600 dark:text-slate-400">
                {course}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  )
}

export default function EducationPage() {
  const reduceMotion = useReducedMotion()

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />
      <div className="pt-20 pb-16 md:pb-0">
        <section className="pt-32 pb-24 md:pb-32">
          <div className="mx-auto max-w-5xl px-6 sm:px-8">
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease }}
              className="mb-14 text-[clamp(4rem,18vw,9rem)] font-extralight lowercase leading-[0.88] tracking-tighter text-slate-900 dark:text-slate-100 md:mb-20"
            >
              education
            </motion.h1>

            <div className="space-y-5">{education.map((edu, index) => <EduEntry key={edu.school} edu={edu} index={index} />)}</div>
          </div>
        </section>
      </div>
    </main>
  )
}
