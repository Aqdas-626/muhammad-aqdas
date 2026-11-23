'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

interface ScrubWordsProps {
  children?: string
  text?: string
  className?: string
  as?: 'p' | 'div' | 'span' | 'h2' | 'h3'
  start?: string
  end?: string
}

/**
 * Paragraph word scrubber.
 * Word splitting and ScrollTrigger initialization are deferred to idle callback
 * to eliminate long tasks on the main thread during initial load.
 * Screen readers read the full sentence smoothly via aria-label.
 */
export function ScrubWords({
  children,
  text,
  className = '',
  as: Tag = 'p',
  start = 'top 85%',
  end = 'bottom 45%',
}: ScrubWordsProps) {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLElement>(null)
  const content = text ?? children ?? ''
  const words = content.split(/\s+/).filter(Boolean)

  useEffect(() => {
    const schedule =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 1500 })
        : (cb: () => void) => setTimeout(cb, 80)

    const handle = schedule(() => {
      setMounted(true)
    })

    return () => {
      if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(handle as number)
      } else {
        clearTimeout(handle as unknown as NodeJS.Timeout)
      }
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    const el = containerRef.current
    if (!el || words.length === 0) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let ctx: gsap.Context | null = null

    const initAnimation = () => {
      ctx = gsap.context(() => {
        const wordSpans = el.querySelectorAll<HTMLElement>('.scrub-word')
        if (!wordSpans.length) return

        if (prefersReducedMotion) {
          gsap.set(wordSpans, { opacity: 1 })
          return
        }

        gsap.fromTo(
          wordSpans,
          { opacity: 0.2 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub: 0.8,
            },
          }
        )
      }, el)
    }

    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(initAnimation)
    } else {
      initAnimation()
    }

    return () => {
      ctx?.revert()
    }
  }, [mounted, words.length, start, end])

  // SSR and pre-mount render: plain deterministic text
  if (!mounted) {
    return (
      <Tag
        ref={containerRef as any}
        aria-label={content}
        className={`relative block leading-relaxed ${className}`}
      >
        {content}
      </Tag>
    )
  }

  // Client mounted render: split words for GSAP scrubbed opacity with accessible label
  return (
    <Tag
      ref={containerRef as any}
      aria-label={content}
      className={`relative block leading-relaxed ${className}`}
    >
      <span aria-hidden="true">
        {words.map((word, idx) => (
          <React.Fragment key={idx}>
            <span className="scrub-word inline-block will-change-[opacity]">
              {word}
            </span>
            {idx < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        ))}
      </span>
    </Tag>
  )
}
