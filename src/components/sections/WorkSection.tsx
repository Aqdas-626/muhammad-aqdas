'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { gsap } from '@/lib/gsap'
import { FEATURED_PROJECT, PLANNED_PROJECTS } from '@/data/projects'
import { Container } from '@/components/ui/Container'
import { RevealLines } from '@/components/motion/RevealLines'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '@/components/ui/Icons'
import { CardSpotlight } from '@/components/ui/CardSpotlight'

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const rectRef = useRef<DOMRect | null>(null)
  const rafRef = useRef<number | null>(null)

  const handleMouseEnter = () => {
    if (frameRef.current) {
      rectRef.current = frameRef.current.getBoundingClientRect()
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return
    const clientX = e.clientX
    const clientY = e.clientY

    if (rafRef.current) return

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      if (!frameRef.current) return
      if (!rectRef.current) {
        rectRef.current = frameRef.current.getBoundingClientRect()
      }
      const x = clientX - rectRef.current.left
      const y = clientY - rectRef.current.top
      frameRef.current.style.setProperty('--mx', `${x}px`)
      frameRef.current.style.setProperty('--my', `${y}px`)
    })
  }

  const handleMouseLeave = () => {
    rectRef.current = null
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const featuredCard = section.querySelector('.featured-project-row')
      const plannedCards = section.querySelectorAll('.planned-project-card')

      if (featuredCard) {
        gsap.fromTo(
          featuredCard,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuredCard,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }

      if (plannedCards.length > 0) {
        gsap.fromTo(
          plannedCards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section.querySelector('.planned-projects-container'),
              start: 'top 85%',
              once: true,
            },
          }
        )
      }
    }, section)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 [isolation:isolate] flex flex-col justify-center select-none pointer-events-none"
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
            03 // Featured Work
          </span>
        </motion.div>

        {/* Section Header (H2) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <RevealLines
            as="h2"
            delay={0.1}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight"
            lines={[
              'My first',
              <span key="1">
                <span className="bg-gradient-to-r from-sky-200 via-cyan-100 to-white bg-clip-text text-transparent font-normal">
                  project.
                </span>
              </span>,
            ]}
          />

          <a
            href={FEATURED_PROJECT.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Muhammad Aqdas projects on GitHub"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-sky-400 hover:text-sky-300 transition-colors w-fit pb-1"
          >
            <span>View all on GitHub</span>
            <ArrowUpRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* =========================================================================
            FEATURED PROJECT (One Real Card: 12-column desktop row)
            ========================================================================= */}
        <div className="featured-project-row grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center w-full min-w-0 mb-20">
          {/* Image Column (col-span-7) */}
          <div className="lg:col-span-7 w-full min-w-0">
            <div
              ref={frameRef}
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="group/frame relative rounded-xl border border-sky-400/20 bg-slate-950/70 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:border-sky-400/40 hover:-translate-y-1 transition-transform duration-500 ease-out"
            >
              <div className="absolute -inset-4 bg-sky-500/10 rounded-2xl blur-2xl pointer-events-none -z-10 group-hover/frame:bg-sky-400/20 transition-all duration-700" />
              <div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover/frame:opacity-100 z-10"
                style={{
                  background:
                    'radial-gradient(450px circle at var(--mx, 50%) var(--my, 50%), rgba(56, 189, 248, 0.14), transparent 70%)',
                }}
              />

              {/* Slim browser-window top bar */}
              <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 border-b border-sky-400/15 bg-slate-900/75 rounded-t-xl select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60 border border-rose-400/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60 border border-amber-400/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60 border border-emerald-400/40" />
                </div>
                <div className="flex-1 max-w-[220px] sm:max-w-xs mx-3">
                  <div className="px-3 py-0.5 rounded-full bg-slate-950/80 border border-sky-400/20 text-center text-[10px] sm:text-xs font-mono text-sky-300/80 truncate">
                    {FEATURED_PROJECT.browserUrl}
                  </div>
                </div>
                <div className="w-9" />
              </div>

              {/* Project Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-b-xl bg-slate-950">
                <Image
                  src={FEATURED_PROJECT.image.src}
                  alt={FEATURED_PROJECT.image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover/frame:scale-[1.02]"
                />
              </div>
            </div>
          </div>

          {/* Text Column (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5 w-full min-w-0">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-wider text-sky-400 uppercase">
                Featured Project · 2026
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                {FEATURED_PROJECT.title}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              {FEATURED_PROJECT.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 pt-1">
              {FEATURED_PROJECT.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-mono text-sky-200 bg-sky-950/50 border border-sky-400/20 shadow-[0_0_10px_rgba(56,189,248,0.1)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={FEATURED_PROJECT.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live deployment for ${FEATURED_PROJECT.title}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-wider text-slate-950 font-semibold bg-gradient-to-r from-sky-300 to-white hover:from-white hover:to-sky-300 transition-transform duration-300 shadow-[0_0_18px_rgba(56,189,248,0.3)] hover:scale-105 active:scale-95"
              >
                <span>View live</span>
                <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
              </a>

              <a
                href={FEATURED_PROJECT.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code on GitHub for ${FEATURED_PROJECT.title}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono tracking-wider text-slate-300 hover:text-white bg-slate-900/60 border border-sky-400/20 hover:border-sky-400/50 transition-colors"
              >
                <GithubIcon aria-hidden="true" className="w-3.5 h-3.5" />
                <span>Source code</span>
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PLANNED NEXT ROW (Two plain text cards clearly labelled "Planned")
            ========================================================================= */}
        <div className="planned-projects-container mt-16 pt-12 border-t border-sky-400/10">
          <div className="mb-8">
            <span className="text-xs font-mono tracking-widest uppercase text-sky-400">
              Up Next // Planned Projects
            </span>
            <h3 className="text-xl sm:text-2xl font-light text-slate-200 mt-1">
              Planned next for practice
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PLANNED_PROJECTS.map((planned) => (
              <CardSpotlight
                key={planned.id}
                className="planned-project-card p-6 rounded-2xl bg-slate-950/40 border border-sky-400/15 backdrop-blur-xl hover:border-sky-400/35 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-amber-500/15 border border-amber-400/30 text-amber-300 mb-3">
                    Planned
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-white mb-2">
                    {planned.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mb-4">
                    {planned.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-sky-400/10">
                  {planned.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-slate-300 bg-slate-900 border border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardSpotlight>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
