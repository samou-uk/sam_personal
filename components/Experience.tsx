'use client'

import React from 'react'
import { motion } from 'framer-motion'

const experiences = [
  {
    title: 'IT Application Support – Corporate (Co-op)',
    company: 'Linamar Corporation',
    location: 'Guelph, Canada',
    date: 'January 2025 – August 2025',
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
    points: [
      'Launched a secure B2B e-commerce site (Shopify, Liquid, JS) with a React marketing site, driving 6.1k+ verified sessions, 65% returning customers, and 58.4% referral-driven sales.',
      'Implemented Algolia to reduce multilingual search errors, deployed custom JS middleware for dynamic collection remapping.',
      'Deployed an internal labelling platform with one-click translation, banned E‑number flagging, allergen detection, barcode generation, and HTML-to-PDF export — cutting creation time by 80%+ and ensuring EU/UK FSA compliance.',
      'Shipped customer-facing cataloguing software using Flask and Python, reducing production time by over 50%.',
      'Managed RTI payroll and GL entries in Sage50 and Payroo. Handled daily journal entries and stock checks across SKUs in Excel.',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(5,150,105,0.03),transparent_50%)]"></div>
      
      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-6xl md:text-7xl font-extralight text-slate-900 tracking-tighter">Experience</h2>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              <div className="bg-white/60 backdrop-blur-2xl rounded-2xl p-10 border border-white/80 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="mb-6 pb-6 border-b border-slate-200/50">
                    <h3 className="text-2xl font-light text-slate-900 mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                      {exp.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 font-light">
                      <span className="font-medium">{exp.company}</span>
                      <span className="text-slate-400">·</span>
                      <span>{exp.location}</span>
                      <span className="text-slate-400">·</span>
                      <span>{exp.date}</span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {exp.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-3">
                        <span className="text-primary mt-2 text-xs">·</span>
                        <span className="text-slate-700 leading-relaxed text-base font-light">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
