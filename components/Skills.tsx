'use client'

import React from 'react'
import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: 'Languages & Frameworks',
    skills: ['Python', 'JavaScript', 'SQL', 'C', 'HTML/CSS', 'R', 'VBA', 'Liquid'],
  },
  {
    title: 'Libraries & Databases',
    skills: ['Pandas', 'NumPy', 'SQLite', 'MySQL', 'React', 'Flask', 'Prophet', 'Firebase'],
  },
  {
    title: 'Systems, Security & Data',
    skills: ['Linux (Bash, Cron, SSH)', 'AWS EC2', 'ServiceNow', 'AES', 'Argon2', 'CSP', 'CSRF', 'GDPR', 'Gunicorn'],
  },
  {
    title: 'ERP, Finance & Tools',
    skills: ['IFS (V8, Cloud)', 'Sage 50', 'Excel', 'Payroo', 'Loftware Spectrum', 'Apache Guacamole'],
  },
  {
    title: 'Interests',
    skills: ['Tennis', 'Golf', 'Sabre Fencing', 'Cooking', 'Speciality Coffee', 'Formula One', 'Sim Racing'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(5,150,105,0.03),transparent_50%)]"></div>
      
      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-6xl md:text-7xl font-extralight text-slate-900 tracking-tighter">Skills</h2>
        </motion.div>

        <div className="space-y-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -2 }}
            >
              <div className="bg-white/60 backdrop-blur-2xl rounded-xl p-8 border border-white/80 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                <h3 className="text-xl font-light text-slate-900 mb-6 tracking-tight">{category.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-sm text-slate-600 font-light"
                    >
                      {skill}
                      {skillIndex < category.skills.length - 1 && <span className="text-slate-300 mx-2">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
