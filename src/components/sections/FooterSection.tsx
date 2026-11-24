'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useSmoothScroll } from '@/providers/SmoothScrollProvider'
import { NAV_ITEMS, PERSONAL_INFO } from '@/data/constants'
import { Container } from '@/components/ui/Container'
import { Magnetic } from '@/components/motion/Magnetic'
import { ArrowUp, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons'

export function FooterSection() {
  const { scrollTo } = useSmoothScroll()
  const footerRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  const [showFloatingTop, setShowFloatingTop] = useState(false)

  const handleScrollToTop = () => {
    scrollTo(0, { duration: 1.6 })
  }

  const handleNavClick = (id: string) => {
    scrollTo(`#${id}`, { duration: 1.4 })
  }

  useEffect(() => {
    setMounted(true)
    const el = footerRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let ctx: gsap.Context | null = null

    const initAnimation = () => {
      ctx = gsap.context(() => {
        // 1. Footer slides up and fades in
        if (prefersReducedMotion) {
          gsap.from(el, {
            opacity: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: el,
              start: 'top 95%',
              once: true,
            },
          })
        } else {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 95%',
              once: true,
            },
          })
        }

        // 2. Floating back to top button visibility toggle after passing hero
        const heroEl = document.getElementById('hero')
        if (heroEl) {
          ScrollTrigger.create({
            trigger: heroEl,
            start: 'bottom 40%',
            onToggle: (self) => {
              setShowFloatingTop(!self.isActive)
            },
          })
        }
      }, el)
    }

    const schedule =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 1500 })
        : (cb: () => void) => setTimeout(cb, 100)

    const handle = schedule(initAnimation)

    return () => {
      if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(handle as number)
      } else {
        clearTimeout(handle as unknown as NodeJS.Timeout)
      }
      ctx?.revert()
    }
  }, [])

  return (
    <>
      {/* Floating Back to Top button (Appears once hero is passed) */}
      {mounted && (
        <div
          className={`fixed bottom-6 right-6 z-40 transition-transform duration-300 ${
            showFloatingTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <Magnetic strength={0.35}>
            <button
              onClick={handleScrollToTop}
              aria-label="Scroll back to top of the page"
              className="p-3.5 rounded-full bg-slate-900/90 border border-sky-400/30 text-sky-400 hover:text-white hover:border-sky-400/70 hover:bg-sky-500/20 backdrop-blur-xl shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <ArrowUp aria-hidden="true" className="w-5 h-5" />
            </button>
          </Magnetic>
        </div>
      )}

      {/* Main Footer Container */}
      <footer
        id="footer"
        ref={footerRef}
        className="relative w-full py-16 md:py-20 border-t border-sky-400/15 bg-slate-950/80 backdrop-blur-xl select-none"
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">
            {/* Col 1: Brand & Subtitle */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-400/30 flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
                </div>
                <span className="font-medium text-sm tracking-widest text-white uppercase">
                  {PERSONAL_INFO.name}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm font-light leading-relaxed">
                Fresher frontend developer learning to build fast, responsive interfaces with React, Next.js, and TypeScript, and exploring 3D with Three.js.
              </p>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="md:col-span-4 space-y-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-sky-400 block mb-2">
                Navigation
              </span>
              <ul className="grid grid-cols-2 gap-2 text-xs font-mono">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className="text-slate-400 hover:text-sky-300 transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Direct Connect & Socials (GitHub, LinkedIn, Email; NO Twitter, NO phone) */}
            <div className="md:col-span-3 space-y-4">
              <span className="text-[10px] font-mono tracking-widest uppercase text-sky-400 block mb-2">
                Connect
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Muhammad Aqdas on GitHub"
                  className="p-2 rounded-lg bg-slate-900 border border-sky-400/20 text-slate-300 hover:text-sky-300 hover:border-sky-400/50 hover:-translate-y-1 transition-transform"
                >
                  <GithubIcon aria-hidden="true" className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Muhammad Aqdas on LinkedIn"
                  className="p-2 rounded-lg bg-slate-900 border border-sky-400/20 text-slate-300 hover:text-sky-300 hover:border-sky-400/50 hover:-translate-y-1 transition-transform"
                >
                  <LinkedinIcon aria-hidden="true" className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  aria-label="Email Muhammad Aqdas"
                  className="p-2 rounded-lg bg-slate-900 border border-sky-400/20 text-slate-300 hover:text-sky-300 hover:border-sky-400/50 hover:-translate-y-1 transition-transform"
                >
                  <Mail aria-hidden="true" className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar (NO 60 FPS line) */}
          <div className="pt-8 border-t border-sky-400/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div>
              <span>© 2026 Muhammad Aqdas. Built with Next.js, React Three Fiber, GSAP &amp; Tailwind CSS.</span>
            </div>

            <div className="text-sky-400/80">
              <span>All rights reserved.</span>
            </div>
          </div>
        </Container>
      </footer>
    </>
  )
}
