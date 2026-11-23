'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useLenisVelocity } from './useLenisVelocity'

interface MarqueeProps {
  items: React.ReactNode[]
  duration?: number
  className?: string
  direction?: 'left' | 'right'
}

/**
 * Infinite horizontal ticker.
 * Acceleration scales dynamically with Lenis scroll velocity and pauses smoothly on hover.
 */
export function Marquee({
  items,
  duration = 24,
  className = '',
  direction = 'left',
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const isHoveredRef = useRef(false)
  const decayTimer = useRef<NodeJS.Timeout | null>(null)

  // Modulate ticker speed based on scroll velocity
  useLenisVelocity((velocity) => {
    if (isHoveredRef.current || !timelineRef.current) return
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const boost = 1 + Math.min(3, Math.abs(velocity) * 0.35)
    gsap.to(timelineRef.current, {
      timeScale: boost,
      duration: 0.2,
      overwrite: 'auto',
    })

    if (decayTimer.current) clearTimeout(decayTimer.current)
    decayTimer.current = setTimeout(() => {
      if (timelineRef.current && !isHoveredRef.current) {
        gsap.to(timelineRef.current, {
          timeScale: 1,
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
    }, 120)
  })

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const fromX = direction === 'left' ? 0 : -50
    const toX = direction === 'left' ? -50 : 0

    const tl = gsap.timeline({ repeat: -1 })
    tl.fromTo(
      track,
      { xPercent: fromX },
      {
        xPercent: toX,
        duration,
        ease: 'none',
      }
    )
    timelineRef.current = tl

    return () => {
      if (decayTimer.current) clearTimeout(decayTimer.current)
      tl.kill()
    }
  }, [duration, direction])

  const handleMouseEnter = () => {
    isHoveredRef.current = true
    if (timelineRef.current) {
      gsap.to(timelineRef.current, {
        timeScale: 0,
        duration: 0.3,
        overwrite: 'auto',
      })
    }
  }

  const handleMouseLeave = () => {
    isHoveredRef.current = false
    if (timelineRef.current) {
      gsap.to(timelineRef.current, {
        timeScale: 1,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full overflow-hidden select-none py-3 ${className}`}
    >
      <div
        ref={trackRef}
        className="flex w-max will-change-transform items-center gap-6"
      >
        {/* Set 1 */}
        <div className="flex items-center gap-6 shrink-0">
          {items.map((item, idx) => (
            <React.Fragment key={`a-${idx}`}>{item}</React.Fragment>
          ))}
        </div>
        {/* Set 2 (for seamless looping) */}
        <div className="flex items-center gap-6 shrink-0">
          {items.map((item, idx) => (
            <React.Fragment key={`b-${idx}`}>{item}</React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
