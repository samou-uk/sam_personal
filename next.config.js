/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://open.spotify.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' blob: https://raw.githack.com https://raw.githubusercontent.com https://open.spotify.com https://*.spotify.com https://*.tile.openstreetmap.org https://*.basemaps.cartocdn.com https://vitals.vercel-insights.com https://*.vercel-analytics.com",
      "frame-src 'self' https://open.spotify.com https://calendar.google.com https://docs.google.com https://contacts.google.com",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      'upgrade-insecure-requests',
    ].join('; '),
  },
]

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    // HSTS + CSP (especially upgrade-insecure-requests) break plain HTTP localhost.
    // Keep full headers for production only.
    if (!isProd) {
      return []
    }
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

module.exports = nextConfig
