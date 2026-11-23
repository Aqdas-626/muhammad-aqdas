'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface StaggerProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'ul' | 'section'
  stagger?: number
  delay?: number
  y?: number
  duration?: number
  start?: string
}

/**
 * Stagger container.
 * Animates direct children with composited y & opacity on viewport entrance.
 * Defers trigger creation to post-paint idle time to prevent main-thread blocking.
 */
export function Stagger({
  children,
  className = '',
  as: Tag = 'div',
  stagger = 0.1,
  delay = 0,
  y = 40,
  duration = 0.8,
  start = 'top 85%',
}: StaggerProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let ctx: gsap.Context | null = null

    const initAnimation = () => {
      ctx = gsap.context(() => {
        const items = el.children
        if (!items.length) return

        if (prefersReducedMotion) {
          gsap.fromTo(
            items,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.6,
              delay,
              stagger: 0.05,
              scrollTrigger: {
                trigger: el,
                start,
                once: true,
              },
            }
          )
        } else {
          gsap.fromTo(
            items,
            { y, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration,
              delay,
              stagger,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start,
                once: true,
              },
            }
          )
        }
      }, el)
    }

    const schedule =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 1200 })
        : (cb: () => void) => setTimeout(cb, 100)

    const handle = schedule(() => {
      if (typeof document !== 'undefined' && document.fonts) {
        document.fonts.ready.then(initAnimation)
      } else {
        initAnimation()
      }
    })

    return () => {
      if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(handle as number)
      } else {
        clearTimeout(handle as unknown as NodeJS.Timeout)
      }
      ctx?.revert()
    }
  }, [stagger, delay, y, duration, start])

  return (
    // @ts-expect-error dynamic HTML tag
    <Tag ref={containerRef} className={className}>
      {children}
    </Tag>
  )
}
