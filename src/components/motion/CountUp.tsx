'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface CountUpProps {
  value: number | string
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  start?: string
}

/**
 * Animated number counter triggered by viewport entry.
 * Direct DOM updates avoid React re-render overhead.
 */
export function CountUp({
  value,
  duration = 1.4,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  start = 'top 85%',
}: CountUpProps) {
  const spanRef = useRef<HTMLSpanElement>(null)

  // Parse numeric component and any attached text
  const rawStr = String(value)
  const numericMatch = rawStr.match(/[\d.]+/)
  const targetNumber = numericMatch ? parseFloat(numericMatch[0]) : 0
  const extractedSuffix = suffix || rawStr.replace(/[\d.]+/, '')

  useEffect(() => {
    const el = spanRef.current
    if (!el || isNaN(targetNumber)) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      el.textContent = `${prefix}${targetNumber.toFixed(decimals)}${extractedSuffix}`
      return
    }

    const counterObj = { val: 0 }
    let ctx: gsap.Context | null = null

    const initAnimation = () => {
      ctx = gsap.context(() => {
        gsap.to(counterObj, {
          val: targetNumber,
          duration,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
          onUpdate: () => {
            if (el) {
              el.textContent = `${prefix}${counterObj.val.toFixed(decimals)}${extractedSuffix}`
            }
          },
        })
      }, el)
    }

    const schedule =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 1500 })
        : (cb: () => void) => setTimeout(cb, 100)

    const handle = schedule(initAnimation)

    return () => {
      if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(handle as number)
      } else {
        clearTimeout(handle as unknown as NodeJS.Timeout)
      }
      ctx?.revert()
    }
  }, [targetNumber, duration, prefix, extractedSuffix, decimals, start])

  return (
    <span ref={spanRef} className={className}>
      {prefix}0{extractedSuffix}
    </span>
  )
}
