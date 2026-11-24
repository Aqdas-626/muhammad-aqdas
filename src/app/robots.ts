import { MetadataRoute } from 'next'
import { PERSONAL_INFO } from '@/data/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${PERSONAL_INFO.siteUrl}/sitemap.xml`,
  }
}
