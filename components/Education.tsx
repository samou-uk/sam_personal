'use client'

import React from 'react'
import { motion } from 'framer-motion'

const education = [
  {
    school: 'University of Waterloo',
    location: 'Waterloo, Canada',
    degree: 'Bachelor of Mathematics, Mathematics/Financial Analysis and Risk Management (CFA Specialization)',
    details: 'Joint Honours in Statistics · Computational Mathematics Minor · President\'s Scholarship',
    coursework: 'Relevant Coursework: Optimization, Financial Mathematics, Calculus III, Linear Algebra II, Investment Science, Statistics, Business Law',
  },
  {
    school: 'Tonbridge School',
    location: 'Tonbridge, United Kingdom',
    degree: null,
    details: 'House Praepostor (Prefect), Competitive Coding Society, Fencing Team, Tennis, Field Hockey XIII, Berkshire Youth Symphony Orchestra',
    coursework: null,
  },
]

export default function Education() {
  return (
    <section id="education" className="py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(5,150,105,0.03),transparent_50%)]"></div>
      
      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-6xl md:text-7xl font-extralight text-slate-900 tracking-tighter">Education</h2>
        </motion.div>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
            >
              <div className="bg-white/60 backdrop-blur-2xl rounded-2xl p-10 border border-white/80 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                <h3 className="text-2xl font-light text-slate-900 mb-3 tracking-tight">{edu.school}</h3>
                <p className="text-sm text-slate-600 font-light mb-6">{edu.location}</p>
                {edu.degree && (
                  <p className="text-lg font-light text-slate-900 mb-4 tracking-tight">{edu.degree}</p>
                )}
                <p className="text-slate-700 mb-4 leading-relaxed text-base font-light">{edu.details}</p>
                {edu.coursework && (
                  <p className="text-slate-600 leading-relaxed text-sm font-light mt-6">{edu.coursework}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
