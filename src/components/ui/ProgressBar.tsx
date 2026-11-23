'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

export function ProgressBar() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 via-cyan-300 to-white origin-left z-40 pointer-events-none shadow-[0_0_10px_rgba(56,189,248,0.7)]"
    />
  )
}
