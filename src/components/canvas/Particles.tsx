'use client'

import React from 'react'
import { Sparkles } from '@react-three/drei'

interface ParticlesProps {
  isMobile?: boolean
  reducedMotion?: boolean
}

export function Particles({ isMobile = false, reducedMotion = false }: ParticlesProps) {
  // Mobile / low-power: fewer particles for high framerate
  const primaryCount = isMobile ? 35 : 120
  const secondaryCount = isMobile ? 15 : 60
  const speed = reducedMotion ? 0.05 : 0.35

  return (
    <group>
      {/* Drifting Arctic Ice Dust */}
      <Sparkles
        count={primaryCount}
        scale={[16, 16, 16]}
        size={2.2}
        speed={speed}
        noise={0.3}
        color="#bae6fd"
        opacity={0.6}
      />

      {/* Brighter foreground crystal flakes */}
      <Sparkles
        count={secondaryCount}
        scale={[12, 12, 12]}
        size={3.8}
        speed={speed * 0.7}
        noise={0.6}
        color="#ffffff"
        opacity={0.75}
      />

      {/* Subtle deep cyan atmosphere sparks */}
      <Sparkles
        count={Math.floor(primaryCount / 3)}
        scale={[20, 20, 20]}
        size={1.6}
        speed={speed * 0.5}
        noise={0.2}
        color="#38bdf8"
        opacity={0.4}
      />
    </group>
  )
}
