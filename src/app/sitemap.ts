import { MetadataRoute } from 'next'
import { PERSONAL_INFO } from '@/data/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: PERSONAL_INFO.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
