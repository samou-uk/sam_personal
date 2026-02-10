'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
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
    }
  }, [])

  if (!isVisible) return null

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
          fill={isHovering ? '#004225' : '#0f172a'}
          stroke="white"
          strokeWidth="0.8"
          strokeLinejoin="round"
          className="transition-colors duration-300"
        />
      </svg>
    </div>
  )
}

