import type { Metadata, Viewport } from 'next'
import { Syne, Inter } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider'
import { SceneWrapper } from '@/components/canvas/SceneWrapper'
import { Navbar } from '@/components/ui/Navbar'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { Preloader } from '@/components/ui/Preloader'
import { SectionIndicator } from '@/components/ui/SectionIndicator'
import { PERSONAL_INFO } from '@/data/constants'

// Subset only explicitly used font weights with display: swap
const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  display: 'swap',
  weight: ['700', '800'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const viewport: Viewport = {
  themeColor: '#030712',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(PERSONAL_INFO.siteUrl),
  title: 'Muhammad Aqdas | Frontend Developer – React, Next.js & Three.js',
  description:
    'Muhammad Aqdas is a fresher frontend developer building responsive React and Next.js interfaces with 3D and motion. Open to internships and junior roles.',
  authors: [{ name: PERSONAL_INFO.name, url: PERSONAL_INFO.siteUrl }],
  creator: PERSONAL_INFO.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: PERSONAL_INFO.siteUrl,
    title: 'Muhammad Aqdas | Frontend Developer – React, Next.js & Three.js',
    description:
      'Muhammad Aqdas is a fresher frontend developer building responsive React and Next.js interfaces with 3D and motion. Open to internships and junior roles.',
    siteName: `${PERSONAL_INFO.name} Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Aqdas | Frontend Developer – React, Next.js & Three.js',
    description:
      'Muhammad Aqdas is a fresher frontend developer building responsive React and Next.js interfaces with 3D and motion. Open to internships and junior roles.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL_INFO.name,
    jobTitle: 'Frontend Developer',
    url: PERSONAL_INFO.siteUrl,
    sameAs: [
      PERSONAL_INFO.socials.github,
      PERSONAL_INFO.socials.linkedin,
    ],
  }

  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} dark antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="relative bg-[#030712] text-slate-100 min-h-screen selection:bg-sky-500/30 selection:text-white">
        {/* Accessible Skip to Content Link */}
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-sky-400 focus:text-slate-950 focus:font-mono focus:text-sm focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>

        <SmoothScrollProvider>
          {/* Top Scroll Progress Bar */}
          <ProgressBar />

          {/* Fine-Pointer Custom Cursor */}
          <CustomCursor />

          {/* Cinematic Arctic Preloader (strictly capped & unmounted on exit) */}
          <Preloader />

          {/* Deferred Background 3D Scene */}
          <SceneWrapper />

          {/* UI Shell Navigation */}
          <Navbar />

          {/* Desktop Vertical Section Indicator */}
          <SectionIndicator />

          {/* Main Content Root with Landmark */}
          <main id="scroll-root" className="relative z-10 w-full">
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
