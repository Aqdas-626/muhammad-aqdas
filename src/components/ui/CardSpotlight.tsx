'use client'

import React, { useRef } from 'react'

interface CardSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  radius?: number
  color?: string
}

/**
 * Glass card container with cursor-following radial spotlight glow.
 * Updates CSS variables (--mx, --my) without React re-render overhead.
 */
export function CardSpotlight({
  children,
  className = '',
  radius = 360,
  color = 'rgba(56, 189, 248, 0.12)',
  ...rest
}: CardSpotlightProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--mx', `${x}px`)
    cardRef.current.style.setProperty('--my', `${y}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
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
