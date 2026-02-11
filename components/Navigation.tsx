'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Home, User, Briefcase, FolderKanban, GraduationCap, FileText, BookOpen, Menu, X, Music, Mail, Sun, Moon, Globe, Linkedin, Github, Instagram } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
import GlobalSearch from '@/components/GlobalSearch'

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: User },
  { name: 'Experience', href: '/experience', icon: Briefcase },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Case studies', href: '/case-studies', icon: BookOpen },
  { name: 'Education', href: '/education', icon: GraduationCap },
  { name: 'Resume', href: '/resume', icon: FileText },
  { name: 'Contact', href: '/contact', icon: Mail },
]

export default function Navigation() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [musicDropdownOpen, setMusicDropdownOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
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
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
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
              {/* Global Search */}
              <GlobalSearch />
              
              {/* Dark Mode Toggle */}
              <div className="relative" suppressHydrationWarning>
                <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-lg transition-all duration-200 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
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
        <div className="fixed inset-0 z-[1200] md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl">
          {/* Close button inside overlay */}
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="pt-20 px-6 pb-6 flex flex-col h-full">
            <div className="space-y-1 flex-1 overflow-y-auto">
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

            {/* Mobile footer inside hamburger */}
            <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light mb-3">
                &copy; {new Date().getFullYear()} Sam Chusen Ou
              </p>
              {/* Internal links only in mobile footer section */}
              <div className="flex flex-wrap gap-3 mb-3 text-[11px] font-light text-slate-500 dark:text-slate-400">
                <a
                  href="/restaurants"
                  className="hover:text-primary dark:hover:text-[#ADD8E6] transition-colors duration-200"
                >
                  Restaurant notes
                </a>
                <a
                  href="/privacy"
                  className="hover:text-primary dark:hover:text-[#ADD8E6] transition-colors duration-200"
                >
                  Privacy
                </a>
              </div>

              <div className="flex gap-5">
                <a
                  href="mailto:scou@uwaterloo.ca"
                  className="text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-[#ADD8E6] transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="https://samou.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-[#ADD8E6] transition-colors duration-200"
                >
                  <Globe className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sam-chusen-ou/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-[#ADD8E6] transition-colors duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/samou-uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-[#ADD8E6] transition-colors duration-200"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/samchusenou"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-[#ADD8E6] transition-colors duration-200"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Mobile Nav - Labeled (exclude About/Home on bottom bar, hide when menu open) */}
      {!menuOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200/30 dark:border-slate-700/30">
          <div className="flex items-center justify-around h-16 px-1">
            {navItems
              .filter((item) => item.name !== 'About' && item.name !== 'Home')
              .map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} className="flex-1">
                    <div
                      className={`flex flex-col items-center justify-center gap-0.5 py-1.5 transition-all duration-200 text-xs ${
                        isActive ? 'text-primary dark:text-[#ADD8E6]' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="mt-0.5 font-light text-[10px]">
                        {item.name}
                      </span>
                    </div>
                  </Link>
                )
              })}
          </div>
        </div>
      )}
    </>
  )
}
