export interface BuildingItem {
  id: string
  title: string
  category: string
  status: 'In Progress' | 'Experimenting' | 'Deep Dive'
  description: string
  techStack: string[]
  progress: number
}

export const BUILDING_DATA: BuildingItem[] = [
  {
    id: 'glsl-shaders',
    title: 'Custom WebGL Shaders & GLSL Math',
    category: 'Creative Graphics',
    status: 'Deep Dive',
    description: 'Experimenting with procedural Simplex/Voronoi noise, vertex distortion matrices, and real-time raymarching for browser-based atmospheric simulations.',
    techStack: ['GLSL', 'Three.js', 'WebGL', 'Math'],
    progress: 75,
  },
  {
    id: 'next16-concurrent',
    title: 'Next.js 16 & React 19 Architectures',
    category: 'Modern Web Core',
    status: 'In Progress',
    description: 'Exploring Server Actions, streaming component suspense, Partial Prerendering (PPR), and high-throughput Turbopack development workflows.',
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Turbopack'],
    progress: 85,
  },
  {
    id: 'spatial-physics',
    title: 'Spatial Audio & Physics Interactions',
    category: 'Sensory Web',
    status: 'Experimenting',
    description: 'Integrating lightweight physics engines (Rapier3D) and Web Audio API spatial listeners to bring tactile soundscapes to 3D canvas viewports.',
    techStack: ['Rapier3D', 'Web Audio API', 'React Three Fiber'],
    progress: 60,
  },
]
