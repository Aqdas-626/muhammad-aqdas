'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { SKILLS_DATA } from '@/data/skills'
import { Container } from '@/components/ui/Container'
import { RevealLines } from '@/components/motion/RevealLines'
import { CardSpotlight } from '@/components/ui/CardSpotlight'
import { Cpu, Palette, Zap, Layers } from 'lucide-react'

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Core Frontend': Cpu,
  '3D & Creative Web': Palette,
  'Animation & Interaction': Zap,
  'Performance & Engineering': Layers,
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    if (!section || !grid) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll<HTMLElement>('.skill-category-card')
      const rows = grid.querySelectorAll<HTMLElement>('.skill-row-item')
      const badges = grid.querySelectorAll<HTMLElement>('.skill-level-badge')

      if (prefersReducedMotion) {
        gsap.fromTo(
          cards,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
              once: true,
            },
          }
        )
      } else {
        // Entrance timeline: Category cards stagger in, rows reveal sequentially, level badges fade in last
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            once: true,
          },
        })

        const schedule =
          typeof window !== 'undefined' && 'requestIdleCallback' in window
            ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 1200 })
            : (cb: () => void) => setTimeout(cb, 100)

        schedule(() => {
          // 1. Cards stagger in (~0.1s apart)
          tl.fromTo(
            cards,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.1,
              ease: 'power3.out',
            }
          )
            // 2. Skill rows reveal sequentially
            .fromTo(
              rows,
              { y: 15, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.05,
                ease: 'power2.out',
              },
              '-=0.45'
            )
            // 3. Level badges fade in last
            .fromTo(
              badges,
              { opacity: 0, scale: 0.85 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                stagger: 0.04,
                ease: 'back.out(1.5)',
              },
              '-=0.3'
            )
        })

        // Light column parallax on desktop (≥768px): ~20px total difference scrubbed
        if (window.innerWidth >= 768 && rightColRef.current) {
          gsap.fromTo(
            rightColRef.current,
            { y: 15 },
            {
              y: -15,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          )
        }
      }
    }, section)

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    const onWindowLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onWindowLoad)
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => ScrollTrigger.refresh())
    }

    return () => {
      window.removeEventListener('load', onWindowLoad)
      clearTimeout(refreshTimer)
      ctx.revert()
    }
  }, [])

  // Split into left (0, 2) and right (1, 3) columns for parallax
  const leftItems = SKILLS_DATA.filter((_, idx) => idx % 2 === 0)
  const rightItems = SKILLS_DATA.filter((_, idx) => idx % 2 !== 0)

  const renderCategoryCard = (category: (typeof SKILLS_DATA)[0]) => {
    const Icon = CATEGORY_ICONS[category.category] || Cpu

    return (
      <CardSpotlight
        key={category.category}
        className="skill-category-card rounded-2xl bg-slate-950/50 border border-sky-400/15 backdrop-blur-xl transition-colors duration-300 hover:border-sky-400/40 hover:shadow-[0_15px_40px_rgba(56,189,248,0.1)] p-6 sm:p-7 will-change-transform"
      >
        {/* Category Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sky-400/10">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-300 group-hover:border-sky-400/50 transition-colors">
            <Icon aria-hidden="true" className="w-4 h-4" />
          </div>
          <h3 className="text-base sm:text-lg font-medium text-white tracking-wide">
            {category.category}
          </h3>
        </div>

        {/* Skill Chips */}
        <div className="space-y-4">
          {category.skills.map((skill) => (
            <div
              key={skill.name}
              className="skill-row-item p-3.5 rounded-xl bg-slate-900/40 border border-white/5 hover:border-sky-400/30 hover:bg-sky-950/20 transition-colors duration-200 will-change-transform"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-slate-100 tracking-wide">
                  {skill.name}
                </span>
                <span className="skill-level-badge text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 will-change-transform">
                  {skill.level}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </CardSpotlight>
    )
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 md:py-32 [isolation:isolate] flex flex-col justify-center select-none pointer-events-none"
    >
      <Container className="pointer-events-auto">
        {/* Section Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/40 border border-sky-400/20 backdrop-blur-md mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-sky-300">
            02 // Skills & Toolkit
          </span>
        </motion.div>

        {/* Section Heading & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <RevealLines
            as="h2"
            delay={0.1}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight"
            lines={[
              'Capabilities forged in',
              <span key="1">
                <span className="bg-gradient-to-r from-sky-200 via-cyan-100 to-white bg-clip-text text-transparent font-normal">
                  precision code.
                </span>
              </span>,
            ]}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-xs sm:text-sm text-slate-400 font-mono tracking-wide max-w-sm"
          >
            Curated technology stack selected for computational speed, aesthetic freedom, and structural integrity.
          </motion.p>
        </div>

        {/* Dual-Column Categorized Skills Grid with Light Column Parallax */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start"
        >
          <div ref={leftColRef} className="flex flex-col gap-6 sm:gap-8">
            {leftItems.map(renderCategoryCard)}
          </div>
          <div ref={rightColRef} className="flex flex-col gap-6 sm:gap-8 will-change-transform">
            {rightItems.map(renderCategoryCard)}
          </div>
        </div>
      </Container>
    </section>
  )
}
