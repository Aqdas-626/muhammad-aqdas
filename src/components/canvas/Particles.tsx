'use client'

import React from 'react'
import { Sparkles } from '@react-three/drei'
import type { QualityProfile } from '@/lib/deviceQuality'

interface ParticlesProps {
  reducedMotion?: boolean
  quality: QualityProfile
}

export function Particles({ reducedMotion = false, quality }: ParticlesProps) {
  const { primary, secondary } = quality.particleCount

  if (primary <= 0) return null

  const speed = reducedMotion ? 0.05 : 0.35

  return (
    <group>
      {/* Drifting Arctic Ice Dust */}
      <Sparkles
        count={primary}
        scale={[16, 16, 16]}
        size={2.2}
        speed={speed}
        noise={0.3}
        color="#bae6fd"
        opacity={0.6}
      />

      {/* Brighter foreground crystal flakes */}
      {secondary > 0 && (
        <Sparkles
          count={secondary}
          scale={[12, 12, 12]}
          size={3.8}
          speed={speed * 0.7}
          noise={0.6}
          color="#ffffff"
          opacity={0.75}
        />
      )}
    </group>
  )
}
