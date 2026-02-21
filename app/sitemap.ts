import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://samou.co.uk' // Update with your actual domain

  const routes = [
    '',
    '/about',
    '/experience',
    '/projects',
    '/case-studies',
    '/education',
    '/resume',
    '/contact',
    '/restaurants',
    '/privacy',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}








