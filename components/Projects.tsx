'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ChevronDown } from 'lucide-react'

const projects = [
  {
    name: 'Placecard',
    tagline: 'Private supper-club app for UW/WLU students',
    category: 'Full-Stack',
    description: 'Built and deployed a private social app with real-time messaging, abuse reporting, and LLM-assisted user–host matching. Hardened access controls and optimized database reads to reduce platform costs.',
    skills: ['Python', 'Flask', 'React', 'Firebase', 'Vercel', 'Railway'],
    link: 'https://the-placecard.vercel.app',
  },
  {
    name: 'Decision Support and BI Platform',
    tagline: 'DSS and BI Platform for UK-based food wholesaler',
    category: 'Full-Stack',
    description: 'Designed and shipped a secure, production BI platform for a UK food wholesaler, covering customer management and sales analytics.',
    skills: ['Python', 'SQL', 'Flask', 'JS', 'HTML'],
  },
  {
    name: 'Stock Analysis Tool',
    tagline: 'Live trading data with technical & sentiment analysis',
    category: 'GitHub',
    description: 'Built a stock analysis tool with RSI, MACD, moving averages, sentiment analysis via TextBlob, regression models, and live Yahoo Finance integration.',
    skills: ['Python', 'TextBlob', 'Tkinter', 'Yahoo Finance'],
    link: 'https://github.com/samou-uk/stock-analysis-tool',
    github: true,
  },
  {
    name: 'miniERP',
    tagline: 'Lightweight ERP for small business owners',
    category: 'Full-Stack',
    description: 'Production-ready mini ERP covering invoicing, inventory, banking, loans, analytics, and year-end close — designed for simplicity and clarity.',
    skills: ['Python', 'Flask', 'SQLite', 'JavaScript', 'Jinja2'],
  },
  {
    name: 'Bill Splitter',
    tagline: 'Quick app to divide group expenses fairly',
    category: 'GitHub',
    description: 'Simple NumPy + Tkinter app to split bills quickly and fairly with friends.',
    skills: ['Python', 'NumPy', 'Tkinter'],
    link: 'https://github.com/samou-uk/BillSplitter',
    github: true,
  },
  {
    name: 'Automated Food Labelling',
    tagline: 'Automates translations, compliance checks, and barcode creation',
    category: 'Production',
    description: 'Cut manual label creation time by 80%+. Auto-translates Chinese ingredients, validates E-numbers, flags allergens, and generates barcodes. Outputs print-ready PDFs. Deployed on AWS EC2 with Guacamole remote access.',
    skills: ['Python', 'AWS EC2', 'Apache Guacamole', 'Linux', 'HTML'],
  },
  {
    name: 'Han\'s Reservation System',
    tagline: 'Secure, GDPR-compliant restaurant booking system',
    category: 'Production',
    description: 'Custom Flask + SQLite system with GDPR compliance, AES encryption, Argon2 hashing, SMTP alerts, dynamic table control, Excel exports, and Cron-driven reports. Used in live restaurant operations.',
    skills: ['Python', 'Flask', 'SQLite', 'Argon2', 'JavaScript'],
  },
  {
    name: 'BaoClicker',
    tagline: 'Hidden clicker game with scores that persist',
    category: 'Mini Game',
    description: 'Hidden React mini-game embedded in Fortune Foods site. Features animated state transitions and persistent high scores via localStorage.',
    skills: ['React', 'JavaScript'],
  },
  {
    name: 'Fortune Express',
    tagline: 'Pizzeria-style game reimagined for a Fortune Foods store',
    category: 'Mini Game',
    description: 'Interactive React mini-game inspired by classic pizzeria simulators, adapted to a Fortune Foods retail store setting. Features order fulfillment, animations, sound effects, and an instruction modal to boost engagement and brand personality.',
    skills: ['React', 'JavaScript'],
  },
  {
    name: 'Racing Sim Hardware',
    tagline: '3D-printed pedal haptics and wind simulator',
    category: 'Hardware',
    description: 'Designed & 3D-printed custom motor mounts and fan brackets for racing sim. Integrated Arduino + SimHub for pedal haptics and wind simulation.',
    skills: ['Arduino', 'TinkerCAD', '3D Printing'],
  },
  {
    name: 'fortunefoods.co.uk',
    tagline: 'Responsive B2B site with playful interactions',
    category: 'Web',
    description: 'Responsive React-based B2B site to showcase products and engage trade customers. Includes playful Easter eggs like BaoClicker.',
    skills: ['React', 'JavaScript', 'CSS'],
    link: 'https://www.fortunefoods.co.uk',
  },
  {
    name: 'hansbuffetbasingstoke.co.uk',
    tagline: 'Restaurant site with integrated reservations',
    category: 'Web',
    description: 'Responsive site with proprietary Flask reservation system, dynamic menus, and interactive UI elements for customer engagement.',
    skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    link: 'https://www.hansbuffetbasingstoke.co.uk',
  },
  {
    name: 'fortunefoods.shop',
    tagline: 'Wholesale platform with smart search & UX',
    category: 'Web',
    description: 'Wholesale platform with Liquid-based access control, Algolia search, and custom JS middleware for collection remapping. Enhanced UX for trade customers.',
    skills: ['Shopify', 'Liquid', 'Algolia', 'JavaScript'],
    link: 'https://www.fortunefoods.shop',
  },
  {
    name: 'cmartshop.co.uk',
    tagline: 'Legacy online shop generating £104K in sales',
    category: 'Web',
    description: 'Legacy Shopify storefront hosting 1,000+ SKUs and generating £104K in sales before decommissioning.',
    skills: ['Shopify'],
    link: 'https://www.cmartshop.co.uk',
  },
]

export default function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section id="projects" className="py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(5,150,105,0.03),transparent_50%)]"></div>
      
      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-6xl md:text-7xl font-extralight text-slate-900 tracking-tighter">Projects</h2>
        </motion.div>

        <div className="space-y-3">
          {projects.map((project, index) => {
            const isExpanded = expandedIndex === index
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.02, duration: 0.5 }}
                whileHover={{ y: -2 }}
              >
                <div
                  className="group bg-white/60 backdrop-blur-2xl rounded-xl p-6 cursor-pointer border border-white/80 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-light text-slate-900 tracking-tight group-hover:text-primary transition-colors duration-300">
                          {project.name}
                        </h3>
                        <span className="text-xs text-slate-500 font-light px-2 py-1 bg-white/60 backdrop-blur-sm rounded border border-white/80">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 font-light">{project.tagline}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 mt-1"
                    >
                      <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors duration-300" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t border-slate-200/50">
                          <p className="text-slate-700 mb-6 leading-relaxed text-base font-light">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-3 py-1 text-xs text-primary border border-primary/30 rounded-full bg-primary/5 font-light backdrop-blur-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark transition-colors duration-300 font-light group/link"
                            >
                              {project.github ? (
                                <>
                                  <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                                  View on GitHub
                                </>
                              ) : (
                                <>
                                  <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                                  Visit Site
                                </>
                              )}
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
