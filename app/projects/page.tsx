'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Navigation from '@/components/Navigation'
import Image from '@/components/SiteImage'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight, X as XIcon, BookOpen } from 'lucide-react'
import WebProjectsShowcase, { type WebShowcaseSite } from '@/components/WebProjectsShowcase'

const projects = [
  {
    name: 'Placecard',
    tagline: 'Private supper-club app for UW/WLU students',
    category: 'Full-Stack',
    description: 'Built and deployed a private social app with real-time messaging, abuse reporting, and LLM-assisted user–host matching. Hardened access controls and optimized database reads to reduce platform costs.',
    skills: ['Python', 'Flask', 'React', 'Firebase', 'Vercel', 'Railway'],
    link: 'https://the-placecard.vercel.app',
    image: '/placecard.png',
    featured: true,
  },
  {
    name: 'FortuneVantage',
    tagline: 'DSS and BI Platform for UK-based food wholesaler',
    category: 'Full-Stack',
    description: 'Designed and shipped a secure, production BI platform for a UK food wholesaler, covering customer management and sales analytics.',
    skills: ['Python', 'SQL', 'Flask', 'JS', 'HTML'],
    image: '/fortunevantage1.png',
    featured: true,
  },
  {
    name: 'Fortune Commerce',
    tagline: 'Full-stack B2B wholesale e-commerce — 500+ SKUs',
    category: 'Full-Stack',
    description:
      'Built and shipped a full-stack B2B e-commerce platform (React, TypeScript, Flask, PostgreSQL, Railway) for a UK food wholesale business with 500+ live SKUs. Features include corporate accounts with hierarchical RBAC and approval workflows, AES-256 encrypted audit logging, modular XLSX import pipelines with OOXML structural validation and WEBP image conversion, a drag-and-drop email/PDF report builder with dynamic template rendering, CDN caching, and server-side catalog price validation.',
    skills: ['React', 'TypeScript', 'Flask', 'PostgreSQL', 'Railway'],
    image: '/fortunecommerce1.png',
    featured: true,
  },
  {
    name: 'Bill Splitter',
    tagline: 'Quick app to divide group expenses fairly',
    category: 'GitHub',
    description: 'Simple NumPy + Tkinter app to split bills quickly and fairly with friends.',
    skills: ['Python', 'NumPy', 'Tkinter'],
    link: 'https://github.com/samou-uk/BillSplitter',
    github: true,
    image: '/billsplitter.png',
  },
  {
    name: 'BaoClicker',
    tagline: 'Hidden clicker game with scores that persist',
    category: 'Mini Game',
    description: 'Hidden React mini-game embedded in Fortune Foods site. Features animated state transitions and persistent high scores via localStorage.',
    skills: ['React', 'JavaScript'],
    link: 'https://fortunefoods.co.uk/BaoClicker',
    image: '/BaoClicker.png',
  },
  {
    name: 'Racing Sim Hardware',
    tagline: '3D-printed pedal haptics and wind simulator',
    category: 'Hardware',
    description: 'Designed & 3D-printed custom motor mounts and fan brackets for racing sim. Integrated Arduino + SimHub for pedal haptics and wind simulation.',
    skills: ['Arduino', 'TinkerCAD', '3D Printing'],
    images: ['/haptic.jpg', '/windsim.jpg'],
  },
  {
    name: 'fortunefoods.co.uk',
    tagline: 'Responsive B2B site with playful interactions',
    category: 'Web',
    description: 'Responsive React-based B2B site to showcase products and engage trade customers. Includes playful Easter eggs like BaoClicker.',
    skills: ['React', 'JavaScript', 'CSS'],
    link: 'https://www.fortunefoods.co.uk',
    image: '/fortunefoodsweb.png',
  },
  {
    name: 'hansbuffetbasingstoke.co.uk',
    tagline: 'Restaurant site with integrated reservations',
    category: 'Web',
    description: 'Responsive site with proprietary Flask reservation system, dynamic menus, and interactive UI elements for customer engagement.',
    skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    link: 'https://www.hansbuffetbasingstoke.co.uk',
    image: '/hansweb.png',
  },
  {
    name: 'cmartshop.co.uk',
    tagline: 'Legacy online shop generating £104K in sales',
    category: 'Web',
    description: 'Legacy Shopify storefront hosting 1,000+ SKUs and generating £104K in sales before decommissioning.',
    skills: ['Shopify'],
    link: 'https://www.cmartshop.co.uk',
    image: '/cmartweb.png',
  },
  {
    name: 'taste5.co.uk',
    tagline: 'Modern food and beverage platform',
    category: 'Web',
    description: 'Contemporary web platform showcasing food and beverage offerings with responsive design and engaging user experience.',
    skills: ['React', 'JavaScript', 'CSS'],
    link: 'https://www.taste5.co.uk',
    image: '/taste5web.png',
  },
  {
    name: 'samou.co.uk',
    tagline: 'My personal portfolio',
    category: 'Web',
    description: 'Personal portfolio site with responsive design, dark mode, and interactive project showcases.',
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    link: 'https://samou.co.uk',
    image: '/samwebsite.png',
  },
]

const projectSections = [
  {
    id: 'web',
    title: 'web',
    names: [
      'fortunefoods.co.uk',
      'cmartshop.co.uk',
      'taste5.co.uk',
      'hansbuffetbasingstoke.co.uk',
      'samou.co.uk',
    ],
  },
  {
    id: 'full-stack',
    title: 'full stack',
    names: ['Fortune Commerce', 'FortuneVantage', 'Placecard'],
  },
  {
    id: 'misc',
    title: 'misc',
    names: ['Racing Sim Hardware', 'BaoClicker', 'Bill Splitter'],
  },
] as const

const sectionEase = [0.22, 1, 0.36, 1] as const

const webSiteExtras: Record<string, Partial<WebShowcaseSite>> = {
  'fortunefoods.co.uk': { icon: '/ffuk.jpg', navLabel: 'fortune foods' },
  'cmartshop.co.uk': { icon: '/cmartlogo.png', navLabel: 'cmart' },
  'taste5.co.uk': { icon: '/taste5logo.png', navLabel: 'taste5' },
  'hansbuffetbasingstoke.co.uk': {
    icon: '/hans.png',
    image: '/hansweb2.png',
    iconImageClassName: 'object-contain p-1.5',
    navLabel: 'hans buffet',
  },
  'samou.co.uk': { icon: '/sam.png', image: '/samwebsite.png', navLabel: 'samou' },
}

function toWebShowcaseSite(project: Project): WebShowcaseSite {
  const extras = webSiteExtras[project.name] ?? {}
  return {
    name: project.name,
    tagline: project.tagline,
    link: project.link,
    image: extras.image ?? project.image ?? '',
    darkImage: extras.darkImage,
    icon: extras.icon,
    iconImageClassName: extras.iconImageClassName,
    navLabel: extras.navLabel,
  }
}

type Project = (typeof projects)[number]

function excerpt(text: string, maxLen = 155) {
  if (text.length <= maxLen) return text
  const cut = text.slice(0, maxLen)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 90 ? lastSpace : maxLen).trim()}…`
}

function SectionTitle({
  title,
  isFirst = false,
}: {
  title: string
  isFirst?: boolean
}) {
  const reduceMotion = useReducedMotion()

  return (
    <div className={isFirst ? 'pt-32 pb-10 md:pb-14' : 'border-t border-slate-200/80 pt-16 pb-10 dark:border-slate-800 md:pt-20 md:pb-14'}>
      <motion.h2
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.65, ease: sectionEase }}
        className="text-[clamp(4rem,18vw,9rem)] font-extralight lowercase leading-[0.88] tracking-tighter text-slate-900 dark:text-slate-100"
      >
        {title}
      </motion.h2>
    </div>
  )
}

function FullStackShowcase({
  project,
  index,
  onClick,
}: {
  project: Project
  index: number
  onClick: () => void
}) {
  const reduceMotion = useReducedMotion()
  const hasCaseStudy = project.name === 'Placecard' || project.name === 'FortuneVantage'

  return (
    <motion.button
      type="button"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: sectionEase }}
      onClick={onClick}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)] dark:border-slate-700/80 dark:bg-slate-950 dark:hover:border-[#ADD8E6]/30 dark:hover:shadow-black/40"
    >
      <div className="relative aspect-[4/3] min-h-[220px] overflow-hidden bg-slate-50 sm:min-h-[280px] lg:aspect-[16/10] lg:min-h-[320px] xl:min-h-[360px] dark:bg-slate-950">
        {project.image && (
          <Image
            src={project.image}
            alt={project.name}
            fill
            quality={95}
            sizes="(max-width: 640px) 100vw, 640px"
            className="object-contain object-top p-2 transition-transform duration-500 ease-out group-hover:scale-[1.02] sm:p-4"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-slate-950/30" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="space-y-2.5">
          <h3 className="text-[1.75rem] font-extralight lowercase leading-tight tracking-tight text-slate-900 transition-colors group-hover:text-primary dark:text-slate-100 dark:group-hover:text-[#ADD8E6] sm:text-3xl">
            {project.name}
          </h3>
          <p className="text-sm font-light leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            {project.tagline}
          </p>
          <p className="text-xs font-light tracking-wide text-slate-400 dark:text-slate-500 sm:text-sm">
            {project.skills.join(' · ')}
          </p>
        </div>

        <div className="mt-auto flex items-center gap-5 pt-2">
          {hasCaseStudy && (
            <Link
              href={`/case-studies?project=${project.name === 'Placecard' ? 'placecard' : 'fortune'}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-light text-slate-500 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-[#ADD8E6] sm:text-sm"
            >
              <BookOpen className="h-3.5 w-3.5" />
              case study
            </Link>
          )}
          <span className="inline-flex items-center gap-1.5 text-xs font-light text-slate-500 transition-colors group-hover:text-primary dark:text-[#ADD8E6] dark:group-hover:text-[#ADD8E6] sm:text-sm">
            details
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </motion.button>
  )
}

function MiscHeroCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: sectionEase }}
      onClick={onClick}
      className="group relative block w-full overflow-hidden rounded-2xl border border-slate-300 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)] dark:border-slate-700/80 dark:hover:border-[#ADD8E6]/30 dark:hover:shadow-lg"
    >
      <div className="relative aspect-[2/1] sm:aspect-[21/9]">
        {project.images && project.images.length > 0 ? (
          <div className="grid h-full grid-cols-2">
            {project.images.map((img, i) => (
              <div key={img} className="relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={img}
                  alt={`${project.name} ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 448px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
            ))}
          </div>
        ) : project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-5 pb-5 pt-16 sm:px-6 sm:pb-6">
          <div>
            <p className="mb-1 text-xs font-light lowercase text-white/50">hardware</p>
            <h3 className="text-2xl font-extralight lowercase tracking-tight text-white sm:text-3xl">
              {project.name}
            </h3>
          </div>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
        </div>
      </div>
    </motion.button>
  )
}

function MiscCompactCard({
  project,
  index,
  onClick,
}: {
  project: Project
  index: number
  onClick: () => void
}) {
  const reduceMotion = useReducedMotion()
  const label = project.category === 'GitHub' ? 'github' : project.category === 'Mini Game' ? 'mini game' : project.category.toLowerCase()

  return (
    <motion.button
      type="button"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: sectionEase }}
      onClick={onClick}
      className="group relative block w-full overflow-hidden rounded-2xl border border-slate-300 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)] dark:border-slate-700/80 dark:hover:border-[#ADD8E6]/30 dark:hover:shadow-lg"
    >
      <div className="relative aspect-[5/4] bg-slate-50 dark:bg-slate-950">
        {project.image && (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className={`transition-transform duration-700 group-hover:scale-[1.04] ${
              project.category === 'Mini Game' || project.category === 'GitHub'
                ? 'object-contain object-center p-6 sm:p-8'
                : 'object-cover'
            }`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-4 pb-4 pt-12 sm:px-5 sm:pb-5">
          <div className="min-w-0">
            <p className="mb-1 text-xs font-light lowercase text-white/50">{label}</p>
            <h3 className="truncate text-lg font-extralight lowercase tracking-tight text-white sm:text-xl">
              {project.name}
            </h3>
          </div>
          {(project.link || project.github) && (
            <ArrowUpRight className="h-4 w-4 shrink-0 text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
          )}
        </div>
      </div>
    </motion.button>
  )
}

function MiscSection({
  projects,
  onProjectClick,
}: {
  projects: Project[]
  onProjectClick: (project: Project) => void
}) {
  const hero = projects.find((p) => p.name === 'Racing Sim Hardware')
  const rest = projects.filter((p) => p.name !== 'Racing Sim Hardware')

  return (
    <div className="space-y-5">
      {hero && <MiscHeroCard project={hero} onClick={() => onProjectClick(hero)} />}
      {rest.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2">
          {rest.map((project, index) => (
            <MiscCompactCard
              key={project.name}
              project={project}
              index={index}
              onClick={() => onProjectClick(project)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectsPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedProjectName, setSelectedProjectName] = useState<string | null>(null)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [swipeStart, setSwipeStart] = useState<number | null>(null)
  const [swipeDistance, setSwipeDistance] = useState(0)
  const [showMaximizeModal, setShowMaximizeModal] = useState(false)
  const [maximizeModalPosition, setMaximizeModalPosition] = useState<{ top: number; left: number } | null>(null)
  const [isManuallyClosing, setIsManuallyClosing] = useState(false)

  const projectByName = (name: string) =>
    projects.find((project) => project.name.toLowerCase() === name.toLowerCase())

  const sectionsWithProjects = projectSections.map((section) => ({
    ...section,
    projects: section.names
      .map((name) => projectByName(name))
      .filter((project): project is Project => Boolean(project)),
  }))

  const selectedProject = selectedProjectName ? projectByName(selectedProjectName) : null

  const closeProjectPanel = () => {
    setIsManuallyClosing(true)
    setSelectedProjectName(null)
    if (searchParams?.get('project')) {
      router.push('/projects')
    }
    setTimeout(() => setIsManuallyClosing(false), 100)
  }

  const openProject = (project: Project) => {
    if (selectedProjectName === project.name) {
      closeProjectPanel()
      return
    }
    setSelectedProjectName(project.name)
    router.push(`/projects?project=${encodeURIComponent(project.name)}`)
  }

  const openLightbox = (image: string | string[], index: number = 0) => {
    if (Array.isArray(image)) {
      setLightboxImages(image)
      setLightboxImage(null)
      setLightboxIndex(index)
    } else {
      setLightboxImage(image)
      setLightboxImages(null)
    }
  }

  const closeLightbox = () => {
    setLightboxImage(null)
    setLightboxImages(null)
    setLightboxIndex(0)
  }

  const nextImage = () => {
    if (lightboxImages && lightboxIndex < lightboxImages.length - 1) {
      setLightboxIndex(lightboxIndex + 1)
    }
  }

  const prevImage = () => {
    if (lightboxImages && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1)
    }
  }

  // Swipe to close handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setSwipeStart(e.touches[0].clientX)
    setSwipeDistance(0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (swipeStart !== null) {
      const currentX = e.touches[0].clientX
      const distance = currentX - swipeStart
      // Only allow right swipe (positive distance)
      if (distance > 0) {
        setSwipeDistance(distance)
      }
    }
  }

  const handleTouchEnd = () => {
    // Swipe right more than 100px to close
    if (swipeDistance > 100) {
      if (selectedProjectName) {
        closeProjectPanel()
      } else if (lightboxImage || lightboxImages) {
        closeLightbox()
      }
    }
    setSwipeStart(null)
    setSwipeDistance(0)
  }

  // Escape key to close modals
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showMaximizeModal) {
          setShowMaximizeModal(false)
        } else if (lightboxImage || lightboxImages) {
          closeLightbox()
        } else if (selectedProjectName) {
          closeProjectPanel()
        }
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [lightboxImage, lightboxImages, selectedProjectName, showMaximizeModal])

  // Close maximize modal when clicking outside
  useEffect(() => {
    if (showMaximizeModal) {
      const handleClickOutside = () => {
        setShowMaximizeModal(false)
      }
      // Small delay to prevent immediate close
      const timer = setTimeout(() => {
        document.addEventListener('click', handleClickOutside)
      }, 100)
      return () => {
        clearTimeout(timer)
        document.removeEventListener('click', handleClickOutside)
      }
    }
  }, [showMaximizeModal])

  // Handle project query parameter from URL
  useEffect(() => {
    if (!searchParams || isManuallyClosing) return
    const projectName = searchParams.get('project')
    if (projectName && projectByName(projectName)) {
      setSelectedProjectName(projectByName(projectName)!.name)
    }
  }, [searchParams, isManuallyClosing])

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />
      <div className="pt-20 pb-16 md:pb-0">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          {sectionsWithProjects.map((section) => {
            if (section.projects.length === 0) return null

            if (section.id === 'web') {
              const showcaseSites = section.projects.map(toWebShowcaseSite).filter((site) => site.image)
              return (
                <section key={section.id} id="projects-web" className="scroll-mt-24 pb-20 md:pb-28">
                  <SectionTitle title={section.title} isFirst />
                  <div className="relative left-1/2 w-[min(100vw-3rem,72rem)] max-w-none -translate-x-1/2">
                    <WebProjectsShowcase
                      sites={showcaseSites}
                      onProjectClick={(name) => {
                        const project = section.projects.find((site) => site.name === name)
                        if (project) openProject(project)
                      }}
                    />
                  </div>
                </section>
              )
            }

            if (section.id === 'full-stack') {
              return (
                <section key={section.id} id="projects-full-stack" className="scroll-mt-24 pb-20 md:pb-28">
                  <SectionTitle title={section.title} />
                  <div className="relative left-1/2 w-[min(100vw-3rem,72rem)] max-w-none -translate-x-1/2">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                      {section.projects.map((project, index) => (
                        <FullStackShowcase
                          key={project.name}
                          project={project}
                          index={index}
                          onClick={() => openProject(project)}
                        />
                      ))}
                    </div>
                  </div>
                </section>
              )
            }

            return (
              <section key={section.id} id="projects-misc" className="scroll-mt-24 pb-24 md:pb-32">
                <SectionTitle title={section.title} />
                <div className="relative left-1/2 w-[min(100vw-3rem,72rem)] max-w-none -translate-x-1/2">
                  <MiscSection projects={section.projects} onProjectClick={openProject} />
                </div>
              </section>
            )
          })}
        </div>

          {selectedProject && (
                <div 
                  className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                  onClick={closeProjectPanel}
                >
                  <div 
                    className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white dark:bg-slate-900 shadow-2xl overflow-y-auto z-[110]"
                    onClick={(e) => e.stopPropagation()}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{
                      transform: swipeDistance > 0 ? `translateX(${Math.min(swipeDistance, 100)}px)` : 'translateX(0)',
                      transition: swipeStart === null ? 'transform 0.3s ease-out' : 'none'
                    }}
                  >
                    <div className="p-4 sm:p-8 relative">
                      {(() => {
                        const project = selectedProject
                        const hasImage = project.image
                        const hasImages = project.images && project.images.length > 0

                        return (
                          <>
                            {/* macOS-style traffic lights */}
                            <div className="relative mb-4 flex items-center gap-1.5">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  closeProjectPanel()
                                }}
                                className="z-[110] w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition-colors duration-200 touch-manipulation flex items-center justify-center group"
                                aria-label="Close"
                              >
                                <span className="w-1 h-1 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  closeProjectPanel()
                                }}
                                className="z-[110] w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ff9500] transition-colors duration-200 touch-manipulation flex items-center justify-center group"
                                aria-label="Minimize"
                              >
                                <span className="w-1 h-1 bg-[#740000] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  const rect = e.currentTarget.getBoundingClientRect()
                                  setMaximizeModalPosition({ top: rect.bottom + 8, left: rect.left })
                                  setShowMaximizeModal(true)
                                }}
                                className="z-[110] w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#20d046] transition-colors duration-200 touch-manipulation flex items-center justify-center group relative"
                                aria-label="Maximize"
                              >
                                <span className="w-1 h-1 bg-[#006500] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
                              </button>
                            </div>

                            {/* Image */}
                            {(hasImage || hasImages) && (
                              <div className="mb-6 sm:mb-8">
                                {hasImage && (
                                  <button
                                    onClick={() => openLightbox(project.image)}
                                    className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-950 block cursor-pointer mb-4"
                                  >
                                    <Image
                                      src={project.image}
                                      alt={project.name}
                                      fill
                                      sizes="(max-width: 640px) 100vw, 50vw"
                                      className={
                                        project.category === 'Web' || project.category === 'Full-Stack'
                                          ? 'object-contain object-top'
                                          : 'object-cover'
                                      }
                                    />
                                  </button>
                                )}
                                {hasImages && (
                                  <button
                                    onClick={() => openLightbox(project.images, 0)}
                                    className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-100 grid grid-cols-2 gap-0 block cursor-pointer mb-4"
                                  >
                                    {project.images.map((img, imgIndex) => (
                                      <div key={imgIndex} className="relative">
                                        <Image
                                          src={img}
                                          alt={`${project.name} ${imgIndex + 1}`}
                                          fill
                                          sizes="(max-width: 640px) 50vw, 25vw"
                                          className="object-cover"
                                        />
                                      </div>
                                    ))}
                                  </button>
                                )}
                              </div>
                            )}

                            {/* Content */}
                            <div>
                              <h2 className="mb-4 text-2xl font-extralight lowercase tracking-tight text-slate-900 dark:text-slate-100 sm:mb-6 sm:text-3xl">
                                {project.name}
                              </h2>
                              
                              <p className="mb-6 text-sm font-light leading-relaxed text-slate-700 dark:text-slate-300 sm:mb-8 sm:text-base">
                                {project.description}
                              </p>

                              <ul className="mb-6 space-y-1 border-l border-slate-200 pl-4 dark:border-slate-700 sm:mb-8">
                                {project.skills.map((skill) => (
                                  <li key={skill} className="text-sm font-light text-slate-600 dark:text-slate-400">
                                    {skill}
                                  </li>
                                ))}
                              </ul>

                              {/* Case Study Link for Placecard and FortuneVantage */}
                              {(project.name === 'Placecard' || project.name === 'FortuneVantage') && (
                                <div className="mb-3">
                                  <Link
                                    href={`/case-studies?project=${project.name === 'Placecard' ? 'placecard' : 'fortune'}`}
                                    className="inline-flex items-center gap-2 text-sm text-primary dark:text-[#ADD8E6] hover:text-primary-dark dark:hover:text-[#ADD8E6]/80 active:text-primary-dark dark:active:text-[#ADD8E6]/80 transition-colors duration-200 font-light"
                                  >
                                    <BookOpen className="w-4 h-4" />
                                    Read case study
                                  </Link>
                                </div>
                              )}

                              {/* Link */}
                              {project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm font-light text-primary transition-colors hover:text-primary-dark dark:text-[#ADD8E6] dark:hover:text-[#ADD8E6]/80"
                                >
                                  {project.github ? (
                                    <>
                                      <Github className="h-4 w-4" />
                                      github
                                    </>
                                  ) : (
                                    <>
                                      <ExternalLink className="h-4 w-4" />
                                      visit site
                                    </>
                                  )}
                                </a>
                              )}
                            </div>
                          </>
                        )
                      })()}
                    </div>
                  </div>
                </div>
              )}
      </div>

      {/* Lightbox Modal */}
      {(lightboxImage || lightboxImages) && (
        <div
          className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* macOS-style traffic lights */}
          <div className="fixed top-20 left-6 sm:absolute sm:top-6 sm:left-6 z-[120] flex items-center gap-1.5">
            <button
              onClick={closeLightbox}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition-colors duration-200 touch-manipulation flex items-center justify-center group"
              aria-label="Close"
            >
              <XIcon className="w-2 h-2 text-[#740000] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
            <button
              onClick={closeLightbox}
              className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ff9500] transition-colors duration-200 touch-manipulation flex items-center justify-center group"
              aria-label="Minimize"
            >
              <span className="w-1 h-1 bg-[#740000] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                const rect = e.currentTarget.getBoundingClientRect()
                setMaximizeModalPosition({ top: rect.bottom + 8, left: rect.left })
                setShowMaximizeModal(true)
              }}
              className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#20d046] transition-colors duration-200 touch-manipulation flex items-center justify-center group relative"
              aria-label="Maximize"
            >
              <span className="w-1 h-1 bg-[#006500] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
            </button>
          </div>
          
          {/* Maximize modal for lightbox */}
          {showMaximizeModal && maximizeModalPosition && (
            <div 
              className="fixed bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-4 min-w-[200px] z-[130]"
              style={{ top: `${maximizeModalPosition.top}px`, left: `${maximizeModalPosition.left}px` }}
              onClick={(e) => {
                e.stopPropagation()
                setShowMaximizeModal(false)
              }}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300 font-light">What is there to maximise?</p>
            </div>
          )}
          
          {lightboxImages && (
            <>
              {lightboxIndex > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-6 text-white hover:text-primary dark:hover:text-[#ADD8E6] transition-colors p-2"
                >
                  <ArrowUpRight className="w-6 h-6 rotate-90" />
                </button>
              )}
              {lightboxIndex < lightboxImages.length - 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-6 text-white hover:text-primary dark:hover:text-[#ADD8E6] transition-colors p-2"
                >
                  <ArrowUpRight className="w-6 h-6 -rotate-90" />
                </button>
              )}
              <div className="relative max-w-7xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
                <Image
                  src={lightboxImages[lightboxIndex]}
                  alt={`Image ${lightboxIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </>
          )}
          
          {lightboxImage && (
            <div className="relative max-w-7xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={lightboxImage}
                alt="Expanded view"
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          )}
        </div>
      )}

      {/* Maximize modal - appears below green button */}
      {showMaximizeModal && maximizeModalPosition && (
        <div 
          className="fixed bg-white/95 backdrop-blur-xl rounded-lg shadow-xl border border-slate-200 p-4 min-w-[200px] z-[130] animate-in fade-in slide-in-from-top-2 duration-200"
          style={{ top: `${maximizeModalPosition.top}px`, left: `${maximizeModalPosition.left}px` }}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-sm text-slate-700 font-light">What is there to maximise?</p>
        </div>
      )}
    </main>
  )
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white dark:bg-slate-900">
        <Navigation />
        <div className="pt-20 pb-16 md:pb-0">
          <section className="pt-32 pb-32">
            <div className="max-w-5xl mx-auto px-6 sm:px-8">
              <div className="text-center">
                <p className="text-slate-500 dark:text-slate-400 font-light">Loading...</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    }>
      <ProjectsPageContent />
    </Suspense>
  )
}
