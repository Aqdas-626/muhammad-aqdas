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
  'aria-label'?: string
}

/**
 * Masked line-by-line heading reveal.
 * Line splitting and animation wrappers are deferred to requestIdleCallback
 * to break up main-thread long tasks and guarantee zero forced reflows during first paint.
 */
export function RevealLines({
  children,
  lines,
  className = '',
  as: Tag = 'h2',
  delay = 0,
  stagger = 0.09,
  skewWithVelocity = false, // Disabled by default for better compositing performance
  triggerId,
  'aria-label': ariaLabel,
}: RevealLinesProps) {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLElement>(null)
  const skewTimer = useRef<NodeJS.Timeout | null>(null)

  // Defer mounting split DOM to post-paint idle time
  useEffect(() => {
    const schedule =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 1200 })
        : (cb: () => void) => setTimeout(cb, 60)

    const handle = schedule(() => {
      setMounted(true)
    })

    return () => {
      if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(handle as number)
      } else {
        clearTimeout(handle as unknown as NodeJS.Timeout)
      }
    }
  }, [])

  // Velocity skew effect throttled
  useLenisVelocity((velocity) => {
    if (!mounted || !skewWithVelocity || !containerRef.current) return
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

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

  // GSAP Reveal Animation setup batched after idle
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
          return
        }

        gsap.fromTo(
          inners,
          { y: '110%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 1.05,
            delay,
            stagger,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: triggerTarget,
              start: 'top 88%',
              once: true,
            },
          }
        )
      }, el)
    }

    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(initAnimation)
    } else {
      initAnimation()
    }

    return () => {
      ctx?.revert()
    }
  }, [mounted, delay, stagger, triggerId])

  // Process lines
  let resolvedLines: React.ReactNode[] = []
  let textFallback = ''

  if (lines && lines.length > 0) {
    resolvedLines = lines
    textFallback = lines.filter((l) => typeof l === 'string').join(' ')
  } else if (typeof children === 'string') {
    resolvedLines = children.split('\n').filter((l) => l.trim().length > 0)
    textFallback = children
  } else if (children) {
    resolvedLines = [children]
  }

  const effectiveAriaLabel = ariaLabel || (textFallback ? textFallback : undefined)
  const Component = Tag as React.ElementType

  // SSR & Pre-mount: Render semantic un-nested lines (zero hydration diff & instant LCP)
  if (!mounted) {
    return (
      <Component
        ref={containerRef}
        aria-label={effectiveAriaLabel}
        className={`relative block ${className}`}
      >
        {resolvedLines.map((item, idx) => (
          <span key={idx} className="block">
            {item}
          </span>
        ))}
      </Component>
    )
  }

  // Mounted client render: Lines wrapped in overflow-hidden masks
  return (
    <Component
      ref={containerRef}
      aria-label={effectiveAriaLabel}
      className={`relative block ${className}`}
    >
      {resolvedLines.map((lineContent, idx) => (
        <span
          key={idx}
          aria-hidden={effectiveAriaLabel ? 'true' : undefined}
          className="block overflow-hidden pb-1 -mb-1"
        >
          <span className="reveal-line-inner block will-change-transform">
            {lineContent}
          </span>
        </span>
      ))}
    </Component>
  )
}
