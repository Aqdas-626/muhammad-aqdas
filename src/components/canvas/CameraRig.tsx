'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { gsap } from '@/lib/gsap'
import { CAMERA_KEYFRAMES } from '@/data/cameraKeyframes'

interface CameraRigProps {
  reducedMotion?: boolean
  crystalStateRef?: React.MutableRefObject<{
    rotX: number
    rotY: number
    rotZ: number
    scale: number
  }>
}

export function CameraRig({ reducedMotion = false, crystalStateRef }: CameraRigProps) {
  const { camera, scene } = useThree()

  // Track target LookAt vector for smooth damping
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0))

  // Mutable animated state object for GSAP timeline
  const rigState = useRef({
    camX: CAMERA_KEYFRAMES[0].position[0],
    camY: CAMERA_KEYFRAMES[0].position[1],
    camZ: CAMERA_KEYFRAMES[0].position[2],
    targetX: CAMERA_KEYFRAMES[0].target[0],
    targetY: CAMERA_KEYFRAMES[0].target[1],
    targetZ: CAMERA_KEYFRAMES[0].target[2],
    rotX: CAMERA_KEYFRAMES[0].crystalRotation[0],
    rotY: CAMERA_KEYFRAMES[0].crystalRotation[1],
    rotZ: CAMERA_KEYFRAMES[0].crystalRotation[2],
    scale: CAMERA_KEYFRAMES[0].crystalScale,
    fogDensity: CAMERA_KEYFRAMES[0].fogDensity,
  })

  useEffect(() => {
    // Wait for client mount and DOM layout
    const ctx = gsap.context(() => {
      // Build master GSAP timeline scrubbed across the scrollable page
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#scroll-root',
          start: 'top top',
          end: 'bottom bottom',
          scrub: reducedMotion ? false : 1.2,
          invalidateOnRefresh: true,
        },
      })

      // Chain through the 8 camera keyframes in strict sequence
      for (let i = 1; i < CAMERA_KEYFRAMES.length; i++) {
        const kf = CAMERA_KEYFRAMES[i]
        tl.to(
          rigState.current,
          {
            camX: kf.position[0],
            camY: kf.position[1],
            camZ: kf.position[2],
            targetX: kf.target[0],
            targetY: kf.target[1],
            targetZ: kf.target[2],
            rotX: kf.crystalRotation[0],
            rotY: kf.crystalRotation[1],
            rotZ: kf.crystalRotation[2],
            scale: kf.crystalScale,
            fogDensity: kf.fogDensity,
            ease: 'power1.inOut',
            duration: 1,
          },
          `step-${i}`
        )
      }
    })

    return () => {
      ctx.revert()
    }
  }, [reducedMotion])

  useFrame((state, delta) => {
    const pointer = state.pointer

    // Gentle damped mouse parallax (disabled if reduced-motion)
    const parallaxFactorX = reducedMotion ? 0 : 0.4
    const parallaxFactorY = reducedMotion ? 0 : 0.25

    const desiredCamX = rigState.current.camX + pointer.x * parallaxFactorX
    const desiredCamY = rigState.current.camY + pointer.y * parallaxFactorY
    const desiredCamZ = rigState.current.camZ

    // Damp camera position
    camera.position.x = THREE.MathUtils.damp(camera.position.x, desiredCamX, 2.5, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, desiredCamY, 2.5, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, desiredCamZ, 2.5, delta)

    // Damp camera lookAt target
    targetLookAt.current.set(
      rigState.current.targetX,
      rigState.current.targetY,
      rigState.current.targetZ
    )

    currentLookAt.current.x = THREE.MathUtils.damp(
      currentLookAt.current.x,
      targetLookAt.current.x,
      3,
      delta
    )
    currentLookAt.current.y = THREE.MathUtils.damp(
      currentLookAt.current.y,
      targetLookAt.current.y,
      3,
      delta
    )
    currentLookAt.current.z = THREE.MathUtils.damp(
      currentLookAt.current.z,
      targetLookAt.current.z,
      3,
      delta
    )

    camera.lookAt(currentLookAt.current)

    // Forward crystal values to crystal ref
    if (crystalStateRef?.current) {
      crystalStateRef.current.rotX = rigState.current.rotX
      crystalStateRef.current.rotY = rigState.current.rotY
      crystalStateRef.current.rotZ = rigState.current.rotZ
      crystalStateRef.current.scale = rigState.current.scale
    }

    // Dynamic fog density update
    if (scene.fog && 'density' in scene.fog) {
      ;(scene.fog as THREE.FogExp2).density = THREE.MathUtils.damp(
        (scene.fog as THREE.FogExp2).density,
        rigState.current.fogDensity,
        2,
        delta
      )
    }
  })

  return null
}
