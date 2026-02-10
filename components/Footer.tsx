'use client'

import React from 'react'
import { Mail, Globe, Linkedin, Github, Instagram } from 'lucide-react'

const footerLinks = [
  { icon: Mail, text: 'Email', href: 'mailto:scou@uwaterloo.ca' },
  { icon: Globe, text: 'Website', href: 'https://samou.co.uk', external: true },
  { icon: Linkedin, text: 'LinkedIn', href: 'https://www.linkedin.com/in/sam-chusen-ou/', external: true },
  { icon: Github, text: 'GitHub', href: 'https://github.com/samou-uk', external: true },
  { icon: Instagram, text: 'Instagram', href: 'https://instagram.com/samchusenou', external: true },
]

export default function Footer() {
  return (
    // Desktop/footer view only – mobile version lives inside the hamburger menu
    <footer className="hidden md:block bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-10">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-light">
            &copy; {new Date().getFullYear()} Sam Chusen Ou
          </p>

          <div className="flex items-center gap-8">
            {/* Internal links only in footer */}
            <nav className="flex items-center gap-4 text-xs font-light text-slate-500 dark:text-slate-400">
              <a href="/restaurants" className="hover:text-primary dark:hover:text-[#ADD8E6] transition-colors duration-200">
                Restaurant notes
              </a>
              <a href="/privacy" className="hover:text-primary dark:hover:text-[#ADD8E6] transition-colors duration-200">
                Privacy
              </a>
            </nav>

            <div className="flex gap-4">
              {footerLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.text}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-[#ADD8E6] transition-colors duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
