'use client'

import React, { useEffect, useRef } from 'react'
import { motion, type Variants } from 'motion/react'
import { gsap } from '@/lib/gsap'
import { useSmoothScroll } from '@/providers/SmoothScrollProvider'
import { Container } from '@/components/ui/Container'
import { Magnetic } from '@/components/motion/Magnetic'
import { Sparkles } from 'lucide-react'

export function HeroSection() {
  const { scrollTo } = useSmoothScroll()
  const sectionRef = useRef<HTMLElement>(null)
  const scrollExitRef = useRef<HTMLDivElement>(null)
  const ctaExitRef = useRef<HTMLDivElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)

  const handleScrollTo = (id: string) => {
    scrollTo(`#${id}`, { offset: 0, duration: 1.4 })
  }

  // Initial typography entrance variants (Motion)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  }

  // Scroll-driven exit parallax & scrubbed fadeouts
  useEffect(() => {
    const section = sectionRef.current
    const scrollExit = scrollExitRef.current
    if (!section || !scrollExit) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // 1. Hero text moves up slowly and fades as user scrolls away
      // Uses fromTo with explicit start { opacity: 1, y: 0 } so it never starts or locks at 0
      gsap.fromTo(
        scrollExit,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -90,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '65% top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      )

      // 2. CTA buttons fade out first
      if (ctaExitRef.current) {
        gsap.fromTo(
          ctaExitRef.current,
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: '30% top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        )
      }

      // 3. Scroll cue fades out after first 5-10% of scroll
      if (scrollCueRef.current) {
        gsap.fromTo(
          scrollCueRef.current,
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: '12% top',
              scrub: true,
              invalidateOnRefresh: true,
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
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-screen pt-32 pb-16 [isolation:isolate] flex flex-col justify-between items-center z-10 pointer-events-none select-none"
    >
      <Container className="w-full flex flex-col justify-between items-center flex-1">
        {/* Top spacer */}
        <div />

        {/* Outer Scroll-Exit Container (driven purely by GSAP fromTo) */}
        <div
          ref={scrollExitRef}
          className="w-full max-w-4xl mx-auto my-auto will-change-transform"
        >
          {/* Inner Entrance Animation (driven purely by Motion) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full text-center flex flex-col items-center pointer-events-auto"
          >
            {/* Arctic status pill */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-sky-400/20 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-sky-200">
                Creative Web & 3D Engineering
              </span>
            </motion.div>

            {/* Hero Name with Staggered Glacial Gradient */}
            <motion.div variants={itemVariants} className="overflow-hidden">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.95]">
                <span className="block bg-gradient-to-b from-white via-slate-100 to-sky-200 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(56,189,248,0.25)]">
                  Muhammad
                </span>
                <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-sky-200 via-cyan-100 to-white bg-clip-text text-transparent">
                  Aqdas
                </span>
              </h1>
            </motion.div>

            {/* Role subtitle */}
            <motion.div variants={itemVariants} className="mt-4 sm:mt-6">
              <h2 className="text-lg sm:text-2xl font-mono tracking-[0.25em] text-sky-400 uppercase font-light">
                Frontend Developer
              </h2>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed tracking-wide"
            >
              Crafting fluid digital experiences, interactive web graphics, and modern frontend architectures in a cold, precision-tuned space.
            </motion.p>

            {/* Interactive Call to Actions (with dedicated ctaExitRef) */}
            <motion.div variants={itemVariants} className="mt-10">
              <div
                ref={ctaExitRef}
                className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 will-change-transform"
              >
                <Magnetic strength={0.3}>
                  <button
                    onClick={() => handleScrollTo('work')}
                    className="group relative px-7 py-3.5 rounded-full text-xs sm:text-sm font-mono tracking-widest text-slate-950 font-semibold bg-gradient-to-r from-sky-300 via-cyan-200 to-white hover:from-white hover:to-sky-300 transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] hover:scale-105 active:scale-95"
                  >
                    <span>VIEW WORK</span>
                  </button>
                </Magnetic>

                <Magnetic strength={0.3}>
                  <button
                    onClick={() => handleScrollTo('contact')}
                    className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-mono tracking-widest text-slate-200 font-medium bg-slate-950/50 border border-sky-400/25 hover:border-sky-400/70 hover:bg-sky-500/10 transition-all duration-300 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95"
                  >
                    <span>CONTACT ME</span>
                  </button>
                </Magnetic>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Scroll Cue */}
        <div
          ref={scrollCueRef}
          className="pointer-events-auto flex flex-col items-center gap-2 cursor-pointer mt-12 group will-change-transform"
          onClick={() => handleScrollTo('about')}
        >
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-sky-400/70 group-hover:text-sky-300 transition-colors">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-7 h-10 rounded-full border border-sky-400/30 flex items-start justify-center p-1.5 group-hover:border-sky-400/70 transition-colors"
          >
            <span className="w-1 h-2 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
