'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface MagneticProps {
  children: React.ReactNode
  strength?: number
  className?: string
}

/**
 * Magnetic button wrapper.
 * Attracts toward the cursor on hover. Strictly enabled for fine-pointer desktop devices.
 * Bounds are cached on enter and mouse moves are rAF throttled to prevent forced reflows.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className = '',
}: MagneticProps) {
  const magneticRef = useRef<HTMLDivElement>(null)
  const rectRef = useRef<DOMRect | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const el = magneticRef.current
    if (!el) return

    // Disable for touch devices or reduced motion
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFinePointer || prefersReducedMotion) return

    const handleMouseEnter = () => {
      rectRef.current = el.getBoundingClientRect()
    }

    const handleMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX
      const clientY = e.clientY

      if (rafRef.current) return

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        if (!el) return
        if (!rectRef.current) {
          rectRef.current = el.getBoundingClientRect()
        }
        const rect = rectRef.current
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = (clientX - centerX) * strength
        const deltaY = (clientY - centerY) * strength

        gsap.to(el, {
          x: deltaX,
          y: deltaY,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })
    }

    const handleMouseLeave = () => {
      rectRef.current = null
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      })
    }

    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter)
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      gsap.killTweensOf(el)
    }
  }, [strength])

  return (
    <div ref={magneticRef} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  )
}
