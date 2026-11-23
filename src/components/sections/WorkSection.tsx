'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { PROJECTS_DATA, type Project } from '@/data/projects'
import { PERSONAL_INFO } from '@/data/constants'
import { Container } from '@/components/ui/Container'
import { RevealLines } from '@/components/motion/RevealLines'
import { ArrowUpRight, Clock } from 'lucide-react'
import { GithubIcon } from '@/components/ui/Icons'

/**
 * Single project row component rendering:
 * - Desktop: 12-column grid with alternating image (col-span-7) and text (col-span-5)
 * - Mobile / Tablet: Single-column stack with image first, text second
 */
function ProjectRow({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const isOdd = index % 2 === 0 // Projects 1 and 3: image left; Project 2: image right

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return
    const rect = frameRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    frameRef.current.style.setProperty('--mx', `${x}px`)
    frameRef.current.style.setProperty('--my', `${y}px`)
  }

  return (
    <div className="project-row grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center w-full min-w-0">
      {/* =========================================================================
          IMAGE COLUMN (Desktop: 7 cols, Alternating order; Mobile: order-1)
          ========================================================================= */}
      <div
        className={`project-image-col w-full min-w-0 order-1 ${
          isOdd ? 'lg:col-span-7 lg:order-1' : 'lg:col-span-7 lg:order-2'
        }`}
      >
        <div
          ref={frameRef}
          onMouseMove={handleMouseMove}
          className="group/frame relative rounded-xl border border-sky-400/20 bg-slate-950/70 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:border-sky-400/40 hover:-translate-y-1 transition-all duration-500 ease-out"
        >
          {/* Soft ambient radial glow behind frame */}
          <div className="absolute -inset-4 bg-sky-500/10 rounded-2xl blur-2xl pointer-events-none -z-10 group-hover/frame:bg-sky-400/20 transition-all duration-700" />

          {/* Dynamic cursor-following spotlight */}
          <div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover/frame:opacity-100 z-10"
            style={{
              background:
                'radial-gradient(450px circle at var(--mx, 50%) var(--my, 50%), rgba(56, 189, 248, 0.14), transparent 70%)',
            }}
          />

          {/* Slim browser-window top bar */}
          <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 border-b border-sky-400/15 bg-slate-900/75 rounded-t-xl select-none">
            {/* 3 control dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60 border border-rose-400/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60 border border-amber-400/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60 border border-emerald-400/40" />
            </div>

            {/* Pill-shaped address bar */}
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-slate-950/85 border border-sky-400/15 text-[11px] font-mono text-slate-300 max-w-[200px] sm:max-w-[280px] truncate shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80 shrink-0 shadow-[0_0_4px_#38bdf8]" />
              <span className="truncate">{project.browserUrl || 'localhost:3000'}</span>
            </div>

            {/* SSL Indicator */}
            <div className="w-10 flex justify-end">
              <span className="text-[10px] font-mono text-sky-400/60 tracking-wider">SSL</span>
            </div>
          </div>

          {/* Browser viewport area with 16:10 aspect ratio */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-b-xl bg-slate-950">
            {/* Parallax layer wrapper (driven by GSAP yPercent) */}
            <div className="project-parallax-img relative w-full h-[112%] -top-[6%] will-change-transform">
              {/* Zoom wrapper (driven by CSS transition on frame hover) */}
              <div className="w-full h-full transition-transform duration-700 ease-out group-hover/frame:scale-[1.03]">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  height={project.image.height}
                  priority={index === 0}
                  loading={index === 0 ? undefined : 'lazy'}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiMwMzBkNGUiLz48L3N2Zz4="
                  className="w-full h-full object-cover select-none"
                />
              </div>
            </div>

            {/* Subtle bottom reflection overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none z-10" />

            {/* Floating "View project" pill on hover (if live link exists) */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/frame:opacity-100 transition-all duration-300 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/90 border border-sky-400/40 text-xs font-mono text-sky-200 shadow-[0_0_25px_rgba(56,189,248,0.35)] backdrop-blur-md hover:scale-105 pointer-events-auto"
              >
                <span>View project</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          TEXT COLUMN (Desktop: 5 cols, Alternating order; Mobile: order-2)
          ========================================================================= */}
      <div
        className={`project-text-col relative min-w-0 flex flex-col justify-center order-2 ${
          isOdd ? 'lg:col-span-5 lg:order-2' : 'lg:col-span-5 lg:order-1'
        }`}
      >
        {/* Faint outlined watermark index number (drifts slightly slower with parallax) */}
        <span
          aria-hidden="true"
          className="project-watermark select-none pointer-events-none font-mono font-black text-7xl sm:text-8xl lg:text-9xl text-slate-800/20 absolute -top-10 sm:-top-14 -left-3 sm:-left-5 -z-10 tracking-tighter leading-none will-change-transform"
        >
          0{index + 1}
        </span>

        {/* Row 1: Index + status badge */}
        <div className="project-text-row relative z-10 flex items-center justify-between gap-3 mb-3">
          <span className="text-xs font-mono tracking-widest uppercase text-sky-400/80">
            0{index + 1} {'//'} {project.type}
          </span>

          {project.isPlaceholder ? (
            <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-[10px] font-mono text-slate-400 uppercase tracking-wider whitespace-nowrap">
              <Clock className="w-3 h-3 text-sky-400/70" />
              COMING SOON
            </span>
          ) : (
            <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-[10px] font-mono text-sky-300 uppercase tracking-wider whitespace-nowrap shadow-[0_0_10px_rgba(56,189,248,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              LIVE
            </span>
          )}
        </div>

        {/* Row 2: Title */}
        <h3 className="project-text-row relative z-10 text-[clamp(1.5rem,2.2vw,2.25rem)] font-light text-white tracking-tight leading-tight mb-3">
          {project.title}
        </h3>

        {/* Row 3: Short paragraph description (max 3 lines) */}
        <p className="project-text-row relative z-10 text-sm sm:text-base text-slate-300 font-light leading-relaxed line-clamp-3 mb-5">
          {project.description}
        </p>

        {/* Row 4: Technologies as small mono pills (pop in with 0.04s stagger) */}
        <div className="project-text-row project-tech-pills relative z-10 flex flex-wrap gap-1.5 sm:gap-2 mb-6">
          {project.techStack.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="tech-pill px-2.5 py-1 rounded text-[11px] font-mono tracking-wider bg-slate-900/80 border border-sky-400/15 text-slate-300 hover:border-sky-400/40 transition-colors will-change-transform"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Row 5: Links row */}
        <div className="project-text-row relative z-10 flex items-center gap-4 text-xs font-mono pt-3 border-t border-sky-400/10">
          {!project.isPlaceholder ? (
            <>
              <a
                href={project.liveUrl || '#hero'}
                className="inline-flex items-center gap-1.5 text-sky-300 hover:text-white font-medium transition-colors group/link py-1"
              >
                <span>View live</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 text-sky-400" />
              </a>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Source on GitHub"
                  className="p-1.5 rounded-lg bg-slate-900 border border-sky-400/20 text-slate-300 hover:text-sky-300 hover:border-sky-400/50 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
            </>
          ) : (
            <div className="inline-flex items-center gap-2 text-slate-500 italic py-1">
              <Clock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span>In progress</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function WorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const rowElements = sectionRef.current?.querySelectorAll<HTMLElement>('.project-row')
      if (!rowElements) return

      rowElements.forEach((row, idx) => {
        const isOdd = idx % 2 === 0
        const imageCol = row.querySelector('.project-image-col')
        const textRows = row.querySelectorAll('.project-text-row')
        const pills = row.querySelectorAll('.tech-pill')
        const parallaxImg = row.querySelector('.project-parallax-img')
        const watermark = row.querySelector('.project-watermark')

        if (prefersReducedMotion) {
          gsap.from([imageCol, ...Array.from(textRows)], {
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              once: true,
            },
          })
        } else {
          // Slide in image from its side (x: ±48)
          const isDesktop = window.innerWidth >= 1024
          const imageStartX = isDesktop ? (isOdd ? -48 : 48) : -36

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
              once: true,
            },
          })

          tl.from(imageCol, {
            x: imageStartX,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out',
          })
            .from(
              textRows,
              {
                y: 25,
                opacity: 0,
                duration: 0.7,
                stagger: 0.08,
                ease: 'power3.out',
              },
              '-=0.6'
            )
            .from(
              pills,
              {
                scale: 0.85,
                opacity: 0,
                duration: 0.35,
                stagger: 0.04,
                ease: 'back.out(1.5)',
              },
              '-=0.3'
            )

          // Inner image parallax (~6% opposite movement)
          if (parallaxImg) {
            gsap.fromTo(
              parallaxImg,
              { yPercent: -6 },
              {
                yPercent: 6,
                ease: 'none',
                scrollTrigger: {
                  trigger: row,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            )
          }

          // Large watermark index drifts slightly slower than foreground content
          if (watermark) {
            gsap.fromTo(
              watermark,
              { y: -20 },
              {
                y: 20,
                ease: 'none',
                scrollTrigger: {
                  trigger: row,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            )
          }
        }
      })
    }, sectionRef)

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    const onWindowLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onWindowLoad)
    if (typeof document !== 'undefined') {
      document.fonts.ready.then(() => ScrollTrigger.refresh())
    }

    return () => {
      window.removeEventListener('load', onWindowLoad)
      clearTimeout(refreshTimer)
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 [isolation:isolate] select-none"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 sm:mb-20">
          <div>
            {/* Eyebrow: slides in 0.1s before heading */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/40 border border-sky-400/20 backdrop-blur-md mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-sky-300">
                03 {'//'} Featured Work
              </span>
            </motion.div>

            <RevealLines
              as="h2"
              delay={0.1}
              className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight"
              lines={[
                'Selected systems &',
                <span key="1">
                  <span className="bg-gradient-to-r from-sky-200 via-cyan-100 to-white bg-clip-text text-transparent font-normal">
                    creative experiments.
                  </span>
                </span>,
              ]}
            />
          </div>

          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-sky-300/80 hover:text-sky-200 transition-colors shrink-0 group py-1"
          >
            <span>View all on GitHub</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Vertical list of rows */}
        <div className="flex flex-col gap-20 md:gap-28 w-full min-w-0">
          {PROJECTS_DATA.map((project, idx) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={idx}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
