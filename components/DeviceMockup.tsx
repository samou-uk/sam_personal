'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, X as XIcon, Plus, Search, Wifi, Battery, SlidersHorizontal, Volume2, Sun, Target, Bluetooth, RotateCw, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const webProjects = [
  {
    name: 'samou.co.uk',
    displayName: 'Personal Website',
    tagline: 'My personal portfolio',
    image: '/samweblight.png',
    darkImage: '/samwebdark.png',
    mobileImage: '/samweblightmobile.png',
    mobileDarkImage: '/samwebdarkmobile.png',
    icon: '/sam.png',
    link: 'https://samou.co.uk',
    themeColor: '#ffffff',
    darkThemeColor: '#1E3A5F',
    statusBarMode: 'dark',
    darkStatusBarMode: 'light',
  },
  {
    name: 'the-placecard.vercel.app',
    displayName: 'Placecard',
    tagline: 'Private supper-club app for students',
    image: '/placecard.png',
    mobileImage: '/placecardmobile.png',
    icon: '/placecardlogodark.png',
    darkIcon: '/placecardlogo.png',
    link: 'https://the-placecard.vercel.app',
    caseStudyLink: '/case-studies?project=placecard',
    themeColor: '#000000',
    darkThemeColor: '#000000',
    statusBarMode: 'light',
    darkStatusBarMode: 'light',
  },
  {
    name: 'fortunefoods.co.uk',
    displayName: 'Fortune Foods',
    tagline: 'Responsive B2B site for a UK-based food wholesaler',
    image: '/fortunefoodsweb.png',
    mobileImage: '/ffukmobile.png',
    icon: '/ffuk.jpg',
    link: 'https://www.fortunefoods.co.uk',
    keepWhiteBg: true,
    themeColor: '#1B4332',
    darkThemeColor: '#1B4332',
    statusBarMode: 'light',
    darkStatusBarMode: 'light',
  },
  {
    name: 'cmartshop.co.uk',
    displayName: 'Cmart',
    tagline: 'A revamped website for an oriental retail store',
    image: '/cmartweb.png',
    mobileImage: '/cmartmobile.png',
    icon: '/cmartlogo.png',
    link: 'https://www.cmartshop.co.uk',
    keepWhiteBg: true,
    themeColor: '#ffffff',
    darkThemeColor: '#ffffff',
    statusBarMode: 'dark',
    darkStatusBarMode: 'dark',
  },
  {
    name: 'hansbuffetbasingstoke.co.uk',
    displayName: 'Hans',
    tagline: 'Restaurant site with a custom reservation system',
    image: '/hansweb2.png',
    mobileImage: '/hansmobile.png',
    icon: '/hans.png',
    link: 'https://www.hansbuffetbasingstoke.co.uk',
    themeColor: '#E8DCC6',
    darkThemeColor: '#E8DCC6',
    statusBarMode: 'dark',
    darkStatusBarMode: 'dark',
  },
  {
    name: 'taste5.co.uk',
    displayName: 'Taste5',
    tagline: 'A fresh and modern website for a newly-opened bakery/store',
    image: '/taste5web.png',
    mobileImage: '/taste5mobile.png',
    icon: '/taste5logo.png',
    link: 'https://www.taste5.co.uk',
    keepWhiteBg: true,
    themeColor: '#A0826D',
    darkThemeColor: '#A0826D',
    statusBarMode: 'light',
    darkStatusBarMode: 'light',
  },
]

export default function DeviceMockup() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [openTabs, setOpenTabs] = useState<number[]>([0, 1, 2, 3, 4, 5])
  const [windowState, setWindowState] = useState<'normal' | 'maximized' | 'minimized' | 'closed'>('normal')
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false)
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false)
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false)
  const [brightness, setBrightness] = useState(80)
  const [volume, setVolume] = useState(50)
  const [isWifiOn, setIsWifiOn] = useState(true)
  const [isBluetoothOn, setIsBluetoothOn] = useState(true)
  const [isFocusOn, setIsFocusOn] = useState(false)
  const [isReloading, setIsReloading] = useState(false)
  const [tabHistory, setTabHistory] = useState<number[]>([0])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [spotlightQuery, setSpotlightQuery] = useState('')
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null)
  const [isMobileHomepageOpen, setIsMobileHomepageOpen] = useState(true)
  const [isMobileTabSwitcherOpen, setIsMobileTabSwitcherOpen] = useState(false)
  const [swipeStart, setSwipeStart] = useState<{ x: number; y: number } | null>(null)
  const [swipeDistance, setSwipeDistance] = useState(0)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const desktopRef = useRef<HTMLDivElement>(null)

  const currentProject = currentIndex >= 0 ? webProjects[currentIndex] : null

  const filteredProjects = webProjects.filter(p => 
    p.name.toLowerCase().includes(spotlightQuery.toLowerCase()) || 
    p.tagline.toLowerCase().includes(spotlightQuery.toLowerCase())
  )

  useEffect(() => {
    setCurrentTime(new Date())
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Detect if device has touch capability
    const detectTouchDevice = () => {
      // Check for touch support
      const hasTouch = 'ontouchstart' in window || (typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 0)
      // Check if it's a mobile device (phone/tablet)
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      // Consider it a touch device if it's a mobile device OR has touch capability in mobile viewport
      // This ensures phones/tablets show swipe, while desktop (even with touch) shows buttons
      setIsTouchDevice(isMobileDevice || (hasTouch && window.innerWidth < 768))
    }
    
    // Initial detection
    detectTouchDevice()
    
    // Update on resize
    window.addEventListener('resize', detectTouchDevice)
    
    return () => {
      window.removeEventListener('resize', detectTouchDevice)
    }
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { weekday: 'short', hour: 'numeric', minute: '2-digit', hour12: true }).replace(/,/g, '')
  }

  const formatMobileTime = (date: Date | null) => {
    if (!date) return '9:41'
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false })
  }

  const updateHistory = (index: number) => {
    const newHistory = tabHistory.slice(0, historyIndex + 1)
    newHistory.push(index)
    setTabHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const handleDockClick = (index: number) => {
    const wasClosed = windowState === 'closed'
    if (windowState === 'closed' || windowState === 'minimized') {
      setWindowState('normal')
    }
    // When relaunching from closed state, only open the clicked tab
    if (wasClosed) {
      setOpenTabs([index])
    } else if (!openTabs.includes(index)) {
      setOpenTabs([...openTabs, index])
    }
    if (currentIndex !== index) {
      updateHistory(index)
    }
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const handleTabClick = (index: number) => {
    if (currentIndex !== index) {
      updateHistory(index)
    }
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setCurrentIndex(tabHistory[newIndex])
      setIsAutoPlaying(false)
    }
  }

  const goForward = () => {
    if (historyIndex < tabHistory.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setCurrentIndex(tabHistory[newIndex])
      setIsAutoPlaying(false)
    }
  }

  const handleReload = () => {
    setIsReloading(true)
    setTimeout(() => setIsReloading(false), 800) // fake reload time
  }

  const closeTab = (tabIndex: number) => {
    const newTabs = openTabs.filter(i => i !== tabIndex)
    setOpenTabs(newTabs)
    
    if (tabIndex === currentIndex) {
      if (newTabs.length > 0) {
        setCurrentIndex(newTabs[newTabs.length - 1])
      }
    }
    
    if (newTabs.length === 0) {
      setWindowState('closed')
    }
  }

  const nextProject = () => {
    const startIndex = currentIndex < 0 ? 0 : currentIndex
    const newIndex = (startIndex + 1) % webProjects.length
    if (!openTabs.includes(newIndex)) {
      setOpenTabs([...openTabs, newIndex])
    }
    setCurrentIndex(newIndex)
    setIsAutoPlaying(false)
  }

  const prevProject = () => {
    const startIndex = currentIndex < 0 ? 0 : currentIndex
    const newIndex = (startIndex - 1 + webProjects.length) % webProjects.length
    if (!openTabs.includes(newIndex)) {
      setOpenTabs([...openTabs, newIndex])
    }
    setCurrentIndex(newIndex)
    setIsAutoPlaying(false)
  }

  const handleMobilePrevProject = () => {
    setIsMobileTabSwitcherOpen(false)
    setIsMobileHomepageOpen(false)
    prevProject()
  }

  const handleMobileNextProject = () => {
    setIsMobileTabSwitcherOpen(false)
    setIsMobileHomepageOpen(false)
    nextProject()
  }

  const handleSwipeStart = (e: React.TouchEvent) => {
    if (isMobileTabSwitcherOpen) return
    const touch = e.touches[0]
    setSwipeStart({ x: touch.clientX, y: touch.clientY })
    setSwipeDistance(0)
  }

  const handleSwipeMove = (e: React.TouchEvent) => {
    if (!swipeStart || isMobileTabSwitcherOpen) return
    const touch = e.touches[0]
    const deltaX = touch.clientX - swipeStart.x
    const deltaY = Math.abs(touch.clientY - swipeStart.y)
    
    // Only track horizontal swipes (more horizontal than vertical)
    if (Math.abs(deltaX) > deltaY) {
      setSwipeDistance(deltaX)
    }
  }

  const handleSwipeEnd = () => {
    if (!swipeStart || isMobileTabSwitcherOpen) {
      setSwipeStart(null)
      setSwipeDistance(0)
      return
    }
    
    const threshold = 50 // Minimum swipe distance to trigger navigation
    
    if (swipeDistance > threshold) {
      // Swipe right - previous project
      setIsMobileTabSwitcherOpen(false)
      setIsMobileHomepageOpen(false)
      prevProject()
    } else if (swipeDistance < -threshold) {
      // Swipe left - next project
      setIsMobileTabSwitcherOpen(false)
      setIsMobileHomepageOpen(false)
      nextProject()
    }
    
    setSwipeStart(null)
    setSwipeDistance(0)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || windowState !== 'normal') return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % webProjects.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, windowState])

  return (
    <div className="w-full py-4 md:py-6">
      {/* Mobile: iPhone Mockup with Safari */}
      <div className="md:hidden flex flex-col items-center">
        <div className="flex items-center gap-4">
          <div className="relative w-[300px] h-[580px]">
          {/* Outer Shadow */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 to-slate-900/40 rounded-[3.5rem] blur-2xl"></div>
          
          {/* iPhone Frame */}
          <div className="relative w-full h-full bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 rounded-[3.5rem] p-[6px] shadow-[0_0_0_1px_rgba(0,0,0,0.3),0_20px_60px_rgba(0,0,0,0.5)]">
            {/* Notch Area */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-slate-900 dark:bg-slate-800 rounded-b-[18px] z-40 shadow-[0_2px_4px_rgba(0,0,0,0.5)]"></div>
            
            {/* Screen */}
            <div className="relative w-full h-full bg-black rounded-[3rem] overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
              {/* Status Bar - Light Mode */}
              <div 
                className="absolute top-0 left-0 right-0 h-[44px] z-30 flex dark:hidden items-center justify-between px-6 pt-[6px] text-[11px] font-semibold transition-colors duration-300"
                style={{
                  backgroundColor: isMobileHomepageOpen ? 'transparent' : (currentProject?.themeColor || '#ffffff'),
                  color: isMobileHomepageOpen ? '#000000' : (currentProject?.statusBarMode === 'light' ? '#ffffff' : '#000000')
                }}
              >
                <span>{formatMobileTime(currentTime)}</span>
                <div className="flex items-center gap-[3px]">
                  {/* Signal bars */}
                  <div className="flex items-end gap-[1.5px]">
                    <div className="w-[3px] h-[4px] bg-current rounded-t-[1px]"></div>
                    <div className="w-[3px] h-[5px] bg-current rounded-t-[1px]"></div>
                    <div className="w-[3px] h-[6px] bg-current rounded-t-[1px]"></div>
                    <div className="w-[3px] h-[7px] bg-current rounded-t-[1px]"></div>
                  </div>
                  {/* Battery */}
                  <div className="w-[24px] h-[12px] border-[1.5px] border-current rounded-[2.5px] ml-[4px] relative">
                    <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-[1px] h-[6px] bg-current rounded-r-[1px]"></div>
                    <div className="absolute inset-[2px] bg-current rounded-[1px]"></div>
                  </div>
                </div>
              </div>

              {/* Status Bar - Dark Mode */}
              <div 
                className="absolute top-0 left-0 right-0 h-[44px] z-30 hidden dark:flex items-center justify-between px-6 pt-[6px] text-[11px] font-semibold transition-colors duration-300"
                style={{
                  backgroundColor: isMobileHomepageOpen ? 'transparent' : (currentProject?.darkThemeColor || currentProject?.themeColor || '#000000'),
                  color: isMobileHomepageOpen ? '#ffffff' : (currentProject?.darkStatusBarMode === 'light' ? '#ffffff' : '#000000')
                }}
              >
                <span>{formatMobileTime(currentTime)}</span>
                <div className="flex items-center gap-[3px]">
                  {/* Signal bars */}
                  <div className="flex items-end gap-[1.5px]">
                    <div className="w-[3px] h-[4px] bg-current rounded-t-[1px]"></div>
                    <div className="w-[3px] h-[5px] bg-current rounded-t-[1px]"></div>
                    <div className="w-[3px] h-[6px] bg-current rounded-t-[1px]"></div>
                    <div className="w-[3px] h-[7px] bg-current rounded-t-[1px]"></div>
                  </div>
                  {/* Battery */}
                  <div className="w-[24px] h-[12px] border-[1.5px] border-current rounded-[2.5px] ml-[4px] relative">
                    <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-[1px] h-[6px] bg-current rounded-r-[1px]"></div>
                    <div className="absolute inset-[2px] bg-current rounded-[1px]"></div>
                  </div>
                </div>
              </div>
              
              {/* Safari Browser UI */}
              <div className="absolute inset-0 pt-[44px] pb-[50px] flex flex-col bg-white dark:bg-[#000000]">
                {/* Content Area */}
                <div 
                  className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-black/30 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 dark:[&::-webkit-scrollbar-thumb]:hover:bg-white/30"
                  onTouchStart={handleSwipeStart}
                  onTouchMove={handleSwipeMove}
                  onTouchEnd={handleSwipeEnd}
                >
                  {isMobileHomepageOpen ? (
                    /* Safari Homepage with Favorites - iOS Style */
                    <div className="min-h-full bg-white dark:bg-[#000000] pt-12 pb-4 relative">
                      <div className="px-5 relative z-10">
                        {/* Favorites Section */}
                        <div className="mb-8">
                          <h2 className="text-[13px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 px-1">Favorites</h2>
                          <div className="grid grid-cols-4 gap-6 relative z-30">
                            {webProjects.map((project, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  setCurrentIndex(index)
                                  setIsAutoPlaying(false)
                                  setIsMobileHomepageOpen(false)
                                }}
                                onTouchEnd={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  setCurrentIndex(index)
                                  setIsAutoPlaying(false)
                                  setIsMobileHomepageOpen(false)
                                }}
                                className="flex flex-col items-center gap-2.5 group active:opacity-70 transition-opacity relative z-30"
                                style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                              >
                                <div className={`w-16 h-16 rounded-2xl bg-white ${project.keepWhiteBg ? '' : 'dark:bg-[#1C1C1E]'} shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] flex items-center justify-center ${project.name === 'hansbuffetbasingstoke.co.uk' ? 'p-4' : 'p-3'} group-active:scale-95 transition-transform pointer-events-none`}>
                                  {project.darkIcon ? (
                                    <>
                                      <Image
                                        src={project.icon}
                                        alt={project.name}
                                        width={44}
                                        height={44}
                                        className={`object-contain dark:hidden ${project.name === 'hansbuffetbasingstoke.co.uk' ? 'rounded-sm' : 'rounded-xl'} pointer-events-none`}
                                      />
                                      <Image
                                        src={project.darkIcon}
                                        alt={project.name}
                                        width={44}
                                        height={44}
                                        className={`object-contain hidden dark:block ${project.name === 'hansbuffetbasingstoke.co.uk' ? 'rounded-sm' : 'rounded-xl'} pointer-events-none`}
                                      />
                                    </>
                                  ) : (
                                    <Image
                                      src={project.icon}
                                      alt={project.name}
                                      width={44}
                                      height={44}
                                      className={`object-contain ${project.name === 'hansbuffetbasingstoke.co.uk' ? 'rounded-sm' : 'rounded-xl'} pointer-events-none`}
                                    />
                                  )}
                                </div>
                                <span className="text-[11px] text-gray-900 dark:text-gray-100 text-center leading-tight px-0.5 font-medium max-w-[60px] line-clamp-2 pointer-events-none">
                                  {project.displayName || project.name.split('.')[0]}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Swipe Prompt - Only show on touch devices */}
                        {isTouchDevice && (
                          <div className="mt-8 text-center">
                            <p className="text-[13px] text-gray-400 dark:text-gray-500 font-normal flex items-center justify-center gap-2">
                              <ChevronLeft className="w-4 h-4" />
                              Swipe to browse projects
                              <ChevronRight className="w-4 h-4" />
                            </p>
                          </div>
                        )}
                        
                      </div>
                    </div>
                  ) : (
                    /* Website Content */
                    <div className="relative w-full bg-white dark:bg-black block">
                      {currentProject && (currentProject.mobileDarkImage || currentProject.darkImage) ? (
                        <>
                          <div className="relative w-full block rounded-sm">
                            <Image
                              src={currentProject.mobileImage || currentProject.image}
                              alt={currentProject.name}
                              width={300}
                              height={2000}
                              sizes="300px"
                              className="w-full h-auto block object-top dark:hidden"
                            />
                          </div>
                          <div className="relative w-full hidden dark:block rounded-sm">
                            <Image
                              src={currentProject.mobileDarkImage || currentProject.darkImage || currentProject.mobileImage || currentProject.image}
                              alt={currentProject.name}
                              width={300}
                              height={2000}
                              sizes="300px"
                              className="w-full h-auto block object-top"
                            />
                          </div>
                        </>
                      ) : currentProject ? (
                        <div className="relative w-full block rounded-sm">
                          <Image
                            src={currentProject.mobileImage || currentProject.image}
                            alt={currentProject.name}
                            width={300}
                            height={2000}
                            sizes="300px"
                            className="w-full h-auto block object-top"
                          />
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
                
                {/* Tab Switcher Overlay */}
                <AnimatePresence>
                  {isMobileTabSwitcherOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: '100%' }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: '100%' }}
                      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                      className="absolute inset-0 bg-white dark:bg-[#000000] z-50 pt-[44px] pb-[50px] flex flex-col"
                    >
                      <div className="flex-1 overflow-y-auto p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <h2 className="text-[17px] font-semibold text-gray-900 dark:text-white">Tabs</h2>
                          <button
                            onClick={() => setIsMobileTabSwitcherOpen(false)}
                            className="text-blue-500 text-[17px] font-medium"
                          >
                            Done
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {webProjects.map((project, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setCurrentIndex(index)
                                setIsMobileHomepageOpen(false)
                                setIsMobileTabSwitcherOpen(false)
                                setIsAutoPlaying(false)
                              }}
                              className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white dark:bg-[#1C1C1E] shadow-lg active:scale-95 transition-transform"
                            >
                              {project.mobileDarkImage || project.darkImage ? (
                                <>
                                  <Image
                                    src={project.mobileImage || project.image}
                                    alt={project.name}
                                    fill
                                    className="object-cover dark:hidden"
                                  />
                                  <Image
                                    src={project.mobileDarkImage || project.darkImage || project.mobileImage || project.image}
                                    alt={project.name}
                                    fill
                                    className="object-cover hidden dark:block"
                                  />
                                </>
                              ) : (
                                <Image
                                  src={project.mobileImage || project.image}
                                  alt={project.name}
                                  fill
                    className="object-cover"
                  />
                              )}
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                                <div className="flex items-center gap-2">
                                  <Image
                                    src={project.darkIcon || project.icon}
                                    alt=""
                                    width={16}
                                    height={16}
                                    className="rounded-sm"
                                  />
                                  <span className="text-white text-xs font-medium truncate">{project.displayName || project.name}</span>
                                </div>
                              </div>
                              {index === currentIndex && (
                                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-white dark:border-black"></div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Bottom Bar - iOS Safari Style with Address Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[50px] bg-white dark:bg-[#000000] border-t border-gray-200/50 dark:border-gray-800/50 flex items-center px-2 gap-2 pb-2 z-40">
                  {/* Home Button */}
                  <button 
                    onClick={() => {
                      setIsMobileHomepageOpen(true)
                      setIsMobileTabSwitcherOpen(false)
                    }}
                    className={`w-10 h-10 flex-shrink-0 flex items-center justify-center active:bg-gray-100 dark:active:bg-gray-900/50 rounded-full transition-colors ${isMobileHomepageOpen ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'}`}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                  </button>
                  
                  {/* Address Bar - iOS Safari Style */}
                  <button
                    onClick={() => {
                      setIsMobileHomepageOpen(!isMobileHomepageOpen)
                      setIsMobileTabSwitcherOpen(false)
                    }}
                    className="flex-1 min-w-0 h-[36px] bg-[#F5F5F7] dark:bg-[#1C1C1E] rounded-[18px] px-4 flex items-center justify-between active:bg-[#E5E5EA] dark:active:bg-[#2C2C2E] transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {isMobileHomepageOpen ? (
                        <>
                          <svg className="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-[15px] text-gray-500 dark:text-gray-400 font-normal truncate">Start Page</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-[15px] text-gray-900 dark:text-gray-100 font-normal truncate">
                            {currentProject?.link.replace(/^https?:\/\/(www\.)?/, '') || 'Start Page'}
                          </span>
                        </>
                      )}
                    </div>
                  </button>
                  
                  {/* Tabs Button - iOS Safari Style */}
                  <button 
                    onClick={() => setIsMobileTabSwitcherOpen(!isMobileTabSwitcherOpen)}
                    className="w-10 h-10 flex-shrink-0 flex items-center justify-center active:bg-gray-100 dark:active:bg-gray-900/50 rounded-full transition-colors relative"
                  >
                    <svg className="w-6 h-6 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-black text-[10px] text-white flex items-center justify-center font-semibold">
                      {webProjects.length}
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Home Indicator */}
              <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/30 rounded-full z-30"></div>
            </div>
            
            {/* Side Buttons */}
            <div className="absolute left-0 top-[120px] w-[3px] h-[32px] bg-slate-800 rounded-r-sm"></div>
            <div className="absolute right-0 top-[180px] w-[3px] h-[60px] bg-slate-800 rounded-l-sm"></div>
            <div className="absolute right-0 top-[260px] w-[3px] h-[60px] bg-slate-800 rounded-l-sm"></div>
          </div>
        </div>
        
        {/* Navigation Buttons - Right Side (Stacked) - Only show on desktop */}
        {!isTouchDevice && (
          <div className="flex flex-col gap-3">
            <button
              onClick={handleMobilePrevProject}
              className="w-10 h-10 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 active:scale-95 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="Previous project"
            >
              <ChevronUp className="w-5 h-5 text-slate-700 dark:text-slate-300" strokeWidth={2} />
            </button>
            <button
              onClick={handleMobileNextProject}
              className="w-10 h-10 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 active:scale-95 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="Next project"
            >
              <ChevronDown className="w-5 h-5 text-slate-700 dark:text-slate-300" strokeWidth={2} />
            </button>
          </div>
        )}
        </div>

        {/* Mobile Project Details & CTAs */}
        {!isMobileHomepageOpen && currentProject && (
          <div className="mt-6 w-full px-4">
            {/* Project Title & Description */}
            <div className="mb-6 text-center">
              <h3 className="text-xl font-light text-slate-900 dark:text-slate-100 mb-2">
                <a href={currentProject.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary dark:hover:text-[#ADD8E6] transition-colors">
                  {currentProject.name}
                </a>
              </h3>
              <p className="text-slate-600 dark:text-slate-400 font-light text-sm">
                {currentProject.tagline}
              </p>
            </div>


            {/* Mobile CTAs */}
            <div className="flex flex-col items-center gap-3">
          <a
            href={currentProject.link}
            target="_blank"
            rel="noopener noreferrer"
                className="w-full max-w-xs px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium text-center hover:bg-slate-800 dark:hover:bg-gray-100 transition-colors shadow-sm block"
              >
                Go to Website
              </a>
              {currentProject.caseStudyLink && (
                <Link
                  href={currentProject.caseStudyLink}
                  className="w-full max-w-xs px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg font-medium text-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm block relative z-10"
                >
                  Go to Case Study
                </Link>
              )}
            </div>
        </div>
        )}
      </div>

      {/* macOS Desktop & Safari Mockup – Desktop & Tablet */}
      <div className="hidden md:flex flex-col max-w-6xl mx-auto mt-12">
        {/* macOS Desktop Environment */}
        <div 
          ref={desktopRef} 
          className="relative w-full aspect-[16/10] lg:aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.3)] flex flex-col justify-center items-center group perspective-[1000px]"
          style={{
            backgroundImage: 'url(/bgphoto.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          onClick={() => {
            setContextMenu(null)
            setIsControlCenterOpen(false)
            setIsSpotlightOpen(false)
            setIsTimeDropdownOpen(false)
          }}
          onContextMenu={(e) => {
            e.preventDefault()
            if (desktopRef.current) {
              const rect = desktopRef.current.getBoundingClientRect()
              setContextMenu({ 
                x: e.clientX - rect.left, 
                y: e.clientY - rect.top 
              })
            }
          }}
        >
          
          {/* Top Menu Bar (macOS) */}
          <div className={`absolute top-0 left-0 right-0 h-7 bg-white/20 dark:bg-black/20 backdrop-blur-md flex items-center px-3 justify-between z-30 border-b border-white/10 shadow-sm pointer-events-none transition-transform duration-300 ${windowState === 'maximized' ? '-translate-y-full' : 'translate-y-0'}`}>
            <div className="flex items-center gap-1 text-[13px] font-medium text-white drop-shadow-md">
              <span className="cursor-pointer pointer-events-auto px-2 py-0.5 rounded hover:bg-white/20 dark:hover:bg-black/30 transition-colors flex items-center justify-center">
                <Image src="/sam.png" alt="Sam" width={14} height={14} className="rounded-full object-cover w-[14px] h-[14px]" />
              </span>
              <span className="font-bold cursor-pointer pointer-events-auto px-2 py-0.5 rounded hover:bg-white/20 dark:hover:bg-black/30 transition-colors">Safari</span>
              <span className="hidden lg:block cursor-pointer pointer-events-auto px-2 py-0.5 rounded hover:bg-white/20 dark:hover:bg-black/30 transition-colors">File</span>
              <span className="hidden lg:block cursor-pointer pointer-events-auto px-2 py-0.5 rounded hover:bg-white/20 dark:hover:bg-black/30 transition-colors">Edit</span>
              <span className="hidden lg:block cursor-pointer pointer-events-auto px-2 py-0.5 rounded hover:bg-white/20 dark:hover:bg-black/30 transition-colors">View</span>
              <span className="cursor-pointer pointer-events-auto px-2 py-0.5 rounded hover:bg-white/20 dark:hover:bg-black/30 transition-colors">History</span>
              <span className="cursor-pointer pointer-events-auto px-2 py-0.5 rounded hover:bg-white/20 dark:hover:bg-black/30 transition-colors">Bookmarks</span>
              <span className="cursor-pointer pointer-events-auto px-2 py-0.5 rounded hover:bg-white/20 dark:hover:bg-black/30 transition-colors">Window</span>
              <span className="cursor-pointer pointer-events-auto px-2 py-0.5 rounded hover:bg-white/20 dark:hover:bg-black/30 transition-colors">Help</span>
            </div>
            <div className="flex items-center gap-3 text-[13px] font-medium text-white drop-shadow-md">
              <span className="cursor-pointer pointer-events-auto px-1 py-0.5 rounded hover:bg-white/20 dark:hover:bg-black/30 transition-colors">
                <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="7" width="16" height="10" rx="2" ry="2" fill="currentColor" opacity="0.2"/>
                  <rect x="4" y="9" width="12" height="6" rx="1" ry="1" fill="currentColor"/>
                  <rect x="18" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
                </svg>
              </span>
              <span className={`cursor-pointer pointer-events-auto px-1 py-0.5 rounded hover:bg-white/20 dark:hover:bg-black/30 transition-colors ${!isWifiOn ? 'opacity-40' : ''}`}>
                <Wifi className="w-[14px] h-[14px]" />
              </span>
              <span className={`cursor-pointer pointer-events-auto px-1 py-0.5 rounded hover:bg-white/20 dark:hover:bg-black/30 transition-colors ${!isBluetoothOn ? 'opacity-40' : ''}`}>
                <Bluetooth className="w-[14px] h-[14px]" />
              </span>
              <span onClick={(e) => {
                e.stopPropagation()
                setIsSpotlightOpen(!isSpotlightOpen)
              }} className="cursor-pointer pointer-events-auto px-1 py-0.5 rounded hover:bg-white/20 dark:hover:bg-black/30 transition-colors"><Search className="w-[14px] h-[14px]" /></span>
              <span onClick={(e) => {
                e.stopPropagation()
                setIsControlCenterOpen(!isControlCenterOpen)
                setIsTimeDropdownOpen(false)
              }} className="cursor-pointer pointer-events-auto px-1 py-0.5 rounded hover:bg-white/20 dark:hover:bg-black/30 transition-colors"><SlidersHorizontal className="w-[14px] h-[14px]" /></span>
              <span 
                onClick={(e) => {
                  e.stopPropagation()
                  setIsTimeDropdownOpen(!isTimeDropdownOpen)
                  setIsControlCenterOpen(false)
                }} 
                className="cursor-pointer pointer-events-auto px-2 py-0.5 rounded hover:bg-white/20 dark:hover:bg-black/30 transition-colors"
              >
                {currentTime ? formatTime(currentTime) : 'Mon 9:41 AM'}
              </span>
            </div>
          </div>

          {/* Spotlight Search Overlay */}
          <AnimatePresence>
            {isSpotlightOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, x: "-50%", scale: 0.95 }}
                animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                exit={{ opacity: 0, y: -20, x: "-50%", scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-[20%] left-1/2 w-[90%] max-w-xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/50 dark:border-white/10 z-40 overflow-hidden flex flex-col"
              >
                <div className="flex items-center px-4 h-14 border-b border-black/5 dark:border-white/10 shrink-0">
                  <Search className="w-6 h-6 text-slate-500 dark:text-slate-400 mr-3 shrink-0" />
                  <input
                    type="text"
                    placeholder="Spotlight Search"
                    className="flex-1 bg-transparent border-none outline-none text-2xl font-light text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    autoFocus
                    value={spotlightQuery}
                    onChange={(e) => setSpotlightQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setIsSpotlightOpen(false)
                        setSpotlightQuery('')
                      }
                      if (e.key === 'Enter' && filteredProjects.length > 0) {
                        const index = webProjects.findIndex(p => p.name === filteredProjects[0].name)
                        if (index !== -1) {
                          handleDockClick(index)
                          setIsSpotlightOpen(false)
                          setSpotlightQuery('')
                        }
                      }
                    }}
                  />
              </div>
              
                {/* Search Results */}
                {spotlightQuery && (
                  <div className="max-h-64 overflow-y-auto p-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-black/30 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 dark:[&::-webkit-scrollbar-thumb]:hover:bg-white/30">
                    {filteredProjects.length > 0 ? (
                      filteredProjects.map((project, idx) => (
                        <div 
                          key={idx}
                          onClick={() => {
                            const originalIndex = webProjects.findIndex(p => p.name === project.name)
                            if (originalIndex !== -1) {
                              handleDockClick(originalIndex)
                              setIsSpotlightOpen(false)
                              setSpotlightQuery('')
                            }
                          }}
                          className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-colors ${idx === 0 ? 'bg-primary/10 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                        >
                          <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white shrink-0">
                            {/* @ts-ignore */}
                            <Image src={project.icon} alt="" fill className="object-contain p-1" />
                          </div>
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-medium text-slate-900 dark:text-white truncate">{project.name}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{project.tagline}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-slate-500">No results found</div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Control Center Overlay */}
          <AnimatePresence>
            {isControlCenterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-9 right-2 w-72 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/30 dark:border-white/10 z-40 p-4 flex flex-col gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Network & Connections */}
                <div className="flex gap-3">
                  <div className="flex-1 bg-black/5 dark:bg-white/5 rounded-xl p-3 flex flex-col gap-3">
                    <div 
                      onClick={() => setIsWifiOn(!isWifiOn)}
                      className="flex items-center gap-3 cursor-pointer group transition-opacity hover:opacity-80"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm transition-all ${isWifiOn ? 'bg-blue-500' : 'bg-slate-400'}`}>
                        <Wifi className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-800 dark:text-white">Wi-Fi</span>
                        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{isWifiOn ? 'Home Network' : 'Off'}</span>
                      </div>
                    </div>
                    <div 
                      onClick={() => setIsBluetoothOn(!isBluetoothOn)}
                      className="flex items-center gap-3 cursor-pointer group transition-opacity hover:opacity-80"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm transition-all ${isBluetoothOn ? 'bg-blue-500' : 'bg-slate-400'}`}>
                        <Bluetooth className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-800 dark:text-white">Bluetooth</span>
                        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{isBluetoothOn ? 'On' : 'Off'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-3">
                    <div 
                      onClick={() => setIsFocusOn(!isFocusOn)}
                      className={`flex-1 bg-black/5 dark:bg-white/5 rounded-xl p-3 flex flex-col justify-center items-center gap-1 cursor-pointer transition-all ${isFocusOn ? 'bg-indigo-500/20 dark:bg-indigo-500/20' : 'hover:bg-black/10 dark:hover:bg-white/10'}`}
                    >
                      <Target className={`w-5 h-5 ${isFocusOn ? 'text-indigo-500' : 'text-slate-500'}`} />
                      <span className={`text-xs font-medium ${isFocusOn ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-800 dark:text-white'}`}>Focus</span>
                    </div>
                  </div>
                </div>

                {/* Display & Sound */}
                <div className="bg-black/5 dark:bg-white/5 rounded-xl p-3 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Sun className="w-4 h-4 text-slate-500 shrink-0" />
                    <div 
                      className="h-6 flex-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden relative cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const x = e.clientX - rect.left
                        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
                        setBrightness(Math.round(percentage))
                      }}
                    >
                      <div 
                        className="absolute top-0 left-0 bottom-0 bg-white dark:bg-slate-400 transition-all shadow-sm rounded-full"
                        style={{ width: `${brightness}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 w-8 text-right">{brightness}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-4 h-4 text-slate-500 shrink-0" />
                    <div 
                      className="h-6 flex-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden relative cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const x = e.clientX - rect.left
                        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
                        setVolume(Math.round(percentage))
                      }}
                    >
                      <div 
                        className="absolute top-0 left-0 bottom-0 bg-white dark:bg-slate-400 transition-all shadow-sm rounded-full"
                        style={{ width: `${volume}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 w-8 text-right">{volume}%</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Time/Date Dropdown - macOS Calendar Widget */}
          <AnimatePresence>
            {isTimeDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-9 right-2 w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-slate-200/50 dark:border-slate-700/50 z-40 p-4"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Current Date Header */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex flex-col">
                    <div className="text-2xl font-light text-slate-900 dark:text-white leading-none">
                      {currentTime ? currentTime.getDate() : 9}
                    </div>
                    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                      {currentTime ? currentTime.toLocaleDateString('en-US', { weekday: 'short' }) : 'Mon'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      {currentTime ? currentTime.toLocaleDateString('en-US', { month: 'short' }) : 'Jan'}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {currentTime ? currentTime.getFullYear() : '2024'}
                    </div>
                  </div>
                </div>

                {/* Mini Calendar Grid */}
                <div className="mb-3">
                  <div className="grid grid-cols-7 gap-1 mb-1">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                      <div key={i} className="text-[10px] text-slate-500 dark:text-slate-400 font-medium text-center py-1">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {(() => {
                      const today = currentTime || new Date()
                      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
                      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
                      const startDay = firstDay.getDay()
                      const daysInMonth = lastDay.getDate()
                      const days = []
                      
                      // Empty cells for days before month starts
                      for (let i = 0; i < startDay; i++) {
                        days.push(null)
                      }
                      
                      // Days of the month
                      for (let day = 1; day <= daysInMonth; day++) {
                        days.push(day)
                      }
                      
                      return days.slice(0, 35).map((day, i) => {
                        const isToday = day === today.getDate()
                        return (
                          <div
                            key={i}
                            className={`text-[11px] text-center py-1.5 rounded transition-colors ${
                              day === null
                                ? 'text-transparent'
                                : isToday
                                ? 'bg-blue-500 text-white font-semibold'
                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer'
                            }`}
                          >
                            {day}
                          </div>
                        )
                      })
                    })()}
                  </div>
                </div>

                {/* Time Display */}
                <div className="pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                  <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
                    {currentTime ? currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : '9:41 AM'}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* macOS Context Menu */}
          <AnimatePresence>
            {contextMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="absolute bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-slate-200/50 dark:border-slate-700/50 py-1 min-w-[200px] z-50"
                style={{ left: contextMenu.x, top: contextMenu.y }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-3 py-1.5 text-[13px] text-slate-700 dark:text-slate-200 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors">
                  New Folder
                </div>
                <div className="px-3 py-1.5 text-[13px] text-slate-700 dark:text-slate-200 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors">
                  Get Info
                </div>
                <div className="h-px bg-slate-200 dark:bg-slate-700 my-1"></div>
                <div className="px-3 py-1.5 text-[13px] text-slate-700 dark:text-slate-200 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors">
                  Change Desktop Background...
                </div>
                <div className="px-3 py-1.5 text-[13px] text-slate-700 dark:text-slate-200 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors">
                  Use Stacks
                </div>
                <div className="h-px bg-slate-200 dark:bg-slate-700 my-1"></div>
                <div className="px-3 py-1.5 text-[13px] text-slate-700 dark:text-slate-200 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors">
                  Show View Options
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Safari Browser Window */}
          <AnimatePresence>
            {windowState !== 'closed' && (
              <motion.div
                drag={windowState === 'normal'}
                dragConstraints={desktopRef}
                dragElastic={0}
                dragMomentum={false}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={
                  windowState === 'minimized'
                    ? { opacity: 0, scale: 0.3, y: 400, x: 0 }
                    : windowState === 'maximized'
                    ? { opacity: 1, scale: 1, x: 0, y: 0, width: '100%', height: '100%', top: 0, left: 0, borderRadius: 0 }
                    : { opacity: 1, scale: 1, width: '90%', height: '85%', top: '7.5%', left: '5%', borderRadius: 12 }
                }
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className={`absolute bg-white dark:bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col overflow-hidden z-10 ${windowState === 'normal' ? 'cursor-grab active:cursor-grabbing' : ''}`}
                style={{
                  maxWidth: windowState === 'maximized' ? '100%' : '1024px',
                  originY: 1,
                }}
              >
                
                {/* Safari Chrome / Toolbar */}
                <div 
                  className="bg-[#F6F6F6] dark:bg-[#2A2A2A] border-b border-gray-200 dark:border-gray-800 flex flex-col shrink-0 relative"
                  onDoubleClick={() => setWindowState(s => s === 'maximized' ? 'normal' : 'maximized')}
                >
                  {/* Top Row: Traffic Lights + URL */}
                  <div className="h-12 flex items-center px-4 gap-4 relative">
                    {/* Traffic Lights */}
                    <div className="flex gap-2 z-20" onPointerDown={(e) => e.stopPropagation()}>
                      <div onClick={() => {
                        setWindowState('closed')
                        setOpenTabs([])
                      }} className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:brightness-110 cursor-pointer flex items-center justify-center group/red">
                        <div className="w-1 h-1 rounded-full bg-black/40 opacity-0 group-hover/red:opacity-100 transition-opacity"></div>
                      </div>
                      <div onClick={() => setWindowState('minimized')} className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:brightness-110 cursor-pointer flex items-center justify-center group/yellow">
                        <div className="w-1 h-1 rounded-full bg-black/40 opacity-0 group-hover/yellow:opacity-100 transition-opacity"></div>
                      </div>
                      <div onClick={() => setWindowState(s => s === 'maximized' ? 'normal' : 'maximized')} className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:brightness-110 cursor-pointer flex items-center justify-center group/green">
                        <div className="w-1 h-1 rounded-full bg-black/40 opacity-0 group-hover/green:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                    
                    {/* Back / Forward */}
                    <div className="hidden sm:flex gap-2 text-gray-500 ml-2">
                      <ChevronLeft onClick={goBack} className={`w-4 h-4 transition-colors ${historyIndex > 0 ? 'cursor-pointer hover:text-black dark:hover:text-white' : 'opacity-50 cursor-not-allowed'}`} />
                      <ChevronRight onClick={goForward} className={`w-4 h-4 transition-colors ${historyIndex < tabHistory.length - 1 ? 'cursor-pointer hover:text-black dark:hover:text-white text-gray-500' : 'opacity-50 cursor-not-allowed text-gray-300 dark:text-gray-600'}`} />
                    </div>

                    {/* URL Bar - Centered */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-xl h-7 bg-white dark:bg-[#1E1E1E] rounded-md border border-gray-200 dark:border-gray-700 flex items-center justify-between px-3 shadow-sm text-[12px] text-gray-600 dark:text-gray-300 font-medium cursor-text group-hover/url:border-gray-300 transition-colors" onPointerDown={(e) => e.stopPropagation()}>
                      <div className="flex-1 text-center truncate">
                        {currentProject ? currentProject.link.replace(/^https?:\/\/(www\.)?/, '') : 'Start Page'}
                      </div>
                      <RotateCw onClick={handleReload} className={`w-[14px] h-[14px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer ${isReloading ? 'animate-spin' : ''}`} />
                    </div>
                  </div>
                  
                  {/* Tabs Row */}
                  <div className="flex items-end px-2 gap-1 overflow-x-auto scrollbar-hide h-8 pt-1" onPointerDown={(e) => e.stopPropagation()}>
                    {openTabs.map((tabIndex) => {
                      const project = webProjects[tabIndex]
                      const isActive = tabIndex === currentIndex
                      return (
                        <div 
                          key={tabIndex}
                          onClick={() => {
                            setCurrentIndex(tabIndex)
                            setIsAutoPlaying(false)
                          }}
                          className={`group flex items-center gap-2 max-w-[200px] min-w-[120px] h-7 px-3 rounded-t-lg border-x border-t text-xs cursor-pointer transition-colors ${
                            isActive 
                              ? 'bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-800 text-slate-800 dark:text-slate-200 z-10 shadow-[0_-2px_5px_rgba(0,0,0,0.05)]' 
                              : 'bg-[#E5E5E5] dark:bg-[#1E1E1E] border-transparent text-slate-500 dark:text-slate-400 hover:bg-[#D4D4D4] dark:hover:bg-[#252525]'
                          }`}
                        >
                          {project.darkIcon ? (
                            <>
                              <Image src={project.icon} alt="" width={14} height={14} className="opacity-70 object-contain rounded-sm dark:hidden" />
                              <Image src={project.darkIcon} alt="" width={14} height={14} className="opacity-70 object-contain rounded-sm hidden dark:block" />
                            </>
                          ) : (
                            <Image src={project.icon} alt="" width={14} height={14} className="opacity-70 object-contain rounded-sm" />
                          )}
                          <span className="truncate flex-1 font-medium">{project.name}</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              closeTab(tabIndex)
                            }}
                            className="opacity-0 group-hover:opacity-100 w-4 h-4 rounded-md hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center transition-opacity"
                          >
                            <XIcon className="w-3 h-3" />
                          </button>
                        </div>
                      )
                    })}
                    {/* New Tab Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        // Open start page (set currentIndex to -1, which is not in openTabs)
                        setCurrentIndex(-1)
                        setIsAutoPlaying(false)
                      }}
                      className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-slate-500 transition-colors ml-1"
                      title="New Tab"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Browser Content / Project Image */}
                <div className="relative flex-1 bg-slate-100 dark:bg-slate-950 overflow-y-auto cursor-auto [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-black/30 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 dark:[&::-webkit-scrollbar-thumb]:hover:bg-white/30" onPointerDown={(e) => e.stopPropagation()}>
                  <div className={`relative w-full min-h-full transition-opacity duration-300 ${isReloading ? 'opacity-0' : 'opacity-100'}`}>
                    {currentProject && openTabs.includes(currentIndex) ? (
                      currentProject.darkImage ? (
                        <>
                          <div className="relative w-full overflow-hidden rounded-sm">
                            <Image
                              src={currentProject.image}
                              alt={currentProject.name}
                              width={1200}
                              height={2000}
                              sizes="(max-width: 1200px) 100vw, 1200px"
                              className="w-full h-auto object-top dark:hidden"
                            />
                          </div>
                          <div className="relative w-full hidden dark:block overflow-hidden rounded-sm">
                            <Image
                              src={currentProject.darkImage}
                              alt={currentProject.name}
                              width={1200}
                              height={2000}
                              sizes="(max-width: 1200px) 100vw, 1200px"
                              className="w-full h-auto object-top"
                            />
                          </div>
                        </>
                      ) : (
                      <div className="relative w-full overflow-hidden rounded-sm">
                      <Image
                        src={currentProject.image}
                        alt={currentProject.name}
                          width={1200}
                          height={2000}
                          sizes="(max-width: 1200px) 100vw, 1200px"
                          className="w-full h-auto object-top"
                      />
                    </div>
                      )
                    ) : (
                      <div className="absolute inset-0 bg-[#F5F5F7] dark:bg-[#1E1E1E] flex flex-col items-center pt-12 md:pt-20 overflow-y-auto [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-black/30 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 dark:[&::-webkit-scrollbar-thumb]:hover:bg-white/30">
                        <div className="w-full max-w-3xl px-6 md:px-8 pb-12">
                          <h1 className="text-3xl font-semibold text-slate-800 dark:text-white mb-8">Start Page</h1>
                          
                          <div className="mb-8 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-white/5">
                            <h2 className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">Favorites</h2>
                            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-x-4 gap-y-8">
                              {webProjects.map((project, index) => (
                                <button 
                                  key={index}
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    handleDockClick(index)
                                  }}
                                  className="flex flex-col items-center gap-2.5 cursor-pointer group relative z-30"
                                >
                                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white ${project.keepWhiteBg ? '' : 'dark:bg-slate-800'} shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center justify-center ${project.name === 'hansbuffetbasingstoke.co.uk' ? 'p-3.5' : 'p-2.5'} group-hover:scale-105 transition-transform duration-200 pointer-events-none`}>
                                    {project.darkIcon ? (
                                      <>
                                        <Image src={project.icon} alt={project.name} width={40} height={40} className={`object-contain dark:hidden ${project.name === 'hansbuffetbasingstoke.co.uk' ? 'rounded-sm' : 'rounded-xl'} pointer-events-none`} />
                                        <Image src={project.darkIcon} alt={project.name} width={40} height={40} className={`object-contain hidden dark:block ${project.name === 'hansbuffetbasingstoke.co.uk' ? 'rounded-sm' : 'rounded-xl'} pointer-events-none`} />
                                      </>
                                    ) : (
                                      <Image src={project.icon} alt={project.name} width={40} height={40} className={`object-contain ${project.name === 'hansbuffetbasingstoke.co.uk' ? 'rounded-sm' : 'rounded-xl'} pointer-events-none`} />
                                    )}
                                  </div>
                                  <span className="text-[11px] md:text-xs text-slate-600 dark:text-slate-300 font-medium text-center truncate w-full px-1 group-hover:text-black dark:group-hover:text-white transition-colors pointer-events-none">{project.displayName || project.name.split('.')[0]}</span>
                                </button>
                              ))}
                </div>
              </div>
              
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Reloading Indicator overlay */}
                  {isReloading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <RotateCw className="w-8 h-8 text-slate-400 animate-spin" />
            </div>
                  )}
              </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* macOS Dock - Dynamic Projects */}
          <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 h-16 bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center gap-3 px-3 shadow-2xl z-30 transition-transform duration-300 ${windowState === 'maximized' ? 'translate-y-[150%]' : 'translate-y-0'}`}>
            {/* Dynamic Project Icons */}
            {webProjects.map((project, index) => {
              const isOpen = openTabs.includes(index) && windowState !== 'closed'
              const isActive = index === currentIndex && windowState !== 'closed'
              return (
                <div 
                  key={index}
                  onClick={() => handleDockClick(index)}
                  className={`w-12 h-12 rounded-xl bg-white ${project.keepWhiteBg ? '' : 'dark:bg-slate-800'} flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer relative group hover:-translate-y-2`}
                >
                  <div className="absolute inset-0 z-10 rounded-xl" /> {/* Invisible overlay for reliable clicking */}
                  <div className="relative w-full h-full rounded-xl overflow-hidden p-0.5">
                    {project.darkIcon ? (
                      <>
                        <Image src={project.icon} alt={`${project.name} icon`} fill className="object-contain p-1 dark:hidden" />
                        <Image src={project.darkIcon} alt={`${project.name} icon`} fill className="object-contain p-1 hidden dark:block" />
                      </>
                    ) : (
                      <Image src={project.icon} alt={`${project.name} icon`} fill className="object-contain p-1" />
                    )}
              </div>
                  {/* Active Indicator Dot */}
                  {isOpen && (
                    <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full shadow-sm ${isActive ? 'bg-emerald-500 dark:bg-emerald-400 w-1.5 h-1.5' : 'bg-black/60 dark:bg-white/70'}`}></div>
                  )}
            </div>
              )
            })}
          </div>
        </div>

        {/* Project Details Below Desktop */}
        {currentProject && (
          <div className="mt-8 px-2 lg:px-6">
            <div className="flex flex-row items-center justify-between mb-6">
              <div className="flex flex-col max-w-[80%]">
                <h3 className="text-2xl font-light text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-3">
                  <a href={currentProject.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary dark:hover:text-[#ADD8E6] transition-colors">
                    {currentProject.name}
                  </a>
                </h3>
                <p className="text-slate-600 dark:text-slate-400 font-light text-base lg:text-lg">
                  {currentProject.tagline}
                </p>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevProject}
                  className="w-10 h-10 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 active:scale-95 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" strokeWidth={2} />
                </button>
                <button
                  onClick={nextProject}
                  className="w-10 h-10 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 active:scale-95 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-300" strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Desktop CTAs */}
            <div className="flex items-center gap-4">
              <a
                href={currentProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-gray-100 transition-colors shadow-sm inline-block"
              >
                Go to Website
              </a>
              {currentProject.caseStudyLink && (
                <Link
                  href={currentProject.caseStudyLink}
                  className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm inline-block relative z-10"
                >
                  Go to Case Study
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

