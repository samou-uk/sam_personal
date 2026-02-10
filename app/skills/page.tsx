'use client'

import React, { useState } from 'react'
import Navigation from '@/components/Navigation'
import { Code, Database, Shield, BarChart3, Heart } from 'lucide-react'

const skillCategories = [
  {
    title: 'Languages & Frameworks',
    skills: ['Python', 'JavaScript', 'SQL', 'C', 'HTML/CSS', 'R', 'VBA', 'Liquid'],
    icon: Code,
    color: 'text-blue-600',
  },
  {
    title: 'Libraries & Databases',
    skills: ['Pandas', 'NumPy', 'SQLite', 'MySQL', 'React', 'Flask', 'Prophet', 'Firebase'],
    icon: Database,
    color: 'text-purple-600',
  },
  {
    title: 'Systems, Security & Data',
    skills: ['Linux (Bash, Cron, SSH)', 'AWS EC2', 'ServiceNow', 'AES', 'Argon2', 'CSP', 'CSRF', 'GDPR', 'Gunicorn'],
    icon: Shield,
    color: 'text-green-600',
  },
  {
    title: 'ERP, Finance & Tools',
    skills: ['IFS (V8, Cloud)', 'Sage 50', 'Excel', 'Payroo', 'Loftware Spectrum', 'Apache Guacamole'],
    icon: BarChart3,
    color: 'text-orange-600',
  },
  {
    title: 'Interests',
    skills: ['Tennis', 'Golf', 'Sabre Fencing', 'Cooking', 'Speciality Coffee', 'Formula One', 'Sim Racing'],
    icon: Heart,
    color: 'text-red-600',
  },
]

export default function SkillsPage() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-16 md:pb-0">
      <section className="pt-32 pb-32">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="mb-20">
            <h1 className="text-6xl md:text-7xl font-extralight text-slate-900 mb-2 tracking-tight">
              <span className="inline-block">What I</span>{' '}
              <span className="inline-block text-primary">know</span>
            </h1>
          </div>

          <div className="space-y-20">
            {skillCategories.map((category, index) => {
              const Icon = category.icon
              const isHovered = hoveredCategory === category.title
              
              return (
                <div
                  key={category.title}
                  onMouseEnter={() => setHoveredCategory(category.title)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="group"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isHovered ? 'bg-slate-100 scale-110' : 'bg-slate-50'
                    }`}>
                      <Icon className={`w-7 h-7 transition-colors duration-300 ${
                        isHovered ? category.color : 'text-slate-400'
                      }`} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-extralight text-slate-900 tracking-tight mb-1 transition-colors duration-300">
                        {category.title}
                      </h2>
                      <p className="text-sm text-slate-500 font-light">
                        {category.skills.length} skills
                      </p>
                    </div>
                  </div>

                  {/* Skills - Flowing layout */}
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className={`px-4 py-2 rounded-lg text-sm font-light border transition-all duration-300 ${
                          isHovered
                            ? `${category.color} border-current bg-white shadow-sm scale-105`
                            : 'text-slate-600 border-slate-200 bg-slate-50 hover:border-slate-300'
                        }`}
                        style={{
                          transitionDelay: isHovered ? `${skillIndex * 20}ms` : '0ms'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
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
