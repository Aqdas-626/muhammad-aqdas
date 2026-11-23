'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface ScrollToOptions {
  offset?: number
  immediate?: boolean
  duration?: number
  lock?: boolean
}

interface SmoothScrollContextType {
  lenis: Lenis | null
  scrollTo: (target: string | HTMLElement | number, options?: ScrollToOptions) => void
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
})

export function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lenis = new Lenis({
      autoRaf: false,
      duration: prefersReducedMotion ? 0.001 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis
    setLenisInstance(lenis)

    // Drive Lenis from GSAP's central ticker
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerUpdate)
    gsap.ticker.lagSmoothing(0)

    // Notify ScrollTrigger when Lenis scrolls
    const onScroll = () => {
      ScrollTrigger.update()
    }
    lenis.on('scroll', onScroll)

    // Refresh ScrollTrigger after fonts and full window load settle
    const onWindowLoad = () => ScrollTrigger.refresh()
    if (typeof document !== 'undefined') {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh()
      })
      window.addEventListener('load', onWindowLoad)
    }

    // Create a GSAP context for potential page-wide cleanup
    const ctx = gsap.context(() => {})

    return () => {
      window.removeEventListener('load', onWindowLoad)
      ctx.revert()
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(tickerUpdate)
      lenis.destroy()
      lenisRef.current = null
      setLenisInstance(null)
    }
  }, [])

  const scrollTo = (target: string | HTMLElement | number, options?: ScrollToOptions) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options)
    } else if (typeof window !== 'undefined') {
      if (typeof target === 'string') {
        const el = document.querySelector(target)
        el?.scrollIntoView({ behavior: 'smooth' })
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' })
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
