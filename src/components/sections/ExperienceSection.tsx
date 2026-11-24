'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { gsap } from '@/lib/gsap'
import { LEARNING_JOURNEY_DATA } from '@/data/experience'
import { Container } from '@/components/ui/Container'
import { RevealLines } from '@/components/motion/RevealLines'
import { CardSpotlight } from '@/components/ui/CardSpotlight'
import { Calendar } from 'lucide-react'

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let ctx: gsap.Context | null = null

    const initAnimation = () => {
      ctx = gsap.context(() => {
        // 1. Timeline vertical line scaleY scrub
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
    }

    const schedule =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 1500 })
        : (cb: () => void) => setTimeout(cb, 100)

    const handle = schedule(initAnimation)

    return () => {
      if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(handle as number)
      } else {
        clearTimeout(handle as unknown as NodeJS.Timeout)
      }
      ctx?.revert()
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
          <Calendar aria-hidden="true" className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-sky-300">
            05 // Learning Journey
          </span>
        </motion.div>

        {/* Section Header (H2) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-20">
          <RevealLines
            as="h2"
            delay={0.1}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight"
            lines={[
              'Learning',
              <span key="1">
                <span className="bg-gradient-to-r from-sky-200 via-cyan-100 to-white bg-clip-text text-transparent font-normal">
                  journey.
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
            A timeline of how I started and what I have learned so far.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="timeline-container relative max-w-4xl mx-auto">
          {/* Vertical scrubbed guide line */}
          <div
            ref={timelineLineRef}
            className="absolute left-4 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-sky-400/60 via-cyan-400/30 to-sky-400/0 origin-top -translate-x-1/2 pointer-events-none"
          />

          <div className="space-y-12">
            {LEARNING_JOURNEY_DATA.map((milestone, idx) => {
              const isOdd = idx % 2 === 0
              return (
                <div
                  key={idx}
                  className={`timeline-item relative flex flex-col md:flex-row items-start ${
                    isOdd ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Dot */}
                  <div className="timeline-node-dot absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-sky-400/60 transition-all duration-500 z-10 top-6" />

                  {/* Card Content Column */}
                  <div
                    className={`timeline-card w-full pl-12 md:pl-0 ${
                      isOdd ? 'md:pr-14 md:text-right' : 'md:pl-14 md:text-left'
                    } md:w-1/2`}
                  >
                    <CardSpotlight className="p-6 sm:p-7 rounded-2xl bg-slate-950/50 border border-sky-400/15 backdrop-blur-xl hover:border-sky-400/40 transition-colors">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/40 border border-sky-400/20 text-[11px] font-mono text-sky-300 mb-3`}
                      >
                        <Calendar aria-hidden="true" className="w-3 h-3 text-sky-400" />
                        <span>{milestone.year}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-medium text-white mb-2">
                        {milestone.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                        {milestone.description}
                      </p>
                    </CardSpotlight>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
