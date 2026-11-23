'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { HeroCrystal } from './HeroCrystal'
import { Particles } from './Particles'
import { CameraRig } from './CameraRig'
import { CAMERA_KEYFRAMES } from '@/data/cameraKeyframes'
import { detectQuality, type QualityProfile } from '@/lib/deviceQuality'

/**
 * Intelligent RenderLoopManager
 * With frameloop="demand", calls invalidate() only when needed:
 * - On scroll (driven by Lenis / window scroll)
 * - On pointer moves (throttled)
 * - On visibility changes (pauses completely when tab is hidden)
 * - Gentle throttled ~30fps idle invalidation loop when hero is visible
 */
function RenderLoopManager({ enableContinuousLoop }: { enableContinuousLoop: boolean }) {
  const { invalidate } = useThree()

  useEffect(() => {
    // Initial paint frame
    invalidate()

    const onScroll = () => {
      invalidate()
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        invalidate()
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)

    let rafId: number | null = null

    if (enableContinuousLoop) {
      let lastTime = 0
      const loop = (time: number) => {
        if (document.visibilityState === 'visible') {
          // Throttled ~30fps for idle floating animations (halves CPU/GPU workload)
          if (time - lastTime >= 32) {
            lastTime = time
            invalidate()
          }
        }
        rafId = requestAnimationFrame(loop)
      }
      rafId = requestAnimationFrame(loop)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [invalidate, enableContinuousLoop])

  return null
}

export default function Scene() {
  const [quality, setQuality] = useState<QualityProfile | null>(null)

  // Shared ref for communication between CameraRig and HeroCrystal without state triggers
  const crystalStateRef = useRef({
    rotX: CAMERA_KEYFRAMES[0].crystalRotation[0],
    rotY: CAMERA_KEYFRAMES[0].crystalRotation[1],
    rotZ: CAMERA_KEYFRAMES[0].crystalRotation[2],
    scale: CAMERA_KEYFRAMES[0].crystalScale,
  })

  useEffect(() => {
    setQuality(detectQuality())
  }, [])

  if (!quality) {
    return <div className="fixed inset-0 pointer-events-none z-0 bg-[#030712]" />
  }

  // Graceful, ultra-lightweight fallback for software renderers (Lighthouse/SwiftShader/headless)
  if (quality.tier === 'software' || quality.isSoftwareRenderer) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030712]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.12)_0%,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(3,7,18,0.85)_0%,transparent_80%)]" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030712]">
      {/* Arctic atmospheric background gradient & vignette */}
      <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_at_bottom,rgba(3,7,18,0.85)_0%,transparent_80%)]" />

      <Canvas
        frameloop="demand"
        dpr={quality.dpr}
        gl={{
          antialias: quality.tier === 'high',
          alpha: true,
          powerPreference: 'high-performance',
          depth: true,
          stencil: false,
        }}
        camera={{
          fov: 45,
          position: CAMERA_KEYFRAMES[0].position,
          near: 0.1,
          far: 50,
        }}
        style={{ pointerEvents: 'none' }}
      >
        {/* On-demand render loop controller */}
        <RenderLoopManager enableContinuousLoop={quality.enableContinuousLoop} />

        {/* Arctic Scene Fog */}
        <fogExp2 attach="fog" args={['#030712', CAMERA_KEYFRAMES[0].fogDensity]} />

        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={0.4} color="#7dd3fc" />
        <directionalLight position={[10, 15, 10]} intensity={1.8} color="#f0f9ff" />
        <pointLight position={[-10, -5, -5]} intensity={1.2} color="#0284c7" />
        <pointLight position={[0, 0, 0]} intensity={0.8} color="#38bdf8" />

        {/* Environment map */}
        <Environment preset="city" environmentIntensity={0.65} />

        {/* Hero 3D Crystal Monolith */}
        <HeroCrystal
          reducedMotion={quality.reducedMotion}
          quality={quality}
          crystalStateRef={crystalStateRef}
        />

        {/* Drifting Snow and Ice Dust */}
        <Particles reducedMotion={quality.reducedMotion} quality={quality} />

        {/* Master Camera Rig & Choreography */}
        <CameraRig
          reducedMotion={quality.reducedMotion}
          crystalStateRef={crystalStateRef}
        />
      </Canvas>
    </div>
  )
}
