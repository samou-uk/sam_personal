import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import 'leaflet/dist/leaflet.css'
import CustomCursor from '@/components/CustomCursor'
import { ThemeProvider } from '@/components/ThemeProvider'
import EasterEggs from '@/components/EasterEggs'
import Footer from '@/components/Footer'

const satoshi = localFont({
  src: [
    // Satoshi starts at 300 — map extralight headlines to light
    {
      path: './fonts/satoshi/satoshi-300.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/satoshi/satoshi-300.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/satoshi/satoshi-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/satoshi/satoshi-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/satoshi/satoshi-700.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/satoshi/satoshi-700.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/satoshi/satoshi-900.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/satoshi/satoshi-900.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'sam chusen ou',
  description: 'Mathematics/Financial Analysis & Risk Management, Statistics Joint Honours, and Computational Mathematics minor at the University of Waterloo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={satoshi.variable} suppressHydrationWarning>
      <body className={`${satoshi.className} font-sans`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(){
                try {
                  var theme = localStorage.getItem('theme');
                  var isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  var html = document.documentElement;
                  if (isDark) {
                    html.classList.add('dark');
                    html.style.colorScheme = 'dark';
                    html.style.backgroundColor = 'rgb(15 23 42)';
                  } else {
                    html.style.colorScheme = 'light';
                    html.style.backgroundColor = 'rgb(255 255 255)';
                  }
                } catch(e) {}
              }();
            `,
          }}
        />
        <ThemeProvider>
          <CustomCursor />
          <EasterEggs />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
