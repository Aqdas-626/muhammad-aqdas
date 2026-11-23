'use client'

import React, { useEffect, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamically imported Scene with ssr disabled
const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#030712]" />
  ),
})

export function SceneWrapper() {
  const [shouldRender, setShouldRender] = useState(false)
  const [isFadedIn, setIsFadedIn] = useState(false)

  useEffect(() => {
    // Defer 3D canvas initialization until after first paint and idle
    const schedule =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 2500 })
        : (cb: () => void) => setTimeout(cb, 300)

    const handle = schedule(() => {
      setShouldRender(true)
      requestAnimationFrame(() => {
        setTimeout(() => setIsFadedIn(true), 50)
      })
    })

    return () => {
      if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(handle as number)
      } else {
        clearTimeout(handle as unknown as NodeJS.Timeout)
      }
    }
  }, [])

  if (!shouldRender) {
    return <div className="fixed inset-0 pointer-events-none z-0 bg-[#030712]" />
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ease-out ${
        isFadedIn ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Suspense
        fallback={
          <div className="fixed inset-0 pointer-events-none z-0 bg-[#030712]" />
        }
      >
        <Scene />
      </Suspense>
    </div>
  )
}
