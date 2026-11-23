'use client'

import React from 'react'
import { motion } from 'motion/react'
import { BUILDING_DATA } from '@/data/building'
import { Container } from '@/components/ui/Container'
import { RevealLines } from '@/components/motion/RevealLines'
import { Marquee } from '@/components/motion/Marquee'
import { Stagger } from '@/components/motion/Stagger'
import { CardSpotlight } from '@/components/ui/CardSpotlight'
import { Activity, Radio, Sparkles } from 'lucide-react'

const MARQUEE_TECH_STACK = [
  'Next.js 16',
  'React 19',
  'TypeScript',
  'Three.js',
  'GLSL Shaders',
  'GSAP ScrollTrigger',
  'Lenis Scroll',
  'Motion',
  'Tailwind CSS',
  'WebGL 2.0',
]

export function BuildingSection() {
  const marqueeBadges = MARQUEE_TECH_STACK.map((tech, i) => (
    <div
      key={i}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/70 border border-sky-400/20 text-xs font-mono text-sky-200 shadow-[0_0_15px_rgba(56,189,248,0.1)] hover:border-sky-400/50 hover:bg-sky-950/30 transition-colors cursor-default"
    >
      <Sparkles aria-hidden="true" className="w-3 h-3 text-sky-400" />
      <span>{tech}</span>
    </div>
  ))

  return (
    <section
      id="building"
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
          <Activity aria-hidden="true" className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-sky-300">
            04 {'//'} Currently Building & Exploring
          </span>
        </motion.div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <RevealLines
            as="h2"
            delay={0.1}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight"
            lines={[
              'Laboratory of',
              <span key="1">
                <span className="bg-gradient-to-r from-sky-200 via-cyan-100 to-white bg-clip-text text-transparent font-normal">
                  active research.
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
            A real-time snapshot of technical concepts, prototypes, and specifications currently occupying my workbench.
          </motion.p>
        </div>

        {/* Dynamic Velocity-Driven Infinite Marquee */}
        <div className="mb-14 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 border-y border-sky-400/10 bg-slate-950/30 backdrop-blur-sm">
          <Marquee items={marqueeBadges} duration={26} />
        </div>

        {/* Staggered Cards Grid with Spotlight */}
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8" stagger={0.12} delay={0.1}>
          {BUILDING_DATA.map((item) => (
            <CardSpotlight
              key={item.id}
              className="p-7 rounded-2xl bg-slate-950/50 border border-sky-400/15 backdrop-blur-xl flex flex-col justify-between hover:border-sky-400/40 transition-all duration-300 group hover:shadow-[0_15px_40px_rgba(56,189,248,0.1)]"
            >
              <div>
                {/* Status indicator */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-sky-400/80">
                    {item.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-sky-500/10 border border-sky-400/30 text-sky-300">
                    <Radio className="w-2.5 h-2.5 text-sky-400 animate-pulse" />
                    {item.status}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-medium text-white tracking-tight mb-3 group-hover:text-sky-200 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div>
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-white/5 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Research Phase</span>
                    <span className="text-sky-300">{item.progress}%</span>
                  </div>
                  <div className="w-full h-1 rounded-full bg-slate-900 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-sky-400 to-cyan-300"
                    />
                  </div>
                </div>
              </div>
            </CardSpotlight>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
