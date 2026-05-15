'use client'

import React from 'react'
import Link from 'next/link'
import { Mail, Globe, Linkedin, Github, Instagram } from 'lucide-react'

const footerLinks = [
  { icon: Mail, text: 'Email', href: 'mailto:scou@uwaterloo.ca' },
  { icon: Globe, text: 'Website', href: 'https://samou.co.uk', external: true },
  { icon: Linkedin, text: 'LinkedIn', href: 'https://www.linkedin.com/in/sam-chusen-ou/', external: true },
  { icon: Github, text: 'GitHub', href: 'https://github.com/samou-uk', external: true },
  { icon: Instagram, text: 'Instagram', href: 'https://instagram.com/samchusenou', external: true },
]

const internalLinks = [
  { href: '/restaurants', label: 'Restaurant notes' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
]

export default function Footer() {
  return (
    <footer className="hidden md:block border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-light tracking-tight text-slate-900 dark:text-slate-100">
              Sam Chusen Ou
            </p>
            <p className="text-xs font-light text-slate-400 dark:text-slate-500">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-12 lg:gap-16">
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-light text-slate-500 dark:text-slate-400">
              {internalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-5 border-t border-slate-200 pt-6 dark:border-slate-800 sm:border-0 sm:pt-0">
              {footerLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.text}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
                    aria-label={link.text}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
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
