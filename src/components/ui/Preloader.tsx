'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useProgress } from '@react-three/drei'

export function Preloader() {
  const { progress, active } = useProgress()
  const [displayProgress, setDisplayProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Smooth progress interpolation with fallback timer
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        const target = Math.max(prev, progress)
        if (target >= 100 && !active) {
          clearInterval(interval)
          setTimeout(() => setIsLoaded(true), 400)
          return 100
        }
        const step = Math.max(1, Math.floor((100 - prev) * 0.15))
        const next = Math.min(100, prev + step)
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoaded(true), 400)
          return 100
        }
        return next
      })
    }, 40)

    // Fallback maximum safety timer (3.5s)
    const safetyTimer = setTimeout(() => {
      setDisplayProgress(100)
      setIsLoaded(true)
    }, 3500)

    return () => {
      clearInterval(interval)
      clearTimeout(safetyTimer)
    }
  }, [progress, active])

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -20,
            filter: 'blur(10px)',
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] text-slate-100 select-none overflow-hidden"
        >
          {/* Ambient cold backlight */}
          <div className="absolute w-96 h-96 rounded-full bg-sky-500/10 blur-[120px] pointer-events-none" />

          {/* Central arctic monolith symbol */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-12 h-12 mb-8 relative flex items-center justify-center"
            >
              <div className="absolute inset-0 rotate-45 border border-sky-400/40 rounded-sm animate-pulse" />
              <div className="w-4 h-4 bg-gradient-to-br from-sky-300 to-sky-600 rounded-xs rotate-45 shadow-[0_0_15px_rgba(56,189,248,0.8)]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-2 mb-10"
            >
              <h2 className="text-sm font-mono tracking-[0.3em] uppercase text-sky-400/80">
                MUHAMMAD AQDAS
              </h2>
              <p className="text-xs text-slate-400 font-mono tracking-[0.2em] uppercase">
                Initializing Arctic Space
              </p>
            </motion.div>

            {/* Glowing Progress bar */}
            <div className="w-64 max-w-[80vw] h-[2px] bg-slate-800/80 rounded-full overflow-hidden relative mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-sky-400 via-cyan-300 to-white shadow-[0_0_12px_rgba(56,189,248,0.9)]"
                style={{ width: `${displayProgress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Counter display */}
            <div className="font-mono text-xs text-sky-300/70 tracking-widest tabular-nums">
              {displayProgress.toString().padStart(3, '0')}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
