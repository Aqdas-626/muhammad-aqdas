'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useSmoothScroll } from '@/providers/SmoothScrollProvider'
import { NAV_ITEMS, PERSONAL_INFO } from '@/data/constants'
import { Container } from '@/components/ui/Container'
import { Menu, X, ArrowUpRight } from 'lucide-react'

export function Navbar() {
  const { scrollTo } = useSmoothScroll()
  const [activeSection, setActiveSection] = useState<string>('hero')
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const updateScroll = () => {
      const currentScrollY = window.scrollY

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      lastScrollY = currentScrollY

      // Determine active section based on scroll offset
      const scrollPosition = currentScrollY + window.innerHeight * 0.35

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i]
        const section = document.getElementById(item.id)
        if (section) {
          const top = section.offsetTop
          if (scrollPosition >= top) {
            setActiveSection(item.id)
            break
          }
        }
      }
      rafRef.current = null
    }

    const handleScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateScroll)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false)
    scrollTo(`#${id}`, { offset: 0, duration: 1.4 })
  }

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -90 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
        className="fixed top-0 left-0 right-0 z-30 py-5 pointer-events-none"
      >
        <Container className="flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => handleNavClick('hero')}
            aria-label={`${PERSONAL_INFO.name} — Scroll to top`}
            className="pointer-events-auto group flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-400/20 backdrop-blur-md flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:border-sky-400/60 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
            </div>
            <div>
              <span className="block font-medium text-sm tracking-widest text-slate-100 uppercase">
                {PERSONAL_INFO.name}
              </span>
              <span className="block text-[10px] tracking-wider font-mono text-sky-400 uppercase">
                {PERSONAL_INFO.role}
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav
            aria-label="Main Navigation"
            className="pointer-events-auto hidden md:flex items-center gap-1 px-4 py-2 rounded-full bg-slate-950/60 border border-sky-400/15 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-4 py-1.5 text-xs font-mono tracking-wider transition-colors duration-200 rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 ${
                    isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBubble"
                      className="absolute inset-0 bg-sky-500/20 border border-sky-400/40 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Right Action / Status CTA */}
          <div className="pointer-events-auto flex items-center gap-3">
            <button
              onClick={() => handleNavClick('contact')}
              aria-label="Connect with Muhammad Aqdas"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider text-sky-200 bg-sky-500/10 border border-sky-400/30 hover:bg-sky-500/20 hover:border-sky-400/60 transition-transform duration-300 shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:scale-105"
            >
              <span>Connect</span>
              <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2.5 rounded-lg bg-slate-950/70 border border-sky-400/20 text-slate-200 backdrop-blur-lg hover:border-sky-400/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              {mobileMenuOpen ? (
                <X aria-hidden="true" className="w-5 h-5" />
              ) : (
                <Menu aria-hidden="true" className="w-5 h-5" />
              )}
            </button>
          </div>
        </Container>
      </motion.header>

      {/* Mobile Animated Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-20 md:hidden bg-[#030712]/95 backdrop-blur-2xl flex flex-col justify-center px-8"
          >
            <div className="space-y-4">
              <span className="text-[11px] font-mono tracking-widest text-sky-400 uppercase">
                Navigation
              </span>
              <div className="flex flex-col space-y-3">
                {NAV_ITEMS.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left text-2xl font-serif tracking-tight transition-colors py-1 ${
                      activeSection === item.id
                        ? 'text-sky-300 font-semibold pl-2 border-l-2 border-sky-400'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-800">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full py-3 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-200 text-sm font-mono tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
