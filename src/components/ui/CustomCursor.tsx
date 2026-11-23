'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'motion/react'

export function CustomCursor() {
  const [isFinePointer, setIsFinePointer] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const rafRef = useRef<number | null>(null)

  // Smooth springs for outer trailing ring
  const ringX = useSpring(cursorX, { stiffness: 450, damping: 30 })
  const ringY = useSpring(cursorY, { stiffness: 450, damping: 30 })

  useEffect(() => {
    const fineQuery = window.matchMedia('(pointer: fine)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateCapabilities = () => {
      setIsFinePointer(fineQuery.matches && !reducedMotionQuery.matches)
    }

    updateCapabilities()
    fineQuery.addEventListener('change', updateCapabilities)
    reducedMotionQuery.addEventListener('change', updateCapabilities)

    // Throttled mouse move via requestAnimationFrame
    const onMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX
      const clientY = e.clientY

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          cursorX.set(clientX)
          cursorY.set(clientY)
          rafRef.current = null
        })
      }
      if (!isVisible) setIsVisible(true)
    }

    const onMouseEnter = () => setIsVisible(true)
    const onMouseLeave = () => setIsVisible(false)

    // Detect hover over interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target?.closest('a') ||
        target?.closest('button') ||
        target?.closest('[role="button"]') ||
        target?.closest('input')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      fineQuery.removeEventListener('change', updateCapabilities)
      reducedMotionQuery.removeEventListener('change', updateCapabilities)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [cursorX, cursorY, isVisible])

  if (!isFinePointer || !isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {/* Outer trailing frost ring - Animated purely with transform and opacity */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          opacity: isHovered ? 0.9 : 0.6,
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="w-8 h-8 rounded-full border border-sky-400/50 bg-sky-400/10 shadow-[0_0_15px_rgba(56,189,248,0.25)] will-change-transform"
      />

      {/* Center sharp ice dot - Animated purely with scale transform */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
        }}
        transition={{ duration: 0.12 }}
        className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#38bdf8] will-change-transform"
      />
    </div>
  )
}
