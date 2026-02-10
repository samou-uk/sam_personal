'use client'

import React, { useState } from 'react'
import Navigation from '@/components/Navigation'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

const education = [
  {
    school: 'University of Waterloo',
    location: 'Waterloo, Canada',
    degree: 'Bachelor of Mathematics, Mathematics/Financial Analysis and Risk Management (CFA Specialization)',
    details: 'Joint Honours in Statistics · Computational Mathematics Minor · President\'s Scholarship',
    summary: 'Pursuing Mathematics/Financial Analysis & Risk Management with Statistics Joint Honours, CFA Specialization, and Computational Mathematics Minor.',
    coursework: ['Optimization', 'Financial Mathematics', 'Calculus III', 'Linear Algebra II', 'Investment Science', 'Statistics', 'Business Law'],
    activities: ['Mathematics/Financial Analysis', 'Statistics Joint Honours', 'CFA Specialization', 'Computational Mathematics Minor'],
    image: '/UW.svg',
    year: '2023 - Present',
    highlight: 'President\'s Scholarship',
  },
  {
    school: 'Tonbridge School',
    location: 'Tonbridge, United Kingdom',
    degree: 'A-Levels in Mathematics, Physics and Computer Science, AS Further Mathematics',
    details: 'House Praepostor (Prefect), Competitive Coding Society, Fencing Team, Tennis, Field Hockey XIII, Berkshire Youth Symphony Orchestra',
    summary: 'Completed A-Levels in Mathematics, Physics and Computer Science, AS Further Mathematics. Served as House Praepostor (Prefect).',
    coursework: null,
    activities: ['Competitive Coding Society', 'Fencing Team', 'Tennis', 'Field Hockey XIII', 'Berkshire Youth Symphony Orchestra'],
    image: '/tonbridge.webp',
    year: '2021 - 2023',
    highlight: 'House Praepostor',
  },
]

export default function EducationPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-16 md:pb-0">
      <section className="pt-32 pb-32">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="mb-20">
            <h1 className="text-6xl md:text-7xl font-extralight text-slate-900 mb-2 tracking-tight">
              <span className="inline-block">Where I've</span>{' '}
              <span className="inline-block text-primary">studied</span>
            </h1>
          </div>

          <div className="space-y-8">
            {education.map((edu, index) => {
              const isExpanded = expandedIndex === index
              
              return (
                <div
                  key={index}
                  className="group relative border-b border-slate-200 pb-8 last:border-b-0 last:pb-0"
                >
                  {/* Header - Always visible */}
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start gap-6">
                      {/* Logo */}
                      <div className="flex-shrink-0 w-16 h-16">
                        <div className="relative w-16 h-16 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden">
                          <Image
                            src={edu.image}
                            alt={edu.school}
                            width={64}
                            height={64}
                            sizes="64px"
                            className="object-contain p-3"
                            priority={index === 0}
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-extralight text-slate-900 mb-2 tracking-tight">
                              {edu.school}
                            </h2>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-light mb-4">
                              <span>{edu.location}</span>
                              <span className="text-slate-300">·</span>
                              <span>{edu.year}</span>
                            </div>
                            
                            {/* Summary */}
                            <p className="text-base text-slate-600 font-light leading-relaxed mb-4">
                              {edu.summary}
                            </p>

                            {/* Highlight badge */}
                            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15">
                              <span className="text-xs font-light text-primary">{edu.highlight}</span>
                            </div>
                          </div>
                          
                          {/* Expand button */}
                          <div className="flex-shrink-0 pt-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isExpanded 
                                ? 'bg-primary text-white' 
                                : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                            }`}>
                              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expandable Content */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isExpanded ? 'max-h-[2000px] opacity-100 mt-6' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="pl-24 space-y-6">
                      {edu.degree && (
                        <div>
                          <p className="text-base font-light text-slate-900 leading-relaxed">
                            {edu.degree}
                          </p>
                        </div>
                      )}

                      {edu.details && (
                        <div>
                          <p className="text-sm text-slate-600 leading-relaxed font-light">
                            {edu.details}
                          </p>
                        </div>
                      )}

                      {edu.coursework && edu.coursework.length > 0 && (
                        <div>
                          <p className="text-xs text-slate-500 font-light uppercase tracking-wider mb-3">Relevant Coursework</p>
                          <div className="flex flex-wrap gap-2">
                            {edu.coursework.map((course, courseIndex) => (
                              <span
                                key={courseIndex}
                                className="px-3 py-1.5 text-xs font-light text-slate-700 bg-slate-50 rounded-full"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {edu.activities && edu.activities.length > 0 && (
                        <div>
                          <p className="text-xs text-slate-500 font-light uppercase tracking-wider mb-3">Activities & Focus</p>
                          <div className="flex flex-wrap gap-2">
                            {edu.activities.map((activity, actIndex) => (
                              <span
                                key={actIndex}
                                className="px-3 py-1.5 text-xs font-light text-slate-700 bg-slate-50 rounded-full"
                              >
                                {activity}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      </div>
    </main>
  )
}
