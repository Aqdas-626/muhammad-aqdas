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
 * Word splitting is deferred until AFTER client mount to guarantee 100% SSR hydration match.
 * Splits text into individual word spans and scrubs their opacity from 0.2 to 1
 * as the element travels through the viewport.
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
    setMounted(true)
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

  // SSR and pre-mount render: plain deterministic paragraph text (100% hydration match)
  if (!mounted) {
    return (
      // @ts-expect-error dynamic HTML tag
      <Tag ref={containerRef} className={`relative block leading-relaxed ${className}`}>
        {content}
      </Tag>
    )
  }

  // Client mounted render: split words for GSAP scrubbed opacity
  return (
    // @ts-expect-error dynamic HTML tag
    <Tag ref={containerRef} className={`relative block leading-relaxed ${className}`}>
      {words.map((word, idx) => (
        <span
          key={idx}
          className="scrub-word inline-block opacity-20 will-change-[opacity]"
        >
          {word}&nbsp;
        </span>
      ))}
    </Tag>
  )
}
