'use client'

import React from 'react'
import { Mail, Linkedin, Instagram, Music } from 'lucide-react'

const contactItems = [
  { icon: Linkedin, text: 'LinkedIn', href: 'https://linkedin.com', external: true },
  { icon: Mail, text: 'Mail', href: 'mailto:scou@uwaterloo.ca' },
  { icon: Instagram, text: 'Instagram', href: 'https://instagram.com', external: true },
  { icon: Music, text: 'Spotify', href: 'https://spotify.com', external: true },
]

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center relative z-10 pt-32 pb-20">
        <div className="space-y-12">
          {/* Main heading */}
          <div>
            <h1 className="text-7xl md:text-9xl font-extralight text-slate-900 mb-6 tracking-tighter leading-[1.05]">
              Sam Chusen Ou
            </h1>
          </div>

          {/* Contact links with improved design */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {contactItems.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.text}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-2.5 px-6 py-3.5 bg-white rounded-xl text-slate-700 hover:text-primary transition-all duration-300 border border-slate-200 hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm font-light">{item.text}</span>
                </a>
              )
            })}
          </div>

          {/* Personal touches - redesigned */}
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#"
              className="px-5 py-2.5 bg-primary/5 rounded-lg text-slate-700 hover:text-primary border border-primary/10 hover:border-primary/30 transition-all duration-300 font-light hover:shadow-md hover:-translate-y-0.5"
            >
              Evening tunes
            </a>
            <a
              href="#"
              className="px-5 py-2.5 bg-primary/5 rounded-lg text-slate-700 hover:text-primary border border-primary/10 hover:border-primary/30 transition-all duration-300 font-light hover:shadow-md hover:-translate-y-0.5"
            >
              My favourite hymns from Tonbridge
            </a>
            <a
              href="#"
              className="px-5 py-2.5 bg-primary/5 rounded-lg text-slate-700 hover:text-primary border border-primary/10 hover:border-primary/30 transition-all duration-300 font-light hover:shadow-md hover:-translate-y-0.5"
            >
              Quality Trousers
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
