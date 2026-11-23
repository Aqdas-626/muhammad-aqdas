'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { PERSONAL_INFO } from '@/data/constants'
import { Container } from '@/components/ui/Container'
import { RevealLines } from '@/components/motion/RevealLines'
import { Magnetic } from '@/components/motion/Magnetic'
import { Stagger } from '@/components/motion/Stagger'
import { CardSpotlight } from '@/components/ui/CardSpotlight'
import { Copy, Check, Send, ArrowUpRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterXIcon } from '@/components/ui/Icons'

export function ContactSection() {
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your name (minimum 2 characters)'
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address'
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setErrors({})
    }, 900)
  }

  return (
    <section
      id="contact"
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
            06 // Initiate Contact
          </span>
        </motion.div>

        {/* Giant Headline: revealed line-by-line / word-by-word */}
        <RevealLines
          as="h2"
          delay={0.1}
          stagger={0.08}
          className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-[1.05] mb-16"
          lines={[
            'Let’s build something',
            <span key="1">
              <span className="bg-gradient-to-r from-sky-200 via-cyan-100 to-white bg-clip-text text-transparent font-normal">
                extraordinary together.
              </span>
            </span>,
          ]}
        />

        {/* Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct info & Copy Email */}
          <div className="lg:col-span-5 space-y-6">
            <CardSpotlight className="p-7 rounded-2xl bg-slate-950/50 border border-sky-400/15 backdrop-blur-xl">
              <span className="text-[10px] font-mono tracking-widest uppercase text-sky-400/80 mb-2 block">
                Direct Communication
              </span>
              <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                Always eager to collaborate on ambitious web experiences, creative codebases, and technical challenges.
              </p>

              {/* Magnetic Email Action with Micro-Animation Copy Confirmation */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Magnetic strength={0.3} className="w-full sm:w-auto">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-500/15 border border-sky-400/30 text-xs font-mono text-sky-200 hover:bg-sky-400/25 hover:border-sky-400/60 transition-all duration-200 w-full"
                  >
                    <span>{PERSONAL_INFO.email}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
                  </a>
                </Magnetic>

                <button
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="px-4 py-3 rounded-xl bg-slate-900 border border-sky-400/20 text-xs font-mono text-slate-300 hover:text-white hover:border-sky-400/50 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check aria-hidden="true" className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">
                        Copied!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy aria-hidden="true" className="w-4 h-4 text-slate-300" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </CardSpotlight>

            {/* Social Channels with Hover Lift */}
            <CardSpotlight className="p-6 rounded-2xl bg-slate-950/50 border border-sky-400/15 backdrop-blur-xl">
              <span className="text-[10px] font-mono tracking-widest uppercase text-sky-400 mb-3 block">
                Social Profiles
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Muhammad Aqdas on GitHub"
                  className="p-3 rounded-xl bg-slate-900 border border-sky-400/20 text-slate-300 hover:text-sky-300 hover:border-sky-400/50 hover:-translate-y-1 transition-transform duration-200"
                >
                  <GithubIcon aria-hidden="true" className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Muhammad Aqdas on LinkedIn"
                  className="p-3 rounded-xl bg-slate-900 border border-sky-400/20 text-slate-300 hover:text-sky-300 hover:border-sky-400/50 hover:-translate-y-1 transition-transform duration-200"
                >
                  <LinkedinIcon aria-hidden="true" className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Muhammad Aqdas on Twitter / X"
                  className="p-3 rounded-xl bg-slate-900 border border-sky-400/20 text-slate-300 hover:text-sky-300 hover:border-sky-400/50 hover:-translate-y-1 transition-transform duration-200"
                >
                  <TwitterXIcon aria-hidden="true" className="w-5 h-5" />
                </a>
              </div>
            </CardSpotlight>
          </div>

          {/* Right Column: Staggered Form Fields */}
          <div className="lg:col-span-7">
            <CardSpotlight className="p-8 sm:p-10 rounded-2xl bg-slate-950/60 border border-sky-400/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-sky-500/10 border border-sky-400/40 text-sky-400 mx-auto flex items-center justify-center">
                    <Check aria-hidden="true" className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-light text-white">Transmission Received</h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light max-w-sm mx-auto">
                    Thank you for reaching out. I will review your message and reply as soon as possible.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    aria-label="Send another message"
                    className="mt-4 px-6 py-2 rounded-full text-xs font-mono text-sky-300 border border-sky-400/30 hover:border-sky-400/60 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <Stagger className="space-y-6" stagger={0.08} delay={0.15}>
                    {/* Name input */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border ${
                          errors.name ? 'border-rose-400/80 focus:border-rose-400' : 'border-sky-400/20 focus:border-sky-400/70'
                        } text-sm text-white placeholder-slate-400 focus:outline-none transition-colors font-light`}
                      />
                      {errors.name && (
                        <span className="block text-[11px] font-mono text-rose-400">{errors.name}</span>
                      )}
                    </div>

                    {/* Email input */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border ${
                          errors.email ? 'border-rose-400/80 focus:border-rose-400' : 'border-sky-400/20 focus:border-sky-400/70'
                        } text-sm text-white placeholder-slate-400 focus:outline-none transition-colors font-light`}
                      />
                      {errors.email && (
                        <span className="block text-[11px] font-mono text-rose-400">{errors.email}</span>
                      )}
                    </div>

                    {/* Message input */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
                        Project Details / Inquiry *
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your concept, timeline, or engineering challenge..."
                        className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border ${
                          errors.message ? 'border-rose-400/80 focus:border-rose-400' : 'border-sky-400/20 focus:border-sky-400/70'
                        } text-sm text-white placeholder-slate-400 focus:outline-none transition-colors font-light resize-none`}
                      />
                      {errors.message && (
                        <span className="block text-[11px] font-mono text-rose-400">{errors.message}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-label="Transmit message"
                        className="w-full group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-xs font-mono tracking-widest text-slate-950 font-semibold bg-gradient-to-r from-sky-300 via-cyan-200 to-white hover:from-white hover:to-sky-300 transition-transform duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] disabled:opacity-50 active:scale-[0.99]"
                      >
                        {isSubmitting ? (
                          <span>TRANSMITTING...</span>
                        ) : (
                          <>
                            <span>TRANSMIT MESSAGE</span>
                            <Send aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </Stagger>
                </form>
              )}
            </CardSpotlight>
          </div>
        </div>
      </Container>
    </section>
  )
}
