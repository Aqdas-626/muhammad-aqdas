'use client'

import React from 'react'
import { motion } from 'motion/react'
import { PERSONAL_INFO } from '@/data/constants'
import { Container } from '@/components/ui/Container'
import { RevealLines, ScrubWords, Stagger, Magnetic } from '@/components/motion'
import { CardSpotlight } from '@/components/ui/CardSpotlight'
import { FileDown } from 'lucide-react'

export function AboutSection() {
  const honestFacts = [
    { label: 'Role', value: 'Frontend Developer (Fresher)' },
    { label: 'Status', value: 'Open to internships & junior roles' },
    { label: 'Location', value: 'Pakistan (open to remote)' },
    { label: 'Focus', value: 'React, Next.js, TypeScript' },
  ]

  return (
    <section
      id="about"
      className="relative w-full min-h-screen py-24 md:py-32 [isolation:isolate] flex items-center select-none pointer-events-none"
    >
      <Container className="pointer-events-auto">
        <div className="max-w-3xl w-full">
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
              01 // About Me
            </span>
          </motion.div>

          {/* Masked Line-by-Line Heading (H2) */}
          <RevealLines
            as="h2"
            delay={0.1}
            className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-[1.18] mb-8"
            lines={[
              'Learning in public,',
              <span key="1">
                <span className="bg-gradient-to-r from-sky-200 via-cyan-100 to-white bg-clip-text text-transparent font-normal">
                  one project
                </span>{' '}
                at a time.
              </span>,
            ]}
          />

          {/* Scrubbed Bio Paragraph 1 */}
          <ScrubWords
            className="text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed mb-5"
            text="I'm Muhammad Aqdas, a frontend developer at the start of my career. I've been learning HTML, CSS, JavaScript, React and Next.js, and I enjoy building interfaces that feel smooth and look good on every screen."
          />

          {/* Bio Paragraph 2 */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
            This portfolio is my first full project. I built it to practise Next.js, TypeScript and Tailwind CSS, and to explore 3D with Three.js and scroll animation with GSAP.
          </p>

          {/* Bio Paragraph 3 */}
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
            I&apos;m looking for an internship or junior frontend role where I can learn from a team, contribute to real products and grow quickly.
          </p>

          {/* Honest Facts Grid (no fake stats, no fake counters) */}
          <CardSpotlight className="mt-8 rounded-2xl bg-slate-950/50 border border-sky-400/15 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] p-5 sm:p-6">
            <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4" stagger={0.08} delay={0.15}>
              {honestFacts.map((fact, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="block text-[10px] font-mono tracking-wider text-sky-400 uppercase">
                    {fact.label}
                  </span>
                  <span className="block text-xs sm:text-sm font-medium text-slate-100">
                    {fact.value}
                  </span>
                </div>
              ))}
            </Stagger>
          </CardSpotlight>

          {/* Actions with Magnetic Download Resume Button */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.35}>
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download or view resume PDF"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-mono tracking-wider text-slate-950 font-semibold bg-gradient-to-r from-sky-300 to-white hover:from-white hover:to-sky-300 transition-transform duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:scale-105 active:scale-95"
              >
                <FileDown aria-hidden="true" className="w-4 h-4 text-slate-950" />
                <span>Download Resume</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </Container>
    </section>
  )
}
