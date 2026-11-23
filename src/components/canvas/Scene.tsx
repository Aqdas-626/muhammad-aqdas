'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { HeroCrystal } from './HeroCrystal'
import { Particles } from './Particles'
import { CameraRig } from './CameraRig'
import { CAMERA_KEYFRAMES } from '@/data/cameraKeyframes'

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return true
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

export default function Scene() {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [reducedMotion, setReducedMotion] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)

  // Shared ref for communication between CameraRig and HeroCrystal without state triggers
  const crystalStateRef = useRef({
    rotX: CAMERA_KEYFRAMES[0].crystalRotation[0],
    rotY: CAMERA_KEYFRAMES[0].crystalRotation[1],
    rotZ: CAMERA_KEYFRAMES[0].crystalRotation[2],
    scale: CAMERA_KEYFRAMES[0].crystalScale,
  })

  useEffect(() => {
    setMounted(true)
    setHasWebGL(checkWebGLSupport())

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(motionQuery.matches)

    const mobileQuery = window.matchMedia('(max-width: 768px)')
    setIsMobile(mobileQuery.matches)

    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    const handleMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)

    motionQuery.addEventListener('change', handleMotionChange)
    mobileQuery.addEventListener('change', handleMobileChange)

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange)
      mobileQuery.removeEventListener('change', handleMobileChange)
    }
  }, [])

  if (!mounted) {
    return <div className="fixed inset-0 pointer-events-none z-0 bg-[#030712]" />
  }

  // Graceful fallback when WebGL is unsupported or disabled
  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030712]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(56,189,248,0.18)_0%,transparent_65%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-6 left-6 text-xs text-sky-300/40 font-mono tracking-widest uppercase">
          [ Ambient 2D Arctic Mode Active ]
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030712]">
      {/* Arctic atmospheric background gradient & vignette */}
      <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_at_bottom,rgba(3,7,18,0.85)_0%,transparent_80%)]" />

      <Canvas
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{
          fov: 45,
          position: CAMERA_KEYFRAMES[0].position,
          near: 0.1,
          far: 50,
        }}
        style={{ pointerEvents: 'none' }}
      >
        {/* Arctic Scene Fog */}
        <fogExp2 attach="fog" args={['#030712', CAMERA_KEYFRAMES[0].fogDensity]} />

        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={0.4} color="#7dd3fc" />
        <directionalLight position={[10, 15, 10]} intensity={1.8} color="#f0f9ff" />
        <pointLight position={[-10, -5, -5]} intensity={1.2} color="#0284c7" />
        <pointLight position={[0, 0, 0]} intensity={0.8} color="#38bdf8" />

        {/* Environment map for realistic crystal specular reflections */}
        <Environment preset="city" environmentIntensity={0.65} />

        {/* Hero 3D Crystal Monolith */}
        <HeroCrystal
          isMobile={isMobile}
          reducedMotion={reducedMotion}
          crystalStateRef={crystalStateRef}
        />

        {/* Drifting Snow and Ice Dust */}
        <Particles isMobile={isMobile} reducedMotion={reducedMotion} />

        {/* Master Camera Rig & Choreography */}
        <CameraRig
          reducedMotion={reducedMotion}
          crystalStateRef={crystalStateRef}
        />
      </Canvas>
    </div>
  )
}
