'use client'

import React from 'react'
import { motion } from 'framer-motion'

const education = [
  {
    school: 'University of Waterloo',
    location: 'Waterloo, Canada',
    dates: '2023 — Present',
    degree: 'Bachelor of Mathematics, Mathematics/Financial Analysis and Risk Management (CFA Specialization)',
    details: 'Joint Honours in Statistics · Computational Mathematics Minor · President\'s Scholarship',
    coursework: ['Optimization', 'Computational Finance', 'Stochastic Simulation Methods', 'Investment Science', 'Business Law'],
  },
  {
    school: 'Tonbridge School',
    location: 'Tonbridge, United Kingdom',
    dates: '2021 — 2023',
    degree: 'A-Levels in Mathematics, Physics and Computer Science, AS Further Mathematics',
    details: 'House Praepostor (Prefect), Competitive Coding Society, Fencing Team, Tennis, Field Hockey XIII, Berkshire Youth Symphony Orchestra',
    coursework: null as string[] | null,
  },
]

export default function Education() {
  return (
    <section id="education" className="relative overflow-hidden bg-white py-32 dark:bg-slate-900">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-6xl font-extralight tracking-tighter text-slate-900 dark:text-slate-100 md:text-7xl">
            Education
          </h2>
        </motion.div>

        <div className="divide-y divide-slate-200 border-t border-b border-slate-200 dark:divide-slate-700 dark:border-slate-700">
          {education.map((edu, index) => (
            <motion.article
              key={edu.school}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="grid gap-8 py-10 sm:grid-cols-[minmax(0,7rem)_1fr] sm:gap-10 sm:py-12"
            >
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {edu.dates}
                </p>
              </div>

              <div className="min-w-0 space-y-6">
                <header>
                  <h3 className="text-2xl font-extralight tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                    {edu.school}
                  </h3>
                  <p className="mt-1 text-sm font-light text-slate-500 dark:text-slate-400">{edu.location}</p>
                </header>

                {edu.degree && (
                  <p className="max-w-2xl text-base font-light leading-relaxed text-slate-800 dark:text-slate-200">
                    {edu.degree}
                  </p>
                )}

                <p className="max-w-2xl text-sm font-light leading-relaxed text-slate-600 dark:text-slate-300">
                  {edu.details}
                </p>

                {edu.coursework && edu.coursework.length > 0 && (
                  <div>
                    <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                      Relevant coursework
                    </p>
                    <ul className="max-w-xl space-y-2 border-l border-slate-200 pl-4 dark:border-slate-600">
                      {edu.coursework.map((c) => (
                        <li key={c} className="text-sm font-light text-slate-700 dark:text-slate-300">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
