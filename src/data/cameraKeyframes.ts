export interface CameraKeyframe {
  id: string
  label: string
  position: [number, number, number]
  target: [number, number, number]
  fogColor: string
  fogDensity: number
  accentColor: string
  crystalRotation: [number, number, number]
  crystalScale: number
}

export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  {
    id: 'hero',
    label: 'Overview & Monolith',
    position: [0, 0, 7.8],
    target: [0, 0, 0],
    fogColor: '#030712',
    fogDensity: 0.08,
    accentColor: '#38bdf8',
    crystalRotation: [0, 0, 0],
    crystalScale: 1.8,
  },
  {
    id: 'about',
    label: 'Profile & Geometry',
    position: [2.8, 0.4, 6.2],
    target: [-0.8, 0, 0],
    fogColor: '#040b1a',
    fogDensity: 0.09,
    accentColor: '#67e8f9',
    crystalRotation: [0.25, 0.9, 0.1],
    crystalScale: 1.6,
  },
  {
    id: 'skills',
    label: 'Technical Topography',
    position: [-3.0, 3.2, 5.6],
    target: [0, -0.4, 0],
    fogColor: '#020914',
    fogDensity: 0.095,
    accentColor: '#a5f3fc',
    crystalRotation: [-0.35, 1.7, -0.2],
    crystalScale: 1.5,
  },
  {
    id: 'work',
    label: 'Work Gallery Orbit',
    position: [3.6, -0.4, 5.2],
    target: [0.4, 0.2, 0],
    fogColor: '#051024',
    fogDensity: 0.085,
    accentColor: '#38bdf8',
    crystalRotation: [0.45, 2.6, 0.25],
    crystalScale: 1.65,
  },
  {
    id: 'building',
    label: 'Low-Angle Monolith',
    position: [0.8, -2.8, 5.2],
    target: [0, 0.6, 0],
    fogColor: '#030814',
    fogDensity: 0.09,
    accentColor: '#7dd3fc',
    crystalRotation: [-0.2, 3.3, 0.1],
    crystalScale: 1.8,
  },
  {
    id: 'experience',
    label: 'Timeline Perspective',
    position: [-2.6, 1.2, 5.0],
    target: [0.4, 0, 0],
    fogColor: '#040c1e',
    fogDensity: 0.095,
    accentColor: '#93c5fd',
    crystalRotation: [0.5, 4.1, -0.3],
    crystalScale: 1.55,
  },
  {
    id: 'contact',
    label: 'Calm Finale & Resonance',
    position: [0, 0.2, 7.2],
    target: [0, 0, 0],
    fogColor: '#020712',
    fogDensity: 0.075,
    accentColor: '#38bdf8',
    crystalRotation: [0.1, 4.9, 0.05],
    crystalScale: 1.35,
  },
  {
    id: 'footer',
    label: 'Arctic Horizon Fade',
    position: [0, 1.8, 8.0],
    target: [0, 0.6, 0],
    fogColor: '#01040a',
    fogDensity: 0.12,
    accentColor: '#60a5fa',
    crystalRotation: [0, 5.7, 0],
    crystalScale: 1.2,
  },
]
