'use client'

import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'

interface HeroCrystalProps {
  isMobile?: boolean
  reducedMotion?: boolean
  crystalStateRef?: React.MutableRefObject<{
    rotX: number
    rotY: number
    rotZ: number
    scale: number
  }>
}

export function HeroCrystal({
  isMobile = false,
  reducedMotion = false,
  crystalStateRef,
}: HeroCrystalProps) {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const shardsRef = useRef<THREE.Group>(null)

  // Memoize geometries
  const mainGeometry = useMemo(() => new THREE.IcosahedronGeometry(1.6, 0), [])
  const coreGeometry = useMemo(() => new THREE.IcosahedronGeometry(0.85, 0), [])
  const shardGeometry = useMemo(() => new THREE.OctahedronGeometry(0.4, 0), [])

  // Shard offsets for surrounding floating ice satellites
  const shardPositions: [number, number, number][] = useMemo(
    () => [
      [2.2, 0.9, -0.4],
      [-2.1, -0.8, 0.5],
      [1.3, -1.9, 0.7],
      [-1.4, 1.8, -0.6],
      [0.2, 2.3, 0.8],
      [-0.4, -2.2, -0.9],
    ],
    []
  )

  const elapsedRef = useRef(0)

  useFrame((state, delta) => {
    if (!groupRef.current) return

    elapsedRef.current += delta
    const time = elapsedRef.current

    // Smoothly apply scroll-choreographed rotation & scale from CameraRig ref
    const targetScale = crystalStateRef?.current ? crystalStateRef.current.scale : 1.8
    const targetRotX = crystalStateRef?.current ? crystalStateRef.current.rotX : 0
    const targetRotY = crystalStateRef?.current ? crystalStateRef.current.rotY : 0
    const targetRotZ = crystalStateRef?.current ? crystalStateRef.current.rotZ : 0

    // Subtle idle rotation (disabled if prefers-reduced-motion)
    const idleSpinY = reducedMotion ? 0 : time * 0.12
    const idleSpinX = reducedMotion ? 0 : Math.sin(time * 0.4) * 0.08

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX + idleSpinX,
      3,
      delta
    )
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY + idleSpinY,
      3,
      delta
    )
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      targetRotZ,
      3,
      delta
    )

    // Scale dampening
    const currentScale = groupRef.current.scale.x
    const newScale = THREE.MathUtils.damp(currentScale, targetScale, 3, delta)
    groupRef.current.scale.set(newScale, newScale, newScale)

    // Inner glowing core pulse
    if (coreRef.current) {
      const pulse = 1 + (reducedMotion ? 0 : Math.sin(time * 1.8) * 0.06)
      coreRef.current.scale.set(pulse, pulse, pulse)
      coreRef.current.rotation.y = -time * 0.2
    }

    // Gentle orbital motion for satellite shards
    if (shardsRef.current && !reducedMotion) {
      shardsRef.current.rotation.y = time * 0.08
    }
  })

  return (
    <Float
      speed={reducedMotion ? 0 : 1.4}
      rotationIntensity={reducedMotion ? 0 : 0.3}
      floatIntensity={reducedMotion ? 0 : 0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={groupRef}>
        {/* Main Faceted Ice Crystal */}
        <mesh geometry={mainGeometry} castShadow receiveShadow>
          {isMobile ? (
            // Optimized lightweight physical material for mobile/low-power
            <meshPhysicalMaterial
              color="#dbeafe"
              roughness={0.12}
              metalness={0.1}
              transmission={0.65}
              ior={1.31} // Refractive index of ice
              thickness={1.5}
              flatShading={true}
              reflectivity={0.9}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          ) : (
            // Full glass/ice refraction transmission material for desktop
            <MeshTransmissionMaterial
              backside
              samples={4}
              resolution={512}
              transmission={0.92}
              roughness={0.14}
              ior={1.31}
              thickness={1.8}
              chromaticAberration={0.06}
              anisotropy={0.1}
              distortion={0.0}
              temporalDistortion={0.0}
              color="#e0f2fe"
              attenuationDistance={1.2}
              attenuationColor="#38bdf8"
            />
          )}
        </mesh>

        {/* Inner Glowing Ice Core */}
        <mesh ref={coreRef} geometry={coreGeometry}>
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={1.4}
            roughness={0.2}
            metalness={0.8}
            wireframe={true}
          />
        </mesh>

        {/* Orbiting Satellite Shards */}
        <group ref={shardsRef}>
          {shardPositions.map((pos, idx) => (
            <mesh key={idx} position={pos} geometry={shardGeometry}>
              <meshStandardMaterial
                color="#bae6fd"
                roughness={0.2}
                metalness={0.4}
                flatShading={true}
                transparent={true}
                opacity={0.8}
              />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  )
}
