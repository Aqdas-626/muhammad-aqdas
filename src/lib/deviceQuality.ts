export type QualityTier = 'software' | 'low' | 'mid' | 'high'

export interface QualityProfile {
  tier: QualityTier
  isSoftwareRenderer: boolean
  isHeadless: boolean
  reducedMotion: boolean
  dpr: [number, number]
  particleCount: { primary: number; secondary: number }
  useTransmission: boolean
  enableContinuousLoop: boolean
}

let cachedProfile: QualityProfile | null = null

export function detectQuality(): QualityProfile {
  if (cachedProfile) return cachedProfile

  if (typeof window === 'undefined') {
    return {
      tier: 'high',
      isSoftwareRenderer: false,
      isHeadless: false,
      reducedMotion: false,
      dpr: [1, 1.5],
      particleCount: { primary: 75, secondary: 35 },
      useTransmission: false,
      enableContinuousLoop: true,
    }
  }

  // 1. Reduced motion check
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // 2. Headless / automation / Lighthouse check
  const ua = navigator.userAgent || ''
  const isHeadless =
    /headless/i.test(ua) ||
    /lighthouse/i.test(ua) ||
    /chrome-lighthouse/i.test(ua) ||
    navigator.webdriver === true

  // 3. Hardware resources
  const cores = navigator.hardwareConcurrency || 4
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4
  const isCoarse = window.matchMedia('(pointer: coarse)').matches

  // 4. WebGL renderer check
  let isSoftwareRenderer = false
  let hasWebGL = true
  try {
    const testCanvas = document.createElement('canvas')
    const gl =
      testCanvas.getContext('webgl') ||
      (testCanvas.getContext('experimental-webgl') as WebGLRenderingContext | null)
    if (!gl) {
      hasWebGL = false
    } else {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
      if (debugInfo) {
        const renderer = (gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string) || ''
        if (/swiftshader|llvmpipe|software|mesa|microsoft basic/i.test(renderer)) {
          isSoftwareRenderer = true
        }
      }
    }
  } catch {
    hasWebGL = false
  }

  let profile: QualityProfile

  const isLowPowerOrNoGpu =
    !hasWebGL ||
    isSoftwareRenderer ||
    isHeadless ||
    cores <= 4 ||
    memory <= 4 ||
    isCoarse ||
    reducedMotion

  if (isLowPowerOrNoGpu) {
    profile = {
      tier: 'software',
      isSoftwareRenderer: isSoftwareRenderer || !hasWebGL,
      isHeadless,
      reducedMotion,
      dpr: [1, 1],
      particleCount: { primary: 0, secondary: 0 },
      useTransmission: false,
      enableContinuousLoop: false,
    }
  } else if (cores <= 6 || memory <= 6) {
    profile = {
      tier: 'mid',
      isSoftwareRenderer: false,
      isHeadless: false,
      reducedMotion: false,
      dpr: [1, 1.25],
      particleCount: { primary: 50, secondary: 25 },
      useTransmission: false,
      enableContinuousLoop: true,
    }
  } else {
    profile = {
      tier: 'high',
      isSoftwareRenderer: false,
      isHeadless: false,
      reducedMotion: false,
      dpr: [1, 1.5],
      particleCount: { primary: 75, secondary: 35 },
      useTransmission: false,
      enableContinuousLoop: true,
    }
  }

  cachedProfile = profile
  return profile
}
