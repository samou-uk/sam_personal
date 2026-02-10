'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Image from 'next/image'
import { ExternalLink, Github, Search, X, ArrowUpRight, X as XIcon } from 'lucide-react'

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
    image: '/fortuneVantage.png',
    featured: true,
  },
  {
    name: 'Stock Analysis Tool',
    tagline: 'Live trading data with technical & sentiment analysis',
    category: 'GitHub',
    description: 'Built a stock analysis tool with RSI, MACD, moving averages, sentiment analysis via TextBlob, regression models, and live Yahoo Finance integration.',
    skills: ['Python', 'TextBlob', 'Tkinter', 'Yahoo Finance'],
    link: 'https://github.com/samou-uk/stock-analysis-tool',
    github: true,
    image: '/stocktool.png',
  },
  {
    name: 'miniERP',
    tagline: 'Lightweight ERP for small business owners',
    category: 'Full-Stack',
    description: 'Production-ready mini ERP covering invoicing, inventory, banking, loans, analytics, and year-end close — designed for simplicity and clarity.',
    skills: ['Python', 'Flask', 'SQLite', 'JavaScript', 'Jinja2'],
    image: '/miniERP.png',
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
    name: 'Automated Food Labelling',
    tagline: 'Automates translations, compliance checks, and barcode creation',
    category: 'Production',
    description: 'Cut manual label creation time by 80%+. Auto-translates Chinese ingredients, validates E-numbers, flags allergens, and generates barcodes. Outputs print-ready PDFs. Deployed on AWS EC2 with Guacamole remote access.',
    skills: ['Python', 'AWS EC2', 'Apache Guacamole', 'Linux', 'HTML'],
    image: '/labelling.png',
    featured: true,
  },
  {
    name: 'Han\'s Reservation System',
    tagline: 'Secure, GDPR-compliant restaurant booking system',
    category: 'Full-Stack',
    description: 'Custom Flask + SQLite system with GDPR compliance, AES encryption, Argon2 hashing, SMTP alerts, dynamic table control, Excel exports, and Cron-driven reports. Used in live restaurant operations.',
    skills: ['Python', 'Flask', 'SQLite', 'Argon2', 'JavaScript'],
    image: '/hansweb.png',
  },
  {
    name: 'BaoClicker',
    tagline: 'Hidden clicker game with scores that persist',
    category: 'Mini Game',
    description: 'Hidden React mini-game embedded in Fortune Foods site. Features animated state transitions and persistent high scores via localStorage.',
    skills: ['React', 'JavaScript'],
    image: '/BaoClicker.png',
  },
  {
    name: 'Fortune Express',
    tagline: 'Pizzeria-style game reimagined for a Fortune Foods store',
    category: 'Mini Game',
    description: 'Interactive React mini-game inspired by classic pizzeria simulators, adapted to a Fortune Foods retail store setting. Features order fulfillment, animations, sound effects, and an instruction modal to boost engagement and brand personality.',
    skills: ['React', 'JavaScript'],
    image: '/fortuneexpress.png',
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
    name: 'fortunefoods.shop',
    tagline: 'Wholesale platform with smart search & UX',
    category: 'Web',
    description: 'Wholesale platform with Liquid-based access control, Algolia search, and custom JS middleware for collection remapping. Enhanced UX for trade customers.',
    skills: ['Shopify', 'Liquid', 'Algolia', 'JavaScript'],
    link: 'https://www.fortunefoods.shop',
    image: '/ffukshop;.png',
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
]

const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [swipeStart, setSwipeStart] = useState<number | null>(null)
  const [swipeDistance, setSwipeDistance] = useState(0)
  const [showMaximizeModal, setShowMaximizeModal] = useState(false)
  const [maximizeModalPosition, setMaximizeModalPosition] = useState<{ top: number; left: number } | null>(null)

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
      if (selectedProject !== null) {
        setSelectedProject(null)
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
        } else if (selectedProject !== null) {
          setSelectedProject(null)
        }
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [lightboxImage, lightboxImages, selectedProject, showMaximizeModal])

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

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />
      <div className="pt-20 pb-16 md:pb-0">
      <section className="pt-32 pb-32">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-7xl font-extralight text-slate-900 dark:text-slate-100 mb-6 tracking-tight">
              <span className="inline-block">What I've</span>{' '}
              <span className="inline-block text-primary dark:text-[#ADD8E6]">built</span>
            </h1>
            
            {/* Minimal Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 w-full sm:min-w-[200px] sm:max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search projects"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border-b border-slate-300 dark:border-slate-600 focus:border-primary dark:focus:border-[#ADD8E6] focus:outline-none text-slate-900 dark:text-slate-100 font-light placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors duration-200 bg-transparent text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="flex gap-1 overflow-x-auto pb-2 sm:pb-0 -mx-6 px-6 sm:mx-0 sm:px-0 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-light transition-colors duration-200 whitespace-nowrap flex-shrink-0 ${
                      selectedCategory === category
                        ? 'text-primary dark:text-[#ADD8E6] border-b-2 border-primary dark:border-[#ADD8E6]'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 active:text-slate-900 dark:active:text-slate-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-slate-500 font-light">No projects found.</p>
            </div>
          ) : (
            <>
              {/* Instagram-style Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 mb-12">
                {filteredProjects.map((project, index) => {
                  const hasImage = project.image
                  const hasImages = project.images && project.images.length > 0
                  const isSelected = selectedProject === index
                  
                  return (
                    <div
                      key={project.name}
                      className="group cursor-pointer"
                      onClick={() => setSelectedProject(isSelected ? null : index)}
                    >
                      <div className="relative aspect-square overflow-hidden bg-slate-100 rounded-lg sm:rounded-xl active:scale-95 transition-transform duration-200 mb-2">
                        {hasImage && (
                          <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            sizes="(max-width: 640px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        )}
                        {hasImages && (
                          <div className="grid grid-cols-2 h-full">
                            {project.images.map((img, imgIndex) => (
                              <div key={imgIndex} className="relative">
                                <Image
                                  src={img}
                                  alt={`${project.name} ${imgIndex + 1}`}
                                  fill
                                  sizes="(max-width: 640px) 25vw, 16.5vw"
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                      </div>
                      
                      {/* Title at bottom */}
                      <div className="text-center">
                        <p className="font-light text-xs sm:text-sm text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-primary dark:group-hover:text-[#ADD8E6] transition-colors duration-200">
                          {project.name}
                        </p>
                        <p className="font-light text-[10px] sm:text-xs text-slate-500 mt-0.5">
                          {project.category}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Selected Project Details - Slides in from side */}
              {selectedProject !== null && filteredProjects[selectedProject] && (
                <div 
                  className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
                  onClick={() => setSelectedProject(null)}
                >
                  <div 
                    className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white dark:bg-slate-900 shadow-2xl overflow-y-auto"
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
                      {/* Swipe indicator */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-slate-300 rounded-full md:hidden z-10" />

                      {(() => {
                        const project = filteredProjects[selectedProject]
                        const hasImage = project.image
                        const hasImages = project.images && project.images.length > 0

                        return (
                          <>
                            {/* macOS-style traffic lights */}
                            <div className="relative mb-4 flex items-center gap-1.5">
                              <button
                                onClick={() => setSelectedProject(null)}
                                className="z-[70] w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition-colors duration-200 touch-manipulation flex items-center justify-center group"
                                aria-label="Close"
                              >
                                <XIcon className="w-2 h-2 text-[#740000] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                              </button>
                              <button
                                onClick={() => setSelectedProject(null)}
                                className="z-[70] w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ff9500] transition-colors duration-200 touch-manipulation flex items-center justify-center group"
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
                                className="z-[70] w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#20d046] transition-colors duration-200 touch-manipulation flex items-center justify-center group relative"
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
                                    className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-100 block cursor-pointer mb-4"
                                  >
                                    <Image
                                      src={project.image}
                                      alt={project.name}
                                      fill
                                      sizes="(max-width: 640px) 100vw, 50vw"
                                      className="object-cover"
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
                              <div className="mb-3 sm:mb-4">
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-light uppercase tracking-wider">
                                  {project.category}
                                </span>
                              </div>
                              
                              <h2 className="text-2xl sm:text-4xl font-extralight text-slate-900 dark:text-slate-100 mb-3 sm:mb-4 tracking-tight">
                                {project.name}
                              </h2>
                              
                              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-light mb-4 sm:mb-6">
                                {project.tagline}
                              </p>
                              
                              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light mb-6 sm:mb-8 text-sm sm:text-base">
                                {project.description}
                              </p>

                              {/* Skills */}
                              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                                {project.skills.map((skill, skillIndex) => (
                                  <span
                                    key={skillIndex}
                                    className="text-xs text-slate-600 dark:text-slate-300 font-light"
                                  >
                                    {skill}
                                    {skillIndex < project.skills.length - 1 && <span className="mx-2 text-slate-400">·</span>}
                                  </span>
                                ))}
                              </div>

                              {/* Link */}
                              {project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm text-primary dark:text-[#ADD8E6] hover:text-primary-dark dark:hover:text-[#ADD8E6]/80 active:text-primary-dark dark:active:text-[#ADD8E6]/80 transition-colors duration-200 font-light"
                                >
                                  {project.github ? (
                                    <>
                                      <Github className="w-4 h-4" />
                                      View on GitHub
                                    </>
                                  ) : (
                                    <>
                                      <ExternalLink className="w-4 h-4" />
                                      Visit Site
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
            </>
          )}
        </div>
      </section>
      </div>

      {/* Lightbox Modal */}
      {(lightboxImage || lightboxImages) && (
        <div
          className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* macOS-style traffic lights */}
          <div className="fixed top-20 left-6 sm:absolute sm:top-6 sm:left-6 z-[80] flex items-center gap-1.5">
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
              className="fixed bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-4 min-w-[200px] z-[90]"
              style={{ top: `${maximizeModalPosition.top}px`, left: `${maximizeModalPosition.left}px` }}
              onClick={() => setShowMaximizeModal(false)}
            >
              <p className="text-sm text-slate-700 font-light">What is there to maximise?</p>
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
          className="fixed bg-white/95 backdrop-blur-xl rounded-lg shadow-xl border border-slate-200 p-4 min-w-[200px] z-[90] animate-in fade-in slide-in-from-top-2 duration-200"
          style={{ top: `${maximizeModalPosition.top}px`, left: `${maximizeModalPosition.left}px` }}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-sm text-slate-700 font-light">What is there to maximise?</p>
        </div>
      )}
    </main>
  )
}
