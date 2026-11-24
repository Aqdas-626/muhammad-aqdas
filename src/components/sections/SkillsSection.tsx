'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { gsap } from '@/lib/gsap'
import { SKILLS_DATA, SkillLevel } from '@/data/skills'
import { Container } from '@/components/ui/Container'
import { RevealLines } from '@/components/motion/RevealLines'
import { CardSpotlight } from '@/components/ui/CardSpotlight'
import { Cpu, Palette, Zap, Wrench } from 'lucide-react'

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Core': Cpu,
  'Animation': Zap,
  '3D Graphics': Palette,
  'Tools & Practices': Wrench,
}

function getBadgeStyle(level: SkillLevel) {
  switch (level) {
    case 'Comfortable':
      return 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300'
    case 'Learning':
      return 'bg-sky-500/15 border-sky-400/40 text-sky-300'
    case 'Exploring':
      return 'bg-purple-500/15 border-purple-400/40 text-purple-300'
  }
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

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
            .fromTo(
              badges,
              { opacity: 0, scale: 0.85 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                stagger: 0.04,
                ease: 'back.out(1.8)',
              },
              '-=0.3'
            )
        })
      }
    }, section)

    return () => {
      ctx.revert()
    }
  }, [])

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
            02 // Skills &amp; Toolkit
          </span>
        </motion.div>

        {/* Section Header (H2) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <RevealLines
            as="h2"
            delay={0.1}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight"
            lines={[
              'What I’m learning',
              <span key="1">
                <span className="bg-gradient-to-r from-sky-200 via-cyan-100 to-white bg-clip-text text-transparent font-normal">
                  and using.
                </span>
              </span>,
            ]}
          />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex items-center gap-3 text-xs font-mono"
          >
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
              Comfortable
            </span>
            <span className="px-2.5 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300">
              Learning
            </span>
            <span className="px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300">
              Exploring
            </span>
          </motion.div>
        </div>

        {/* Skills Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start"
        >
          {SKILLS_DATA.map((cat, idx) => {
            const Icon = CATEGORY_ICONS[cat.category] || Cpu
            return (
              <CardSpotlight
                key={idx}
                className="skill-category-card p-6 sm:p-7 rounded-2xl bg-slate-950/50 border border-sky-400/15 backdrop-blur-xl hover:border-sky-400/40 transition-colors duration-300"
              >
                {/* Category Header (H3) */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sky-400/10">
                  <div className="p-2.5 rounded-xl bg-sky-950/60 border border-sky-400/25 text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
                    <Icon aria-hidden="true" className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-slate-100 tracking-wide">
                    {cat.category}
                  </h3>
                </div>

                {/* Skill Items */}
                <div className="space-y-4">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="skill-row-item p-3 rounded-xl bg-slate-900/40 border border-sky-400/10 hover:border-sky-400/25 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-3 mb-1.5">
                        <span className="text-sm font-medium text-slate-200">
                          {skill.name}
                        </span>
                        <span
                          className={`skill-level-badge text-[10px] font-mono px-2 py-0.5 rounded-full border ${getBadgeStyle(
                            skill.level
                          )}`}
                        >
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardSpotlight>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
