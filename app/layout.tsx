import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import 'leaflet/dist/leaflet.css'
import CustomCursor from '@/components/CustomCursor'
import { ThemeProvider } from '@/components/ThemeProvider'
import EasterEggs from '@/components/EasterEggs'
import Footer from '@/components/Footer'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Sam Chusen Ou - Portfolio',
  description: 'Mathematics/Financial Analysis & Risk Management with Joint Statistics and Computational Mathematics at the University of Waterloo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable} suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} font-sans`}>
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


