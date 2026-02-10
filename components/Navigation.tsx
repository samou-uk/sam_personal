'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Home, User, Briefcase, FolderKanban, Code, GraduationCap, Menu, X, Music, Mail, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: User },
  { name: 'Experience', href: '/experience', icon: Briefcase },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Skills', href: '/skills', icon: Code },
  { name: 'Education', href: '/education', icon: GraduationCap },
  { name: 'Contact', href: '/contact', icon: Mail },
]

export default function Navigation() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [musicDropdownOpen, setMusicDropdownOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [hoveredTrousers, setHoveredTrousers] = useState(false)
  const [hoveredMusic, setHoveredMusic] = useState(false)
  const [hoveredTheme, setHoveredTheme] = useState(false)
  const [spotifyLoaded, setSpotifyLoaded] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMusicDropdownOpen(false)
      }
    }

    if (musicDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [musicDropdownOpen])

  // Load Spotify when dropdown opens
  useEffect(() => {
    if (musicDropdownOpen && !spotifyLoaded) {
      // Small delay to ensure smooth opening
      const timer = setTimeout(() => {
        setSpotifyLoaded(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [musicDropdownOpen, spotifyLoaded])

  return (
    <>
      {/* Minimal Top Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-b border-slate-200/30 dark:border-slate-700/30' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center h-16 relative">
            {/* Profile - Minimal */}
            <Link href="/" className="flex items-center absolute left-0">
              <div className="relative w-10 h-10 overflow-hidden">
                <Image
                  src="/sam.png"
                  alt="Sam Chusen Ou"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop - Minimal Icon Nav - Centered */}
            <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                const isHovered = hoveredItem === item.name
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="relative">
                      <div
                        className={`relative p-2.5 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'text-primary dark:text-[#ADD8E6]'
                            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {isActive && (
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary dark:bg-[#ADD8E6]" />
                        )}
                      </div>
                      
                      {/* Tooltip */}
                      {isHovered && (
                          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-light rounded-lg whitespace-nowrap pointer-events-none z-50">
                            {item.name}
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-100 rotate-45"></div>
                          </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Music Dropdown & Mobile Menu Button */}
            <div className="flex items-center gap-2 absolute right-0">
              {/* Dark Mode Toggle */}
              <div className="relative">
                <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-lg transition-all duration-200 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                  onMouseEnter={() => setHoveredTheme(true)}
                  onMouseLeave={() => setHoveredTheme(false)}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
                {hoveredTheme && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-light rounded-lg whitespace-nowrap pointer-events-none z-50">
                    {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-100 rotate-45"></div>
                  </div>
                )}
              </div>

              {/* Trousers Link */}
              <div className="relative">
                <a
                  href="https://tomstrunks.com/?srsltid=AfmBOorHGx2AkqKWCnrSHsnecsvHyVmAn_fRXe1FUNiC0JHakvkn18Ah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg transition-all duration-200 text-slate-900 hover:text-slate-1000 dark:text-slate-500 dark:hover:text-slate-100 block"
                  onMouseEnter={() => setHoveredTrousers(true)}
                  onMouseLeave={() => setHoveredTrousers(false)}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24,31.36h-6c-0.192,0-0.351-0.151-0.359-0.343L16.657,10.36h-1.313l-0.984,20.658
                      C14.351,31.209,14.192,31.36,14,31.36H8c-0.199,0-0.36-0.161-0.36-0.36V1c0-0.199,0.161-0.36,0.36-0.36h16
                      c0.199,0,0.36,0.161,0.36,0.36v30C24.36,31.199,24.199,31.36,24,31.36z M18.344,30.64h5.296V6.341
                      c-1.565-0.167-2.813-1.415-2.98-2.981H17.36V8c0,0.199-0.161,0.36-0.36,0.36h-1.64v1.28H17c0.192,0,0.351,0.151,0.359,0.343
                      L18.344,30.64z M8.36,30.64h5.297L14.64,9.992V3.36h-3.299C11.173,4.926,9.926,6.173,8.36,6.341V30.64z M15.36,7.64h1.28V3.36
                      h-1.28V7.64z M21.385,3.36c0.159,1.168,1.087,2.096,2.255,2.256V3.36H21.385z M8.36,3.36v2.256c1.168-0.16,2.096-1.087,2.256-2.256
                      H8.36z M20.36,2.64h3.279V1.36H20.36V2.64z M12.36,2.64h7.28V1.36h-7.28V2.64z M8.36,2.64h3.28V1.36H8.36V2.64z"/>
                  </svg>
                </a>
                
                {/* Tooltip */}
                {hoveredTrousers && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-light rounded-lg whitespace-nowrap pointer-events-none z-50">
                    Tom's Trunks
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-100 rotate-45"></div>
                  </div>
                )}
              </div>

              {/* Music Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setMusicDropdownOpen(!musicDropdownOpen)}
                  onMouseEnter={() => setHoveredMusic(true)}
                  onMouseLeave={() => setHoveredMusic(false)}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${
                    musicDropdownOpen
                      ? 'text-primary dark:text-[#ADD8E6]'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                >
                  <Music className="w-5 h-5" />
                </button>
                
                {/* Tooltip */}
                {hoveredMusic && !musicDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-light rounded-lg whitespace-nowrap pointer-events-none z-50">
                    Evening tunes
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-100 rotate-45"></div>
                  </div>
                )}

                {/* Dropdown */}
                    {musicDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-white/80 dark:border-slate-700/80 shadow-2xl p-4">
                        <div className="mb-3">
                          <h3 className="text-sm font-light text-slate-900 dark:text-slate-100 mb-1">Evening tunes</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-light">Currently playing</p>
                        </div>
                        <div className="rounded-lg overflow-hidden bg-slate-100/50 dark:bg-slate-800/50 min-h-[352px] flex items-center justify-center">
                          {spotifyLoaded ? (
                            <iframe
                              data-testid="embed-iframe"
                              style={{ borderRadius: '12px' }}
                              src="https://open.spotify.com/embed/playlist/0PA4oqu2ebfs2ZgEiSMfgt?utm_source=generator&theme=0"
                              width="100%"
                              height="352"
                              frameBorder="0"
                              allowFullScreen
                              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                              loading="eager"
                            />
                          ) : (
                            <div className="text-slate-400 dark:text-slate-500 text-sm font-light">Loading...</div>
                          )}
                        </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors duration-200"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
          <div className="fixed inset-0 z-40 md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl">
          <div className="pt-20 px-6">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive
                              ? 'bg-primary/10 dark:bg-[#ADD8E6]/20 text-primary dark:text-[#ADD8E6]'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                          }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-base font-light">{item.name}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Mobile Nav - Minimal */}
          <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200/30 dark:border-slate-700/30">
        <div className="flex items-center justify-around h-14 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className="flex-1">
                <div
                      className={`flex flex-col items-center justify-center gap-0.5 py-2 transition-all duration-200 ${
                        isActive ? 'text-primary dark:text-[#ADD8E6]' : 'text-slate-500 dark:text-slate-400'
                      }`}
                >
                  <Icon className="w-5 h-5" />
                  {isActive && (
                    <div className="w-1 h-1 rounded-full bg-primary dark:bg-[#ADD8E6]" />
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
