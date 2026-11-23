'use client'

import React, { useEffect, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useSmoothScroll } from '@/providers/SmoothScrollProvider'

interface SectionItem {
  id: string
  label: string
}

const SECTIONS: SectionItem[] = [
  { id: 'hero', label: '00 // Overview' },
  { id: 'about', label: '01 // About' },
  { id: 'skills', label: '02 // Skills' },
  { id: 'work', label: '03 // Work' },
  { id: 'building', label: '04 // Building' },
  { id: 'experience', label: '05 // Experience' },
  { id: 'contact', label: '06 // Contact' },
]

export function SectionIndicator() {
  const [mounted, setMounted] = useState(false)
  const [activeId, setActiveId] = useState<string>('hero')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    setMounted(true)
    const ctx = gsap.context(() => {
      SECTIONS.forEach((sec) => {
        const el = document.getElementById(sec.id)
        if (!el) return

        ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onEnter: () => setActiveId(sec.id),
          onEnterBack: () => setActiveId(sec.id),
        })
      })
    })

    return () => {
      ctx.revert()
    }
  }, [])

  if (!mounted) return null

  const handleClick = (id: string) => {
    scrollTo(`#${id}`, { duration: 1.4 })
  }

  return (
    <aside
      aria-label="Section navigation"
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 select-none pointer-events-auto"
    >
      {SECTIONS.map((sec) => {
        const isActive = activeId === sec.id
        const isHovered = hoveredId === sec.id

        return (
          <div
            key={sec.id}
            className="group relative flex items-center justify-end"
            onMouseEnter={() => setHoveredId(sec.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Tooltip Label on Hover */}
            <div
              className={`absolute right-6 px-2.5 py-1 rounded bg-slate-950/90 border border-sky-400/30 text-[10px] font-mono tracking-wider text-sky-200 backdrop-blur-md shadow-[0_0_12px_rgba(56,189,248,0.25)] whitespace-nowrap pointer-events-none transition-all duration-200 ${
                isHovered
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-2'
              }`}
            >
              {sec.label}
            </div>

            {/* Clickable Dot */}
            <button
              onClick={() => handleClick(sec.id)}
              aria-label={`Scroll to ${sec.label}`}
              className="relative p-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 rounded-full"
            >
              <span
                className={`block transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-2 h-5 bg-sky-400 shadow-[0_0_10px_#38bdf8]'
                    : 'w-1.5 h-1.5 bg-slate-600 hover:bg-sky-400/80 hover:scale-125'
                }`}
              />
            </button>
          </div>
        )
      })}
    </aside>
  )
}
