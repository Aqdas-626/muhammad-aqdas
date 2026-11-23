'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { useLenisVelocity } from './useLenisVelocity'

interface RevealLinesProps {
  children?: React.ReactNode
  lines?: React.ReactNode[]
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'p'
  delay?: number
  stagger?: number
  skewWithVelocity?: boolean
  triggerId?: string
}

/**
 * Masked line-by-line heading reveal.
 * Line splitting and animation wrappers are mounted ONLY on the client to prevent SSR hydration mismatches.
 * Each line is wrapped in an overflow: hidden container, translating from 110% to 0%.
 * Includes subtle velocity-driven skewY (capped to ±1.5deg) eased smoothly back to 0.
 */
export function RevealLines({
  children,
  lines,
  className = '',
  as: Tag = 'h2',
  delay = 0,
  stagger = 0.09,
  skewWithVelocity = true,
  triggerId,
}: RevealLinesProps) {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLElement>(null)
  const skewTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Subtle velocity skew effect (runs only after client mount)
  useLenisVelocity((velocity) => {
    if (!mounted || !skewWithVelocity || !containerRef.current) return
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Cap at ±1.5 degrees
    const clampedSkew = Math.max(-1.5, Math.min(1.5, velocity * 0.05))

    gsap.to(containerRef.current, {
      skewY: clampedSkew,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    if (skewTimer.current) clearTimeout(skewTimer.current)
    skewTimer.current = setTimeout(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          skewY: 0,
          duration: 0.45,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
    }, 120)
  })

  useEffect(() => {
    if (!mounted) return
    const el = containerRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let ctx: gsap.Context | null = null

    const initAnimation = () => {
      ctx = gsap.context(() => {
        const inners = el.querySelectorAll<HTMLElement>('.reveal-line-inner')
        if (!inners.length) return

        const triggerTarget = triggerId ? document.getElementById(triggerId) || el : el

        if (prefersReducedMotion) {
          gsap.fromTo(
            inners,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.6,
              delay,
              scrollTrigger: {
                trigger: triggerTarget,
                start: 'top 85%',
                once: true,
              },
            }
          )
        } else {
          gsap.fromTo(
            inners,
            { yPercent: 110, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.9,
              delay,
              stagger,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: triggerTarget,
                start: 'top 85%',
                once: true,
              },
            }
          )
        }
      }, el)
    }

    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(initAnimation)
    } else {
      initAnimation()
    }

    return () => {
      if (skewTimer.current) clearTimeout(skewTimer.current)
      ctx?.revert()
    }
  }, [mounted, delay, stagger, triggerId])

  // SSR and pre-mount render: deterministic plain text / lines (100% hydration match)
  if (!mounted) {
    return (
      // @ts-expect-error dynamic HTML tag
      <Tag ref={containerRef} className={`relative block ${className}`}>
        {lines ? (
          lines.map((item, idx) => (
            <span key={idx} className="block">
              {item}
            </span>
          ))
        ) : (
          children
        )}
      </Tag>
    )
  }

  // Extract items to render as lines after mount
  const lineItems = lines ?? (React.Children.count(children) > 0 ? React.Children.toArray(children) : [])

  // Client mounted render: split into overflow-hidden wrappers for line-by-line GSAP reveal
  return (
    // @ts-expect-error dynamic HTML tag
    <Tag ref={containerRef} className={`relative block will-change-transform ${className}`}>
      {lineItems.map((item, idx) => (
        <span key={idx} className="block overflow-hidden pb-1 -mb-1">
          <span className="reveal-line-inner block will-change-transform">
            {item}
          </span>
        </span>
      ))}
    </Tag>
  )
}
