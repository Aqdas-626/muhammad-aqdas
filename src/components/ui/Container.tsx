import React from 'react'
import { cn } from '@/lib/utils'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

/**
 * Standardized layout container enforcing a single shared left edge across
 * the entire portfolio (Navbar, Hero, About, Skills, Work, Building, Experience, Contact, Footer).
 *
 * Rules:
 * - max-w-[1280px] centered via mx-auto
 * - Responsive horizontal padding: px-6 (mobile), md:px-10 (tablet), lg:px-16 (desktop)
 */
export function Container({
  children,
  className,
  as: Component = 'div',
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn('mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-16', className)}
      {...props}
    >
      {children}
    </Component>
  )
}
