'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { gsap } from '@/lib/gsap'
import { EXPERIENCE_DATA } from '@/data/experience'
import { Container } from '@/components/ui/Container'
import { RevealLines } from '@/components/motion/RevealLines'
import { CardSpotlight } from '@/components/ui/CardSpotlight'
import { Calendar, CheckCircle2 } from 'lucide-react'

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // 1. Timeline line scaleY scrub
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section.querySelector('.timeline-container'),
              start: 'top 75%',
              end: 'bottom 60%',
              scrub: true,
            },
          }
        )
      }

      // 2. Timeline nodes and cards reveal
      const items = section.querySelectorAll<HTMLElement>('.timeline-item')
      items.forEach((item, idx) => {
        const nodeDot = item.querySelector<HTMLElement>('.timeline-node-dot')
        const card = item.querySelector<HTMLElement>('.timeline-card')
        const isOdd = idx % 2 === 0
        const isDesktop = window.innerWidth >= 768

        if (prefersReducedMotion) {
          gsap.from([nodeDot, card], {
            opacity: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              once: true,
            },
          })
        } else {
          // Slide in from alternate sides on desktop (x: -40 for left, 40 for right)
          const startX = isDesktop ? (isOdd ? -40 : 40) : 30

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              once: true,
              onEnter: () => {
                if (nodeDot) {
                  nodeDot.classList.add('bg-sky-400', 'border-white', 'shadow-[0_0_18px_#38bdf8]')
                }
              },
            },
          })

          tl.from(nodeDot, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'back.out(2)',
          }).from(
            card,
            {
              x: startX,
              opacity: 0,
              duration: 0.75,
              ease: 'power3.out',
            },
            '-=0.3'
          )
        }
      })
    }, section)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="experience"
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
            05 // Experience & Evolution
          </span>
        </motion.div>

        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <RevealLines
            as="h2"
            delay={0.1}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight"
            lines={[
              'Engineering path &',
              <span key="1">
                <span className="bg-gradient-to-r from-sky-200 via-cyan-100 to-white bg-clip-text text-transparent font-normal">
                  technical milestones.
                </span>
              </span>,
            ]}
          />
          <p className="mt-4 text-xs sm:text-sm text-slate-400 font-mono tracking-wide">
            An honest chronology of self-directed technical mastery, architectural exploration, and frontend craft.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="timeline-container relative pl-8 md:pl-0 space-y-12 sm:space-y-16">
          {/* Static Track Line */}
          <div className="absolute left-3.5 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-slate-800/80 rounded-full" />

          {/* Animated Scroll-Filling Progress Line */}
          <div
            ref={timelineLineRef}
            className="absolute left-3.5 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-sky-400 via-cyan-300 to-white origin-top shadow-[0_0_12px_rgba(56,189,248,0.8)] rounded-full will-change-transform"
          />

          {/* Timeline Milestones (Desktop: alternating left / right; Mobile: single column) */}
          {EXPERIENCE_DATA.map((item, idx) => {
            const isOdd = idx % 2 === 0

            return (
              <div
                key={idx}
                className={`timeline-item relative flex flex-col md:flex-row items-center w-full ${
                  isOdd ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                {/* Node dot on the timeline */}
                <div className="timeline-node-dot absolute -left-[27px] md:left-1/2 md:-translate-x-1/2 top-6 w-4 h-4 rounded-full bg-slate-950 border-2 border-sky-400 transition-all duration-500 flex items-center justify-center z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                {/* Milestone Card */}
                <div
                  className={`timeline-card w-full md:w-[calc(50%-2rem)] ${
                    isOdd ? 'md:pr-4' : 'md:pl-4'
                  }`}
                >
                  <CardSpotlight className="p-7 sm:p-8 rounded-2xl bg-slate-950/50 border border-sky-400/15 backdrop-blur-xl hover:border-sky-400/40 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
                    {/* Period badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/25 text-[10px] font-mono text-sky-300 mb-4">
                      <Calendar className="w-3 h-3 text-sky-400" />
                      <span>{item.period}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight">
                      {item.title}
                    </h3>
                    <h4 className="text-sm font-mono text-sky-400/80 mb-4">
                      {item.area}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Highlights bullets */}
                    <div className="space-y-2">
                      {item.highlights.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-400 font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </CardSpotlight>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
