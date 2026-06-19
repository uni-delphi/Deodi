import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/legales'],
        disallow: [
          '/dashboard/',
          '/acceso',
          '/registro',
          '/validacion/',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://deodi.com.ar/sitemap.xml',
  }
}