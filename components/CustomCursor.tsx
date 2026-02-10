'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isPointerDevice, setIsPointerDevice] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check if device has a fine pointer (mouse) vs coarse pointer (touch)
    if (typeof window === 'undefined') return

    // Check dark mode - only check the class, not system preference
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }
    checkDarkMode()

    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    const mediaQuery = window.matchMedia('(pointer: fine)')
    setIsPointerDevice(mediaQuery.matches)
    
    // Listen for changes (e.g., when device is connected/disconnected)
    const handleChange = (e: MediaQueryListEvent) => {
      setIsPointerDevice(e.matches)
    }
    mediaQuery.addEventListener('change', handleChange)

    // Only set up cursor tracking if it's a pointer device
    if (!mediaQuery.matches) {
      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [onclick], [class*="cursor-pointer"]')
      setIsHovering(!!isInteractive)
    }

    window.addEventListener('mousemove', updateCursor)
    window.addEventListener('mousemove', checkHover)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      window.removeEventListener('mousemove', checkHover)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      mediaQuery.removeEventListener('change', handleChange)
      observer.disconnect()
    }
  }, [])

  // Don't render cursor on touch devices
  if (!isPointerDevice || !isVisible) return null

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        className={`transition-all duration-300 ${isHovering ? 'scale-125' : 'scale-100'}`}
        style={{
          transform: 'rotate(135deg)',
          transformOrigin: 'center',
          filter: 'drop-shadow(0 0 1px white) drop-shadow(0 0 1px white)',
        }}
      >
        <path
          d="M0 0 L12 0 L6 12 Z"
          fill={isHovering ? (isDarkMode ? '#ADD8E6' : '#004225') : (isDarkMode ? '#0f172a' : '#0f172a')}
          stroke="white"
          strokeWidth="0.8"
          strokeLinejoin="round"
          className="transition-colors duration-300"
        />
      </svg>
    </div>
  )
}

