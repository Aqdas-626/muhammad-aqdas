'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useSmoothScroll } from '@/providers/SmoothScrollProvider'
import { NAV_ITEMS, PERSONAL_INFO } from '@/data/constants'
import { Container } from '@/components/ui/Container'
import { Magnetic } from '@/components/motion/Magnetic'
import { ArrowUp, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterXIcon } from '@/components/ui/Icons'

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
              aria-label="Back to top"
              className="p-3 rounded-full bg-slate-950/85 border border-sky-400/30 text-sky-300 hover:text-white hover:border-sky-400/70 hover:scale-110 active:scale-95 transition-transform shadow-[0_0_20px_rgba(56,189,248,0.3)] backdrop-blur-md flex items-center justify-center group"
            >
              <ArrowUp aria-hidden="true" className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </Magnetic>
        </div>
      )}

      <footer
        id="footer"
        ref={footerRef}
        className="relative w-full py-20 pb-12 [isolation:isolate] select-none pointer-events-none border-t border-sky-400/10 bg-slate-950/50 backdrop-blur-xl"
      >
        <Container className="pointer-events-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/5">
            {/* Brand info */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                <span className="font-semibold text-lg tracking-widest text-white uppercase">
                  {PERSONAL_INFO.name}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-light max-w-sm leading-relaxed">
                Frontend developer crafting high-performance 3D graphics, fluid motion choreographies, and modern web architectures.
              </p>
            </div>

            {/* Quick navigation */}
            <div className="md:col-span-4 space-y-3">
              <span className="block text-[10px] font-mono tracking-widest uppercase text-sky-400">
                Quick Navigation
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    aria-label={`Scroll to ${item.label} section`}
                    className="text-left text-slate-300 hover:text-sky-300 transition-colors py-1"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Channels & Back to Top */}
            <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end space-y-6">
              <div className="space-y-3 md:text-right">
                <span className="block text-[10px] font-mono tracking-widest uppercase text-sky-400">
                  Direct Channels
                </span>
                <div className="flex items-center gap-3">
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
                    href={PERSONAL_INFO.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Muhammad Aqdas on Twitter / X"
                    className="p-2 rounded-lg bg-slate-900 border border-sky-400/20 text-slate-300 hover:text-sky-300 hover:border-sky-400/50 hover:-translate-y-1 transition-transform"
                  >
                    <TwitterXIcon aria-hidden="true" className="w-4 h-4" />
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

              {/* Scroll to top action */}
              <button
                onClick={handleScrollToTop}
                aria-label="Back to top of page"
                className="inline-flex items-center gap-2 text-xs font-mono text-sky-300 hover:text-white transition-colors group/top py-1"
              >
                <span>Back to top</span>
                <ArrowUp aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover/top:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Specs */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <p>
              © 2026 {PERSONAL_INFO.name}. Built with Next.js, R3F, GSAP & Tailwind.
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>All systems operational // 60 FPS</span>
            </p>
          </div>
        </Container>
      </footer>
    </>
  )
}
