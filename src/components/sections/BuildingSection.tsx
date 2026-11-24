'use client'

import React from 'react'
import { motion } from 'motion/react'
import { CURRENTLY_LEARNING_TOPICS } from '@/data/building'
import { Container } from '@/components/ui/Container'
import { RevealLines } from '@/components/motion/RevealLines'
import { Marquee } from '@/components/motion/Marquee'
import { Stagger } from '@/components/motion/Stagger'
import { CardSpotlight } from '@/components/ui/CardSpotlight'
import { BookOpen, Sparkles } from 'lucide-react'

const HONEST_PRACTICE_STACK = [
  'HTML & CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Tailwind CSS',
  'Three.js',
  'GSAP',
  'Git & GitHub',
]

export function BuildingSection() {
  const marqueeBadges = HONEST_PRACTICE_STACK.map((tech, i) => (
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
          <BookOpen aria-hidden="true" className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-sky-300">
            04 // Currently Learning
          </span>
        </motion.div>

        {/* Section Header (H2) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <RevealLines
            as="h2"
            delay={0.1}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight"
            lines={[
              'Currently',
              <span key="1">
                <span className="bg-gradient-to-r from-sky-200 via-cyan-100 to-white bg-clip-text text-transparent font-normal">
                  learning.
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
            A snapshot of the core technologies and concepts I am actively practising every day.
          </motion.p>
        </div>

        {/* Practice Stack Marquee */}
        <div className="mb-14 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 border-y border-sky-400/10 bg-slate-950/30 backdrop-blur-sm">
          <Marquee items={marqueeBadges} duration={28} />
        </div>

        {/* Staggered Topics Grid with Spotlight */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1} delay={0.1}>
          {CURRENTLY_LEARNING_TOPICS.map((item) => (
            <CardSpotlight
              key={item.id}
              className="p-6 rounded-2xl bg-slate-950/50 border border-sky-400/15 backdrop-blur-xl flex flex-col justify-between hover:border-sky-400/40 transition-all duration-300 group hover:shadow-[0_15px_40px_rgba(56,189,248,0.1)]"
            >
              <div>
                <div className="mb-4">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-sky-400/80">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-lg font-medium text-white tracking-wide mb-3 group-hover:text-sky-200 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300/90 font-light leading-relaxed mb-6">
                  {item.sentence}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-sky-400/10">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950/40 text-sky-300/80 border border-sky-400/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardSpotlight>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
