'use client'

import React from 'react'
import { Mail, Globe, Linkedin, Github } from 'lucide-react'

const footerLinks = [
  { icon: Mail, text: 'Email', href: 'mailto:scou@uwaterloo.ca' },
  { icon: Globe, text: 'Website', href: 'https://samou.co.uk', external: true },
  { icon: Linkedin, text: 'LinkedIn', href: 'https://linkedin.com', external: true },
  { icon: Github, text: 'GitHub', href: 'https://github.com', external: true },
]

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-16">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm font-light">
            &copy; {new Date().getFullYear()} Sam Chusen Ou
          </p>
          <div className="flex gap-8">
            {footerLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.text}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="text-slate-400 hover:text-primary transition-colors duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
