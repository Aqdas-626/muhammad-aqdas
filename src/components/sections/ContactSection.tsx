'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { PERSONAL_INFO } from '@/data/constants'
import { Container } from '@/components/ui/Container'
import { RevealLines } from '@/components/motion/RevealLines'
import { Magnetic } from '@/components/motion/Magnetic'
import { CardSpotlight } from '@/components/ui/CardSpotlight'
import { Copy, Check, Send, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons'

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
            06 // Contact
          </span>
        </motion.div>

        {/* Section Headline (H2) */}
        <RevealLines
          as="h2"
          delay={0.1}
          stagger={0.08}
          className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-[1.05] mb-8"
          lines={[
            'Let’s',
            <span key="1">
              <span className="bg-gradient-to-r from-sky-200 via-cyan-100 to-white bg-clip-text text-transparent font-normal">
                connect.
              </span>
            </span>,
          ]}
        />

        {/* Honest Subtitle */}
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed mb-14">
          I&apos;m looking for an internship or junior frontend role. If you have an opportunity, or feedback on my work, I&apos;d love to hear from you.
        </p>

        {/* Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <CardSpotlight className="p-7 rounded-2xl bg-slate-950/50 border border-sky-400/15 backdrop-blur-xl">
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 block mb-2">
                Direct Email
              </span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label={`Email ${PERSONAL_INFO.name}`}
                className="text-base sm:text-lg font-medium text-white hover:text-sky-300 transition-colors block mb-4 break-all"
              >
                {PERSONAL_INFO.email}
              </a>

              <div className="flex flex-wrap gap-3">
                <Magnetic strength={0.25}>
                  <button
                    onClick={handleCopyEmail}
                    aria-label="Copy email address to clipboard"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono text-slate-200 bg-sky-950/50 border border-sky-400/30 hover:border-sky-400/60 hover:bg-sky-900/40 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check aria-hidden="true" className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy aria-hidden="true" className="w-3.5 h-3.5 text-sky-400" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </Magnetic>

                <Magnetic strength={0.25}>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono text-slate-200 bg-slate-900 border border-slate-700/60 hover:border-sky-400/50 transition-colors"
                  >
                    <Mail aria-hidden="true" className="w-3.5 h-3.5 text-sky-400" />
                    <span>Open Mail Client</span>
                  </a>
                </Magnetic>
              </div>

              {/* Status & Location Info */}
              <div className="mt-8 pt-6 border-t border-sky-400/10 space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Status:</span>
                  <span className="text-sky-300">{PERSONAL_INFO.status}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Location:</span>
                  <span className="text-slate-200">{PERSONAL_INFO.location}</span>
                </div>
              </div>

              {/* Social Channels (GitHub & LinkedIn only; NO Twitter, NO phone) */}
              <div className="mt-6 pt-6 border-t border-sky-400/10 flex items-center gap-3">
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
              </div>
            </CardSpotlight>
          </div>

          {/* Right Column: Contact Form with plain English labels */}
          <div className="lg:col-span-7">
            <CardSpotlight className="p-7 sm:p-9 rounded-2xl bg-slate-950/50 border border-sky-400/15 backdrop-blur-xl">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <Check aria-hidden="true" className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-medium text-white">Message sent!</h3>
                  <p className="text-sm text-slate-300 max-w-sm mx-auto font-light leading-relaxed">
                    Thank you for reaching out. I’ll review your message and reply as soon as possible.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-5 py-2 rounded-full text-xs font-mono text-sky-300 bg-sky-950/40 border border-sky-400/30 hover:bg-sky-900/50 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono tracking-wider text-sky-300 uppercase"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-colors ${
                        errors.name
                          ? 'border-rose-500/60 focus:border-rose-400'
                          : 'border-sky-400/20 focus:border-sky-400/70'
                      }`}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-rose-400 font-mono">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono tracking-wider text-sky-300 uppercase"
                    >
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-rose-500/60 focus:border-rose-400'
                          : 'border-sky-400/20 focus:border-sky-400/70'
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-rose-400 font-mono">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono tracking-wider text-sky-300 uppercase"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Hi Muhammad, I’d like to discuss an opportunity..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-colors resize-none ${
                        errors.message
                          ? 'border-rose-500/60 focus:border-rose-400'
                          : 'border-sky-400/20 focus:border-sky-400/70'
                      }`}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-xs text-rose-400 font-mono">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Magnetic strength={0.3}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-label="Send message"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-mono tracking-widest text-slate-950 font-semibold bg-gradient-to-r from-sky-300 via-cyan-200 to-white hover:from-white hover:to-sky-300 transition-transform duration-300 shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:scale-105 active:scale-95 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Sending...</span>
                        ) : (
                          <>
                            <Send aria-hidden="true" className="w-3.5 h-3.5 text-slate-950" />
                            <span>Send message</span>
                          </>
                        )}
                      </button>
                    </Magnetic>
                  </div>
                </form>
              )}
            </CardSpotlight>
          </div>
        </div>
      </Container>
    </section>
  )
}
