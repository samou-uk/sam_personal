'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always start with 'light' to match server render
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  const updateTheme = (newTheme: Theme) => {
    if (typeof window === 'undefined') return
    const root = document.documentElement
    if (newTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  useEffect(() => {
    setMounted(true)
    // Read from localStorage or check what the script set
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null
      let initialTheme: Theme = 'light'
      
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        initialTheme = savedTheme
      } else {
        // Check if the script already set dark class
        initialTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
      }
      
      setTheme(initialTheme)
      updateTheme(initialTheme)
    } catch {
      // Fallback to light if there's an error
      setTheme('light')
      updateTheme('light')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    updateTheme(newTheme)
  }

  // Always provide the context, even before mounted
  // This prevents the "must be used within ThemeProvider" error
  const contextValue = { theme, toggleTheme }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

