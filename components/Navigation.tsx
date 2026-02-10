'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Home, User, Briefcase, FolderKanban, Code, GraduationCap, Menu, X, Music, Mail } from 'lucide-react'

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
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [musicDropdownOpen, setMusicDropdownOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [hoveredTrousers, setHoveredTrousers] = useState(false)
  const [hoveredMusic, setHoveredMusic] = useState(false)
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
            ? 'bg-white/60 backdrop-blur-xl border-b border-slate-200/30' 
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
                            ? 'text-primary'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {isActive && (
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                        )}
                      </div>
                      
                      {/* Tooltip */}
                      {isHovered && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-light rounded-lg whitespace-nowrap pointer-events-none z-50">
                          {item.name}
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Music Dropdown & Mobile Menu Button */}
            <div className="flex items-center gap-2 absolute right-0">
              {/* Trousers Link */}
              <div className="relative">
                <a
                  href="https://tomstrunks.com/?srsltid=AfmBOorHGx2AkqKWCnrSHsnecsvHyVmAn_fRXe1FUNiC0JHakvkn18Ah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg transition-all duration-200 text-slate-500 hover:text-slate-900 block"
                  onMouseEnter={() => setHoveredTrousers(true)}
                  onMouseLeave={() => setHoveredTrousers(false)}
                >
                  <svg
                    className="w-5 h-5 text-slate-500 hover:text-slate-900 transition-colors duration-200"
                    viewBox="0 0 506.428 506.428"
                    fill="currentColor"
                  >
                    <path d="M386.657,0H119.773c-2.041,0-3.696,1.656-3.696,3.697v33.269v393.066c0,21.654,12.77,40.381,31.17,49.06v23.638
                      c0,2.042,1.656,3.697,3.697,3.697h49.286c2.042,0,3.697-1.655,3.697-3.697v-22.854c19.329-8.296,32.903-27.513,32.903-49.844
                      l-0.002-305.201c-0.003-0.128-0.01-0.253-0.021-0.38c0-9.046,7.361-16.407,16.407-16.407c9.046,0,16.408,7.361,16.406,16.395
                      c-0.01,0.127-0.02,0.252-0.021,0.466v305.128c0,22.331,13.574,41.548,32.902,49.844v22.854c0,2.042,1.656,3.697,3.697,3.697h49.285
                      c2.043,0,3.699-1.655,3.699-3.697v-23.638c18.4-8.679,31.168-27.404,31.168-49.06V36.965V3.697C390.353,1.656,388.7,0,386.657,0z
                       M123.47,7.393h259.49v25.876H278.679V16.224c0-2.041-1.654-3.695-3.695-3.695c-2.043,0-3.695,1.654-3.695,3.695V33.27h-36.144
                      V16.224c0-2.041-1.655-3.695-3.696-3.695c-2.042,0-3.697,1.654-3.697,3.695V33.27H123.47V7.393z M123.47,40.663h8.375v416.045
                      c-5.273-7.576-8.375-16.77-8.375-26.677V40.663z M196.535,499.032h-41.894v-17.1c4.958,1.497,10.211,2.312,15.652,2.312h12.321
                      c4.811,0,9.475-0.638,13.92-1.819L196.535,499.032L196.535,499.032z M276.993,430.031l0.002-305.071
                      c0.012-0.168,0.02-0.337,0.02-0.51c0-13.123-10.676-23.8-23.799-23.8c-13.123,0-23.8,10.677-23.8,23.8
                      c0,0.173,0.009,0.341,0.023,0.464v305.117c0,25.816-21.006,46.821-46.823,46.821h-12.321c-11.907,0-22.784-4.476-31.056-11.82
                      V40.663h88.513v40.662c0,2.041,1.655,3.696,3.697,3.696c2.041,0,3.696-1.655,3.696-3.696V40.663h36.144v40.662
                      c0,2.041,1.652,3.696,3.695,3.696c2.041,0,3.695-1.655,3.695-3.696V40.663h88.512v424.37c-8.27,7.346-19.146,11.82-31.055,11.82
                      h-12.32C297.997,476.854,276.993,455.849,276.993,430.031z M351.79,499.032h-41.895v-16.605c4.445,1.183,9.107,1.819,13.92,1.819
                      h12.32c5.441,0,10.693-0.815,15.654-2.312V499.032L351.79,499.032z M374.585,456.708V40.663h8.375v389.369
                      C382.96,439.94,379.856,449.132,374.585,456.708z"/>
                  </svg>
                </a>
                
                {/* Tooltip */}
                {hoveredTrousers && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-light rounded-lg whitespace-nowrap pointer-events-none z-50">
                    Tom's Trunks
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
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
                      ? 'text-primary'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Music className="w-5 h-5" />
                </button>
                
                {/* Tooltip */}
                {hoveredMusic && !musicDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-light rounded-lg whitespace-nowrap pointer-events-none z-50">
                    Evening tunes
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                  </div>
                )}

                {/* Dropdown */}
                {musicDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white/95 backdrop-blur-2xl rounded-2xl border border-white/80 shadow-2xl p-4">
                    <div className="mb-3">
                      <h3 className="text-sm font-light text-slate-900 mb-1">Evening tunes</h3>
                      <p className="text-xs text-slate-500 font-light">Currently playing</p>
                    </div>
                    <div className="rounded-lg overflow-hidden bg-slate-100/50 min-h-[352px] flex items-center justify-center">
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
                        <div className="text-slate-400 text-sm font-light">Loading...</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-white/95 backdrop-blur-2xl">
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
                          ? 'bg-primary/10 text-primary'
                          : 'text-slate-600 hover:bg-slate-100/50'
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
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/80 backdrop-blur-xl border-t border-slate-200/30">
        <div className="flex items-center justify-around h-14 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className="flex-1">
                <div
                  className={`flex flex-col items-center justify-center gap-0.5 py-2 transition-all duration-200 ${
                    isActive ? 'text-primary' : 'text-slate-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {isActive && (
                    <div className="w-1 h-1 rounded-full bg-primary" />
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
