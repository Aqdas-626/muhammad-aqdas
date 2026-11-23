'use client'

import React from 'react'
import { motion } from 'motion/react'
import { PERSONAL_INFO } from '@/data/constants'
import { Container } from '@/components/ui/Container'
import { RevealLines, ScrubWords, Stagger, CountUp, Magnetic } from '@/components/motion'
import { CardSpotlight } from '@/components/ui/CardSpotlight'
import { FileDown, CheckCircle2 } from 'lucide-react'

export function AboutSection() {
  const quickFacts = [
    { label: 'Role', value: 'Frontend Developer', isNumeric: false },
    { label: 'Experience', value: 4, suffix: '+ Years', isNumeric: true },
    { label: 'Target Perf', value: 60, suffix: ' FPS', isNumeric: true },
    { label: 'Location', value: PERSONAL_INFO.location, isNumeric: false },
  ]

  return (
    <section
      id="about"
      className="relative w-full min-h-screen py-24 md:py-32 [isolation:isolate] flex items-center select-none pointer-events-none"
    >
      <Container className="pointer-events-auto">
        <div className="max-w-3xl w-full">
          {/* Section Eyebrow: fades & slides in 0.1s before heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/40 border border-sky-400/20 backdrop-blur-md mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-sky-300">
              01 // About Me
            </span>
          </motion.div>

          {/* Masked Line-by-Line Heading with subtle velocity skew */}
          <RevealLines
            as="h2"
            delay={0.1}
            className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-[1.18] mb-8"
            lines={[
              'Bridging modern frontend engineering with',
              <span key="1">
                <span className="bg-gradient-to-r from-sky-200 via-cyan-100 to-white bg-clip-text text-transparent font-normal">
                  immersive 3D graphics
                </span>{' '}
                and deliberate
              </span>,
              'motion design.',
            ]}
          />

          {/* Scrubbed Bio Paragraph */}
          <ScrubWords
            className="text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed mb-5"
            text="I am a frontend developer driven by creating digital experiences that feel tangible, fluid, and memorable. Rather than treating the browser as a static canvas, I build interfaces with depth, procedural lighting, and physics-informed motion."
          />

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            My daily stack centers on Next.js, React 19, TypeScript, and Tailwind CSS, coupled with Three.js and GSAP for interactive spatial storytelling. Every project prioritizes clean code structure, predictable state management, and 60fps performance across diverse devices.
          </p>

          {/* Quick Facts Grid with Spotlight & CountUp */}
          <CardSpotlight className="mt-10 rounded-2xl bg-slate-950/50 border border-sky-400/15 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] p-5 sm:p-6">
            <Stagger className="grid grid-cols-2 sm:grid-cols-4 gap-4" stagger={0.08} delay={0.15}>
              {quickFacts.map((fact, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="block text-[10px] font-mono tracking-wider text-sky-400/70 uppercase">
                    {fact.label}
                  </span>
                  <span className="block text-xs sm:text-sm font-medium text-slate-100">
                    {fact.isNumeric ? (
                      <CountUp value={fact.value} suffix={fact.suffix} />
                    ) : (
                      fact.value
                    )}
                  </span>
                </div>
              ))}
            </Stagger>
          </CardSpotlight>

          {/* Actions with Magnetic Download Button */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.35}>
              <a
                href="#resume"
                onClick={(e) => {
                  e.preventDefault()
                  alert(
                    'Resume download placeholder: Add your resume PDF file to public/resume.pdf to activate direct download.'
                  )
                }}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-mono tracking-wider text-slate-950 font-semibold bg-gradient-to-r from-sky-300 to-white hover:from-white hover:to-sky-300 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] hover:scale-105 active:scale-95"
              >
                <FileDown className="w-4 h-4 text-slate-950 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <span>DOWNLOAD RESUME</span>
              </a>
            </Magnetic>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 px-3 py-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Open for contract & full-time frontend roles</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
