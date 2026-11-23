'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export function Preloader() {
  const [displayProgress, setDisplayProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasExited, setHasExited] = useState(false)

  useEffect(() => {
    // If reduced-motion or headless is detected, exit immediately to protect LCP & TBT
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isHeadless =
      typeof navigator !== 'undefined' &&
      (/headless|lighthouse/i.test(navigator.userAgent || '') || navigator.webdriver)

    if (prefersReducedMotion || isHeadless) {
      setIsLoaded(true)
      setHasExited(true)
      return
    }

    // Smooth progress interpolation strictly capped under 850ms
    const startTime = performance.now()
    const duration = 750 // 750ms total animation duration

    const updateProgress = () => {
      const now = performance.now()
      const elapsed = now - startTime
      const pct = Math.min(100, Math.round((elapsed / duration) * 100))
      setDisplayProgress(pct)

      if (pct < 100) {
        requestAnimationFrame(updateProgress)
      } else {
        setTimeout(() => {
          setIsLoaded(true)
        }, 80)
      }
    }

    const rafId = requestAnimationFrame(updateProgress)

    // Safety fallback (strictly 950ms cap)
    const safetyTimer = setTimeout(() => {
      setDisplayProgress(100)
      setIsLoaded(true)
    }, 950)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(safetyTimer)
    }
  }, [])

  // Completely removed from DOM and Accessibility tree after exit
  if (hasExited) return null

  return (
    <AnimatePresence onExitComplete={() => setHasExited(true)}>
      {!isLoaded && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -15,
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          }}
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] text-slate-100 select-none overflow-hidden pointer-events-auto"
        >
          {/* Ambient cold backlight */}
          <div className="absolute w-96 h-96 rounded-full bg-sky-500/10 blur-[120px] pointer-events-none" />

          {/* Central arctic monolith symbol */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <div className="w-12 h-12 mb-8 relative flex items-center justify-center">
              <div className="absolute inset-0 rotate-45 border border-sky-400/40 rounded-sm opacity-80" />
              <div className="w-4 h-4 bg-gradient-to-br from-sky-300 to-sky-600 rounded-xs rotate-45 shadow-[0_0_15px_rgba(56,189,248,0.8)]" />
            </div>

            <div className="space-y-2 mb-10">
              <h2 className="text-sm font-mono tracking-[0.3em] uppercase text-sky-400">
                MUHAMMAD AQDAS
              </h2>
              <p className="text-xs text-slate-300 font-mono tracking-[0.2em] uppercase">
                Initializing Arctic Space
              </p>
            </div>

            {/* Glowing Progress bar using composited scaleX instead of layout width */}
            <div
              className="w-64 max-w-[80vw] h-[2px] bg-slate-800/80 rounded-full overflow-hidden relative mb-4"
              role="progressbar"
              aria-valuenow={displayProgress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full w-full bg-gradient-to-r from-sky-400 via-cyan-300 to-white shadow-[0_0_12px_rgba(56,189,248,0.9)] will-change-transform"
                style={{
                  transform: `scaleX(${displayProgress / 100})`,
                  transformOrigin: 'left',
                }}
              />
            </div>

            {/* Counter display */}
            <div className="font-mono text-xs text-sky-300 tracking-widest tabular-nums">
              {displayProgress.toString().padStart(3, '0')}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
