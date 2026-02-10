'use client'

import React from 'react'
import Navigation from '@/components/Navigation'
import { Mail, Linkedin, Instagram, ExternalLink } from 'lucide-react'

// Spotify Logo SVG Component
const SpotifyLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.3.18-.54.54-.66 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.54.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
)

const contactLinks = [
  {
    name: 'Email',
    href: 'mailto:scou@uwaterloo.ca',
    icon: Mail,
    label: 'scou@uwaterloo.ca',
    description: 'Drop me a line',
    color: 'from-blue-50 to-blue-100/50',
    hoverColor: 'from-blue-100 to-blue-200/50',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sam-chusen-ou/',
    icon: Linkedin,
    label: 'linkedin.com/in/sam-chusen-ou',
    description: 'Professional network',
    color: 'from-indigo-50 to-indigo-100/50',
    hoverColor: 'from-indigo-100 to-indigo-200/50',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/samchusenou',
    icon: Instagram,
    label: '@samchusenou',
    description: 'Life updates',
    color: 'from-pink-50 to-pink-100/50',
    hoverColor: 'from-pink-100 to-pink-200/50',
  },
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/user/zgrol8utb8g4y0wy9r9uk5xy4?si=9852a9cf5de94444',
    icon: SpotifyLogo,
    label: 'sam chusen ou',
    description: 'Evening tunes',
    color: 'from-green-50 to-green-100/50',
    hoverColor: 'from-green-100 to-green-200/50',
    isSpotify: true,
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />
      <div className="pt-20 pb-16 md:pb-0">
        <section className="pt-32 pb-32 relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                // Use dark blue accent in light mode for the dotted pattern
                backgroundImage: `radial-gradient(circle at 2px 2px, #0f3d91 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}
            ></div>
          </div>
          
          <div className="max-w-5xl mx-auto px-6 sm:px-8 relative">
            <div className="mb-20">
              <h1 className="text-6xl md:text-7xl font-extralight text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                <span className="inline-block">Get in</span>{' '}
                <span className="inline-block text-primary dark:text-[#ADD8E6]">touch</span>
              </h1>
              <p className="text-base text-slate-500 dark:text-slate-400 font-light mt-6 max-w-2xl">
                Always open to new opportunities, collaborations, or just a chat. Feel free to reach out through any of these channels.
              </p>
            </div>

            <div className="space-y-5">
              {contactLinks.map((link, index) => {
                const Icon = link.icon
                const isSpotify = (link as any).isSpotify
                return (
                  <a
                    key={index}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group relative flex items-center gap-6 p-7 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl hover:border-primary/40 dark:hover:border-[#ADD8E6]/40 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md"
                    style={{
                      animationDelay: `${index * 75}ms`
                    }}
                  >
                    {/* Colored accent on hover */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 rounded-l-2xl group-hover:opacity-100 opacity-0"
                      style={{
                        background: link.name === 'Email' ? 'linear-gradient(to bottom, rgb(59 130 246), rgb(37 99 235))' :
                                  link.name === 'LinkedIn' ? 'linear-gradient(to bottom, rgb(99 102 241), rgb(79 70 229))' :
                                  link.name === 'Instagram' ? 'linear-gradient(to bottom, rgb(236 72 153), rgb(219 39 119))' :
                                  'linear-gradient(to bottom, rgb(34 197 94), rgb(22 163 74))'
                      }}
                    ></div>
                    
                    {/* Subtle glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/0 group-hover:to-primary/0 transition-all duration-500 pointer-events-none"></div>
                    
                    <div className="flex-shrink-0 w-16 h-16 ml-3 relative z-10">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md group-hover:shadow-lg`}>
                        {isSpotify ? (
                          <Icon className="w-8 h-8 text-[#1DB954] group-hover:scale-110 transition-all duration-300" />
                        ) : (
                          <Icon className="w-8 h-8 text-slate-700 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-[#ADD8E6] transition-colors duration-300" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 relative z-10">
                      <h2 className="text-2xl font-extralight text-slate-900 dark:text-slate-100 tracking-tight group-hover:text-primary dark:group-hover:text-[#ADD8E6] transition-colors duration-300 mb-2">
                        {link.name}
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-300 font-light group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors duration-300">
                        {link.label}
                      </p>
                    </div>
                    {link.href.startsWith('http') && (
                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 relative z-10">
                        <ExternalLink className="w-5 h-5 text-primary dark:text-[#ADD8E6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </div>
                    )}
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

