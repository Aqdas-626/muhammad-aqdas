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

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#030712',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://muhammadaqdas.dev'),
  title: {
    default: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}`,
    template: `%s | ${PERSONAL_INFO.name}`,
  },
  description: `${PERSONAL_INFO.name} is a ${PERSONAL_INFO.role} specializing in 3D WebGL experiences, Next.js architecture, and fluid motion design.`,
  keywords: [
    'Muhammad Aqdas',
    'Frontend Developer',
    'Creative Developer',
    'Three.js Portfolio',
    'React Three Fiber',
    'Next.js 16',
    'GSAP ScrollTrigger',
    'Lenis Smooth Scroll',
    'Motion',
    'Tailwind CSS',
    'WebGL',
  ],
  authors: [{ name: PERSONAL_INFO.name, url: 'https://muhammadaqdas.dev' }],
  creator: PERSONAL_INFO.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://muhammadaqdas.dev',
    title: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}`,
    description: PERSONAL_INFO.tagline,
    siteName: `${PERSONAL_INFO.name} Portfolio`,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${PERSONAL_INFO.name} — 3D Frontend Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}`,
    description: PERSONAL_INFO.tagline,
    images: ['/og-image.png'],
    creator: '@muhammadaqdas',
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
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} dark antialiased`}>
      <body className="relative bg-[#030712] text-slate-100 min-h-screen selection:bg-sky-500/30 selection:text-white">
        <SmoothScrollProvider>
          {/* Top Scroll Progress Bar */}
          <ProgressBar />

          {/* Fine-Pointer Custom Cursor */}
          <CustomCursor />

          {/* Cinematic Arctic Preloader */}
          <Preloader />

          {/* Persistent Background 3D Scene */}
          <SceneWrapper />

          {/* UI Shell Navigation */}
          <Navbar />

          {/* Desktop Vertical Section Indicator */}
          <SectionIndicator />

          {/* Main Content Root with ScrollTrigger Anchor ID */}
          <main id="scroll-root" className="relative z-10 w-full">
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
