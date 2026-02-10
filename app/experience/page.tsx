'use client'

import React, { useState } from 'react'
import Navigation from '@/components/Navigation'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

const experiences = [
  {
    title: 'IT Application Support – Corporate (Co-op)',
    company: 'Linamar Corporation',
    location: 'Guelph, Canada',
    date: 'January 2025 – August 2025',
    image: '/linamar.png',
    summary: 'Resolved 600+ finance, operations and access incidents, automated processes eliminating 99.96% of manual work, and resolved 100+ SOD issues.',
    highlights: ['600+ incidents solved', '99.96% audit prep time saved', '100+ SOD issues resolved'],
    points: [
      'Resolved 600+ finance, operations and access incidents with an average resolution time under 4 hours, exceeding SLA targets by 92%.',
      'Automated dormant accounts review process with Python, eliminating 99.96% of manual work and preparing audit-ready data for external auditors.',
      'Led bi-weekly Internal Audit meetings to present due diligence on IFS segregation-of-duties conflicts, resolving 100+ SOD issues.',
      'Authored IFS User Access guide, formalized into a centrally controlled WI and adopted as the company\'s IFS access workflow.',
      'Reconfigured GL accounts in IFS to align with French GAAP (Combination Rules and Tax Codes).',
    ],
  },
  {
    title: 'Application Developer (Part-time & Remote)',
    company: 'Hans Holdings Management',
    location: 'Basingstoke, United Kingdom',
    date: 'August 2024 – September 2025',
    image: '/hans.png',
    summary: 'Built production Flask reservation system with £2,000+ annual savings, GDPR compliance, and 1,700+ week-one bookings.',
    highlights: ['£2,000+ savings', 'GDPR compliant', '1,700+ week-one bookings'],
    points: [
      'Shipped a RESTful Flask-based reservation system; £2,000+ annual savings, 1,700+ week-one bookings, 30,000+ month-one visits.',
      'Implemented role-based authentication with AES-encrypted PII, Argon2 hashing, CSRF protection, CSP, and custom rate limiting.',
      'Developed tamper-proof audit logs with SQLite triggers to ensure GDPR compliance, data integrity and auditability.',
      'Led user acceptance and penetration testing, documenting vulnerabilities and validating fixes to meet business and compliance requirements.',
    ],
  },
  {
    title: 'Assistant Accounting Intern (Co-op)',
    company: 'Fortune Foods UK',
    location: 'Reading, United Kingdom',
    date: 'May 2024 – August 2024',
    image: '/ffuk.jpg',
    summary: 'Launched B2B e-commerce platform with 58.4% referral-driven sales, 65% returning customers, and automation cutting creation time by 80% and production time by 50%.',
    highlights: ['58.4% referral sales', '65% returning customers', '80%+ label generation time saved', 'Catalogue production time cut by 50%+'],
    points: [
      'Launched a secure B2B e-commerce site (Shopify, Liquid, JS) with a React marketing site, driving 6.1k+ verified sessions, 65% returning customers, and 58.4% referral-driven sales.',
      'Implemented Algolia to reduce multilingual search errors, deployed custom JS middleware for dynamic collection remapping.',
      'Deployed an internal labelling platform with one-click translation, banned E‑number flagging, allergen detection, barcode generation, and HTML-to-PDF export — cutting creation time by 80%+ and ensuring EU/UK FSA compliance.',
      'Shipped customer-facing cataloguing software using Flask and Python, reducing production time by over 50%.',
      'Managed RTI payroll and GL entries in Sage50 and Payroo. Handled daily journal entries and stock checks across SKUs in Excel.',
    ],
  },
]

export default function ExperiencePage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />
      <div className="pt-20 pb-16 md:pb-0">
      <section className="pt-32 pb-32">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="mb-20">
            <h1 className="text-6xl md:text-7xl font-extralight text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
              <span className="inline-block">Where I've</span>{' '}
              <span className="inline-block text-primary dark:text-[#ADD8E6]">worked</span>
            </h1>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const isExpanded = expandedIndex === index
              
              return (
                    <div
                      key={index}
                      className="group relative border-b border-slate-200 dark:border-slate-700 pb-8 last:border-b-0 last:pb-0"
                    >
                  {/* Header - Always visible */}
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start gap-6">
                      {/* Logo */}
                      <div className="flex-shrink-0 w-16 h-16">
                        <div className="relative w-16 h-16 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                          <Image
                            src={exp.image}
                            alt={exp.company}
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
                            <h2 className="text-2xl font-extralight text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                              {exp.title}
                            </h2>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 font-light mb-4">
                              <span className="text-slate-900 dark:text-slate-100 font-light">{exp.company}</span>
                              <span className="text-slate-300 dark:text-slate-600">·</span>
                              <span>{exp.location}</span>
                              <span className="text-slate-300 dark:text-slate-600">·</span>
                              <span>{exp.date}</span>
                            </div>
                            
                            {/* Summary */}
                            <p className="text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-4">
                              {exp.summary}
                            </p>

                            {/* Highlight badges */}
                            <div className="flex flex-wrap gap-2">
                              {(exp.highlights || []).map((highlight, idx) => (
                                <div key={idx} className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/8 dark:bg-[#ADD8E6]/20 border border-primary/15 dark:border-[#ADD8E6]/30">
                                  <span className="text-xs font-light text-primary dark:text-[#ADD8E6]">{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Expand button */}
                          <div className="flex-shrink-0 pt-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isExpanded 
                                ? 'bg-primary dark:bg-[#ADD8E6] text-white dark:text-slate-900' 
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
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
                    <div className="pl-24">
                      <ul className="space-y-3 list-disc list-inside">
                        {exp.points.map((point, pointIndex) => (
                              <li 
                                key={pointIndex} 
                                className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm font-light"
                              >
                                {point}
                              </li>
                        ))}
                      </ul>
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
