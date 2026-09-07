'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type MouseEvent as ReactMouseEvent,
} from 'react'

type Theme = 'light' | 'dark'

type ThemeToggleOrigin = {
  x: number
  y: number
}

interface ThemeContextType {
  theme: Theme
  toggleTheme: (origin?: ThemeToggleOrigin | ReactMouseEvent) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

/** Ink / paint splat used as an expanding CSS mask */
const PAINT_SPLAT = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240">
  <g fill="#fff">
    <!-- ragged main blot -->
    <path d="
      M120 28
      c12 -10 28 -8 36 4
      c10 -14 28 -12 36 2
      c16 -6 30 8 28 24
      c14 2 22 18 16 32
      c12 8 10 28 -2 36
      c8 12 2 28 -12 34
      c4 14 -8 28 -24 30
      c0 12 -12 22 -26 22
      c-8 10 -24 12 -36 4
      c-10 10 -28 8 -36 -4
      c-12 8 -28 2 -34 -12
      c-14 2 -26 -10 -26 -24
      c-12 -4 -18 -20 -10 -32
      c-10 -10 -8 -28 6 -36
      c-6 -12 2 -28 16 -32
      c-2 -14 10 -28 26 -28
      c6 -12 22 -16 34 -8
      c8 -10 20 -12 28 -4
      z
    "/>
    <!-- drips -->
    <ellipse cx="98" cy="198" rx="7" ry="18"/>
    <ellipse cx="132" cy="204" rx="5" ry="16"/>
    <ellipse cx="156" cy="188" rx="4" ry="12"/>
    <ellipse cx="74" cy="186" rx="4" ry="11"/>
    <!-- tendril blobs -->
    <path d="M52 70 c-18 -4 -28 10 -22 24 c6 10 20 10 28 2 c6 -8 4 -22 -6 -26z"/>
    <path d="M188 86 c14 -8 28 2 26 18 c-2 12 -16 18 -26 12 c-10 -4 -12 -22 0 -30z"/>
    <path d="M176 150 c16 4 24 20 14 32 c-8 8 -22 6 -28 -4 c-6 -12 2 -30 14 -28z"/>
    <path d="M58 148 c-14 6 -18 22 -8 32 c10 8 24 2 28 -10 c4 -14 -6 -28 -20 -22z"/>
    <!-- outer spray -->
    <circle cx="36" cy="48" r="9"/>
    <circle cx="22" cy="72" r="5"/>
    <circle cx="48" cy="30" r="4"/>
    <circle cx="18" cy="108" r="7"/>
    <circle cx="30" cy="140" r="4"/>
    <circle cx="44" cy="178" r="8"/>
    <circle cx="28" cy="196" r="3"/>
    <circle cx="68" cy="214" r="5"/>
    <circle cx="108" cy="226" r="4"/>
    <circle cx="148" cy="222" r="6"/>
    <circle cx="178" cy="206" r="4"/>
    <circle cx="204" cy="178" r="8"/>
    <circle cx="218" cy="150" r="5"/>
    <circle cx="226" cy="112" r="7"/>
    <circle cx="216" cy="76" r="4"/>
    <circle cx="198" cy="42" r="9"/>
    <circle cx="170" cy="24" r="5"/>
    <circle cx="140" cy="14" r="4"/>
    <circle cx="96" cy="12" r="6"/>
    <circle cx="66" cy="22" r="3"/>
    <!-- mid spray -->
    <circle cx="86" cy="54" r="3"/>
    <circle cx="154" cy="58" r="3"/>
    <circle cx="184" cy="120" r="3"/>
    <circle cx="62" cy="116" r="3"/>
    <circle cx="120" cy="188" r="3"/>
    <circle cx="200" cy="98" r="2"/>
    <circle cx="40" cy="96" r="2"/>
    <circle cx="168" cy="176" r="2"/>
  </g>
</svg>
`)

const SPLAT_MASK = `url("data:image/svg+xml,${PAINT_SPLAT}")`

function resolveOrigin(origin?: ThemeToggleOrigin | ReactMouseEvent): ThemeToggleOrigin | null {
  if (!origin) return null
  if ('clientX' in origin && typeof origin.clientX === 'number') {
    return { x: origin.clientX, y: origin.clientY }
  }
  if ('x' in origin && 'y' in origin) {
    return { x: origin.x, y: origin.y }
  }
  return null
}

function applyThemeClass(newTheme: Theme) {
  const root = document.documentElement
  if (newTheme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null
      let initialTheme: Theme = 'light'

      if (savedTheme === 'light' || savedTheme === 'dark') {
        initialTheme = savedTheme
      } else {
        initialTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
      }

      setTheme(initialTheme)
      applyThemeClass(initialTheme)
    } catch {
      setTheme('light')
      applyThemeClass('light')
    }
  }, [])

  const toggleTheme = useCallback(
    (origin?: ThemeToggleOrigin | ReactMouseEvent) => {
      const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
      const point = resolveOrigin(origin)
      const reducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const commit = () => {
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        applyThemeClass(newTheme)
      }

      const canAnimate =
        mounted &&
        !reducedMotion &&
        typeof document !== 'undefined' &&
        'startViewTransition' in document

      if (!canAnimate) {
        document.documentElement.classList.add('theme-fade')
        commit()
        window.setTimeout(() => {
          document.documentElement.classList.remove('theme-fade')
        }, 280)
        return
      }

      const x = point?.x ?? window.innerWidth - 48
      const y = point?.y ?? 32
      const size = Math.hypot(window.innerWidth, window.innerHeight) * 2.6

      const transition = (document as Document & {
        startViewTransition: (cb: () => void) => {
          ready: Promise<void>
        }
      }).startViewTransition(commit)

      transition.ready.then(() => {
        const frame = {
          maskImage: SPLAT_MASK,
          WebkitMaskImage: SPLAT_MASK,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskOrigin: 'center',
          WebkitMaskOrigin: 'center',
        } as Keyframe

        // Start at a readable splat size so the blot silhouette shows, then flood the screen
        const startSize = Math.min(window.innerWidth, window.innerHeight) * 0.22

        document.documentElement.animate(
          [
            {
              ...frame,
              maskSize: `${startSize}px`,
              WebkitMaskSize: `${startSize}px`,
              maskPosition: `${x - startSize / 2}px ${y - startSize / 2}px`,
              WebkitMaskPosition: `${x - startSize / 2}px ${y - startSize / 2}px`,
            },
            {
              ...frame,
              maskSize: `${size}px`,
              WebkitMaskSize: `${size}px`,
              maskPosition: `${x - size / 2}px ${y - size / 2}px`,
              WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
            },
          ],
          {
            duration: 560,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        )
      })
    },
    [mounted, theme]
  )

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
