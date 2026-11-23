'use client'

import React from 'react'
import { CAMERA_KEYFRAMES } from '@/data/cameraKeyframes'

interface SectionPlaceholderProps {
  id: string
  index: number
}

export function SectionPlaceholder({ id, index }: SectionPlaceholderProps) {
  const keyframe = CAMERA_KEYFRAMES.find((kf) => kf.id === id)

  return (
    <section
      id={id}
      className="relative min-h-screen w-full flex items-center justify-center px-6 py-24 pointer-events-none select-none"
    >
      <div className="pointer-events-auto max-w-md w-full p-8 rounded-2xl bg-slate-950/45 border border-sky-400/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col items-start gap-4 transition-all duration-300 hover:border-sky-400/50">
        <div className="flex items-center justify-between w-full">
          <span className="text-[11px] font-mono tracking-widest text-sky-400 uppercase font-semibold">
            0{index + 1} {'//'} {id.toUpperCase()}
          </span>
          <span className="w-2 h-2 rounded-full bg-sky-400/80 shadow-[0_0_8px_#38bdf8]" />
        </div>

        <h3 className="text-xl sm:text-2xl font-light tracking-wide text-white">
          {keyframe?.label || id}
        </h3>

        <p className="text-xs text-slate-400 leading-relaxed font-light">
          Foundation scaffold active. Camera keyframe synchronized with GSAP ScrollTrigger.
        </p>

        {keyframe && (
          <div className="w-full pt-4 mt-2 border-t border-sky-400/10 grid grid-cols-2 gap-3 text-[10px] font-mono text-slate-400">
            <div>
              <span className="block text-sky-400/70 uppercase">Camera Pos:</span>
              <span className="text-slate-300">
                [{keyframe.position.join(', ')}]
              </span>
            </div>
            <div>
              <span className="block text-sky-400/70 uppercase">Target:</span>
              <span className="text-slate-300">
                [{keyframe.target.join(', ')}]
              </span>
            </div>
          </div>
        )}

        <div className="inline-block mt-2 px-2.5 py-1 rounded bg-sky-950/50 border border-sky-500/20 text-[10px] font-mono text-sky-300/80">
          Step 1 Camera Checkpoint
        </div>
      </div>
    </section>
  )
}
