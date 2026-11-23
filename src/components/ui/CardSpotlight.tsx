'use client'

import React, { useRef, useCallback } from 'react'

interface CardSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  radius?: number
  color?: string
}

/**
 * Glass card container with cursor-following radial spotlight glow.
 * Throttles pointer moves with requestAnimationFrame and updates CSS variables only.
 * Caches element bounds on enter to prevent forced reflows.
 */
export function CardSpotlight({
  children,
  className = '',
  radius = 360,
  color = 'rgba(56, 189, 248, 0.12)',
  ...rest
}: CardSpotlightProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rectRef = useRef<DOMRect | null>(null)
  const rafRef = useRef<number | null>(null)

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect()
    }
  }

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const clientX = e.clientX
    const clientY = e.clientY

    if (rafRef.current) return

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      if (!cardRef.current) return
      if (!rectRef.current) {
        rectRef.current = cardRef.current.getBoundingClientRect()
      }
      const x = clientX - rectRef.current.left
      const y = clientY - rectRef.current.top
      cardRef.current.style.setProperty('--mx', `${x}px`)
      cardRef.current.style.setProperty('--my', `${y}px`)
    })
  }, [])

  const handleMouseLeave = () => {
    rectRef.current = null
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group/spotlight relative ${className}`}
      {...rest}
    >
      {/* Cursor spotlight overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100 z-10"
        style={{
          background: `radial-gradient(${radius}px circle at var(--mx, 50%) var(--my, 50%), ${color}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  )
}
