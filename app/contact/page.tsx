'use client'

import React from 'react'
import Navigation from '@/components/Navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Linkedin, Instagram, ArrowUpRight } from 'lucide-react'

const SpotifyLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.3.18-.54.54-.66 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.54.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
)

type ContactLink = {
  label: string
  href: string
  hint?: string
  external?: boolean
}

type SocialBlock = {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  link: ContactLink
  accent: string
  iconClass?: string
}

const emails: ContactLink[] = [
  { label: 'scou@uwaterloo.ca', href: 'mailto:scou@uwaterloo.ca', hint: 'waterloo' },
  { label: 'sam@samou.co.uk', href: 'mailto:sam@samou.co.uk', hint: 'personal' },
]

const socialBlocks: SocialBlock[] = [
  {
    id: 'linkedin',
    title: 'linkedin',
    icon: Linkedin,
    link: {
      label: 'sam-chusen-ou',
      href: 'https://www.linkedin.com/in/sam-chusen-ou/',
      external: true,
    },
    accent: 'group-hover:bg-[#0A66C2]/[0.06] dark:group-hover:bg-[#0A66C2]/10',
  },
  {
    id: 'instagram',
    title: 'instagram',
    icon: Instagram,
    link: {
      label: '@samchusenou',
      href: 'https://instagram.com/samchusenou',
      external: true,
    },
    accent: 'group-hover:bg-pink-500/[0.06] dark:group-hover:bg-pink-500/10',
  },
  {
    id: 'spotify',
    title: 'spotify',
    icon: SpotifyLogo,
    link: {
      label: 'sam chusen ou',
      href: 'https://open.spotify.com/user/zgrol8utb8g4y0wy9r9uk5xy4?si=9852a9cf5de94444',
      external: true,
    },
    accent: 'group-hover:bg-[#1DB954]/[0.06] dark:group-hover:bg-[#1DB954]/10',
    iconClass: 'text-[#1DB954]',
  },
]

const ease = [0.22, 1, 0.36, 1] as const

const cardBase =
  'relative overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm transition-all duration-500 dark:border-slate-700/60 dark:bg-slate-900/80 dark:shadow-none'

function EmailBlock({ index }: { index: number }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.05, ease }}
      className={`${cardBase} h-full p-6 sm:p-8`}
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 dark:border-transparent dark:bg-slate-800">
          <Mail className="h-5 w-5 text-slate-500 dark:text-slate-400" />
        </div>
        <h2 className="text-2xl font-extralight lowercase tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
          email
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {emails.map((email) => (
          <a
            key={email.href}
            href={email.href}
            className="group/email relative flex min-h-[7rem] flex-col justify-between rounded-xl border border-slate-300 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/40 dark:hover:border-[#ADD8E6]/30 dark:hover:bg-slate-800/80"
          >
            <span className="text-xs font-light lowercase text-slate-400 dark:text-slate-500">{email.hint}</span>
            <div className="flex items-end justify-between gap-3">
              <span className="text-base font-light leading-snug text-slate-800 dark:text-slate-200 sm:text-lg">
                {email.label}
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover/email:translate-x-0.5 group-hover/email:-translate-y-0.5 group-hover/email:text-primary dark:text-slate-600 dark:group-hover/email:text-[#ADD8E6]" />
            </div>
          </a>
        ))}
      </div>
    </motion.article>
  )
}

function SocialCard({
  block,
  index,
  fillHeight = false,
}: {
  block: SocialBlock
  index: number
  fillHeight?: boolean
}) {
  const reduceMotion = useReducedMotion()
  const Icon = block.icon

  return (
    <motion.a
      href={block.link.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.05, ease }}
      className={`group ${cardBase} flex flex-col justify-between p-6 hover:-translate-y-1 hover:border-slate-400 hover:shadow-lg dark:hover:border-slate-600 sm:p-7 ${
        fillHeight ? 'h-full min-h-[11rem] lg:min-h-0' : 'min-h-[11rem] sm:min-h-[12rem]'
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${block.accent}`}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 transition-colors duration-300 group-hover:bg-white dark:border-transparent dark:bg-slate-800 dark:group-hover:bg-slate-900/80">
          <Icon
            className={`h-5 w-5 text-slate-500 transition-colors duration-300 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200 ${block.iconClass ?? ''}`}
          />
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary dark:text-slate-600 dark:group-hover:text-[#ADD8E6]" />
      </div>

      <div className="relative mt-auto pt-8">
        <h2 className="text-2xl font-extralight lowercase tracking-tight text-slate-900 dark:text-slate-100">
          {block.title}
        </h2>
        <p className="mt-1.5 truncate text-sm font-light text-slate-500 transition-colors group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-300">
          {block.link.label}
        </p>
      </div>
    </motion.a>
  )
}

export default function ContactPage() {
  const reduceMotion = useReducedMotion()

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />
      <div className="pt-20 pb-16 md:pb-0">
        <section className="pt-32 pb-24 md:pb-32">
          <div className="mx-auto max-w-5xl px-6 sm:px-8">
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease }}
              className="mb-14 text-[clamp(4rem,18vw,9rem)] font-extralight lowercase leading-[0.88] tracking-tighter text-slate-900 dark:text-slate-100 md:mb-16"
            >
              contact
            </motion.h1>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-stretch lg:gap-5">
              <div className="lg:col-span-7 lg:h-full">
                <EmailBlock index={0} />
              </div>

              <div className="lg:col-span-5 lg:h-full">
                <SocialCard block={socialBlocks[0]} index={1} fillHeight />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-2 lg:gap-5">
                <SocialCard block={socialBlocks[1]} index={2} />
                <SocialCard block={socialBlocks[2]} index={3} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
