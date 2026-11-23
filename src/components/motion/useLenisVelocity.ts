'use client'

import { useEffect, useRef } from 'react'
import { useSmoothScroll } from '@/providers/SmoothScrollProvider'

/**
 * Hook to access real-time Lenis scroll velocity without triggering React re-renders.
 * Exposes a ref containing the current velocity and supports an optional per-scroll callback.
 */
export function useLenisVelocity(onVelocityChange?: (velocity: number) => void) {
  const { lenis } = useSmoothScroll()
  const velocityRef = useRef(0)
  const callbackRef = useRef(onVelocityChange)

  useEffect(() => {
    callbackRef.current = onVelocityChange
  }, [onVelocityChange])

  useEffect(() => {
    if (!lenis) return

    const handleScroll = (e: { velocity: number }) => {
      const v = typeof e.velocity === 'number' ? e.velocity : 0
      velocityRef.current = v
      if (callbackRef.current) {
        callbackRef.current(v)
      }
    }

    lenis.on('scroll', handleScroll)
    return () => {
      lenis.off('scroll', handleScroll)
    }
  }, [lenis])

  return velocityRef
}
