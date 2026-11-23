'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import with SSR disabled for Three.js Canvas
const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#030712]" />
  ),
})

export function SceneWrapper() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 pointer-events-none z-0 bg-[#030712]" />
      }
    >
      <Scene />
    </Suspense>
  )
}
